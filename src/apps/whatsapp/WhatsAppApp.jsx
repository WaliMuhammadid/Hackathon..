import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from './colors';
import { useT } from '../../core/i18n';
import {
  Search,
  MoreVertical,
  Camera,
  Send,
  Mic,
  ArrowLeft,
  Phone,
  Video,
  Smile,
  CheckCheck,
  Paperclip,
  Image as ImageIcon,
  MessageSquare,
  Radio,
  Users,
  Plus,
  PhoneOff,
  MicOff,
  VideoOff,
  X,
} from 'lucide-react';

export default function WhatsAppApp({ onExit }) {
  const t = useT();
  const [activeTab, setActiveTab] = useState('chats'); // 'chats' | 'updates' | 'communities' | 'calls'
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [inVideoCall, setInVideoCall] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'them',
      text: { en: 'Beta, call me when free.', ur: 'بیٹا، جب فری ہو کال کرنا۔' },
      time: '11:45 AM',
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, inVideoCall]);

  // Voice note timer
  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const chats = [
    {
      id: 'ammi',
      name: { en: 'Ammi', ur: 'امی' },
      avatar: '👩',
      dataCoach: 'wa-chat-ammi',
      lastMsg: { en: 'Beta, call me when free.', ur: 'بیٹا، جب فری ہو کال کرنا۔' },
      time: '11:45 AM',
      unread: 1,
      status: 'online',
    },
    {
      id: 'abbu',
      name: { en: 'Abbu', ur: 'ابو' },
      avatar: '👨',
      dataCoach: 'wa-chat-abbu',
      lastMsg: { en: 'Did you reach safely?', ur: 'خیریت سے پہنچ گئے؟' },
      time: 'Yesterday',
      unread: 0,
      status: 'offline',
    },
    {
      id: 'bilal',
      name: { en: 'Bilal Bhai', ur: 'بلال بھائی' },
      avatar: '🧔',
      dataCoach: 'wa-chat-bilal',
      lastMsg: { en: 'Let me know the plan.', ur: 'پروگرام کا بتاؤ۔' },
      time: 'Wednesday',
      unread: 0,
      status: 'offline',
    },
  ];

  const galleryPhotos = [
    { id: 1, title: 'Family at Park', emoji: '🌳👨‍👩‍👦' },
    { id: 2, title: 'Biryani Lunch', emoji: '🍛✨' },
    { id: 3, title: 'Chai Time', emoji: '☕🫖' },
  ];

  const handleSend = () => {
    if (!inputText.trim()) return;
    const textToSend = inputText;
    setInputText('');

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: textToSend,
      time: 'Just now',
    };
    setMessages((prev) => [...prev, newMsg]);

    // Simulated Auto-reply from Ammi after 1.5s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'them',
          text: {
            en: 'Jee beta, bohot achha laga aapka message dekh kar! ❤️',
            ur: 'جی بیٹا، بہت اچھا لگا آپ کا میسج دیکھ کر! ❤️',
          },
          time: 'Just now',
        },
      ]);
    }, 1500);
  };

  const handleSendPhoto = (photo) => {
    setSelectedPhoto(null);
    setShowGallery(false);
    setShowAttachMenu(false);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me',
        photoEmoji: photo.emoji,
        photoCaption: photo.title,
        time: 'Just now',
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'them',
          text: {
            en: 'MashaAllah, bohot pyari tasveer hai! 🌸',
            ur: 'ماشاءاللہ، بہت پیاری تصویر ہے! 🌸',
          },
          time: 'Just now',
        },
      ]);
    }, 1500);
  };

  const handleVoiceNoteClick = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me',
        isAudio: true,
        duration: '0:07',
        time: 'Just now',
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'them',
          text: {
            en: 'Walaikum Assalam, beta awaz bilkul saaf aayi! 🔊',
            ur: 'وعلیکم السلام، بیٹا آواز بالکل صاف آئی! 🔊',
          },
          time: 'Just now',
        },
      ]);
    }, 1500);
  };

  return (
    <div className="h-full w-full flex flex-col bg-white select-none overflow-hidden text-slate-800 relative">
      {/* Tiny Practice Badge */}
      <div className="absolute top-1 right-2 z-30 pointer-events-none bg-emerald-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
        Practice WhatsApp
      </div>

      {/* Video Call Overlay */}
      {inVideoCall && (
        <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col justify-between text-white p-4">
          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl">👩</span>
              <div>
                <h3 className="font-bold text-base">Ammi</h3>
                <span className="text-xs text-emerald-400">00:24</span>
              </div>
            </div>
            <div className="w-20 h-28 bg-slate-800 rounded-xl border-2 border-white/20 flex flex-col items-center justify-center">
              <span className="text-3xl">🧓</span>
              <span className="text-[10px] text-slate-400">You</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-emerald-900/40 border-4 border-emerald-500/50 flex items-center justify-center text-7xl animate-pulse">
              👩
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-around pb-6">
            <button className="p-3 bg-slate-800 rounded-full">
              <Mic className="w-6 h-6" />
            </button>
            <button className="p-3 bg-slate-800 rounded-full">
              <Video className="w-6 h-6" />
            </button>
            <button
              type="button"
              data-coach="wa-call-end-btn"
              onClick={() => setInVideoCall(false)}
              className="p-4 bg-red-600 rounded-full shadow-lg active:scale-95"
            >
              <PhoneOff className="w-7 h-7 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Chat Conversation View */}
      {selectedChat ? (
        <div className="h-full w-full flex flex-col">
          {/* WhatsApp Chat Header */}
          <div
            className="px-3 py-2 flex items-center justify-between text-white shadow-md z-10 shrink-0"
            style={{ backgroundColor: COLORS.primary }}
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedChat(null);
                  setShowAttachMenu(false);
                  setShowGallery(false);
                }}
                className="p-1 hover:bg-black/10 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-xl shrink-0">
                {selectedChat.avatar}
              </div>
              <div className="leading-tight">
                <div className="font-bold text-sm truncate max-w-[120px]">
                  {t(selectedChat.name)}
                </div>
                <div className="text-[10px] text-emerald-100">
                  {t({ en: 'online', ur: 'آن لائن' })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                data-coach="wa-call-video-btn"
                onClick={() => setInVideoCall(true)}
                className="p-1 hover:bg-black/10 rounded-full"
              >
                <Video className="w-5 h-5 text-white" />
              </button>
              <button
                type="button"
                onClick={() => setInVideoCall(true)}
                className="p-1 hover:bg-black/10 rounded-full"
              >
                <Phone className="w-4 h-4 text-white" />
              </button>
              <MoreVertical className="w-5 h-5 opacity-90" />
            </div>
          </div>

          {/* Messages Area with WhatsApp signature wallpaper */}
          <div
            className="flex-1 p-3 overflow-y-auto space-y-2 flex flex-col relative"
            style={{ backgroundColor: COLORS.chatBg }}
          >
            <div className="self-center bg-white/80 backdrop-blur px-3 py-0.5 rounded-lg text-[10px] font-semibold text-slate-600 shadow-sm uppercase tracking-wide my-1">
              {t({ en: 'TODAY', ur: 'آج' })}
            </div>

            {messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div
                  key={m.id}
                  className={`max-w-[78%] p-2.5 rounded-2xl shadow-sm text-sm ${
                    isMe
                      ? 'self-end bg-[#D9FDD3] text-slate-900 rounded-tr-none'
                      : 'self-start bg-white text-slate-900 rounded-tl-none'
                  }`}
                >
                  {/* Photo content */}
                  {m.photoEmoji && (
                    <div className="mb-1 rounded-xl bg-emerald-50 p-4 text-center">
                      <span className="text-5xl block mb-1">{m.photoEmoji}</span>
                      <span className="text-xs font-semibold text-slate-700">
                        {m.photoCaption}
                      </span>
                    </div>
                  )}

                  {/* Audio note content */}
                  {m.isAudio ? (
                    <div className="flex items-center gap-2 w-48 py-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                        ▶
                      </div>
                      <div className="h-1 flex-1 bg-slate-300 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-emerald-600" />
                      </div>
                      <span className="text-[10px] text-slate-500">{m.duration}</span>
                    </div>
                  ) : (
                    <div>{typeof m.text === 'object' ? t(m.text) : m.text}</div>
                  )}

                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-500">
                    <span>{m.time}</span>
                    {isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Fake Gallery Picker Modal */}
          {showGallery && (
            <div className="p-3 bg-slate-900 text-white border-t border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold">
                  {t({ en: 'Choose Photo to Send', ur: 'تصویر منتخب کریں' })}
                </span>
                <X
                  className="w-4 h-4 cursor-pointer text-slate-400"
                  onClick={() => setShowGallery(false)}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {galleryPhotos.map((p, idx) => (
                  <div
                    key={p.id}
                    data-coach={idx === 0 ? 'wa-photo-item-1' : undefined}
                    onClick={() => setSelectedPhoto(p)}
                    className={`p-2 rounded-xl flex flex-col items-center bg-slate-800 border cursor-pointer active:scale-95 transition ${
                      selectedPhoto?.id === p.id
                        ? 'border-emerald-400 ring-2 ring-emerald-400'
                        : 'border-slate-700'
                    }`}
                  >
                    <span className="text-3xl mb-1">{p.emoji}</span>
                    <span className="text-[10px] text-slate-300 truncate w-full text-center">
                      {p.title}
                    </span>
                  </div>
                ))}
              </div>

              {selectedPhoto && (
                <button
                  type="button"
                  data-coach="wa-send-photo-btn"
                  onClick={() => handleSendPhoto(selectedPhoto)}
                  className="mt-3 w-full py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 active:scale-95 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t({ en: 'Send Selected Photo', ur: 'تصویر بھیجیں' })}</span>
                </button>
              )}
            </div>
          )}

          {/* Attachment options popup */}
          {showAttachMenu && !showGallery && (
            <div className="p-3 bg-white border-t border-slate-200 flex justify-around shadow-lg">
              <button
                type="button"
                data-coach="wa-gallery-opt"
                onClick={() => {
                  setShowGallery(true);
                  setShowAttachMenu(false);
                }}
                className="flex flex-col items-center gap-1 text-slate-700 active:scale-95"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center shadow">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold">
                  {t({ en: 'Gallery', ur: 'گیلری' })}
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center gap-1 text-slate-700 opacity-60"
              >
                <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold">
                  {t({ en: 'Camera', ur: 'کیمرہ' })}
                </span>
              </button>
            </div>
          )}

          {/* Bottom Chat Input Bar */}
          <div className="p-2 bg-slate-200/90 flex items-center gap-2 shrink-0">
            <div className="flex-1 bg-white rounded-full px-3 py-2 flex items-center gap-2 shadow-sm">
              <Smile className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                data-coach="wa-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t({ en: 'Message', ur: 'پیغام' })}
                className="w-full text-sm outline-none bg-transparent placeholder-slate-400 text-slate-800"
              />
              <button
                type="button"
                data-coach="wa-attach-btn"
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className="p-1 text-slate-500 hover:text-slate-800"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <Camera className="w-5 h-5 text-slate-400 shrink-0" />
            </div>

            {inputText.trim() ? (
              <button
                type="button"
                data-coach="wa-send-btn"
                onClick={handleSend}
                className="w-11 h-11 rounded-full bg-[#00a884] text-white flex items-center justify-center shadow hover:opacity-90 active:scale-95 transition shrink-0"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            ) : (
              <button
                type="button"
                data-coach="wa-mic-btn"
                onClick={handleVoiceNoteClick}
                className="w-11 h-11 rounded-full bg-[#00a884] text-white flex items-center justify-center shadow hover:opacity-90 active:scale-95 transition shrink-0"
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* WhatsApp Main Chats Screen */
        <div className="h-full w-full flex flex-col justify-between">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* WhatsApp Green Top Header */}
            <div
              className="px-4 py-3 text-white shadow-md shrink-0"
              style={{ backgroundColor: COLORS.primary }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold tracking-wide">
                  {t({ en: 'WhatsApp', ur: 'واٹس ایپ' })}
                </span>
                <div className="flex items-center gap-4">
                  <Camera className="w-5 h-5 opacity-90 cursor-pointer" />
                  <Search className="w-5 h-5 opacity-90 cursor-pointer" />
                  <MoreVertical className="w-5 h-5 opacity-90 cursor-pointer" />
                </div>
              </div>

              {/* Chat Filters Row (All, Unread, Groups) */}
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full font-semibold">
                  {t({ en: 'All', ur: 'تمام' })}
                </span>
                <span className="bg-emerald-800/40 text-emerald-100 px-3 py-1 rounded-full font-semibold">
                  {t({ en: 'Unread', ur: 'نہ پڑھے گئے' })}
                </span>
                <span className="bg-emerald-800/40 text-emerald-100 px-3 py-1 rounded-full font-semibold">
                  {t({ en: 'Groups', ur: 'گروپس' })}
                </span>
              </div>
            </div>

            {/* Chats List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 bg-white">
              {chats.map((c) => (
                <div
                  key={c.id}
                  data-coach={c.dataCoach}
                  onClick={() => setSelectedChat(c)}
                  className="px-4 py-3.5 flex items-center gap-3 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-slate-900 text-base truncate">
                        {t(c.name)}
                      </span>
                      <span className="text-[11px] text-slate-500">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500 truncate">{t(c.lastMsg)}</p>
                      {c.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Action Button for New Chat */}
          <div className="absolute bottom-16 right-4 z-20">
            <button
              type="button"
              className="w-13 h-13 rounded-2xl bg-[#00a884] text-white flex items-center justify-center shadow-xl active:scale-95 transition"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom WhatsApp Navigation Bar (Chats, Updates, Communities, Calls) */}
          <div className="h-14 w-full bg-white border-t border-slate-200 flex items-center justify-around px-2 text-[10px] font-semibold text-slate-600 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('chats')}
              className={`flex flex-col items-center gap-1 ${
                activeTab === 'chats' ? 'text-[#008069] font-bold' : ''
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t({ en: 'Chats', ur: 'چیٹس' })}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('updates')}
              className={`flex flex-col items-center gap-1 ${
                activeTab === 'updates' ? 'text-[#008069] font-bold' : ''
              }`}
            >
              <Radio className="w-5 h-5" />
              <span>{t({ en: 'Updates', ur: 'اپ ڈیٹس' })}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('communities')}
              className={`flex flex-col items-center gap-1 ${
                activeTab === 'communities' ? 'text-[#008069] font-bold' : ''
              }`}
            >
              <Users className="w-5 h-5" />
              <span>{t({ en: 'Communities', ur: 'کمیونٹیز' })}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('calls')}
              className={`flex flex-col items-center gap-1 ${
                activeTab === 'calls' ? 'text-[#008069] font-bold' : ''
              }`}
            >
              <Phone className="w-5 h-5" />
              <span>{t({ en: 'Calls', ur: 'کالز' })}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
