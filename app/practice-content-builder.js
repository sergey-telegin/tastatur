function localizedContentText(value, language) {
  if (!value || typeof value !== "object") return value || "";
  return value[language] || value.en || value.ru || Object.values(value)[0] || "";
}

function localizedContentList(value, language) {
  const localized = Array.isArray(value)
    ? value
    : value?.[language] || value?.en || value?.ru || [];
  if (!Array.isArray(localized)) return localized ? [localized] : [];
  return localized.filter(Boolean);
}

function contentLessonLines(lesson, language) {
  const lines = lesson.lines?.[language] || lesson.lines?.en || lesson.lines?.ru || [];
  if (Array.isArray(lines) && lines.length) return lines;

  const fallback = localizedContentText(lesson.title, language) || lesson.id;
  const count = Math.max(lesson.target?.lines || 10, 10);
  return Array.from({ length: count }, () => fallback);
}

const defaultLessonCompletionText = {
  ru: "Отлично. Молодец. Идём дальше.",
  uk: "Чудово. Гарна робота. Рухаємося далі.",
  kk: "Керемет. Жақсы жұмыс. Әрі қарай өтейік.",
  de: "Ausgezeichnet. Gut gemacht. Weiter geht's.",
  en: "Excellent. Well done. Let's keep going."
};

