import { Link } from "react-router-dom";
import "../styles/footer.css";

import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-logo">
              <span className="brand-icon">🏛️</span>
              <div className="brand-text">
                <span className="text-digital">Digital</span>
                <span className="text-seva">Seva Kendra</span>
              </div>
            </div>
            <p className="brand-description">
              {t('footer.brand_desc')}
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
              <a href="#" className="social-icon" aria-label="Facebook">📘</a>
              <a href="#" className="social-icon" aria-label="Instagram">📸</a>
              <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="col-title">{t('footer.quick_links')}</h4>
            <ul className="links-list">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/services">{t('nav.services')}</Link></li>
              <li><Link to="/blog">{t('nav.blog')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links-col">
            <h4 className="col-title">Popular Services</h4>
            <ul className="links-list">
              <li><Link to="/services">Aadhaar Update</Link></li>
              <li><Link to="/services">PAN Card Application</Link></li>
              <li><Link to="/services">Voter ID Registration</Link></li>
              <li><Link to="/services">Income Certificate</Link></li>
              <li><Link to="/voice">Voice Assistance</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="footer-newsletter">
            <h4 className="col-title">{t('footer.stay_updated')}</h4>
            <p className="newsletter-text">
              {t('footer.subscribe_text')}
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder={t('footer.enter_email')} className="newsletter-input" />
              <button className="newsletter-btn">{t('footer.subscribe_btn')}</button>
            </div>
            <div className="contact-mini">
              <div className="contact-row">
                <span>📞</span>
                <span>+91 9911779761</span>
              </div>
              <div className="contact-row">
                <span>✉️</span>
                <span>support@digitalsevakendra.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Digital Seva Kendra. {t('footer.rights')}</p>
          <div className="bottom-links">
            <Link to="/privacy">{t('footer.privacy')}</Link>
            <Link to="/terms">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}