function isLessonStoryboardModeEnabled() {
  return new URLSearchParams(window.location.search).has("lessonStoryboard");
}

const storyboardKeyImages = [
  "1.webp",
  "fly_welcome_no_bg.webp",
  "key-arms-crossed.webp",
  "key-book.webp",
  "key-completion.webp",
  "key-confident.webp",
  "key-explain.webp",
  "key-idea-front.webp",
  "key-idea-open.webp",
  "key-idea-small.webp",
  "key-idea.webp",
  "key-onboarding.webp",
  "key-open-soft.webp",
  "key-please.webp",
  "key-point-strict.webp",
  "key-salute.webp",
  "key-shrug.webp",
  "key-stop.webp",
  "key-thinking.webp",
  "key-thumb.webp",
  "key-wave.webp"
];

const storyboardDefaultCompletionText = {
  ru: "Отлично. Молодец. Идём дальше.",
  uk: "Чудово. Гарна робота. Рухаємося далі.",
  kk: "Керемет. Жақсы жұмыс. Әрі қарай өтейік.",
  de: "Ausgezeichnet. Gut gemacht. Weiter geht's.",
  en: "Excellent. Well done. Let's keep going."
};

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
    const image = document.createElement("img");
    image.src = `assets/key/${card.value}`;
    image.alt = "";
    const name = document.createElement("div");
    name.className = "storyboard-image-name";
    name.textContent = card.value;
    node.append(image, name);
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
      parkingIndex: node.closest("[data-parking-index]")?.dataset.parkingIndex || ""
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

function removeStoryboardCardFromSource(state, drag) {
  if (drag.from === "slot" && drag.slotId) {
    const [lessonId, slotName] = drag.slotId.split(":");
    if (state.assignments[lessonId]?.[slotName] === drag.cardId) {
      state.assignments[lessonId][slotName] = null;
    }
  }

  if (drag.from === "parking" && drag.parkingIndex !== "") {
    state.parking.splice(Number(drag.parkingIndex), 1);
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

function moveStoryboardCardToParking(state) {
  if (!state.drag) return;

  const sourceCard = storyboardCard(state, state.drag.cardId);
  if (!sourceCard) return;

  const movingCardId = state.drag.from === "bank"
    ? cloneStoryboardBankCard(state, sourceCard, "introImage")
    : sourceCard.id;

  removeStoryboardCardFromSource(state, state.drag);
  if (!state.parking.includes(movingCardId)) {
    state.parking.push(movingCardId);
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
  const source = window.PRACTICE_CONTENT_SOURCE || {};
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
      const introImage = (typeof lessonTipAvatarSrcFor === "function" ? lessonTipAvatarSrcFor(lesson) : "assets/key/key-wave.webp").replace("assets/key/", "");
      const introTip = storyboardLocalizedMap(lesson.tips, sourceLanguages);
      const nextModuleText = storyboardLocalizedMap(storyboardLessonIntroPurpose(lesson), sourceLanguages);
      const completionImage = (typeof lessonCompletionAvatarSrcFor === "function" ? lessonCompletionAvatarSrcFor(lesson) : "assets/key/key-completion.webp").replace("assets/key/", "");
      const completionText = storyboardLocalizedMap(lesson.completion, sourceLanguages, storyboardDefaultCompletionText);

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
    nextCardId,
    parking: [],
    previewLanguage: currentLanguage || sourceLanguages[0] || "en"
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
  const imageBank = board.querySelector("#storyboardImageBank");
  const languageSelect = board.querySelector("#storyboardLanguage");

  languageSelect.innerHTML = "";
  state.languages.forEach(language => {
    const option = document.createElement("option");
    option.value = language;
    option.textContent = languages[language]?.name || language.toUpperCase();
    option.selected = language === state.previewLanguage;
    languageSelect.append(option);
  });

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

  parking.innerHTML = "";
  if (!state.parking.length) {
    parking.append(createStoryboardEmptySlot());
  } else {
    state.parking.forEach((cardId, index) => {
      const card = storyboardCard(state, cardId);
      if (!card) return;
      const wrapper = document.createElement("div");
      wrapper.dataset.storyboardSource = "parking";
      wrapper.dataset.parkingIndex = String(index);
      wrapper.append(createStoryboardCard(state, card));
      parking.append(wrapper);
    });
  }

  imageBank.innerHTML = "";
  state.imageBank.forEach(cardId => {
    const card = storyboardCard(state, cardId);
    const wrapper = document.createElement("div");
    wrapper.className = "storyboard-bank-card";
    wrapper.dataset.storyboardSource = "bank";
    wrapper.append(createStoryboardCard(state, card));
    imageBank.append(wrapper);
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

  const parkingLot = state.parking
    .map(cardId => storyboardCard(state, cardId))
    .filter(Boolean)
    .map(card => ({
      type: card.type,
      value: card.value,
      origin: card.origin
    }));

  return { lessonStoryboard, parkingLot };
}

function initializeLessonStoryboardMode() {
  if (!isLessonStoryboardModeEnabled()) return false;

  document.documentElement.classList.add("storyboard-mode");

  const board = document.createElement("section");
  board.className = "storyboard-board";
  board.id = "lessonStoryboardBoard";
  board.innerHTML = `
    <header class="storyboard-topbar">
      <h1 class="storyboard-title">Lesson storyboard</h1>
      <div class="storyboard-controls">
        <label>
          Preview
          <select class="storyboard-select" id="storyboardLanguage"></select>
        </label>
        <button class="storyboard-button" id="storyboardExport" type="button">Export JSON</button>
      </div>
    </header>
    <main class="storyboard-main">
      <div class="storyboard-table-wrap">
        <div class="storyboard-table" id="storyboardTable"></div>
      </div>
      <aside class="storyboard-side">
        <section class="storyboard-side-section">
          <h2 class="storyboard-side-title">Parking</h2>
          <div class="storyboard-parking" id="storyboardParking"></div>
        </section>
        <section class="storyboard-side-section">
          <h2 class="storyboard-side-title">Image bank</h2>
          <div class="storyboard-image-bank" id="storyboardImageBank"></div>
        </section>
      </aside>
    </main>
    <footer class="storyboard-footer">
      <textarea class="storyboard-export-output" id="storyboardExportOutput" readonly aria-label="Storyboard JSON"></textarea>
      <span>Drag cards between slots. Dropped-out cards stay in Parking.</span>
    </footer>
  `;
  document.body.append(board);

  const state = createStoryboardInitialState();
  wireStoryboardDropTarget(board.querySelector("#storyboardParking"), () => moveStoryboardCardToParking(state));

  board.querySelector("#storyboardLanguage").addEventListener("change", event => {
    state.previewLanguage = event.target.value;
    renderLessonStoryboard(state);
  });

  board.querySelector("#storyboardExport").addEventListener("click", () => {
    const output = board.querySelector("#storyboardExportOutput");
    output.value = JSON.stringify(exportLessonStoryboard(state), null, 2);
    output.textContent = output.value;
    output.focus();
    output.select();
  });

  renderLessonStoryboard(state);
  document.documentElement.dataset.appReady = "true";
  return true;
}
