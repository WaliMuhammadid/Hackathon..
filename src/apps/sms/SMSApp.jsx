import React, { useState } from 'react';
import { useT } from '../../core/i18n';
import { COLORS } from './colors';
import {
  MessageSquare,
  Search,
  MoreVertical,
  ShieldAlert,
  ShieldCheck,
  ArrowLeft,
  Ban,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Sparkles,
  PhoneCall,
  ExternalLink,
} from 'lucide-react';

export default function SMSApp({ onExit }) {
  const t = useT();

  // Screen modes: 'inbox' | 'detail' | 'quiz' | 'rules'
  const [screen, setScreen] = useState('inbox');
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [showAnalysisSheet, setShowAnalysisSheet] = useState(false);
  const [userVote, setUserVote] = useState(null); // 'scam' | 'safe'
  const [blockedSenders, setBlockedSenders] = useState([]);

  // Quiz Mode State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // 8 Seed Messages in Pakistani context
  const messagesSeed = [
    {
      id: 'bisp',
      sender: '+92 301 9821034',
      senderName: 'Unknown Mobile Number',
      time: '10:14 AM',
      unread: true,
      isScam: true,
      dataCoach: 'sms-thread-bisp',
      text: 'MUBARAK HO! Aapka Benazir Kafalat Program me 50,000 ka inam nikla hai. Abhi clik kare aur raqam wasool karein: http://bisp-pkr-claim.xyz/verify',
      redFlags: [
        'Personal unknown mobile number (+92-301...) instead of official government shortcode.',
        'Urgent too-good-to-be-true free money claim.',
        'Suspicious, unverified link (.xyz domain).',
        'Spelling mistakes ("clik").',
      ],
      correctAction: 'Do NOT tap the link. Never provide CNIC or OTP. Block and report.',
    },
    {
      id: 'bankblock',
      sender: '+92 345 8192039',
      senderName: 'Alert Notice',
      time: 'Yesterday',
      unread: true,
      isScam: true,
      dataCoach: 'sms-thread-bankblock',
      text: 'ATTENTION: Your Bank ATM debit card and account have been BLOCKED due to security update. Call 0345-8192039 immediately or login: http://yourbank-reactivate.online',
      redFlags: [
        'Threatens immediate block to create panic and urgency.',
        'Asks you to call a private mobile number or click non-bank domain.',
        'Real banks NEVER threaten or unblock accounts via random SMS links.',
      ],
      correctAction: 'Hang up and call the phone number printed directly on the back of your physical ATM card.',
    },
    {
      id: 'courier',
      sender: '+92 321 4455667',
      senderName: 'Courier Delivery Help',
      time: 'Wednesday',
      unread: false,
      isScam: true,
      dataCoach: 'sms-thread-courier',
      text: 'Your parcel could not be delivered due to wrong house address. Pay PKR 150 redelivery fee here to release package: http://tcs-leopard-pay.fake.com',
      redFlags: [
        'Asks for card/fee payment on an unverified link.',
        'Sender is an ordinary mobile SIM number.',
        'Vague parcel details without tracking number.',
      ],
      correctAction: 'Ignore link. Check your official order on the store app where you placed the purchase.',
    },
    {
      id: 'officer_otp',
      sender: '+92 312 9012345',
      senderName: 'SBP Verification Officer',
      time: '28 Oct',
      unread: false,
      isScam: true,
      text: 'Dear customer, State Bank officer Tariq here. A suspicious transfer occurred on your account. Share the 6-digit OTP sent to your phone immediately to reverse it.',
      redFlags: [
        'State Bank of Pakistan never contacts individual customers.',
        'No bank official will EVER ask for your OTP or password.',
      ],
      correctAction: 'Never disclose OTP to anyone. Block sender immediately.',
    },
    {
      id: 'family_trouble',
      sender: '+92 333 7788990',
      senderName: 'Unknown Sender',
      time: '24 Oct',
      unread: false,
      isScam: true,
      text: 'Ammi/Abbu, mera phone chori ho gaya hai aur hospital me emergency hai. Iss number pe foran 5,000 EasyPaisa karein.',
      redFlags: [
        'Impression of urgent medical crisis from unfamiliar number.',
        'Requests immediate untraceable money transfer.',
      ],
      correctAction: 'Stay calm. Call your child or family member directly on their known regular phone number first.',
    },
    // Legit Messages
    {
      id: 'legit_otp',
      sender: '8222 (Meezan Bank)',
      senderName: 'Meezan Bank Verified',
      time: 'Today, 2:10 PM',
      unread: false,
      isScam: false,
      text: '8222: Your OTP for Funds Transfer of PKR 1,000 to Bilal Bhai is 482910. Valid for 5 mins. NEVER share this OTP with anyone, including bank staff.',
      redFlags: [],
      correctAction: 'Legitimate transaction alert. Use only inside the official banking app; do not send or read aloud to anyone.',
    },
    {
      id: 'legit_daraz',
      sender: 'Daraz Alert',
      senderName: 'Daraz Verified',
      time: 'Yesterday',
      unread: false,
      isScam: false,
      text: 'Your order #PK-981240 has been handed over to rider Tariq. Expected delivery today by 5:00 PM. No advance online payment required for COD.',
      redFlags: [],
      correctAction: 'Safe informational order update. Verified sender header.',
    },
    {
      id: 'legit_jazz',
      sender: 'Jazz Info',
      senderName: 'Telecom Operator',
      time: '22 Oct',
      unread: false,
      isScam: false,
      text: 'Muaziz Sarif, apka weekly all-in-one super bundle kamyabi se lag chuka hai. Status check karne ke liye *111# dial karein.',
      redFlags: [],
      correctAction: 'Legitimate telecom status update via official USSD menu.',
    },
  ];

  const handleOpenDetail = (msg) => {
    setSelectedMsg(msg);
    setUserVote(null);
    setShowAnalysisSheet(false);
    setScreen('detail');
  };

  const handleVote = (vote) => {
    setUserVote(vote);
    setShowAnalysisSheet(true);
  };

  const handleBlockSender = (sender) => {
    if (!blockedSenders.includes(sender)) {
      setBlockedSenders([...blockedSenders, sender]);
    }
  };

  // 3 Golden Rules Card
  const GoldenRulesCard = () => (
    <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl p-4 text-xs space-y-2.5">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <h4 className="font-bold text-amber-900 text-sm">
          {t({ en: '3 Golden Rules for Phone Safety', ur: 'فون کے تحفظ کے 3 سنہری اصول' })}
        </h4>
      </div>
      <div className="space-y-1.5 text-slate-700">
        <div className="flex items-start gap-2">
          <span className="font-black text-amber-600">1.</span>
          <p><strong>{t({ en: 'Never share OTP or PIN:', ur: 'او ٹی پی یا پن کبھی نہ بتائیں:' })}</strong> {t({ en: 'Real banks will never ask you for secret codes.', ur: 'اصلی بینک کبھی بھی آپ سے خفیہ کوڈ نہیں مانگتا۔' })}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-black text-amber-600">2.</span>
          <p><strong>{t({ en: 'Never tap unknown links:', ur: 'نامعلوم لنکس پر کلک نہ کریں:' })}</strong> {t({ en: 'Links can steal passwords or install harmful apps.', ur: 'لنک پر کلک کرنے سے موبائل ہیک ہو سکتا ہے۔' })}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-black text-amber-600">3.</span>
          <p><strong>{t({ en: 'When in doubt, hang up:', ur: 'شک ہو تو فوراً کال کاٹ دیں:' })}</strong> {t({ en: 'Call the official number written on your ATM card yourself.', ur: 'بینک سے رابطہ کرنے کے لیے اے ٹی ایم کارڈ پر لکھا نمبر خود ملائیں۔' })}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col bg-white text-slate-800 select-none overflow-hidden relative">
      {/* Practice Badge */}
      <div className="absolute top-1 right-2 z-30 pointer-events-none bg-blue-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
        Practice SMS & Safety
      </div>

      {/* Screen 1: Inbox */}
      {screen === 'inbox' && (
        <div className="h-full w-full flex flex-col justify-between">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Google Messages Style Header */}
            <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow">
                  💬
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-tight">
                    {t({ en: 'Messages', ur: 'پیغامات (SMS)' })}
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    Spam & Fraud Protection Active
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setScreen('rules')}
                  className="px-2 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1 active:scale-95"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t({ en: 'Safety Rules', ur: 'حفاظتی اصول' })}</span>
                </button>
              </div>
            </div>

            {/* Quick Banner Alert */}
            <div className="bg-blue-50 px-4 py-2 border-b border-blue-100 flex items-center justify-between text-xs text-blue-900">
              <span className="flex items-center gap-1.5 font-semibold">
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                Tap any message to test if it's Scam or Safe!
              </span>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {messagesSeed.map((m) => {
                const isBlocked = blockedSenders.includes(m.sender);
                return (
                  <div
                    key={m.id}
                    data-coach={m.dataCoach}
                    onClick={() => handleOpenDetail(m)}
                    className="p-3.5 flex items-start gap-3 hover:bg-slate-50 cursor-pointer active:bg-slate-100 transition"
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm ${
                        m.isScam ? 'bg-amber-500' : 'bg-blue-600'
                      }`}
                    >
                      {m.isScam ? '⚠️' : '✉️'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {m.senderName}
                        </span>
                        <span className="text-[10px] text-slate-400">{m.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 truncate">{m.text}</p>
                      {isBlocked && (
                        <span className="text-[10px] text-red-600 font-bold block mt-0.5">
                          🚫 {t({ en: 'Blocked Sender', ur: 'بلاک شدہ' })}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Message Detail & Scam Shield Flow */}
      {screen === 'detail' && selectedMsg && (
        <div className="h-full w-full flex flex-col justify-between bg-slate-50">
          {/* Header */}
          <div className="px-3 py-3 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setScreen('inbox')}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <div>
                <span className="font-bold text-xs text-slate-900 block truncate max-w-[180px]">
                  {selectedMsg.senderName}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {selectedMsg.sender}
                </span>
              </div>
            </div>

            <button
              type="button"
              data-coach="sms-btn-block-sender"
              onClick={() => handleBlockSender(selectedMsg.sender)}
              className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>{t({ en: 'Block & Report', ur: 'بلاک کریں' })}</span>
            </button>
          </div>

          {/* Conversation Bubble Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="self-center text-center">
              <span className="bg-slate-200 text-slate-600 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                {selectedMsg.time}
              </span>
            </div>

            {/* Bubble */}
            <div
              className={`p-4 rounded-2xl shadow-sm border max-w-[92%] text-sm leading-relaxed ${
                selectedMsg.isScam
                  ? 'bg-amber-50/80 border-amber-200 text-slate-900'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <p>{selectedMsg.text}</p>

              {/* Danger Link Highlight */}
              {selectedMsg.isScam && selectedMsg.text.includes('http') && (
                <div
                  data-coach="sms-danger-link"
                  className="mt-3 p-2 bg-red-100/80 border border-red-300 rounded-lg text-red-700 font-mono text-xs break-all flex items-center gap-1.5 cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Suspicious Link: Tap Scam button below!</span>
                </div>
              )}
            </div>

            {/* Shield Evaluation Buttons (Big friendly buttons) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-700 block text-center">
                🛡️ {t({ en: 'What do you think of this message?', ur: 'کیا یہ میسج اصلی ہے یا فراڈ؟' })}
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  data-coach="sms-btn-vote-scam"
                  onClick={() => handleVote('scam')}
                  className={`py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow active:scale-95 transition ${
                    userVote === 'scam'
                      ? 'bg-red-600 text-white ring-2 ring-red-400'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  <XCircle className="w-5 h-5" />
                  <span>{t({ en: 'Scam (فراڈ)', ur: 'فراڈ (Scam)' })}</span>
                </button>

                <button
                  type="button"
                  data-coach="sms-btn-vote-safe"
                  onClick={() => handleVote('safe')}
                  className={`py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow active:scale-95 transition ${
                    userVote === 'safe'
                      ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t({ en: 'Safe (محفوظ)', ur: 'محفوظ (Safe)' })}</span>
                </button>
              </div>
            </div>

            {/* Explanation Breakdown Sheet */}
            {showAnalysisSheet && (
              <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    {userVote === (selectedMsg.isScam ? 'scam' : 'safe') ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    )}
                    <span className="font-bold text-sm">
                      {userVote === (selectedMsg.isScam ? 'scam' : 'safe')
                        ? t({ en: 'CORRECT! Good catch!', ur: 'شاباش! بالکل درست جواب!' })
                        : t({ en: 'Careful! Notice the red flags:', ur: 'دھیان دیں! اس میں خطرات ہیں:' })}
                    </span>
                  </div>
                </div>

                {selectedMsg.redFlags.length > 0 && (
                  <div className="space-y-1.5 text-xs">
                    <span className="font-bold text-amber-300 block">
                      🚩 {t({ en: 'Identified Red Flags:', ur: 'میسج میں موجود خطرات:' })}
                    </span>
                    {selectedMsg.redFlags.map((flag, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-slate-300">
                        <span className="text-red-400 font-black">•</span>
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-white/10 p-2.5 rounded-xl text-xs text-emerald-200">
                  <span className="font-bold block mb-0.5">
                    ✅ {t({ en: 'Correct Action:', ur: 'صحیح قدم:' })}
                  </span>
                  <span>{selectedMsg.correctAction}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Screen 3: Safety Rules Modal */}
      {screen === 'rules' && (
        <div className="h-full w-full flex flex-col justify-between p-5 bg-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-lg text-slate-900">
                  {t({ en: 'Phone Safety Rules', ur: 'فون کے تحفظ کے اصول' })}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setScreen('inbox')}
                className="p-1 rounded-full text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <GoldenRulesCard />
          </div>

          <button
            type="button"
            onClick={() => setScreen('inbox')}
            className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl text-sm shadow"
          >
            {t({ en: 'Back to Messages', ur: 'پیغامات پر واپس جائیں' })}
          </button>
        </div>
      )}
    </div>
  );
}
