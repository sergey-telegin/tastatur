#!/usr/bin/env node

const fs = require("node:fs");
const vm = require("node:vm");

function readUiText() {
  const context = {};
  vm.createContext(context);
  vm.runInContext(`${fs.readFileSync("app/data.js", "utf8")}\nglobalThis.__uiText = uiText;`, context);
  return context.__uiText;
}

function readIndexCopy() {
  const html = fs.readFileSync("index.html", "utf8");
  const match = html.match(/const copy = \{([\s\S]*?)\n\s*\};\n\n\s*const language/);
  if (!match) throw new Error("Cannot find early localization copy in index.html");

  const context = {};
  vm.createContext(context);
  vm.runInContext(`globalThis.__copy = {${match[1]}\n};`, context);
  return context.__copy;
}

const uiText = readUiText();
const indexCopy = readIndexCopy();
const languages = Object.keys(uiText);
const failures = [];
const keyMap = {
  settings: "settings",
  typingText: "typingText",
  keyboard: "keyboard",
  fingers: "fingers",
  fingerPicker: "fingerChoice",
  restoreDefaults: "restoreDefaults",
  cancel: "cancel",
  save: "save",
  selectedKey: "selectedKey",
  label: "keyLabel",
  placeholder: "keyLabelPlaceholder",
  apply: "apply",
  close: "close",
  main: "generalSettings",
  sound: "sound",
  dark: "darkTheme",
  on: "toggleOn",
  off: "toggleOff",
  keyboardLanguage: "keyboardLanguage",
  language: "language",
  program: "learningProgram",
  stats: "statistics",
  fingering: "fingerMapMenu",
  display: "displaySettings",
  assistants: "assistants",
  keyHighlight: "keyHighlight",
  fingerZones: "fingerZones",
  fingerHighlight: "fingerHighlight",
  pressHighlight: "pressHighlight",
  showFingers: "showFingers",
  metronome: "metronome",
  help: "help",
  allModules: "allModules",
  currentProgress: "currentModuleProgress",
  resetProgress: "resetCurrentModuleProgress",
  textPractice: "textPractice",
  text: "practiceText",
  lines: "targetLines",
  refreshText: "refreshText",
  dailyStats: "dailyStats",
  helpPractice: "helpPractice",
  helpProgram: "helpProgram",
  helpFingering: "helpFingering"
};
const privacyMap = {
  privacyTitle: "title",
  privacyText: "text",
  reject: "reject",
  accept: "accept"
};

for (const language of languages) {
  if (!indexCopy[language]) {
    failures.push(`index copy missing ${language}`);
    continue;
  }

  for (const [indexKey, uiKey] of Object.entries(keyMap)) {
    if (indexCopy[language][indexKey] !== uiText[language][uiKey]) {
      failures.push(`index copy ${language}.${indexKey} does not match uiText.${language}.${uiKey}`);
    }
  }

  for (const [indexKey, privacyKey] of Object.entries(privacyMap)) {
    if (indexCopy[language][indexKey] !== uiText[language].privacyConsent[privacyKey]) {
      failures.push(`index copy ${language}.${indexKey} does not match uiText.${language}.privacyConsent.${privacyKey}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Index early copy sync OK");
