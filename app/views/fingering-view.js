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
    keyboardFingerPicker.append(button);
  });
}

function renderKeyboardEditorPanel() {
  const text = textFor();
  keyboardEditorTitle.textContent = "";
  keyboardEditorSave.textContent = text.save;
  keyboardEditorCancel.textContent = text.cancel;
  keyboardEditorReset.textContent = text.restoreDefaults;
  renderKeyboardFingerPicker();
  keyboardFingerPicker.classList.toggle("visible", fingerKeyboardMode);
  keyboardEditorPanel.classList.toggle("visible", fingerKeyboardMode);
  trainer.classList.toggle("hidden", fingerKeyboardMode);
  pageTitle.textContent = fingerKeyboardMode ? text.fingerEditorModeTitle : "";

  if (fingerKeyboardMode) {
    practiceInput.blur();
  }
}

function renderFingerMapList() {
  const copy = currentFingerMapState();
  const text = textFor();
  fingerMapList.innerHTML = "";

  fingerIds.forEach(fingerId => {
    const card = document.createElement("section");
    card.className = `finger-card${fingerId === currentFingerSelection() ? " active" : ""}`;

    const head = document.createElement("div");
    head.className = "finger-card-head";

    const choose = document.createElement("button");
    choose.type = "button";
    choose.className = "finger-card-btn";
    choose.addEventListener("click", () => setActiveFinger(fingerId));

    const name = document.createElement("div");
    name.className = "finger-card-name";
    name.textContent = fingerName(fingerId);

    const meta = document.createElement("div");
    meta.className = "finger-card-meta";
    meta.textContent = `${copy[fingerId].length} ${text.keyCount}`;

    choose.append(name, meta);
    head.append(choose);
    card.append(head);

    const keyGrid = document.createElement("div");
    keyGrid.className = "finger-key-grid";

    if (copy[fingerId].length) {
      copy[fingerId].forEach(keyId => {
        const chip = document.createElement("span");
        chip.className = "finger-key-chip";
        chip.textContent = visibleKeyLabel(keyId);
        keyGrid.append(chip);
      });
    } else {
      const chip = document.createElement("span");
      chip.className = "finger-key-chip empty";
      chip.textContent = text.emptyFinger;
      keyGrid.append(chip);
    }

    if (addFingerInputId === fingerId) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "finger-key-chip add-input";
      input.maxLength = 1;
      input.autocomplete = "off";
      input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
          submitFingerKeyInput(fingerId, input.value);
        } else if (event.key === "Escape") {
          addFingerInputId = null;
          renderFingerMapPanel();
        }
      });
      input.addEventListener("blur", () => {
        if (addFingerInputId === fingerId) {
          submitFingerKeyInput(fingerId, input.value);
        }
      });
      keyGrid.append(input);
      setTimeout(() => input.focus(), 0);
    } else {
      const addButton = document.createElement("button");
      addButton.type = "button";
      addButton.className = "finger-key-chip add-btn";
      addButton.textContent = "+";
      addButton.addEventListener("click", () => {
        addFingerInputId = fingerId;
        renderFingerMapPanel();
      });
      keyGrid.append(addButton);
    }

    card.append(keyGrid);
    fingerMapList.append(card);
  });
}

function renderFingerMapPanel() {
  const text = textFor();
  fingerMapTitle.textContent = text.fingerMap;
  fingerMapSectionLabel.textContent = text.fingerMap;
  fingerMapOpen.textContent = text.openFingerMap;
  fingerMapClose.setAttribute("aria-label", text.close);
  fingerMapKeyboardMode.textContent = fingerKeyboardMode ? text.keyboardModeActive : text.keyboardMode;
  fingerMapKeyboardMode.classList.toggle("active", fingerKeyboardMode);
  fingerMapReset.textContent = text.restoreDefaults;
  fingerMapCancel.textContent = text.cancel;
  fingerMapSave.textContent = text.save;
  updateFingerHelpText();
  renderFingerMapList();
  renderKeyboardEditorPanel();
}
