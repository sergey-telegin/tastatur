const randomTextSources = {
  ru: [
    "https://ru.wikipedia.org/w/api.php",
    "https://ru.wikinews.org/w/api.php",
    "https://ru.wikibooks.org/w/api.php",
    "https://ru.wikisource.org/w/api.php",
    "https://ru.wikiquote.org/w/api.php"
  ],
  uk: [
    "https://uk.wikipedia.org/w/api.php",
    "https://uk.wikinews.org/w/api.php",
    "https://uk.wikibooks.org/w/api.php",
    "https://uk.wikisource.org/w/api.php",
    "https://uk.wikiquote.org/w/api.php"
  ],
  kk: [
    "https://kk.wikipedia.org/w/api.php",
    "https://kk.wikibooks.org/w/api.php",
    "https://kk.wikiquote.org/w/api.php"
  ],
  de: [
    "https://de.wikipedia.org/w/api.php",
    "https://de.wikinews.org/w/api.php",
    "https://de.wikibooks.org/w/api.php",
    "https://de.wikisource.org/w/api.php",
    "https://de.wikiquote.org/w/api.php"
  ],
  en: [
    "https://en.wikipedia.org/w/api.php",
    "https://en.wikinews.org/w/api.php",
    "https://en.wikibooks.org/w/api.php",
    "https://en.wikisource.org/w/api.php",
    "https://en.wikiquote.org/w/api.php"
  ]
};

function customPracticeModule(moduleId = customPracticeDraftModuleId) {
  return practiceModulesFor(currentLanguage)[moduleId] || null;
}

function normalizeCustomPracticeText(text) {
  return String(text || "")
    .replace(/[“”„«»]/g, "\"")
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function supportedPracticeCharacters(language = currentLanguage) {
  const supported = new Set([" "]);
  const labels = labelsFor(language);

  geometry.forEach(([keyId]) => {
    extractPrintableKeySymbols(labels[keyId] ?? "").forEach(symbol => {
      supported.add(symbol);
      supported.add(symbol.toLowerCase());
      supported.add(symbol.toUpperCase());
    });
  });

  return supported;
}

function removeUnsupportedPracticeCharacters(text, language = currentLanguage) {
  const supported = supportedPracticeCharacters(language);
  return [...normalizeCustomPracticeText(text)]
    .map(character => supported.has(character) ? character : " ")
    .join("");
}

function splitPracticeTextIntoLines(text, lineCount) {
  const normalized = normalizeCustomPracticeText(removeUnsupportedPracticeCharacters(text));
  const words = normalized.split(" ").filter(Boolean);
  const lines = [];
  let line = "";

  words.forEach(word => {
    const nextLine = line ? `${line} ${word}` : word;
    if (nextLine.length > 130 && line.length >= 70) {
      lines.push(line);
      line = word;
    } else {
      line = nextLine;
    }
  });

  if (line) lines.push(line);

  const targetCount = Math.max(3, Math.min(30, Number.parseInt(lineCount, 10) || 10));
  const usableLines = lines.filter(item => item.length >= 20);
  if (!usableLines.length) return [];

  while (usableLines.length < targetCount) {
    usableLines.push(...usableLines.slice(0, targetCount - usableLines.length));
  }

  return usableLines.slice(0, targetCount);
}

function randomTextSourceUrl(language = currentLanguage) {
  const sources = randomTextSources[language] || randomTextSources.en;
  const endpoint = sources[Math.floor(Math.random() * sources.length)];
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    generator: "random",
    grnnamespace: "0",
    grnlimit: "1",
    prop: "extracts",
    exintro: "1",
    explaintext: "1",
    redirects: "1"
  });

  return `${endpoint}?${params.toString()}`;
}

function extractRandomTextFromResponse(data) {
  const pages = data?.query?.pages;
  if (!pages || typeof pages !== "object") return "";
  const page = Object.values(pages).find(item => item?.extract);
  return page?.extract || "";
}