const lessonIntroPurpose = {
  lesson1_1: {
    ru: "Почувствовать стартовую позицию левой руки.",
    uk: "Відчути стартову позицію лівої руки.",
    kk: "Сол қолдың бастапқы қалпын сезіну.",
    de: "Die Grundposition der linken Hand fühlen.",
    en: "Feel the left-hand starting position."
  },
  lesson1_2: {
    ru: "Подключить правую руку к домашнему ряду.",
    uk: "Підключити праву руку до домашнього ряду.",
    kk: "Оң қолды негізгі қатарға қосу.",
    de: "Die rechte Hand zur Grundreihe bringen.",
    en: "Bring the right hand into the home row."
  },
  lesson1_3: {
    ru: "Собрать обе руки в один спокойный ритм.",
    uk: "Зібрати обидві руки в один спокійний ритм.",
    kk: "Екі қолды бір тыныш ырғаққа келтіру.",
    de: "Beide Hände in einen ruhigen Rhythmus bringen.",
    en: "Bring both hands into one calm rhythm."
  },
  lesson1_4: {
    ru: "Перенести домашний ряд в короткие слова.",
    uk: "Перенести домашній ряд у короткі слова.",
    kk: "Негізгі қатарды қысқа сөздерге көшіру.",
    de: "Die Grundreihe in kurze Wörter übertragen.",
    en: "Move the home row into short words."
  },
  lesson1_5: {
    ru: "Проверить, насколько уверенно держится база.",
    uk: "Перевірити, наскільки впевнено тримається база.",
    kk: "Негіздің қаншалықты сенімді бекігенін тексеру.",
    de: "Prüfen, wie stabil die Basis sitzt.",
    en: "Check how confidently the base holds."
  },
  lesson2_1: {
    ru: "Освоить центральные движения левой руки.",
    uk: "Освоїти центральні рухи лівої руки.",
    kk: "Сол қолдың орталық қимылдарын меңгеру.",
    de: "Zentrale Bewegungen der linken Hand üben.",
    en: "Learn the left-hand center movements."
  },
  lesson2_2: {
    ru: "Освоить центральные движения правой руки.",
    uk: "Освоїти центральні рухи правої руки.",
    kk: "Оң қолдың орталық қимылдарын меңгеру.",
    de: "Zentrale Bewegungen der rechten Hand üben.",
    en: "Learn the right-hand center movements."
  },
  lesson2_3: {
    ru: "Добавить первые переходы к нижнему ряду.",
    uk: "Додати перші переходи до нижнього ряду.",
    kk: "Төменгі қатарға алғашқы ауысуларды қосу.",
    de: "Erste Wege zur unteren Reihe hinzufügen.",
    en: "Add the first moves to the bottom row."
  },
  lesson2_4: {
    ru: "Собрать новые клавиши в короткие слова.",
    uk: "Зібрати нові клавіші в короткі слова.",
    kk: "Жаңа пернелерді қысқа сөздерге жинау.",
    de: "Neue Tasten in kurze Wörter bringen.",
    en: "Turn the new keys into short words."
  },
  lesson2_5: {
    ru: "Проверить центр клавиатуры без лишней спешки.",
    uk: "Перевірити центр клавіатури без зайвого поспіху.",
    kk: "Пернетақта ортасын артық асықпай тексеру.",
    de: "Das Tastaturzentrum ruhig prüfen.",
    en: "Check the keyboard center without rushing."
  },
  lesson3_1: {
    ru: "Научить левую руку подниматься вверх.",
    uk: "Навчити ліву руку підніматися вгору.",
    kk: "Сол қолды жоғары көтерілуге үйрету.",
    de: "Die linke Hand nach oben führen.",
    en: "Teach the left hand to move upward."
  },
  lesson3_2: {
    ru: "Научить правую руку подниматься вверх.",
    uk: "Навчити праву руку підніматися вгору.",
    kk: "Оң қолды жоғары көтерілуге үйрету.",
    de: "Die rechte Hand nach oben führen.",
    en: "Teach the right hand to move upward."
  },
  lesson3_3: {
    ru: "Собрать верхний ряд в цельную зону.",
    uk: "Зібрати верхній ряд у цілісну зону.",
    kk: "Жоғарғы қатарды тұтас аймаққа жинау.",
    de: "Die obere Reihe als ganze Zone festigen.",
    en: "Build the top row into one clear zone."
  },
  lesson3_4: {
    ru: "Перенести верхний ряд в короткие слова.",
    uk: "Перенести верхній ряд у короткі слова.",
    kk: "Жоғарғы қатарды қысқа сөздерге көшіру.",
    de: "Die obere Reihe in kurze Wörter übertragen.",
    en: "Move the top row into short words."
  },
  lesson3_5: {
    ru: "Проверить верхний ряд в спокойном темпе.",
    uk: "Перевірити верхній ряд у спокійному темпі.",
    kk: "Жоғарғы қатарды тыныш қарқында тексеру.",
    de: "Die obere Reihe ruhig prüfen.",
    en: "Check the top row at a calm pace."
  },
  lesson4_1: {
    ru: "Научить левую руку уходить вниз.",
    uk: "Навчити ліву руку рухатися вниз.",
    kk: "Сол қолды төмен түсуге үйрету.",
    de: "Die linke Hand nach unten führen.",
    en: "Teach the left hand to move downward."
  },
  lesson4_2: {
    ru: "Научить правую руку уходить вниз.",
    uk: "Навчити праву руку рухатися вниз.",
    kk: "Оң қолды төмен түсуге үйрету.",
    de: "Die rechte Hand nach unten führen.",
    en: "Teach the right hand to move downward."
  },
  lesson4_3: {
    ru: "Собрать нижний ряд в устойчивую зону.",
    uk: "Зібрати нижній ряд у стійку зону.",
    kk: "Төменгі қатарды тұрақты аймаққа жинау.",
    de: "Die untere Reihe stabilisieren.",
    en: "Build the bottom row into a stable zone."
  },
  lesson4_4: {
    ru: "Использовать нижний ряд в коротких словах.",
    uk: "Використати нижній ряд у коротких словах.",
    kk: "Төменгі қатарды қысқа сөздерде қолдану.",
    de: "Die untere Reihe in kurzen Wörtern nutzen.",
    en: "Use the bottom row in short words."
  },
  lesson4_5: {
    ru: "Проверить нижний ряд и возврат домой.",
    uk: "Перевірити нижній ряд і повернення додому.",
    kk: "Төменгі қатарды және негізгі қатарға оралуды тексеру.",
    de: "Untere Reihe und Rückkehr prüfen.",
    en: "Check the bottom row and return home."
  },
  lesson5_1: {
    ru: "Освоить вертикальные переходы слева.",
    uk: "Освоїти вертикальні переходи ліворуч.",
    kk: "Сол жақтағы тік ауысуларды меңгеру.",
    de: "Vertikale Wege links üben.",
    en: "Practice the left-side vertical paths."
  },
  lesson5_2: {
    ru: "Освоить вертикальные переходы справа.",
    uk: "Освоїти вертикальні переходи праворуч.",
    kk: "Оң жақтағы тік ауысуларды меңгеру.",
    de: "Vertikale Wege rechts üben.",
    en: "Practice the right-side vertical paths."
  },
  lesson5_3: {
    ru: "Добавить Shift без лишнего напряжения.",
    uk: "Додати Shift без зайвого напруження.",
    kk: "Shift пернесін артық күшсіз қосу.",
    de: "Shift ohne unnötige Spannung hinzufügen.",
    en: "Add Shift without extra tension."
  },
  lesson5_4: {
    ru: "Связать дальние движения в слова.",
    uk: "Пов'язати далекі рухи у слова.",
    kk: "Алыс қимылдарды сөздерге байланыстыру.",
    de: "Weite Wege in Wörter verbinden.",
    en: "Connect longer reaches into words."
  },
  lesson5_5: {
    ru: "Проверить первую большую часть навыка.",
    uk: "Перевірити першу велику частину навички.",
    kk: "Дағдының алғашқы үлкен бөлігін тексеру.",
    de: "Den ersten großen Lernblock prüfen.",
    en: "Check the first big skill block."
  },
  lesson6_1: {
    ru: "Добавить левую часть верхнего ряда и цифр.",
    uk: "Додати ліву частину верхнього ряду й цифр.",
    kk: "Жоғарғы қатар мен сандардың сол бөлігін қосу.",
    de: "Linke obere Reihe und Zahlen hinzufügen.",
    en: "Add the left top row and numbers."
  },
  lesson6_2: {
    ru: "Добавить правую часть верхнего ряда и цифр.",
    uk: "Додати праву частину верхнього ряду й цифр.",
    kk: "Жоғарғы қатар мен сандардың оң бөлігін қосу.",
    de: "Rechte obere Reihe und Zahlen hinzufügen.",
    en: "Add the right top row and numbers."
  },
  lesson6_3: {
    ru: "Собрать весь цифровой ряд в порядок.",
    uk: "Зібрати весь цифровий ряд у порядок.",
    kk: "Бүкіл сандық қатарды ретке келтіру.",
    de: "Die ganze Zahlenreihe ordnen.",
    en: "Bring the full number row into order."
  },
  lesson6_4: {
    ru: "Смешать буквы и цифры без потери ритма.",
    uk: "Змішати літери й цифри без втрати ритму.",
    kk: "Әріптер мен сандарды ырғақты жоғалтпай араластыру.",
    de: "Buchstaben und Zahlen rhythmisch mischen.",
    en: "Mix letters and numbers without losing rhythm."
  },
  lesson6_5: {
    ru: "Проверить цифры вместе с буквами.",
    uk: "Перевірити цифри разом із літерами.",
    kk: "Сандарды әріптермен бірге тексеру.",
    de: "Zahlen zusammen mit Buchstaben prüfen.",
    en: "Check numbers together with letters."
  },
  lesson7_1: {
    ru: "Добавить точку и запятую в привычный ритм.",
    uk: "Додати крапку й кому у звичний ритм.",
    kk: "Нүкте мен үтірді үйреншікті ырғаққа қосу.",
    de: "Punkt und Komma in den Rhythmus bringen.",
    en: "Add period and comma to the rhythm."
  },
  lesson7_2: {
    ru: "Освоить вопрос и восклицание с Shift.",
    uk: "Освоїти питання й оклик із Shift.",
    kk: "Сұрақ пен леп белгілерін Shift арқылы меңгеру.",
    de: "Frage und Ausruf mit Shift üben.",
    en: "Practice question and exclamation with Shift."
  },
  lesson7_3: {
    ru: "Разобрать сложные знаки без остановок.",
    uk: "Розібрати складні знаки без зупинок.",
    kk: "Күрделі белгілерді тоқтамай меңгеру.",
    de: "Schwierige Zeichen ohne Stopps üben.",
    en: "Handle complex signs without stopping."
  },
  lesson7_4: {
    ru: "Печатать фразы со знаками плавнее.",
    uk: "Друкувати фрази зі знаками плавніше.",
    kk: "Белгілері бар тіркестерді жұмсағырақ теру.",
    de: "Sätze mit Zeichen flüssiger tippen.",
    en: "Type signed phrases more smoothly."
  },
  lesson7_5: {
    ru: "Проверить пунктуацию в живых фразах.",
    uk: "Перевірити пунктуацію в живих фразах.",
    kk: "Тірі тіркестердегі тыныс белгілерін тексеру.",
    de: "Zeichensetzung in echten Sätzen prüfen.",
    en: "Check punctuation in real phrases."
  },
  lesson8_1: {
    ru: "Отработать частые сочетания левой руки.",
    uk: "Відпрацювати часті поєднання лівої руки.",
    kk: "Сол қолдың жиі тіркестерін жаттықтыру.",
    de: "Häufige Kombinationen links üben.",
    en: "Practice frequent left-hand patterns."
  },
  lesson8_2: {
    ru: "Отработать частые сочетания правой руки.",
    uk: "Відпрацювати часті поєднання правої руки.",
    kk: "Оң қолдың жиі тіркестерін жаттықтыру.",
    de: "Häufige Kombinationen rechts üben.",
    en: "Practice frequent right-hand patterns."
  },
  lesson8_3: {
    ru: "Смешать частые сочетания обеих рук.",
    uk: "Змішати часті поєднання обох рук.",
    kk: "Екі қолдың жиі тіркестерін араластыру.",
    de: "Häufige Kombinationen beider Hände mischen.",
    en: "Mix frequent patterns from both hands."
  },
  lesson8_4: {
    ru: "Нарастить выносливость без гонки.",
    uk: "Наростити витривалість без гонитви.",
    kk: "Жарыспай төзімділікті арттыру.",
    de: "Ausdauer ohne Hetze aufbauen.",
    en: "Build endurance without racing."
  },
  lesson8_5: {
    ru: "Проверить частые сочетания и устойчивость.",
    uk: "Перевірити часті поєднання й стійкість.",
    kk: "Жиі тіркестер мен тұрақтылықты тексеру.",
    de: "Kombinationen und Stabilität prüfen.",
    en: "Check frequent patterns and stability."
  },
  lesson9_1: {
    ru: "Добавить Shift к левой руке.",
    uk: "Додати Shift до лівої руки.",
    kk: "Shift пернесін сол қолға қосу.",
    de: "Shift zur linken Hand hinzufügen.",
    en: "Add Shift to the left hand."
  },
  lesson9_2: {
    ru: "Добавить Shift к правой руке.",
    uk: "Додати Shift до правої руки.",
    kk: "Shift пернесін оң қолға қосу.",
    de: "Shift zur rechten Hand hinzufügen.",
    en: "Add Shift to the right hand."
  },
  lesson9_3: {
    ru: "Смешать Shift и частые сочетания.",
    uk: "Змішати Shift і часті поєднання.",
    kk: "Shift пен жиі тіркестерді араластыру.",
    de: "Shift und häufige Kombinationen mischen.",
    en: "Mix Shift with frequent patterns."
  },
  lesson9_4: {
    ru: "Удержать ритм на длинных строках.",
    uk: "Утримати ритм на довгих рядках.",
    kk: "Ұзын жолдарда ырғақты сақтау.",
    de: "Rhythmus in langen Zeilen halten.",
    en: "Hold rhythm through longer lines."
  },
  lesson9_5: {
    ru: "Проверить Shift в устойчивой практике.",
    uk: "Перевірити Shift у стійкій практиці.",
    kk: "Shift пернесін тұрақты жаттығуда тексеру.",
    de: "Shift in stabiler Praxis prüfen.",
    en: "Check Shift in steady practice."
  },
  lesson10_1: {
    ru: "Соединить левую руку, Shift и знаки.",
    uk: "Поєднати ліву руку, Shift і знаки.",
    kk: "Сол қолды, Shift пернесін және белгілерді біріктіру.",
    de: "Linke Hand, Shift und Zeichen verbinden.",
    en: "Connect left hand, Shift, and signs."
  },
  lesson10_2: {
    ru: "Соединить правую руку, Shift и знаки.",
    uk: "Поєднати праву руку, Shift і знаки.",
    kk: "Оң қолды, Shift пернесін және белгілерді біріктіру.",
    de: "Rechte Hand, Shift und Zeichen verbinden.",
    en: "Connect right hand, Shift, and signs."
  },
  lesson10_3: {
    ru: "Смешать все частые движения вместе.",
    uk: "Змішати всі часті рухи разом.",
    kk: "Барлық жиі қимылдарды бірге араластыру.",
    de: "Alle häufigen Bewegungen mischen.",
    en: "Mix all frequent movements together."
  },
  lesson10_4: {
    ru: "Закрепить навык на длинной практике.",
    uk: "Закріпити навичку на довгій практиці.",
    kk: "Дағдыны ұзақ жаттығуда бекіту.",
    de: "Den Skill in längerer Praxis festigen.",
    en: "Lock the skill into longer practice."
  },
  lesson10_5: {
    ru: "Проверить весь основной курс.",
    uk: "Перевірити весь основний курс.",
    kk: "Бүкіл негізгі курсты тексеру.",
    de: "Den ganzen Grundkurs prüfen.",
    en: "Check the full core course."
  },
  lesson11_1: {
    ru: "Перейти к случайным живым текстам.",
    uk: "Перейти до випадкових живих текстів.",
    kk: "Кездейсоқ тірі мәтіндерге көшу.",
    de: "Zu zufälligen echten Texten wechseln.",
    en: "Move into random real text."
  },
  lesson12_1: {
    ru: "Тренировать собственные реальные тексты.",
    uk: "Тренувати власні реальні тексти.",
    kk: "Өз нақты мәтіндеріңізді жаттықтыру.",
    de: "Eigene echte Texte trainieren.",
    en: "Train your own real texts."
  }
};

