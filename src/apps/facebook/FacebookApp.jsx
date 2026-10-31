import React, { useState } from 'react';
import { useT } from '../../core/i18n';
import { COLORS } from './colors';
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Image,
  Search,
  Users,
  Bell,
  Menu,
  Home,
  X,
} from 'lucide-react';

export default function FacebookApp({ onExit }) {
  const t = useT();
  const [isComposing, setIsComposing] = useState(false);
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Tariq Mehmood',
      time: '3 hrs ago',
      avatar: '👴',
      content: 'Wishing all friends and family a peaceful Friday! Stay blessed.',
      likes: 18,
      liked: false,
    },
  ]);

  const handlePublish = () => {
    if (!postText.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: 'You (Practice Account)',
        time: 'Just now',
        avatar: '🧓',
        content: postText,
        likes: 1,
        liked: true,
      },
      ...posts,
    ]);
    setPostText('');
    setIsComposing(false);
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#F0F2F5] text-slate-800 select-none overflow-hidden relative">
      {/* Top App Bar */}
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
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer">
            <Bell className="w-4 h-4 text-slate-700" />
          </div>
        </div>
      </div>

      {/* Facebook Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 flex justify-around py-2 shrink-0 text-slate-600">
        <Home className="w-5 h-5 text-blue-600 border-b-2 border-blue-600 pb-0.5" />
        <Users className="w-5 h-5" />
        <Bell className="w-5 h-5" />
        <Menu className="w-5 h-5" />
      </div>

      {/* Compose Modal */}
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
              onClick={handlePublish}
              className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 active:scale-95 transition"
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
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={t({
                en: "What's on your mind?",
                ur: 'آپ کے ذہن میں کیا ہے؟',
              })}
              className="w-full flex-1 p-2 text-base outline-none resize-none placeholder-slate-400"
            />
          </div>
        </div>
      )}

      {/* Main Feed Content */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {/* Create Post Header Bar */}
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

        {/* Posts */}
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
              <span>👍 {p.likes}</span>
              <span>2 comments</span>
            </div>

            <div className="flex items-center justify-around border-t border-slate-100 pt-2 text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => {
                  p.liked = !p.liked;
                  p.likes += p.liked ? 1 : -1;
                  setPosts([...posts]);
                }}
                className={`flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100 ${
                  p.liked ? 'text-blue-600 font-bold' : ''
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{t({ en: 'Like', ur: 'لائک' })}</span>
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
  );
}
