function isLessonStoryboardModeEnabled() {
  if (document.documentElement.dataset.flykeyProduction === "true") return false;

  const params = new URLSearchParams(window.location.search);
  return params.has("lessonStoryboard") ||
    params.has("roadmap") ||
    params.get("mode") === "roadmap" ||
    window.location.hash === "#lessonStoryboard" ||
    window.location.hash === "#roadmap" ||
    window.location.pathname.endsWith("/roadmap.html");
}

const storyboardKeyImages = [
  "fly_welcome_no_bg.png",
  "key-arms-crossed.webp",
  "key-book.webp",
  "key-celebrate.png",
  "key-completion.webp",
  "key-confident.webp",
  "key-explain.webp",
  "key-hand-forward-left.webp",
  "key-hand-forward-right.webp",
  "key-idea.webp",
  "key-please.webp",
  "key-point-strict.webp",
  "key-score-ten.png",
  "key-stop.webp",
  "key-thinking.webp",
  "key-thumb.webp",
  "key-wave.webp"
];
const storyboardSlotNames = ["introImage", "introTip", "nextModuleText", "completionImage", "completionText"];
const storyboardColumnDefaults = {
  number: 72,
  lesson: 270,
  training: 190,
  nextModuleText: 230,
  introImage: 190,
  introTip: 320,
  completionImage: 200,
  completionText: 320
};
const storyboardColumnMinimums = {
  number: 56,
  lesson: 180,
  training: 140,
  nextModuleText: 160,
  introImage: 140,
  introTip: 200,
  completionImage: 140,
  completionText: 220
};
const storyboardColumnOrder = Object.keys(storyboardColumnDefaults);
const storyboardVisibilityKeys = {
  introImage: "showIntroImage",
  introTip: "showIntroTip",
  nextModuleText: "showNextModuleText",
  completionImage: "showCompletionImage",
  completionText: "showCompletionText"
};

function storyboardKeyAssetSrc(fileName) {
  return typeof keyAssetSrc === "function" ? keyAssetSrc(fileName) : "assets/key/" + fileName;
}

function storyboardImageId(fileName) {
  const index = storyboardKeyImages.indexOf(fileName);
  return index >= 0 ? `K${String(index + 1).padStart(2, "0")}` : "K??";
}

function storyboardImageFileNameFromSrc(src) {
  return String(src || "").replace("assets/key/", "").split("?")[0];
}

function storyboardLocalizedText(value, language) {
  if (Array.isArray(value)) return value.filter(Boolean).join("\n");
  if (!value || typeof value !== "object") return value || "";
  const localized = value[language] || "";
  return storyboardLocalizedText(localized, language);
}

function storyboardLocalizedMap(value, languages, fallback = {}) {
  return Object.fromEntries(languages.map(language => [
    language,
    value && typeof value === "object" && !Array.isArray(value)
      ? storyboardLocalizedText(value[language], language) || storyboardLocalizedText(fallback, language)
      : storyboardLocalizedText(value, language) || storyboardLocalizedText(fallback, language)
  ]));
}

function storyboardLessonIntroPurpose(lesson) {
  if (lesson?.intro) return lesson.intro;
  if (typeof lessonIntroPurpose !== "undefined") return lessonIntroPurpose[lesson.id] || {};
  return {};
}

function storyboardOnboardingFallbackTitle(screen, languages) {
  const id = String(screen?.id || "");
  return Object.fromEntries(languages.map(language => {
    const text = textFor(language).storyboard || {};
    if (id.includes("finger_map_after")) return [language, text.onboardingFingerMapTitle || text.onboardingTab || "Onboarding"];
    if (id.includes("finger_map_feature")) return [language, text.onboardingFingerMapReminderTitle || text.onboardingTab || "Onboarding"];
    return [language, text.onboardingTab || text.onboardingModule || "Onboarding"];
  }));
}

function storyboardTextFor(stateOrLanguage = currentLanguage) {
  const language = typeof stateOrLanguage === "string" ? stateOrLanguage : stateOrLanguage.previewLanguage;
  return textFor(language).storyboard || textFor().storyboard || {};
}

function storyboardCardLabel(type, language = currentLanguage) {
  return textFor(language).storyboard?.cardLabels?.[type] || type;
}

function storyboardCardCategory(type) {
  return type.includes("Image") || type === "imageBank" ? "image" : "text";
}

function storyboardTrainingLabels(language) {
  const labels = textFor(language).storyboard?.trainingLabels || {};
  return {
    volume: labels.volume || "volume",
    goals: labels.goals || "goals",
    lines: labels.lines || "lines",
    accuracy: labels.accuracy || "accuracy",
    speed: labels.speed || "cpm",
    speedMax: labels.speedMax || "up to",
    assistantsOff: labels.assistantsOff || "no assistants",
    content: labels.content || "exercise"
  };
}

function storyboardSlotVisible(state, lessonId, slotName) {
  const visibilityKey = storyboardVisibilityKeys[slotName];
  if (!visibilityKey) return true;
  return state.visibility[lessonId]?.[visibilityKey] !== false;
}

function setStoryboardSlotVisible(state, lessonId, slotName, visible) {
  const visibilityKey = storyboardVisibilityKeys[slotName];
  if (!visibilityKey) return;
  state.visibility[lessonId] = state.visibility[lessonId] || {};
  state.visibility[lessonId][visibilityKey] = visible;
  renderLessonStoryboard(state);
}

function setStoryboardView(state, view) {
  state.activeView = ["flow", "onboarding", "images"].includes(view) ? view : "flow";
  renderLessonStoryboard(state);
}

function storyboardImageScalePercent(state) {
  return `${Math.round((state.imageScale || 1) * 100)}%`;
}

function setStoryboardImageScale(state, scale) {
  state.imageScale = Math.min(2.6, Math.max(0.55, scale));
  renderLessonStoryboard(state);
}

function storyboardColumnWidth(state, key) {
  return state.columnWidths?.[key] || storyboardColumnDefaults[key];
}

function storyboardColumnTemplate(state) {
  return storyboardColumnOrder.map(key => `${storyboardColumnWidth(state, key)}px`).join(" ");
}

function setStoryboardColumnWidthVars(board, state) {
  const template = storyboardColumnTemplate(state);
  board.style.setProperty("--storyboard-columns", template);
  board.style.setProperty(
    "--storyboard-table-width",
    `${storyboardColumnOrder.reduce((sum, key) => sum + storyboardColumnWidth(state, key), 0) + ((storyboardColumnOrder.length - 1) * 8)}px`
  );
}

function closeStoryboardImagePreview() {
  document.querySelector("#storyboardImagePreview")?.remove();
}

function storyboardAssignedPreviewImages(state, currentFileName) {
  const images = [];
  const addImage = fileName => {
    if (fileName && !images.includes(fileName)) images.push(fileName);
  };

  state.lessons.forEach(lesson => {
    const assignment = state.assignments[lesson.id] || {};
    addImage(storyboardCard(state, assignment.introImage)?.value);
    addImage(storyboardCard(state, assignment.completionImage)?.value);
  });

  return images.includes(currentFileName)
    ? images
    : [currentFileName, ...images];
}

