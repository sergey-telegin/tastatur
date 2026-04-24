function setStatus(message) {
  status.textContent = message;
  clearTimeout(setStatus.timer);
  setStatus.timer = setTimeout(() => {
    status.textContent = "";
  }, 2600);
}

function focusPracticeInputSoon() {
  if (fingerKeyboardMode || settingsDialog.open || fingerMapDialog.open) return;

  requestAnimationFrame(() => {
    if (!fingerKeyboardMode && !settingsDialog.open && !fingerMapDialog.open) {
      practiceInput.focus();
    }
  });

  setTimeout(() => {
    if (!fingerKeyboardMode && !settingsDialog.open && !fingerMapDialog.open && document.activeElement !== practiceInput) {
      practiceInput.focus();
    }
  }, 80);
}

function focusPracticeInputFromInteraction(event) {
  if (fingerKeyboardMode || settingsDialog.open || fingerMapDialog.open) return;
  if (event.target instanceof HTMLElement && event.target.closest("button, select, dialog")) return;

  requestAnimationFrame(() => {
    if (!fingerKeyboardMode && !settingsDialog.open && !fingerMapDialog.open) {
      practiceInput.focus();
    }
  });
}

function render() {
  renderTabs();
  renderModuleButtons();
  renderPracticeLine();
  renderFingerMapPanel();
  renderKeyboard();
  renderSelect();
  selectKey(selectedKey);
  fitKeyboardScene();
}
