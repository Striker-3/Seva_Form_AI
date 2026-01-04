import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/card.css";
import "../styles/button.css";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dummy registration logic
        console.log("Register data:", formData);
        navigate("/login");
    };

    return (
        <Layout>
            <div className="container" style={{ maxWidth: "500px", marginTop: "40px" }}>
                <div className="card">
                    <h2 className="card-title" style={{ textAlign: "center", marginBottom: "30px" }}>Register</h2>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "8px",
                                    fontSize: "16px"
                                }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "8px",
                                    fontSize: "16px"
                                }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Mobile Number</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter mobile number"
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "8px",
                                    fontSize: "16px"
                                }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: "30px" }}>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create password"
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "8px",
                                    fontSize: "16px"
                                }}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: "100%", fontSize: "16px" }}>
                            Register
                        </button>
                    </form>

                    <div style={{ marginTop: "20px", textAlign: "center", color: "#6b7280" }}>
                        Already have an account? <Link to="/login" style={{ color: "#ff6b35", fontWeight: "600", textDecoration: "none" }}>Login here</Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
