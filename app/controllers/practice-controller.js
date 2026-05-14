function practiceModulesFor(language = currentLanguage) {
  return practiceContent[language]?.modules || practiceContent.en?.modules || {};
}

function practiceModuleGroupsFor(language = currentLanguage) {
  return practiceContent[language]?.moduleGroups || practiceContent.en?.moduleGroups || [];
}

function firstPracticeModuleId(language = currentLanguage) {
  return Object.keys(practiceModulesFor(language))[0] || "module1";
}

function normalizeCurrentPracticeModule(language = currentLanguage) {
  const modules = practiceModulesFor(language);
  const module = modules[currentPracticeModule];
  const hasRuntimeLines = Array.isArray(customPracticeRuntimeLines[currentPracticeModule]) && customPracticeRuntimeLines[currentPracticeModule].length > 0;
  if (module && (!module.customPractice || hasRuntimeLines)) return currentPracticeModule;

  currentPracticeModule = firstPracticeModuleId(language);
  saved.currentPracticeModule = currentPracticeModule;
  return currentPracticeModule;
}

function practiceProgressStore() {
  if (!saved.practiceProgress || typeof saved.practiceProgress !== "object" || Array.isArray(saved.practiceProgress)) {
    saved.practiceProgress = {};
  }
  return saved.practiceProgress;
}

function languagePracticeProgressStore(language = currentLanguage) {
  const store = practiceProgressStore();
  if (!store[language] || typeof store[language] !== "object" || Array.isArray(store[language])) {
    store[language] = {};
  }
  return store[language];
}

function practiceLinesForModule(language = currentLanguage, moduleId = currentPracticeModule) {
  const module = practiceModulesFor(language)[moduleId] || {};
  const runtimeLines = customPracticeRuntimeLines[moduleId];
  if (module.customPractice && Array.isArray(runtimeLines) && runtimeLines.length) {
    return runtimeLines;
  }

  if (module.customPractice && Array.isArray(module.lines) && module.lines.length) {
    const targetLineCount = Math.max(1, module.target?.lines || module.lines.length);
    return Array.from({ length: targetLineCount }, (_, index) => module.lines[index % module.lines.length]);
  }

  return module.lines || [];
}

function normalizePracticeProgressEntry(entry, totalLines) {
  const safeTotal = Math.max(0, Number(totalLines) || 0);
  let currentLine = Number.isFinite(entry?.currentLine) ? Math.max(0, Math.trunc(entry.currentLine)) : 0;
  let completedLines = Number.isFinite(entry?.completedLines) ? Math.max(0, Math.trunc(entry.completedLines)) : currentLine;
  const accuracy = Number.isFinite(entry?.accuracy) ? Math.max(0, Math.round(entry.accuracy)) : 0;
  const speed = Number.isFinite(entry?.speed) ? Math.max(0, Math.round(entry.speed)) : 0;
  const assistantsUsed = entry && Object.prototype.hasOwnProperty.call(entry, "assistantsUsed")
    ? entry.assistantsUsed === true
    : true;
  const metronomeAccuracy = Number.isFinite(entry?.metronomeAccuracy)
    ? Math.max(0, Math.min(100, Math.round(entry.metronomeAccuracy)))
    : null;

  if (safeTotal === 0) {
    return { currentLine: 0, completedLines: 0, isComplete: true, accuracy, speed, assistantsUsed, metronomeAccuracy };
  }

  if (currentLine >= safeTotal || completedLines >= safeTotal) {
    return { currentLine: safeTotal, completedLines: safeTotal, isComplete: true, accuracy, speed, assistantsUsed, metronomeAccuracy };
  }

  completedLines = Math.max(completedLines, Math.min(currentLine, safeTotal));

  return {
    currentLine: Math.min(currentLine, safeTotal - 1),
    completedLines: Math.min(completedLines, safeTotal),
    isComplete: false,
    accuracy,
    speed,
    assistantsUsed,
    metronomeAccuracy
  };
}

function moduleProgressFor(language = currentLanguage, moduleId = currentPracticeModule) {
  const totalLines = practiceLinesForModule(language, moduleId).length;
  const entry = languagePracticeProgressStore(language)[moduleId];
  const normalized = normalizePracticeProgressEntry(entry, totalLines);
  return {
    ...normalized,
    totalLines,
    percent: totalLines > 0 ? Math.round((normalized.completedLines / totalLines) * 100) : 0
  };
}

function persistModuleProgress(language = currentLanguage, moduleId = currentPracticeModule, nextProgress = {}) {
  const totalLines = practiceLinesForModule(language, moduleId).length;
  const normalized = normalizePracticeProgressEntry(nextProgress, totalLines);
  languagePracticeProgressStore(language)[moduleId] = {
    currentLine: normalized.currentLine,
    completedLines: normalized.completedLines,
    accuracy: normalized.accuracy,
    speed: normalized.speed,
    assistantsUsed: normalized.assistantsUsed,
    metronomeAccuracy: normalized.metronomeAccuracy
  };
  persist();
  return {
    ...normalized,
    totalLines,
    percent: totalLines > 0 ? Math.round((normalized.completedLines / totalLines) * 100) : 0
  };
}

function restoreCurrentPracticeProgress() {
  normalizeCurrentPracticeModule();
  const progress = moduleProgressFor(currentLanguage, currentPracticeModule);
  practiceCompletedLines = progress.completedLines;
  practiceAwaitingEnter = false;
  practiceLineIndex = progress.isComplete
    ? Math.max(progress.totalLines - 1, 0)
    : progress.currentLine;
  practiceLastMatchedIndex = 0;
  return progress;
}

function currentPracticeModuleData(language = currentLanguage, moduleId = currentPracticeModule) {
  const modules = practiceModulesFor(language);
  return modules[moduleId] || modules[firstPracticeModuleId(language)] || Object.values(modules)[0] || { name: "", lines: [] };
}

