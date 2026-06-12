#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const roots = [
  "app/controllers",
  "app/views",
  "app/privacy-consent.js"
];

const forbidden = [
  /textContent\s*=\s*[^;\n]*(?:error|result|payload)[^;\n]*\.message/,
  /renderCloudSyncPanel\([^;\n]*(?:error|result|payload)[^;\n]*\.message/,
  /return\s+message\s*(?:\|\||\?\?)/
];

const failures = [];

function collectFiles(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return target.endsWith(".js") ? [target] : [];
  return fs.readdirSync(target, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(target, entry.name);
    return entry.isDirectory() ? collectFiles(entryPath) : collectFiles(entryPath);
  });
}

const files = roots.flatMap(collectFiles);

for (const file of files) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    if (forbidden.some(pattern => pattern.test(line))) {
      failures.push(`${path.normalize(file)}:${index + 1}: ${line.trim()}`);
    }
  });
}

if (failures.length) {
  console.error("Raw technical error text can leak into UI:");
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Raw UI error leak check OK");
