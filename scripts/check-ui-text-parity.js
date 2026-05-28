#!/usr/bin/env node

const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("app/data.js", "utf8");
const context = {};
vm.createContext(context);
vm.runInContext(`${source}\nglobalThis.__uiText = uiText;`, context);

const uiText = context.__uiText;
const baseLanguage = "en";
const languages = Object.keys(uiText).sort();
const failures = [];

function typeOf(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function compareShape(base, candidate, path) {
  const baseType = typeOf(base);
  const candidateType = typeOf(candidate);

  if (candidate === undefined) {
    failures.push(`Missing key: ${path}`);
    return;
  }

  if (baseType !== candidateType) {
    failures.push(`Type mismatch at ${path}: expected ${baseType}, got ${candidateType}`);
    return;
  }

  if (baseType === "string") {
    if (!candidate.trim()) failures.push(`Empty text at ${path}`);
    return;
  }

  if (baseType === "array") {
    if (candidate.length !== base.length) {
      failures.push(`Array length mismatch at ${path}: expected ${base.length}, got ${candidate.length}`);
      return;
    }
    base.forEach((item, index) => compareShape(item, candidate[index], `${path}[${index}]`));
    return;
  }

  if (baseType === "object") {
    for (const key of Object.keys(base)) {
      compareShape(base[key], candidate[key], `${path}.${key}`);
    }
  }
}

for (const language of languages) {
  compareShape(uiText[baseLanguage], uiText[language], `uiText.${language}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("UI text parity OK");
