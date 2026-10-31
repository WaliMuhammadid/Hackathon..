import React, { useState } from 'react';
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
} from 'lucide-react';

export default function WhatsAppApp({ onExit }) {
  const t = useT();
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'them',
      text: { en: 'Beta, call me when free.', ur: 'بیٹا، جب فری ہو کال کرنا۔' },
      time: '11:45 AM',
    },
  ]);
  const [voiceNoteSent, setVoiceNoteSent] = useState(false);

  const chats = [
    {
      id: 'ammi',
      name: { en: 'Ammi', ur: 'امی' },
      avatar: '👩',
      dataCoach: 'wa-chat-ammi',
      lastMsg: { en: 'Beta, call me when free.', ur: 'بیٹا، جب فری ہو کال کرنا۔' },
      time: '11:45 AM',
      unread: 1,
    },
    {
      id: 'abbu',
      name: { en: 'Abbu', ur: 'ابو' },
      avatar: '👨',
      dataCoach: 'wa-chat-abbu',
      lastMsg: { en: 'Did you reach safely?', ur: 'خیریت سے پہنچ گئے؟' },
      time: 'Yesterday',
      unread: 0,
    },
    {
      id: 'bilal',
      name: { en: 'Bilal Bhai', ur: 'بلال بھائی' },
      avatar: '🧔',
      dataCoach: 'wa-chat-bilal',
      lastMsg: { en: 'Let me know the plan.', ur: 'پروگرام کا بتاؤ۔' },
      time: 'Wednesday',
      unread: 0,
    },
  ];

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me',
        text: inputText,
        time: 'Just now',
      },
    ]);
    setInputText('');
  };

  const handleMicClick = () => {
    setVoiceNoteSent(true);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me',
        isAudio: true,
        duration: '0:05',
        time: 'Just now',
      },
    ]);
  };

  return (
    <div className="h-full w-full flex flex-col bg-slate-100 select-none overflow-hidden text-slate-800">
      {/* If Chat is open */}
      {selectedChat ? (
        <div className="h-full w-full flex flex-col">
          {/* Top Chat Bar */}
          <div
            className="px-3 py-2 flex items-center justify-between text-white shadow-md z-10 shrink-0"
            style={{ backgroundColor: COLORS.primary }}
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedChat(null)}
                className="p-1 hover:bg-black/10 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-xl">
                {selectedChat.avatar}
              </div>
              <div className="leading-tight">
                <div className="font-bold text-sm">{t(selectedChat.name)}</div>
                <div className="text-[11px] text-emerald-100">
                  {t({ en: 'online', ur: 'آن لائن' })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Video className="w-5 h-5 opacity-90 cursor-pointer" />
              <Phone className="w-4 h-4 opacity-90 cursor-pointer" />
              <MoreVertical className="w-5 h-5 opacity-90" />
            </div>
          </div>

          {/* Chat Messages Area */}
          <div
            className="flex-1 p-3 overflow-y-auto space-y-2 flex flex-col"
            style={{ backgroundColor: COLORS.chatBg }}
          >
            <div className="self-center bg-white/70 backdrop-blur px-3 py-1 rounded-md text-[11px] text-slate-600 shadow-sm uppercase tracking-wide">
              {t({ en: 'TODAY', ur: 'آج' })}
            </div>

            {messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div
                  key={m.id}
                  className={`max-w-[78%] p-2.5 rounded-2xl shadow-sm text-sm ${
                    isMe
                      ? 'self-end bg-[#d9fdd3] text-slate-900 rounded-tr-none'
                      : 'self-start bg-white text-slate-900 rounded-tl-none'
                  }`}
                >
                  {m.isAudio ? (
                    <div className="flex items-center gap-2 w-44 py-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        ▶
                      </div>
                      <div className="h-1 flex-1 bg-slate-300 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-emerald-600" />
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
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="p-2 bg-slate-200/90 flex items-center gap-2 shrink-0">
            <div className="flex-1 bg-white rounded-full px-3 py-2 flex items-center gap-2 shadow-sm">
              <Smile className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                data-coach="wa-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t({ en: 'Type a message...', ur: 'پیغام لکھیں...' })}
                className="w-full text-sm outline-none bg-transparent placeholder-slate-400"
              />
              <Camera className="w-5 h-5 text-slate-400 shrink-0" />
            </div>

            {inputText.trim() ? (
              <button
                type="button"
                data-coach="wa-send-btn"
                onClick={handleSend}
                className="w-11 h-11 rounded-full bg-[#00a884] text-white flex items-center justify-center shadow hover:opacity-90 active:scale-95 transition"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            ) : (
              <button
                type="button"
                data-coach="wa-mic-btn"
                onClick={handleMicClick}
                className="w-11 h-11 rounded-full bg-[#00a884] text-white flex items-center justify-center shadow hover:opacity-90 active:scale-95 transition"
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Chat List Screen */
        <div className="h-full w-full flex flex-col">
          {/* WhatsApp Header */}
          <div
            className="px-4 py-3 text-white shadow-md z-10 shrink-0"
            style={{ backgroundColor: COLORS.primary }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl font-bold tracking-wide">
                {t({ en: 'WhatsApp', ur: 'واٹس ایپ' })}
              </span>
              <div className="flex items-center gap-4">
                <Camera className="w-5 h-5 opacity-90 cursor-pointer" />
                <Search className="w-5 h-5 opacity-90 cursor-pointer" />
                <MoreVertical className="w-5 h-5 opacity-90 cursor-pointer" />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-around text-xs font-semibold uppercase tracking-wider pt-1 border-t border-white/10">
              <span className="pb-1 border-b-2 border-white text-white">
                {t({ en: 'CHATS', ur: 'چیٹس' })}
              </span>
              <span className="pb-1 text-emerald-200">
                {t({ en: 'STATUS', ur: 'اسٹیٹس' })}
              </span>
              <span className="pb-1 text-emerald-200">
                {t({ en: 'CALLS', ur: 'کالز' })}
              </span>
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-200 bg-white">
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
      )}
    </div>
  );
}
