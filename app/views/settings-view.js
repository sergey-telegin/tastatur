function renderModuleButtons() {
  const modules = practiceModulesFor(currentLanguage);
  const selectedModule = modules[currentPracticeModule] ? currentPracticeModule : "module1";
  const text = textFor();

  practiceModuleList.innerHTML = "";
  Object.entries(modules).forEach(([id, module]) => {
    const progress = moduleProgressFor(currentLanguage, id);
    const row = document.createElement("div");
    row.className = "module-row";

    const button = document.createElement("button");
    button.type = "button";
    button.className = `module-btn${id === selectedModule ? " active" : ""}`;
    button.innerHTML = `
      <span class="module-btn-name">${module.name}</span>
      <span class="module-btn-percent">${progress.percent}%</span>
    `;
    button.addEventListener("click", () => {
      applySettings({ language: currentLanguage, module: id });
      renderModuleButtons();
    });

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "module-reset-btn";
    resetButton.textContent = "↺";
    resetButton.title = text.resetModuleProgress;
    resetButton.setAttribute("aria-label", `${text.resetModuleProgress}: ${module.name}`);
    resetButton.addEventListener("click", event => {
      event.stopPropagation();
      resetModuleProgress(id, currentLanguage);
    });

    row.append(button, resetButton);
    practiceModuleList.append(row);
  });
}

function renderTabs() {
  const text = textFor();
  languageTabs.innerHTML = "";

  Object.entries(languages).forEach(([id, language]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `mode-btn${id === currentLanguage ? " active" : ""}`;
    button.textContent = language.name;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(id === currentLanguage));
    button.addEventListener("click", () => {
      applySettings({ language: id, module: currentPracticeModule });
      renderTabs();
      renderModuleButtons();
    });
    languageTabs.append(button);
  });

  settingsTitle.textContent = text.settings;
  settingsToggle.setAttribute("aria-label", text.settings);
  settingsClose.setAttribute("aria-label", text.close);
  languageLabel.textContent = text.language;
  moduleLabel.textContent = text.module;
  soundLabel.textContent = text.sound;
  renderKeySoundToggle();
}

function renderKeySoundToggle() {
  const text = textFor();
  keySoundToggle.classList.toggle("active", keySoundEnabled);
  keySoundToggle.setAttribute("aria-pressed", String(keySoundEnabled));
  keySoundToggleText.textContent = keySoundEnabled ? text.keySoundOn : text.keySoundOff;
}
