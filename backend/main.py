# main.py — SOLACE Backend
# Run: uvicorn main:app --reload --port 8000
# Install: pip install fastapi uvicorn groq python-dotenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
from datetime import datetime
import os, json, re

load_dotenv()
app = FastAPI(title="SOLACE API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ══════════════════════════════════════════
#  SIMPLE IN-MEMORY SESSION STORE
#  (swap for Redis or SQLite for production)
# ══════════════════════════════════════════
sessions: dict[str, dict] = {}

def get_session(session_id: str) -> dict:
    if session_id not in sessions:
        sessions[session_id] = {
            "history": [],
            "emotion_log": [],
            "message_count": 0,
        }
    return sessions[session_id]


# ══════════════════════════════════════════
#  MODELS
# ══════════════════════════════════════════
class EmotionInput(BaseModel):
    session_id: str
    emotion: str          # e.g. "happy", "sad", "angry"
    confidence: float     # 0.0 – 1.0
    all_scores: dict      # {"happy": 0.89, "sad": 0.03, ...}
    user_message: str = ""


class SOLACEResponse(BaseModel):
    reply: str
    tone: str
    session_id: str
    emotion_context: str
    memory_summary: str
    safety_passed: bool


# ══════════════════════════════════════════
#  AGENT 1 — EMOTION AGENT
#  Interprets raw scores into emotional context
# ══════════════════════════════════════════
def emotion_agent(emotion: str, confidence: float, all_scores: dict) -> dict:
    """
    Processes raw emotion detection output into
    structured context for the conversation agent.
    """
    intensity = (
        "strong" if confidence > 0.80 else
        "moderate" if confidence > 0.55 else
        "mild"
    )

    tone_map = {
        "happy":     "warm and joyful",
        "sad":       "gentle and comforting",
        "angry":     "calm and de-escalating",
        "surprised": "curious and reassuring",
        "fearful":   "soft and grounding",
        "disgusted":  "neutral and open",
        "neutral":   "friendly and present",
    }

    context = {
        "primary_emotion": emotion,
        "intensity": intensity,
        "confidence": round(confidence * 100, 1),
        "response_tone": tone_map.get(emotion, "warm and supportive"),
        "secondary_emotions": {
            k: round(v * 100, 1)
            for k, v in sorted(all_scores.items(), key=lambda x: -x[1])
            if k != emotion and v > 0.05
        },
    }

    return context


# ══════════════════════════════════════════
#  AGENT 2 — MEMORY AGENT
#  Tracks emotional arc across the session
# ══════════════════════════════════════════
def memory_agent(session: dict, emotion_context: dict) -> str:
    """
    Builds a short memory summary of the user's
    emotional journey this session.
    """
    log = session["emotion_log"]
    log.append({
        "emotion": emotion_context["primary_emotion"],
        "intensity": emotion_context["intensity"],
        "time": datetime.now().isoformat(),
    })
    if len(log) > 50:
        log.pop(0)

    if len(log) < 2:
        return "This is the start of the session — no prior emotional context."

    recent = log[-min(5, len(log)):]
    emotion_sequence = [e["emotion"] for e in recent]
    unique = list(dict.fromkeys(emotion_sequence))

    if len(unique) == 1:
        summary = f"User has consistently shown {unique[0]} throughout the session."
    elif emotion_sequence[-1] != emotion_sequence[-2]:
        summary = (
            f"User recently shifted from {emotion_sequence[-2]} "
            f"to {emotion_sequence[-1]}."
        )
    else:
        summary = f"User has experienced: {', '.join(unique)} during this session."

    return summary


# ══════════════════════════════════════════
#  AGENT 3 — CONVERSATION AGENT
#  Generates the LLM response via Groq
# ══════════════════════════════════════════
def conversation_agent(
    emotion_context: dict,
    memory_summary: str,
    user_message: str,
    session: dict,
) -> str:
    """
    Calls Groq (Llama 3) to generate a compassionate,
    emotion-tuned response.
    """
    system_prompt = f"""You are SOLACE — a Social & Observational Learning Agent for Compassionate Engagement.
You are an emotionally intelligent AI companion built for elderly care and mental wellness.

CURRENT EMOTIONAL CONTEXT:
- Detected emotion: {emotion_context["primary_emotion"]} ({emotion_context["intensity"]} intensity, {emotion_context["confidence"]}% confidence)
- Response tone: {emotion_context["response_tone"]}
- Session memory: {memory_summary}

YOUR COMMUNICATION RULES:
1. Be genuinely warm, never clinical or robotic
2. Keep responses concise — 2 to 4 sentences maximum
3. Acknowledge the detected emotion naturally, without announcing it mechanically
4. If the user sent a message, respond to it directly
5. If no message, initiate based purely on emotional state
6. Never offer medical advice
7. Never minimise someone's feelings
8. Adapt your vocabulary to be clear and accessible"""

    history = session["history"][-6:]  # last 3 turns
    messages = [{"role": "system", "content": system_prompt}]

    for turn in history:
        messages.append({"role": turn["role"], "content": turn["content"]})

    user_content = user_message if user_message.strip() else (
        f"[System: User has not typed — generate a compassionate opening based on their {emotion_context['primary_emotion']} state]"
    )
    messages.append({"role": "user", "content": user_content})

    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=messages,
        temperature=0.78,
        max_tokens=180,
    )

    reply = response.choices[0].message.content.strip()

    # Update conversation history
    session["history"].append({"role": "user", "content": user_content})
    session["history"].append({"role": "assistant", "content": reply})
    if len(session["history"]) > 20:
        session["history"] = session["history"][-20:]

    return reply


