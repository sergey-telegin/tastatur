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
    id: "module3",
    title: { ru: "Модуль 3 — Верхний ряд", de: "Modul 3 — Obere Reihe", en: "Module 3 — Top Row" },
    symbols: {
      ru: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
      de: ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"],
      en: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
    },
    lessons: [
      {
        id: "lesson3_1",
        title: { ru: "Верх слева", de: "Oben links", en: "Top Left" },
        tips: {
          ru: [
            "Клади руки так, чтобы пальцы были полусогнуты, будто под ними лежит маленькое яблоко. Это самая оптимальная поза, чтобы дотянуться до всех клавиш быстро и без усилий."
          ],
          de: [
            "Lege deine Hände so hin, dass die Finger leicht gebogen sind, als läge ein kleiner Apfel darunter. So erreichst du die Tasten schnell und ohne unnötige Anstrengung."
          ],
          en: [
            "Place your hands so your fingers are slightly curved, as if a small apple were resting underneath them. This helps you reach the keys quickly and without strain."
          ]
        },
        symbolPolicy: {
          scope: "lesson",
          ru: ["й", "ц", "у", "к", "е"],
          de: ["q", "w", "e", "r", "t"],
          en: ["q", "w", "e", "r", "t"]
        },
        content: { lineCount: 10 },
      scoring: { accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "йцуке йцуке йцуке екуцй екуцй уйкец уйкец йцуке екуцй уйкец",
            "йй цц уу кк ее йй ее кк уу цц йй цц уу кк ее йй ее кк уу цц",
            "йуйу цкцк екец уцуй йуйу цкцк екец уцуй йуйу цкцк екец",
            "уке цуй кей ецу уке цуй кей ецу уке цуй кей ецу уке цуй",
            "кек уцу ейе цкц кек уцу ейе цкц кек уцу ейе цкц кек уцу",
            "ййй ццц ууу ккк еее ййй ццц ууу ккк еее ййй ццц ууу",
            "кеец уццй екуй кеец уццй екуй кеец уццй екуй кеец уццй",
            "йек уке цуй кей йек уке цуй кей йек уке цуй кей йек уке",
            "кук еце уйу цкц кук еце уйу цкц кук еце уйу цкц кук еце",
            "йцукейцуке екуцйекуцй уйкецуйкец йцукейцуке екуцйекуцй"
          ]),
          de: practiceLines([
            "qwert qwert qwert trewq trewq weqrt weqrt qwert trewq weqrt",
            "qq ww ee rr tt qq tt rr ee ww qq ww ee rr tt qq tt rr ee ww",
            "qeqe wrwr trtw ewqe qeqe wrwr trtw ewqe qeqe wrwr trtw",
            "ert weq tre qwe ert weq tre qwe ert weq tre qwe ert weq",
            "rer ewe tqt wrw rer ewe tqt wrw rer ewe tqt wrw rer ewe",
            "qqq www eee rrr ttt qqq www eee rrr ttt qqq www eee",
            "rttw weeq treq rttw weeq treq rttw weeq treq rttw weeq",
            "qer ert weq tre qer ert weq tre qer ert weq tre qer ert",
            "rtr ewe qeq wrw rtr ewe qeq wrw rtr ewe qeq wrw rtr ewe",
            "qwertqwert trewqtrewq weqrtweqrt qwertqwert trewqtrewq"
          ]),
          en: practiceLines([
            "qwert qwert qwert trewq trewq weqrt weqrt qwert trewq weqrt",
            "qq ww ee rr tt qq tt rr ee ww qq ww ee rr tt qq tt rr ee ww",
            "qeqe wrwr trtw ewqe qeqe wrwr trtw ewqe qeqe wrwr trtw",
            "ert weq tre qwe ert weq tre qwe ert weq tre qwe ert weq",
            "rer ewe tqt wrw rer ewe tqt wrw rer ewe tqt wrw rer ewe",
            "qqq www eee rrr ttt qqq www eee rrr ttt qqq www eee",
            "rttw weeq treq rttw weeq treq rttw weeq treq rttw weeq",
            "qer ert weq tre qer ert weq tre qer ert weq tre qer ert",
            "rtr ewe qeq wrw rtr ewe qeq wrw rtr ewe qeq wrw rtr ewe",
            "qwertqwert trewqtrewq weqrtweqrt qwertqwert trewqtrewq"
          ])
        }
      },
      {
        id: "lesson3_2",
        title: { ru: "Верх справа", de: "Oben rechts", en: "Top Right" },
        tips: {
          ru: [
            "Клавиатура не сопротивляется! Лёгкого касания вполне достаточно."
          ],
          de: [
            "Die Tastatur wehrt sich nicht! Eine leichte Berührung reicht völlig aus."
          ],
          en: [
            "The keyboard is not fighting back! A light touch is more than enough."
          ]
        },
        symbolPolicy: {
          scope: "lesson",
          ru: ["н", "г", "ш", "щ", "з", "х", "ъ"],
          de: ["z", "u", "i", "o", "p", "ü"],
          en: ["y", "u", "i", "o", "p"]
        },
        content: { lineCount: 10 },
        scoring: { accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "нгшщзхъ нгшщзхъ нгшщзхъ ъхзщшгн ъхзщшгн гншзщх нгшщзхъ",
            "нн гг шш щщ зз хх ъъ нн ъъ хх зз щщ шш гг нн гг шш щщ",
            "ншнш гщгщ зхзх ъхъх ншнш гщгщ зхзх ъхъх ншнш гщгщ",
            "шнг гщз зхъ хщн шнг гщз зхъ хщн шнг гщз зхъ хщн",
            "нго щзх шън гощ нго щзх шън гощ нго щзх шън гощ нго",
            "ннн ггг шшш щщщ ззз ххх ъъъ ннн ггг шшш щщщ ззз",
            "зщшн гнхъ щзгн зщшн гнхъ щзгн зщшн гнхъ щзгн",
            "ншн гщг зхз ъщъ ншн гщг зхз ъщъ ншн гщг зхз",
            "нгъ шщз хън гшщ нгъ шщз хън гшщ нгъ шщз хън гшщ",
            "нгшщзхънгшщзхъ ъхзщшгнъхзщшгн гншзщхгншзщх"
          ]),
          de: practiceLines([
            "zuiopü zuiopü zuiopü üpoiuz üpoiuz uzipüo zuiopü üpoiuz uzipüo",
            "zz uu ii oo pp üü zz üü pp oo ii uu zz uu ii oo pp üü zz üü pp",
            "zizi uouo püpü üpüp zizi uouo püpü üpüp zizi uouo püpü",
            "izu uop püo üoz izu uop püo üoz izu uop püo üoz izu uop",
            "zup oüi iüz poz zup oüi iüz poz zup oüi iüz poz zup oüi",
            "zzz uuu iii ooo ppp üüü zzz uuu iii ooo ppp üüü zzz uuu",
            "poiz uzpü opzü poiz uzpü opzü poiz uzpü opzü poiz uzpü",
            "ziz uou püp üzü ziz uou püp üzü ziz uou püp üzü ziz uou",
            "züp iop üzp uio züp iop üzp uio züp iop üzp uio züp iop",
            "zuiopüzuiopü üpoiuzüpoiuz uzipüouzipüo zuiopüzuiopü"
          ]),
          en: practiceLines([
            "yuiop yuiop yuiop poiuy poiuy uyipo yuiop poiuy uyipo yuiop",
            "yy uu ii oo pp yy pp oo ii uu yy uu ii oo pp yy pp oo ii uu",
            "yiyi uouo pypy ypyu yiyi uouo pypy ypyu yiyi uouo pypy",
            "iyu uop poy yoi iyu uop poy yoi iyu uop poy yoi iyu uop",
            "yup oyi iuy poy yup oyi iuy poy yup oyi iuy poy yup oyi",
            "yyy uuu iii ooo ppp yyy uuu iii ooo ppp yyy uuu iii",
            "poiy uypy opyu poiy uypy opyu poiy uypy opyu poiy uypy",
            "yiy uou pyp uyu yiy uou pyp uyu yiy uou pyp uyu yiy uou",
            "yup iop uyp uio yup iop uyp uio yup iop uyp uio yup iop",
            "yuiopyuiop poiuypoiuy uyipouyipo yuiopyuiop poiuypoiuy"
          ])
        }
      },
      {
        id: "lesson3_3",
        title: { ru: "Верхний ряд", de: "Obere Reihe", en: "Top Row" },
        tips: {
          ru: [
            "Не поднимай пальцы высоко над клавиатурой. Чем короче путь до клавиши, тем быстрее и стабильнее получится печать."
          ],
          de: [
            "Hebe die Finger nicht hoch über die Tastatur. Je kürzer der Weg zur Taste, desto schneller und stabiler wird das Tippen."
          ],
          en: [
            "Do not lift your fingers high above the keyboard. The shorter the path to the key, the faster and steadier your typing becomes."
          ]
        },
        symbolPolicy: {
          scope: "module",
          ru: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
          de: ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"],
          en: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
        },
        content: { lineCount: 10 },
        scoring: { accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "йцуке нгшщзхъ йцуке нгшщзхъ екуцй ъхзщшгн йцуке нгшщзхъ",
            "й н ц г у ш к щ е з х ъ й н ц г у ш к щ е з х ъ й н",
            "йу нш цк гщ ез хъ йу нш цк гщ ез хъ йу нш цк гщ ез",
            "кен гшщ цуй зхъ кен гшщ цуй зхъ кен гшщ цуй зхъ кен",
            "укн егш цщз йхъ укн егш цщз йхъ укн егш цщз йхъ",
            "йцукенгшщзхъ ъхзщшгнекуцй йцукенгшщзхъ ъхзщшгнекуцй",
            "йек нго цуш кщз ехъ йек нго цуш кщз ехъ йек нго цуш",
            "йг цн уш кщ ез хъ йг цн уш кщ ез хъ йг цн уш кщ ез",
            "кук щущ ене гег кук щущ ене гег кук щущ ене гег кук",
            "йцуке нгшщзхъ кеун щзхъ йцуке нгшщзхъ кеун щзхъ"
          ]),
          de: practiceLines([
            "qwert zuiopü qwert zuiopü trewq üpoiuz qwert zuiopü qwert zuiopü",
            "q z w u e i r o t p ü q z w u e i r o t p ü q z",
            "qe zi wr uo tp üq qe zi wr uo tp üq qe zi wr uo tp",
            "rtz uio weq püü rtz uio weq püü rtz uio weq püü rtz",
            "erz tui wop qü er ztui wop qü erz tui wop qü erz tui",
            "qwertzuiopü üpoiuztrewq qwertzuiopü üpoiuztrewq qwertzuiopü",
            "qer zup wti rop tüq qer zup wti rop tüq qer zup wti",
            "qu wz ei ro tp üq qu wz ei ro tp üq qu wz ei ro",
            "rtr oüo tzt ueu rtr oüo tzt ueu rtr oüo tzt ueu",
            "qwert zuiopü rtzu opüq qwert zuiopü rtzu opüq qwert"
          ]),
          en: practiceLines([
            "qwert yuiop qwert yuiop trewq poiuy qwert yuiop qwert yuiop",
            "q y w u e i r o t p q y w u e i r o t p q y",
            "qe yi wr uo tp pq qe yi wr uo tp pq qe yi wr uo tp",
            "rty uio weq poy rty uio weq poy rty uio weq poy rty",
            "ery tui wop qy ery tui wop qy ery tui wop qy ery tui",
            "qwertyuiop poiuytrewq qwertyuiop poiuytrewq qwertyuiop",
            "qer yup wti rop tyq qer yup wti rop tyq qer yup wti",
            "qu wy ei ro tp pq qu wy ei ro tp pq qu wy ei ro",
            "rtr oyo tyt ueu rtr oyo tyt ueu rtr oyo tyt ueu",
            "qwert yuiop rtyu opyq qwert yuiop rtyu opyq qwert"
          ])
        }
      },
      {
        id: "lesson3_4",
        title: { ru: "Короткие слова", de: "Kurze Wörter", en: "Short Words" },
        tips: {
          ru: [
            "Перед словами на верхнем ряду сохрани спокойный темп: лучше ровное движение без рывков, чем быстрый старт с лишним напряжением."
          ],
          de: [
            "Behalte vor Wörtern auf der oberen Reihe ein ruhiges Tempo. Gleichmäßige Bewegung ohne Ruckeln ist besser als ein schneller Start mit zu viel Spannung."
          ],
          en: [
            "Keep a calm pace before words on the top row. Smooth movement without jerks is better than a fast start with extra tension."
          ]
        },
        symbolPolicy: {
          scope: "module",
          ru: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
          de: ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"],
          en: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
        },
        content: { lineCount: 10 },
        scoring: { accuracy: 90, speed: 40 },
        lines: {
          ru: practiceLines([
            "куку кек щек цех хек щуп йен кук еже куку кек щек цех хек щуп йен кук",
            "цех щек кек куку хек щуп йен кук цех щек кек куку хек щуп йен кук",
            "кук щек цех хек кек йен щуп куку кук щек цех хек кек йен щуп куку",
            "щуп хек цех кек куку кук йен щек щуп хек цех кек куку кук йен щек",
            "кек кек куку куку цех цех хек хек щек щек щуп щуп йен йен кук кук",
            "йен кук куку кек щек цех хек щуп йен кук куку кек щек цех хек щуп",
            "хек щуп щек цех кек куку кук йен хек щуп щек цех кек куку кук йен",
            "куку кек кук йен цех хек щек щуп куку кек кук йен цех хек щек щуп",
            "цех хек щуп щек йен кук куку кек цех хек щуп щек йен кук куку кек",
            "кек куку кук цех хек щек щуп йен кек куку кук цех хек щек щуп йен"
          ]),
          de: practiceLines([
            "wert quit tour tipp euro wort tier pur tee wort wert quit tour tipp euro wort tier pur tee",
            "tour tier wort euro pur tee tipp wert quit tour tier wort euro pur tee tipp wert quit",
            "wert wort tour tier tee pur euro tipp quit wert wort tour tier tee pur euro tipp quit",
            "quit tipp euro wort tier tour pur tee quit tipp euro wort tier tour pur tee quit",
            "tee tee pur pur wert wert wort wort tour tour tier tier euro euro tipp tipp",
            "euro tipp quit wert wort tour tier pur tee euro tipp quit wert wort tour tier pur",
            "tier tour wort wert tipp quit euro pur tee tier tour wort wert tipp quit euro pur",
            "wert euro tipp tour wort tier pur tee quit wert euro tipp tour wort tier pur tee",
            "pur tee tour tier wort wert euro tipp quit pur tee tour tier wort wert euro tipp",
            "wert quit tour tipp euro wort tier pur tee wert quit tour tipp euro wort tier"
          ]),
          en: practiceLines([
            "tree type power query quote quiet pretty upper writer tower tree type power query quote quiet pretty upper",
            "query quote quiet type tree tower power upper writer query quote quiet type tree tower power upper",
            "tree tower power type upper query quote quiet writer tree tower power type upper query quote",
            "upper pretty power tower tree type query quote quiet upper pretty power tower tree type query",
            "tree tree type type power power query query quote quote quiet quiet upper upper tower tower",
            "quiet quote query power tower tree type upper writer quiet quote query power tower tree type",
            "writer tower power pretty upper quiet quote query tree type writer tower power pretty upper",
            "type tree tower power query quote quiet upper writer type tree tower power query quote quiet",
            "upper quiet quote query power tower tree type writer upper quiet quote query power tower",
            "tree type power query quote quiet pretty upper writer tower tree type power query quote"
          ])
        }
      },
      {
        id: "lesson3_5",
        title: { ru: "Тест", de: "Test", en: "Test" },
        tips: {
          ru: [
            "Не бойся ошибок в тесте — он нужен не для идеального результата, а чтобы мозг и пальцы научились работать без помощи ассистентов."
          ],
          de: [
            "Hab keine Angst vor Fehlern im Test. Er ist nicht für ein perfektes Ergebnis da, sondern damit Gehirn und Finger lernen, ohne Assistenten zusammenzuarbeiten."
          ],
          en: [
            "Do not be afraid of mistakes in the test. It is not about a perfect score; it helps your brain and fingers learn to work without assistants."
          ]
        },
        symbolPolicy: {
          scope: "program",
          ru: ["ф", "ы", "в", "а", "о", "л", "д", "ж", "э", "к", "е", "п", "г", "н", "р", "м", "и", "т", "ь", "й", "ц", "у", "ш", "щ", "з", "х", "ъ"],
          de: ["a", "s", "d", "f", "j", "k", "l", "ö", "ä", "r", "t", "g", "u", "z", "h", "v", "b", "n", "m", "q", "w", "e", "i", "o", "p", "ü"],
          en: ["a", "s", "d", "f", "j", "k", "l", "r", "t", "g", "u", "y", "h", "v", "b", "n", "m", "q", "w", "e", "i", "o", "p"]
        },
        content: { lineCount: 15 },
        scoring: { accuracy: 90, speed: 40, assistants: false },
        lines: {
          ru: practiceLines([
            "мама папа тема вода лава книга нора гора куку кек щек цех хек щуп йен кук",
            "фыва олджэ кеап гнор мить йцуке нгшщзхъ мама папа тема вода лава книга",
            "лава вода мама папа книга нора гора тема мир тир рот тон куку кек щек цех",
            "к е а п г н о р м и т ь й ц у к е н г ш щ з х ъ мама папа тема вода",
            "мама папа тема книга нора гора рот тон мир тир кит нить цех хек щуп щек",
            "вал вода лава жало овал лад вдова элла эд мама папа тема книга нора гора",
            "йцуке нгшщзхъ кеап гнор мить фыва олджэ мама папа вода лава тема книга",
            "мама мама папа папа вода вода лава лава тема тема книга книга цех цех хек хек",
            "нить книга нора гора тема папа мама кит мир тир рот тон кек куку щек цех",
            "фываолджэ кеапгнор митьмить йцукенгшщзхъ мама папа тема вода лава жало овал",
            "жало лава вода овал вал лад эд элла вдова мама папа тема книга нора гора",
            "вдова вода вал овал лава лад жало элла эд нить книга нора гора тема папа",
            "элла эд вал лад вода лава жало овал вдова йцуке нгшщзхъ мама папа тема",
            "олджэ фыва кеап гнор мить йцуке нгшщзхъ вал вода лава жало овал лад",
            "мама папа тема вода лава жало овал книга нора гора мир тир рот тон йцуке"
          ]),
          de: practiceLines([
            "rat gut rot ton mut rum nur hut wert quit tour tipp euro wort tier pur tee",
            "asdf jklöä rtfg uzjh vbnm qwert zuiopü rat gut rot ton mut rum nur hut",
            "fass lass saal fall als das da rat gut rot ton wert quit tour tipp euro",
            "a s d f j k l ö ä r t g u z h v b n m q w e i o p ü",
            "rat gut fern form gern gurt mut rum nur hut rot ton wert wort tour tier",
            "als das falls lass fass saal da fall rat gut rot ton mut rum nur hut",
            "qwert zuiopü rtfg uzjh vbnm asdf jklöä rat gut rot ton mut rum nur hut",
            "rat rat gut gut rot rot ton ton mut mut rum rum wert wert wort wort",
            "fern form gern gurt rat gut rot ton mut rum nur hut euro tipp quit wert",
            "asdfjklöä rtfguzjh vbnmvbnm qwertzuiopü rat gut rot ton mut rum nur hut",
            "fass lass saal fall da als asdf jklöä rat gut rot ton mut rum nur hut",
            "fall falls als das lass fass saal da fern form gern gurt rat gut rot",
            "saal da als das falls lass fass fall qwert zuiopü rat gut rot ton",
            "jklöä asdf rtfg uzjh vbnm qwert zuiopü als das falls lass fass",
            "rat gut rot ton mut rum nur hut als das falls lass fass saal qwert"
          ]),
          en: practiceLines([
            "run rug hut hum turn burn hurt hunt tree type power query quote quiet upper tower",
            "asdf jkl rtfg uyjh vbnm qwert yuiop run rug hut hum turn burn hurt hunt",
            "fall lass flask glass all sad dad run rug hut hum tree type power query quote",
            "a s d f j k l r t g u y h v b n m q w e i o p",
            "run rug front form grunt turn burn hum hut hurt hunt tree tower power type",
            "all sad dad ask fall lass flask lads glass add run rug hut hum turn burn",
            "qwert yuiop rtfg uyjh vbnm asdf jkl run rug hut hum turn burn hurt",
            "run run rug rug hut hut hum hum turn turn burn burn tree tree type type",
            "front form grunt run rug hut hum turn burn hurt hunt quiet quote query power",
            "asdfjkl rtfguyjh vbnmvbnm qwertyuiop run rug hut hum turn burn hurt hunt",
            "fall lass flask glass add all asdf jkl run rug hut hum turn burn hurt",
            "lads fall lass flask glass add front form grunt run rug hut hum turn burn",
            "glass add all sad dad ask fall lass qwert yuiop run rug hut hum turn",
            "jkl asdf rtfg uyjh vbnm qwert yuiop all sad dad ask fall lass",
            "run rug hut hum turn burn hurt hunt all sad dad ask fall lass qwert"
          ])
        }
      }
    ]
  });
})();
