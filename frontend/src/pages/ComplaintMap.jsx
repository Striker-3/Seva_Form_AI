import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/card.css";
import "../styles/button.css";

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 13);
        }
    }, [position, map]);
    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
}

export default function ComplaintMap() {
    const [position, setPosition] = useState(null);
    const [offices, setOffices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [complaintText, setComplaintText] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState(null);

    useEffect(() => {
        // Get User Location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                    fetchNearbyOffices(latitude, longitude);
                },
                (err) => {
                    console.error("Location error:", err);
                    // Default to Nagpur
                    setPosition([21.1458, 79.0882]);
                    fetchNearbyOffices(21.1458, 79.0882);
                }
            );
        } else {
            // Default to Nagpur if no geolocation
            setPosition([21.1458, 79.0882]);
            fetchNearbyOffices(21.1458, 79.0882);
        }
    }, []);

    const fetchNearbyOffices = async (lat, lng) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/gis/nearby", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lat, lng, radius_km: 20 }),
            });
            const data = await res.json();
            setOffices(data);
        } catch (error) {
            console.error("Failed to fetch offices", error);
        } finally {
            setLoading(false);
        }
    };

    const handleComplaintSubmit = async (e) => {
        e.preventDefault();
        // Simulate submission
        setSubmissionStatus("submitting");
        setTimeout(() => {
            setSubmissionStatus("success");
            setTimeout(() => {
                setSubmissionStatus(null);
                setSelectedOffice(null);
                setComplaintText("");
            }, 3000);
        }, 1500);
    };

    return (
        <Layout>
            <div className="container" style={{ maxWidth: "1200px", marginTop: "40px" }}>
                <h1 style={{ marginBottom: "20px", color: "#1f2937" }}>Find Nearby Offices</h1>
                <p style={{ marginBottom: "30px", color: "#6b7280" }}>
                    Select a government office on the map to file a complaint or request service.
                </p>

                <div className="card" style={{ padding: "0", overflow: "hidden", height: "600px", position: "relative" }}>
                    {/* Map */}
                    {position && (
                        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker position={position} />

                            {offices.map((office) => (
                                <Marker key={office.id} position={[office.lat, office.lng]}>
                                    <Popup>
                                        <div style={{ minWidth: "200px" }}>
                                            <h3 style={{ margin: "0 0 5px 0", fontSize: "16px", fontWeight: "600" }}>{office.name}</h3>
                                            <span style={{ fontSize: "12px", background: "#e5e7eb", padding: "2px 8px", borderRadius: "10px", color: "#374151" }}>{office.type}</span>
                                            <p style={{ margin: "10px 0", fontSize: "13px", color: "#4b5563" }}>{office.address}</p>
                                            <p style={{ margin: "5px 0", fontSize: "13px" }}>📞 {office.contact}</p>
                                            <button
                                                className="btn btn-primary"
                                                style={{ width: "100%", padding: "8px", marginTop: "10px", fontSize: "13px" }}
                                                onClick={() => setSelectedOffice(office)}
                                            >
                                                Raise Complaint
                                            </button>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    )}

                    {loading && (
                        <div style={{ position: "absolute", top: "20px", right: "20px", background: "white", padding: "10px 20px", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", zIndex: 1000 }}>
                            Loading nearby offices...
                        </div>
                    )}
                </div>

                {/* Complaint Modal Overlay */}
                {selectedOffice && (
                    <div style={{
                        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                        background: "rgba(0,0,0,0.5)", zIndex: 9999,
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <div className="card" style={{ width: "500px", maxWidth: "90%", position: "relative" }}>
                            <button
                                onClick={() => setSelectedOffice(null)}
                                style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", fontSize: "18px", cursor: "pointer" }}
                            >
                                ✕
                            </button>

                            {submissionStatus === "success" ? (
                                <div style={{ textAlign: "center", padding: "20px" }}>
                                    <div style={{ fontSize: "40px", marginBottom: "10px" }}>✅</div>
                                    <h3 style={{ color: "#10b981" }}>Complaint Submitted!</h3>
                                    <p>We have forwarded your issue to <b>{selectedOffice.name}</b>.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleComplaintSubmit}>
                                    <h2 style={{ fontSize: "20px", marginBottom: "5px" }}>Raise Complaint</h2>
                                    <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "20px" }}>
                                        To: <b>{selectedOffice.name}</b> <br />
                                        ({selectedOffice.address})
                                    </p>

                                    <div style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>Describe Issue</label>
                                        <textarea
                                            value={complaintText}
                                            onChange={(e) => setComplaintText(e.target.value)}
                                            rows="4"
                                            required
                                            placeholder="Explain the issue you are facing..."
                                            style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "8px", outline: "none" }}
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={submissionStatus === "submitting"}
                                        style={{ width: "100%" }}
                                    >
                                        {submissionStatus === "submitting" ? "Submitting..." : "Submit Complaint"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </Layout>
    );
}
