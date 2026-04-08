import React, { useRef, useState, useEffect } from "react";
import SOLACEFace from "./components/SOLACEFace";
import EmotionBars from "./components/EmotionBars";
import ChatPanel from "./components/ChatPanel";
import MoodTimeline from "./components/MoodTimeline";
import useEmotionDetection from "./hooks/useEmotionDetection";

function App() {
  const videoRef = useRef(null);
  const { emotions, isReady } = useEmotionDetection(videoRef);
  const [moodHistory, setMoodHistory] = useState([]);
  const [simulatedEmotions, setSimulatedEmotions] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const activeEmotions = simulatedEmotions || emotions;

  const EMOTION_COLORS = {
    happy: "#32CD32", sad: "#6495ED", angry: "#FF4500",
    surprised: "#FFD700", fearful: "#9370DB", disgusted: "#FF69B4", neutral: "#00FFFF",
  };

  useEffect(() => {
    if (!activeEmotions) return;
    const dominant = Object.entries(activeEmotions).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    const time = new Date().toLocaleTimeString();
    setMoodHistory((prev) => [...prev.slice(-20), { emotion: dominant, time }]);
  }, [activeEmotions]);

  const simulateEmotion = (emotion) => {
    const scores = { happy: 0.02, sad: 0.02, angry: 0.02, surprised: 0.02, fearful: 0.02, disgusted: 0.02, neutral: 0.02 };
    scores[emotion] = 0.89;
    setSimulatedEmotions(scores);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && videoRef.current) {
      const url = URL.createObjectURL(file);
      videoRef.current.src = url;
      videoRef.current.play();
      setVideoLoaded(true);
      setSimulatedEmotions(null);
    }
  };

  const getDominant = () => {
    if (!activeEmotions) return "neutral";
    return Object.entries(activeEmotions).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };

  const dominant = getDominant();
  const dominantColor = EMOTION_COLORS[dominant] || "#00FFFF";
  const confidence = activeEmotions ? Math.round((activeEmotions[dominant] || 0) * 100) : 0;

  return (
    <div style={{
      height: "100vh", background: "#050d1a", color: "#eee",
      display: "flex", flexDirection: "column", fontFamily: "monospace", overflow: "hidden",
    }}>
      {/* Top bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 24px", borderBottom: "1px solid #0a2a4a", background: "#060e1f",
      }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", color: "#00FFFF", letterSpacing: "4px" }}>SOLACE</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#00FFFF", letterSpacing: "2px" }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: isReady ? "#00FFFF" : "#FF4500",
            boxShadow: isReady ? "0 0 6px #00FFFF" : "0 0 6px #FF4500",
          }} />
          {isReady ? "EMOTION ENGINE ACTIVE" : "LOADING MODELS..."}
        </div>
        <div style={{
          fontSize: "12px", color: "#00FFFF", letterSpacing: "2px",
          border: "1px solid #00FFFF", padding: "4px 12px", borderRadius: "20px",
        }}>
          AR26 · MISSION 3
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left panel */}
        <div style={{
          width: "380px", borderRight: "1px solid #0a2a4a", padding: "16px",
          display: "flex", flexDirection: "column", gap: "16px", overflowY: "auto",
        }}>
          <div style={{ fontSize: "11px", color: "#336", letterSpacing: "2px" }}>INPUT SOURCE</div>

          {/* Video player */}
          <div style={{ position: "relative", border: "1px solid #0a3a5a", borderRadius: "8px", overflow: "hidden" }}>
            <video
              ref={videoRef}
              autoPlay muted loop controls
              style={{ width: "100%", display: "block", background: "#020810", minHeight: "160px" }}
            />
            <div style={{
              position: "absolute", bottom: "8px", left: "8px",
              fontSize: "11px", color: "#00FFFF", letterSpacing: "2px",
              background: "rgba(0,0,0,0.6)", padding: "2px 8px", borderRadius: "4px",
            }}>
              {videoLoaded ? "ANALYZING · 24fps" : "NO VIDEO LOADED"}
            </div>
          </div>

          {/* Upload button */}
          <label style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "8px", padding: "10px", borderRadius: "8px",
            border: "1px dashed #0a3a5a", cursor: "pointer",
            fontSize: "11px", color: "#00FFFF", letterSpacing: "2px",
            background: "#060e1f", transition: "all 0.3s",
          }}>
            📂 UPLOAD VIDEO FILE
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              style={{ display: "none" }}
            />
          </label>

          <div style={{ fontSize: "10px", color: "#334", letterSpacing: "1px", textAlign: "center" }}>
            Upload any video — SOLACE detects emotions automatically
          </div>

          <EmotionBars emotions={activeEmotions} />
        </div>

        {/* Middle panel */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "flex-start", padding: "24px 16px", gap: "16px",
          overflowY: "auto", borderRight: "1px solid #0a2a4a",
        }}>
          <div style={{ fontSize: "11px", color: "#336", letterSpacing: "2px" }}>SOLACE COMPANION</div>

          <SOLACEFace emotions={activeEmotions} />

          <div style={{
            border: `1px solid ${dominantColor}`, color: dominantColor,
            padding: "6px 24px", borderRadius: "20px", fontSize: "14px",
            letterSpacing: "3px", textTransform: "uppercase",
            boxShadow: `0 0 10px ${dominantColor}40`,
            transition: "all 0.5s ease",
          }}>
            {dominant}
          </div>

          {/* Confidence bar */}
          <div style={{ width: "100%", maxWidth: "300px" }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: "11px", color: "#336", marginBottom: "6px", letterSpacing: "2px",
            }}>
              <span>CONFIDENCE</span>
              <span style={{ color: dominantColor }}>{confidence}%</span>
            </div>
            <div style={{ background: "#0a1a2a", borderRadius: "4px", height: "6px" }}>
              <div style={{
                width: `${confidence}%`, height: "100%", borderRadius: "4px",
                background: dominantColor, transition: "width 0.5s ease",
                boxShadow: `0 0 8px ${dominantColor}`,
              }} />
            </div>
          </div>

          <MoodTimeline history={moodHistory} />
        </div>

        {/* Right panel - Chat */}
        <div style={{ width: "380px", display: "flex", flexDirection: "column" }}>
          <ChatPanel emotions={activeEmotions} />
        </div>
      </div>

      {/* Bottom bar - simulate emotions */}
      <div style={{
        display: "flex", alignItems: "center", gap: "12px", padding: "12px 24px",
        borderTop: "1px solid #0a2a4a", background: "#060e1f", flexWrap: "wrap",
      }}>
        <span style={{ fontSize: "11px", color: "#336", letterSpacing: "2px" }}>SIMULATE EMOTION:</span>
        {Object.keys(EMOTION_COLORS).map((emotion) => (
          <button
            key={emotion}
            onClick={() => simulateEmotion(emotion)}
            style={{
              background: dominant === emotion ? `${EMOTION_COLORS[emotion]}22` : "transparent",
              border: `1px solid ${EMOTION_COLORS[emotion]}`,
              color: EMOTION_COLORS[emotion],
              padding: "4px 16px", borderRadius: "20px",
              fontSize: "12px", letterSpacing: "1px", cursor: "pointer",
              textTransform: "capitalize",
              boxShadow: dominant === emotion ? `0 0 8px ${EMOTION_COLORS[emotion]}` : "none",
              transition: "all 0.3s",
            }}
          >
            {emotion.toUpperCase()}
          </button>
        ))}
        <button
          onClick={() => {
            setSimulatedEmotions(null);
            setVideoLoaded(false);
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.removeAttribute("src");
              videoRef.current.load();
            }
         }}
          style={{
            background: "transparent", border: "1px solid #334",
            color: "#334", padding: "4px 16px", borderRadius: "20px",
            fontSize: "12px", letterSpacing: "1px", cursor: "pointer",
          }}
        >
          RESET
        </button>
      </div>
    </div>
  );
}

export default App;