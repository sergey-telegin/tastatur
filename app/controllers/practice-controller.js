function practiceModulesFor(language = currentLanguage) {
  return practiceContent[language]?.modules || practiceContent.en?.modules || {};
}

function currentPracticeModuleData(language = currentLanguage, moduleId = currentPracticeModule) {
  const modules = practiceModulesFor(language);
  return modules[moduleId] || modules.module1 || Object.values(modules)[0] || { name: "", lines: [] };
}

function currentPracticeLines() {
  return currentPracticeModuleData().lines || [];
}

function currentPracticeCursor() {
  const expected = currentPracticeLines()[practiceLineIndex] || "";
  const typed = practiceInput.value;
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

function practiceTargetForIndex(index) {
  const expected = currentPracticeLines()[practiceLineIndex] || "";
  const character = expected[index] || "";
  const [keyId] = findKeyCandidatesForCharacter(character, labelsFor(currentLanguage), geometry);

  if (!keyId) {
    return { keyId: null, fingerId: null, character, spaceSide: null };
  }

  if (keyId !== "space") {
    return {
      keyId,
      fingerId: mappedFingerForKey(keyId),
      character,
      spaceSide: null
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
    spaceSide: nextHand
  };
}

function currentPracticeTarget() {
  const { index } = currentPracticeCursor();
  return practiceTargetForIndex(index);
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
  const fingerId = fingerKeyboardMode ? currentFingerSelection() : currentPracticeTarget().fingerId;
  renderPracticeGuides(fingerId);
}

function renderPracticeLine() {
  const lines = currentPracticeLines();
  practiceLineIndex %= lines.length;
  resetPracticeInputValue();
  renderCurrentPracticeSampleText();
  renderKeyboard();
}

function handlePracticeInput() {
  const expected = currentPracticeLines()[practiceLineIndex];
  const typed = practiceInput.value;
  let index = 0;

  while (index < typed.length && index < expected.length && typed[index] === expected[index]) {
    index += 1;
  }

  if (typed.length > index) {
    const wrongCharacter = typed[index];
    const fallbackWrongKeyId = findKeyCandidatesForCharacter(wrongCharacter, labelsFor(currentLanguage), geometry)[0] || null;
    const wrongKeyId = lastPhysicalPracticeKeyId || fallbackWrongKeyId;

    practiceInput.value = typed.slice(0, index);
    renderCurrentPracticeSampleText();
    flashPracticeError(wrongKeyId);
    return;
  }

  if (typed.length > 0 && typed.length <= expected.length && typed.length === index) {
    const correctKeyId = lastPhysicalPracticeKeyId || practiceTargetForIndex(index - 1).keyId;
    flashPracticeCorrect(correctKeyId);
  }

  wrongPracticeKeyId = null;
  setPracticeInputError(false);
  renderCurrentPracticeSampleText();
  renderKeyboard();

  if (practiceInput.value === expected) {
    practiceLineIndex = (practiceLineIndex + 1) % currentPracticeLines().length;
    renderPracticeLine();
  }
}
