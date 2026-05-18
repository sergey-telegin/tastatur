window.PRACTICE_CONTENT_SOURCE = {
  meta: window.FLYKEY_CONTENT_VERSION || {
    id: "flykey-practice-content",
    version: "2026.05.17.1",
    updatedAt: "2026-05-17",
    languages: ["ru", "uk", "kk", "de", "en"]
  },
  languages: ["ru", "uk", "kk", "de", "en"],

    grades: {ru: [
      { min: 95, label: "отлично" },
      { min: 90, label: "нормально" },
      { min: 85, label: "слабый результат" },
      { min: 0, label: "повтор" }
    ],
    uk: [
      { min: 95, label: "відмінно" },
      { min: 90, label: "добре" },
      { min: 85, label: "поки слабко" },
      { min: 0, label: "повторити" }
    ],
    kk: [
      { min: 95, label: "өте жақсы" },
      { min: 90, label: "жақсы" },
      { min: 85, label: "әлсіздеу" },
      { min: 0, label: "қайталау" }
    ],
    de: [
      { min: 95, label: "sehr gut" },
      { min: 90, label: "ok" },
      { min: 85, label: "schwach" },
      { min: 0, label: "wiederholen" }
    ],
    en: [
      { min: 95, label: "excellent" },
      { min: 90, label: "ok" },
      { min: 85, label: "weak" },
      { min: 0, label: "repeat" }
    ]},

  modules: []
};
