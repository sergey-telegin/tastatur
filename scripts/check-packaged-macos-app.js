#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const appPath = path.join(rootDir, "out", "FlyKey-darwin-arm64", "FlyKey.app");
const infoPlist = path.join(appPath, "Contents", "Info.plist");
const iconPath = path.join(appPath, "Contents", "Resources", "electron.icns");
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function plistValue(key) {
  try {
    return execFileSync("plutil", ["-extract", key, "raw", infoPlist], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return null;
  }
}

assert(fs.existsSync(infoPlist), "Packaged FlyKey.app is missing. Run npm run package:mac first.");
assert(plistValue("CFBundleIdentifier") === "org.flykey.app", "Packaged app bundle id must be org.flykey.app");
assert(plistValue("CFBundleShortVersionString") === "1.0.0", "Packaged app marketing version must be 1.0.0");
assert(plistValue("CFBundleVersion") === "1.0.0", "Packaged app build version must be 1.0.0");
assert(plistValue("NSAppTransportSecurity.NSAllowsArbitraryLoads") === "false", "Packaged app must not allow arbitrary network loads");

for (const key of [
  "NSBluetoothAlwaysUsageDescription",
  "NSBluetoothPeripheralUsageDescription",
  "NSCameraUsageDescription",
  "NSMicrophoneUsageDescription"
]) {
  assert(plistValue(key) === null, `Packaged app must not declare ${key}`);
}

assert(fs.existsSync(iconPath), "Packaged app icon is missing");
assert(fs.statSync(iconPath).size > 100000, "Packaged app icon still looks like a placeholder");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Packaged macOS app check OK");
