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

  window.PRACTICE_CONTENT_SOURCE.modules = window.PRACTICE_CONTENT_SOURCE.modules || [];
  window.PRACTICE_CONTENT_SOURCE.modules.push({
    id: "module6",
    title: { ru: "Модуль 6 — Верхний ряд + Цифры", de: "Modul 6 — Obere Reihe + Zahlen", en: "Module 6 — Top Row + Numbers" },
    symbols: {
      ru: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      de: ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      en: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    },
    lessons: [
      {
        id: "lesson6_1",
        title: { ru: "Левая сторона", de: "Linke Seite", en: "Left Side" },
        tips: {
          ru: [
            "Не тянись к цифрам всей рукой. До верхнего ряда должны дотягиваться пальцы, а кисть оставаться в своей обычной позиции — так ты не потеряешь ориентацию после цифр."
          ],
          de: [
            "Greif nicht mit der ganzen Hand zu den Zahlen. Die Finger sollen die obere Reihe erreichen, während die Hand in ihrer normalen Position bleibt - so verlierst du nach den Zahlen nicht die Orientierung."
          ],
          en: [
            "Do not reach for numbers with your whole hand. Your fingers should reach the top row while the hand stays in its usual position - that way you will not lose orientation after typing numbers."
          ]
        },
        symbolPolicy: {
          scope: "lesson",
          ru: ["й", "ц", "у", "к", "е", "1", "2", "3", "4", "5"],
          de: ["q", "w", "e", "r", "t", "1", "2", "3", "4", "5"],
          en: ["q", "w", "e", "r", "t", "1", "2", "3", "4", "5"]
        },
        content: { lineCount: 5 },
      scoring: { accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "йцуке 12345 йцуке 12345 54321 екуцй йцуке 12345 54321 екуцй йцуке 12345",
            "й1 ц2 у3 к4 е5 й1 ц2 у3 к4 е5 й1 ц2 у3 к4 е5 й1 ц2 у3 к4 е5",
            "1й 2ц 3у 4к 5е 1й 2ц 3у 4к 5е 1й 2ц 3у 4к 5е 1й 2ц 3у 4к 5е",
            "йй 11 цц 22 уу 33 кк 44 ее 55 йй 11 цц 22 уу 33 кк 44 ее 55",
            "йцуке 12345 уке 234 ке 45 йц 12 йцуке 12345 уке 234 ке 45 йц 12"
          ]),
          de: practiceLines([
            "qwert 12345 qwert 12345 54321 trewq qwert 12345 54321 trewq qwert 12345",
            "q1 w2 e3 r4 t5 q1 w2 e3 r4 t5 q1 w2 e3 r4 t5 q1 w2 e3 r4 t5",
            "1q 2w 3e 4r 5t 1q 2w 3e 4r 5t 1q 2w 3e 4r 5t 1q 2w 3e 4r 5t",
            "qq 11 ww 22 ee 33 rr 44 tt 55 qq 11 ww 22 ee 33 rr 44 tt 55",
            "qwert 12345 ert 234 rt 45 qw 12 qwert 12345 ert 234 rt 45 qw 12"
          ]),
          en: practiceLines([
            "qwert 12345 qwert 12345 54321 trewq qwert 12345 54321 trewq qwert 12345",
            "q1 w2 e3 r4 t5 q1 w2 e3 r4 t5 q1 w2 e3 r4 t5 q1 w2 e3 r4 t5",
            "1q 2w 3e 4r 5t 1q 2w 3e 4r 5t 1q 2w 3e 4r 5t 1q 2w 3e 4r 5t",
            "qq 11 ww 22 ee 33 rr 44 tt 55 qq 11 ww 22 ee 33 rr 44 tt 55",
            "qwert 12345 ert 234 rt 45 qw 12 qwert 12345 ert 234 rt 45 qw 12"
          ])
        }
      },
      {
        id: "lesson6_2",
        title: { ru: "Правая сторона", de: "Rechte Seite", en: "Right Side" },
        tips: {
          ru: [
            "После нажатия цифры сразу возвращай палец в базу. Иначе руки начинают «уплывать» вверх, и следующие буквы становятся менее точными."
          ],
          de: [
            "Bring den Finger nach jeder Zahl sofort zurück in die Grundposition. Sonst wandern die Hände nach oben, und die nächsten Buchstaben werden ungenauer."
          ],
          en: [
            "Return the finger to base immediately after pressing a number. Otherwise the hands start drifting upward, and the next letters become less accurate."
          ]
        },
        symbolPolicy: {
          scope: "lesson",
          ru: ["н", "г", "ш", "щ", "з", "х", "ъ", "6", "7", "8", "9", "0"],
          de: ["z", "u", "i", "o", "p", "ü", "6", "7", "8", "9", "0"],
          en: ["y", "u", "i", "o", "p", "6", "7", "8", "9", "0"]
        },
        content: { lineCount: 5 },
        scoring: { accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "нгшщзхъ 67890 нгшщзхъ 67890 09876 ъхзщшгн нгшщзхъ 67890",
            "н6 г7 ш8 щ9 з0 н6 г7 ш8 щ9 з0 н6 г7 ш8 щ9 з0 н6 г7 ш8 щ9 з0",
            "6н 7г 8ш 9щ 0з 6н 7г 8ш 9щ 0з 6н 7г 8ш 9щ 0з 6н 7г 8ш 9щ 0з",
            "нн 66 гг 77 шш 88 щщ 99 зз 00 хх 99 ъъ 00 нн 66 гг 77 шш 88",
            "нгшщзхъ 67890 шщз 890 нг 67 хъ 90 нгшщзхъ 67890 шщз 890 нг 67"
          ]),
          de: practiceLines([
            "zuiopü 67890 zuiopü 67890 09876 üpoiuz zuiopü 67890 09876 üpoiuz",
            "z6 u7 i8 o9 p0 z6 u7 i8 o9 p0 z6 u7 i8 o9 p0 z6 u7 i8 o9 p0",
            "6z 7u 8i 9o 0p 6z 7u 8i 9o 0p 6z 7u 8i 9o 0p 6z 7u 8i 9o 0p",
            "zz 66 uu 77 ii 88 oo 99 pp 00 üü 99 zz 66 uu 77 ii 88 oo 99",
            "zuiopü 67890 iop 890 zu 67 pü 90 zuiopü 67890 iop 890 zu 67"
          ]),
          en: practiceLines([
            "yuiop 67890 yuiop 67890 09876 poiuy yuiop 67890 09876 poiuy yuiop",
            "y6 u7 i8 o9 p0 y6 u7 i8 o9 p0 y6 u7 i8 o9 p0 y6 u7 i8 o9 p0",
            "6y 7u 8i 9o 0p 6y 7u 8i 9o 0p 6y 7u 8i 9o 0p 6y 7u 8i 9o 0p",
            "yy 66 uu 77 ii 88 oo 99 pp 00 yy 66 uu 77 ii 88 oo 99 pp 00",
            "yuiop 67890 iop 890 yu 67 op 90 yuiop 67890 iop 890 yu 67"
          ])
        }
      },
      {
        id: "lesson6_3",
        title: { ru: "Весь цифровой ряд", de: "Ganze Zahlenreihe", en: "Full Number Row" },
        tips: {
          ru: [
            "Не смотри на цифровой ряд глазами. Цифры должны запоминаться как продолжение своих колонок, а не как отдельный мир над клавиатурой."
          ],
          de: [
            "Schau nicht mit den Augen auf die Zahlenreihe. Die Zahlen sollen sich wie eine Fortsetzung der Finger-Spalten anfühlen, nicht wie eine eigene Welt über der Tastatur."
          ],
          en: [
            "Do not look at the number row. Numbers should be remembered as an extension of your finger columns, not as a separate world above the keyboard."
          ]
        },
        symbolPolicy: {
          scope: "module",
          ru: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          de: ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          en: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
        },
        content: { lineCount: 5 },
        scoring: { accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "йцуке нгшщзхъ 12345 67890 йцуке нгшщзхъ 12345 67890 09876 54321",
            "й1 ц2 у3 к4 е5 н6 г7 ш8 щ9 з0 й1 ц2 у3 к4 е5 н6 г7 ш8 щ9 з0",
            "1й 2ц 3у 4к 5е 6н 7г 8ш 9щ 0з 1й 2ц 3у 4к 5е 6н 7г 8ш 9щ 0з",
            "йцу 123 ке 45 нгш 678 щзх 890 йцу 123 ке 45 нгш 678 щзх 890",
            "12345 йцуке 67890 нгшщзхъ 54321 екуцй 09876 ъхзщшгн 12345 йцуке"
          ]),
          de: practiceLines([
            "qwert zuiopü 12345 67890 qwert zuiopü 12345 67890 09876 54321",
            "q1 w2 e3 r4 t5 z6 u7 i8 o9 p0 q1 w2 e3 r4 t5 z6 u7 i8 o9 p0",
            "1q 2w 3e 4r 5t 6z 7u 8i 9o 0p 1q 2w 3e 4r 5t 6z 7u 8i 9o 0p",
            "qwe 123 rt 45 zui 678 opü 890 qwe 123 rt 45 zui 678 opü 890",
            "12345 qwert 67890 zuiopü 54321 trewq 09876 üpoiuz 12345 qwert"
          ]),
          en: practiceLines([
            "qwert yuiop 12345 67890 qwert yuiop 12345 67890 09876 54321",
            "q1 w2 e3 r4 t5 y6 u7 i8 o9 p0 q1 w2 e3 r4 t5 y6 u7 i8 o9 p0",
            "1q 2w 3e 4r 5t 6y 7u 8i 9o 0p 1q 2w 3e 4r 5t 6y 7u 8i 9o 0p",
            "qwe 123 rt 45 yui 678 op 890 qwe 123 rt 45 yui 678 op 890",
            "12345 qwert 67890 yuiop 54321 trewq 09876 poiuy 12345 qwert"
          ])
        }
      },
      {
        id: "lesson6_4",
        title: { ru: "Смешанный ввод", de: "Gemischte Eingabe", en: "Mixed Input" },
        tips: {
          ru: [
            "Когда в строке смешаны буквы и цифры, не меняй посадку рук. Нажал цифру, вернулся в базу, продолжил печатать буквы тем же спокойным ритмом."
          ],
          de: [
            "Wenn Buchstaben und Zahlen in einer Zeile gemischt sind, ändere die Handhaltung nicht. Zahl drücken, zurück in die Grundposition, dann die Buchstaben im selben ruhigen Rhythmus weiter tippen."
          ],
          en: [
            "When a line mixes letters and numbers, do not change your hand position. Press the number, return to base, and keep typing the letters in the same calm rhythm."
          ]
        },
        symbolPolicy: {
          scope: "module",
          ru: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          de: ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          en: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
        },
        content: { lineCount: 5 },
        scoring: { accuracy: 90, speed: 40 },
        lines: {
          ru: practiceLines([
            "й1 ц2 у3 к4 е5 н6 г7 ш8 щ9 з0 йцуке 12345 нгшщзхъ 67890",
            "123 йцу 456 кен 789 гшщ 90 зхъ 123 йцу 456 кен 789 гшщ 90 зхъ",
            "йцуке 12 нгшщ 34 зхъ 56 йцуке 78 нгшщ 90 йцуке 12 нгшщ 34",
            "1йцу 2цук 3уке 4кен 5енг 6нгш 7гшщ 8шщз 9щзх 0зхъ",
            "12345 йцуке 67890 нгшщзхъ й1 ц2 у3 к4 е5 н6 г7 ш8 щ9 з0"
          ]),
          de: practiceLines([
            "q1 w2 e3 r4 t5 z6 u7 i8 o9 p0 qwert 12345 zuiopü 67890",
            "123 qwe 456 rtz 789 uio 90 pü 123 qwe 456 rtz 789 uio 90 pü",
            "qwert 12 zuiop 34 pü 56 qwert 78 zuiop 90 qwert 12 zuiop 34",
            "1qwe 2wer 3ert 4rtz 5tzu 6zui 7uio 8iop 9opü 0püz",
            "12345 qwert 67890 zuiopü q1 w2 e3 r4 t5 z6 u7 i8 o9 p0"
          ]),
          en: practiceLines([
            "q1 w2 e3 r4 t5 y6 u7 i8 o9 p0 qwert 12345 yuiop 67890",
            "123 qwe 456 rty 789 uio 90 op 123 qwe 456 rty 789 uio 90 op",
            "qwert 12 yuiop 34 op 56 qwert 78 yuiop 90 qwert 12 yuiop 34",
            "1qwe 2wer 3ert 4rty 5tyu 6yui 7uio 8iop 9opy 0pyu",
            "12345 qwert 67890 yuiop q1 w2 e3 r4 t5 y6 u7 i8 o9 p0"
          ])
        }
      },
      {
        id: "lesson6_5",
        title: { ru: "Тест", de: "Test", en: "Test" },
        tips: {
          ru: [
            "В тесте цифровой ряд проверяется вместе с буквами. Доверяй колонкам пальцев и возвращайся в базовую позицию после каждого подъёма вверх."
          ],
          de: [
            "Im Test wird die Zahlenreihe zusammen mit den Buchstaben geprüft. Vertraue den Finger-Spalten und kehre nach jedem Griff nach oben in die Grundposition zurück."
          ],
          en: [
            "In the test, the number row is checked together with letters. Trust your finger columns and return to the base position after every reach upward."
          ]
        },
        symbolPolicy: {
          scope: "program",
          shift: true,
          digits: true,
          ru: ["а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
          de: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
          en: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        },
        content: { lineCount: 10 },
        scoring: { accuracy: 90, speed: 40, assistants: false },
        lines: {
          ru: practiceLines([
            "Анна пишет 12 строк Мила читает 34 слова Вера учит 56 букв Нина знает 78 клавиш",
            "фыва олджэ кеап гнор мить йцуке 12345 нгшщзхъ 67890 ячсми тьбю",
            "12345 мама папа тема 67890 вода лава жало 54321 овал книга нора",
            "й1 ц2 у3 к4 е5 н6 г7 ш8 щ9 з0 Анна Вера Мила Ира Нина",
            "прыжок 15 крышка 24 мышка 33 нитка 42 карта 51 ветка 60 ручка",
            "Яна читает 10 строк Ира пишет 20 слов Оля учит 30 букв Вера знает",
            "123 йцу 456 кен 789 гшщ 90 зхъ мама папа тема вода лава",
            "Фа Йа Ву Км Па Се Он Рн Го Шл Щд Зж 12345 67890",
            "книга 1 нора 2 гора 3 тема 4 мир 5 тир 6 рот 7 тон 8",
            "Анна Вера Мила Ира Нина Лада Эля Оля Яна 12345 йцуке 67890"
          ]),
          de: practiceLines([
            "Anna schreibt 12 zeilen Mila liest 34 worte Vera lernt 56 tasten Nina kennt 78",
            "asdf jklöä rtfg uzjh vbnm qwert 12345 zuiopü 67890 yxcvb nm",
            "12345 rat gut rot ton 67890 mut rum nur hut 54321 fern form gern",
            "q1 w2 e3 r4 t5 z6 u7 i8 o9 p0 Anna Vera Mila Ira Nina",
            "sprung 15 brücke 24 mixen 33 tasten 42 warten 51 suchen 60 ziehen",
            "Lara liest 10 zeilen Ira schreibt 20 worte Olga lernt 30 tasten Vera kennt",
            "123 qwe 456 rtz 789 uio 90 pü rat gut rot ton mut rum",
            "Fa Qa De Rv Gt Cy Jz Hz Uj Ik Ol Pö 12345 67890",
            "form 1 fern 2 gern 3 gurt 4 mut 5 rum 6 nur 7 hut 8",
            "Anna Vera Mila Ira Nina Lara Ella Olga 12345 qwert 67890 zuiopü"
          ]),
          en: practiceLines([
            "Anna writes 12 lines Mila reads 34 words Vera learns 56 keys Nina knows 78",
            "asdf jkl rtfg uyjh vbnm qwert 12345 yuiop 67890 zxcvb nm",
            "12345 run rug hut hum 67890 turn burn hurt hunt 54321 front form grunt",
            "q1 w2 e3 r4 t5 y6 u7 i8 o9 p0 Anna Vera Mila Ira Nina",
            "jumping 15 bridge 24 mixed 33 typing 42 waiting 51 seeking 60 moving",
            "Lara reads 10 lines Ira writes 20 words Olga learns 30 keys Vera knows",
            "123 qwe 456 rty 789 uio 90 op run rug hut hum turn burn",
            "Fa Qa De Rv Gt Cz Jy Hy Uj Ik Ol Pk 12345 67890",
            "form 1 front 2 grunt 3 turn 4 hum 5 burn 6 hurt 7 hunt 8",
            "Anna Vera Mila Ira Nina Lara Ella Olga 12345 qwert 67890 yuiop"
          ])
        }
      }
    ]
  });
})();