const lessonTipAvatarByLessonId = {
  lesson1_1: "key-please.webp",
  lesson1_2: "key-salute.webp",
  lesson1_3: "key-open-soft.webp",
  lesson1_4: "key-explain.webp",
  lesson1_5: "key-wave.webp",
  lesson2_1: "key-idea.webp",
  lesson2_2: "key-point-strict.webp",
  lesson2_3: "key-thumb.webp",
  lesson2_4: "key-confident.webp",
  lesson2_5: "key-arms-crossed.webp",
  lesson3_1: "key-thinking.webp",
  lesson3_2: "key-thumb.webp",
  lesson3_3: "key-idea-front.webp",
  lesson3_4: "key-open-soft.webp",
  lesson3_5: "key-confident.webp",
  lesson4_1: "key-point-strict.webp",
  lesson4_2: "key-explain.webp",
  lesson4_3: "key-stop.webp",
  lesson4_4: "key-thinking.webp",
  lesson4_5: "key-arms-crossed.webp",
  lesson5_1: "key-stop.webp",
  lesson5_2: "key-idea-front.webp",
  lesson5_3: "key-explain.webp",
  lesson5_4: "key-confident.webp",
  lesson5_5: "key-shrug.webp",
  lesson6_1: "key-stop.webp",
  lesson6_2: "key-idea.webp",
  lesson6_3: "key-point-strict.webp",
  lesson6_4: "key-explain.webp",
  lesson6_5: "key-confident.webp",
  lesson7_1: "key-explain.webp",
  lesson7_2: "key-idea-open.webp",
  lesson7_3: "key-stop.webp",
  lesson7_4: "key-point-strict.webp",
  lesson7_5: "key-confident.webp",
  lesson8_1: "key-idea-front.webp",
  lesson8_2: "key-thinking.webp",
  lesson8_3: "key-explain.webp",
  lesson8_4: "key-confident.webp",
  lesson8_5: "key-arms-crossed.webp",
  lesson9_1: "key-idea-small.webp",
  lesson9_2: "key-explain.webp",
  lesson9_3: "key-open-soft.webp",
  lesson9_4: "key-confident.webp",
  lesson9_5: "key-arms-crossed.webp",
  lesson10_1: "key-idea-open.webp",
  lesson10_2: "key-explain.webp",
  lesson10_3: "key-explain.webp",
  lesson10_4: "key-confident.webp",
  lesson10_5: "key-book.webp",
  lesson11_1: "key-wave.webp",
  lesson12_1: "key-open-soft.webp"
};

const lessonCompletionAvatarByLessonId = {
  lesson1_1: "key-thumb.webp",
  lesson1_2: "key-confident.webp",
  lesson1_3: "key-wave.webp",
  lesson1_4: "key-idea-open.webp",
  lesson1_5: "key-arms-crossed.webp",
  lesson2_1: "key-thumb.webp",
  lesson2_2: "key-confident.webp",
  lesson2_3: "key-wave.webp",
  lesson2_4: "key-thumb.webp",
  lesson2_5: "key-confident.webp",
  lesson3_1: "key-thumb.webp",
  lesson3_2: "key-wave.webp",
  lesson3_3: "key-confident.webp",
  lesson3_4: "key-idea-open.webp",
  lesson3_5: "key-arms-crossed.webp",
  lesson4_1: "key-thumb.webp",
  lesson4_2: "key-idea-open.webp",
  lesson4_3: "key-confident.webp",
  lesson4_4: "key-thinking.webp",
  lesson4_5: "key-arms-crossed.webp",
  lesson5_1: "key-thumb.webp",
  lesson5_2: "key-confident.webp",
  lesson5_3: "key-idea-front.webp",
  lesson5_4: "key-wave.webp",
  lesson5_5: "key-book.webp",
  lesson6_1: "key-thumb.webp",
  lesson6_2: "key-confident.webp",
  lesson6_3: "key-idea.webp",
  lesson6_4: "key-wave.webp",
  lesson6_5: "key-book.webp",
  lesson7_1: "key-thumb.webp",
  lesson7_2: "key-idea-open.webp",
  lesson7_3: "key-confident.webp",
  lesson7_4: "key-wave.webp",
  lesson7_5: "key-book.webp",
  lesson8_1: "key-thumb.webp",
  lesson8_2: "key-confident.webp",
  lesson8_3: "key-idea-front.webp",
  lesson8_4: "key-wave.webp",
  lesson8_5: "key-book.webp",
  lesson9_1: "key-thumb.webp",
  lesson9_2: "key-confident.webp",
  lesson9_3: "key-idea-open.webp",
  lesson9_4: "key-wave.webp",
  lesson9_5: "key-book.webp",
  lesson10_1: "key-thumb.webp",
  lesson10_2: "key-confident.webp",
  lesson10_3: "key-idea-front.webp",
  lesson10_4: "key-wave.webp",
  lesson10_5: "key-completion.webp",
  lesson11_1: "key-wave.webp",
  lesson12_1: "key-confident.webp"
};

let dialogImageRequestId = 0;
const warmedDialogImages = new Set();

function setDialogCharacterImage(character, src) {
  if (!character || !src) return;
  if (warmedDialogImages.has(src)) {
    character.classList.remove("is-loading");
    character.src = src;
    return;
  }

  const requestId = String(++dialogImageRequestId);
  const finish = () => {
    if (character.dataset.imageRequestId !== requestId) return;
    character.classList.remove("is-loading");
    warmedDialogImages.add(src);
  };

  character.dataset.imageRequestId = requestId;
  character.classList.add("is-loading");
  character.addEventListener("load", finish, { once: true });
  character.addEventListener("error", finish, { once: true });
  character.src = src;

  if (character.complete) {
    requestAnimationFrame(finish);
  }
}

function lessonTipAvatarSrcFor(lesson) {
  const fileName = lessonTipAvatarByLessonId[lesson?.id] || "key-wave.webp";
  return `assets/key/${fileName}`;
}

function lessonCompletionAvatarSrcFor(lesson) {
  const fileName = lessonCompletionAvatarByLessonId[lesson?.id] || "key-completion.webp";
  return `assets/key/${fileName}`;
}

function currentLessonTips() {
  const tips = currentPracticeModuleData().tips;
  return Array.isArray(tips) ? tips.filter(Boolean) : [];
}

function isFingeringTourIntroLesson(lesson = currentPracticeModuleData()) {
  return lesson?.id === "lesson1_4";
}

function renderLessonTipDialog(imageSrc = lessonTipAvatarSrcFor(currentPracticeModuleData())) {
  const text = textFor();
  const lesson = currentPracticeModuleData();
  const tips = currentLessonTips();
  const isTourIntro = isFingeringTourIntroLesson(lesson);

  lessonTipText.innerHTML = "";
  tips.forEach(tip => {
    const paragraph = document.createElement("p");
    paragraph.textContent = tip;
    lessonTipText.append(paragraph);
  });
  lessonTipStart.textContent = isTourIntro ? text.tourNext : text.startPractice;
  lessonTipExtra.hidden = true;
  lessonTipExtra.textContent = text.showFingeringTour;
  setDialogCharacterImage(lessonTipCharacter, imageSrc);
  lessonTipCharacter.alt = "";
}

