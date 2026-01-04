import Layout from "../components/Layout";
import "../styles/about.css";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const teamImages = ["👨‍💼", "👩‍💼", "👨‍💻", "👩‍🎓"];
  const teamMembers = t('about.team.members', { returnObjects: true });

  const achievementIcons = ["👥", "📋", "✅", "🕒"];
  const achievements = t('about.impact.items', { returnObjects: true });

  const valueIcons = ["🔍", "⚡", "🤝", "💡"];
  const values = t('about.values.items', { returnObjects: true });

  return (
    <Layout>
      <div className="about-container fade-in">
        {/* Hero Section */}
        <section className="about-hero slide-up">
          <div className="hero-content">
            <h1>{t('about.hero.title')}</h1>
            <p className="hero-subtitle">
              {t('about.hero.subtitle')}
            </p>
          </div>
          <div className="hero-visual">
            <div className="floating-icon">🏛️</div>
            <div className="floating-icon">💻</div>
            <div className="floating-icon">📱</div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section slide-up">
          <div className="mission-content">
            <div className="mission-text">
              <h2>{t('about.mission.title')}</h2>
              <p>
                {t('about.mission.text1')}
              </p>
              <p>
                {t('about.mission.text2')}
              </p>
            </div>
            <div className="mission-visual">
              <div className="mission-card">
                <span className="mission-icon">🎯</span>
                <h3>{t('about.mission.vision_title')}</h3>
                <p>{t('about.mission.vision_text')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="achievements-section slide-up">
          <h2 className="section-title">{t('about.impact.title')}</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="achievement-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="achievement-icon">{achievementIcons[index]}</div>
                <div className="achievement-number">{achievement.number}</div>
                <div className="achievement-label">{achievement.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section slide-up">
          <h2 className="section-title">{t('about.values.title')}</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="value-icon">{valueIcons[index]}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section slide-up">
          <h2 className="section-title">{t('about.team.title')}</h2>
          <p className="team-subtitle">
            {t('about.team.subtitle')}
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="member-avatar">{teamImages[index]}</div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Government Partnership */}
        <section className="partnership-section slide-up">
          <div className="partnership-content">
            <h2>{t('about.partnership.title')}</h2>
            <p>
              {t('about.partnership.text')}
            </p>
            <div className="certifications">
              <div className="cert-item">
                <span className="cert-icon">🏛️</span>
                <span>{t('about.partnership.authorized')}</span>
              </div>
              <div className="cert-item">
                <span className="cert-icon">🔒</span>
                <span>ISO 27001 Certified</span>
              </div>
              <div className="cert-item">
                <span className="cert-icon">✅</span>
                <span>STQC Audited</span>
              </div>
            </div>
          </div>
          <div className="gov-logos">
            <div className="gov-logo digital-india">
              <div className="di-icon">i</div>
              <div className="di-text">
                <div>Digital India</div>
                <div className="di-tagline">{t('about.partnership.sub_text1')}</div>
              </div>
            </div>
            <div className="gov-logo my-gov">
              <div className="mygov-text">
                <span className="mygov-my">my</span>
                <span className="mygov-gov">GOV</span>
              </div>
              <div className="mygov-hindi">{t('about.partnership.sub_text2')}</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section slide-up">
          <div className="cta-content">
            <h2>{t('about.cta.title')}</h2>
            <p>{t('about.cta.text')}</p>
            <div className="cta-buttons">
              <button className="btn-primary">{t('about.cta.btn_primary')}</button>
              <button className="btn-secondary">{t('about.cta.btn_secondary')}</button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}