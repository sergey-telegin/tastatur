(() => {
  function practiceLine(seed) {
    const words = seed.trim().split(/\s+/);
    let text = words.join(" ");

    while (text.length < 118) {
      text = `${text} ${words.join(" ")}`;
    }

    if (text.length > 130) {
      text = text.slice(0, 130).replace(/\s+\S*$/, "");
    }

    return text;
  }

  function practiceLines(seeds) {
    return seeds.map(practiceLine);
  }

  function capitalizeWord(word) {
    return word ? `${word[0].toUpperCase()}${word.slice(1)}` : word;
  }

  function withShift(seeds) {
    return seeds.map(seed => seed.split(/\s+/).map((word, index) => (
      index % 4 === 0 ? capitalizeWord(word) : word
    )).join(" "));
  }

  const seeds = window.PRACTICE_FREQUENCY_MODULE_SEEDS;

  window.PRACTICE_CONTENT_SOURCE.modules = window.PRACTICE_CONTENT_SOURCE.modules || [];
  window.PRACTICE_CONTENT_SOURCE.modules.push({
    id: "module9",
    title: { ru: "Модуль 9 — Частотные сочетания + Shift", de: "Modul 9 — Häufige Kombinationen + Shift", en: "Module 9 — Frequent Patterns + Shift" },
    symbols: { ru: [], de: [], en: [] },
    lessons: [
      {
        id: "lesson9_1",
        title: { ru: "Левая рука", de: "Linke Hand", en: "Left Hand" },
        tips: {
          ru: [
            "В сочетаниях с заглавными буквами заранее готовь противоположный Shift, но не зажимай его дольше нужного. Ритм должен оставаться таким же ровным, как в обычных сочетаниях."
          ],
          de: [
            "Bereite bei Kombinationen mit Großbuchstaben die gegenüberliegende Shift-Taste früh vor, halte sie aber nicht länger als nötig. Der Rhythmus soll genauso gleichmäßig bleiben wie bei normalen Kombinationen."
          ],
          en: [
            "For combinations with capital letters, prepare the opposite Shift in advance, but do not hold it longer than needed. The rhythm should stay as even as in normal combinations."
          ]
        },
        description: { ru: "Биграммы и триграммы", de: "Bigramme und Trigramme", en: "Bigrams and trigrams" },
        symbolPolicy: { scope: "program", pattern: "left-hand-frequency", shift: true, metronome: true },
        target: { lines: 10, accuracy: 90, rhythmTolerance: 10 },
        lines: { ru: practiceLines(withShift(seeds.left.ru)), de: practiceLines(withShift(seeds.left.de)), en: practiceLines(withShift(seeds.left.en)) }
      },
      {
        id: "lesson9_2",
        title: { ru: "Правая рука", de: "Rechte Hand", en: "Right Hand" },
        tips: {
          ru: [
            "Не позволяй Shift ломать метроном. Сначала попади в темп и только потом аккуратно добавляй регистр."
          ],
          de: [
            "Lass Shift das Metronom nicht brechen. Triff zuerst den Takt und füge dann vorsichtig die Großschreibung hinzu."
          ],
          en: [
            "Do not let Shift break the metronome. First land on the beat, then carefully add capitalization."
          ]
        },
        description: { ru: "Биграммы и триграммы", de: "Bigramme und Trigramme", en: "Bigrams and trigrams" },
        symbolPolicy: { scope: "program", pattern: "right-hand-frequency", shift: true, metronome: true },
        target: { lines: 10, accuracy: 90, rhythmTolerance: 10 },
        lines: { ru: practiceLines(withShift(seeds.right.ru)), de: practiceLines(withShift(seeds.right.de)), en: practiceLines(withShift(seeds.right.en)) }
      },
      {
        id: "lesson9_3",
        title: { ru: "Смешанные сочетания", de: "Gemischte Kombinationen", en: "Mixed Patterns" },
        tips: {
          ru: [
            "Когда работают обе руки, думай не о каждой клавише отдельно, а о коротком движении целиком: сочетание, возврат в базу, следующий удар метронома."
          ],
          de: [
            "Wenn beide Hände arbeiten, denke nicht an jede Taste einzeln, sondern an die kurze Bewegung als Ganzes: Kombination, zurück in die Grundposition, nächster Metronomschlag."
          ],
          en: [
            "When both hands are working, do not think about each key separately. Think of the whole short movement: combination, return to base, next metronome beat."
          ]
        },
        description: { ru: "Работа обеих рук", de: "Arbeit beider Hände", en: "Both hands" },
        symbolPolicy: { scope: "program", pattern: "mixed-frequency", shift: true, metronome: true },
        target: { lines: 10, accuracy: 90, rhythmTolerance: 10 },
        lines: { ru: practiceLines(withShift(seeds.mixed.ru)), de: practiceLines(withShift(seeds.mixed.de)), en: practiceLines(withShift(seeds.mixed.en)) }
      },
      {
        id: "lesson9_4",
        title: { ru: "Практика на выносливость", de: "Ausdauerübung", en: "Endurance Practice" },
        tips: {
          ru: [
            "На длинной практике с Shift береги руки: короткое нажатие, короткий отпуск, спокойный возврат. Так заглавные не превращаются в лишнее напряжение."
          ],
          de: [
            "Schone deine Hände in langen Übungen mit Shift: kurz drücken, kurz loslassen, ruhig zurückkehren. So werden Großbuchstaben nicht zu zusätzlicher Spannung."
          ],
          en: [
            "In long Shift practice, protect your hands: short press, quick release, calm return. That keeps capitals from turning into extra tension."
          ]
        },
        description: { ru: "15 строк и режим чередования строк", de: "15 Zeilen und jede zweite Zeile", en: "15 lines and alternating-line mode" },
        symbolPolicy: { scope: "program", pattern: "endurance-frequency", shift: true, metronome: true },
        target: { lines: 15, accuracy: 90, rhythmTolerance: 10, alternateLines: true },
        lines: { ru: practiceLines(withShift(seeds.endurance.ru)), de: practiceLines(withShift(seeds.endurance.de)), en: practiceLines(withShift(seeds.endurance.en)) }
      },
      {
        id: "lesson9_5",
        title: { ru: "Тест", de: "Test", en: "Test" },
        tips: {
          ru: [
            "В тесте остаётся только метроном. Пусть он держит темп, а пальцы сами вспоминают сочетания и работу с Shift."
          ],
          de: [
            "Im Test bleibt nur das Metronom. Lass es das Tempo halten, während die Finger die Kombinationen und die Arbeit mit Shift selbst abrufen."
          ],
          en: [
            "In the test, only the metronome remains. Let it hold the pace while your fingers remember the combinations and Shift work on their own."
          ]
        },
        description: { ru: "Все пройденные сочетания", de: "Alle geübten Kombinationen", en: "All practiced patterns" },
        symbolPolicy: { scope: "program", pattern: "frequency-test", shift: true, metronome: true },
        target: { lines: 20, accuracy: 95, rhythmTolerance: 10, assistants: false },
        lines: { ru: practiceLines(withShift(seeds.test.ru)), de: practiceLines(withShift(seeds.test.de)), en: practiceLines(withShift(seeds.test.en)) }
      }
    ]
  });
})();
