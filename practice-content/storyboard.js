const flyKeyDefaultCompletionText = {
  ru: "Практика «Короткие слова» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
  uk: "Практика «Короткі слова» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
  kk: "«Қысқа сөздер» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
  de: "Die Übung „Kurze Wörter“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
  en: "The “Short Words” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
};

function flyKeyLessonStoryboardEntry(entry) {
  return {
    introImage: entry.introImage,
    introTip: entry.introTip || null,
    nextModuleText: entry.nextModuleText || null,
    completionImage: entry.completionImage,
    completionText: entry.completionText || flyKeyDefaultCompletionText,
    showIntroImage: entry.showIntroImage !== false,
    showIntroTip: entry.showIntroTip !== false,
    showNextModuleText: entry.showNextModuleText !== false,
    showCompletionImage: entry.showCompletionImage !== false,
    showCompletionText: entry.showCompletionText !== false
  };
}

window.FLYKEY_WELCOME_STORYBOARD = {
  screens: [
    {
      id: "welcome_1",
      image: "fly_welcome_no_bg.png",
      text: {
              ru: "FlyKey — это тренажёр слепой печати.\nFlyKey — преврати клавиатуру в продолжение твоих мыслей.\nFlyKey — печатай легко, будто пальцы умеют летать.",
              uk: "FlyKey — це тренажер сліпого друку.\nFlyKey допомагає перетворити клавіатуру на продовження думок.\nДрукуй легко, ніби пальці вже знають дорогу.",
              kk: "FlyKey — соқыр теруге арналған жаттықтырғыш.\nFlyKey пернетақтаны ойыңыздың жалғасына айналдыруға көмектеседі.\nСаусақтар жолды өзі білетіндей жеңіл теріңіз.",
              de: "FlyKey ist ein Trainer für Blindtippen.\nFlyKey macht die Tastatur zu einer Erweiterung deiner Gedanken.\nTippe leicht, als würden deine Finger den Weg schon kennen.",
              en: "FlyKey is a touch typing trainer.\nFlyKey turns the keyboard into an extension of your thoughts.\nType lightly, as if your fingers already know the way."
            },
      visible: true,
      showImage: false
    },
    {
      id: "welcome_2",
      image: "fly_welcome_no_bg.png",
      text: {
              ru: "Лёгкость, скорость и уверенность за клавиатурой тебя уже ждут.",
              uk: "Легкість, швидкість і впевненість за клавіатурою вже чекають на тебе.",
              kk: "Пернетақтадағы жеңілдік, жылдамдық және сенімділік сізді күтіп тұр.",
              de: "Leichtigkeit, Geschwindigkeit und Sicherheit an der Tastatur warten schon auf dich.",
              en: "Ease, speed, and confidence at the keyboard are already waiting for you."
            },
      visible: false,
      showImage: false
    },
    {
      id: "welcome_3",
      image: "fly_welcome_no_bg.png",
      text: {
              ru: "Здесь ты не зубришь клавиши, а постепенно учишься печатать свободно: меньше смотреть вниз, меньше напрягаться и больше доверять пальцам.",
              uk: "Тут ти не зубриш клавіші. Ти поступово вчишся друкувати вільно: менше дивитися вниз, менше напружуватися і більше довіряти пальцям.",
              kk: "Мұнда пернелерді жаттап алмайсыз. Біртіндеп еркін теруді үйренесіз: төменге азырақ қарау, аз ширығу және саусақтарға көбірек сену.",
              de: "Hier paukst du keine Tasten. Du lernst Schritt für Schritt frei zu tippen: weniger nach unten schauen, weniger anspannen und den Fingern mehr vertrauen.",
              en: "Here you do not memorize keys by force. You gradually learn to type freely: look down less, tense up less, and trust your fingers more."
            },
      visible: false,
      showImage: false
    },
    {
      id: "welcome_4",
      image: "key-wave.webp",
      text: {
              ru: "Меня зовут Key. Я буду с тобой.\nТвой маленький летающий помощник, который подсказывает, поддерживает и помогает не сбиться. Не строгий учитель, а напарник, с которым тренироваться проще и веселее.",
              uk: "Мене звати Key. Я буду поруч.\nТвій маленький летючий помічник підказує, підтримує й допомагає не збиватися з ритму. Не суворий учитель, а напарник, з яким тренуватися легше.",
              kk: "Менің атым Key. Мен қасыңызда боламын.\nКішкентай ұшқыш көмекшіңіз кеңес береді, қолдайды және ырғақтан жаңылмауға көмектеседі. Қатал мұғалім емес, жаттығуды жеңілдететін серіктес.",
              de: "Ich heiße Key. Ich bleibe bei dir.\nDein kleiner fliegender Helfer gibt Hinweise, unterstützt dich und hilft dir, im Rhythmus zu bleiben. Kein strenger Lehrer, sondern ein Partner, mit dem Üben leichter wird.",
              en: "My name is Key. I will stay with you.\nYour little flying helper gives hints, supports you, and helps you keep the rhythm. Not a strict teacher, but a partner who makes practice easier."
            },
      visible: true,
      showImage: true
    }
  ]
};

window.FLYKEY_ONBOARDING_STORYBOARD = {
  screens: [
    {
      id: "onboarding_finger_map_after_1_4",
      title: {
              ru: "Объяснение карты пальцев",
              uk: "Пояснення карти пальців",
              kk: "Саусақ картасын түсіндіру",
              de: "Fingerkarte erklären",
              en: "Explain Finger Map"
            },
      trigger: {"type":"afterLesson","lessonId":"lesson1_4"},
      image: "key-explain.webp",
      text: {
              ru: "Теперь можно настроить карту пальцев.\nЕсли какая-то клавиша ощущается неудобно, открой карту пальцев и назначь ей тот палец, которым тебе легче двигаться.",
              uk: "Тепер можна налаштувати карту пальців.\nЯкщо якась клавіша відчувається незручно, відкрий карту пальців і признач їй той палець, яким рухатися легше.",
              kk: "Енді саусақ картасын баптауға болады.\nЕгер бір перне ыңғайсыз сезілсе, саусақ картасын ашып, оны басуға ыңғайлы саусаққа бекітіңіз.",
              de: "Jetzt kannst du die Fingerkarte anpassen.\nWenn sich eine Taste unbequem anfühlt, öffne die Fingerkarte und ordne sie dem Finger zu, mit dem die Bewegung leichter wird.",
              en: "Now you can adjust the Finger Map.\nIf a key feels uncomfortable, open the Finger Map and assign it to the finger that makes the movement easier."
            },
      visible: true,
      showImage: true
    },
    {
      id: "onboarding_finger_map_feature_open",
      title: {
              ru: "Открытие карты пальцев",
              uk: "Відкриття карти пальців",
              kk: "Саусақ картасын ашу",
              de: "Fingerkarte öffnen",
              en: "Open Finger Map"
            },
      trigger: {"type":"featureOpen","lessonId":null},
      image: "key-idea.webp",
      text: {
              ru: "Это карта пальцев.\nЗдесь видно, какой палец отвечает за каждую клавишу. Меняй назначение только там, где движение действительно становится удобнее.",
              uk: "Це карта пальців.\nТут видно, який палець відповідає за кожну клавішу. Змінюй призначення лише там, де рух справді стає зручнішим.",
              kk: "Бұл саусақ картасы.\nМұнда әр пернеге қай саусақ жауап беретіні көрінеді. Тағайындауды тек қозғалыс шынымен ыңғайлырақ болғанда өзгертіңіз.",
              de: "Das ist die Fingerkarte.\nHier siehst du, welcher Finger für welche Taste zuständig ist. Ändere die Zuordnung nur dort, wo die Bewegung wirklich bequemer wird.",
              en: "This is the Finger Map.\nIt shows which finger is responsible for each key. Change an assignment only when the movement truly becomes more comfortable."
            },
      visible: true,
      showImage: true
    }
  ]
};

