import React, { useState } from 'react';
import { decodeSummary } from './summary';
import {
  Star,
  CheckCircle2,
  ShieldAlert,
  Globe,
  MessageCircle,
  Heart,
  Sparkles,
  Smartphone,
} from 'lucide-react';

export default function FamilyReport({ dataToken }) {
  const data = decodeSummary(dataToken);

  // Initialize lang from data sender, allowing local toggle
  const [lang, setLang] = useState(data?.lang || 'en');
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);

  // If corrupted or invalid link, show friendly error state
  if (!data) {
    return (
      <div className="min-h-screen w-full bg-[#FAF7F2] text-stone-800 flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl font-bold">
            ⚠️
          </div>
          <h2 className="text-xl font-black text-stone-900">
            This link looks broken
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            The progress report link might be incomplete or corrupted. Please ask your family member to share their progress link again.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                window.location.hash = '#/';
              }}
              className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow transition active:scale-95 cursor-pointer"
            >
              Open Practice Phone Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const {
    name,
    date,
    lessonsDone,
    lessonsTotal,
    stars,
    badges = [],
    perApp = {},
    scamQuiz,
    recent = [],
  } = data;

  const pct =
    lessonsTotal > 0 ? Math.round((lessonsDone / lessonsTotal) * 100) : 0;

  const formattedDate = new Date(date).toLocaleDateString(
    lang === 'ur' ? 'ur-PK' : 'en-US',
    {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  const displayName = name
    ? name
    : lang === 'ur'
    ? 'آپ کے پیارے'
    : 'Your family member';

  // Scam Spotter Rule-Based Insight
  const getScamInsight = () => {
    const score = scamQuiz?.score ?? 0;
    if (score >= 7) {
      return lang === 'ur'
        ? 'زیادہ تر جعلی پیغامات کو فوراً پہچان لیتے ہیں۔ مشکوک لاٹری لنکس سے مکمل ہوشیار ہیں۔'
        : 'Can spot most scam messages. Very alert to suspicious lottery & prize links.';
    }
    if (score >= 5) {
      return lang === 'ur'
        ? 'اکثر جعلی پیغامات کی شناخت کر لیتے ہیں۔ او ٹی پی مانگنے والے پیغامات پر مزید مشق جاری ہے۔'
        : 'Can spot most scam messages. Needs gentle reminders regarding urgent OTP requests.';
    }
    return lang === 'ur'
      ? 'جعلی پیغامات اور لاٹری فراڈ سے بچاؤ کی مشق کر رہے ہیں۔ باقاعدگی سے سیکھ رہے ہیں۔'
      : 'Learning to identify fake lottery and prize messages. Making steady progress.';
  };

  // 3 Selectable Encouragement Templates
  const encouragementTemplates = [
    {
      en: 'Shabash! Proud of you 👏 Keep going!',
      ur: 'شاباش! ہمیں آپ پر فخر ہے 👏 ایسے ہی سیکھتے رہیں!',
    },
    {
      en: 'Great progress on your phone lessons today! ⭐',
      ur: 'آج آپ نے موبائل پریکٹس میں زبردست پیش رفت کی ہے! ⭐',
    },
    {
      en: 'Saw your practice report. Amazing work, keep it up! ❤️',
      ur: 'میں نے آپ کی پریکٹس رپورٹ دیکھی۔ بہت شاندار کام ہے، جاری رکھیں! ❤️',
    },
  ];

  const currentTemplate = encouragementTemplates[selectedTemplateIndex];
  const messageToSend =
    lang === 'ur' ? currentTemplate.ur : currentTemplate.en;

  const handleSendEncouragement = () => {
    const waUrl = `https://wa.me/?text=${encodeURIComponent(messageToSend)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const appMeta = [
    { id: 'whatsapp', nameEn: 'WhatsApp', nameUr: 'واٹس ایپ', color: '#22c55e' },
    { id: 'meezan', nameEn: 'Meezan Banking', nameUr: 'میزان بینکنگ', color: '#0d9488' },
    { id: 'sms', nameEn: 'SMS & Scam Spotter', nameUr: 'ایس ایم ایس و تحفظ', color: '#f59e0b' },
    { id: 'videocall', nameEn: 'Family Video Call', nameUr: 'ویڈیو کال', color: '#3b82f6' },
    { id: 'instagram', nameEn: 'Instagram', nameUr: 'انسٹاگرام', color: '#ec4899' },
    { id: 'facebook', nameEn: 'Facebook', nameUr: 'فیس بک', color: '#2563eb' },
  ];

  const badgeLabels = {
    first_step: { en: 'First Step 🌟', ur: 'پہلا قدم 🌟' },
    scam_spotter: { en: 'Scam Spotter 🛡️', ur: 'تحفظ اسکیم 🛡️' },
    digital_banker: { en: 'Digital Banker 🏦', ur: 'ڈیجیٹل بینکر 🏦' },
    connected_family: { en: 'Connected Family 💬', ur: 'فیملی رابطہ 💬' },
    master_explorer: { en: 'Master Explorer 🏆', ur: 'ماسٹر ایکسپلورر 🏆' },
  };

  return (
    <div
      className="min-h-screen w-full bg-[#FAF7F2] text-stone-800 py-6 px-4 sm:px-6 select-none font-sans"
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-xl mx-auto space-y-6">
        {/* Top Slim Bar: Logo + Language switch */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="text-xl">📱</span>
            <div>
              <span className="font-black text-sm text-stone-900 tracking-tight block">
                Practice Phone
              </span>
              <span className="text-[10px] text-teal-700 font-bold block">
                Family Progress Report
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-300 text-xs font-bold text-stone-700 shadow-xs active:scale-95 transition"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <span>{lang === 'en' ? 'اردو' : 'English'}</span>
          </button>
        </div>

        {/* Hero Card: Header with Name & Date */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-teal-500 via-amber-400 to-emerald-500" />

          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-1">
            {formattedDate}
          </span>

          <h1
            className={`text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug ${
              lang === 'ur' ? 'font-urdu' : ''
            }`}
          >
            {lang === 'ur'
              ? `${displayName} کی پریکٹس رپورٹ`
              : `${displayName}'s Progress`}
          </h1>

          <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
            {lang === 'ur'
              ? 'محفوظ ڈیجیٹل سمولیٹر پر سیکھی گئی مہارتوں کا مکمل خلاصہ'
              : 'Verified simulation progress on Pakistan’s safe guided phone learning app.'}
          </p>

          {/* Big Progress Ring & Star Count */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Circular Progress Gauge */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-stone-100"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-teal-600 transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * pct) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-stone-900 font-mono">
                  {pct}%
                </span>
                <span className="text-[10px] text-stone-500 font-bold uppercase">
                  {lang === 'ur' ? 'مکمل' : 'Done'}
                </span>
              </div>
            </div>

            {/* Badges / Stats column */}
            <div className="flex flex-col gap-2.5 text-left rtl:text-right">
              <div className="bg-teal-50 border border-teal-200/80 rounded-2xl px-4 py-2 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                <div>
                  <span className="text-base font-black text-teal-900 block font-mono">
                    {lessonsDone} / {lessonsTotal}
                  </span>
                  <span className="text-[10px] font-bold text-teal-700">
                    {lang === 'ur' ? 'اسباق مکمل کیے' : 'Lessons Finished'}
                  </span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl px-4 py-2 flex items-center gap-3">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
                <div>
                  <span className="text-base font-black text-amber-900 block font-mono">
                    {stars} ⭐
                  </span>
                  <span className="text-[10px] font-bold text-amber-700">
                    {lang === 'ur' ? 'حاصل کردہ ستارے' : 'Stars Earned'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Per-App Progress Rows */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-sm space-y-4">
          <h2
            className={`text-base font-bold text-stone-900 ${
              lang === 'ur' ? 'font-urdu' : ''
            }`}
          >
            {lang === 'ur' ? 'ایپ کے لحاظ سے پریکٹس' : 'Per-App Progress'}
          </h2>

          <div className="space-y-3">
            {appMeta.map((app) => {
              const appData = perApp[app.id] || { done: 0, total: 3 };
              const appPct =
                appData.total > 0
                  ? Math.round((appData.done / appData.total) * 100)
                  : 0;

              return (
                <div
                  key={app.id}
                  className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-stone-800 flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: app.color }}
                      />
                      <span>{lang === 'ur' ? app.nameUr : app.nameEn}</span>
                    </span>
                    <span className="font-mono text-stone-500">
                      {appData.done}/{appData.total}
                    </span>
                  </div>

                  <div className="w-full bg-stone-200/70 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${appPct}%`,
                        backgroundColor: app.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Scam Spotter Card */}
        <section className="bg-gradient-to-br from-red-50/80 via-amber-50/40 to-white rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
              <span className={lang === 'ur' ? 'font-urdu' : ''}>
                {lang === 'ur' ? 'تحفظ اسکیم و فراڈ' : 'Scam & Safety Spotter'}
              </span>
            </div>

            {scamQuiz && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-mono">
                {scamQuiz.score}/{scamQuiz.total} Quiz Score
              </span>
            )}
          </div>

          <p
            className={`text-xs text-stone-700 leading-relaxed font-semibold ${
              lang === 'ur' ? 'font-urdu' : ''
            }`}
          >
            {getScamInsight()}
          </p>
        </section>

        {/* Badges Earned */}
        {badges.length > 0 && (
          <section className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-sm space-y-3">
            <h2
              className={`text-base font-bold text-stone-900 ${
                lang === 'ur' ? 'font-urdu' : ''
              }`}
            >
              {lang === 'ur' ? 'حاصل کردہ بیجز' : 'Badges Earned'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {badgeLabels[b]?.[lang] || b.replace('_', ' ')}
                  </span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Last 5 Lessons */}
        {recent.length > 0 && (
          <section className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-sm space-y-3">
            <h2
              className={`text-base font-bold text-stone-900 ${
                lang === 'ur' ? 'font-urdu' : ''
              }`}
            >
              {lang === 'ur' ? 'حالیہ مکمل کیے گئے اسباق' : 'Recent Completed Lessons'}
            </h2>
            <div className="space-y-2">
              {recent.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-center justify-between text-xs"
                >
                  <span className={`font-semibold text-stone-800 ${lang === 'ur' ? 'font-urdu' : ''}`}>
                    {rec.title?.[lang] || rec.title?.en}
                  </span>
                  <span className="font-mono text-amber-600 font-bold shrink-0">
                    {'⭐'.repeat(rec.stars || 3)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* "Ways to help" Tips for the Family Member */}
        <section className="bg-teal-50/70 rounded-3xl p-5 sm:p-6 border border-teal-200/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
            <Heart className="w-4 h-4 text-teal-600 shrink-0" />
            <span className={lang === 'ur' ? 'font-urdu' : ''}>
              {lang === 'ur' ? 'مدد کرنے کے طریقے' : 'Ways You Can Help'}
            </span>
          </div>

          <ul className="space-y-2 text-xs text-stone-700 leading-relaxed list-disc list-inside">
            <li>
              <strong>{lang === 'ur' ? '10 منٹ ساتھ پریکٹس کریں:' : 'Practise together for 10 minutes:'}</strong>{' '}
              {lang === 'ur'
                ? 'ان سے کہیں کہ آج جو سبق سیکھا ہے وہ آپ کو چلا کر دکھائیں۔'
                : 'Ask them to show you the lessons they completed today.'}
            </li>
            <li>
              <strong>{lang === 'ur' ? 'او ٹی پی یاددہانی:' : 'Remind them: Never share OTP:'}</strong>{' '}
              {lang === 'ur'
                ? 'کوئی بھی اصل بینک یا ادارہ فون پر پن کوڈ یا او ٹی پی نہیں مانگتا۔'
                : 'Legitimate banks and services never ask for secret verification codes.'}
            </li>
            <li>
              <strong>{lang === 'ur' ? 'حوصلہ افزائی کریں:' : 'Celebrate their wins:'}</strong>{' '}
              {lang === 'ur'
                ? 'چھوٹے اقدامات جیسے وائس نوٹ بھیجنا بزرگوں کا اعتماد بڑھاتے ہیں۔'
                : 'Small actions like voice notes or checking balance build digital confidence.'}
            </li>
          </ul>
        </section>

        {/* CTA Buttons: Send Encouragement & Try Practice Phone */}
        <section className="space-y-3 pt-2">
          {/* Template selector tabs */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-stone-600">
              {lang === 'ur' ? 'حوصلہ افزائی کا پیغام چنیں:' : 'Select Encouragement Message:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              {encouragementTemplates.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedTemplateIndex(idx)}
                  className={`p-2 rounded-xl text-[11px] border font-semibold text-left rtl:text-right transition ${
                    selectedTemplateIndex === idx
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <span className={lang === 'ur' ? 'font-urdu' : ''}>
                    {lang === 'ur' ? t.ur : t.en}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Send Encouragement via WhatsApp */}
          <button
            type="button"
            onClick={handleSendEncouragement}
            className="w-full h-14 min-h-[56px] px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-3 shadow-md active:scale-98 transition cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span className={lang === 'ur' ? 'font-urdu' : ''}>
              {lang === 'ur'
                ? 'واٹس ایپ پر شاباش بھیجیں'
                : 'Send Encouragement on WhatsApp'}
            </span>
          </button>

          {/* Try Practice Phone */}
          <button
            type="button"
            onClick={() => {
              window.location.hash = '#/';
            }}
            className="w-full h-12 rounded-2xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition shadow-xs cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-teal-700" />
            <span className={lang === 'ur' ? 'font-urdu' : ''}>
              {lang === 'ur'
                ? 'پریکٹس فون خود آزمائیں'
                : 'Try Practice Phone Simulator'}
            </span>
          </button>
        </section>

        {/* Footer line */}
        <footer className="text-center pt-4 pb-8 border-t border-stone-200">
          <p className="text-[11px] text-stone-400">
            {lang === 'ur'
              ? 'اس رپورٹ میں صرف پریکٹس اسباق کی معلومات شامل ہیں۔ کوئی ذاتی یا بینکنگ ڈیٹا نہیں ہے۔'
              : 'This report only contains practice progress. No personal or banking data.'}
          </p>
        </footer>
      </div>
    </div>
  );
}
