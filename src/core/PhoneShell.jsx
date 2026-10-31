import React, { useRef } from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import { getAppById } from './registry';
import Home from './Home';
import CoachEngine from './CoachEngine';
import {
  Wifi,
  Battery,
  Signal,
  Home as HomeIcon,
  ArrowLeft,
  Globe,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function PhoneShell() {
  const containerRef = useRef(null);
  const t = useT();
  const {
    activeApp,
    activeLesson,
    exitApp,
    lang,
    toggleLang,
    mode,
    setMode,
    appKey,
    launchApp,
  } = useStore();

  const currentApp = activeApp ? getAppById(activeApp) : null;
  const AppComponent = currentApp?.Component;

  // Real-time time format
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-2 sm:p-4 font-sans select-none">
      {/* Outer Browser Control Bar */}
      <div className="w-full max-w-[420px] mb-2 flex items-center justify-between px-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-slate-200">Practice Phone (Build4Better)</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold">{lang === 'en' ? 'اردو' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* 390x844 Standard Phone Container */}
      <div className="relative w-[390px] h-[844px] bg-black rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_12px_#1e293b,0_0_0_14px_#334155] overflow-hidden flex flex-col border-[4px] border-slate-800">
        {/* Dynamic Island / Notch + Status Bar */}
        <div className="h-11 w-full bg-slate-900/95 text-white flex items-center justify-between px-6 z-40 shrink-0 text-xs font-semibold select-none border-b border-white/5">
          <span>{currentTime}</span>
          {/* Dynamic Island Pill */}
          <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-slate-800" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Practice Mode Watermark Tag */}
        <div className="absolute top-12 right-3 z-30 pointer-events-none bg-amber-500/80 backdrop-blur text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
          {lang === 'ur' ? 'پریکٹس موڈ' : 'Practice Mode'}
        </div>

        {/* Main Phone Viewport (Where Apps or Home Render) */}
        <div
          ref={containerRef}
          className="relative flex-1 w-full h-[calc(844px-44px-54px)] overflow-hidden bg-slate-900"
          dir={lang === 'ur' ? 'rtl' : 'ltr'}
        >
          {AppComponent ? (
            <AppComponent key={appKey} onExit={exitApp} />
          ) : (
            <Home />
          )}

          {/* Coach Overlay Engine */}
          <CoachEngine containerRef={containerRef} />
        </div>

        {/* Global Phone Bottom Navigation Bar */}
        <div className="h-14 w-full bg-slate-900 text-slate-400 flex items-center justify-around px-8 z-40 shrink-0 border-t border-slate-800">
          {/* Back button */}
          <button
            type="button"
            onClick={exitApp}
            className="p-2.5 hover:text-white rounded-full hover:bg-slate-800 transition active:scale-90"
            title="Back / Exit App"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Home Button */}
          <button
            type="button"
            onClick={exitApp}
            className="p-2.5 text-white bg-slate-800 hover:bg-slate-700 rounded-full transition active:scale-90 shadow"
            title="Home Screen"
          >
            <HomeIcon className="w-6 h-6 text-blue-400" />
          </button>

          {/* Restart Lesson / App */}
          <button
            type="button"
            onClick={() => {
              if (activeApp) {
                launchApp(activeApp, activeLesson);
              }
            }}
            className="p-2.5 hover:text-white rounded-full hover:bg-slate-800 transition active:scale-90"
            title="Restart Screen"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