function storyboardImageUsages(state) {
  const usages = new Map(storyboardKeyImages.map(fileName => [fileName, []]));
  const addUsage = (fileName, label) => {
    if (!fileName) return;
    if (!usages.has(fileName)) usages.set(fileName, []);
    usages.get(fileName).push(label);
  };

  state.lessons.forEach(lesson => {
    const assignment = state.assignments[lesson.id] || {};
    const lessonTitle = storyboardLocalizedText(lesson.lessonTitle, state.previewLanguage);
    const lessonLabel = `${lesson.number} ${lessonTitle}`.trim();

    if (storyboardSlotVisible(state, lesson.id, "introImage")) {
      const label = `${storyboardCardLabel("introImage", state.previewLanguage)}: ${lessonLabel}`;
      addUsage(storyboardCard(state, assignment.introImage)?.value, label);
    }

    if (!lesson.isWelcomeStep && storyboardSlotVisible(state, lesson.id, "completionImage")) {
      addUsage(
        storyboardCard(state, assignment.completionImage)?.value,
        `${storyboardCardLabel("completionImage", state.previewLanguage)}: ${lessonLabel}`
      );
    }
  });

  return usages;
}

function storyboardImageUsageGroups(state) {
  const storyboardText = storyboardTextFor(state);
  const groups = [
    {
      key: "before",
      title: storyboardText.imageGroupBefore || "Before lesson",
      usages: new Map(storyboardKeyImages.map(fileName => [fileName, []]))
    },
    {
      key: "after",
      title: storyboardText.imageGroupAfter || "After lesson",
      usages: new Map(storyboardKeyImages.map(fileName => [fileName, []]))
    },
    {
      key: "onboarding",
      title: storyboardText.imageGroupOnboarding || storyboardText.onboardingTab || "Onboarding",
      usages: new Map(storyboardKeyImages.map(fileName => [fileName, []]))
    }
  ];
  const groupByKey = Object.fromEntries(groups.map(group => [group.key, group]));
  const addUsage = (groupKey, fileName, label) => {
    if (!fileName) return;
    const group = groupByKey[groupKey];
    if (!group) return;
    if (!group.usages.has(fileName)) group.usages.set(fileName, []);
    group.usages.get(fileName).push(label);
  };

  state.lessons.forEach(lesson => {
    const assignment = state.assignments[lesson.id] || {};
    const lessonTitle = storyboardLocalizedText(lesson.lessonTitle, state.previewLanguage);
    const lessonLabel = `${lesson.number} ${lessonTitle}`.trim();

    if (storyboardSlotVisible(state, lesson.id, "introImage")) {
      addUsage(
        "before",
        storyboardCard(state, assignment.introImage)?.value,
        `${storyboardCardLabel("introImage", state.previewLanguage)}: ${lessonLabel}`
      );
    }

    if (storyboardSlotVisible(state, lesson.id, "completionImage")) {
      addUsage(
        "after",
        storyboardCard(state, assignment.completionImage)?.value,
        `${storyboardCardLabel("completionImage", state.previewLanguage)}: ${lessonLabel}`
      );
    }
  });

  (state.onboardingEvents || []).forEach(event => {
    if (event.showImage === false) return;
    const title = storyboardLocalizedText(event.title, state.previewLanguage);
    addUsage(
      "onboarding",
      storyboardCard(state, event.imageCardId)?.value,
      `${storyboardText.onboardingLabel || storyboardText.onboardingTab || "Onboarding"}: ${event.number} ${title}`.trim()
    );
  });

  return groups;
}

function hideStoryboardFloatingTooltip() {
  document.querySelector("#storyboardFloatingTooltip")?.remove();
}

function positionStoryboardFloatingTooltip(anchor, tooltip) {
  const margin = 12;
  const gap = 8;
  const anchorRect = anchor.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  let left = anchorRect.right - tooltipRect.width;
  let top = anchorRect.bottom + gap;

  if (left < margin) left = margin;
  if (left + tooltipRect.width > window.innerWidth - margin) {
    left = window.innerWidth - tooltipRect.width - margin;
  }

  if (top + tooltipRect.height > window.innerHeight - margin) {
    top = anchorRect.top - tooltipRect.height - gap;
  }
  if (top < margin) top = margin;

  tooltip.style.left = `${Math.max(margin, left)}px`;
  tooltip.style.top = `${Math.max(margin, top)}px`;
}

function showStoryboardFloatingTooltip(anchor, text) {
  hideStoryboardFloatingTooltip();
  const tooltip = document.createElement("div");
  tooltip.id = "storyboardFloatingTooltip";
  tooltip.className = "storyboard-floating-tooltip";
  tooltip.textContent = text;
  document.body.append(tooltip);
  positionStoryboardFloatingTooltip(anchor, tooltip);
}

function openStoryboardImagePreview(fileName, images = [fileName]) {
  closeStoryboardImagePreview();

  const storyboardText = textFor().storyboard;
  let imageIndex = Math.max(0, images.indexOf(fileName));
  const overlay = document.createElement("div");
  overlay.className = "storyboard-image-preview";
  overlay.id = "storyboardImagePreview";
  overlay.tabIndex = -1;
  overlay.innerHTML = [
    `<button class="storyboard-image-preview-close" type="button" aria-label="${storyboardText.closePreview}">×</button>`,
    `<button class="storyboard-image-preview-nav storyboard-image-preview-prev" type="button" aria-label="${storyboardText.previousImage}">‹</button>`,
    '<figure class="storyboard-image-preview-frame">',
    '<img alt="">',
    '<figcaption></figcaption>',
    '</figure>',
    `<button class="storyboard-image-preview-nav storyboard-image-preview-next" type="button" aria-label="${storyboardText.nextImage}">›</button>`
  ].join("");

  const image = overlay.querySelector("img");
  const caption = overlay.querySelector("figcaption");
  const renderPreviewImage = () => {
    const currentFileName = images[imageIndex];
    image.src = storyboardKeyAssetSrc(currentFileName);
    caption.textContent = currentFileName;
  };
  const shiftPreviewImage = direction => {
    imageIndex = (imageIndex + direction + images.length) % images.length;
    renderPreviewImage();
  };

  overlay.addEventListener("click", event => {
    if (event.target === overlay) closeStoryboardImagePreview();
  });
  overlay.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeStoryboardImagePreview();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      shiftPreviewImage(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      shiftPreviewImage(1);
    }
  });
  overlay.querySelector(".storyboard-image-preview-close").addEventListener("click", closeStoryboardImagePreview);
  overlay.querySelector(".storyboard-image-preview-prev").addEventListener("click", () => shiftPreviewImage(-1));
  overlay.querySelector(".storyboard-image-preview-next").addEventListener("click", () => shiftPreviewImage(1));
  document.body.append(overlay);
  renderPreviewImage();
  overlay.focus({ preventScroll: true });
}

function createStoryboardVisibilityToggle(state, lessonId, slotName) {
  const visibility = document.createElement("label");
  visibility.className = "storyboard-visibility";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = storyboardSlotVisible(state, lessonId, slotName);
  checkbox.setAttribute("aria-label", storyboardTextFor(state).showStep || "Show");
  checkbox.title = storyboardTextFor(state).showStep || "Show";
  checkbox.addEventListener("change", event => {
    setStoryboardSlotVisible(state, lessonId, slotName, event.target.checked);
  });
  checkbox.addEventListener("pointerdown", event => event.stopPropagation());
  checkbox.addEventListener("dragstart", event => event.preventDefault());

  visibility.append(checkbox);
  return visibility;
}

