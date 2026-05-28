#!/usr/bin/env node

const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("app/data.js", "utf8");
const context = {};
vm.createContext(context);
vm.runInContext(`${source}\nglobalThis.__uiText = uiText;`, context);

const uiText = context.__uiText;
const cyrillicPattern = /[\u0400-\u04ff]/;
const failures = [];

function walk(value, path, visitor) {
  if (typeof value === "string") {
    visitor(value, path);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, visitor));
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => walk(item, `${path}.${key}`, visitor));
  }
}

["de", "en"].forEach(language => {
  walk(uiText[language], `uiText.${language}`, (text, path) => {
    if (cyrillicPattern.test(text)) {
      failures.push(`${path} contains Cyrillic text`);
    }
  });
});

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("UI language leak check OK");
