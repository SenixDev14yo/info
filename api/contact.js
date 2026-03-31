const escapeHtml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const escapeMarkdown = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
};

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

  if (name.length > 100 || message.length > 2000) {
    return res.status(400).json({ error: 'Input too long' });
  }

  const TELEGRAM_BOT_TOKEN = '8252274161:AAEvCbtMkn5WaOb3eLYpGoTmTydyFKuo18Q';
  const TELEGRAM_CHAT_ID = '719579828';

  const safeName = escapeMarkdown(escapeHtml(name));
  const safeMessage = escapeMarkdown(escapeHtml(message));

  const langLabels = {
    ru: 'Новая заявка',
    uz: 'Yangi ariza',
    en: 'New Contact Request'
  };

  const messageText = `📩 *${langLabels[language] || 'New Contact Request'}*\n\n👤 *Name:* ${safeName}\n💬 *Message:* ${safeMessage}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      res.json({ success: true, message: 'Message sent successfully' });
    } else {
      res.status(500).json({ error: 'Telegram API error', details: data });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
