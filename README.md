# SOLACE 🤖
### *An emotion-aware AI companion that sees how you feel — and responds with genuine care.*

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.135-009688?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Groq](https://img.shields.io/badge/LLM-Groq%20%2F%20Llama3-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![AR26](https://img.shields.io/badge/AR26-HackXelerator-purple?style=flat-square)
![Mission](https://img.shields.io/badge/Mission%203-HRI-cyan?style=flat-square)

---

## 📌 Project Overview

Millions of elderly individuals and people facing mental health challenges live without consistent emotional support. Existing AI assistants respond to *what you say* — but ignore *how you feel*. SOLACE bridges that gap.

**SOLACE** (Social & Observational Learning Agent for Compassionate Engagement) is a real-time emotion-aware AI companion that detects a user's emotional state from a video source using in-browser computer vision, then routes that context through a multi-agent backend to generate compassionate, tone-appropriate responses — all while maintaining a session memory of the user's emotional journey and screening every output through a dedicated ethics layer.

Built for the **AR26 HackXelerator — Mission 3: Human-Robot Interaction**, by a team of three CS students at the University of West London.

---

## ✨ Features

- 🎭 **Real-time emotion detection** — classifies 7 emotional states (happy, sad, angry, surprised, fearful, disgusted, neutral) from a video source using face-api.js running entirely in-browser
- 🤖 **Animated SOLACE face** — an expressive robot companion that visually reacts to detected emotions in real time (eyes, brows, mouth all animate)
- 🧠 **Multi-agent orchestration** — 4 specialised AI agents work in sync: Emotion, Conversation, Memory, and Ethics
- 💬 **Empathetic dialogue** — powered by Groq's Llama 3, tuned for compassionate, care-first responses
- 🧵 **Session memory** — tracks the user's emotional arc across the session and references it in responses
- 🛡️ **Ethics / Safety agent** — screens every LLM output before it reaches the user, blocking harmful content
- 📊 **Mood timeline** — live visual chart showing the user's emotional journey throughout the session
- 🔒 **Privacy first** — all face processing runs client-side; no biometric data ever leaves the device
- 💸 **100% free stack** — zero paid APIs, fully open source, deployable today

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Emotion Detection | face-api.js (TinyFaceDetector + FaceExpressionNet) |
| Frontend | React 18, HTML5 Canvas, CSS Animations |
| Backend | Python, FastAPI |
| LLM | Groq API — Llama 3 8B (free tier) |
| Agent Orchestration | Custom multi-agent system (4 agents) |
| Frontend Deploy | GitHub Pages |
| Backend Deploy | Render.com (free tier) |

---

## 🖼️ Screenshots

**Main App Interface — SOLACE reacting to detected emotion**
![App UI](./assets/screenshots/app-ui.png)

**Emotion Detection Bars — Live confidence scores**
![Emotion Bars](./assets/screenshots/emotion-bars.png)

**Mood Timeline — Session emotional arc**
![Mood Timeline](./assets/screenshots/mood-timeline.png)

**Landing Page**
![Landing Page](./assets/screenshots/landing-page.png)

---

## 🚀 Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- Free Groq API key from [console.groq.com](https://console.groq.com)

### 1. Clone the repository
```bash
git clone https://github.com/fsafva13-coder/solace-hri-ar26.git
cd solace-hri-ar26
```

### 2. Backend setup
```bash
cd backend
pip install fastapi uvicorn groq python-dotenv
```

Create a `.env` file inside `backend/`:
```
GROQ_API_KEY=your_groq_api_key_here
```

Start the server:
```bash
uvicorn main:app --reload --port 8000
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm install face-api.js axios
```

Download face-api.js model files and place them in `frontend/public/models/`:
- `tiny_face_detector_model-weights_manifest.json`
- `tiny_face_detector_model-shard1`
- `face_expression_recognition_model-weights_manifest.json`
- `face_expression_recognition_model-shard1`

Download from:
```
https://github.com/justadudewhohacks/face-api.js/tree/master/weights
```

Start the frontend:
```bash
npm start
```

---

## 📖 Usage

1. Open the app at `http://localhost:3000`
2. The video source begins processing automatically
3. face-api.js detects the dominant emotion every 200ms
4. Emotion data is sent to the FastAPI backend
5. The 4 agents process and generate a compassionate response
6. SOLACE's face animates to match the detected emotion
7. The response appears in the chat panel
8. The mood timeline updates in real time

**To test the backend directly:**
```bash
curl -X POST http://localhost:8000/respond \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "test_001",
    "emotion": "sad",
    "confidence": 0.87,
    "all_scores": {"happy":0.02,"sad":0.87,"neutral":0.06,"angry":0.01,"surprised":0.01,"fearful":0.02,"disgusted":0.01},
    "user_message": "I have been feeling really tired lately"
  }'
```

---

## 📁 Project Structure

```
solace-hri-ar26/
│
├── frontend/
│   ├── public/
│   │   └── models/                  # face-api.js model weights
│   ├── src/
│   │   ├── components/
│   │   │   ├── SOLACEFace.jsx       # animated robot face
│   │   │   ├── EmotionBars.jsx      # live emotion visualisation
│   │   │   ├── ChatPanel.jsx        # conversation UI
│   │   │   └── MoodTimeline.jsx     # session emotional arc chart
│   │   ├── hooks/
│   │   │   └── useEmotionDetection.js
│   │   └── App.js
│   └── package.json
│
├── backend/
│   ├── main.py                      # FastAPI + 4 agents
│   ├── requirements.txt
│   └── .env.example
│
├── solace-landing.html
└── README.md
```

---

## 📊 Results & Performance

| Metric | Result |
|---|---|
| Emotion detection speed | < 50ms per frame |
| Emotions classified | 7 |
| Detection frequency | Every 200ms |
| Face data transmitted to server | 0 bytes (all client-side) |
| Agent pipeline latency | ~1.2s end-to-end |
| LLM model | Llama 3 8B via Groq |

---

## 🧗 Challenges & Learnings

- Coordinating 4 agents in a single request without noticeable latency required careful prompt engineering and strict response length constraints
- Running face-api.js on a video file (rather than live webcam) required managing frame timing and correctly passing the video element as the detection source
- Designing the ethics agent for an elderly care context pushed the team to think beyond simple content filtering — towards genuinely responsible AI
- Keeping the entire stack free meant being creative with infrastructure — Render.com and GitHub Pages proved to be a solid zero-cost production setup

---

## 🔮 Future Improvements

- [ ] Multilingual support — Arabic, Malayalam, and other languages for wider accessibility
- [ ] Voice response — text-to-speech so SOLACE speaks its replies aloud
- [ ] Longitudinal memory — persist emotional history across sessions
- [ ] Wearable integration — heart rate / stress sensor data for multimodal emotional context
- [ ] Mobile app — port to iOS/Android for elderly users
- [ ] Fine-tuned model — train on therapeutic dialogue datasets for deeper empathy

---

## 🌐 Demo & Live Links

| Resource | Link |
|---|---|
| 🚀 Live App | *Coming soon* |
| 🎥 Demo Video | *Submitting April 10, 2026* |
| 📋 KXSB Project Page | [kxsb.org/ar26](https://www.kxsb.org/ar26) |
| 🏠 Landing Page | [solace-landing](https://fsafva13-coder.github.io/solace-hri-ar26) |

---

## 👩‍💻 Team

| Name | Role |
|---|---|
| **Safva** | Tech Lead · Backend (FastAPI + 4 agents + Groq integration) |
| **Asna** | Frontend Lead (React + animated SOLACE face + UI/UX) |
| **Neha** | ML Engineer (face-api.js emotion detection pipeline + integration) |

*University of West London — BSc Computer Science*
*AR26 HackXelerator 2026 — Mission 3: Human-Robot Interaction*

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">Built with 💙 for people who need to feel heard.</p>