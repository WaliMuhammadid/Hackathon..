import React, { useState } from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import { apps } from './registry';
import LessonPicker from './LessonPicker';
import {
  Sparkles,
  PlayCircle,
  ShieldCheck,
  ShieldAlert,
  Award,
  BookOpen,
  ArrowRight,
  Compass,
  CheckCircle2,
} from 'lucide-react';

/**
 * Web Dashboard for Home Screen
 * Displays a responsive grid of apps, progress statistics, and recommended lessons
 */
export default function WebHomeScreen() {
  const t = useT();
  const {
    lang,
    mode,
    progress,
    launchApp,
    setShowProgress,
  } = useStore();

  const [selectedAppForLessons, setSelectedAppForLessons] = useState(null);

  const totalLessons = apps.reduce(
    (sum, app) => sum + (app.lessons?.length || 0),
    0
  );
  const completedLessons = Object.values(progress.lessons || {}).filter(
    (l) => l.completed
  ).length;

  // Find next uncompleted lesson
  const allLessons = apps.flatMap((app) =>
    (app.lessons || []).map((l) => ({ ...l, app }))
  );
  const recommendedLesson =
    allLessons.find((l) => !progress.lessons?.[l.id]?.completed) || allLessons[0];

  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 select-none"
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {lang === 'ur'
                  ? 'بغیر کسی خوف یا خطرے کے سیکھیں'
                  : '100% Safe Guided Learning Sandbox'}
              </span>
            </div>

            <h1
              className={`text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight ${
                lang === 'ur' ? 'font-urdu' : ''
              }`}
            >
              {lang === 'ur'
                ? 'والدین اور بزرگوں کے لیے ڈیجیٹل ایپس کی آسان پریکٹس'
                : 'A Safe, Guided Practice Web for Everyday Apps'}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {lang === 'ur'
                ? 'بینکنگ، واٹس ایپ، ویڈیو کالز، اور دھوکہ دہی والے ایس ایم ایس کی شناخت بغیر رقم یا ڈیٹا کھونے کے ڈر کے سیکھیں۔ ہماری اردو اور انگریزی بولنے والی رہنمائی ہمیشہ آپ کے ساتھ ہے۔'
                : 'Practice mobile banking, family messaging, video calls, and scam spotting without fear of making mistakes. Fully guided by interactive spotlights and bilingual voice narration.'}
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex sm:flex-col gap-3 shrink-0">
            <div
              onClick={() => setShowProgress(true)}
              className="flex-1 bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 cursor-pointer hover:border-amber-500/50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ⭐
                </div>
                <div>
                  <span className="text-2xl font-black text-white">
                    {progress.stars || 0}
                  </span>
                  <p className="text-xs text-slate-400">
                    {lang === 'ur' ? 'حاصل کردہ ستارے' : 'Stars Earned'}
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setShowProgress(true)}
              className="flex-1 bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 cursor-pointer hover:border-emerald-500/50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-2xl font-black text-white">
                    {completedLessons} / {totalLessons}
                  </span>
                  <p className="text-xs text-slate-400">
                    {lang === 'ur' ? 'مکمل اسباق' : 'Lessons Done'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Lesson Action Card */}
      {recommendedLesson && (
        <section
          onClick={() => launchApp(recommendedLesson.app.id, recommendedLesson)}
          className="rounded-2xl bg-gradient-to-r from-indigo-900/80 via-slate-900 to-blue-900/80 border border-indigo-500/40 p-4 sm:p-5 shadow-lg cursor-pointer hover:border-indigo-400 transition group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition shrink-0">
              <PlayCircle className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-indigo-300 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {lang === 'ur' ? 'تجویز کردہ سبق' : 'Recommended Lesson'}
                </span>
                <span className="bg-indigo-500/30 px-2 py-0.5 rounded-full text-[10px] text-indigo-200">
                  {recommendedLesson.duration || '2 min'}
                </span>
              </div>
              <h3
                className={`text-lg font-bold text-white group-hover:text-indigo-200 transition ${
                  lang === 'ur' ? 'font-urdu' : ''
                }`}
              >
                {t(recommendedLesson.title)}
              </h3>
              <p className="text-xs text-slate-300">
                {t(recommendedLesson.app.name)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 self-end sm:self-center">
            <span>{lang === 'ur' ? 'ابھی شروع کریں' : 'Start Lesson Now'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </section>
      )}

      {/* App Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            className={`text-xl font-black text-white tracking-tight ${
              lang === 'ur' ? 'font-urdu' : ''
            }`}
          >
            {lang === 'ur' ? 'روزمرہ ایپس منتخب کریں' : 'Select an App to Practice'}
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            {apps.length} {lang === 'ur' ? 'ایپس دستیاب ہیں' : 'Simulated Apps'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app) => {
            const Icon = app.Icon;
            const lessonList = app.lessons || [];
            const appCompletedCount = lessonList.filter(
              (l) => progress.lessons?.[l.id]?.completed
            ).length;

            return (
              <div
                key={app.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 shadow-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl group"
              >
                <div className="space-y-4">
                  {/* Top card bar with brand color */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition group-hover:scale-105"
                      style={{ backgroundColor: app.color || '#3b82f6' }}
                    >
                      {Icon ? (
                        <Icon className="w-7 h-7 drop-shadow" />
                      ) : (
                        <Sparkles className="w-7 h-7" />
                      )}
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {appCompletedCount}/{lessonList.length}{' '}
                      {lang === 'ur' ? 'مکمل' : 'Done'}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-lg font-bold text-white group-hover:text-blue-300 transition ${
                        lang === 'ur' ? 'font-urdu' : ''
                      }`}
                    >
                      {t(app.name)}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {app.id === 'whatsapp' &&
                        (lang === 'ur'
                          ? 'وائس نوٹ، میسجز، تصاویر اور فیملی ویڈیو کال کی پریکٹس۔'
                          : 'Voice notes, chat messaging, photo sharing, and video calling.')}
                      {app.id === 'meezan' &&
                        (lang === 'ur'
                          ? 'بینک بیلنس، رقم ٹرانسفر، او ٹی پی سیکیورٹی اور جعلی کالر بلاکنگ۔'
                          : 'Safe balance check, OTP money transfers, and scam caller decline.')}
                      {app.id === 'sms' &&
                        (lang === 'ur'
                          ? 'جعلی بی آئی ایس پی و لاٹری پیغامات کی شناخت اور بلاکنگ۔'
                          : 'Identify fake lottery & prize scams with red flag breakdown.')}
                      {app.id === 'videocall' &&
                        (lang === 'ur'
                          ? 'ویڈیو کال سننا، کیمرہ اور مائیک آن/آف کرنا اور کنکشن مسائل کا حل۔'
                          : 'Answer family video calls, camera/mic controls, and Wi-Fi helper.')}
                      {app.id === 'facebook' &&
                        (lang === 'ur'
                          ? 'فیملی پوسٹس پڑھنا، ری ایکشنز دینا اور محفوظ اسٹیٹس لگانا۔'
                          : 'Feed browsing, love/like reactions, and status posting.')}
                      {app.id === 'instagram' &&
                        (lang === 'ur'
                          ? 'اسٹوریز دیکھنا، فیملی تصاویر اور محفوظ کمنٹس کرنا۔'
                          : '24h story reels, photo feed, and commenting.')}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAppForLessons(app)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow active:scale-95 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'ur' ? 'اسباق سیکھیں' : 'Practice Lessons'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => launchApp(app.id, null)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-1 active:scale-95 transition"
                    title={lang === 'ur' ? 'ایپ خود چلائیں' : 'Open app freely'}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {lang === 'ur' ? 'کھولیں' : 'Open'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Safety Guarantee Notice */}
      <footer className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-slate-200 block">
              {lang === 'ur'
                ? '100% محفوظ سیمولیٹر — کوئی حقیقی رقم یا اکاؤنٹ نہیں'
                : '100% Client-Side Simulation — Safe for All Ages'}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {lang === 'ur'
                ? 'یہاں کی جانے والی پریکٹس سے آپ کا کوئی ڈیٹا یا اصلی بینک اکاؤنٹ متاثر نہیں ہوگا۔'
                : 'Nothing connects to real cellular networks or bank accounts. Practice with complete peace of mind.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-[11px]">
            Build4Better — NED UET
          </span>
        </div>
      </footer>

      {/* Lesson Picker Modal */}
      {selectedAppForLessons && (
        <LessonPicker
          app={selectedAppForLessons}
          onClose={() => setSelectedAppForLessons(null)}
        />
      )}
    </div>
  );
}
