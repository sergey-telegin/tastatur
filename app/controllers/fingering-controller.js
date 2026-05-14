function activeFingerKeys() {
  if (fingerKeyboardMode) {
    return new Set();
  }

  if (!fingerMapDialog.open) {
    return new Set();
  }

  return new Set(currentFingerMapState()[currentFingerSelection()] || []);
}

function allFingerKeyOwners(map = currentFingerMapState(), preferredFingerId = currentFingerSelection()) {
  const owners = {};
  (map[preferredFingerId] || []).forEach(keyId => {
    owners[keyId] = preferredFingerId;
  });

  fingerIds.forEach(fingerId => {
    (map[fingerId] || []).forEach(keyId => {
      if (!owners[keyId]) {
        owners[keyId] = fingerId;
      }
    });
  });
  return owners;
}

function setActiveFinger(fingerId) {
  if (fingerMapDialog.open) {
    draftActiveFingerId = fingerId;
  } else {
    activeFingerId = fingerId;
    saved.activeFingerId = fingerId;
    persist();
  }
  renderFingerMapPanel();
  renderKeyboard();
}

function closeFingerMapDraftIfNeeded() {
  addFingerInputId = null;
  if (!fingerKeyboardMode) {
    draftFingerMap = null;
    draftFingerPreviousOwners = {};
    draftActiveFingerId = activeFingerId;
  }
}

function enterFingerKeyboardMode() {
  fingerKeyboardMode = true;
  addFingerInputId = null;
  fingerMapDialog.close();
  renderFingerMapPanel();
  renderKeyboard();
}

function openFingerMapDialog() {
  openFingerMapDraft();
  if (!fingerMapDialog.open) {
    fingerMapDialog.showModal();
  }
  updatePracticeTimerPauseState();
  renderFingerMapPanel();
  renderKeyboard();
}

function resetFingerMapDraft() {
  addFingerInputId = null;
  draftFingerMap = cloneFingerMapState(defaultFingerMap);
  draftFingerPreviousOwners = {};
  draftActiveFingerId = "left-index";
  renderFingerMapPanel();
  renderKeyboard();
  setStatus(textFor().settingsReset);
}

function saveFingerMapDraft({ closeDialog = false, keepDraft = false } = {}) {
  activeFingerId = draftActiveFingerId;
  saved.activeFingerId = activeFingerId;
  saved.fingerMap = cloneFingerMapState(currentFingerMapState());
  persist();
  addFingerInputId = null;
  fingerKeyboardMode = false;
  draftFingerPreviousOwners = {};
  draftFingerMap = keepDraft ? cloneFingerMapState(saved.fingerMap) : null;
  renderFingerMapPanel();
  renderKeyboard();
  if (closeDialog) {
    fingerMapDialog.close();
  }
  setStatus(textFor().fingerMapSaved);
}

function cancelFingerKeyboardMode() {
  fingerKeyboardMode = false;
  draftFingerMap = null;
  draftFingerPreviousOwners = {};
  draftActiveFingerId = activeFingerId;
  renderFingerMapPanel();
  renderKeyboard();
}

function selectKeyboardFingerPicker(button) {
  if (!fingerKeyboardMode || !button) return;
  draftActiveFingerId = button.dataset.finger;
  renderFingerMapPanel();
  renderKeyboard();
}

function handleKeyboardKeyClick(id) {
  if (fingeringTourActive && fingerKeyboardMode) {
    return;
  }

  if (fingerKeyboardMode) {
    assignOrRestoreKeyForFinger(id, currentFingerSelection(), currentFingerMapState());
    renderFingerMapPanel();
    renderKeyboard();
    setStatus(textFor().draftKeyAssigned.replace("{key}", visibleKeyLabel(id)).replace("{finger}", fingerName(currentFingerSelection())));
    return;
  }

  selectKey(id);
}

function handleFingerKeyboardPhysicalInput(event) {
  if (!fingerKeyboardMode) return;
  if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;

  const target = event.target;
  if (target instanceof HTMLElement) {
    const tagName = target.tagName;
    if (target.isContentEditable || tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || tagName === "BUTTON") {
      return;
    }
  }

  const keyId = keyIdFromEventCode(event.code);
  if (!keyId) return;

  event.preventDefault();
  handleKeyboardKeyClick(keyId);
}
