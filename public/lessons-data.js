// Curriculum database: Level 1 (A1) to Level 5 (C1 / IELTS 7.5+)
// Har bir bosqich grammatika qoidasi, yangi so'zlar, eshitish, jumla tuzish va gapirish mashqlaridan iborat.

window.ROADMAP_DATA = [
  {
    id: "level-1",
    level: "A1",
    title: "Starter / Boshlang'ich",
    description: "Ingliz tili alifbosi, salomlashish, 'To Be' fe'li, oddiy jumlalar va o'zingizni tanishtirish.",
    color: "#58cc02",
    icon: "🌱",
    units: [
      {
        id: "l1-u1",
        title: "1-Dars: Salomlashish va O'zini tanishtirish",
        subtitle: "Greetings & Self-introduction",
        grammarTip: {
          title: "'To Be' fe'li (am / is / are)",
          rule: "Ingliz tilida gap tuzishda ega va kesim doim bo'lishi shart. O'zbek tilidagi 'Men talabaman' jumlasi ingliz tilida 'I AM a student' bo'ladi.",
          examples: [
            { en: "I am Jamol.", uz: "Men Jamolman." },
            { en: "Nice to meet you!", uz: "Siz bilan tanishganimdan xursandman!" },
            { en: "Where are you from?", uz: "Qayerdansiz?" }
          ]
        },
        exercises: [
          {
            type: "vocab",
            question: "Quyidagi so'zning to'g'ri tarjimasini toping:",
            word: "Pleasure",
            options: ["Xursandchilik / Maroq", "Xafagarchilik", "Kitob", "Uy"],
            answer: 0,
            speech: "Pleasure"
          },
          {
            type: "sentence_builder",
            question: "Jumlani to'g'ri tartibda tering: 'Men O'zbekistondanman'",
            words: ["from", "I", "am", "Uzbekistan"],
            correctOrder: ["I", "am", "from", "Uzbekistan"],
            speech: "I am from Uzbekistan"
          },
          {
            type: "listening",
            question: "Audioni eshiting va to'g'ri variantni tanlang:",
            speech: "What is your name?",
            options: ["What is your name?", "Where is your car?", "How old are you?", "What do you do?"],
            answer: 0
          },
          {
            type: "speaking",
            question: "Mikrofonni bosing va ushbu gapni baland ovozda ayting:",
            targetText: "Hello, my name is Alex and I am learning English.",
            hint: "Urg'uni 'Hello' va 'Alex' so'zlariga bering."
          }
        ]
      },
      {
        id: "l1-u2",
        title: "2-Dars: Kundalik hayot va Oila",
        subtitle: "Daily Routines & Family",
        grammarTip: {
          title: "Present Simple (Oddiy hozirgi zamon)",
          rule: "Har kuni, odatda takrorlanadigan ish-harakatlar uchun ishlatiladi. He/She/It uchun fe'lga -s/-es qo'shiladi.",
          examples: [
            { en: "I wake up at 7 AM.", uz: "Men soat 7 da uyg'onaman." },
            { en: "She drinks coffee every morning.", uz: "U har kuni ertalab kofe ichadi." }
          ]
        },
        exercises: [
          {
            type: "vocab",
            question: "'Sibling' so'zining ma'nosi nima?",
            word: "Sibling",
            options: ["Aka-uka yoki opa-singil", "Ota-ona", "Qo'shni", "Do'st"],
            answer: 0,
            speech: "Sibling"
          },
          {
            type: "sentence_builder",
            question: "Jumlani to'g'ri tartibda tering: 'U har kuni kitob o'qiydi'",
            words: ["reads", "every", "She", "day", "books"],
            correctOrder: ["She", "reads", "books", "every", "day"],
            speech: "She reads books every day"
          },
          {
            type: "speaking",
            question: "Mikrofon orqali ayting:",
            targetText: "I usually have breakfast with my family.",
            hint: "'usually' talaffuziga e'tibor bering: [yu-ju-a-li]"
          }
        ]
      }
    ]
  },
  {
    id: "level-2",
    level: "A2",
    title: "Elementary / O'rta-Quyi",
    description: "O'tgan zamon (Past Simple), sayohatlar, do'konlarda xarid va shaxsiy taassurotlar.",
    color: "#1cb0f6",
    icon: "🚀",
    units: [
      {
        id: "l2-u1",
        title: "1-Dars: O'tgan zamonda so'zlash (Past Simple)",
        subtitle: "Talking about the Past",
        grammarTip: {
          title: "Past Simple (O'tgan oddiy zamon)",
          rule: "O'tib ketgan aniq vaqtdagi ish-harakat. To'g'ri fe'llarga -ed qo'shiladi, noto'g'ri fe'llar 2-shakliga (V2) o'zgaradi (go -> went, see -> saw).",
          examples: [
            { en: "I visited London last summer.", uz: "O'tgan yozda Londonga bordim." },
            { en: "Did you enjoy the movie?", uz: "Film sizga yoqdimi?" }
          ]
        },
        exercises: [
          {
            type: "vocab",
            question: "'Yesterday' so'zining to'g'ri tarjimasi:",
            word: "Yesterday",
            options: ["Kecha", "Bugun", "Ertaga", "O'tgan hafta"],
            answer: 0,
            speech: "Yesterday"
          },
          {
            type: "sentence_builder",
            question: "Jumlani tuzing: 'Biz kecha yangi mashina sotib oldik'",
            words: ["a", "We", "yesterday", "car", "bought", "new"],
            correctOrder: ["We", "bought", "a", "new", "car", "yesterday"],
            speech: "We bought a new car yesterday"
          },
          {
            type: "speaking",
            question: "Mikrofon orqali ravon ayting:",
            targetText: "Last weekend was amazing because I visited my grandparents.",
            hint: "O'tgan zamon 'visited' [vi-zi-tid] so'zini aniq talaffuz qiling."
          }
        ]
      },
      {
        id: "l2-u2",
        title: "2-Dars: Restoran va Kafeda buyurtma berish",
        subtitle: "At the Restaurant & Cafe",
        grammarTip: {
          title: "Polite Requests: 'Would like' va 'Could I have'",
          rule: "Do'konda yoki kafeda 'I want' (men xohlayman) o'rniga muloyimlik bilan 'I would like' yoki 'Could I please have' ishlatiladi.",
          examples: [
            { en: "Could I have a cup of coffee, please?", uz: "Iltimos, bir chashka kofe bersangiz?" },
            { en: "I'd like to pay by card.", uz: "Karta orqali to'lamoqchiman." }
          ]
        },
        exercises: [
          {
            type: "vocab",
            question: "'Appetizer' nimani anglatadi?",
            word: "Appetizer",
            options: ["Asosiy taomdan oldingi yengil tamaddi", "Shirinlik", "Hisob-kitob cheki", "Ichimlik"],
            answer: 0,
            speech: "Appetizer"
          },
          {
            type: "sentence_builder",
            question: "Jumlani tering: 'Iltimos, hisobni olib kela olasizmi?'",
            words: ["we", "please?", "have", "the", "bill,", "Could"],
            correctOrder: ["Could", "we", "have", "the", "bill,", "please?"],
            speech: "Could we have the bill, please?"
          },
          {
            type: "speaking",
            question: "Ofitsiantga buyurtma bering (Mikrofonga ayting):",
            targetText: "Excuse me, could I get a bottle of sparkling water, please?",
            hint: "Muloyim intonatsiya bilan talaffuz qiling."
          }
        ]
      }
    ]
  },
  {
    id: "level-3",
    level: "B1",
    title: "Intermediate / O'rta",
    description: "Fikr bildirish, Present Perfect, tajribalar, shartli gaplar (Conditionals) va erkin suhbat.",
    color: "#ff9600",
    icon: "🔥",
    units: [
      {
        id: "l3-u1",
        title: "1-Dars: Tajribalar va Natija (Present Perfect)",
        subtitle: "Experiences & Life Events",
        grammarTip: {
          title: "Present Perfect (have/has + V3)",
          rule: "Vaqti noma'lum yoki hayotiy tajriba haqida gapirganda ishlatiladi. 'Ever' (qachondir) va 'Never' (hech qachon) so'zlari bilan ko'p keladi.",
          examples: [
            { en: "Have you ever traveled abroad?", uz: "Hech chet elga sayohat qilganmisiz?" },
            { en: "I have already finished my project.", uz: "Men loyihamni allaqachon tugatdim." }
          ]
        },
        exercises: [
          {
            type: "vocab",
            question: "'Overcome' so'zi qanday ma'no beradi?",
            word: "Overcome",
            options: ["Qiyinchilikni yengib o'tish", "Qochib ketish", "Unutish", "Ko'paytirish"],
            answer: 0,
            speech: "Overcome"
          },
          {
            type: "sentence_builder",
            question: "Tuzing: 'Men hech qachon bunday qiziq film ko'rmaganman'",
            words: ["seen", "such", "an", "never", "movie", "have", "I", "interesting"],
            correctOrder: ["I", "have", "never", "seen", "such", "an", "interesting", "movie"],
            speech: "I have never seen such an interesting movie"
          },
          {
            type: "speaking",
            question: "Mikrofon orqali ayting:",
            targetText: "I have worked in this field for three years and I have gained great experience.",
            hint: "'three years' va 'gained' so'zlarini bog'lab ayting."
          }
        ]
      },
      {
        id: "l3-u2",
        title: "2-Dars: Shart mayli (Second Conditional - Orzular)",
        subtitle: "Imaginary Situations & Dreams",
        grammarTip: {
          title: "If + Past Simple, would + Verb",
          rule: "Hozirgi vaqtdagi noreal, xayoliy vaziyatlar uchun. Masalan: 'Agar millioner bo'lganimda, dunyo bo'ylab sayohat qilardim.'",
          examples: [
            { en: "If I won a lottery, I would buy a house.", uz: "Agar lotereya yutsam, uy sotib olardim." },
            { en: "If I were you, I would study harder.", uz: "Sening o'rningda bo'lganimda, qattiqroq o'qirdim." }
          ]
        },
        exercises: [
          {
            type: "vocab",
            question: "'Hypothetical' so'zining ma'nosi:",
            word: "Hypothetical",
            options: ["Faraziy / taxminiy", "Aniq isbotlangan", "Xavfli", "Qimmatbaho"],
            answer: 0,
            speech: "Hypothetical"
          },
          {
            type: "speaking",
            question: "Mikrofonga ravon ayting:",
            targetText: "If I had more free time, I would learn how to play the guitar.",
            hint: "If-gap qismini pauzasiz ayting."
          }
        ]
      }
    ]
  },
  {
    id: "level-4",
    level: "B2",
    title: "Upper-Intermediate / Yuqori-O'rta",
    description: "Bahs-munozara, murakkab grammatika, idiomalar va ishbilarmonlik suhbatlari.",
    color: "#ff4b4b",
    icon: "💎",
    units: [
      {
        id: "l4-u1",
        title: "1-Dars: Argument va Fikr Bildirish (Debate & Opinion)",
        subtitle: "Expressing Nuanced Opinions",
        grammarTip: {
          title: "Advanced Linking Words & Transitions",
          rule: "Fikringizni bog'lashda 'also', 'and', 'but' o'rniga 'Furthermore', 'Consequently', 'On the contrary', 'In spite of' iboralarini ishlating.",
          examples: [
            { en: "Moreover, technology significantly boosts productivity.", uz: "Qolaversa, texnologiya unumdorlikni sezilarli darajada oshiradi." },
            { en: "From my perspective, this approach is more practical.", uz: "Mening nuqtai nazarimdan, bu usul ancha amaliyroq." }
          ]
        },
        exercises: [
          {
            type: "vocab",
            question: "'Crucial' so'zining eng yaqin sinonimi:",
            word: "Crucial",
            options: ["Extremely important / Vital", "Unimportant", "Slow", "Funny"],
            answer: 0,
            speech: "Crucial"
          },
          {
            type: "sentence_builder",
            question: "Jumlani tering:",
            words: ["perspective,", "education", "my", "investment.", "From", "is", "the", "best"],
            correctOrder: ["From", "my", "perspective,", "education", "is", "the", "best", "investment."],
            speech: "From my perspective, education is the best investment."
          },
          {
            type: "speaking",
            question: "Mikrofon orqali o'z fikringizni ifoda eting:",
            targetText: "Although artificial intelligence has numerous advantages, we must remain cautious regarding data privacy.",
            hint: "Ushbu jumla B2 darajadagi sintaksisga ega. Har bir so'zni aniq talaffuz qiling."
          }
        ]
      },
      {
        id: "l4-u2",
        title: "2-Dars: Ish intervyusi va Professional nutq",
        subtitle: "Job Interviews & Career Fluency",
        grammarTip: {
          title: "STAR Metodi (Situation, Task, Action, Result)",
          rule: "Ish intervyusida savollarga javob berganda: Vaziyatni tushuntiring, vazifangizni ayting, qanday chora ko'rganingizni va yakuniy natijani raqamlar bilan ko'rsating.",
          examples: [
            { en: "I spearheaded a project that increased efficiency by 25%.", uz: "Men samaradorlikni 25% ga oshirgan loyihaga boshchilik qildim." }
          ]
        },
        exercises: [
          {
            type: "vocab",
            question: "'Spearhead' fe'lining ma'nosi nima?",
            word: "Spearhead",
            options: ["Loyiha yoki tashabbusga yetakchilik qilish", "Rad etish", "Pul tejash", "Ishdan bo'shatish"],
            answer: 0,
            speech: "Spearhead"
          },
          {
            type: "speaking",
            question: "O'zingizning kuchli tomoningizni mikrofonga ayting:",
            targetText: "My greatest strength is my ability to solve complex problems under tight deadlines.",
            hint: "Professional va ishonchli ohangda gapiring."
          }
        ]
      }
    ]
  },
  {
    id: "level-5",
    level: "C1 / IELTS",
    title: "Mastery / IELTS 7.5+ Band",
    description: "IELTS Speaking Part 1, Part 2 (Cue Card), Part 3 savollari, Idiomatik iboralar va 7.5+ Band kriteriyalari.",
    color: "#a855f7",
    icon: "👑",
    units: [
      {
        id: "l5-u1",
        title: "1-Dars: IELTS Speaking Part 1 Strategiyasi",
        subtitle: "Expanding Answers without Hesitation",
        grammarTip: {
          title: "IELTS 4 Ta Mezon (Assessment Criteria)",
          rule: "1. Fluency & Coherence (to'xtalmasdan ravon gapirish)\n2. Lexical Resource (kam uchraydigan sinonimlar)\n3. Grammatical Range & Accuracy (murakkab zamonlar va nisbatlar)\n4. Pronunciation (intonatsiya va urg'u)",
          examples: [
            { en: "Instead of 'I like it', say 'I am genuinely enthusiastic about...'", uz: "'Menga yoqadi' o'rniga 'Men ... ga chin dildan qiziqaman' deng." }
          ]
        },
        exercises: [
          {
            type: "vocab",
            question: "'Inevitably' so'zining ma'nosi nima?",
            word: "Inevitably",
            options: ["Muqarrar ravishda / qochib bo'lmas tarzda", "Tasodifan", "Kamdan-kam", "Hech qachon"],
            answer: 0,
            speech: "Inevitably"
          },
          {
            type: "sentence_builder",
            question: "IELTS Part 1 javobini tuzing:",
            words: ["avid", "reader", "unwind", "I", "an", "because", "books", "help", "me", "am"],
            correctOrder: ["I", "am", "an", "avid", "reader", "because", "books", "help", "me", "unwind"],
            speech: "I am an avid reader because books help me unwind"
          },
          {
            type: "speaking",
            question: "IELTS Band 8.0 namunaviy javobni mikrofonga ayting:",
            targetText: "To be completely honest, I have always been fascinated by sustainable architecture because it harmonizes modern living with environmental preservation.",
            hint: "Baland, ravon va ishonch bilan gapiring. Pauza qilmang."
          }
        ]
      },
      {
        id: "l5-u2",
        title: "2-Dars: IELTS Part 2 (Cue Card) va Part 3 Deep Discussion",
        subtitle: "2-Minute Monologue & Abstract Ideas",
        grammarTip: {
          title: "Part 2 PPF Metodi (Past, Present, Future)",
          rule: "Kartochka bo'yicha 2 daqiqa gapirayotganda to'xtab qolmaslik uchun: voqeaning o'tmishini (Past), hozirgi holatini (Present) va kelajakdagi o'rnini (Future) ketma-ket tasvirlang!",
          examples: [
            { en: "Looking back, that experience was a pivotal turning point in my personal growth.", uz: "Orqaga nazar tashlasam, bu tajriba shaxsiy rivojlanishimda burilish nuqtasi bo'lgan." }
          ]
        },
        exercises: [
          {
            type: "vocab",
            question: "'Pivotal turning point' iborasi nimani bildiradi?",
            word: "Pivotal turning point",
            options: ["Hal qiluvchi burilish nuqtasi", "Kichik adashish", "Tugallanmagan reja", "Qiziq film"],
            answer: 0,
            speech: "Pivotal turning point"
          },
          {
            type: "speaking",
            question: "Part 3 mavhum falsafiy javobni mikrofonga ayting:",
            targetText: "There is no denying that technological advancements have drastically revolutionized our daily communication, albeit occasionally diminishing genuine human empathy.",
            hint: "Ushbu jumla IELTS 8.5 darajasidagi leksika va sintaksisga ega."
          }
        ]
      }
    ]
  }
];

