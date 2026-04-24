function bindAppEvents() {
  keySelect.addEventListener("change", event => selectKey(event.target.value));
  applyLabel.addEventListener("click", applyCurrentLabel);
  labelInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      applyCurrentLabel();
    }
  });

  editToggle.addEventListener("click", () => {
    editMode = !editMode;
    editToggle.classList.toggle("active", editMode);
    editToggle.setAttribute("aria-pressed", String(editMode));
    document.querySelector(".editor").style.display = editMode ? "grid" : "none";
  });

  resetLayout.addEventListener("click", () => {
    delete saved[currentLanguage];
    persist();
    render();
    setStatus(`Раскладка ${languages[currentLanguage].name} сброшена.`);
  });

  settingsToggle.addEventListener("click", () => {
    openSettingsDialog();
  });

  settingsClose.addEventListener("click", () => {
    closeSettingsDialog();
  });

  settingsDialog.addEventListener("click", event => {
    if (event.target === settingsDialog) {
      closeSettingsDialog();
    }
  });

  settingsDialog.addEventListener("close", () => {
    handleSettingsDialogClose();
  });

  settingsSave.addEventListener("click", () => {
    applySettingsDraft();
  });

  fingerMapOpen.addEventListener("click", () => {
    settingsDialog.close();
    openFingerMapDraft();
    fingerMapDialog.showModal();
    renderFingerMapPanel();
    renderKeyboard();
  });

  fingerMapClose.addEventListener("click", () => {
    fingerMapDialog.close();
  });

  fingerMapDialog.addEventListener("click", event => {
    if (event.target === fingerMapDialog) {
      fingerMapDialog.close();
    }
  });

  fingerMapDialog.addEventListener("close", () => {
    closeFingerMapDraftIfNeeded();
    renderFingerMapPanel();
    renderKeyboard();
    focusPracticeInputSoon();
  });

  fingerMapKeyboardMode.addEventListener("click", () => {
    enterFingerKeyboardMode();
  });

  fingerMapCancel.addEventListener("click", () => {
    fingerMapDialog.close();
  });

  fingerMapReset.addEventListener("click", () => {
    resetFingerMapDraft();
  });

  fingerMapSave.addEventListener("click", () => {
    saveFingerMapDraft({ closeDialog: true, keepDraft: true });
  });

  keyboardEditorSave.addEventListener("click", () => {
    saveFingerMapDraft();
  });

  keyboardEditorCancel.addEventListener("click", () => {
    cancelFingerKeyboardMode();
  });

  keyboardEditorReset.addEventListener("click", () => {
    resetFingerMapDraft();
  });

  keyboardFingerPicker.addEventListener("click", event => {
    const button = event.target.closest(".finger-picker[data-finger]");
    selectKeyboardFingerPicker(button);
  });

  document.addEventListener("keydown", handleFingerKeyboardPhysicalInput);
  practiceInput.addEventListener("keydown", event => {
    lastPhysicalPracticeKeyId = keyIdFromEventCode(event.code);
  });
  practiceInput.addEventListener("input", handlePracticeInput);
  trainer.addEventListener("pointerdown", focusPracticeInputFromInteraction);
  practiceSample.addEventListener("pointerdown", focusPracticeInputFromInteraction);
  window.addEventListener("focus", focusPracticeInputSoon);
  window.addEventListener("resize", fitKeyboardScene);
}

function initializeApp() {
  bindAppEvents();
  hydrateFingerSvgs().finally(() => {
    render();
    focusPracticeInputSoon();
  });
}
