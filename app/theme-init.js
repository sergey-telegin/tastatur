(function () {
  const storageKey = "keyboard-layout-editor-v1";
  let theme = "dark";
  let practiceTextSize = "m";

  try {
    const savedState = JSON.parse(localStorage.getItem(storageKey)) || {};
    theme = savedState.theme === "light" ? "light" : "dark";
    practiceTextSize = ["s", "m", "l"].includes(savedState.practiceTextSize) ? savedState.practiceTextSize : "m";
  } catch {
    theme = "dark";
    practiceTextSize = "m";
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.practiceTextSize = practiceTextSize;
})();
