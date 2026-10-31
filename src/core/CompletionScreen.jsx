import React from 'react';
import { useStore } from './store';
import { getAppById } from './registry';
import { Star, RotateCcw, ArrowRight, LayoutDashboard, Award } from 'lucide-react';

export default function CompletionScreen({ onRestart, onExit }) {
  const { lang, lastScore, activeLesson, activeApp, launchApp, exitApp } = useStore();

  const stars = lastScore?.stars || 3;
  const mistakes = lastScore?.mistakes || 0;

  const currentApp = activeApp ? getAppById(activeApp) : null;
  const lessons = currentApp?.lessons || [];
  const currentIndex = lessons.findIndex((l) => l.id === activeLesson?.id);
  const nextLesson =
    currentIndex >= 0 && currentIndex + 1 < lessons.length
      ? lessons[currentIndex + 1]
      : null;

  const handleExit = () => {
    if (typeof onExit === 'function') {
      onExit();
    } else {
      exitApp();
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 text-white text-center overflow-hidden select-none">
      {/* Confetti particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(24)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-sm animate-bounce"
            style={{
              width: `${(i % 3) * 3 + 6}px`,
              height: `${(i % 2) * 5 + 6}px`,
              top: `${(i * 17) % 90}%`,
              left: `${(i * 23) % 94}%`,
              backgroundColor: ['#14b8a6', '#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#8b5cf6'][i % 6],
              transform: `rotate(${i * 45}deg)`,
              opacity: 0.85,
              animationDuration: `${1.2 + (i % 5) * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Animated celebratory card */}
      <div className="relative z-10 w-full max-w-xs bg-slate-900 border border-slate-700/80 rounded-3xl p-5 shadow-2xl space-y-3.5">
        {/* Star Rating */}
        <div className="flex items-center justify-center gap-2 py-1">
          {[1, 2, 3].map((starIdx) => (
            <Star
              key={starIdx}
              className={`w-9 h-9 transition-all duration-500 ${
                starIdx <= stars
                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)] scale-110'
                  : 'text-slate-600 fill-slate-800'
              }`}
            />
          ))}
        </div>

        <div className="space-y-1">
          <h2
            className={`text-xl font-bold tracking-tight text-slate-100 ${
              lang === 'ur' ? 'font-urdu' : ''
            }`}
          >
            {lang === 'ur' ? 'بہت خوب! سبق مکمل ہوا' : 'Well Done! Lesson Complete'}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'ur'
              ? `${stars} ستارے حاصل کیے (${mistakes} غلطیاں)`
              : `Earned ${stars} Stars (${mistakes} mistakes)`}
          </p>
        </div>

        {/* Motivational badge */}
        <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-2.5 flex items-center justify-center gap-2 text-xs font-semibold text-teal-300">
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {lang === 'ur'
              ? 'آپ کی مہارت میں اضافہ ہوا!'
              : 'Skill successfully recorded!'}
          </span>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          {/* Next Lesson Button (if next lesson exists) */}
          {nextLesson && (
            <button
              type="button"
              onClick={() => launchApp(activeApp, nextLesson)}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
            >
              <span>{lang === 'ur' ? 'اگلا سبق شروع کریں' : 'Next Lesson'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Practise Again Button */}
          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? 'دوبارہ پریکٹس کریں' : 'Practise Again'}</span>
          </button>

          {/* Back to Dashboard Button */}
          <button
            type="button"
            onClick={handleExit}
            className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow active:scale-95 transition"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-teal-400" />
            <span>{lang === 'ur' ? 'ڈیش بورڈ پر جائیں' : 'Back to Dashboard'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
