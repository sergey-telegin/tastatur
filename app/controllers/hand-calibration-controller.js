function isHandCalibrationModeEnabled() {
  return new URLSearchParams(window.location.search).has("calibrateHands");
}

function numericCssValue(node, propertyName) {
  const value = node.style.getPropertyValue(propertyName).trim();
  return Number.parseFloat(value) || 0;
}

function setFingerOffset(node, x, y) {
  node.style.setProperty("--finger-x", `${x}px`);
  node.style.setProperty("--finger-y", `${y}px`);
}

function setMirroredFingerOffset(node, x, y) {
  setFingerOffset(node, x, y);

  const mirroredNode = fingerNodeById(mirroredFingerId(node.dataset.finger));
  if (!mirroredNode || mirroredNode === node) return;

  setFingerOffset(mirroredNode, -x, y);
}

function setHandOffset(node, x, y) {
  node.style.setProperty("--hand-offset-x", `${x}px`);
  node.style.setProperty("--hand-offset-y", `${y}px`);
}

function handCalibrationEntry(node) {
  return {
    x: Number(numericCssValue(node, "--finger-x").toFixed(3)),
    y: Number(numericCssValue(node, "--finger-y").toFixed(3))
  };
}

function handOffsetEntry(node) {
  return {
    x: Number(numericCssValue(node, "--hand-offset-x").toFixed(3)),
    y: Number(numericCssValue(node, "--hand-offset-y").toFixed(3))
  };
}

function collectHandCalibration() {
  const fingers = {};
  document.querySelectorAll(".finger[data-finger]").forEach(node => {
    fingers[node.dataset.finger] = handCalibrationEntry(node);
  });

  return {
    keyboardWidth: keyboardWrap.offsetWidth,
    keyboardHeight: keyboardWrap.offsetHeight,
    keyboardScale: Number(getComputedStyle(document.documentElement).getPropertyValue("--keyboard-scale")) || 1,
    handOffsets: {
      left: handOffsetEntry(leftHand),
      right: handOffsetEntry(rightHand)
    },
    fingers
  };
}

function createHandCalibrationPanel() {
  const panel = document.createElement("aside");
  panel.className = "hand-calibration-panel";
  panel.innerHTML = `
    <strong>Hand calibration</strong>
    <span class="hand-calibration-selected" id="handCalibrationSelected">Drag a finger</span>
    <div class="hand-calibration-actions">
      <button type="button" data-step="-10,0">← 10</button>
      <button type="button" data-step="10,0">10 →</button>
      <button type="button" data-step="0,-10">↑ 10</button>
      <button type="button" data-step="0,10">10 ↓</button>
    </div>
    <div class="hand-calibration-actions">
      <button type="button" data-step="-1,0">← 1</button>
      <button type="button" data-step="1,0">1 →</button>
      <button type="button" data-step="0,-1">↑ 1</button>
      <button type="button" data-step="0,1">1 ↓</button>
    </div>
    <button class="hand-calibration-export" type="button">Export JSON</button>
    <textarea class="hand-calibration-output" readonly aria-label="Hand calibration JSON"></textarea>
  `;
  document.body.append(panel);
  return panel;
}

function initializeHandCalibrationMode() {
  if (!isHandCalibrationModeEnabled()) return;

  document.documentElement.classList.add("hand-calibration-mode");
  handsLayer.classList.remove("hidden");

  const panel = createHandCalibrationPanel();
  const selectedLabel = panel.querySelector("#handCalibrationSelected");
  const output = panel.querySelector(".hand-calibration-output");
  let selectedNode = null;
  let dragState = null;

  function selectNode(node) {
    if (selectedNode) selectedNode.classList.remove("calibration-selected");
    selectedNode = node;
    if (selectedNode) selectedNode.classList.add("calibration-selected");
    selectedLabel.textContent = selectedNode?.dataset.finger || "Drag a finger";
  }

  function exportCalibration() {
    output.value = JSON.stringify(collectHandCalibration(), null, 2);
    output.focus();
    output.select();
  }

  handsLayer.addEventListener("pointerdown", event => {
    const finger = event.target.closest(".finger[data-finger]");
    if (!finger) return;

    event.preventDefault();
    event.stopPropagation();
    selectNode(finger);
    finger.setPointerCapture(event.pointerId);
    dragState = {
      node: finger,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: numericCssValue(finger, "--finger-x"),
      offsetY: numericCssValue(finger, "--finger-y")
    };
  });

  handsLayer.addEventListener("pointermove", event => {
    if (!dragState || event.pointerId !== dragState.pointerId) return;

    const scale = Number(getComputedStyle(document.documentElement).getPropertyValue("--keyboard-scale")) || 1;
    const dx = (event.clientX - dragState.startX) / scale;
    const dy = (event.clientY - dragState.startY) / scale;
    setMirroredFingerOffset(dragState.node, dragState.offsetX + dx, dragState.offsetY + dy);
  });

  handsLayer.addEventListener("pointerup", event => {
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    dragState = null;
    exportCalibration();
  });

  panel.addEventListener("click", event => {
    const stepButton = event.target.closest("button[data-step]");
    if (stepButton && selectedNode) {
      const [dx, dy] = stepButton.dataset.step.split(",").map(Number);
      setMirroredFingerOffset(
        selectedNode,
        numericCssValue(selectedNode, "--finger-x") + dx,
        numericCssValue(selectedNode, "--finger-y") + dy
      );
      exportCalibration();
      return;
    }

    if (event.target.closest(".hand-calibration-export")) {
      exportCalibration();
    }
  });

  document.addEventListener("keydown", event => {
    if (!selectedNode) return;
    const keyDeltas = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1]
    };
    const delta = keyDeltas[event.key];
    if (!delta) return;

    event.preventDefault();
    const multiplier = event.shiftKey ? 10 : 1;
    setMirroredFingerOffset(
      selectedNode,
      numericCssValue(selectedNode, "--finger-x") + delta[0] * multiplier,
      numericCssValue(selectedNode, "--finger-y") + delta[1] * multiplier
    );
    exportCalibration();
  });

  exportCalibration();
}
