import React, { useRef, useState, useEffect } from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import { getAppById } from './registry';
import HomeScreen from './HomeScreen';
import CoachEngine from './CoachEngine';
import ProgressScreen from './ProgressScreen';
import {
  Wifi,
  Battery,
  Signal,
  Home as HomeIcon,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';

export default function PhoneShell() {
  const containerRef = useRef(null);
  const t = useT();
  const {
    activeApp,
    activeLesson,
    exitApp,
    exitLesson,
    sessionKey,
    launchApp,
    showProgress,
    setShowProgress,
    lang,
  } = useStore();

  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const currentApp = activeApp ? getAppById(activeApp) : null;
  const AppComponent = currentApp?.Component;

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center sm:p-4 select-none">
      {/* 
        Phone Frame:
        On desktop / >500px: 390x844 centered frame with notch, borders, and shadows.
        On mobile (<500px): full-screen without outer bezel.
      */}
      <div className="relative w-full h-full sm:w-[390px] sm:h-[844px] sm:rounded-[48px] bg-black sm:shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_0_12px_#1e293b,0_0_0_14px_#334155] sm:border-[4px] sm:border-slate-800 overflow-hidden flex flex-col">
        {/* Status Bar with Notch / Dynamic Island */}
        <div className="h-11 w-full bg-slate-900/95 text-white flex items-center justify-between px-6 z-40 shrink-0 text-xs font-semibold select-none border-b border-white/5">
          <span className="font-mono">{time}</span>

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

        {/* Practice Badge */}
        <div className="absolute top-12 right-3 z-30 pointer-events-none bg-amber-500/80 backdrop-blur text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
          {lang === 'ur' ? 'پریکٹس موڈ' : 'Practice Mode'}
        </div>

        {/* Main Phone Viewport Area */}
        <div
          ref={containerRef}
          className="relative flex-1 w-full h-[calc(100%-44px-56px)] overflow-hidden bg-slate-900"
          dir={lang === 'ur' ? 'rtl' : 'ltr'}
        >
          {AppComponent ? (
            <AppComponent key={sessionKey} onExit={exitApp} />
          ) : (
            <HomeScreen />
          )}

          {/* Coach Overlay Engine */}
          <CoachEngine containerRef={containerRef} />

          {/* Modal Progress Screen */}
          {showProgress && (
            <ProgressScreen onClose={() => setShowProgress(false)} />
          )}
        </div>

        {/* Bottom System Navigation Bar */}
        <div className="h-14 w-full bg-slate-900 text-slate-400 flex items-center justify-around px-8 z-40 shrink-0 border-t border-slate-800">
          {/* Back button */}
          <button
            type="button"
            onClick={() => {
              if (activeLesson) {
                exitLesson();
              } else if (activeApp) {
                exitApp();
              }
            }}
            className="p-2.5 hover:text-white rounded-full hover:bg-slate-800 transition active:scale-90"
            title="Back"
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

          {/* Restart Session Key */}
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
