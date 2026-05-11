function renderModuleButtons() {
  const modules = practiceModulesFor(currentLanguage);
  const moduleGroups = practiceModuleGroupsFor(currentLanguage);
  const selectedModule = modules[currentPracticeModule] ? currentPracticeModule : firstPracticeModuleId(currentLanguage);
  const text = textFor();

  practiceModuleList.innerHTML = "";

  const appendLesson = lesson => {
    const progress = lessonProgressWithLiveMetrics(lesson.id);
    const row = document.createElement("div");
    row.className = "module-row lesson-row";

    const button = document.createElement("button");
    button.type = "button";
    button.className = `module-btn lesson-btn${lesson.id === selectedModule ? " active" : ""}`;

    const name = document.createElement("span");
    name.className = "module-btn-name";
    name.textContent = lesson.name;

    const meta = document.createElement("span");
    meta.className = "lesson-meta";
    meta.textContent = formatLessonMeta(lesson, currentLanguage);

    const percent = document.createElement("span");
    percent.className = "module-btn-percent";
    percent.textContent = `${progress.percent}%`;

    const rating = document.createElement("span");
    const ratingDetails = starRatingDetailsForLesson(lesson, progress);
    rating.className = "module-btn-rating";
    rating.classList.toggle("module-btn-rating-flying", ratingDetails.isFlying);
    rating.textContent = ratingDetails.text;

    const content = document.createElement("span");
    content.className = "lesson-btn-content";
    content.append(name, meta);
    const progressSummary = document.createElement("span");
    progressSummary.className = "module-btn-progress";
    progressSummary.append(percent, rating);
    button.append(content, progressSummary);

    button.addEventListener("click", () => {
      if (lesson.customPractice) {
        openCustomPracticeDialog(lesson.id);
        return;
      }

      applySettings({ language: currentLanguage, module: lesson.id });
      closeLearningProgramDialog();
      openCurrentLessonTip({ force: true });
      renderModuleButtons();
    });

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "module-reset-btn";
    resetButton.textContent = "↺";
    resetButton.title = text.resetModuleProgress;
    resetButton.setAttribute("aria-label", `${text.resetModuleProgress}: ${lesson.name}`);
    resetButton.addEventListener("click", event => {
      event.stopPropagation();
      resetModuleProgress(lesson.id, currentLanguage);
    });

    row.append(button, resetButton);
    practiceModuleList.append(row);
  };

  moduleGroups.forEach(module => {
    const moduleTitle = document.createElement("h3");
    moduleTitle.className = "program-module-title";
    moduleTitle.textContent = module.title;
    practiceModuleList.append(moduleTitle);

    module.lessons.forEach(appendLesson);
  });

  if (!moduleGroups.length) {
    Object.values(modules).forEach(appendLesson);
  }

  renderLearningProgramSummary();
}

function formatLessonMeta(lesson, language = currentLanguage) {
  const text = textFor(language);
  const target = lesson.target || {};
  const goals = [];

  if (target.lines) {
    goals.push(`${text.targetLines}: ${target.lines}`);
  }
  if (target.accuracy) {
    goals.push(`${text.practiceAccuracy}: ≥${target.accuracy}%`);
  }
  if (target.speedMax) {
    goals.push(`${text.practiceSpeed}: ≤${target.speedMax} ${text.practiceSpeedUnit}`);
  }
  if (target.speed) {
    goals.push(`${text.practiceSpeed}: ≥${target.speed} ${text.practiceSpeedUnit}`);
  }
  if (target.rhythmTolerance) {
    goals.push(`${text.metronome}: ±${target.rhythmTolerance}%`);
  }
  if (target.alternateLines) {
    goals.push(text.alternateLines);
  }
  if (target.assistants === false) {
    goals.push(`${text.assistants}: ${text.toggleOff}`);
  }

  return goals.join(", ");
}

function lessonProgressWithLiveMetrics(lessonId) {
  const progress = moduleProgressFor(currentLanguage, lessonId);

  if (lessonId !== currentPracticeModule || !practiceSessionStartedAt) {
    return progress;
  }

  return {
    ...progress,
    accuracy: Math.max(progress.accuracy || 0, currentPracticeAccuracy()),
    speed: Math.max(progress.speed || 0, currentPracticeSpeed()),
    assistantsUsed: progress.assistantsUsed || practiceAssistantsUsed,
    metronomeAccuracy: currentPracticeMetronomeAccuracy()
  };
}

function isPerfectLessonRun(progress) {
  if ((progress.accuracy || 0) < 100) return false;
  if (progress.metronomeAccuracy === null || progress.metronomeAccuracy === undefined) return true;
  return progress.metronomeAccuracy > 95;
}