// Shadowing mashqlari bazasi (Talaffuz va ravonlikni oshirish uchun)
window.SHADOWING_DRILLS = [
  {
    id: "sh-1",
    level: "A1-A2",
    title: "Self Introduction & Daily Life",
    text: "Hello everyone! My name is Sarah and I am currently working as a software developer. In my spare time, I love reading books and exploring new places.",
    uzbek: "Hammaga salom! Mening ismim Sara va men ayni damda dasturchi bo'lib ishlayman. Bo'sh vaqtimda kitob o'qishni va yangi joylarni kashf qilishni yaxshi ko'raman.",
    phonetic: "/həˈloʊ ˈɛvriˌwʌn! maɪ neɪm ɪz ˈsɛərə.../",
    tips: "Har bir so'z orasidagi bog'lanishga (linking) e'tibor bering: 'name is' -> [neymiz]."
  },
  {
    id: "sh-2",
    level: "B1-B2",
    title: "Overcoming Challenges & Motivation",
    text: "Success doesn't happen overnight. It requires consistent effort, resilience, and the willingness to learn from your mistakes every single day.",
    uzbek: "Muvaffaqiyat bir kechada kelmaydi. U doimiy harakat, chidamlilik va har kuni xatolardan saboq olishga tayyor bo'lishni talab qiladi.",
    phonetic: "/səkˈsɛs ˈdʌznt ˈhæpən ˌoʊvərˈnaɪt.../",
    tips: "'doesn't happen overnight' iborasini bir nafasda ravon ayting."
  },
  {
    id: "sh-3",
    level: "C1 / IELTS 7.5+",
    title: "IELTS Speaking Part 3: Future of Education",
    text: "Undoubtedly, digital learning platforms will continue to complement traditional schooling, empowering individuals worldwide with unprecedented access to knowledge.",
    uzbek: "Shubhasiz, raqamli ta'lim platformalari an'anaviy maktab ta'limini to'ldirishda davom etadi va butun dunyo bo'ylab insonlarga bilim olishda misli ko'rilmagan imkoniyat beradi.",
    phonetic: "/ʌnˈdaʊtɪdli, ˈdɪdʒɪtl ˈlɜːrnɪŋ ˈplætfɔːrmz.../",
    tips: "'Undoubtedly' va 'unprecedented' kabi akademik so'zlarni ohangdor va intonatsiya bilan talaffuz qiling."
  }
];

