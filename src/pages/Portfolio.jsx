import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

const Portfolio = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'sites', 'bots', 'design'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

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
            {t('portfolio.title')}
          </motion.h1>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="container">
          <motion.div
            className="filter-tabs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-tab ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {t(`portfolio.filter.${category}`)}
              </button>
            ))}
          </motion.div>

          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <a href={project.link} className="btn btn-small">
                        {t('portfolio.viewProject')}
                      </a>
                    </div>
                  </div>
                  <div className="project-info">
                    <span className="project-category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;