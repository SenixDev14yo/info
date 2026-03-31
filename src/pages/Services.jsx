import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: 'M2 3h10a2 2 0 012 2v14a2 2 0 01-2 2H2a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h10V5H2zm2 2h6v2H4V7zm0 4h6v2H4v-2zm0 4h4v2H4v-2z',
      titleKey: 'services.websites.title',
      descKey: 'services.websites.description'
    },
    {
      icon: 'M12 2a10 10 0 00-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16zm1-9h3v5h-3v-5zm0-2h3v3h-3V9z',
      titleKey: 'services.telegramBots.title',
      descKey: 'services.telegramBots.description'
    },
    {
      icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
      titleKey: 'services.automation.title',
      descKey: 'services.automation.description'
    },
    {
      icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      titleKey: 'services.backend.title',
      descKey: 'services.backend.description'
    }
  ];

  return (
    <div className="services-page">
      <section className="page-header">
        <div className="container">
          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">{t('services.title')}</span>
          </motion.h1>
          <p className="page-subtitle">{t('services.subtitle')}</p>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="service-icon">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="white" stroke="none">
                    <path d={service.icon} />
                  </svg>
                </div>
                <h3>{t(service.titleKey)}</h3>
                <p>{t(service.descKey)}</p>
                <Link to="/contact" className="btn btn-small btn-primary">
                  {t('services.order')}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
