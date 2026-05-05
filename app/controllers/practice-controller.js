function practiceModulesFor(language = currentLanguage) {
  return practiceContent[language]?.modules || practiceContent.en?.modules || {};
}

function practiceModuleGroupsFor(language = currentLanguage) {
  return practiceContent[language]?.moduleGroups || practiceContent.en?.moduleGroups || [];
}

function firstPracticeModuleId(language = currentLanguage) {
  return Object.keys(practiceModulesFor(language))[0] || "module1";
}

function normalizeCurrentPracticeModule(language = currentLanguage) {
  const modules = practiceModulesFor(language);
  if (modules[currentPracticeModule]) return currentPracticeModule;

  currentPracticeModule = firstPracticeModuleId(language);
  saved.currentPracticeModule = currentPracticeModule;
  return currentPracticeModule;
}

function practiceProgressStore() {
  if (!saved.practiceProgress || typeof saved.practiceProgress !== "object" || Array.isArray(saved.practiceProgress)) {
    saved.practiceProgress = {};
  }
  return saved.practiceProgress;
}

function languagePracticeProgressStore(language = currentLanguage) {
  const store = practiceProgressStore();
  if (!store[language] || typeof store[language] !== "object" || Array.isArray(store[language])) {
    store[language] = {};
  }
  return store[language];
}

function normalizePracticeProgressEntry(entry, totalLines) {
  const safeTotal = Math.max(0, Number(totalLines) || 0);
  let currentLine = Number.isFinite(entry?.currentLine) ? Math.max(0, Math.trunc(entry.currentLine)) : 0;
  let completedLines = Number.isFinite(entry?.completedLines) ? Math.max(0, Math.trunc(entry.completedLines)) : currentLine;
  const accuracy = Number.isFinite(entry?.accuracy) ? Math.max(0, Math.round(entry.accuracy)) : 0;
  const speed = Number.isFinite(entry?.speed) ? Math.max(0, Math.round(entry.speed)) : 0;

  if (safeTotal === 0) {
    return { currentLine: 0, completedLines: 0, isComplete: true, accuracy, speed };
  }

  if (currentLine >= safeTotal || completedLines >= safeTotal) {
    return { currentLine: safeTotal, completedLines: safeTotal, isComplete: true, accuracy, speed };
  }

  completedLines = Math.max(completedLines, Math.min(currentLine, safeTotal));

  return {
    currentLine: Math.min(currentLine, safeTotal - 1),
    completedLines: Math.min(completedLines, safeTotal),
    isComplete: false,
    accuracy,
    speed
  };
}

function moduleProgressFor(language = currentLanguage, moduleId = currentPracticeModule) {
  const totalLines = ((practiceModulesFor(language)[moduleId] || {}).lines || []).length;
  const entry = languagePracticeProgressStore(language)[moduleId];
  const normalized = normalizePracticeProgressEntry(entry, totalLines);
  return {
    ...normalized,
    totalLines,
    percent: totalLines > 0 ? Math.round((normalized.completedLines / totalLines) * 100) : 0
  };
}

function persistModuleProgress(language = currentLanguage, moduleId = currentPracticeModule, nextProgress = {}) {
  const totalLines = ((practiceModulesFor(language)[moduleId] || {}).lines || []).length;
  const normalized = normalizePracticeProgressEntry(nextProgress, totalLines);
  languagePracticeProgressStore(language)[moduleId] = {
    currentLine: normalized.currentLine,
    completedLines: normalized.completedLines,
    accuracy: normalized.accuracy,
    speed: normalized.speed
  };
  persist();
  return {
    ...normalized,
    totalLines,
    percent: totalLines > 0 ? Math.round((normalized.completedLines / totalLines) * 100) : 0
  };
}

function restoreCurrentPracticeProgress() {
  normalizeCurrentPracticeModule();
  const progress = moduleProgressFor(currentLanguage, currentPracticeModule);
  practiceCompletedLines = progress.completedLines;
  practiceAwaitingEnter = false;
  practiceLineIndex = progress.isComplete
    ? Math.max(progress.totalLines - 1, 0)
    : progress.currentLine;
  practiceLastMatchedIndex = 0;
  return progress;
}

function currentPracticeModuleData(language = currentLanguage, moduleId = currentPracticeModule) {
  const modules = practiceModulesFor(language);
  return modules[moduleId] || modules[firstPracticeModuleId(language)] || Object.values(modules)[0] || { name: "", lines: [] };
}