function createStoryboardCard(state, card, options = {}) {
  const node = document.createElement("article");
  node.className = `storyboard-card ${storyboardCardCategory(card.type) === "image" ? "storyboard-image-card" : ""}`;
  if (options.lessonId && options.slotName && !storyboardSlotVisible(state, options.lessonId, options.slotName)) {
    node.classList.add("storyboard-card-disabled");
  }
  node.draggable = true;
  node.dataset.cardId = card.id;
  node.dataset.cardType = card.type;
  node.innerHTML = "";

  if (options.lessonId && options.slotName) {
    node.append(createStoryboardVisibilityToggle(state, options.lessonId, options.slotName));
  }

  if (storyboardCardCategory(card.type) === "image") {
    const imageStage = document.createElement("div");
    imageStage.className = "storyboard-image-stage";
    const image = document.createElement("img");
    image.src = storyboardKeyAssetSrc(card.value);
    image.alt = "";
    imageStage.addEventListener("dblclick", event => {
      event.preventDefault();
      event.stopPropagation();
      openStoryboardImagePreview(card.value, storyboardAssignedPreviewImages(state, card.value));
    });
    imageStage.append(image);
    const imageId = document.createElement("span");
    imageId.className = "storyboard-image-id";
    imageId.textContent = storyboardImageId(card.value);
    imageStage.append(imageId);
    const name = document.createElement("div");
    name.className = "storyboard-image-name";
    name.textContent = card.value;
    node.append(imageStage, name);
  } else {
    const editor = document.createElement("textarea");
    editor.className = "storyboard-text-editor";
    editor.value = storyboardLocalizedText(card.value, state.previewLanguage);
    editor.setAttribute("aria-label", storyboardCardLabel(card.type, state.previewLanguage));
    editor.addEventListener("input", () => {
      if (!card.value || typeof card.value !== "object" || Array.isArray(card.value)) {
        card.value = { [state.previewLanguage]: editor.value };
        return;
      }

      card.value[state.previewLanguage] = editor.value;
    });
    editor.addEventListener("pointerdown", event => event.stopPropagation());
    editor.addEventListener("dragstart", event => event.preventDefault());
    node.append(editor);
  }

  node.addEventListener("dragstart", event => {
    if (event.target.closest("textarea")) {
      event.preventDefault();
      return;
    }

    state.drag = {
      cardId: card.id,
      from: node.closest("[data-storyboard-source]")?.dataset.storyboardSource || "",
      slotId: node.closest("[data-slot-id]")?.dataset.slotId || "",
      parkingIndex: node.closest("[data-parking-index]")?.dataset.parkingIndex || "",
      parkingArea: node.closest("[data-parking-area]")?.dataset.parkingArea || "side"
    };
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", card.id);
  });

  return node;
}

function createStoryboardEmptySlot(state) {
  const node = document.createElement("div");
  node.className = "storyboard-empty";
  node.textContent = storyboardTextFor(state).dropCard;
  return node;
}

function storyboardSlotKey(lessonId, slotName) {
  return `${lessonId}:${slotName}`;
}

function storyboardCard(state, id) {
  return state.cards[id] || null;
}

function storyboardParkingList(state, area = "side") {
  return area === "bottom" ? state.bottomParking : state.parking;
}

function removeStoryboardCardFromSource(state, drag) {
  if (drag.from === "slot" && drag.slotId) {
    const [lessonId, slotName] = drag.slotId.split(":");
    if (state.assignments[lessonId]?.[slotName] === drag.cardId) {
      state.assignments[lessonId][slotName] = null;
    }
  }

  if (drag.from === "parking" && drag.parkingIndex !== "") {
    storyboardParkingList(state, drag.parkingArea).splice(Number(drag.parkingIndex), 1);
  }
}

function cloneStoryboardBankCard(state, sourceCard, nextType) {
  const id = `card-${state.nextCardId++}`;
  state.cards[id] = {
    id,
    type: nextType,
    value: sourceCard.value,
    origin: "image bank"
  };
  return id;
}

function moveStoryboardCardToSlot(state, lessonId, slotName) {
  if (!state.drag) return;

  const sourceCard = storyboardCard(state, state.drag.cardId);
  if (!sourceCard) return;

  const targetType = slotName;
  const targetCategory = storyboardCardCategory(targetType);
  if (storyboardCardCategory(sourceCard.type) !== targetCategory) return;

  const movingCardId = state.drag.from === "bank"
    ? cloneStoryboardBankCard(state, sourceCard, targetType)
    : sourceCard.id;
  const movingCard = storyboardCard(state, movingCardId);
  movingCard.type = targetType;

  removeStoryboardCardFromSource(state, state.drag);

  const oldCardId = state.assignments[lessonId][slotName];
  if (oldCardId && oldCardId !== movingCardId) {
    state.parking.push(oldCardId);
  }

  state.assignments[lessonId][slotName] = movingCardId;
  state.drag = null;
  renderLessonStoryboard(state);
}

function moveStoryboardCardToParking(state, area = "side") {
  if (!state.drag) return;

  const sourceCard = storyboardCard(state, state.drag.cardId);
  if (!sourceCard) return;

  const movingCardId = state.drag.from === "bank"
    ? cloneStoryboardBankCard(state, sourceCard, "introImage")
    : sourceCard.id;

  removeStoryboardCardFromSource(state, state.drag);
  const parking = storyboardParkingList(state, area);
  if (!parking.includes(movingCardId)) {
    parking.push(movingCardId);
  }

  state.drag = null;
  renderLessonStoryboard(state);
}

function wireStoryboardDropTarget(node, onDrop) {
  node.addEventListener("dragover", event => {
    event.preventDefault();
    node.classList.add("drag-over");
  });
  node.addEventListener("dragleave", () => {
    node.classList.remove("drag-over");
  });
  node.addEventListener("drop", event => {
    event.preventDefault();
    node.classList.remove("drag-over");
    onDrop();
  });
}

