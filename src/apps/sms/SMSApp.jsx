import React, { useState } from 'react';
import { useT } from '../../core/i18n';
import {
  MessageSquare,
  Search,
  MoreVertical,
  ShieldAlert,
  ShieldCheck,
  ArrowLeft,
  Ban,
  Trash2,
} from 'lucide-react';

export default function SMSApp({ onExit }) {
  const t = useT();
  const [selectedThread, setSelectedThread] = useState(null);
  const [blocked, setBlocked] = useState(false);

  const threads = [
    {
      id: 'scam',
      sender: '+92-301-9988771',
      snippet: 'MUBARAK! Aapka Benazir Income Support Program me 50,000 ka inam nikla hai...',
      time: '10:12 AM',
      isScam: true,
      dataCoach: 'sms-thread-scam',
    },
    {
      id: 'telco',
      sender: 'Jazz Info',
      snippet: 'Apka daily internet package activate ho chuka hai.',
      time: 'Yesterday',
      isScam: false,
      dataCoach: 'sms-thread-telco',
    },
  ];

  return (
    <div className="h-full w-full flex flex-col bg-white text-slate-800 select-none overflow-hidden relative">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          {selectedThread && (
            <button
              type="button"
              onClick={() => setSelectedThread(null)}
              className="p-1 rounded-full hover:bg-slate-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <span className="font-bold text-lg text-slate-900">
            {t({ en: 'Messages', ur: 'پیغامات (SMS)' })}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-600" />
          <MoreVertical className="w-5 h-5 text-slate-600" />
        </div>
      </div>

      {/* Detail Message View */}
      {selectedThread ? (
        <div className="flex-1 flex flex-col justify-between bg-slate-50 p-4">
          <div className="space-y-4">
            {/* Sender badge */}
            <div className="flex items-center justify-center">
              <span className="bg-slate-200 text-slate-700 text-xs px-3 py-1 rounded-full font-mono">
                {selectedThread.sender}
              </span>
            </div>

            {/* Warning banner */}
            {selectedThread.isScam && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2 text-xs text-red-700 shadow-sm">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">
                    {t({ en: 'Suspicious Sender Warning', ur: 'مشکوک پیغام سے ہوشیار رہیں' })}
                  </span>
                  {t({
                    en: 'This sender is not verified. Never share passwords or tap unknown links.',
                    ur: 'یہ نمبر مصدقہ نہیں ہے۔ کبھی بھی اپنا کوڈ یا پاس ورڈ نہ دیں۔',
                  })}
                </div>
              </div>
            )}

            {/* Message Bubble */}
            <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200 max-w-[90%] text-sm leading-relaxed">
              <p>{selectedThread.snippet}</p>
              <div
                data-coach="sms-link-danger"
                className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-blue-600 text-xs font-mono break-all cursor-pointer hover:underline"
              >
                http://pakistan-bisp-claim-prize.fake-link.com
              </div>
              <span className="text-[10px] text-slate-400 block mt-1 text-right">
                {selectedThread.time}
              </span>
            </div>

            {blocked && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-bold flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t({ en: 'Sender Blocked & Reported', ur: 'نمبر بلاک کر دیا گیا ہے' })}
              </div>
            )}
          </div>

          {/* Action bottom options */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              data-coach="sms-btn-block"
              onClick={() => setBlocked(true)}
              className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition"
            >
              <Ban className="w-4 h-4" />
              <span>{t({ en: 'Block & Report Scam', ur: 'بلاک کریں اور رپورٹ کریں' })}</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedThread(null)}
              className="p-3 bg-slate-200 text-slate-700 rounded-xl"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* SMS List */
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {threads.map((item) => (
            <div
              key={item.id}
              data-coach={item.dataCoach}
              onClick={() => setSelectedThread(item)}
              className="p-4 flex items-start gap-3 hover:bg-slate-50 cursor-pointer active:bg-slate-100 transition"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-white shrink-0 ${
                  item.isScam ? 'bg-amber-500' : 'bg-blue-600'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900 truncate">
                    {item.sender}
                  </span>
                  <span className="text-[11px] text-slate-400">{item.time}</span>
                </div>
                <p className="text-xs text-slate-600 truncate">{item.snippet}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
