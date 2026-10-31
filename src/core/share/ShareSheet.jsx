import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import {
  buildSummary,
  encodeSummary,
  getReportUrl,
  getShareMessage,
} from './summary';
import {
  X,
  Share2,
  Copy,
  Check,
  Download,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const USER_NAME_KEY = 'practice_phone_user_name';
const FAMILY_NAME_KEY = 'practice_phone_family_member_name';

export default function ShareSheet({ onClose }) {
  const { progress, lang } = useStore();

  const [userName, setUserName] = useState(() => {
    try {
      return localStorage.getItem(USER_NAME_KEY) || '';
    } catch {
      return '';
    }
  });

  const [familyName, setFamilyName] = useState(() => {
    try {
      return localStorage.getItem(FAMILY_NAME_KEY) || '';
    } catch {
      return '';
    }
  });

  const [copied, setCopied] = useState(false);
  const [isSavingPicture, setIsSavingPicture] = useState(false);
  const canvasRef = useRef(null);

  // Save userName in localStorage on change
  useEffect(() => {
    try {
      if (userName) {
        localStorage.setItem(USER_NAME_KEY, userName);
      }
    } catch (e) {
      console.warn('Could not save user name', e);
    }
  }, [userName]);

  useEffect(() => {
    try {
      if (familyName) {
        localStorage.setItem(FAMILY_NAME_KEY, familyName);
      }
    } catch (e) {
      console.warn('Could not save family member name', e);
    }
  }, [familyName]);

  // Build summary, encode data, and generate URL & message
  const summary = buildSummary(progress, { name: userName, lang });
  const encodedToken = encodeSummary(summary);
  const reportUrl = getReportUrl(encodedToken);
  const shareMessage = getShareMessage(summary, familyName, reportUrl, lang);

  // Check Web Share API support
  const canWebShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  // 1) Send on WhatsApp
  const handleWhatsApp = () => {
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // 2) Native Web Share
  const handleNativeShare = async () => {
    if (!canWebShare) return;
    try {
      await navigator.share({
        title: lang === 'ur' ? 'پریکٹس فون پیش رفت' : 'Practice Phone Progress',
        text: shareMessage,
        url: reportUrl,
      });
    } catch (err) {
      // User cancelled share or failed
      console.log('Share dismissed or cancelled', err);
    }
  };

  // 3) Copy Link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(reportUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // 4) Save as Picture (Canvas to PNG with print fallback)
  const handleSavePicture = () => {
    setIsSavingPicture(true);
    try {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = 680;
      canvas.height = 780;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        window.print();
        setIsSavingPicture(false);
        return;
      }

      // Background
      ctx.fillStyle = '#FAF7F2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Card Box with rounded rectangle
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#E7E5E4';
      ctx.lineWidth = 2;
      roundRect(ctx, 30, 30, 620, 720, 28);
      ctx.fill();
      ctx.stroke();

      // Top banner
      ctx.fillStyle = '#0D9488';
      ctx.fillRect(30, 30, 620, 10);

      // App Title & Tagline
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('Practice Phone 📱🇵🇰', 60, 80);

      ctx.fillStyle = '#64748B';
      ctx.font = '14px sans-serif';
      ctx.fillText('Safe, Guided Phone Simulator for Families', 60, 105);

      // User's name header
      const displayName = userName.trim()
        ? `${userName}'s Progress Report`
        : 'Family Practice Progress Report';
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(displayName, 60, 160);

      // Date
      ctx.fillStyle = '#94A3B8';
      ctx.font = '13px sans-serif';
      ctx.fillText(
        new Date().toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        60,
        185
      );

      // Metric Boxes (Lessons Done & Stars)
      // Box 1: Lessons Done
      ctx.fillStyle = '#F0FDFA';
      ctx.strokeStyle = '#99F6E4';
      roundRect(ctx, 60, 215, 260, 100, 18);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0F766E';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(`${summary.lessonsDone} / ${summary.lessonsTotal}`, 85, 265);
      ctx.fillStyle = '#115E59';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Lessons Completed', 85, 292);

      // Box 2: Stars Earned
      ctx.fillStyle = '#FFFBEB';
      ctx.strokeStyle = '#FDE68A';
      roundRect(ctx, 360, 215, 260, 100, 18);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#B45309';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(`⭐ ${summary.stars}`, 385, 265);
      ctx.fillStyle = '#92400E';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Stars Earned', 385, 292);

      // App Progress Section
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('App Highlights', 60, 355);

      const appLabels = [
        { id: 'whatsapp', label: 'WhatsApp (Voice & Chat)' },
        { id: 'meezan', label: 'Meezan Digital Banking' },
        { id: 'sms', label: 'SMS Scam Spotter' },
        { id: 'videocall', label: 'Family Video Calling' },
      ];

      let yOffset = 385;
      appLabels.forEach((app) => {
        const data = summary.perApp?.[app.id] || { done: 0, total: 2 };
        ctx.fillStyle = '#475569';
        ctx.font = '14px sans-serif';
        ctx.fillText(app.label, 60, yOffset);

        ctx.fillStyle = '#0D9488';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(`${data.done}/${data.total}`, 570, yOffset);

        // Progress bar track
        ctx.fillStyle = '#F1F5F9';
        roundRect(ctx, 60, yOffset + 8, 560, 8, 4);
        ctx.fill();

        // Progress bar fill
        const pct = data.total > 0 ? data.done / data.total : 0;
        if (pct > 0) {
          ctx.fillStyle = '#0D9488';
          roundRect(ctx, 60, yOffset + 8, Math.max(12, 560 * pct), 8, 4);
          ctx.fill();
        }

        yOffset += 45;
      });

      // Scam Spotter Card
      ctx.fillStyle = '#FEF2F2';
      ctx.strokeStyle = '#FECACA';
      roundRect(ctx, 60, yOffset + 10, 560, 75, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#991B1B';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('🛡️ Scam & Fraud Protection Status', 80, yOffset + 38);

      ctx.fillStyle = '#7F1D1D';
      ctx.font = '13px sans-serif';
      const scamInsight =
        summary.scamQuiz?.score >= 6
          ? 'Alert to lottery & OTP fraud. Very high safety awareness.'
          : 'Active learner in identifying fake prize & urgent SMS scams.';
      ctx.fillText(scamInsight, 80, yOffset + 62);

      // Safe Simulation Footer
      ctx.fillStyle = '#64748B';
      ctx.font = '11px sans-serif';
      ctx.fillText(
        '100% Client-Side Simulation • No Personal or Banking Data is Stored',
        60,
        715
      );

      // Download file
      const link = document.createElement('a');
      link.download = `practice-phone-report-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setIsSavingPicture(false);
    } catch (err) {
      console.warn('Canvas save picture error, falling back to print', err);
      setIsSavingPicture(false);
      window.print();
    }
  };

  // Helper for canvas rounded rectangle
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 select-none animate-fadeIn"
      onClick={onClose}
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      <canvas ref={canvasRef} className="hidden" />

      {/* Sheet Container: Bottom Sheet on Mobile / Centered Modal on Desktop */}
      <div
        className="w-full sm:max-w-lg bg-[#FAF7F2] text-stone-800 rounded-t-[32px] sm:rounded-3xl border border-stone-200/90 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title & Close button */}
        <div className="px-5 pt-4 pb-3 border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600/15 text-teal-700 flex items-center justify-center font-bold shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-lg font-black text-stone-900 leading-tight ${
                  lang === 'ur' ? 'font-urdu' : ''
                }`}
              >
                {lang === 'ur'
                  ? 'گھر والوں کے ساتھ پیش رفت شیئر کریں'
                  : 'Share My Progress with Family'}
              </h2>
              <p className="text-xs text-stone-500">
                {lang === 'ur'
                  ? 'بغیر اکاؤنٹ، 100% محفوظ طریقے سے'
                  : 'No account needed • 100% Client-side'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Optional Name Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                {lang === 'ur' ? 'آپ کا نام (اختیاری)' : 'Your Name (optional)'}
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={lang === 'ur' ? 'مثلاً احمد' : 'e.g. Ammi / Ahmed'}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-800 placeholder-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                {lang === 'ur'
                  ? 'رشتہ دار کا نام (اختیاری)'
                  : "Family Member's Name (optional)"}
              </label>
              <input
                type="text"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder={lang === 'ur' ? 'مثلاً بیٹا / بیٹی' : 'e.g. Ali / Bilal'}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-800 placeholder-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Live Message Preview Box */}
          <div className="bg-white rounded-2xl p-3.5 border border-stone-200/80 shadow-xs space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
              {lang === 'ur' ? 'پیغام کا پیش منظر' : 'Message Preview'}
            </span>
            <p
              className={`text-xs text-stone-700 leading-relaxed italic ${
                lang === 'ur' ? 'font-urdu' : ''
              }`}
            >
              “{shareMessage}”
            </p>
          </div>

          {/* Mini Report Summary Preview Card */}
          <div className="bg-gradient-to-br from-teal-50/70 via-stone-50 to-white rounded-2xl p-4 border border-teal-200/60 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>
                  {userName.trim()
                    ? `${userName}'s Progress`
                    : lang === 'ur'
                    ? 'آپ کی پیش رفت کا خلاصہ'
                    : 'Your Progress Summary'}
                </span>
              </span>
              <span className="text-[11px] font-mono text-stone-500">
                {new Date().toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white rounded-xl p-2.5 border border-stone-200/80">
                <span className="text-xl font-black text-teal-800 block">
                  {summary.lessonsDone} / {summary.lessonsTotal}
                </span>
                <span className="text-[10px] text-stone-500 font-semibold">
                  {lang === 'ur' ? 'مکمل اسباق' : 'Lessons Done'}
                </span>
              </div>

              <div className="bg-white rounded-xl p-2.5 border border-stone-200/80">
                <span className="text-xl font-black text-amber-600 block">
                  ⭐ {summary.stars}
                </span>
                <span className="text-[10px] text-stone-500 font-semibold">
                  {lang === 'ur' ? 'ستارے' : 'Stars Earned'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Each 56px High */}
          <div className="space-y-2.5 pt-1">
            {/* 1) Send on WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full h-[56px] min-h-[56px] px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-3 shadow-md active:scale-98 transition cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span className={lang === 'ur' ? 'font-urdu' : ''}>
                {lang === 'ur' ? 'واٹس ایپ پر بھیجیں' : 'Send on WhatsApp'}
              </span>
            </button>

            {/* 2) Native Web Share (if supported) */}
            {canWebShare && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full h-[56px] min-h-[56px] px-5 rounded-2xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-sm flex items-center justify-center gap-3 shadow-md active:scale-98 transition cursor-pointer"
              >
                <Share2 className="w-5 h-5 shrink-0" />
                <span className={lang === 'ur' ? 'font-urdu' : ''}>
                  {lang === 'ur' ? 'شیئر کریں…' : 'Share…'}
                </span>
              </button>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* 3) Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full h-[56px] min-h-[56px] px-4 rounded-2xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition shadow-xs cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">
                      {lang === 'ur' ? 'لنک کاپی ہو گیا ✓' : 'Copied ✓'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-600" />
                    <span>{lang === 'ur' ? 'لنک کاپی کریں' : 'Copy link'}</span>
                  </>
                )}
              </button>

              {/* 4) Save as Picture */}
              <button
                type="button"
                onClick={handleSavePicture}
                disabled={isSavingPicture}
                className="w-full h-[56px] min-h-[56px] px-4 rounded-2xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-teal-700" />
                <span>
                  {isSavingPicture
                    ? lang === 'ur'
                      ? 'تصویر بن رہی ہے…'
                      : 'Saving…'
                    : lang === 'ur'
                    ? 'بطور تصویر محفوظ کریں'
                    : 'Save as picture'}
                </span>
              </button>
            </div>
          </div>

          {/* Privacy & Honesty Note (Point 5) */}
          <div className="pt-2 text-center">
            <p className="text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>
                {lang === 'ur'
                  ? 'صرف آپ کے اسباق کی پیش رفت شیئر کی جائے گی، کوئی اور معلومات نہیں۔'
                  : 'Only your lesson progress is shared, nothing else.'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
