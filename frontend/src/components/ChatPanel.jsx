import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const EMOTION_COLORS = {
  happy: "#32CD32", sad: "#6495ED", angry: "#FF4500",
  surprised: "#FFD700", fearful: "#9370DB", disgusted: "#FF69B4", neutral: "#00FFFF",
};

const ChatPanel = ({ emotions }) => {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello. I'm SOLACE — your emotion-aware companion. I'm here with you." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getDominant = () => {
    if (!emotions) return "neutral";
    return Object.entries(emotions).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  };

  const dominant = getDominant();
  const dominantColor = EMOTION_COLORS[dominant] || "#00FFFF";

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const allScores = emotions || { happy: 0, sad: 0, angry: 0, surprised: 0, fearful: 0, disgusted: 0, neutral: 1 };
      const response = await axios.post("http://localhost:8000/respond", {
        session_id: "session_001",
        emotion: dominant,
        confidence: allScores[dominant] || 1,
        all_scores: allScores,
        user_message: input,
      });
      setMessages((prev) => [...prev, { role: "assistant", text: response.data.reply, emotion: dominant }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        text: "Backend not connected yet. Waiting for Safva's server...",
        emotion: dominant,
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: "#060e1f",
    }}>
      {/* Chat header */}
      <div style={{
        padding: "16px", borderBottom: "1px solid #0a2a4a",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          background: "#0a2a4a", border: `1px solid ${dominantColor}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: dominantColor, fontSize: "14px", fontWeight: "bold",
        }}>S</div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "bold", color: "#eee" }}>SOLACE</div>
          <div style={{ fontSize: "11px", color: dominantColor }}>Emotion-Aware Companion · Online</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <div style={{
              maxWidth: "85%",
              marginLeft: msg.role === "user" ? "auto" : "0",
              background: msg.role === "user" ? "#0a2a4a" : "#0d1f35",
              color: "#eee",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              lineHeight: "1.6",
              border: msg.role === "user" ? "none" : `1px solid #0a2a4a`,
            }}>
              {msg.text}
            </div>
            {msg.role === "assistant" && msg.emotion && (
              <div style={{ fontSize: "10px", color: "#334", marginTop: "4px", letterSpacing: "1px" }}>
                · detected: {msg.emotion.toUpperCase()}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ fontSize: "12px", color: "#334", letterSpacing: "1px" }}>SOLACE is thinking...</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        display: "flex", padding: "12px", borderTop: "1px solid #0a2a4a", gap: "8px",
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{
            flex: 1, background: "#0a1a2a", border: "1px solid #0a2a4a",
            borderRadius: "8px", padding: "10px 14px", color: "#eee",
            fontFamily: "monospace", fontSize: "13px", outline: "none",
          }}
        />
        <button onClick={sendMessage} disabled={loading}
          style={{
            background: dominantColor, color: "#000", border: "none",
            borderRadius: "8px", padding: "10px 16px", cursor: "pointer",
            fontWeight: "bold", fontSize: "16px",
          }}>
          →
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;