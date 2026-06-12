window.PRACTICE_CONTENT_SOURCE.modules = window.PRACTICE_CONTENT_SOURCE.modules || [];
window.PRACTICE_CONTENT_SOURCE.modules.push({
  id: "module2",
  title: { ru: "Модуль 2 — Центр", de: "Modul 2 — Zentrum", en: "Module 2 — Center" },
  symbols: {
    ru: ["к", "е", "а", "п", "г", "н", "о", "р", "м", "и", "т", "ь"],
    de: ["r", "t", "f", "g", "u", "z", "j", "h", "v", "b", "n", "m"],
    en: ["r", "t", "f", "g", "u", "y", "j", "h", "v", "b", "n", "m"]
  },
  lessons: [
    {
      id: "lesson2_1",
      title: { ru: "Центр слева", de: "Zentrum links", en: "Left Center" },
      tips: {
        ru: [
          "После каждого нажатия возвращай пальцы в «домик». Так они всегда знают, откуда стартовать к следующей букве."
        ],
        de: [
          "Bring deine Finger nach jedem Anschlag zurück ins Zuhause. So wissen sie immer, von wo aus sie zur nächsten Taste starten."
        ],
        en: [
          "Return your fingers to the home position after every keypress. That way they always know where to start for the next letter."
        ]
      },
      symbolPolicy: {
        scope: "lesson",
        ru: ["к", "е", "а", "п"],
        de: ["r", "t", "f", "g"],
        en: ["r", "t", "f", "g"]
      },
      content: { lineCount: 10 },
      scoring: { accuracy: 90, speedMax: 120 },
      lines: {
        ru: [
          "кеап кеап кеап кеап апек апек паке паке кеап апек паке кеап апек паке кеап кеап апек паке кеап апек паке кеап кеап кеап кеап кеап",
          "кк ее аа пп кк пп ее аа кк аа пп ее кк ее аа пп кк пп ее аа кк аа пп ее кк ее аа пп кк пп ее аа кк аа пп кк ее аа пп кк пп ее аа",
          "кака епеп папа кеке кака епеп папа кеке кака епеп папа кеке кака епеп папа кеке кака епеп папа кеке кака кака епеп папа кеке кака",
          "аке епа пак кеп аке епа пак кеп аке епа пак кеп аке епа пак кеп аке епа пак кеп аке епа пак кеп аке епа аке епа пак кеп аке епа",
          "апа еке ака пеп апа еке ака пеп апа еке ака пеп апа еке ака пеп апа еке ака пеп апа еке ака пеп апа апа еке ака пеп апа еке ака",
          "ааа ккк еее ппп ааа ккк еее ппп ааа ккк еее ппп ааа ккк еее ппп ааа ккк еее ппп ааа ккк еее ппп ааа ккк еее ппп ааа ккк еее ппп",
          "паак кееп аппа паак кееп аппа паак кееп аппа паак кееп аппа паак кееп аппа паак кееп аппа паак паак кееп аппа паак кееп аппа паак",
          "кек пеп ака апа кек пеп ака апа кек пеп ака апа кек пеп ака апа кек пеп ака апа кек пеп ака кек пеп ака апа кек пеп ака апа кек",
          "кпк еае пап кек кпк еае пап кек кпк еае пап кек кпк еае пап кек кпк еае пап кек кпк еае пап кпк еае пап кек кпк еае пап кек кпк",
          "кеапкеап апекапек пакепаке кеапкеап апекапек пакепаке кеапкеап апекапек пакепаке кеапкеап кеапкеап апекапек пакепаке кеапкеап"
        ],
        de: [
          "rtfg rtfg rtfg rtfg gftr gftr fgrt fgrt rtfg gftr fgrt rtfg gftr fgrt rtfg rtfg gftr fgrt rtfg gftr fgrt rtfg rtfg rtfg rtfg rtfg",
          "rr tt ff gg rr gg tt ff rr ff gg tt rr tt ff gg rr gg tt ff rr ff gg tt rr tt ff gg rr gg tt ff rr ff gg rr tt ff gg rr gg tt ff",
          "rfrf tgtg gfgf rtrt rfrf tgtg gfgf rtrt rfrf tgtg gfgf rtrt rfrf tgtg gfgf rtrt rfrf tgtg gfgf rtrt rfrf rfrf tgtg gfgf rtrt rfrf",
          "frt tgf gfr rtg frt tgf gfr rtg frt tgf gfr rtg frt tgf gfr rtg frt tgf gfr rtg frt tgf gfr rtg frt tgf frt tgf gfr rtg frt tgf",
          "fgf trt frf gtg fgf trt frf gtg fgf trt frf gtg fgf trt frf gtg fgf trt frf gtg fgf trt frf gtg fgf fgf trt frf gtg fgf trt frf",
          "fff rrr ttt ggg fff rrr ttt ggg fff rrr ttt ggg fff rrr ttt ggg fff rrr ttt ggg fff rrr ttt ggg fff rrr ttt ggg fff rrr ttt ggg",
          "gffr rttg fggf gffr rttg fggf gffr rttg fggf gffr rttg fggf gffr rttg fggf gffr rttg fggf gffr gffr rttg fggf gffr rttg fggf gffr",
          "rtr gtg frf fgf rtr gtg frf fgf rtr gtg frf fgf rtr gtg frf fgf rtr gtg frf fgf rtr gtg frf rtr gtg frf fgf rtr gtg frf fgf rtr",
          "rgr tft gfg rtr rgr tft gfg rtr rgr tft gfg rtr rgr tft gfg rtr rgr tft gfg rtr rgr tft gfg rgr tft gfg rtr rgr tft gfg rtr rgr",
          "rtfgrtfg gftrgftr fgrtfgrt rtfgrtfg gftrgftr fgrtfgrt rtfgrtfg gftrgftr fgrtfgrt rtfgrtfg rtfgrtfg gftrgftr fgrtfgrt rtfgrtfg"
        ],
        en: [
          "rtfg rtfg rtfg rtfg gftr gftr fgrt fgrt rtfg gftr fgrt rtfg gftr fgrt rtfg rtfg gftr fgrt rtfg gftr fgrt rtfg rtfg rtfg rtfg rtfg",
          "rr tt ff gg rr gg tt ff rr ff gg tt rr tt ff gg rr gg tt ff rr ff gg tt rr tt ff gg rr gg tt ff rr ff gg rr tt ff gg rr gg tt ff",
          "rfrf tgtg gfgf rtrt rfrf tgtg gfgf rtrt rfrf tgtg gfgf rtrt rfrf tgtg gfgf rtrt rfrf tgtg gfgf rtrt rfrf rfrf tgtg gfgf rtrt rfrf",
          "frt tgf gfr rtg frt tgf gfr rtg frt tgf gfr rtg frt tgf gfr rtg frt tgf gfr rtg frt tgf gfr rtg frt tgf frt tgf gfr rtg frt tgf",
          "fgf trt frf gtg fgf trt frf gtg fgf trt frf gtg fgf trt frf gtg fgf trt frf gtg fgf trt frf gtg fgf fgf trt frf gtg fgf trt frf",
          "fff rrr ttt ggg fff rrr ttt ggg fff rrr ttt ggg fff rrr ttt ggg fff rrr ttt ggg fff rrr ttt ggg fff rrr ttt ggg fff rrr ttt ggg",
          "gffr rttg fggf gffr rttg fggf gffr rttg fggf gffr rttg fggf gffr rttg fggf gffr rttg fggf gffr gffr rttg fggf gffr rttg fggf gffr",
          "rtr gtg frf fgf rtr gtg frf fgf rtr gtg frf fgf rtr gtg frf fgf rtr gtg frf fgf rtr gtg frf rtr gtg frf fgf rtr gtg frf fgf rtr",
          "rgr tft gfg rtr rgr tft gfg rtr rgr tft gfg rtr rgr tft gfg rtr rgr tft gfg rtr rgr tft gfg rgr tft gfg rtr rgr tft gfg rtr rgr",
          "rtfgrtfg gftrgftr fgrtfgrt rtfgrtfg gftrgftr fgrtfgrt rtfgrtfg gftrgftr fgrtfgrt rtfgrtfg rtfgrtfg gftrgftr fgrtfgrt rtfgrtfg"
        ]
      }
    },
    {
      id: "lesson2_2",
      title: { ru: "Центр справа", de: "Zentrum rechts", en: "Right Center" },
      tips: {
        ru: [
          "Не смотри на клавиатуру! Настоящая скорость появляется тогда, когда пальцы сами находят дорогу."
        ],
        de: [
          "Schau nicht auf die Tastatur! Echte Geschwindigkeit entsteht, wenn die Finger den Weg selbst finden."
        ],
        en: [
          "Do not look at the keyboard! Real speed appears when your fingers find the way on their own."
        ]
      },
      symbolPolicy: {
        scope: "lesson",
        ru: ["г", "н", "о", "р"],
        de: ["u", "z", "j", "h"],
        en: ["u", "y", "j", "h"]
      },
      content: { lineCount: 10 },
        scoring: { accuracy: 90, speedMax: 120 },
      lines: {
        ru: [
          "гнор гнор гнор гнор ронг ронг огнр огнр гнор ронг огнр гнор ронг огнр гнор гнор ронг огнр гнор ронг огнр гнор гнор гнор гнор гнор",
          "гг нн оо рр гг рр нн оо гг оо рр нн гг нн оо рр гг рр нн оо гг оо рр нн гг нн оо рр гг рр нн оо гг оо рр гг нн оо рр гг рр нн оо",
          "гого нрнр роро гнгн гого нрнр роро гнгн гого нрнр роро гнгн гого нрнр роро гнгн гого нрнр роро гнгн гого гого нрнр роро гнгн гого",
          "огн нро рог грон огн нро рог грон огн нро рог грон огн нро рог грон огн нро рог грон огн нро рог огн нро рог грон огн нро рог",
          "гро нор орг рон гро нор орг рон гро нор орг рон гро нор орг рон гро нор орг рон гро нор орг рон гро нор орг рон гро нор орг рон",
          "ггг ннн ооо ррр ггг ннн ооо ррр ггг ннн ооо ррр ггг ннн ооо ррр ггг ннн ооо ррр ггг ннн ооо ррр ггг ннн ооо ррр ггг ннн ооо ррр",
          "ргго ноор оррг ргго ноор оррг ргго ноор оррг ргго ноор оррг ргго ноор оррг ргго ноор оррг ргго ргго ноор оррг ргго ноор оррг ргго",
          "гог нон рор оно гог нон рор оно гог нон рор оно гог нон рор оно гог нон рор оно гог нон рор гог нон рор оно гог нон рор оно гог",
          "грг нон орр гог грг нон орр гог грг нон орр гог грг нон орр гог грг нон орр гог грг нон орр грг нон орр гог грг нон орр гог грг",
          "гноргнор ронгронг огнрогнр гноргнор ронгронг огнрогнр гноргнор ронгронг огнрогнр гноргнор гноргнор ронгронг огнрогнр гноргнор"
        ],
        de: [
          "uzjh uzjh uzjh uzjh hjzu hjzu juzh juzh uzjh hjzu juzh uzjh hjzu juzh uzjh uzjh hjzu juzh uzjh hjzu juzh uzjh uzjh uzjh uzjh uzjh",
          "uu zz jj hh uu hh zz jj uu jj hh zz uu zz jj hh uu hh zz jj uu jj hh zz uu zz jj hh uu hh zz jj uu jj hh uu zz jj hh uu hh zz jj",
          "ujuj zhzh hjhj uzuz ujuj zhzh hjhj uzuz ujuj zhzh hjhj uzuz ujuj zhzh hjhj uzuz ujuj zhzh hjhj uzuz ujuj ujuj zhzh hjhj uzuz ujuj",
          "juz zhj hju uzhj juz zhj hju uzhj juz zhj hju uzhj juz zhj hju uzhj juz zhj hju uzhj juz zhj hju juz zhj hju uzhj juz zhj hju",
          "uhj zjh juh hzu uhj zjh juh hzu uhj zjh juh hzu uhj zjh juh hzu uhj zjh juh hzu uhj zjh juh hzu uhj zjh juh hzu uhj zjh juh hzu",
          "uuu zzz jjj hhh uuu zzz jjj hhh uuu zzz jjj hhh uuu zzz jjj hhh uuu zzz jjj hhh uuu zzz jjj hhh uuu zzz jjj hhh uuu zzz jjj hhh",
          "huuj zjjh jhhu huuj zjjh jhhu huuj zjjh jhhu huuj zjjh jhhu huuj zjjh jhhu huuj zjjh jhhu huuj huuj zjjh jhhu huuj zjjh jhhu huuj",
          "uju zjz hjh jhj uju zjz hjh jhj uju zjz hjh jhj uju zjz hjh jhj uju zjz hjh jhj uju zjz hjh uju zjz hjh jhj uju zjz hjh jhj uju",
          "uhu zjz jhh uju uhu zjz jhh uju uhu zjz jhh uju uhu zjz jhh uju uhu zjz jhh uju uhu zjz jhh uhu zjz jhh uju uhu zjz jhh uju uhu",
          "uzjhuzjh hjzuhjzu juzhjuzh uzjhuzjh hjzuhjzu juzhjuzh uzjhuzjh hjzuhjzu juzhjuzh uzjhuzjh uzjhuzjh hjzuhjzu juzhjuzh uzjhuzjh"
        ],
        en: [
          "uyjh uyjh uyjh uyjh hjyu hjyu juyh juyh uyjh hjyu juyh uyjh hjyu juyh uyjh uyjh hjyu juyh uyjh hjyu juyh uyjh uyjh uyjh uyjh uyjh",
          "uu yy jj hh uu hh yy jj uu jj hh yy uu yy jj hh uu hh yy jj uu jj hh yy uu yy jj hh uu hh yy jj uu jj hh uu yy jj hh uu hh yy jj",
          "ujuj yhyh hjhj uyuy ujuj yhyh hjhj uyuy ujuj yhyh hjhj uyuy ujuj yhyh hjhj uyuy ujuj yhyh hjhj uyuy ujuj ujuj yhyh hjhj uyuy ujuj",
          "juy yhj hju uyhj juy yhj hju uyhj juy yhj hju uyhj juy yhj hju uyhj juy yhj hju uyhj juy yhj hju juy yhj hju uyhj juy yhj hju",
          "uhj yjh juh hyu uhj yjh juh hyu uhj yjh juh hyu uhj yjh juh hyu uhj yjh juh hyu uhj yjh juh hyu uhj yjh juh hyu uhj yjh juh hyu",
          "uuu yyy jjj hhh uuu yyy jjj hhh uuu yyy jjj hhh uuu yyy jjj hhh uuu yyy jjj hhh uuu yyy jjj hhh uuu yyy jjj hhh uuu yyy jjj hhh",
          "huuj yjjh jhhu huuj yjjh jhhu huuj yjjh jhhu huuj yjjh jhhu huuj yjjh jhhu huuj yjjh jhhu huuj huuj yjjh jhhu huuj yjjh jhhu huuj",
          "uju yjy hjh jhj uju yjy hjh jhj uju yjy hjh jhj uju yjy hjh jhj uju yjy hjh jhj uju yjy hjh uju yjy hjh jhj uju yjy hjh jhj uju",
          "uhu yjy jhh uju uhu yjy jhh uju uhu yjy jhh uju uhu yjy jhh uju uhu yjy jhh uju uhu yjy jhh uhu yjy jhh uju uhu yjy jhh uju uhu",
          "uyjhuyjh hjyuhjyu juyhjuyh uyjhuyjh hjyuhjyu juyhjuyh uyjhuyjh hjyuhjyu juyhjuyh uyjhuyjh uyjhuyjh hjyuhjyu juyhjuyh uyjhuyjh"
        ]
      }
    },
    {
      id: "lesson2_3",
      title: { ru: "Нижний ряд", de: "Untere Reihe", en: "Bottom Row" },
      tips: {
        ru: [
          "Нажал — сразу отпустил. Короткий отскок помогает держать ритм и не уставать."
        ],
        de: [
          "Drücken - sofort loslassen. Ein kurzer Rücksprung hilft dir, den Rhythmus zu halten und nicht so schnell müde zu werden."
        ],
        en: [
          "Press, then release right away. A quick rebound helps keep the rhythm steady and prevents fatigue."
        ]
      },
      symbolPolicy: {
        scope: "lesson",
        ru: ["м", "и", "т", "ь"],
        de: ["v", "b", "n", "m"],
        en: ["v", "b", "n", "m"]
      },
      content: { lineCount: 10 },
        scoring: { accuracy: 90, speedMax: 120 },
      lines: {
        ru: [
          "мить мить мить мить ьтим ьтим имть имть мить ьтим имть мить ьтим имть мить мить ьтим имть мить ьтим имть мить мить мить мить мить",
          "мм ии тт ьь мм ьь ии тт мм тт ьь ии мм ии тт ьь мм ьь ии тт мм тт ьь ии мм ии тт ьь мм ьь ии тт мм тт ьь мм ии тт ьь мм ьь ии тт",
          "мими итиь тьть мимь мими итиь тьть мимь мими итиь тьть мимь мими итиь тьть мимь мими итиь тьть мимь мими итиь тьть мимь мими итиь",
          "имт тиь ьим мить имт тиь ьим мить имт тиь ьим мить имт тиь ьим мить имт тиь ьим мить имт тиь ьим имт тиь ьим мить имт тиь ьим",
          "мти ить тим ьим мти ить тим ьим мти ить тим ьим мти ить тим ьим мти ить тим ьим мти ить тим ьим мти ить тим ьим мти ить тим ьим",
          "ммм иии ттт ььь ммм иии ттт ььь ммм иии ттт ььь ммм иии ттт ььь ммм иии ттт ььь ммм иии ттт ььь ммм иии ттт ььь ммм иии ттт ььь",
          "ьмми итть тььм ьмми итть тььм ьмми итть тььм ьмми итть тььм ьмми итть тььм ьмми итть тььм ьмми ьмми итть тььм ьмми итть тььм ьмми",
          "мим тит ьть ими мим тит ьть ими мим тит ьть ими мим тит ьть ими мим тит ьть ими мим тит ьть мим тит ьть ими мим тит ьть ими мим",
          "мьм ити тьь мим мьм ити тьь мим мьм ити тьь мим мьм ити тьь мим мьм ити тьь мим мьм ити тьь мьм ити тьь мим мьм ити тьь мим мьм",
          "митьмить ьтимьтим имтьимть митьмить ьтимьтим имтьимть митьмить ьтимьтим имтьимть митьмить митьмить ьтимьтим имтьимть митьмить"
        ],
        de: [
          "vbnm vbnm vbnm vbnm mnbv mnbv bvmn bvmn vbnm mnbv bvmn vbnm mnbv bvmn vbnm vbnm mnbv bvmn vbnm mnbv bvmn vbnm vbnm vbnm vbnm vbnm",
          "vv bb nn mm vv mm bb nn vv nn mm bb vv bb nn mm vv mm bb nn vv nn mm bb vv bb nn mm vv mm bb nn vv nn mm vv bb nn mm vv mm bb nn",
          "vbvb bnbm nmnm vbvm vbvb bnbm nmnm vbvm vbvb bnbm nmnm vbvm vbvb bnbm nmnm vbvm vbvb bnbm nmnm vbvm vbvb bnbm nmnm vbvm vbvb bnbm",
          "bvn nbm mbv vbnm bvn nbm mbv vbnm bvn nbm mbv vbnm bvn nbm mbv vbnm bvn nbm mbv vbnm bvn nbm mbv bvn nbm mbv vbnm bvn nbm mbv",
          "vnb bnm nbv mbv vnb bnm nbv mbv vnb bnm nbv mbv vnb bnm nbv mbv vnb bnm nbv mbv vnb bnm nbv mbv vnb bnm nbv mbv vnb bnm nbv mbv",
          "vvv bbb nnn mmm vvv bbb nnn mmm vvv bbb nnn mmm vvv bbb nnn mmm vvv bbb nnn mmm vvv bbb nnn mmm vvv bbb nnn mmm vvv bbb nnn mmm",
          "mvbb bnnm nmmv mvbb bnnm nmmv mvbb bnnm nmmv mvbb bnnm nmmv mvbb bnnm nmmv mvbb bnnm nmmv mvbb mvbb bnnm nmmv mvbb bnnm nmmv mvbb",
          "vbv nbn mnm bvb vbv nbn mnm bvb vbv nbn mnm bvb vbv nbn mnm bvb vbv nbn mnm bvb vbv nbn mnm vbv nbn mnm bvb vbv nbn mnm bvb vbv",
          "vmv bnb nmm vbv vmv bnb nmm vbv vmv bnb nmm vbv vmv bnb nmm vbv vmv bnb nmm vbv vmv bnb nmm vmv bnb nmm vbv vmv bnb nmm vbv vmv",
          "vbnmvbnm mnbvmnbv bvmnbvmn vbnmvbnm mnbvmnbv bvmnbvmn vbnmvbnm mnbvmnbv bvmnbvmn vbnmvbnm vbnmvbnm mnbvmnbv bvmnbvmn vbnmvbnm"
        ],
        en: [
          "vbnm vbnm vbnm vbnm mnbv mnbv bvmn bvmn vbnm mnbv bvmn vbnm mnbv bvmn vbnm vbnm mnbv bvmn vbnm mnbv bvmn vbnm vbnm vbnm vbnm vbnm",
          "vv bb nn mm vv mm bb nn vv nn mm bb vv bb nn mm vv mm bb nn vv nn mm bb vv bb nn mm vv mm bb nn vv nn mm vv bb nn mm vv mm bb nn",
          "vbvb bnbm nmnm vbvm vbvb bnbm nmnm vbvm vbvb bnbm nmnm vbvm vbvb bnbm nmnm vbvm vbvb bnbm nmnm vbvm vbvb bnbm nmnm vbvm vbvb bnbm",
          "bvn nbm mbv vbnm bvn nbm mbv vbnm bvn nbm mbv vbnm bvn nbm mbv vbnm bvn nbm mbv vbnm bvn nbm mbv bvn nbm mbv vbnm bvn nbm mbv",
          "vnb bnm nbv mbv vnb bnm nbv mbv vnb bnm nbv mbv vnb bnm nbv mbv vnb bnm nbv mbv vnb bnm nbv mbv vnb bnm nbv mbv vnb bnm nbv mbv",
          "vvv bbb nnn mmm vvv bbb nnn mmm vvv bbb nnn mmm vvv bbb nnn mmm vvv bbb nnn mmm vvv bbb nnn mmm vvv bbb nnn mmm vvv bbb nnn mmm",
          "mvbb bnnm nmmv mvbb bnnm nmmv mvbb bnnm nmmv mvbb bnnm nmmv mvbb bnnm nmmv mvbb bnnm nmmv mvbb mvbb bnnm nmmv mvbb bnnm nmmv mvbb",
          "vbv nbn mnm bvb vbv nbn mnm bvb vbv nbn mnm bvb vbv nbn mnm bvb vbv nbn mnm bvb vbv nbn mnm vbv nbn mnm bvb vbv nbn mnm bvb vbv",
          "vmv bnb nmm vbv vmv bnb nmm vbv vmv bnb nmm vbv vmv bnb nmm vbv vmv bnb nmm vbv vmv bnb nmm vmv bnb nmm vbv vmv bnb nmm vbv vmv",
          "vbnmvbnm mnbvmnbv bvmnbvmn vbnmvbnm mnbvmnbv bvmnbvmn vbnmvbnm mnbvmnbv bvmnbvmn vbnmvbnm vbnmvbnm mnbvmnbv bvmnbvmn vbnmvbnm"
        ]
      }
    },
    {
      id: "lesson2_4",
      title: { ru: "Короткие слова", de: "Kurze Wörter", en: "Short Words" },
      tips: {
        ru: [
          "Сначала добейся точности, а уже потом ускоряйся. Быстрая печать с ошибками только закрепляет плохую привычку."
        ],
        de: [
          "Arbeite zuerst an der Genauigkeit und werde erst danach schneller. Schnelles Tippen mit Fehlern festigt nur schlechte Gewohnheiten."
        ],
        en: [
          "Build accuracy first, then speed up. Fast typing with mistakes only reinforces a bad habit."
        ]
      },
      symbolPolicy: {
        scope: "module",
        ru: ["к", "е", "а", "п", "г", "н", "о", "р", "м", "и", "т", "ь"],
        de: ["r", "t", "f", "g", "u", "z", "j", "h", "v", "b", "n", "m"],
        en: ["r", "t", "f", "g", "u", "y", "j", "h", "v", "b", "n", "m"]
      },
      content: { lineCount: 10 },
        scoring: { accuracy: 90, speed: 40 },
      lines: {
        ru: [
          "мама папа тема кит мир тир рот тон гора нора нить книга мама папа тема кит мир тир рот тон гора нора нить книга",
          "книга нора гора тема папа мама мир тир рот тон нить кит книга нора гора тема папа мама мир тир рот тон нить книга нора гора тема",
          "мир тир кит рот тон тема нора гора папа мама книга нить мир тир кит рот тон тема нора гора папа мама книга мир тир кит рот тон",
          "папа мама тема книга нора гора рот тон мир тир кит нить папа мама тема книга нора гора рот тон мир тир папа мама тема книга нора",
          "гора нора книга тема мама папа нить кит мир тир рот тон гора нора книга тема мама папа нить кит мир тир гора нора книга тема мама",
          "тема тема мама мама папа папа книга книга нора нора гора гора мир мир тир тир рот рот тон тон тема тема мама мама папа папа книга",
          "нить книга нора гора тема папа мама кит мир тир рот тон нить книга нора гора тема папа мама кит мир нить книга нора гора тема",
          "кит мир тир рот тон нить книга нора гора тема папа мама кит мир тир рот тон нить книга нора гора тема кит мир тир рот тон нить",
          "тон рот тир мир кит нить книга гора нора тема папа мама тон рот тир мир кит нить книга гора нора тема тон рот тир мир кит нить",
          "мама папа тема кит мир тир рот тон гора нора нить книга мама папа тема кит мир тир рот тон гора нора мама папа тема кит мир тир"
        ],
        de: [
          "rat gut rat tun mut rum nur hut gurt rum gurt gurt rat gut rat tun mut rum nur hut gurt rum gurt gurt rat gut rat tun mut rum",
          "rum gurt gurt gurt rat gut rat tun mut rum nur hut rum gurt gurt gurt rat gut rat tun mut rum rum gurt gurt gurt rat gut rat",
          "mut rum nur hut rat tun rat gut gurt rum gurt gurt mut rum nur hut rat tun rat gut gurt rum mut rum nur hut rat tun rat gut",
          "rat gut gurt rum gurt gurt mut rum nur hut rat tun rat gut gurt rum gurt gurt mut rum nur hut rat gut gurt rum gurt gurt mut",
          "gurt gurt rum gurt hut nur rum mut tun rat gut rat gurt gurt rum gurt hut nur rum mut tun rat gurt gurt rum gurt hut nur rum",
          "rat rat gut gut rat rat tun tun mut mut rum rum nur nur hut hut gurt gurt rum rum rat rat gut gut rat rat tun tun mut mut rum",
          "gurt rum gurt gurt rat gut rat tun mut rum nur hut gurt rum gurt gurt rat gut rat tun mut gurt rum gurt gurt rat gut rat tun",
          "rat tun mut rum nur hut gurt rum gurt gurt rat gut rat tun mut rum nur hut gurt rum gurt rat tun mut rum nur hut gurt rum gurt",
          "tun rat gut rat gurt gurt rum gurt hut nur rum mut tun rat gut rat gurt gurt rum gurt hut tun rat gut rat gurt gurt rum gurt",
          "rat gut rat tun mut rum nur hut gurt rum gurt gurt rat gut rat tun mut rum nur hut gurt rum rat gut rat tun mut rum nur hut"
        ],
        en: [
          "run rug hut hum turn burn hurt hunt grunt rum grunt run rug hut hum turn burn hurt hunt grunt rum grunt run rug hut hum turn",
          "rum grunt grunt turn run rug hut hum burn hurt hunt rum grunt grunt turn run rug hut hum burn hurt rum grunt grunt turn run",
          "hum run hurt hunt turn burn rug hut grunt rum grunt hum run hurt hunt turn burn rug hut grunt rum hum run hurt hunt turn burn",
          "run rug grunt rum grunt turn burn hum hut hurt hunt run rug grunt rum grunt turn burn hum hut hurt run rug grunt rum grunt",
          "grunt grunt rum hut hunt hurt burn turn rug run hum grunt grunt rum hut hunt hurt burn turn rug run grunt grunt rum hut hunt",
          "run run rug rug hut hut hum hum turn turn burn burn hurt hurt hunt hunt grunt grunt rum rum run run rug rug hut hut hum hum",
          "grunt rum grunt run rug hut hum turn burn hurt hunt grunt rum grunt run rug hut hum turn burn grunt rum grunt run rug hut hum",
          "hurt hunt turn burn hum hut grunt rum grunt run rug hurt hunt turn burn hum hut grunt rum grunt hurt hunt turn burn hum hut",
          "hunt hurt burn turn hum hut rug run grunt rum grunt hunt hurt burn turn hum hut rug run grunt hunt hurt burn turn hum hut rug",
          "run rug hut hum turn burn hurt hunt grunt rum grunt run rug hut hum turn burn hurt hunt grunt run rug hut hum turn burn hurt"
        ]
      }
    },
    {
      id: "lesson2_5",
      title: { ru: "Тест", de: "Test", en: "Test" },
      tips: {
        ru: [
          "Теперь без подсказок: пришло время проверить, насколько уверенно твои руки ориентируются на клавиатуре сами."
        ],
        de: [
          "Jetzt ohne Hinweise: Es ist Zeit zu prüfen, wie sicher sich deine Hände schon selbst auf der Tastatur orientieren."
        ],
        en: [
          "Now without hints: it is time to check how confidently your hands can navigate the keyboard on their own."
        ]
      },
      symbolPolicy: {
        scope: "program",
        ru: ["ф", "ы", "в", "а", "о", "л", "д", "ж", "э", "к", "е", "п", "г", "н", "р", "м", "и", "т", "ь"],
        de: ["a", "s", "d", "f", "j", "k", "l", "ö", "ä", "r", "t", "g", "u", "z", "h", "v", "b", "n", "m"],
        en: ["a", "s", "d", "f", "j", "k", "l", "r", "t", "g", "u", "y", "h", "v", "b", "n", "m"]
      },
      content: { lineCount: 15 },
        scoring: { accuracy: 90, speed: 40, assistants: false },
      lines: {
        ru: [
          "мама папа тема вода лава жало овал книга нора гора мир тир рот тон вдова элла эд мама папа тема вода мама папа тема вода лава",
          "фыва олджэ кеап гнор мить мама папа вода лава тема книга нора гора мир тир рот тон фыва олджэ фыва олджэ кеап гнор мить мама папа",
          "лава вода мама папа книга нора гора тема мир тир рот тон жало овал лад вдова элла эд лава вода лава вода мама папа книга нора",
          "к е а п г н о р м и т ь ф ы в а о л д ж э мама папа тема вода лава жало овал к е а п г н о р м и т ь ф ы в а о л д ж э мама папа",
          "мама папа тема книга нора гора рот тон мир тир кит нить вода лава жало овал лад вдова элла эд мама папа тема книга нора гора рот",
          "вал вода лава жало овал лад вдова элла эд мама папа тема книга нора гора мир тир рот тон вал вода лава жало овал лад вдова элла",
          "кеап гнор мить фыва олджэ кеап гнор мить фыва олджэ мама папа вода лава тема книга нора гора кеап гнор мить фыва олджэ кеап гнор",
          "мама мама папа папа вода вода лава лава тема тема книга книга нора нора гора гора мир мир тир тир мама мама папа папа вода вода",
          "нить книга нора гора тема папа мама кит мир тир рот тон вал вода лава жало овал лад вдова нить книга нора гора тема папа мама кит",
          "фываолджэ кеапгнор митьмить авыфэдлож мама папа тема вода лава жало овал нора гора мир тир фываолджэ кеапгнор митьмить авыфэдлож",
          "жало лава вода овал вал лад эд элла вдова мама папа тема книга нора гора мир тир рот тон жало лава вода овал вал лад эд элла",
          "вдова вода вал овал лава лад жало элла эд нить книга нора гора тема папа мама кит мир вдова вода вал овал лава лад жало элла эд",
          "элла эд вал лад вода лава жало овал вдова кеап гнор мить мама папа тема книга нора гора элла эд вал лад вода лава жало овал вдова",
          "олджэ фыва кеап гнор мить вал вода лава жало овал лад вдова элла эд мама папа тема олджэ фыва кеап гнор мить вал вода лава жало",
          "мама папа тема вода лава жало овал книга нора гора мир тир рот тон фыва олджэ кеап гнор мама папа тема вода лава жало овал книга"
        ],
        de: [
          "rat gut rat tun mut rum nur hut als das falls lass fass saal gurt rum gurt gurt rat gut rat tun rat gut rat tun mut rum nur hut",
          "asdf jklöä rtfg uzjh vbnm rat gut rat tun mut rum nur hut gurt rum gurt gurt asdf jklöä asdf jklöä rtfg uzjh vbnm rat gut rat",
          "fass lass saal fall als das da rat gut rat tun mut rum nur hut gurt rum gurt gurt fass lass fass lass saal fall als das da rat",
          "a s d f j k l ö ä r t g u z h v b n m rat gut rat tun mut rum nur hut a s d f j k l ö ä r t g u z h v b n m rat gut rat tun mut",
          "rat gut gurt rum gurt gurt mut rum nur hut rat tun als das falls lass fass saal da fall rat gut gurt rum gurt gurt mut rum nur",
          "als das falls lass fass saal da fall rat gut rat tun mut rum nur hut gurt rum gurt gurt als das falls lass fass saal da fall rat",
          "rtfg uzjh vbnm asdf jklöä rtfg uzjh vbnm asdf jklöä rat gut rat tun mut rum nur hut rtfg uzjh vbnm asdf jklöä rtfg uzjh vbnm asdf",
          "rat rat gut gut rat rat tun tun mut mut rum rum nur nur hut hut gurt gurt rum rum rat rat gut gut rat rat tun tun mut mut rum",
          "gurt rum gurt gurt rat gut rat tun mut rum nur hut als das falls lass fass saal da gurt rum gurt gurt rat gut rat tun mut rum",
          "asdfjklöä rtfguzjh vbnmvbnm adsfälökj rat gut rat tun mut rum nur hut gurt rum gurt asdfjklöä rtfguzjh vbnmvbnm adsfälökj rat",
          "fass lass saal fall da als asdf jklöä rat gut rat tun mut rum nur hut gurt rum gurt fass lass saal fall da als asdf jklöä rat",
          "fall falls als das lass fass saal da gurt rum gurt gurt rat gut rat tun mut rum fall falls als das lass fass saal da gurt rum",
          "saal da als das falls lass fass fall rtfg uzjh vbnm rat gut rat tun mut rum saal da als das falls lass fass fall rtfg uzjh vbnm",
          "jklöä asdf rtfg uzjh vbnm als das falls lass fass saal da fall rat gut rat jklöä asdf rtfg uzjh vbnm als das falls lass fass saal",
          "rat gut rat tun mut rum nur hut als das falls lass fass saal asdf jklöä rtfg uzjh rat gut rat tun mut rum nur hut als das falls"
        ],
        en: [
          "run rug hut hum turn burn hurt hunt all sad dad ask fall lass grunt rum grunt run rug hut hum run rug hut hum turn burn hurt",
          "asdf jkl rtfg uyjh vbnm run rug hut hum turn burn hurt hunt grunt rum grunt asdf jkl asdf jkl rtfg uyjh vbnm run rug hut",
          "fall lass flask glass all sad dad run rug hut hum turn burn hurt hunt grunt rum grunt fall lass fall lass flask glass all sad",
          "a s d f j k l r t g u y h v b n m run rug hut hum turn burn a s d f j k l r t g u y h v b n m run rug hut hum turn burn",
          "run rug grunt rum grunt turn burn hum hut hurt hunt all sad dad ask fall lass flask lads glass run rug grunt rum grunt turn",
          "all sad dad ask fall lass flask lads glass add run rug hut hum turn burn hurt hunt grunt rum all sad dad ask fall lass flask",
          "rtfg uyjh vbnm asdf jkl rtfg uyjh vbnm asdf jkl run rug hut hum turn burn hurt rtfg uyjh vbnm asdf jkl rtfg uyjh vbnm asdf",
          "run run rug rug hut hut hum hum turn turn burn burn hurt hurt hunt hunt grunt grunt rum rum run run rug rug hut hut hum hum",
          "grunt rum grunt run rug hut hum turn burn hurt hunt all sad dad ask fall lass flask lads grunt rum grunt run rug hut hum turn",
          "asdfjkl rtfguyjh vbnmvbnm adsf lkj run rug hut hum turn burn hurt hunt grunt rum grunt asdfjkl rtfguyjh vbnmvbnm adsf lkj",
          "fall lass flask glass add all asdf jkl run rug hut hum turn burn hurt hunt grunt rum fall lass flask glass add all asdf jkl",
          "lads fall lass flask glass add grunt rum grunt run rug hut hum turn burn hurt hunt lads fall lass flask glass add grunt rum",
          "glass add all sad dad ask fall lass rtfg uyjh vbnm run rug hut hum turn burn glass add all sad dad ask fall lass rtfg uyjh vbnm",
          "jkl asdf rtfg uyjh vbnm all sad dad ask fall lass flask lads run rug hut jkl asdf rtfg uyjh vbnm all sad dad ask fall lass",
          "run rug hut hum turn burn hurt hunt all sad dad ask fall lass asdf jkl rtfg uyjh run rug hut hum turn burn hurt hunt all sad"
        ]
      }
    }
  ]
});
