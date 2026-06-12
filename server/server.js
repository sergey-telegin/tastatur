const fs = require("node:fs/promises");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { pathToFileURL } = require("node:url");

const rootDir = path.resolve(__dirname, "..");
const defaultHost = process.env.FLYKEY_HOST || "127.0.0.1";
const defaultPort = Number(process.env.FLYKEY_PORT || process.env.PORT || 4173);
const rateLimitWindowMs = Number(process.env.FLYKEY_RATE_LIMIT_WINDOW_MS || 60 * 1000);
const rateLimitMaxRequests = Number(process.env.FLYKEY_RATE_LIMIT_MAX || 180);

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"]
]);

const allowedOrigins = String(process.env.FLYKEY_ALLOWED_ORIGINS || "")
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

const rateLimitBuckets = new Map();

function setSecurityHeaders(response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("X-Frame-Options", "SAMEORIGIN");
}

function applyCors(request, response) {
  const origin = request.headers.origin;
  if (!origin) return;

  const hostOrigin = `http://${request.headers.host || `${defaultHost}:${defaultPort}`}`;
  const isAllowed = origin === hostOrigin || allowedOrigins.includes(origin) || allowedOrigins.includes("*");
  if (!isAllowed) return;

  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Vary", "Origin");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, If-Match");
  response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS");
}

function sendJson(request, response, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  setSecurityHeaders(response);
  applyCors(request, response);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(request.method === "HEAD" ? undefined : body);
  return true;
}

function sendError(request, response, statusCode, message) {
  return sendJson(request, response, statusCode, {
    status: "error",
    message
  });
}

function clientIp(request) {
  return String(request.headers["x-forwarded-for"] || request.socket.remoteAddress || "unknown").split(",")[0].trim();
}

function checkRateLimit(request) {
  const key = `${clientIp(request)}:${request.url?.split("?")[0] || "/"}`;
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key) || { count: 0, resetAt: now + rateLimitWindowMs };

  if (bucket.resetAt <= now) {
    bucket.count = 0;
    bucket.resetAt = now + rateLimitWindowMs;
  }

  bucket.count += 1;
  rateLimitBuckets.set(key, bucket);

  if (bucket.count > rateLimitMaxRequests) {
    return Math.ceil((bucket.resetAt - now) / 1000);
  }

  return 0;
}

async function readJsonFile(relativePath, staticRoot = rootDir) {
  const filePath = path.join(staticRoot, relativePath);
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
}

function isLoopbackRequest(request) {
  const address = String(request.socket.remoteAddress || "");
  return address === "127.0.0.1" || address === "::1" || address === "::ffff:127.0.0.1";
}

function isTrustedPrivateToolRequest(request) {
  if (!isLoopbackRequest(request)) return false;

  const contentType = String(request.headers["content-type"] || "").toLowerCase();
  if (!contentType.startsWith("application/json")) return false;

  const origin = request.headers.origin;
  if (!origin) return true;

  const hostOrigin = `http://${request.headers.host || `${defaultHost}:${defaultPort}`}`;
  return origin === hostOrigin;
}

async function readRequestJson(request, limitBytes = 5 * 1024 * 1024) {
  let body = "";

  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body, "utf8") > limitBytes) {
      const error = new Error("Request body is too large");
      error.statusCode = 413;
      throw error;
    }
  }

  try {
    return JSON.parse(body || "{}");
  } catch {
    const error = new Error("Invalid JSON");
    error.statusCode = 400;
    throw error;
  }
}

function isPrivateToolUrl(url) {
  return url.pathname.endsWith("/roadmap.html") ||
    url.searchParams.has("lessonStoryboard") ||
    url.searchParams.has("roadmap") ||
    url.searchParams.get("mode") === "roadmap" ||
    url.searchParams.has("calibrateHands");
}

function privateToolHeaders(url) {
  return isPrivateToolUrl(url)
    ? { "X-Robots-Tag": "noindex, nofollow, noarchive" }
    : {};
}

function staticCacheControl(resolvedPath, extension) {
  const normalizedPath = resolvedPath.split(path.sep).join("/");
  if (
    extension === ".html" ||
    normalizedPath.endsWith("/styles/main.css") ||
    normalizedPath.endsWith("/styles/storyboard.css") ||
    normalizedPath.endsWith("/app/data.js") ||
    normalizedPath.endsWith("/app/controllers/lesson-storyboard-controller.js") ||
    normalizedPath.endsWith("/practice-content/storyboard.js") ||
    normalizedPath.endsWith("/practice-content/content-bundle.json") ||
    normalizedPath.endsWith("/practice-content/content-version.json")
  ) {
    return "no-store";
  }

  return "public, max-age=3600";
}

function safeStaticPath(urlPath, staticRoot = rootDir) {
  const normalizedPath = decodeURIComponent(urlPath.split("?")[0]);
  const relativePath = normalizedPath === "/" ? "index.html" : normalizedPath.replace(/^\/+/, "");
  const absolutePath = path.resolve(staticRoot, relativePath);

  if (!absolutePath.startsWith(`${staticRoot}${path.sep}`) && absolutePath !== staticRoot) {
    return null;
  }

  return absolutePath;
}

