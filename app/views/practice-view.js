function renderPracticeSampleText(expected, index) {
  const doneText = expected.slice(0, index);
  const rawCurrentText = practiceAwaitingEnter ? "↵" : expected[index] || "";
  const isSpaceMarker = rawCurrentText === " ";
  const restText = expected.slice(index + (rawCurrentText && !practiceAwaitingEnter ? 1 : 0));

  practiceSample.innerHTML = "";

  const done = document.createElement("span");
  done.className = "practice-sample-done";
  const doneInner = document.createElement("span");
  doneInner.className = "practice-sample-done-inner";
  doneInner.textContent = doneText;
  done.append(doneInner);

  const current = document.createElement("span");
  current.className = "practice-sample-current";
  current.classList.toggle("practice-sample-marker", practiceAwaitingEnter);
  current.classList.toggle("practice-sample-space-cursor", isSpaceMarker);
  current.textContent = isSpaceMarker ? "" : rawCurrentText;

  const rest = document.createElement("span");
  rest.className = "practice-sample-rest";
  rest.textContent = restText;

  practiceSample.append(done, current, rest);
}

function currentPracticeSpeed() {
  if (!practiceSessionStartedAt || practiceCorrectCharCount <= 0) return 0;

  const elapsedMs = currentPracticeActiveElapsedMs();
  if (elapsedMs <= 0) return 0;

  return Math.min(999, Math.round((practiceCorrectCharCount * 60000) / elapsedMs));
}

function currentPracticeAccuracy() {
  const totalAttempts = practiceCorrectCharCount + practiceErrorCount;
  if (totalAttempts <= 0) return 100;

  return Math.max(0, Math.round((practiceCorrectCharCount * 100) / totalAttempts));
}

function renderPracticeStats() {
  const text = textFor();
  const speedNumber = document.createElement("span");
  const speedUnit = document.createElement("span");

  speedNumber.className = "practice-speed-number";
  speedNumber.textContent = String(currentPracticeSpeed());
  speedUnit.className = "practice-speed-unit";
  speedUnit.textContent = text.practiceSpeedUnit;

  practiceAccuracyLabel.textContent = text.practiceAccuracy;
  practiceSpeedLabel.textContent = text.practiceSpeed;
  practiceAccuracyValue.textContent = `${currentPracticeAccuracy()}%`;
  practiceSpeedValue.replaceChildren(speedNumber, speedUnit);
  renderStatsDialog();
}

function renderPracticeProgress() {
  const progress = moduleProgressFor(currentLanguage, currentPracticeModule);
  const { expected, index } = currentPracticeCursor();
  const linePercent = expected.length > 0 ? Math.round((index / expected.length) * 100) : 0;

  practiceProgressText.textContent = formatModuleProgressText(
    progress.completedLines,
    progress.totalLines,
    currentLanguage
  );
  practiceProgressBar.style.width = `${linePercent}%`;
}

function setPracticeInputError(isError) {
  practiceSample.classList.toggle("error", Boolean(isError));
}

function resetPracticeInputValue() {
  practiceTypedValue = "";
  setPracticeInputError(false);
}

function renderPracticeGuides(fingerIds) {
  const shouldHighlightFingers = fingerKeyboardMode || fingerHighlightEnabled;
  const activeFingerIds = new Set(
    shouldHighlightFingers
      ? (Array.isArray(fingerIds) ? fingerIds : [fingerIds]).filter(Boolean)
      : []
  );

  document.querySelectorAll(".finger[data-finger]").forEach(node => {
    node.classList.toggle("finger-lit", activeFingerIds.has(node.dataset.finger));
  });
}
