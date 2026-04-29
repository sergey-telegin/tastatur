function textFor(language = currentLanguage) {
  return uiText[language] || uiText.en;
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
