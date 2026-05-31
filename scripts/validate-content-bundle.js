#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const rootDir = path.resolve(__dirname, "..");
const bundlePath = path.resolve(rootDir, process.argv[2] || "practice-content/content-bundle.json");
const storyboardPath = path.join(rootDir, "practice-content", "storyboard.js");
const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function localizedObjectHasLanguages(value, languages, fieldPath) {
  if (!isPlainObject(value)) {
    fail(`${fieldPath} must be a localized object`);
    return;
  }

  languages.forEach(language => {
    if (!(language in value)) {
      fail(`${fieldPath} is missing ${language}`);
      return;
    }

    const localized = value[language];
    if (Array.isArray(localized)) {
      if (!localized.length) fail(`${fieldPath}.${language} is empty`);
      return;
    }

    if (typeof localized !== "string" || !localized.trim()) {
      fail(`${fieldPath}.${language} is empty`);
    }
  });
}

function localizedLinesHaveContent(lines, languages, fieldPath) {
  if (!isPlainObject(lines)) {
    fail(`${fieldPath} must be a localized object`);
    return;
  }

  languages.forEach(language => {
    const localized = lines[language];
    if (!Array.isArray(localized) || !localized.length) {
      fail(`${fieldPath}.${language} must contain lines`);
      return;
    }

    localized.forEach((line, index) => {
      if (typeof line !== "string" || !line.trim()) {
        fail(`${fieldPath}.${language}[${index}] is empty`);
      }
    });
  });
}

function imageExists(fileName, fieldPath) {
  if (!fileName) return;
  const imagePath = path.join(rootDir, "assets", "key", fileName);
  if (!fs.existsSync(imagePath)) {
    fail(`${fieldPath} references missing image ${fileName}`);
  }
}

function collectStoryboardImages(bundle) {
  const images = new Set();
  (bundle.onboardingStoryboard?.screens || []).forEach(screen => {
    if (typeof screen.image === "string" && screen.image.trim()) images.add(screen.image.trim());
  });
  (bundle.modules || []).forEach(module => {
    (module.lessons || []).forEach(lesson => {
      [lesson.introImage, lesson.completionImage].forEach(image => {
        if (typeof image === "string" && image.trim()) images.add(image.trim());
      });
    });
  });
  return images;
}

function readLessonStoryboard() {
  if (!fs.existsSync(storyboardPath)) {
    fail("practice-content/storyboard.js is required");
    return {};
  }

  const window = {};
  window.window = window;
  vm.runInNewContext(fs.readFileSync(storyboardPath, "utf8"), { window }, { filename: storyboardPath });
  return window.FLYKEY_LESSON_STORYBOARD || {};
}

function validateLessonStoryboard(storyboard, lessonIds, languages) {
  if (!isPlainObject(storyboard)) {
    fail("FLYKEY_LESSON_STORYBOARD must be an object");
    return;
  }

  lessonIds.forEach(lessonId => {
    const entry = storyboard[lessonId];
    const fieldPath = `storyboard.${lessonId}`;

    if (!isPlainObject(entry)) {
      fail(`${fieldPath} must be an object`);
      return;
    }

    if (!entry.introImage) fail(`${fieldPath}.introImage is required`);
    if (!entry.completionImage) fail(`${fieldPath}.completionImage is required`);
    imageExists(entry.introImage, `${fieldPath}.introImage`);
    imageExists(entry.completionImage, `${fieldPath}.completionImage`);
    if (entry.introTip !== undefined && entry.introTip !== null) {
      localizedObjectHasLanguages(entry.introTip, languages, `${fieldPath}.introTip`);
    }
    if (entry.nextModuleText !== undefined && entry.nextModuleText !== null) {
      localizedObjectHasLanguages(entry.nextModuleText, languages, `${fieldPath}.nextModuleText`);
    }
    localizedObjectHasLanguages(entry.completionText, languages, `${fieldPath}.completionText`);
  });

  Object.keys(storyboard).forEach(lessonId => {
    if (!lessonIds.has(lessonId)) fail(`storyboard.${lessonId} does not match a known lesson id`);
  });
}

function validateOnboardingStoryboard(onboardingStoryboard, languages) {
  if (!onboardingStoryboard) return;
  if (!isPlainObject(onboardingStoryboard)) {
    fail("onboardingStoryboard must be an object");
    return;
  }
  if (onboardingStoryboard.screens === undefined) return;
  if (!Array.isArray(onboardingStoryboard.screens)) {
    fail("onboardingStoryboard.screens must be an array");
    return;
  }

  onboardingStoryboard.screens.forEach((screen, index) => {
    const fieldPath = `onboardingStoryboard.screens[${index}]`;
    if (!isPlainObject(screen)) {
      fail(`${fieldPath} must be an object`);
      return;
    }
    if (screen.image) imageExists(screen.image, `${fieldPath}.image`);
    localizedObjectHasLanguages(screen.text, languages, `${fieldPath}.text`);
  });
}

