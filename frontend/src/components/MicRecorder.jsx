import React, { useState } from "react";
import "../styles/MicRecorder.css";

export default function MicRecorder({ onRecorded }) {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState(null);

  // Use refs to persist instances across re-renders
  const mediaRecorderRef = React.useRef(null);
  const streamRef = React.useRef(null);
  const audioChunksRef = React.useRef([]);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        onRecorded(blob);
        audioChunksRef.current = [];

        // Stop all tracks to release microphone
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      setError("Microphone access denied. Please allow microphone access and try again.");
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="mic-recorder-wrapper">
      <button
        className={`record-button ${recording ? "recording" : ""}`}
        onClick={recording ? stopRecording : startRecording}
        disabled={!!error}
      >
        <span className="button-icon">
          {recording ? "⏹" : "🎙"}
        </span>
        <span className="button-text">
          {recording ? "Stop Recording" : "Start Recording"}
        </span>
        {recording && <span className="recording-indicator"></span>}
      </button>
      {error && (
        <p className="recorder-error">{error}</p>
      )}
      {recording && (
        <p className="recording-status">🔴 Recording in progress...</p>
      )}
    </div>
  );
}
