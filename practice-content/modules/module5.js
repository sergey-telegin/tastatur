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
    id: "module5",
    title: { ru: "Модуль 5 — Вертикали и Shift", de: "Modul 5 — Vertikalen und Shift", en: "Module 5 — Verticals and Shift" },
    symbols: {
      ru: ["а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"],
      de: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü"],
      en: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    },
    lessons: [
      {
        id: "lesson5_1",
        title: { ru: "Вертикали слева", de: "Vertikalen links", en: "Left Verticals" },
        tips: {
          ru: [
            "Не поднимай всю руку при переходе между рядами. До верхних и нижних клавиш должны тянуться пальцы, а кисть оставаться почти на месте — так движения будут быстрее и точнее."
          ],
          de: [
            "Hebe beim Wechsel zwischen den Reihen nicht die ganze Hand. Zu den oberen und unteren Tasten sollen die Finger greifen, während die Hand fast ruhig bleibt - so werden die Bewegungen schneller und genauer."
          ],
          en: [
            "Do not lift your whole hand when moving between rows. Let the fingers reach the upper and lower keys while the hand stays almost still - the movement will be faster and more accurate."
          ]
        },
        description: {
          ru: "Переходы между рядами, чередование регистра",
          de: "Reihenwechsel und Wechsel der Großschreibung",
          en: "Row transitions and case alternation"
        },
        symbolPolicy: {
          scope: "program",
          hand: "left",
          shift: true,
          ru: ["й", "ц", "у", "к", "е", "ф", "ы", "в", "а", "п", "я", "ч", "с", "м", "и"],
          de: ["q", "w", "e", "r", "t", "a", "s", "d", "f", "g", "y", "x", "c", "v", "b"],
          en: ["q", "w", "e", "r", "t", "a", "s", "d", "f", "g", "z", "x", "c", "v", "b"]
        },
        target: { lines: 10, accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "Фа фа Йа йа Ву ву Км км Па па Се се Фа фа Йа йа Ву ву Км км Па па",
            "Ая ая Ум ум Еп еп Фч фч Ыс ыс Ва ва Ая ая Ум ум Еп еп Фч фч Ыс ыс",
            "Йф йф Цы цы Ув ув Ка ка Еп еп Яф яф Чы чы См см Йф йф Цы цы Ув ув",
            "Фй фй Ыц ыц Ву ву Ак ак Пе пе Яч яч Чс чс Ми ми Фй фй Ыц ыц Ву ву",
            "Па па Км км Еч еч Ва ва Йс йс Фу фу Па па Км км Еч еч Ва ва Йс йс",
            "Фа Йа Ву Км Па Се Фа Йа Ву Км Па Се фа йа ву км па се фа йа ву км",
            "Ая Ум Еп Фч Ыс Ва Ая Ум Еп Фч Ыс Ва ая ум еп фч ыс ва ая ум еп фч",
            "Йф Цы Ув Ка Еп Яф Чы См Йф Цы Ув Ка Еп Яф Чы См йф цы ув ка еп",
            "Фй Ыц Ву Ак Пе Яч Чс Ми Фй Ыц Ву Ак Пе Яч Чс Ми фй ыц ву ак",
            "Па Км Еч Ва Йс Фу Па Км Еч Ва Йс Фу па км еч ва йс фу па км"
          ]),
          de: practiceLines([
            "Fa fa Qa qa De de Rv rv Gt gt Cy cy Fa fa Qa qa De de Rv rv Gt gt",
            "Ay ay Eb eb Tg tg Fx fx Ws ws Da da Ay ay Eb eb Tg tg Fx fx Ws ws",
            "Qf qf Ws ws Ed ed Ra ra Tg tg Yf yf Xs xs Cv cv Qf qf Ws ws Ed ed",
            "Fq fq Sw sw De de Ar ar Gt gt Yx yx Xc xc Bv bv Fq fq Sw sw De de",
            "Gt gt Rv rv Tx tx Da da Qc qc Fe fe Gt gt Rv rv Tx tx Da da Qc qc",
            "Fa Qa De Rv Gt Cy Fa Qa De Rv Gt Cy fa qa de rv gt cy fa qa de rv",
            "Ay Eb Tg Fx Ws Da Ay Eb Tg Fx Ws Da ay eb tg fx ws da ay eb tg fx",
            "Qf Ws Ed Ra Tg Yf Xs Cv Qf Ws Ed Ra Tg Yf Xs Cv qf ws ed ra tg",
            "Fq Sw De Ar Gt Yx Xc Bv Fq Sw De Ar Gt Yx Xc Bv fq sw de ar",
            "Gt Rv Tx Da Qc Fe Gt Rv Tx Da Qc Fe gt rv tx da qc fe gt rv"
          ]),
          en: practiceLines([
            "Fa fa Qa qa De de Rv rv Gt gt Cz cz Fa fa Qa qa De de Rv rv Gt gt",
            "Az az Eb eb Tg tg Fx fx Ws ws Da da Az az Eb eb Tg tg Fx fx Ws ws",
            "Qf qf Ws ws Ed ed Ra ra Tg tg Zf zf Xs xs Cv cv Qf qf Ws ws Ed ed",
            "Fq fq Sw sw De de Ar ar Gt gt Zx zx Xc xc Bv bv Fq fq Sw sw De de",
            "Gt gt Rv rv Tx tx Da da Qc qc Fe fe Gt gt Rv rv Tx tx Da da Qc qc",
            "Fa Qa De Rv Gt Cz Fa Qa De Rv Gt Cz fa qa de rv gt cz fa qa de rv",
            "Az Eb Tg Fx Ws Da Az Eb Tg Fx Ws Da az eb tg fx ws da az eb tg fx",
            "Qf Ws Ed Ra Tg Zf Xs Cv Qf Ws Ed Ra Tg Zf Xs Cv qf ws ed ra tg",
            "Fq Sw De Ar Gt Zx Xc Bv Fq Sw De Ar Gt Zx Xc Bv fq sw de ar",
            "Gt Rv Tx Da Qc Fe Gt Rv Tx Da Qc Fe gt rv tx da qc fe gt rv"
          ])
        }
      },
      {
        id: "lesson5_2",
        title: { ru: "Вертикали справа", de: "Vertikalen rechts", en: "Right Verticals" },
        tips: {
          ru: [
            "После клавиши из верхнего или нижнего ряда сразу возвращай палец в базовую позицию. Это помогает не теряться на клавиатуре во время длинных слов и быстрых переходов."
          ],
          de: [
            "Bring den Finger nach einer Taste aus der oberen oder unteren Reihe sofort zurück in die Grundposition. Das hilft dir, bei langen Wörtern und schnellen Wechseln nicht die Orientierung zu verlieren."
          ],
          en: [
            "After pressing a key from the upper or lower row, return the finger to the base position right away. This helps you stay oriented during long words and fast transitions."
          ]
        },
        description: {
          ru: "Переходы между рядами, чередование регистра",
          de: "Reihenwechsel und Wechsel der Großschreibung",
          en: "Row transitions and case alternation"
        },
        symbolPolicy: {
          scope: "program",
          hand: "right",
          shift: true,
          ru: ["н", "г", "ш", "щ", "з", "х", "ъ", "р", "о", "л", "д", "ж", "э", "т", "ь", "б", "ю"],
          de: ["z", "u", "i", "o", "p", "ü", "h", "j", "k", "l", "ö", "ä", "n", "m"],
          en: ["y", "u", "i", "o", "p", "h", "j", "k", "l", "n", "m"]
        },
        target: { lines: 10, accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "Он он Рн рн Го го Шл шл Щд щд Зж зж Он он Рн рн Го го Шл шл Щд щд",
            "Нт нт Гь гь Шб шб Щю щю Зо зо Хл хл Нт нт Гь гь Шб шб Щю щю",
            "Но но Гр гр Шо шо Щл щл Зд зд Хж хж Ъэ ъэ Но но Гр гр Шо шо",
            "Рн рн Ог ог Лш лш Дщ дщ Жз жз Эх эх Рн рн Ог ог Лш лш Дщ дщ",
            "Тн тн Ьг ьг Бш бш Ющ ющ Тн тн Ьг ьг Бш бш Ющ ющ Тн тн",
            "Он Рн Го Шл Щд Зж Он Рн Го Шл Щд Зж он рн го шл щд зж он рн",
            "Нт Гь Шб Щю Зо Хл Нт Гь Шб Щю Зо Хл нт гь шб щю зо хл",
            "Но Гр Шо Щл Зд Хж Ъэ Но Гр Шо Щл Зд Хж Ъэ но гр шо щл",
            "Рн Ог Лш Дщ Жз Эх Рн Ог Лш Дщ Жз Эх рн ог лш дщ жз эх",
            "Тн Ьг Бш Ющ Тн Ьг Бш Ющ тн ьг бш ющ Тн Ьг Бш Ющ тн ьг"
          ]),
          de: practiceLines([
            "Jz jz Hz hz Uj uj Ik ik Ol ol Pö pö Jz jz Hz hz Uj uj Ik ik Ol ol",
            "Zn zn Um um Ip ip Oü oü Pj pj Ük ük Zn zn Um um Ip ip Oü oü",
            "Zj zj Uh uh Ij ij Ok ok Pl pl Üö üö Äm äm Zj zj Uh uh Ij ij",
            "Hz hz Ju ju Ki ki Lo lo Öp öp Äü äü Hz hz Ju ju Ki ki Lo lo",
            "Nz nz Mu mu Ip ip Oü oü Nz nz Mu mu Ip ip Oü oü Nz nz",
            "Jz Hz Uj Ik Ol Pö Jz Hz Uj Ik Ol Pö jz hz uj ik ol pö jz hz",
            "Zn Um Ip Oü Pj Ük Zn Um Ip Oü Pj Ük zn um ip oü pj ük",
            "Zj Uh Ij Ok Pl Üö Äm Zj Uh Ij Ok Pl Üö Äm zj uh ij ok",
            "Hz Ju Ki Lo Öp Äü Hz Ju Ki Lo Öp Äü hz ju ki lo öp äü",
            "Nz Mu Ip Oü Nz Mu Ip Oü nz mu ip oü Nz Mu Ip Oü nz mu"
          ]),
          en: practiceLines([
            "Jy jy Hy hy Uj uj Ik ik Ol ol Pk pk Jy jy Hy hy Uj uj Ik ik Ol ol",
            "Yn yn Um um Ip ip Op op Pj pj Kk kk Yn yn Um um Ip ip Op op",
            "Yj yj Uh uh Ij ij Ok ok Pl pl Mk mk Nm nm Yj yj Uh uh Ij ij",
            "Hy hy Ju ju Ki ki Lo lo Pp pp Mn mn Hy hy Ju ju Ki ki Lo lo",
            "Ny ny Mu mu Ip ip Op op Ny ny Mu mu Ip ip Op op Ny ny",
            "Jy Hy Uj Ik Ol Pk Jy Hy Uj Ik Ol Pk jy hy uj ik ol pk jy hy",
            "Yn Um Ip Op Pj Kk Yn Um Ip Op Pj Kk yn um ip op pj kk",
            "Yj Uh Ij Ok Pl Mk Nm Yj Uh Ij Ok Pl Mk Nm yj uh ij ok",
            "Hy Ju Ki Lo Pp Mn Hy Ju Ki Lo Pp Mn hy ju ki lo pp mn",
            "Ny Mu Ip Op Ny Mu Ip Op ny mu ip op Ny Mu Ip Op ny mu"
          ])
        }
      },
      {
        id: "lesson5_3",
        title: { ru: "Регистр", de: "Großschreibung", en: "Case" },
        tips: {
          ru: [
            "Нажимай Shift противоположной рукой от основной буквы. Например, для большой «T» используй правый Shift, а букву нажимай левой рукой — так руки не сталкиваются и печать остаётся плавной."
          ],
          de: [
            "Drücke Shift mit der Hand gegenüber dem Buchstaben. Für ein großes T benutzt du zum Beispiel die rechte Shift-Taste und drückst den Buchstaben mit der linken Hand - so stoßen die Hände nicht zusammen und das Tippen bleibt flüssig."
          ],
          en: [
            "Press Shift with the hand opposite the main letter. For example, for a capital T, use the right Shift and press the letter with your left hand - this keeps the hands from colliding and typing stays smooth."
          ]
        },
        description: {
          ru: "Заглавные, имена, начало фраз",
          de: "Großbuchstaben, Namen und Satzanfänge",
          en: "Capitals, names and phrase starts"
        },
        symbolPolicy: {
          scope: "program",
          shift: true,
          ru: ["а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"],
          de: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü"],
          en: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        },
        target: { lines: 10, accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "Анна Вера Оля Лада Эля Мила Ира Нина Анна Вера Оля Лада Эля Мила Ира Нина",
            "Аня идет Вера идет Оля идет Мила идет Ира идет Нина идет Аня идет Вера идет",
            "Лада пишет Мила читает Ира учит Нина знает Лада пишет Мила читает Ира учит",
            "Анна мама Вера папа Оля дома Мила рядом Ира рада Нина рада Анна мама",
            "Утро тихо Анна встала Вера встала Оля встала Мила встала Ира встала",
            "Анна Вера Мила Ира Нина Лада Эля Оля Анна Вера Мила Ира Нина Лада",
            "Аня читает Вера пишет Оля учит Мила знает Ира читает Нина пишет Аня читает",
            "Лада дома Мила дома Ира дома Нина дома Анна дома Вера дома Лада дома",
            "Эля рада Оля рада Анна рада Вера рада Мила рада Ира рада Эля рада",
            "Утро рядом Анна идет Вера идет Мила идет Ира идет Нина идет Утро рядом"
          ]),
          de: practiceLines([
            "Anna Vera Olga Lara Ella Mila Ira Nina Anna Vera Olga Lara Ella Mila Ira Nina",
            "Anna geht Vera geht Olga geht Mila geht Ira geht Nina geht Anna geht Vera geht",
            "Lara lernt Mila liest Ira lernt Nina liest Lara lernt Mila liest Ira lernt",
            "Anna da Vera da Olga da Mila da Ira da Nina da Anna da Vera da Olga da",
            "Morgen leise Anna steht Vera steht Olga steht Mila steht Ira steht Nina steht",
            "Anna Vera Mila Ira Nina Lara Ella Olga Anna Vera Mila Ira Nina Lara Ella Olga",
            "Anna liest Vera schreibt Olga lernt Mila liest Ira lernt Nina schreibt Anna liest",
            "Lara da Mila da Ira da Nina da Anna da Vera da Lara da Mila da Ira da",
            "Ella froh Olga froh Anna froh Vera froh Mila froh Ira froh Ella froh Olga froh",
            "Morgen nah Anna geht Vera geht Mila geht Ira geht Nina geht Morgen nah Anna geht"
          ]),
          en: practiceLines([
            "Anna Vera Olga Lara Ella Mila Ira Nina Anna Vera Olga Lara Ella Mila Ira Nina",
            "Anna goes Vera goes Olga goes Mila goes Ira goes Nina goes Anna goes Vera goes",
            "Lara reads Mila learns Ira reads Nina learns Lara reads Mila learns Ira reads",
            "Anna home Vera home Olga home Mila home Ira home Nina home Anna home Vera home",
            "Morning quiet Anna starts Vera starts Olga starts Mila starts Ira starts Nina starts",
            "Anna Vera Mila Ira Nina Lara Ella Olga Anna Vera Mila Ira Nina Lara Ella Olga",
            "Anna reads Vera writes Olga learns Mila reads Ira learns Nina writes Anna reads",
            "Lara home Mila home Ira home Nina home Anna home Vera home Lara home Mila home",
            "Ella glad Olga glad Anna glad Vera glad Mila glad Ira glad Ella glad Olga glad",
            "Morning near Anna goes Vera goes Mila goes Ira goes Nina goes Morning near Anna goes"
          ])
        }
      },
      {
        id: "lesson5_4",
        title: { ru: "Слова-прыжки", de: "Sprungwörter", en: "Jump Words" },
        tips: {
          ru: [
            "В словах с большим разбросом по рядам не спеши возвращать скорость любой ценой. Сначала держи короткие точные движения, а темп подтянется сам."
          ],
          de: [
            "Bei Wörtern mit großen Sprüngen zwischen den Reihen solltest du die Geschwindigkeit nicht um jeden Preis zurückholen. Halte zuerst die Bewegungen kurz und genau; das Tempo kommt von selbst."
          ],
          en: [
            "With words that jump across rows, do not rush to regain speed at any cost. Keep the movements short and precise first; the pace will catch up on its own."
          ]
        },
        description: {
          ru: "Максимальный разброс по рядам",
          de: "Maximale Streuung über Reihen",
          en: "Maximum spread across rows"
        },
        symbolPolicy: {
          scope: "program",
          shift: true,
          ru: ["а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"],
          de: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü"],
          en: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        },
        target: { lines: 10, accuracy: 90, speed: 40 },
        lines: {
          ru: practiceLines([
            "прыжок крышка мышка нитка карта ветка ручка точка сучок мячик прыжок крышка мышка",
            "чистка книжка ниточка ручей веточка мячик точка крышка мышка чистка книжка ниточка",
            "Анна пишет Мила читает Вера учит Нина знает Анна пишет Мила читает Вера учит",
            "карта точка мышка ручка ветка нитка мячик книжка прыжок карта точка мышка",
            "Яна читает Ира пишет Оля учит Вера знает Мила читает Нина пишет Яна читает",
            "книжка ручка точка мячик ветка нитка крышка мышка прыжок книжка ручка точка",
            "Мила дома Анна рядом Вера пишет Ира читает Оля учит Нина знает Мила дома",
            "сучок ветка ручей нитка точка мячик мышка крышка карта сучок ветка ручей",
            "Анна ручка Вера книжка Мила точка Ира мячик Нина ветка Анна ручка Вера",
            "прыжок мячик точка ручка книжка нитка ветка карта мышка прыжок мячик точка"
          ]),
          de: practiceLines([
            "sprung brücke mixen tasten warten suchen ziehen finden lernen sprung brücke mixen",
            "wechsel brücke unten oben links rechts finger reihe sprung wechsel brücke unten",
            "Anna schreibt Mila liest Vera lernt Nina schreibt Anna schreibt Mila liest Vera lernt",
            "karte worte finger reihe brücke wechsel sprung mixen karte worte finger reihe",
            "Lara liest Ira schreibt Olga lernt Vera wartet Mila liest Nina schreibt Lara liest",
            "brücke reihe finger tasten suchen ziehen finden lernen sprung brücke reihe finger",
            "Mila da Anna nah Vera schreibt Ira liest Olga lernt Nina schreibt Mila da",
            "suchen warten ziehen lernen finger reihe brücke wechsel sprung suchen warten ziehen",
            "Anna finger Vera reihe Mila brücke Ira wechsel Nina tasten Anna finger Vera",
            "sprung mixen reihe finger brücke tasten warten suchen ziehen sprung mixen reihe"
          ]),
          en: practiceLines([
            "jumping bridge mixed typing waiting seeking moving finding learning jumping bridge mixed",
            "switch bridge under upper left right finger row jumping switch bridge under",
            "Anna writes Mila reads Vera learns Nina writes Anna writes Mila reads Vera learns",
            "chart words finger row bridge switch jumping mixed chart words finger row",
            "Lara reads Ira writes Olga learns Vera waits Mila reads Nina writes Lara reads",
            "bridge row finger typing seeking moving finding learning jumping bridge row finger",
            "Mila home Anna near Vera writes Ira reads Olga learns Nina writes Mila home",
            "seeking waiting moving learning finger row bridge switch jumping seeking waiting moving",
            "Anna finger Vera row Mila bridge Ira switch Nina typing Anna finger Vera",
            "jumping mixed row finger bridge typing waiting seeking moving jumping mixed row"
          ])
        }
      },
      {
        id: "lesson5_5",
        title: { ru: "Большой Тест 1", de: "Großer Test 1", en: "Big Test 1" },
        tips: {
          ru: [
            "Если во время теста станет сложнее — это нормально. Значит пальцы учатся полагаться на мышечную память, а не на подсказки."
          ],
          de: [
            "Wenn der Test schwieriger wird, ist das normal. Es bedeutet, dass deine Finger lernen, sich auf Muskelgedächtnis statt auf Hinweise zu verlassen."
          ],
          en: [
            "If the test starts feeling harder, that is normal. It means your fingers are learning to rely on muscle memory instead of hints."
          ]
        },
        description: {
          ru: "Весь алфавит и регистр",
          de: "Ganzes Alphabet und Großschreibung",
          en: "Full alphabet and case"
        },
        symbolPolicy: {
          scope: "program",
          shift: true,
          ru: ["а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"],
          de: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü"],
          en: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        },
        target: { lines: 20, accuracy: 90, speed: 40, assistants: false },
        lines: {
          ru: practiceLines([
            "Анна пишет Мила читает Вера учит Нина знает Оля рисует Лада дома Анна пишет",
            "прыжок крышка мышка нитка карта ветка ручка точка сучок мячик прыжок крышка",
            "Яна идет Ира идет Оля идет Мила идет Нина идет Вера идет Яна идет",
            "фыва олджэ кеап гнор мить йцуке нгшщзхъ ячсми тьбю Фыва Олджэ",
            "Мила дома Анна рядом Вера пишет Ира читает Оля учит Нина знает Мила дома",
            "карта точка мышка ручка ветка нитка мячик книжка прыжок карта точка мышка",
            "Анна ручка Вера книжка Мила точка Ира мячик Нина ветка Анна ручка",
            "чистка книжка ниточка ручей веточка мячик точка крышка мышка чистка книжка",
            "Оля рада Эля рада Анна рада Вера рада Мила рада Ира рада Оля рада",
            "сучок ветка ручей нитка точка мячик мышка крышка карта сучок ветка ручей",
            "Лада пишет Мила читает Ира учит Нина знает Лада пишет Мила читает Ира",
            "Фа Йа Ву Км Па Се Он Рн Го Шл Щд Зж Фа Йа Ву",
            "Яна читает Ира пишет Оля учит Вера знает Мила читает Нина пишет Яна",
            "мама папа тема вода лава жало овал книга нора гора мир тир рот тон",
            "Утро тихо Анна встала Вера встала Оля встала Мила встала Ира встала",
            "книжка ручка точка мячик ветка нитка крышка мышка прыжок книжка ручка",
            "Аня читает Вера пишет Оля учит Мила знает Ира читает Нина пишет Аня",
            "вал вода лава жало овал лад вдова элла эд мама папа тема книга",
            "Па Км Еч Ва Йс Фу Тн Ьг Бш Ющ Па Км Еч Ва Йс",
            "Анна Вера Мила Ира Нина Лада Эля Оля Яна Анна Вера Мила Ира"
          ]),
          de: practiceLines([
            "Anna schreibt Mila liest Vera lernt Nina schreibt Olga wartet Lara da Anna schreibt",
            "sprung brücke mixen tasten warten suchen ziehen finden lernen sprung brücke mixen",
            "Anna geht Vera geht Olga geht Mila geht Ira geht Nina geht Anna geht",
            "asdf jklöä rtfg uzjh vbnm qwert zuiopü yxcvb nm Asdf Jklöä",
            "Mila da Anna nah Vera schreibt Ira liest Olga lernt Nina schreibt Mila da",
            "karte worte finger reihe brücke wechsel sprung mixen karte worte finger reihe",
            "Anna finger Vera reihe Mila brücke Ira wechsel Nina tasten Anna finger",
            "wechsel brücke unten oben links rechts finger reihe sprung wechsel brücke unten",
            "Ella froh Olga froh Anna froh Vera froh Mila froh Ira froh Ella froh",
            "suchen warten ziehen lernen finger reihe brücke wechsel sprung suchen warten ziehen",
            "Lara lernt Mila liest Ira lernt Nina liest Lara lernt Mila liest Ira",
            "Fa Qa De Rv Gt Cy Jz Hz Uj Ik Ol Pö Fa Qa De",
            "Lara liest Ira schreibt Olga lernt Vera wartet Mila liest Nina schreibt Lara",
            "rat gut rot ton mut rum nur hut fern form gern gurt rat gut",
            "Morgen leise Anna steht Vera steht Olga steht Mila steht Ira steht Nina steht",
            "brücke reihe finger tasten suchen ziehen finden lernen sprung brücke reihe",
            "Anna liest Vera schreibt Olga lernt Mila liest Ira lernt Nina schreibt Anna",
            "als das falls lass fass saal da fall rat gut rot ton mut rum",
            "Gt Rv Tx Da Qc Fe Nz Mu Ip Oü Gt Rv Tx Da Qc",
            "Anna Vera Mila Ira Nina Lara Ella Olga Anna Vera Mila Ira Nina Lara"
          ]),
          en: practiceLines([
            "Anna writes Mila reads Vera learns Nina writes Olga waits Lara home Anna writes",
            "jumping bridge mixed typing waiting seeking moving finding learning jumping bridge mixed",
            "Anna goes Vera goes Olga goes Mila goes Ira goes Nina goes Anna goes",
            "asdf jkl rtfg uyjh vbnm qwert yuiop zxcvb nm Asdf Jkl",
            "Mila home Anna near Vera writes Ira reads Olga learns Nina writes Mila home",
            "chart words finger row bridge switch jumping mixed chart words finger row",
            "Anna finger Vera row Mila bridge Ira switch Nina typing Anna finger",
            "switch bridge under upper left right finger row jumping switch bridge under",
            "Ella glad Olga glad Anna glad Vera glad Mila glad Ira glad Ella glad",
            "seeking waiting moving learning finger row bridge switch jumping seeking waiting moving",
            "Lara reads Mila learns Ira reads Nina learns Lara reads Mila learns Ira",
            "Fa Qa De Rv Gt Cz Jy Hy Uj Ik Ol Pk Fa Qa De",
            "Lara reads Ira writes Olga learns Vera waits Mila reads Nina writes Lara",
            "run rug hut hum turn burn hurt hunt front form grunt run rug hut",
            "Morning quiet Anna starts Vera starts Olga starts Mila starts Ira starts Nina starts",
            "bridge row finger typing seeking moving finding learning jumping bridge row",
            "Anna reads Vera writes Olga learns Mila reads Ira learns Nina writes Anna",
            "all sad dad ask fall lass flask lads glass add run rug hut hum",
            "Gt Rv Tx Da Qc Fe Ny Mu Ip Op Gt Rv Tx Da Qc",
            "Anna Vera Mila Ira Nina Lara Ella Olga Anna Vera Mila Ira Nina Lara"
          ])
        }
      }
    ]
  });
})();
