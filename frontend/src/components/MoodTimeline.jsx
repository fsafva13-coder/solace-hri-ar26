import React from "react";

const EMOTION_COLORS = {
  happy: "#32CD32", sad: "#6495ED", angry: "#FF4500",
  surprised: "#FFD700", fearful: "#9370DB", disgusted: "#FF69B4", neutral: "#00FFFF",
};

const MoodTimeline = ({ history }) => {
  return (
    <div style={{ width: "100%", maxWidth: "300px" }}>
      <div style={{ fontSize: "11px", color: "#336", letterSpacing: "2px", marginBottom: "10px" }}>
        MOOD TIMELINE · LAST {history.length} READINGS
      </div>

      {/* Color bar */}
      <div style={{
        display: "flex", height: "10px", borderRadius: "6px",
        overflow: "hidden", width: "100%", background: "#0a1a2a",
      }}>
        {history.map((entry, i) => (
          <div key={i} style={{
            flex: 1,
            background: EMOTION_COLORS[entry.emotion] || "#808080",
            transition: "background 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  );
};

export default MoodTimeline;