function openCurrentLessonTip({ force = false } = {}) {
  const lesson = currentPracticeModuleData();
  if (!lessonTipDialog || lessonTipDialog.open || !currentLessonTips().length) return;
  if (!onboardingCompleted || onboardingDialog?.open) return;
  if (!force && lastShownLessonTipModuleId === lesson.id) return;

  const imageSrc = lessonTipAvatarSrcFor(lesson);

  renderLessonTipDialog(imageSrc);
  lessonTipDialog.showModal();
  lastShownLessonTipModuleId = lesson.id;
  updatePracticeTimerPauseState();
}

function closeLessonTipDialog() {
  if (!lessonTipDialog?.open) return;
  lessonTipDialog.close();
}

function handleLessonTipPrimaryAction() {
  if (isFingeringTourIntroLesson()) {
    startFingeringTourFromLessonTip();
    return;
  }

  closeLessonTipDialog();
}

function canDismissLessonTipDialog() {
  return !isFingeringTourIntroLesson();
}

const fingeringTourSteps = [
  {
    target: () => fingerMapOpen,
    extraTargets: () => [settingsToggle],
    host: () => settingsDialog,
    text: () => textFor().tourSettingsStep,
    before() {
      if (lessonTipDialog?.open) closeLessonTipDialog();
      if (!settingsDialog.open) openSettingsDialog();
    }
  },
  {
    target: () => keyboardFingerPicker.querySelector(".finger-picker.active") || keyboardFingerPicker,
    host: () => document.body,
    placement: "below-keyboard",
    text: () => textFor().tourFingerMapStep,
    before() {
      if (settingsDialog.open) closeSettingsDialog();
      if (!fingerKeyboardMode) {
        openFingerMapDraft();
        enterFingerKeyboardMode();
      }
      setActiveFinger(currentFingerSelection());
    }
  },
  {
    target: () => keyboardEditorPanel,
    host: () => document.body,
    text: () => textFor().tourKeyboardStep,
    before() {
      if (!fingerKeyboardMode) {
        enterFingerKeyboardMode();
      }
      scheduleKeyboardRefit();
    }
  }
];

function currentFingeringTourStep() {
  return fingeringTourSteps[fingeringTourStepIndex] || null;
}

function removeFingeringTourCard() {
  if (fingeringTourCard) {
    fingeringTourCard.remove();
    fingeringTourCard = null;
  }

  if (fingeringTourTarget) {
    fingeringTourTarget.classList.remove("guided-tour-target");
    fingeringTourTarget = null;
  }

  fingeringTourExtraTargets.forEach(target => target.classList.remove("guided-tour-target"));
  fingeringTourExtraTargets = [];
}

function positionFingeringTourCard() {
  if (!fingeringTourActive || !fingeringTourCard || !fingeringTourTarget) return;

  const step = currentFingeringTourStep();
  const cardRect = fingeringTourCard.getBoundingClientRect();
  const gap = 14;
  if (step?.placement === "below-keyboard") {
    const keyboardRect = keyboardWrap.getBoundingClientRect();
    const availableTop = keyboardRect.bottom + gap;
    const left = Math.min(
      Math.max(16, keyboardRect.left + keyboardRect.width / 2 - cardRect.width / 2),
      window.innerWidth - cardRect.width - 16
    );
    const top = availableTop;

    fingeringTourCard.style.left = `${left}px`;
    fingeringTourCard.style.top = `${top}px`;
    return;
  }

  const targetRect = fingeringTourTarget.getBoundingClientRect();
  const sideSpaceRight = window.innerWidth - targetRect.right;
  const sideSpaceLeft = targetRect.left;
  const placeRight = sideSpaceRight >= Math.min(300, cardRect.width + gap) || sideSpaceRight >= sideSpaceLeft;
  const preferredLeft = placeRight
    ? targetRect.right + gap
    : targetRect.left - cardRect.width - gap;
  const left = Math.min(Math.max(16, preferredLeft), window.innerWidth - cardRect.width - 16);
  const top = Math.min(
    Math.max(16, targetRect.top + targetRect.height / 2 - cardRect.height / 2),
    window.innerHeight - cardRect.height - 16
  );

  fingeringTourCard.style.left = `${left}px`;
  fingeringTourCard.style.top = `${top}px`;
}

function isFingeringTourCardEventTarget(target) {
  return Boolean(fingeringTourCard && target instanceof Node && fingeringTourCard.contains(target));
}

function isFingeringTourStepEventTarget(target) {
  return Boolean(fingeringTourTarget && target instanceof Node && fingeringTourTarget.contains(target));
}

function blockFingeringTourEvent(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}

function handleFingeringTourPointerGuard(event) {
  if (!fingeringTourActive) return;
  if (isFingeringTourCardEventTarget(event.target)) return;

  if (isFingeringTourStepEventTarget(event.target)) {
    blockFingeringTourEvent(event);
    if (event.type === "click") {
      advanceFingeringTour();
    }
    return;
  }

  blockFingeringTourEvent(event);
}

function handleFingeringTourKeyGuard(event) {
  if (!fingeringTourActive) return;
  if (isFingeringTourCardEventTarget(event.target)) return;

  if (isFingeringTourStepEventTarget(event.target) && (event.key === "Enter" || event.key === " ")) {
    blockFingeringTourEvent(event);
    advanceFingeringTour();
    return;
  }

  blockFingeringTourEvent(event);
}

function renderFingeringTourStep() {
  const step = currentFingeringTourStep();
  if (!step) {
    finishFingeringTour();
    return;
  }

  removeFingeringTourCard();
  step.before?.();

  requestAnimationFrame(() => {
    if (!fingeringTourActive || currentFingeringTourStep() !== step) return;

    const target = step.target();
    const host = step.host?.() || document.body;
    if (!target || !host) {
      finishFingeringTour();
      return;
    }

    const text = textFor();
    fingeringTourTarget = target;
    fingeringTourTarget.classList.add("guided-tour-target");
    fingeringTourExtraTargets = (step.extraTargets?.() || []).filter(Boolean);
    fingeringTourExtraTargets.forEach(extraTarget => extraTarget.classList.add("guided-tour-target"));
    fingeringTourCard = document.createElement("aside");
    fingeringTourCard.className = "guided-tour-card";
    fingeringTourCard.setAttribute("role", "dialog");
    fingeringTourCard.setAttribute("aria-live", "polite");

    const message = document.createElement("p");
    message.textContent = step.text();

    const actions = document.createElement("div");
    actions.className = "guided-tour-actions";

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "apply-btn";
    nextButton.textContent = fingeringTourStepIndex >= fingeringTourSteps.length - 1
      ? text.tourDone
      : text.tourNext;
    nextButton.addEventListener("click", advanceFingeringTour);

    actions.append(nextButton);
    fingeringTourCard.append(message, actions);
    host.append(fingeringTourCard);
    positionFingeringTourCard();
    nextButton.focus({ preventScroll: true });
  });
}

