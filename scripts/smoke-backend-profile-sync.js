#!/usr/bin/env node

const { spawnSync } = require("node:child_process");

const baseUrl = String(process.env.FLYKEY_BACKEND_URL || "http://127.0.0.1:8084").replace(/\/$/, "");
const backendDir = process.env.FLYKEY_BACKEND_DIR || "/Users/sergeytelegin/FlyKeyBackend";
const grantCommand = process.env.FLYKEY_PROFILE_SYNC_GRANT_COMMAND || "";
const email = `sync-${Date.now()}@flykey.local`;
const password = "Password123!";

async function requestJson(method, pathname, body, accessToken) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    method,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await response.json().catch(() => null);
  return { response, data };
}

function assert(condition, message, data = null) {
  if (condition) return;
  const details = data ? `\n${JSON.stringify(data, null, 2)}` : "";
  throw new Error(`${message}${details}`);
}

function grantProfileSyncEntitlement() {
  const result = grantCommand
    ? spawnSync(formatGrantCommand(grantCommand), {
      encoding: "utf8",
      shell: true
    })
    : spawnSync("php", [
      "bin/console",
      "app:grant-entitlement",
      email,
      "profile_sync"
    ], {
      cwd: backendDir,
      encoding: "utf8"
    });

  if (result.status !== 0) {
    throw new Error(`profile_sync grant failed\n${result.stdout || ""}${result.stderr || ""}`);
  }
}

function formatGrantCommand(command) {
  return command
    .replaceAll("{email}", shellQuote(email))
    .replaceAll("{entitlement}", shellQuote("profile_sync"));
}

function shellQuote(value) {
  return `'${String(value).replaceAll("'", "'\\''")}'`;
}

async function main() {
  let result = await requestJson("GET", "/api/health");
  assert(result.response.status === 200 && result.data?.service === "flykey-backend", "backend health failed", result.data);

  result = await requestJson("POST", "/api/v1/auth/register", {
    email,
    password,
    device: {
      platform: "smoke-sync",
      appVersion: "smoke"
    }
  });
  assert(result.response.status === 201, "registration failed", result.data);
  assert(result.data?.accessToken && result.data?.refreshToken, "tokens missing", result.data);

  const accessToken = result.data.accessToken;

  result = await requestJson("GET", "/api/v1/profiles", null, accessToken);
  assert(result.response.status === 403, "profiles must require profile_sync before entitlement grant", result.data);

  grantProfileSyncEntitlement();

  result = await requestJson("GET", "/api/v1/me/entitlements", null, accessToken);
  assert(result.response.status === 200, "entitlements failed", result.data);
  assert(
    result.data?.profile_sync === true,
    "profile_sync entitlement missing",
    result.data
  );

  result = await requestJson("POST", "/api/v1/migration/local-state", {
    name: "Smoke profile",
    contentVersion: "smoke",
    state: {
      currentLanguage: "en",
      currentPracticeModule: "lesson1_1",
      practiceTextSize: "md"
    },
    progress: {
      lesson1_1: {
        bestAccuracy: 100,
        bestSpeed: 120
      }
    },
    fingerMap: {},
    settings: {
      theme: "light"
    }
  }, accessToken);
  assert(result.response.status === 201, "local state import failed", result.data);
  const profileId = result.data?.id;
  const revision = result.data?.revision;
  assert(profileId && revision, "profile id/revision missing", result.data);

  result = await requestJson("GET", `/api/v1/profiles/${encodeURIComponent(profileId)}/state`, null, accessToken);
  assert(result.response.status === 200, "profile state fetch failed", result.data);
  assert(result.data?.state?.currentLanguage === "en", "profile state did not round-trip", result.data);

  result = await requestJson("PUT", `/api/v1/profiles/${encodeURIComponent(profileId)}/progress`, {
    revision: result.data.revision || revision,
    progress: {
      lesson1_1: {
        bestAccuracy: 100,
        bestSpeed: 140
      }
    }
  }, accessToken);
  assert(result.response.status === 200, "profile progress update failed", result.data);

  result = await requestJson("DELETE", "/api/v1/me", null, accessToken);
  assert(result.response.status === 200, "account deletion failed", result.data);

  console.log("Backend profile sync smoke OK");
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
