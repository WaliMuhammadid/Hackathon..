import React, { useState } from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import { apps } from './registry';
import LessonPicker from './LessonPicker';
import {
  Globe,
  Award,
  Sparkles,
  PlayCircle,
  HelpCircle,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export default function HomeScreen() {
  const t = useT();
  const {
    lang,
    toggleLang,
    mode,
    setMode,
    progress,
    setShowProgress,
    launchApp,
  } = useStore();

  const [selectedAppForLessons, setSelectedAppForLessons] = useState(null);

  const totalLessons = apps.reduce(
    (sum, app) => sum + (app.lessons?.length || 0),
    0
  );
  const completedLessons = Object.values(progress.lessons || {}).filter(
    (l) => l.completed
  ).length;

  // Find next uncompleted lesson to recommend
  const allLessons = apps.flatMap((app) =>
    (app.lessons || []).map((l) => ({ ...l, app }))
  );
  const recommendedLesson =
    allLessons.find((l) => !progress.lessons?.[l.id]?.completed) || allLessons[0];

  return (
    <div className="h-full w-full bg-slate-950 text-white flex flex-col overflow-y-auto pb-10 select-none">
      {/* Top Bar: Language + Mode Toggle + My Progress */}
      <div className="p-4 pt-4 border-b border-white/5 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className={`text-lg font-bold tracking-tight ${lang === 'ur' ? 'font-urdu' : ''}`}>
              {lang === 'ur' ? 'پریکٹس فون' : 'Practice Phone'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switch */}
            <button
              type="button"
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold border border-slate-700 text-slate-200 active:scale-95 transition"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'en' ? 'اردو' : 'English'}</span>
            </button>

            {/* My Progress Button */}
            <button
              type="button"
              onClick={() => setShowProgress(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold active:scale-95 transition"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ur' ? 'ترقی' : 'Progress'}</span>
            </button>
          </div>
        </div>

        {/* 3 Mode Selector Pills: Guided / Try / Test */}
        <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/60 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('guided')}
            className={`flex-1 py-1.5 rounded-lg text-center transition ${
              mode === 'guided'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ur' ? 'رہنمائی (Guided)' : 'Guided'}
          </button>
          <button
            type="button"
            onClick={() => setMode('try')}
            className={`flex-1 py-1.5 rounded-lg text-center transition ${
              mode === 'try'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ur' ? 'کوشش (Try)' : 'Try'}
          </button>
          <button
            type="button"
            onClick={() => setMode('test')}
            className={`flex-1 py-1.5 rounded-lg text-center transition ${
              mode === 'test'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ur' ? 'امتحان (Test)' : 'Test'}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Big Friendly "Start a Lesson" Hero Card */}
        {recommendedLesson && (
          <div
            onClick={() =>
              launchApp(recommendedLesson.app.id, recommendedLesson)
            }
            className="p-4 rounded-3xl bg-gradient-to-br from-blue-900/90 via-indigo-900/80 to-slate-900 border border-blue-500/40 shadow-xl cursor-pointer hover:border-blue-400 active:scale-[0.98] transition group"
          >
            <div className="flex items-center justify-between text-xs text-blue-300 mb-2">
              <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'ur' ? 'تجویز کردہ سبق' : 'Recommended Lesson'}
              </span>
              <span className="bg-blue-500/30 px-2 py-0.5 rounded-full text-[10px] text-blue-200">
                {recommendedLesson.duration || '2 min'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3
                  className={`text-lg font-bold text-white group-hover:text-blue-200 transition ${
                    lang === 'ur' ? 'font-urdu' : ''
                  }`}
                >
                  {t(recommendedLesson.title)}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {t(recommendedLesson.app.name)}
                </p>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                <PlayCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}

        {/* Grid of App Icons (Rounded squares, large, with name underneath) */}
        <div>
          <h2
            className={`text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1 ${
              lang === 'ur' ? 'font-urdu text-right' : ''
            }`}
          >
            {lang === 'ur' ? 'ایپس کا انتخاب کریں' : 'Choose an App'}
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {apps.map((app) => {
              const Icon = app.Icon;
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => setSelectedAppForLessons(app)}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition active:scale-95 group"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-200 group-hover:scale-105 group-hover:shadow-blue-500/20"
                    style={{ backgroundColor: app.color || '#3b82f6' }}
                  >
                    {Icon ? (
                      <Icon className="w-8 h-8 drop-shadow" />
                    ) : (
                      <Sparkles className="w-8 h-8" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold text-slate-200 text-center line-clamp-1 group-hover:text-white ${
                      lang === 'ur' ? 'font-urdu' : ''
                    }`}
                  >
                    {t(app.name)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Safety Awareness Alert Box */}
        <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-3.5 flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-red-200 block">
              {lang === 'ur' ? 'محفوظ ماحول' : '100% Safe Simulation'}
            </span>
            <p className="text-slate-400 mt-0.5">
              {lang === 'ur'
                ? 'کوئی اصلی رقم یا اکاؤنٹ استعمال نہیں ہوتا۔ بے فکر ہو کر سیکھیں۔'
                : 'No real accounts or money. Safe for parents & grandparents.'}
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Picker Bottom Sheet */}
      {selectedAppForLessons && (
        <LessonPicker
          app={selectedAppForLessons}
          onClose={() => setSelectedAppForLessons(null)}
        />
      )}
    </div>
  );
}