function createStoryboardInitialState() {
  const source = window.FlyKeyContentProvider?.getContentBundle?.() || window.PRACTICE_CONTENT_SOURCE || {};
  const sourceLanguages = source.languages || Object.keys(languages);
  const cards = {};
  const assignments = {};
  const visibility = {};
  const onboardingEvents = [];
  let nextCardId = 1;
  const lessons = [];

  function addCard(type, value, origin) {
    const id = `card-${nextCardId++}`;
    cards[id] = { id, type, value, origin };
    return id;
  }

  const appOnboardingScreens = Array.isArray(onboardingStoryboard().screens)
    ? onboardingStoryboard().screens
    : (sourceLanguages.length ? sourceLanguages : Object.keys(languages)).map(() => null) && (textFor("en").onboarding?.screens || []).map((_, index) => {
      const localizedText = Object.fromEntries(sourceLanguages.map(language => [
        language,
        storyboardLocalizedText(textFor(language).onboarding?.screens?.[index]?.paragraphs || [], language)
      ]));
      const defaultScreen = textFor("en").onboarding?.screens?.[index] || {};
      return {
        id: `onboarding_${index + 1}`,
        image: defaultScreen.character ? "key-wave.webp" : "fly_welcome_no_bg.png",
        showImage: defaultScreen.character === true,
        text: localizedText,
        visible: true
      };
    });

  appOnboardingScreens.forEach((screen, index) => {
    const id = String(screen.id || `onboarding_${index + 1}`);
    const number = `0.${index + 1}`;
    const title = storyboardLocalizedMap(screen.title || {}, sourceLanguages, storyboardOnboardingFallbackTitle(screen, sourceLanguages));
    onboardingEvents.push({
      id,
      number,
      title,
      triggerType: screen.trigger?.type || "firstLaunch",
      triggerLessonId: screen.trigger?.lessonId || "",
      imageCardId: addCard("introImage", screen.image || "fly_welcome_no_bg.png", number),
      textCardId: addCard("introTip", storyboardLocalizedMap(screen.text || {}, sourceLanguages), number),
      visible: screen.visible !== false,
      showImage: screen.showImage !== false && Boolean(screen.image)
    });
  });

  (source.modules || []).forEach((module, moduleIndex) => {
    (module.lessons || []).forEach((lesson, lessonIndex) => {
      const number = `${moduleIndex + 1}.${lessonIndex + 1}`;
      const moduleTitle = storyboardLocalizedMap(module.title, sourceLanguages);
      const lessonTitle = storyboardLocalizedMap(lesson.title, sourceLanguages);
      const storyboardEntry = lessonStoryboardFor(lesson);
      const introImage = storyboardEntry.introImage || "key-wave.webp";
      const introTip = storyboardLocalizedMap(storyboardEntry.introTip || lesson.tips, sourceLanguages);
      const nextModuleText = storyboardLocalizedMap(storyboardEntry.nextModuleText || storyboardLessonIntroPurpose(lesson), sourceLanguages);
      const completionImage = storyboardEntry.completionImage || "key-completion.webp";
      const completionText = storyboardLocalizedMap(storyboardEntry.completionText || lesson.completion, sourceLanguages, Object.fromEntries(
        sourceLanguages.map(language => [language, textFor(language).defaultCompletion])
      ));

      const content = lesson.content || {};
      const scoring = lesson.scoring || lesson.target || {};
      lessons.push({
        id: lesson.id,
        moduleId: module.id,
        number,
        moduleTitle,
        lessonTitle,
        lineCount: content.lineCount || lesson.lines?.[sourceLanguages[0]]?.length || 0,
        goals: scoring,
        lines: lesson.lines || {},
        isTest: lesson.test === true
      });

      assignments[lesson.id] = {
        introImage: addCard("introImage", introImage, number),
        introTip: addCard("introTip", introTip, number),
        nextModuleText: addCard("nextModuleText", nextModuleText, number),
        completionImage: addCard("completionImage", completionImage, number),
        completionText: addCard("completionText", completionText, number)
      };
      visibility[lesson.id] = {
        showIntroImage: storyboardStepEnabled(storyboardEntry, "showIntroImage"),
        showIntroTip: storyboardStepEnabled(storyboardEntry, "showIntroTip"),
        showNextModuleText: storyboardStepEnabled(storyboardEntry, "showNextModuleText"),
        showCompletionImage: storyboardStepEnabled(storyboardEntry, "showCompletionImage"),
        showCompletionText: storyboardStepEnabled(storyboardEntry, "showCompletionText")
      };
    });
  });

  const imageBank = storyboardKeyImages.map(fileName => addCard("imageBank", fileName, "bank"));

  return {
    assignments,
    cards,
    drag: null,
    imageBank,
    languages: sourceLanguages,
    lessons,
    onboardingEvents,
    visibility,
    activeView: "flow",
    imageScale: 1,
    nextCardId,
    bottomParking: [],
    bottomParkingHeight: 220,
    columnWidths: { ...storyboardColumnDefaults },
    parking: [],
    previewLanguage: currentLanguage || sourceLanguages[0] || "en",
    sideParkingWidth: 340
  };
}

function createStoryboardSlot(state, lessonId, slotName) {
  const slot = document.createElement("div");
  slot.className = "storyboard-slot";
  slot.dataset.storyboardSource = "slot";
  slot.dataset.slotId = storyboardSlotKey(lessonId, slotName);
  const cardId = state.assignments[lessonId]?.[slotName];
  const card = storyboardCard(state, cardId);
  slot.append(card ? createStoryboardCard(state, card, { lessonId, slotName }) : createStoryboardEmptySlot(state));
  wireStoryboardDropTarget(slot, () => moveStoryboardCardToSlot(state, lessonId, slotName));
  return slot;
}

function renderStoryboardScenePart(state, scene, lessonId, slotName, label) {
  const part = document.createElement("section");
  part.className = `storyboard-scene-part storyboard-scene-part-${slotName}`;

  const title = document.createElement("h3");
  title.className = "storyboard-scene-part-title";
  title.textContent = label;

  part.append(title, createStoryboardSlot(state, lessonId, slotName));
  scene.append(part);
}

function renderStoryboardMutedScenePart(scene, slotName, label, text = "") {
  const part = document.createElement("section");
  part.className = `storyboard-scene-part storyboard-scene-part-${slotName} storyboard-muted-part`;

  const title = document.createElement("h3");
  title.className = "storyboard-scene-part-title";
  title.textContent = label;

  const empty = document.createElement("div");
  empty.className = "storyboard-scene-muted";
  empty.textContent = text;

  part.append(title, empty);
  scene.append(part);
}

function createStoryboardTrainingCell(state, lesson) {
  const labels = storyboardTrainingLabels(state.previewLanguage);
  const goals = lesson.goals || {};
  const lines = Array.isArray(lesson.lines?.[state.previewLanguage])
    ? lesson.lines[state.previewLanguage]
    : (Array.isArray(lesson.lines?.en) ? lesson.lines.en : []);
  const cell = document.createElement("div");
  cell.className = "storyboard-training-cell";

  const goalsList = document.createElement("div");
  goalsList.className = "storyboard-training-meta";

  if (goals.accuracy) {
    const item = document.createElement("span");
    item.textContent = `${goals.accuracy}% ${labels.accuracy}`;
    goalsList.append(item);
  }

  const speed = goals.speed || goals.speedMax;
  if (speed) {
    const item = document.createElement("span");
    item.textContent = goals.speedMax
      ? `${labels.speedMax} ${goals.speedMax} ${labels.speed}`
      : `${speed} ${labels.speed}`;
    goalsList.append(item);
  }

  if (goals.assistants === false || lesson.isTest) {
    const item = document.createElement("span");
    item.textContent = labels.assistantsOff;
    goalsList.append(item);
  }

  cell.append(goalsList);

  const contentBlock = document.createElement("div");
  contentBlock.className = "storyboard-training-content";
  const contentLabel = document.createElement("div");
  contentLabel.className = "storyboard-training-content-label";
  contentLabel.textContent = labels.content;
  const contentList = document.createElement("div");
  contentList.className = "storyboard-training-lines";
  lines.forEach((line, index) => {
    const item = document.createElement("div");
    item.className = "storyboard-training-line";
    item.textContent = `${index + 1}. ${line}`;
    contentList.append(item);
  });
  contentBlock.append(contentLabel, contentList);
  cell.append(contentBlock);
  return cell;
}

function createStoryboardSceneCell(state, lesson) {
  const storyboardText = storyboardTextFor(state);
  const labels = storyboardText.cardLabels || {};
  const scene = document.createElement("div");
  scene.className = `storyboard-scene-cell storyboard-${lesson.isWelcomeStep ? "welcome" : "lesson"}-scene`;

  if (lesson.isWelcomeStep) {
    renderStoryboardMutedScenePart(scene, "nextModuleText", labels.nextModuleText || "Description");
  } else {
    renderStoryboardScenePart(state, scene, lesson.id, "nextModuleText", labels.nextModuleText || "Description");
  }
  renderStoryboardScenePart(state, scene, lesson.id, "introImage", labels.introImage || "Start image");
  renderStoryboardScenePart(state, scene, lesson.id, "introTip", labels.introTip || "Tip");
  return scene;
}

