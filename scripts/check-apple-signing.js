#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const appBundleId = "org.flykey.app";
const profileDir = path.join(os.homedir(), "Library", "MobileDevice", "Provisioning Profiles");
const explicitProfilePath = process.env.FLYKEY_PROVISIONING_PROFILE || "";
const failures = [];
const notes = [];

function run(command, args) {
  return spawnSync(command, args, {
    encoding: "utf8"
  });
}

function fail(message) {
  failures.push(message);
}

function note(message) {
  notes.push(message);
}

function findSigningIdentities() {
  const result = run("security", ["find-identity", "-v", "-p", "codesigning"]);
  if (result.status !== 0) {
    fail("Could not read macOS code signing identities from Keychain.");
    return [];
  }

  return result.stdout
    .split("\n")
    .map(line => line.trim())
    .filter(line => /^\d+\)/.test(line));
}

function findProvisioningProfiles() {
  const candidates = [];

  if (explicitProfilePath) {
    candidates.push(explicitProfilePath);
  }

  if (fs.existsSync(profileDir)) {
    for (const file of fs.readdirSync(profileDir)) {
      if (file.endsWith(".provisionprofile")) {
        candidates.push(path.join(profileDir, file));
      }
    }
  }

  return Array.from(new Set(candidates)).filter(file => fs.existsSync(file));
}

function decodeProvisioningProfile(file) {
  const result = run("security", ["cms", "-D", "-i", file]);
  if (result.status !== 0) return "";
  return result.stdout;
}

function profileLooksLikeFlyKeyMas(profilePlist) {
  return profilePlist.includes(appBundleId) &&
    profilePlist.includes("com.apple.application-identifier") &&
    profilePlist.includes("ProvisionedDevices") === false;
}

const identities = findSigningIdentities();
const appIdentity = identities.find(identity => identity.includes("3rd Party Mac Developer Application:"));
const installerIdentity = identities.find(identity => identity.includes("3rd Party Mac Developer Installer:"));
const profiles = findProvisioningProfiles();
const flyKeyProfiles = profiles.filter(file => profileLooksLikeFlyKeyMas(decodeProvisioningProfile(file)));

if (!appIdentity) {
  fail("Missing '3rd Party Mac Developer Application' signing identity.");
}

if (!installerIdentity) {
  fail("Missing '3rd Party Mac Developer Installer' signing identity.");
}

if (!flyKeyProfiles.length) {
  fail(`Missing Mac App Store provisioning profile for ${appBundleId}.`);
}

if (appIdentity) note(`Application identity: ${appIdentity}`);
if (installerIdentity) note(`Installer identity: ${installerIdentity}`);
if (flyKeyProfiles.length) note(`Provisioning profile: ${flyKeyProfiles[0]}`);

if (failures.length) {
  console.error("Apple signing is not ready:");
  for (const message of failures) {
    console.error(`- ${message}`);
  }

  console.error("\nNext steps:");
  console.error(`- Create/confirm a macOS App ID for ${appBundleId}.`);
  console.error("- Install Mac App Store distribution certificates in Keychain.");
  console.error("- Download and install the Mac App Store provisioning profile.");
  console.error("- Re-run: npm run release:check-apple-signing");
  process.exit(1);
}

console.log("Apple signing is ready.");
for (const message of notes) {
  console.log(`- ${message}`);
}

console.log("\nBuild command:");
console.log(`FLYKEY_MAC_APP_STORE_IDENTITY="${appIdentity.match(/"([^"]+)"/)?.[1] || "<application identity>"}" \\`);
console.log(`FLYKEY_MAC_INSTALLER_IDENTITY="${installerIdentity.match(/"([^"]+)"/)?.[1] || "<installer identity>"}" \\`);
console.log(`FLYKEY_PROVISIONING_PROFILE="${flyKeyProfiles[0]}" \\`);
console.log("npm run make:mas");
