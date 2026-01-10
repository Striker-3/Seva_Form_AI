import { Link, useNavigate } from "react-router-dom";
import "../styles/layout.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`modern-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* Brand */}
        <div className="header-brand" onClick={() => navigate("/")}>
          <div className="brand-logo-icon">🏛️</div>
          <div className="brand-text">
            <span className="text-digital">Digital</span>
            <span className="text-seva">Seva Kendra</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">{t('nav.home')}</Link>
          <Link to="/services" className="nav-link">{t('nav.services')}</Link>
          <Link to="/about" className="nav-link">{t('nav.about')}</Link>
          <Link to="/blog" className="nav-link">{t('nav.blog')}</Link>
          <Link to="/contact" className="nav-link">{t('nav.contact')}</Link>
          <Link to="/complaint-map" className="nav-link">Nearby (GIS)</Link>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <select
            className="lang-select"
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue={i18n.language}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
          <button className="btn-chat" onClick={() => navigate("/chat")}>
            {t('nav.chat_ai')}
          </button>
          <button className="btn-login" onClick={() => navigate("/login")}>
            {t('nav.login')}
          </button>
          <button className="btn-register" onClick={() => navigate("/register")}>
            {t('nav.register')}
          </button>
        </div>
      </div>
    </header>
  );
}
