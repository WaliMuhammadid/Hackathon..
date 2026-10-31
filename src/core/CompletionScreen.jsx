import React from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import { Star, RotateCcw, CheckCircle2, Award } from 'lucide-react';

export default function CompletionScreen({ onRestart, onExit }) {
  const t = useT();
  const { lang, lastScore, activeLesson } = useStore();

  const stars = lastScore?.stars || 3;
  const mistakes = lastScore?.mistakes || 0;

  return (
    <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white text-center">
      {/* Animated celebratory card */}
      <div className="w-full max-w-xs bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-4">
        {/* Star Rating */}
        <div className="flex items-center justify-center gap-2 py-2">
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
            className={`text-2xl font-bold tracking-tight text-slate-100 ${
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
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-3 flex items-center justify-center gap-2 text-xs font-semibold text-blue-300">
          <Award className="w-5 h-5 text-amber-400" />
          <span>
            {lang === 'ur'
              ? 'آپ کی مہارت میں اضافہ ہوا!'
              : 'Skill successfully recorded!'}
          </span>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onRestart}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{lang === 'ur' ? 'دوبارہ پریکٹس کریں' : 'Practise Again'}</span>
          </button>

          <button
            type="button"
            onClick={onExit}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{lang === 'ur' ? 'ہوم اسکرین پر جائیں' : 'Back to Home'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
