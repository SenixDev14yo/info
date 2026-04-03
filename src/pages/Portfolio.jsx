import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <div className="portfolio-page">
      <section className="page-header">
        <div className="container">
          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">{t('portfolio.title')}</span>
          </motion.h1>
          <p className="page-subtitle">{t('portfolio.subtitle')}</p>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="container">
          <motion.div 
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {projects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
