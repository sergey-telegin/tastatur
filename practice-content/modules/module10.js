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

  function withShiftAndPunctuation(seeds) {
    const marks = [",", ".", "?", "!", "-", ":"];
    return seeds.map(seed => seed.split(/\s+/).map((word, index) => {
      const shifted = index % 4 === 0 ? capitalizeWord(word) : word;
      const mark = marks[index % marks.length];
      if (index % 9 === 2) return `"${shifted}"`;
      if (index % 3 === 2) return `${shifted}${mark}`;
      return shifted;
    }).join(" "));
  }

  const seeds = window.PRACTICE_FREQUENCY_MODULE_SEEDS;

  window.PRACTICE_CONTENT_SOURCE.modules = window.PRACTICE_CONTENT_SOURCE.modules || [];
  window.PRACTICE_CONTENT_SOURCE.modules.push({
    id: "module10",
    title: { ru: "Module 10 — Частотные сочетания + Shift + Пунктуация", de: "Modul 10 — Häufige Kombinationen + Shift + Zeichensetzung", en: "Module 10 — Frequent Patterns + Shift + Punctuation" },
    symbols: { ru: [], de: [], en: [] },
    lessons: [
      {
        id: "lesson10_1",
        title: { ru: "Левая рука", de: "Linke Hand", en: "Left Hand" },
        tips: {
          ru: [
            "В сочетаниях со знаками не делай паузу перед пунктуацией. Подготовь Shift противоположной рукой и продолжай двигаться в темпе метронома."
          ],
          de: [
            "Mach bei Kombinationen mit Zeichen keine Pause vor der Satzsetzung. Bereite Shift mit der gegenüberliegenden Hand vor und bewege dich weiter im Metronomtempo."
          ],
          en: [
            "In combinations with symbols, do not pause before punctuation. Prepare Shift with the opposite hand and keep moving with the metronome."
          ]
        },
        description: { ru: "Биграммы и триграммы", de: "Bigramme und Trigramme", en: "Bigrams and trigrams" },
        symbolPolicy: { scope: "program", pattern: "left-hand-frequency", shift: true, punctuation: true, metronome: true },
        target: { lines: 10, accuracy: 90, rhythmTolerance: 10 },
        lines: { ru: practiceLines(withShiftAndPunctuation(seeds.left.ru)), de: practiceLines(withShiftAndPunctuation(seeds.left.de)), en: practiceLines(withShiftAndPunctuation(seeds.left.en)) }
      },
      {
        id: "lesson10_2",
        title: { ru: "Правая рука", de: "Rechte Hand", en: "Right Hand" },
        tips: {
          ru: [
            "Пунктуация должна быть такой же лёгкой, как буквы. Не бей по знакам сильнее и не задерживай пальцы на Shift."
          ],
          de: [
            "Satzzeichen sollen sich genauso leicht anfühlen wie Buchstaben. Schlage Zeichen nicht härter an und halte die Finger nicht auf Shift fest."
          ],
          en: [
            "Punctuation should feel as light as letters. Do not hit symbols harder, and do not leave your fingers stuck on Shift."
          ]
        },
        description: { ru: "Биграммы и триграммы", de: "Bigramme und Trigramme", en: "Bigrams and trigrams" },
        symbolPolicy: { scope: "program", pattern: "right-hand-frequency", shift: true, punctuation: true, metronome: true },
        target: { lines: 10, accuracy: 90, rhythmTolerance: 10 },
        lines: { ru: practiceLines(withShiftAndPunctuation(seeds.right.ru)), de: practiceLines(withShiftAndPunctuation(seeds.right.de)), en: practiceLines(withShiftAndPunctuation(seeds.right.en)) }
      },
      {
        id: "lesson10_3",
        title: { ru: "Смешанные сочетания", de: "Gemischte Kombinationen", en: "Mixed Patterns" },
        tips: {
          ru: [
            "Когда в строке есть регистр и знаки, держи один порядок: увидеть сочетание, нажать нужный Shift другой рукой, сразу вернуться в базу."
          ],
          de: [
            "Wenn eine Zeile Großschreibung und Zeichen enthält, halte eine klare Reihenfolge: Kombination sehen, die passende Shift-Taste mit der anderen Hand drücken, sofort zurück in die Grundposition."
          ],
          en: [
            "When a line has capitalization and symbols, keep one order: see the combination, press the needed Shift with the other hand, return to base right away."
          ]
        },
        description: { ru: "Работа обеих рук", de: "Arbeit beider Hände", en: "Both hands" },
        symbolPolicy: { scope: "program", pattern: "mixed-frequency", shift: true, punctuation: true, metronome: true },
        target: { lines: 10, accuracy: 90, rhythmTolerance: 10 },
        lines: { ru: practiceLines(withShiftAndPunctuation(seeds.mixed.ru)), de: practiceLines(withShiftAndPunctuation(seeds.mixed.de)), en: practiceLines(withShiftAndPunctuation(seeds.mixed.en)) }
      },
      {
        id: "lesson10_4",
        title: { ru: "Практика на выносливость", de: "Ausdauerübung", en: "Endurance Practice" },
        tips: {
          ru: [
            "На выносливости не пытайся выиграть у метронома. Длинные строки проверяют стабильность: ровный темп, чистые знаки, минимум лишних движений."
          ],
          de: [
            "Versuche in der Ausdauerübung nicht, gegen das Metronom zu gewinnen. Lange Zeilen prüfen Stabilität: gleichmäßiges Tempo, saubere Zeichen, möglichst wenig unnötige Bewegung."
          ],
          en: [
            "In endurance practice, do not try to beat the metronome. Long lines test stability: steady pace, clean symbols, minimal extra movement."
          ]
        },
        description: { ru: "15 строк и режим чередования строк", de: "15 Zeilen und jede zweite Zeile", en: "15 lines and alternating-line mode" },
        symbolPolicy: { scope: "program", pattern: "endurance-frequency", shift: true, punctuation: true, metronome: true },
        target: { lines: 15, accuracy: 90, rhythmTolerance: 10, alternateLines: true },
        lines: { ru: practiceLines(withShiftAndPunctuation(seeds.endurance.ru)), de: practiceLines(withShiftAndPunctuation(seeds.endurance.de)), en: practiceLines(withShiftAndPunctuation(seeds.endurance.en)) }
      },
      {
        id: "lesson10_5",
        title: { ru: "Тест", de: "Test", en: "Test" },
        tips: {
          ru: [
            "Финальный тест собирает ритм, Shift и пунктуацию вместе. Ассистенты выключены, но метроном остаётся твоей опорой: слушай темп и печатай спокойно."
          ],
          de: [
            "Der Abschlusstest bringt Rhythmus, Shift und Satzzeichen zusammen. Die Assistenten sind ausgeschaltet, aber das Metronom bleibt deine Stütze: Hör auf den Takt und tippe ruhig."
          ],
          en: [
            "The final test brings rhythm, Shift, and punctuation together. Assistants are off, but the metronome remains your support: listen to the beat and type calmly."
          ]
        },
        description: { ru: "Все пройденные сочетания", de: "Alle geübten Kombinationen", en: "All practiced patterns" },
        completion: {
          ru: "Похоже, пришло время прощаться. Я рассказал тебе всё главное о слепой печати: базовые позиции, ряды, Shift, цифры, пунктуацию и ритм. Дальше всё зависит от практики и от того, как часто ты будешь использовать навык в реальной работе. Помни: настоящая скорость приходит не от спешки, а от спокойных и точных движений. Продолжай печатать вслепую в обычной жизни, меньше смотри на клавиатуру и доверяй своим пальцам. У тебя уже есть всё, чтобы расти дальше.",
          de: "Es ist Zeit, Abschied zu nehmen. Ich habe dir das Wichtigste über Blindtippen gezeigt: Grundposition, Reihen, Shift, Zahlen, Zeichensetzung und Rhythmus. Ab jetzt hängt viel von deiner Übung und davon ab, wie oft du diese Fähigkeit im Alltag benutzt. Denk daran: Echte Geschwindigkeit entsteht nicht durch Eile, sondern durch ruhige und genaue Bewegungen. Tippe weiter blind, schau seltener auf die Tastatur und vertraue deinen Fingern.",
          en: "It is time to say goodbye. I have shown you the essentials of touch typing: home position, rows, Shift, numbers, punctuation, and rhythm. From here, progress depends on practice and on how often you use the skill in real work. Remember: real speed does not come from rushing, but from calm, precise movement. Keep touch typing in everyday life, look at the keyboard less, and trust your fingers.",
          uk: "Схоже, настав час прощатися. Я показав найважливіше у сліпому друці: базову позицію, ряди, Shift, цифри, пунктуацію й ритм. Далі все залежить від практики та від того, як часто ви використовуватимете цю навичку в реальній роботі. Пам'ятайте: справжня швидкість приходить не від поспіху, а від спокійних і точних рухів. Друкуйте всліпу в повсякденному житті, менше дивіться на клавіатуру й довіряйте пальцям.",
          kk: "Қоштасатын уақыт келген сияқты. Мен сізге соқыр терудің ең маңызды бөліктерін көрсеттім: негізгі позиция, қатарлар, Shift, сандар, тыныс белгілері және ырғақ. Енді бәрі жаттығуға және бұл дағдыны күнделікті жұмыста қаншалықты жиі қолданатыныңызға байланысты. Есіңізде болсын: шынайы жылдамдық асығудан емес, сабырлы әрі дәл қозғалыстан келеді. Пернетақтаға азырақ қарап, саусақтарыңызға сеніңіз."
        },
        symbolPolicy: { scope: "program", pattern: "frequency-test", shift: true, punctuation: true, metronome: true },
        target: { lines: 20, accuracy: 95, rhythmTolerance: 10, assistants: false },
        lines: { ru: practiceLines(withShiftAndPunctuation(seeds.test.ru)), de: practiceLines(withShiftAndPunctuation(seeds.test.de)), en: practiceLines(withShiftAndPunctuation(seeds.test.en)) }
      }
    ]
  });
})();
