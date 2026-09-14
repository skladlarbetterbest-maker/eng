const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
// OmborPro port 3000 da ishlayotgani sababli, to'qnashuv bo'lmasligi uchun 3005 qildik:
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Fallback index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 EngMastery AI Platform running!`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`⭐ Platforma muvaffaqiyatli ishga tushdi.`);
  console.log(`====================================================`);
});