function startFingeringTourFromLessonTip() {
  if (currentPracticeModuleData().id !== "lesson1_4") return;

  fingeringTourActive = true;
  fingeringTourStepIndex = 0;
  document.documentElement.classList.add("guided-tour-active");
  renderFingeringTourStep();
  updatePracticeTimerPauseState();
}

function advanceFingeringTour() {
  if (!fingeringTourActive) return;

  fingeringTourStepIndex += 1;
  renderFingeringTourStep();
}

function finishFingeringTour() {
  if (!fingeringTourActive) return;

  removeFingeringTourCard();
  fingeringTourActive = false;
  fingeringTourStepIndex = 0;
  document.documentElement.classList.remove("guided-tour-active");
  if (fingerKeyboardMode) {
    cancelFingerKeyboardMode();
  }
  if (settingsDialog.open) {
    closeSettingsDialog();
  }
  updatePracticeTimerPauseState();
  focusPracticeInputSoon();
}

const nextButtonText = {
  ru: "Далее",
  uk: "Далі",
  kk: "Әрі қарай",
  de: "Weiter",
  en: "Next"
};

const defaultPracticeCompletionText = {
  ru: "Отлично. Молодец. Идём дальше.",
  uk: "Чудово. Гарна робота. Рухаємося далі.",
  kk: "Керемет. Жақсы жұмыс. Әрі қарай өтейік.",
  de: "Ausgezeichnet. Gut gemacht. Weiter geht's.",
  en: "Excellent. Well done. Let's keep going."
};

function localizedUiText(value) {
  return value[currentLanguage] || value.en || value.ru || "";
}

function currentLessonCompletion() {
  const completion = currentPracticeModuleData().completion || {};
  return {
    text: completion.text || localizedUiText(defaultPracticeCompletionText)
  };
}

function renderCompletionDialog(imageSrc = lessonCompletionAvatarSrcFor(currentPracticeModuleData())) {
  const lesson = currentPracticeModuleData();
  const progress = moduleProgressFor(currentLanguage, currentPracticeModule);
  const ratingDetails = starRatingDetailsForLesson(lesson, progress);
  const completion = currentLessonCompletion();

  completionStars.classList.toggle("module-btn-rating-flying", ratingDetails.isFlying);
  completionStars.textContent = ratingDetails.text || "";
  completionText.innerHTML = "";

  const paragraph = document.createElement("p");
  paragraph.textContent = completion.text;
  completionText.append(paragraph);
  if (isLesson4FingeringReminderLesson(lesson)) {
    const reminder = document.createElement("p");
    reminder.textContent = textFor().lesson4FingeringReminder;
    completionText.append(reminder);
  }
  completionNext.textContent = localizedUiText(nextButtonText);
  completionExtra.hidden = !isLesson4FingeringReminderLesson(lesson);
  completionExtra.textContent = textFor().openFingerMapAction;
  setDialogCharacterImage(completionCharacter, imageSrc);
  completionCharacter.alt = "";
}

function openCompletionDialog() {
  if (!completionDialog || completionDialog.open) return;

  const imageSrc = lessonCompletionAvatarSrcFor(currentPracticeModuleData());

  renderCompletionDialog(imageSrc);
  completionDialog.showModal();
  updatePracticeTimerPauseState();
}

function closeCompletionDialog() {
  if (!completionDialog?.open) return;
  completionDialog.close();
}

function isLesson4FingeringReminderLesson(lesson = currentPracticeModuleData()) {
  return lesson?.id === "lesson4_4";
}

function openFingerMapFromCompletionReminder() {
  if (!isLesson4FingeringReminderLesson()) return;

  openFingerMapDraft();
  enterFingerKeyboardMode();
  updatePracticeTimerPauseState();
}

function goToNextLessonAfterCompletion() {
  const language = currentLanguage;
  const moduleId = currentPracticeModule;
  const nextLessonId = nextPracticeLessonId(language, moduleId);
  const nextLesson = nextLessonId ? practiceModulesFor(language)[nextLessonId] : null;

  closeCompletionDialog();
  if (nextLesson && !nextLesson.customPractice) {
    applySettings({ language, module: nextLessonId });
    openCurrentLessonTip({ force: true });
    renderModuleButtons();
  }
}

