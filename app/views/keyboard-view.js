function labelsFor(language) {
  return { ...languages[language].keys, ...(saved[language] || {}) };
}

function mirroredFingerId(fingerId) {
  if (fingerId.startsWith("right-")) {
    return fingerId.replace("right-", "left-");
  }

  if (fingerId.startsWith("left-")) {
    return fingerId.replace("left-", "right-");
  }

  return fingerId;
}

function fingerNodeById(fingerId) {
  return document.querySelector(`.finger[data-finger="${fingerId}"]`);
}

function applyHandCalibration() {
  leftHand.style.setProperty("--hand-offset-x", "0px");
  leftHand.style.setProperty("--hand-offset-y", "0px");
  rightHand.style.setProperty("--hand-offset-x", "0px");
  rightHand.style.setProperty("--hand-offset-y", "0px");

  const width = keyboardWrap.offsetWidth || keyboardScale.clientWidth || 0;
  const height = keyboardWrap.offsetHeight || 0;
  if (!width || !height) return;

  rightFingerNodes.forEach(node => {
    const fingerId = node.dataset.finger;
    const fixedEntry = fixedHandCalibrationPx[fingerId] || { x: 0, y: 0 };
    node.style.setProperty("--finger-x", `${fixedEntry.x}px`);
    node.style.setProperty("--finger-y", `${fixedEntry.y}px`);

    const mirroredNode = fingerNodeById(mirroredFingerId(fingerId));
    if (mirroredNode) {
      mirroredNode.style.setProperty("--finger-x", `${-fixedEntry.x}px`);
      mirroredNode.style.setProperty("--finger-y", `${fixedEntry.y}px`);
    }
  });
}

function keyTitle(id) {
  return id.replace(/([A-Z])/g, " $1").replace(/^./, letter => letter.toUpperCase());
}

function createEnterVisual(key, labelText) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("class", "enter-shape");
  path.setAttribute("d", "M7 1 H93 Q99 1 99 7 V93 Q99 99 93 99 H32 Q26 99 26 93 V47 Q26 44 23 44 H7 Q1 44 1 38 V7 Q1 1 7 1 Z");
  svg.append(path);

  const symbol = document.createElement("span");
  symbol.setAttribute("class", "enter-symbol");
  symbol.textContent = labelText;
  key.append(svg);
  key.append(symbol);
}

function keyboardKeyClassName({ id, extra, isSelected, isFingerMapped, isPracticeKey, isCorrectPracticeKey, isWrongPracticeKey }) {
  return `key ${extra}${isSelected ? " selected" : ""}${isFingerMapped ? " key-finger-map" : ""}${isPracticeKey ? " key-lit" : ""}${isCorrectPracticeKey ? " key-correct" : ""}${isWrongPracticeKey ? " key-wrong" : ""}`.trim();
}

function renderKeyboard() {
  const labels = labelsFor(currentLanguage);
  const highlightedKeys = activeFingerKeys();
  const practiceTarget = fingerKeyboardMode ? { keyId: null, spaceSide: null } : currentPracticeTarget();

  handsLayer.classList.toggle("finger-editor-mode", fingerKeyboardMode);
  keyboard.innerHTML = "";

  geometry.forEach(([id, row, column, span, extra = "", rowSpan = 1]) => {
    const key = document.createElement("button");
    const isPracticeKey = practiceTarget.keyId === id;
    const isCorrectPracticeKey = !fingerKeyboardMode && correctPracticeKeyId === id;
    const isWrongPracticeKey = !fingerKeyboardMode && wrongPracticeKeyId === id;

    key.type = "button";
    key.className = keyboardKeyClassName({
      id,
      extra,
      isSelected: editMode && id === selectedKey,
      isFingerMapped: highlightedKeys.has(id),
      isPracticeKey,
      isCorrectPracticeKey,
      isWrongPracticeKey
    });
    key.dataset.key = id;

    if (id === "space") {
      key.classList.toggle("space-left", isPracticeKey && practiceTarget.spaceSide === "left");
      key.classList.toggle("space-right", isPracticeKey && practiceTarget.spaceSide === "right");
    }

    key.style.gridColumn = `${column} / span ${span}`;
    key.style.gridRow = `${row} / span ${rowSpan}`;

    if (id === "arrowLeft" || id === "arrowUp" || id === "arrowDown" || id === "arrowRight") {
      key.style.height = "calc((var(--key-height) - var(--arrow-gap)) / 2)";
      key.style.alignSelf = id === "arrowUp" ? "start" : "end";
    }

    if (id === "enter") {
      createEnterVisual(key, labels[id] ?? "");
    }

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = id === "enter" ? "" : labels[id] ?? "";
    key.append(label);
    key.setAttribute("aria-label", `${keyTitle(id)}: ${labels[id] || "пусто"}`);
    key.addEventListener("click", () => handleKeyboardKeyClick(id));
    keyboard.append(key);
  });

  renderCurrentPracticeGuides();
}

function renderSelect() {
  keySelect.innerHTML = "";
  geometry.forEach(([id]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = keyTitle(id);
    keySelect.append(option);
  });
  keySelect.value = selectedKey;
}

function selectKey(id) {
  selectedKey = id;
  const labels = labelsFor(currentLanguage);
  keySelect.value = id;
  labelInput.value = labels[id] ?? "";
  renderKeyboard();
  if (editMode) {
    labelInput.focus();
    labelInput.select();
  }
}

function applyCurrentLabel() {
  const value = labelInput.value.trim();
  saved[currentLanguage] = saved[currentLanguage] || {};
  const baseValue = languages[currentLanguage].keys[selectedKey] ?? "";

  if (value === baseValue) {
    delete saved[currentLanguage][selectedKey];
  } else {
    saved[currentLanguage][selectedKey] = value;
  }

  persist();
  renderKeyboard();
  setStatus(`Клавиша "${keyTitle(selectedKey)}" обновлена для ${languages[currentLanguage].name}.`);
}

function fitKeyboardScene() {
  const availableWidth = keyboardScale.clientWidth;
  if (!availableWidth) return;

  if (!keyboardDesignWidth) {
    keyboardDesignWidth = availableWidth;
    keyboardWrap.style.width = `${keyboardDesignWidth}px`;
    keyboardDesignHeight = keyboardWrap.offsetHeight;
  }

  const scale = availableWidth / keyboardDesignWidth;
  document.documentElement.style.setProperty("--keyboard-scale", String(scale));
  document.documentElement.style.setProperty("--keyboard-stage-height", `${keyboardDesignHeight * scale}px`);
  applyHandCalibration();
}
