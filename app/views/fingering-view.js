function updateFingerHelpText() {
  fingerMapHelp.textContent = fingerKeyboardMode ? textFor().fingerKeyboardHelp : textFor().fingerHelp;
}

function renderKeyboardFingerPicker() {
  const positions = {
    "left-pinky": 12.8644,
    "left-ring": 18.3644,
    "left-middle": 24.8644,
    "left-index": 31.5144,
    "left-thumb": 39.5644,
    "right-thumb": 53.8,
    "right-index": 61.85,
    "right-middle": 68.5,
    "right-ring": 75,
    "right-pinky": 80.5
  };

  keyboardFingerPicker.innerHTML = "";
  fingerIds.forEach(fingerId => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `finger-picker${fingerId === currentFingerSelection() ? " active" : ""}`;
    button.dataset.finger = fingerId;
    button.title = fingerName(fingerId);
    button.setAttribute("aria-label", fingerName(fingerId));
    button.style.left = `${positions[fingerId] ?? 50}%`;
    applyFingerAssignmentTheme(button, fingerId);
    keyboardFingerPicker.append(button);
  });
}

function renderKeyboardEditorPanel() {
  const text = textFor();
  keyboardEditorSave.textContent = text.save;
  keyboardEditorCancel.textContent = text.cancel;
  keyboardEditorReset.textContent = text.restoreDefaults;
  renderKeyboardFingerPicker();
  keyboardFingerPicker.classList.toggle("visible", fingerKeyboardMode);
  keyboardEditorPanel.classList.toggle("visible", fingerKeyboardMode);
  trainer.classList.toggle("hidden", fingerKeyboardMode);
  practiceProgress.classList.toggle("hidden", fingerKeyboardMode);
  practiceStats.classList.toggle("hidden", fingerKeyboardMode);
  pageTitle.textContent = fingerKeyboardMode ? text.fingerEditorModeTitle : "";

}

function renderFingerKeyChip(keyId) {
  const chip = document.createElement("span");
  chip.className = "finger-key-chip";
  chip.textContent = visibleKeyLabel(keyId) || keyTitle(keyId);
  chip.title = keyTitle(keyId);
  return chip;
}

function renderFingerMapCards() {
  if (!fingerMapList) return;

  const map = currentFingerMapState();
  const selectedFinger = currentFingerSelection();
  fingerIds.forEach(fingerId => {
    const card = document.createElement("article");
    card.className = `finger-card${fingerId === selectedFinger ? " active" : ""}`;
    card.dataset.finger = fingerId;
    applyFingerAssignmentTheme(card, fingerId);

    const head = document.createElement("div");
    head.className = "finger-card-head";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "finger-card-btn";
    button.dataset.finger = fingerId;

    const name = document.createElement("span");
    name.className = "finger-card-name";
    name.textContent = fingerName(fingerId);

    const assignedKeys = map[fingerId] || [];
    const meta = document.createElement("span");
    meta.className = "finger-card-meta";
    meta.textContent = assignedKeys.length ? `${assignedKeys.length}` : "0";

    button.append(name);
    head.append(button, meta);

    const keyGrid = document.createElement("div");
    keyGrid.className = "finger-key-grid";
    if (assignedKeys.length) {
      assignedKeys.forEach(keyId => keyGrid.append(renderFingerKeyChip(keyId)));
    } else {
      const empty = document.createElement("span");
      empty.className = "finger-key-chip empty";
      empty.textContent = "—";
      keyGrid.append(empty);
    }

    card.append(head, keyGrid);
    fingerMapList.append(card);
  });
}

function renderFingerMapPanel() {
  const text = textFor();
  fingerMapTitle.textContent = text.fingerMap;
  if (fingerMapSectionLabel) {
    fingerMapSectionLabel.textContent = text.fingerMap;
  }
  fingerMapOpen.textContent = text.openFingerMap;
  fingerMapClose.setAttribute("aria-label", text.close);
  fingerMapKeyboardMode.textContent = fingerKeyboardMode ? text.keyboardModeActive : text.keyboardMode;
  fingerMapKeyboardMode.classList.toggle("active", fingerKeyboardMode);
  fingerMapReset.textContent = text.restoreDefaults;
  fingerMapCancel.textContent = text.cancel;
  fingerMapSave.textContent = text.save;
  updateFingerHelpText();
  if (fingerMapList) {
    fingerMapList.innerHTML = "";
    renderFingerMapCards();
  }
  renderKeyboardEditorPanel();
}