function contentLessonCompletion(lesson, language) {
  const completion = lesson.completion;
  const text = completion && typeof completion === "object" && !Array.isArray(completion)
    ? completion[language] || completion.en || completion.ru || defaultLessonCompletionText[language] || defaultLessonCompletionText.en
    : completion || defaultLessonCompletionText[language] || defaultLessonCompletionText.en;
  return { text };
}

function contentLessonIntro(lesson, language) {
  const intro = lesson.intro || lessonIntroPurpose[lesson.id] || {};
  return {
    purpose: localizedContentText(intro, language)
  };
}

const ukrainianKeyPositionMap = {
  "Ё": "'", "ё": "'",
  "Ы": "І", "ы": "і",
  "Э": "Є", "э": "є",
  "Ъ": "Ї", "ъ": "ї"
};

function adaptRussianKeyboardTextToUkrainian(value) {
  if (Array.isArray(value)) return value.map(adaptRussianKeyboardTextToUkrainian);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, adaptRussianKeyboardTextToUkrainian(item)])
    );
  }
  if (typeof value !== "string") return value;
  return value.replace(/[ЁёЫыЭэЪъ]/g, character => ukrainianKeyPositionMap[character] || character);
}

const ukrainianModuleTitles = {
  module1: "Модуль 1 — Домашній ряд",
  module2: "Модуль 2 — Центр",
  module3: "Модуль 3 — Верхній ряд",
  module4: "Модуль 4 — Нижній ряд",
  module5: "Модуль 5 — Вертикалі та Shift",
  module6: "Модуль 6 — Верхній ряд + цифри",
  module7: "Модуль 7 — Пунктуація",
  module8: "Модуль 8 — Частотні поєднання",
  module9: "Модуль 9 — Частотні поєднання + Shift",
  module10: "Модуль 10 — Частотні поєднання + Shift + пунктуація",
  module11: "Випадкові тексти + власні налаштування",
  module12: "Власні тексти + власні налаштування"
};

