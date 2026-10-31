import React, { useRef, useState, useEffect } from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import { getAppById } from './registry';
import WebNavbar from './WebNavbar';
import WebHomeScreen from './WebHomeScreen';
import CoachEngine from './CoachEngine';
import ProgressScreen from './ProgressScreen';
import {
  Wifi,
  Battery,
  Signal,
  Home as HomeIcon,
  ArrowLeft,
  RotateCcw,
  Monitor,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

/**
 * Primary Shell for Practice Web Portal
 * Supports both modern full Web layout (default) and responsive Phone Simulator
 */
export default function WebShell() {
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
    viewMode,
    toggleViewMode,
  } = useStore();

  const [time, setTime] = useState('');

  // Clock for phone status bar simulation
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
  const AppIcon = currentApp?.Icon;

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col text-white font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Universal Web Navbar */}
      <WebNavbar />

      {/* Main Content Area */}
      {viewMode === 'phone' ? (
        /* ==================== PHONE SIMULATOR MODE ==================== */
        <div className="flex-1 w-full flex flex-col items-center justify-center p-2 sm:p-6 bg-slate-950/80">
          {/* Mode Switch Notice Banner */}
          <div className="mb-3 flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
            <span>
              {lang === 'ur'
                ? 'فون سمولیٹر موڈ آن ہے'
                : 'Mobile Simulator Frame View'}
            </span>
            <button
              type="button"
              onClick={toggleViewMode}
              className="text-blue-400 hover:text-blue-300 font-bold ml-1 flex items-center gap-1"
            >
              <Monitor className="w-3 h-3" />
              <span>
                {lang === 'ur' ? 'ویب لے آؤٹ پر جائیں' : 'Switch to Web View'}
              </span>
            </button>
          </div>

          {/* Centered Phone Shell Container */}
          <div className="relative w-full h-[760px] sm:w-[390px] sm:h-[844px] sm:rounded-[48px] bg-black sm:shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_0_12px_#1e293b,0_0_0_14px_#334155] sm:border-[4px] sm:border-slate-800 overflow-hidden flex flex-col">
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
                <WebHomeScreen />
              )}

              {/* Coach Overlay Engine */}
              <CoachEngine containerRef={containerRef} />
            </div>

            {/* Bottom System Navigation Bar */}
            <div className="h-14 w-full bg-slate-900 text-slate-400 flex items-center justify-around px-8 z-40 shrink-0 border-t border-slate-800">
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

              <button
                type="button"
                onClick={exitApp}
                className="p-2.5 text-white bg-slate-800 hover:bg-slate-700 rounded-full transition active:scale-90 shadow"
                title="Home Screen"
              >
                <HomeIcon className="w-6 h-6 text-blue-400" />
              </button>

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
      ) : (
        /* ==================== FULL WEB LAYOUT (DEFAULT) ==================== */
        <main className="flex-1 w-full flex flex-col overflow-y-auto">
          {activeApp ? (
            /* Inside an App on Web */
            <div className="flex-1 w-full p-2 sm:p-4 lg:p-6 flex flex-col items-center justify-center">
              <div className="w-full max-w-4xl h-[calc(100vh-100px)] min-h-[580px] bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
                {/* Clean Web App Window Titlebar */}
                <div className="h-12 bg-slate-900/95 border-b border-slate-800 px-4 flex items-center justify-between z-30 shrink-0 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: currentApp?.color || '#3b82f6' }}
                    >
                      {AppIcon ? (
                        <AppIcon className="w-3.5 h-3.5" />
                      ) : (
                        <span>●</span>
                      )}
                    </div>
                    <span
                      className={`font-bold text-white text-sm ${
                        lang === 'ur' ? 'font-urdu' : ''
                      }`}
                    >
                      {t(currentApp?.name)}
                    </span>
                    <span className="hidden sm:inline text-slate-500">•</span>
                    <span className="hidden sm:inline text-[11px] text-slate-400">
                      {activeLesson
                        ? t(activeLesson.title)
                        : lang === 'ur'
                        ? 'محفوظ ویب پریکٹس ونڈو'
                        : 'Practice Web Window'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>
                        {lang === 'ur' ? 'محفوظ ماحول' : '100% Simulated Safe'}
                      </span>
                    </span>

                    <button
                      type="button"
                      onClick={() => launchApp(activeApp, activeLesson)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title={lang === 'ur' ? 'ری اسٹارٹ' : 'Restart App'}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Web App Active Viewport */}
                <div
                  ref={containerRef}
                  className="relative flex-1 w-full overflow-hidden bg-slate-950 flex flex-col"
                  dir={lang === 'ur' ? 'rtl' : 'ltr'}
                >
                  <AppComponent key={sessionKey} onExit={exitApp} />

                  {/* Coach Overlay Engine */}
                  <CoachEngine containerRef={containerRef} />
                </div>
              </div>
            </div>
          ) : (
            /* Main Web Home Screen */
            <WebHomeScreen />
          )}
        </main>
      )}

      {/* Global Progress Modal */}
      {showProgress && (
        <ProgressScreen onClose={() => setShowProgress(false)} />
      )}
    </div>
  );
}
