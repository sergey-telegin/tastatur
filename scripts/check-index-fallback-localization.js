#!/usr/bin/env node

const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const cyrillicPattern = /[\u0400-\u04ff]/;
const staticHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

if (cyrillicPattern.test(staticHtml)) {
  const line = staticHtml.slice(0, staticHtml.search(cyrillicPattern)).split("\n").length;
  throw new Error(`Cyrillic text found in default index.html fallback around line ${line}`);
}

console.log("Index fallback localization OK");
