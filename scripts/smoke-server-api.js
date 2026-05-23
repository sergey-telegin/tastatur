#!/usr/bin/env node

const { startServer } = require("../server/server.js");

async function requestJson(baseUrl, method, pathname) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    method,
    headers: {
      Accept: "application/json"
    }
  });
  const data = await response.json();
  return { response, data };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const { server, url } = await startServer({ host: "127.0.0.1", port: 0 });

  try {
    let result = await requestJson(url, "GET", "/api/health");
    assert(result.response.status === 200 && result.data.status === "ok", "health check failed");
    assert(result.data.service === "flykey-static", "static server service mismatch");

    result = await requestJson(url, "GET", "/api/content/version");
    assert(result.response.status === 200 && result.data.version, "content version failed");

    result = await requestJson(url, "GET", "/api/content/bundle");
    assert(result.response.status === 200 && Array.isArray(result.data.modules), "content bundle failed");

    result = await requestJson(url, "GET", "/api/v1/me");
    assert(result.response.status === 404, "account API must live in FlyKeyBackend");

    console.log("Static server smoke OK");
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