const ukrainianLessonTitles = {
  lesson1_1: "Ліва рука",
  lesson1_2: "Права рука",
  lesson1_3: "Обидві руки",
  lesson1_4: "Короткі слова",
  lesson1_5: "Тест",
  lesson2_1: "Центр ліворуч",
  lesson2_2: "Центр праворуч",
  lesson2_3: "Нижній ряд",
  lesson2_4: "Короткі слова",
  lesson2_5: "Тест",
  lesson3_1: "Верх ліворуч",
  lesson3_2: "Верх праворуч",
  lesson3_3: "Верхній ряд",
  lesson3_4: "Короткі слова",
  lesson3_5: "Тест",
  lesson4_1: "Низ ліворуч",
  lesson4_2: "Низ праворуч",
  lesson4_3: "Нижній ряд",
  lesson4_4: "Короткі слова",
  lesson4_5: "Тест",
  lesson5_1: "Вертикалі ліворуч",
  lesson5_2: "Вертикалі праворуч",
  lesson5_3: "Регістр",
  lesson5_4: "Слова-стрибки",
  lesson5_5: "Великий тест 1",
  lesson6_1: "Ліва сторона",
  lesson6_2: "Права сторона",
  lesson6_3: "Увесь цифровий ряд",
  lesson6_4: "Змішане введення",
  lesson6_5: "Тест",
  lesson7_1: "Крапка й кома",
  lesson7_2: "Питання й оклик",
  lesson7_3: "Тире, двокрапка, лапки",
  lesson7_4: "Фрази зі знаками",
  lesson7_5: "Тест",
  lesson8_1: "Ліва рука",
  lesson8_2: "Права рука",
  lesson8_3: "Змішані поєднання",
  lesson8_4: "Практика на витривалість",
  lesson8_5: "Тест",
  lesson9_1: "Ліва рука",
  lesson9_2: "Права рука",
  lesson9_3: "Змішані поєднання",
  lesson9_4: "Практика на витривалість",
  lesson9_5: "Тест",
  lesson10_1: "Ліва рука",
  lesson10_2: "Права рука",
  lesson10_3: "Змішані поєднання",
  lesson10_4: "Практика на витривалість",
  lesson10_5: "Тест",
  lesson11_1: "Випадкові тексти",
  lesson12_1: "Власні тексти"
};

