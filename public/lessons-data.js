// Curriculum database: Level 1 (A1) to Level 5 (C1 / IELTS 7.5+)
// HAR BIR DARS: 1) O'rgatish (Teaching) -> 2) Mashqlar (Exercises)
// Avval so'z va grammatika o'rgatiladi, keyin savol-javob bo'ladi.

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
        // ===== O'RGATISH BOSQICHI =====
        teaching: {
          title: "📖 Yangi So'zlar va Grammatika",
          intro: "Bu darsda salomlashish va o'zingizni tanishtirish uchun kerakli so'z va iboralarni o'rganasiz.",
          vocabulary: [
            {
              word: "Hello",
              meaning: "Salom",
              pronunciation: "[hə-ˈloʊ]",
              example: "Hello! How are you?",
              exampleUz: "Salom! Qandaysiz?",
              audioText: "Hello"
            },
            {
              word: "Pleasure",
              meaning: "Xursandchilik, mamnuniyat",
              pronunciation: "[ˈpleʒ-ər]",
              example: "It's a pleasure to meet you.",
              exampleUz: "Siz bilan tanishganimdan xursandman.",
              audioText: "Pleasure"
            },
            {
              word: "Name",
              meaning: "Ism",
              pronunciation: "[neɪm]",
              example: "My name is Alex.",
              exampleUz: "Mening ismim Aleks.",
              audioText: "Name"
            },
            {
              word: "From",
              meaning: "...dan (joy bildiradi)",
              pronunciation: "[frʌm]",
              example: "I am from Uzbekistan.",
              exampleUz: "Men O'zbekistondanman.",
              audioText: "From"
            }
          ],
          grammarLesson: {
            title: "'To Be' fe'li — am / is / are",
            explanation: "Ingliz tilida har bir gapda FE'L bo'lishi shart. O'zbek tilida 'Men talabaman' desak, ingliz tilida 'I AM a student' deyiladi. 'Am/is/are' — bu 'to be' fe'lining shakllari.",
            rules: [
              { subject: "I", verb: "am", example: "I am happy.", exampleUz: "Men xursandman." },
              { subject: "You / We / They", verb: "are", example: "You are kind.", exampleUz: "Siz mehribonsiz." },
              { subject: "He / She / It", verb: "is", example: "She is a teacher.", exampleUz: "U o'qituvchi." }
            ]
          }
        },
        // ===== MASHQLAR =====
        exercises: [
          {
            type: "vocab",
            question: "Quyidagi so'zning to'g'ri tarjimasini toping:",
            word: "Pleasure",
            options: ["Xursandchilik / Mamnuniyat", "Xafagarchilik", "Kitob", "Uy"],
            answer: 0,
            speech: "Pleasure"
          },
          {
            type: "vocab",
            question: "'From' so'zi nimani bildiradi?",
            word: "From",
            options: ["...dan (joy bildiradi)", "...gacha", "Ichida", "Ustida"],
            answer: 0,
            speech: "From"
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
        teaching: {
          title: "📖 Yangi So'zlar va Grammatika",
          intro: "Bu darsda oila a'zolari va kundalik tartib haqida gaplashamiz.",
          vocabulary: [
            {
              word: "Sibling",
              meaning: "Aka-uka yoki opa-singil",
              pronunciation: "[ˈsɪb-lɪŋ]",
              example: "I have two siblings.",
              exampleUz: "Mening ikki aka-ukam/opa-singlim bor.",
              audioText: "Sibling"
            },
            {
              word: "Wake up",
              meaning: "Uyg'onmoq",
              pronunciation: "[weɪk ʌp]",
              example: "I wake up at 7 AM every day.",
              exampleUz: "Men har kuni soat 7 da uyg'onaman.",
              audioText: "Wake up"
            },
            {
              word: "Usually",
              meaning: "Odatda",
              pronunciation: "[ˈjuː-ʒu-ə-li]",
              example: "I usually have breakfast with my family.",
              exampleUz: "Men odatda oilam bilan nonushta qilaman.",
              audioText: "Usually"
            },
            {
              word: "Breakfast",
              meaning: "Nonushta, ertalabki ovqat",
              pronunciation: "[ˈbrek-fəst]",
              example: "She has breakfast at 8 AM.",
              exampleUz: "U soat 8 da nonushta qiladi.",
              audioText: "Breakfast"
            }
          ],
          grammarLesson: {
            title: "Present Simple — Oddiy Hozirgi Zamon",
            explanation: "Har kuni takrorlanadigan ish-harakatlar uchun ishlatiladi. He/She/It bilan fe'lga -s yoki -es qo'shiladi.",
            rules: [
              { subject: "I / You / We / They", verb: "go", example: "I go to school.", exampleUz: "Men maktabga boraman." },
              { subject: "He / She / It", verb: "goes", example: "She goes to work.", exampleUz: "U ishga boradi." },
              { subject: "Inkor (Negative)", verb: "don't / doesn't", example: "I don't like coffee.", exampleUz: "Men kofe yoqtirmayman." }
            ]
          }
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
            type: "vocab",
            question: "'Usually' so'zi qanday tarjima qilinadi?",
            word: "Usually",
            options: ["Odatda", "Ba'zan", "Hech qachon", "Har doim"],
            answer: 0,
            speech: "Usually"
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
        teaching: {
          title: "📖 Yangi So'zlar va Grammatika",
          intro: "Bu darsda o'tgan zamon haqida gapirishni o'rganasiz. Kecha nima qilganingizni aytishni mashq qilasiz.",
          vocabulary: [
            {
              word: "Yesterday",
              meaning: "Kecha",
              pronunciation: "[ˈjes-tər-deɪ]",
              example: "I went to the park yesterday.",
              exampleUz: "Kecha parkka bordim.",
              audioText: "Yesterday"
            },
            {
              word: "Visited",
              meaning: "Tashrif buyurdi, bordi",
              pronunciation: "[ˈvɪz-ɪ-tɪd]",
              example: "She visited her grandmother last week.",
              exampleUz: "U o'tgan hafta buvisi yoniga bordi.",
              audioText: "Visited"
            },
            {
              word: "Bought",
              meaning: "Sotib oldi (buy ning o'tgan zamoni)",
              pronunciation: "[bɔːt]",
              example: "We bought a new car.",
              exampleUz: "Biz yangi mashina sotib oldik.",
              audioText: "Bought"
            },
            {
              word: "Amazing",
              meaning: "Hayratlanarli, ajoyib",
              pronunciation: "[ə-ˈmeɪ-zɪŋ]",
              example: "The movie was amazing!",
              exampleUz: "Film ajoyib edi!",
              audioText: "Amazing"
            }
          ],
          grammarLesson: {
            title: "Past Simple — O'tgan Oddiy Zamon",
            explanation: "O'tmishda sodir bo'lgan aniq vaqtdagi harakatlar uchun ishlatiladi. To'g'ri fe'llarga -ed qo'shiladi. Noto'g'ri fe'llar alohida shaklga ega (V2).",
            rules: [
              { subject: "To'g'ri fe'l (+ed)", verb: "visited, played, walked", example: "I visited London.", exampleUz: "Men Londonga bordim." },
              { subject: "Noto'g'ri fe'l (V2)", verb: "went, saw, bought", example: "She went to school.", exampleUz: "U maktabga bordi." },
              { subject: "Savol shakli", verb: "Did + V1?", example: "Did you enjoy it?", exampleUz: "Sizga yoqdimi?" }
            ]
          }
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
            type: "vocab",
            question: "'Bought' so'zi qaysi fe'lning o'tgan zamoni?",
            word: "Bought",
            options: ["Buy (sotib olmoq)", "Bring (olib kelmoq)", "Build (qurmoq)", "Break (sindirmoq)"],
            answer: 0,
            speech: "Bought"
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
        teaching: {
          title: "📖 Yangi So'zlar va Grammatika",
          intro: "Bu darsda kafeda va restoranda odobli tarzda buyurtma berishni o'rganasiz.",
          vocabulary: [
            {
              word: "Appetizer",
              meaning: "Asosiy taomdan oldingi yengil tamaddi",
              pronunciation: "[ˈæp-ɪ-taɪ-zər]",
              example: "Would you like an appetizer?",
              exampleUz: "Yengil tamaddi olasizmi?",
              audioText: "Appetizer"
            },
            {
              word: "Bill",
              meaning: "Hisob, chek",
              pronunciation: "[bɪl]",
              example: "Could we have the bill, please?",
              exampleUz: "Hisobni olib kela olasizmi?",
              audioText: "Bill"
            },
            {
              word: "Sparkling",
              meaning: "Gazli (suv haqida)",
              pronunciation: "[ˈspɑːr-klɪŋ]",
              example: "A bottle of sparkling water, please.",
              exampleUz: "Bir shisha gazli suv, iltimos.",
              audioText: "Sparkling"
            },
            {
              word: "Excuse me",
              meaning: "Kechirasiz (e'tibor jalb qilish uchun)",
              pronunciation: "[ɪk-ˈskjuːz miː]",
              example: "Excuse me, where is the restroom?",
              exampleUz: "Kechirasiz, hojatxona qayerda?",
              audioText: "Excuse me"
            }
          ],
          grammarLesson: {
            title: "Odobli So'rov — Could I / Would like",
            explanation: "'I want' (men xohlayman) — bu juda qo'pol. Kafeda yoki do'konda 'Could I have...' yoki 'I would like...' deb so'rashingiz kerak.",
            rules: [
              { subject: "Odobli so'rov", verb: "Could I have...?", example: "Could I have a menu, please?", exampleUz: "Iltimos, menyuni olsam bo'ladimi?" },
              { subject: "Xohish bildirish", verb: "I'd like...", example: "I'd like a cup of tea.", exampleUz: "Bir chashka choy olsam." },
              { subject: "Savol", verb: "Would you like...?", example: "Would you like dessert?", exampleUz: "Shirinlik olasizmi?" }
            ]
          }
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
        teaching: {
          title: "📖 Yangi So'zlar va Grammatika",
          intro: "Bu darsda hayotiy tajribalar va natijalar haqida gapirishni o'rganasiz. 'Have you ever...?' savoliga javob berishni mashq qilasiz.",
          vocabulary: [
            {
              word: "Overcome",
              meaning: "Qiyinchilikni yengib o'tmoq",
              pronunciation: "[ˌoʊ-vər-ˈkʌm]",
              example: "She overcame her fear of flying.",
              exampleUz: "U uchishdan qo'rqishni yengib o'tdi.",
              audioText: "Overcome"
            },
            {
              word: "Experience",
              meaning: "Tajriba",
              pronunciation: "[ɪk-ˈspɪr-i-əns]",
              example: "I gained a lot of experience.",
              exampleUz: "Men ko'p tajriba ortirdim.",
              audioText: "Experience"
            },
            {
              word: "Already",
              meaning: "Allaqachon",
              pronunciation: "[ɔːl-ˈred-i]",
              example: "I have already eaten.",
              exampleUz: "Men allaqachon ovqatlandim.",
              audioText: "Already"
            },
            {
              word: "Abroad",
              meaning: "Chet elda / Chet elga",
              pronunciation: "[ə-ˈbrɔːd]",
              example: "Have you ever been abroad?",
              exampleUz: "Hech chet elda bo'lganmisiz?",
              audioText: "Abroad"
            }
          ],
          grammarLesson: {
            title: "Present Perfect — have/has + V3",
            explanation: "Hayotiy tajriba yoki vaqti aniq bo'lmagan o'tgan voqealar uchun ishlatiladi. 'I have been' = 'Men bo'lganman'. Past Simple dan farqi: aniq vaqt aytilmaydi.",
            rules: [
              { subject: "I / You / We / They", verb: "have + V3", example: "I have visited Paris.", exampleUz: "Men Parijda bo'lganman." },
              { subject: "He / She / It", verb: "has + V3", example: "She has learned English.", exampleUz: "U ingliz tilini o'rgangan." },
              { subject: "Savol", verb: "Have/Has + S + V3?", example: "Have you ever seen a whale?", exampleUz: "Hech kit ko'rganmisiz?" }
            ]
          }
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
            type: "vocab",
            question: "'Abroad' so'zi nimani bildiradi?",
            word: "Abroad",
            options: ["Chet elda / Chet elga", "Yaqin atrofda", "Uy ichida", "Maktabda"],
            answer: 0,
            speech: "Abroad"
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
        teaching: {
          title: "📖 Yangi So'zlar va Grammatika",
          intro: "Bu darsda xayoliy vaziyatlar haqida gapirishni o'rganasiz. 'Agar ... bo'lganimda, ... qilardim' tipidagi gaplar.",
          vocabulary: [
            {
              word: "Hypothetical",
              meaning: "Faraziy, taxminiy",
              pronunciation: "[ˌhaɪ-pə-ˈθet-ɪ-kəl]",
              example: "This is a hypothetical situation.",
              exampleUz: "Bu faraziy vaziyat.",
              audioText: "Hypothetical"
            },
            {
              word: "Lottery",
              meaning: "Lotereya",
              pronunciation: "[ˈlɑː-tər-i]",
              example: "If I won the lottery, I would travel.",
              exampleUz: "Agar lotereya yutsam, sayohat qilardim.",
              audioText: "Lottery"
            },
            {
              word: "Would",
              meaning: "...ar edi (shartli)",
              pronunciation: "[wʊd]",
              example: "I would help you if I could.",
              exampleUz: "Imkonim bo'lsa, sizga yordam berardim.",
              audioText: "Would"
            }
          ],
          grammarLesson: {
            title: "Second Conditional — If + Past, would + V1",
            explanation: "Hozirgi vaqtdagi noreal (xayoliy) vaziyatlar uchun. 'If I were rich' = 'Agar boy bo'lganimda'. ESLATMA: 'If I were' (NOT 'If I was') — bu grammatik qoida!",
            rules: [
              { subject: "Shakl", verb: "If + Past Simple, would + V1", example: "If I had money, I would buy a car.", exampleUz: "Pulim bo'lsa, mashina sotib olardim." },
              { subject: "To be (maxsus)", verb: "If I were...", example: "If I were you, I would study more.", exampleUz: "Sizning o'rningizda bo'lsam, ko'proq o'qirdim." },
              { subject: "Inkor", verb: "wouldn't", example: "If it rained, I wouldn't go out.", exampleUz: "Yomg'ir yog'sa, tashqariga chiqmasdim." }
            ]
          }
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
        teaching: {
          title: "📖 Yangi So'zlar va Grammatika",
          intro: "Bu darsda fikr bildirish, argument keltirish va bog'lovchi so'zlarni o'rganasiz. IELTS da juda kerakli!",
          vocabulary: [
            {
              word: "Crucial",
              meaning: "Juda muhim, hal qiluvchi",
              pronunciation: "[ˈkruː-ʃəl]",
              example: "Education is crucial for success.",
              exampleUz: "Ta'lim muvaffaqiyat uchun juda muhim.",
              audioText: "Crucial"
            },
            {
              word: "Furthermore",
              meaning: "Bundan tashqari, qolaversa",
              pronunciation: "[ˈfɜːr-ðər-mɔːr]",
              example: "Furthermore, we need more data.",
              exampleUz: "Bundan tashqari, bizga ko'proq ma'lumot kerak.",
              audioText: "Furthermore"
            },
            {
              word: "Perspective",
              meaning: "Nuqtai nazar, ko'rish burchagi",
              pronunciation: "[pər-ˈspek-tɪv]",
              example: "From my perspective, this is wrong.",
              exampleUz: "Mening nuqtai nazarimdan, bu noto'g'ri.",
              audioText: "Perspective"
            },
            {
              word: "Consequently",
              meaning: "Natijada, shuning uchun",
              pronunciation: "[ˈkɑːn-sɪ-kwent-li]",
              example: "He didn't study. Consequently, he failed.",
              exampleUz: "U o'qimadi. Natijada, yiqildi.",
              audioText: "Consequently"
            }
          ],
          grammarLesson: {
            title: "Bog'lovchi so'zlar (Linking Words) — B2 daraja",
            explanation: "Oddiy 'and/but/so' o'rniga B2+ darajadagi bog'lovchi iboralarni ishlating. Bu IELTS da yuqori ball olishga yordam beradi.",
            rules: [
              { subject: "Qo'shimcha fikr", verb: "Moreover / Furthermore / In addition", example: "Moreover, reading improves vocabulary.", exampleUz: "Qolaversa, o'qish so'z boyligini oshiradi." },
              { subject: "Qarama-qarshi fikr", verb: "However / On the contrary / Nevertheless", example: "However, not everyone agrees.", exampleUz: "Biroq, hamma ham rozi emas." },
              { subject: "Natija", verb: "Consequently / Therefore / As a result", example: "Therefore, we must act now.", exampleUz: "Shuning uchun hozir harakat qilishimiz kerak." }
            ]
          }
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
            type: "vocab",
            question: "'Furthermore' so'zi nimani bildiradi?",
            word: "Furthermore",
            options: ["Bundan tashqari", "Aksincha", "Shuning uchun", "Ba'zan"],
            answer: 0,
            speech: "Furthermore"
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
        teaching: {
          title: "📖 Yangi So'zlar va Grammatika",
          intro: "Bu darsda ish suhbatida ishlatiladigan professional so'zlarni o'rganasiz.",
          vocabulary: [
            {
              word: "Spearhead",
              meaning: "Loyiha yoki tashabbusga yetakchilik qilmoq",
              pronunciation: "[ˈspɪr-hed]",
              example: "I spearheaded the new marketing campaign.",
              exampleUz: "Men yangi marketing kampaniyasiga boshchilik qildim.",
              audioText: "Spearhead"
            },
            {
              word: "Deadline",
              meaning: "Muddat, so'nggi sana",
              pronunciation: "[ˈded-laɪn]",
              example: "We must meet the deadline.",
              exampleUz: "Biz muddatga ulgurishimiz kerak.",
              audioText: "Deadline"
            },
            {
              word: "Strength",
              meaning: "Kuchli tomon, ustunlik",
              pronunciation: "[streŋkθ]",
              example: "My greatest strength is problem-solving.",
              exampleUz: "Mening eng kuchli tomonim — muammolarni hal qilish.",
              audioText: "Strength"
            }
          ],
          grammarLesson: {
            title: "STAR Metodi — Ish intervyusi uchun",
            explanation: "Ish suhbatida 'Tell me about a time when...' savoliga javob berishda STAR metodini ishlating:",
            rules: [
              { subject: "S — Situation", verb: "Vaziyatni tasvirlang", example: "In my previous role at Company X...", exampleUz: "Oldingi X kompaniyamdagi ishimda..." },
              { subject: "T — Task", verb: "Vazifangizni ayting", example: "I was responsible for...", exampleUz: "Men ... uchun javobgar edim." },
              { subject: "A — Action", verb: "Nima qilganingizni ayting", example: "I implemented a new system that...", exampleUz: "Men yangi tizim joriy qildim..." },
              { subject: "R — Result", verb: "Natijani ko'rsating", example: "As a result, efficiency increased by 30%.", exampleUz: "Natijada, samaradorlik 30% oshdi." }
            ]
          }
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
        teaching: {
          title: "📖 Yangi So'zlar va Grammatika",
          intro: "Bu darsda IELTS Speaking Part 1 savollari uchun kengaytirilgan, batafsil javob berishni o'rganasiz.",
          vocabulary: [
            {
              word: "Inevitably",
              meaning: "Muqarrar ravishda, qochib bo'lmas tarzda",
              pronunciation: "[ɪ-ˈnev-ɪ-tə-bli]",
              example: "Inevitably, technology will change everything.",
              exampleUz: "Muqarrar ravishda, texnologiya hamma narsani o'zgartiradi.",
              audioText: "Inevitably"
            },
            {
              word: "Enthusiastic",
              meaning: "Ishtiyoqli, jo'shqin",
              pronunciation: "[ɪn-ˌθuː-zi-ˈæs-tɪk]",
              example: "I am enthusiastic about learning.",
              exampleUz: "Men o'rganishga ishtiyoqliman.",
              audioText: "Enthusiastic"
            },
            {
              word: "Avid",
              meaning: "O'ch, qiziquvchan (hobbilar uchun)",
              pronunciation: "[ˈæv-ɪd]",
              example: "She is an avid reader.",
              exampleUz: "U kitob o'qishga o'ch.",
              audioText: "Avid"
            },
            {
              word: "Unwind",
              meaning: "Dam olmoq, bo'shashmoq",
              pronunciation: "[ʌn-ˈwaɪnd]",
              example: "I read books to unwind after work.",
              exampleUz: "Ishdan keyin bo'shashish uchun kitob o'qiyman.",
              audioText: "Unwind"
            }
          ],
          grammarLesson: {
            title: "IELTS Part 1 — Javobni kengaytirish texnikasi",
            explanation: "IELTS da 'Yes/No' javob berish MUMKIN EMAS. Har bir javobni 2-3 gap bilan kengaytirishingiz shart. FORMULASI: Javob + Sabab + Misol",
            rules: [
              { subject: "1. Javob", verb: "Aniq fikringizni ayting", example: "Absolutely, I am an avid reader.", exampleUz: "Albatta, men kitob o'qishga o'chman." },
              { subject: "2. Sabab", verb: "Sabab keltiring", example: "because books help me unwind.", exampleUz: "chunki kitoblar menga dam olishga yordam beradi." },
              { subject: "3. Misol", verb: "Shaxsiy misol qo'shing", example: "For instance, I recently finished a novel by Haruki Murakami.", exampleUz: "Masalan, yaqinda Haruki Murakamining romanini tugatdim." }
            ]
          }
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
            type: "vocab",
            question: "'Unwind' so'zi nimani bildiradi?",
            word: "Unwind",
            options: ["Dam olmoq, bo'shashmoq", "Yugurib kelmoq", "Qayta boshlash", "Yig'lamoq"],
            answer: 0,
            speech: "Unwind"
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
        teaching: {
          title: "📖 Yangi So'zlar va Grammatika",
          intro: "Bu darsda IELTS Part 2 (2 daqiqalik monolog) va Part 3 (chuqur muhokama) uchun zarur leksika va texnikani o'rganasiz.",
          vocabulary: [
            {
              word: "Pivotal",
              meaning: "Hal qiluvchi, markaziy ahamiyatga ega",
              pronunciation: "[ˈpɪv-ə-tl]",
              example: "That was a pivotal moment in my life.",
              exampleUz: "Bu mening hayotimdagi hal qiluvchi lahza edi.",
              audioText: "Pivotal"
            },
            {
              word: "Unprecedented",
              meaning: "Misli ko'rilmagan",
              pronunciation: "[ʌn-ˈpres-ɪ-den-tɪd]",
              example: "We face unprecedented challenges.",
              exampleUz: "Biz misli ko'rilmagan muammolarga duch kelyapmiz.",
              audioText: "Unprecedented"
            },
            {
              word: "Albeit",
              meaning: "Garchi, bo'lsa-da",
              pronunciation: "[ɔːl-ˈbiː-ɪt]",
              example: "He is talented, albeit inexperienced.",
              exampleUz: "U iqtidorli, garchi tajribasiz bo'lsa-da.",
              audioText: "Albeit"
            },
            {
              word: "Drastically",
              meaning: "Keskin tarzda, tubdan",
              pronunciation: "[ˈdræs-tɪ-kli]",
              example: "Technology has drastically changed our lives.",
              exampleUz: "Texnologiya hayotimizni tubdan o'zgartirdi.",
              audioText: "Drastically"
            }
          ],
          grammarLesson: {
            title: "Part 2 — PPF Metodi (Past, Present, Future)",
            explanation: "2 daqiqa to'xtamasdan gapirish uchun mavzuni 3 qismga bo'ling: O'tmish, Hozir, Kelajak.",
            rules: [
              { subject: "Past (O'tmish)", verb: "O'tgan vaqtdagi tajribani tasvirlang", example: "Looking back, I remember when I first started learning English...", exampleUz: "Orqaga nazar tashlasam, ingliz tilini birinchi marta o'rgana boshlaganimni eslayman..." },
              { subject: "Present (Hozir)", verb: "Hozirgi holatni tasvirlang", example: "Currently, I practice speaking every day with AI...", exampleUz: "Hozirda men har kuni AI bilan gaplashish mashq qilaman..." },
              { subject: "Future (Kelajak)", verb: "Rejalatingizni ayting", example: "In the future, I aspire to achieve a Band 8 in IELTS.", exampleUz: "Kelajakda IELTS da Band 8 ga erishishni maqsad qilganman." }
            ]
          }
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
            type: "vocab",
            question: "'Albeit' so'zi nimani bildiradi?",
            word: "Albeit",
            options: ["Garchi, bo'lsa-da", "Chunki", "Shuning uchun", "O'rniga"],
            answer: 0,
            speech: "Albeit"
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
