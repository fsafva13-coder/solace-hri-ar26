# SOLACE 🤖
### *An emotion-aware AI companion that sees how you feel — and responds with genuine care.*

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.135-009688?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Groq](https://img.shields.io/badge/LLM-Groq%20%2F%20Llama3.1-orange?style=flat-square)
![face-api.js](https://img.shields.io/badge/Vision-face--api.js-blueviolet?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![AR26](https://img.shields.io/badge/AR26-HackXelerator-purple?style=flat-square)
![Mission](https://img.shields.io/badge/Mission%203-HRI-cyan?style=flat-square)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=flat-square&logo=vercel)

---

## 🎥 Demo

[![SOLACE Demo](https://img.shields.io/badge/Watch-Demo%20Video-red?style=flat-square&logo=youtube)](https://youtu.be/KAkebvccx-Q)

**The demo video is the best way to see SOLACE in action.** It shows the full pipeline end to end: emotion detection, the animated face, multi-agent replies, and the mood timeline.

> ℹ️ **Hosted backend currently offline.** The original backend host had a platform-wide security incident (October 2026), so the deployment was taken down and all API keys were revoked as a precaution. The frontend UI is still viewable at [solace-hri-ar26-seven.vercel.app](https://solace-hri-ar26-seven.vercel.app), but chat replies need the backend. To run the full app, follow the [Installation](#-installation) steps below. It takes about 5 minutes with a free Groq key.

---

## 📌 Project Overview

Millions of elderly individuals and people facing mental health challenges live without consistent emotional support. Existing AI assistants respond to *what you say* — but ignore *how you feel*. SOLACE bridges that gap.

**SOLACE** (Social & Observational Learning Agent for Compassionate Engagement) is a real-time emotion-aware AI companion that detects a user's emotional state from a video source using in-browser computer vision, then routes that context through a multi-agent backend to generate compassionate, tone-appropriate responses — all while maintaining a session memory of the user's emotional journey and screening every output through a dedicated ethics layer.

Built for the **AR26 HackXelerator — Mission 3: Human-Robot Interaction**, by a team of three Computer Science students at the University of West London.

---

## ✨ Features

- 🎭 **Real-time emotion detection** — classifies 7 emotional states (happy, sad, angry, surprised, fearful, disgusted, neutral) from any uploaded video using face-api.js running entirely in-browser
- 📂 **Video upload** — upload any video file and SOLACE detects emotions automatically frame by frame
- 🤖 **Animated SOLACE face** — expressive robot companion that visually reacts to detected emotions in real time (eyes, brows, mouth all animate, colour changes per emotion)
- 🧠 **Multi-agent orchestration** — 4 specialised AI agents work in sync: Emotion, Conversation, Memory, and Ethics
- 💬 **Empathetic dialogue** — powered by Groq's Llama 3.1, tuned for compassionate, care-first responses
- 🧵 **Session memory** — tracks the user's emotional arc across the session and references it in responses
- 🛡️ **Ethics / Safety agent** — screens every LLM output before it reaches the user, blocking harmful content
- 📊 **Mood timeline** — live visual chart showing the user's emotional journey throughout the session
- 🎮 **Simulate emotions** — buttons to manually trigger any emotion for testing and demo
- 🔒 **Privacy first** — all face processing runs client-side; no biometric data ever leaves the device
- 💸 **100% free stack** — zero paid APIs, fully open source, runs locally in minutes

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Emotion Detection | face-api.js (TinyFaceDetector + FaceExpressionNet) |
| Frontend | React 18, CSS Animations |
| Backend | Python, FastAPI |
| LLM | Groq API — Llama 3.1 8B Instant (free tier) |
| Agent Orchestration | Custom multi-agent system (4 agents) |
| Model Hosting | justadudewhohacks.github.io/face-api.js/models |
| Frontend Deploy | Vercel |

---

## 🖼️ Screenshots

**Main App Interface — SOLACE ready**
![App UI](./assets/screenshots/app-ui.png)

**Happy detected — SOLACE lights up green**
![Happy](./assets/screenshots/happy.png)

**Sad detected — SOLACE responds with care**
![Sad](./assets/screenshots/sad.png)

**Angry detected**
![Angry](./assets/screenshots/angry.png)

**Surprised detected**
![Surprised](./assets/screenshots/surprised.png)

**Fearful detected**
![Fearful](./assets/screenshots/fearful.png)

**Disgusted detected**
![Disgusted](./assets/screenshots/disgusted.png)

**Neutral detected**
![Neutral](./assets/screenshots/neutral.png)

**Chat conversation with SOLACE**
![Chat](./assets/screenshots/chat.png)

**Mood timeline — full session emotional arc**
![Mood Timeline](./assets/screenshots/mood-timeline.png)

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

Create a `.env` file inside `backend/` (it is git-ignored — never commit it):
```
GROQ_API_KEY=your_groq_api_key_here
```

Start the server:
```bash
uvicorn main:app --reload --port 8000
```

Verify it's running:
```
http://localhost:8000/health
```

Expected response:
```json
{"status": "SOLACE online", "agents": ["emotion", "memory", "conversation", "ethics"]}
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000` — emotion models load automatically from CDN on first launch (allow 30-60 seconds).

---

## 📖 Usage

1. Start the backend and frontend as above, then open **http://localhost:3000**
2. Wait for **"EMOTION ENGINE ACTIVE"** — green dot in the top bar
3. Click **📂 UPLOAD VIDEO FILE** and select any MP4 video
4. SOLACE automatically detects emotions from the video every second
5. The animated face, emotion bars, and mood timeline update in real time
6. SOLACE responds in the chat panel based on the detected emotion
7. Type messages directly in the chat
8. Use the **SIMULATE EMOTION** buttons at the bottom to test any emotion manually
9. Click **RESET** to clear the video and start a fresh session

**Test the backend API directly:**
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
│   │   ├── models/                  # face-api.js model weights (local fallback)
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── SOLACEFace.jsx       # animated robot face
│   │   │   ├── EmotionBars.jsx      # live emotion visualisation
│   │   │   ├── ChatPanel.jsx        # conversation UI + backend connection
│   │   │   └── MoodTimeline.jsx     # session emotional arc chart
│   │   ├── hooks/
│   │   │   └── useEmotionDetection.js  # face-api.js detection hook
│   │   ├── App.js                   # main app layout + video upload
│   │   └── index.js
│   └── package.json
│
├── backend/
│   ├── main.py                      # FastAPI + 4 agents
│   ├── requirements.txt
│   └── .env.example
│
├── assets/
│   └── screenshots/                 # app screenshots
│
├── solace-landing.html              # standalone landing page
└── README.md
```

---

## 🧠 The 4 Agents

| Agent | Role |
|---|---|
| **Emotion Agent** | Converts raw face-api.js scores into structured emotional context with intensity levels |
| **Memory Agent** | Tracks the user's emotional arc across the session — references past states in responses |
| **Conversation Agent** | Calls Groq Llama 3.1 with full emotional context to generate compassionate replies |
| **Ethics / Safety Agent** | Screens every LLM response before delivery — blocks harmful content, ensures care-appropriate tone |

---

## 🏗️ Architecture

```mermaid
flowchart LR
    A["Browser\n(uploaded video / webcam frame)"] -->|"face-api.js\nruns client-side"| B["Emotion scores\n(7 classes)"]
    B -->|"POST /respond"| C["FastAPI backend"]

    subgraph Agents["4-agent pipeline"]
        direction LR
        D["Emotion Agent\nraw scores → structured context"] --> E["Memory Agent\ntracks emotional arc"]
        E --> F["Conversation Agent\nGroq · Llama 3.1"]
        F --> G["Ethics / Safety Agent\nregex screen + fallback"]
    end

    C --> D
    G -->|"JSON reply"| H["Chat panel + animated\nSOLACE face"]
```

No raw face/video data ever leaves the browser — only the derived emotion scores (numbers, not images) are sent to the backend. This client-side-only face processing was a deliberate design decision: it keeps SOLACE usable in an elderly-care context without asking anyone to trust a server with biometric video of their face.

---

## 📊 Results & Performance

| Metric | Result |
|---|---|
| Emotion detection speed | ~1s per frame |
| Emotions classified | 7 |
| Detection method | face-api.js TinyFaceDetector + FaceExpressionNet |
| Face data transmitted to server | 0 bytes — all client-side |
| Agent pipeline latency | ~1.2s end-to-end |
| LLM model | Llama 3.1 8B Instant via Groq |
| Total cost | £0 — fully free stack |

---

## 🧪 v2 Evaluation

The original hackathon README only reported engineering metrics (latency, cost). For this pass, SOLACE was actually run end-to-end — backend and frontend both locally, `localhost:8000` + `localhost:3000` — and tested against its own stated behavior, not just checked for "does it crash."

| Test | What was checked | Result |
|---|---|---|
| All 7 simulated emotions (happy, sad, angry, surprised, fearful, disgusted, neutral) | Does the animated face/colour match the emotion, and is the chat reply tonally appropriate rather than generic? | ✅ Pass on all 7 |
| Response latency | Time from triggering an emotion to a reply appearing | ✅ Consistently under 3 seconds |
| Memory continuity | Trigger two different emotions in sequence — does the reply reference the shift, per the Memory Agent's job? | ✅ Pass — the shift was acknowledged |
| Safety filter | Send a message matching one of the `BLOCKED_PATTERNS` in `main.py` — does it correctly fall back to the safe response instead of an LLM-generated one? | ✅ Pass — fallback triggered correctly |

**Real example** (not fabricated — captured directly from a local run): simulating **Fearful** detected at 89% confidence produced this reply from the Conversation Agent:

> "You're feeling scared, and that's a really big and overwhelming feeling. It's okay to be scared, and I'm here to stay with you. Can you tell me what's making you feel this way? Sometimes talking about it can help make it feel a little more manageable."

**Scope of this eval, honestly:** this was run by the builder alone, once, on a local setup with the Simulate Emotion buttons rather than live camera input from a stranger's face. It confirms the pipeline behaves correctly under controlled conditions — it does not yet tell us how the emotion *detection* itself performs on unfamiliar faces, lighting, or genuinely ambiguous expressions, since that requires outside testers. See Limitations below.

---

## ⚠️ Limitations

- **The safety filter is simple keyword matching, not a trained classifier.** `ethics_agent()` in `main.py` checks the reply against three regex patterns. It reliably catches the exact phrasing it's written for, but a differently-worded harmful message could slip through, and an innocent message that happens to contain a flagged word could get blocked unnecessarily. This is the single limitation explained on camera in the demo video.
- **No live webcam yet.** Emotion detection currently runs on an uploaded video file, not a real-time camera feed — a real elderly user would need to record and upload a clip rather than just sit in front of the camera. Live webcam support is on the roadmap below.
- **Session memory doesn't persist.** The Memory Agent tracks emotional arc only in server RAM (`sessions: dict`) — a backend restart or a new session wipes it. There's no long-term history across visits.
- **Not built for many concurrent users.** The in-memory session store works for a demo but isn't a substitute for a real database (Redis/SQLite) under real load.
- **English only**, and **not a substitute for professional care** — SOLACE is explicitly instructed never to give medical advice, but it also isn't monitored by a clinician and shouldn't be treated as one.
- **No hosted backend right now** — the live chat requires running the backend locally (see Demo note above).
- **This v2 eval was self-tested**, not tested by an outside user unfamiliar with the app — see the Scope note above.

---

## 🧗 Challenges & Learnings

- Coordinating 4 agents in a single request without noticeable latency required careful prompt engineering and strict response length constraints on the LLM
- face-api.js model loading required switching from local files to CDN hosting — `justadudewhohacks.github.io/face-api.js/models` proved to be the most reliable solution
- Designing the ethics agent for an elderly care context pushed the team to think beyond simple content filtering — towards genuinely responsible AI
- The Groq model `llama3-8b-8192` was decommissioned mid-build — migrating to `llama-3.1-8b-instant` taught the team the importance of version-aware API integrations
- Deploying face-api.js to Vercel required resolving Node.js `fs` module polyfills for browser builds — solved via `package.json` browser field overrides
- When the backend's hosting platform disclosed a breach of stored environment variables (October 2026), the response was to revoke every API key at the source, take the deployment down, and audit the repo for committed secrets — a practical reminder that platform-stored secrets are only as safe as the platform

---

## 🔮 Future Improvements

- [ ] Re-deploy the backend on a new host with secrets managed per-environment
- [ ] Multilingual support — Arabic, Malayalam, and other languages for wider accessibility
- [ ] Voice response — text-to-speech so SOLACE speaks its replies aloud
- [ ] Longitudinal memory — persist emotional history across sessions using a database
- [ ] Wearable integration — heart rate and stress sensor data for multimodal emotional context
- [ ] Mobile responsive design — full support for phones and tablets
- [ ] Fine-tuned model — train on therapeutic dialogue datasets for deeper empathy
- [ ] Real-time webcam support — live webcam feed alongside uploaded video

---

## 🌐 Links

| Resource | Link |
|---|---|
| 🎥 Demo Video | [Watch on YouTube](https://youtu.be/KAkebvccx-Q) |
| 🖥️ Frontend UI (chat offline) | [solace-hri-ar26-seven.vercel.app](https://solace-hri-ar26-seven.vercel.app) |
| 📋 KXSB Project Page | [kxsb.org/ar26](https://www.kxsb.org/ar26) |
| 💻 GitHub | [fsafva13-coder/solace-hri-ar26](https://github.com/fsafva13-coder/solace-hri-ar26) |

---

## 🤖 Built With AI — Transparency

The FastAPI backend (`main.py`, including the four-agent orchestration — emotion, memory, conversation, ethics) and the React frontend components (`SOLACEFace.jsx`, `ChatPanel.jsx`, `EmotionBars.jsx`, `MoodTimeline.jsx`, `App.js`) were built with Claude's help, from working through the implementation to refining it.

What I did myself: designed the four-agent split and the emotion → tone mapping, wrote the prompt rules guiding how SOLACE communicates, and — for this v2 pass — personally ran the local evaluation documented above (all 7 simulated emotions, the memory-continuity check, and the safety-filter test) to verify the system actually behaves the way it's supposed to, rather than assuming the code was correct because Claude wrote it.

---

## 👩‍💻 Team

| Name | Role |
|---|---|
| **Safva** | Tech Lead · Backend (FastAPI + 4 agents + Groq integration + deployment) |
| **Asna** | Frontend Lead (React + animated SOLACE face + full UI/UX) |
| **Neha** | ML Engineer (face-api.js emotion detection pipeline + integration) |

*University of West London — BSc Computer Science*
*AR26 HackXelerator 2026 by KXSB — Mission 3: Human-Robot Interaction*

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">Built with 💙 for people who need to feel heard.</p>