const ukrainianLessonTips = {
  lesson1_1: ["Спочатку покладіть вказівні пальці на клавіші з маленькими мітками — А й О. Потім розкладіть решту пальців і лише тоді починайте друкувати."],
  lesson1_2: ["Сидіть рівно, але без напруження. Очі приблизно на рівні верхньої частини екрана, лікті зігнуті близько до прямого кута. Найважливіше — щоб тілу було зручно."],
  lesson1_3: ["Працюють усі десять пальців. У кожного пальця своя зона, і саме з цього поступово з'являється легкість у наборі."],
  lesson1_4: ["Перед вправою перевірте аплікатуру: чи зручно пальцям, чи зрозумілі зони, чи не доводиться тягнутися зайвий раз."],
  lesson1_5: ["У тесті підказки вимикаються, щоб пальці спробували працювати самостійно. Це не іспит, а спокійна перевірка навички."],
  lesson5_3: ["Shift натискає протилежна рука: для великої літери ліворуч допомагає правий Shift, для літери праворуч — лівий."],
  lesson5_5: ["Це перший великий тест. Не женіться за швидкістю: рівний ритм і точність важливіші за поспіх."],
  lesson6_3: ["На цифровому ряду рука рухається трохи вище, але пальці все одно повертаються до домашнього ряду."],
  lesson6_4: ["Коли літери й цифри змішуються, не втрачайте ритм. Краще коротка пауза перед складним знаком, ніж випадкове натискання."],
  lesson7_1: ["Знаки пунктуації теж мають свою аплікатуру. Натискайте їх так само уважно, як літери."],
  lesson7_2: ["Для знаків із Shift спочатку відчуйте пару клавіш, а вже потім поступово додавайте темп."],
  lesson7_3: ["Тире, двокрапка й лапки часто збивають ритм. Дайте пальцям час запам'ятати ці переходи."],
  lesson7_4: ["У фразах важливо читати на один-два символи вперед, щоб пальці не чекали кожної наступної підказки."],
  lesson8_4: ["Витривалість — це не марафон на швидкість. Тримайте рівний темп і розслаблені плечі."],
  lesson8_5: ["Метроном допомагає почути ритм. Якщо збилися, поверніться до спокійного набору, а не прискорюйтесь навмання."],
  lesson9_4: ["Великі літери додають навантаження. Стежте, щоб Shift не ламав поставу кистей."],
  lesson10_4: ["Тут одночасно працюють частотні поєднання, Shift і пунктуація. Рухайтесь рівно, без ривків."],
  lesson11_1: ["Випадковий текст ближчий до реального набору: менше повторів, більше живої мови й більше відповідальності для пальців."],
  lesson12_1: ["Власний текст корисний тоді, коли хочеться тренувати саме те, що ви справді друкуєте щодня."]
};

const ukrainianGenericLessonTips = {
  "1": ["Починайте повільно й уважно. Якщо пальці плутаються, зменште темп і поверніться до рівного ритму."],
  "2": ["Не дивіться на клавіатуру довше, ніж потрібно. Краще одна спокійна пауза, ніж серія випадкових натискань."],
  "3": ["Після кожного переходу повертайте пальці до домашнього ряду. Це ваша опорна точка."],
  "4": ["У словах важливо не лише натиснути правильні клавіші, а й не втратити плавність між ними."],
  "5": ["У тесті підказок менше, зате краще видно, що вже стало автоматичним. Дихайте рівно й не поспішайте."]
};

const ukrainianDescriptions = {
  lesson11_1: "Меню тексту й підказок перед стартом",
  lesson12_1: "Вставлення тексту й налаштування перед стартом"
};

const ukrainianSamples = {
  lesson11_1: ["випадковий текст з'явиться тут після завантаження джерела і буде поділений на рядки для спокійної практики"],
  lesson12_1: ["вставте власний текст у меню перед стартом і налаштуйте підказки так як зручно саме для цього тренування"]
};

function lessonNumberSuffix(lessonId) {
  return String(lessonId || "").split("_")[1] || "";
}

function ensureUkrainianPracticeContent(source) {
  if (!source || !Array.isArray(source.modules)) return source;

  source.modules.forEach(module => {
    module.title = module.title || {};
    module.title.uk = module.title.uk || ukrainianModuleTitles[module.id] || adaptRussianKeyboardTextToUkrainian(module.title.ru || module.title.en || "");

    module.symbols = module.symbols || {};
    if (!module.symbols.uk && module.symbols.ru) {
      module.symbols.uk = adaptRussianKeyboardTextToUkrainian(module.symbols.ru);
    }

    module.lessons?.forEach(lesson => {
      lesson.title = lesson.title || {};
      lesson.title.uk = lesson.title.uk || ukrainianLessonTitles[lesson.id] || adaptRussianKeyboardTextToUkrainian(lesson.title.ru || lesson.title.en || "");

      lesson.description = lesson.description || {};
      if (!lesson.description.uk && ukrainianDescriptions[lesson.id]) {
        lesson.description.uk = ukrainianDescriptions[lesson.id];
      }

      lesson.tips = lesson.tips || {};
      lesson.tips.uk = lesson.tips.uk || ukrainianLessonTips[lesson.id] || ukrainianGenericLessonTips[lessonNumberSuffix(lesson.id)] || [];

      lesson.completion = lesson.completion || {};
      lesson.completion.uk = lesson.completion.uk || defaultLessonCompletionText.uk;

      lesson.lines = lesson.lines || {};
      if (!lesson.lines.uk) {
        lesson.lines.uk = ukrainianSamples[lesson.id] || adaptRussianKeyboardTextToUkrainian(lesson.lines.ru || lesson.lines.en || []);
      }

      if (lesson.symbolPolicy && lesson.symbolPolicy.ru && !lesson.symbolPolicy.uk) {
        lesson.symbolPolicy.uk = adaptRussianKeyboardTextToUkrainian(lesson.symbolPolicy.ru);
      }
    });
  });

  return source;
}

function repeatPracticePattern(patterns, targetCount = 10) {
  return patterns.map(pattern => Array.from({ length: Math.max(1, Math.ceil(120 / pattern.length)) }, () => pattern).join(" ").slice(0, 150));
}

function adaptRussianKeyboardTextToKazakh(value) {
  if (Array.isArray(value)) return value.map(adaptRussianKeyboardTextToKazakh);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, adaptRussianKeyboardTextToKazakh(item)])
    );
  }
  if (typeof value !== "string") return value;
  return value.replace(/[Ёё]/g, character => character === "Ё" ? "Е" : "е");
}