// Kitoblar va Ilmiy Metodlar bazasi
window.EXPERT_RESOURCES = [
  {
    title: "Raymond Murphy: Essential Grammar in Use & English Grammar in Use",
    category: "Grammatika (Oltin Standart)",
    level: "A1 dan B2 gacha",
    summary: "Dunyodagi eng mashhur va sinalgan grammatika kitobi. Chap betda qoida, o'ng betda amaliy mashq.",
    actionableAdvice: "Faqat mashqlarni to'ldirib qo'ymang! Har bir qoidani o'qigach, o'z hayotingizdan kelib chiqib 3 ta gap tuzing va uni mikrofonga baland ovozda gapirib ko'ring."
  },
  {
    title: "Shadowing Metodikasi (Professor Alexander Arguelles metodi)",
    category: "Speaking & Pronunciation",
    level: "Barcha darajalar",
    summary: "Native speaker (ona tili ingliz bo'lgan shaxs) gapirayotgan paytda uning orqasidan 0.2 soniya farq bilan so'zma-so'z, intonatsiyasini taqlid qilib birga qaytarish.",
    actionableAdvice: "Kuniga 15 daqiqa TED Talk yoki BBC yangiliklarini quloqchin taqib, spiker bilan bir vaqtda gapiring. Bu miyangizdagi 'o'zbekchadan inglizchaga tarjima qilish' to'sig'ini sindiradi."
  },
  {
    title: "Makkar IELTS Speaking & Cambridge IELTS 10-19",
    category: "IELTS Imtihoniga Tayyorgarlik",
    level: "B2 dan C1 gacha",
    summary: "Haqiqiy imtihonlarda tushadigan barcha Part 1, Part 2 (Cue card) va Part 3 mavzulari to'plami.",
    actionableAdvice: "Savollarga javob berayotganda 'yodlangan' shablonlardan qoching. AI Speaking Tutor bilan real vaqtda simulyatsiya qiling."
  },
  {
    title: "Spaced Repetition (SRS) - Interval bilan takrorlash",
    category: "So'z boyligi (Vocabulary)",
    level: "Barcha darajalar",
    summary: "Yangi so'zlarni unutilish egri chizig'i (Ebbinghaus curve) bo'yicha: 1-kun, 3-kun, 7-kun va 30-kunda takrorlash.",
    actionableAdvice: "Kuniga 10 tadan ortiq yangi so'z yodlamang. Eng muhimi ularni kontekstda va jumlalar ichida ishlating."
  }
];
