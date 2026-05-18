const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const rootDir = path.resolve(__dirname, "..");
const defaultHost = process.env.FLYKEY_HOST || "127.0.0.1";
const defaultPort = Number(process.env.FLYKEY_PORT || process.env.PORT || 4173);
const defaultDbPath = process.env.FLYKEY_DB_PATH || path.join(rootDir, "server", "data", "flykey-db.json");
const requestBodyLimitBytes = Number(process.env.FLYKEY_BODY_LIMIT_BYTES || 512 * 1024);
const sessionTtlMs = Number(process.env.FLYKEY_SESSION_TTL_MS || 30 * 24 * 60 * 60 * 1000);
const maxProfilesPerAccount = Number(process.env.FLYKEY_MAX_PROFILES || 20);
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
let dbWriteQueue = Promise.resolve();

function nowIso() {
  return new Date().toISOString();
}

function randomId(prefix) {
  return `${prefix}_${crypto.randomBytes(12).toString("base64url")}`;
}

function normalizeName(value) {
  return String(value || "").trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

function validateName(value, label = "name") {
  const name = String(value || "").trim().replace(/\s+/g, " ");
  if (name.length < 2) return { error: `${label} must be at least 2 characters` };
  if (name.length > 40) return { error: `${label} must be at most 40 characters` };
  if (!/^[\p{L}\p{N}][\p{L}\p{N} .'-]{0,38}[\p{L}\p{N}]$/u.test(name)) {
    return { error: `${label} contains unsupported characters` };
  }
  return { name, normalizedName: normalizeName(name) };
}

function validatePassword(password) {
  if (typeof password !== "string" || password.length < 8) {
    return "password must be at least 8 characters";
  }
  if (password.length > 128) {
    return "password must be at most 128 characters";
  }
  return null;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("base64url")) {
  const hash = crypto.pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("base64url");
  return { salt, hash };
}

function verifyPassword(password, salt, expectedHash) {
  const { hash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expectedHash));
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("base64url");
}

function defaultDb() {
  return {
    schemaVersion: 1,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    accounts: {},
    sessions: {}
  };
}

async function ensureDbFile(dbPath = defaultDbPath) {
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  try {
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(dbPath, `${JSON.stringify(defaultDb(), null, 2)}\n`);
  }
}

async function readDb(dbPath = defaultDbPath) {
  await ensureDbFile(dbPath);
  const parsed = JSON.parse(await fs.readFile(dbPath, "utf8"));
  parsed.accounts = parsed.accounts && typeof parsed.accounts === "object" ? parsed.accounts : {};
  parsed.sessions = parsed.sessions && typeof parsed.sessions === "object" ? parsed.sessions : {};
  return parsed;
}

async function writeDb(db, dbPath = defaultDbPath) {
  db.updatedAt = nowIso();
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  const tmpPath = `${dbPath}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmpPath, `${JSON.stringify(db, null, 2)}\n`);
  await fs.rename(tmpPath, dbPath);
}

function mutateDb(mutator, dbPath = defaultDbPath) {
  dbWriteQueue = dbWriteQueue.then(async () => {
    const db = await readDb(dbPath);
    const result = await mutator(db);
    await writeDb(db, dbPath);
    return result;
  });
  return dbWriteQueue;
}

function publicAccount(account) {
  return {
    id: account.id,
    name: account.name,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt
  };
}

function publicProfile(profile) {
  return {
    id: profile.id,
    name: profile.name,
    revision: profile.revision,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt
  };
}

function sanitizeJsonValue(value, depth = 0) {
  if (depth > 30) return null;
  if (value == null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (Array.isArray(value)) return value.map(item => sanitizeJsonValue(item, depth + 1));
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !["__proto__", "prototype", "constructor"].includes(key))
        .map(([key, item]) => [key, sanitizeJsonValue(item, depth + 1)])
    );
  }
  return null;
}

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
  response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
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

function sendError(request, response, statusCode, message, extra = {}) {
  return sendJson(request, response, statusCode, {
    status: "error",
    message,
    ...extra
  });
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

function safeStaticPath(urlPath, staticRoot = rootDir) {
  const normalizedPath = decodeURIComponent(urlPath.split("?")[0]);
  const relativePath = normalizedPath === "/" ? "index.html" : normalizedPath.replace(/^\/+/, "");
  const absolutePath = path.resolve(staticRoot, relativePath);

  if (!absolutePath.startsWith(`${staticRoot}${path.sep}`) && absolutePath !== staticRoot) {
    return null;
  }

  return absolutePath;
}

async function readJsonFile(relativePath, staticRoot = rootDir) {
  const filePath = path.join(staticRoot, relativePath);
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
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

async function readRequestBody(request, limitBytes = requestBodyLimitBytes) {
  const chunks = [];
  let total = 0;

  for await (const chunk of request) {
    total += chunk.length;
    if (total > limitBytes) {
      const error = new Error("Request body too large");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("Invalid JSON body");
    error.statusCode = 400;
    throw error;
  }
}

function accountByNormalizedName(db, normalizedName) {
  return Object.values(db.accounts).find(account => account.normalizedName === normalizedName) || null;
}

function pruneExpiredSessions(db) {
  const now = Date.now();
  Object.entries(db.sessions).forEach(([tokenHash, session]) => {
    if (!session?.expiresAt || Date.parse(session.expiresAt) <= now) {
      delete db.sessions[tokenHash];
    }
  });
}

async function createSession(db, accountId) {
  const token = crypto.randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token);
  const createdAt = nowIso();
  db.sessions[tokenHash] = {
    accountId,
    createdAt,
    lastSeenAt: createdAt,
    expiresAt: new Date(Date.now() + sessionTtlMs).toISOString()
  };
  return token;
}

async function requireAuth(request, dbPath = defaultDbPath) {
  const header = String(request.headers.authorization || "");
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return { error: "Missing bearer token", statusCode: 401 };

  return mutateDb(db => {
    pruneExpiredSessions(db);
    const tokenHash = hashToken(token);
    const session = db.sessions[tokenHash];
    const account = session ? db.accounts[session.accountId] : null;
    if (!session || !account) {
      return { error: "Invalid or expired session", statusCode: 401 };
    }

    session.lastSeenAt = nowIso();
    return { db, account, session, tokenHash };
  }, dbPath);
}

function getProfile(account, profileId) {
  return account.profiles?.[profileId] || null;
}

function ensureRevision(profile, revision) {
  if (!Number.isInteger(revision)) {
    return { error: "revision is required" };
  }
  if (revision !== profile.revision) {
    return { error: "Profile revision conflict", statusCode: 409, currentRevision: profile.revision };
  }
  return null;
}

function parseProfilePath(pathname) {
  const match = pathname.match(/^\/api\/profiles\/([^/]+)(?:\/(state|progress))?$/);
  if (!match) return null;
  return {
    profileId: decodeURIComponent(match[1]),
    resource: match[2] || null
  };
}

async function handleAccountRoutes(request, response, pathname, dbPath) {
  if (pathname === "/api/accounts" && request.method === "POST") {
    const body = await readRequestBody(request);
    const nameResult = validateName(body.name, "account name");
    if (nameResult.error) return sendError(request, response, 400, nameResult.error);
    const passwordError = validatePassword(body.password);
    if (passwordError) return sendError(request, response, 400, passwordError);

    const result = await mutateDb(async db => {
      if (accountByNormalizedName(db, nameResult.normalizedName)) {
        return { error: "Account already exists", statusCode: 409 };
      }

      const accountId = randomId("acct");
      const { salt, hash } = hashPassword(body.password);
      const createdAt = nowIso();
      db.accounts[accountId] = {
        id: accountId,
        name: nameResult.name,
        normalizedName: nameResult.normalizedName,
        passwordSalt: salt,
        passwordHash: hash,
        profiles: {},
        createdAt,
        updatedAt: createdAt
      };
      const token = await createSession(db, accountId);
      return { account: publicAccount(db.accounts[accountId]), token };
    }, dbPath);

    if (result.error) return sendError(request, response, result.statusCode, result.error);
    return sendJson(request, response, 201, { status: "ok", ...result });
  }

  if (pathname === "/api/sessions" && request.method === "POST") {
    const body = await readRequestBody(request);
    const loginName = normalizeName(body.name || body.accountName || "");
    const accountId = String(body.accountId || "").trim();
    if ((!loginName && !accountId) || typeof body.password !== "string") {
      return sendError(request, response, 400, "account name/accountId and password are required");
    }

    const result = await mutateDb(async db => {
      const account = accountId ? db.accounts[accountId] : accountByNormalizedName(db, loginName);
      if (!account || !verifyPassword(body.password, account.passwordSalt, account.passwordHash)) {
        return { error: "Invalid credentials", statusCode: 401 };
      }
      const token = await createSession(db, account.id);
      return { account: publicAccount(account), token };
    }, dbPath);

    if (result.error) return sendError(request, response, result.statusCode, result.error);
    return sendJson(request, response, 200, { status: "ok", ...result });
  }

  if (pathname === "/api/session" && request.method === "DELETE") {
    const auth = await requireAuth(request, dbPath);
    if (auth.error) return sendError(request, response, auth.statusCode, auth.error);
    await mutateDb(db => {
      delete db.sessions[auth.tokenHash];
      return true;
    }, dbPath);
    return sendJson(request, response, 200, { status: "ok" });
  }

  if (pathname === "/api/account" && request.method === "GET") {
    const auth = await requireAuth(request, dbPath);
    if (auth.error) return sendError(request, response, auth.statusCode, auth.error);
    return sendJson(request, response, 200, { status: "ok", account: publicAccount(auth.account) });
  }

  return false;
}

async function handleProfileRoutes(request, response, pathname, dbPath) {
  if (pathname === "/api/profiles" && request.method === "GET") {
    const auth = await requireAuth(request, dbPath);
    if (auth.error) return sendError(request, response, auth.statusCode, auth.error);
    const profiles = Object.values(auth.account.profiles || {}).map(publicProfile);
    return sendJson(request, response, 200, { status: "ok", profiles });
  }

  if (pathname === "/api/profiles" && request.method === "POST") {
    const auth = await requireAuth(request, dbPath);
    if (auth.error) return sendError(request, response, auth.statusCode, auth.error);
    const body = await readRequestBody(request);
    const nameResult = validateName(body.name, "profile name");
    if (nameResult.error) return sendError(request, response, 400, nameResult.error);

    const result = await mutateDb(db => {
      const account = db.accounts[auth.account.id];
      account.profiles = account.profiles || {};
      const profiles = Object.values(account.profiles);
      if (profiles.length >= maxProfilesPerAccount) {
        return { error: "Profile limit reached", statusCode: 409 };
      }
      if (profiles.some(profile => profile.normalizedName === nameResult.normalizedName)) {
        return { error: "Profile already exists", statusCode: 409 };
      }

      const profileId = randomId("prof");
      const createdAt = nowIso();
      account.profiles[profileId] = {
        id: profileId,
        name: nameResult.name,
        normalizedName: nameResult.normalizedName,
        state: sanitizeJsonValue(body.state || {}),
        progress: sanitizeJsonValue(body.progress || {}),
        revision: 1,
        createdAt,
        updatedAt: createdAt
      };
      account.updatedAt = createdAt;
      return { profile: publicProfile(account.profiles[profileId]) };
    }, dbPath);

    if (result.error) return sendError(request, response, result.statusCode, result.error);
    return sendJson(request, response, 201, { status: "ok", ...result });
  }

  const profilePath = parseProfilePath(pathname);
  if (!profilePath) return false;

  const auth = await requireAuth(request, dbPath);
  if (auth.error) return sendError(request, response, auth.statusCode, auth.error);
  const profile = getProfile(auth.account, profilePath.profileId);
  if (!profile) return sendError(request, response, 404, "Profile not found");

  if (!profilePath.resource && request.method === "GET") {
    return sendJson(request, response, 200, { status: "ok", profile: publicProfile(profile) });
  }

  if (!profilePath.resource && request.method === "PATCH") {
    const body = await readRequestBody(request);
    const revisionError = ensureRevision(profile, body.revision);
    if (revisionError) return sendError(request, response, revisionError.statusCode || 400, revisionError.error, { currentRevision: revisionError.currentRevision });
    const nameResult = validateName(body.name, "profile name");
    if (nameResult.error) return sendError(request, response, 400, nameResult.error);

    const result = await mutateDb(db => {
      const account = db.accounts[auth.account.id];
      const liveProfile = getProfile(account, profilePath.profileId);
      const liveRevisionError = ensureRevision(liveProfile, body.revision);
      if (liveRevisionError) return { error: liveRevisionError.error, statusCode: liveRevisionError.statusCode || 400, currentRevision: liveRevisionError.currentRevision };
      const duplicate = Object.values(account.profiles).some(item => item.id !== liveProfile.id && item.normalizedName === nameResult.normalizedName);
      if (duplicate) return { error: "Profile already exists", statusCode: 409 };
      liveProfile.name = nameResult.name;
      liveProfile.normalizedName = nameResult.normalizedName;
      liveProfile.revision += 1;
      liveProfile.updatedAt = nowIso();
      account.updatedAt = liveProfile.updatedAt;
      return { profile: publicProfile(liveProfile) };
    }, dbPath);

    if (result.error) return sendError(request, response, result.statusCode, result.error, { currentRevision: result.currentRevision });
    return sendJson(request, response, 200, { status: "ok", ...result });
  }

  if (!profilePath.resource && request.method === "DELETE") {
    const body = await readRequestBody(request);
    const revisionError = ensureRevision(profile, body.revision);
    if (revisionError) return sendError(request, response, revisionError.statusCode || 400, revisionError.error, { currentRevision: revisionError.currentRevision });

    const result = await mutateDb(db => {
      const account = db.accounts[auth.account.id];
      const liveProfile = getProfile(account, profilePath.profileId);
      const liveRevisionError = ensureRevision(liveProfile, body.revision);
      if (liveRevisionError) return { error: liveRevisionError.error, statusCode: liveRevisionError.statusCode || 400, currentRevision: liveRevisionError.currentRevision };
      delete account.profiles[profilePath.profileId];
      account.updatedAt = nowIso();
      return true;
    }, dbPath);

    if (result.error) return sendError(request, response, result.statusCode, result.error, { currentRevision: result.currentRevision });
    return sendJson(request, response, 200, { status: "ok" });
  }

  if (profilePath.resource === "state" && request.method === "GET") {
    return sendJson(request, response, 200, {
      status: "ok",
      profile: publicProfile(profile),
      state: profile.state || {}
    });
  }

  if (profilePath.resource === "progress" && request.method === "GET") {
    return sendJson(request, response, 200, {
      status: "ok",
      profile: publicProfile(profile),
      progress: profile.progress || {}
    });
  }

  if (["state", "progress"].includes(profilePath.resource) && request.method === "PUT") {
    const body = await readRequestBody(request);
    const revisionError = ensureRevision(profile, body.revision);
    if (revisionError) return sendError(request, response, revisionError.statusCode || 400, revisionError.error, { currentRevision: revisionError.currentRevision });
    const field = profilePath.resource;
    const nextValue = sanitizeJsonValue(body[field] || body.value || {});

    const result = await mutateDb(db => {
      const account = db.accounts[auth.account.id];
      const liveProfile = getProfile(account, profilePath.profileId);
      const liveRevisionError = ensureRevision(liveProfile, body.revision);
      if (liveRevisionError) return { error: liveRevisionError.error, statusCode: liveRevisionError.statusCode || 400, currentRevision: liveRevisionError.currentRevision };
      liveProfile[field] = nextValue;
      liveProfile.revision += 1;
      liveProfile.updatedAt = nowIso();
      account.updatedAt = liveProfile.updatedAt;
      return { profile: publicProfile(liveProfile), [field]: liveProfile[field] };
    }, dbPath);

    if (result.error) return sendError(request, response, result.statusCode, result.error, { currentRevision: result.currentRevision });
    return sendJson(request, response, 200, { status: "ok", ...result });
  }

  return false;
}

async function handleMigrationRoutes(request, response, pathname, dbPath) {
  if (pathname !== "/api/migration/local-state" || request.method !== "POST") return false;

  const auth = await requireAuth(request, dbPath);
  if (auth.error) return sendError(request, response, auth.statusCode, auth.error);
  const body = await readRequestBody(request);
  const nameResult = validateName(body.profileName || body.name, "profile name");
  if (nameResult.error) return sendError(request, response, 400, nameResult.error);

  const importedState = sanitizeJsonValue(body.state || {});
  const result = await mutateDb(db => {
    const account = db.accounts[auth.account.id];
    account.profiles = account.profiles || {};
    const profiles = Object.values(account.profiles);
    let profile = profiles.find(item => item.normalizedName === nameResult.normalizedName);

    if (!profile) {
      if (profiles.length >= maxProfilesPerAccount) {
        return { error: "Profile limit reached", statusCode: 409 };
      }
      const profileId = randomId("prof");
      const createdAt = nowIso();
      profile = account.profiles[profileId] = {
        id: profileId,
        name: nameResult.name,
        normalizedName: nameResult.normalizedName,
        state: {},
        progress: {},
        revision: 0,
        createdAt,
        updatedAt: createdAt
      };
    }

    profile.state = importedState;
    profile.progress = sanitizeJsonValue(importedState.practiceProgress || {});
    profile.revision += 1;
    profile.updatedAt = nowIso();
    account.updatedAt = profile.updatedAt;
    return { profile: publicProfile(profile), state: profile.state, progress: profile.progress };
  }, dbPath);

  if (result.error) return sendError(request, response, result.statusCode, result.error);
  return sendJson(request, response, 200, { status: "ok", ...result });
}

async function handleContentRoutes(request, response, pathname, staticRoot) {
  if (pathname === "/api/health") {
    sendJson(request, response, 200, {
      status: "ok",
      app: "FlyKey"
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
  if (await handleAccountRoutes(request, response, pathname, options.dbPath)) return true;
  if (await handleProfileRoutes(request, response, pathname, options.dbPath)) return true;
  if (await handleMigrationRoutes(request, response, pathname, options.dbPath)) return true;

  if (pathname.startsWith("/api/")) {
    sendError(request, response, 404, "API route not found");
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
      "Cache-Control": extension === ".html" ? "no-store" : "public, max-age=3600",
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
    dbPath: options.dbPath || defaultDbPath,
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
    rootDir: options.rootDir || rootDir,
    dbPath: options.dbPath || defaultDbPath
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
    console.log(`FlyKey server is running at ${url}`);
    console.log(`Roadmap is available at ${url}/roadmap.html`);
    console.log(`Project root: ${pathToFileURL(rootDir).href}`);
  });
}

module.exports = {
  createServer,
  startServer,
  readDb,
  defaultDbPath
};
