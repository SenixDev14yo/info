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
        staggerChildren: 0.2,
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
        </div>

        <motion.div
          className="container hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="gradient-text">{t('hero.title')}</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            {t('hero.subtitle')}
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <Link to="/contact" className="btn btn-primary">
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

      <section className="features">
        <div className="container">
          <motion.div
            className="features-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <h3>Websites</h3>
              <p>Современные сайты с адаптивным дизайном</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3>Telegram Bots</h3>
              <p>Боты для автоматизации бизнеса</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Design</h3>
              <p>UI/UX дизайн для ваших проектов</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;