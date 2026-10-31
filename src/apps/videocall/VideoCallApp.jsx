import React, { useState } from 'react';
import { useT } from '../../core/i18n';
import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  HelpCircle,
  X,
  ArrowLeft,
  User,
} from 'lucide-react';

export default function VideoCallApp({ onExit }) {
  const t = useT();

  // Screen flow: 'contacts' | 'calling' | 'failed' | 'connected'
  const [screen, setScreen] = useState('contacts');
  const [selectedContact, setSelectedContact] = useState({ name: 'Ammi', phone: '0300 1122334', avatar: '👩' });

  // Call controls
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);

  // Connection troubleshooting state
  const [wifiEnabled, setWifiEnabled] = useState(false); // Initially off to simulate connection failure
  const [cameraPermitted, setCameraPermitted] = useState(true);
  const [showHelperModal, setShowHelperModal] = useState(false);

  const contacts = [
    { id: 'ammi', name: 'Ammi', phone: '0300 1122334', avatar: '👩', dataCoach: 'vc-contact-ammi' },
    { id: 'abbu', name: 'Abbu', phone: '0301 5566778', avatar: '👨', dataCoach: 'vc-contact-abbu' },
    { id: 'bilal', name: 'Bilal Bhai', phone: '0345 9988776', avatar: '🧔', dataCoach: 'vc-contact-bilal' },
  ];

  const handleStartCall = () => {
    setScreen('calling');
    setTimeout(() => {
      // If wifi is off, simulate connection failure
      if (!wifiEnabled) {
        setScreen('failed');
      } else {
        setScreen('connected');
      }
    }, 1800);
  };

  const handleReconnect = () => {
    setShowHelperModal(false);
    setScreen('calling');
    setTimeout(() => {
      setScreen('connected');
    }, 1500);
  };

  return (
    <div className="h-full w-full flex flex-col bg-slate-950 text-white select-none overflow-hidden relative">
      {/* Practice Badge */}
      <div className="absolute top-1 right-2 z-30 pointer-events-none bg-emerald-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
        Practice Video Call
      </div>

      {/* Screen 1: Contacts List */}
      {screen === 'contacts' && (
        <div className="h-full w-full flex flex-col justify-between bg-slate-900">
          <div>
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-base text-white">
                {t({ en: 'Video Call Contacts', ur: 'ویڈیو کال کے رابطے' })}
              </h3>
              <span className="text-xs text-emerald-400">● Online</span>
            </div>

            <div className="p-4 space-y-3">
              {contacts.map((c) => (
                <div
                  key={c.id}
                  data-coach={c.dataCoach}
                  onClick={() => setSelectedContact(c)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer active:scale-98 transition ${
                    selectedContact?.id === c.id
                      ? 'bg-slate-800 border-emerald-500 shadow-md'
                      : 'bg-slate-800/60 border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-2xl">
                      {c.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">{c.name}</h4>
                      <span className="text-xs text-slate-400">{c.phone}</span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">Available</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4">
            <button
              type="button"
              data-coach="vc-btn-start-call"
              onClick={handleStartCall}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-base shadow-xl flex items-center justify-center gap-2 active:scale-95 transition"
            >
              <Video className="w-5 h-5" />
              <span>{t({ en: 'Start Video Call', ur: 'ویڈیو کال ملائیں' })}</span>
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Calling / Ringing */}
      {screen === 'calling' && (
        <div className="flex-1 flex flex-col items-center justify-between py-12 px-6 bg-gradient-to-b from-slate-900 to-black">
          <div className="flex flex-col items-center text-center mt-12 space-y-3">
            <div className="w-28 h-28 rounded-full bg-slate-800 border-4 border-emerald-500/50 flex items-center justify-center text-6xl shadow-2xl animate-pulse">
              {selectedContact.avatar}
            </div>
            <h2 className="text-2xl font-bold">{selectedContact.name}</h2>
            <p className="text-emerald-400 text-sm animate-pulse">
              {t({ en: 'Connecting / Ringing...', ur: 'کال مل رہی ہے...' })}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setScreen('contacts')}
            className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg active:scale-90"
          >
            <PhoneOff className="w-7 h-7 text-white" />
          </button>
        </div>
      )}

      {/* Screen 3: Connection Failed with Helper Trigger */}
      {screen === 'failed' && (
        <div className="flex-1 flex flex-col items-center justify-between p-6 bg-slate-950 text-center">
          <div className="mt-12 space-y-4">
            <div className="w-20 h-20 rounded-full bg-red-950 border border-red-500/50 flex items-center justify-center text-red-400 mx-auto">
              <WifiOff className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {t({ en: 'Could Not Connect Call', ur: 'کال رابطہ قائم نہ ہو سکا' })}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-[240px] mx-auto">
                {t({
                  en: 'Internet signal was lost. Use the helper below to fix it.',
                  ur: 'انٹرنیٹ سگنل منقطع ہو گیا۔ مدد کے لیے نیچے بٹن دبائیں۔',
                })}
              </p>
            </div>
          </div>

          <div className="w-full space-y-3 pb-6">
            <button
              type="button"
              data-coach="vc-helper-open-btn"
              onClick={() => setShowHelperModal(true)}
              className="w-full py-3.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 shadow"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{t({ en: "Can't connect? Helper Checklist", ur: "کال کا مسئلہ حل کریں (مدد)" })}</span>
            </button>

            <button
              type="button"
              onClick={() => setScreen('contacts')}
              className="w-full py-2.5 text-slate-400 text-xs font-semibold"
            >
              {t({ en: 'Back to Contacts', ur: 'واپس جائیں' })}
            </button>
          </div>
        </div>
      )}

      {/* Helper Checklist Modal */}
      {showHelperModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end p-4">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                {t({ en: 'Call Troubleshooting Checklist', ur: 'کال کا مسئلہ حل کرنے کی لسٹ' })}
              </span>
              <X className="w-4 h-4 cursor-pointer text-slate-400" onClick={() => setShowHelperModal(false)} />
            </div>

            <div className="space-y-3 text-xs">
              {/* Wi-Fi checklist row */}
              <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2.5">
                  <Wifi className={`w-5 h-5 ${wifiEnabled ? 'text-emerald-400' : 'text-red-400'}`} />
                  <div>
                    <span className="font-bold block">Wi-Fi / Internet Data</span>
                    <span className="text-[10px] text-slate-400">
                      {wifiEnabled ? 'Active & Ready' : 'Turned OFF (Problem)'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  data-coach="vc-toggle-wifi-fix"
                  onClick={() => setWifiEnabled(!wifiEnabled)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    wifiEnabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-600 text-white animate-bounce'
                  }`}
                >
                  {wifiEnabled ? 'ON' : 'Turn ON'}
                </button>
              </div>

              {/* Camera permission */}
              <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2.5">
                  <Video className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="font-bold block">Camera & Mic Permission</span>
                    <span className="text-[10px] text-slate-400">Allowed</span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            <button
              type="button"
              data-coach="vc-btn-reconnect"
              onClick={handleReconnect}
              disabled={!wifiEnabled}
              className={`w-full py-3 rounded-xl text-white font-bold text-xs shadow transition ${
                wifiEnabled ? 'bg-emerald-600 hover:bg-emerald-500 active:scale-95' : 'bg-slate-700 cursor-not-allowed'
              }`}
            >
              {t({ en: 'Try Reconnecting Call', ur: 'دوبارہ کال ملائیں' })}
            </button>
          </div>
        </div>
      )}

      {/* Screen 4: Connected Video Call */}
      {screen === 'connected' && (
        <div className="flex-1 flex flex-col justify-between relative bg-slate-900">
          {/* Main Remote Video Feed */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 via-slate-900 to-black">
            <span className="text-8xl mb-3 drop-shadow-2xl">👩</span>
            <div className="bg-black/50 backdrop-blur px-4 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Ammi (01:15)</span>
            </div>
          </div>

          {/* Self Preview PIP Tile */}
          <div className="absolute top-4 right-4 w-24 h-32 bg-slate-800 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden flex flex-col items-center justify-center z-10">
            {cameraOff ? (
              <span className="text-[10px] text-slate-400">Camera Off</span>
            ) : (
              <>
                <span className="text-3xl">🧓</span>
                <span className="text-[9px] text-white/70 mt-1">You</span>
              </>
            )}
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="relative z-20 p-5 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-around">
            <button
              type="button"
              data-coach="vc-btn-toggle-mic"
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3.5 rounded-full active:scale-90 transition ${
                isMuted ? 'bg-red-600 text-white' : 'bg-slate-800 text-white'
              }`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            <button
              type="button"
              onClick={() => setCameraOff(!cameraOff)}
              className={`p-3.5 rounded-full active:scale-90 transition ${
                cameraOff ? 'bg-red-600 text-white' : 'bg-slate-800 text-white'
              }`}
            >
              {cameraOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
            </button>

            <button
              type="button"
              onClick={() => setSpeakerOn(!speakerOn)}
              className="p-3.5 rounded-full bg-slate-800 text-white"
            >
              {speakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6 text-red-400" />}
            </button>

            <button
              type="button"
              data-coach="vc-btn-end-call"
              onClick={() => setScreen('contacts')}
              className="p-3.5 rounded-full bg-red-600 text-white shadow-lg active:scale-90 transition"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