const onboardingCopy = {
  ru: {
    start: "Пуск",
    screens: [
      {
        paragraphs: [
          "FlyKey — это тренажёр слепой печати.",
          "FlyKey — преврати клавиатуру в продолжение твоих мыслей.",
          "FlyKey — печатай легко, будто пальцы умеют летать."
        ],
        character: false
      },
      {
        paragraphs: [
          "Лёгкость, скорость и уверенность за клавиатурой тебя уже ждут."
        ],
        character: false
      },
      {
        paragraphs: [
          "Здесь ты не зубришь клавиши, а постепенно учишься печатать свободно: меньше смотреть вниз, меньше напрягаться и больше доверять пальцам."
        ],
        character: false
      },
      {
        paragraphs: [
          "Меня зовут Key. Я буду с тобой.",
          "Твой маленький летающий помощник, который подсказывает, поддерживает и помогает не сбиться. Не строгий учитель, а напарник, с которым тренироваться проще и веселее."
        ],
        character: true
      }
    ]
  },
  uk: {
    start: "Старт",
    screens: [
      {
        paragraphs: [
          "FlyKey — це тренажер сліпого друку.",
          "FlyKey допомагає перетворити клавіатуру на продовження думок.",
          "Друкуйте легко, ніби пальці вже знають дорогу."
        ],
        character: false
      },
      {
        paragraphs: [
          "Легкість, швидкість і впевненість за клавіатурою вже чекають на вас."
        ],
        character: false
      },
      {
        paragraphs: [
          "Тут ви не зубрите клавіші. Ви поступово вчитеся друкувати вільно: менше дивитися вниз, менше напружуватися і більше довіряти пальцям."
        ],
        character: false
      },
      {
        paragraphs: [
          "Мене звати Key. Я буду поруч.",
          "Ваш маленький летючий помічник підказує, підтримує й допомагає не збиватися з ритму. Не суворий учитель, а напарник, з яким тренуватися легше."
        ],
        character: true
      }
    ]
  },
  kk: {
    start: "Старт",
    screens: [
      {
        paragraphs: [
          "FlyKey — соқыр теруге арналған жаттықтырғыш.",
          "FlyKey пернетақтаны ойыңыздың жалғасына айналдыруға көмектеседі.",
          "Саусақтар жолды өзі білетіндей жеңіл теріңіз."
        ],
        character: false
      },
      {
        paragraphs: [
          "Пернетақтадағы жеңілдік, жылдамдық және сенімділік сізді күтіп тұр."
        ],
        character: false
      },
      {
        paragraphs: [
          "Мұнда пернелерді жаттап алмайсыз. Біртіндеп еркін теруді үйренесіз: төменге азырақ қарау, аз ширығу және саусақтарға көбірек сену."
        ],
        character: false
      },
      {
        paragraphs: [
          "Менің атым Key. Мен қасыңызда боламын.",
          "Кішкентай ұшқыш көмекшіңіз кеңес береді, қолдайды және ырғақтан жаңылмауға көмектеседі. Қатал мұғалім емес, жаттығуды жеңілдететін серіктес."
        ],
        character: true
      }
    ]
  },
  de: {
    start: "Start",
    screens: [
      {
        paragraphs: [
          "FlyKey ist ein Trainer für Blindtippen.",
          "FlyKey - mach die Tastatur zu einer Erweiterung deiner Gedanken.",
          "FlyKey - tippe leicht, als könnten deine Finger fliegen."
        ],
        character: false
      },
      {
        paragraphs: [
          "Leichtigkeit, Geschwindigkeit und Sicherheit an der Tastatur warten schon auf dich."
        ],
        character: false
      },
      {
        paragraphs: [
          "Hier paukst du keine Tasten. Du lernst Schritt für Schritt, frei zu tippen: weniger nach unten schauen, weniger verkrampfen und den Fingern mehr vertrauen."
        ],
        character: false
      },
      {
        paragraphs: [
          "Ich heiße Key. Ich begleite dich.",
          "Dein kleiner fliegender Helfer, der dir Hinweise gibt, dich unterstützt und dir hilft, nicht aus dem Rhythmus zu kommen. Kein strenger Lehrer, sondern ein Partner, mit dem das Training leichter und fröhlicher wird."
        ],
        character: true
      }
    ]
  },
  en: {
    start: "Start",
    screens: [
      {
        paragraphs: [
          "FlyKey is a touch typing trainer.",
          "FlyKey - turn the keyboard into an extension of your thoughts.",
          "FlyKey - type lightly, as if your fingers could fly."
        ],
        character: false
      },
      {
        paragraphs: [
          "Ease, speed, and confidence at the keyboard are already waiting for you."
        ],
        character: false
      },
      {
        paragraphs: [
          "Here you do not memorize keys by force. You gradually learn to type freely: look down less, tense up less, and trust your fingers more."
        ],
        character: false
      },
      {
        paragraphs: [
          "My name is Key. I will be with you.",
          "Your small flying helper gives you hints, supports you, and helps you stay on track. Not a strict teacher, but a teammate who makes training easier and more fun."
        ],
        character: true
      }
    ]
  }
};

function currentOnboardingCopy() {
  return onboardingCopy[currentLanguage] || onboardingCopy.en || onboardingCopy.ru;
}

function renderOnboardingDialog() {
  const copy = currentOnboardingCopy();
  const screen = copy.screens[onboardingStepIndex] || copy.screens[0];

  onboardingText.innerHTML = "";
  screen.paragraphs.forEach(text => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    onboardingText.append(paragraph);
  });

  onboardingNext.textContent = onboardingStepIndex >= copy.screens.length - 1
    ? copy.start
    : localizedUiText(nextButtonText);
  onboardingCharacter.hidden = !screen.character;
  onboardingDialog.classList.toggle("onboarding-with-character", screen.character);
}

function openOnboardingIfNeeded() {
  if (onboardingCompleted || !onboardingDialog || onboardingDialog.open) return false;

  onboardingStepIndex = 0;
  renderOnboardingDialog();
  onboardingDialog.showModal();
  updatePracticeTimerPauseState();
  return true;
}

function completeOnboarding() {
  onboardingCompleted = true;
  saved.onboardingCompleted = true;
  persist();
  onboardingDialog.close();
  openCurrentLessonTip({ force: true });
}

function advanceOnboarding() {
  if (!onboardingDialog?.open) return;

  const copy = currentOnboardingCopy();
  if (onboardingStepIndex < copy.screens.length - 1) {
    onboardingStepIndex += 1;
    renderOnboardingDialog();
    return;
  }

  completeOnboarding();
}

function currentPracticeAssistantsEnabled() {
  return currentPracticeModuleData().target?.assistants !== false;
}

function effectiveAssistantSetting(value) {
  return currentPracticeAssistantsEnabled() ? value : false;
}

function visiblePracticeAssistantsEnabled() {
  if (!currentPracticeAssistantsEnabled()) return false;
  return keyHighlightEnabled || fingerZonesEnabled || fingerHighlightEnabled || pressHighlightEnabled || showFingersEnabled;
}

function currentPracticeLines() {
  return practiceLinesForModule();
}

// Temporary QA shortcut for reviewing lesson tips and lesson flow.
const devCompletePracticeLineHotkeyEnabled = true;
const devCompletePracticeLineShiftCodes = new Set();

function isDevCompletePracticeLineHotkey(event) {
  return (
    devCompletePracticeLineHotkeyEnabled &&
    event.key === "ArrowDown" &&
    devCompletePracticeLineShiftCodes.has("ShiftRight")
  );
}

function orderedPracticeLessonIds(language = currentLanguage) {
  const moduleGroups = practiceModuleGroupsFor(language);
  if (moduleGroups.length) {
    return moduleGroups.flatMap(module => module.lessons.map(lesson => lesson.id));
  }

  return Object.keys(practiceModulesFor(language));
}

function nextPracticeLessonId(language = currentLanguage, moduleId = currentPracticeModule) {
  const lessonIds = orderedPracticeLessonIds(language);
  const currentIndex = lessonIds.indexOf(moduleId);
  if (currentIndex < 0) return null;

  return lessonIds[currentIndex + 1] || null;
}

function currentPracticeCursor() {
  const expected = currentPracticeLines()[practiceLineIndex] || "";
  const typed = practiceTypedValue;
  let index = 0;

  while (index < typed.length && index < expected.length && typed[index] === expected[index]) {
    index += 1;
  }

  return {
    expected,
    typed,
    index,
    character: expected[index] || ""
  };
}

