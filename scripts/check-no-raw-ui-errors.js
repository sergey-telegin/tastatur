#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const files = [
  "app/controllers/settings-controller.js",
  "app/controllers/custom-practice-controller.js",
  "app/controllers/practice-controller.js"
];

const forbidden = [
  /textContent\s*=\s*[^;\n]*(?:error|result|payload)[^;\n]*\.message/,
  /renderCloudSyncPanel\([^;\n]*(?:error|result|payload)[^;\n]*\.message/,
  /return\s+message\s*(?:\|\||\?\?)/
];

const failures = [];

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
