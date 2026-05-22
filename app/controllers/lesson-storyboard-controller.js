function isLessonStoryboardModeEnabled() {
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

function storyboardKeyAssetSrc(fileName) {
  return typeof keyAssetSrc === "function" ? keyAssetSrc(fileName) : "assets/key/" + fileName;
}

function storyboardImageFileNameFromSrc(src) {
  return String(src || "").replace("assets/key/", "").split("?")[0];
}

function storyboardLocalizedText(value, language) {
  if (Array.isArray(value)) return value.filter(Boolean).join("\n");
  if (!value || typeof value !== "object") return value || "";
  const localized = value[language] || value.en || value.ru || Object.values(value)[0] || "";
  return storyboardLocalizedText(localized, language);
}

function storyboardLocalizedMap(value, languages, fallback = {}) {
  return Object.fromEntries(languages.map(language => [
    language,
    value && typeof value === "object" && !Array.isArray(value)
      ? storyboardLocalizedText(value[language] || value.en || value.ru, language) || storyboardLocalizedText(fallback, language)
      : storyboardLocalizedText(value, language) || storyboardLocalizedText(fallback, language)
  ]));
}

function storyboardLessonIntroPurpose(lesson) {
  if (lesson?.intro) return lesson.intro;
  if (typeof lessonIntroPurpose !== "undefined") return lessonIntroPurpose[lesson.id] || {};
  return {};
}

function storyboardCardLabel(type) {
  return {
    introImage: "Intro image",
    introTip: "Intro tip",
    nextModuleText: "Next module text",
    completionImage: "Completion image",
    completionText: "Completion text",
    imageBank: "Image"
  }[type] || type;
}

function storyboardCardCategory(type) {
  return type.includes("Image") || type === "imageBank" ? "image" : "text";
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

function createStoryboardCard(state, card) {
  const node = document.createElement("article");
  node.className = `storyboard-card ${storyboardCardCategory(card.type) === "image" ? "storyboard-image-card" : ""}`;
  node.draggable = true;
  node.dataset.cardId = card.id;
  node.dataset.cardType = card.type;
  node.innerHTML = "";

  const title = document.createElement("div");
  title.className = "storyboard-card-title";
  const typeLabel = document.createElement("span");
  typeLabel.textContent = storyboardCardLabel(card.type);
  const origin = document.createElement("span");
  origin.className = "storyboard-card-origin";
  origin.textContent = card.origin || "";
  title.append(typeLabel, origin);
  node.append(title);

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
    const name = document.createElement("div");
    name.className = "storyboard-image-name";
    name.textContent = card.value;
    node.append(imageStage, name);
  } else {
    const editor = document.createElement("textarea");
    editor.className = "storyboard-text-editor";
    editor.value = storyboardLocalizedText(card.value, state.previewLanguage);
    editor.setAttribute("aria-label", storyboardCardLabel(card.type));
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

function createStoryboardEmptySlot() {
  const node = document.createElement("div");
  node.className = "storyboard-empty";
  node.textContent = "Drop card";
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
  let nextCardId = 1;
  const lessons = [];

  function addCard(type, value, origin) {
    const id = `card-${nextCardId++}`;
    cards[id] = { id, type, value, origin };
    return id;
  }

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
    imageScale: 1,
    nextCardId,
    bottomParking: [],
    bottomParkingHeight: 220,
    parking: [],
    previewLanguage: currentLanguage || sourceLanguages[0] || "en",
    sideParkingWidth: 340
  };
}

function renderStoryboardSlot(state, row, lessonId, slotName) {
  const slot = document.createElement("div");
  slot.className = "storyboard-slot";
  slot.dataset.storyboardSource = "slot";
  slot.dataset.slotId = storyboardSlotKey(lessonId, slotName);
  const cardId = state.assignments[lessonId]?.[slotName];
  const card = storyboardCard(state, cardId);
  slot.append(card ? createStoryboardCard(state, card) : createStoryboardEmptySlot());
  wireStoryboardDropTarget(slot, () => moveStoryboardCardToSlot(state, lessonId, slotName));
  row.append(slot);
}

function renderLessonStoryboard(state) {
  const board = document.querySelector("#lessonStoryboardBoard");
  if (!board) return;

  const table = board.querySelector("#storyboardTable");
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

  table.innerHTML = "";
  const header = document.createElement("div");
  header.className = "storyboard-row storyboard-header";
  ["№", "Lesson", "Intro image", "Intro tip", "Next module text", "Completion image", "Completion text"].forEach(label => {
    const cell = document.createElement("div");
    cell.textContent = label;
    header.append(cell);
  });
  table.append(header);

  state.lessons.forEach(lesson => {
    const row = document.createElement("div");
    row.className = "storyboard-row";

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
    renderStoryboardSlot(state, row, lesson.id, "introImage");
    renderStoryboardSlot(state, row, lesson.id, "introTip");
    renderStoryboardSlot(state, row, lesson.id, "nextModuleText");
    renderStoryboardSlot(state, row, lesson.id, "completionImage");
    renderStoryboardSlot(state, row, lesson.id, "completionText");
    table.append(row);
  });

  renderStoryboardParkingArea(state, parking, "side");
  renderStoryboardParkingArea(state, bottomParking, "bottom");

}

function renderStoryboardParkingArea(state, parking, area) {
  if (!parking) return;

  const cardIds = storyboardParkingList(state, area);
  parking.innerHTML = "";
  if (!cardIds.length) {
    parking.append(createStoryboardEmptySlot());
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
  state.lessons.forEach(lesson => {
    const assignment = state.assignments[lesson.id] || {};
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
      completionText: storyboardCard(state, assignment.completionText)?.value || null
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
    lessonStoryboard,
    parkingLot: serializeParking(state.parking),
    bottomParkingLot: serializeParking(state.bottomParking)
  };
}

function storyboardExportFileName() {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-");
  const time = [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0")
  ].join("-");
  return `flykey-roadmap-${date}-${time}.json`;
}

function downloadLessonStoryboardJson(state) {
  const fileName = storyboardExportFileName();
  const data = JSON.stringify(exportLessonStoryboard(state), null, 2);
  const blob = new Blob([data], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return { data, fileName };
}

function storyboardApplyCommandFor(fileName) {
  return `npm run storyboard:apply -- ~/Downloads/${fileName}`;
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
      <h1 class="storyboard-title">${storyboardText.title}</h1>
      <div class="storyboard-controls">
        <label>
          Preview
          <select class="storyboard-select" id="storyboardLanguage"></select>
        </label>
        <div class="storyboard-scale-control" aria-label="Image zoom">
          <button class="storyboard-button storyboard-scale-button" id="storyboardImageZoomOut" type="button">-</button>
          <span class="storyboard-scale-value" id="storyboardImageScaleValue">100%</span>
          <button class="storyboard-button storyboard-scale-button" id="storyboardImageZoomIn" type="button">+</button>
        </div>
        <button class="storyboard-button storyboard-apply-button" id="storyboardApply" type="button">${storyboardText.downloadJson}</button>
      </div>
    </header>
    <main class="storyboard-main">
      <div class="storyboard-workspace">
        <div class="storyboard-table-wrap">
          <div class="storyboard-table" id="storyboardTable"></div>
        </div>
        <div class="storyboard-resize-handle storyboard-resize-handle-bottom" id="storyboardBottomResize" role="separator" aria-label="${storyboardText.resizeBottomDraft}" aria-orientation="horizontal" tabindex="0"></div>
        <section class="storyboard-bottom-panel">
          <section class="storyboard-side-section">
            <h2 class="storyboard-side-title">${storyboardText.bottomDraft}</h2>
            <p class="storyboard-side-note">${storyboardText.bottomDraftNote}</p>
            <div class="storyboard-parking storyboard-parking-bottom" id="storyboardBottomParking"></div>
          </section>
        </section>
      </div>
      <div class="storyboard-resize-handle storyboard-resize-handle-side" id="storyboardSideResize" role="separator" aria-label="${storyboardText.resizeSideDraft}" aria-orientation="vertical" tabindex="0"></div>
      <aside class="storyboard-side">
        <section class="storyboard-side-section">
          <h2 class="storyboard-side-title">${storyboardText.draft}</h2>
          <p class="storyboard-side-note">${storyboardText.draftNote}</p>
          <div class="storyboard-parking" id="storyboardParking"></div>
        </section>
      </aside>
    </main>
    <footer class="storyboard-footer">
      <div class="storyboard-export-panel">
        <label class="storyboard-command-label" for="storyboardApplyCommand">${storyboardText.applyCommandLabel}</label>
        <input class="storyboard-apply-command" id="storyboardApplyCommand" type="text" readonly value="${storyboardText.applyCommandPlaceholder}">
      </div>
      <textarea class="storyboard-export-output" id="storyboardExportOutput" readonly aria-label="${storyboardText.jsonPreviewLabel}"></textarea>
      <span>${storyboardText.hint}</span>
    </footer>
  `;
  document.body.append(board);

  const state = createStoryboardInitialState();
  wireStoryboardDropTarget(board.querySelector("#storyboardParking"), () => moveStoryboardCardToParking(state, "side"));
  wireStoryboardDropTarget(board.querySelector("#storyboardBottomParking"), () => moveStoryboardCardToParking(state, "bottom"));
  wireStoryboardResizeHandle(state, board, board.querySelector("#storyboardSideResize"), "side");
  wireStoryboardResizeHandle(state, board, board.querySelector("#storyboardBottomResize"), "bottom");

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
    const { data, fileName } = downloadLessonStoryboardJson(state);
    const output = board.querySelector("#storyboardExportOutput");
    const command = board.querySelector("#storyboardApplyCommand");
    output.value = data;
    output.textContent = data;
    command.value = storyboardApplyCommandFor(fileName);
    command.focus();
    command.select();
  });

  renderLessonStoryboard(state);
  document.documentElement.dataset.appReady = "true";
  return true;
}
