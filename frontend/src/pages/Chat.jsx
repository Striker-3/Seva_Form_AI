import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/card.css";
import "../styles/button.css";

export default function Chat() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
    ]);
    const [inputText, setInputText] = useState("");

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMsg = { id: Date.now(), text: inputText, sender: "user" };
        setMessages((prev) => [...prev, newMsg]);
        setInputText("");

        // Call Backend API
        try {
            const res = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: inputText }),
            });

            if (!res.ok) throw new Error("Failed to fetch response");

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, text: data.response, sender: "bot" }
            ]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting to the server.", sender: "bot" }
            ]);
        }
    };

    return (
        <Layout>
            <div className="container" style={{ maxWidth: "800px", marginTop: "40px" }}>
                <h1 style={{ marginBottom: "20px", color: "#1f2937" }}>Support Chat</h1>
                <div className="card" style={{ height: "600px", display: "flex", flexDirection: "column", padding: "0", overflow: "hidden" }}>

                    {/* Chat Header */}
                    <div style={{ padding: "15px 20px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#ff6b35", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>💬</div>
                        <div>
                            <div style={{ fontWeight: "600", color: "#1f2937" }}>Customer Support</div>
                            <div style={{ fontSize: "12px", color: "#10b981", display: "flex", alignItems: "center", gap: "4px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "block" }}></span>
                                Online
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div style={{ flex: 1, padding: "20px", overflowY: "auto", background: "#fff", display: "flex", flexDirection: "column", gap: "15px" }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                                    maxWidth: "70%",
                                    padding: "12px 16px",
                                    borderRadius: "12px",
                                    background: msg.sender === "user" ? "#ff6b35" : "#f3f4f6",
                                    color: msg.sender === "user" ? "white" : "#1f2937",
                                    borderBottomRightRadius: msg.sender === "user" ? "4px" : "12px",
                                    borderBottomLeftRadius: msg.sender === "bot" ? "4px" : "12px",
                                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    whiteSpace: "pre-wrap"
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSend} style={{ padding: "15px 20px", borderTop: "1px solid #e5e7eb", display: "flex", gap: "10px", background: "#f9fafb" }}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            style={{
                                flex: 1,
                                padding: "12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px",
                                fontSize: "15px",
                                outline: "none"
                            }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ padding: "0 24px", borderRadius: "8px" }}>
                            Send
                        </button>
                    </form>

                </div>
            </div>
        </Layout>
    );
}
