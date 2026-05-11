function openSettingsDialog() {
  settingsDialog.showModal();
  updatePracticeTimerPauseState();
  renderTabs();
}

function closeSettingsDialog() {
  settingsDialog.close();
}

function openLearningProgramDialog() {
  settingsDialog.close();
  learningProgramDialog.showModal();
  updatePracticeTimerPauseState();
  renderTabs();
  renderModuleButtons();
}

function closeLearningProgramDialog() {
  learningProgramDialog.close();
}

function openStatsDialog() {
  settingsDialog.close();
  statsDialog.showModal();
  updatePracticeTimerPauseState();
  renderPracticeStats();
}

function closeStatsDialog() {
  statsDialog.close();
}

function openHelpDialog() {
  settingsDialog.close();
  helpDialog.showModal();
  updatePracticeTimerPauseState();
}

function closeHelpDialog() {
  helpDialog.close();
}

function applySettings(nextSettings, { closeDialog = false } = {}) {
  const nextModules = practiceModulesFor(nextSettings.language);

  currentLanguage = nextSettings.language;
  currentPracticeModule = nextModules[nextSettings.module] ? nextSettings.module : firstPracticeModuleId(currentLanguage);
  saved.currentLanguage = currentLanguage;
  saved.currentPracticeModule = currentPracticeModule;
  restoreCurrentPracticeProgress();
  resetPracticeMetrics();
  persist();
  render();
  if (closeDialog) {
    settingsDialog.close();
  }
}

function resetModuleProgress(moduleId = currentPracticeModule, language = currentLanguage) {
  const languageStore = languagePracticeProgressStore(language);
  delete languageStore[moduleId];

  if (language === currentLanguage && moduleId === currentPracticeModule) {
    restoreCurrentPracticeProgress();
    resetPracticeMetrics();
  }

  persist();
  renderTabs();
  renderModuleButtons();
  renderPracticeProgress();
  renderPracticeLine();
  setStatus(textFor(language).moduleProgressReset);
}

function setKeySoundEnabled(isEnabled) {
  if (keySoundEnabled === isEnabled) return;

  keySoundEnabled = isEnabled;
  saved.keySoundEnabled = keySoundEnabled;
  persist();
  renderKeySoundToggle();
  if (keySoundEnabled) {
    unlockKeyAudioContext().then(playKeySound);
  }
}

function toggleKeySound() {
  setKeySoundEnabled(!keySoundEnabled);
}

function setPracticeTextSize(nextSize) {
  if (practiceTextSize === nextSize) return;

  practiceTextSize = ["s", "m", "l"].includes(nextSize) ? nextSize : "m";
  saved.practiceTextSize = practiceTextSize;
  applyPracticeTextSize();
  persist();
  renderPracticeTextSizeToggle();
}

function togglePracticeTextSize() {
  const sizeOrder = ["s", "m", "l"];
  const currentIndex = sizeOrder.indexOf(practiceTextSize);
  setPracticeTextSize(sizeOrder[(currentIndex + 1) % sizeOrder.length]);
}

function setTheme(nextTheme) {
  if (currentTheme === nextTheme) return;

  currentTheme = nextTheme === "light" ? "light" : "dark";
  saved.theme = currentTheme;
  applyTheme();
  persist();
  renderThemeToggle();
}

function toggleTheme() {
  setTheme(currentTheme === "light" ? "dark" : "light");
}

function toggleDisplaySetting(settingName) {
  const stateByName = {
    keyHighlightEnabled,
    fingerZonesEnabled,
    fingerHighlightEnabled,
    pressHighlightEnabled,
    showFingersEnabled,
    alternateLinesEnabled
  };
  const nextValue = !stateByName[settingName];

  if (settingName === "keyHighlightEnabled") keyHighlightEnabled = nextValue;
  if (settingName === "fingerZonesEnabled") fingerZonesEnabled = nextValue;
  if (settingName === "fingerHighlightEnabled") fingerHighlightEnabled = nextValue;
  if (settingName === "pressHighlightEnabled") pressHighlightEnabled = nextValue;
  if (settingName === "showFingersEnabled") showFingersEnabled = nextValue;
  if (settingName === "alternateLinesEnabled") alternateLinesEnabled = nextValue;

  saved[settingName] = nextValue;
  persist();
  renderDisplaySettings();
  if (customPracticeDialog.open) {
    renderCustomPracticeDialog();
  }
  renderKeyboard();
}

function normalizeMetronomeBpm(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0;
  return Math.min(parsed, 400);
}

function setMetronomeBpm(nextBpm) {
  const normalizedBpm = normalizeMetronomeBpm(nextBpm);

  metronomeBpm = normalizedBpm;
  saved.metronomeBpm = metronomeBpm;
  persist();
  renderDisplaySettings();
  updateMetronome();
}

function handleMetronomeInput() {
  setMetronomeBpm(metronomeInput.value);
}

function toggleAssistantsPanel() {
  const isExpanded = assistantsToggle.getAttribute("aria-expanded") === "true";
  const nextExpanded = !isExpanded;

  assistantsToggle.setAttribute("aria-expanded", String(nextExpanded));
  assistantsPanel.hidden = !nextExpanded;
}

function handleSettingsDialogClose() {
  setTimeout(updatePracticeTimerPauseState, 0);
  focusPracticeInputSoon();
}
