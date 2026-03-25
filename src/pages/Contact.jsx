import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'website',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const message = `📩 *Новая заявка*\n\n👤 Имя: ${formData.name}\n📧 Email: ${formData.email}\n🎯 Тип: ${formData.type}\n💬 Сообщение: ${formData.message}`;
      
      const botToken = '8252274161:AAGgK4angtBTy5Oqh0r2N5AKwUYPHX3_uYw';
      const chatId = '719579828';
      
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', type: 'website', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="container">
          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{t('contact.form.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t('contact.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">{t('contact.form.type')}</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="website">{t('contact.form.typeOptions.website')}</option>
                  <option value="bot">{t('contact.form.typeOptions.bot')}</option>
                  <option value="design">{t('contact.form.typeOptions.design')}</option>
                  <option value="other">{t('contact.form.typeOptions.other')}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="form-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={isLoading}
              >
                {isLoading ? t('contact.form.sending') : t('contact.form.submit')}
              </button>

              {status === 'success' && (
                <motion.div
                  className="form-status success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {t('contact.form.success')}
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  className="form-status error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {t('contact.form.error')}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;