const kazakhModuleTitles = {
  module1: "1-модуль — Негізгі қатар",
  module2: "2-модуль — Орталық аймақ",
  module3: "3-модуль — Жоғарғы әріптер қатары",
  module4: "4-модуль — Төменгі қатар",
  module5: "5-модуль — Тік бағыттар және Shift",
  module6: "6-модуль — Қазақ әріптері бар жоғарғы қатар",
  module7: "7-модуль — Тыныс белгілері",
  module8: "8-модуль — Жиі кездесетін тіркестер",
  module9: "9-модуль — Жиі тіркестер + Shift",
  module10: "10-модуль — Жиі тіркестер + Shift + тыныс белгілері",
  module11: "Кездейсоқ мәтіндер + өз баптауларыңыз",
  module12: "Өз мәтіндеріңіз + өз баптауларыңыз"
};

const kazakhLessonTitles = {
  lesson1_1: "Сол қол",
  lesson1_2: "Оң қол",
  lesson1_3: "Екі қол",
  lesson1_4: "Қысқа сөздер",
  lesson1_5: "Тест",
  lesson2_1: "Орталық сол жақ",
  lesson2_2: "Орталық оң жақ",
  lesson2_3: "Төменгі қатар",
  lesson2_4: "Қысқа сөздер",
  lesson2_5: "Тест",
  lesson3_1: "Жоғары сол жақ",
  lesson3_2: "Жоғары оң жақ",
  lesson3_3: "Жоғарғы қатар",
  lesson3_4: "Қысқа сөздер",
  lesson3_5: "Тест",
  lesson4_1: "Төмен сол жақ",
  lesson4_2: "Төмен оң жақ",
  lesson4_3: "Төменгі қатар",
  lesson4_4: "Қысқа сөздер",
  lesson4_5: "Тест",
  lesson5_1: "Сол жақ тік бағыттар",
  lesson5_2: "Оң жақ тік бағыттар",
  lesson5_3: "Бас әріптер",
  lesson5_4: "Секірмелі сөздер",
  lesson5_5: "Үлкен тест 1",
  lesson6_1: "Ә, І, Ң, Ғ",
  lesson6_2: "Ү, Ұ, Қ, Ө, Һ",
  lesson6_3: "Қазақ әріптері қатары",
  lesson6_4: "Сөздер мен белгілер",
  lesson6_5: "Тест",
  lesson7_1: "Нүкте мен үтір",
  lesson7_2: "Сұрақ пен леп белгісі",
  lesson7_3: "Сызықша, қос нүкте, тырнақша",
  lesson7_4: "Белгілері бар фразалар",
  lesson7_5: "Тест",
  lesson8_1: "Сол қол",
  lesson8_2: "Оң қол",
  lesson8_3: "Аралас тіркестер",
  lesson8_4: "Төзімділік жаттығуы",
  lesson8_5: "Тест",
  lesson9_1: "Сол қол",
  lesson9_2: "Оң қол",
  lesson9_3: "Аралас тіркестер",
  lesson9_4: "Төзімділік жаттығуы",
  lesson9_5: "Тест",
  lesson10_1: "Сол қол",
  lesson10_2: "Оң қол",
  lesson10_3: "Аралас тіркестер",
  lesson10_4: "Төзімділік жаттығуы",
  lesson10_5: "Тест",
  lesson11_1: "Кездейсоқ мәтіндер",
  lesson12_1: "Өз мәтіндеріңіз"
};

const kazakhLessonTips = {
  lesson1_1: ["Алдымен сұқ саусақтарды белгісі бар А және О пернелеріне қойыңыз. Содан кейін қалған саусақтарды орнына жайғастырып, асықпай теруді бастаңыз."],
  lesson1_2: ["Арқаңызды түзу ұстаңыз, бірақ қатайып отырмаңыз. Көз экранның жоғарғы бөлігіне жақын деңгейде, шынтақ шамамен тік бұрышта болғаны ыңғайлы."],
  lesson1_3: ["Барлық он саусақ жұмыс істейді. Әр саусақтың өз аймағы бар, ал жеңілдік осы тәртіптен басталады."],
  lesson1_4: ["Жаттығу алдында аппликатураны тексеріңіз: саусақтарға ыңғайлы ма, аймақтар түсінікті ме, артық созылу жоқ па."],
  lesson1_5: ["Тестте көмекшілер өшеді. Бұл емтихан емес, саусақтардың өз бетімен жұмыс істей бастағанын байқауға арналған тыныш тексеріс."],
  lesson5_3: ["Shift пернесін қарсы қол басады: сол жақтағы бас әріпке оң Shift, оң жақтағы бас әріпке сол Shift көмектеседі."],
  lesson6_1: ["Қазақтың Ә, І, Ң, Ғ әріптері жоғарғы қатарда орналасады. Саусақ үй қатарынан көтеріліп, қайтадан орнына оралсын."],
  lesson6_2: ["Ү, Ұ, Қ, Ө, Һ әріптері де жоғарғы қатарда. Әріпке жеткен соң қолды төмен түсіріп, ырғақты сақтаңыз."],
  lesson6_3: ["Бұл қатарда қазақ тіліне тән әріптер бірге қайталанады. Мақсат — олардың орнын бөлек-бөлек емес, тұтас аймақ ретінде сезіну."],
  lesson6_4: ["Қазақ әріптері сөз ішінде кездескенде асықпаңыз. Әр арнайы әріпке қысқа, анық қозғалыс жеткілікті."],
  lesson6_5: ["Тестте жоғарғы қатардағы қазақ әріптері еркін араласады. Жылдамдық емес, дәлдік пен қалыпты ырғақ маңызды."],
  lesson7_1: ["Тыныс белгілерінің де өз орны бар. Оларды әріптер сияқты дәл және сабырмен басыңыз."],
  lesson7_2: ["Shift арқылы терілетін белгілерде алдымен пернелер жұбын сезініп алыңыз, содан кейін ғана темп қосыңыз."],
  lesson7_3: ["Сызықша, қос нүкте және тырнақша ырғақты оңай бұзады. Саусақтарға осы өтулерді жаттап алуға уақыт беріңіз."],
  lesson7_4: ["Фразада бір-екі таңбаны алдын ала оқыңыз. Сонда саусақтар әр келесі белгіге тоқтап қалмайды."],
  lesson8_4: ["Төзімділік — жылдамдық жарысы емес. Иық бос, тыныс бірқалыпты, теру ырғағы тұрақты болсын."],
  lesson11_1: ["Кездейсоқ мәтін нақты теруге жақынырақ: қайталау аз, тіл тірі, ал саусақтарға жауапкершілік көбірек түседі."],
  lesson12_1: ["Өз мәтініңізді жаттықтыру күнделікті шынымен теретін сөздерге үйренуге көмектеседі."]
};

