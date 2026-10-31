import React, { useState, useEffect } from 'react';
import { useT } from '../../core/i18n';
import { useStore } from '../../core/store';
import { COLORS } from './colors';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Home,
  Search,
  PlusSquare,
  Clapperboard,
  User,
  ArrowLeft,
  X,
  Smile,
} from 'lucide-react';

export default function InstagramApp({ onExit }) {
  const t = useT();
  const { activeLesson } = useStore();

  // Screen flow: 'signup_1' -> 'signup_2' -> 'feed' -> 'dm_inbox' -> 'dm_chat'
  // When 'ig-signup' lesson is chosen, start on 'signup_1'. Otherwise (like & comment, DM, or open freely), start on 'feed'.
  const [screen, setScreen] = useState(
    activeLesson?.id === 'ig-signup' ? 'signup_1' : 'feed'
  );
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [bottomTab, setBottomTab] = useState('home');

  useEffect(() => {
    if (activeLesson?.id === 'ig-signup') {
      setScreen('signup_1');
    } else if (activeLesson) {
      setScreen('feed');
    }
  }, [activeLesson]);

  // Post interaction states
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [commentsList, setCommentsList] = useState([
    { id: 1, user: 'ammi_pakistan', text: 'Zabardast beta ❤️' },
  ]);

  // DM states
  const [selectedDm, setSelectedDm] = useState(null);
  const [dmInput, setDmInput] = useState('');
  const [dmList, setDmList] = useState([
    { id: 1, sender: 'them', text: 'Assalam o Alaikum! Kese hain?' },
  ]);

  const stories = [
    { id: 'your', name: 'Your story', avatar: '➕', isUser: true },
    { id: 'ammi', name: 'ammi_official', avatar: '👩', hasStory: true },
    { id: 'bilal', name: 'bilal_k', avatar: '🧔', hasStory: true },
    { id: 'nedian', name: 'ned_karachi', avatar: '🏛️', hasStory: true },
  ];

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    setCommentsList((prev) => [
      ...prev,
      { id: Date.now(), user: 'you_practice', text: commentInput },
    ]);
    setCommentInput('');
  };

  const handleDmSend = () => {
    if (!dmInput.trim()) return;
    setDmList((prev) => [
      ...prev,
      { id: Date.now(), sender: 'me', text: dmInput },
    ]);
    setDmInput('');

    setTimeout(() => {
      setDmList((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'them', text: 'JazakAllah! Bohot shukriya ❤️' },
      ]);
    }, 1200);
  };

  return (
    <div className="h-full w-full flex flex-col bg-white select-none overflow-hidden text-slate-800 relative">
      {/* Tiny Practice Badge */}
      <div className="absolute top-1 right-2 z-30 pointer-events-none bg-pink-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
        Practice Instagram
      </div>

      {/* Screen 1: Signup Phone / Email */}
      {screen === 'signup_1' && (
        <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto">
          <div className="pt-6 text-center space-y-4">
            <h1 className="font-serif italic font-black text-3xl tracking-wide bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
              Instagram
            </h1>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {t({ en: 'What’s your mobile number?', ur: 'آپ کا موبائل نمبر کیا ہے؟' })}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {t({
                  en: 'Enter your phone number to create a practice account.',
                  ur: 'پریکٹس اکاؤنٹ بنانے کے لیے فون نمبر لکھیں۔',
                })}
              </p>
            </div>

            <div className="pt-2 text-left">
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                {t({ en: 'Mobile Number', ur: 'موبائل نمبر' })}
              </label>
              <input
                type="tel"
                data-coach="ig-signup-phone-input"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                placeholder="0300 1234567"
                className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 text-sm font-semibold"
              />
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                data-coach="ig-signup-next-1"
                onClick={() => setScreen('signup_2')}
                disabled={phoneOrEmail.length < 5}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-sm shadow transition ${
                  phoneOrEmail.length >= 5
                    ? 'bg-[#0095F6] hover:bg-blue-600 active:scale-95'
                    : 'bg-blue-300 cursor-not-allowed'
                }`}
              >
                {t({ en: 'Next', ur: 'اگلا' })}
              </button>

              <button
                type="button"
                onClick={() => setScreen('feed')}
                className="w-full text-center text-xs text-blue-600 font-semibold py-1"
              >
                {t({ en: 'Skip to Feed (I already have an account)', ur: 'اکاؤنٹ موجود ہے (فیڈ پر جائیں)' })}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Signup Name & Password */}
      {screen === 'signup_2' && (
        <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto">
          <div className="pt-4 space-y-4">
            <button
              type="button"
              onClick={() => setScreen('signup_1')}
              className="p-1 rounded-full text-slate-600 hover:bg-slate-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {t({ en: 'Name and Password', ur: 'نام اور پاس ورڈ' })}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {t({ en: 'Add your name so family can find you.', ur: 'اپنا نام درج کریں تاکہ فیملی آپ کو پہچان سکے۔' })}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  {t({ en: 'Full Name', ur: 'پورا نام' })}
                </label>
                <input
                  type="text"
                  data-coach="ig-signup-name-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tariq Khan"
                  className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  {t({ en: 'Password', ur: 'پاس ورڈ' })}
                </label>
                <input
                  type="password"
                  data-coach="ig-signup-pass-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  data-coach="ig-signup-submit"
                  onClick={() => setScreen('feed')}
                  disabled={fullName.length < 2 || password.length < 4}
                  className={`w-full py-3.5 rounded-xl text-white font-bold text-sm shadow transition ${
                    fullName.length >= 2 && password.length >= 4
                      ? 'bg-[#0095F6] hover:bg-blue-600 active:scale-95'
                      : 'bg-blue-300 cursor-not-allowed'
                  }`}
                >
                  {t({ en: 'Complete Sign Up', ur: 'اکاؤنٹ بنائیں' })}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Home Feed */}
      {screen === 'feed' && (
        <div className="h-full w-full flex flex-col justify-between">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Bar */}
            <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-black text-2xl tracking-wide bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                Instagram
              </span>
              <div className="flex items-center gap-4">
                <Heart className="w-5 h-5 text-slate-800" />
                <button
                  type="button"
                  data-coach="ig-top-dm-btn"
                  onClick={() => setScreen('dm_inbox')}
                  className="p-1 hover:bg-slate-100 rounded-full"
                >
                  <Send className="w-5 h-5 text-slate-800" />
                </button>
              </div>
            </div>

            {/* Feed Scroll */}
            <div className="flex-1 overflow-y-auto">
              {/* Stories row */}
              <div className="flex items-center gap-3 px-3 py-2.5 border-b border-slate-100 overflow-x-auto no-scrollbar">
                {stories.map((s) => (
                  <div key={s.id} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
                    <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600">
                      <div className="p-0.5 bg-white rounded-full">
                        <div className="w-13 h-13 rounded-full bg-slate-100 flex items-center justify-center text-xl">
                          {s.avatar}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-600 truncate max-w-[55px]">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Feed Post */}
              <div className="border-b border-slate-100 pb-4">
                <div className="px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-base">
                      🧔
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">bilal_khan</span>
                      <span className="text-[10px] text-slate-500">Karachi, Pakistan</span>
                    </div>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-slate-500" />
                </div>

                {/* Post photo with double-tap like */}
                <div
                  onDoubleClick={() => setLiked(true)}
                  className="w-full h-72 bg-gradient-to-b from-blue-300 via-emerald-200 to-amber-100 flex flex-col items-center justify-center relative cursor-pointer"
                >
                  <span className="text-7xl mb-2 drop-shadow">🏖️✨</span>
                  <span className="text-slate-800 font-bold text-sm bg-white/70 backdrop-blur px-3 py-1 rounded-full">
                    Sunday Family Picnic
                  </span>
                </div>

                {/* Actions */}
                <div className="px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      data-coach="ig-post-heart-btn"
                      onClick={() => setLiked(!liked)}
                      className="active:scale-125 transition"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          liked ? 'fill-red-500 text-red-500' : 'text-slate-800'
                        }`}
                      />
                    </button>
                    <button
                      type="button"
                      data-coach="ig-post-comment-btn"
                      onClick={() => setShowComments(true)}
                    >
                      <MessageCircle className="w-6 h-6 text-slate-800" />
                    </button>
                    <Send className="w-6 h-6 text-slate-800" />
                  </div>
                  <Bookmark className="w-6 h-6 text-slate-800" />
                </div>

                <div className="px-3 text-xs space-y-1">
                  <span className="font-bold block text-slate-900">
                    {liked ? '85 likes' : '84 likes'}
                  </span>
                  <p>
                    <span className="font-bold mr-1">bilal_khan</span>
                    Great weekend with family at Hawkesbay! 🌊
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowComments(true)}
                    className="text-slate-400 text-[11px] block mt-1"
                  >
                    View all {commentsList.length} comments
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Bottom Sheet Drawer */}
          {showComments && (
            <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-sm flex flex-col justify-end">
              <div className={`bg-white rounded-t-3xl p-4 flex flex-col shadow-2xl ${activeLesson ? 'h-[92%] pb-60' : 'max-h-[75%]'}`}>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
                  <h3 className="font-bold text-sm">
                    {t({ en: 'Comments', ur: 'تبصرے' })}
                  </h3>
                  <X
                    className="w-5 h-5 cursor-pointer text-slate-500"
                    onClick={() => setShowComments(false)}
                  />
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 py-3 text-xs min-h-0">
                  {commentsList.map((c) => (
                    <div key={c.id} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        👤
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 mr-1">{c.user}</span>
                        <span className="text-slate-700">{c.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 shrink-0">
                  <input
                    type="text"
                    data-coach="ig-comment-input"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder={t({ en: 'Add a comment...', ur: 'کمنٹ لکھیں...' })}
                    className="flex-1 p-2 bg-slate-100 rounded-full text-xs outline-none px-3"
                  />
                  <button
                    type="button"
                    data-coach="ig-comment-post-btn"
                    onClick={handleCommentSubmit}
                    disabled={!commentInput.trim()}
                    className="text-xs font-bold text-blue-600 disabled:opacity-40"
                  >
                    {t({ en: 'Post', ur: 'پوسٹ' })}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation Bar */}
          <div className="h-12 w-full bg-white border-t border-slate-200 flex items-center justify-around px-4 text-slate-800 shrink-0">
            <Home className="w-6 h-6" />
            <Search className="w-6 h-6" />
            <PlusSquare className="w-6 h-6" />
            <Clapperboard className="w-6 h-6" />
            <User className="w-6 h-6" />
          </div>
        </div>
      )}

      {/* Screen 4: DM Inbox */}
      {screen === 'dm_inbox' && (
        <div className="h-full w-full flex flex-col bg-white">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setScreen('feed')}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="font-bold text-base text-slate-900">Direct Messages</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            <div
              data-coach="ig-dm-thread-bilal"
              onClick={() => {
                setSelectedDm('bilal_khan');
                setScreen('dm_chat');
              }}
              className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50 cursor-pointer active:bg-slate-100"
            >
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-2xl">
                🧔
              </div>
              <div className="flex-1">
                <span className="font-bold text-sm text-slate-900 block">bilal_khan</span>
                <span className="text-xs text-slate-500 truncate block">
                  Assalam o Alaikum! Kese hain?
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen 5: DM Chat */}
      {screen === 'dm_chat' && (
        <div className="h-full w-full flex flex-col bg-white justify-between">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setScreen('dm_inbox')}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">
                🧔
              </div>
              <span className="font-bold text-sm text-slate-900">bilal_khan</span>
            </div>
          </div>

          {/* DM Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 flex flex-col bg-slate-50">
            {dmList.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div
                  key={m.id}
                  className={`max-w-[75%] p-3 rounded-2xl text-xs ${
                    isMe
                      ? 'self-end bg-[#0095F6] text-white rounded-br-none'
                      : 'self-start bg-white text-slate-900 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              );
            })}
          </div>

          {/* DM Input Bar */}
          <div className={`p-3 border-t border-slate-200 flex items-center gap-2 bg-white shrink-0 ${activeLesson ? 'pb-60' : ''}`}>
            <input
              type="text"
              data-coach="ig-dm-input"
              value={dmInput}
              onChange={(e) => setDmInput(e.target.value)}
              placeholder={t({ en: 'Message...', ur: 'پیغام...' })}
              className="flex-1 p-2 bg-slate-100 rounded-full text-xs outline-none px-4"
            />
            <button
              type="button"
              data-coach="ig-dm-send-btn"
              onClick={handleDmSend}
              disabled={!dmInput.trim()}
              className="text-xs font-bold text-blue-600 disabled:opacity-40 px-2"
            >
              {t({ en: 'Send', ur: 'بھیجیں' })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
