#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const rootDir = path.resolve(__dirname, "..");
const storyboardPath = path.join(rootDir, "practice-content", "storyboard.js");
const bundlePath = path.join(rootDir, "practice-content", "content-bundle.json");
const keyImageDir = path.join(rootDir, "assets", "key");
const languages = ["ru", "uk", "kk", "de", "en"];

function usage() {
  console.error("Usage: npm run storyboard:apply -- <path-to-roadmap-json>");
  process.exit(1);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Could not read JSON from ${filePath}: ${error.message}`);
  }
}

function lessonIdsFromBundle() {
  const bundle = readJson(bundlePath);
  return (bundle.modules || []).flatMap(module => (module.lessons || []).map(lesson => lesson.id));
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function assertImageExists(fileName, fieldPath) {
  if (typeof fileName !== "string" || !fileName.trim()) {
    throw new Error(`${fieldPath} must be a non-empty image file name`);
  }

  const imagePath = path.join(keyImageDir, fileName);
  if (!fs.existsSync(imagePath)) {
    throw new Error(`${fieldPath} references missing image: ${fileName}`);
  }
}

function assertLocalizedText(value, fieldPath) {
  if (!isPlainObject(value)) {
    throw new Error(`${fieldPath} must be a localized object`);
  }

  languages.forEach(language => {
    if (typeof value[language] !== "string" || !value[language].trim()) {
      throw new Error(`${fieldPath}.${language} must be a non-empty string`);
    }
  });
}

function normalizedStoryboardFromExport(exportData) {
  const source = exportData.lessonStoryboard || exportData;
  if (!isPlainObject(source)) {
    throw new Error("Export must contain a lessonStoryboard object");
  }

  const lessonIds = lessonIdsFromBundle();
  const result = {};

  lessonIds.forEach(lessonId => {
    const entry = source[lessonId];
    if (!isPlainObject(entry)) {
      throw new Error(`Missing storyboard entry for ${lessonId}`);
    }

    assertImageExists(entry.introImage, `${lessonId}.introImage`);
    assertImageExists(entry.completionImage, `${lessonId}.completionImage`);
    assertLocalizedText(entry.completionText, `${lessonId}.completionText`);

    result[lessonId] = {
      introImage: entry.introImage,
      completionImage: entry.completionImage,
      completionText: Object.fromEntries(languages.map(language => [language, entry.completionText[language]]))
    };
  });

  Object.keys(source).forEach(lessonId => {
    if (!lessonIds.includes(lessonId)) {
      console.warn(`Warning: ignoring unknown lesson id ${lessonId}`);
    }
  });

  return result;
}

function stableLocalizedKey(value) {
  return JSON.stringify(Object.fromEntries(languages.map(language => [language, value[language]])));
}

function mostCommonCompletionText(storyboard) {
  const counts = new Map();
  Object.values(storyboard).forEach(entry => {
    const key = stableLocalizedKey(entry.completionText);
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  const [key] = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0] || [];
  return key ? JSON.parse(key) : Object.fromEntries(languages.map(language => [language, ""]));
}

function jsString(value) {
  return JSON.stringify(value);
}

function jsLocalizedObject(value, indent = "  ") {
  const lines = ["{"];
  languages.forEach((language, index) => {
    const comma = index === languages.length - 1 ? "" : ",";
    lines.push(`${indent}${language}: ${jsString(value[language])}${comma}`);
  });
  lines.push(`${indent.slice(2)}}`);
  return lines.join("\n");
}

function storyboardJs(storyboard) {
  const defaultCompletionText = mostCommonCompletionText(storyboard);
  const defaultKey = stableLocalizedKey(defaultCompletionText);
  const lines = [
    "const flyKeyDefaultCompletionText = " + jsLocalizedObject(defaultCompletionText, "  ") + ";",
    "",
    "function flyKeyLessonStoryboardEntry(introImage, completionImage, completionText = flyKeyDefaultCompletionText) {",
    "  return { introImage, completionImage, completionText };",
    "}",
    "",
    "window.FLYKEY_LESSON_STORYBOARD = {"
  ];

  const entries = Object.entries(storyboard);
  entries.forEach(([lessonId, entry], index) => {
    const completionArg = stableLocalizedKey(entry.completionText) === defaultKey
      ? ""
      : ", " + jsLocalizedObject(entry.completionText, "    ").replace(/\n/g, "\n  ");
    const comma = index === entries.length - 1 ? "" : ",";
    lines.push(`  ${lessonId}: flyKeyLessonStoryboardEntry(${jsString(entry.introImage)}, ${jsString(entry.completionImage)}${completionArg})${comma}`);
  });

  lines.push("};", "");
  return lines.join("\n");
}

function runNodeScript(scriptPath) {
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: rootDir,
    encoding: "utf8",
    stdio: "inherit"
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

const inputPath = process.argv[2];
if (!inputPath) usage();

const absoluteInputPath = path.resolve(process.cwd(), inputPath.replace(/^~(?=$|\/)/, process.env.HOME || "~"));
const exportData = readJson(absoluteInputPath);
const storyboard = normalizedStoryboardFromExport(exportData);

fs.writeFileSync(storyboardPath, storyboardJs(storyboard));
console.log(`Updated ${path.relative(rootDir, storyboardPath)}`);

runNodeScript(path.join(rootDir, "scripts", "build-content-bundle.js"));
runNodeScript(path.join(rootDir, "scripts", "validate-content-bundle.js"));
