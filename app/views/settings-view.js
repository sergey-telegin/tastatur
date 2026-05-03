function renderModuleButtons() {
  const modules = practiceModulesFor(currentLanguage);
  const selectedModule = modules[currentPracticeModule] ? currentPracticeModule : "module1";
  const text = textFor();

  practiceModuleList.innerHTML = "";
  Object.entries(modules).forEach(([id, module]) => {
    const progress = moduleProgressFor(currentLanguage, id);
    const row = document.createElement("div");
    row.className = "module-row";

    const button = document.createElement("button");
    button.type = "button";
    button.className = `module-btn${id === selectedModule ? " active" : ""}`;
    button.innerHTML = `
      <span class="module-btn-name">${module.name}</span>
      <span class="module-btn-percent">${progress.percent}%</span>
    `;
    button.addEventListener("click", () => {
      applySettings({ language: currentLanguage, module: id });
      renderModuleButtons();
    });

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "module-reset-btn";
    resetButton.textContent = "↺";
    resetButton.title = text.resetModuleProgress;
    resetButton.setAttribute("aria-label", `${text.resetModuleProgress}: ${module.name}`);
    resetButton.addEventListener("click", event => {
      event.stopPropagation();
      resetModuleProgress(id, currentLanguage);
    });

    row.append(button, resetButton);
    practiceModuleList.append(row);
  });

  renderLearningProgramSummary();
}

function renderTabs() {
  const text = textFor();
  languageTabs.innerHTML = "";

  Object.entries(languages).forEach(([id, language]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `mode-btn${id === currentLanguage ? " active" : ""}`;
    button.textContent = language.name;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(id === currentLanguage));
    button.addEventListener("click", () => {
      applySettings({ language: id, module: currentPracticeModule });
      renderTabs();
      renderModuleButtons();
    });
    languageTabs.append(button);
  });

  settingsTitle.textContent = text.settings;
  settingsToggle.setAttribute("aria-label", text.settings);
  settingsClose.setAttribute("aria-label", text.close);
  languageLabel.textContent = text.language;
  soundLabel.closest(".menu-section")?.setAttribute("aria-label", text.generalSettings);
  languageTabs.parentElement?.setAttribute("aria-label", text.language);
  languageTabs.setAttribute("aria-label", text.keyboardLanguage);
  learningProgramOpenText.textContent = text.learningProgram;
  learningProgramOpen.setAttribute("aria-label", text.learningProgram);
  learningProgramOpen.closest(".menu-section")?.setAttribute("aria-label", text.learningProgram);
  learningProgramTitle.textContent = text.learningProgram;
  learningProgramClose.setAttribute("aria-label", text.close);
  statsOpenText.textContent = text.statistics;
  statsOpen.setAttribute("aria-label", text.statistics);
  statsOpen.closest(".menu-section")?.setAttribute("aria-label", text.statistics);
  statsTitle.textContent = text.statistics;
  statsClose.setAttribute("aria-label", text.close);
  helpOpenText.textContent = text.help;
  helpOpen.setAttribute("aria-label", text.help);
  helpOpen.closest(".menu-section")?.setAttribute("aria-label", text.help);
  helpTitle.textContent = text.help;
  helpClose.setAttribute("aria-label", text.close);
  helpTextPractice.textContent = text.helpPractice;
  helpTextProgram.textContent = text.helpProgram;
  helpTextFingering.textContent = text.helpFingering;
  moduleLabel.textContent = text.allModules;
  programCurrentProgressLabel.textContent = text.currentModuleProgress;
  currentModuleProgressReset.textContent = text.resetCurrentModuleProgress;
  soundLabel.textContent = text.sound;
  keyHighlightLabel.closest(".menu-section")?.setAttribute("aria-label", text.displaySettings);
  renderKeySoundToggle();
  renderDisplaySettings();
  renderLearningProgramSummary();
  renderStatsDialog();
}

function renderKeySoundToggle() {
  const text = textFor();
  keySoundToggle.classList.toggle("active", keySoundEnabled);
  keySoundToggle.setAttribute("aria-pressed", String(keySoundEnabled));
  keySoundToggleText.textContent = keySoundEnabled ? text.toggleOn : text.toggleOff;
}

function renderBooleanToggle(button, textNode, isEnabled, labels = {}) {
  button.classList.toggle("active", isEnabled);
  button.setAttribute("aria-pressed", String(isEnabled));
  textNode.textContent = isEnabled ? (labels.on || textFor().toggleOn) : (labels.off || textFor().toggleOff);
}

function renderDisplaySettings() {
  const text = textFor();
  keyHighlightLabel.textContent = text.keyHighlight;
  fingerHighlightLabel.textContent = text.fingerHighlight;
  pressHighlightLabel.textContent = text.pressHighlight;
  showFingersLabel.textContent = text.showFingers;
  alternateLinesLabel.textContent = text.alternateLines;

  renderBooleanToggle(keyHighlightToggle, keyHighlightToggleText, keyHighlightEnabled);
  renderBooleanToggle(fingerHighlightToggle, fingerHighlightToggleText, fingerHighlightEnabled);
  renderBooleanToggle(pressHighlightToggle, pressHighlightToggleText, pressHighlightEnabled);
  renderBooleanToggle(showFingersToggle, showFingersToggleText, showFingersEnabled);
  renderBooleanToggle(alternateLinesToggle, alternateLinesToggleText, alternateLinesEnabled);
}

function renderLearningProgramSummary() {
  if (!programCurrentProgress) return;

  const progress = moduleProgressFor(currentLanguage, currentPracticeModule);
  programCurrentProgress.textContent = formatModuleProgressText(
    progress.completedLines,
    progress.totalLines,
    currentLanguage
  );
}

function formatTrainingTime(ms) {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function renderStatsDialog() {
  if (!statsOverview || !dailyStatsList) return;

  const text = textFor();
  const trainingTimeMs = currentPracticeActiveElapsedMs();
  const stats = [
    [text.practiceAccuracy, `${currentPracticeAccuracy()}%`],
    [text.practiceSpeed, `${currentPracticeSpeed()} ${text.practiceSpeedUnit}`],
    [text.practiceErrors, String(practiceErrorCount)],
    [text.trainingTime, formatTrainingTime(trainingTimeMs)]
  ];

  statsOverview.innerHTML = "";
  stats.forEach(([label, value]) => {
    const item = document.createElement("div");
    item.className = "stat-card";
    item.innerHTML = `
      <span class="settings-label">${label}</span>
      <strong>${value}</strong>
    `;
    statsOverview.append(item);
  });

  statsDailyLabel.textContent = text.dailyStats;
  dailyStatsList.innerHTML = "";

  const today = document.createElement("div");
  today.className = "daily-stat-row";
  today.innerHTML = `
    <span>${text.today}</span>
    <strong>${currentPracticeAccuracy()}% · ${currentPracticeSpeed()} ${text.practiceSpeedUnit}</strong>
  `;
  dailyStatsList.append(today);
}
