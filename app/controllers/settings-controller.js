function openSettingsDialog() {
  settingsDialog.showModal();
  renderTabs();
  renderModuleButtons();
}

function closeSettingsDialog() {
  settingsDialog.close();
}

function applySettings(nextSettings, { closeDialog = false } = {}) {
  const nextModules = practiceModulesFor(nextSettings.language);

  currentLanguage = nextSettings.language;
  currentPracticeModule = nextModules[nextSettings.module] ? nextSettings.module : "module1";
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

function handleSettingsDialogClose() {
  focusPracticeInputSoon();
}