function createStoryboardCompletionCell(state, lesson) {
  const storyboardText = storyboardTextFor(state);
  const labels = storyboardText.cardLabels || {};
  const scene = document.createElement("div");
  scene.className = "storyboard-scene-cell storyboard-completion-scene";

  if (lesson.isWelcomeStep) {
    const notUsed = storyboardText.notUsedInOnboarding || "";
    renderStoryboardMutedScenePart(scene, "completionImage", labels.completionImage || "Completion image", notUsed);
    renderStoryboardMutedScenePart(scene, "completionText", labels.completionText || "Comment", notUsed);
    return scene;
  }

  renderStoryboardScenePart(state, scene, lesson.id, "completionImage", labels.completionImage || "Completion image");
  renderStoryboardScenePart(state, scene, lesson.id, "completionText", labels.completionText || "Comment");
  return scene;
}

function createStoryboardColumnResizeHandle(state, board, columnKey) {
  const handle = document.createElement("span");
  handle.className = "storyboard-column-resize";
  handle.setAttribute("aria-hidden", "true");
  handle.addEventListener("pointerdown", event => {
    event.preventDefault();
    event.stopPropagation();

    const startX = event.clientX;
    const startWidth = storyboardColumnWidth(state, columnKey);
    const minWidth = storyboardColumnMinimums[columnKey] || 80;
    handle.setPointerCapture(event.pointerId);
    handle.classList.add("is-resizing");

    const resize = pointerEvent => {
      state.columnWidths[columnKey] = Math.max(minWidth, Math.round(startWidth + pointerEvent.clientX - startX));
      setStoryboardColumnWidthVars(board, state);
    };

    const stopResize = pointerEvent => {
      handle.classList.remove("is-resizing");
      handle.releasePointerCapture(pointerEvent.pointerId);
      handle.removeEventListener("pointermove", resize);
    };

    handle.addEventListener("pointermove", resize);
    handle.addEventListener("pointerup", stopResize, { once: true });
    handle.addEventListener("pointercancel", stopResize, { once: true });
  });
  return handle;
}

function createStoryboardColumnHeader(state, board, key, label) {
  const cell = document.createElement("div");
  cell.className = `storyboard-column-header storyboard-column-header-${key}`;
  cell.textContent = label;
  cell.append(createStoryboardColumnResizeHandle(state, board, key));
  return cell;
}

function renderLessonStoryboard(state) {
  const board = document.querySelector("#lessonStoryboardBoard");
  if (!board) return;

  updateStoryboardChrome(state, board);

  const table = board.querySelector("#storyboardTable");
  const flowMain = board.querySelector("#storyboardFlowMain");
  const onboardingMain = board.querySelector("#storyboardOnboardingMain");
  const imageGallery = board.querySelector("#storyboardImageGallery");
  const flowTab = board.querySelector("#storyboardFlowTab");
  const onboardingTab = board.querySelector("#storyboardOnboardingTab");
  const imagesTab = board.querySelector("#storyboardImagesTab");
  const parking = board.querySelector("#storyboardParking");
  const bottomParking = board.querySelector("#storyboardBottomParking");
  const languageSelect = board.querySelector("#storyboardLanguage");
  const imageScaleValue = board.querySelector("#storyboardImageScaleValue");

  languageSelect.innerHTML = "";
  state.languages.forEach(language => {
    const option = document.createElement("option");
    option.value = language;
    option.textContent = languages[language]?.name || language.toUpperCase();
    option.selected = language === state.previewLanguage;
    languageSelect.append(option);
  });
  if (imageScaleValue) {
    imageScaleValue.textContent = storyboardImageScalePercent(state);
  }
  board.style.setProperty("--storyboard-image-width", storyboardImageScalePercent(state));
  board.style.setProperty("--storyboard-image-max-height", `${Math.round(88 * (state.imageScale || 1))}px`);
  setStoryboardLayoutSizeVars(board, state);
  setStoryboardColumnWidthVars(board, state);
  board.dataset.storyboardView = state.activeView || "flow";
  flowMain.hidden = state.activeView !== "flow";
  onboardingMain.hidden = state.activeView !== "onboarding";
  imageGallery.hidden = state.activeView !== "images";
  flowTab.classList.toggle("active", state.activeView === "flow");
  onboardingTab.classList.toggle("active", state.activeView === "onboarding");
  imagesTab.classList.toggle("active", state.activeView === "images");
  flowTab.setAttribute("aria-selected", String(state.activeView === "flow"));
  onboardingTab.setAttribute("aria-selected", String(state.activeView === "onboarding"));
  imagesTab.setAttribute("aria-selected", String(state.activeView === "images"));

  table.innerHTML = "";
  const storyboardText = storyboardTextFor(state);
  const tableHeaders = storyboardText.tableHeaders || ["№", "Lesson", "Start", "End"];
  const columnHeader = document.createElement("div");
  columnHeader.className = "storyboard-row storyboard-header";
  const labels = storyboardText.cardLabels || {};
  [
    ["number", tableHeaders[0] || "№"],
    ["lesson", tableHeaders[1] || "Lesson"],
    ["training", storyboardText.trainingColumn || tableHeaders[2] || "Training"],
    ["nextModuleText", labels.nextModuleText || "Description"],
    ["introImage", labels.introImage || "Start image"],
    ["introTip", labels.introTip || "Tip"],
    ["completionImage", labels.completionImage || "Completion image"],
    ["completionText", labels.completionText || "Comment"]
  ].forEach(([key, label]) => {
    columnHeader.append(createStoryboardColumnHeader(state, board, key, label));
  });
  table.append(columnHeader);

  state.lessons.forEach(lesson => {
    const row = document.createElement("div");
    row.className = `storyboard-row ${lesson.isWelcomeStep ? "storyboard-welcome-row" : ""}`;

    const number = document.createElement("div");
    number.className = "storyboard-number-cell";
    number.textContent = lesson.number;

    const lessonCell = document.createElement("div");
    lessonCell.className = "storyboard-lesson-cell";
    const moduleName = document.createElement("div");
    moduleName.className = "storyboard-module-name";
    moduleName.textContent = storyboardLocalizedText(lesson.moduleTitle, state.previewLanguage);
    const lessonName = document.createElement("div");
    lessonName.className = "storyboard-lesson-name";
    lessonName.textContent = storyboardLocalizedText(lesson.lessonTitle, state.previewLanguage);
    const lessonId = document.createElement("div");
    lessonId.className = "storyboard-lesson-id";
    lessonId.textContent = lesson.id;
    lessonCell.append(moduleName, lessonName, lessonId);

    row.append(number, lessonCell, createStoryboardTrainingCell(state, lesson));
    row.append(createStoryboardSceneCell(state, lesson), createStoryboardCompletionCell(state, lesson));
    table.append(row);
  });

  renderStoryboardOnboardingPanel(state, onboardingMain);
  renderStoryboardParkingArea(state, parking, "side");
  renderStoryboardParkingArea(state, bottomParking, "bottom");
  renderStoryboardImageGallery(state, imageGallery);

}