function validateBundle(bundle) {
  if (!isPlainObject(bundle)) fail("bundle must be an object");
  if (!isPlainObject(bundle.meta)) fail("meta must be an object");
  if (!bundle.meta?.version) fail("meta.version is required");

  const languages = bundle.languages;
  if (!Array.isArray(languages) || !languages.length) {
    fail("languages must be a non-empty array");
    return;
  }

  if (!isPlainObject(bundle.grades)) fail("grades must be an object");
  languages.forEach(language => {
    if (!Array.isArray(bundle.grades?.[language]) || !bundle.grades[language].length) {
      fail(`grades.${language} must be a non-empty array`);
    }
  });

  if (!Array.isArray(bundle.modules) || !bundle.modules.length) {
    fail("modules must be a non-empty array");
    return;
  }

  if (bundle.meta.moduleCount !== undefined && bundle.meta.moduleCount !== bundle.modules.length) {
    fail(`meta.moduleCount is ${bundle.meta.moduleCount}, actual is ${bundle.modules.length}`);
  }

  const lessonIds = new Set();
  let lessonCount = 0;

  bundle.modules.forEach((module, moduleIndex) => {
    const modulePath = `modules[${moduleIndex}]`;
    if (!module.id) fail(`${modulePath}.id is required`);
    localizedObjectHasLanguages(module.title, languages, `${modulePath}.title`);

    if (!Array.isArray(module.lessons) || !module.lessons.length) {
      fail(`${modulePath}.lessons must be a non-empty array`);
      return;
    }

    module.lessons.forEach((lesson, lessonIndex) => {
      lessonCount += 1;
      const lessonPath = `${modulePath}.lessons[${lessonIndex}]`;
      if (!lesson.id) {
        fail(`${lessonPath}.id is required`);
      } else if (lessonIds.has(lesson.id)) {
        fail(`duplicate lesson id ${lesson.id}`);
      } else {
        lessonIds.add(lesson.id);
      }

      localizedObjectHasLanguages(lesson.title, languages, `${lessonPath}.title`);
      localizedObjectHasLanguages(lesson.tips, languages, `${lessonPath}.tips`);
      localizedLinesHaveContent(lesson.lines, languages, `${lessonPath}.lines`);

      if (!isPlainObject(lesson.target)) fail(`${lessonPath}.target must be an object`);
      if (lesson.target?.lines !== undefined && (!Number.isFinite(lesson.target.lines) || lesson.target.lines <= 0)) {
        fail(`${lessonPath}.target.lines must be a positive number`);
      }
      if (lesson.target?.accuracy !== undefined && (!Number.isFinite(lesson.target.accuracy) || lesson.target.accuracy <= 0 || lesson.target.accuracy > 100)) {
        fail(`${lessonPath}.target.accuracy must be between 1 and 100`);
      }

      imageExists(lesson.introImage, `${lessonPath}.introImage`);
      imageExists(lesson.completionImage, `${lessonPath}.completionImage`);
    });
  });

  if (bundle.meta.lessonCount !== undefined && bundle.meta.lessonCount !== lessonCount) {
    fail(`meta.lessonCount is ${bundle.meta.lessonCount}, actual is ${lessonCount}`);
  }

  validateLessonStoryboard(readLessonStoryboard(), lessonIds, languages);
  validateLessonStoryboard(bundle.storyboard, lessonIds, languages);
  validateOnboardingStoryboard(bundle.onboardingStoryboard, languages);

  const storyboardImages = collectStoryboardImages(bundle);
  storyboardImages.forEach(file => imageExists(file, "storyboard image"));

  if (!bundle.assets?.keyImages) {
    fail("assets.keyImages is required");
  }

  if (bundle.assets?.keyImageFiles !== undefined) {
    if (!Array.isArray(bundle.assets.keyImageFiles) || !bundle.assets.keyImageFiles.length) {
      fail("assets.keyImageFiles must be a non-empty array when provided");
    } else {
      bundle.assets.keyImageFiles.forEach((file, index) => {
        if (typeof file !== "string" || !file.trim()) {
          fail(`assets.keyImageFiles[${index}] must be a file name`);
          return;
        }
        imageExists(file, `assets.keyImageFiles[${index}]`);
      });
    }
  }
}

const bundle = JSON.parse(fs.readFileSync(bundlePath, "utf8"));
validateBundle(bundle);

warnings.forEach(message => console.warn(`Warning: ${message}`));

if (errors.length) {
  errors.forEach(message => console.error(`Error: ${message}`));
  process.exit(1);
}

console.log(`Content bundle OK: ${bundle.meta.version} (${bundle.modules.length} modules, ${bundle.meta.lessonCount || "?"} lessons)`);
