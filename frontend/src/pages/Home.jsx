import { Link } from "react-router-dom";
import "../styles/card.css";
import "../styles/button.css";
import "../styles/animations.css";
import "../styles/aesthetic.css"; // Import the new styles
import Layout from "../components/Layout";

import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="container fade-in" style={{ position: "relative", maxWidth: "1200px" }}>

        {/* Decorative Background Blobs */}
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>

        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "60px", paddingTop: "40px" }}>
          <h1 className="hero-title animate-float">
            {t('hero.title_brand')} <span className="text-gradient-primary">{t('hero.title_highlight')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>

          <div className="glass-panel slide-up" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#374151" }}>
              {t('hero.description')}
            </p>
          </div>
        </div>

        {/* Primary Action Card */}
        <div className="glass-panel slide-up" style={{ marginBottom: "60px" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h3 className="card-title" style={{ fontSize: "1.8rem" }}>{t('hero.get_started')}</h3>
            <p style={{ color: "#6b7280" }}>{t('hero.select_option')}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <Link to="/services" style={{ textDecoration: "none" }}>
              <button className="btn-aesthetic">
                <span>📋</span> {t('hero.browse_services')}
              </button>
            </Link>

            <Link to="/voice" style={{ textDecoration: "none" }}>
              <button className="btn-aesthetic" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)" }}>
                <span>🎤</span> {t('hero.voice_filling')}
              </button>
            </Link>

            <Link to="/admin" style={{ textDecoration: "none" }}>
              <button className="btn-aesthetic-secondary">
                <span>📊</span> {t('hero.admin_dashboard')}
              </button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
          <div className="feature-glass-card">
            <div className="feature-icon-wrapper">📄</div>
            <h4 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#1f2937" }}>{t('hero.upload_docs')}</h4>
            <p style={{ color: "#6b7280" }}>{t('hero.upload_desc')}</p>
          </div>
          <div className="feature-glass-card">
            <div className="feature-icon-wrapper">🤖</div>
            <h4 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#1f2937" }}>{t('hero.ai_autofill')}</h4>
            <p style={{ color: "#6b7280" }}>{t('hero.autofill_desc')}</p>
          </div>
          <div className="feature-glass-card">
            <div className="feature-icon-wrapper">✅</div>
            <h4 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#1f2937" }}>{t('hero.reduce_errors')}</h4>
            <p style={{ color: "#6b7280" }}>{t('hero.errors_desc')}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