function storyboardTriggerOptions(state) {
  const text = storyboardTextFor(state);
  return [
    ["firstLaunch", text.triggerFirstLaunch || "First launch"],
    ["beforeLesson", text.triggerBeforeLesson || "Before lesson"],
    ["afterLesson", text.triggerAfterLesson || "After lesson"],
    ["featureOpen", text.triggerFeatureOpen || "When feature opens"],
    ["manual", text.triggerManual || "Manual/off"]
  ];
}

function createStoryboardOnboardingImageSelect(state, event) {
  const select = document.createElement("select");
  select.className = "storyboard-onboarding-select";
  storyboardKeyImages.forEach(fileName => {
    const option = document.createElement("option");
    option.value = fileName;
    option.textContent = `${storyboardImageId(fileName)} — ${fileName}`;
    option.selected = storyboardCard(state, event.imageCardId)?.value === fileName;
    select.append(option);
  });
  select.addEventListener("change", () => {
    const card = storyboardCard(state, event.imageCardId);
    if (card) card.value = select.value;
    renderLessonStoryboard(state);
  });
  return select;
}

function createStoryboardOnboardingTriggerControls(state, event) {
  const wrapper = document.createElement("div");
  wrapper.className = "storyboard-onboarding-trigger-controls";

  const trigger = document.createElement("select");
  trigger.className = "storyboard-onboarding-select";
  storyboardTriggerOptions(state).forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    option.selected = event.triggerType === value;
    trigger.append(option);
  });

  const lesson = document.createElement("select");
  lesson.className = "storyboard-onboarding-select";
  const none = document.createElement("option");
  none.value = "";
  none.textContent = storyboardTextFor(state).triggerNoLesson || "No lesson";
  lesson.append(none);
  state.lessons.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = `${item.number} ${storyboardLocalizedText(item.lessonTitle, state.previewLanguage)}`;
    option.selected = event.triggerLessonId === item.id;
    lesson.append(option);
  });

  const update = () => {
    event.triggerType = trigger.value;
    event.triggerLessonId = lesson.value;
    lesson.hidden = !["beforeLesson", "afterLesson"].includes(event.triggerType);
  };
  trigger.addEventListener("change", update);
  lesson.addEventListener("change", update);
  update();

  wrapper.append(trigger, lesson);
  return wrapper;
}

function renderStoryboardOnboardingPanel(state, onboardingMain) {
  if (!onboardingMain) return;

  const storyboardText = storyboardTextFor(state);
  onboardingMain.innerHTML = "";

  const intro = document.createElement("section");
  intro.className = "storyboard-onboarding-intro";
  const title = document.createElement("h2");
  title.textContent = storyboardText.onboardingScreenTitle || storyboardText.onboardingModule || "Onboarding";
  const note = document.createElement("p");
  note.textContent = storyboardText.onboardingScreenNote || "";
  intro.append(title, note);
  onboardingMain.append(intro);

  const grid = document.createElement("div");
  grid.className = "storyboard-onboarding-grid";

  (state.onboardingEvents || []).forEach(event => {
    const textCard = storyboardCard(state, event.textCardId);
    const imageCard = storyboardCard(state, event.imageCardId);
    const panel = document.createElement("article");
    panel.className = "storyboard-onboarding-panel storyboard-onboarding-trigger-panel";

    const header = document.createElement("header");
    header.className = "storyboard-onboarding-panel-header";
    const heading = document.createElement("div");
    const name = document.createElement("span");
    name.textContent = `${event.number} ${storyboardLocalizedText(event.title, state.previewLanguage)}`.trim();
    const id = document.createElement("small");
    id.textContent = event.id;
    heading.append(name, id);

    const visible = document.createElement("label");
    visible.className = "storyboard-onboarding-visibility";
    const visibleInput = document.createElement("input");
    visibleInput.type = "checkbox";
    visibleInput.checked = event.visible !== false;
    visibleInput.addEventListener("change", () => {
      event.visible = visibleInput.checked;
      renderLessonStoryboard(state);
    });
    visible.append(visibleInput, document.createTextNode(storyboardText.showStep || "Show"));
    header.append(heading, visible);

    const content = document.createElement("div");
    content.className = "storyboard-onboarding-trigger-content";

    const description = document.createElement("p");
    description.className = "storyboard-onboarding-description";
    description.textContent = storyboardText.onboardingEventDescription || "This card describes what happens in the app. Configure where it appears, which image is attached, and the text shown to the user.";

    const controls = document.createElement("div");
    controls.className = "storyboard-onboarding-controls";

    const triggerGroup = document.createElement("label");
    triggerGroup.append(
      document.createElement("span"),
      createStoryboardOnboardingTriggerControls(state, event)
    );
    triggerGroup.querySelector("span").textContent = storyboardText.onboardingTriggerLabel || "When to show";

    const imageGroup = document.createElement("label");
    const imageLabel = document.createElement("span");
    imageLabel.textContent = storyboardText.onboardingImageLabel || "Image";
    imageGroup.append(imageLabel, createStoryboardOnboardingImageSelect(state, event));

    const showImage = document.createElement("label");
    showImage.className = "storyboard-onboarding-checkbox";
    const showImageInput = document.createElement("input");
    showImageInput.type = "checkbox";
    showImageInput.checked = event.showImage !== false;
    showImageInput.addEventListener("change", () => {
      event.showImage = showImageInput.checked;
      renderLessonStoryboard(state);
    });
    showImage.append(showImageInput, document.createTextNode(storyboardText.onboardingShowImage || "Show image"));

    controls.append(triggerGroup, imageGroup, showImage);

    const editor = document.createElement("textarea");
    editor.className = "storyboard-onboarding-textarea";
    editor.value = storyboardLocalizedText(textCard?.value, state.previewLanguage);
    editor.addEventListener("input", () => {
      if (!textCard) return;
      textCard.value = {
        ...(textCard.value || {}),
        [state.previewLanguage]: editor.value
      };
    });

    const preview = document.createElement("div");
    preview.className = "storyboard-onboarding-preview";
    const image = document.createElement("img");
    image.src = storyboardKeyAssetSrc(imageCard?.value || "key-wave.webp");
    image.alt = "";
    image.hidden = event.showImage === false;
    const imageId = document.createElement("span");
    imageId.className = "storyboard-image-id";
    imageId.textContent = storyboardImageId(imageCard?.value || "");
    preview.append(image, imageId);

    content.append(description, controls, editor, preview);

    panel.append(header, content);
    grid.append(panel);
  });

  onboardingMain.append(grid);
}

