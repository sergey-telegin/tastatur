function scheduleKeyboardRefit() {
  refitKeyboardScene();
  requestAnimationFrame(() => {
    fitKeyboardScene();
    requestAnimationFrame(fitKeyboardScene);
  });
  setTimeout(fitKeyboardScene, 120);
  setTimeout(refitKeyboardScene, 320);
  setTimeout(refitKeyboardScene, 800);
}

function navigateAppRoute(route, fallback) {
  if (window.FlyKeyNavigation?.navigate) {
    window.FlyKeyNavigation.navigate(route);
    return;
  }
  fallback?.();
}

function closeAppRoute(routeIds, fallback) {
  const activeRoute = window.FlyKeyNavigation?.currentRoute?.();
  if (activeRoute && routeIds.includes(activeRoute.id)) {
    window.FlyKeyNavigation.closeCurrentRoute();
    return;
  }
  fallback?.();
}

function bindAppEvents() {
  document.addEventListener("pointerdown", handleFingeringTourPointerGuard, true);
  document.addEventListener("click", handleFingeringTourPointerGuard, true);
  document.addEventListener("keydown", handleFingeringTourKeyGuard, true);

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
      setStatus(formatUiText(textFor().layoutReset, { language: languages[currentLanguage].name }));
    });
  }

  settingsToggle.addEventListener("click", () => {
    navigateAppRoute({ id: "settings" }, openSettingsDialog);
  });

  onboardingNext.addEventListener("click", () => {
    advanceOnboarding();
  });

  onboardingDialog.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      advanceOnboarding();
    }
  });

  onboardingDialog.addEventListener("cancel", event => {
    event.preventDefault();
  });

  onboardingDialog.addEventListener("close", () => {
    setTimeout(updatePracticeTimerPauseState, 0);
    focusPracticeInputSoon();
  });

  lessonTipStart.addEventListener("click", () => {
    handleLessonTipPrimaryAction();
  });

  lessonTipExtra.addEventListener("click", () => {
    startFingeringTourFromLessonTip();
  });

  lessonTipDialog.addEventListener("click", event => {
    if (event.target === lessonTipDialog) {
      if (!canDismissLessonTipDialog()) return;
      closeLessonTipDialog();
    }
  });

  lessonTipDialog.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLessonTipPrimaryAction();
    }
  });

  lessonTipDialog.addEventListener("cancel", event => {
    if (!canDismissLessonTipDialog()) {
      event.preventDefault();
    }
  });

  lessonTipDialog.addEventListener("close", () => {
    setTimeout(updatePracticeTimerPauseState, 0);
    focusPracticeInputSoon();
  });

  completionNext.addEventListener("click", () => {
    goToNextLessonAfterCompletion();
  });

  completionExtra.addEventListener("click", () => {
    openFingerMapFromCompletionReminder();
  });

  completionDialog.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      goToNextLessonAfterCompletion();
    }
  });

  completionDialog.addEventListener("close", () => {
    setTimeout(updatePracticeTimerPauseState, 0);
    focusPracticeInputSoon();
  });

  nextModuleNext.addEventListener("click", () => {
    startLessonAfterNextModuleDialog();
  });

  nextModuleDialog.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      startLessonAfterNextModuleDialog();
    }
  });

  nextModuleDialog.addEventListener("cancel", event => {
    event.preventDefault();
  });

  nextModuleDialog.addEventListener("close", () => {
    setTimeout(updatePracticeTimerPauseState, 0);
    focusPracticeInputSoon();
  });

  keySoundToggle.addEventListener("click", toggleKeySound);
  practiceTextSizeToggle.addEventListener("click", togglePracticeTextSize);
  themeToggle.addEventListener("click", toggleTheme);
  assistantsToggle.addEventListener("click", toggleAssistantsPanel);
  cloudSyncToggle.addEventListener("click", toggleCloudSyncPanel);
  cloudLoginMode.addEventListener("click", () => setCloudSyncMode("login"));
  cloudCreateMode.addEventListener("click", () => setCloudSyncMode("create"));
  cloudCreateEmail.addEventListener("click", () => setCloudSyncMode("email-create"));
  cloudCreateBack.addEventListener("click", () => setCloudSyncMode("start"));
  cloudLoginBack.addEventListener("click", () => setCloudSyncMode("start"));
  cloudLogin.addEventListener("click", handleCloudLogin);
  cloudRegister.addEventListener("click", handleCloudRegister);
  cloudImport.addEventListener("click", handleCloudImport);
  cloudLogout.addEventListener("click", handleCloudLogout);
  cloudDelete.addEventListener("click", handleCloudDeleteAccount);
  metronomeInput.addEventListener("input", handleMetronomeInput);
  keyHighlightToggle.addEventListener("click", () => toggleDisplaySetting("keyHighlightEnabled"));
  fingerZonesToggle.addEventListener("click", () => toggleDisplaySetting("fingerZonesEnabled"));
  fingerHighlightToggle.addEventListener("click", () => toggleDisplaySetting("fingerHighlightEnabled"));
  pressHighlightToggle.addEventListener("click", () => toggleDisplaySetting("pressHighlightEnabled"));
  showFingersToggle.addEventListener("click", () => toggleDisplaySetting("showFingersEnabled"));
  alternateLinesToggle.addEventListener("click", () => toggleDisplaySetting("alternateLinesEnabled"));

  settingsClose.addEventListener("click", () => {
    if (fingeringTourActive) return;
    closeAppRoute(["settings"], closeSettingsDialog);
  });

  settingsDialog.addEventListener("click", event => {
    if (fingeringTourActive) return;
    if (event.target === settingsDialog) {
      closeAppRoute(["settings"], closeSettingsDialog);
    }
  });

  settingsDialog.addEventListener("close", () => {
    window.FlyKeyNavigation?.handleRouteDialogClosed?.(["settings"]);
    handleSettingsDialogClose();
  });

  learningProgramOpen.addEventListener("click", () => {
    navigateAppRoute({
      id: "settings.learningProgram",
      params: { language: currentLanguage }
    }, openLearningProgramDialog);
  });

  learningProgramClose.addEventListener("click", () => {
    closeAppRoute(["settings.learningProgram"], closeLearningProgramDialog);
  });

  learningProgramDialog.addEventListener("click", event => {
    if (event.target === learningProgramDialog) {
      closeAppRoute(["settings.learningProgram"], closeLearningProgramDialog);
    }
  });

  learningProgramDialog.addEventListener("close", () => {
    window.FlyKeyNavigation?.handleRouteDialogClosed?.(["settings.learningProgram"]);
    handleSettingsDialogClose();
  });

  customPracticeClose.addEventListener("click", () => {
    closeCustomPracticeDialog();
  });

  customPracticeCancel.addEventListener("click", () => {
    closeCustomPracticeDialog();
  });

  customPracticeDialog.addEventListener("click", event => {
    if (event.target === customPracticeDialog) {
      closeCustomPracticeDialog();
    }
  });

  customPracticeDialog.addEventListener("close", () => {
    setTimeout(updatePracticeTimerPauseState, 0);
    focusPracticeInputSoon();
  });

  customPracticeRefresh.addEventListener("click", fetchRandomPracticeText);
  customPracticeStart.addEventListener("click", startCustomPractice);
  customMetronomeInput.addEventListener("input", () => setMetronomeBpm(customMetronomeInput.value));
  customKeyHighlightToggle.addEventListener("click", () => toggleDisplaySetting("keyHighlightEnabled"));
  customFingerZonesToggle.addEventListener("click", () => toggleDisplaySetting("fingerZonesEnabled"));
  customFingerHighlightToggle.addEventListener("click", () => toggleDisplaySetting("fingerHighlightEnabled"));
  customPressHighlightToggle.addEventListener("click", () => toggleDisplaySetting("pressHighlightEnabled"));
  customShowFingersToggle.addEventListener("click", () => toggleDisplaySetting("showFingersEnabled"));
  customAlternateLinesToggle.addEventListener("click", () => toggleDisplaySetting("alternateLinesEnabled"));

  currentModuleProgressReset.addEventListener("click", () => {
    resetModuleProgress(currentPracticeModule, currentLanguage);
  });

  statsOpen.addEventListener("click", () => {
    navigateAppRoute({
      id: "settings.stats",
      params: { language: currentLanguage }
    }, openStatsDialog);
  });

  statsClose.addEventListener("click", () => {
    closeAppRoute(["settings.stats"], closeStatsDialog);
  });

  statsDialog.addEventListener("click", event => {
    if (event.target === statsDialog) {
      closeAppRoute(["settings.stats"], closeStatsDialog);
    }
  });

  statsDialog.addEventListener("close", () => {
    window.FlyKeyNavigation?.handleRouteDialogClosed?.(["settings.stats"]);
    handleSettingsDialogClose();
  });

  helpOpen.addEventListener("click", () => {
    navigateAppRoute({ id: "help" }, openHelpDialog);
  });

  helpClose.addEventListener("click", () => {
    closeAppRoute(["help"], closeHelpDialog);
  });

  helpDialog.addEventListener("click", event => {
    if (event.target === helpDialog) {
      closeAppRoute(["help"], closeHelpDialog);
    }
  });

  helpDialog.addEventListener("close", () => {
    window.FlyKeyNavigation?.handleRouteDialogClosed?.(["help"]);
    handleSettingsDialogClose();
  });

  fingerMapOpen.addEventListener("click", () => {
    const openFingerMap = () => {
      settingsDialog.close();
      openFingerMapDraft();
      enterFingerKeyboardMode();
      updatePracticeTimerPauseState();
    };

    if (openOnboardingForTrigger("featureOpen", "", { onComplete: openFingerMap })) return;
    openFingerMap();
  });

  keyboardEditorSave.addEventListener("click", () => {
    saveFingerMapDraft();
    if (fingeringTourActive) finishFingeringTour();
  });

  keyboardEditorCancel.addEventListener("click", () => {
    cancelFingerKeyboardMode();
    if (fingeringTourActive) finishFingeringTour();
  });

  keyboardEditorReset.addEventListener("click", () => {
    resetFingerMapDraft();
  });

  keyboardFingerPicker.addEventListener("click", event => {
    const button = event.target.closest(".finger-picker[data-finger]");
    selectKeyboardFingerPicker(button);
  });

  document.addEventListener("pointerdown", unlockAppAudioContext, { capture: true });
  document.addEventListener("touchstart", unlockAppAudioContext, { capture: true });
  document.addEventListener("keydown", unlockAppAudioContext, { capture: true });
  document.addEventListener("keydown", handleFingerKeyboardPhysicalInput);
  window.addEventListener("keydown", handleGlobalKeyDown);
  window.addEventListener("keyup", handleGlobalKeyUp);
  trainer.addEventListener("pointerdown", focusPracticeInputFromInteraction);
  practiceSample.addEventListener("pointerdown", focusPracticeInputFromInteraction);
  document.addEventListener("pointerdown", focusPracticeInputFromInteraction);
  window.addEventListener("focus", focusPracticeInputSoon);
  window.addEventListener("blur", clearPressedPracticeKeys);
  window.addEventListener("resize", fitKeyboardScene);
  window.addEventListener("resize", positionFingeringTourCard);
  window.addEventListener("load", () => {
    scheduleKeyboardRefit();
    loadCloudOAuthProviders();
  });
  window.addEventListener("pageshow", () => {
    scheduleKeyboardRefit();
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
  render();
  updateMetronome();
  focusPracticeInputSoon();
  scheduleKeyboardRefit();
  window.FlyKeyWebNavigation?.initialize?.();

  if (initializeLessonStoryboardMode()) {
    return;
  }

  requestAnimationFrame(() => {
    if (isHandCalibrationModeEnabled()) {
      closeLessonTipDialog();
    } else if (!openOnboardingIfNeeded()) {
      openCurrentLessonTip();
    }
    scheduleKeyboardRefit();
    document.documentElement.dataset.appReady = "true";
  });

  hydrateFingerSvgs().finally(() => {
    renderKeyboard();
    scheduleKeyboardRefit();
    initializeHandCalibrationMode();
  });

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      scheduleKeyboardRefit();
      if (!isHandCalibrationModeEnabled() && !onboardingDialog.open && !lessonTipDialog.open) {
        openCurrentLessonTip();
      }
    }).catch(() => {});
  }
}
