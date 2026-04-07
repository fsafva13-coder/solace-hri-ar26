import React from "react";

const EMOTION_COLORS = {
  happy: "#32CD32", sad: "#6495ED", angry: "#FF4500",
  surprised: "#FFD700", fearful: "#9370DB", disgusted: "#FF69B4", neutral: "#00FFFF",
};

const EmotionBars = ({ emotions }) => {
  const defaultEmotions = { happy: 0, sad: 0, angry: 0, surprised: 0, fearful: 0, disgusted: 0, neutral: 0 };
  const data = emotions || defaultEmotions;
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const dominant = sorted[0][0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ fontSize: "11px", color: "#336", letterSpacing: "2px" }}>EMOTION DETECTION</div>
      {sorted.map(([emotion, score]) => (
        <div key={emotion} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "80px", fontSize: "11px", letterSpacing: "1px",
            color: emotion === dominant ? EMOTION_COLORS[emotion] : "#445",
            fontWeight: emotion === dominant ? "bold" : "normal",
            textTransform: "uppercase",
          }}>
            {emotion}
          </div>
          <div style={{ flex: 1, background: "#0a1a2a", borderRadius: "3px", height: "8px", overflow: "hidden" }}>
            <div style={{
              width: `${(score * 100).toFixed(1)}%`, height: "100%",
              background: EMOTION_COLORS[emotion],
              borderRadius: "3px", transition: "width 0.5s ease",
              boxShadow: emotion === dominant ? `0 0 6px ${EMOTION_COLORS[emotion]}` : "none",
            }} />
          </div>
          <div style={{ width: "35px", fontSize: "11px", color: "#445", textAlign: "right" }}>
            {(score * 100).toFixed(0)}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmotionBars;