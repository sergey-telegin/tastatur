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
  state.activeView = view === "images" ? "images" : "flow";
  renderLessonStoryboard(state);
}

function storyboardImageScalePercent(state) {
  return `${Math.round((state.imageScale || 1) * 100)}%`;
}

function setStoryboardImageScale(state, scale) {
  state.imageScale = Math.min(2.6, Math.max(0.55, scale));
  renderLessonStoryboard(state);
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

    if (!lesson.isOnboarding && storyboardSlotVisible(state, lesson.id, "completionImage")) {
      addUsage(
        storyboardCard(state, assignment.completionImage)?.value,
        `${storyboardCardLabel("completionImage", state.previewLanguage)}: ${lessonLabel}`
      );
    }
  });

  return usages;
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
  let nextCardId = 1;
  const lessons = [];

  function addCard(type, value, origin) {
    const id = `card-${nextCardId++}`;
    cards[id] = { id, type, value, origin };
    return id;
  }

  const onboardingScreens = Array.isArray(onboardingStoryboard().screens)
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

  onboardingScreens.forEach((screen, index) => {
    const id = screen.id || `onboarding_${index + 1}`;
    const number = `0.${index + 1}`;
    const title = Object.fromEntries(sourceLanguages.map(language => [
      language,
      `${textFor(language).storyboard?.onboardingLabel || "Welcome"} ${index + 1}`
    ]));
    lessons.push({
      id,
      moduleId: "onboarding",
      number,
      moduleTitle: Object.fromEntries(sourceLanguages.map(language => [
        language,
        textFor(language).storyboard?.onboardingModule || "Welcome"
      ])),
      lessonTitle: title,
      isOnboarding: true
    });
    assignments[id] = {
      introImage: addCard("introImage", screen.image || "fly_welcome_no_bg.png", number),
      introTip: addCard("introTip", storyboardLocalizedMap(screen.text || {}, sourceLanguages), number),
      nextModuleText: null,
      completionImage: null,
      completionText: null
    };
    visibility[id] = {
      showIntroImage: screen.showImage !== false && Boolean(screen.image),
      showIntroTip: screen.visible !== false,
      showNextModuleText: false,
      showCompletionImage: false,
      showCompletionText: false
    };
  });

  (source.modules || []).forEach((module, moduleIndex) => {
    (module.lessons || []).forEach((lesson, lessonIndex) => {
      const number = `${moduleIndex + 1}.${lessonIndex + 1}`;
      const moduleTitle = storyboardLocalizedMap(module.title, sourceLanguages);
      const lessonTitle = storyboardLocalizedMap(lesson.title, sourceLanguages);
      const storyboardEntry = lessonStoryboardFor(lesson);
      const introImage = storyboardEntry.introImage || "key-wave.webp";
      const introTip = storyboardLocalizedMap(lesson.tips, sourceLanguages);
      const nextModuleText = storyboardLocalizedMap(storyboardLessonIntroPurpose(lesson), sourceLanguages);
      const completionImage = storyboardEntry.completionImage || "key-completion.webp";
      const completionText = storyboardLocalizedMap(storyboardEntry.completionText || lesson.completion, sourceLanguages, Object.fromEntries(
        sourceLanguages.map(language => [language, textFor(language).defaultCompletion])
      ));

      lessons.push({
        id: lesson.id,
        moduleId: module.id,
        number,
        moduleTitle,
        lessonTitle
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
    visibility,
    activeView: "flow",
    imageScale: 1,
    nextCardId,
    bottomParking: [],
    bottomParkingHeight: 220,
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

function createStoryboardSystemRating(state) {
  const rating = document.createElement("section");
  rating.className = "storyboard-scene-part storyboard-scene-rating";

  const title = document.createElement("h3");
  title.className = "storyboard-scene-part-title";
  title.textContent = storyboardTextFor(state).systemRating || "System rating";

  const stars = document.createElement("div");
  stars.className = "storyboard-system-stars";
  stars.textContent = "★★★★★";

  rating.append(title, stars);
  return rating;
}

function createStoryboardSceneCell(state, lesson) {
  const storyboardText = storyboardTextFor(state);
  const labels = storyboardText.cardLabels || {};
  const scene = document.createElement("div");
  scene.className = `storyboard-scene-cell storyboard-${lesson.isOnboarding ? "onboarding" : "lesson"}-scene`;

  renderStoryboardScenePart(state, scene, lesson.id, "nextModuleText", labels.nextModuleText || "Description");
  renderStoryboardScenePart(state, scene, lesson.id, "introImage", labels.introImage || "Start image");
  renderStoryboardScenePart(state, scene, lesson.id, "introTip", labels.introTip || "Tip");
  return scene;
}

function createStoryboardCompletionCell(state, lesson) {
  const storyboardText = storyboardTextFor(state);
  const labels = storyboardText.cardLabels || {};
  const scene = document.createElement("div");
  scene.className = "storyboard-scene-cell storyboard-completion-scene";

  if (lesson.isOnboarding) {
    const empty = document.createElement("div");
    empty.className = "storyboard-scene-muted";
    empty.textContent = storyboardText.notUsedInOnboarding || "";
    scene.append(empty);
    return scene;
  }

  renderStoryboardScenePart(state, scene, lesson.id, "completionImage", labels.completionImage || "Completion image");
  scene.append(createStoryboardSystemRating(state));
  renderStoryboardScenePart(state, scene, lesson.id, "completionText", labels.completionText || "Comment");
  return scene;
}

function renderLessonStoryboard(state) {
  const board = document.querySelector("#lessonStoryboardBoard");
  if (!board) return;

  updateStoryboardChrome(state, board);

  const table = board.querySelector("#storyboardTable");
  const flowMain = board.querySelector("#storyboardFlowMain");
  const imageGallery = board.querySelector("#storyboardImageGallery");
  const flowTab = board.querySelector("#storyboardFlowTab");
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
  board.dataset.storyboardView = state.activeView || "flow";
  flowMain.hidden = state.activeView === "images";
  imageGallery.hidden = state.activeView !== "images";
  flowTab.classList.toggle("active", state.activeView !== "images");
  imagesTab.classList.toggle("active", state.activeView === "images");
  flowTab.setAttribute("aria-selected", String(state.activeView !== "images"));
  imagesTab.setAttribute("aria-selected", String(state.activeView === "images"));

  table.innerHTML = "";
  const header = document.createElement("div");
  header.className = "storyboard-row storyboard-header";
  const storyboardText = storyboardTextFor(state);
  (storyboardText.tableHeaders || ["№", "Lesson", "Start", "End"]).forEach(label => {
    const cell = document.createElement("div");
    cell.textContent = label;
    header.append(cell);
  });
  table.append(header);

  state.lessons.forEach(lesson => {
    const row = document.createElement("div");
    row.className = `storyboard-row ${lesson.isOnboarding ? "storyboard-onboarding-row" : ""}`;

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

    row.append(number, lessonCell);
    row.append(createStoryboardSceneCell(state, lesson), createStoryboardCompletionCell(state, lesson));
    table.append(row);
  });

  renderStoryboardParkingArea(state, parking, "side");
  renderStoryboardParkingArea(state, bottomParking, "bottom");
  renderStoryboardImageGallery(state, imageGallery);

}

function renderStoryboardImageGallery(state, imageGallery) {
  if (!imageGallery) return;

  const usages = storyboardImageUsages(state);
  imageGallery.innerHTML = "";
  storyboardKeyImages.forEach(fileName => {
    const imageUsages = usages.get(fileName) || [];
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
    const tooltipText = imageUsages.length
      ? imageUsages.join("\n")
      : storyboardTextFor(state).imageUnused || "Not used";
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
    imageGallery.append(card);
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
  const onboardingStoryboard = { screens: [] };
  state.lessons.forEach(lesson => {
    const assignment = state.assignments[lesson.id] || {};
    const visibility = state.visibility[lesson.id] || {};
    if (lesson.isOnboarding) {
      onboardingStoryboard.screens.push({
        id: lesson.id,
        number: lesson.number,
        image: storyboardCard(state, assignment.introImage)?.value || null,
        text: storyboardCard(state, assignment.introTip)?.value || null,
        visible: visibility.showIntroTip !== false,
        showImage: visibility.showIntroImage !== false
      });
      return;
    }

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
    onboardingStoryboard,
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
        <button class="storyboard-tab" id="storyboardImagesTab" type="button" role="tab" aria-selected="false">${storyboardText.imagesTab || "Images"}</button>
      </div>
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
        <div class="storyboard-resize-handle storyboard-resize-handle-bottom" id="storyboardBottomResize" role="separator" aria-label="${storyboardText.resizeBottomDraft}" aria-orientation="horizontal" tabindex="0"></div>
        <section class="storyboard-bottom-panel">
          <section class="storyboard-side-section">
            <h2 class="storyboard-side-title" id="storyboardBottomDraftTitle">${storyboardText.bottomDraft}</h2>
            <p class="storyboard-side-note" id="storyboardBottomDraftNote">${storyboardText.bottomDraftNote}</p>
            <div class="storyboard-parking storyboard-parking-bottom" id="storyboardBottomParking"></div>
          </section>
        </section>
      </div>
      <div class="storyboard-resize-handle storyboard-resize-handle-side" id="storyboardSideResize" role="separator" aria-label="${storyboardText.resizeSideDraft}" aria-orientation="vertical" tabindex="0"></div>
      <aside class="storyboard-side">
        <section class="storyboard-side-section">
          <h2 class="storyboard-side-title" id="storyboardDraftTitle">${storyboardText.draft}</h2>
          <p class="storyboard-side-note" id="storyboardDraftNote">${storyboardText.draftNote}</p>
          <div class="storyboard-parking" id="storyboardParking"></div>
        </section>
      </aside>
    </main>
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
  wireStoryboardResizeHandle(state, board, board.querySelector("#storyboardSideResize"), "side");
  wireStoryboardResizeHandle(state, board, board.querySelector("#storyboardBottomResize"), "bottom");
  board.querySelector("#storyboardFlowTab").addEventListener("click", () => setStoryboardView(state, "flow"));
  board.querySelector("#storyboardImagesTab").addEventListener("click", () => setStoryboardView(state, "images"));

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
