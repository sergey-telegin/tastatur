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

  const left = {
    ru: [
      "ст ста аст сто ост про пра при пер пре тра стр спр рас раз",
      "ка ке ку ко ак ек ук ок па пе пу по ап еп уп оп",
      "ма ме ми мо ам ем им ом ва ве ви во ав ев ив ов",
      "ча че чи чо ач еч ич оч ша ше ши шо аш еш иш ош",
      "под про пра пер пре при пар пор пир пыр пласт пряд страх",
      "ста сто сты стр спа спе сма сме сми ско ски ску ска",
      "кра кре кру кро тра тре тру тро пра пре пру про",
      "фра фре фру фро дра дре дру дро вра вре вру вро",
      "мка мке мку мко чка чке чку чко шка шке шку шко",
      "ст пр тр кр см сп ск сл фр др вр пл кл"
    ],
    de: [
      "st sta ast sto ost pro pra pri per pre tra str spr ras raz",
      "ka ke ku ko ak ek uk ok pa pe pu po ap ep up op",
      "ma me mi mo am em im om wa we wi wo aw ew iw ow",
      "cha che chi cho ach ech ich och sha she shi sho ash esh ish osh",
      "pod pro pra per pre pri par por pir pyr plast prad strah",
      "sta sto sty str spa spe sma sme smi sko ski sku ska",
      "kra kre kru kro tra tre tru tro pra pre pru pro",
      "fra fre fru fro dra dre dru dro vra vre vru vro",
      "mka mke mku mko chka chke chku chko shka shke shku shko",
      "st pr tr kr sm sp sk sl fr dr vr pl kl"
    ],
    en: [
      "st sta ast sto ost pro pra pri per pre tra str spr ras raz",
      "ka ke ku ko ak ek uk ok pa pe pu po ap ep up op",
      "ma me mi mo am em im om wa we wi wo aw ew iw ow",
      "cha che chi cho ach ech ich och sha she shi sho ash esh ish osh",
      "pod pro pra per pre pri par por pir pyr plast prad strah",
      "sta sto sty str spa spe sma sme smi sko ski sku ska",
      "kra kre kru kro tra tre tru tro pra pre pru pro",
      "fra fre fru fro dra dre dru dro vra vre vru vro",
      "mka mke mku mko chka chke chku chko shka shke shku shko",
      "st pr tr kr sm sp sk sl fr dr vr pl kl"
    ]
  };

  const right = {
    ru: [
      "но на не ни он ан ен ин го га ге ги ог аг ег иг",
      "ро ра ре ри ор ар ер ир ло ла ле ли ол ал ел ил",
      "шо ша ше ши ош аш еш иш що ща ще щи ощ ащ ещ ищ",
      "зо за зе зи хно хра хре хри зно зна зре зри",
      "гор гон гра гре гри гро нор нар нер нир рон ран",
      "лог лаг лег лиг рол рал рел рил дол дал дел дил",
      "жон жан жен жин жор жар жер жир зон зан зен зин",
      "хор хар хер хир щор щар щер щир шор шар шер шир",
      "нг нр нл нд гн гр гл гд рн рг рл рд",
      "он но ро ор ло ол го ог на ан ра ар"
    ],
    de: [
      "no na ne ni on an en in go ga ge gi og ag eg ig",
      "ro ra re ri or ar er ir lo la le li ol al el il",
      "sho sha she shi osh ash esh ish zo za ze zi uz zu",
      "zo za ze zi hno hra hre hri zno zna zre zri",
      "gor gon gra gre gri gro nor nar ner nir ron ran",
      "log lag leg lig rol ral rel ril dol dal del dil",
      "jon jan jen jin jor jar jer jir zon zan zen zin",
      "hor har her hir zor zar zer zir shor shar sher shir",
      "ng nr nl nd gn gr gl gd rn rg rl rd",
      "on no ro or lo ol go og na an ra ar"
    ],
    en: [
      "no na ne ni on an en in go ga ge gi og ag eg ig",
      "ro ra re ri or ar er ir lo la le li ol al el il",
      "sho sha she shi osh ash esh ish yo ya ye yi oy ay ey iy",
      "zo za ze zi hno hra hre hri yno yna yre yri",
      "gor gon gra gre gri gro nor nar ner nir ron ran",
      "log lag leg lig rol ral rel ril dol dal del dil",
      "jon jan jen jin jor jar jer jir yon yan yen yin",
      "hor har her hir yor yar yer yir shor shar sher shir",
      "ng nr nl nd gn gr gl gd rn rg rl rd",
      "on no ro or lo ol go og na an ra ar"
    ]
  };

  const mixed = {
    ru: [
      "стор нора трава книга правка строка горка тропа смена",
      "просто строка карта гора нить ручка точка книга",
      "трава растет нора рядом книга дома ручка рядом",
      "страна город школа урок книга строка смысл ритм",
      "мама пишет строку вера читает книгу нина знает тему",
      "правая левая рука держит ровный ритм метроном ведет",
      "стол рядом карта рядом книга рядом ручка рядом",
      "короткая строка ровная смена рук чистая точность",
      "каждая буква идет ровно каждая связка звучит тихо",
      "ритм строка точность темп пальцы память движение"
    ],
    de: [
      "stark nora trava kniga pravka stroka gorka tropa smena",
      "prosto stroka karta gora nit ruchka tochka kniga",
      "trava rastet nora radom kniga doma ruchka radom",
      "strana gorod shkola urok kniga stroka smysl ritm",
      "mama pishet stroku vera chitaet knigu nina znaet temu",
      "pravaja levaja ruka derzhit rovnyj ritm metronom vedet",
      "stol radom karta radom kniga radom ruchka radom",
      "korotkaja stroka rovnaja smena ruk chistaja tochnost",
      "kazhdaja bukva idet rovno kazhdaja svyazka zvuchit tiho",
      "ritm stroka tochnost temp palcy pamyat dvizhenie"
    ],
    en: [
      "strong nora travel book practice stroke hill path shift",
      "simple stroke chart hill thread pen point book",
      "grass grows nora nearby book home pen nearby",
      "country city school lesson book stroke meaning rhythm",
      "mama writes a line vera reads a book nina knows a theme",
      "right left hand keeps even rhythm metronome leads",
      "table near chart near book near pen near",
      "short line even hand shift clean accuracy",
      "each letter goes evenly each pattern sounds quiet",
      "rhythm line accuracy tempo fingers memory motion"
    ]
  };

  const endurance = {
    ru: [
      ...mixed.ru,
      "степь рядом город рядом книга рядом точка рядом",
      "строка идет ровно пальцы держат мягкий ритм",
      "левая рука правая рука сменяют друг друга",
      "частые связки строят ровное движение пальцев",
      "пятнадцать строк держат внимание и спокойный темп"
    ],
    de: [
      ...mixed.de,
      "step radom gorod radom kniga radom tochka radom",
      "stroka idet rovno palcy derzhat myagkij ritm",
      "levaja ruka pravaja ruka smenyajut drug druga",
      "chastye svyazki stroyat rovnoe dvizhenie palcev",
      "pyatnadcat strok derzhat vnimanie i spokojnyj temp"
    ],
    en: [
      ...mixed.en,
      "steppe nearby city nearby book nearby point nearby",
      "line goes evenly fingers keep a soft rhythm",
      "left hand right hand alternate with each other",
      "common patterns build even finger motion",
      "fifteen lines keep attention and calm tempo"
    ]
  };

  const test = {
    ru: [...left.ru.slice(0, 5), ...right.ru.slice(0, 5), ...mixed.ru],
    de: [...left.de.slice(0, 5), ...right.de.slice(0, 5), ...mixed.de],
    en: [...left.en.slice(0, 5), ...right.en.slice(0, 5), ...mixed.en]
  };
  const frequencySeeds = { left, right, mixed, endurance, test };

  window.PRACTICE_FREQUENCY_MODULE_SEEDS = frequencySeeds;

  window.PRACTICE_CONTENT_SOURCE.modules = window.PRACTICE_CONTENT_SOURCE.modules || [];
  window.PRACTICE_CONTENT_SOURCE.modules.push({
    id: "module8",
    title: { ru: "Module 8 — Частотные сочетания", de: "Modul 8 — Häufige Kombinationen", en: "Module 8 — Frequent Patterns" },
    symbols: { ru: [], de: [], en: [] },
    lessons: [
      {
        id: "lesson8_1",
        title: { ru: "Левая рука", de: "Linke Hand", en: "Left Hand" },
        tips: {
          ru: [
            "Старайся попадать в ритм метронома, а не обгонять его. Ровный темп развивает стабильную технику намного лучше, чем случайные ускорения."
          ],
          de: [
            "Versuche, den Rhythmus des Metronoms zu treffen, statt ihm vorauszueilen. Ein gleichmäßiges Tempo entwickelt eine stabile Technik viel besser als zufällige Beschleunigungen."
          ],
          en: [
            "Try to match the metronome instead of outrunning it. A steady pace builds stable technique much better than random bursts of speed."
          ]
        },
        description: { ru: "Биграммы и триграммы", de: "Bigramme und Trigramme", en: "Bigrams and trigrams" },
        symbolPolicy: { scope: "program", pattern: "left-hand-frequency", metronome: true },
        target: { lines: 10, accuracy: 90, rhythmTolerance: 10 },
        lines: { ru: practiceLines(frequencySeeds.left.ru), de: practiceLines(frequencySeeds.left.de), en: practiceLines(frequencySeeds.left.en) }
      },
      {
        id: "lesson8_2",
        title: { ru: "Правая рука", de: "Rechte Hand", en: "Right Hand" },
        tips: {
          ru: [
            "Во время ритмической печати слушай метроном, а не звук клавиатуры. Главная задача — синхронизировать движения рук с постоянным темпом."
          ],
          de: [
            "Hör beim rhythmischen Tippen auf das Metronom, nicht auf den Klang der Tastatur. Die Hauptaufgabe ist, die Handbewegungen mit einem konstanten Tempo zu synchronisieren."
          ],
          en: [
            "While typing rhythmically, listen to the metronome, not the sound of the keyboard. The main goal is to synchronize your hand movements with a steady tempo."
          ]
        },
        description: { ru: "Биграммы и триграммы", de: "Bigramme und Trigramme", en: "Bigrams and trigrams" },
        symbolPolicy: { scope: "program", pattern: "right-hand-frequency", metronome: true },
        target: { lines: 10, accuracy: 90, rhythmTolerance: 10 },
        lines: { ru: practiceLines(frequencySeeds.right.ru), de: practiceLines(frequencySeeds.right.de), en: practiceLines(frequencySeeds.right.en) }
      },
      {
        id: "lesson8_3",
        title: { ru: "Смешанные сочетания", de: "Gemischte Kombinationen", en: "Mixed Patterns" },
        tips: {
          ru: [
            "Работа с метрономом учит печатать в стабильном ритме, а не случайными рывками. Без ритма пальцы часто начинают то ускоряться, то тормозить, из-за чего растёт количество ошибок и быстрее появляется усталость."
          ],
          de: [
            "Die Arbeit mit dem Metronom lehrt dich, in einem stabilen Rhythmus zu tippen statt in zufälligen Schüben. Ohne Rhythmus werden die Finger oft schneller und langsamer, wodurch mehr Fehler entstehen und die Ermüdung schneller kommt."
          ],
          en: [
            "Working with the metronome teaches you to type in a stable rhythm, not in random bursts. Without rhythm, fingers often speed up and slow down, causing more mistakes and faster fatigue."
          ]
        },
        description: { ru: "Работа обеих рук", de: "Arbeit beider Hände", en: "Both hands" },
        symbolPolicy: { scope: "program", pattern: "mixed-frequency", metronome: true },
        target: { lines: 10, accuracy: 90, rhythmTolerance: 10 },
        lines: { ru: practiceLines(frequencySeeds.mixed.ru), de: practiceLines(frequencySeeds.mixed.de), en: practiceLines(frequencySeeds.mixed.en) }
      },
      {
        id: "lesson8_4",
        title: { ru: "Практика на выносливость", de: "Ausdauerübung", en: "Endurance Practice" },
        tips: {
          ru: [
            "На длинной практике держи один спокойный темп от строки к строке. Выносливость появляется тогда, когда движения остаются одинаково точными даже после усталости."
          ],
          de: [
            "Halte in langen Übungen von Zeile zu Zeile ein ruhiges Tempo. Ausdauer entsteht, wenn die Bewegungen auch bei Müdigkeit gleich genau bleiben."
          ],
          en: [
            "During long practice, keep one calm tempo from line to line. Endurance appears when movements stay equally precise even after fatigue sets in."
          ]
        },
        description: { ru: "15 строк и режим чередования строк", de: "15 Zeilen und jede zweite Zeile", en: "15 lines and alternating-line mode" },
        symbolPolicy: { scope: "program", pattern: "endurance-frequency", metronome: true },
        target: { lines: 15, accuracy: 90, rhythmTolerance: 10, alternateLines: true },
        lines: { ru: practiceLines(frequencySeeds.endurance.ru), de: practiceLines(frequencySeeds.endurance.de), en: practiceLines(frequencySeeds.endurance.en) }
      },
      {
        id: "lesson8_5",
        title: { ru: "Тест", de: "Test", en: "Test" },
        tips: {
          ru: [
            "Отключённые ассистенты помогают понять, какие движения уже стали автоматическими, а какие ещё требуют тренировки.",
            "Похоже, пришло время прощаться! Я рассказал тебе всё, что знаю о слепой печати. Дальше всё зависит от тебя — от практики, тренировок и того, как часто ты будешь использовать навык в реальной работе. Не забывай: настоящая скорость приходит не от спешки, а от спокойных и точных движений. Продолжай печатать вслепую в обычной жизни, поменьше смотри на клавиатуру и доверяй своим пальцам. Держи хвост пистолетом, не бойся ошибок и не сдавайся после сложных упражнений. Уверен, у тебя всё получится, красавчик. Мне пора лететь дальше, а у тебя есть ещё несколько модулей для закрепления пройденного. Твой Fly!"
          ],
          de: [
            "Ausgeschaltete Assistenten helfen dir zu erkennen, welche Bewegungen schon automatisch laufen und welche noch Training brauchen.",
            "Es sieht so aus, als wäre es Zeit, Abschied zu nehmen! Ich habe dir alles erzählt, was ich über Blindtippen weiß. Ab jetzt hängt alles von dir ab - von Übung, Training und davon, wie oft du die Fähigkeit im echten Alltag benutzt. Vergiss nicht: Echte Geschwindigkeit kommt nicht durch Eile, sondern durch ruhige und genaue Bewegungen. Tippe auch im Alltag weiter blind, schau weniger auf die Tastatur und vertraue deinen Fingern. Hab keine Angst vor Fehlern und gib nach schwierigen Übungen nicht auf. Ich bin sicher, du schaffst das. Ich fliege jetzt weiter, und für dich gibt es noch ein paar Module zum Festigen. Dein Fly!"
          ],
          en: [
            "Turned-off assistants help you see which movements have become automatic and which still need practice.",
            "It looks like it is time to say goodbye! I have told you everything I know about touch typing. From here, it depends on you - on practice, training, and how often you use the skill in real work. Remember: real speed does not come from rushing, but from calm and precise movement. Keep touch typing in everyday life, look at the keyboard less, and trust your fingers. Do not fear mistakes, and do not give up after difficult exercises. I know you can do it. It is time for me to fly on, and you still have a few modules to reinforce what you have learned. Your Fly!"
          ]
        },
        description: { ru: "Все пройденные сочетания", de: "Alle geübten Kombinationen", en: "All practiced patterns" },
        symbolPolicy: { scope: "program", pattern: "frequency-test", metronome: true },
        target: { lines: 20, accuracy: 95, rhythmTolerance: 10, assistants: false },
        lines: { ru: practiceLines(frequencySeeds.test.ru), de: practiceLines(frequencySeeds.test.de), en: practiceLines(frequencySeeds.test.en) }
      }
    ]
  });
})();
