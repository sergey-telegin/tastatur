function renderModuleButtons() {
  const settingsState = currentSettingsDraft();
  const modules = practiceModulesFor(settingsState.language);
  const selectedModule = modules[settingsState.module] ? settingsState.module : "module1";

  practiceModuleList.innerHTML = "";
  Object.entries(modules).forEach(([id, module]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `module-btn${id === selectedModule ? " active" : ""}`;
    button.textContent = module.name;
    button.addEventListener("click", () => {
      if (draftSettings) {
        draftSettings.module = id;
      }
      renderModuleButtons();
    });
    practiceModuleList.append(button);
  });
}

function renderTabs() {
  const text = textFor();
  const settingsState = currentSettingsDraft();
  languageTabs.innerHTML = "";

  Object.entries(languages).forEach(([id, language]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `mode-btn${id === settingsState.language ? " active" : ""}`;
    button.textContent = language.name;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(id === settingsState.language));
    button.addEventListener("click", () => {
      if (draftSettings) {
        draftSettings.language = id;
      }
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
  settingsSave.textContent = text.save;
}
