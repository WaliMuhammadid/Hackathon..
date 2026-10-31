import React from 'react';
import { useStore } from './store';
import {
  Globe,
  Award,
  Volume2,
  VolumeX,
} from 'lucide-react';

/**
 * Top Navigation Bar for Web Dashboard
 * Provides intuitive controls for language, mode, progress, and audio
 */
export default function WebNavbar() {
  const {
    lang,
    toggleLang,
    mode,
    setMode,
    progress,
    setShowProgress,
    voiceMuted,
    toggleVoice,
  } = useStore();

  return (
    <header className="w-full bg-slate-900/90 border-b border-slate-800 text-white sticky top-0 z-30 backdrop-blur-md select-none transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg text-white font-black text-sm sm:text-base shrink-0">
            🌐
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1
                className={`text-sm sm:text-base font-black tracking-tight text-white ${
                  lang === 'ur' ? 'font-urdu' : ''
                }`}
              >
                {lang === 'ur' ? 'پریکٹس ویب پورٹل' : 'Practice Web'}
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                🇵🇰 NED Build4Better
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {lang === 'ur'
                ? 'والدین اور بزرگوں کے لیے محفوظ ڈیجیٹل گائیڈ'
                : 'A Safe Digital Sandbox for Parents & Grandparents'}
            </p>
          </div>
        </div>

        {/* Center: Mode Selector Pills (Desktop) */}
        <div className="hidden md:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('guided')}
            className={`px-3 py-1.5 rounded-lg transition ${
              mode === 'guided'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ur' ? 'رہنمائی (Guided)' : 'Guided Mode'}
          </button>
          <button
            type="button"
            onClick={() => setMode('try')}
            className={`px-3 py-1.5 rounded-lg transition ${
              mode === 'try'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ur' ? 'کوشش (Try)' : 'Try Mode'}
          </button>
          <button
            type="button"
            onClick={() => setMode('test')}
            className={`px-3 py-1.5 rounded-lg transition ${
              mode === 'test'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ur' ? 'امتحان (Test)' : 'Test Mode'}
          </button>
        </div>

        {/* Right Side: Tools & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Mode Switcher Button */}
          <button
            type="button"
            onClick={() => {
              const nextMode = mode === 'guided' ? 'try' : mode === 'try' ? 'test' : 'guided';
              setMode(nextMode);
            }}
            className="md:hidden px-2 py-1.5 rounded-xl bg-slate-800 text-[11px] font-bold border border-slate-700 text-slate-200 active:scale-95 transition"
            title="Cycle Mode"
          >
            <span className="capitalize">{mode}</span>
          </button>

          {/* Voice Mute Toggle */}
          <button
            type="button"
            onClick={toggleVoice}
            className={`p-2 rounded-xl border active:scale-95 transition ${
              voiceMuted
                ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                : 'bg-slate-800 border-slate-700 text-blue-400 hover:bg-slate-700'
            }`}
            title={voiceMuted ? 'Unmute Audio Narration' : 'Mute Audio Narration'}
          >
            {voiceMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold border border-slate-700 text-slate-200 active:scale-95 transition"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
            <span>{lang === 'en' ? 'اردو' : 'English'}</span>
          </button>

          {/* Stars & Progress Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowProgress(true)}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold active:scale-95 transition"
            title="View Progress & Badges"
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span className="font-mono">{progress.stars || 0} ⭐</span>
          </button>
        </div>
      </div>
    </header>
  );
}
