#!/usr/bin/env node

const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const failures = [];
const dataScript = '<script src="app/data.js';
const earlyScript = '<script src="app/early-localization.js';
const dataIndex = html.indexOf(dataScript);
const earlyIndex = html.indexOf(earlyScript);
const allDataScripts = html.match(/<script src="app\/data\.js/g) || [];

if (html.includes("const copy = {")) {
  failures.push("index.html contains a duplicate inline localization copy");
}

if (allDataScripts.length !== 1) {
  failures.push(`index.html must load app/data.js exactly once, found ${allDataScripts.length}`);
}

if (dataIndex === -1) {
  failures.push("index.html does not load app/data.js");
}

if (earlyIndex === -1) {
  failures.push("index.html does not load app/early-localization.js");
}

if (dataIndex !== -1 && earlyIndex !== -1 && dataIndex > earlyIndex) {
  failures.push("app/data.js must load before app/early-localization.js");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Index single UI source OK");
