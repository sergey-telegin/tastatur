function normalizeKeyInput(value) {
  return String(value).trim().replace(/\s+/g, " ").toLowerCase();
}

function extractPrintableKeySymbols(rawLabel) {
  return String(rawLabel || "")
    .split("\n")
    .map(part => part.trim())
    .filter(part => [...part].length === 1);
}

function findKeyCandidatesForCharacter(character, labels, geometry) {
  if (!character) return [];
  if (character === " ") return ["space"];

  const candidates = [];

  geometry.forEach(([keyId]) => {
    const printableSymbols = extractPrintableKeySymbols(labels[keyId] ?? "");
    if (!printableSymbols.length) return;

    const variants = new Set();
    printableSymbols.forEach(symbol => {
      variants.add(symbol);
      variants.add(symbol.toLowerCase());
      variants.add(symbol.toUpperCase());
    });

    if (variants.has(character)) {
      candidates.push(keyId);
    }
  });

  return candidates;
}

function findKeyIdByInput(value, { keyIds, visibleKeyLabel, keyTitle, rawLabels }) {
  const normalizedValue = normalizeKeyInput(value);
  if (!normalizedValue) return null;

  return keyIds.find(keyId => {
    const variants = new Set([
      visibleKeyLabel(keyId),
      keyTitle(keyId),
      rawLabels[keyId] ?? ""
    ]);

    return [...variants].some(variant => normalizeKeyInput(String(variant).replace(/\n/g, " ")) === normalizedValue);
  }) || null;
}

function keyIdFromEventCode(code) {
  const directMap = {
    Backquote: "backquote",
    Minus: "minus",
    Equal: "equal",
    BracketLeft: "bracketLeft",
    BracketRight: "bracketRight",
    Backslash: "backslash",
    Semicolon: "semicolon",
    Quote: "quote",
    Comma: "comma",
    Period: "period",
    Slash: "slash",
    Space: "space",
    Enter: "enter",
    Tab: "tab"
  };

  if (directMap[code]) return directMap[code];
  if (code.startsWith("Key")) return code.slice(3).toLowerCase();
  if (code.startsWith("Digit")) return `digit${code.slice(5)}`;
  return null;
}
