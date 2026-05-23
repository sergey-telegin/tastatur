#!/usr/bin/env node

const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("app/data.js", "utf8");
const context = {};
vm.createContext(context);
vm.runInContext(`${source}\nglobalThis.__uiText = uiText;`, context);

const uiText = context.__uiText;
const languages = ["de", "en", "ru", "uk", "kk"];
const russianUiPattern = new RegExp([
  "\\u0442\\u0440\\u0435\\u043d\\u0430\\u0436[\\u0435\\u0451]\\u0440",
  "\\u0441\\u043b\\u0435\\u043f\\u043e\\u0439 \\u043f\\u0435\\u0447\\u0430\\u0442\\u0438",
  "\\u043a\\u043b\\u0430\\u0432\\u0438\\u0430\\u0442\\u0443\\u0440\\u043d\\u044b\\u0439 \\u0442\\u0440\\u0435\\u043d\\u0430\\u0436[\\u0435\\u0451]\\u0440",
  "\\u041d\\u0430\\u0441\\u0442\\u0440\\u043e\\u0439\\u043a\\u0438",
  "\\u0422\\u043e\\u0447\\u043d\\u043e\\u0441\\u0442\\u044c",
  "\\u0421\\u043a\\u043e\\u0440\\u043e\\u0441\\u0442\\u044c"
].join("|"));
const cyrillicPattern = /[\u0410-\u042f\u0430-\u044f\u0401\u0451]/;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const language of languages) {
  const seo = uiText?.[language]?.seo;
  assert(seo, `Missing homepage SEO text for ${language}`);
  assert(Array.isArray(seo.nav) && seo.nav.length >= 6, `Missing homepage nav for ${language}`);
  assert(Array.isArray(seo.summary) && seo.summary.length >= 4, `Missing homepage summary for ${language}`);
  assert(Array.isArray(seo.articles) && seo.articles.length >= 5, `Missing homepage articles for ${language}`);
  assert(Array.isArray(seo.faq) && seo.faq.length >= 5, `Missing homepage FAQ for ${language}`);

  const joined = [
    seo.navLabel,
    seo.eyebrow,
    seo.title,
    seo.lead,
    seo.summaryLabel,
    seo.faqTitle,
    ...seo.nav,
    ...seo.summary.flat(),
    ...seo.articles.flat(2),
    ...seo.faq.flat()
  ].join("\n");

  if (language === "de" || language === "en") {
    assert(!russianUiPattern.test(joined), `Russian homepage UI text leaked into ${language}`);
    assert(!cyrillicPattern.test(joined), `Russian Cyrillic leaked into ${language} homepage text`);
  }
}

console.log("Homepage localization OK");
