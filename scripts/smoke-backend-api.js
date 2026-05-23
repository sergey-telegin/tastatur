#!/usr/bin/env node

const baseUrl = String(process.env.FLYKEY_BACKEND_URL || "http://127.0.0.1:8084").replace(/\/$/, "");
const email = `smoke-${Date.now()}@flykey.local`;
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

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  let result = await requestJson("GET", "/api/health");
  assert(result.response.status === 200 && result.data.service === "flykey-backend", "backend health failed");

  result = await requestJson("POST", "/api/v1/auth/register", {
    email,
    password,
    device: {
      platform: "web",
      appVersion: "0.1.0"
    }
  });
  assert(result.response.status === 201, "registration failed");
  assert(result.data.accessToken && result.data.refreshToken, "tokens missing");

  const accessToken = result.data.accessToken;

  result = await requestJson("GET", "/api/v1/me", null, accessToken);
  assert(result.response.status === 200 && result.data.email === email, "me failed");

  result = await requestJson("GET", "/api/v1/oauth/providers");
  assert(result.response.status === 200 && Array.isArray(result.data.providers), "oauth providers failed");
  assert(result.data.providers.every(provider => ["google", "apple", "microsoft"].includes(provider.id)), "unexpected oauth provider");

  result = await requestJson("GET", "/api/v1/oauth/google/start");
  assert([200, 404].includes(result.response.status), "oauth start should return 200 when configured or 404 when disabled");

  result = await requestJson("GET", "/api/v1/profiles", null, accessToken);
  assert(result.response.status === 403, "profiles must require profile_sync entitlement");

  console.log("Backend API smoke OK");
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
