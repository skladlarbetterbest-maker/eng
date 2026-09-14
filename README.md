# 🦅 EngMastery AI - Duolingo & IELTS 7.5+ Platformasi

Ushbu platforma ingliz tilini **A1 (boshlang'ich)** darajadan **IELTS 7.5+ (yuqori daraja)** gacha gamifikatsiya va sun'iy intellekt orqali o'rgatish uchun maxsus yaratilgan.

---

## 🌟 Asosiy Imkoniyatlar

1. **Bosqichma-bosqich Duolingo Uslubidagi Yo'l Xaritasi (Roadmap):**
   - **Level 1 (A1 Starter):** Salomlashish, To Be, Oddiy jumlalar va oila.
   - **Level 2 (A2 Elementary):** O'tgan zamon (Past Simple), Do'kon va kafeda suhbat.
   - **Level 3 (B1 Intermediate):** Present Perfect, Hayotiy tajribalar, 2-shart mayli (orzular).
   - **Level 4 (B2 Upper-Intermediate):** Bahs-munozara, Linking words, STAR metodi bilan ish intervyusi.
   - **Level 5 (C1 / IELTS Mastery):** IELTS Part 1, Part 2 (Cue card), Part 3, Yuqori darajadagi leksika va 7.5+ kriteriyalari.
   - Har bir dars muvaffaqiyatli tugatilganda keyingisi ochiladi, XP ballar qo'shiladi va konfeti portlaydi!

2. **Groq Llama 3.3 70B AI Speaking Partner:**
   - **0 soniya kechikish (kutish yo'q):** Groq platformasi dunyodagi eng tezkor AI hisoblanadi.
   - **Jonli Ovozli Suhbat (Speech-to-Text & Text-to-Speech):** Siz mikrofonga gapirasiz, AI eshitadi, xatolaringizni grammatik jihatdan to'g'irlaydi va sizga inglizcha talaffuzda javob qaytaradi!
   - **5 ta rejim:**
     - 🎓 **IELTS Examiner (David):** Haqiqiy imtihon oluvchi kabi savollar beradi, xatolaringizni aytadi va Band ballini baholaydi.
     - 💼 **Job Interviewer:** Global kompaniyalar uchun HR suhbati.
     - ☕ **London Barista:** Kafeda taom buyurtma qilish va jonli xalqona iboralar.
     - ✈️ **Airport & Immigration:** Bojxona va mehmonxona suhbati.
     - 💬 **Emma (Free Talk):** Har qanday kundalik qiziq mavzuda erkin do'stona muloqot.

3. **Shadowing Studiyasi (Nutq Musqullari Mashqi):**
   - Professor Alexander Arguelles metodi.
   - Native audio (oddiy va sekinlashtirilgan tezlikda).
   - Mikrofon orqali bir vaqtda qaytarib, nutq mosligini foizlarda tekshirish.

4. **Kutubxona va Ustozlar Tavsiyasi:**
   - Raymond Murphy kitoblari bo'yicha metodika.
   - Spaced Repetition (SRS) so'z yodlash texnikasi.
   - IELTS 4 ta kriteriyasi (Fluency, Lexical, Grammar, Pronunciation).

---

## 💻 Mahalliy Kompyuterda Ishga Tushirish

### 1-usul: Node.js orqali
Loyiha papkasida terminalni oching:
```bash
npm install
npm start
```
Brauzerda oching: `http://localhost:3000`

### 2-usul: To'g'ridan-to'g'ri brauzerda ochish
Hech narsa o'rnatmasdan ham `public/index.html` faylini ikki marta bosib ochsangiz, barcha funksiyalar (AI, darslar, ovoz) to'g'ridan-to'g'ri ishlayveradi!

---

## 🌐 Serverga Joylashtirish (Deployment Qo'llanmasi)

### 1-Variant: 100% Bepul Vercel yoki Netlify (1 daqiqada)
Bu eng qulay va bepul yo'l:
1. [vercel.com](https://vercel.com) yoki [netlify.com](https://netlify.com) saytiga kiring.
2. `public` papkasini sudrab (drag & drop) tashlang yoki GitHub orqali ulang.
3. Bir zumda sizga `sizning-saytingiz.vercel.app` ko'rinishida bepul HTTPS domen beradi!

### 2-Variant: Linux VPS Serverga (Ubuntu / Nginx) Joylashtirish
Agar o'zingizning VPS serveringiz bo'lsa:

1. Serveringizga fayllarni yuklang:
```bash
scp -r * root@SIZNING_SERVER_IP:/var/www/engmastery/
```

2. Nginx konfiguratsiya faylini oching:
```bash
sudo nano /etc/nginx/sites-available/engmastery
```

3. Quyidagilarni yozing:
```nginx
server {
    listen 80;
    server_name sizning-domeningiz.uz;

    root /var/www/engmastery/public;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. Faollashtiring va Nginx ni qayta ishga tushiring:
```bash
sudo ln -s /etc/nginx/sites-available/engmastery /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

5. Bepul SSL (HTTPS) sertifikat o'rnatish (Mikrofon brauzerda ishlashi uchun HTTPS shart!):
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d sizning-domeningiz.uz
```

### 3-Variant: Node.js Express Serverni VPS da orqa fonda (PM2) yurgizish
```bash
npm install -g pm2
pm2 start server.js --name "engmastery"
pm2 startup
pm2 save
```

---

## 🔑 Groq API Kaliti Haqida
Siz bergan Groq API kaliti tizimga sukut bo'yicha kiritilgan. Uni saytning "Server & Sozlamalar" bo'limidan xohlagan vaqt o'zgartirishingiz yoki yangilashingiz mumkin.
