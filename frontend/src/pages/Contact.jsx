import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/contact.css";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      title: t('contact.info.phone'),
      details: ["+91 9911779761", "+91 9911779762"],
      icon: "📱",
      color: "#ff6b35"
    },
    {
      title: t('contact.info.email'),
      details: ["support@onlinedigitalsevakendra.in"],
      icon: "✉️",
      color: "#22c55e"
    },
    {
      title: t('contact.info.hours'),
      details: [t('contact.info.mon_sat'), t('contact.info.sun_closed')],
      icon: "🕒",
      color: "#3b82f6"
    },
    {
      title: t('contact.info.response'),
      details: [t('contact.info.response_email'), t('contact.info.response_phone')],
      icon: "⚡",
      color: "#f59e0b"
    }
  ];

  const officeLocations = t('contact.locations.items', { returnObjects: true });
  const faqs = t('contact.faq.items', { returnObjects: true });

  const subjects = t('contact.form.subjects', { returnObjects: true });

  return (
    <Layout>
      <div className="contact-container fade-in">
        {/* Hero Section */}
        <section className="contact-hero slide-up">
          <div className="hero-content">
            <h1>{t('contact.hero.title')}</h1>
            <p className="hero-subtitle">
              {t('contact.hero.subtitle')}
            </p>
          </div>
          <div className="hero-visual">
            <div className="contact-bubble">
              <span className="bubble-icon">💬</span>
              <div className="bubble-text">{t('contact.hero.bubble')}</div>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="contact-info-section slide-up">
          <h2 className="section-title">{t('contact.info.title')}</h2>
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="contact-info-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="info-icon" style={{ color: info.color }}>
                  {info.icon}
                </div>
                <h3 className="info-title">{info.title}</h3>
                <div className="info-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="form-section slide-up">
          <div className="form-container">
            <div className="form-content">
              <h2>{t('contact.form.title')}</h2>
              <p>{t('contact.form.subtitle')}</p>

              {isSuccess ? (
                <div className="success-message fade-in">
                  <div className="success-icon-large">✅</div>
                  <h3>{t('contact.form.success_title')}</h3>
                  <p>{t('contact.form.success_text')}</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="submit-btn"
                    style={{ margin: '20px auto', display: 'inline-flex' }}
                  >
                    {t('contact.form.btn_another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">{t('contact.form.name')} *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder={t('contact.form.name_placeholder')}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">{t('contact.form.email')} *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder={t('contact.form.email_placeholder')}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">{t('contact.form.phone')}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t('contact.form.phone_placeholder')}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">{t('contact.form.subject')} *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">{t('contact.form.subject_placeholder')}</option>
                        {Object.entries(subjects).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">{t('contact.form.message')} *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      placeholder={t('contact.form.message_placeholder')}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        {t('contact.form.btn_sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.form.btn_send')}
                        <span className="btn-arrow">→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map Section */}
            <div className="map-container" style={{ width: "100%", height: "400px", borderRadius: "16px", overflow: "hidden", marginTop: "20px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}>
              <iframe
                title="MRSAC Nagpur Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=Maharashtra%20Remote%20Sensing%20Application%20Centre%20MRSAC%20Nagpur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="locations-section slide-up">
          <h2 className="section-title">{t('contact.locations.title')}</h2>
          <div className="locations-grid">
            {officeLocations.map((location, index) => (
              <div
                key={index}
                className="location-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="location-header">
                  <span className="location-icon">🏢</span>
                  <h3 className="location-city">{location.city}</h3>
                </div>
                <div className="location-details">
                  <p className="location-address">{location.address}</p>
                  <p className="location-landmark">📍 {location.landmark}</p>
                  <p className="location-services">🔧 {location.services}</p>
                </div>
                <button className="location-btn">{t('contact.locations.btn_directions')}</button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section slide-up">
          <h2 className="section-title">{t('contact.faq.title')}</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="faq-question">
                  <span className="faq-icon">❓</span>
                  {faq.question}
                </h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="emergency-section slide-up">
          <div className="emergency-card">
            <div className="emergency-content">
              <h3>{t('contact.emergency.title')}</h3>
              <p>{t('contact.emergency.text')}</p>
              <div className="emergency-contacts">
                <a href="tel:+919911779761" className="emergency-btn phone">
                  📱 {t('contact.emergency.call')}: +91 9911779761
                </a>
                <a href="mailto:support@onlinedigitalsevakendra.in" className="emergency-btn email">
                  ✉️ {t('contact.emergency.email')}
                </a>
              </div>
            </div>
            <div className="emergency-icon">🚨</div>
          </div>
        </section>
      </div>
    </Layout>
  );
}