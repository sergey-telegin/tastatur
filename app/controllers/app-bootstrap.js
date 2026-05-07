function bindAppEvents() {
  keySelect.addEventListener("change", event => selectKey(event.target.value));
  applyLabel.addEventListener("click", applyCurrentLabel);
  labelInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      applyCurrentLabel();
    }
  });

  if (editToggle) {
    editToggle.addEventListener("click", () => {
      editMode = !editMode;
      editToggle.classList.toggle("active", editMode);
      editToggle.setAttribute("aria-pressed", String(editMode));
      document.querySelector(".editor").style.display = editMode ? "grid" : "none";
    });
  }

  if (resetLayout) {
    resetLayout.addEventListener("click", () => {
      delete saved[currentLanguage];
      persist();
      render();
      setStatus(`Раскладка ${languages[currentLanguage].name} сброшена.`);
    });
  }

  settingsToggle.addEventListener("click", () => {
    openSettingsDialog();
  });

  keySoundToggle.addEventListener("click", toggleKeySound);
  practiceTextSizeToggle.addEventListener("click", togglePracticeTextSize);
  themeToggle.addEventListener("click", toggleTheme);
  keyHighlightToggle.addEventListener("click", () => toggleDisplaySetting("keyHighlightEnabled"));
  fingerHighlightToggle.addEventListener("click", () => toggleDisplaySetting("fingerHighlightEnabled"));
  pressHighlightToggle.addEventListener("click", () => toggleDisplaySetting("pressHighlightEnabled"));
  showFingersToggle.addEventListener("click", () => toggleDisplaySetting("showFingersEnabled"));
  alternateLinesToggle.addEventListener("click", () => toggleDisplaySetting("alternateLinesEnabled"));

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

  learningProgramOpen.addEventListener("click", () => {
    openLearningProgramDialog();
  });

  learningProgramClose.addEventListener("click", () => {
    closeLearningProgramDialog();
  });

  learningProgramDialog.addEventListener("click", event => {
    if (event.target === learningProgramDialog) {
      closeLearningProgramDialog();
    }
  });

  learningProgramDialog.addEventListener("close", () => {
    handleSettingsDialogClose();
  });

  currentModuleProgressReset.addEventListener("click", () => {
    resetModuleProgress(currentPracticeModule, currentLanguage);
  });

  statsOpen.addEventListener("click", () => {
    openStatsDialog();
  });

  statsClose.addEventListener("click", () => {
    closeStatsDialog();
  });

  statsDialog.addEventListener("click", event => {
    if (event.target === statsDialog) {
      closeStatsDialog();
    }
  });

  statsDialog.addEventListener("close", () => {
    handleSettingsDialogClose();
  });

  helpOpen.addEventListener("click", () => {
    openHelpDialog();
  });

  helpClose.addEventListener("click", () => {
    closeHelpDialog();
  });

  helpDialog.addEventListener("click", event => {
    if (event.target === helpDialog) {
      closeHelpDialog();
    }
  });

  helpDialog.addEventListener("close", () => {
    handleSettingsDialogClose();
  });

  fingerMapOpen.addEventListener("click", () => {
    settingsDialog.close();
    openFingerMapDraft();
    enterFingerKeyboardMode();
    updatePracticeTimerPauseState();
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
    setTimeout(updatePracticeTimerPauseState, 0);
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
  window.addEventListener("keydown", handleGlobalKeyDown);
  trainer.addEventListener("pointerdown", focusPracticeInputFromInteraction);
  practiceSample.addEventListener("pointerdown", focusPracticeInputFromInteraction);
  document.addEventListener("pointerdown", focusPracticeInputFromInteraction);
  window.addEventListener("focus", focusPracticeInputSoon);
  window.addEventListener("resize", fitKeyboardScene);
  window.addEventListener("load", () => {
    refitKeyboardScene();
    requestAnimationFrame(fitKeyboardScene);
  });

  if (window.ResizeObserver) {
    const keyboardResizeObserver = new ResizeObserver(() => {
      fitKeyboardScene();
    });
    keyboardResizeObserver.observe(keyboardScale);
  }
}

function initializeApp() {
  bindAppEvents();
  hydrateFingerSvgs().finally(() => {
    render();
    focusPracticeInputSoon();
    requestAnimationFrame(fitKeyboardScene);
    setTimeout(fitKeyboardScene, 120);

    if (document.fonts?.ready) {
      document.fonts.ready.then(refitKeyboardScene).catch(() => {});
    }
  });
}