const kazakhGenericLessonTips = {
  "1": ["Баяу және мұқият бастаңыз. Саусақтар шатасса, темпті азайтып, бірқалыпты ырғаққа қайтыңыз."],
  "2": ["Пернетақтаға қажеттен артық қарамаңыз. Бір тыныш кідіріс бірнеше кездейсоқ басудан жақсы."],
  "3": ["Әр ауысудан кейін саусақтарды негізгі қатарға қайтарыңыз. Бұл сіздің тірек нүктеңіз."],
  "4": ["Сөздерде дұрыс пернені табу ғана емес, қозғалыстың жұмсақ байланысы да маңызды."],
  "5": ["Тестте көмек азаяды, бірақ дағдының қай бөлігі автоматқа айналғаны жақсы көрінеді."]
};

const kazakhDescriptions = {
  lesson11_1: "Старт алдында мәтін мен көмекшілер мәзірі",
  lesson12_1: "Старт алдында мәтін енгізу және баптау"
};

const kazakhSamples = {
  lesson11_1: ["кездейсоқ мәтін дереккөзден жүктелген соң осында шығады және сабырлы жаттығу жолдарына бөлінеді"],
  lesson12_1: ["старт алдында өз мәтініңізді енгізіп осы жаттығуға ыңғайлы көмекшілерді баптаңыз"]
};

const kazakhModule6Lines = {
  lesson6_1: repeatPracticePattern([
    "әі ңғ әі ңғ іә ғң әі ңғ әә іі ңң ғғ",
    "әң іғ әі ңғ әғ ің әі ңғ әі ңғ",
    "әке ірі аң ғажап әке ірі аң ғажап",
    "ән ін әңгіме ғалым ән ін әңгіме ғалым",
    "ә і ң ғ әі ңғ іә ғң әі ңғ"
  ], 5),
  lesson6_2: repeatPracticePattern([
    "үұ қө һ үұ қө һ ұү өқ һү ұқ",
    "күн құс көл үміт ұлы күн құс көл үміт",
    "құлақ өңір үн үкі қоңыр құлақ өңір үн",
    "ү ү ұ ұ қ қ ө ө һ һ үұ қө",
    "ұқ өһ үқ ұө қү өұ үұ қө һ"
  ], 5),
  lesson6_3: repeatPracticePattern([
    "әі ңғ үұ қө һ әі ңғ үұ қө һ",
    "әке күн ұлы қала өнер ілім ғалым",
    "қазақ әліпбиі үлкен өңір ұлт құндылық",
    "ә ң ү қ ө і ғ ұ һ ә ң ү қ ө",
    "әіүұ қөңғ һ әіүұ қөңғ һ"
  ], 5),
  lesson6_4: repeatPracticePattern([
    "қазақ тілі әдемі әрі бай тіл",
    "күн жылы өзен кең дала тыныш",
    "ұлт өнер білім үлкен жауап",
    "әке мен ана үйге ерте келді",
    "құс ұшты көл үсті тынық болды"
  ], 5),
  lesson6_5: repeatPracticePattern([
    "қазақ әліпбиі ә і ң ғ ү ұ қ ө һ әріптерін қамтиды",
    "үлкен қалада өнер білім және еңбек қатар жүреді",
    "күн сайын қысқа жаттығу саусақты сенімді етеді",
    "әңгімені асықпай оқып әр сөзді анық теріңіз",
    "қоңыр күзде өзен үсті тыныш көрінеді",
    "ұлт тілі мен жазуы күнделікті еңбекте шыңдалады",
    "әдемі өрнек құнды еңбек үлкен ықылас",
    "ғалым жаңа әдісті ұзақ бақылап көрді",
    "құс көлге қонды күн бұлт арасынан шықты",
    "әріптер орны есте қалса теру жеңілдейді"
  ], 10)
};

