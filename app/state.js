let currentLanguage = "en";
let currentPracticeModule = "module1";
let selectedKey = "a";
let editMode = false;
let practiceLineIndex = 0;
let activeFingerId = "left-index";
let draftFingerMap = null;
let draftFingerPreviousOwners = {};
let draftActiveFingerId = "left-index";
let fingerKeyboardMode = false;
let correctPracticeKeyId = null;
let wrongPracticeKeyId = null;
let technicalPracticeKeyId = null;
let pressedPracticeKeyIds = new Set();
let correctPressedPracticeKeyIds = new Set();
let wrongPressedPracticeKeyIds = new Set();
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
let onboardingStepIndex = 0;
let onboardingCompleted = false;
let fingeringTourActive = false;
let fingeringTourStepIndex = 0;
let fingeringTourTarget = null;
let fingeringTourExtraTargets = [];
let fingeringTourCard = null;
let fingeringTourMenuMarker = null;
let lastShownLessonTipModuleId = null;
let practiceAssistantsUsed = false;
let practiceMetronomeHitCount = 0;
let practiceMetronomeAttemptCount = 0;
let practiceMetronomeUsed = false;
let customPracticeDraftModuleId = null;
let customPracticeRuntimeLines = {};
let currentTheme = "dark";
let practiceTextSize = "m";
let keySoundEnabled = true;
let keyHighlightEnabled = true;
let fingerZonesEnabled = false;
let fingerHighlightEnabled = true;
let pressHighlightEnabled = true;
let showFingersEnabled = true;
let alternateLinesEnabled = false;
let metronomeBpm = 0;
let practiceTypedValue = "";

function browserPreferredLanguage() {
  const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || navigator.userLanguage].filter(Boolean);

  for (const browserLanguage of browserLanguages) {
    const languageId = String(browserLanguage).toLowerCase().split("-")[0];
    if (languages[languageId]) return languageId;
  }

  return "en";
}

function initializeAppState(savedState = {}) {
  currentLanguage = languages[savedState.currentLanguage] ? savedState.currentLanguage : browserPreferredLanguage();
  currentPracticeModule = savedState.currentPracticeModule || "module1";
  saved.currentLanguage = currentLanguage;
  saved.currentPracticeModule = currentPracticeModule;
  selectedKey = "a";
  editMode = false;
  practiceLineIndex = 0;
  activeFingerId = savedState.activeFingerId || "left-index";
  draftFingerMap = null;
  draftFingerPreviousOwners = {};
  draftActiveFingerId = activeFingerId;
  fingerKeyboardMode = false;
  correctPracticeKeyId = null;
  wrongPracticeKeyId = null;
  technicalPracticeKeyId = null;
  pressedPracticeKeyIds = new Set();
  correctPressedPracticeKeyIds = new Set();
  wrongPressedPracticeKeyIds = new Set();
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
  onboardingStepIndex = 0;
  onboardingCompleted = savedState.onboardingCompleted === true;
  fingeringTourActive = false;
  fingeringTourStepIndex = 0;
  fingeringTourTarget = null;
  fingeringTourExtraTargets = [];
  fingeringTourCard = null;
  lastShownLessonTipModuleId = null;
  practiceAssistantsUsed = false;
  practiceMetronomeHitCount = 0;
  practiceMetronomeAttemptCount = 0;
  practiceMetronomeUsed = false;
  customPracticeDraftModuleId = null;
  customPracticeRuntimeLines = {};
  currentTheme = savedState.theme === "light" ? "light" : "dark";
  applyTheme();
  practiceTextSize = ["s", "m", "l"].includes(savedState.practiceTextSize) ? savedState.practiceTextSize : "m";
  applyPracticeTextSize();
  keySoundEnabled = savedState.keySoundEnabled !== false;
  keyHighlightEnabled = savedState.keyHighlightEnabled !== false;
  fingerZonesEnabled = savedState.fingerZonesEnabled === true;
  fingerHighlightEnabled = savedState.fingerHighlightEnabled !== false;
  pressHighlightEnabled = savedState.pressHighlightEnabled !== false;
  showFingersEnabled = savedState.showFingersEnabled !== false;
  alternateLinesEnabled = savedState.alternateLinesEnabled === true;
  metronomeBpm = normalizeMetronomeBpm(savedState.metronomeBpm);
  practiceTypedValue = "";
}

function applyTheme() {
  document.documentElement.dataset.theme = currentTheme;
}

function applyPracticeTextSize() {
  document.documentElement.dataset.practiceTextSize = practiceTextSize;
}
