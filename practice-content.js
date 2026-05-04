window.PRACTICE_CONTENT_SOURCE = {
  languages: ["ru", "de", "en"],

  grades: {
    ru: [
      { min: 95, label: "отлично" },
      { min: 90, label: "нормально" },
      { min: 85, label: "слабый результат" },
      { min: 0, label: "повтор" }
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
    ]
  },

  modules: [
    {
      id: "module1",
      title: { ru: "Module 1 — Домашний ряд", de: "Modul 1 — Grundreihe", en: "Module 1 — Home Row" },
      lessons: [
        { id: "lesson1_1", title: { ru: "Левая рука (Ф Ы В А)", de: "Linke Hand (A S D F)", en: "Left Hand (A S D F)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson1_2", title: { ru: "Правая рука (О Л Д Ж)", de: "Rechte Hand (J K L Ö)", en: "Right Hand (J K L ;)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson1_3", title: { ru: "Обе руки", de: "Beide Hände", en: "Both Hands" }, target: { lines: 12, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson1_4", title: { ru: "Короткие слова", de: "Kurze Wörter", en: "Short Words" }, target: { accuracy: 92 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson1_5", title: { ru: "Тест", de: "Test", en: "Test" }, target: { accuracy: 90, speed: 20 }, lines: { ru: [], de: [], en: [] } }
      ]
    },
    {
      id: "module2",
      title: { ru: "Module 2 — Указательные пальцы (центр)", de: "Modul 2 — Zeigefinger (Mitte)", en: "Module 2 — Index Fingers (Center)" },
      lessons: [
        { id: "lesson2_1", title: { ru: "Левая рука (К Е А П)", de: "Linke Hand (R T F G)", en: "Left Hand (R T F G)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson2_2", title: { ru: "Правая рука (Н Г Р О)", de: "Rechte Hand (Z U H J)", en: "Right Hand (Y U H J)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson2_3", title: { ru: "Нижний ряд (М И Т Ь)", de: "Untere Reihe (V B N M)", en: "Bottom Row (V B N M)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson2_4", title: { ru: "Слова (центр клавиатуры)", de: "Wörter (Tastaturmitte)", en: "Words (Keyboard Center)" }, target: { lines: 12, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson2_5", title: { ru: "Тест", de: "Test", en: "Test" }, target: { accuracy: 90, speed: 25 }, lines: { ru: [], de: [], en: [] } }
      ]
    },
    {
      id: "module3",
      title: { ru: "Module 3 — Средние пальцы", de: "Modul 3 — Mittelfinger", en: "Module 3 — Middle Fingers" },
      lessons: [
        { id: "lesson3_1", title: { ru: "Левая рука (У Ц)", de: "Linke Hand (E W)", en: "Left Hand (E W)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson3_2", title: { ru: "Правая рука (Щ Ш)", de: "Rechte Hand (O I)", en: "Right Hand (O I)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson3_3", title: { ru: "Нижний ряд (С В Ч)", de: "Untere Reihe (C D X)", en: "Bottom Row (C D X)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson3_4", title: { ru: "Слова", de: "Wörter", en: "Words" }, target: { lines: 12, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson3_5", title: { ru: "Тест", de: "Test", en: "Test" }, target: { accuracy: 90, speed: 25 }, lines: { ru: [], de: [], en: [] } }
      ]
    },
    {
      id: "module4",
      title: { ru: "Module 4 — Безымянные пальцы", de: "Modul 4 — Ringfinger", en: "Module 4 — Ring Fingers" },
      lessons: [
        { id: "lesson4_1", title: { ru: "Левая рука (Й)", de: "Linke Hand (Q)", en: "Left Hand (Q)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson4_2", title: { ru: "Правая рука (З Х Ъ)", de: "Rechte Hand (P Ü +)", en: "Right Hand (P [ ])" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson4_3", title: { ru: "Нижний ряд (Я Б Ю)", de: "Untere Reihe (Y , .)", en: "Bottom Row (Z , .)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson4_4", title: { ru: "Диагональные переходы", de: "Diagonale Wechsel", en: "Diagonal Transitions" }, target: { lines: 12, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson4_5", title: { ru: "Тест", de: "Test", en: "Test" }, target: { accuracy: 90, speed: 28 }, lines: { ru: [], de: [], en: [] } }
      ]
    },
    {
      id: "module5",
      title: { ru: "Module 5 — Мизинцы и крайние зоны", de: "Modul 5 — Kleine Finger und Außenbereiche", en: "Module 5 — Pinkies and Outer Zones" },
      lessons: [
        { id: "lesson5_1", title: { ru: "Левый мизинец (Shift, Tab, Й)", de: "Linker kleiner Finger (Shift, Tab, Q)", en: "Left Pinky (Shift, Tab, Q)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson5_2", title: { ru: "Правый мизинец (Enter, символы)", de: "Rechter kleiner Finger (Enter, Zeichen)", en: "Right Pinky (Enter, Symbols)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson5_3", title: { ru: "Комбинации (Shift + буквы)", de: "Kombinationen (Shift + Buchstaben)", en: "Combinations (Shift + Letters)" }, target: { lines: 10, accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson5_4", title: { ru: "Слова со сложными переходами", de: "Wörter mit schwierigen Wechseln", en: "Words with Complex Transitions" }, target: { accuracy: 92 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson5_5", title: { ru: "Тест Level 1", de: "Level-1-Test", en: "Level 1 Test" }, target: { accuracy: 90, speed: 30 }, lines: { ru: [], de: [], en: [] } }
      ]
    },
    {
      id: "module6",
      title: { ru: "Module 6 — Цифровой ряд", de: "Modul 6 — Zahlenreihe", en: "Module 6 — Number Row" },
      lessons: [
        { id: "lesson6_1", title: { ru: "1–3", de: "1–3", en: "1–3" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson6_2", title: { ru: "4–6", de: "4–6", en: "4–6" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson6_3", title: { ru: "7–0", de: "7–0", en: "7–0" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson6_4", title: { ru: "Смешанный ввод", de: "Gemischte Eingabe", en: "Mixed Input" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson6_5", title: { ru: "Тест", de: "Test", en: "Test" }, target: { accuracy: 90, speed: 32 }, lines: { ru: [], de: [], en: [] } }
      ]
    },
    {
      id: "module7",
      title: { ru: "Module 7 — Частотные сочетания", de: "Modul 7 — Häufige Kombinationen", en: "Module 7 — Frequent Patterns" },
      lessons: [
        { id: "lesson7_1", title: { ru: "Частые биграммы", de: "Häufige Bigramme", en: "Common Bigrams" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson7_2", title: { ru: "Частые триграммы", de: "Häufige Trigramme", en: "Common Trigrams" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson7_3", title: { ru: "Слоги", de: "Silben", en: "Syllables" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson7_4", title: { ru: "Слова", de: "Wörter", en: "Words" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson7_5", title: { ru: "Тест", de: "Test", en: "Test" }, target: { accuracy: 90, speed: 34 }, lines: { ru: [], de: [], en: [] } }
      ]
    },
    {
      id: "module8",
      title: { ru: "Module 8 — Заглавные буквы (Shift)", de: "Modul 8 — Großbuchstaben (Shift)", en: "Module 8 — Capital Letters (Shift)" },
      lessons: [
        { id: "lesson8_1", title: { ru: "Shift + левая", de: "Shift + links", en: "Shift + Left" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson8_2", title: { ru: "Shift + правая", de: "Shift + rechts", en: "Shift + Right" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson8_3", title: { ru: "Имена", de: "Namen", en: "Names" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson8_4", title: { ru: "Текст", de: "Text", en: "Text" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson8_5", title: { ru: "Тест", de: "Test", en: "Test" }, target: { accuracy: 90, speed: 36 }, lines: { ru: [], de: [], en: [] } }
      ]
    },
    {
      id: "module9",
      title: { ru: "Module 9 — Пунктуация", de: "Modul 9 — Zeichensetzung", en: "Module 9 — Punctuation" },
      lessons: [
        { id: "lesson9_1", title: { ru: "Точка и запятая", de: "Punkt und Komma", en: "Period and Comma" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson9_2", title: { ru: "Двоеточие и тире", de: "Doppelpunkt und Strich", en: "Colon and Dash" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson9_3", title: { ru: "? !", de: "? !", en: "? !" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson9_4", title: { ru: "Тексты", de: "Texte", en: "Texts" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson9_5", title: { ru: "Тест", de: "Test", en: "Test" }, target: { accuracy: 90, speed: 38 }, lines: { ru: [], de: [], en: [] } }
      ]
    },
    {
      id: "module10",
      title: { ru: "Module 10 — Специальные символы", de: "Modul 10 — Sonderzeichen", en: "Module 10 — Special Characters" },
      lessons: [
        { id: "lesson10_1", title: { ru: "Скобки и кавычки", de: "Klammern und Anführungszeichen", en: "Brackets and Quotes" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson10_2", title: { ru: "Операторы (+ - =)", de: "Operatoren (+ - =)", en: "Operators (+ - =)" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson10_3", title: { ru: "Символы текущей раскладки", de: "Symbole der aktuellen Belegung", en: "Current Layout Symbols" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson10_4", title: { ru: "Смешанный ввод", de: "Gemischte Eingabe", en: "Mixed Input" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson10_5", title: { ru: "Тест Level 2", de: "Level-2-Test", en: "Level 2 Test" }, target: { accuracy: 90, speed: 40 }, lines: { ru: [], de: [], en: [] } }
      ]
    },
    {
      id: "module11",
      title: { ru: "Module 11 — Ритм и плавность", de: "Modul 11 — Rhythmus und Fluss", en: "Module 11 — Rhythm and Flow" },
      lessons: [
        { id: "lesson11_1", title: { ru: "Длинные слова", de: "Lange Wörter", en: "Long Words" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson11_2", title: { ru: "Чередование рук", de: "Handwechsel", en: "Alternating Hands" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson11_3", title: { ru: "Повторы", de: "Wiederholungen", en: "Repetitions" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson11_4", title: { ru: "Плавность", de: "Fluss", en: "Flow" }, target: { accuracy: 93 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson11_5", title: { ru: "Тест", de: "Test", en: "Test" }, target: { accuracy: 93, speed: 42 }, lines: { ru: [], de: [], en: [] } }
      ]
    },
    {
      id: "module12",
      title: { ru: "Module 12 — Выносливость", de: "Modul 12 — Ausdauer", en: "Module 12 — Endurance" },
      lessons: [
        { id: "lesson12_1", title: { ru: "Тексты", de: "Texte", en: "Texts" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson12_2", title: { ru: "Литература", de: "Literatur", en: "Literature" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson12_3", title: { ru: "Технические тексты", de: "Technische Texte", en: "Technical Texts" }, target: { accuracy: 90 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson12_4", title: { ru: "2 минуты", de: "2 Minuten", en: "2 Minutes" }, target: { accuracy: 95 }, lines: { ru: [], de: [], en: [] } },
        { id: "lesson12_5", title: { ru: "Финальный тест", de: "Abschlusstest", en: "Final Test" }, target: { accuracy: 95, speed: 40 }, lines: { ru: [], de: [], en: [] } }
      ]
    }
  ]
};
