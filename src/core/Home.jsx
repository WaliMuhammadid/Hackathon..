import React from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import { apps } from './registry';
import { PlayCircle, CheckCircle2, ChevronRight, Award } from 'lucide-react';

export default function Home() {
  const t = useT();
  const { lang, launchApp, progress } = useStore();

  const totalLessons = apps.reduce((sum, app) => sum + (app.lessons?.length || 0), 0);
  const completedLessons = Object.values(progress).filter(Boolean).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="h-full w-full bg-slate-900 text-white flex flex-col overflow-y-auto pb-16">
      {/* Top Banner / Welcome */}
      <div className="p-5 pt-8 bg-gradient-to-b from-blue-900/60 to-transparent">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className={`text-2xl font-bold tracking-tight ${lang === 'ur' ? 'font-urdu' : ''}`}>
              {lang === 'ur' ? 'پریکٹس فون' : 'Practice Phone'}
            </h1>
            <p className="text-xs text-blue-200 mt-0.5">
              {lang === 'ur'
                ? 'محفوظ طریقے سے موبائل چلانا سیکھیں'
                : 'Safe practice simulator for families'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-500/20 border border-blue-400/30 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{progressPercent}% {lang === 'ur' ? 'مکمل' : 'Done'}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* App Grid - Big Friendly App Icons */}
      <div className="px-5 py-2">
        <h2 className={`text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 ${lang === 'ur' ? 'font-urdu text-right' : ''}`}>
          {lang === 'ur' ? 'تمام ایپس' : 'All Apps'}
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {apps.map((app) => {
            const Icon = app.Icon;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => launchApp(app.id)}
                className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-slate-800/80 transition active:scale-95 group"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition group-hover:shadow-blue-500/20"
                  style={{ backgroundColor: app.color || '#3b82f6' }}
                >
                  {Icon && <Icon className="w-8 h-8" />}
                </div>
                <span className={`text-xs font-semibold text-slate-200 text-center line-clamp-1 ${lang === 'ur' ? 'font-urdu' : ''}`}>
                  {t(app.name)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Guided Lessons List */}
      <div className="px-5 py-4 flex-1">
        <h2 className={`text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 ${lang === 'ur' ? 'font-urdu text-right' : ''}`}>
          {lang === 'ur' ? 'رہنمائی والے اسباق' : 'Guided Practice Lessons'}
        </h2>

        <div className="space-y-3">
          {apps.flatMap((app) =>
            (app.lessons || []).map((lesson) => {
              const isCompleted = !!progress[lesson.id];
              return (
                <div
                  key={lesson.id}
                  onClick={() => launchApp(app.id, lesson)}
                  className="cursor-pointer bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl p-3.5 flex items-center justify-between transition active:scale-[0.98] shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: app.color || '#3b82f6' }}
                    >
                      {app.Icon && <app.Icon className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm text-slate-100 ${lang === 'ur' ? 'font-urdu' : ''}`}>
                          {t(lesson.title)}
                        </span>
                        {isCompleted && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className={lang === 'ur' ? 'font-urdu' : ''}>{t(app.name)}</span>
                        <span>•</span>
                        <span>{lesson.duration || '2 min'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-blue-400">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
