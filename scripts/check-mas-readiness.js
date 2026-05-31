#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const failures = [];

function read(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function assertFile(relativePath) {
  assert(fs.existsSync(path.join(rootDir, relativePath)), `${relativePath} is missing`);
}

const packageJson = JSON.parse(read("package.json"));
const forgeConfig = read("forge.config.js");
const indexHtml = read("index.html");
const desktopMain = read("desktop/main.js");
const desktopPreload = read("desktop/preload.js");
const apiClient = read("app/api-client.js");
const privacyConsent = read("app/privacy-consent.js");
const storyboardController = read("app/controllers/lesson-storyboard-controller.js");
const settingsView = read("app/views/settings-view.js");

assertFile("build/entitlements.mas.plist");
assertFile("build/entitlements.mas.inherit.plist");
assertFile("build/icon.icns");

assert(!packageJson.config?.forge, "Electron Forge config must live in forge.config.js, not package.json");
assert(packageJson.scripts?.["package:mas"], "package:mas script is missing");
assert(packageJson.scripts?.["make:mas"], "make:mas script is missing");
assert(packageJson.devDependencies?.["@electron-forge/maker-pkg"], "@electron-forge/maker-pkg is missing");

assert(forgeConfig.includes("FLYKEY_BUILD_TARGET"), "forge.config.js must switch MAS configuration by FLYKEY_BUILD_TARGET");
assert(forgeConfig.includes("@electron-forge/maker-pkg"), "forge.config.js must include maker-pkg for MAS package output");
assert(forgeConfig.includes("entitlements.mas.plist"), "MAS parent entitlements are not wired");
assert(forgeConfig.includes("entitlements.mas.inherit.plist"), "MAS inherit entitlements are not wired");
assert(forgeConfig.includes("FLYKEY_MAC_INSTALLER_IDENTITY"), "MAS pkg maker must read installer signing identity from env");
assert(forgeConfig.includes('icon: path.join(__dirname, "build", "icon")'), "forge.config.js must use the FlyKey app icon");
assert(forgeConfig.includes("CFBundleShortVersionString"), "forge.config.js must pin the App Store marketing version");
assert(forgeConfig.includes("NSAllowsArbitraryLoads: false"), "App Transport Security must not allow arbitrary loads");
assert(forgeConfig.includes("sanitizeMacInfoPlist"), "forge.config.js must sanitize inherited Electron privacy permissions");
assert(forgeConfig.includes("postPackage"), "forge.config.js must sanitize packaged macOS metadata after packaging");

const masEntitlements = read("build/entitlements.mas.plist");
const masInheritEntitlements = read("build/entitlements.mas.inherit.plist");
assert(masEntitlements.includes("com.apple.security.app-sandbox"), "MAS entitlements must enable App Sandbox");
assert(masInheritEntitlements.includes("com.apple.security.inherit"), "MAS inherit entitlements must enable inherit");

assert(desktopMain.includes('desktop: "1"'), "desktop/main.js must mark Electron runtime as desktop");
assert(desktopMain.includes("app.isPackaged"), "desktop/main.js must pass packaged/production state");
assert(desktopPreload.includes("isDesktop: true"), "desktop/preload.js must expose desktop runtime");
assert(indexHtml.includes("FlyKeyRuntime"), "index.html must initialize FlyKeyRuntime");
assert(indexHtml.includes("Object.defineProperty"), "FlyKeyRuntime must be pinned as a stable runtime value");
assert(indexHtml.includes("data-flykey-desktop"), "index.html must mark desktop DOM state");
assert(indexHtml.includes(".seo-content"), "index.html must hide SEO content in desktop runtime");
assert(indexHtml.includes('return "disabled"'), "analytics must be disabled in desktop runtime");
assert(privacyConsent.includes("dataset.flykeyDesktop"), "privacy consent must be disabled in desktop runtime");
assert(storyboardController.includes("dataset.flykeyProduction"), "storyboard mode must be disabled in desktop production");
assert(apiClient.includes("backendBaseUrl: null"), "backendBaseUrl must not default to localhost");
assert(apiClient.includes("isDesktopProduction"), "backend config must be ignored in desktop production");
assert(apiClient.includes("flyKeyIsLocalPage"), "backendBaseUrl query override must be limited to local development pages");
assert(apiClient.includes("deleteMe(accessToken)"), "account deletion API client method is missing");
assert(settingsView.includes("isBackendConfigured"), "cloud/account UI must hide when backend is not configured");
assert(settingsView.includes("cloudDelete.disabled = !isConnected"), "account deletion UI must stay disabled until signed in");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("MAS readiness check OK");