# ══════════════════════════════════════════
#  AGENT 4 — ETHICS / SAFETY AGENT
#  Screens all responses before delivery
# ══════════════════════════════════════════
BLOCKED_PATTERNS = [
    r"\b(kill yourself|suicide|self.harm|end your life)\b",
    r"\b(medication|drug dosage|prescription)\b",
    r"\b(you should die|nobody cares)\b",
]

SAFE_FALLBACK = (
    "I'm here with you. Whatever you're feeling right now is valid. "
    "Would you like to talk about what's on your mind?"
)

def ethics_agent(reply: str, emotion: str) -> tuple[str, bool]:
    """
    Screens the LLM reply for unsafe content.
    Returns (final_reply, safety_passed).
    """
    lowered = reply.lower()
    for pattern in BLOCKED_PATTERNS:
        if re.search(pattern, lowered, re.IGNORECASE):
            return SAFE_FALLBACK, False

    # Extra caution for high-distress emotions
    if emotion in ("sad", "fearful", "angry") and len(reply) < 30:
        return SAFE_FALLBACK, False

    return reply, True


# ══════════════════════════════════════════
#  MAIN ENDPOINT — orchestrates all agents
# ══════════════════════════════════════════
@app.post("/respond", response_model=SOLACEResponse)
async def respond(data: EmotionInput):
    try:
        session = get_session(data.session_id)
        session["message_count"] += 1

        # Agent 1: Emotion
        emotion_context = emotion_agent(
            data.emotion, data.confidence, data.all_scores
        )

        # Agent 2: Memory
        memory_summary = memory_agent(session, emotion_context)

        # Agent 3: Conversation
        raw_reply = conversation_agent(
            emotion_context, memory_summary, data.user_message, session
        )

        # Agent 4: Ethics/Safety
        final_reply, safety_passed = ethics_agent(raw_reply, data.emotion)

        return SOLACEResponse(
            reply=final_reply,
            tone=emotion_context["response_tone"],
            session_id=data.session_id,
            emotion_context=json.dumps(emotion_context),
            memory_summary=memory_summary,
            safety_passed=safety_passed,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/session/{session_id}")
def get_session_info(session_id: str):
    s = sessions.get(session_id, {})
    return {
        "session_id": session_id,
        "message_count": s.get("message_count", 0),
        "emotion_log_count": len(s.get("emotion_log", [])),
        "history_count": len(s.get("history", [])),
    }


@app.delete("/session/{session_id}")
def clear_session(session_id: str):
    sessions.pop(session_id, None)
    return {"cleared": session_id}


@app.get("/health")
def health():
    return {"status": "SOLACE online", "agents": ["emotion", "memory", "conversation", "ethics"]}
