const flyKeyDefaultCompletionText = {
  ru: "Шаг «Левая рука» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
  uk: "Крок «Ліва рука» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
  kk: "«Сол қол» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
  de: "Der Schritt „Linke Hand“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
  en: "The “Left Hand” step is complete. The movement is clearer now; keep the pace calm and move on."
};

function flyKeyLessonStoryboardEntry(introImage, completionImage, completionText = flyKeyDefaultCompletionText) {
  return { introImage, completionImage, completionText };
}

window.FLYKEY_LESSON_STORYBOARD = {
  lesson1_1: flyKeyLessonStoryboardEntry("key-please.webp", "key-thumb.webp"),
  lesson1_2: flyKeyLessonStoryboardEntry("key-wave.webp", "key-confident.webp", {
      ru: "Раздел «Правая рука» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
      uk: "Розділ «Права рука» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
      kk: "«Оң қол» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
      de: "Der Abschnitt „Rechte Hand“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
      en: "The “Right Hand” section is connected without extra rushing. Keep the home position steady and continue."
    }),
  lesson1_3: flyKeyLessonStoryboardEntry("key-explain.webp", "key-wave.webp", {
      ru: "Блок «Обе руки» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
      uk: "Блок «Обидві руки» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
      kk: "«Екі қол» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
      de: "Der Block „Beide Hände“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
      en: "The “Both Hands” block is becoming one connected skill. Next, we move it into more fluent typing."
    }),
  lesson1_4: flyKeyLessonStoryboardEntry("key-idea.webp", "key-confident.webp", {
      ru: "Практика «Короткие слова» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
      uk: "Практика «Короткі слова» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
      kk: "«Қысқа сөздер» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
      de: "Die Übung „Kurze Wörter“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
      en: "The “Short Words” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
    }),
  lesson1_5: flyKeyLessonStoryboardEntry("key-arms-crossed.webp", "key-completion.webp", {
      ru: "Модуль «Домашний ряд» пройден. Можно идти дальше без ощущения, что база рассыпается.",
      uk: "Модуль «Домашній ряд» пройдено. Можна йти далі без відчуття, що база розсипається.",
      kk: "«Негізгі қатар» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
      de: "Das Modul „Grundreihe“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
      en: "The “Home Row” module is complete. You can move on without the base feeling fragile."
    }),
  lesson2_1: flyKeyLessonStoryboardEntry("key-idea.webp", "key-thumb.webp", {
      ru: "Шаг «Центр слева» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
      uk: "Крок «Центр ліворуч» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
      kk: "«Орталық сол жақ» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
      de: "Der Schritt „Zentrum links“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
      en: "The “Left Center” step is complete. The movement is clearer now; keep the pace calm and move on."
    }),
  lesson2_2: flyKeyLessonStoryboardEntry("key-explain.webp", "key-confident.webp", {
      ru: "Раздел «Центр справа» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
      uk: "Розділ «Центр праворуч» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
      kk: "«Орталық оң жақ» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
      de: "Der Abschnitt „Zentrum rechts“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
      en: "The “Right Center” section is connected without extra rushing. Keep the home position steady and continue."
    }),
  lesson2_3: flyKeyLessonStoryboardEntry("key-point-strict.webp", "key-wave.webp", {
      ru: "Блок «Нижний ряд» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
      uk: "Блок «Нижній ряд» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
      kk: "«Төменгі қатар» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
      de: "Der Block „Untere Reihe“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
      en: "The “Bottom Row” block is becoming one connected skill. Next, we move it into more fluent typing."
    }),
  lesson2_4: flyKeyLessonStoryboardEntry("key-confident.webp", "key-thumb.webp", {
      ru: "Практика «Короткие слова» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
      uk: "Практика «Короткі слова» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
      kk: "«Қысқа сөздер» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
      de: "Die Übung „Kurze Wörter“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
      en: "The “Short Words” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
    }),
  lesson2_5: flyKeyLessonStoryboardEntry("key-arms-crossed.webp", "key-completion.webp", {
      ru: "Модуль «Центр» пройден. Можно идти дальше без ощущения, что база рассыпается.",
      uk: "Модуль «Центр» пройдено. Можна йти далі без відчуття, що база розсипається.",
      kk: "«Орталық аймақ» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
      de: "Das Modul „Zentrum“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
      en: "The “Center” module is complete. You can move on without the base feeling fragile."
    }),
  lesson3_1: flyKeyLessonStoryboardEntry("key-explain.webp", "key-thumb.webp", {
      ru: "Шаг «Верх слева» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
      uk: "Крок «Верх ліворуч» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
      kk: "«Жоғары сол жақ» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
      de: "Der Schritt „Oben links“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
      en: "The “Top Left” step is complete. The movement is clearer now; keep the pace calm and move on."
    }),
  lesson3_2: flyKeyLessonStoryboardEntry("key-idea.webp", "key-wave.webp", {
      ru: "Раздел «Верх справа» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
      uk: "Розділ «Верх праворуч» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
      kk: "«Жоғары оң жақ» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
      de: "Der Abschnitt „Oben rechts“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
      en: "The “Top Right” section is connected without extra rushing. Keep the home position steady and continue."
    }),
  lesson3_3: flyKeyLessonStoryboardEntry("key-point-strict.webp", "key-confident.webp", {
      ru: "Блок «Верхний ряд» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
      uk: "Блок «Верхній ряд» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
      kk: "«Жоғарғы қатар» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
      de: "Der Block „Obere Reihe“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
      en: "The “Top Row” block is becoming one connected skill. Next, we move it into more fluent typing."
    }),
  lesson3_4: flyKeyLessonStoryboardEntry("key-thinking.webp", "key-wave.webp", {
      ru: "Практика «Короткие слова» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
      uk: "Практика «Короткі слова» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
      kk: "«Қысқа сөздер» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
      de: "Die Übung „Kurze Wörter“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
      en: "The “Short Words” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
    }),
  lesson3_5: flyKeyLessonStoryboardEntry("key-book.webp", "key-completion.webp", {
      ru: "Модуль «Верхний ряд» пройден. Можно идти дальше без ощущения, что база рассыпается.",
      uk: "Модуль «Верхній ряд» пройдено. Можна йти далі без відчуття, що база розсипається.",
      kk: "«Жоғарғы әріптер қатары» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
      de: "Das Modul „Obere Reihe“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
      en: "The “Top Row” module is complete. You can move on without the base feeling fragile."
    }),
  lesson4_1: flyKeyLessonStoryboardEntry("key-explain.webp", "key-thumb.webp", {
      ru: "Шаг «Низ слева» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
      uk: "Крок «Низ ліворуч» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
      kk: "«Төмен сол жақ» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
      de: "Der Schritt „Unten links“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
      en: "The “Bottom Left” step is complete. The movement is clearer now; keep the pace calm and move on."
    }),
  lesson4_2: flyKeyLessonStoryboardEntry("key-idea.webp", "key-confident.webp", {
      ru: "Раздел «Низ справа» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
      uk: "Розділ «Низ праворуч» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
      kk: "«Төмен оң жақ» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
      de: "Der Abschnitt „Unten rechts“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
      en: "The “Bottom Right” section is connected without extra rushing. Keep the home position steady and continue."
    }),
  lesson4_3: flyKeyLessonStoryboardEntry("key-point-strict.webp", "key-confident.webp", {
      ru: "Блок «Нижний ряд» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
      uk: "Блок «Нижній ряд» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
      kk: "«Төменгі қатар» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
      de: "Der Block „Untere Reihe“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
      en: "The “Bottom Row” block is becoming one connected skill. Next, we move it into more fluent typing."
    }),
  lesson4_4: flyKeyLessonStoryboardEntry("key-thinking.webp", "key-wave.webp", {
      ru: "Практика «Короткие слова» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
      uk: "Практика «Короткі слова» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
      kk: "«Қысқа сөздер» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
      de: "Die Übung „Kurze Wörter“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
      en: "The “Short Words” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
    }),
  lesson4_5: flyKeyLessonStoryboardEntry("key-arms-crossed.webp", "key-completion.webp", {
      ru: "Модуль «Нижний ряд» пройден. Можно идти дальше без ощущения, что база рассыпается.",
      uk: "Модуль «Нижній ряд» пройдено. Можна йти далі без відчуття, що база розсипається.",
      kk: "«Төменгі қатар» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
      de: "Das Modul „Untere Reihe“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
      en: "The “Bottom Row” module is complete. You can move on without the base feeling fragile."
    }),
  lesson5_1: flyKeyLessonStoryboardEntry("key-point-strict.webp", "key-thumb.webp", {
      ru: "Шаг «Вертикали слева» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
      uk: "Крок «Вертикалі ліворуч» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
      kk: "«Сол жақ тік бағыттар» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
      de: "Der Schritt „Vertikalen links“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
      en: "The “Left Verticals” step is complete. The movement is clearer now; keep the pace calm and move on."
    }),
  lesson5_2: flyKeyLessonStoryboardEntry("key-explain.webp", "key-confident.webp", {
      ru: "Раздел «Вертикали справа» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
      uk: "Розділ «Вертикалі праворуч» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
      kk: "«Оң жақ тік бағыттар» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
      de: "Der Abschnitt „Vertikalen rechts“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
      en: "The “Right Verticals” section is connected without extra rushing. Keep the home position steady and continue."
    }),
  lesson5_3: flyKeyLessonStoryboardEntry("key-stop.webp", "key-idea.webp", {
      ru: "Блок «Регистр» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
      uk: "Блок «Регістр» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
      kk: "«Бас әріптер» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
      de: "Der Block „Großschreibung“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
      en: "The “Case” block is becoming one connected skill. Next, we move it into more fluent typing."
    }),
  lesson5_4: flyKeyLessonStoryboardEntry("key-thinking.webp", "key-wave.webp", {
      ru: "Практика «Слова-прыжки» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
      uk: "Практика «Слова-стрибки» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
      kk: "«Секірмелі сөздер» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
      de: "Die Übung „Sprungwörter“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
      en: "The “Jump Words” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
    }),
  lesson5_5: flyKeyLessonStoryboardEntry("key-book.webp", "key-score-ten.png", {
      ru: "Большая проверка пройдена. Модуль «Вертикали и Shift» теперь держится как часть навыка, а не как отдельное упражнение.",
      uk: "Велику перевірку пройдено. Модуль «Вертикалі та Shift» тепер тримається як частина навички, а не як окрема вправа.",
      kk: "Үлкен тексеріс аяқталды. «Тік бағыттар және Shift» модулі енді жеке жаттығу емес, дағдының бір бөлігі болып тұр.",
      de: "Die große Prüfung ist geschafft. Das Modul „Vertikalen und Shift“ ist jetzt Teil der Fähigkeit und nicht nur eine einzelne Übung.",
      en: "The big check is complete. The “Verticals and Shift” module now feels like part of the skill, not just a separate exercise."
    }),
  lesson6_1: flyKeyLessonStoryboardEntry("key-point-strict.webp", "key-thumb.webp", {
      ru: "Шаг «Левая сторона» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
      uk: "Крок «Ліва сторона» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
      kk: "«Ә, І, Ң, Ғ» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
      de: "Der Schritt „Linke Seite“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
      en: "The “Left Side” step is complete. The movement is clearer now; keep the pace calm and move on."
    }),
  lesson6_2: flyKeyLessonStoryboardEntry("key-idea.webp", "key-confident.webp", {
      ru: "Раздел «Правая сторона» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
      uk: "Розділ «Права сторона» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
      kk: "«Ү, Ұ, Қ, Ө, Һ» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
      de: "Der Abschnitt „Rechte Seite“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
      en: "The “Right Side” section is connected without extra rushing. Keep the home position steady and continue."
    }),
  lesson6_3: flyKeyLessonStoryboardEntry("key-stop.webp", "key-idea.webp", {
      ru: "Блок «Весь цифровой ряд» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
      uk: "Блок «Увесь цифровий ряд» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
      kk: "«Қазақ әріптері қатары» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
      de: "Der Block „Ganze Zahlenreihe“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
      en: "The “Full Number Row” block is becoming one connected skill. Next, we move it into more fluent typing."
    }),
  lesson6_4: flyKeyLessonStoryboardEntry("key-thinking.webp", "key-wave.webp", {
      ru: "Практика «Смешанный ввод» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
      uk: "Практика «Змішане введення» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
      kk: "«Сөздер мен белгілер» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
      de: "Die Übung „Gemischte Eingabe“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
      en: "The “Mixed Input” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
    }),
  lesson6_5: flyKeyLessonStoryboardEntry("key-arms-crossed.webp", "key-completion.webp", {
      ru: "Модуль «Верхний ряд + Цифры» пройден. Можно идти дальше без ощущения, что база рассыпается.",
      uk: "Модуль «Верхній ряд + цифри» пройдено. Можна йти далі без відчуття, що база розсипається.",
      kk: "«Қазақ әріптері бар жоғарғы қатар» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
      de: "Das Modul „Obere Reihe + Zahlen“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
      en: "The “Top Row + Numbers” module is complete. You can move on without the base feeling fragile."
    }),
  lesson7_1: flyKeyLessonStoryboardEntry("key-explain.webp", "key-thumb.webp", {
      ru: "Шаг «Точка и запятая» закрыт. Движение стало понятнее; держим спокойный темп и идём дальше.",
      uk: "Крок «Крапка й кома» закрито. Рух став зрозумілішим; тримай спокійний темп і рухайся далі.",
      kk: "«Нүкте мен үтір» қадамы аяқталды. Қозғалыс түсініктірек болды; ырғақты тыныш сақтап, әрі қарай өтеміз.",
      de: "Der Schritt „Punkt und Komma“ ist geschafft. Die Bewegung ist klarer geworden; bleib ruhig im Tempo und geh weiter.",
      en: "The “Period and Comma” step is complete. The movement is clearer now; keep the pace calm and move on."
    }),
  lesson7_2: flyKeyLessonStoryboardEntry("key-stop.webp", "key-confident.webp", {
      ru: "Раздел «Вопрос и восклицание» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
      uk: "Розділ «Питання й оклик» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
      kk: "«Сұрақ пен леп белгісі» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
      de: "Der Abschnitt „Frage und Ausruf“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
      en: "The “Question and Exclamation” section is connected without extra rushing. Keep the home position steady and continue."
    }),
  lesson7_3: flyKeyLessonStoryboardEntry("key-point-strict.webp", "key-idea.webp", {
      ru: "Блок «Тире, двоеточие, кавычки» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
      uk: "Блок «Тире, двокрапка, лапки» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
      kk: "«Сызықша, қос нүкте, тырнақша» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
      de: "Der Block „Strich, Doppelpunkt, Anführungszeichen“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
      en: "The “Dash, Colon, Quotes” block is becoming one connected skill. Next, we move it into more fluent typing."
    }),
  lesson7_4: flyKeyLessonStoryboardEntry("key-thinking.webp", "key-wave.webp", {
      ru: "Практика «Фразы со знаками» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
      uk: "Практика «Фрази зі знаками» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
      kk: "«Белгілері бар фразалар» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
      de: "Die Übung „Sätze mit Zeichen“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
      en: "The “Phrases with Signs” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
    }),
  lesson7_5: flyKeyLessonStoryboardEntry("key-point-strict.webp", "key-completion.webp", {
      ru: "Модуль «Пунктуация» пройден. Можно идти дальше без ощущения, что база рассыпается.",
      uk: "Модуль «Пунктуація» пройдено. Можна йти далі без відчуття, що база розсипається.",
      kk: "«Тыныс белгілері» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
      de: "Das Modul „Zeichensetzung“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
      en: "The “Punctuation” module is complete. You can move on without the base feeling fragile."
    }),
  lesson8_1: flyKeyLessonStoryboardEntry("key-idea.webp", "key-thumb.webp"),
  lesson8_2: flyKeyLessonStoryboardEntry("key-explain.webp", "key-confident.webp", {
      ru: "Раздел «Правая рука» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
      uk: "Розділ «Права рука» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
      kk: "«Оң қол» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
      de: "Der Abschnitt „Rechte Hand“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
      en: "The “Right Hand” section is connected without extra rushing. Keep the home position steady and continue."
    }),
  lesson8_3: flyKeyLessonStoryboardEntry("key-thinking.webp", "key-idea.webp", {
      ru: "Блок «Смешанные сочетания» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
      uk: "Блок «Змішані поєднання» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
      kk: "«Аралас тіркестер» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
      de: "Der Block „Gemischte Kombinationen“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
      en: "The “Mixed Patterns” block is becoming one connected skill. Next, we move it into more fluent typing."
    }),
  lesson8_4: flyKeyLessonStoryboardEntry("key-confident.webp", "key-wave.webp", {
      ru: "Практика «Практика на выносливость» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
      uk: "Практика «Практика на витривалість» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
      kk: "«Төзімділік жаттығуы» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
      de: "Die Übung „Ausdauerübung“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
      en: "The “Endurance Practice” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
    }),
  lesson8_5: flyKeyLessonStoryboardEntry("key-confident.webp", "key-completion.webp", {
      ru: "Модуль «Частотные сочетания» пройден. Можно идти дальше без ощущения, что база рассыпается.",
      uk: "Модуль «Частотні поєднання» пройдено. Можна йти далі без відчуття, що база розсипається.",
      kk: "«Жиі кездесетін тіркестер» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
      de: "Das Modul „Häufige Kombinationen“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
      en: "The “Frequent Patterns” module is complete. You can move on without the base feeling fragile."
    }),
  lesson9_1: flyKeyLessonStoryboardEntry("key-point-strict.webp", "key-thumb.webp"),
  lesson9_2: flyKeyLessonStoryboardEntry("key-explain.webp", "key-confident.webp", {
      ru: "Раздел «Правая рука» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
      uk: "Розділ «Права рука» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
      kk: "«Оң қол» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
      de: "Der Abschnitt „Rechte Hand“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
      en: "The “Right Hand” section is connected without extra rushing. Keep the home position steady and continue."
    }),
  lesson9_3: flyKeyLessonStoryboardEntry("key-stop.webp", "key-idea.webp", {
      ru: "Блок «Смешанные сочетания» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
      uk: "Блок «Змішані поєднання» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
      kk: "«Аралас тіркестер» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
      de: "Der Block „Gemischte Kombinationen“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
      en: "The “Mixed Patterns” block is becoming one connected skill. Next, we move it into more fluent typing."
    }),
  lesson9_4: flyKeyLessonStoryboardEntry("key-thinking.webp", "key-wave.webp", {
      ru: "Практика «Практика на выносливость» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
      uk: "Практика «Практика на витривалість» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
      kk: "«Төзімділік жаттығуы» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
      de: "Die Übung „Ausdauerübung“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
      en: "The “Endurance Practice” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
    }),
  lesson9_5: flyKeyLessonStoryboardEntry("key-book.webp", "key-completion.webp", {
      ru: "Модуль «Частотные сочетания + Shift» пройден. Можно идти дальше без ощущения, что база рассыпается.",
      uk: "Модуль «Частотні поєднання + Shift» пройдено. Можна йти далі без відчуття, що база розсипається.",
      kk: "«Жиі тіркестер + Shift» модулі аяқталды. Негіз шашырап кетпейді деп сенімді түрде алға жылжуға болады.",
      de: "Das Modul „Häufige Kombinationen + Shift“ ist abgeschlossen. Du kannst weitergehen, ohne dass die Basis wackelt.",
      en: "The “Frequent Patterns + Shift” module is complete. You can move on without the base feeling fragile."
    }),
  lesson10_1: flyKeyLessonStoryboardEntry("key-point-strict.webp", "key-thumb.webp"),
  lesson10_2: flyKeyLessonStoryboardEntry("key-explain.webp", "key-confident.webp", {
      ru: "Раздел «Правая рука» добавлен без лишней спешки. Сохраняй базовую позицию и продолжай.",
      uk: "Розділ «Права рука» додано без зайвого поспіху. Зберігай базову позицію й продовжуй.",
      kk: "«Оң қол» бөлімі артық асықпай қосылды. Негізгі позицияны сақтап, жалғастырыңыз.",
      de: "Der Abschnitt „Rechte Hand“ ist ohne unnötige Eile dazugekommen. Halte die Grundposition und mach weiter.",
      en: "The “Right Hand” section is connected without extra rushing. Keep the home position steady and continue."
    }),
  lesson10_3: flyKeyLessonStoryboardEntry("key-stop.webp", "key-idea.webp", {
      ru: "Блок «Смешанные сочетания» начинает собираться в цельный навык. Дальше перенесём движение в более связную печать.",
      uk: "Блок «Змішані поєднання» починає складатися в цілісну навичку. Далі перенесемо рух у більш зв’язний набір.",
      kk: "«Аралас тіркестер» блогы біртұтас дағдыға жинала бастады. Енді қозғалысты байланысқан теруге көшіреміз.",
      de: "Der Block „Gemischte Kombinationen“ wird zu einer zusammenhängenden Fähigkeit. Als Nächstes geht die Bewegung in flüssigeres Tippen über.",
      en: "The “Mixed Patterns” block is becoming one connected skill. Next, we move it into more fluent typing."
    }),
  lesson10_4: flyKeyLessonStoryboardEntry("key-thinking.webp", "key-wave.webp", {
      ru: "Практика «Практика на выносливость» закрепила движение в словах. Осталась проверка, где пальцы должны справиться почти сами.",
      uk: "Практика «Практика на витривалість» закріпила рух у словах. Залишилася перевірка, де пальці мають упоратися майже самі.",
      kk: "«Төзімділік жаттығуы» жаттығуы қозғалысты сөздердің ішінде бекітті. Енді саусақтар дерлік өздері орындайтын тексеріс қалды.",
      de: "Die Übung „Ausdauerübung“ hat die Bewegung in Wörtern gefestigt. Jetzt bleibt die Prüfung, in der die Finger fast allein arbeiten sollen.",
      en: "The “Endurance Practice” practice has anchored the movement inside words. One check remains, where the fingers should handle more on their own."
    }),
  lesson10_5: flyKeyLessonStoryboardEntry("key-book.webp", "key-score-ten.png", {
      ru: "Похоже, пришло время прощаться. Я рассказал тебе всё главное о слепой печати: базовые позиции, ряды, Shift, цифры, пунктуацию и ритм. Дальше всё зависит от практики и от того, как часто ты будешь использовать навык в реальной работе. Помни: настоящая скорость приходит не от спешки, а от спокойных и точных движений. Продолжай печатать вслепую в обычной жизни, меньше смотри на клавиатуру и доверяй своим пальцам. У тебя уже есть всё, чтобы расти дальше.",
      uk: "Схоже, настав час прощатися. Я показав найважливіше у сліпому друці: базову позицію, ряди, Shift, цифри, пунктуацію й ритм. Далі все залежить від практики та від того, як часто ти використовуватимеш цю навичку в реальній роботі. Пам’ятай: справжня швидкість приходить не від поспіху, а від спокійних і точних рухів. Друкуй всліпу в повсякденному житті, менше дивись на клавіатуру й довіряй пальцям.",
      kk: "Қоштасатын уақыт келген сияқты. Мен сізге соқыр терудің ең маңызды бөліктерін көрсеттім: негізгі позиция, қатарлар, Shift, сандар, тыныс белгілері және ырғақ. Енді бәрі жаттығуға және бұл дағдыны күнделікті жұмыста қаншалықты жиі қолданатыныңызға байланысты. Есіңізде болсын: шынайы жылдамдық асығудан емес, сабырлы әрі дәл қозғалыстан келеді. Пернетақтаға азырақ қарап, саусақтарыңызға сеніңіз.",
      de: "Es ist Zeit, Abschied zu nehmen. Ich habe dir das Wichtigste über Blindtippen gezeigt: Grundposition, Reihen, Shift, Zahlen, Zeichensetzung und Rhythmus. Ab jetzt hängt viel von deiner Übung und davon ab, wie oft du diese Fähigkeit im Alltag benutzt. Denk daran: Echte Geschwindigkeit entsteht nicht durch Eile, sondern durch ruhige und genaue Bewegungen. Tippe weiter blind, schau seltener auf die Tastatur und vertraue deinen Fingern.",
      en: "It is time to say goodbye. I have shown you the essentials of touch typing: home position, rows, Shift, numbers, punctuation, and rhythm. From here, progress depends on practice and on how often you use the skill in real work. Remember: real speed does not come from rushing, but from calm, precise movement. Keep touch typing in everyday life, look at the keyboard less, and trust your fingers."
    }),
  lesson11_1: flyKeyLessonStoryboardEntry("key-idea.webp", "key-confident.webp", {
      ru: "Случайный текст возвращает навык в живую печать: меньше шаблонов, больше настоящего движения.",
      uk: "Випадковий текст повертає навичку в живий набір: менше шаблонів, більше справжнього руху.",
      kk: "Кездейсоқ мәтін дағдыны тірі теруге қайтарады: үлгі азаяды, нақты қозғалыс көбейеді.",
      de: "Zufallstext bringt die Fähigkeit zurück ins echte Tippen: weniger Muster, mehr natürliche Bewegung.",
      en: "Random text moves the skill back into real typing: fewer patterns, more natural movement."
    }),
  lesson12_1: flyKeyLessonStoryboardEntry("fly_welcome_no_bg.png", "key-celebrate.png", {
      ru: "Собственный текст делает тренировку личной: теперь можно укреплять именно те фразы, которые нужны в жизни.",
      uk: "Власний текст робить тренування особистим: тепер можна зміцнювати саме ті фрази, які потрібні в житті.",
      kk: "Өз мәтініңіз жаттығуды жеке етеді: енді өмірде керек фразаларды нығайтуға болады.",
      de: "Eigener Text macht das Training persönlich: Jetzt stärkst du genau die Sätze, die du im Alltag brauchst.",
      en: "Custom text makes practice personal: now you can strengthen the phrases you actually need."
    })
};
