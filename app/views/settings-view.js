function renderModuleButtons() {
  const modules = practiceModulesFor(currentLanguage);
  const selectedModule = modules[currentPracticeModule] ? currentPracticeModule : "module1";

  practiceModuleList.innerHTML = "";
  Object.entries(modules).forEach(([id, module]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `module-btn${id === selectedModule ? " active" : ""}`;
    button.textContent = module.name;
    button.addEventListener("click", () => {
      applySettings({ language: currentLanguage, module: id });
      renderModuleButtons();
    }); 
    practiceModuleList.append(button);
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
}
