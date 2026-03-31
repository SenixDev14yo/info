import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8252274161:AAGgK4angtBTy5Oqh0r2N5AKwUYPHX3_uYw';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '719579828';

const logs = [];

app.post('/api/contact', async (req, res) => {
  const { name, message, language } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  const logEntry = {
    timestamp: new Date().toISOString(),
    name,
    message,
    language
  };

  logs.push(logEntry);

  const langLabels = {
    ru: 'Новая заявка',
    uz: 'Yangi ariza',
    en: 'New Contact Request'
  };

  const messageText = `📩 *${langLabels[language] || 'New Contact Request'}*\n\n👤 *Name:* ${name}\n💬 *Message:* ${message}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: 'Markdown'
      })
    });

    if (response.ok) {
      console.log('Message sent to Telegram:', logEntry);
      res.json({ success: true, message: 'Message sent successfully' });
    } else {
      console.error('Telegram API error:', await response.text());
      res.status(500).json({ error: 'Failed to send message to Telegram' });
    }
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/logs', (req, res) => {
  res.json(logs);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
