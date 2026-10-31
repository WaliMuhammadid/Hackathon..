# Practice Phone 📱🇵🇰

**A Safe, Guided Phone Simulator for Parents and Grandparents in Pakistan**  
*Hackathon: Build4Better — NED University of Engineering & Technology*

---

## 👥 Team & Roles

- **Member 1 (Core Lead)**: Shell, Coach Engine, Store, I18n, App Registry, Home & Progress Screens (`src/core/**`)
- **Member 2**: WhatsApp, Instagram, Facebook (`src/apps/whatsapp`, `src/apps/instagram`, `src/apps/facebook`)
- **Member 3**: Islamic Banking (`src/apps/meezan`)
- **Member 4**: SMS Scam Spotter & Video Call (`src/apps/sms`, `src/apps/videocall`)

---

## 🎯 Target User & The Problem

In Pakistan, millions of elderly parents and grandparents struggle to navigate touchscreens, fear accidentally losing money, getting locked out of accounts, or falling prey to ubiquitous SMS/WhatsApp scams (e.g. fake Benazir Income Support Program prizes). They hesitate to practice on real devices because a mistaken tap could send embarrassing messages or delete data.

**The Solution:**  
*Practice Phone* provides a completely risk-free, sandboxed smartphone simulator. Learners practice high-stakes everyday actions (sending voice notes, transferring money on Meezan Digital, blocking lottery scams, answering family video calls) with an AI/interactive **COACH** that highlights exactly what to tap next via bilingual voice and text narration (Urdu & English).

---

## 🚀 Key Features

### 1. Robust Phone Shell (`PhoneShell.jsx`)
- **Centred 390×844 Mobile Viewport**: Dynamic Island notch, realistic status bar with live time, Wi-Fi, battery, and signal indicators.
- **Adaptive Responsive Design**: On screens `< 500px`, seamlessly expands to full-screen without bezels for natural mobile usage.
- **System Navigation Bar**: Persistent Home, Back, and Session Restart controls.

### 2. High-Tech Coach Engine
- **Spotlight Mask (`Spotlight.jsx`)**: Darkens background elements while creating a precision cutout around the target `[data-coach="..."]` element with animated pulsing rings and pointer indicators. Dynamically adjusts via `MutationObserver` and resize/scroll listeners.
- **Coach Panel (`CoachPanel.jsx`)**: Accessible instruction bar with warm coach avatar, step counter (e.g. 2/5), Urdu/English speech replay, back/next navigation, and mistake alerts.
- **Three Learning Modes**:
  - **Guided Mode**: Continuous spotlight + bilingual spoken audio + automatic step progression.
  - **Try Mode**: Test yourself without spoilers; hints trigger only on demand ("Need help?") or after an 8-second idle timeout.
  - **Test Mode**: No visual spotlights; counts user mistakes and awards 1 to 3 stars upon completion.
- **Capture-Phase Click Listener**: Non-blocking safety handler. If an incorrect element is tapped, the spotlight shakes gently and a polite guidance message appears without crashing or breaking the app.
- **Completion Celebration (`CompletionScreen.jsx`)**: Stars rating (3 minus mistakes), performance review, and "Practise Again" options.

### 3. Voice Narration (`voice.js`)
- Full Web Speech API synthesis supporting Urdu (`ur-PK` / `ur`) with fallbacks and English (`en-US` / `en-IN`).
- Automatic speech cancellation upon step changes and a one-tap mute switch.

### 4. Progress Tracking (`ProgressScreen.jsx`)
- Persisted locally in `localStorage`.
- Tracks total stars earned, completed lesson tallies, and unlockable achievement badges (*First Step*, *Connected Family*, *Scam Spotter*, *Digital Banker*).

### 5. Simulated Everyday Apps
- **WhatsApp**: Chatting with Ammi/Abbu, sending texts, and recording voice notes.
- **Meezan Bank**: Viewing/hiding Asaan Account balance, sending funds to family members.
- **SMS & Safety**: Spotting fraudulent lottery links, reporting, and blocking malicious numbers.
- **Video Call**: Answering incoming video calls, muting microphone, camera toggling, and hanging up.
- **Instagram**: Watching 24h stories, liking family photos.
- **Facebook**: Creating status posts, reacting to updates.

---

## 💻 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React (Generic, clean icons — NO trademarked logos)
- **Typography**: Noto Nastaliq Urdu & Noto Sans Arabic for RTL support
- **Speech**: Browser Web Speech API (`SpeechSynthesis`)

---

## 📦 Setup & Running

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Production build
npm run build
```

---

## 🤖 AI Tools & Third-Party Credits

- **Google Antigravity**: Autonomous AI pair-programming assistant for rapid hackathon scaffolding and testing.
- **Fonts**: Google Fonts (*Noto Nastaliq Urdu*, *Noto Sans*).
- **Icons**: Lucide React open-source iconography.

---

## ⚠️ Known Limitations & Mocked Features

- **100% Simulated Environment**: Everything is simulated in client-side state. Nothing connects to real bank accounts, real cellular networks, or actual WhatsApp/Meta servers.
- **Web Speech Voices**: Urdu voice synthesis relies on the client's OS/browser voices (e.g. Android/Chrome Urdu or Hindi voices); falls back gracefully where native Urdu TTS is not pre-installed.

---

## 🔖 Final Commit ID

- **Scaffold & MVP Commit**: `9dc9ab982c0b613207c4fad62f9cfbf525aed9d6`
