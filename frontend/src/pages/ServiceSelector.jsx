import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getServices } from "../api/backend.js";
import Layout from "../components/Layout";
import "../styles/ServiceSelection.css";

function ServiceSelection() {
  const { t } = useTranslation();
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getServices()
      .then((data) => setServices(data))
      .catch((err) => setError(err.message || "Failed to load services"))
      .finally(() => setLoading(false));
  }, []);

  const getCategoryIcon = (category) => {
    if (category.includes("civil")) return "📜";
    if (category.includes("financial")) return "💰";
    if (category.includes("residency")) return "🏠";
    return "📋";
  };

  return (
    <Layout>
      <div className="container">
        <h1>{t('services.title')}</h1>
        <p className="subtitle">{t('services.subtitle')}</p>

        {loading ? (
          <div className="loading-state">
            <p>{t('services.loading')}</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>❌ Error loading services: {error}</p>
            <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
              Make sure the backend server is running on http://localhost:8000
            </p>
          </div>
        ) : !services || Object.keys(services).length === 0 ? (
          <div className="empty-state">
            <p>No services available — is the backend running?</p>
          </div>
        ) : (
          <div className="card-grid">
            {Object.entries(services).map(([key, service]) => (
              <div className="service-card" key={key}>
                <div className="service-header">
                  <span className="category-icon">{getCategoryIcon(service.category)}</span>
                  <div>
                    <h2>{t(service.service_name)}</h2>
                    <p className="category-badge">{t(service.category)}</p>
                  </div>
                </div>

                {service.required_documents && service.required_documents.length > 0 && (
                  <div className="required-docs">
                    <p className="docs-label">{t('services.required_docs')}</p>
                    <ul>
                      {service.required_documents.map((doc, idx) => (
                        <li key={idx}>
                          {doc.mandatory ? "✓" : "○"} {t(doc.name)}
                          {doc.mandatory && <span className="mandatory-badge">{t('services.required')}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className="select-service-btn"
                  onClick={() => navigate(`/upload/${key}`)}
                >
                  {t('services.apply_now')} →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ServiceSelection;
