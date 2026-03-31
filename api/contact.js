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

  const TELEGRAM_BOT_TOKEN = '8252274161:AAEvCbtMkn5WaOb3eLYpGoTmTydyFKuo18Q';
  const TELEGRAM_CHAT_ID = '719579828';

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

    const data = await response.json();
    
    if (response.ok) {
      console.log('Message sent:', data);
      res.json({ success: true, message: 'Message sent successfully' });
    } else {
      console.error('Telegram error:', data);
      res.status(500).json({ error: 'Telegram API error', details: data });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