async function handleContentRoutes(request, response, pathname, staticRoot) {
  if (pathname === "/api/health") {
    sendJson(request, response, 200, {
      status: "ok",
      app: "FlyKey",
      service: "flykey-static"
    });
    return true;
  }

  if (pathname === "/api/content/version") {
    sendJson(request, response, 200, await readJsonFile("practice-content/content-version.json", staticRoot));
    return true;
  }

  if (pathname === "/api/content/bundle") {
    sendJson(request, response, 200, await readJsonFile("practice-content/content-bundle.json", staticRoot));
    return true;
  }

  return false;
}

async function handlePrivateToolRoutes(request, response, pathname, staticRoot) {
  if (pathname !== "/api/storyboard/apply") return false;

  if (request.method !== "POST") {
    sendError(request, response, 405, "Method not allowed");
    return true;
  }

  if (!isTrustedPrivateToolRequest(request)) {
    sendError(request, response, 403, "Storyboard apply is only available from the local Roadmap page");
    return true;
  }

  const payload = await readRequestJson(request);
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "flykey-storyboard-"));
  const exportPath = path.join(tempDir, "storyboard.json");
  await fs.writeFile(exportPath, JSON.stringify(payload, null, 2));

  const result = spawnSync(process.execPath, [
    path.join(staticRoot, "scripts", "apply-storyboard.js"),
    exportPath
  ], {
    cwd: staticRoot,
    encoding: "utf8"
  });

  await fs.rm(tempDir, { recursive: true, force: true });

  if (result.status !== 0) {
    sendJson(request, response, 422, {
      status: "error",
      message: "Storyboard apply failed",
      output: [result.stdout, result.stderr].filter(Boolean).join("\n").trim()
    });
    return true;
  }

  sendJson(request, response, 200, {
    status: "ok",
    message: "Storyboard applied",
    output: [result.stdout, result.stderr].filter(Boolean).join("\n").trim()
  });
  return true;
}

async function handleApi(request, response, pathname, options) {
  const retryAfter = checkRateLimit(request);
  if (retryAfter > 0) {
    response.setHeader("Retry-After", String(retryAfter));
    sendError(request, response, 429, "Too many requests");
    return true;
  }

  if (request.method === "OPTIONS") {
    setSecurityHeaders(response);
    applyCors(request, response);
    response.writeHead(204, { "Cache-Control": "no-store" });
    response.end();
    return true;
  }

  if (await handleContentRoutes(request, response, pathname, options.rootDir)) return true;
  if (await handlePrivateToolRoutes(request, response, pathname, options.rootDir)) return true;

  if (pathname.startsWith("/api/")) {
    sendError(request, response, 404, "Static server only serves content endpoints. Use FlyKeyBackend for account and profile API.");
    return true;
  }

  return false;
}

async function handleStatic(request, response, urlOrPath, staticRoot = rootDir) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    sendError(request, response, 405, "Method not allowed");
    return;
  }

  const url = typeof urlOrPath === "string" ? null : urlOrPath;
  const pathname = url ? url.pathname : urlOrPath;
  const robotsHeaders = url ? privateToolHeaders(url) : {};
  const filePath = safeStaticPath(pathname, staticRoot);

  if (!filePath) {
    sendError(request, response, 403, "Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(filePath);
    const resolvedPath = stat.isDirectory() ? path.join(filePath, "index.html") : filePath;
    const file = await fs.readFile(resolvedPath);
    const extension = path.extname(resolvedPath).toLowerCase();
    const contentType = contentTypes.get(extension) || "application/octet-stream";

    setSecurityHeaders(response);
    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": staticCacheControl(resolvedPath, extension),
      ...robotsHeaders
    });
    response.end(request.method === "HEAD" ? undefined : file);
  } catch (error) {
    if (error?.code === "ENOENT") {
      sendError(request, response, 404, "File not found");
      return;
    }

    sendError(request, response, 500, "Server error");
  }
}

function createServer(options = {}) {
  const resolvedOptions = {
    rootDir: options.rootDir || rootDir,
    host: options.host || defaultHost,
    port: Number(options.port ?? defaultPort)
  };

  return http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", `http://${request.headers.host || `${resolvedOptions.host}:${resolvedOptions.port}`}`);

      if (url.pathname.startsWith("/api/")) {
        if (await handleApi(request, response, url.pathname, resolvedOptions)) return;
      }

      await handleStatic(request, response, url, resolvedOptions.rootDir);
    } catch (error) {
      sendError(request, response, error.statusCode || 500, error.statusCode ? error.message : "Server error");
    }
  });
}

function startServer(options = {}) {
  const resolvedOptions = {
    host: options.host || defaultHost,
    port: Number(options.port ?? defaultPort),
    rootDir: options.rootDir || rootDir
  };
  const server = createServer(resolvedOptions);

  return new Promise((resolve, reject) => {
    const handleListenError = error => {
      server.off("listening", handleListening);
      reject(error);
    };
    const handleListening = () => {
      server.off("error", handleListenError);
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : resolvedOptions.port;
      const url = `http://${resolvedOptions.host}:${port}`;
      resolve({ server, url, port, host: resolvedOptions.host });
    };

    server.once("error", handleListenError);
    server.once("listening", handleListening);
    server.listen(resolvedOptions.port, resolvedOptions.host);
  });
}

if (require.main === module) {
  startServer().then(({ url }) => {
    console.log(`FlyKey static server is running at ${url}`);
    console.log(`Roadmap is available at ${url}/roadmap.html`);
    console.log(`Cloud API runs in /Users/sergeytelegin/FlyKeyBackend`);
    console.log(`Project root: ${pathToFileURL(rootDir).href}`);
  });
}

module.exports = {
  createServer,
  startServer
};
