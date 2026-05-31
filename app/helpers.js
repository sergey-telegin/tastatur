function textFor(language = currentLanguage) {
  return uiText[language] || uiText.en;
}

function formatUiText(template, values = {}) {
  return String(template || "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function lessonStoryboardFor(lessonOrId) {
  const lessonId = typeof lessonOrId === "string" ? lessonOrId : lessonOrId?.id;
  return window.FLYKEY_LESSON_STORYBOARD?.[lessonId] || {};
}

function storyboardStepEnabled(entry, key) {
  return entry?.[key] !== false;
}

function onboardingStoryboard() {
  return window.FLYKEY_ONBOARDING_STORYBOARD || {};
}

function localizedTextValue(value, language = currentLanguage) {
  if (Array.isArray(value)) return value.filter(Boolean).join("\n");
  if (!value || typeof value !== "object") return value || "";
  return localizedTextValue(value[language] || "", language);
}

function keyIds() {
  return geometry.map(([id]) => id);
}

function fingerName(fingerId, language = currentLanguage) {
  return textFor(language).fingerNames[fingerId] || fingerId;
}

function visibleKeyLabel(keyId, language = currentLanguage) {
  const label = labelsFor(language)[keyId] ?? "";
  return label.replace(/\n/g, " ").trim() || keyTitle(keyId);
}

function formatModuleProgressText(completedLines, totalLines, language = currentLanguage) {
  return `${completedLines} / ${totalLines} ${textFor(language).moduleLines}`;
}
