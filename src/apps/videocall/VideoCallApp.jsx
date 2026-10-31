import React, { useState } from 'react';
import { useT } from '../../core/i18n';
import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  RotateCw,
  Volume2,
} from 'lucide-react';

export default function VideoCallApp({ onExit }) {
  const t = useT();
  const [callState, setCallState] = useState('incoming'); // 'incoming' | 'connected' | 'ended'
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  return (
    <div className="h-full w-full flex flex-col bg-slate-950 text-white select-none overflow-hidden relative">
      {/* State: Incoming Call Screen */}
      {callState === 'incoming' && (
        <div className="flex-1 flex flex-col items-center justify-between py-12 px-6 bg-gradient-to-b from-slate-900 to-black">
          <div className="flex flex-col items-center text-center mt-8">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-emerald-500/40 flex items-center justify-center text-5xl mb-4 shadow-2xl animate-pulse">
              👩
            </div>
            <h2 className="text-2xl font-bold">Ammi</h2>
            <p className="text-emerald-400 text-sm mt-1 animate-pulse">
              {t({ en: 'Incoming Video Call...', ur: 'ویڈیو کال آ رہی ہے...' })}
            </p>
          </div>

          {/* Accept / Decline buttons */}
          <div className="w-full flex items-center justify-around px-4">
            <button
              type="button"
              onClick={() => setCallState('ended')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg active:scale-90 transition">
                <PhoneOff className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs text-slate-400">
                {t({ en: 'Decline', ur: 'رد کریں' })}
              </span>
            </button>

            <button
              type="button"
              data-coach="vc-btn-accept"
              onClick={() => setCallState('connected')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg active:scale-90 transition animate-bounce">
                <PhoneCall className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs text-emerald-400 font-bold">
                {t({ en: 'Accept', ur: 'جواب دیں' })}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* State: Active Connected Video Call */}
      {callState === 'connected' && (
        <div className="flex-1 flex flex-col justify-between relative bg-slate-900">
          {/* Main Caller Video Feed (Simulated) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-slate-950">
            <span className="text-9xl mb-4">👩</span>
            <div className="bg-black/40 backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold">
              Ammi (00:42)
            </div>
          </div>

          {/* Self Preview Pip Video in Corner */}
          <div className="absolute top-4 right-4 w-28 h-36 bg-slate-800 rounded-2xl border-2 border-white/20 shadow-xl overflow-hidden flex flex-col items-center justify-center z-10">
            {cameraOff ? (
              <span className="text-xs text-slate-400">Camera Off</span>
            ) : (
              <>
                <span className="text-4xl">🧓</span>
                <span className="text-[10px] text-white/70 mt-1">You</span>
              </>
            )}
          </div>

          {/* Bottom Call Control Buttons */}
          <div className="relative z-20 p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-around">
            {/* Mute Button */}
            <button
              type="button"
              data-coach="vc-btn-mute"
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3.5 rounded-full active:scale-90 transition ${
                isMuted ? 'bg-red-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            {/* Camera Toggle */}
            <button
              type="button"
              onClick={() => setCameraOff(!cameraOff)}
              className={`p-3.5 rounded-full active:scale-90 transition ${
                cameraOff ? 'bg-red-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              {cameraOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
            </button>

            {/* Switch Camera */}
            <button
              type="button"
              className="p-3.5 rounded-full bg-slate-800 text-white hover:bg-slate-700 active:scale-90 transition"
            >
              <RotateCw className="w-6 h-6" />
            </button>

            {/* End Call Button */}
            <button
              type="button"
              data-coach="vc-btn-end"
              onClick={() => setCallState('ended')}
              className="p-3.5 rounded-full bg-red-600 text-white hover:bg-red-500 shadow-lg active:scale-90 transition"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* State: Call Ended Screen */}
      {callState === 'ended' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
            <PhoneOff className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {t({ en: 'Call Ended', ur: 'کال ختم ہو گئی' })}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {t({ en: 'Duration: 01:24', ur: 'دورانیہ: 01:24' })}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCallState('incoming')}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-sm shadow"
          >
            {t({ en: 'Call Again (Practice)', ur: 'دوبارہ پریکٹس کریں' })}
          </button>
        </div>
      )}
    </div>
  );
}
