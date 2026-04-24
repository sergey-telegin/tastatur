function openSettingsDraft() {
  draftSettings = {
    language: currentLanguage,
    module: currentPracticeModule
  };
}

function currentSettingsDraft() {
  return draftSettings || {
    language: currentLanguage,
    module: currentPracticeModule
  };
}

function openSettingsDialog() {
  openSettingsDraft();
  settingsDialog.showModal();
  renderTabs();
  renderModuleButtons();
}

function closeSettingsDialog() {
  settingsDialog.close();
}

function applySettingsDraft() {
  const nextSettings = currentSettingsDraft();
  const nextModules = practiceModulesFor(nextSettings.language);

  currentLanguage = nextSettings.language;
  currentPracticeModule = nextModules[nextSettings.module] ? nextSettings.module : "module1";
  saved.currentLanguage = currentLanguage;
  saved.currentPracticeModule = currentPracticeModule;
  practiceLineIndex = 0;
  persist();
  draftSettings = null;
  render();
  settingsDialog.close();
  setStatus(textFor().settingsSaved);
}

function handleSettingsDialogClose() {
  draftSettings = null;
  focusPracticeInputSoon();
}
