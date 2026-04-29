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
  keyboardEditorShowAll.textContent = showAllFingerAssignments ? text.hideAllFingers : text.showAllFingers;
  keyboardEditorShowAll.classList.toggle("active", showAllFingerAssignments);
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

  if (fingerKeyboardMode) {
    practiceInput.blur();
  }
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
  if (fingerMapList) {
    fingerMapList.innerHTML = "";
  }
  renderKeyboardEditorPanel();
}
