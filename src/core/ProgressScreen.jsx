import React from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import { apps } from './registry';
import FamilyShare from './FamilyShare';
import {
  X,
  Award,
  Star,
  CheckCircle2,
  RotateCcw,
  Shield,
  MessageSquare,
  Landmark,
  Share2,
} from 'lucide-react';

export default function ProgressScreen({ onClose }) {
  const t = useT();
  const { lang, progress, resetProgress, setShowShare } = useStore();

  const totalLessons = apps.reduce(
    (sum, app) => sum + (app.lessons?.length || 0),
    0
  );
  const completedCount = Object.values(progress.lessons || {}).filter(
    (l) => l.completed
  ).length;

  const badgesCatalog = [
    {
      id: 'first_step',
      name: { en: 'First Step', ur: 'پہلا قدم' },
      desc: { en: 'Completed your first guided lesson', ur: 'پہلا سبق کامیابی سے مکمل کیا' },
      icon: Award,
      color: 'bg-amber-500',
    },
    {
      id: 'connected_family',
      name: { en: 'Connected Family', ur: 'فیملی رابطہ' },
      desc: { en: 'Sent message or joined video call', ur: 'پیغام بھیجا یا ویڈیو کال کی' },
      icon: MessageSquare,
      color: 'bg-emerald-500',
    },
    {
      id: 'scam_spotter',
      name: { en: 'Scam Spotter', ur: 'فراڈ کی روک تھام' },
      desc: { en: 'Identified and blocked an SMS scam', ur: 'جعلی لاٹری میسج بلاک کیا' },
      icon: Shield,
      color: 'bg-red-500',
    },
    {
      id: 'digital_banker',
      name: { en: 'Digital Banker', ur: 'ڈیجیٹل بینکر' },
      desc: { en: 'Safely completed a mobile bank transfer', ur: 'بینک بیلنس اور رقم کی منتقلی سیکھی' },
      icon: Landmark,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 animate-fadeIn select-none"
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 -z-10" onClick={onClose} />
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full sm:max-w-2xl max-h-[90vh] flex flex-col text-white overflow-hidden shadow-2xl animate-slideUp">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className={`text-lg font-bold ${lang === 'ur' ? 'font-urdu' : ''}`}>
              {lang === 'ur' ? 'میری ترقی اور کارکردگی' : 'My Progress & Badges'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Stats Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Top Cards: Stars & Lessons */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">
              <Star className="w-8 h-8 text-amber-400 fill-amber-400 mb-2 drop-shadow" />
              <span className="text-2xl font-black">{progress.stars || 0}</span>
              <span className="text-xs text-slate-400">
                {lang === 'ur' ? 'کل ستارے' : 'Total Stars'}
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
              <span className="text-2xl font-black">
                {completedCount} / {totalLessons}
              </span>
              <span className="text-xs text-slate-400">
                {lang === 'ur' ? 'مکمل اسباق' : 'Completed'}
              </span>
            </div>
          </div>

          {/* Prominent "Send my progress" Button */}
          <button
            type="button"
            onClick={() => {
              onClose();
              setShowShare(true);
            }}
            className="w-full h-14 min-h-[56px] px-5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm flex items-center justify-center gap-3 shadow-lg active:scale-98 transition cursor-pointer"
          >
            <Share2 className="w-5 h-5 shrink-0" />
            <span className={lang === 'ur' ? 'font-urdu' : ''}>
              {lang === 'ur'
                ? 'گھر والوں کو اپنی پیش رفت بھیجیں'
                : 'Send my progress to family'}
            </span>
          </button>

          {/* Badges Section */}
          <div>
            <h3 className={`text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ${lang === 'ur' ? 'font-urdu text-right' : ''}`}>
              {lang === 'ur' ? 'حاصل کردہ بیجز' : 'Earned Badges'}
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {badgesCatalog.map((b) => {
                const earned = (progress.badges || []).includes(b.id);
                const Icon = b.icon;
                return (
                  <div
                    key={b.id}
                    className={`p-3 rounded-2xl border flex flex-col items-center text-center transition ${
                      earned
                        ? 'bg-slate-900 border-amber-500/30'
                        : 'bg-slate-900/40 border-slate-800/80 opacity-40 grayscale'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
                        earned ? b.color : 'bg-slate-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-100">
                      {t(b.name)}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                      {t(b.desc)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lesson History Detail */}
          <div>
            <h3 className={`text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ${lang === 'ur' ? 'font-urdu text-right' : ''}`}>
              {lang === 'ur' ? 'اسباق کی تاریخ' : 'Lesson History'}
            </h3>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800/80 overflow-hidden text-xs">
              {apps.flatMap((app) =>
                (app.lessons || []).map((lesson) => {
                  const lp = progress.lessons?.[lesson.id];
                  const done = !!lp?.completed;
                  return (
                    <div
                      key={lesson.id}
                      className="p-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-slate-200">
                          {t(lesson.title)}
                        </p>
                        <span className="text-[10px] text-slate-500">
                          {t(app.name)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400">
                        {done ? (
                          [...Array(lp.stars || 3)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-600">Pending</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

                    {/* Family Share (QR & WhatsApp Setting) */}
          <FamilyShare progress={progress} />

          {/* Reset progress option */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all saved practice progress?')) {
                  resetProgress();
                }
              }}
              className="text-xs text-slate-500 hover:text-red-400 flex items-center justify-center gap-1 mx-auto transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset progress</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
