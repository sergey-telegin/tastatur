const storageKey = "keyboard-layout-editor-v1";

function migrateSavedState(savedState) {
  const nextState = savedState && typeof savedState === "object" ? savedState : {};
  let changed = false;

  if ("fingers" in nextState) {
    delete nextState.fingers;
    changed = true;
  }

  if (!nextState.practiceProgress || typeof nextState.practiceProgress !== "object" || Array.isArray(nextState.practiceProgress)) {
    nextState.practiceProgress = {};
    changed = true;
  }

  return { savedState: nextState, changed };
}

function loadSaved() {
  let parsed;

  try {
    parsed = JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    parsed = {};
  }

  const { savedState, changed } = migrateSavedState(parsed);

  if (changed) {
    localStorage.setItem(storageKey, JSON.stringify(savedState));
  }

  return savedState;
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify(saved));
}