const kazakhModule6Symbols = ["ә", "і", "ң", "ғ", "ү", "ұ", "қ", "ө", "һ"];
const kazakhModule7Symbols = [".", ",", "!", "?", ":", ";", "\"", "№"];
const kazakhModule7Lines = {
  lesson7_1: repeatPracticePattern([
    "ана, әке. қала, дала. күн, түн.",
    "сөз, ой. мәтін, жол. әріп, дыбыс.",
    "қала, өзен. дала, көл. адам, еңбек.",
    "әліпби, тіл. өнер, білім. уақыт, ырғақ.",
    "құс, көл. күн, жел. үй, жол."
  ], 10),
  lesson7_2: repeatPracticePattern([
    "қалай? жақсы! кім? мен! қайда? осында!",
    "күн шықты! жаңбыр жауа ма? иә! жоқ?",
    "дайынсың ба? бастайық! қате бар ма? түзет!",
    "бұл әріп пе? иә! бұл белгі ме? иә!",
    "ырғақ сақталды ма? жақсы!"
  ], 10),
  lesson7_3: repeatPracticePattern([
    "тақырып: \"тіл\" бөлім: \"әріп\" белгі: \"№\"",
    "жол: \"қазақ\" мәтін: \"жаттығу\" белгі: \"№\"",
    "сабақ: \"перне\" мақсат: \"дәлдік\"",
    "мәтін: \"қысқа\" ырғақ: \"бірқалыпты\"",
    "әріп: \"ә\" әріп: \"қ\" әріп: \"ө\""
  ], 10),
  lesson7_4: repeatPracticePattern([
    "Ана келді, әке оқыды. Бала жазды! Қала тыныш?",
    "Қазақ тілі: әдемі, бай, анық. Мәтін дайын!",
    "Күн жылы, дала кең. Құс ұшты? Иә!",
    "Сөз қысқа, ой анық. Теруді жалғастыр!",
    "Жаттығу № бірінші. Мақсат: дәлдік!"
  ], 10),
  lesson7_5: repeatPracticePattern([
    "Қала тыныш, күн жылы. Бала оқыды? Иә!",
    "Мәтін дайын: \"қазақ тілі\". Жаттығу № бірінші!",
    "Әріп анық, ырғақ бірқалыпты. Қате бар ма?",
    "Көл кең, дала сұлу. Құс ұшты!",
    "Сабақ: \"тыныс белгілері\". Мақсат: дәлдік!"
  ], 15)
};

function ensureKazakhPracticeContent(source) {
  if (!source || !Array.isArray(source.modules)) return source;

  source.modules.forEach(module => {
    module.title = module.title || {};
    module.title.kk = module.title.kk || kazakhModuleTitles[module.id] || adaptRussianKeyboardTextToKazakh(module.title.ru || module.title.en || "");

    module.symbols = module.symbols || {};
    if (!module.symbols.kk) {
      module.symbols.kk = module.id === "module6"
        ? kazakhModule6Symbols
        : module.id === "module7"
          ? kazakhModule7Symbols
          : adaptRussianKeyboardTextToKazakh(module.symbols.ru || module.symbols.en || []);
    }

    module.lessons?.forEach(lesson => {
      lesson.title = lesson.title || {};
      lesson.title.kk = lesson.title.kk || kazakhLessonTitles[lesson.id] || adaptRussianKeyboardTextToKazakh(lesson.title.ru || lesson.title.en || "");

      lesson.description = lesson.description || {};
      if (!lesson.description.kk && kazakhDescriptions[lesson.id]) {
        lesson.description.kk = kazakhDescriptions[lesson.id];
      }

      lesson.tips = lesson.tips || {};
      lesson.tips.kk = lesson.tips.kk || kazakhLessonTips[lesson.id] || kazakhGenericLessonTips[lessonNumberSuffix(lesson.id)] || [];

      lesson.completion = lesson.completion || {};
      lesson.completion.kk = lesson.completion.kk || defaultLessonCompletionText.kk;

      lesson.lines = lesson.lines || {};
      if (!lesson.lines.kk) {
        lesson.lines.kk = kazakhSamples[lesson.id]
          || kazakhModule6Lines[lesson.id]
          || kazakhModule7Lines[lesson.id]
          || adaptRussianKeyboardTextToKazakh(lesson.lines.ru || lesson.lines.en || []);
      }

      if (lesson.symbolPolicy && !lesson.symbolPolicy.kk) {
        lesson.symbolPolicy.kk = module.id === "module6" && kazakhModule6Lines[lesson.id]
          ? kazakhModule6Symbols
          : module.id === "module7" && kazakhModule7Lines[lesson.id]
            ? kazakhModule7Symbols
          : adaptRussianKeyboardTextToKazakh(lesson.symbolPolicy.ru || lesson.symbolPolicy.en || []);
      }
    });
  });

  return source;
}

function buildPracticeContentForLanguage(source, language) {
  const modules = {};
  const moduleGroups = source.modules.map(module => ({
      id: module.id,
      title: localizedContentText(module.title, language),
      symbols: module.symbols || {},
      lessons: module.lessons.map(lesson => {
        const normalizedLesson = {
          id: lesson.id,
          moduleId: module.id,
          symbolPolicy: lesson.symbolPolicy || {},
          customPractice: lesson.customPractice || null,
          name: localizedContentText(lesson.title, language),
          description: localizedContentText(lesson.description, language),
          intro: contentLessonIntro(lesson, language),
          tips: localizedContentList(lesson.tips, language),
          completion: contentLessonCompletion(lesson, language),
          target: lesson.target || {},
          lines: contentLessonLines(lesson, language)
        };

        modules[lesson.id] = normalizedLesson;
        return normalizedLesson;
      })
    }));

  return {
    moduleGroups,
    modules,
    grades: source.grades[language] || source.grades.en || []
  };
}

function buildPracticeContent() {
  const bundle = window.FlyKeyContentProvider?.getContentBundle?.() || window.PRACTICE_CONTENT_SOURCE || {};
  const source = ensureKazakhPracticeContent(ensureUkrainianPracticeContent({
    meta: bundle.meta,
    languages: bundle.languages,
    grades: bundle.grades,
    modules: bundle.modules || []
  }));
  const languages = source.languages || ["ru", "uk", "kk", "de", "en"];

  window.PRACTICE_CONTENT_META = {
    ...(source.meta || window.FLYKEY_CONTENT_VERSION || {}),
    languages,
    moduleCount: source.modules?.length || 0,
    lessonCount: (source.modules || []).reduce((count, module) => count + (module.lessons?.length || 0), 0)
  };

  window.PRACTICE_CONTENT = {};
  languages.forEach(language => {
    window.PRACTICE_CONTENT[language] = buildPracticeContentForLanguage(source, language);
  });
}

buildPracticeContent();