async function fetchRandomPracticeText() {
  const text = textFor();
  customPracticeStatus.textContent = text.textSourceLoading;
  customPracticeRefresh.disabled = true;
  customPracticeStart.disabled = true;

  try {
    const response = await fetch(randomTextSourceUrl(), { cache: "no-store" });
    if (!response.ok) throw new Error("Random source unavailable");

    const sourceText = normalizeCustomPracticeText(extractRandomTextFromResponse(await response.json()));
    if (sourceText.length < 180) throw new Error("Random source returned too little text");

    customPracticeText.value = sourceText;
    customPracticeStatus.textContent = text.textSourceReady;
  } catch {
    customPracticeText.value = text.fallbackRandomText;
    customPracticeStatus.textContent = text.textSourceFallback;
  } finally {
    customPracticeRefresh.disabled = false;
    customPracticeStart.disabled = false;
  }
}

function renderCustomPracticeDialog() {
  const text = textFor();
  const module = customPracticeModule();
  const isRandom = module?.customPractice?.type === "random";

  customPracticeTitle.textContent = module?.name || text.textPractice;
  customPracticeTextLabel.textContent = text.practiceText;
  customPracticeLineCountLabel.textContent = text.targetLines;
  customPracticeRefresh.textContent = text.refreshText;
  customPracticeRefresh.hidden = !isRandom;
  customPracticeCancel.textContent = text.cancel;
  customPracticeStart.textContent = text.startPractice;
  customPracticeClose.setAttribute("aria-label", text.close);
  customPracticeText.placeholder = isRandom ? text.randomText : text.customText;

  customKeyHighlightLabel.textContent = text.keyHighlight;
  customFingerZonesLabel.textContent = text.fingerZones;
  customFingerHighlightLabel.textContent = text.fingerHighlight;
  customPressHighlightLabel.textContent = text.pressHighlight;
  customShowFingersLabel.textContent = text.showFingers;
  customAlternateLinesLabel.textContent = text.alternateLines;
  customMetronomeLabel.textContent = text.metronome;
  customMetronomeInput.value = metronomeBpm ? String(metronomeBpm) : "";

  renderBooleanToggle(customKeyHighlightToggle, customKeyHighlightToggleText, keyHighlightEnabled);
  renderBooleanToggle(customFingerZonesToggle, customFingerZonesToggleText, fingerZonesEnabled);
  renderBooleanToggle(customFingerHighlightToggle, customFingerHighlightToggleText, fingerHighlightEnabled);
  renderBooleanToggle(customPressHighlightToggle, customPressHighlightToggleText, pressHighlightEnabled);
  renderBooleanToggle(customShowFingersToggle, customShowFingersToggleText, showFingersEnabled);
  renderBooleanToggle(customAlternateLinesToggle, customAlternateLinesToggleText, alternateLinesEnabled);
}

function openCustomPracticeDialog(moduleId) {
  const module = practiceModulesFor(currentLanguage)[moduleId];
  if (!module?.customPractice) return;

  customPracticeDraftModuleId = moduleId;
  customPracticeStatus.textContent = "";
  customPracticeLineCount.value = String(module.target?.lines || 10);
  customPracticeText.value = module.customPractice.type === "custom" ? (saved.customPracticeText?.[currentLanguage] || "") : "";
  learningProgramDialog.close();
  renderCustomPracticeDialog();
  customPracticeDialog.showModal();
  updatePracticeTimerPauseState();

  if (module.customPractice.type === "random") {
    fetchRandomPracticeText();
  } else {
    setTimeout(() => customPracticeText.focus(), 0);
  }
}

function closeCustomPracticeDialog() {
  customPracticeDialog.close();
}

function startCustomPractice() {
  const text = textFor();
  const moduleId = customPracticeDraftModuleId;
  const module = customPracticeModule(moduleId);
  if (!module) return;

  const lines = splitPracticeTextIntoLines(customPracticeText.value, customPracticeLineCount.value);
  if (!lines.length) {
    customPracticeStatus.textContent = text.textTooShort;
    return;
  }

  if (module.customPractice.type === "custom") {
    saved.customPracticeText = saved.customPracticeText || {};
    saved.customPracticeText[currentLanguage] = customPracticeText.value;
  }

  customPracticeRuntimeLines[moduleId] = lines;
  delete languagePracticeProgressStore(currentLanguage)[moduleId];
  setMetronomeBpm(customMetronomeInput.value);
  applySettings({ language: currentLanguage, module: moduleId });
  customPracticeDialog.close();
}
