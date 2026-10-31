import React from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import {
  X,
  Play,
  CheckCircle2,
  Clock,
  Compass,
  Star,
} from 'lucide-react';

export default function LessonPicker({ app, onClose }) {
  const t = useT();
  const { lang, launchApp, progress } = useStore();

  if (!app) return null;

  const lessons = app.lessons || [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center p-0 sm:p-4 animate-fadeIn select-none"
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* Background click dismisses */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      {/* Slide-up Bottom Sheet on mobile / Centered modal on web */}
      <div className="bg-slate-900 border-t sm:border border-slate-700/80 rounded-t-[32px] sm:rounded-3xl p-5 w-full sm:max-w-lg max-h-[85vh] flex flex-col shadow-2xl text-white animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: app.color || '#3b82f6' }}
            >
              {app.Icon && <app.Icon className="w-6 h-6" />}
            </div>
            <div>
              <h3 className={`text-lg font-bold ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {t(app.name)}
              </h3>
              <p className="text-xs text-slate-400">
                {lessons.length}{' '}
                {lang === 'ur' ? 'رہنمائی والے اسباق' : 'Practice Lessons'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free explore button */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => {
              launchApp(app.id, null);
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-between text-xs font-bold text-blue-300 active:scale-98 transition"
          >
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400" />
              <span>
                {lang === 'ur' ? 'ایپ کو خود چلائیں (بغیر سبق)' : 'Open app freely'}
              </span>
            </div>
            <span className="text-slate-400">→</span>
          </button>
        </div>

        {/* Lessons List */}
        <div className="flex-1 overflow-y-auto space-y-2 py-1 pr-1">
          {lessons.map((lesson) => {
            const lessonProgress = progress.lessons[lesson.id];
            const isCompleted = !!lessonProgress?.completed;
            const stars = lessonProgress?.stars || 0;

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  launchApp(app.id, lesson);
                  onClose();
                }}
                className="p-3.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 rounded-2xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition group shadow-sm"
              >
                <div className="flex-1 pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`font-semibold text-sm text-slate-100 ${
                        lang === 'ur' ? 'font-urdu' : ''
                      }`}
                    >
                      {t(lesson.title)}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.duration || '2 min'}
                    </span>

                    {stars > 0 && (
                      <div className="flex items-center text-amber-400 gap-0.5">
                        {[...Array(stars)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
