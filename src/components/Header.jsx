import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'portfolio', path: '/portfolio' },
    { key: 'services', path: '/services' },
    { key: 'about', path: '/about' },
    { key: 'contact', path: '/contact' }
  ];

  const languages = ['ru', 'uz', 'en'];

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span className="logo-text">Senix</span>
          <span className="logo-dot">.</span>
        </Link>

        <nav className="nav-desktop">
          {navItems.map((item) => (
            <Link key={item.key} to={item.path} className="nav-link">
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="lang-switcher">
          {languages.map((lng) => (
            <button
              key={lng}
              className={`lang-btn ${i18n.language === lng ? 'active' : ''}`}
              onClick={() => changeLanguage(lng)}
            >
              {t(`language.${lng}`)}
            </button>
          ))}
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="nav-mobile">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="nav-link-mobile"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <div className="lang-switcher-mobile">
                {languages.map((lng) => (
                  <button
                    key={lng}
                    className={`lang-btn-mobile ${i18n.language === lng ? 'active' : ''}`}
                    onClick={() => changeLanguage(lng)}
                  >
                    {t(`language.${lng}`)}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
