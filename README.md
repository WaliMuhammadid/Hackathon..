# Practice Phone 📱

A safe, guided practice phone simulator designed for people who didn't grow up with technology (parents and grandparents) in Pakistan. Built for the **Build4Better Hackathon at NED University**.

Everything in this application is **100% simulated** — no real accounts, phone numbers, or bank transfers are used.

---

## 🌟 Key Features

1. **Realistic 390x844 Mobile Viewport Shell**
   - Simulated dynamic island notch, network/battery status bar, and phone navigation controls.
   - Global language switcher: **Urdu (اردو)** and **English** with RTL support and Nastaliq Urdu typography.

2. **Interactive Coach Engine**
   - **Visual Spotlight**: Highlights exactly what element to tap next with animated pulsing outlines and pointer guidance.
   - **Bilingual Text & Voice**: Built-in speech synthesis (Web Speech API) provides spoken audio guidance in Urdu and English.
   - **Scam & Safety Awareness**: Special warning triggers (`warn: true`) in red highlighting high-risk scam actions (e.g., lottery SMS links).
   - **Dynamic DOM Mutation Observer**: Automatically tracks elements across screen transitions within apps.

3. **Simulated Pakistani Everyday Apps**
   - **WhatsApp (`src/apps/whatsapp`)**: Chat list, real-time message sending, voice note audio simulation.
   - **Meezan Bank (`src/apps/meezan`)**: Asaan digital account balance toggle, money transfers to family beneficiaries with receipt.
   - **SMS & Safety (`src/apps/sms`)**: Identify fake lottery scams (e.g. BISP prize fraud) and learn to block & report unknown links safely.
   - **Video Call (`src/apps/videocall`)**: Answer incoming video calls from Ammi, mute/unmute audio, switch camera, and end calls.
   - **Instagram (`src/apps/instagram`)**: View 24-hour disappearing photo stories and like family posts.
   - **Facebook (`src/apps/facebook`)**: Post status updates with privacy filters and react with likes/comments.

---

## 🛠️ Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **Zustand** (Global state management)
- **Lucide React** (Generic icons — no trademarked logos)
- **Web Speech API** (Bilingual text-to-speech)

---

## 📁 Architecture & Ownership

```
src/
├── core/                   # Member 1: Shell, Coach engine, Store, I18n, Registry, Home
│   ├── CoachEngine.jsx     # Visual spotlight, MutationObserver, Voice TTS
│   ├── Home.jsx            # App launcher & lesson catalog
│   ├── PhoneShell.jsx      # 390x844 phone frame, status bar & bottom controls
│   ├── store.js            # Zustand state (mode, activeApp, activeLesson, progress)
│   ├── i18n.js             # Bilingual language hook
│   ├── registry.js         # Auto-discovery of apps
│   └── tts.js              # Speech synthesis
├── apps/
│   ├── whatsapp/           # Member 2: Chat & voice notes
│   ├── instagram/          # Member 2: Stories & like posts
│   ├── facebook/           # Member 2: News feed & status composer
│   ├── meezan/             # Member 3: Islamic banking & transfers
│   ├── sms/                # Member 4: SMS scam spotting & blocking
│   └── videocall/          # Member 4: Incoming & active video calls
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🤖 AI Assistance & Tooling

Developed with assistance from **Google Antigravity** during the **Build4Better (NED University)** hackathon.
All apps, brands, and transactions in this project are strictly simulated mockups for educational accessibility purposes.
