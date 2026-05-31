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
    if (entry.introTip !== undefined && entry.introTip !== null) {
      assertLocalizedText(entry.introTip, `${lessonId}.introTip`);
    }
    if (entry.nextModuleText !== undefined && entry.nextModuleText !== null) {
      assertLocalizedText(entry.nextModuleText, `${lessonId}.nextModuleText`);
    }
    assertLocalizedText(entry.completionText, `${lessonId}.completionText`);

    result[lessonId] = {
      introImage: entry.introImage,
      introTip: entry.introTip || null,
      nextModuleText: entry.nextModuleText || null,
      completionImage: entry.completionImage,
      completionText: Object.fromEntries(languages.map(language => [language, entry.completionText[language]])),
      showIntroImage: entry.showIntroImage !== false,
      showIntroTip: entry.showIntroTip !== false,
      showNextModuleText: entry.showNextModuleText !== false,
      showCompletionImage: entry.showCompletionImage !== false,
      showCompletionText: entry.showCompletionText !== false
    };
  });

  Object.keys(source).forEach(lessonId => {
    if (!lessonIds.includes(lessonId)) {
      console.warn(`Warning: ignoring unknown lesson id ${lessonId}`);
    }
  });

  return result;
}

function normalizedOnboardingFromExport(exportData) {
  const source = exportData.onboardingStoryboard;
  if (!source) return null;
  if (!Array.isArray(source.screens)) {
    throw new Error("onboardingStoryboard.screens must be an array");
  }

  return {
    screens: source.screens.map((screen, index) => {
      if (!isPlainObject(screen)) {
        throw new Error(`onboardingStoryboard.screens[${index}] must be an object`);
      }
      if (screen.image) assertImageExists(screen.image, `onboardingStoryboard.screens[${index}].image`);
      assertLocalizedText(screen.text, `onboardingStoryboard.screens[${index}].text`);

      return {
        id: screen.id || `onboarding_${index + 1}`,
        image: screen.image || null,
        text: Object.fromEntries(languages.map(language => [language, screen.text[language]])),
        visible: screen.visible !== false,
        showImage: screen.showImage !== false
      };
    })
  };
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

function jsBoolean(value) {
  return value ? "true" : "false";
}

function storyboardJs(storyboard, onboarding) {
  const defaultCompletionText = mostCommonCompletionText(storyboard);
  const defaultKey = stableLocalizedKey(defaultCompletionText);
  const lines = [
    "const flyKeyDefaultCompletionText = " + jsLocalizedObject(defaultCompletionText, "  ") + ";",
    "",
    "function flyKeyLessonStoryboardEntry(entry) {",
    "  return {",
    "    introImage: entry.introImage,",
    "    introTip: entry.introTip || null,",
    "    nextModuleText: entry.nextModuleText || null,",
    "    completionImage: entry.completionImage,",
    "    completionText: entry.completionText || flyKeyDefaultCompletionText,",
    "    showIntroImage: entry.showIntroImage !== false,",
    "    showIntroTip: entry.showIntroTip !== false,",
    "    showNextModuleText: entry.showNextModuleText !== false,",
    "    showCompletionImage: entry.showCompletionImage !== false,",
    "    showCompletionText: entry.showCompletionText !== false",
    "  };",
    "}",
    ""
  ];

  if (onboarding) {
    lines.push("window.FLYKEY_ONBOARDING_STORYBOARD = {");
    lines.push("  screens: [");
    onboarding.screens.forEach((screen, index) => {
      const comma = index === onboarding.screens.length - 1 ? "" : ",";
      lines.push("    {");
      lines.push(`      id: ${jsString(screen.id)},`);
      lines.push(`      image: ${jsString(screen.image)},`);
      lines.push(`      text: ${jsLocalizedObject(screen.text, "        ").replace(/\n/g, "\n      ")},`);
      lines.push(`      visible: ${jsBoolean(screen.visible)},`);
      lines.push(`      showImage: ${jsBoolean(screen.showImage)}`);
      lines.push(`    }${comma}`);
    });
    lines.push("  ]");
    lines.push("};", "");
  }

  lines.push("window.FLYKEY_LESSON_STORYBOARD = {");

  const entries = Object.entries(storyboard);
  entries.forEach(([lessonId, entry], index) => {
    const comma = index === entries.length - 1 ? "" : ",";
    lines.push(`  ${lessonId}: flyKeyLessonStoryboardEntry({`);
    lines.push(`    introImage: ${jsString(entry.introImage)},`);
    if (entry.introTip) lines.push(`    introTip: ${jsLocalizedObject(entry.introTip, "      ").replace(/\n/g, "\n    ")},`);
    if (entry.nextModuleText) lines.push(`    nextModuleText: ${jsLocalizedObject(entry.nextModuleText, "      ").replace(/\n/g, "\n    ")},`);
    lines.push(`    completionImage: ${jsString(entry.completionImage)},`);
    if (stableLocalizedKey(entry.completionText) !== defaultKey) {
      lines.push(`    completionText: ${jsLocalizedObject(entry.completionText, "      ").replace(/\n/g, "\n    ")},`);
    }
    lines.push(`    showIntroImage: ${jsBoolean(entry.showIntroImage)},`);
    lines.push(`    showIntroTip: ${jsBoolean(entry.showIntroTip)},`);
    lines.push(`    showNextModuleText: ${jsBoolean(entry.showNextModuleText)},`);
    lines.push(`    showCompletionImage: ${jsBoolean(entry.showCompletionImage)},`);
    lines.push(`    showCompletionText: ${jsBoolean(entry.showCompletionText)}`);
    lines.push(`  })${comma}`);
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
const onboarding = normalizedOnboardingFromExport(exportData);

fs.writeFileSync(storyboardPath, storyboardJs(storyboard, onboarding));
console.log(`Updated ${path.relative(rootDir, storyboardPath)}`);

runNodeScript(path.join(rootDir, "scripts", "build-content-bundle.js"));
runNodeScript(path.join(rootDir, "scripts", "validate-content-bundle.js"));
