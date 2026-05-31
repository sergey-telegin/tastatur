#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const rootDir = path.resolve(__dirname, "..");
const sourceFiles = [
  "practice-content/content-version.js",
  "practice-content.js",
  ...Array.from({ length: 12 }, (_, index) => `practice-content/modules/module${index + 1}.js`),
  "practice-content/storyboard.js",
  "app/practice-content-builder.js",
  "app/content-provider.js"
];

const cyrillicPattern = /[\u0400-\u04ff]/;
const latinWordPattern = /[A-Za-z][A-Za-z0-9+_-]*/g;
const ukrainianForbiddenLettersPattern = /[ЁёЫыЭэЪъ]/;
const allowedLatinTokens = new Set([
  "API",
  "CSS",
  "Ctrl",
  "Enter",
  "FlyKey",
  "HTML",
  "JSON",
  "Shift",
  "Tab"
]);
const kazakhRussianWordLeaks = new Set([
  "вал",
  "вода",
  "лава",
  "жало",
  "овал",
  "вдова",
  "элла",
  "мама",
  "папа",
  "тема",
  "кит",
  "мир",
  "тир",
  "рот",
  "тон",
  "гора",
  "нора",
  "нить",
  "книга",
  "прыжок",
  "крышка",
  "мышка",
  "ручка",
  "точка",
  "сучок",
  "мячик",
  "читает",
  "пишет",
  "учит",
  "знает",
  "идет",
  "встала",
  "рада",
  "рядом",
  "дома",
  "стор",
  "трава",
  "правка",
  "строка",
  "горка",
  "тропа",
  "смена",
  "просто",
  "карта"
]);

function runFile(context, relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  const source = fs.readFileSync(absolutePath, "utf8");
  vm.runInContext(source, context, { filename: relativePath });
}

function createBuildContext() {
  const window = {};
  window.window = window;
  window.localStorage = {
    getItem() { return null; },
    setItem() {},
    removeItem() {}
  };

  return vm.createContext({
    window,
    localStorage: window.localStorage,
    console
  });
}

function walk(value, pathParts, visitor) {
  if (typeof value === "string") {
    visitor(value, pathParts.join("."));
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, [...pathParts, `[${index}]`], visitor));
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => walk(item, [...pathParts, key], visitor));
  }
}

function latinTokens(text) {
  return text.match(latinWordPattern) || [];
}

function cyrillicWords(text) {
  return text.toLowerCase().match(/[а-яёіїєґәіңғүұқөһ]+/gi) || [];
}

function isKeyboardMetadata(pathName) {
  return pathName.includes(".symbols.") || pathName.includes(".symbolPolicy.");
}

function isStructuralMetadata(pathName) {
  return pathName.endsWith(".id")
    || pathName.endsWith(".moduleId")
    || pathName.endsWith(".customPractice.type");
}

const context = createBuildContext();
sourceFiles.forEach(file => runFile(context, file));

const practiceContent = context.window.PRACTICE_CONTENT || {};
const storyboard = context.window.FLYKEY_CONTENT_STORYBOARD || {};
const onboardingStoryboard = context.window.FLYKEY_ONBOARDING_STORYBOARD || {};
const failures = [];

["de", "en"].forEach(language => {
  walk(practiceContent[language], [`PRACTICE_CONTENT.${language}`], (text, pathName) => {
    if (isKeyboardMetadata(pathName)) return;
    if (cyrillicPattern.test(text)) {
      failures.push(`${pathName} contains Cyrillic text`);
    }
  });
});

["ru", "uk", "kk"].forEach(language => {
  walk(practiceContent[language], [`PRACTICE_CONTENT.${language}`], (text, pathName) => {
    if (isKeyboardMetadata(pathName) || isStructuralMetadata(pathName)) return;
    const unexpectedTokens = latinTokens(text)
      .filter(token => !allowedLatinTokens.has(token) && !/^[A-Z]$/.test(token));
    if (unexpectedTokens.length) {
      failures.push(`${pathName} contains unexpected Latin token(s): ${unexpectedTokens.join(", ")}`);
    }
  });
});

walk(practiceContent.uk, ["PRACTICE_CONTENT.uk"], (text, pathName) => {
  if (isKeyboardMetadata(pathName)) return;
  if (ukrainianForbiddenLettersPattern.test(text)) {
    failures.push(`${pathName} contains Russian-only Cyrillic letters`);
  }
});

walk(practiceContent.kk, ["PRACTICE_CONTENT.kk"], (text, pathName) => {
  if (isKeyboardMetadata(pathName)) return;
  const leaks = cyrillicWords(text).filter(word => kazakhRussianWordLeaks.has(word));
  if (leaks.length) {
    failures.push(`${pathName} contains Russian word leak(s): ${[...new Set(leaks)].join(", ")}`);
  }
});

["de", "en"].forEach(language => {
  walk(storyboard, ["FLYKEY_CONTENT_STORYBOARD"], (text, pathName) => {
    if (pathName.includes(`.${language}`) && cyrillicPattern.test(text)) {
      failures.push(`${pathName} contains Cyrillic text`);
    }
  });
  walk(onboardingStoryboard, ["FLYKEY_ONBOARDING_STORYBOARD"], (text, pathName) => {
    if (pathName.includes(`.${language}`) && cyrillicPattern.test(text)) {
      failures.push(`${pathName} contains Cyrillic text`);
    }
  });
});

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Content language leak check OK");
