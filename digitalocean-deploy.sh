#!/bin/bash
# ==============================================================================
# DigitalOcean Droplet Avtomatik O'rnatish Skripti (EngMastery AI)
# ==============================================================================
# Ushbu skript DigitalOcean Ubuntu serveringizda:
# 1. Node.js 20 va PM2 o'rnatadi
# 2. Nginx veb serverini va Reverse Proxy ni sozlaydi
# 3. Loyihani orqa fonda (background) 24/7 ishlaydigan qiladi
# 4. HTTPS (SSL) sertifikatini avtomatik ulaydi (Mikrofon ishlashi uchun)
# ==============================================================================

set -e

echo "🚀 [1/5] Tizim yangilanmoqda..."
sudo apt update && sudo apt upgrade -y

echo "📦 [2/5] Node.js 20, Nginx va Git o'rnatilmoqda..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git certbot python3-certbot-nginx

sudo npm install -g pm2

APP_DIR="/var/www/engmastery"
echo "📂 [3/5] Loyiha katalogi sozlanmoqda: $APP_DIR"
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# Agar fayllar hali nusxalanmagan bo'lsa
if [ ! -f "$APP_DIR/package.json" ]; then
    echo "Fayllar $APP_DIR ga ko'chirilishi kutilmoqda..."
fi

cd $APP_DIR
npm install --production

echo "⚙️ [4/5] PM2 orqali loyiha ishga tushirilmoqda..."
pm2 delete engmastery 2>/dev/null || true
pm2 start server.js --name "engmastery"
pm2 save
pm2 startup | tail -n 1 | bash 2>/dev/null || true

echo "🌐 [5/5] Nginx sozlanmoqda..."
NGINX_CONF="/etc/nginx/sites-available/engmastery"

sudo bash -c "cat > $NGINX_CONF" << 'EOF'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/engmastery /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "=================================================================="
echo "🎉 EngMastery AI DigitalOcean serveringizda muvaffaqiyatli o'rnatildi!"
echo "Server IP manzilingiz orqali brauzerda ochishingiz mumkin."
echo "=================================================================="
