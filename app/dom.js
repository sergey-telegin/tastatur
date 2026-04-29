const keyboard = document.querySelector("#keyboard");
const keyboardScale = document.querySelector("#keyboardScale");
const keyboardWrap = document.querySelector("#keyboardWrap");
const handsLayer = document.querySelector("#handsLayer");
const leftHand = document.querySelector(".hand.left");
const rightHand = document.querySelector(".hand.right");
let leftFingerNodes = Array.from(document.querySelectorAll('.hand.left .finger[data-finger]'));
let rightFingerNodes = Array.from(document.querySelectorAll('.hand.right .finger[data-finger]'));
const settingsToggle = document.querySelector("#settingsToggle");
const pageTitle = document.querySelector("#pageTitle");
const settingsDialog = document.querySelector("#settingsDialog");
const settingsTitle = document.querySelector("#settingsTitle");
const settingsClose = document.querySelector("#settingsClose");
const languageLabel = document.querySelector("#languageLabel");
const moduleLabel = document.querySelector("#moduleLabel");
const fingerMapOpen = document.querySelector("#fingerMapOpen");
const fingerMapDialog = document.querySelector("#fingerMapDialog");
const fingerMapClose = document.querySelector("#fingerMapClose");
const fingerMapKeyboardMode = document.querySelector("#fingerMapKeyboardMode");
const fingerMapReset = document.querySelector("#fingerMapReset");
const fingerMapCancel = document.querySelector("#fingerMapCancel");
const fingerMapSave = document.querySelector("#fingerMapSave");
const fingerMapTitle = document.querySelector("#fingerMapTitle");
const fingerMapSectionLabel = document.querySelector("#fingerMapSectionLabel");
const fingerMapHelp = document.querySelector("#fingerMapHelp");
const keyboardEditorPanel = document.querySelector("#keyboardEditorPanel");
const keyboardFingerPicker = document.querySelector("#keyboardFingerPicker");
const keyboardEditorReset = document.querySelector("#keyboardEditorReset");
const keyboardEditorShowAll = document.querySelector("#keyboardEditorShowAll");
const keyboardEditorCancel = document.querySelector("#keyboardEditorCancel");
const keyboardEditorSave = document.querySelector("#keyboardEditorSave");
const fingerMapList = document.querySelector("#fingerMapList");
const languageTabs = document.querySelector("#languageTabs");
const trainer = document.querySelector(".trainer");
const practiceProgress = document.querySelector(".practice-progress");
const practiceStats = document.querySelector(".practice-stats");
const practiceAccuracyLabel = document.querySelector("#practiceAccuracyLabel");
const practiceAccuracyValue = document.querySelector("#practiceAccuracyValue");
const practiceSpeedLabel = document.querySelector("#practiceSpeedLabel");
const practiceSpeedValue = document.querySelector("#practiceSpeedValue");
const practiceSample = document.querySelector("#practiceSample");
const practiceInput = document.querySelector("#practiceInput");
const practiceProgressText = document.querySelector("#practiceProgressText");
const practiceProgressBar = document.querySelector("#practiceProgressBar");
const practiceModuleList = document.querySelector("#practiceModuleList");
const keySelect = document.querySelector("#keySelect");
const labelInput = document.querySelector("#labelInput");
const applyLabel = document.querySelector("#applyLabel");
const editToggle = document.querySelector("#editToggle");
const resetLayout = document.querySelector("#resetLayout");
const status = document.querySelector("#status");

function refreshFingerNodes() {
  leftFingerNodes = Array.from(document.querySelectorAll('.hand.left .finger[data-finger]'));
  rightFingerNodes = Array.from(document.querySelectorAll('.hand.right .finger[data-finger]'));
}

async function hydrateFingerSvgs() {
  const fingerImages = Array.from(document.querySelectorAll('img.finger[data-finger]'));

  await Promise.all(fingerImages.map(async image => {
    try {
      const response = await fetch(image.getAttribute("src"));
      if (!response.ok) return;

      const svgMarkup = await response.text();
      const parsed = new DOMParser().parseFromString(svgMarkup, "image/svg+xml");
      const svg = parsed.documentElement;
      if (!svg || svg.nodeName.toLowerCase() !== "svg") return;

      svg.setAttribute("class", image.className);
      svg.setAttribute("data-finger", image.dataset.finger || "");
      svg.setAttribute("aria-hidden", "true");
      svg.querySelectorAll("[id]").forEach(node => node.removeAttribute("id"));
      image.replaceWith(svg);
    } catch {
      // Keep raster fallback if inline SVG hydration is unavailable.
    }
  }));

  refreshFingerNodes();
}
