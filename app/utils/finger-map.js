window.FingerMapUtils = {
  cloneState(source) {
    return JSON.parse(JSON.stringify(source));
  },

  currentSelection({ isFingerMapDialogOpen, isFingerKeyboardMode, draftActiveFingerId, activeFingerId }) {
    return (isFingerMapDialogOpen || isFingerKeyboardMode) ? draftActiveFingerId : activeFingerId;
  },

  normalize(savedFingerMap, { fingerIds, keyIds, defaultFingerMap }) {
    const nextFingerMap = savedFingerMap && typeof savedFingerMap === "object"
      ? savedFingerMap
      : this.cloneState(defaultFingerMap);

    const validKeys = new Set(keyIds);
    fingerIds.forEach(fingerId => {
      if (!Array.isArray(nextFingerMap[fingerId])) {
        nextFingerMap[fingerId] = [];
      }
      nextFingerMap[fingerId] = nextFingerMap[fingerId].filter((keyId, index, array) => {
        return validKeys.has(keyId) && array.indexOf(keyId) === index;
      });
    });

    keyIds.forEach(keyId => {
      const owner = fingerIds.find(fingerId => nextFingerMap[fingerId].includes(keyId));
      if (!owner) {
        nextFingerMap["right-pinky"].push(keyId);
      }
    });

    fingerIds.forEach(fingerId => {
      if (fingerId !== "left-thumb" && fingerId !== "right-thumb") {
        nextFingerMap[fingerId] = nextFingerMap[fingerId].filter(keyId => keyId !== "space");
      }
    });

    if (!nextFingerMap["left-thumb"].includes("space")) {
      nextFingerMap["left-thumb"].unshift("space");
    }
    if (!nextFingerMap["right-thumb"].includes("space")) {
      nextFingerMap["right-thumb"].unshift("space");
    }

    nextFingerMap["right-pinky"] = nextFingerMap["right-pinky"].filter(keyId => keyId !== "isoIntl");
    if (!nextFingerMap["left-pinky"].includes("isoIntl")) {
      nextFingerMap["left-pinky"].push("isoIntl");
    }

    nextFingerMap["right-ring"] = nextFingerMap["right-ring"].filter(keyId => keyId !== "bracketRight");
    if (!nextFingerMap["right-pinky"].includes("bracketRight")) {
      nextFingerMap["right-pinky"].push("bracketRight");
    }

    return nextFingerMap;
  },

  findCurrentOwner(keyId, fingerIds, map) {
    return fingerIds.find(fingerId => map[fingerId]?.includes(keyId)) || null;
  },

  assignKey(keyId, fingerId, map, fingerIds) {
    if (keyId === "space" && (fingerId === "left-thumb" || fingerId === "right-thumb")) {
      fingerIds.forEach(currentFingerId => {
        if (currentFingerId !== "left-thumb" && currentFingerId !== "right-thumb") {
          map[currentFingerId] = map[currentFingerId].filter(mappedKeyId => mappedKeyId !== keyId);
        }
      });
      if (!map[fingerId].includes(keyId)) {
        map[fingerId].unshift(keyId);
      }
      const mirroredThumb = fingerId === "left-thumb" ? "right-thumb" : "left-thumb";
      if (!map[mirroredThumb].includes(keyId)) {
        map[mirroredThumb].unshift(keyId);
      }
      return;
    }

    fingerIds.forEach(currentFingerId => {
      map[currentFingerId] = map[currentFingerId].filter(mappedKeyId => mappedKeyId !== keyId);
    });
    if (!map[fingerId].includes(keyId)) {
      map[fingerId].push(keyId);
    }
  }
};