function currentPracticeLines() {
  return currentPracticeModuleData().lines || [];
}

function currentPracticeCursor() {
  const expected = currentPracticeLines()[practiceLineIndex] || "";
  const typed = practiceTypedValue;
  let index = 0;

  while (index < typed.length && index < expected.length && typed[index] === expected[index]) {
    index += 1;
  }

  return {
    expected,
    typed,
    index,
    character: expected[index] || ""
  };
}

function renderCurrentPracticeSampleText() {
  const { expected, index } = currentPracticeCursor();
  renderPracticeSampleText(expected, index);
}

function resetPracticeMetrics() {
  practiceErrorCount = 0;
  practiceCorrectCharCount = 0;
  practiceSessionStartedAt = 0;
  practicePausedAt = 0;
  practicePausedDurationMs = 0;
  practiceLastMatchedIndex = 0;
  stopPracticeStatsTicker();
  renderPracticeStats();
}

function startPracticeStatsTicker() {
  if (practiceStatsTimerId) return;

  practiceStatsTimerId = setInterval(() => {
    if (!practiceSessionStartedAt) {
      stopPracticeStatsTicker();
      return;
    }

    renderPracticeStats();
  }, 1000);
}

function stopPracticeStatsTicker() {
  if (!practiceStatsTimerId) return;

  clearInterval(practiceStatsTimerId);
  practiceStatsTimerId = null;
}

function ensurePracticeSessionStarted() {
  if (!practiceSessionStartedAt) {
    practiceSessionStartedAt = Date.now();
    practicePausedAt = 0;
    practicePausedDurationMs = 0;
  }
  startPracticeStatsTicker();
}

function currentPracticeActiveElapsedMs() {
  if (!practiceSessionStartedAt) return 0;

  const now = Date.now();
  const currentPauseMs = practicePausedAt ? now - practicePausedAt : 0;
  return Math.max(0, now - practiceSessionStartedAt - practicePausedDurationMs - currentPauseMs);
}

function shouldPausePracticeTimer() {
  return (
    settingsDialog.open ||
    learningProgramDialog.open ||
    statsDialog.open ||
    helpDialog.open ||
    fingerMapDialog.open
  );
}

function pausePracticeTimer() {
  if (!practiceSessionStartedAt || practicePausedAt) return;
  practicePausedAt = Date.now();
  renderPracticeStats();
}

function resumePracticeTimer() {
  if (!practicePausedAt) return;

  practicePausedDurationMs += Date.now() - practicePausedAt;
  practicePausedAt = 0;
  renderPracticeStats();
}

function updatePracticeTimerPauseState() {
  if (shouldPausePracticeTimer()) {
    pausePracticeTimer();
  } else {
    resumePracticeTimer();
  }
}

function handForFinger(fingerId) {
  if (!fingerId) return null;
  if (fingerId.startsWith("left-")) return "left";
  if (fingerId.startsWith("right-")) return "right";
  return null;
}

function mappedFingerForKey(keyId) {
  const map = currentFingerMapState();
  return fingerIds.find(fingerId => map[fingerId]?.includes(keyId)) || null;
}

function isUppercaseLetter(character) {
  if (!character) return false;
  return character.toLowerCase() !== character.toUpperCase() && character === character.toUpperCase();
}

function oppositeShiftTargetForFinger(fingerId) {
  const hand = handForFinger(fingerId);
  if (hand === "left") {
    return { keyId: "shiftRight", fingerId: "right-pinky" };
  }

  if (hand === "right") {
    return { keyId: "shiftLeft", fingerId: "left-pinky" };
  }

  return { keyId: null, fingerId: null };
}

function practiceTargetForIndex(index) {
  if (practiceAwaitingEnter) {
    return {
      keyId: "enter",
      fingerId: "right-pinky",
      character: "",
      spaceSide: null,
      secondaryKeyId: null,
      secondaryFingerId: null
    };
  }

  const expected = currentPracticeLines()[practiceLineIndex] || "";
  const character = expected[index] || "";
  const [keyId] = findKeyCandidatesForCharacter(character, labelsFor(currentLanguage), geometry);

  if (!keyId) {
    return {
      keyId: null,
      fingerId: null,
      character,
      spaceSide: null,
      secondaryKeyId: null,
      secondaryFingerId: null
    };
  }

  if (keyId !== "space") {
    const fingerId = mappedFingerForKey(keyId);
    const shiftTarget = isUppercaseLetter(character) ? oppositeShiftTargetForFinger(fingerId) : { keyId: null, fingerId: null };

    return {
      keyId,
      fingerId,
      character,
      spaceSide: null,
      secondaryKeyId: shiftTarget.keyId,
      secondaryFingerId: shiftTarget.fingerId
    };
  }

  let previousHand = null;
  for (let previousIndex = index - 1; previousIndex >= 0; previousIndex -= 1) {
    const previousTarget = practiceTargetForIndex(previousIndex);
    previousHand = handForFinger(previousTarget.fingerId);
    if (previousHand) break;
  }

  const nextHand = previousHand === "right" ? "left" : "right";
  return {
    keyId,
    fingerId: `${nextHand}-thumb`,
    character,
    spaceSide: nextHand,
    secondaryKeyId: null,
    secondaryFingerId: null
  };
}

