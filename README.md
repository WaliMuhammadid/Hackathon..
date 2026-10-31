# Practice Web & Phone Simulator 🌐📱🇵🇰

**A Safe, Guided Web Portal & Simulator for Parents and Grandparents in Pakistan**  
*Hackathon: Build4Better — NED University of Engineering & Technology*

---

## 👥 Team & Roles

- **Member 1 (Core Lead)**: Web & Phone Shells, Practice Stage, Coach Engine, Store, I18n, Family Sharing & Reports, Home & Progress Screens (`src/core/**`)
- **Member 2**: WhatsApp, Instagram, Facebook (`src/apps/whatsapp`, `src/apps/instagram`, `src/apps/facebook`)
- **Member 3**: Islamic Banking (`src/apps/meezan`)
- **Member 4**: SMS Scam Spotter & Video Call (`src/apps/sms`, `src/apps/videocall`)

---

## 🎯 Target User & The Problem

In Pakistan, millions of elderly parents and grandparents struggle to navigate touchscreens and web portals, fear accidentally losing money, getting locked out of accounts, or falling prey to ubiquitous SMS/WhatsApp scams (e.g. fake Benazir Income Support Program prizes). They hesitate to practice on real devices because a mistaken tap could send embarrassing messages or delete data.

**The Solution:**  
*Practice Web* provides a completely risk-free, sandboxed digital learning portal. Learners practice high-stakes everyday actions (sending voice notes, transferring money on Meezan Digital, blocking lottery scams, answering family video calls) with an interactive **COACH** that highlights exactly what to tap next via bilingual voice and text narration (Urdu & English).

---

## 🚀 Key Features

### 1. Dedicated Practice Stage & Auto-Scaling Phone Frame
- **Responsive Dashboard**: Clean header with language toggle, mode switcher (Guided, Try, Test), audio narration controls, quick stats (Stars, Badges, Completed lessons), practice streak, and 6 simulated apps.
- **Dedicated Practice Stage (`#/stage`)**:
  - Full-viewport `#FAF7F2` warm light layout with 0 page scroll at all standard screen resolutions (1440×900, 1280×720, etc.).
  - Left column (360px): Live lesson card with app brand, 24px title, progress bar, vertical step list with status indicators (completed green check, current primary teal, upcoming muted/hidden in Test mode), and secondary controls.
  - Right column: Precision 390×844 phone frame with 12px dark bezel, 44px outer radius, dynamic island notch, live status bar, and bottom system navigation bar. Auto-scales with `scale(min(1, (100vh - 140px) / 900))`.
  - Tablet/Mobile: Collapsible "Steps" chip; under 500px, expands full-screen bezel-less.

### 2. High-Tech Coach Engine
- **Spotlight Mask (`Spotlight.jsx`)**: Darkens background elements while creating a precision cutout around the target `[data-coach="..."]` element with animated pulsing rings and pointer indicators. Scale-aware bounding box math guarantees exact alignment at every viewport scale.
- **Coach Panel (`CoachPanel.jsx`)**: Accessible instruction bar with warm coach avatar, step counter (e.g. 2/5), Urdu/English speech replay, back/next navigation, and mistake alerts. Full RTL alignment and Urdu typography.
- **Three Learning Modes**:
  - **Guided Mode**: Continuous spotlight + bilingual spoken audio + automatic step progression.
  - **Try Mode**: Test yourself without spoilers; hints trigger only on demand ("Need help?") or after an 8-second idle timeout.
  - **Test Mode**: No visual spotlights; counts user mistakes and awards 1 to 3 stars upon completion.
- **Capture-Phase Click Listener**: Non-blocking safety handler. If an incorrect element is tapped, the spotlight shakes gently and a polite guidance message appears without crashing or breaking the app.
- **Completion Celebration (`CompletionScreen.jsx`)**: Confetti animation, stars rating (3 minus mistakes), "Next lesson" navigation, "Tell my family 🎉" button, and "Back to dashboard" return.

### 3. Share Progress with Family (`src/core/share/**`)
- **Zero-Backend Architecture**: 100% client-side URL-encoded payload (`#/report/<data>`). No user accounts, no logins, and zero cloud databases needed.
- **Multi-Channel Sharing**:
  - **WhatsApp Deep Link**: Opens a pre-written greeting and report link directly in WhatsApp (`wa.me/?text=...`).
  - **Native Web Share**: Uses Web Share API when supported on mobile devices.
  - **Copy Link**: Copies the self-contained report URL with instant "Copied ✓" feedback.
  - **Save as Picture**: Renders a crisp report card onto a high-resolution canvas and automatically downloads a PNG image.
- **Read-Only Family Report Page (`#/report/<token>`)**:
  - Uncluttered, warm light mobile-first view.
  - Big circular progress ring (lessons done / total) and stars count.
  - Per-app progress bars (WhatsApp, Meezan, SMS & Safety, Video Call, Instagram, Facebook).
  - Scam & Safety Spotter insight derived via rule-based scores.
  - Badges earned and last 5 completed lessons.
  - Actionable "Ways You Can Help" coaching tips for family members.
  - Quick "Send Encouragement" WhatsApp reply button with 3 customizable praise templates.

### 4. Voice Narration (`voice.js`)
- Full Web Speech API synthesis supporting Urdu (`ur-PK` / `ur`) with fallbacks and English (`en-US` / `en-IN`).
- Automatic speech cancellation upon step changes and a one-tap mute switch.

### 5. Simulated Everyday Apps
- **WhatsApp**: Chatting with family, sending text messages, sharing photos, and recording voice notes.
- **Meezan Bank**: Viewing/hiding Asaan Account balance, sending funds with OTP verification, declining scam callers.
- **SMS & Safety**: Spotting fraudulent lottery links, red flag breakdown, voting, and blocking malicious numbers.
- **Video Call**: Answering incoming video calls, muting microphone, camera toggling, and Wi-Fi trouble helper.
- **Instagram**: Watching 24h stories, liking family photos, commenting safely.
- **Facebook**: Creating status posts, reacting to updates.

---

## 💻 Tech Stack

- **Framework**: React 19
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

## ⚠️ Known Limitations & Privacy Honesty

- **100% Simulated Environment**: All apps inside the Practice Stage are simulated in client-side state. Nothing connects to real bank accounts, real cellular networks, or actual WhatsApp/Meta servers.
- **External WhatsApp Link**: The "Send on WhatsApp" button in the Share Sheet and Family Report is a genuine external URL scheme (`https://wa.me/?text=...`) to allow real family communication, while all apps inside the phone simulator remain simulated.
- **Client-Side Self-Contained URLs**: The Family Report links contain the progress summary directly inside the URL hash (`#/report/<base64>`). No backend server or database stores this data. Only lesson progress, stars, and badges are encoded; personal contact information and device details are strictly excluded.
- **Web Speech Voices**: Urdu voice synthesis relies on the client's OS/browser voices (e.g. Android/Chrome Urdu or Hindi voices); falls back gracefully where native Urdu TTS is not pre-installed.