function renderCurrentPracticeSampleText() {
  const { expected, index } = currentPracticeCursor();
  renderPracticeSampleText(expected, index);
}

function resetPracticeMetrics() {
  practiceErrorCount = 0;
  practiceCorrectCharCount = 0;
  practiceSessionStartedAt = 0;
  practicePausedAt = 0;
  practicePausedDurationMs = 0;
  practiceLastMatchedIndex = 0;
  practiceAssistantsUsed = false;
  practiceMetronomeHitCount = 0;
  practiceMetronomeAttemptCount = 0;
  practiceMetronomeUsed = false;
  stopPracticeStatsTicker();
  renderPracticeStats();
}

function startPracticeStatsTicker() {
  if (practiceStatsTimerId) return;

  practiceStatsTimerId = setInterval(() => {
    if (!practiceSessionStartedAt) {
      stopPracticeStatsTicker();
      return;
    }

    renderPracticeStats();
  }, 1000);
}

function stopPracticeStatsTicker() {
  if (!practiceStatsTimerId) return;

  clearInterval(practiceStatsTimerId);
  practiceStatsTimerId = null;
}

function ensurePracticeSessionStarted() {
  if (!practiceSessionStartedAt) {
    practiceSessionStartedAt = Date.now();
    practicePausedAt = 0;
    practicePausedDurationMs = 0;
    practiceAssistantsUsed = visiblePracticeAssistantsEnabled();
    practiceMetronomeUsed = metronomeBpm > 0;
  } else if (visiblePracticeAssistantsEnabled()) {
    practiceAssistantsUsed = true;
  }
  startPracticeStatsTicker();
}

function currentPracticeActiveElapsedMs() {
  if (!practiceSessionStartedAt) return 0;

  const now = Date.now();
  const currentPauseMs = practicePausedAt ? now - practicePausedAt : 0;
  return Math.max(0, now - practiceSessionStartedAt - practicePausedDurationMs - currentPauseMs);
}

function currentPracticeMetronomeAccuracy() {
  if (!practiceMetronomeUsed || practiceMetronomeAttemptCount <= 0) return null;
  return Math.round((practiceMetronomeHitCount * 100) / practiceMetronomeAttemptCount);
}

function recordPracticeMetronomeInput(count = 1) {
  if (metronomeBpm <= 0 || !practiceSessionStartedAt) return;

  practiceMetronomeUsed = true;
  const intervalMs = 60000 / metronomeBpm;
  const hitWindowMs = Math.min(180, intervalMs * 0.22);
  const elapsedMs = currentPracticeActiveElapsedMs();
  const beatOffsetMs = elapsedMs % intervalMs;
  const nearestBeatDistanceMs = Math.min(beatOffsetMs, intervalMs - beatOffsetMs);

  practiceMetronomeAttemptCount += count;
  if (nearestBeatDistanceMs <= hitWindowMs) {
    practiceMetronomeHitCount += count;
  }
}

function shouldPausePracticeTimer() {
  return (
    onboardingDialog.open ||
    settingsDialog.open ||
    lessonTipDialog.open ||
    completionDialog.open ||
    fingeringTourActive ||
    learningProgramDialog.open ||
    customPracticeDialog.open ||
    statsDialog.open ||
    helpDialog.open ||
    fingerKeyboardMode
  );
}

function pausePracticeTimer() {
  if (!practiceSessionStartedAt || practicePausedAt) return;
  practicePausedAt = Date.now();
  renderPracticeStats();
}

function resumePracticeTimer() {
  if (!practicePausedAt) return;

  practicePausedDurationMs += Date.now() - practicePausedAt;
  practicePausedAt = 0;
  renderPracticeStats();
}

function updatePracticeTimerPauseState() {
  const isPaused = shouldPausePracticeTimer();
  document.documentElement.classList.toggle("practice-paused", isPaused);

  if (isPaused) {
    pausePracticeTimer();
  } else {
    resumePracticeTimer();
  }
}

function handForFinger(fingerId) {
  if (!fingerId) return null;
  if (fingerId.startsWith("left-")) return "left";
  if (fingerId.startsWith("right-")) return "right";
  return null;
}

function mappedFingerForKey(keyId) {
  const map = currentFingerMapState();
  return fingerIds.find(fingerId => map[fingerId]?.includes(keyId)) || null;
}

function isUppercaseLetter(character) {
  if (!character) return false;
  return character.toLowerCase() !== character.toUpperCase() && character === character.toUpperCase();
}

function characterRequiresShift(character, keyId) {
  if (isUppercaseLetter(character)) return true;

  const printableSymbols = extractPrintableKeySymbols(labelsFor(currentLanguage)[keyId] ?? "");
  return printableSymbols.length > 1 && printableSymbols[0] === character;
}

function oppositeShiftTargetForFinger(fingerId) {
  const hand = handForFinger(fingerId);
  if (hand === "left") {
    return { keyId: "shiftRight", fingerId: "right-pinky" };
  }

  if (hand === "right") {
    return { keyId: "shiftLeft", fingerId: "left-pinky" };
  }

  return { keyId: null, fingerId: null };
}

function practiceTargetForIndex(index) {
  if (practiceAwaitingEnter) {
    return {
      keyId: "enter",
      fingerId: "right-pinky",
      character: "",
      spaceSide: null,
      secondaryKeyId: null,
      secondaryFingerId: null
    };
  }

  const expected = currentPracticeLines()[practiceLineIndex] || "";
  const character = expected[index] || "";
  const [keyId] = findKeyCandidatesForCharacter(character, labelsFor(currentLanguage), geometry);

  if (!keyId) {
    return {
      keyId: null,
      fingerId: null,
      character,
      spaceSide: null,
      secondaryKeyId: null,
      secondaryFingerId: null
    };
  }

  if (keyId !== "space") {
    const fingerId = mappedFingerForKey(keyId);
    const shiftTarget = characterRequiresShift(character, keyId) ? oppositeShiftTargetForFinger(fingerId) : { keyId: null, fingerId: null };

    return {
      keyId,
      fingerId,
      character,
      spaceSide: null,
      secondaryKeyId: shiftTarget.keyId,
      secondaryFingerId: shiftTarget.fingerId
    };
  }

  let previousHand = null;
  for (let previousIndex = index - 1; previousIndex >= 0; previousIndex -= 1) {
    const previousTarget = practiceTargetForIndex(previousIndex);
    previousHand = handForFinger(previousTarget.fingerId);
    if (previousHand) break;
  }

  const nextHand = previousHand === "right" ? "left" : "right";
  return {
    keyId,
    fingerId: `${nextHand}-thumb`,
    character,
    spaceSide: nextHand,
    secondaryKeyId: null,
    secondaryFingerId: null
  };
}

