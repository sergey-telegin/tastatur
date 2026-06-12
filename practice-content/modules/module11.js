(() => {
  const sample = {
    ru: [
      "случайный текст помогает перейти от учебных строк к живой печати сохраняя спокойный темп и точность"
    ],
    de: [
      "ein zufaelliger text bringt dich naeher an echtes tippen mit ruhigem tempo und klarer genauigkeit"
    ],
    en: [
      "random text brings practice closer to real typing with steady rhythm and clear accuracy"
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
        tips: {
          ru: ["Случайный текст ближе к настоящей печати: меньше повторов, больше живого языка и больше ответственности для пальцев."],
          de: ["Zufällige Texte sind näher am echten Tippen: weniger Wiederholung, mehr echte Sprache und mehr Verantwortung für die Finger."],
          en: ["Random text is closer to real typing: less repetition, more living language, and more responsibility for the fingers."]
        },
        customPractice: { type: "random" },
        symbolPolicy: { scope: "free-text", random: true },
        content: { lineCount: 10 },
      scoring: { accuracy: 90 },
        lines: sample
      }
    ]
  });
})();
