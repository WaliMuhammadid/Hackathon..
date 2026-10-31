import React, { useState } from 'react';
import { useT } from '../../core/i18n';
import { COLORS } from './colors';
import {
  ThumbsUp,
  Heart,
  MessageSquare,
  Share2,
  Image,
  Search,
  Bell,
  Home,
  Tv,
  Store,
  Users,
  Menu,
  X,
  Send,
  ArrowLeft,
} from 'lucide-react';

export default function FacebookApp({ onExit }) {
  const t = useT();

  // Screen flow: 'login' -> 'feed' -> 'inbox'
  const [screen, setScreen] = useState('feed');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Status composer modal
  const [isComposing, setIsComposing] = useState(false);
  const [statusText, setStatusText] = useState('');

  // Posts list
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Tariq Mehmood',
      avatar: '👴',
      time: '2 hrs ago',
      content: 'Jummah Mubarak to all family and friends! Stay blessed. 🤲🌸',
      likes: 14,
      reaction: null,
      comments: ['Ameen Summa Ameen', 'Khair Mubarak Uncle!'],
    },
  ]);

  // Messages inbox
  const [messages, setMessages] = useState([
    { id: 1, from: 'Bilal Khan', preview: 'Uncle, kal aana hai dinner pe?', time: '3:15 PM' },
  ]);

  const handlePublishStatus = () => {
    if (!statusText.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: 'You (Practice Account)',
        avatar: '🧓',
        time: 'Just now',
        content: statusText,
        likes: 1,
        reaction: 'love',
        comments: [],
      },
      ...posts,
    ]);
    setStatusText('');
    setIsComposing(false);
  };

  const handleToggleReaction = (post) => {
    if (post.reaction) {
      post.reaction = null;
      post.likes -= 1;
    } else {
      post.reaction = 'love';
      post.likes += 1;
    }
    setPosts([...posts]);
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#F0F2F5] text-slate-800 select-none overflow-hidden relative">
      {/* Tiny Practice Badge */}
      <div className="absolute top-1 right-2 z-30 pointer-events-none bg-blue-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
        Practice Facebook
      </div>

      {/* Screen: Login */}
      {screen === 'login' && (
        <div className="flex-1 flex flex-col justify-between p-6 bg-white">
          <div className="pt-10 text-center space-y-4">
            <span
              className="font-black text-4xl tracking-tighter block"
              style={{ color: COLORS.primary }}
            >
              facebook
            </span>
            <p className="text-xs text-slate-500">
              {t({
                en: 'Log in to connect with friends and family.',
                ur: 'اپنے خاندان اور دوستوں سے جڑنے کے لیے لاگ ان کریں۔',
              })}
            </p>

            <div className="space-y-3 pt-4 text-left">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  {t({ en: 'Mobile Number or Email', ur: 'موبائل نمبر یا ای میل' })}
                </label>
                <input
                  type="text"
                  data-coach="fb-login-phone-input"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  {t({ en: 'Password', ur: 'پاس ورڈ' })}
                </label>
                <input
                  type="password"
                  data-coach="fb-login-pass-input"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pb-4">
            <button
              type="button"
              data-coach="fb-login-submit-btn"
              onClick={() => setScreen('feed')}
              disabled={loginPhone.length < 4 || loginPass.length < 4}
              className={`w-full py-3.5 rounded-xl text-white font-bold text-sm shadow transition ${
                loginPhone.length >= 4 && loginPass.length >= 4
                  ? 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                  : 'bg-blue-300 cursor-not-allowed'
              }`}
            >
              {t({ en: 'Log In', ur: 'لاگ ان کریں' })}
            </button>

            <button
              type="button"
              onClick={() => setScreen('feed')}
              className="w-full text-center text-xs text-blue-600 font-semibold"
            >
              {t({ en: 'Skip to Feed', ur: 'فیڈ پر جائیں' })}
            </button>
          </div>
        </div>
      )}

      {/* Screen: Home Feed */}
      {screen === 'feed' && (
        <div className="h-full w-full flex flex-col justify-between">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Facebook Header */}
            <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
              <span
                className="font-black text-2xl tracking-tighter"
                style={{ color: COLORS.primary }}
              >
                facebook
              </span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer">
                  <Search className="w-4 h-4 text-slate-700" />
                </div>
                <div
                  onClick={() => setScreen('inbox')}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer relative"
                >
                  <MessageSquare className="w-4 h-4 text-slate-700" />
                  <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1" />
                </div>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="bg-white border-b border-slate-200 flex justify-around py-2 shrink-0 text-slate-600 text-xs">
              <Home className="w-5 h-5 text-blue-600 border-b-2 border-blue-600 pb-0.5" />
              <Users className="w-5 h-5" />
              <Tv className="w-5 h-5" />
              <Store className="w-5 h-5" />
              <Bell className="w-5 h-5" />
              <Menu className="w-5 h-5" />
            </div>

            {/* Feed Scroll */}
            <div className="flex-1 overflow-y-auto space-y-2 p-2">
              {/* Status Box */}
              <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200/80">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🧓</span>
                  <div
                    data-coach="fb-post-box"
                    onClick={() => setIsComposing(true)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200/70 rounded-full px-4 py-2 text-xs text-slate-500 cursor-pointer transition"
                  >
                    {t({ en: "What's on your mind?", ur: 'آپ کے ذہن میں کیا ہے؟' })}
                  </div>
                  <Image className="w-5 h-5 text-emerald-500 shrink-0" />
                </div>
              </div>

              {/* Feed Posts */}
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-3 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{p.avatar}</span>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{p.author}</h4>
                      <span className="text-[10px] text-slate-400">{p.time}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed">{p.content}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
                    <span className="flex items-center gap-1">
                      {p.reaction === 'love' ? '❤️' : '👍'} {p.likes}
                    </span>
                    <span>{p.comments.length} comments</span>
                  </div>

                  {/* Reaction buttons bar */}
                  <div className="flex items-center justify-around border-t border-slate-100 pt-2 text-xs font-semibold text-slate-600">
                    <button
                      type="button"
                      data-coach={p.id === 1 ? 'fb-btn-like-1' : undefined}
                      onClick={() => handleToggleReaction(p)}
                      className={`flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100 ${
                        p.reaction === 'love'
                          ? 'text-red-600 font-bold'
                          : p.reaction === 'like'
                          ? 'text-blue-600 font-bold'
                          : ''
                      }`}
                    >
                      {p.reaction === 'love' ? (
                        <Heart className="w-4 h-4 fill-red-600 text-red-600" />
                      ) : (
                        <ThumbsUp className="w-4 h-4" />
                      )}
                      <span>
                        {p.reaction === 'love'
                          ? t({ en: 'Love', ur: 'پیار' })
                          : t({ en: 'Like', ur: 'لائک' })}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{t({ en: 'Comment', ur: 'تبصرہ' })}</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{t({ en: 'Share', ur: 'شیئر' })}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Screen: Status Composer Modal */}
      {isComposing && (
        <div className="absolute inset-0 z-40 bg-white flex flex-col">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsComposing(false)}
              className="p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>
            <span className="font-bold text-sm">
              {t({ en: 'Create Post', ur: 'پوسٹ بنائیں' })}
            </span>
            <button
              type="button"
              data-coach="fb-publish-btn"
              onClick={handlePublishStatus}
              disabled={statusText.length < 2}
              className={`px-4 py-1.5 rounded-lg text-white font-bold text-xs shadow transition ${
                statusText.length >= 2
                  ? 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                  : 'bg-blue-300 cursor-not-allowed'
              }`}
            >
              {t({ en: 'POST', ur: 'پوسٹ کریں' })}
            </button>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🧓</span>
              <div>
                <span className="font-bold text-xs text-slate-900">
                  {t({ en: 'Your Name', ur: 'آپ کا نام' })}
                </span>
                <div className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 w-fit">
                  👥 {t({ en: 'Friends only', ur: 'صرف دوست' })}
                </div>
              </div>
            </div>

            <textarea
              data-coach="fb-input-status"
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
              placeholder={t({
                en: "What's on your mind?",
                ur: 'آپ کے ذہن میں کیا ہے؟',
              })}
              className="w-full flex-1 p-2 text-base outline-none resize-none placeholder-slate-400"
            />
          </div>
        </div>
      )}

      {/* Screen: Messages Inbox */}
      {screen === 'inbox' && (
        <div className="h-full w-full flex flex-col bg-white">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setScreen('feed')}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="font-bold text-base text-slate-900">Messenger</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {messages.map((m) => (
              <div
                key={m.id}
                className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                  🧔
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-xs text-slate-900">{m.from}</span>
                    <span className="text-[10px] text-slate-400">{m.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{m.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
