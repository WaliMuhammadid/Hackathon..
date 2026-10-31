import React, { useState } from 'react';
import { useT } from '../../core/i18n';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  X,
  Camera,
  Compass,
  User,
} from 'lucide-react';

export default function InstagramApp({ onExit }) {
  const t = useT();
  const [liked, setLiked] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  const stories = [
    { id: 'ammi', name: 'Ammi', avatar: '👩', dataCoach: 'ig-story-ammi', caption: 'Beautiful flowers in Karachi today 🌸' },
    { id: 'bilal', name: 'Bilal', avatar: '🧔', dataCoach: 'ig-story-bilal', caption: 'Chai at Quetta Alamgir hotel ☕' },
    { id: 'fatima', name: 'Fatima', avatar: '🧕', dataCoach: 'ig-story-fatima', caption: 'NED University exams done! 🎓' },
  ];

  return (
    <div className="h-full w-full flex flex-col bg-white text-slate-900 select-none overflow-hidden relative">
      {/* Top Header */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100 shrink-0">
        <span className="font-serif italic font-black text-xl tracking-wide bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
          Instagram
        </span>
        <div className="flex items-center gap-4">
          <Heart className="w-5 h-5 text-slate-800" />
          <Send className="w-5 h-5 text-slate-800" />
        </div>
      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="absolute inset-0 z-40 bg-black text-white flex flex-col justify-between p-4">
          {/* Story Progress Bar */}
          <div className="w-full bg-white/30 h-1 rounded-full overflow-hidden mb-2">
            <div className="bg-white h-full w-3/4 rounded-full" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeStory.avatar}</span>
              <span className="font-bold text-sm">{activeStory.name}</span>
              <span className="text-xs text-white/60">2h</span>
            </div>
            <button
              type="button"
              data-coach="ig-story-close"
              onClick={() => setActiveStory(null)}
              className="p-1 rounded-full bg-black/40 hover:bg-black/60"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Story Visual Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="w-60 h-72 rounded-3xl bg-gradient-to-tr from-pink-500 to-amber-400 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
              <span className="text-6xl mb-4">🌺</span>
              <p className="text-base font-semibold leading-relaxed">
                {activeStory.caption}
              </p>
            </div>
          </div>

          <div className="py-2 text-center text-xs text-white/70">
            {t({ en: 'Practice Story View', ur: 'پریکٹس اسٹوری' })}
          </div>
        </div>
      )}

      {/* Scrollable Feed */}
      <div className="flex-1 overflow-y-auto">
        {/* Horizontal Stories Row */}
        <div className="flex items-center gap-3 px-3 py-3 border-b border-slate-100 overflow-x-auto no-scrollbar">
          {stories.map((s) => (
            <div
              key={s.id}
              data-coach={s.dataCoach}
              onClick={() => setActiveStory(s)}
              className="flex flex-col items-center gap-1 cursor-pointer shrink-0 active:scale-95 transition"
            >
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600">
                <div className="p-0.5 bg-white rounded-full">
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl">
                    {s.avatar}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-700">{s.name}</span>
            </div>
          ))}
        </div>

        {/* Post Card */}
        <div className="border-b border-slate-100 pb-4">
          {/* Post Header */}
          <div className="px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-lg">
                🧔
              </div>
              <div className="leading-tight">
                <span className="font-bold text-xs text-slate-900">bilal_khan</span>
                <p className="text-[10px] text-slate-500">Clifton Beach, Karachi</p>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-slate-500" />
          </div>

          {/* Post Photo */}
          <div className="w-full h-72 bg-gradient-to-b from-blue-400 to-cyan-200 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-7xl mb-2 drop-shadow-md">🌊🏖️</div>
            <span className="text-white font-bold text-lg drop-shadow">
              Sunday with Family
            </span>
          </div>

          {/* Post Action Buttons */}
          <div className="px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                data-coach="ig-like-btn"
                onClick={() => setLiked(!liked)}
                className="active:scale-125 transition"
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    liked ? 'fill-red-500 text-red-500' : 'text-slate-800'
                  }`}
                />
              </button>
              <MessageCircle className="w-6 h-6 text-slate-800 cursor-pointer" />
              <Send className="w-6 h-6 text-slate-800 cursor-pointer" />
            </div>
            <Bookmark className="w-6 h-6 text-slate-800" />
          </div>

          {/* Likes & Caption */}
          <div className="px-3 text-xs space-y-1">
            <p className="font-bold text-slate-900">
              {liked ? '43 likes' : '42 likes'}
            </p>
            <p className="text-slate-800">
              <span className="font-bold mr-1">bilal_khan</span>
              Sunset at Sea View with Ammi and Abbu! 🌅
            </p>
            <p className="text-[11px] text-slate-400">
              {t({ en: 'View all 4 comments', ur: 'تمام 4 تبصرے دیکھیں' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
