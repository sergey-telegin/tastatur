(() => {
  const sample = {
    ru: [
      "вставьте свой текст перед стартом и настройте помощников под задачу которую хотите тренировать сегодня"
    ],
    de: [
      "fuege deinen eigenen text vor dem start ein und passe die hilfen an die heutige uebung an"
    ],
    en: [
      "paste your own text before starting and tune the helpers for the task you want to practice today"
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
        tips: {
          ru: ["Свой текст полезен, когда хочется тренировать именно те слова и фразы, которые вы реально печатаете каждый день."],
          de: ["Eigene Texte helfen, genau die Wörter und Sätze zu üben, die du im Alltag wirklich tippst."],
          en: ["Custom text helps you practice the exact words and phrases you really type every day."]
        },
        customPractice: { type: "custom" },
        symbolPolicy: { scope: "free-text", custom: true },
        content: { lineCount: 10 },
      scoring: { accuracy: 90 },
        lines: sample
      }
    ]
  });
})();
