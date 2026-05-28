(() => {
  const language = window.flyKeyEarlyLanguage || document.documentElement.lang || "en";
  const ui = (typeof uiText !== "undefined" && (uiText[language] || uiText.en)) || null;
  if (!ui) return;

  const text = {
    title: ui.seo?.eyebrow ? `FlyKey — ${ui.seo.eyebrow}` : "FlyKey",
    description: ui.seo?.lead || "",
    moduleProgress: ui.currentModuleProgress,
    progressText: `0 / 0 ${ui.moduleLines}`,
    typingStats: ui.statistics,
    accuracy: ui.practiceAccuracy,
    speed: ui.practiceSpeed,
    speedUnit: ui.practiceSpeedUnit,
    settings: ui.settings,
    typingText: ui.typingText,
    keyboard: ui.keyboard,
    fingers: ui.fingers,
    fingerPicker: ui.fingerChoice,
    restoreDefaults: ui.restoreDefaults,
    cancel: ui.cancel,
    save: ui.save,
    selectedKey: ui.selectedKey,
    label: ui.keyLabel,
    placeholder: ui.keyLabelPlaceholder,
    apply: ui.apply,
    start: ui.startPractice,
    next: ui.tourNext,
    close: ui.close,
    nextModule: ui.nextModuleKicker,
    main: ui.generalSettings,
    sound: ui.sound,
    dark: ui.darkTheme,
    on: ui.toggleOn,
    off: ui.toggleOff,
    keyboardLanguage: ui.keyboardLanguage,
    language: ui.language,
    program: ui.learningProgram,
    stats: ui.statistics,
    fingering: ui.fingerMapMenu,
    assistants: ui.assistants,
    keyHighlight: ui.keyHighlight,
    fingerZones: ui.fingerZones,
    fingerHighlight: ui.fingerHighlight,
    pressHighlight: ui.pressHighlight,
    showFingers: ui.showFingers,
    alternateLines: ui.alternateLines,
    metronome: ui.metronome,
    help: ui.help,
    allModules: ui.allModules,
    currentProgress: ui.currentModuleProgress,
    resetProgress: ui.resetCurrentModuleProgress,
    textPractice: ui.textPractice,
    text: ui.practiceText,
    lines: ui.targetLines,
    refreshText: ui.refreshText,
    dailyStats: ui.dailyStats,
    helpPractice: ui.helpPractice,
    helpProgram: ui.helpProgram,
    helpFingering: ui.helpFingering,
    privacyTitle: ui.privacyConsent.title,
    privacyText: ui.privacyConsent.text,
    reject: ui.privacyConsent.reject,
    accept: ui.privacyConsent.accept
  };
  const metaDescription = document.querySelector('meta[name="description"]');
  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };
  const setAttr = (selector, attribute, value) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
  };

  document.title = text.title;
  if (metaDescription) metaDescription.content = text.description;

  setAttr(".practice-progress", "aria-label", text.moduleProgress);
  setText("#practiceProgressText", text.progressText);
  setAttr(".practice-stats", "aria-label", text.typingStats);
  setText("#practiceAccuracyLabel", text.accuracy);
  setText("#practiceSpeedLabel", text.speed);
  setText(".practice-speed-unit", text.speedUnit);
  setAttr("#settingsToggle", "aria-label", text.settings);
  setAttr(".trainer", "aria-label", text.typingText);
  setAttr("#keyboardWrap", "aria-label", text.keyboard);
  setAttr("#handsLayer", "aria-label", text.fingers);
  setAttr("#keyboardFingerPicker", "aria-label", text.fingerPicker);
  setText("#keyboardEditorReset", text.restoreDefaults);
  setText("#keyboardEditorCancel", text.cancel);
  setText("#keyboardEditorSave", text.save);
  setText(".editor .field:first-child span", text.selectedKey);
  setText(".editor .field:nth-child(2) span", text.label);
  setAttr("#labelInput", "placeholder", text.placeholder);
  setText("#applyLabel", text.apply);
  setText("#onboardingNext", text.next);
  setText("#lessonTipStart", text.start);
  setText("#completionNext", text.next);
  setText("#nextModuleKicker", text.nextModule);
  setText("#nextModuleNext", text.next);
  setText("#settingsTitle", text.settings);
  setAttr("#settingsClose", "aria-label", text.close);
  setAttr(".menu-section", "aria-label", text.main);
  setAttr(".sound-icon-group", "aria-label", text.sound);
  setText("#soundLabel", text.sound);
  setText("#themeToggleText", text.dark);
  setText("#keySoundToggleText", text.on);
  setAttr("#practiceTextSizeToggle", "aria-label", `${ui.practiceTextSize}: M`);
  setAttr("#languageTabs", "aria-label", text.keyboardLanguage);
  setText("#languageLabel", text.language);
  setText("#learningProgramOpenText", text.program);
  setText("#statsOpenText", text.stats);
  setText("#fingerMapOpen span", text.fingering);
  setText("#assistantsToggleText", text.assistants);
  setText("#keyHighlightLabel", text.keyHighlight);
  setText("#fingerZonesLabel", text.fingerZones);
  setText("#fingerHighlightLabel", text.fingerHighlight);
  setText("#pressHighlightLabel", text.pressHighlight);
  setText("#showFingersLabel", text.showFingers);
  setText("#alternateLinesLabel", text.alternateLines);
  setText("#metronomeLabel", text.metronome);
  setText("#helpOpenText", text.help);
  setText("#learningProgramTitle", text.program);
  setAttr("#learningProgramClose", "aria-label", text.close);
  setText("#moduleLabel", text.allModules);
  setText("#programCurrentProgressLabel", text.currentProgress);
  setText("#programCurrentProgress", text.progressText);
  setText("#currentModuleProgressReset", text.resetProgress);
  setText("#customPracticeTitle", text.textPractice);
  setAttr("#customPracticeClose", "aria-label", text.close);
  setText("#customPracticeTextLabel", text.text);
  setText("#customPracticeLineCountLabel", text.lines);
  setText("#customPracticeRefresh", text.refreshText);
  setAttr(".custom-practice-assistants", "aria-label", text.assistants);
  setText("#customKeyHighlightLabel", text.keyHighlight);
  setText("#customFingerZonesLabel", text.fingerZones);
  setText("#customFingerHighlightLabel", text.fingerHighlight);
  setText("#customPressHighlightLabel", text.pressHighlight);
  setText("#customShowFingersLabel", text.showFingers);
  setText("#customAlternateLinesLabel", text.alternateLines);
  setText("#customMetronomeLabel", text.metronome);
  setText("#customPracticeCancel", text.cancel);
  setText("#customPracticeStart", text.start);
  setText("#statsTitle", text.stats);
  setAttr("#statsClose", "aria-label", text.close);
  setText("#statsDailyLabel", text.dailyStats);
  setText("#helpTitle", text.help);
  setAttr("#helpClose", "aria-label", text.close);
  setText("#helpTextPractice", text.helpPractice);
  setText("#helpTextProgram", text.helpProgram);
  setText("#helpTextFingering", text.helpFingering);
  setText("#privacyConsentTitle", text.privacyTitle);
  setText("#privacyConsentText", text.privacyText);
  setText("#privacyConsentReject", text.reject);
  setText("#privacyConsentAccept", text.accept);
})();
