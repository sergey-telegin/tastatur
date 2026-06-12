window.PRACTICE_CONTENT_SOURCE.modules = window.PRACTICE_CONTENT_SOURCE.modules || [];
window.PRACTICE_CONTENT_SOURCE.modules.push({
  id: "module1",
  title: { ru: "Модуль 1 — Домашний ряд", de: "Modul 1 — Grundreihe", en: "Module 1 — Home Row" },
  symbols: {
    ru: ["ф", "ы", "в", "а", "о", "л", "д", "ж", "э"],
    de: ["a", "s", "d", "f", "j", "k", "l", "ö", "ä"],
    en: ["a", "s", "d", "f", "j", "k", "l"]
  },
  lessons: [
    {
      id: "lesson1_1",
      title: { ru: "Левая рука", de: "Linke Hand", en: "Left Hand" },
      tips: {
        ru: [
          "Сначала указательные пальцы положи на клавиши с «пупырышками» — А и О, потом разложи остальные пальцы, потом начинай печатать."
        ],
        de: [
          "Lege zuerst deine Zeigefinger auf die Tasten mit den kleinen Markierungen - F und J. Dann ordne die restlichen Finger ein und beginne erst danach zu tippen."
        ],
        en: [
          "First place your index fingers on the keys with the little bumps - F and J. Then set the rest of your fingers in place and start typing."
        ]
      },
      symbolPolicy: {
        scope: "lesson",
        ru: ["ф", "ы", "в", "а"],
        de: ["a", "s", "d", "f"],
        en: ["a", "s", "d", "f"]
      },
      content: { lineCount: 5 },
      scoring: { accuracy: 90, speedMax: 120 },
      lines: {
        ru: [
          "фыва фыва фыва фыва вафы вафы авыф авыф фыва вафы авыф фыва вафы авыф авыф фыва фыва вафы авыф авыф фыва фыва фыва фыва вафы вафы",
          "фф ыы вв аа фф вв ыы аа фф аа вв ыы фф ыы вв аа фф вв ыы аа фф аа вв ыы фф ыы вв аа фф вв ыы аа фф ыы вв аа фф вв ыы аа фф аа вв",
          "авав ывыв фафа вава авав ывыв фафа вава авав ывыв фафа вава авав ывыв фафа вава авав ывыв фафа вава авав ывыв фафа вава авав ывыв",
          "афф фыв ваф афф фыв ваф афф фыв ваф афф фыв ваф афф фыв ваф афф фыв ваф афф фыв ваф афф фыв ваф афф фыв ваф афф фыв ваф афф фыв",
          "ава афа авы ава афа авы ава афа авы ава афа авы ава афа авы ава афа авы ава афа авы ава афа авы ава афа авы ава афа авы ава афа"
        ],
        de: [
          "asdf asdf asdf asdf fdsa fdsa adsf adsf asdf fdsa adsf asdf fdsa adsf adsf asdf asdf fdsa adsf adsf asdf asdf asdf asdf fdsa fdsa",
          "aa ss dd ff aa dd ss ff aa ff dd ss aa ss dd ff aa dd ss ff aa ff dd ss aa ss dd ff aa dd ss ff aa ss dd ff aa dd ss ff aa ff dd",
          "asas sdsd afaf dada asas sdsd afaf dada asas sdsd afaf dada asas sdsd afaf dada asas sdsd afaf dada asas sdsd afaf dada asas sdsd",
          "aff asd daf aff asd daf aff asd daf aff asd daf aff asd daf aff asd daf aff asd daf aff asd daf aff asd daf aff asd daf aff asd",
          "ada afa ads ada afa ads ada afa ads ada afa ads ada afa ads ada afa ads ada afa ads ada afa ads ada afa ads ada afa ads ada afa"
        ],
        en: [
          "asdf asdf asdf asdf fdsa fdsa adsf adsf asdf fdsa adsf asdf fdsa adsf adsf asdf asdf fdsa adsf adsf asdf asdf asdf asdf fdsa fdsa",
          "aa ss dd ff aa dd ss ff aa ff dd ss aa ss dd ff aa dd ss ff aa ff dd ss aa ss dd ff aa dd ss ff aa ss dd ff aa dd ss ff aa ff dd",
          "asas sdsd afaf dada asas sdsd afaf dada asas sdsd afaf dada asas sdsd afaf dada asas sdsd afaf dada asas sdsd afaf dada asas sdsd",
          "aff asd daf aff asd daf aff asd daf aff asd daf aff asd daf aff asd daf aff asd daf aff asd daf aff asd daf aff asd daf aff asd",
          "ada afa ads ada afa ads ada afa ads ada afa ads ada afa ads ada afa ads ada afa ads ada afa ads ada afa ads ada afa ads ada afa"
        ]
      }
    },
    {
      id: "lesson1_2",
      title: { ru: "Правая рука", de: "Rechte Hand", en: "Right Hand" },
      tips: {
        ru: [
          "Сиди прямо и не горбись. Твои глаза должны быть на уровне верхней части монитора, а локти — согнуты под углом 90°. Но главное, чтобы удобно было, конечно!"
        ],
        de: [
          "Sitz aufrecht und mach dich nicht krumm. Deine Augen sollten etwa auf Höhe des oberen Monitorbereichs sein, die Ellbogen ungefähr im 90-Grad-Winkel. Am wichtigsten ist natürlich, dass es bequem bleibt!"
        ],
        en: [
          "Sit upright and do not hunch over. Your eyes should be level with the upper part of the monitor, and your elbows bent at about 90 degrees. Most importantly, stay comfortable!"
        ]
      },
      symbolPolicy: {
        scope: "lesson",
        ru: ["о", "л", "д", "ж", "э"],
        de: ["j", "k", "l", "ö", "ä"],
        en: ["j", "k", "l"]
      },
      content: { lineCount: 5 },
        scoring: { accuracy: 90, speedMax: 120 },
      lines: {
        ru: [
          "олджэ олджэ олджэ эдлож эдлож жэдло олджэ жэдло дэлжо олджэ лдэож олджэ жэдло дэлжо олджэ олджэ олджэ олджэ эдлож эдлож жэдло",
          "оо лл дд жж ээ оо ээ жж дд лл оо лл дд жж ээ оо ээ жж дд лл оо лл дд жж ээ оо ээ жж дд лл оо лл дд жж ээ оо ээ жж дд лл оо лл дд",
          "олол длдл жэжэ эжэж олол длдл жэжэ эжэж олол длдл жэжэ эжэж олол длдл жэжэ эжэж олол длдл жэжэ эжэж олол длдл жэжэ эжэж олол длдл",
          "ожо лэл дод жож эло ожо лэл дод жож эло ожо лэл дод жож эло ожо лэл дод жож эло ожо лэл дод жож эло ожо лэл дод жож эло ожо лэл",
          "олд жэл лод эжо олд жэл лод эжо олд жэл лод эжо олд жэл лод эжо олд жэл лод эжо олд жэл лод эжо олд жэл лод эжо олд жэл лод эжо"
        ],
        de: [
          "jklöä jklöä jklöä älökj älökj öäklj jklöä öäklj käölj jklöä löäjk jklöä öäklj käölj jklöä jklöä jklöä jklöä älökj älökj öäklj",
          "jj kk ll öö ää jj ää öö ll kk jj kk ll öö ää jj ää öö ll kk jj kk ll öö ää jj ää öö ll kk jj kk ll öö ää jj ää öö ll kk jj kk ll",
          "jkjk lklk öäöä äöäö jkjk lklk öäöä äöäö jkjk lklk öäöä äöäö jkjk lklk öäöä äöäö jkjk lklk öäöä äöäö jkjk lklk öäöä äöäö jkjk lklk",
          "jöj käk löl äjö jöj käk löl äjö jöj käk löl äjö jöj käk löl äjö jöj käk löl äjö jöj käk löl äjö jöj käk löl äjö jöj käk löl äjö",
          "jkl öäl lkj äjö jkl öäl lkj äjö jkl öäl lkj äjö jkl öäl lkj äjö jkl öäl lkj äjö jkl öäl lkj äjö jkl öäl lkj äjö jkl öäl lkj äjö"
        ],
        en: [
          "jkl jkl jkl lkj lkj klj jkl klj k lj jkl l jk jkl klj k lj jkl jkl jkl jkl lkj lkj klj jkl jkl jkl lkj lkj klj jkl klj k lj jkl l",
          "jj kk ll jj ll kk jj kk ll jj ll kk jj kk ll jj ll kk jj kk ll jj ll kk jj kk ll jj kk ll jj ll kk jj kk ll jj ll kk jj kk ll jj",
          "jkjk lklk jkjk lklk jkjk lklk jkjk lklk jkjk lklk jkjk lklk jkjk lklk jkjk lklk jkjk lklk jkjk lklk jkjk lklk jkjk lklk jkjk lklk",
          "j j k k l l j j j k k l l j j j k k l l j j j k k l l j j j k k l l j j j k k l l j j j k k l l j j j k k l l j",
          "jkl l lkj j jkl l lkj j jkl l lkj j jkl l lkj j jkl l lkj j jkl l lkj j jkl l lkj j jkl l lkj j jkl l lkj j jkl l lkj j jkl l lkj"
        ]
      }
    },
    {
      id: "lesson1_3",
      title: { ru: "Обе руки", de: "Beide Hände", en: "Both Hands" },
      tips: {
        ru: [
          "Используй все десять пальцев! Не печатай только двумя пальцами. Каждому пальцу — своя зона! Даже моим маленьким крылышкам было бы трудно, если бы я работала в одиночку."
        ],
        de: [
          "Benutze alle zehn Finger! Tippe nicht nur mit zwei Fingern. Jeder Finger hat seine eigene Zone. Selbst meine kleinen Flügel hätten es schwer, wenn sie alles allein machen müssten."
        ],
        en: [
          "Use all ten fingers! Do not type with only two fingers. Every finger has its own zone. Even my little wings would struggle if they had to work alone."
        ]
      },
      symbolPolicy: {
        scope: "module",
        ru: ["ф", "ы", "в", "а", "о", "л", "д", "ж", "э"],
        de: ["a", "s", "d", "f", "j", "k", "l", "ö", "ä"],
        en: ["a", "s", "d", "f", "j", "k", "l"]
      },
      content: { lineCount: 10 },
        scoring: { accuracy: 90, speedMax: 120 },
      lines: {
        ru: [
          "фыва олджэ фыва олджэ фыва олджэ фыва олджэ вафы эдлож вафы эдлож авыф жэдло авыф жэдло фыва олджэ фыва олджэ фыва олджэ фыва",
          "фа жо вы лд ыв эж аф ол фа жо вы лд ыв эж аф ол фа жо вы лд ыв эж аф ол фа жо вы лд фа жо вы лд ыв эж аф ол фа жо вы лд ыв эж аф",
          "ав ол ыд фж вэ ав ол ыд фж вэ ав ол ыд фж вэ ав ол ыд фж вэ ав ол ыд фж вэ ав ол ав ол ыд фж вэ ав ол ыд фж вэ ав ол ыд фж вэ ав",
          "фо ал ыж вэ ад лф ож эы фо ал ыж вэ ад лф ож эы фо ал ыж вэ ад лф ож эы фо ал ыж вэ ад лф ож эы фо ал ыж вэ ад лф ож эы фо ал ыж",
          "ва ол фэ дж ыд аж во лэ ва ол фэ дж ыд аж во лэ ва ол фэ дж ыд аж во лэ ва ол фэ дж ыд аж во лэ ва ол фэ дж ыд аж во лэ ва ол фэ",
          "фываолджэ олджэфыва фываолджэ олджэфыва фываолджэ олджэфыва фываолджэ олджэфыва фываолджэ олджэфыва фываолджэ олджэфыва фываолджэ",
          "афы олд жэо ваф дло жыэ афы олд жэо ваф дло жыэ афы олд жэо ваф дло жыэ афы олд жэо ваф дло жыэ афы олд жэо ваф дло жыэ афы олд",
          "ао вл ыд фж эа оа лв ды жф ао вл ыд фж эа оа лв ды жф ао вл ыд фж ао вл ыд фж эа оа лв ды жф ао вл ыд фж эа оа лв ды жф ао вл ыд",
          "фы ол ва дж эа фы ол ва дж эа фы ол ва дж эа фы ол ва дж эа фы ол ва дж эа фы ол ва дж эа фы ол ва дж эа фы ол ва дж эа фы ол ва",
          "авыф эдлож фыва олджэ авыф эдлож фыва олджэ авыф эдлож фыва олджэ авыф эдлож авыф эдлож фыва олджэ авыф эдлож фыва олджэ авыф"
        ],
        de: [
          "asdf jklöä asdf jklöä asdf jklöä asdf jklöä fdsa älökj fdsa älökj adsf öäklj adsf öäklj asdf jklöä asdf jklöä asdf jklöä asdf",
          "af jö sd lk ds äö fa jk af jö sd lk ds äö fa jk af jö sd lk ds äö fa jk af jö sd lk af jö sd lk ds äö fa jk af jö sd lk ds äö fa",
          "ad jk sl fö dä ad jk sl fö dä ad jk sl fö dä ad jk sl fö dä ad jk sl fö dä ad jk ad jk sl fö dä ad jk sl fö dä ad jk sl fö dä ad",
          "fj ak sö dä al kf jö äd fj ak sö dä al kf jö äd fj ak sö dä al kf jö äd fj ak sö dä al kf jö äd fj ak sö dä al kf jö äd fj ak sö",
          "da jk fä lö sd aö dj kä da jk fä lö sd aö dj kä da jk fä lö sd aö dj kä da jk fä lö sd aö dj kä da jk fä lö sd aö dj kä da jk fä",
          "asdfjklöä jklöäasdf asdfjklöä jklöäasdf asdfjklöä jklöäasdf asdfjklöä jklöäasdf asdfjklöä jklöäasdf asdfjklöä jklöäasdf asdfjklöä",
          "asd jkl öäj daf klj säö asd jkl öäj daf klj säö asd jkl öäj daf klj säö asd jkl öäj daf klj säö asd jkl öäj daf klj säö asd jkl",
          "aj dk sl fö äa ja kd ls öf aj dk sl fö äa ja kd ls öf aj dk sl fö aj dk sl fö äa ja kd ls öf aj dk sl fö äa ja kd ls öf aj dk sl",
          "as jk da lö äf as jk da lö äf as jk da lö äf as jk da lö äf as jk da lö äf as jk da lö äf as jk da lö äf as jk da lö äf as jk da",
          "adsf älökj asdf jklöä adsf älökj asdf jklöä adsf älökj asdf jklöä adsf älökj adsf älökj asdf jklöä adsf älökj asdf jklöä adsf"
        ],
        en: [
          "asdf jkl asdf jkl asdf jkl asdf jkl fdsa lkj fdsa lkj adsf klj adsf klj asdf jkl asdf jkl asdf jkl asdf asdf jkl asdf jkl asdf",
          "af j sd lk ds fa jk af j sd lk ds fa jk af j sd lk ds fa jk af j sd lk af j sd lk ds fa jk af j sd lk ds fa af j sd lk ds fa jk",
          "ad jk sl f d ad jk sl f d ad jk sl f d ad jk sl f d ad jk sl f d ad jk ad jk sl f d ad jk sl f d ad jk sl f d ad",
          "fj ak s d al kf j d fj ak s d al kf j d fj ak s d al kf j d fj ak s d al kf j d fj ak s d al kf j d fj ak s fj ak s d al kf j d",
          "da jk f l sd a dj k da jk f l sd a dj k da jk f l sd a dj k da jk f l sd a dj k da jk f l sd a dj k da jk f da jk f l sd a dj k",
          "asdfjkl jkl asdf asdfjkl jkl asdf asdfjkl jkl asdf asdfjkl jkl asdf asdfjkl jkl asdf asdfjkl jkl asdf asdfjkl asdfjkl jkl asdf",
          "asd jkl j daf klj s asd jkl j daf klj s asd jkl j daf klj s asd jkl j daf klj s asd jkl j daf klj s asd jkl asd jkl j daf klj s",
          "aj dk sl f a ja kd ls f aj dk sl f a ja kd ls f aj dk sl f aj dk sl f a ja kd ls f aj dk sl f a ja kd ls f aj dk sl",
          "as jk da l f as jk da l f as jk da l f as jk da l f as jk da l f as jk da l f as jk da l f as jk da l f as jk da",
          "adsf lkj asdf jkl adsf lkj asdf jkl adsf lkj asdf jkl adsf lkj adsf lkj asdf jkl adsf lkj asdf jkl adsf adsf lkj asdf jkl adsf"
        ]
      }
    },
    {
      id: "lesson1_4",
      title: { ru: "Короткие слова", de: "Kurze Wörter", en: "Short Words" },
      tips: {
        ru: [
          "Перед практикой проверь настройки аппликатуры: удобно ли пальцам, все ли зоны понятны, не приходится ли тянуться лишний раз."
        ],
        de: [
          "Prüfe vor der Übung kurz die Fingerzuordnung: Fühlen sich die Finger wohl, sind alle Zonen klar, musst du dich irgendwo unnötig strecken?"
        ],
        en: [
          "Before practicing, check your fingering settings: do your fingers feel comfortable, are the zones clear, and are you avoiding unnecessary reaching?"
        ]
      },
      symbolPolicy: {
        scope: "module",
        ru: ["ф", "ы", "в", "а", "о", "л", "д", "ж", "э"],
        de: ["a", "s", "d", "f", "j", "k", "l", "ö", "ä"],
        en: ["a", "s", "d", "f", "j", "k", "l"]
      },
      content: { lineCount: 10 },
        scoring: { accuracy: 90, speed: 40 },
      lines: {
        ru: [
          "вал вода лава жало овал лад вдова элла эд вал вода лава жало овал лад вдова элла эд вал вода лава жало вал вода лава жало овал",
          "вода лава овал вал лад жало элла эд вдова вода лава овал вал лад жало элла эд вдова вода лава овал вода лава овал вал лад жало",
          "лад вал вода лава овал жало вдова элла эд лад вал вода лава овал жало вдова элла эд лад вал вода лад вал вода лава овал жало",
          "жало овал лава вода вал лад эд элла вдова жало овал лава вода вал лад эд элла вдова жало овал жало овал лава вода вал лад эд элла",
          "элла эд вал лад вода лава жало овал вдова элла эд вал лад вода лава жало овал вдова элла эд элла эд вал лад вода лава жало овал",
          "вал вал вода вода лава лава жало жало овал овал лад лад вдова вдова элла элла эд эд вал вал вал вал вода вода лава лава жало жало",
          "вдова вода вал овал лава лад жало элла эд вдова вода вал овал лава лад жало элла эд вдова вода вдова вода вал овал лава лад жало",
          "лава овал жало вода вал лад вдова элла эд лава овал жало вода вал лад вдова элла эд лава овал лава овал жало вода вал лад вдова",
          "эд элла вдова жало лава вода овал вал лад эд элла вдова жало лава вода овал вал лад эд элла эд элла вдова жало лава вода овал вал",
          "вал вода лава жало овал лад вдова элла эд вал вода лава жало овал лад вдова элла эд вал вода вал вода лава жало овал лад вдова"
        ],
        de: [
          "als das falls lass fass saal da fall als das falls lass fass saal da fall als das falls lass fass als das falls lass fass saal da",
          "fass dass lass als falls saal da fall fass dass lass als falls saal da fall fass dass lass als fass dass lass als falls saal da",
          "saal lass fass das falls als da fall saal lass fass das falls als da fall saal lass fass das saal lass fass das falls als da fall",
          "falls lass fass saal als das da fall falls lass fass saal als das da fall falls lass fass saal falls lass fass saal als das da",
          "das als falls lass fass saal da fall das als falls lass fass saal da fall das als falls lass das als falls lass fass saal da fall",
          "als als das das lass lass fass fass falls falls saal saal da da fall fall als als das das als als das das lass lass fass fass",
          "fall falls als das lass fass saal da fall falls als das lass fass saal da fall falls als das fall falls als das lass fass saal da",
          "lass saal falls fass das als da fall lass saal falls fass das als da fall lass saal falls fass lass saal falls fass das als da",
          "da fall saal fass lass falls das als da fall saal fass lass falls das als da fall saal fass da fall saal fass lass falls das als",
          "als das falls lass fass saal da fall als das falls lass fass saal da fall als das falls lass als das falls lass fass saal da fall"
        ],
        en: [
          "all sad dad ask fall lass flask lads flask add all sad dad ask fall lass flask lads flask add all sad dad all sad dad ask fall",
          "flask flask lads add fall lass all sad dad ask flask flask lads add fall lass all sad dad ask flask flask flask flask lads add",
          "sad all flask lads flask add lad fall ask sad all flask lads flask add lad fall ask sad all flask sad all flask lads flask add",
          "ask fall lass flask lads flask add lad all sad dad ask fall lass flask lads flask add lad all sad ask fall lass flask lads flask",
          "fall flask ask fall lass flask all sad dad lads flask add fall flask ask fall lass flask all sad dad fall flask ask fall lass",
          "all all sad sad dad dad ask ask fall fall lass lass flask flask lads lads flask flask add add all all sad sad dad dad ask ask",
          "lads fall lass flask flask add all sad dad ask lads fall lass flask flask add all sad dad ask lads lads fall lass flask flask add",
          "flask all sad dad ask fall lass lads flask add flask all sad dad ask fall lass lads flask add flask flask all sad dad ask fall",
          "add flask lads flask lass fall ask dad sad all add flask lads flask lass fall ask dad sad all add add flask lads flask lass fall",
          "all sad dad ask fall lass flask lads flask add all sad dad ask fall lass flask lads flask add all all sad dad ask fall lass flask"
        ]
      }
    },
    {
      id: "lesson1_5",
      title: { ru: "Тест", de: "Test", en: "Test" },
      tips: {
        ru: [
          "На тесте ассистенты отключаются, чтобы твои пальцы начали работать самостоятельно — не переживай, это не экзамен, а просто проверка того, что навык уже начинает закрепляться."
        ],
        de: [
          "Im Test werden die Assistenten ausgeschaltet, damit deine Finger selbstständig arbeiten können. Keine Sorge: Das ist keine Prüfung, sondern nur ein Check, ob sich die Fähigkeit schon festigt."
        ],
        en: [
          "In the test, assistants are turned off so your fingers can start working on their own. Do not worry: it is not an exam, just a check that the skill is beginning to settle."
        ]
      },
      symbolPolicy: {
        scope: "program",
        ru: ["ф", "ы", "в", "а", "о", "л", "д", "ж", "э"],
        de: ["a", "s", "d", "f", "j", "k", "l", "ö", "ä"],
        en: ["a", "s", "d", "f", "j", "k", "l"]
      },
      content: { lineCount: 15 },
        scoring: { accuracy: 90, speed: 40, assistants: false },
      lines: {
        ru: [
          "вал вода лава жало овал лад вдова элла эд фыва олджэ вал вода лава жало овал лад вдова элла вал вода лава жало овал лад вдова",
          "фыва олджэ авыф эдлож вал вода лава жало овал лад вдова элла эд фыва олджэ авыф эдлож фыва олджэ авыф эдлож вал вода лава жало",
          "лава жало вода овал вал лад вдова элла эд авыф эдлож фыва олджэ лава жало вода овал вал лава жало вода овал вал лад вдова элла эд",
          "ф ы в а о л д ж э ф ы в а о л д ж э вал вода лава жало овал лад вдова элла эд ф ы в а о л д ж э ф ы в а о л д ж э вал вода лава",
          "авдо лоджэ авдо лоджэ вал вода лава жало овал лад вдова элла эд авдо лоджэ авдо лоджэ авдо лоджэ авдо лоджэ вал вода лава жало",
          "вал вал вода вода лава лава жало жало овал овал лад лад вдова вдова элла элла эд эд вал вал вода вода лава лава жало жало овал",
          "ывфы авфы эждо лоджэ ывфы авфы эждо лоджэ вал вода лава жало овал лад вдова элла эд ывфы авфы эждо лоджэ ывфы авфы эждо лоджэ вал",
          "оо лл дд жж ээ фф ыы вв аа оо лл дд жж ээ фф ыы вв аа вал вода лава жало оо лл дд жж ээ фф ыы вв аа оо лл дд жж ээ фф ыы вв аа",
          "а д о в а д о в э л л а ф ы в а о л д ж э вал вода лава жало овал лад а д о в а д о в э л л а ф ы в а о л д ж э вал вода лава",
          "фываолджэ фываолджэ авыфэдлож авыфэдлож вал вода лава жало овал лад вдова элла эд фываолджэ фываолджэ авыфэдлож авыфэдлож вал",
          "жало лава вода овал вал лад эд элла вдова фыва олджэ авыф эдлож жало лава вода овал жало лава вода овал вал лад эд элла вдова",
          "вдова вода вал овал лава лад жало элла эд фыва олджэ вдова вода вал овал лава лад вдова вода вал овал лава лад жало элла эд фыва",
          "элла эд вал лад вода лава жало овал вдова авыф эдлож фыва олджэ элла эд вал лад элла эд вал лад вода лава жало овал вдова авыф",
          "олджэ фыва эдлож авыф вал вода лава жало овал лад вдова элла эд олджэ фыва эдлож олджэ фыва эдлож авыф вал вода лава жало овал",
          "вал вода лава жало овал лад вдова элла эд фыва олджэ авыф эдлож вал вода лава жало вал вода лава жало овал лад вдова элла эд фыва"
        ],
        de: [
          "als das falls lass fass saal da fall asdf jklöä als das falls lass fass saal da fall asdf als das falls lass fass saal da fall",
          "asdf jklöä adsf älökj als das falls lass fass saal da fall asdf jklöä adsf älökj asdf jklöä adsf älökj als das falls lass fass",
          "fass lass saal fall als das da asdf jklöä adsf älökj fass lass saal fall als das da fass lass saal fall als das da asdf jklöä",
          "a s d f j k l ö ä a s d f j k l ö ä als das falls lass fass saal da fall a s d f j k l ö ä a s d f j k l ö ä als das falls lass",
          "adfj klöä adfj klöä als das falls lass fass saal da fall adfj klöä adfj klöä adfj klöä adfj klöä als das falls lass fass saal da",
          "als als das das lass lass fass fass falls falls saal saal da da fall fall asdf jklöä als als das das lass lass fass fass falls",
          "sdas afas äökj lkjöä sdas afas äökj lkjöä als das falls lass fass saal da fall sdas afas äökj lkjöä sdas afas äökj lkjöä als das",
          "jj kk ll öö ää aa ss dd ff jj kk ll öö ää aa ss dd ff als das falls lass jj kk ll öö ää aa ss dd ff jj kk ll öö ää aa ss dd ff",
          "a d j k ä l l a f s d a j k l ö ä als das falls lass fass saal a d j k ä l l a f s d a j k l ö ä als das falls lass fass saal",
          "asdfjklöä asdfjklöä adsfälökj adsfälökj als das falls lass fass saal da fall asdfjklöä asdfjklöä adsfälökj adsfälökj als das",
          "fass lass saal fall da als asdf jklöä adsf älökj fass lass saal fall da als fass lass saal fall da als asdf jklöä adsf älökj fass",
          "fall falls als das lass fass saal da asdf jklöä fall falls als das lass fass fall falls als das lass fass saal da asdf jklöä fall",
          "saal da als das falls lass fass fall adsf älökj asdf jklöä saal da als das saal da als das falls lass fass fall adsf älökj asdf",
          "jklöä asdf älökj adsf als das falls lass fass saal da fall jklöä asdf älökj jklöä asdf älökj adsf als das falls lass fass saal da",
          "als das falls lass fass saal da fall asdf jklöä adsf älökj als das falls lass als das falls lass fass saal da fall asdf jklöä"
        ],
        en: [
          "all sad dad ask fall lass flask lads flask add asdf jkl all sad dad ask fall lass flask lads all sad dad ask fall lass flask",
          "asdf jkl adsf lkj all sad dad ask fall lass flask lads flask add asdf jkl adsf lkj asdf jkl adsf lkj all sad dad ask",
          "fall lass flask flask all sad dad asdf jkl adsf lkj fall lass flask flask all sad dad fall lass flask flask all sad dad asdf",
          "a s d f j k l a s d f j k l all sad dad ask fall lass flask a s d f j k l a s d f j k l all sad dad ask fall lass",
          "adfj jkl adfj jkl all sad dad ask fall lass flask lads flask add adfj jkl adfj jkl adfj jkl adfj jkl all sad dad ask",
          "all all sad sad dad dad ask ask fall fall lass lass flask flask lads lads flask flask add add all all sad sad dad dad ask ask",
          "sdas afas kj lkj sdas afas kj lkj all sad dad ask fall lass flask lads sdas afas kj lkj sdas afas kj lkj all sad",
          "jj kk ll aa ss dd ff jj kk ll aa ss dd ff all sad dad ask jj kk ll aa ss dd ff jj kk ll aa ss dd ff all jj kk ll aa ss dd ff jj",
          "a d j k l l a f s d a j k l all sad dad ask fall lass a d j k l l a f s d a j k l all sad dad ask fall lass a d j k l l a f s d a",
          "asdfjkl asdfjkl adsf lkj adsf lkj all sad dad ask fall lass flask lads flask asdfjkl asdfjkl adsf lkj adsf lkj all",
          "fall lass flask flask add all asdf jkl adsf lkj fall lass flask flask add all fall lass flask flask add all asdf jkl adsf",
          "lads fall lass flask flask add all sad dad ask asdf jkl lads fall lass flask flask add lads fall lass flask flask add all sad",
          "flask add all sad dad ask fall lass adsf lkj asdf jkl flask add all sad dad flask add all sad dad ask fall lass adsf lkj",
          "jkl asdf lkj adsf all sad dad ask fall lass flask lads jkl asdf lkj jkl asdf lkj adsf all sad dad ask fall lass flask",
          "all sad dad ask fall lass flask lads flask add asdf jkl adsf lkj all sad dad all sad dad ask fall lass flask lads flask add"
        ]
      }
    }
  ]
});