function renderStoryboardImageGallery(state, imageGallery) {
  if (!imageGallery) return;

  imageGallery.innerHTML = "";
  const groups = storyboardImageUsageGroups(state);
  const storyboardText = storyboardTextFor(state);

  groups.forEach(group => {
    const usedImages = storyboardKeyImages.filter(fileName => (group.usages.get(fileName) || []).length > 0);
    const section = document.createElement("section");
    section.className = "storyboard-gallery-section";

    const title = document.createElement("h2");
    title.className = "storyboard-gallery-section-title";
    title.textContent = group.title;

    const grid = document.createElement("div");
    grid.className = "storyboard-gallery-grid";

    if (!usedImages.length) {
      const empty = document.createElement("p");
      empty.className = "storyboard-gallery-empty";
      empty.textContent = storyboardText.imageGroupEmpty || storyboardText.imageUnused || "Not used";
      grid.append(empty);
    }

    usedImages.forEach(fileName => {
      const imageUsages = group.usages.get(fileName) || [];
      const card = document.createElement("article");
      card.className = "storyboard-gallery-card";

      const image = document.createElement("img");
      image.src = storyboardKeyAssetSrc(fileName);
      image.alt = "";
      image.addEventListener("dblclick", event => {
        event.preventDefault();
        openStoryboardImagePreview(fileName, storyboardKeyImages);
      });

      const count = document.createElement("span");
      count.className = "storyboard-gallery-count";
      count.tabIndex = 0;
      count.textContent = String(imageUsages.length);
      const tooltipText = imageUsages.join("\n");
      count.setAttribute("aria-label", tooltipText);
      count.addEventListener("mouseenter", () => showStoryboardFloatingTooltip(count, tooltipText));
      count.addEventListener("mouseleave", hideStoryboardFloatingTooltip);
      count.addEventListener("focus", () => showStoryboardFloatingTooltip(count, tooltipText));
      count.addEventListener("blur", hideStoryboardFloatingTooltip);

      const imageId = document.createElement("span");
      imageId.className = "storyboard-image-id storyboard-gallery-image-id";
      imageId.textContent = storyboardImageId(fileName);

      const name = document.createElement("div");
      name.className = "storyboard-gallery-name";
      name.textContent = fileName;

      card.append(image, count, imageId, name);
      grid.append(card);
    });

    section.append(title, grid);
    imageGallery.append(section);
  });
}

function updateStoryboardChrome(state, board) {
  const storyboardText = storyboardTextFor(state);
  const setText = (selector, text) => {
    const node = board.querySelector(selector);
    if (node) node.textContent = text || "";
  };

  setText("#storyboardTitle", storyboardText.title);
  setText("#storyboardFlowTab", storyboardText.flowTab || "Flow");
  setText("#storyboardOnboardingTab", storyboardText.onboardingTab || storyboardText.onboardingModule || "Onboarding");
  setText("#storyboardImagesTab", storyboardText.imagesTab || "Images");
  setText("#storyboardPreviewLabel", storyboardText.preview);
  setText("#storyboardApply", storyboardText.applyStoryboard || storyboardText.apply);
  setText("#storyboardBottomDraftTitle", storyboardText.bottomDraft);
  setText("#storyboardBottomDraftNote", storyboardText.bottomDraftNote);
  setText("#storyboardDraftTitle", storyboardText.draft);
  setText("#storyboardDraftNote", storyboardText.draftNote);
  setText("#storyboardApplyCommandLabel", storyboardText.applyCommandLabel);
  setText("#storyboardFooterHint", storyboardText.hint);

  const scaleControl = board.querySelector(".storyboard-scale-control");
  if (scaleControl) scaleControl.setAttribute("aria-label", storyboardText.imageZoom || "");

  const command = board.querySelector("#storyboardApplyCommand");
  if (command && !command.dataset.storyboardStatusTouched) {
    command.value = storyboardText.applyCommandPlaceholder || "";
  }

  const output = board.querySelector("#storyboardExportOutput");
  if (output) output.setAttribute("aria-label", storyboardText.jsonPreviewLabel || "");
}

function renderStoryboardParkingArea(state, parking, area) {
  if (!parking) return;

  const cardIds = storyboardParkingList(state, area);
  parking.innerHTML = "";
  if (!cardIds.length) {
    parking.append(createStoryboardEmptySlot(state));
    return;
  }

  cardIds.forEach((cardId, index) => {
    const card = storyboardCard(state, cardId);
    if (!card) return;
    const wrapper = document.createElement("div");
    wrapper.dataset.storyboardSource = "parking";
    wrapper.dataset.parkingArea = area;
    wrapper.dataset.parkingIndex = String(index);
    wrapper.append(createStoryboardCard(state, card));
    parking.append(wrapper);
  });
}

function setStoryboardLayoutSizeVars(board, state) {
  board.style.setProperty("--storyboard-side-width", `${state.sideParkingWidth || 340}px`);
  board.style.setProperty("--storyboard-bottom-height", `${state.bottomParkingHeight || 220}px`);
}

