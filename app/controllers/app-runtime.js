function setStatus(message) {
  status.textContent = message;
  clearTimeout(setStatus.timer);
  setStatus.timer = setTimeout(() => {
    status.textContent = "";
  }, 2600);
}

function focusPracticeInputSoon() {
  // Global keydown is the input source; there is no visible practice field to focus.
}

function focusPracticeInputFromInteraction(event) {
  // Kept as a no-op for existing event bindings; typing continues through window keydown.
}

function render() {
  renderTabs();
  renderModuleButtons();
  restoreCurrentPracticeProgress();
  renderPracticeLine();
  renderPracticeModuleCaption();
  renderFingerMapPanel();
  renderKeyboard();
  renderSelect();
  selectKey(selectedKey);
  refitKeyboardScene();
}
