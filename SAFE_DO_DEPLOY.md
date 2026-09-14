# 🛡️ DigitalOcean Serverga XAVFSIZ O'rnatish Qo'llanmasi
### (OmborPro va boshqa barcha tizimlarga 0% ta'sir, 100% xavfsiz)

Sizning serveringizdagi mavjud holat:
- **Server IP:** `174.138.36.68`
- **OmborPro porti:** `3000` (PM2 da `omborpro` nomi bilan ishlamoqda)
- **PostgreSQL:** `5432` portda ishlamoqda
- **Domenlar:** `ombor.pro`, `api`, `bot`, `omborpro.duckdns.org`

---

## 🔒 Bizning Xavfsizlik Qoidalarimiz:
1. **Port 3000 ga tegilmaydi:** EngMastery loyihasi uchun alohida **`3005`** port ajratildi.
2. **Katalog ajratilgan:** Loyiha `/var/www/eng-mastery` papkasida turadi (`/var/www/omborpro` ga umuman tegilmaydi).
3. **PM2 jarayoni alohida:** PM2 dagi nomi **`eng-mastery`** bo'ladi (`omborpro` jarayoni o'chirilmaydi yoki to'xtatilmaydi).
4. **Nginx configi alohida:** `/etc/nginx/sites-available/eng-mastery` alohida fayl bo'ladi (`ombor-pro` configi o'zgarmaydi).

---

## 🚀 1-QADAM: Mahalliy kompyuterdan GitHub-ga yuklash

Mahalliy kompyuteringizda (PowerShell yoki Git Bash):
```bash
# Agar hali GitHub da repo ochmagan bo'lsangiz, github.com/new ga kirib "Eng-til" deb oching:
git remote add origin https://github.com/OmborPro/Eng-til.git
git push -u origin main
```

---

## 🚀 2-QADAM: Serverga ulanish

O'zingizning maxfiy kalitingiz bilan serverga kiring:
```powershell
ssh -i C:\Users\jamol\.ssh\digitalocean_key root@174.138.36.68
```

---

## 🚀 3-QADAM: Serverda loyihani yuklab ishga tushirish (OmborPro ga tegmasdan)

Server terminalida quyidagi xavfsiz buyruqlarni ketma-ket bajaring:

```bash
# 1. Alohida papka ochish
mkdir -p /var/www/eng-mastery
cd /var/www/eng-mastery

# 2. GitHub dan klonlash
git clone https://github.com/OmborPro/Eng-til.git .

# 3. Paketlarni o'rnatish
npm install --production

# 4. PM2 orqali 3005-portda ishga tushirish (omborpro ga zarracha tegmaydi)
pm2 start server.js --name "eng-mastery"
pm2 save

# 5. Tekshirish (omborpro ham, eng-mastery ham yonma-yon ishlab turganini ko'rasiz):
pm2 status
```

---

## 🌐 4-QADAM: Domen va Nginx sozlash (Subdomen orqali)

Mikrofon brauzerda ishlashi uchun HTTPS kerak. Buning uchun eng qulay yo'l:
Cloudflare-da `eng.ombor.pro` subdomenini `174.138.36.68` ga yo'naltirish (A record).

So'ng serverda alohida yangi Nginx fayli yaratiladi:
```bash
nano /etc/nginx/sites-available/eng-mastery
```

Ichiga quyidagini qo'ying:
```nginx
server {
    listen 80;
    server_name eng.ombor.pro;

    location / {
        proxy_pass http://localhost:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Faollashtirish va Nginx ni xavfsiz qayta yuklash:
```bash
ln -sf /etc/nginx/sites-available/eng-mastery /etc/nginx/sites-enabled/
# Avval Nginx sintaksisini tekshiramiz (xato bo'lsa server to'xtamaydi):
nginx -t && systemctl reload nginx
```

HTTPS (SSL) sertifikat olish:
```bash
certbot --nginx -d eng.ombor.pro --non-interactive --agree-tos -m omborpro@gmail.com
```

Tayyor! Saytingiz `https://eng.ombor.pro` manzilida ishlaydi, `ombor.pro` esa odatdagidek tinch va xavfsiz ishlayveradi.