function currentPracticeTarget() {
  const { index } = currentPracticeCursor();
  return practiceTargetForIndex(index);
}

function flashPracticeTechnical(keyId) {
  if (!keyId) return;

  technicalPracticeKeyId = keyId;
  renderKeyboard();

  clearTimeout(flashPracticeTechnical.timer);
  flashPracticeTechnical.timer = setTimeout(() => {
    technicalPracticeKeyId = null;
    renderKeyboard();
  }, 140);
}

function setPressedPracticeKey(keyId, isPressed, { render = true } = {}) {
  if (!keyId) return;

  const nextPressedKeyIds = new Set(pressedPracticeKeyIds);
  const nextCorrectPressedKeyIds = new Set(correctPressedPracticeKeyIds);
  const nextWrongPressedKeyIds = new Set(wrongPressedPracticeKeyIds);
  if (isPressed) {
    nextPressedKeyIds.add(keyId);
  } else {
    nextPressedKeyIds.delete(keyId);
    nextCorrectPressedKeyIds.delete(keyId);
    nextWrongPressedKeyIds.delete(keyId);
  }

  const pressedDidChange = nextPressedKeyIds.size !== pressedPracticeKeyIds.size || nextPressedKeyIds.has(keyId) !== pressedPracticeKeyIds.has(keyId);
  const correctPressedDidChange = nextCorrectPressedKeyIds.size !== correctPressedPracticeKeyIds.size || nextCorrectPressedKeyIds.has(keyId) !== correctPressedPracticeKeyIds.has(keyId);
  const wrongPressedDidChange = nextWrongPressedKeyIds.size !== wrongPressedPracticeKeyIds.size || nextWrongPressedKeyIds.has(keyId) !== wrongPressedPracticeKeyIds.has(keyId);
  if (!pressedDidChange && !correctPressedDidChange && !wrongPressedDidChange) {
    return;
  }

  pressedPracticeKeyIds = nextPressedKeyIds;
  correctPressedPracticeKeyIds = nextCorrectPressedKeyIds;
  wrongPressedPracticeKeyIds = nextWrongPressedKeyIds;
  if (render) {
    renderKeyboard();
  }
}

function setCorrectPressedPracticeKey(keyId) {
  if (!keyId || !pressedPracticeKeyIds.has(keyId) || correctPressedPracticeKeyIds.has(keyId)) return;

  correctPressedPracticeKeyIds = new Set(correctPressedPracticeKeyIds).add(keyId);
  renderKeyboard();
}

function setWrongPressedPracticeKey(keyId) {
  if (!keyId || !pressedPracticeKeyIds.has(keyId) || wrongPressedPracticeKeyIds.has(keyId)) return;

  wrongPressedPracticeKeyIds = new Set(wrongPressedPracticeKeyIds).add(keyId);
  renderKeyboard();
}

function clearPressedPracticeKeys() {
  devCompletePracticeLineShiftCodes.clear();
  if (!pressedPracticeKeyIds.size && !correctPressedPracticeKeyIds.size && !wrongPressedPracticeKeyIds.size) return;

  pressedPracticeKeyIds = new Set();
  correctPressedPracticeKeyIds = new Set();
  wrongPressedPracticeKeyIds = new Set();
  renderKeyboard();
}

function flashPracticeCorrect(keyId) {
  correctPracticeKeyId = keyId || null;
  setCorrectPressedPracticeKey(keyId);
  renderKeyboard();

  clearTimeout(flashPracticeCorrect.timer);
  flashPracticeCorrect.timer = setTimeout(() => {
    correctPracticeKeyId = null;
    renderKeyboard();
  }, 180);
}

function flashPracticeError(keyId) {
  wrongPracticeKeyId = keyId || null;
  correctPracticeKeyId = null;
  setWrongPressedPracticeKey(keyId);
  setPracticeInputError(true);
  renderKeyboard();

  clearTimeout(flashPracticeError.timer);
  flashPracticeError.timer = setTimeout(() => {
    wrongPracticeKeyId = null;
    setPracticeInputError(false);
    renderKeyboard();
  }, 260);
}

function renderCurrentPracticeGuides() {
  if (fingerKeyboardMode) {
    renderPracticeGuides(currentFingerSelection());
    return;
  }

  const target = currentPracticeTarget();
  renderPracticeGuides([target.fingerId, target.secondaryFingerId]);
}

function renderPracticeLine() {
  const lines = currentPracticeLines();
  if (lines.length) {
    practiceLineIndex = Math.min(practiceLineIndex, lines.length - 1);
  } else {
    practiceLineIndex = 0;
  }
  practiceLastMatchedIndex = 0;
  resetPracticeInputValue();
  renderCurrentPracticeSampleText();
  renderPracticeStats();
  renderPracticeProgress();
  renderKeyboard();
}

function advancePracticeLine() {
  const totalLines = currentPracticeLines().length;
  const lineStep = alternateLinesEnabled ? 2 : 1;
  const nextCompletedLines = Math.min(practiceCompletedLines + lineStep, totalLines);
  const isComplete = nextCompletedLines >= totalLines;

  practiceCompletedLines = nextCompletedLines;
  practiceLineIndex = isComplete
    ? Math.max(totalLines - 1, 0)
    : Math.min(practiceLineIndex + lineStep, totalLines - 1);

  const nextProgress = persistModuleProgress(currentLanguage, currentPracticeModule, {
    currentLine: isComplete ? totalLines : practiceLineIndex,
    completedLines: nextCompletedLines,
    accuracy: currentPracticeAccuracy(),
    speed: currentPracticeSpeed(),
    assistantsUsed: practiceAssistantsUsed,
    metronomeAccuracy: currentPracticeMetronomeAccuracy()
  });

  practiceAwaitingEnter = false;
  renderPracticeLine();
  if (nextProgress.isComplete) {
    openCompletionDialog();
  }
  return nextProgress;
}

function completeCurrentPracticeLineForDev() {
  if (!devCompletePracticeLineHotkeyEnabled) return false;

  const language = currentLanguage;
  const moduleId = currentPracticeModule;
  const lines = currentPracticeLines();
  if (!lines.length) return false;

  const progress = moduleProgressFor(language, moduleId);
  if (progress.isComplete) return false;

  lastPhysicalPracticeKeyId = "arrowDown";

  if (!practiceAwaitingEnter) {
    practiceTypedValue = lines[practiceLineIndex] || "";
    handlePracticeInput();
    playKeySound();
  }

  if (!practiceAwaitingEnter) return false;

  flashPracticeCorrect("enter");
  playEnterSound();
  const nextProgress = advancePracticeLine();
  renderModuleButtons();

  return true;
}

