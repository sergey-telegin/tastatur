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
  practiceLineIndex = 0;
  resetPracticeMetrics();
  persist();
  render();
  if (closeDialog) {
    settingsDialog.close();
  }
}

function handleSettingsDialogClose() {
  focusPracticeInputSoon();
}
