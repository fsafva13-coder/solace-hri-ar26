import React from "react";

const EMOTION_COLORS = {
  happy: "#32CD32", sad: "#6495ED", angry: "#FF4500",
  surprised: "#FFD700", fearful: "#9370DB", disgusted: "#FF69B4", neutral: "#00FFFF",
};

const SOLACEFace = ({ emotions }) => {
  const dominant = emotions
    ? Object.entries(emotions).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
    : "neutral";

  const color = EMOTION_COLORS[dominant] || "#00FFFF";

  const renderEyes = () => {
    switch (dominant) {
      case "happy":
        return (
          <>
            <path d="M 130 170 Q 150 155 170 170" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 230 170 Q 250 155 270 170" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
          </>
        );
      case "sad":
        return (
          <>
            <path d="M 130 165 Q 150 178 170 165" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 230 165 Q 250 178 270 165" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
          </>
        );
      case "angry":
        return (
          <>
            <ellipse cx="150" cy="170" rx="22" ry="14" fill="#0a1a2a" stroke={color} strokeWidth="2" />
            <ellipse cx="250" cy="170" rx="22" ry="14" fill="#0a1a2a" stroke={color} strokeWidth="2" />
            <ellipse cx="150" cy="172" rx="10" ry="10" fill={color} />
            <ellipse cx="250" cy="172" rx="10" ry="10" fill={color} />
            <line x1="128" y1="155" x2="172" y2="162" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <line x1="228" y1="162" x2="272" y2="155" stroke={color} strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case "surprised":
        return (
          <>
            <ellipse cx="150" cy="170" rx="24" ry="24" fill="#0a1a2a" stroke={color} strokeWidth="2" />
            <ellipse cx="250" cy="170" rx="24" ry="24" fill="#0a1a2a" stroke={color} strokeWidth="2" />
            <ellipse cx="150" cy="170" rx="10" ry="10" fill={color} />
            <ellipse cx="250" cy="170" rx="10" ry="10" fill={color} />
          </>
        );
      case "fearful":
        return (
          <>
            <ellipse cx="150" cy="168" rx="24" ry="20" fill="#0a1a2a" stroke={color} strokeWidth="2" />
            <ellipse cx="250" cy="168" rx="24" ry="20" fill="#0a1a2a" stroke={color} strokeWidth="2" />
            <ellipse cx="150" cy="170" rx="10" ry="10" fill={color} />
            <ellipse cx="250" cy="170" rx="10" ry="10" fill={color} />
            <line x1="132" y1="148" x2="155" y2="143" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <line x1="268" y1="148" x2="245" y2="143" stroke={color} strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case "disgusted":
        return (
          <>
            <ellipse cx="150" cy="172" rx="22" ry="10" fill="#0a1a2a" stroke={color} strokeWidth="2" />
            <ellipse cx="250" cy="172" rx="22" ry="10" fill="#0a1a2a" stroke={color} strokeWidth="2" />
            <ellipse cx="150" cy="174" rx="9" ry="7" fill={color} />
            <ellipse cx="250" cy="174" rx="9" ry="7" fill={color} />
            <line x1="130" y1="155" x2="170" y2="158" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <line x1="230" y1="158" x2="270" y2="155" stroke={color} strokeWidth="3" strokeLinecap="round" />
          </>
        );
      default:
        return (
          <>
            <ellipse cx="150" cy="170" rx="22" ry="16" fill="#0a1a2a" stroke={color} strokeWidth="2" />
            <ellipse cx="250" cy="170" rx="22" ry="16" fill="#0a1a2a" stroke={color} strokeWidth="2" />
            <ellipse cx="150" cy="172" rx="10" ry="10" fill={color} />
            <ellipse cx="250" cy="172" rx="10" ry="10" fill={color} />
          </>
        );
    }
  };

  const renderMouth = () => {
    switch (dominant) {
      case "happy":
        return <path d="M 160 260 Q 200 295 240 260" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />;
      case "sad":
        return <path d="M 160 278 Q 200 255 240 278" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />;
      case "surprised":
        return <ellipse cx="200" cy="268" rx="28" ry="22" fill="#0a1a2a" stroke={color} strokeWidth="3" />;
      case "angry":
        return <path d="M 165 272 Q 200 258 235 272" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />;
      case "fearful":
        return (
          <>
            <ellipse cx="200" cy="270" rx="32" ry="16" fill="#0a1a2a" stroke={color} strokeWidth="3" />
            <line x1="175" y1="270" x2="225" y2="270" stroke={color} strokeWidth="2" opacity="0.4" />
          </>
        );
      case "disgusted":
        return (
          <path d="M 165 268 Q 178 258 191 268 Q 204 278 217 268 Q 228 260 238 268"
            stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
        );
      default:
        return <line x1="170" y1="268" x2="230" y2="268" stroke={color} strokeWidth="5" strokeLinecap="round" />;
    }
  };

  return (
    <svg width="280" height="280" viewBox="0 0 400 400"
      style={{ filter: `drop-shadow(0 0 20px ${color})`, transition: "filter 0.6s ease" }}
    >
      <rect x="80" y="80" width="240" height="240" rx="40" ry="40"
        fill="#050d1a" stroke={color} strokeWidth="3"
        style={{ transition: "stroke 0.6s ease" }}
      />
      <rect x="120" y="90" width="160" height="20" rx="4" fill="#0a1a2a" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="145" cy="100" r="4" fill={color} opacity="0.8" />
      <circle cx="160" cy="100" r="4" fill={color} opacity="0.4" />
      <line x1="200" y1="80" x2="200" y2="48" stroke={color} strokeWidth="3" />
      <circle cx="200" cy="42" r="10" fill="#050d1a" stroke={color} strokeWidth="2" />
      <circle cx="200" cy="42" r="5" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      <rect x="56" y="148" width="24" height="64" rx="6" fill="#050d1a" stroke={color} strokeWidth="2" />
      <rect x="320" y="148" width="24" height="64" rx="6" fill="#050d1a" stroke={color} strokeWidth="2" />
      <line x1="68" y1="162" x2="68" y2="198" stroke={color} strokeWidth="2" opacity="0.5" />
      <line x1="332" y1="162" x2="332" y2="198" stroke={color} strokeWidth="2" opacity="0.5" />
      {renderEyes()}
      <circle cx="200" cy="220" r="4" fill={color} opacity="0.5" />
      {renderMouth()}
      <rect x="150" y="295" width="100" height="10" rx="4" fill={color} opacity="0.2" />
    </svg>
  );
};

export default SOLACEFace;