function handlePracticeInput() {
  if (practiceAwaitingEnter) {
    practiceTypedValue = currentPracticeLines()[practiceLineIndex] || "";
    return;
  }

  const expected = currentPracticeLines()[practiceLineIndex];
  const typed = practiceTypedValue;
  let index = 0;

  while (index < typed.length && index < expected.length && typed[index] === expected[index]) {
    index += 1;
  }

  if (typed.length > index) {
    ensurePracticeSessionStarted();
    practiceErrorCount += 1;
    const wrongCharacter = typed[index];
    const fallbackWrongKeyId = findKeyCandidatesForCharacter(wrongCharacter, labelsFor(currentLanguage), geometry)[0] || null;
    const wrongKeyId = lastPhysicalPracticeKeyId || fallbackWrongKeyId;

    practiceTypedValue = typed.slice(0, index);
    practiceLastMatchedIndex = index;
    renderCurrentPracticeSampleText();
    renderPracticeProgress();
    renderPracticeStats();
    playErrorSound();
    flashPracticeError(wrongKeyId);
    return;
  }

  if (index > 0 || typed.length > 0) {
    ensurePracticeSessionStarted();
  }

  if (index > practiceLastMatchedIndex) {
    const matchedCount = index - practiceLastMatchedIndex;
    practiceCorrectCharCount += matchedCount;
    recordPracticeMetronomeInput(matchedCount);
  }
  practiceLastMatchedIndex = index;

  if (typed.length > 0 && typed.length <= expected.length && typed.length === index) {
    const correctKeyId = lastPhysicalPracticeKeyId || practiceTargetForIndex(index - 1).keyId;
    flashPracticeCorrect(correctKeyId);
  }

  wrongPracticeKeyId = null;
  setPracticeInputError(false);
  renderCurrentPracticeSampleText();
  renderPracticeProgress();
  renderPracticeStats();
  renderKeyboard();

  if (practiceTypedValue === expected) {
    practiceAwaitingEnter = true;
    renderCurrentPracticeSampleText();
    renderKeyboard();
  }
}

function isTrainerTextEntryTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  const tagName = target.tagName;
  return target.isContentEditable || tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
}

function isPracticeInputPaused() {
  return (
    fingerKeyboardMode ||
    fingeringTourActive ||
    onboardingDialog.open ||
    settingsDialog.open ||
    lessonTipDialog.open ||
    completionDialog.open ||
    learningProgramDialog.open ||
    customPracticeDialog.open ||
    statsDialog.open ||
    helpDialog.open ||
    fingerKeyboardMode
  );
}

function isSystemKeyCombination(event) {
  if (event.altKey) return true;
  return event.metaKey || event.ctrlKey;
}

function printableCharacterFromKeyEvent(event) {
  const keyId = keyIdFromEventCode(event.code);
  if (keyId === "space") return " ";
  if (!keyId) return null;

  const printableSymbols = extractPrintableKeySymbols(labelsFor(currentLanguage)[keyId] ?? "");
  if (!printableSymbols.length) return null;

  if (printableSymbols.length > 1) {
    return event.shiftKey ? printableSymbols[0] : printableSymbols[printableSymbols.length - 1];
  }

  const [symbol] = printableSymbols;
  if (symbol.toLowerCase() !== symbol.toUpperCase()) {
    return event.shiftKey ? symbol.toUpperCase() : symbol.toLowerCase();
  }

  return symbol;
}

function applyPracticeKeyInput(event) {
  const keyId = keyIdFromEventCode(event.code);
  lastPhysicalPracticeKeyId = keyId;
  setPressedPracticeKey(keyId, true, { render: false });

  if (event.key === "Shift") {
    if (currentPracticeTarget().secondaryKeyId === keyId) {
      setCorrectPressedPracticeKey(keyId);
    }
  }

  if (practiceAwaitingEnter) {
    if (event.key === "Enter" || keyId === "enter") {
      flashPracticeCorrect("enter");
      playEnterSound();
      advancePracticeLine();
      return true;
    }

    if (keyId && (event.key === "Backspace" || printableCharacterFromKeyEvent(event))) {
      ensurePracticeSessionStarted();
      practiceErrorCount += 1;
      renderPracticeStats();
      playErrorSound();
      flashPracticeError(keyId);
      return true;
    }

    return false;
  }

  if (event.key === "Backspace") {
    if (practiceTypedValue.length > 0) {
      practiceTypedValue = practiceTypedValue.slice(0, -1);
      handlePracticeInput();
      playKeySound();
    } else if (keyId) {
      flashPracticeTechnical(keyId);
    }
    return true;
  }

  const character = printableCharacterFromKeyEvent(event);
  if (character !== null) {
    const previousLength = practiceTypedValue.length;
    practiceTypedValue += character;
    handlePracticeInput();
    if (practiceTypedValue.length > previousLength) {
      playKeySound();
    }
    return true;
  }

  if (keyId) {
    const isTechnicalKey =
      event.key === "Shift" ||
      event.key === "CapsLock" ||
      event.key === "Enter" ||
      event.key === "Delete" ||
      event.key.startsWith("Arrow");

    if (isTechnicalKey) {
      flashPracticeTechnical(keyId);
    }
  }

  return false;
}

function handleGlobalKeyUp(event) {
  if (event.code === "ShiftRight") {
    devCompletePracticeLineShiftCodes.delete(event.code);
  }

  const keyId = keyIdFromEventCode(event.code);
  setPressedPracticeKey(keyId, false);
}

function handleGlobalKeyDown(event) {
  if (event.code === "ShiftRight") {
    devCompletePracticeLineShiftCodes.add(event.code);
  }

  if (event.defaultPrevented || event.isComposing || isPracticeInputPaused()) return;

  const target = event.target;
  if (isTrainerTextEntryTarget(target)) return;

  if (isDevCompletePracticeLineHotkey(event)) {
    event.preventDefault();
    completeCurrentPracticeLineForDev();
    return;
  }

  if (isSystemKeyCombination(event)) return;

  const shouldHandle =
    event.key === "Backspace" ||
    event.key === "Enter" ||
    printableCharacterFromKeyEvent(event) !== null;

  if (!shouldHandle) {
    applyPracticeKeyInput(event);
    return;
  }

  if (applyPracticeKeyInput(event)) {
    event.preventDefault();
  }
}
