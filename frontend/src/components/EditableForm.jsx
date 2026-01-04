import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "../styles/form.css";

export default function EditableForm({ data, serviceId }) {
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    father_name: "",
    mother_name: "",
    address: "",
    permanent_address: "",
    aadhaar: "",
    pan: "",
    mobile: "",
    caste: "",
    marital_status: "",
  });

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!previewMode) {
      setPreviewMode(true);
      return;
    }

    const element = document.querySelector(".editable-form-container");
    if (!element) return;

    try {
      const btn = e.target;
      const oldText = btn.textContent;
      btn.textContent = "⏳ Generating PDF...";
      btn.disabled = true;

      // Enable PDF mode for proper rendering
      element.classList.add("pdf-mode");

      // INJECT FORCE BLACK STYLES
      const style = document.createElement('style');
      style.innerHTML = `
        * {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          opacity: 1 !important;
        }
        /* Hide redundant page title and other non-form elements */
        button, .form-submit-section, .preview-actions, nav, header, .form-title {
          display: none !important;
        }
        /* Thinner, cleaner borders for inputs */
        input, textarea, select {
          border: none !important;
          border-bottom: 1px solid #000000 !important;
          font-weight: 600 !important;
          padding-bottom: 2px !important;
        }
        /* Better spacing between fields */
        .form-field-group {
          margin-bottom: 10px !important;
        }
        /* Labels formatting */
        .form-label {
          font-size: 11px !important;
          font-weight: bold !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          margin-bottom: 2px !important;
        }
        ::placeholder {
          /* Hide placeholders in print */
          color: transparent !important;
          opacity: 0 !important;
        }
      `;
      document.head.appendChild(style);

      // Small delay to ensure styles are applied
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(element, {
        scale: 3, // Even higher resolution
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollY: -window.scrollY,
        windowWidth: 800, // Standard form width
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0); // Maximum quality

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;

      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, "JPEG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - margin * 2;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - margin * 2;
      }

      pdf.save(`GOI_${serviceId}_${Date.now()}.pdf`);

      element.classList.remove("pdf-mode");
      btn.textContent = oldText;
      btn.disabled = false;
    } catch (err) {
      element.classList.remove("pdf-mode");
      console.error(err);
      alert("PDF generation failed");
    }
  };

  return (
    <div className="editable-form-container">
      <div className={`form-box ${previewMode ? "preview-mode" : ""}`}>
        {/* HEADER */}
        <div className="govt-header" style={{ textAlign: 'center', padding: '10px 0', borderBottom: '2px double #000', marginBottom: '15px' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#000', margin: '3px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            GOVERNMENT OF INDIA
          </h1>
          <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#000', margin: '2px 0' }}>
            Application Form
          </h3>
        </div>

        <h3 className="form-title screen-only">
          {previewMode ? "Review Application" : "Auto-Filled Editable Form"}
        </h3>

        <div className="form-fields">
          {[
            ["Full Name", "name"],
            ["Father Name", "father_name"],
            ["DOB", "dob"],
            ["Gender", "gender"],
            ["Aadhaar", "aadhaar"],
            ["PAN", "pan"],
            ["Mobile", "mobile"],
            ["Address", "address"],
            ["Permanent Address", "permanent_address"],
          ].map(([label, key]) => (
            <div className="form-field-group" key={key}>
              <label className="form-label">{label}</label>
              <input
                className="form-input"
                value={formData[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                readOnly={previewMode}
              />
            </div>
          ))}
        </div>

        <div className="form-submit-section">
          {!previewMode ? (
            <button className="btn-submit-form" onClick={handleSubmit}>
              📋 Preview Application
            </button>
          ) : (
            <div className="preview-actions">
              <button className="btn-edit" onClick={() => setPreviewMode(false)}>
                ✏️ Edit
              </button>
              <button className="btn-confirm" onClick={handleSubmit}>
                📥 Download PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="govt-footer">
        <p>
          I hereby declare that the information provided above is true and
          correct.
        </p>
        <div className="signature-line"></div>
        <p>Signature of Applicant</p>
      </div>
    </div>
  );
}
