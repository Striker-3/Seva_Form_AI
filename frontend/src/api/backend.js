// src/api/backend.js
const BASE_URL = "http://localhost:8000";

/* =====================
   SERVICES
===================== */
export async function getServices() {
  const res = await fetch(`${BASE_URL}/services`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to fetch services");

  return res.json();
}

export async function getService(serviceId) {
  const res = await fetch(`${BASE_URL}/services/${serviceId}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to fetch service details");

  return res.json();
}

/* =====================
   DOCUMENT UPLOAD
===================== */
export async function uploadDocument({ service_id, document_name, file }) {
  const formData = new FormData();
  formData.append("service_id", service_id);
  formData.append("document_name", document_name);
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/documents/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Document upload failed");

  return res.json();
}

/* =====================
   VOICE FORM API ✅
===================== */
export async function uploadVoice(audio, language_mode = "transcribe") {
  const formData = new FormData();
  formData.append("audio", audio);
  formData.append("language_mode", language_mode);

  const res = await fetch(`${BASE_URL}/api/voice-fill-form`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Voice processing failed");

  return res.json();
}

/* =====================
   GENERATE FORM FROM DOCUMENTS
===================== */
export async function generateFormFromDocuments(serviceId, entitiesList) {
  const res = await fetch(`${BASE_URL}/documents/generate-form`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: serviceId,
      entities_list: entitiesList,
    }),
  });

  if (!res.ok) throw new Error("Failed to generate form from documents");

  return res.json();
}

/* =====================
   FORM SUBMISSION
===================== */
export async function submitForm(formData) {
  const res = await fetch(`${BASE_URL}/api/submit-form`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Form submission failed");

  return res.json();
}
