#!/usr/bin/env node

const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { startServer } = require("../server/server.js");

async function requestJson(baseUrl, method, pathname, body, token) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    method,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await response.json();
  return { response, data };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "flykey-api-"));
  const dbPath = path.join(tmpDir, "flykey-db.json");
  const { server, url } = await startServer({ host: "127.0.0.1", port: 0, dbPath });

  try {
    let result = await requestJson(url, "GET", "/api/health");
    assert(result.response.status === 200 && result.data.status === "ok", "health check failed");

    result = await requestJson(url, "POST", "/api/accounts", { name: "Family", password: "strong-password" });
    assert(result.response.status === 201, "account creation failed");
    const token = result.data.token;
    assert(token, "account token missing");

    result = await requestJson(url, "POST", "/api/profiles", { name: "Лиза" }, token);
    assert(result.response.status === 201, "profile creation failed");
    const profile = result.data.profile;
    assert(profile.revision === 1, "profile revision should start at 1");

    result = await requestJson(url, "POST", "/api/profiles", { name: " лиза " }, token);
    assert(result.response.status === 409, "duplicate profile should conflict");

    result = await requestJson(url, "PUT", `/api/profiles/${profile.id}/state`, {
      revision: profile.revision,
      state: { currentLanguage: "ru", practiceProgress: { ru: { lesson1_1: { completedLines: 2 } } } }
    }, token);
    assert(result.response.status === 200, "state update failed");
    const updatedProfile = result.data.profile;
    assert(updatedProfile.revision === 2, "state update should increment revision");

    result = await requestJson(url, "PUT", `/api/profiles/${profile.id}/state`, {
      revision: profile.revision,
      state: { currentLanguage: "en" }
    }, token);
    assert(result.response.status === 409, "stale revision should conflict");

    result = await requestJson(url, "POST", "/api/migration/local-state", {
      profileName: "Инна",
      state: { currentLanguage: "uk", practiceProgress: { uk: { lesson1_1: { completedLines: 1 } } } }
    }, token);
    assert(result.response.status === 200, "local state migration failed");
    assert(result.data.profile.name === "Инна", "migration profile name mismatch");

    result = await requestJson(url, "GET", "/api/profiles", null, token);
    assert(result.response.status === 200 && result.data.profiles.length === 2, "profile list failed");

    console.log("Server API smoke OK");
  } finally {
    await new Promise(resolve => server.close(resolve));
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
