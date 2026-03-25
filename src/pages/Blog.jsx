import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="blog-page">
      <section className="page-header">
        <div className="container">
          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('blog.title')}
          </motion.h1>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <motion.div
            className="search-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder={t('blog.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </motion.div>

          {filteredPosts.length === 0 ? (
            <motion.p
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {t('blog.noResults')}
            </motion.p>
          ) : (
            <motion.div className="blog-grid" layout>
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="blog-card"
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="blog-image">
                    <img src={post.preview} alt={post.title} />
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <div className="blog-content">
                    <span className="blog-date">{formatDate(post.date)}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <button className="read-more">
                      {t('blog.readMore')}
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;