function currentPracticeTarget() {
  const { index } = currentPracticeCursor();
  return practiceTargetForIndex(index);
}

function flashPracticeTechnical(keyId) {
  if (!keyId) return;

  technicalPracticeKeyId = keyId;
  renderKeyboard();

  clearTimeout(flashPracticeTechnical.timer);
  flashPracticeTechnical.timer = setTimeout(() => {
    technicalPracticeKeyId = null;
    renderKeyboard();
  }, 140);
}

function flashPracticeCorrect(keyId) {
  correctPracticeKeyId = keyId || null;
  renderKeyboard();

  clearTimeout(flashPracticeCorrect.timer);
  flashPracticeCorrect.timer = setTimeout(() => {
    correctPracticeKeyId = null;
    renderKeyboard();
  }, 180);
}

function flashPracticeError(keyId) {
  wrongPracticeKeyId = keyId || null;
  correctPracticeKeyId = null;
  setPracticeInputError(true);
  renderKeyboard();

  clearTimeout(flashPracticeError.timer);
  flashPracticeError.timer = setTimeout(() => {
    wrongPracticeKeyId = null;
    setPracticeInputError(false);
    renderKeyboard();
  }, 260);
}

function renderCurrentPracticeGuides() {
  if (fingerKeyboardMode) {
    renderPracticeGuides(currentFingerSelection());
    return;
  }

  const target = currentPracticeTarget();
  renderPracticeGuides([target.fingerId, target.secondaryFingerId]);
}

function renderPracticeLine() {
  const lines = currentPracticeLines();
  if (lines.length) {
    practiceLineIndex = Math.min(practiceLineIndex, lines.length - 1);
  } else {
    practiceLineIndex = 0;
  }
  practiceLastMatchedIndex = 0;
  resetPracticeInputValue();
  renderCurrentPracticeSampleText();
  renderPracticeStats();
  renderPracticeProgress();
  renderKeyboard();
}

function advancePracticeLine() {
  const totalLines = currentPracticeLines().length;
  const lineStep = alternateLinesEnabled ? 2 : 1;
  const nextCompletedLines = Math.min(practiceCompletedLines + lineStep, totalLines);
  const isComplete = nextCompletedLines >= totalLines;

  practiceCompletedLines = nextCompletedLines;
  practiceLineIndex = isComplete
    ? Math.max(totalLines - 1, 0)
    : Math.min(practiceLineIndex + lineStep, totalLines - 1);

  persistModuleProgress(currentLanguage, currentPracticeModule, {
    currentLine: isComplete ? totalLines : practiceLineIndex,
    completedLines: nextCompletedLines,
    accuracy: currentPracticeAccuracy(),
    speed: currentPracticeSpeed()
  });

  practiceAwaitingEnter = false;
  renderPracticeLine();
}

