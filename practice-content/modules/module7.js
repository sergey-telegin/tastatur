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
    id: "module7",
    title: { ru: "Модуль 7 — Пунктуация", de: "Modul 7 — Zeichensetzung", en: "Module 7 — Punctuation" },
    symbols: {
      ru: [".", ",", "!", "?", "-", ":", "\""],
      de: [".", ",", "!", "?", "-", ":", "\""],
      en: [".", ",", "!", "?", "-", ":", "\""]
    },
    lessons: [
      {
        id: "lesson7_1",
        title: { ru: "Точка и запятая", de: "Punkt und Komma", en: "Period and Comma" },
        tips: {
          ru: [
            "Учись воспринимать знак вместе со словом, а не как отдельное действие. Тогда пальцы начинают печатать фразы плавно, без остановок перед запятыми и точками."
          ],
          de: [
            "Lerne, ein Zeichen zusammen mit dem Wort wahrzunehmen, nicht als eigene Aktion. Dann beginnen die Finger, Sätze flüssig zu tippen, ohne vor Kommas oder Punkten anzuhalten."
          ],
          en: [
            "Learn to treat a punctuation mark as part of the word, not as a separate action. Then your fingers start typing phrases smoothly, without stopping before commas and periods."
          ]
        },
        symbolPolicy: {
          scope: "lesson",
          punctuation: [".", ","],
          placeholders: ["X", "Y"]
        },
        content: { lineCount: 10 },
      scoring: { accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "мама, папа. тема, вода. лава, книга. нора, гора. мир, тир. рот, тон.",
            "анна, вера. мила, ира. нина, оля. лада, эля. яна, ира. анна, вера.",
            "книга, ручка. точка, мячик. ветка, нитка. карта, мышка. ручка, книга.",
            "утро, тихо. анна, дома. вера, рядом. мила, читает. ира, пишет.",
            "йцуке, нгшщзхъ. кеап, гнор. мить, ячсми. тьбю, фыва.",
            "прыжок, крышка. мышка, нитка. карта, ветка. ручка, точка. сучок, мячик.",
            "мама папа, тема вода. лава жало, овал лад. вдова элла, эд яна.",
            "кит, мир. тир, рот. тон, нора. гора, тема. папа, мама.",
            "мяч, час. тьма, туча. бита, юла. мяс, тишь. мим, мяч.",
            "анна пишет, мила читает. вера учит, нина знает. оля рисует, лада дома."
          ]),
          de: practiceLines([
            "mama, papa. thema, wasser. lava, buch. nora, berg. mir, tier. rot, ton.",
            "anna, vera. mila, ira. nina, olga. lara, ella. jana, ira. anna, vera.",
            "buch, stift. punkt, ball. ast, faden. karte, maus. stift, buch.",
            "morgen, leise. anna, da. vera, nah. mila, liest. ira, schreibt.",
            "qwert, zuiopü. rtfg, uzjh. vbnm, yxcvb. nm, asdf.",
            "sprung, brücke. maus, faden. karte, ast. stift, punkt. ball, buch.",
            "mama papa, thema wasser. lava glas, oval lad. anna vera, mila ira.",
            "rat, gut. rot, ton. mut, rum. nur, hut. fern, form.",
            "mix, nix. vim, bin. min, my. row, word. finger, reihe.",
            "anna schreibt, mila liest. vera lernt, nina weiss. olga malt, lara da."
          ]),
          en: practiceLines([
            "mama, papa. theme, water. lava, book. nora, hill. mir, tier. rot, tone.",
            "anna, vera. mila, ira. nina, olga. lara, ella. yana, ira. anna, vera.",
            "book, pen. point, ball. branch, thread. chart, mouse. pen, book.",
            "morning, quiet. anna, home. vera, near. mila, reads. ira, writes.",
            "qwert, yuiop. rtfg, uyjh. vbnm, zxcvb. nm, asdf.",
            "jumping, bridge. mouse, thread. chart, branch. pen, point. ball, book.",
            "mama papa, theme water. lava glass, oval lad. anna vera, mila ira.",
            "run, rug. hut, hum. turn, burn. hurt, hunt. front, form.",
            "mix, nix. vim, bin. min, my. row, word. finger, bridge.",
            "anna writes, mila reads. vera learns, nina knows. olga draws, lara home."
          ])
        }
      },
      {
        id: "lesson7_2",
        title: { ru: "Вопрос и восклицание", de: "Frage und Ausruf", en: "Question and Exclamation" },
        tips: {
          ru: [
            "На символах с Shift не зажимай обе руки. Одна рука держит Shift, а другая свободно нажимает знак — так движения остаются быстрыми и чистыми."
          ],
          de: [
            "Bei Zeichen mit Shift solltest du nicht beide Hände verkrampfen. Eine Hand hält Shift, die andere drückt das Zeichen frei - so bleiben die Bewegungen schnell und sauber."
          ],
          en: [
            "For symbols that use Shift, do not tense both hands. One hand holds Shift while the other freely presses the symbol - this keeps movement quick and clean."
          ]
        },
        symbolPolicy: {
          scope: "lesson",
          shift: true,
          punctuation: ["!", "?"],
          placeholders: ["X", "Y"]
        },
        content: { lineCount: 10 },
        scoring: { accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "мама! папа? тема! вода? лава! книга? нора! гора? мир! тир?",
            "анна? вера! мила? ира! нина? оля! лада? эля! яна? ира!",
            "книга? ручка! точка? мячик! ветка? нитка! карта? мышка!",
            "утро! тихо? анна! дома? вера! рядом? мила! читает?",
            "йцуке! нгшщзхъ? кеап! гнор? мить! ячсми? тьбю! фыва?",
            "прыжок! крышка? мышка! нитка? карта! ветка? ручка! точка?",
            "мама папа! тема вода? лава жало! овал лад? вдова элла!",
            "кит? мир! тир? рот! тон? нора! гора? тема! папа? мама!",
            "мяч! час? тьма! туча? бита! юла? мяс! тишь? мим! мяч?",
            "анна пишет? мила читает! вера учит? нина знает! оля рисует?"
          ]),
          de: practiceLines([
            "mama! papa? thema! wasser? lava! buch? nora! berg? mir! tier?",
            "anna? vera! mila? ira! nina? olga! lara? ella! jana? ira!",
            "buch? stift! punkt? ball! ast? faden! karte? maus!",
            "morgen! leise? anna! da? vera! nah? mila! liest?",
            "qwert! zuiopü? rtfg! uzjh? vbnm! yxcvb? nm! asdf?",
            "sprung! brücke? maus! faden? karte! ast? stift! punkt?",
            "mama papa! thema wasser? lava glas! oval lad? anna vera!",
            "rat? gut! rot? ton! mut? rum! nur? hut! fern? form!",
            "mix! nix? vim! bin? min! my? row! wort? finger! reihe?",
            "anna schreibt? mila liest! vera lernt? nina weiss! olga malt?"
          ]),
          en: practiceLines([
            "mama! papa? theme! water? lava! book? nora! hill? mir! tier?",
            "anna? vera! mila? ira! nina? olga! lara? ella! yana? ira!",
            "book? pen! point? ball! branch? thread! chart? mouse!",
            "morning! quiet? anna! home? vera! near? mila! reads?",
            "qwert! yuiop? rtfg! uyjh? vbnm! zxcvb? nm! asdf?",
            "jumping! bridge? mouse! thread? chart! branch? pen! point?",
            "mama papa! theme water? lava glass! oval lad? anna vera!",
            "run? rug! hut? hum! turn? burn! hurt? hunt! front? form!",
            "mix! nix? vim! bin? min! my? row! word? finger! bridge?",
            "anna writes? mila reads! vera learns? nina knows! olga draws?"
          ])
        }
      },
      {
        id: "lesson7_3",
        title: { ru: "Тире, двоеточие, кавычки", de: "Strich, Doppelpunkt, Anführungszeichen", en: "Dash, Colon, Quotes" },
        tips: {
          ru: [
            "Никогда не нажимай Shift и основную клавишу одной рукой. Если символ печатается правой рукой — Shift держит левая, и наоборот. Так пальцы не мешают друг другу, а движения остаются быстрыми и естественными."
          ],
          de: [
            "Drücke Shift und die Haupttaste nie mit derselben Hand. Wenn das Zeichen mit der rechten Hand getippt wird, hält die linke Shift, und umgekehrt. So kommen sich die Finger nicht in die Quere und die Bewegungen bleiben schnell und natürlich."
          ],
          en: [
            "Never press Shift and the main key with the same hand. If the symbol is typed with the right hand, the left hand holds Shift, and vice versa. This keeps the fingers out of each other's way and the movement natural."
          ]
        },
        symbolPolicy: {
          scope: "lesson",
          shift: true,
          punctuation: ["-", ":", "\""],
          placeholders: ["X", "Y", "Z"]
        },
        content: { lineCount: 10 },
        scoring: { accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "мама- папа: \"тема\" вода- лава: \"книга\" нора- гора: \"мир\"",
            "анна- вера: \"мила\" ира- нина: \"оля\" лада- эля: \"яна\"",
            "книга- ручка: \"точка\" мячик- ветка: \"нитка\" карта- мышка:",
            "утро- тихо: \"анна\" дома- вера: \"рядом\" мила- читает:",
            "йцуке- нгшщзхъ: \"кеап\" гнор- мить: \"ячсми\" тьбю- фыва:",
            "прыжок- крышка: \"мышка\" нитка- карта: \"ветка\" ручка- точка:",
            "мама папа- тема вода: \"лава\" жало- овал: \"лад\" вдова- элла:",
            "кит- мир: \"тир\" рот- тон: \"нора\" гора- тема: \"папа\"",
            "мяч- час: \"тьма\" туча- бита: \"юла\" мяс- тишь: \"мим\"",
            "анна пишет- мила читает: \"вера\" учит- нина знает: \"оля\""
          ]),
          de: practiceLines([
            "mama- papa: \"thema\" wasser- lava: \"buch\" nora- berg: \"mir\"",
            "anna- vera: \"mila\" ira- nina: \"olga\" lara- ella: \"jana\"",
            "buch- stift: \"punkt\" ball- ast: \"faden\" karte- maus:",
            "morgen- leise: \"anna\" da- vera: \"nah\" mila- liest:",
            "qwert- zuiopü: \"rtfg\" uzjh- vbnm: \"yxcvb\" nm- asdf:",
            "sprung- brücke: \"maus\" faden- karte: \"ast\" stift- punkt:",
            "mama papa- thema wasser: \"lava\" glas- oval: \"lad\" anna- vera:",
            "rat- gut: \"rot\" ton- mut: \"rum\" nur- hut: \"fern\"",
            "mix- nix: \"vim\" bin- min: \"my\" row- wort: \"finger\"",
            "anna schreibt- mila liest: \"vera\" lernt- nina weiss: \"olga\""
          ]),
          en: practiceLines([
            "mama- papa: \"theme\" water- lava: \"book\" nora- hill: \"mir\"",
            "anna- vera: \"mila\" ira- nina: \"olga\" lara- ella: \"yana\"",
            "book- pen: \"point\" ball- branch: \"thread\" chart- mouse:",
            "morning- quiet: \"anna\" home- vera: \"near\" mila- reads:",
            "qwert- yuiop: \"rtfg\" uyjh- vbnm: \"zxcvb\" nm- asdf:",
            "jumping- bridge: \"mouse\" thread- chart: \"branch\" pen- point:",
            "mama papa- theme water: \"lava\" glass- oval: \"lad\" anna- vera:",
            "run- rug: \"hut\" hum- turn: \"burn\" hurt- hunt: \"front\"",
            "mix- nix: \"vim\" bin- min: \"my\" row- word: \"finger\"",
            "anna writes- mila reads: \"vera\" learns- nina knows: \"olga\""
          ])
        }
      },
      {
        id: "lesson7_4",
        title: { ru: "Фразы со знаками", de: "Sätze mit Zeichen", en: "Phrases with Signs" },
        tips: {
          ru: [
            "Не ускоряйся на пунктуации сильнее, чем на буквах. Большинство ошибок появляется именно в момент перехода к знакам."
          ],
          de: [
            "Werde bei Satzzeichen nicht schneller als bei Buchstaben. Die meisten Fehler entstehen genau beim Wechsel zu den Zeichen."
          ],
          en: [
            "Do not speed up on punctuation more than on letters. Most mistakes happen right at the transition to symbols."
          ]
        },
        symbolPolicy: {
          scope: "program",
          shift: true,
          digits: true,
          punctuation: [".", ",", "!", "?", "-", ":", "\""]
        },
        content: { lineCount: 10 },
        scoring: { accuracy: 90, speed: 40 },
        lines: {
          ru: practiceLines([
            "Анна пишет, Мила читает. Вера учит? Нина знает! Оля рисует- Лада дома:",
            "мама, папа. тема- вода: \"лава\" книга? нора! гора, мир. тир- рот:",
            "Яна идет? Ира идет! Оля идет, Мила идет. Нина- рядом: \"Вера\"",
            "прыжок, крышка. мышка? нитка! карта- ветка: \"ручка\" точка.",
            "Фа Йа, Ву Км. Па Се? Он Рн! Го- Шл: \"Щд\" Зж.",
            "книга 1, нора 2. гора 3? тема 4! мир- 5: \"тир\" 6.",
            "Лада пишет: \"Мила\" читает. Ира учит, Нина знает! Оля- дома.",
            "мяч, час. тьма? туча! бита- юла: \"мяс\" тишь, мим.",
            "12345, йцуке. 67890? нгшщзхъ! кеап- гнор: \"мить\"",
            "Анна Вера, Мила Ира. Нина? Лада! Эля- Оля: \"Яна\""
          ]),
          de: practiceLines([
            "Anna schreibt, Mila liest. Vera lernt? Nina weiss! Olga malt- Lara da:",
            "mama, papa. thema- wasser: \"lava\" buch? nora! berg, mir. tier- rot:",
            "Anna geht? Vera geht! Olga geht, Mila geht. Nina- nah: \"Ira\"",
            "sprung, brücke. maus? faden! karte- ast: \"stift\" punkt.",
            "Fa Qa, De Rv. Gt Cy? Jz Hz! Uj- Ik: \"Ol\" Pö.",
            "form 1, fern 2. gern 3? gurt 4! mut- 5: \"rum\" 6.",
            "Lara schreibt: \"Mila\" liest. Ira lernt, Nina weiss! Olga- da.",
            "mix, nix. vim? bin! min- my: \"row\" wort, finger.",
            "12345, qwert. 67890? zuiopü! rtfg- uzjh: \"vbnm\"",
            "Anna Vera, Mila Ira. Nina? Lara! Ella- Olga: \"Jana\""
          ]),
          en: practiceLines([
            "Anna writes, Mila reads. Vera learns? Nina knows! Olga draws- Lara home:",
            "mama, papa. theme- water: \"lava\" book? nora! hill, mir. tier- rot:",
            "Anna goes? Vera goes! Olga goes, Mila goes. Nina- near: \"Ira\"",
            "jumping, bridge. mouse? thread! chart- branch: \"pen\" point.",
            "Fa Qa, De Rv. Gt Cz? Jy Hy! Uj- Ik: \"Ol\" Pk.",
            "form 1, front 2. grunt 3? turn 4! hum- 5: \"burn\" 6.",
            "Lara writes: \"Mila\" reads. Ira learns, Nina knows! Olga- home.",
            "mix, nix. vim? bin! min- my: \"row\" word, finger.",
            "12345, qwert. 67890? yuiop! rtfg- uyjh: \"vbnm\"",
            "Anna Vera, Mila Ira. Nina? Lara! Ella- Olga: \"Yana\""
          ])
        }
      },
      {
        id: "lesson7_5",
        title: { ru: "Тест", de: "Test", en: "Test" },
        tips: {
          ru: [
            "Этот тест нужен не для давления, а чтобы закрепить навык в условиях, близких к реальной печати."
          ],
          de: [
            "Dieser Test soll keinen Druck machen. Er festigt die Fähigkeit unter Bedingungen, die dem echten Tippen näherkommen."
          ],
          en: [
            "This test is not about pressure. It helps lock in the skill under conditions closer to real typing."
          ]
        },
        symbolPolicy: {
          scope: "program",
          shift: true,
          digits: true,
          punctuation: [".", ",", "!", "?", "-", ":", "\""]
        },
        content: { lineCount: 15 },
        scoring: { accuracy: 90, speed: 40, assistants: false },
        lines: {
          ru: practiceLines([
            "Анна пишет, Мила читает. Вера учит? Нина знает! Оля рисует- Лада дома:",
            "мама, папа. тема- вода: \"лава\" книга? нора! гора, мир. тир- рот:",
            "фыва олджэ, кеап гнор. мить? йцуке! нгшщзхъ- ячсми: \"тьбю\"",
            "12345, йцуке. 67890? нгшщзхъ! 54321- екуцй: \"09876\"",
            "прыжок, крышка. мышка? нитка! карта- ветка: \"ручка\" точка.",
            "Яна читает? Ира пишет! Оля учит, Вера знает. Мила- дома:",
            "книга 1, нора 2. гора 3? тема 4! мир- 5: \"тир\" 6.",
            "Фа Йа, Ву Км. Па Се? Он Рн! Го- Шл: \"Щд\" Зж.",
            "мяч, час. тьма? туча! бита- юла: \"мяс\" тишь, мим.",
            "Лада пишет: \"Мила\" читает. Ира учит, Нина знает! Оля- дома.",
            "вдова вода, вал овал. лава? лад! жало- элла: \"эд\"",
            "Анна Вера, Мила Ира. Нина? Лада! Эля- Оля: \"Яна\"",
            "й1 ц2, у3 к4. е5? н6! г7- ш8: \"щ9\" з0.",
            "книга, ручка. точка? мячик! ветка- нитка: \"карта\" мышка.",
            "Утро тихо, Анна встала. Вера? Оля! Мила- Ира: \"Нина\""
          ]),
          de: practiceLines([
            "Anna schreibt, Mila liest. Vera lernt? Nina weiss! Olga malt- Lara da:",
            "mama, papa. thema- wasser: \"lava\" buch? nora! berg, mir. tier- rot:",
            "asdf jklöä, rtfg uzjh. vbnm? qwert! zuiopü- yxcvb: \"nm\"",
            "12345, qwert. 67890? zuiopü! 54321- trewq: \"09876\"",
            "sprung, brücke. maus? faden! karte- ast: \"stift\" punkt.",
            "Lara liest? Ira schreibt! Olga lernt, Vera weiss. Mila- da:",
            "form 1, fern 2. gern 3? gurt 4! mut- 5: \"rum\" 6.",
            "Fa Qa, De Rv. Gt Cy? Jz Hz! Uj- Ik: \"Ol\" Pö.",
            "mix, nix. vim? bin! min- my: \"row\" wort, finger.",
            "Lara schreibt: \"Mila\" liest. Ira lernt, Nina weiss! Olga- da.",
            "fall falls, als das. lass? fass! saal- anna: \"vera\"",
            "Anna Vera, Mila Ira. Nina? Lara! Ella- Olga: \"Jana\"",
            "q1 w2, e3 r4. t5? z6! u7- i8: \"o9\" p0.",
            "buch, stift. punkt? ball! ast- faden: \"karte\" maus.",
            "Morgen leise, Anna steht. Vera? Olga! Mila- Ira: \"Nina\""
          ]),
          en: practiceLines([
            "Anna writes, Mila reads. Vera learns? Nina knows! Olga draws- Lara home:",
            "mama, papa. theme- water: \"lava\" book? nora! hill, mir. tier- rot:",
            "asdf jkl, rtfg uyjh. vbnm? qwert! yuiop- zxcvb: \"nm\"",
            "12345, qwert. 67890? yuiop! 54321- trewq: \"09876\"",
            "jumping, bridge. mouse? thread! chart- branch: \"pen\" point.",
            "Lara reads? Ira writes! Olga learns, Vera knows. Mila- home:",
            "form 1, front 2. grunt 3? turn 4! hum- 5: \"burn\" 6.",
            "Fa Qa, De Rv. Gt Cz? Jy Hy! Uj- Ik: \"Ol\" Pk.",
            "mix, nix. vim? bin! min- my: \"row\" word, finger.",
            "Lara writes: \"Mila\" reads. Ira learns, Nina knows! Olga- home.",
            "lads fall, all sad. lass? flask! glass- anna: \"vera\"",
            "Anna Vera, Mila Ira. Nina? Lara! Ella- Olga: \"Yana\"",
            "q1 w2, e3 r4. t5? y6! u7- i8: \"o9\" p0.",
            "book, pen. point? ball! branch- thread: \"chart\" mouse.",
            "Morning quiet, Anna starts. Vera? Olga! Mila- Ira: \"Nina\""
          ])
        }
      }
    ]
  });
})();