function clampStoryboardSize(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function wireStoryboardResizeHandle(state, board, handle, direction) {
  if (!handle) return;

  handle.addEventListener("pointerdown", event => {
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = state.sideParkingWidth || 340;
    const startHeight = state.bottomParkingHeight || 220;
    handle.setPointerCapture(event.pointerId);
    handle.classList.add("is-resizing");

    const resize = pointerEvent => {
      if (direction === "side") {
        const maxWidth = Math.max(280, Math.min(720, window.innerWidth - 520));
        state.sideParkingWidth = clampStoryboardSize(startWidth - (pointerEvent.clientX - startX), 260, maxWidth);
      } else {
        const maxHeight = Math.max(180, Math.min(560, window.innerHeight - 260));
        state.bottomParkingHeight = clampStoryboardSize(startHeight - (pointerEvent.clientY - startY), 140, maxHeight);
      }
      setStoryboardLayoutSizeVars(board, state);
    };

    const stopResize = pointerEvent => {
      handle.classList.remove("is-resizing");
      handle.releasePointerCapture(pointerEvent.pointerId);
      handle.removeEventListener("pointermove", resize);
    };

    handle.addEventListener("pointermove", resize);
    handle.addEventListener("pointerup", stopResize, { once: true });
    handle.addEventListener("pointercancel", stopResize, { once: true });
  });
}

function exportLessonStoryboard(state) {
  const lessonStoryboard = {};
  const appOnboardingStoryboard = { screens: [] };

  (state.onboardingEvents || []).forEach(event => {
    appOnboardingStoryboard.screens.push({
      id: event.id,
      number: event.number,
      title: event.title,
      trigger: {
        type: event.triggerType || "firstLaunch",
        lessonId: event.triggerLessonId || null
      },
      image: storyboardCard(state, event.imageCardId)?.value || null,
      text: storyboardCard(state, event.textCardId)?.value || null,
      visible: event.visible !== false,
      showImage: event.showImage !== false
    });
  });

  state.lessons.forEach(lesson => {
    const assignment = state.assignments[lesson.id] || {};
    const visibility = state.visibility[lesson.id] || {};

    lessonStoryboard[lesson.id] = {
      moduleId: lesson.moduleId,
      moduleTitle: lesson.moduleTitle,
      lessonId: lesson.id,
      lessonTitle: lesson.lessonTitle,
      number: lesson.number,
      introImage: storyboardCard(state, assignment.introImage)?.value || null,
      introTip: storyboardCard(state, assignment.introTip)?.value || null,
      nextModuleText: storyboardCard(state, assignment.nextModuleText)?.value || null,
      completionImage: storyboardCard(state, assignment.completionImage)?.value || null,
      completionText: storyboardCard(state, assignment.completionText)?.value || null,
      showIntroImage: visibility.showIntroImage !== false,
      showIntroTip: visibility.showIntroTip !== false,
      showNextModuleText: visibility.showNextModuleText !== false,
      showCompletionImage: visibility.showCompletionImage !== false,
      showCompletionText: visibility.showCompletionText !== false
    };
  });

  const serializeParking = cardIds => cardIds
    .map(cardId => storyboardCard(state, cardId))
    .filter(Boolean)
    .map(card => ({
      type: card.type,
      value: card.value,
      origin: card.origin
    }));

  return {
    welcomeStoryboard: welcomeStoryboard(),
    appOnboardingStoryboard,
    lessonStoryboard,
    parkingLot: serializeParking(state.parking),
    bottomParkingLot: serializeParking(state.bottomParking)
  };
}

function setStoryboardApplyStatus(board, message) {
  const status = board.querySelector("#storyboardApplyCommand");
  if (!status) return;

  status.dataset.storyboardStatusTouched = "true";
  status.value = message || "";
}

async function applyLessonStoryboard(state, board) {
  const storyboardText = storyboardTextFor(state);
  const button = board.querySelector("#storyboardApply");
  const output = board.querySelector("#storyboardExportOutput");
  const payload = exportLessonStoryboard(state);
  const preview = JSON.stringify(payload, null, 2);

  if (button) button.disabled = true;
  setStoryboardApplyStatus(board, storyboardText.applying);
  if (output) {
    output.value = preview;
    output.textContent = preview;
  }

  try {
    const response = await fetch("/api/storyboard/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.status !== "ok") {
      throw new Error(result.output || result.message || storyboardText.applyFailed);
    }

    setStoryboardApplyStatus(board, storyboardText.applied);
    if (output) {
      output.value = result.output || storyboardText.applied;
      output.textContent = output.value;
    }
  } catch (error) {
    setStoryboardApplyStatus(board, storyboardText.applyFailed);
    if (output) {
      output.value = error?.message || String(error);
      output.textContent = output.value;
    }
  } finally {
    if (button) button.disabled = false;
  }
}

function initializeLessonStoryboardMode() {
  if (!isLessonStoryboardModeEnabled()) return false;

  document.documentElement.classList.add("storyboard-mode");
  const storyboardText = textFor().storyboard;

  const board = document.createElement("section");
  board.className = "storyboard-board";
  board.id = "lessonStoryboardBoard";
  board.innerHTML = `
    <header class="storyboard-topbar">
      <h1 class="storyboard-title" id="storyboardTitle">${storyboardText.title}</h1>
      <div class="storyboard-tabs" role="tablist" aria-label="${storyboardText.title}">
        <button class="storyboard-tab active" id="storyboardFlowTab" type="button" role="tab" aria-selected="true">${storyboardText.flowTab || "Flow"}</button>
        <button class="storyboard-tab" id="storyboardOnboardingTab" type="button" role="tab" aria-selected="false">${storyboardText.onboardingTab || storyboardText.onboardingModule || "Onboarding"}</button>
        <button class="storyboard-tab" id="storyboardImagesTab" type="button" role="tab" aria-selected="false">${storyboardText.imagesTab || "Images"}</button>
      </div>
      <button class="storyboard-prod-button" id="storyboardProdButton" type="button">Prod</button>
      <button class="storyboard-prod-button" id="storyboardNewProdButton" type="button">New Prod</button>
      <div class="storyboard-controls">
        <label>
          <span id="storyboardPreviewLabel">${storyboardText.preview}</span>
          <select class="storyboard-select" id="storyboardLanguage"></select>
        </label>
        <div class="storyboard-scale-control" aria-label="${storyboardText.imageZoom}">
          <button class="storyboard-button storyboard-scale-button" id="storyboardImageZoomOut" type="button">-</button>
          <span class="storyboard-scale-value" id="storyboardImageScaleValue">100%</span>
          <button class="storyboard-button storyboard-scale-button" id="storyboardImageZoomIn" type="button">+</button>
        </div>
        <button class="storyboard-button storyboard-apply-button" id="storyboardApply" type="button">${storyboardText.applyStoryboard || storyboardText.apply}</button>
      </div>
    </header>
    <main class="storyboard-main" id="storyboardFlowMain">
      <div class="storyboard-workspace">
        <div class="storyboard-table-wrap">
          <div class="storyboard-table" id="storyboardTable"></div>
        </div>
        <section class="storyboard-bottom-panel">
          <section class="storyboard-side-section">
            <h2 class="storyboard-side-title" id="storyboardBottomDraftTitle">${storyboardText.bottomDraft}</h2>
            <p class="storyboard-side-note" id="storyboardBottomDraftNote">${storyboardText.bottomDraftNote}</p>
            <div class="storyboard-parking storyboard-parking-bottom" id="storyboardBottomParking"></div>
          </section>
        </section>
      </div>
      <aside class="storyboard-side">
        <section class="storyboard-side-section">
          <h2 class="storyboard-side-title" id="storyboardDraftTitle">${storyboardText.draft}</h2>
          <p class="storyboard-side-note" id="storyboardDraftNote">${storyboardText.draftNote}</p>
          <div class="storyboard-parking" id="storyboardParking"></div>
        </section>
      </aside>
    </main>
    <main class="storyboard-onboarding-main" id="storyboardOnboardingMain" hidden></main>
    <main class="storyboard-gallery" id="storyboardImageGallery" hidden></main>
    <footer class="storyboard-footer">
      <div class="storyboard-export-panel">
        <label class="storyboard-command-label" id="storyboardApplyCommandLabel" for="storyboardApplyCommand">${storyboardText.applyCommandLabel}</label>
        <input class="storyboard-apply-command" id="storyboardApplyCommand" type="text" readonly value="${storyboardText.applyCommandPlaceholder}">
      </div>
      <textarea class="storyboard-export-output" id="storyboardExportOutput" readonly aria-label="${storyboardText.jsonPreviewLabel}"></textarea>
      <span id="storyboardFooterHint">${storyboardText.hint}</span>
    </footer>
  `;
  document.body.append(board);

  const state = createStoryboardInitialState();
  wireStoryboardDropTarget(board.querySelector("#storyboardParking"), () => moveStoryboardCardToParking(state, "side"));
  wireStoryboardDropTarget(board.querySelector("#storyboardBottomParking"), () => moveStoryboardCardToParking(state, "bottom"));
  board.querySelector("#storyboardFlowTab").addEventListener("click", () => setStoryboardView(state, "flow"));
  board.querySelector("#storyboardOnboardingTab").addEventListener("click", () => setStoryboardView(state, "onboarding"));
  board.querySelector("#storyboardImagesTab").addEventListener("click", () => setStoryboardView(state, "images"));
  board.querySelector("#storyboardProdButton").addEventListener("click", () => {
    window.open(`/?previewWelcome=1&v=${Date.now()}`, "_blank", "noopener");
  });
  board.querySelector("#storyboardNewProdButton").addEventListener("click", () => {
    window.open(`/?freshUser=1&previewWelcome=1&v=${Date.now()}`, "_blank", "noopener");
  });

  board.querySelector("#storyboardLanguage").addEventListener("change", event => {
    state.previewLanguage = event.target.value;
    renderLessonStoryboard(state);
  });
  board.querySelector("#storyboardImageZoomOut").addEventListener("click", () => {
    setStoryboardImageScale(state, (state.imageScale || 1) - 0.15);
  });
  board.querySelector("#storyboardImageZoomIn").addEventListener("click", () => {
    setStoryboardImageScale(state, (state.imageScale || 1) + 0.15);
  });
  board.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeStoryboardImagePreview();
    }
  });

  board.querySelector("#storyboardApply").addEventListener("click", () => {
    applyLessonStoryboard(state, board);
  });

  renderLessonStoryboard(state);
  document.documentElement.dataset.appReady = "true";
  return true;
}
