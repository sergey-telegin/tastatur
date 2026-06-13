function openSettingsDialog() {
  if (settingsDialog.open) return;
  settingsDialog.showModal();
  updatePracticeTimerPauseState();
  renderTabs();
}

function closeSettingsDialog() {
  if (!settingsDialog.open) return;
  settingsDialog.close();
}

function openLearningProgramDialog() {
  if (settingsDialog.open) settingsDialog.close();
  if (learningProgramDialog.open) return;
  learningProgramDialog.showModal();
  updatePracticeTimerPauseState();
  renderTabs();
  renderModuleButtons();
}

function closeLearningProgramDialog() {
  if (!learningProgramDialog.open) return;
  learningProgramDialog.close();
}

function openStatsDialog() {
  if (settingsDialog.open) settingsDialog.close();
  if (statsDialog.open) return;
  statsDialog.showModal();
  updatePracticeTimerPauseState();
  renderPracticeStats();
}

function closeStatsDialog() {
  if (!statsDialog.open) return;
  statsDialog.close();
}

function openHelpDialog() {
  if (settingsDialog.open) settingsDialog.close();
  if (helpDialog.open) return;
  helpDialog.showModal();
  updatePracticeTimerPauseState();
}

function closeHelpDialog() {
  if (!helpDialog.open) return;
  helpDialog.close();
}

function applySettings(nextSettings, { closeDialog = false } = {}) {
  const nextModules = practiceModulesFor(nextSettings.language);

  currentLanguage = nextSettings.language;
  applyDocumentLanguage();
  currentPracticeModule = nextModules[nextSettings.module] ? nextSettings.module : firstPracticeModuleId(currentLanguage);
  saved.currentLanguage = currentLanguage;
  saved.currentPracticeModule = currentPracticeModule;
  restoreCurrentPracticeProgress();
  resetPracticeMetrics();
  persist();
  window.dispatchEvent(new CustomEvent("flykey:languagechange", { detail: { language: currentLanguage } }));
  render();
  if (closeDialog && settingsDialog.open) {
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
  if (settingName === "alternateLinesEnabled") {
    alternateLinesEnabled = nextValue;
    if (!nextValue) practiceAlternateLineRepeat = false;
    updateMetronome();
  }

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

let cloudSyncMode = "start";

function setCloudSyncMode(mode) {
  cloudSyncMode = mode;
  renderCloudSyncPanel();
}

function toggleCloudSyncPanel() {
  if (!window.FlyKeyApiClient?.isBackendConfigured?.()) return;

  const isExpanded = cloudSyncToggle.getAttribute("aria-expanded") === "true";
  const nextExpanded = !isExpanded;

  cloudSyncToggle.setAttribute("aria-expanded", String(nextExpanded));
  cloudSyncPanel.hidden = !nextExpanded;
  settingsDialog.classList.toggle("account-mode", nextExpanded);
  if (nextExpanded) {
    cloudSyncMode = "start";
    renderCloudSyncPanel();
  }
}

function cloudCredentials() {
  return {
    email: cloudEmailInput.value.trim(),
    password: cloudPasswordInput.value,
    profileName: cloudProfileInput.value.trim() || "Main"
  };
}

function cloudErrorText(result) {
  const text = textFor();
  const code = result?.data?.error?.code || result?.code || "";
  const message = String(result?.data?.error?.message || result?.message || "");

  if (code === "profile_sync_required" || message.includes("profile_sync")) {
    return text.cloudProfileSyncRequired;
  }

  return text.cloudError;
}

async function runCloudAction(action) {
  const text = textFor();
  cloudStatus.textContent = text.cloudWorking;

  try {
    const result = await action();
    return result;
  } catch (error) {
    cloudStatus.textContent = text.cloudError;
    return { status: "error", error };
  } finally {
    renderCloudSyncPanel(cloudStatus.textContent);
  }
}

async function handleCloudLogin() {
  const text = textFor();
  const credentials = cloudCredentials();
  if (!credentials.email || !credentials.password) {
    renderCloudSyncPanel(text.cloudMissingCredentials);
    return;
  }

  const result = await runCloudAction(() => window.FlyKeyCloudSync.login({
    email: credentials.email,
    password: credentials.password,
    device: { platform: "web", appVersion: "0.1.0" }
  }));
  renderCloudSyncPanel(result.status === "ok" ? text.cloudLoginOk : cloudErrorText(result));
}

async function handleCloudRegister() {
  const text = textFor();
  const credentials = cloudCredentials();
  if (!credentials.email || !credentials.password) {
    renderCloudSyncPanel(text.cloudMissingCredentials);
    return;
  }

  const result = await runCloudAction(() => window.FlyKeyCloudSync.register({
    email: credentials.email,
    password: credentials.password,
    device: { platform: "web", appVersion: "0.1.0" }
  }));
  renderCloudSyncPanel(result.status === "ok" ? text.cloudRegisterOk : cloudErrorText(result));
}

async function handleCloudImport() {
  const text = textFor();
  const credentials = cloudCredentials();
  const result = await runCloudAction(() => window.FlyKeyCloudSync.importCurrentState(credentials.profileName));
  renderCloudSyncPanel(result.status === "ok" ? text.cloudImportOk : cloudErrorText(result));
}

async function handleCloudLogout() {
  const text = textFor();
  await runCloudAction(() => window.FlyKeyCloudSync.logout());
  cloudPasswordInput.value = "";
  renderCloudSyncPanel(text.cloudLogoutOk);
}

async function handleCloudDeleteAccount() {
  const text = textFor();
  if (!window.confirm(text.cloudDeleteConfirm)) return;

  const result = await runCloudAction(() => window.FlyKeyCloudSync.deleteAccount());
  if (result.status === "ok") {
    cloudEmailInput.value = "";
    cloudPasswordInput.value = "";
    cloudProfileInput.value = "Main";
  }
  renderCloudSyncPanel(result.status === "ok" ? text.cloudDeleteOk : cloudErrorText(result));
}

async function loadCloudOAuthProviders() {
  if (!window.FlyKeyCloudSync?.providers) return;

  const result = await window.FlyKeyCloudSync.providers();
  if (result.status === "ok") {
    renderCloudOauthProviders(result.data.providers || []);
  }
}

async function handleCloudOAuth(provider) {
  const text = textFor();
  const result = await runCloudAction(() => window.FlyKeyCloudSync.startOAuth(provider));
  renderCloudSyncPanel(result.status === "ok" ? text.cloudWorking : cloudErrorText(result));
}

window.addEventListener("message", event => {
  if (event.data?.type !== "flykey:oauth") return;
  let backendOrigin = "";
  try {
    backendOrigin = new URL(window.FlyKeyApiClient.getConfig().backendBaseUrl).origin;
  } catch {
    return;
  }
  if (event.origin !== backendOrigin) return;

  const payload = event.data.payload || {};
  if (payload.error) {
    renderCloudSyncPanel(cloudErrorText(payload));
    return;
  }

  try {
    window.FlyKeyCloudSync.rememberOAuthResult(payload);
    renderCloudSyncPanel(textFor().cloudLoginOk);
  } catch {
    renderCloudSyncPanel(textFor().cloudError);
  }
});

function handleSettingsDialogClose() {
  settingsDialog.classList.remove("account-mode");
  cloudSyncToggle.setAttribute("aria-expanded", "false");
  cloudSyncPanel.hidden = true;
  cloudSyncMode = "start";
  setTimeout(updatePracticeTimerPauseState, 0);
  focusPracticeInputSoon();
}
