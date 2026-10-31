import React, { useRef, useState, useEffect } from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import { getAppById } from './registry';
import CoachEngine from './CoachEngine';
import {
  Wifi,
  Battery,
  Signal,
  Home as HomeIcon,
  ArrowLeft,
  RotateCcw,
  Volume2,
  VolumeX,
  Globe,
  CheckCircle2,
  Sparkles,
  Compass,
  ListOrdered,
  X,
  ChevronDown,
} from 'lucide-react';

export default function PracticeStage() {
  const containerRef = useRef(null);
  const t = useT();
  const {
    activeApp,
    activeLesson,
    exitApp,
    exitLesson,
    sessionKey,
    launchApp,
    stepIndex,
    lang,
    toggleLang,
    mode,
    voiceMuted,
    toggleVoice,
  } = useStore();

  const [time, setTime] = useState('');
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 900
  );
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [showMobileSteps, setShowMobileSteps] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Time for phone status bar
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

  // Viewport resize listener for dynamic scale
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentApp = activeApp ? getAppById(activeApp) : null;
  const AppComponent = currentApp?.Component;
  const AppIcon = currentApp?.Icon;

  const isUnder500 = viewportWidth < 500;
  // Auto-scale formula: min(1, (100vh - 140px) / 900)
  const phoneScale = isUnder500
    ? 1
    : Math.min(1, Math.max(0.35, (viewportHeight - 140) / 900));

  const steps = activeLesson?.steps || [];
  const totalSteps = steps.length;
  const progressPercent =
    totalSteps > 0 ? Math.round(((stepIndex + 1) / totalSteps) * 100) : 0;

  // Handle back to dashboard with exit animation
  const handleBackToDashboard = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      exitApp();
      window.location.hash = '#/';
      return;
    }

    setIsExiting(true);
    setTimeout(() => {
      exitApp();
      window.location.hash = '#/';
    }, 250);
  };

  // Render Lesson Card Content (reusable for Desktop Left Column & Tablet/Mobile Popover)
  const renderLessonCardContent = (isMobileModal = false) => (
    <div
      className={`flex flex-col h-full ${
        isMobileModal ? 'p-1' : ''
      }`}
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* App brand badge & name */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0"
          style={{ backgroundColor: currentApp?.color || '#0d9488' }}
        >
          {AppIcon ? (
            <AppIcon className="w-5 h-5 drop-shadow" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
            {t(currentApp?.name)}
          </span>
          <span className="text-[11px] font-semibold text-stone-400">
            {activeLesson
              ? activeLesson.duration || '2 min'
              : lang === 'ur'
              ? 'مفت پریکٹس'
              : 'Free Practice'}
          </span>
        </div>
      </div>

      {/* Lesson Title (24px) */}
      <h2
        className={`text-[24px] leading-snug font-black text-stone-900 mb-3 ${
          lang === 'ur' ? 'font-urdu' : ''
        }`}
      >
        {activeLesson
          ? t(activeLesson.title)
          : lang === 'ur'
          ? 'ایپ خود چلائیں'
          : 'Open App Freely'}
      </h2>

      {/* When in a lesson: Progress Bar & Vertical Step List */}
      {activeLesson ? (
        <>
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600 mb-1.5">
              <span>
                {lang === 'ur'
                  ? `مرحلہ ${stepIndex + 1} از ${totalSteps}`
                  : `Step ${stepIndex + 1} of ${totalSteps}`}
              </span>
              <span className="font-mono text-teal-700">{progressPercent}%</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200/80">
              <div
                className="bg-teal-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Vertical Step List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 my-1 max-h-[360px]">
            {steps.map((st, idx) => {
              const isDone = idx < stepIndex;
              const isCurrent = idx === stepIndex;
              const isUpcoming = idx > stepIndex;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border transition-all text-xs flex items-start gap-2.5 ${
                    isCurrent
                      ? 'bg-teal-50 border-teal-600 text-teal-950 font-bold shadow-sm ring-1 ring-teal-500/20'
                      : isDone
                      ? 'bg-emerald-50/60 border-emerald-200 text-stone-700'
                      : 'bg-stone-50/50 border-stone-200/80 text-stone-400'
                  }`}
                >
                  {/* Step status indicator */}
                  <div className="shrink-0 mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-stone-300 text-stone-400 flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  {/* Step Title / Text (hide in Test mode for upcoming steps) */}
                  <div className="flex-1 leading-relaxed">
                    {isUpcoming && mode === 'test' ? (
                      <span className="italic text-stone-400 font-mono tracking-widest select-none">
                        ••••••••••••
                      </span>
                    ) : (
                      <span className={lang === 'ur' ? 'font-urdu' : ''}>
                        {t(st.text)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secondary buttons */}
          <div className="pt-3 mt-auto border-t border-stone-200 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                launchApp(activeApp, activeLesson);
                if (isMobileModal) setShowMobileSteps(false);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
              <span>{lang === 'ur' ? 'دوبارہ شروع کریں' : 'Restart lesson'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (isMobileModal) setShowMobileSteps(false);
                handleBackToDashboard();
              }}
              className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs font-bold flex items-center justify-center gap-1 transition active:scale-95"
            >
              <span>{lang === 'ur' ? 'باہر نکلیں' : 'Exit'}</span>
            </button>
          </div>
        </>
      ) : (
        /* When "Open app freely" without a lesson: Tip card */
        <div className="flex-1 flex flex-col justify-between">
          <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 text-amber-900 space-y-2.5 my-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>{lang === 'ur' ? 'آزادانہ رہنمائی' : 'Free Sandbox Tip'}</span>
            </div>
            <p
              className={`text-sm leading-relaxed font-semibold text-amber-950 ${
                lang === 'ur' ? 'font-urdu' : ''
              }`}
            >
              {lang === 'ur'
                ? 'بلا خوف و خطرہ ایپ چلائیں۔ یہاں کچھ بھی اصلی نہیں ہے۔'
                : 'Tap around freely. Nothing here is real.'}
            </p>
            <p className="text-xs text-amber-800 leading-normal">
              {lang === 'ur'
                ? 'تمام پیغامات، ٹرانسفرز اور فیچرز 100% محفوظ ہیں۔'
                : 'All chats, balances, and actions are client-side simulations.'}
            </p>
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                launchApp(activeApp, null);
                if (isMobileModal) setShowMobileSteps(false);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? 'ایپ ری سیٹ' : 'Restart app'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (isMobileModal) setShowMobileSteps(false);
                handleBackToDashboard();
              }}
              className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs font-bold flex items-center justify-center gap-1 transition active:scale-95"
            >
              <span>{lang === 'ur' ? 'باہر نکلیں' : 'Exit'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-screen w-full bg-[#FAF7F2] text-stone-800 flex flex-col overflow-hidden select-none">
      {/* Inline animations for enter/exit respecting prefers-reduced-motion */}
      <style>{`
        @keyframes stagePhoneEnter {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes stagePhoneExit {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(28px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .stage-phone-enter, .stage-phone-exit {
            animation: none !important;
            transition: none !important;
          }
        }
        .stage-phone-enter {
          animation: stagePhoneEnter 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .stage-phone-exit {
          animation: stagePhoneExit 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Slim Top Bar */}
      <header
        className="h-16 shrink-0 bg-[#FAF7F2] border-b border-stone-200/90 px-4 sm:px-6 flex items-center justify-between z-30"
        dir={lang === 'ur' ? 'rtl' : 'ltr'}
      >
        {/* Left: "← Back to dashboard" button (48px high) & Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBackToDashboard}
            className="h-[48px] min-h-[48px] px-4 rounded-2xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
            title="Return to dashboard"
          >
            <ArrowLeft
              className={`w-4 h-4 text-stone-600 ${
                lang === 'ur' ? 'rotate-180' : ''
              }`}
            />
            <span className={lang === 'ur' ? 'font-urdu' : ''}>
              {lang === 'ur' ? 'ڈیش بورڈ پر واپس' : '← Back to dashboard'}
            </span>
          </button>

          <div className="hidden sm:flex items-center gap-2 border-l border-stone-200 pl-3">
            <span className="text-base font-black text-stone-900 tracking-tight">
              Practice Phone 📱
            </span>
          </div>
        </div>

        {/* Right Tools: Language switch & Voice toggle */}
        <div className="flex items-center gap-2">
          {/* Mode Pill Badge */}
          <span className="hidden md:inline-flex items-center px-2.5 py-1 rounded-full bg-stone-200/70 border border-stone-300/80 text-[11px] font-bold text-stone-700 capitalize">
            {mode} Mode
          </span>

          {/* Voice Narration Toggle */}
          <button
            type="button"
            onClick={toggleVoice}
            className={`p-2.5 rounded-xl border transition active:scale-95 ${
              voiceMuted
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'bg-white border-stone-300 text-teal-700 hover:bg-stone-50'
            }`}
            title={voiceMuted ? 'Unmute voice' : 'Mute voice'}
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
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-xs font-bold text-stone-700 active:scale-95 transition"
            title="Switch language"
          >
            <Globe className="w-4 h-4 text-teal-600" />
            <span>{lang === 'en' ? 'اردو' : 'English'}</span>
          </button>
        </div>
      </header>

      {/* Main Two-Column Layout (Desktop >= 1024px) / Centred Phone (Tablet & Mobile) */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 py-2 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-6 overflow-hidden relative">
        {/* Tablet / Mobile (< 1024px): Collapsible "Steps" Chip above Phone */}
        <div className="lg:hidden w-full flex justify-center shrink-0 py-1">
          <button
            type="button"
            onClick={() => setShowMobileSteps(!showMobileSteps)}
            className="px-4 py-1.5 rounded-full bg-white border border-stone-300 text-stone-700 text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-stone-50 active:scale-95 transition"
          >
            <ListOrdered className="w-3.5 h-3.5 text-teal-600" />
            <span className={lang === 'ur' ? 'font-urdu' : ''}>
              {activeLesson
                ? lang === 'ur'
                  ? `اسباق کی تفصیل (${stepIndex + 1}/${totalSteps})`
                  : `Steps (${stepIndex + 1}/${totalSteps})`
                : lang === 'ur'
                ? 'ایپ رہنمائی'
                : 'Free Practice Tips'}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-stone-500 transition-transform ${
                showMobileSteps ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* LEFT COLUMN: Lesson Card (about 360px, Desktop only) */}
        <div className="hidden lg:flex w-[360px] shrink-0 h-full max-h-[calc(100vh-100px)] bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm flex-col justify-between overflow-hidden">
          {renderLessonCardContent(false)}
        </div>

        {/* RIGHT COLUMN: The Centered Auto-scaling Phone Frame */}
        <div className="flex-1 w-full flex justify-center items-start overflow-hidden">
          {/* Animated wrapper with slide up/down on enter/exit */}
          <div
            className={`flex justify-center items-start ${
              isExiting ? 'stage-phone-exit' : 'stage-phone-enter'
            }`}
            style={
              isUnder500
                ? { width: '100%', height: '100%' }
                : {
                    width: 414,
                    height: 868 * phoneScale,
                  }
            }
          >
            {/* Phone Frame: 390x844 inner, 44px outer radius, 12px dark bezel */}
            <div
              className={`relative bg-black flex flex-col overflow-hidden ${
                isUnder500
                  ? 'w-full h-full rounded-none border-none shadow-none'
                  : 'w-[414px] h-[868px] rounded-[44px] border-[12px] border-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.08)]'
              }`}
              style={
                isUnder500
                  ? {}
                  : {
                      transform: `scale(${phoneScale})`,
                      transformOrigin: 'top center',
                    }
              }
            >
              {/* Phone Status Bar with Dynamic Island / Notch */}
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

              {/* Practice Mode Small Badge */}
              <div className="absolute top-12 right-3 z-30 pointer-events-none bg-amber-500/85 backdrop-blur text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                {lang === 'ur' ? 'پریکٹس' : 'Practice'}
              </div>

              {/* Internal Screen Viewport: Always LTR & uses each app's own look */}
              <div
                ref={containerRef}
                className="relative flex-1 w-full overflow-hidden bg-slate-900"
                dir="ltr"
              >
                {AppComponent ? (
                  <AppComponent key={sessionKey} onExit={handleBackToDashboard} />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">
                    No active app
                  </div>
                )}

                {/* Coach Overlay Engine: Renders Spotlight & CoachPanel INSIDE the phone screen */}
                <CoachEngine containerRef={containerRef} />
              </div>

              {/* Bottom System Navigation Bar Overlay */}
              <div className="h-14 w-full bg-slate-900 text-slate-400 flex flex-col justify-between px-8 py-1.5 z-40 shrink-0 border-t border-slate-800">
                <div className="flex items-center justify-around w-full">
                  {/* Back button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (activeLesson) {
                        exitLesson();
                      } else if (activeApp) {
                        handleBackToDashboard();
                      }
                    }}
                    className="p-2 hover:text-white rounded-full hover:bg-slate-800 transition active:scale-90"
                    title="Back"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  {/* Home button */}
                  <button
                    type="button"
                    onClick={handleBackToDashboard}
                    className="p-2 text-white bg-slate-800 hover:bg-slate-700 rounded-full transition active:scale-90 shadow"
                    title="Dashboard Home"
                  >
                    <HomeIcon className="w-5 h-5 text-teal-400" />
                  </button>

                  {/* Restart button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (activeApp) {
                        launchApp(activeApp, activeLesson);
                      }
                    }}
                    className="p-2 hover:text-white rounded-full hover:bg-slate-800 transition active:scale-90"
                    title="Restart Session"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Home Indicator Bar */}
                <div className="w-28 h-1 bg-white/30 rounded-full mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Tablet / Mobile (< 1024px): Collapsible Steps Popover Modal */}
      {showMobileSteps && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn lg:hidden select-none"
          onClick={() => setShowMobileSteps(false)}
        >
          <div
            className="w-full sm:max-w-md max-h-[80vh] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="font-bold text-sm text-stone-800">
                {lang === 'ur' ? 'اسباق کی تفصیل' : 'Lesson Details'}
              </span>
              <button
                type="button"
                onClick={() => setShowMobileSteps(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-3 flex-1 overflow-y-auto">
              {renderLessonCardContent(true)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
