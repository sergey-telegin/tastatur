function renderPracticeSampleText(expected, index) {
  const doneText = expected.slice(0, index);
  const currentText = expected[index] || "";
  const restText = expected.slice(index + (currentText ? 1 : 0));

  practiceSample.innerHTML = "";

  const done = document.createElement("span");
  done.className = "practice-sample-done";
  done.textContent = doneText;

  const current = document.createElement("span");
  current.className = "practice-sample-current";
  current.textContent = currentText;

  const rest = document.createElement("span");
  rest.className = "practice-sample-rest";
  rest.textContent = restText;

  practiceSample.append(done, current, rest);
}

function currentPracticeSpeed() {
  if (!practiceSessionStartedAt || practiceCorrectCharCount <= 0) return 0;

  const elapsedMs = Date.now() - practiceSessionStartedAt;
  if (elapsedMs <= 0) return 0;

  return Math.round((practiceCorrectCharCount * 60000) / elapsedMs);
}

function currentPracticeAccuracy() {
  const totalAttempts = practiceCorrectCharCount + practiceErrorCount;
  if (totalAttempts <= 0) return 100;

  return Math.max(0, Math.round((practiceCorrectCharCount * 100) / totalAttempts));
}

function renderPracticeStats() {
  const text = textFor();
  practiceAccuracyLabel.textContent = text.practiceAccuracy;
  practiceSpeedLabel.textContent = text.practiceSpeed;
  practiceAccuracyValue.textContent = `${currentPracticeAccuracy()}%`;
  practiceSpeedValue.textContent = `${currentPracticeSpeed()} ${text.practiceSpeedUnit}`;
}

function setPracticeInputError(isError) {
  practiceInput.classList.toggle("error", Boolean(isError));
}

function resetPracticeInputValue() {
  practiceInput.value = "";
  setPracticeInputError(false);
}

function renderPracticeGuides(fingerIds) {
  const activeFingerIds = new Set(
    (Array.isArray(fingerIds) ? fingerIds : [fingerIds]).filter(Boolean)
  );

  document.querySelectorAll(".finger[data-finger]").forEach(node => {
    node.classList.toggle("finger-lit", activeFingerIds.has(node.dataset.finger));
  });
}
