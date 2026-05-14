function cloneFingerMapState(source) {
  return window.FingerMapUtils.cloneState(source);
}

function openFingerMapDraft() {
  draftFingerMap = cloneFingerMapState(fingerMap());
  draftFingerPreviousOwners = {};
  draftActiveFingerId = activeFingerId;
  fingerKeyboardMode = false;
}

function currentFingerMapState() {
  return draftFingerMap || fingerMap();
}

function currentFingerSelection() {
  return window.FingerMapUtils.currentSelection({
    isFingerMapDialogOpen: false,
    isFingerKeyboardMode: fingerKeyboardMode,
    draftActiveFingerId,
    activeFingerId
  });
}

function fingerMap() {
  const hadFingerMap = saved.fingerMap && typeof saved.fingerMap === "object";
  saved.fingerMap = window.FingerMapUtils.normalize(saved.fingerMap, {
    fingerIds,
    keyIds: keyIds(),
    defaultFingerMap
  });

  if (!hadFingerMap) {
    persist();
  }

  return saved.fingerMap;
}

function currentOwnerForKey(keyId, map = currentFingerMapState()) {
  return window.FingerMapUtils.findCurrentOwner(keyId, fingerIds, map);
}

function assignKeyToFinger(keyId, fingerId, map = currentFingerMapState()) {
  window.FingerMapUtils.assignKey(keyId, fingerId, map, fingerIds);
}

function assignOrRestoreKeyForFinger(keyId, fingerId, map = currentFingerMapState()) {
  if (keyId === "space") {
    assignKeyToFinger(keyId, fingerId, map);
    return;
  }

  const currentOwner = currentOwnerForKey(keyId, map);
  const previousOwner = draftFingerPreviousOwners[keyId] || null;

  if (currentOwner === fingerId && previousOwner && previousOwner !== fingerId) {
    assignKeyToFinger(keyId, previousOwner, map);
    delete draftFingerPreviousOwners[keyId];
    return;
  }

  if (currentOwner && currentOwner !== fingerId) {
    draftFingerPreviousOwners[keyId] = currentOwner;
  }

  assignKeyToFinger(keyId, fingerId, map);
}
