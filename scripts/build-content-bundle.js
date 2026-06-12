#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "practice-content", "content-bundle.json");
const moduleFiles = Array.from({ length: 12 }, (_, index) => `practice-content/modules/module${index + 1}.js`);
const sourceFiles = [
  "practice-content/content-version.js",
  "practice-content.js",
  ...moduleFiles,
  "practice-content/storyboard.js",
  "app/practice-content-builder.js",
  "app/content-provider.js"
];

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

function keyImageFileExists(fileName) {
  const keyImageDir = path.join(rootDir, "assets", "key");
  return fs.existsSync(path.join(keyImageDir, fileName));
}

function addKeyImageFile(files, fileName) {
  if (typeof fileName !== "string") return;
  const normalized = fileName.trim();
  if (!normalized || !/\.(png|webp)$/i.test(normalized)) return;
  if (!keyImageFileExists(normalized)) {
    throw new Error(`Referenced key image is missing: ${normalized}`);
  }
  files.add(normalized);
}

function referencedKeyImageFiles(bundle) {
  const files = new Set();

  (bundle.welcomeStoryboard?.screens || []).forEach(screen => addKeyImageFile(files, screen.image));
  (bundle.onboardingStoryboard?.screens || []).forEach(screen => addKeyImageFile(files, screen.image));
  Object.values(bundle.storyboard || {}).forEach(entry => {
    addKeyImageFile(files, entry?.introImage);
    addKeyImageFile(files, entry?.completionImage);
  });
  (bundle.modules || []).forEach(module => {
    (module.lessons || []).forEach(lesson => {
      addKeyImageFile(files, lesson.introImage);
      addKeyImageFile(files, lesson.completionImage);
    });
  });

  return Array.from(files).sort();
}

function buildContentBundle() {
  const context = createBuildContext();
  sourceFiles.forEach(file => runFile(context, file));

  const provider = context.window.FlyKeyContentProvider;
  if (!provider?.getContentBundle) {
    throw new Error("FlyKeyContentProvider did not initialize");
  }

  const bundle = provider.getContentBundle();
  const lessonCount = (bundle.modules || []).reduce((count, module) => count + (module.lessons?.length || 0), 0);

  return {
    ...bundle,
    meta: {
      ...(bundle.meta || {}),
      moduleCount: bundle.modules?.length || 0,
      lessonCount
    },
    assets: {
      ...(bundle.assets || {}),
      keyImages: bundle.assets?.keyImages || "assets/key/",
      keyImageFiles: referencedKeyImageFiles(bundle)
    }
  };
}

const bundle = buildContentBundle();
fs.writeFileSync(outputPath, `${JSON.stringify(bundle, null, 2)}\n`);
console.log(`Wrote ${path.relative(rootDir, outputPath)} (${bundle.meta.moduleCount} modules, ${bundle.meta.lessonCount} lessons)`);
