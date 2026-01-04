import { useState, useEffect } from "react";
import Header from "../components/Header";
import "../styles/dashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalForms: 0,
    voiceForms: 0,
    documentForms: 0,
  });

  const targetStats = {
    totalForms: 124,
    voiceForms: 58,
    documentForms: 66,
  };

  // Animated counting effect
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const animateValue = (key, target) => {
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setStats((prev) => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setStats((prev) => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, stepDuration);
    };

    // Start animations with slight delays for staggered effect
    setTimeout(() => animateValue("totalForms", targetStats.totalForms), 100);
    setTimeout(() => animateValue("voiceForms", targetStats.voiceForms), 300);
    setTimeout(() => animateValue("documentForms", targetStats.documentForms), 500);
  }, []);

  const cards = [
    {
      id: "total",
      title: "Total Forms Processed",
      value: stats.totalForms,
      icon: "📊",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      bgColor: "#667eea",
      description: "All processed forms",
      delay: 0,
    },
    {
      id: "voice",
      title: "Voice Forms",
      value: stats.voiceForms,
      icon: "🎤",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      bgColor: "#f5576c",
      description: "Forms filled via voice",
      delay: 0.1,
    },
    {
      id: "document",
      title: "Document Forms",
      value: stats.documentForms,
      icon: "📄",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      bgColor: "#4facfe",
      description: "Forms from documents",
      delay: 0.2,
    },
  ];

  return (
    <>
      <Header />
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <div className="header-icon">📊</div>
          <h1>Admin Dashboard</h1>
        </div>

        <div className="dashboard-cards">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="stat-card"
              style={{
                animationDelay: `${card.delay}s`,
                "--card-color": card.bgColor,
              }}
            >
              <div className="card-background" style={{ background: card.color }}></div>
              <div className="card-content">
                <div className="card-icon">{card.icon}</div>
                <div className="card-info">
                  <h3 className="card-title">{card.title}</h3>
                  <div className="card-value">
                    <span className="number">{card.value}</span>
                    <span className="plus-sign">+</span>
                  </div>
                  <p className="card-description">{card.description}</p>
                </div>
                <div className="card-wave"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-footer">
          <div className="footer-stat">
            <span className="footer-label">Success Rate:</span>
            <span className="footer-value">98.5%</span>
          </div>
          <div className="footer-stat">
            <span className="footer-label">Avg Processing Time:</span>
            <span className="footer-value">2.3 min</span>
          </div>
        </div>
      </div>
    </>
  );
}
