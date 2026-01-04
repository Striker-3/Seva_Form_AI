import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/blog.css";
import { useTranslation } from "react-i18next";

export default function Blog() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogImages = ["📄", "🤖", "💳", "🇮🇳", "🎤", "📋", "🏠", "📱", "🔒", "🎓", "👶", "💳"];
  const blogPostsData = t('blog.posts', { returnObjects: true });

  const blogPosts = Array.isArray(blogPostsData) ? blogPostsData.map((post, index) => ({
    ...post,
    image: blogImages[index] || "📄"
  })) : [];

  const categories = [
    { id: "all", name: t('blog.filter.all'), icon: "📚" },
    { id: "documents", name: t('blog.filter.documents'), icon: "📄" },
    { id: "technology", name: t('blog.filter.technology'), icon: "💻" },
    { id: "government", name: t('blog.filter.government'), icon: "🏛️" }
  ];

  const filteredPosts = selectedCategory === "all"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <Layout>
      <div className="blog-container fade-in">
        {/* Hero Section */}
        <div className="blog-hero slide-up">
          <div className="hero-content">
            <h1>{t('blog.hero.title')}</h1>
            <p className="hero-subtitle">
              {t('blog.hero.subtitle')}
            </p>
          </div>
        </div>

        {/* Featured Posts */}
        <section className="featured-section slide-up">
          <h2 className="section-title">{t('blog.featured.title')}</h2>
          <div className="featured-grid">
            {featuredPosts.map((post, index) => (
              <article
                key={post.id}
                className="featured-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="featured-image">
                  <span className="post-emoji">{post.image}</span>
                  <div className="featured-badge">{t('blog.featured.badge')}</div>
                </div>
                <div className="featured-content">
                  <div className="post-meta">
                    <span className="post-date">{post.date}</span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="read-more-btn">
                    {t('blog.featured.read_more')}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="filter-section slide-up">
          <h2 className="section-title">{t('blog.filter.title')}</h2>
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section className="posts-section">
          <div className="posts-grid">
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className="post-card slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="post-image">
                  <span className="post-emoji">{post.image}</span>
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span className="post-date">{post.date}</span>
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-footer">
                    <span className="read-time">{post.readTime}</span>
                    <Link to={`/blog/${post.id}`} className="read-more-link">
                      {t('blog.featured.read_more')}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="newsletter-section slide-up">
          <div className="newsletter-card">
            <div className="newsletter-content">
              <h3>{t('blog.newsletter.title')}</h3>
              <p>{t('blog.newsletter.text')}</p>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder={t('blog.newsletter.placeholder')}
                  className="newsletter-input"
                />
                <button className="newsletter-btn">{t('blog.newsletter.btn')}</button>
              </div>
            </div>
            <div className="newsletter-icon">📧</div>
          </div>
        </section>
      </div>
    </Layout>
  );
}