function starRatingDetailsForLesson(lesson, progress) {
  if (!progress.isComplete) {
    return { text: "", isFlying: false };
  }

  const target = lesson.target || {};
  const accuracy = progress.accuracy || 0;
  let filledStars = 2;

  if (!target.accuracy || accuracy >= target.accuracy) {
    filledStars += 1;
  }
  if (accuracy >= 95) {
    filledStars += 1;
  }
  if (isPerfectLessonRun(progress)) {
    filledStars = 5;
  }

  return {
    text: `${"★".repeat(filledStars)}${"☆".repeat(5 - filledStars)}`,
    isFlying: filledStars === 5 && progress.assistantsUsed !== true
  };
}

function gradeLabelForAccuracy(accuracy, language = currentLanguage) {
  const text = textFor(language);
  if (accuracy >= 95) return text.gradeExcellent;
  if (accuracy >= 90) return text.gradeOk;
  if (accuracy >= 85) return text.gradeWeak;
  return text.gradeRepeat;
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
  assistantsToggleText.textContent = text.assistants;
  assistantsToggle.setAttribute("aria-label", text.assistants);
  keyHighlightLabel.closest(".menu-section")?.setAttribute("aria-label", text.assistants);
  renderKeySoundToggle();
  renderPracticeTextSizeToggle();
  renderThemeToggle();
  renderDisplaySettings();
  renderLearningProgramSummary();
  renderStatsDialog();
}

function renderKeySoundToggle() {
  const text = textFor();
  keySoundToggle.classList.toggle("active", keySoundEnabled);
  keySoundToggle.setAttribute("aria-pressed", String(keySoundEnabled));
  keySoundToggle.setAttribute("aria-label", `${text.sound}: ${keySoundEnabled ? text.toggleOn : text.toggleOff}`);
  keySoundIcon.src = keySoundEnabled ? "assets/sound-on.svg" : "assets/sound-off.svg";
  keySoundToggleText.textContent = keySoundEnabled ? text.toggleOn : text.toggleOff;
}

function renderPracticeTextSizeToggle() {
  const text = textFor();
  const sizeLabel = practiceTextSize.toUpperCase();

  practiceTextSizeToggle.setAttribute("aria-label", `${text.practiceTextSize}: ${sizeLabel}`);
  practiceTextSizeToggle.title = `${text.practiceTextSize}: ${sizeLabel}`;
  practiceTextSizeIcon.textContent = sizeLabel;
  practiceTextSizeToggleText.textContent = sizeLabel;
}

function renderThemeToggle() {
  const text = textFor();
  const isLightTheme = currentTheme === "light";
  const themeName = isLightTheme ? text.lightTheme : text.darkTheme;

  themeToggle.classList.toggle("active", isLightTheme);
  themeToggle.setAttribute("aria-pressed", String(isLightTheme));
  themeToggle.setAttribute("aria-label", `${text.theme}: ${themeName}`);
  themeToggle.title = `${text.theme}: ${themeName}`;
  themeToggleText.textContent = themeName;
}

function renderBooleanToggle(button, textNode, isEnabled, labels = {}) {
  button.classList.toggle("active", isEnabled);
  button.setAttribute("aria-pressed", String(isEnabled));
  textNode.textContent = isEnabled ? (labels.on || textFor().toggleOn) : (labels.off || textFor().toggleOff);
}

function renderDisplaySettings() {
  const text = textFor();
  keyHighlightLabel.textContent = text.keyHighlight;
  fingerZonesLabel.textContent = text.fingerZones;
  fingerHighlightLabel.textContent = text.fingerHighlight;
  pressHighlightLabel.textContent = text.pressHighlight;
  showFingersLabel.textContent = text.showFingers;
  alternateLinesLabel.textContent = text.alternateLines;
  metronomeLabel.textContent = text.metronome;
  metronomeInput.setAttribute("aria-label", text.metronome);
  metronomeInput.value = metronomeBpm > 0 ? String(metronomeBpm) : "";

  renderBooleanToggle(keyHighlightToggle, keyHighlightToggleText, keyHighlightEnabled);
  renderBooleanToggle(fingerZonesToggle, fingerZonesToggleText, fingerZonesEnabled);
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
  const accuracy = currentPracticeAccuracy();
  const stats = [
    [text.practiceAccuracy, `${accuracy}%`],
    [text.practiceSpeed, `${currentPracticeSpeed()} ${text.practiceSpeedUnit}`],
    [text.practiceErrors, String(practiceErrorCount)],
    [text.trainingTime, formatTrainingTime(trainingTimeMs)],
    [text.lessonTarget, gradeLabelForAccuracy(accuracy)]
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
    <strong>${accuracy}% · ${currentPracticeSpeed()} ${text.practiceSpeedUnit}</strong>
  `;
  dailyStatsList.append(today);
}
