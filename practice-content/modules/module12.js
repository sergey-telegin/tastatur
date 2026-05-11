(() => {
  const sample = {
    ru: [
      "вставьте свой текст в меню перед стартом и настройте ассистенты так как удобно именно для этой тренировки"
    ],
    de: [
      "fuege deinen eigenen text vor dem start ein und stelle die assistenten fuer diese uebung passend ein"
    ],
    en: [
      "paste your own text before starting and set the assistants the way you want for this practice"
    ]
  };

  window.PRACTICE_CONTENT_SOURCE.modules = window.PRACTICE_CONTENT_SOURCE.modules || [];
  window.PRACTICE_CONTENT_SOURCE.modules.push({
    id: "module12",
    title: { ru: "Пользовательские тексты + пользовательские настройки", de: "Eigene Texte + eigene Einstellungen", en: "Custom Texts + Custom Settings" },
    symbols: { ru: [], de: [], en: [] },
    lessons: [
      {
        id: "lesson12_1",
        title: { ru: "Пользовательские тексты", de: "Eigene Texte", en: "Custom Texts" },
        description: { ru: "Вставка текста и настройки перед стартом", de: "Text einfügen und Einstellungen vor dem Start", en: "Paste text and tune settings before start" },
        customPractice: { type: "custom" },
        symbolPolicy: { scope: "free-text", custom: true },
        target: { lines: 10, accuracy: 90 },
        lines: sample
      }
    ]
  });
})();
