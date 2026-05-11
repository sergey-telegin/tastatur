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
    id: "module4",
    title: { ru: "Module 4 — Нижний ряд", de: "Modul 4 — Untere Reihe", en: "Module 4 — Bottom Row" },
    symbols: {
      ru: ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю"],
      de: ["y", "x", "c", "v", "b", "n", "m"],
      en: ["z", "x", "c", "v", "b", "n", "m"]
    },
    lessons: [
      {
        id: "lesson4_1",
        title: { ru: "Низ слева", de: "Unten links", en: "Bottom Left" },
        tips: {
          ru: [
            "Смотри только в экран, даже если очень хочется подсмотреть на клавиши. Именно так развивается мышечная память, которая и делает печать по-настоящему слепой."
          ],
          de: [
            "Schau nur auf den Bildschirm, auch wenn du gern auf die Tasten schauen würdest. Genau so entsteht Muskelgedächtnis, und daraus wird echtes Blindtippen."
          ],
          en: [
            "Keep your eyes on the screen, even if you really want to peek at the keys. This is how muscle memory grows and turns typing into true touch typing."
          ]
        },
        symbolPolicy: {
          scope: "lesson",
          ru: ["я", "ч", "с", "м", "и"],
          de: ["y", "x", "c", "v", "b"],
          en: ["z", "x", "c", "v", "b"]
        },
        target: { lines: 10, accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "ячсми ячсми ячсми имсчя имсчя чясим чясим ячсми имсчя чясим",
            "яя чч сс мм ии яя ии мм сс чч яя чч сс мм ии яя ии мм сс чч",
            "ясми чмси мияч сичя ясми чмси мияч сичя ясми чмси мияч",
            "чяс сми мич ися чяс сми мич ися чяс сми мич ися чяс сми",
            "яма чим сич мия яма чим сич мия яма чим сич мия яма чим",
            "яяя ччч ссс ммм иии яяя ччч ссс ммм иии яяя ччч ссс",
            "мияч ссия ячми мияч ссия ячми мияч ссия ячми мияч ссия",
            "ячс мич сим чая ячс мич сим чая ячс мич сим чая ячс мич",
            "ями чич сяс мим ями чич сяс мим ями чич сяс мим ями чич",
            "ячсмиячсми имсчяимсчя чясимчясим ячсмиячсми имсчяимсчя"
          ]),
          de: practiceLines([
            "yxcvb yxcvb yxcvb bvcxy bvcxy xycbv xycbv yxcvb bvcxy xycbv",
            "yy xx cc vv bb yy bb vv cc xx yy xx cc vv bb yy bb vv cc xx",
            "ycvb xvcb vbyx cbxy ycvb xvcb vbyx cbxy ycvb xvcb vbyx",
            "xyc cvb vbx bcy xyc cvb vbx bcy xyc cvb vbx bcy xyc cvb",
            "yvb xbv cbx vby yvb xbv cbx vby yvb xbv cbx vby yvb xbv",
            "yyy xxx ccc vvv bbb yyy xxx ccc vvv bbb yyy xxx ccc",
            "vbyx ccby ycvb vbyx ccby ycvb vbyx ccby ycvb vbyx ccby",
            "yxc vbx cbv xyx yxc vbx cbv xyx yxc vbx cbv xyx yxc vbx",
            "yvb xbx cyc vbv yvb xbx cyc vbv yvb xbx cyc vbv yvb xbx",
            "yxcvbyxcvb bvcxybvcxy xycbvxycbv yxcvbyxcvb bvcxybvcxy"
          ]),
          en: practiceLines([
            "zxcvb zxcvb zxcvb bvcxz bvcxz xzcbv xzcbv zxcvb bvcxz xzcbv",
            "zz xx cc vv bb zz bb vv cc xx zz xx cc vv bb zz bb vv cc xx",
            "zcvb xvcb vbzx cbxz zcvb xvcb vbzx cbxz zcvb xvcb vbzx",
            "xzc cvb vbx bcz xzc cvb vbx bcz xzc cvb vbx bcz xzc cvb",
            "zvb xbv cbx vbz zvb xbv cbx vbz zvb xbv cbx vbz zvb xbv",
            "zzz xxx ccc vvv bbb zzz xxx ccc vvv bbb zzz xxx ccc",
            "vbzx ccbz zcvb vbzx ccbz zcvb vbzx ccbz zcvb vbzx ccbz",
            "zxc vbx cbv xzx zxc vbx cbv xzx zxc vbx cbv xzx zxc vbx",
            "zvb xbx czc vbv zvb xbx czc vbv zvb xbx czc vbv zvb xbx",
            "zxcvbzxcvb bvcxzbvcxz xzcbvxzcbv zxcvbzxcvb bvcxzbvcxz"
          ])
        }
      },
      {
        id: "lesson4_2",
        title: { ru: "Низ справа", de: "Unten rechts", en: "Bottom Right" },
        tips: {
          ru: [
            "Нажимай пробел противоположным большим пальцем: если последнюю букву нажала правая рука — пробел нажимает левый большой палец, и наоборот. Так руки работают по очереди, движения становятся плавнее, а пальцы не мешают друг другу во время быстрого набора."
          ],
          de: [
            "Drücke die Leertaste mit dem gegenüberliegenden Daumen: Wenn der letzte Buchstabe mit der rechten Hand kam, drückt der linke Daumen die Leertaste, und umgekehrt. So arbeiten die Hände abwechselnd, die Bewegungen werden flüssiger, und die Finger kommen sich beim schnellen Tippen nicht in die Quere."
          ],
          en: [
            "Press Space with the opposite thumb: if the last letter was typed with the right hand, use the left thumb for Space, and the other way around. This lets the hands alternate, makes movement smoother, and keeps the fingers from getting in each other's way."
          ]
        },
        symbolPolicy: {
          scope: "lesson",
          ru: ["т", "ь", "б", "ю"],
          de: ["n", "m"],
          en: ["n", "m"]
        },
        target: { lines: 10, accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "тьбю тьбю тьбю юбьт юбьт бтюь бтюь тьбю юбьт бтюь тьбю",
            "тт ьь бб юю тт юю ьь бб тт бб юю ьь тт ьь бб юю тт юю",
            "тбтб ьюью бютю тьть тбтб ьюью бютю тьть тбтб ьюью",
            "бть ьюб ютб тью бть ьюб ютб тью бть ьюб ютб тью",
            "тюб ьтю бют ютб тюб ьтю бют ютб тюб ьтю бют ютб",
            "ттт ььь ббб ююю ттт ььь ббб ююю ттт ььь ббб ююю",
            "ютть ьббю бюют ютть ьббю бюют ютть ьббю бюют",
            "тбт ьюь юню бть тбт ьюь юню бть тбт ьюь юню бть",
            "тют ьбь бюб тьт тют ьбь бюб тьт тют ьбь бюб тьт",
            "тьбютьбю юбьтюбьт бтюьбтюь тьбютьбю юбьтюбьт"
          ]),
          de: practiceLines([
            "nm nm nm mn mn nn mm nm mn nm nn mm nm mn nm nn mm nm",
            "nn mm nn mm nn mm mm nn nn mm nn mm nn mm mm nn nn mm",
            "nmnm mnmn nnmm mmnn nmnm mnmn nnmm mmnn nmnm mnmn",
            "nmm mnn nnm mmn nmm mnn nnm mmn nmm mnn nnm mmn",
            "mnm nmn mmn nnm mnm nmn mmn nnm mnm nmn mmn nnm",
            "nnn mmm nnn mmm nnn mmm nnn mmm nnn mmm nnn mmm",
            "mnnm nmmn mmnn mnnm nmmn mmnn mnnm nmmn mmnn",
            "nmn mnm mmm nnn nmn mnm mmm nnn nmn mnm mmm nnn",
            "nmn mmm mnm nnn nmn mmm mnm nnn nmn mmm mnm nnn",
            "nmnm nmnm mnmn mnmn nnmm nnmm nmnm nmnm mnmn mnmn"
          ]),
          en: practiceLines([
            "nm nm nm mn mn nn mm nm mn nm nn mm nm mn nm nn mm nm",
            "nn mm nn mm nn mm mm nn nn mm nn mm nn mm mm nn nn mm",
            "nmnm mnmn nnmm mmnn nmnm mnmn nnmm mmnn nmnm mnmn",
            "nmm mnn nnm mmn nmm mnn nnm mmn nmm mnn nnm mmn",
            "mnm nmn mmn nnm mnm nmn mmn nnm mnm nmn mmn nnm",
            "nnn mmm nnn mmm nnn mmm nnn mmm nnn mmm nnn mmm",
            "mnnm nmmn mmnn mnnm nmmn mmnn mnnm nmmn mmnn",
            "nmn mnm mmm nnn nmn mnm mmm nnn nmn mnm mmm nnn",
            "nmn mmm mnm nnn nmn mmm mnm nnn nmn mmm mnm nnn",
            "nmnm nmnm mnmn mnmn nnmm nnmm nmnm nmnm mnmn mnmn"
          ])
        }
      },
      {
        id: "lesson4_3",
        title: { ru: "Нижний ряд", de: "Untere Reihe", en: "Bottom Row" },
        tips: {
          ru: [
            "Не тянись к клавишам всей рукой. В хорошей технике двигаются в основном пальцы, а кисть остаётся почти на месте."
          ],
          de: [
            "Greif nicht mit der ganzen Hand nach den Tasten. Bei guter Technik bewegen sich vor allem die Finger, während die Hand fast an Ort und Stelle bleibt."
          ],
          en: [
            "Do not reach for keys with your whole hand. In good technique, the fingers do most of the movement while the hand stays almost in place."
          ]
        },
        symbolPolicy: {
          scope: "module",
          ru: ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю"],
          de: ["y", "x", "c", "v", "b", "n", "m"],
          en: ["z", "x", "c", "v", "b", "n", "m"]
        },
        target: { lines: 10, accuracy: 90, speedMax: 120 },
        lines: {
          ru: practiceLines([
            "ячсми тьбю ячсми тьбю имсчя юбьт ячсми тьбю ячсми тьбю",
            "я т ч ь с б м ю и я т ч ь с б м ю и я т ч ь с б",
            "яс тб чм ью си яю яс тб чм ью си яю яс тб чм ью си",
            "мит чью сяя тьб мит чью сяя тьб мит чью сяя тьб",
            "ячт сми бью тся ячт сми бью тся ячт сми бью тся",
            "ячсмитьбю юбьтимсчя ячсмитьбю юбьтимсчя ячсмитьбю",
            "ями тью чси мбю ями тью чси мбю ями тью чси мбю",
            "ят чь сб мю ит ят чь сб мю ит ят чь сб мю ит",
            "мим ьчь ятя сис мим ьчь ятя сис мим ьчь ятя сис",
            "ячсми тьбю мич юьт ячсми тьбю мич юьт ячсми тьбю"
          ]),
          de: practiceLines([
            "yxcvb nm yxcvb nm bvcxy mn yxcvb nm yxcvb nm yxcvb nm",
            "y n x m c n v m b y n x m c n v m b y n x m c n",
            "yc nb xv mm cb ym yc nb xv mm cb ym yc nb xv mm cb",
            "vbn xmm cyy nmm vbn xmm cyy nmm vbn xmm cyy nmm",
            "yxn cvb mmn ncy yxn cvb mmn ncy yxn cvb mmn ncy",
            "yxcvbnm mnbvcxy yxcvbnm mnbvcxy yxcvbnm mnbvcxy",
            "yvb nmm xcb vmn yvb nmm xcb vmn yvb nmm xcb vmn",
            "yn xm cn vm bn yn xm cn vm bn yn xm cn vm bn",
            "vbv mxm yny cbc vbv mxm yny cbc vbv mxm yny cbc",
            "yxcvb nm vbx mn yxcvb nm vbx mn yxcvb nm yxcvb nm"
          ]),
          en: practiceLines([
            "zxcvb nm zxcvb nm bvcxz mn zxcvb nm zxcvb nm zxcvb nm",
            "z n x m c n v m b z n x m c n v m b z n x m c n",
            "zc nb xv mm cb zm zc nb xv mm cb zm zc nb xv mm cb",
            "vbn xmm czy nmm vbn xmm czy nmm vbn xmm czy nmm",
            "zxn cvb mmn ncz zxn cvb mmn ncz zxn cvb mmn ncz",
            "zxcvbnm mnbvcxz zxcvbnm mnbvcxz zxcvbnm mnbvcxz",
            "zvb nmm xcb vmn zvb nmm xcb vmn zvb nmm xcb vmn",
            "zn xm cn vm bn zn xm cn vm bn zn xm cn vm bn",
            "vbv mxm znz cbc vbv mxm znz cbc vbv mxm znz cbc",
            "zxcvb nm vbx mn zxcvb nm vbx mn zxcvb nm zxcvb nm"
          ])
        }
      },
      {
        id: "lesson4_4",
        title: { ru: "Короткие слова", de: "Kurze Wörter", en: "Short Words" },
        tips: {
          ru: [
            "Проверим ещё раз настройку аппликатуры? Ты оптимально используешь пальцы? Тебе удобно?"
          ],
          de: [
            "Wollen wir die Fingerzuordnung noch einmal prüfen? Nutzt du deine Finger optimal? Fühlt es sich bequem an?"
          ],
          en: [
            "Shall we check the fingering setup again? Are you using your fingers well? Does it feel comfortable?"
          ]
        },
        symbolPolicy: {
          scope: "module",
          ru: ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю"],
          de: ["y", "x", "c", "v", "b", "n", "m"],
          en: ["z", "x", "c", "v", "b", "n", "m"]
        },
        target: { lines: 10, accuracy: 90, speed: 40 },
        lines: {
          ru: practiceLines([
            "мяч час сям мяс тишь тьма туча бита юла мим мяч час сям мяс тишь тьма",
            "туча бита мяч час мяс юла тишь тьма мим туча бита мяч час мяс юла",
            "мим мяч час тьма тишь юла бита мяс туча мим мяч час тьма тишь юла",
            "час мяч мяс туча бита тьма тишь юла мим час мяч мяс туча бита тьма",
            "мяч мяч час час мяс мяс тишь тишь тьма тьма туча туча бита бита",
            "юла бита туча тьма тишь мяс час мяч мим юла бита туча тьма тишь",
            "туча час мяч мяс тьма тишь бита юла мим туча час мяч мяс тьма",
            "мяс мяч час тишь тьма бита юла туча мим мяс мяч час тишь тьма",
            "бита юла туча мяс час мяч тьма тишь мим бита юла туча мяс час",
            "мяч час сям мяс тишь тьма туча бита юла мим мяч час сям мяс тишь"
          ]),
          de: practiceLines([
            "mix nix vim bin min my bin nix mix vim min bin nix mix vim min",
            "bin nix mix vim min my bin nix mix vim min my bin nix mix vim",
            "vim min bin nix mix my vim min bin nix mix my vim min bin nix",
            "nix mix vim bin min my nix mix vim bin min my nix mix vim bin",
            "mix mix nix nix vim vim bin bin min min my my mix mix nix nix",
            "my min bin vim nix mix my min bin vim nix mix my min bin vim",
            "bin vim mix nix min my bin vim mix nix min my bin vim mix nix",
            "vim mix nix min bin my vim mix nix min bin my vim mix nix min",
            "min my bin nix mix vim min my bin nix mix vim min my bin nix",
            "mix nix vim bin min my bin nix mix vim min bin nix mix vim min"
          ]),
          en: practiceLines([
            "mix nix vim bin min my bin nix mix vim min bin nix mix vim min",
            "bin nix mix vim min my bin nix mix vim min my bin nix mix vim",
            "vim min bin nix mix my vim min bin nix mix my vim min bin nix",
            "nix mix vim bin min my nix mix vim bin min my nix mix vim bin",
            "mix mix nix nix vim vim bin bin min min my my mix mix nix nix",
            "my min bin vim nix mix my min bin vim nix mix my min bin vim",
            "bin vim mix nix min my bin vim mix nix min my bin vim mix nix",
            "vim mix nix min bin my vim mix nix min bin my vim mix nix min",
            "min my bin nix mix vim min my bin nix mix vim min my bin nix",
            "mix nix vim bin min my bin nix mix vim min bin nix mix vim min"
          ])
        }
      },
      {
        id: "lesson4_5",
        title: { ru: "Тест", de: "Test", en: "Test" },
        tips: {
          ru: [
            "Ассистенты выключены специально: именно в такие моменты слепая печать начинает превращаться в настоящий навык."
          ],
          de: [
            "Die Assistenten sind absichtlich ausgeschaltet: Genau in solchen Momenten wird Blindtippen zu einer echten Fähigkeit."
          ],
          en: [
            "The assistants are off on purpose: moments like this are where touch typing starts becoming a real skill."
          ]
        },
        symbolPolicy: {
          scope: "program",
          ru: ["ф", "ы", "в", "а", "о", "л", "д", "ж", "э", "к", "е", "п", "г", "н", "р", "м", "и", "т", "ь", "й", "ц", "у", "ш", "щ", "з", "х", "ъ", "я", "ч", "с", "б", "ю"],
          de: ["a", "s", "d", "f", "j", "k", "l", "ö", "ä", "r", "t", "g", "u", "z", "h", "v", "b", "n", "m", "q", "w", "e", "i", "o", "p", "ü", "y", "x", "c"],
          en: ["a", "s", "d", "f", "j", "k", "l", "r", "t", "g", "u", "y", "h", "v", "b", "n", "m", "q", "w", "e", "i", "o", "p", "z", "x", "c"]
        },
        target: { lines: 15, accuracy: 90, speed: 40, assistants: false },
        lines: {
          ru: practiceLines([
            "мама папа тема вода лава книга нора гора мяч час тьма туча бита юла",
            "фыва олджэ кеап гнор мить йцуке нгшщзхъ ячсми тьбю мама папа тема",
            "лава вода мама папа книга нора гора тема мир тир рот тон мяч час мяс",
            "к е а п г н о р м и т ь й ц у к е н г ш щ з х ъ я ч с м и т ь б ю",
            "мама папа тема книга нора гора рот тон мир тир кит нить мяч час туча",
            "вал вода лава жало овал лад вдова элла эд мама папа тема мяч час",
            "йцуке нгшщзхъ ячсми тьбю кеап гнор мить фыва олджэ мама папа вода",
            "мама мама папа папа вода вода лава лава тема тема мяч мяч час час",
            "нить книга нора гора тема папа мама кит мир тир рот тон мяч тьма",
            "фываолджэ кеапгнор митьмить йцукенгшщзхъ ячсмитьбю мама папа тема",
            "жало лава вода овал вал лад эд элла вдова мяч час тьма туча бита",
            "вдова вода вал овал лава лад жало элла эд нить книга нора гора тема",
            "элла эд вал лад вода лава жало овал вдова ячсми тьбю мама папа",
            "олджэ фыва кеап гнор мить йцуке нгшщзхъ ячсми тьбю вал вода",
            "мама папа тема вода лава жало овал книга нора гора мир тир мяч час"
          ]),
          de: practiceLines([
            "rat gut rot ton mut rum nur hut wert quit mix nix vim bin min my",
            "asdf jklöä rtfg uzjh vbnm qwert zuiopü yxcvb nm rat gut rot ton",
            "fass lass saal fall als das da rat gut rot ton mix nix vim bin",
            "a s d f j k l ö ä r t g u z h v b n m q w e i o p ü y x c",
            "rat gut fern form gern gurt mut rum nur hut rot ton mix nix vim",
            "als das falls lass fass saal da fall rat gut rot ton mix nix",
            "qwert zuiopü yxcvb nm rtfg uzjh vbnm asdf jklöä rat gut rot",
            "rat rat gut gut rot rot ton ton mut mut mix mix nix nix",
            "fern form gern gurt rat gut rot ton mut rum nur hut mix min",
            "asdfjklöä rtfguzjh vbnmvbnm qwertzuiopü yxcvbnm rat gut rot",
            "fass lass saal fall da als asdf jklöä mix nix vim bin min",
            "fall falls als das lass fass saal da fern form gern gurt rat",
            "saal da als das falls lass fass fall yxcvb nm rat gut rot",
            "jklöä asdf rtfg uzjh vbnm qwert zuiopü yxcvb nm als das",
            "rat gut rot ton mut rum nur hut als das falls lass mix nix"
          ]),
          en: practiceLines([
            "run rug hut hum turn burn hurt hunt tree type mix nix vim bin min my",
            "asdf jkl rtfg uyjh vbnm qwert yuiop zxcvb nm run rug hut hum",
            "fall lass flask glass all sad dad run rug hut hum mix nix vim bin",
            "a s d f j k l r t g u y h v b n m q w e i o p z x c",
            "run rug front form grunt turn burn hum hut hurt hunt mix nix vim",
            "all sad dad ask fall lass flask lads glass add run rug mix nix",
            "qwert yuiop zxcvb nm rtfg uyjh vbnm asdf jkl run rug hut",
            "run run rug rug hut hut hum hum turn turn mix mix nix nix",
            "front form grunt run rug hut hum turn burn hurt hunt mix min",
            "asdfjkl rtfguyjh vbnmvbnm qwertyuiop zxcvbnm run rug hut",
            "fall lass flask glass add all asdf jkl mix nix vim bin min",
            "lads fall lass flask glass add front form grunt run rug hut",
            "glass add all sad dad ask fall lass zxcvb nm run rug hut",
            "jkl asdf rtfg uyjh vbnm qwert yuiop zxcvb nm all sad",
            "run rug hut hum turn burn hurt hunt all sad dad ask mix nix"
          ])
        }
      }
    ]
  });
})();
