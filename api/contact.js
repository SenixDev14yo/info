import cors from 'cors';

const corsMiddleware = cors();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8252274161:AAGgK4angtBTy5Oqh0r2N5AKwUYPHX3_uYw';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '719579828';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, message, language } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

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
      console.log('Message sent to Telegram:', { name, message, language });
      res.json({ success: true, message: 'Message sent successfully' });
    } else {
      const errorText = await response.text();
      console.error('Telegram API error:', errorText);
      res.status(500).json({ error: 'Failed to send message to Telegram' });
    }
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
