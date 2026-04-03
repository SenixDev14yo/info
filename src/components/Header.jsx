import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(i18n.language);

  const changeLanguage = (lng) => {
    if (lng !== activeLang) {
      setActiveLang(lng);
      i18n.changeLanguage(lng);
      localStorage.setItem('language', lng);
    }
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
          <span className="logo-text">Aziz</span>
          <span className="logo-dot">.</span>
        </Link>

        <nav className="nav-desktop">
          {navItems.map((item) => (
            <Link key={item.key} to={item.path} className="nav-link">
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <motion.button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              )}
            </motion.div>
          </motion.button>

          <div className="lang-switcher">
            {languages.map((lng) => (
              <motion.button
                key={lng}
                className={`lang-btn ${i18n.language === lng ? 'active' : ''}`}
                onClick={() => changeLanguage(lng)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={i18n.language === lng ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {t(`language.${lng}`)}
              </motion.button>
            ))}
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <nav className="nav-mobile">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className="nav-link-mobile"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </motion.div>
              ))}
              <motion.button 
                className="theme-toggle-mobile" 
                onClick={toggleTheme}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  key={theme}
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                >
                  {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </motion.span>
              </motion.button>
              <motion.div 
                className="lang-switcher-mobile"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {languages.map((lng) => (
                  <motion.button
                    key={lng}
                    className={`lang-btn-mobile ${i18n.language === lng ? 'active' : ''}`}
                    onClick={() => changeLanguage(lng)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t(`language.${lng}`)}
                  </motion.button>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
