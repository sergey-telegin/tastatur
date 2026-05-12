const keyboardDesignWidthPx = 1852;

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

function fingerAssignmentPalette(fingerId) {
  const palettes = {
    "left-thumb": {
      border: "#b8b8b8",
      text: "#f2f2f2",
      glow: "rgb(255 255 255 / 0.132)",
      wash: "rgb(255 255 255 / 0.108)"
    },
    "right-thumb": {
      border: "#b8b8b8",
      text: "#f2f2f2",
      glow: "rgb(255 255 255 / 0.132)",
      wash: "rgb(255 255 255 / 0.108)"
    },
    "left-pinky": {
      border: "#79d7f1",
      text: "#dcf8ff",
      glow: "rgb(121 215 241 / 0.132)",
      wash: "rgb(121 215 241 / 0.108)"
    },
    "right-pinky": {
      border: "#e09b9b",
      text: "#fff1f1",
      glow: "rgb(255 104 104 / 0.132)",
      wash: "rgb(255 104 104 / 0.108)"
    },
    "left-ring": {
      border: "#8ae1a6",
      text: "#e8fff0",
      glow: "rgb(114 240 156 / 0.132)",
      wash: "rgb(114 240 156 / 0.108)"
    },
    "right-ring": {
      border: "#ffd86f",
      text: "#fff6d6",
      glow: "rgb(255 216 111 / 0.132)",
      wash: "rgb(255 216 111 / 0.108)"
    },
    "left-middle": {
      border: "#ffd86f",
      text: "#fff6d6",
      glow: "rgb(255 216 111 / 0.132)",
      wash: "rgb(255 216 111 / 0.108)"
    },
    "right-middle": {
      border: "#79d7f1",
      text: "#dcf8ff",
      glow: "rgb(121 215 241 / 0.132)",
      wash: "rgb(121 215 241 / 0.108)"
    },
    "left-index": {
      border: "#e09b9b",
      text: "#fff1f1",
      glow: "rgb(255 104 104 / 0.132)",
      wash: "rgb(255 104 104 / 0.108)"
    },
    "right-index": {
      border: "#8ae1a6",
      text: "#e8fff0",
      glow: "rgb(114 240 156 / 0.132)",
      wash: "rgb(114 240 156 / 0.108)"
    }
  };

  return palettes[fingerId] || palettes["left-index"];
}

function applyFingerAssignmentTheme(key, fingerId) {
  const palette = fingerAssignmentPalette(fingerId);
  key.classList.add("key-finger-all");
  key.classList.toggle("key-finger-selected", fingerKeyboardMode && fingerId === currentFingerSelection());
  key.style.setProperty("--finger-assignment-border", palette.border);
  key.style.setProperty("--finger-assignment-text", palette.text);
  key.style.setProperty("--finger-assignment-glow", palette.glow);
  key.style.setProperty("--finger-assignment-wash", palette.wash);
}

function applyFingerZoneTheme(key, fingerId) {
  const palette = fingerAssignmentPalette(fingerId);
  key.classList.add("key-finger-zone");
  key.style.setProperty("--finger-assignment-border", palette.border);
}

function applyFingerVisualTheme(finger, fingerId) {
  const palette = fingerAssignmentPalette(fingerId);
  finger.classList.add("finger-assignment-colored");
  finger.style.setProperty("--finger-assignment-border", palette.border);
}

function renderFingerVisualThemes() {
  document.querySelectorAll(".finger[data-finger]").forEach(finger => {
    if (!fingerKeyboardMode) {
      finger.classList.remove("finger-assignment-colored");
      finger.style.removeProperty("--finger-assignment-border");
      return;
    }

    applyFingerVisualTheme(finger, finger.dataset.finger);
  });
}

function renderKeyboard() {
  const labels = labelsFor(currentLanguage);
  const highlightedKeys = activeFingerKeys();
  const shouldShowFingerZones = fingerKeyboardMode || (!fingerMapDialog.open && effectiveAssistantSetting(fingerZonesEnabled));
  const allFingerOwners = shouldShowFingerZones ? allFingerKeyOwners() : null;
  const practiceTarget = fingerKeyboardMode ? { keyId: null, spaceSide: null } : currentPracticeTarget();

  handsLayer.classList.toggle("finger-editor-mode", fingerKeyboardMode);
  handsLayer.classList.toggle("hidden", !fingerKeyboardMode && !effectiveAssistantSetting(showFingersEnabled));
  renderFingerVisualThemes();
  keyboard.innerHTML = "";

  geometry.forEach(([id, row, column, span, extra = "", rowSpan = 1]) => {
    const key = document.createElement("button");
    const isPracticeKey = effectiveAssistantSetting(keyHighlightEnabled) && (practiceTarget.keyId === id || practiceTarget.secondaryKeyId === id || technicalPracticeKeyId === id || pressedPracticeKeyIds.has(id));
    const isCorrectPracticeKey = effectiveAssistantSetting(pressHighlightEnabled) && !fingerKeyboardMode && (correctPracticeKeyId === id || correctPressedPracticeKeyIds.has(id));
    const isWrongPracticeKey = effectiveAssistantSetting(pressHighlightEnabled) && !fingerKeyboardMode && (wrongPracticeKeyId === id || wrongPressedPracticeKeyIds.has(id));

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

    if (allFingerOwners?.[id] && fingerKeyboardMode) {
      applyFingerAssignmentTheme(key, allFingerOwners[id]);
    } else if (allFingerOwners?.[id] && !isPracticeKey && !isCorrectPracticeKey && !isWrongPracticeKey) {
      applyFingerZoneTheme(key, allFingerOwners[id]);
    }

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
    keyboardDesignWidth = keyboardDesignWidthPx;
    document.documentElement.style.setProperty("--keyboard-width", `${keyboardDesignWidth}px`);
    keyboardDesignHeight = keyboardWrap.offsetHeight;
  }

  const keyboardScaleBox = keyboardScale.getBoundingClientRect();
  const availableHeight = Math.max(260, window.innerHeight - keyboardScaleBox.top - 18);
  const widthScale = availableWidth / keyboardDesignWidth;
  const heightScale = keyboardDesignHeight > 0 ? availableHeight / keyboardDesignHeight : widthScale;
  const scale = Math.min(widthScale, heightScale);

  document.documentElement.style.setProperty("--keyboard-scale", String(scale));
  document.documentElement.style.setProperty("--keyboard-stage-height", `${keyboardDesignHeight * scale}px`);
  applyHandCalibration();
}

function resetKeyboardSceneMetrics() {
  keyboardDesignWidth = 0;
  keyboardDesignHeight = 0;
  document.documentElement.style.setProperty("--keyboard-scale", "1");
  document.documentElement.style.setProperty("--keyboard-stage-height", "0px");
  document.documentElement.style.setProperty("--keyboard-width", "100%");
}

function refitKeyboardScene() {
  resetKeyboardSceneMetrics();
  fitKeyboardScene();
}
