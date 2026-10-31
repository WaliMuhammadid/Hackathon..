import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { useStore } from './store';
import { apps } from './registry';
import { MessageCircle, QrCode, Users } from 'lucide-react';

// Builds a short, privacy-safe progress summary (counts and lesson names only).
function buildProgressMessage(progress, lang) {
  const totalLessons = apps.reduce((sum, app) => sum + (app.lessons?.length || 0), 0);
  const doneIds = Object.keys(progress.lessons || {}).filter(
    (id) => progress.lessons[id]?.completed
  );
  const doneTitles = apps
    .flatMap((app) => app.lessons || [])
    .filter((lesson) => doneIds.includes(lesson.id))
    .map((lesson) => (typeof lesson.title === 'string' ? lesson.title : lesson.title?.[lang] || lesson.title?.en || ''));

  const stars = progress.stars || 0;
  const badges = (progress.badges || []).length;

  if (lang === 'ur') {
    return [
      'ہماری ڈیجیٹل مشق کی ترقی:',
      `⭐ کل ستارے: ${stars}`,
      `✅ مکمل اسباق: ${doneIds.length} / ${totalLessons}`,
      `🏅 حاصل کردہ بیجز: ${badges}`,
      doneTitles.length ? `📘 تازہ اسباق: ${doneTitles.slice(-3).join('، ')}` : '',
    ].filter(Boolean).join('\n');
  }

  return [
    'My digital practice progress:',
    `⭐ Total stars: ${stars}`,
    `✅ Lessons completed: ${doneIds.length} / ${totalLessons}`,
    `🏅 Badges earned: ${badges}`,
    doneTitles.length ? `📘 Recent lessons: ${doneTitles.slice(-3).join(', ')}` : '',
  ].filter(Boolean).join('\n');
}

function buildWhatsAppLink(message, phone) {
  const base = phone ? `https://wa.me/${phone}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(message)}`;
}

export default function FamilyShare({ progress }) {
  const { lang, familyPhone, setFamilyPhone } = useStore();
  const [phoneInput, setPhoneInput] = useState(familyPhone);
  const [showQR, setShowQR] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [saved, setSaved] = useState(false);

  const message = useMemo(() => buildProgressMessage(progress, lang), [progress, lang]);
  const link = useMemo(() => buildWhatsAppLink(message, familyPhone), [message, familyPhone]);

  // Regenerate the QR code whenever the shared link changes.
  useEffect(() => {
    if (!showQR) return;
    let cancelled = false;
    QRCode.toDataURL(link, { width: 220, margin: 1 })
      .then((url) => {
        if (!cancelled) setQrUrl(url);
      })
      .catch((err) => console.warn('Could not generate QR code', err));
    return () => {
      cancelled = true;
    };
  }, [showQR, link]);

  const isUr = lang === 'ur';

  const handleSave = () => {
    setFamilyPhone(phoneInput);
    setPhoneInput(phoneInput.replace(/\D/g, ''));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h3 className={`text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ${isUr ? 'font-urdu text-right' : ''}`}>
        {isUr ? 'خاندان کے ساتھ ترقی شیئر کریں' : 'Share progress with family'}
      </h3>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <label className="block text-xs text-slate-300">
          {isUr ? 'فیملی کا واٹس ایپ نمبر (اختیاری، ملک کوڈ کے ساتھ)' : 'Family WhatsApp number (optional, with country code)'}
          <div className="mt-1.5 flex gap-2">
            <input
              type="tel"
              inputMode="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="923001234567"
              className="flex-1 min-w-0 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
            >
              {saved ? (isUr ? 'محفوظ' : 'Saved') : isUr ? 'محفوظ کریں' : 'Save'}
            </button>
          </div>
        </label>

        <p className="text-[11px] text-slate-500 whitespace-pre-line">{message}</p>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isUr ? 'واٹس ایپ پر بھیجیں' : 'Send on WhatsApp'}</span>
          </a>
          <button
            type="button"
            onClick={() => setShowQR((v) => !v)}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition"
          >
            <QrCode className="w-4 h-4" />
            <span>
              {showQR
                ? isUr ? 'QR چھپائیں' : 'Hide QR code'
                : isUr ? 'QR کوڈ دکھائیں' : 'Show QR code'}
            </span>
          </button>
        </div>

        {showQR && (
          <div className="flex flex-col items-center gap-2 pt-1">
            {qrUrl ? (
              <img
                src={qrUrl}
                alt={isUr ? 'ترقی شیئر کرنے کا QR کوڈ' : 'QR code to share progress'}
                className="w-44 h-44 rounded-xl bg-white p-2"
              />
            ) : (
              <div className="w-44 h-44 rounded-xl bg-slate-800 animate-pulse" />
            )}
            <p className={`text-[11px] text-slate-400 text-center ${isUr ? 'font-urdu' : ''}`}>
              <Users className="w-3.5 h-3.5 inline mr-1" />
              {isUr
                ? 'فیملی ممبر یہ کوڈ اسکین کریں تو واٹس ایپ میں ترقی کا پیغام تیار ہوگا۔'
                : 'Family member scans this code to open WhatsApp with the progress message ready.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
