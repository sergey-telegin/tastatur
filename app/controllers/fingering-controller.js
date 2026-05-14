function activeFingerKeys() {
  return new Set();
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
  if (fingerKeyboardMode) {
    draftActiveFingerId = fingerId;
  } else {
    activeFingerId = fingerId;
    saved.activeFingerId = fingerId;
    persist();
  }
  renderFingerMapPanel();
  renderKeyboard();
}

function enterFingerKeyboardMode() {
  fingerKeyboardMode = true;
  renderFingerMapPanel();
  renderKeyboard();
}

function resetFingerMapDraft() {
  draftFingerMap = cloneFingerMapState(defaultFingerMap);
  draftFingerPreviousOwners = {};
  draftActiveFingerId = "left-index";
  renderFingerMapPanel();
  renderKeyboard();
  setStatus(textFor().settingsReset);
}

function saveFingerMapDraft() {
  activeFingerId = draftActiveFingerId;
  saved.activeFingerId = activeFingerId;
  saved.fingerMap = cloneFingerMapState(currentFingerMapState());
  persist();
  fingerKeyboardMode = false;
  draftFingerPreviousOwners = {};
  draftFingerMap = null;
  renderFingerMapPanel();
  renderKeyboard();
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
