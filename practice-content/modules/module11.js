(() => {
  const sample = {
    ru: [
      "случайный текст появится здесь после загрузки источника и будет разбит на строки для спокойной практики"
    ],
    de: [
      "ein zufaelliger text erscheint hier nach dem laden der quelle und wird in ruhige uebungszeilen geteilt"
    ],
    en: [
      "a random text appears here after loading the source and is split into calm practice lines"
    ]
  };

  window.PRACTICE_CONTENT_SOURCE.modules = window.PRACTICE_CONTENT_SOURCE.modules || [];
  window.PRACTICE_CONTENT_SOURCE.modules.push({
    id: "module11",
    title: { ru: "Случайные тексты + пользовательские настройки", de: "Zufallstexte + eigene Einstellungen", en: "Random Texts + Custom Settings" },
    symbols: { ru: [], de: [], en: [] },
    lessons: [
      {
        id: "lesson11_1",
        title: { ru: "Случайные тексты", de: "Zufallstexte", en: "Random Texts" },
        description: { ru: "Меню текста и ассистентов перед стартом", de: "Text- und Assistentenmenü vor dem Start", en: "Text and assistant menu before start" },
        customPractice: { type: "random" },
        symbolPolicy: { scope: "free-text", random: true },
        target: { lines: 10, accuracy: 90 },
        lines: sample
      }
    ]
  });
})();
