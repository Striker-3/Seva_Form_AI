// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ServiceSelector from "./pages/ServiceSelector";
import DocumentUploadPage from "./pages/DocumentUpload";
import VoiceForm from "./pages/VoiceForm";
import AdminDashboard from "./pages/AdminDashboard";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import FormPage from "./pages/FormPage";
export default function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Step 1: Select Service */}
      <Route path="/services" element={<ServiceSelector />} />

      {/* Step 2: Upload Documents */}
      <Route path="/upload/:serviceId" element={<DocumentUploadPage />} />
      <Route path="/form/:serviceId" element={<FormPage />} />
      {/* Voice-based Auto Fill - Standalone */}
      <Route path="/voice" element={<VoiceForm />} />

      {/* Voice-based Auto Fill - After Document Upload */}
      <Route path="/voice/:serviceId" element={<VoiceForm />} />

      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* New Pages */}
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Auth & Chat */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}