window.FLYKEY_LESSON_STORYBOARD = {
  lesson1_1: flyKeyLessonStoryboardEntry({
    introImage: "key-hand-forward-right.webp",
    introTip: {
          ru: "Сначала указательные пальцы положи на клавиши с «пупырышками» — А и О, потом разложи остальные пальцы, потом начинай печатать.",
          uk: "Спочатку покладіть вказівні пальці на клавіші з маленькими мітками — А й О. Потім розкладіть решту пальців і лише тоді починайте друкувати.",
          kk: "Алдымен сұқ саусақтарды белгісі бар А және О пернелеріне қойыңыз. Содан кейін қалған саусақтарды орнына жайғастырып, асықпай теруді бастаңыз.",
          de: "Lege zuerst deine Zeigefinger auf die Tasten mit den kleinen Markierungen - F und J. Dann ordne die restlichen Finger ein und beginne erst danach zu tippen.",
          en: "First place your index fingers on the keys with the little bumps - F and J. Then set the rest of your fingers in place and start typing."
        },
    nextModuleText: {
          ru: "Почувствовать стартовую позицию левой руки.",
          uk: "Відчути стартову позицію лівої руки.",
          kk: "Сол қолдың бастапқы қалпын сезіну.",
          de: "Die Grundposition der linken Hand fühlen.",
          en: "Feel the left-hand starting position."
        },
    completionImage: "key-celebrate.png",
    completionText: {
          ru: "Шаг «Левая рука» закрыт. Движение стало понятнее! Держим спокойный темп и идём дальше.",
          uk: "Крок «Ліва рука» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
          kk: "«Сол қол» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
          de: "Der Schritt „Linke Hand“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
          en: "The “Left Hand” step is complete. The movement is clearer now; keep the pace calm and move on."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson1_2: flyKeyLessonStoryboardEntry({
    introImage: "key-hand-forward-left.webp",
    introTip: {
          ru: "Сиди прямо и не горбись. Твои глаза должны быть на уровне верхней части монитора, а локти — согнуты под углом 90°. Но главное, чтобы удобно было, конечно!",
          uk: "Сидіть рівно, але без напруження. Очі приблизно на рівні верхньої частини екрана, лікті зігнуті близько до прямого кута. Найважливіше — щоб тілу було зручно.",
          kk: "Арқаңызды түзу ұстаңыз, бірақ қатайып отырмаңыз. Көз экранның жоғарғы бөлігіне жақын деңгейде, шынтақ шамамен тік бұрышта болғаны ыңғайлы.",
          de: "Sitz aufrecht und mach dich nicht krumm. Deine Augen sollten etwa auf Höhe des oberen Monitorbereichs sein, die Ellbogen ungefähr im 90-Grad-Winkel. Am wichtigsten ist natürlich, dass es bequem bleibt!",
          en: "Sit upright and do not hunch over. Your eyes should be level with the upper part of the monitor, and your elbows bent at about 90 degrees. Most importantly, stay comfortable!"
        },
    nextModuleText: {
          ru: "Подключить правую руку к домашнему ряду.",
          uk: "Підключити праву руку до домашнього ряду.",
          kk: "Оң қолды негізгі қатарға қосу.",
          de: "Die rechte Hand zur Grundreihe bringen.",
          en: "Bring the right hand into the home row."
        },
    completionImage: "key-completion.webp",
    completionText: {
          ru: "Раздел «Правая рука» пройден! Сохраняй базовую позицию и продолжай.",
          uk: "Розділ «Права рука» пройдено! Зберігай базову позицію й продовжуй.",
          kk: "«Оң қол» бөлімі өтті! Негізгі позицияны сақтап, жалғастыр.",
          de: "Der Abschnitt „Rechte Hand“ ist geschafft! Halte die Grundposition und mach weiter.",
          en: "The “Right Hand” section is complete! Keep the home position steady and continue."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson1_3: flyKeyLessonStoryboardEntry({
    introImage: "key-explain.webp",
    introTip: {
          ru: "Теперь все десять пальцев! Не печатай только двумя пальцами. Каждому пальцу — своя зона!",
          uk: "Працюють усі десять пальців. У кожного пальця своя зона, і саме з цього поступово з'являється легкість у наборі.",
          kk: "Барлық он саусақ жұмыс істейді. Әр саусақтың өз аймағы бар, ал жеңілдік осы тәртіптен басталады.",
          de: "Benutze alle zehn Finger! Tippe nicht nur mit zwei Fingern. Jeder Finger hat seine eigene Zone. Selbst meine kleinen Flügel hätten es schwer, wenn sie alles allein machen müssten.",
          en: "Use all ten fingers! Do not type with only two fingers. Every finger has its own zone. Even my little wings would struggle if they had to work alone."
        },
    nextModuleText: {
          ru: "Собрать обе руки в один спокойный ритм.",
          uk: "Зібрати обидві руки в один спокійний ритм.",
          kk: "Екі қолды бір тыныш ырғаққа келтіру.",
          de: "Beide Hände in einen ruhigen Rhythmus bringen.",
          en: "Bring both hands into one calm rhythm."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Ну вот! Обе руки начинают работать вместе. Дальше перенесём движение в более связную печать.",
          uk: "Ось так! Обидві руки починають працювати разом. Далі перенесемо рух у більш зв’язний набір.",
          kk: "Міне! Екі қол бірге жұмыс істей бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
          de: "So ist es gut! Beide Hände beginnen zusammenzuarbeiten. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
          en: "There we go! Both hands are starting to work together. Next, we move the movement into more connected typing."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson1_4: flyKeyLessonStoryboardEntry({
    introImage: "key-idea.webp",
    introTip: {
          ru: "Перед практикой проверь настройки аппликатуры: удобно ли пальцам, все ли зоны понятны, не приходится ли тянуться лишний раз.",
          uk: "Перед вправою перевірте аплікатуру: чи зручно пальцям, чи зрозумілі зони, чи не доводиться тягнутися зайвий раз.",
          kk: "Жаттығу алдында аппликатураны тексеріңіз: саусақтарға ыңғайлы ма, аймақтар түсінікті ме, артық созылу жоқ па.",
          de: "Prüfe vor der Übung kurz die Fingerzuordnung: Fühlen sich die Finger wohl, sind alle Zonen klar, musst du dich irgendwo unnötig strecken?",
          en: "Before practicing, check your fingering settings: do your fingers feel comfortable, are the zones clear, and are you avoiding unnecessary reaching?"
        },
    nextModuleText: {
          ru: "Перенести домашний ряд в короткие слова.",
          uk: "Перенести домашній ряд у короткі слова.",
          kk: "Негізгі қатарды қысқа сөздерге көшіру.",
          de: "Die Grundreihe in kurze Wörter übertragen.",
          en: "Move the home row into short words."
        },
    completionImage: "key-score-ten.png",
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson1_5: flyKeyLessonStoryboardEntry({
    introImage: "key-arms-crossed.webp",
    introTip: {
          ru: "На тесте ассистенты отключаются, чтобы твои пальцы начали работать самостоятельно — не переживай, это не экзамен, а просто проверка того, что навык уже начинает закрепляться.",
          uk: "У тесті підказки вимикаються, щоб пальці спробували працювати самостійно. Це не іспит, а спокійна перевірка навички.",
          kk: "Тестте көмекшілер өшеді. Бұл емтихан емес, саусақтардың өз бетімен жұмыс істей бастағанын байқауға арналған тыныш тексеріс.",
          de: "Im Test werden die Assistenten ausgeschaltet, damit deine Finger selbstständig arbeiten können. Keine Sorge: Das ist keine Prüfung, sondern nur ein Check, ob sich die Fähigkeit schon festigt.",
          en: "In the test, assistants are turned off so your fingers can start working on their own. Do not worry: it is not an exam, just a check that the skill is beginning to settle."
        },
    nextModuleText: {
          ru: "Проверить, насколько уверенно держится база.",
          uk: "Перевірити, наскільки впевнено тримається база.",
          kk: "Негіздің қаншалықты сенімді бекігенін тексеру.",
          de: "Prüfen, wie stabil die Basis sitzt.",
          en: "Check how confidently the base holds."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Модуль «Домашний ряд» пройден. Можно идти дальше без ощущения, что база рассыпается.",
          uk: "Модуль «Домашній ряд» пройдено. Можна йти далі без відчуття, що база розсипається.",
          kk: "«Негізгі қатар» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
          de: "Das Modul „Grundreihe“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
          en: "The “Home Row” module is complete. You can move on without the base feeling fragile."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson2_1: flyKeyLessonStoryboardEntry({
    introImage: "key-idea.webp",
    introTip: {
          ru: "После каждого нажатия возвращай пальцы в «домик». Так они всегда знают, откуда стартовать к следующей букве.",
          uk: "Починайте повільно й уважно. Якщо пальці плутаються, зменште темп і поверніться до рівного ритму.",
          kk: "Баяу және мұқият бастаңыз. Саусақтар шатасса, темпті азайтып, бірқалыпты ырғаққа қайтыңыз.",
          de: "Bring deine Finger nach jedem Anschlag zurück ins Zuhause. So wissen sie immer, von wo aus sie zur nächsten Taste starten.",
          en: "Return your fingers to the home position after every keypress. That way they always know where to start for the next letter."
        },
    nextModuleText: {
          ru: "Освоить центральные движения левой руки.",
          uk: "Освоїти центральні рухи лівої руки.",
          kk: "Сол қолдың орталық қимылдарын меңгеру.",
          de: "Zentrale Bewegungen der linken Hand üben.",
          en: "Learn the left-hand center movements."
        },
    completionImage: "key-celebrate.png",
    completionText: {
          ru: "Шаг «Центр слева» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
          uk: "Крок «Центр ліворуч» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
          kk: "«Орталық сол жақ» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
          de: "Der Schritt „Zentrum links“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
          en: "The “Left Center” step is complete. The movement is clearer now; keep the pace calm and move on."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson2_2: flyKeyLessonStoryboardEntry({
    introImage: "key-explain.webp",
    introTip: {
          ru: "Не смотри на клавиатуру! Настоящая скорость появляется тогда, когда пальцы сами находят дорогу.",
          uk: "Не дивіться на клавіатуру довше, ніж потрібно. Краще одна спокійна пауза, ніж серія випадкових натискань.",
          kk: "Пернетақтаға қажеттен артық қарамаңыз. Бір тыныш кідіріс бірнеше кездейсоқ басудан жақсы.",
          de: "Schau nicht auf die Tastatur! Echte Geschwindigkeit entsteht, wenn die Finger den Weg selbst finden.",
          en: "Do not look at the keyboard! Real speed appears when your fingers find the way on their own."
        },
    nextModuleText: {
          ru: "Освоить центральные движения правой руки.",
          uk: "Освоїти центральні рухи правої руки.",
          kk: "Оң қолдың орталық қимылдарын меңгеру.",
          de: "Zentrale Bewegungen der rechten Hand üben.",
          en: "Learn the right-hand center movements."
        },
    completionImage: "key-celebrate.png",
    completionText: {
          ru: "Раздел «Центр справа» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
          uk: "Розділ «Центр праворуч» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
          kk: "«Орталық оң жақ» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
          de: "Der Abschnitt „Zentrum rechts“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
          en: "The “Right Center” section is connected without extra rushing. Keep the home position steady and continue."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson2_3: flyKeyLessonStoryboardEntry({
    introImage: "key-point-strict.webp",
    introTip: {
          ru: "Нажал — сразу отпустил. Короткий отскок помогает держать ритм и не уставать.",
          uk: "Після кожного переходу повертайте пальці до домашнього ряду. Це ваша опорна точка.",
          kk: "Әр ауысудан кейін саусақтарды негізгі қатарға қайтарыңыз. Бұл сіздің тірек нүктеңіз.",
          de: "Drücken - sofort loslassen. Ein kurzer Rücksprung hilft dir, den Rhythmus zu halten und nicht so schnell müde zu werden.",
          en: "Press, then release right away. A quick rebound helps keep the rhythm steady and prevents fatigue."
        },
    nextModuleText: {
          ru: "Добавить первые переходы к нижнему ряду.",
          uk: "Додати перші переходи до нижнього ряду.",
          kk: "Төменгі қатарға алғашқы ауысуларды қосу.",
          de: "Erste Wege zur unteren Reihe hinzufügen.",
          en: "Add the first moves to the bottom row."
        },
    completionImage: "key-completion.webp",
    completionText: {
          ru: "Блок «Нижний ряд» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
          uk: "Блок «Нижній ряд» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
          kk: "«Төменгі қатар» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
          de: "Der Block „Untere Reihe“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
          en: "The “Bottom Row” block is becoming one connected skill. Next, we move it into more fluent typing."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson2_4: flyKeyLessonStoryboardEntry({
    introImage: "key-confident.webp",
    introTip: {
          ru: "Сначала добейся точности, а уже потом ускоряйся. Быстрая печать с ошибками только закрепляет плохую привычку.",
          uk: "У словах важливо не лише натиснути правильні клавіші, а й не втратити плавність між ними.",
          kk: "Сөздерде дұрыс пернені табу ғана емес, қозғалыстың жұмсақ байланысы да маңызды.",
          de: "Arbeite zuerst an der Genauigkeit und werde erst danach schneller. Schnelles Tippen mit Fehlern festigt nur schlechte Gewohnheiten.",
          en: "Build accuracy first, then speed up. Fast typing with mistakes only reinforces a bad habit."
        },
    nextModuleText: {
          ru: "Собрать новые клавиши в короткие слова.",
          uk: "Зібрати нові клавіші в короткі слова.",
          kk: "Жаңа пернелерді қысқа сөздерге жинау.",
          de: "Neue Tasten in kurze Wörter bringen.",
          en: "Turn the new keys into short words."
        },
    completionImage: "key-score-ten.png",
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson2_5: flyKeyLessonStoryboardEntry({
    introImage: "key-arms-crossed.webp",
    introTip: {
          ru: "Теперь без подсказок: пришло время проверить, насколько уверенно твои руки ориентируются на клавиатуре сами.",
          uk: "У тесті підказок менше, зате краще видно, що вже стало автоматичним. Дихайте рівно й не поспішайте.",
          kk: "Тестте көмек азаяды, бірақ дағдының қай бөлігі автоматқа айналғаны жақсы көрінеді.",
          de: "Jetzt ohne Hinweise: Es ist Zeit zu prüfen, wie sicher sich deine Hände schon selbst auf der Tastatur orientieren.",
          en: "Now without hints: it is time to check how confidently your hands can navigate the keyboard on their own."
        },
    nextModuleText: {
          ru: "Проверить центр клавиатуры без лишней спешки.",
          uk: "Перевірити центр клавіатури без зайвого поспіху.",
          kk: "Пернетақта ортасын артық асықпай тексеру.",
          de: "Das Tastaturzentrum ruhig prüfen.",
          en: "Check the keyboard center without rushing."
        },
    completionImage: "key-score-ten.png",
    completionText: {
          ru: "Модуль «Центр» пройден. Можно идти дальше без ощущения, что база рассыпается.",
          uk: "Модуль «Центр» пройдено. Можна йти далі без відчуття, що база розсипається.",
          kk: "«Орталық аймақ» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
          de: "Das Modul „Zentrum“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
          en: "The “Center” module is complete. You can move on without the base feeling fragile."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson3_1: flyKeyLessonStoryboardEntry({
    introImage: "key-explain.webp",
    introTip: {
          ru: "Клади руки так, чтобы пальцы были полусогнуты, будто под ними лежит маленькое яблоко. Это самая оптимальная поза, чтобы дотянуться до всех клавиш быстро и без усилий.",
          uk: "Починайте повільно й уважно. Якщо пальці плутаються, зменште темп і поверніться до рівного ритму.",
          kk: "Баяу және мұқият бастаңыз. Саусақтар шатасса, темпті азайтып, бірқалыпты ырғаққа қайтыңыз.",
          de: "Lege deine Hände so hin, dass die Finger leicht gebogen sind, als läge ein kleiner Apfel darunter. So erreichst du die Tasten schnell und ohne unnötige Anstrengung.",
          en: "Place your hands so your fingers are slightly curved, as if a small apple were resting underneath them. This helps you reach the keys quickly and without strain."
        },
    nextModuleText: {
          ru: "Научить левую руку подниматься вверх.",
          uk: "Навчити ліву руку підніматися вгору.",
          kk: "Сол қолды жоғары көтерілуге үйрету.",
          de: "Die linke Hand nach oben führen.",
          en: "Teach the left hand to move upward."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Шаг «Верх слева» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
          uk: "Крок «Верх ліворуч» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
          kk: "«Жоғары сол жақ» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
          de: "Der Schritt „Oben links“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
          en: "The “Top Left” step is complete. The movement is clearer now; keep the pace calm and move on."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson3_2: flyKeyLessonStoryboardEntry({
    introImage: "key-idea.webp",
    introTip: {
          ru: "Клавиатура не сопротивляется! Лёгкого касания вполне достаточно.",
          uk: "Не дивіться на клавіатуру довше, ніж потрібно. Краще одна спокійна пауза, ніж серія випадкових натискань.",
          kk: "Пернетақтаға қажеттен артық қарамаңыз. Бір тыныш кідіріс бірнеше кездейсоқ басудан жақсы.",
          de: "Die Tastatur wehrt sich nicht! Eine leichte Berührung reicht völlig aus.",
          en: "The keyboard is not fighting back! A light touch is more than enough."
        },
    nextModuleText: {
          ru: "Научить правую руку подниматься вверх.",
          uk: "Навчити праву руку підніматися вгору.",
          kk: "Оң қолды жоғары көтерілуге үйрету.",
          de: "Die rechte Hand nach oben führen.",
          en: "Teach the right hand to move upward."
        },
    completionImage: "key-completion.webp",
    completionText: {
          ru: "Раздел «Верх справа» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
          uk: "Розділ «Верх праворуч» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
          kk: "«Жоғары оң жақ» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
          de: "Der Abschnitt „Oben rechts“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
          en: "The “Top Right” section is connected without extra rushing. Keep the home position steady and continue."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson3_3: flyKeyLessonStoryboardEntry({
    introImage: "key-point-strict.webp",
    introTip: {
          ru: "Не поднимай пальцы высоко над клавиатурой. Чем короче путь до клавиши, тем быстрее и стабильнее получится печать.",
          uk: "Після кожного переходу повертайте пальці до домашнього ряду. Це ваша опорна точка.",
          kk: "Әр ауысудан кейін саусақтарды негізгі қатарға қайтарыңыз. Бұл сіздің тірек нүктеңіз.",
          de: "Hebe die Finger nicht hoch über die Tastatur. Je kürzer der Weg zur Taste, desto schneller und stabiler wird das Tippen.",
          en: "Do not lift your fingers high above the keyboard. The shorter the path to the key, the faster and steadier your typing becomes."
        },
    nextModuleText: {
          ru: "Собрать верхний ряд в цельную зону.",
          uk: "Зібрати верхній ряд у цілісну зону.",
          kk: "Жоғарғы қатарды тұтас аймаққа жинау.",
          de: "Die obere Reihe als ganze Zone festigen.",
          en: "Build the top row into one clear zone."
        },
    completionImage: "key-celebrate.png",
    completionText: {
          ru: "Блок «Верхний ряд» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
          uk: "Блок «Верхній ряд» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
          kk: "«Жоғарғы қатар» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
          de: "Der Block „Obere Reihe“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
          en: "The “Top Row” block is becoming one connected skill. Next, we move it into more fluent typing."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson3_4: flyKeyLessonStoryboardEntry({
    introImage: "key-thinking.webp",
    introTip: {
          ru: "Перед словами на верхнем ряду сохрани спокойный темп: лучше ровное движение без рывков, чем быстрый старт с лишним напряжением.",
          uk: "У словах важливо не лише натиснути правильні клавіші, а й не втратити плавність між ними.",
          kk: "Сөздерде дұрыс пернені табу ғана емес, қозғалыстың жұмсақ байланысы да маңызды.",
          de: "Behalte vor Wörtern auf der oberen Reihe ein ruhiges Tempo. Gleichmäßige Bewegung ohne Ruckeln ist besser als ein schneller Start mit zu viel Spannung.",
          en: "Keep a calm pace before words on the top row. Smooth movement without jerks is better than a fast start with extra tension."
        },
    nextModuleText: {
          ru: "Перенести верхний ряд в короткие слова.",
          uk: "Перенести верхній ряд у короткі слова.",
          kk: "Жоғарғы қатарды қысқа сөздерге көшіру.",
          de: "Die obere Reihe in kurze Wörter übertragen.",
          en: "Move the top row into short words."
        },
    completionImage: "key-completion.webp",
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson3_5: flyKeyLessonStoryboardEntry({
    introImage: "key-book.webp",
    introTip: {
          ru: "Не бойся ошибок в тесте — он нужен не для идеального результата, а чтобы мозг и пальцы научились работать без помощи ассистентов.",
          uk: "У тесті підказок менше, зате краще видно, що вже стало автоматичним. Дихайте рівно й не поспішайте.",
          kk: "Тестте көмек азаяды, бірақ дағдының қай бөлігі автоматқа айналғаны жақсы көрінеді.",
          de: "Hab keine Angst vor Fehlern im Test. Er ist nicht für ein perfektes Ergebnis da, sondern damit Gehirn und Finger lernen, ohne Assistenten zusammenzuarbeiten.",
          en: "Do not be afraid of mistakes in the test. It is not about a perfect score; it helps your brain and fingers learn to work without assistants."
        },
    nextModuleText: {
          ru: "Проверить верхний ряд в спокойном темпе.",
          uk: "Перевірити верхній ряд у спокійному темпі.",
          kk: "Жоғарғы қатарды тыныш қарқында тексеру.",
          de: "Die obere Reihe ruhig prüfen.",
          en: "Check the top row at a calm pace."
        },
    completionImage: "key-completion.webp",
    completionText: {
          ru: "Модуль «Верхний ряд» пройден. Можно идти дальше без ощущения, что база рассыпается.",
          uk: "Модуль «Верхній ряд» пройдено. Можна йти далі без відчуття, що база розсипається.",
          kk: "«Жоғарғы әріптер қатары» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
          de: "Das Modul „Obere Reihe“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
          en: "The “Top Row” module is complete. You can move on without the base feeling fragile."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson4_1: flyKeyLessonStoryboardEntry({
    introImage: "key-explain.webp",
    introTip: {
          ru: "Смотри только в экран, даже если очень хочется подсмотреть на клавиши. Именно так развивается мышечная память, которая и делает печать по-настоящему слепой.",
          uk: "Починайте повільно й уважно. Якщо пальці плутаються, зменште темп і поверніться до рівного ритму.",
          kk: "Баяу және мұқият бастаңыз. Саусақтар шатасса, темпті азайтып, бірқалыпты ырғаққа қайтыңыз.",
          de: "Schau nur auf den Bildschirm, auch wenn du gern auf die Tasten schauen würdest. Genau so entsteht Muskelgedächtnis, und daraus wird echtes Blindtippen.",
          en: "Keep your eyes on the screen, even if you really want to peek at the keys. This is how muscle memory grows and turns typing into true touch typing."
        },
    nextModuleText: {
          ru: "Научить левую руку уходить вниз.",
          uk: "Навчити ліву руку рухатися вниз.",
          kk: "Сол қолды төмен түсуге үйрету.",
          de: "Die linke Hand nach unten führen.",
          en: "Teach the left hand to move downward."
        },
    completionImage: "key-score-ten.png",
    completionText: {
          ru: "Шаг «Низ слева» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
          uk: "Крок «Низ ліворуч» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
          kk: "«Төмен сол жақ» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
          de: "Der Schritt „Unten links“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
          en: "The “Bottom Left” step is complete. The movement is clearer now; keep the pace calm and move on."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson4_2: flyKeyLessonStoryboardEntry({
    introImage: "key-idea.webp",
    introTip: {
          ru: "Нажимай пробел противоположным большим пальцем: если последнюю букву нажала правая рука — пробел нажимает левый большой палец, и наоборот. Так руки работают по очереди, движения становятся плавнее, а пальцы не мешают друг другу во время быстрого набора.",
          uk: "Не дивіться на клавіатуру довше, ніж потрібно. Краще одна спокійна пауза, ніж серія випадкових натискань.",
          kk: "Пернетақтаға қажеттен артық қарамаңыз. Бір тыныш кідіріс бірнеше кездейсоқ басудан жақсы.",
          de: "Drücke die Leertaste mit dem gegenüberliegenden Daumen: Wenn der letzte Buchstabe mit der rechten Hand kam, drückt der linke Daumen die Leertaste, und umgekehrt. So arbeiten die Hände abwechselnd, die Bewegungen werden flüssiger, und die Finger kommen sich beim schnellen Tippen nicht in die Quere.",
          en: "Press Space with the opposite thumb: if the last letter was typed with the right hand, use the left thumb for Space, and the other way around. This lets the hands alternate, makes movement smoother, and keeps the fingers from getting in each other's way."
        },
    nextModuleText: {
          ru: "Научить правую руку уходить вниз.",
          uk: "Навчити праву руку рухатися вниз.",
          kk: "Оң қолды төмен түсуге үйрету.",
          de: "Die rechte Hand nach unten führen.",
          en: "Teach the right hand to move downward."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Раздел «Низ справа» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
          uk: "Розділ «Низ праворуч» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
          kk: "«Төмен оң жақ» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
          de: "Der Abschnitt „Unten rechts“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
          en: "The “Bottom Right” section is connected without extra rushing. Keep the home position steady and continue."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson4_3: flyKeyLessonStoryboardEntry({
    introImage: "key-point-strict.webp",
    introTip: {
          ru: "Не тянись к клавишам всей рукой. В хорошей технике двигаются в основном пальцы, а кисть остаётся почти на месте.",
          uk: "Після кожного переходу повертайте пальці до домашнього ряду. Це ваша опорна точка.",
          kk: "Әр ауысудан кейін саусақтарды негізгі қатарға қайтарыңыз. Бұл сіздің тірек нүктеңіз.",
          de: "Greif nicht mit der ganzen Hand nach den Tasten. Bei guter Technik bewegen sich vor allem die Finger, während die Hand fast an Ort und Stelle bleibt.",
          en: "Do not reach for keys with your whole hand. In good technique, the fingers do most of the movement while the hand stays almost in place."
        },
    nextModuleText: {
          ru: "Собрать нижний ряд в устойчивую зону.",
          uk: "Зібрати нижній ряд у стійку зону.",
          kk: "Төменгі қатарды тұрақты аймаққа жинау.",
          de: "Die untere Reihe stabilisieren.",
          en: "Build the bottom row into a stable zone."
        },
    completionImage: "key-celebrate.png",
    completionText: {
          ru: "Блок «Нижний ряд» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
          uk: "Блок «Нижній ряд» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
          kk: "«Төменгі қатар» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
          de: "Der Block „Untere Reihe“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
          en: "The “Bottom Row” block is becoming one connected skill. Next, we move it into more fluent typing."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson4_4: flyKeyLessonStoryboardEntry({
    introImage: "key-thinking.webp",
    introTip: {
          ru: "Проверим ещё раз настройку аппликатуры? Ты оптимально используешь пальцы? Тебе удобно?",
          uk: "У словах важливо не лише натиснути правильні клавіші, а й не втратити плавність між ними.",
          kk: "Сөздерде дұрыс пернені табу ғана емес, қозғалыстың жұмсақ байланысы да маңызды.",
          de: "Wollen wir die Fingerzuordnung noch einmal prüfen? Nutzt du deine Finger optimal? Fühlt es sich bequem an?",
          en: "Shall we check the fingering setup again? Are you using your fingers well? Does it feel comfortable?"
        },
    nextModuleText: {
          ru: "Использовать нижний ряд в коротких словах.",
          uk: "Використати нижній ряд у коротких словах.",
          kk: "Төменгі қатарды қысқа сөздерде қолдану.",
          de: "Die untere Reihe in kurzen Wörtern nutzen.",
          en: "Use the bottom row in short words."
        },
    completionImage: "key-celebrate.png",
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson4_5: flyKeyLessonStoryboardEntry({
    introImage: "key-arms-crossed.webp",
    introTip: {
          ru: "Ассистенты выключены специально: именно в такие моменты слепая печать начинает превращаться в настоящий навык.",
          uk: "У тесті підказок менше, зате краще видно, що вже стало автоматичним. Дихайте рівно й не поспішайте.",
          kk: "Тестте көмек азаяды, бірақ дағдының қай бөлігі автоматқа айналғаны жақсы көрінеді.",
          de: "Die Assistenten sind absichtlich ausgeschaltet: Genau in solchen Momenten wird Blindtippen zu einer echten Fähigkeit.",
          en: "The assistants are off on purpose: moments like this are where touch typing starts becoming a real skill."
        },
    nextModuleText: {
          ru: "Проверить нижний ряд и возврат домой.",
          uk: "Перевірити нижній ряд і повернення додому.",
          kk: "Төменгі қатарды және негізгі қатарға оралуды тексеру.",
          de: "Untere Reihe und Rückkehr prüfen.",
          en: "Check the bottom row and return home."
        },
    completionImage: "key-completion.webp",
    completionText: {
          ru: "Модуль «Нижний ряд» пройден. Можно идти дальше без ощущения, что база рассыпается.",
          uk: "Модуль «Нижній ряд» пройдено. Можна йти далі без відчуття, що база розсипається.",
          kk: "«Төменгі қатар» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
          de: "Das Modul „Untere Reihe“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
          en: "The “Bottom Row” module is complete. You can move on without the base feeling fragile."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson5_1: flyKeyLessonStoryboardEntry({
    introImage: "key-point-strict.webp",
    introTip: {
          ru: "Не поднимай всю руку при переходе между рядами. До верхних и нижних клавиш должны тянуться пальцы, а кисть оставаться почти на месте — так движения будут быстрее и точнее.",
          uk: "Починайте повільно й уважно. Якщо пальці плутаються, зменште темп і поверніться до рівного ритму.",
          kk: "Баяу және мұқият бастаңыз. Саусақтар шатасса, темпті азайтып, бірқалыпты ырғаққа қайтыңыз.",
          de: "Hebe beim Wechsel zwischen den Reihen nicht die ganze Hand. Zu den oberen und unteren Tasten sollen die Finger greifen, während die Hand fast ruhig bleibt - so werden die Bewegungen schneller und genauer.",
          en: "Do not lift your whole hand when moving between rows. Let the fingers reach the upper and lower keys while the hand stays almost still - the movement will be faster and more accurate."
        },
    nextModuleText: {
          ru: "Освоить вертикальные переходы слева.",
          uk: "Освоїти вертикальні переходи ліворуч.",
          kk: "Сол жақтағы тік ауысуларды меңгеру.",
          de: "Vertikale Wege links üben.",
          en: "Practice the left-side vertical paths."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Шаг «Вертикали слева» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
          uk: "Крок «Вертикалі ліворуч» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
          kk: "«Сол жақ тік бағыттар» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
          de: "Der Schritt „Vertikalen links“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
          en: "The “Left Verticals” step is complete. The movement is clearer now; keep the pace calm and move on."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson5_2: flyKeyLessonStoryboardEntry({
    introImage: "key-explain.webp",
    introTip: {
          ru: "После клавиши из верхнего или нижнего ряда сразу возвращай палец в базовую позицию. Это помогает не теряться на клавиатуре во время длинных слов и быстрых переходов.",
          uk: "Не дивіться на клавіатуру довше, ніж потрібно. Краще одна спокійна пауза, ніж серія випадкових натискань.",
          kk: "Пернетақтаға қажеттен артық қарамаңыз. Бір тыныш кідіріс бірнеше кездейсоқ басудан жақсы.",
          de: "Bring den Finger nach einer Taste aus der oberen oder unteren Reihe sofort zurück in die Grundposition. Das hilft dir, bei langen Wörtern und schnellen Wechseln nicht die Orientierung zu verlieren.",
          en: "After pressing a key from the upper or lower row, return the finger to the base position right away. This helps you stay oriented during long words and fast transitions."
        },
    nextModuleText: {
          ru: "Освоить вертикальные переходы справа.",
          uk: "Освоїти вертикальні переходи праворуч.",
          kk: "Оң жақтағы тік ауысуларды меңгеру.",
          de: "Vertikale Wege rechts üben.",
          en: "Practice the right-side vertical paths."
        },
    completionImage: "key-score-ten.png",
    completionText: {
          ru: "Раздел «Вертикали справа» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
          uk: "Розділ «Вертикалі праворуч» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
          kk: "«Оң жақ тік бағыттар» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
          de: "Der Abschnitt „Vertikalen rechts“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
          en: "The “Right Verticals” section is connected without extra rushing. Keep the home position steady and continue."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson5_3: flyKeyLessonStoryboardEntry({
    introImage: "key-stop.webp",
    introTip: {
          ru: "Нажимай Shift противоположной рукой от основной буквы. Например, для большой «T» используй правый Shift, а букву нажимай левой рукой — так руки не сталкиваются и печать остаётся плавной.",
          uk: "Shift натискає протилежна рука: для великої літери ліворуч допомагає правий Shift, для літери праворуч — лівий.",
          kk: "Shift пернесін қарсы қол басады: сол жақтағы бас әріпке оң Shift, оң жақтағы бас әріпке сол Shift көмектеседі.",
          de: "Drücke Shift mit der Hand gegenüber dem Buchstaben. Für ein großes T benutzt du zum Beispiel die rechte Shift-Taste und drückst den Buchstaben mit der linken Hand - so stoßen die Hände nicht zusammen und das Tippen bleibt flüssig.",
          en: "Press Shift with the hand opposite the main letter. For example, for a capital T, use the right Shift and press the letter with your left hand - this keeps the hands from colliding and typing stays smooth."
        },
    nextModuleText: {
          ru: "Добавить Shift без лишнего напряжения.",
          uk: "Додати Shift без зайвого напруження.",
          kk: "Shift пернесін артық күшсіз қосу.",
          de: "Shift ohne unnötige Spannung hinzufügen.",
          en: "Add Shift without extra tension."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Блок «Регистр» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
          uk: "Блок «Регістр» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
          kk: "«Бас әріптер» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
          de: "Der Block „Großschreibung“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
          en: "The “Case” block is becoming one connected skill. Next, we move it into more fluent typing."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson5_4: flyKeyLessonStoryboardEntry({
    introImage: "key-thinking.webp",
    introTip: {
          ru: "В словах с большим разбросом по рядам не спеши возвращать скорость любой ценой. Сначала держи короткие точные движения, а темп подтянется сам.",
          uk: "У словах важливо не лише натиснути правильні клавіші, а й не втратити плавність між ними.",
          kk: "Сөздерде дұрыс пернені табу ғана емес, қозғалыстың жұмсақ байланысы да маңызды.",
          de: "Bei Wörtern mit großen Sprüngen zwischen den Reihen solltest du die Geschwindigkeit nicht um jeden Preis zurückholen. Halte zuerst die Bewegungen kurz und genau; das Tempo kommt von selbst.",
          en: "With words that jump across rows, do not rush to regain speed at any cost. Keep the movements short and precise first; the pace will catch up on its own."
        },
    nextModuleText: {
          ru: "Связать дальние движения в слова.",
          uk: "Пов'язати далекі рухи у слова.",
          kk: "Алыс қимылдарды сөздерге байланыстыру.",
          de: "Weite Wege in Wörter verbinden.",
          en: "Connect longer reaches into words."
        },
    completionImage: "key-score-ten.png",
    completionText: {
          ru: "Практика «Слова-прыжки» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
          uk: "Практика «Слова-стрибки» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
          kk: "«Секірмелі сөздер» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
          de: "Die Übung „Sprungwörter“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
          en: "The “Jump Words” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson5_5: flyKeyLessonStoryboardEntry({
    introImage: "key-book.webp",
    introTip: {
          ru: "Если во время теста станет сложнее — это нормально. Значит пальцы учатся полагаться на мышечную память, а не на подсказки.",
          uk: "Це перший великий тест. Не женіться за швидкістю: рівний ритм і точність важливіші за поспіх.",
          kk: "Тестте көмек азаяды, бірақ дағдының қай бөлігі автоматқа айналғаны жақсы көрінеді.",
          de: "Wenn der Test schwieriger wird, ist das normal. Es bedeutet, dass deine Finger lernen, sich auf Muskelgedächtnis statt auf Hinweise zu verlassen.",
          en: "If the test starts feeling harder, that is normal. It means your fingers are learning to rely on muscle memory instead of hints."
        },
    nextModuleText: {
          ru: "Проверить первую большую часть навыка.",
          uk: "Перевірити першу велику частину навички.",
          kk: "Дағдының алғашқы үлкен бөлігін тексеру.",
          de: "Den ersten großen Lernblock prüfen.",
          en: "Check the first big skill block."
        },
    completionImage: "key-celebrate.png",
    completionText: {
          ru: "Большая проверка пройдена. Модуль «Вертикали и Shift» теперь держится как часть навыка, а не как отдельное упражнение.",
          uk: "Велику перевірку пройдено. Модуль «Вертикалі та Shift» тепер тримається як частина навички, а не як окрема вправа.",
          kk: "Үлкен тексеріс аяқталды. «Тік бағыттар және Shift» модулі енді жеке жаттығу емес, дағдының бір бөлігі болып тұр.",
          de: "Die große Prüfung ist geschafft. Das Modul „Vertikalen und Shift“ ist jetzt Teil der Fähigkeit und nicht nur eine einzelne Übung.",
          en: "The big check is complete. The “Verticals and Shift” module now feels like part of the skill, not just a separate exercise."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson6_1: flyKeyLessonStoryboardEntry({
    introImage: "key-point-strict.webp",
    introTip: {
          ru: "Не тянись к цифрам всей рукой. До верхнего ряда должны дотягиваться пальцы, а кисть оставаться в своей обычной позиции — так ты не потеряешь ориентацию после цифр.",
          uk: "Починайте повільно й уважно. Якщо пальці плутаються, зменште темп і поверніться до рівного ритму.",
          kk: "Қазақтың Ә, І, Ң, Ғ әріптері жоғарғы қатарда орналасады. Саусақ үй қатарынан көтеріліп, қайтадан орнына оралсын.",
          de: "Greif nicht mit der ganzen Hand zu den Zahlen. Die Finger sollen die obere Reihe erreichen, während die Hand in ihrer normalen Position bleibt - so verlierst du nach den Zahlen nicht die Orientierung.",
          en: "Do not reach for numbers with your whole hand. Your fingers should reach the top row while the hand stays in its usual position - that way you will not lose orientation after typing numbers."
        },
    nextModuleText: {
          ru: "Добавить левую часть верхнего ряда и цифр.",
          uk: "Додати ліву частину верхнього ряду й цифр.",
          kk: "Жоғарғы қатар мен сандардың сол бөлігін қосу.",
          de: "Linke obere Reihe und Zahlen hinzufügen.",
          en: "Add the left top row and numbers."
        },
    completionImage: "key-completion.webp",
    completionText: {
          ru: "Шаг «Левая сторона» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
          uk: "Крок «Ліва сторона» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
          kk: "«Ә, І, Ң, Ғ» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
          de: "Der Schritt „Linke Seite“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
          en: "The “Left Side” step is complete. The movement is clearer now; keep the pace calm and move on."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson6_2: flyKeyLessonStoryboardEntry({
    introImage: "key-idea.webp",
    introTip: {
          ru: "После нажатия цифры сразу возвращай палец в базу. Иначе руки начинают «уплывать» вверх, и следующие буквы становятся менее точными.",
          uk: "Не дивіться на клавіатуру довше, ніж потрібно. Краще одна спокійна пауза, ніж серія випадкових натискань.",
          kk: "Ү, Ұ, Қ, Ө, Һ әріптері де жоғарғы қатарда. Әріпке жеткен соң қолды төмен түсіріп, ырғақты сақтаңыз.",
          de: "Bring den Finger nach jeder Zahl sofort zurück in die Grundposition. Sonst wandern die Hände nach oben, und die nächsten Buchstaben werden ungenauer.",
          en: "Return the finger to base immediately after pressing a number. Otherwise the hands start drifting upward, and the next letters become less accurate."
        },
    nextModuleText: {
          ru: "Добавить правую часть верхнего ряда и цифр.",
          uk: "Додати праву частину верхнього ряду й цифр.",
          kk: "Жоғарғы қатар мен сандардың оң бөлігін қосу.",
          de: "Rechte obere Reihe und Zahlen hinzufügen.",
          en: "Add the right top row and numbers."
        },
    completionImage: "key-score-ten.png",
    completionText: {
          ru: "Раздел «Правая сторона» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
          uk: "Розділ «Права сторона» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
          kk: "«Ү, Ұ, Қ, Ө, Һ» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
          de: "Der Abschnitt „Rechte Seite“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
          en: "The “Right Side” section is connected without extra rushing. Keep the home position steady and continue."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson6_3: flyKeyLessonStoryboardEntry({
    introImage: "key-stop.webp",
    introTip: {
          ru: "Не смотри на цифровой ряд глазами. Цифры должны запоминаться как продолжение своих колонок, а не как отдельный мир над клавиатурой.",
          uk: "На цифровому ряду рука рухається трохи вище, але пальці все одно повертаються до домашнього ряду.",
          kk: "Бұл қатарда қазақ тіліне тән әріптер бірге қайталанады. Мақсат — олардың орнын бөлек-бөлек емес, тұтас аймақ ретінде сезіну.",
          de: "Schau nicht mit den Augen auf die Zahlenreihe. Die Zahlen sollen sich wie eine Fortsetzung der Finger-Spalten anfühlen, nicht wie eine eigene Welt über der Tastatur.",
          en: "Do not look at the number row. Numbers should be remembered as an extension of your finger columns, not as a separate world above the keyboard."
        },
    nextModuleText: {
          ru: "Собрать весь цифровой ряд в порядок.",
          uk: "Зібрати весь цифровий ряд у порядок.",
          kk: "Бүкіл сандық қатарды ретке келтіру.",
          de: "Die ganze Zahlenreihe ordnen.",
          en: "Bring the full number row into order."
        },
    completionImage: "key-score-ten.png",
    completionText: {
          ru: "Блок «Весь цифровой ряд» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
          uk: "Блок «Увесь цифровий ряд» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
          kk: "«Қазақ әріптері қатары» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
          de: "Der Block „Ganze Zahlenreihe“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
          en: "The “Full Number Row” block is becoming one connected skill. Next, we move it into more fluent typing."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson6_4: flyKeyLessonStoryboardEntry({
    introImage: "key-thinking.webp",
    introTip: {
          ru: "Когда в строке смешаны буквы и цифры, не меняй посадку рук. Нажал цифру, вернулся в базу, продолжил печатать буквы тем же спокойным ритмом.",
          uk: "Коли літери й цифри змішуються, не втрачайте ритм. Краще коротка пауза перед складним знаком, ніж випадкове натискання.",
          kk: "Қазақ әріптері сөз ішінде кездескенде асықпаңыз. Әр арнайы әріпке қысқа, анық қозғалыс жеткілікті.",
          de: "Wenn Buchstaben und Zahlen in einer Zeile gemischt sind, ändere die Handhaltung nicht. Zahl drücken, zurück in die Grundposition, dann die Buchstaben im selben ruhigen Rhythmus weiter tippen.",
          en: "When a line mixes letters and numbers, do not change your hand position. Press the number, return to base, and keep typing the letters in the same calm rhythm."
        },
    nextModuleText: {
          ru: "Смешать буквы и цифры без потери ритма.",
          uk: "Змішати літери й цифри без втрати ритму.",
          kk: "Әріптер мен сандарды ырғақты жоғалтпай араластыру.",
          de: "Buchstaben und Zahlen rhythmisch mischen.",
          en: "Mix letters and numbers without losing rhythm."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Практика «Смешанный ввод» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
          uk: "Практика «Змішане введення» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
          kk: "«Сөздер мен белгілер» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
          de: "Die Übung „Gemischte Eingabe“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
          en: "The “Mixed Input” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson6_5: flyKeyLessonStoryboardEntry({
    introImage: "key-arms-crossed.webp",
    introTip: {
          ru: "В тесте цифровой ряд проверяется вместе с буквами. Доверяй колонкам пальцев и возвращайся в базовую позицию после каждого подъёма вверх.",
          uk: "У тесті підказок менше, зате краще видно, що вже стало автоматичним. Дихайте рівно й не поспішайте.",
          kk: "Тестте жоғарғы қатардағы қазақ әріптері еркін араласады. Жылдамдық емес, дәлдік пен қалыпты ырғақ маңызды.",
          de: "Im Test wird die Zahlenreihe zusammen mit den Buchstaben geprüft. Vertraue den Finger-Spalten und kehre nach jedem Griff nach oben in die Grundposition zurück.",
          en: "In the test, the number row is checked together with letters. Trust your finger columns and return to the base position after every reach upward."
        },
    nextModuleText: {
          ru: "Проверить цифры вместе с буквами.",
          uk: "Перевірити цифри разом із літерами.",
          kk: "Сандарды әріптермен бірге тексеру.",
          de: "Zahlen zusammen mit Buchstaben prüfen.",
          en: "Check numbers together with letters."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Модуль «Верхний ряд + Цифры» пройден. Можно идти дальше без ощущения, что база рассыпается.",
          uk: "Модуль «Верхній ряд + цифри» пройдено. Можна йти далі без відчуття, що база розсипається.",
          kk: "«Қазақ әріптері бар жоғарғы қатар» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
          de: "Das Modul „Obere Reihe + Zahlen“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
          en: "The “Top Row + Numbers” module is complete. You can move on without the base feeling fragile."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson7_1: flyKeyLessonStoryboardEntry({
    introImage: "key-explain.webp",
    introTip: {
          ru: "Учись воспринимать знак вместе со словом, а не как отдельное действие. Тогда пальцы начинают печатать фразы плавно, без остановок перед запятыми и точками.",
          uk: "Знаки пунктуації теж мають свою аплікатуру. Натискайте їх так само уважно, як літери.",
          kk: "Тыныс белгілерінің де өз орны бар. Оларды әріптер сияқты дәл және сабырмен басыңыз.",
          de: "Lerne, ein Zeichen zusammen mit dem Wort wahrzunehmen, nicht als eigene Aktion. Dann beginnen die Finger, Sätze flüssig zu tippen, ohne vor Kommas oder Punkten anzuhalten.",
          en: "Learn to treat a punctuation mark as part of the word, not as a separate action. Then your fingers start typing phrases smoothly, without stopping before commas and periods."
        },
    nextModuleText: {
          ru: "Добавить точку и запятую в привычный ритм.",
          uk: "Додати крапку й кому у звичний ритм.",
          kk: "Нүкте мен үтірді үйреншікті ырғаққа қосу.",
          de: "Punkt und Komma in den Rhythmus bringen.",
          en: "Add period and comma to the rhythm."
        },
    completionImage: "key-celebrate.png",
    completionText: {
          ru: "Шаг «Точка и запятая» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
          uk: "Крок «Крапка й кома» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
          kk: "«Нүкте мен үтір» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
          de: "Der Schritt „Punkt und Komma“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
          en: "The “Period and Comma” step is complete. The movement is clearer now; keep the pace calm and move on."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson7_2: flyKeyLessonStoryboardEntry({
    introImage: "key-stop.webp",
    introTip: {
          ru: "На символах с Shift не зажимай обе руки. Одна рука держит Shift, а другая свободно нажимает знак — так движения остаются быстрыми и чистыми.",
          uk: "Для знаків із Shift спочатку відчуйте пару клавіш, а вже потім поступово додавайте темп.",
          kk: "Shift арқылы терілетін белгілерде алдымен пернелер жұбын сезініп алыңыз, содан кейін ғана темп қосыңыз.",
          de: "Bei Zeichen mit Shift solltest du nicht beide Hände verkrampfen. Eine Hand hält Shift, die andere drückt das Zeichen frei - so bleiben die Bewegungen schnell und sauber.",
          en: "For symbols that use Shift, do not tense both hands. One hand holds Shift while the other freely presses the symbol - this keeps movement quick and clean."
        },
    nextModuleText: {
          ru: "Освоить вопрос и восклицание с Shift.",
          uk: "Освоїти питання й оклик із Shift.",
          kk: "Сұрақ пен леп белгілерін Shift арқылы меңгеру.",
          de: "Frage und Ausruf mit Shift üben.",
          en: "Practice question and exclamation with Shift."
        },
    completionImage: "key-completion.webp",
    completionText: {
          ru: "Раздел «Вопрос и восклицание» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
          uk: "Розділ «Питання й оклик» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
          kk: "«Сұрақ пен леп белгісі» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
          de: "Der Abschnitt „Frage und Ausruf“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
          en: "The “Question and Exclamation” section is connected without extra rushing. Keep the home position steady and continue."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson7_3: flyKeyLessonStoryboardEntry({
    introImage: "key-point-strict.webp",
    introTip: {
          ru: "Никогда не нажимай Shift и основную клавишу одной рукой. Если символ печатается правой рукой — Shift держит левая, и наоборот. Так пальцы не мешают друг другу, а движения остаются быстрыми и естественными.",
          uk: "Тире, двокрапка й лапки часто збивають ритм. Дайте пальцям час запам'ятати ці переходи.",
          kk: "Сызықша, қос нүкте және тырнақша ырғақты оңай бұзады. Саусақтарға осы өтулерді жаттап алуға уақыт беріңіз.",
          de: "Drücke Shift und die Haupttaste nie mit derselben Hand. Wenn das Zeichen mit der rechten Hand getippt wird, hält die linke Shift, und umgekehrt. So kommen sich die Finger nicht in die Quere und die Bewegungen bleiben schnell und natürlich.",
          en: "Never press Shift and the main key with the same hand. If the symbol is typed with the right hand, the left hand holds Shift, and vice versa. This keeps the fingers out of each other's way and the movement natural."
        },
    nextModuleText: {
          ru: "Разобрать сложные знаки без остановок.",
          uk: "Розібрати складні знаки без зупинок.",
          kk: "Күрделі белгілерді тоқтамай меңгеру.",
          de: "Schwierige Zeichen ohne Stopps üben.",
          en: "Handle complex signs without stopping."
        },
    completionImage: "key-completion.webp",
    completionText: {
          ru: "Блок «Тире, двоеточие, кавычки» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
          uk: "Блок «Тире, двокрапка, лапки» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
          kk: "«Сызықша, қос нүкте, тырнақша» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
          de: "Der Block „Strich, Doppelpunkt, Anführungszeichen“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
          en: "The “Dash, Colon, Quotes” block is becoming one connected skill. Next, we move it into more fluent typing."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson7_4: flyKeyLessonStoryboardEntry({
    introImage: "key-thinking.webp",
    introTip: {
          ru: "Не ускоряйся на пунктуации сильнее, чем на буквах. Большинство ошибок появляется именно в момент перехода к знакам.",
          uk: "У фразах важливо читати на один-два символи вперед, щоб пальці не чекали кожної наступної підказки.",
          kk: "Фразада бір-екі таңбаны алдын ала оқыңыз. Сонда саусақтар әр келесі белгіге тоқтап қалмайды.",
          de: "Werde bei Satzzeichen nicht schneller als bei Buchstaben. Die meisten Fehler entstehen genau beim Wechsel zu den Zeichen.",
          en: "Do not speed up on punctuation more than on letters. Most mistakes happen right at the transition to symbols."
        },
    nextModuleText: {
          ru: "Печатать фразы со знаками плавнее.",
          uk: "Друкувати фрази зі знаками плавніше.",
          kk: "Белгілері бар тіркестерді жұмсағырақ теру.",
          de: "Sätze mit Zeichen flüssiger tippen.",
          en: "Type signed phrases more smoothly."
        },
    completionImage: "key-score-ten.png",
    completionText: {
          ru: "Практика «Фразы со знаками» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
          uk: "Практика «Фрази зі знаками» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
          kk: "«Белгілері бар фразалар» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
          de: "Die Übung „Sätze mit Zeichen“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
          en: "The “Phrases with Signs” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson7_5: flyKeyLessonStoryboardEntry({
    introImage: "key-point-strict.webp",
    introTip: {
          ru: "Этот тест нужен не для давления, а чтобы закрепить навык в условиях, близких к реальной печати.",
          uk: "У тесті підказок менше, зате краще видно, що вже стало автоматичним. Дихайте рівно й не поспішайте.",
          kk: "Тестте көмек азаяды, бірақ дағдының қай бөлігі автоматқа айналғаны жақсы көрінеді.",
          de: "Dieser Test soll keinen Druck machen. Er festigt die Fähigkeit unter Bedingungen, die dem echten Tippen näherkommen.",
          en: "This test is not about pressure. It helps lock in the skill under conditions closer to real typing."
        },
    nextModuleText: {
          ru: "Проверить пунктуацию в живых фразах.",
          uk: "Перевірити пунктуацію в живих фразах.",
          kk: "Тірі тіркестердегі тыныс белгілерін тексеру.",
          de: "Zeichensetzung in echten Sätzen prüfen.",
          en: "Check punctuation in real phrases."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Модуль «Пунктуация» пройден. Можно идти дальше без ощущения, что база рассыпается.",
          uk: "Модуль «Пунктуація» пройдено. Можна йти далі без відчуття, що база розсипається.",
          kk: "«Тыныс белгілері» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
          de: "Das Modul „Zeichensetzung“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
          en: "The “Punctuation” module is complete. You can move on without the base feeling fragile."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson8_1: flyKeyLessonStoryboardEntry({
    introImage: "key-idea.webp",
    introTip: {
          ru: "Старайся попадать в ритм метронома, а не обгонять его. Ровный темп развивает стабильную технику намного лучше, чем случайные ускорения.",
          uk: "Починайте повільно й уважно. Якщо пальці плутаються, зменште темп і поверніться до рівного ритму.",
          kk: "Баяу және мұқият бастаңыз. Саусақтар шатасса, темпті азайтып, бірқалыпты ырғаққа қайтыңыз.",
          de: "Versuche, den Rhythmus des Metronoms zu treffen, statt ihm vorauszueilen. Ein gleichmäßiges Tempo entwickelt eine stabile Technik viel besser als zufällige Beschleunigungen.",
          en: "Try to match the metronome instead of outrunning it. A steady pace builds stable technique much better than random bursts of speed."
        },
    nextModuleText: {
          ru: "Отработать частые сочетания левой руки.",
          uk: "Відпрацювати часті поєднання лівої руки.",
          kk: "Сол қолдың жиі тіркестерін жаттықтыру.",
          de: "Häufige Kombinationen links üben.",
          en: "Practice frequent left-hand patterns."
        },
    completionImage: "key-celebrate.png",
    completionText: {
          ru: "Шаг «Левая рука» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
          uk: "Крок «Ліва рука» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
          kk: "«Сол қол» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
          de: "Der Schritt „Linke Hand“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
          en: "The “Left Hand” step is complete. The movement is clearer now; keep the pace calm and move on."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson8_2: flyKeyLessonStoryboardEntry({
    introImage: "key-explain.webp",
    introTip: {
          ru: "Во время ритмической печати слушай метроном, а не звук клавиатуры. Главная задача — синхронизировать движения рук с постоянным темпом.",
          uk: "Не дивіться на клавіатуру довше, ніж потрібно. Краще одна спокійна пауза, ніж серія випадкових натискань.",
          kk: "Пернетақтаға қажеттен артық қарамаңыз. Бір тыныш кідіріс бірнеше кездейсоқ басудан жақсы.",
          de: "Hör beim rhythmischen Tippen auf das Metronom, nicht auf den Klang der Tastatur. Die Hauptaufgabe ist, die Handbewegungen mit einem konstanten Tempo zu synchronisieren.",
          en: "While typing rhythmically, listen to the metronome, not the sound of the keyboard. The main goal is to synchronize your hand movements with a steady tempo."
        },
    nextModuleText: {
          ru: "Отработать частые сочетания правой руки.",
          uk: "Відпрацювати часті поєднання правої руки.",
          kk: "Оң қолдың жиі тіркестерін жаттықтыру.",
          de: "Häufige Kombinationen rechts üben.",
          en: "Practice frequent right-hand patterns."
        },
    completionImage: "key-celebrate.png",
    completionText: {
          ru: "Раздел «Правая рука» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
          uk: "Розділ «Права рука» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
          kk: "«Оң қол» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
          de: "Der Abschnitt „Rechte Hand“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
          en: "The “Right Hand” section is connected without extra rushing. Keep the home position steady and continue."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson8_3: flyKeyLessonStoryboardEntry({
    introImage: "key-thinking.webp",
    introTip: {
          ru: "Работа с метрономом учит печатать в стабильном ритме, а не случайными рывками. Без ритма пальцы часто начинают то ускоряться, то тормозить, из-за чего растёт количество ошибок и быстрее появляется усталость.",
          uk: "Після кожного переходу повертайте пальці до домашнього ряду. Це ваша опорна точка.",
          kk: "Әр ауысудан кейін саусақтарды негізгі қатарға қайтарыңыз. Бұл сіздің тірек нүктеңіз.",
          de: "Die Arbeit mit dem Metronom lehrt dich, in einem stabilen Rhythmus zu tippen statt in zufälligen Schüben. Ohne Rhythmus werden die Finger oft schneller und langsamer, wodurch mehr Fehler entstehen und die Ermüdung schneller kommt.",
          en: "Working with the metronome teaches you to type in a stable rhythm, not in random bursts. Without rhythm, fingers often speed up and slow down, causing more mistakes and faster fatigue."
        },
    nextModuleText: {
          ru: "Смешать частые сочетания обеих рук.",
          uk: "Змішати часті поєднання обох рук.",
          kk: "Екі қолдың жиі тіркестерін араластыру.",
          de: "Häufige Kombinationen beider Hände mischen.",
          en: "Mix frequent patterns from both hands."
        },
    completionImage: "key-completion.webp",
    completionText: {
          ru: "Блок «Смешанные сочетания» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
          uk: "Блок «Змішані поєднання» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
          kk: "«Аралас тіркестер» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
          de: "Der Block „Gemischte Kombinationen“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
          en: "The “Mixed Patterns” block is becoming one connected skill. Next, we move it into more fluent typing."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson8_4: flyKeyLessonStoryboardEntry({
    introImage: "key-confident.webp",
    introTip: {
          ru: "На длинной практике держи один спокойный темп от строки к строке. Выносливость появляется тогда, когда движения остаются одинаково точными даже после усталости.",
          uk: "Витривалість — це не марафон на швидкість. Тримайте рівний темп і розслаблені плечі.",
          kk: "Төзімділік — жылдамдық жарысы емес. Иық бос, тыныс бірқалыпты, теру ырғағы тұрақты болсын.",
          de: "Halte in langen Übungen von Zeile zu Zeile ein ruhiges Tempo. Ausdauer entsteht, wenn die Bewegungen auch bei Müdigkeit gleich genau bleiben.",
          en: "During long practice, keep one calm tempo from line to line. Endurance appears when movements stay equally precise even after fatigue sets in."
        },
    nextModuleText: {
          ru: "Нарастить выносливость без гонки.",
          uk: "Наростити витривалість без гонитви.",
          kk: "Жарыспай төзімділікті арттыру.",
          de: "Ausdauer ohne Hetze aufbauen.",
          en: "Build endurance without racing."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Практика «Практика на выносливость» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
          uk: "Практика «Практика на витривалість» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
          kk: "«Төзімділік жаттығуы» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
          de: "Die Übung „Ausdauerübung“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
          en: "The “Endurance Practice” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson8_5: flyKeyLessonStoryboardEntry({
    introImage: "key-confident.webp",
    introTip: {
          ru: "Отключённые ассистенты помогают понять, какие движения уже стали автоматическими, а какие ещё требуют тренировки.",
          uk: "Метроном допомагає почути ритм. Якщо збилися, поверніться до спокійного набору, а не прискорюйтесь навмання.",
          kk: "Тестте көмек азаяды, бірақ дағдының қай бөлігі автоматқа айналғаны жақсы көрінеді.",
          de: "Ausgeschaltete Assistenten helfen dir zu erkennen, welche Bewegungen schon automatisch laufen und welche noch Training brauchen.",
          en: "Turned-off assistants help you see which movements have become automatic and which still need practice."
        },
    nextModuleText: {
          ru: "Проверить частые сочетания и устойчивость.",
          uk: "Перевірити часті поєднання й стійкість.",
          kk: "Жиі тіркестер мен тұрақтылықты тексеру.",
          de: "Kombinationen und Stabilität prüfen.",
          en: "Check frequent patterns and stability."
        },
    completionImage: "key-score-ten.png",
    completionText: {
          ru: "Модуль «Частотные сочетания» пройден. Можно идти дальше без ощущения, что база рассыпается.",
          uk: "Модуль «Частотні поєднання» пройдено. Можна йти далі без відчуття, що база розсипається.",
          kk: "«Жиі кездесетін тіркестер» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
          de: "Das Modul „Häufige Kombinationen“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
          en: "The “Frequent Patterns” module is complete. You can move on without the base feeling fragile."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson9_1: flyKeyLessonStoryboardEntry({
    introImage: "key-point-strict.webp",
    introTip: {
          ru: "В сочетаниях с заглавными буквами заранее готовь противоположный Shift, но не зажимай его дольше нужного. Ритм должен оставаться таким же ровным, как в обычных сочетаниях.",
          uk: "Починайте повільно й уважно. Якщо пальці плутаються, зменште темп і поверніться до рівного ритму.",
          kk: "Баяу және мұқият бастаңыз. Саусақтар шатасса, темпті азайтып, бірқалыпты ырғаққа қайтыңыз.",
          de: "Bereite bei Kombinationen mit Großbuchstaben die gegenüberliegende Shift-Taste früh vor, halte sie aber nicht länger als nötig. Der Rhythmus soll genauso gleichmäßig bleiben wie bei normalen Kombinationen.",
          en: "For combinations with capital letters, prepare the opposite Shift in advance, but do not hold it longer than needed. The rhythm should stay as even as in normal combinations."
        },
    nextModuleText: {
          ru: "Добавить Shift к левой руке.",
          uk: "Додати Shift до лівої руки.",
          kk: "Shift пернесін сол қолға қосу.",
          de: "Shift zur linken Hand hinzufügen.",
          en: "Add Shift to the left hand."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Шаг «Левая рука» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
          uk: "Крок «Ліва рука» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
          kk: "«Сол қол» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
          de: "Der Schritt „Linke Hand“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
          en: "The “Left Hand” step is complete. The movement is clearer now; keep the pace calm and move on."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson9_2: flyKeyLessonStoryboardEntry({
    introImage: "key-explain.webp",
    introTip: {
          ru: "Не позволяй Shift ломать метроном. Сначала попади в темп и только потом аккуратно добавляй регистр.",
          uk: "Не дивіться на клавіатуру довше, ніж потрібно. Краще одна спокійна пауза, ніж серія випадкових натискань.",
          kk: "Пернетақтаға қажеттен артық қарамаңыз. Бір тыныш кідіріс бірнеше кездейсоқ басудан жақсы.",
          de: "Lass Shift das Metronom nicht brechen. Triff zuerst den Takt und füge dann vorsichtig die Großschreibung hinzu.",
          en: "Do not let Shift break the metronome. First land on the beat, then carefully add capitalization."
        },
    nextModuleText: {
          ru: "Добавить Shift к правой руке.",
          uk: "Додати Shift до правої руки.",
          kk: "Shift пернесін оң қолға қосу.",
          de: "Shift zur rechten Hand hinzufügen.",
          en: "Add Shift to the right hand."
        },
    completionImage: "key-completion.webp",
    completionText: {
          ru: "Раздел «Правая рука» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
          uk: "Розділ «Права рука» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
          kk: "«Оң қол» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
          de: "Der Abschnitt „Rechte Hand“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
          en: "The “Right Hand” section is connected without extra rushing. Keep the home position steady and continue."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson9_3: flyKeyLessonStoryboardEntry({
    introImage: "key-stop.webp",
    introTip: {
          ru: "Когда работают обе руки, думай не о каждой клавише отдельно, а о коротком движении целиком: сочетание, возврат в базу, следующий удар метронома.",
          uk: "Після кожного переходу повертайте пальці до домашнього ряду. Це ваша опорна точка.",
          kk: "Әр ауысудан кейін саусақтарды негізгі қатарға қайтарыңыз. Бұл сіздің тірек нүктеңіз.",
          de: "Wenn beide Hände arbeiten, denke nicht an jede Taste einzeln, sondern an die kurze Bewegung als Ganzes: Kombination, zurück in die Grundposition, nächster Metronomschlag.",
          en: "When both hands are working, do not think about each key separately. Think of the whole short movement: combination, return to base, next metronome beat."
        },
    nextModuleText: {
          ru: "Смешать Shift и частые сочетания.",
          uk: "Змішати Shift і часті поєднання.",
          kk: "Shift пен жиі тіркестерді араластыру.",
          de: "Shift und häufige Kombinationen mischen.",
          en: "Mix Shift with frequent patterns."
        },
    completionImage: "key-celebrate.png",
    completionText: {
          ru: "Блок «Смешанные сочетания» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
          uk: "Блок «Змішані поєднання» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
          kk: "«Аралас тіркестер» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
          de: "Der Block „Gemischte Kombinationen“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
          en: "The “Mixed Patterns” block is becoming one connected skill. Next, we move it into more fluent typing."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson9_4: flyKeyLessonStoryboardEntry({
    introImage: "key-thinking.webp",
    introTip: {
          ru: "На длинной практике с Shift береги руки: короткое нажатие, короткий отпуск, спокойный возврат. Так заглавные не превращаются в лишнее напряжение.",
          uk: "Великі літери додають навантаження. Стежте, щоб Shift не ламав поставу кистей.",
          kk: "Сөздерде дұрыс пернені табу ғана емес, қозғалыстың жұмсақ байланысы да маңызды.",
          de: "Schone deine Hände in langen Übungen mit Shift: kurz drücken, kurz loslassen, ruhig zurückkehren. So werden Großbuchstaben nicht zu zusätzlicher Spannung.",
          en: "In long Shift practice, protect your hands: short press, quick release, calm return. That keeps capitals from turning into extra tension."
        },
    nextModuleText: {
          ru: "Удержать ритм на длинных строках.",
          uk: "Утримати ритм на довгих рядках.",
          kk: "Ұзын жолдарда ырғақты сақтау.",
          de: "Rhythmus in langen Zeilen halten.",
          en: "Hold rhythm through longer lines."
        },
    completionImage: "key-completion.webp",
    completionText: {
          ru: "Практика «Практика на выносливость» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
          uk: "Практика «Практика на витривалість» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
          kk: "«Төзімділік жаттығуы» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
          de: "Die Übung „Ausdauerübung“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
          en: "The “Endurance Practice” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson9_5: flyKeyLessonStoryboardEntry({
    introImage: "key-book.webp",
    introTip: {
          ru: "В тесте остаётся только метроном. Пусть он держит темп, а пальцы сами вспоминают сочетания и работу с Shift.",
          uk: "У тесті підказок менше, зате краще видно, що вже стало автоматичним. Дихайте рівно й не поспішайте.",
          kk: "Тестте көмек азаяды, бірақ дағдының қай бөлігі автоматқа айналғаны жақсы көрінеді.",
          de: "Im Test bleibt nur das Metronom. Lass es das Tempo halten, während die Finger die Kombinationen und die Arbeit mit Shift selbst abrufen.",
          en: "In the test, only the metronome remains. Let it hold the pace while your fingers remember the combinations and Shift work on their own."
        },
    nextModuleText: {
          ru: "Проверить Shift в устойчивой практике.",
          uk: "Перевірити Shift у стійкій практиці.",
          kk: "Shift пернесін тұрақты жаттығуда тексеру.",
          de: "Shift in stabiler Praxis prüfen.",
          en: "Check Shift in steady practice."
        },
    completionImage: "key-celebrate.png",
    completionText: {
          ru: "Модуль «Частотные сочетания + Shift» пройден. Можно идти дальше без ощущения, что база рассыпается.",
          uk: "Модуль «Частотні поєднання + Shift» пройдено. Можна йти далі без відчуття, що база розсипається.",
          kk: "«Жиі тіркестер + Shift» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
          de: "Das Modul „Häufige Kombinationen + Shift“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
          en: "The “Frequent Patterns + Shift” module is complete. You can move on without the base feeling fragile."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson10_1: flyKeyLessonStoryboardEntry({
    introImage: "key-point-strict.webp",
    introTip: {
          ru: "В сочетаниях со знаками не делай паузу перед пунктуацией. Подготовь Shift противоположной рукой и продолжай двигаться в темпе метронома.",
          uk: "Починайте повільно й уважно. Якщо пальці плутаються, зменште темп і поверніться до рівного ритму.",
          kk: "Баяу және мұқият бастаңыз. Саусақтар шатасса, темпті азайтып, бірқалыпты ырғаққа қайтыңыз.",
          de: "Mach bei Kombinationen mit Zeichen keine Pause vor der Satzsetzung. Bereite Shift mit der gegenüberliegenden Hand vor und bewege dich weiter im Metronomtempo.",
          en: "In combinations with symbols, do not pause before punctuation. Prepare Shift with the opposite hand and keep moving with the metronome."
        },
    nextModuleText: {
          ru: "Соединить левую руку, Shift и знаки.",
          uk: "Поєднати ліву руку, Shift і знаки.",
          kk: "Сол қолды, Shift пернесін және белгілерді біріктіру.",
          de: "Linke Hand, Shift und Zeichen verbinden.",
          en: "Connect left hand, Shift, and signs."
        },
    completionImage: "key-score-ten.png",
    completionText: {
          ru: "Шаг «Левая рука» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
          uk: "Крок «Ліва рука» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
          kk: "«Сол қол» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
          de: "Der Schritt „Linke Hand“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
          en: "The “Left Hand” step is complete. The movement is clearer now; keep the pace calm and move on."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson10_2: flyKeyLessonStoryboardEntry({
    introImage: "key-explain.webp",
    introTip: {
          ru: "Пунктуация должна быть такой же лёгкой, как буквы. Не бей по знакам сильнее и не задерживай пальцы ��а Shift.",
          uk: "Не дивіться на клавіатуру довше, ніж потрібно. Краще одна спокійна пауза, ніж серія випадкових натискань.",
          kk: "Пернетақтаға қажеттен артық қарамаңыз. Бір тыныш кідіріс бірнеше кездейсоқ басудан жақсы.",
          de: "Satzzeichen sollen sich genauso leicht anfühlen wie Buchstaben. Schlage Zeichen nicht härter an und halte die Finger nicht auf Shift fest.",
          en: "Punctuation should feel as light as letters. Do not hit symbols harder, and do not leave your fingers stuck on Shift."
        },
    nextModuleText: {
          ru: "Соединить правую руку, Shift и знаки.",
          uk: "Поєднати праву руку, Shift і знаки.",
          kk: "Оң қолды, Shift пернесін және белгілерді біріктіру.",
          de: "Rechte Hand, Shift und Zeichen verbinden.",
          en: "Connect right hand, Shift, and signs."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Раздел «Правая рука» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
          uk: "Розділ «Права рука» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
          kk: "«Оң қол» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
          de: "Der Abschnitt „Rechte Hand“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
          en: "The “Right Hand” section is connected without extra rushing. Keep the home position steady and continue."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson10_3: flyKeyLessonStoryboardEntry({
    introImage: "key-stop.webp",
    introTip: {
          ru: "Когда в строке есть регистр и знаки, держи один порядок: увидеть сочетание, нажать нужный Shift другой рукой, сразу вернуться в базу.",
          uk: "Коли в рядку є регістр і знаки, тримай один порядок: побачити поєднання, натиснути потрібний Shift іншою рукою, одразу повернутися в базу.",
          kk: "Жолда бас әріптер мен белгілер болса, бір тәртіпті ұстан: тіркесті көр, керек Shift пернесін екінші қолмен бас, бірден негізгі орынға қайт.",
          de: "Wenn eine Zeile Großschreibung und Zeichen enthält, halte eine klare Reihenfolge: Kombination sehen, die passende Shift-Taste mit der anderen Hand drücken, sofort zurück in die Grundposition.",
          en: "When a line has capitalization and symbols, keep one order: see the combination, press the needed Shift with the other hand, return to base right away."
        },
    nextModuleText: {
          ru: "Смешать все частые движения вместе.",
          uk: "Змішати всі часті рухи разом.",
          kk: "Барлық жиі қимылдарды бірге араластыру.",
          de: "Alle häufigen Bewegungen mischen.",
          en: "Mix all frequent movements together."
        },
    completionImage: "key-thumb.webp",
    completionText: {
          ru: "Блок «Смешанные сочетания» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
          uk: "Блок «Змішані поєднання» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
          kk: "«Аралас тіркестер» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
          de: "Der Block „Gemischte Kombinationen“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
          en: "The “Mixed Patterns” block is becoming one connected skill. Next, we move it into more fluent typing."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson10_4: flyKeyLessonStoryboardEntry({
    introImage: "key-thinking.webp",
    introTip: {
          ru: "На выносливости не пытайся выиграть у метронома. Длинные строки проверяют стабильность: ровный темп, чистые знаки, минимум лишних движений.",
          uk: "Тут одночасно працюють частотні поєднання, Shift і пунктуація. Рухайтесь рівно, без ривків.",
          kk: "Сөздерде дұрыс пернені табу ғана емес, қозғалыстың жұмсақ байланысы да маңызды.",
          de: "Versuche in der Ausdauerübung nicht, gegen das Metronom zu gewinnen. Lange Zeilen prüfen Stabilität: gleichmäßiges Tempo, saubere Zeichen, möglichst wenig unnötige Bewegung.",
          en: "In endurance practice, do not try to beat the metronome. Long lines test stability: steady pace, clean symbols, minimal extra movement."
        },
    nextModuleText: {
          ru: "Закрепить навык на длинной практике.",
          uk: "Закріпити навичку на довгій практиці.",
          kk: "Дағдыны ұзақ жаттығуда бекіту.",
          de: "Den Skill in längerer Praxis festigen.",
          en: "Lock the skill into longer practice."
        },
    completionImage: "key-celebrate.png",
    completionText: {
          ru: "Практика «Практика на выносливость» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
          uk: "Практика «Практика на витривалість» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
          kk: "«Төзімділік жаттығуы» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
          de: "Die Übung „Ausdauerübung“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
          en: "The “Endurance Practice” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson10_5: flyKeyLessonStoryboardEntry({
    introImage: "key-book.webp",
    introTip: {
          ru: "Финальный тест собирает ритм, Shift и пунктуацию вместе. Ассистенты выключены, но метроном остаётся твоей опорой: слушай темп и печатай спокойно.",
          uk: "У тесті підказок менше, зате краще видно, що вже стало автоматичним. Дихайте рівно й не поспішайте.",
          kk: "Тестте көмек азаяды, бірақ дағдының қай бөлігі автоматқа айналғаны жақсы көрінеді.",
          de: "Der Abschlusstest bringt Rhythmus, Shift und Satzzeichen zusammen. Die Assistenten sind ausgeschaltet, aber das Metronom bleibt deine Stütze: Hör auf den Takt und tippe ruhig.",
          en: "The final test brings rhythm, Shift, and punctuation together. Assistants are off, but the metronome remains your support: listen to the beat and type calmly."
        },
    nextModuleText: {
          ru: "Проверить весь основной курс.",
          uk: "Перевірити весь основний курс.",
          kk: "Бүкіл негізгі курсты тексеру.",
          de: "Den ganzen Grundkurs prüfen.",
          en: "Check the full core course."
        },
    completionImage: "key-completion.webp",
    completionText: {
          ru: "Похоже, пришло время прощаться. Я рассказал тебе всё главное о слепой печати: базовые позиции, ряды, Shift, цифры, пунктуацию и ритм. Дальше всё зависит от практики и от того, как часто ты будешь использовать навык в реальной работе. Помни: настоящая скорость приходит не от спешки, а от спокойных и точных движений. Продолжай печатать вслепую в обычной жизни, меньше смотри на клавиатуру и доверяй своим пальцам. У тебя уже есть всё, чтобы расти дальше.",
          uk: "Схоже, настав час прощатися. Я показав найважливіше у сліпому друці: базову позицію, ряди, Shift, цифри, пунктуацію й ритм. Далі все залежить від практики та від того, як часто ти використовуватимеш цю навичку в реальній роботі. Пам’ятай: справжня швидкість приходить не від поспіху, а від спокійних і точних рухів. Друкуй всліпу в повсякденному житті, менше дивись на клавіатуру й довіряй пальцям.",
          kk: "Қоштасатын уақыт келген сияқты. Мен сізге соқыр терудің ең маңызды бөліктерін көрсеттім: негізгі позиция, қатарлар, Shift, сандар, тыныс белгілері және ырғақ. Енді бәрі жаттығуға және бұл дағдыны күнделікті жұмыста қаншалықты жиі қолданатыныңызға байланысты. Есіңізде болсын: шынайы жылдамдық асығудан емес, сабырлы әрі дәл қозғалыстан келеді. Пернетақтаға азырақ қарап, саусақтарыңызға сеніңіз.",
          de: "Es ist Zeit, Abschied zu nehmen. Ich habe dir das Wichtigste über Blindtippen gezeigt: Grundposition, Reihen, Shift, Zahlen, Zeichensetzung und Rhythmus. Ab jetzt hängt viel von deiner Übung und davon ab, wie oft du diese Fähigkeit im Alltag benutzt. Denk daran: Echte Geschwindigkeit entsteht nicht durch Eile, sondern durch ruhige und genaue Bewegungen. Tippe weiter blind, schau seltener auf die Tastatur und vertraue deinen Fingern.",
          en: "It is time to say goodbye. I have shown you the essentials of touch typing: home position, rows, Shift, numbers, punctuation, and rhythm. From here, progress depends on practice and on how often you use the skill in real work. Remember: real speed does not come from rushing, but from calm, precise movement. Keep touch typing in everyday life, look at the keyboard less, and trust your fingers."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson11_1: flyKeyLessonStoryboardEntry({
    introImage: "key-idea.webp",
    introTip: {
          ru: "Случайный текст ближе к настоящей печати: меньше повторов, больше живого языка и больше ответственности для пальцев.",
          uk: "Випадковий текст ближчий до реального набору: менше повторів, більше живої мови й більше відповідальності для пальців.",
          kk: "Кездейсоқ мәтін нақты теруге жақынырақ: қайталау аз, тіл тірі, ал саусақтарға жауапкершілік көбірек түседі.",
          de: "Zufällige Texte sind näher am echten Tippen: weniger Wiederholung, mehr echte Sprache und mehr Verantwortung für die Finger.",
          en: "Random text is closer to real typing: less repetition, more living language, and more responsibility for the fingers."
        },
    nextModuleText: {
          ru: "Перейти к случайным живым текстам.",
          uk: "Перейти до випадкових живих текстів.",
          kk: "Кездейсоқ тірі мәтіндерге көшу.",
          de: "Zu zufälligen echten Texten wechseln.",
          en: "Move into random real text."
        },
    completionImage: "key-score-ten.png",
    completionText: {
          ru: "Случайный текст возвращает навык в живую печать: меньше шаблонов, больше настоящего движения.",
          uk: "Випадковий текст повертає навичку в живий набір: менше шаблонів, більше справжнього руху.",
          kk: "Кездейсоқ мәтін дағдыны тірі теруге қайтарады: үлгі азаяды, нақты қозғалыс көбейеді.",
          de: "Zufallstext bringt die Fähigkeit zurück ins echte Tippen: weniger Muster, mehr natürliche Bewegung.",
          en: "Random text moves the skill back into real typing: fewer patterns, more natural movement."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  }),
  lesson12_1: flyKeyLessonStoryboardEntry({
    introImage: "key-book.webp",
    introTip: {
          ru: "Свой текст полезен, когда хочется тренировать именно те слова и фразы, которые вы реально печатаете каждый день.",
          uk: "Власний текст корисний тоді, коли хочеться тренувати саме те, що ви справді друкуєте щодня.",
          kk: "Өз мәтініңізді жаттықтыру күнделікті шынымен теретін сөздерге үйренуге көмектеседі.",
          de: "Eigene Texte helfen, genau die Wörter und Sätze zu üben, die du im Alltag wirklich tippst.",
          en: "Custom text helps you practice the exact words and phrases you really type every day."
        },
    nextModuleText: {
          ru: "Тренировать собственные реальные тексты.",
          uk: "Тренувати власні реальні тексти.",
          kk: "Өз нақты мәтіндеріңізді жаттықтыру.",
          de: "Eigene echte Texte trainieren.",
          en: "Train your own real texts."
        },
    completionImage: "key-score-ten.png",
    completionText: {
          ru: "Собственный текст делает тренировку личной: теперь можно укреплять именно те фразы, которые нужны в жизни.",
          uk: "Власний текст робить тренування особистим: тепер можна зміцнювати саме ті фрази, які потрібні в житті.",
          kk: "Өз мәтініңіз жаттығуды жеке етеді: енді өмірде керек фразаларды нығайтуға болады.",
          de: "Eigener Text macht das Training persönlich: Jetzt stärkst du genau die Sätze, die du im Alltag brauchst.",
          en: "Custom text makes practice personal: now you can strengthen the phrases you actually need."
        },
    showIntroImage: true,
    showIntroTip: true,
    showNextModuleText: true,
    showCompletionImage: true,
    showCompletionText: true
  })
};
