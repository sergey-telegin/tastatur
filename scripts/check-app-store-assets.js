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

assertFile("privacy.html");
assertFile("support.html");
assertFile("docs/app-store-metadata.md");
assertFile("docs/apple-developer-setup.md");

const privacy = read("privacy.html");
const support = read("support.html");
const metadata = read("docs/app-store-metadata.md");
const setup = read("docs/apple-developer-setup.md");
const screenshotDir = path.join(rootDir, "docs", "app-store", "screenshots", "mac");
const screenshots = fs.existsSync(screenshotDir)
  ? fs.readdirSync(screenshotDir).filter(file => /\.(jpe?g|png)$/i.test(file)).sort()
  : [];

assert(privacy.includes("FlyKey Privacy Policy"), "privacy.html must include a privacy title");
assert(privacy.includes("does not collect personal data"), "privacy.html must state current no-collection behavior");
assert(privacy.includes("support@flykey.org"), "privacy.html must include support contact");
assert(support.includes("FlyKey Support"), "support.html must include a support title");
assert(support.includes("/privacy.html"), "support.html must link to privacy policy");
assert(metadata.includes("Privacy Policy URL: https://flykey.org/privacy.html"), "metadata must include privacy URL");
assert(metadata.includes("Support URL: https://flykey.org/support.html"), "metadata must include support URL");
assert(metadata.includes("Data collected: No"), "metadata must include App Privacy answer");
assert(setup.includes("org.flykey.app"), "Apple setup must include bundle ID");
assert(setup.includes("FLYKEY_MAC_APP_STORE_IDENTITY"), "Apple setup must include app signing identity env var");
assert(setup.includes("FLYKEY_MAC_INSTALLER_IDENTITY"), "Apple setup must include installer signing identity env var");
assert(screenshots.length >= 5, "at least five Mac App Store screenshots are expected");
screenshots.forEach(file => {
  const screenshot = fs.readFileSync(path.join(screenshotDir, file));
  const header = screenshot.subarray(0, 3).toString("hex");
  assert(header === "ffd8ff" || header === "89504e", `${file} must be a JPG or PNG screenshot`);
});

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("App Store assets check OK");