function handlePracticeInput() {
  if (practiceAwaitingEnter) {
    practiceTypedValue = currentPracticeLines()[practiceLineIndex] || "";
    return;
  }

  const expected = currentPracticeLines()[practiceLineIndex];
  const typed = practiceTypedValue;
  let index = 0;

  while (index < typed.length && index < expected.length && typed[index] === expected[index]) {
    index += 1;
  }

  if (typed.length > index) {
    ensurePracticeSessionStarted();
    practiceErrorCount += 1;
    const wrongCharacter = typed[index];
    const fallbackWrongKeyId = findKeyCandidatesForCharacter(wrongCharacter, labelsFor(currentLanguage), geometry)[0] || null;
    const wrongKeyId = lastPhysicalPracticeKeyId || fallbackWrongKeyId;

    practiceTypedValue = typed.slice(0, index);
    practiceLastMatchedIndex = index;
    renderCurrentPracticeSampleText();
    renderPracticeProgress();
    renderPracticeStats();
    playErrorSound();
    flashPracticeError(wrongKeyId);
    return;
  }

  if (index > 0 || typed.length > 0) {
    ensurePracticeSessionStarted();
  }

  if (index > practiceLastMatchedIndex) {
    practiceCorrectCharCount += index - practiceLastMatchedIndex;
  }
  practiceLastMatchedIndex = index;

  if (typed.length > 0 && typed.length <= expected.length && typed.length === index) {
    const correctKeyId = lastPhysicalPracticeKeyId || practiceTargetForIndex(index - 1).keyId;
    flashPracticeCorrect(correctKeyId);
  }

  wrongPracticeKeyId = null;
  setPracticeInputError(false);
  renderCurrentPracticeSampleText();
  renderPracticeProgress();
  renderPracticeStats();
  renderKeyboard();

  if (practiceTypedValue === expected) {
    practiceAwaitingEnter = true;
    renderCurrentPracticeSampleText();
    renderKeyboard();
  }
}

function isTrainerTextEntryTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  const tagName = target.tagName;
  return target.isContentEditable || tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
}

function isPracticeInputPaused() {
  return (
    fingerKeyboardMode ||
    settingsDialog.open ||
    learningProgramDialog.open ||
    statsDialog.open ||
    helpDialog.open ||
    fingerMapDialog.open
  );
}

function isSystemKeyCombination(event) {
  if (event.altKey) return true;
  return event.metaKey || event.ctrlKey;
}

function printableCharacterFromKeyEvent(event) {
  const keyId = keyIdFromEventCode(event.code);
  if (keyId === "space") return " ";
  if (!keyId) return null;

  const printableSymbols = extractPrintableKeySymbols(labelsFor(currentLanguage)[keyId] ?? "");
  if (!printableSymbols.length) return null;

  if (printableSymbols.length > 1) {
    return event.shiftKey ? printableSymbols[0] : printableSymbols[printableSymbols.length - 1];
  }

  const [symbol] = printableSymbols;
  if (symbol.toLowerCase() !== symbol.toUpperCase()) {
    return event.shiftKey ? symbol.toUpperCase() : symbol.toLowerCase();
  }

  return symbol;
}

function applyPracticeKeyInput(event) {
  const keyId = keyIdFromEventCode(event.code);
  lastPhysicalPracticeKeyId = keyId;

  if (practiceAwaitingEnter) {
    if (event.key === "Enter" || keyId === "enter") {
      flashPracticeCorrect("enter");
      playEnterSound();
      advancePracticeLine();
      return true;
    }

    if (keyId && (event.key === "Backspace" || printableCharacterFromKeyEvent(event))) {
      ensurePracticeSessionStarted();
      practiceErrorCount += 1;
      renderPracticeStats();
      playErrorSound();
      flashPracticeError(keyId);
      return true;
    }

    return false;
  }

  if (event.key === "Backspace") {
    if (practiceTypedValue.length > 0) {
      practiceTypedValue = practiceTypedValue.slice(0, -1);
      handlePracticeInput();
      playKeySound();
    } else if (keyId) {
      flashPracticeTechnical(keyId);
    }
    return true;
  }

  const character = printableCharacterFromKeyEvent(event);
  if (character !== null) {
    const previousLength = practiceTypedValue.length;
    practiceTypedValue += character;
    handlePracticeInput();
    if (practiceTypedValue.length > previousLength) {
      playKeySound();
    }
    return true;
  }

  if (keyId) {
    const isTechnicalKey =
      event.key === "Shift" ||
      event.key === "CapsLock" ||
      event.key === "Enter" ||
      event.key === "Delete" ||
      event.key.startsWith("Arrow");

    if (isTechnicalKey) {
      flashPracticeTechnical(keyId);
    }
  }

  return false;
}

function handleGlobalKeyDown(event) {
  if (event.defaultPrevented || event.isComposing || isPracticeInputPaused() || isSystemKeyCombination(event)) return;

  const target = event.target;
  if (isTrainerTextEntryTarget(target)) return;

  const shouldHandle =
    event.key === "Backspace" ||
    event.key === "Enter" ||
    printableCharacterFromKeyEvent(event) !== null;

  if (!shouldHandle) {
    applyPracticeKeyInput(event);
    return;
  }

  if (applyPracticeKeyInput(event)) {
    event.preventDefault();
  }
}
