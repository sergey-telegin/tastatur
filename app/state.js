let currentLanguage = "de";
let currentPracticeModule = "module1";
let selectedKey = "a";
let editMode = false;
let practiceLineIndex = 0;
let activeFingerId = "left-index";
let addFingerInputId = null;
let draftFingerMap = null;
let draftFingerPreviousOwners = {};
let draftActiveFingerId = "left-index";
let fingerKeyboardMode = false;
let correctPracticeKeyId = null;
let wrongPracticeKeyId = null;
let technicalPracticeKeyId = null;
let lastPhysicalPracticeKeyId = null;
let practiceErrorCount = 0;
let practiceCorrectCharCount = 0;
let practiceSessionStartedAt = 0;
let practicePausedAt = 0;
let practicePausedDurationMs = 0;
let practiceStatsTimerId = null;
let practiceLastMatchedIndex = 0;
let practiceAwaitingEnter = false;
let practiceCompletedLines = 0;
let currentTheme = "dark";
let practiceTextSize = "m";
let keySoundEnabled = true;
let keyHighlightEnabled = true;
let fingerHighlightEnabled = true;
let pressHighlightEnabled = true;
let showFingersEnabled = true;
let alternateLinesEnabled = false;
let practiceTypedValue = "";

function initializeAppState(savedState = {}) {
  currentLanguage = languages[savedState.currentLanguage] ? savedState.currentLanguage : "de";
  currentPracticeModule = savedState.currentPracticeModule || "module1";
  saved.currentLanguage = currentLanguage;
  saved.currentPracticeModule = currentPracticeModule;
  selectedKey = "a";
  editMode = false;
  practiceLineIndex = 0;
  activeFingerId = savedState.activeFingerId || "left-index";
  addFingerInputId = null;
  draftFingerMap = null;
  draftFingerPreviousOwners = {};
  draftActiveFingerId = activeFingerId;
  fingerKeyboardMode = false;
  correctPracticeKeyId = null;
  wrongPracticeKeyId = null;
  technicalPracticeKeyId = null;
  lastPhysicalPracticeKeyId = null;
  practiceErrorCount = 0;
  practiceCorrectCharCount = 0;
  practiceSessionStartedAt = 0;
  practicePausedAt = 0;
  practicePausedDurationMs = 0;
  practiceStatsTimerId = null;
  practiceLastMatchedIndex = 0;
  practiceAwaitingEnter = false;
  practiceCompletedLines = 0;
  currentTheme = savedState.theme === "light" ? "light" : "dark";
  applyTheme();
  practiceTextSize = ["s", "m", "l"].includes(savedState.practiceTextSize) ? savedState.practiceTextSize : "m";
  applyPracticeTextSize();
  keySoundEnabled = savedState.keySoundEnabled !== false;
  keyHighlightEnabled = savedState.keyHighlightEnabled !== false;
  fingerHighlightEnabled = savedState.fingerHighlightEnabled !== false;
  pressHighlightEnabled = savedState.pressHighlightEnabled !== false;
  showFingersEnabled = savedState.showFingersEnabled !== false;
  alternateLinesEnabled = savedState.alternateLinesEnabled === true;
  practiceTypedValue = "";
}

function applyTheme() {
  document.documentElement.dataset.theme = currentTheme;
}

function applyPracticeTextSize() {
  document.documentElement.dataset.practiceTextSize = practiceTextSize;
}
