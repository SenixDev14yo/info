import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="matrix-bg"></div>
        </div>

        <motion.div
          className="container hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="gradient-text">{t('hero.title')}</span>
            <br />
            <span style={{ fontSize: '24px', color: 'rgba(255,255,255,0.6)' }}>
              Developer & Security Enthusiast
            </span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            {t('hero.subtitle')}
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <Link to="/contact" className="btn btn-primary glow-btn">
              {t('hero.cta')}
            </Link>
            <Link to="/portfolio" className="btn btn-secondary">
              {t('hero.viewPortfolio')}
            </Link>
          </motion.div>

          <motion.div className="scroll-indicator" variants={itemVariants}>
            <div className="mouse">
              <div className="wheel"></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="services-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title gradient-text">{t('services.title')}</h2>
            <p className="section-subtitle">{t('services.subtitle')}</p>
          </motion.div>

          <div className="services-grid">
            {[
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
            ].map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="service-icon">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="white" stroke="none">
                    <path d={service.icon} />
                  </svg>
                </div>
                <h3>{t(service.titleKey)}</h3>
                <p>{t(service.descKey)}</p>
                <Link to="/contact" className="btn btn-small btn-secondary">
                  {t('services.order')}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              { number: '10+', label: t('stats.projects') },
              { number: '100%', label: t('stats.dedication') },
              { number: '24/7', label: t('stats.availability') }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="stat-number gradient-text">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title gradient-text">{t('testimonials.title')}</h2>
            <p className="section-subtitle">{t('testimonials.subtitle')}</p>
          </motion.div>

          <div className="testimonials-grid">
            {[
              {
                text: t('testimonials.review1.text'),
                name: t('testimonials.review1.name'),
                role: t('testimonials.review1.role')
              },
              {
                text: t('testimonials.review2.text'),
                name: t('testimonials.review2.name'),
                role: t('testimonials.review2.role')
              },
              {
                text: t('testimonials.review3.text'),
                name: t('testimonials.review3.name'),
                role: t('testimonials.review3.role')
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="testimonial-text">"{review.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{review.name[0]}</div>
                  <div>
                    <div className="testimonial-name">{review.name}</div>
                    <div className="testimonial-role">{review.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
