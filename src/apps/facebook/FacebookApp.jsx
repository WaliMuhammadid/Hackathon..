import React, { useState, useEffect } from 'react';
import { useT } from '../../core/i18n';
import { useStore } from '../../core/store';
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
  Users,
  Menu,
  X,
  Send,
  ArrowLeft,
  LogOut,
  Eye,
  EyeOff,
  Smile,
  MoreHorizontal,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Clock,
  Settings,
  HelpCircle,
  Plus,
} from 'lucide-react';

const STORAGE_KEY = 'practice_fb_logged_in';

export default function FacebookApp({ onExit }) {
  const t = useT();
  const { activeLesson, stepIndex, setStepIndex, lang } = useStore();

  // Persistent login state
  const [_isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Screen flow: 'login' | 'feed' | 'inbox' | 'chat' | 'menu' | 'friends' | 'watch' | 'notifications'
  const getInitialScreen = () => {
    if (activeLesson?.id === 'fb-login') {
      return 'login';
    }
    if (activeLesson?.id === 'fb-react-post' || activeLesson?.id === 'fb-post-status') {
      return 'feed';
    }
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true' ? 'feed' : 'login';
    } catch {
      return 'login';
    }
  };

  const [screen, setScreen] = useState(getInitialScreen);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'friends' | 'watch' | 'notifications' | 'menu'

  // Login form state
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Status composer modal
  const [isComposing, setIsComposing] = useState(false);
  const [statusText, setStatusText] = useState('');

  // Comments drawer
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  // Toast alert
  const [toastMessage, setToastMessage] = useState(null);

  // Messenger active chat
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessageInput, setChatMessageInput] = useState('');

  // Synchronize screen with active coach lesson
  useEffect(() => {
    if (activeLesson?.id === 'fb-login') {
      setScreen('login');
      setIsComposing(false);
      setActiveCommentPostId(null);
    } else if (activeLesson?.id === 'fb-react-post') {
      setScreen('feed');
      setActiveTab('home');
      setIsComposing(false);
      setActiveCommentPostId(null);
    } else if (activeLesson?.id === 'fb-post-status') {
      setScreen('feed');
      setActiveTab('home');
      setActiveCommentPostId(null);
    }
  }, [activeLesson]);

  // Show a toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

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
      comments: [
        { id: 101, author: 'Sajida Begum', avatar: '👵', text: 'Khair Mubarak Bhai Jan!' },
        { id: 102, author: 'Bilal Khan', avatar: '🧔', text: 'Ameen Summa Ameen Uncle!' },
      ],
    },
    {
      id: 2,
      author: 'Fatima Zahra',
      avatar: '👩',
      time: '4 hrs ago',
      content: 'Baking fresh chocolate cake with grandmother today! 🍰✨',
      likes: 8,
      reaction: null,
      comments: [
        { id: 201, author: 'You', avatar: '🧓', text: 'Hamare liye bhi rakhna beta! 😋' },
      ],
    },
  ]);

  // Messages inbox
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'Bilal Khan',
      avatar: '🧔',
      preview: 'Uncle, kal aana hai dinner pe?',
      time: '3:15 PM',
      unread: true,
      history: [
        { from: 'them', text: 'Assalam-o-Alaikum Uncle, kaisay hain?' },
        { from: 'me', text: 'Walaikum Assalam beta, Alhamdullilah theek hoon.' },
        { from: 'them', text: 'Uncle, kal aana hai dinner pe?' },
      ],
    },
    {
      id: 2,
      from: 'Family Group (خاندان)',
      avatar: '👨‍👩‍👦',
      preview: 'Tariq: InshaAllah Sunday ko sab...',
      time: 'Yesterday',
      unread: false,
      history: [
        { from: 'them', text: 'Sunday ko family gathering rakhein?' },
        { from: 'them', text: 'InshaAllah Sunday ko sab aana!' },
      ],
    },
  ]);

  // Friends suggestions
  const [friendRequests, setFriendRequests] = useState([
    { id: 1, name: 'Ahmed Raza', avatar: '👨', mutual: '3 mutual friends' },
    { id: 2, name: 'Zainab Begum', avatar: '🧕', mutual: '7 mutual friends' },
  ]);

  // Handle Login submission
  const handleLoginSubmit = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {
      console.warn('Storage error', e);
    }

    setIsLoggedIn(true);
    setScreen('feed');
    setActiveTab('home');
    setLoginError('');
    showToast(t({ en: 'Logged in safely!', ur: 'کامیابی سے لاگ ان ہو گیا!' }));

    // Advance coach lesson if in fb-login
    if (activeLesson?.id === 'fb-login') {
      setStepIndex(3); // Info completion step
    }
  };

  // Quick autofill demo credentials
  const handleAutoFillDemo = () => {
    setLoginPhone('0300 1234567');
    setLoginPass('••••••••');
    // If in coach login lesson, advance to "Tap Log In"
    if (activeLesson?.id === 'fb-login') {
      setStepIndex(2);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Storage error', e);
    }
    setIsLoggedIn(false);
    setScreen('login');
    setActiveTab('home');
    setLoginPhone('');
    setLoginPass('');
    showToast(t({ en: 'Logged out successfully.', ur: 'آپ لاگ آؤٹ ہو چکے ہیں۔' }));
  };

  // Handle Status Publish
  const handlePublishStatus = () => {
    if (!statusText.trim()) return;
    const newPost = {
      id: Date.now(),
      author: 'You (Practice Account)',
      avatar: '🧓',
      time: 'Just now',
      content: statusText.trim(),
      likes: 1,
      reaction: 'love',
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setStatusText('');
    setIsComposing(false);
    showToast(t({ en: 'Status published!', ur: 'اسٹیٹس شائع ہو گیا!' }));

    // Advance coach lesson if in fb-post-status
    if (activeLesson?.id === 'fb-post-status') {
      setStepIndex(3); // info completion step
    }
  };

  // Status text input change with auto-coach step advancement
  const handleStatusTextChange = (text) => {
    setStatusText(text);
    if (activeLesson?.id === 'fb-post-status' && stepIndex === 1 && text.trim().length >= 2) {
      setStepIndex(2); // Move spotlight to POST button
    }
  };

  // Quick status suggestions
  const handleQuickStatusChip = (chipText) => {
    setStatusText(chipText);
    if (activeLesson?.id === 'fb-post-status') {
      setStepIndex(2); // Move spotlight to POST button
    }
  };

  // Reaction toggle
  const handleToggleReaction = (post) => {
    if (post.reaction) {
      post.reaction = null;
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.reaction = 'love';
      post.likes += 1;
    }
    setPosts([...posts]);

    // Advance coach lesson if in fb-react-post
    if (activeLesson?.id === 'fb-react-post' && stepIndex === 0) {
      setStepIndex(1); // info completion step
    }
  };

  // Add comment to a post
  const handleAddComment = (postId) => {
    if (!commentInput.trim()) return;
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            { id: Date.now(), author: 'You', avatar: '🧓', text: commentInput.trim() },
          ],
        };
      }
      return p;
    });
    setPosts(updated);
    setCommentInput('');
  };

  // Send message in chat
  const handleSendChatMessage = () => {
    if (!chatMessageInput.trim() || !activeChat) return;
    const newMsg = { from: 'me', text: chatMessageInput.trim() };
    const updatedHistory = [...activeChat.history, newMsg];
    const updatedChat = { ...activeChat, history: updatedHistory, preview: chatMessageInput.trim() };
    setActiveChat(updatedChat);
    setMessages(messages.map((m) => (m.id === activeChat.id ? updatedChat : m)));
    setChatMessageInput('');
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#F0F2F5] text-slate-800 select-none overflow-hidden relative font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="absolute top-12 inset-x-4 z-50 flex justify-center pointer-events-none animate-fadeIn">
          <div className="bg-slate-900/95 text-white px-4 py-2.5 rounded-full shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Tiny Practice Badge */}
      <div className="absolute top-1.5 right-2 z-30 pointer-events-none bg-blue-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
        Practice Facebook
      </div>

      {/* =========================================================================
          SCREEN: LOGIN
          ========================================================================= */}
      {screen === 'login' && (
        <div className="flex-1 flex flex-col justify-between p-6 bg-white overflow-y-auto">
          <div className="pt-8 text-center space-y-4 max-w-sm mx-auto w-full">
            <span
              className="font-black text-4xl tracking-tighter block select-none"
              style={{ color: COLORS.primary }}
            >
              facebook
            </span>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t({
                en: 'Log in to connect with your family and friends safely.',
                ur: 'اپنے خاندان اور دوستوں سے جڑنے کے لیے محفوظ لاگ ان کریں۔',
              })}
            </p>

            {/* Quick Demo Autofill Chip */}
            <div className="pt-1 flex justify-center">
              <button
                type="button"
                onClick={handleAutoFillDemo}
                className="px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {t({ en: 'Auto Fill Demo Account', ur: 'خودکار ڈیمو اکاؤنٹ بھریں' })}
                </span>
              </button>
            </div>

            <div className="space-y-3 pt-3 text-left">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t({ en: 'Mobile Number or Email', ur: 'موبائل نمبر یا ای میل' })}
                </label>
                <input
                  type="text"
                  data-coach="fb-login-phone-input"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  onFocus={() => {
                    if (activeLesson?.id === 'fb-login' && stepIndex === 0) {
                      // Already on step 0
                    }
                  }}
                  placeholder="0300 1234567"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:bg-white text-sm transition"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t({ en: 'Password', ur: 'پاس ورڈ' })}
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    data-coach="fb-login-pass-input"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    onFocus={() => {
                      if (activeLesson?.id === 'fb-login' && stepIndex === 0) {
                        setStepIndex(1); // Advance spotlight to password
                      }
                    }}
                    placeholder="••••••••"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:bg-white text-sm transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-red-500 font-semibold">{loginError}</p>
            )}
          </div>

          <div className="space-y-3 pb-4 max-w-sm mx-auto w-full pt-6">
            <button
              type="button"
              data-coach="fb-login-submit-btn"
              onClick={handleLoginSubmit}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md bg-blue-600 hover:bg-blue-700 active:scale-95 transition"
            >
              {t({ en: 'Log In', ur: 'لاگ ان کریں' })}
            </button>

            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.setItem(STORAGE_KEY, 'true');
                } catch {
                  // ignore
                }
                setIsLoggedIn(true);
                setScreen('feed');
              }}
              className="w-full text-center text-xs text-blue-600 font-semibold py-1 hover:underline"
            >
              {t({ en: 'Skip directly to Feed', ur: 'براہ راست فیڈ پر جائیں' })}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: FEED / HOME
          ========================================================================= */}
      {screen === 'feed' && (
        <div className="h-full w-full flex flex-col justify-between overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Facebook Header */}
            <div className="px-4 py-2 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
              <span
                className="font-black text-2xl tracking-tighter"
                style={{ color: COLORS.primary }}
              >
                facebook
              </span>

              <div className="flex items-center gap-2">
                {/* Search */}
                <div
                  onClick={() =>
                    showToast(
                      t({ en: 'Search practice simulated', ur: 'تلاش کی سہولت' })
                    )
                  }
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition"
                >
                  <Search className="w-4 h-4 text-slate-700" />
                </div>

                {/* Messenger Icon */}
                <div
                  onClick={() => setScreen('inbox')}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition relative"
                >
                  <MessageSquare className="w-4 h-4 text-slate-700" />
                  <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1" />
                </div>

                {/* Quick Menu / Profile trigger */}
                <div
                  onClick={() => {
                    setActiveTab('menu');
                    setScreen('menu');
                  }}
                  className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center cursor-pointer text-sm"
                  title="Menu"
                >
                  🧓
                </div>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="bg-white border-b border-slate-200 flex justify-around py-1.5 shrink-0 text-slate-600 text-xs">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('home');
                  setScreen('feed');
                }}
                className={`p-2 flex flex-col items-center relative ${
                  activeTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-500'
                }`}
              >
                <Home className="w-5 h-5" />
                {activeTab === 'home' && (
                  <span className="w-8 h-0.5 bg-blue-600 absolute bottom-0 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('friends');
                  setScreen('friends');
                }}
                className={`p-2 flex flex-col items-center relative ${
                  activeTab === 'friends' ? 'text-blue-600 font-bold' : 'text-slate-500'
                }`}
              >
                <Users className="w-5 h-5" />
                {activeTab === 'friends' && (
                  <span className="w-8 h-0.5 bg-blue-600 absolute bottom-0 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('watch');
                  setScreen('watch');
                }}
                className={`p-2 flex flex-col items-center relative ${
                  activeTab === 'watch' ? 'text-blue-600 font-bold' : 'text-slate-500'
                }`}
              >
                <Tv className="w-5 h-5" />
                {activeTab === 'watch' && (
                  <span className="w-8 h-0.5 bg-blue-600 absolute bottom-0 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('notifications');
                  setScreen('notifications');
                }}
                className={`p-2 flex flex-col items-center relative ${
                  activeTab === 'notifications'
                    ? 'text-blue-600 font-bold'
                    : 'text-slate-500'
                }`}
              >
                <Bell className="w-5 h-5" />
                {activeTab === 'notifications' && (
                  <span className="w-8 h-0.5 bg-blue-600 absolute bottom-0 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('menu');
                  setScreen('menu');
                }}
                className={`p-2 flex flex-col items-center relative ${
                  activeTab === 'menu' ? 'text-blue-600 font-bold' : 'text-slate-500'
                }`}
              >
                <Menu className="w-5 h-5" />
                {activeTab === 'menu' && (
                  <span className="w-8 h-0.5 bg-blue-600 absolute bottom-0 rounded-full" />
                )}
              </button>
            </div>

            {/* Feed Scrollable Area */}
            <div className="flex-1 overflow-y-auto space-y-2 p-2">
              {/* Status Composer Trigger Box */}
              <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200/80">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🧓</span>
                  <div
                    data-coach="fb-post-box"
                    onClick={() => {
                      setIsComposing(true);
                      if (activeLesson?.id === 'fb-post-status' && stepIndex === 0) {
                        setStepIndex(1); // Advance spotlight to input textarea
                      }
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200/70 rounded-full px-4 py-2.5 text-xs text-slate-500 cursor-pointer transition border border-slate-200/50"
                  >
                    {t({ en: "What's on your mind?", ur: 'آپ کے ذہن میں کیا ہے؟' })}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsComposing(true);
                      if (activeLesson?.id === 'fb-post-status' && stepIndex === 0) {
                        setStepIndex(1);
                      }
                    }}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-emerald-600"
                  >
                    <Image className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stories Tray */}
              <div className="bg-white rounded-xl p-2.5 shadow-sm border border-slate-200/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
                {/* Create story card */}
                <div
                  onClick={() =>
                    showToast(
                      t({ en: 'Story feature simulated', ur: 'اسٹوری فیچر' })
                    )
                  }
                  className="w-20 h-28 rounded-xl bg-slate-100 border border-slate-200 flex flex-col justify-between p-1.5 shrink-0 cursor-pointer hover:bg-slate-200/70 transition"
                >
                  <div className="text-center text-xl pt-1">🧓</div>
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center -mt-2.5 shadow">
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 mt-1">
                      {t({ en: 'Add Story', ur: 'اسٹوری' })}
                    </span>
                  </div>
                </div>

                {/* Tariq Mehmood Story */}
                <div
                  onClick={() =>
                    showToast(
                      t({ en: 'Viewing Tariq Uncle story', ur: 'طارق انکل کی اسٹوری' })
                    )
                  }
                  className="w-20 h-28 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 p-1.5 shrink-0 flex flex-col justify-between text-white cursor-pointer shadow-sm hover:opacity-95 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-sm">
                    👴
                  </div>
                  <span className="text-[10px] font-bold leading-tight drop-shadow">
                    Tariq Uncle
                  </span>
                </div>

                {/* Bilal Khan Story */}
                <div
                  onClick={() =>
                    showToast(
                      t({ en: 'Viewing Bilal Khan story', ur: 'بلال خان کی اسٹوری' })
                    )
                  }
                  className="w-20 h-28 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-1.5 shrink-0 flex flex-col justify-between text-white cursor-pointer shadow-sm hover:opacity-95 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-sm">
                    🧔
                  </div>
                  <span className="text-[10px] font-bold leading-tight drop-shadow">
                    Bilal Khan
                  </span>
                </div>

                {/* Fatima Bibi Story */}
                <div
                  onClick={() =>
                    showToast(
                      t({ en: 'Viewing Fatima story', ur: 'فاطمہ کی اسٹوری' })
                    )
                  }
                  className="w-20 h-28 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 p-1.5 shrink-0 flex flex-col justify-between text-white cursor-pointer shadow-sm hover:opacity-95 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-sm">
                    👩
                  </div>
                  <span className="text-[10px] font-bold leading-tight drop-shadow">
                    Fatima
                  </span>
                </div>
              </div>

              {/* Feed Posts */}
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-3 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{p.avatar}</span>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{p.author}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <span>{p.time}</span>
                          <span>•</span>
                          <span>👥 {t({ en: 'Friends', ur: 'دوست' })}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        showToast(t({ en: 'Post options', ur: 'پوسٹ کے اختیارات' }))
                      }
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <p
                    className={`text-xs text-slate-800 leading-relaxed ${
                      lang === 'ur' ? 'font-urdu text-right text-sm' : ''
                    }`}
                  >
                    {p.content}
                  </p>

                  {/* Likes and comments counter */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
                    <span className="flex items-center gap-1 font-medium">
                      {p.reaction === 'love' ? (
                        <span className="text-red-500 flex items-center gap-0.5">
                          ❤️ {p.likes}
                        </span>
                      ) : (
                        <span className="text-blue-600 flex items-center gap-0.5">
                          👍 {p.likes}
                        </span>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveCommentPostId(
                          activeCommentPostId === p.id ? null : p.id
                        )
                      }
                      className="hover:underline"
                    >
                      {p.comments.length}{' '}
                      {t({ en: 'comments', ur: 'تبصرے' })}
                    </button>
                  </div>

                  {/* Reaction buttons bar */}
                  <div className="flex items-center justify-around border-t border-slate-100 pt-1.5 text-xs font-semibold text-slate-600">
                    <button
                      type="button"
                      data-coach={p.id === 1 ? 'fb-btn-like-1' : undefined}
                      onClick={() => handleToggleReaction(p)}
                      className={`flex-1 py-1.5 flex items-center justify-center gap-1.5 rounded-lg hover:bg-slate-100 transition active:scale-95 ${
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
                          ? t({ en: 'Love', ur: 'محبت' })
                          : t({ en: 'Like', ur: 'لائک' })}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveCommentPostId(
                          activeCommentPostId === p.id ? null : p.id
                        )
                      }
                      className="flex-1 py-1.5 flex items-center justify-center gap-1.5 rounded-lg hover:bg-slate-100 transition text-slate-600"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{t({ en: 'Comment', ur: 'تبصرہ' })}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        showToast(
                          t({
                            en: 'Post shared to your feed!',
                            ur: 'پوسٹ آپ کی فیڈ پر شیئر ہو گئی!',
                          })
                        )
                      }
                      className="flex-1 py-1.5 flex items-center justify-center gap-1.5 rounded-lg hover:bg-slate-100 transition text-slate-600"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{t({ en: 'Share', ur: 'شیئر' })}</span>
                    </button>
                  </div>

                  {/* Inline Comments Section if active */}
                  {activeCommentPostId === p.id && (
                    <div className="border-t border-slate-100 pt-2 space-y-2">
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {p.comments.map((c) => (
                          <div
                            key={c.id}
                            className="bg-slate-50 p-2 rounded-xl text-xs flex items-start gap-2"
                          >
                            <span className="text-sm shrink-0">{c.avatar}</span>
                            <div className="flex-1">
                              <span className="font-bold text-slate-900 block text-[11px]">
                                {c.author}
                              </span>
                              <p className="text-slate-700">{c.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Comment Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(p.id);
                          }}
                          placeholder={t({
                            en: 'Write a comment...',
                            ur: 'تبصرہ لکھیں...',
                          })}
                          className="flex-1 p-2 bg-slate-100 rounded-full text-xs outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddComment(p.id)}
                          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: STATUS COMPOSER MODAL
          ========================================================================= */}
      {isComposing && (
        <div className="absolute inset-0 z-40 bg-white flex flex-col animate-slideUp">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setIsComposing(false);
                if (activeLesson?.id === 'fb-post-status' && stepIndex > 0) {
                  setStepIndex(0);
                }
              }}
              className="p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>
            <span className="font-bold text-sm text-slate-800">
              {t({ en: 'Create Post', ur: 'پوسٹ بنائیں' })}
            </span>
            <button
              type="button"
              data-coach="fb-publish-btn"
              onClick={handlePublishStatus}
              disabled={statusText.trim().length < 2}
              className={`px-4 py-1.5 rounded-lg text-white font-bold text-xs shadow transition ${
                statusText.trim().length >= 2
                  ? 'bg-blue-600 hover:bg-blue-700 active:scale-95 cursor-pointer'
                  : 'bg-blue-300 cursor-not-allowed'
              }`}
            >
              {t({ en: 'POST', ur: 'پوسٹ کریں' })}
            </button>
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">🧓</span>
                <div>
                  <span className="font-bold text-xs text-slate-900 block">
                    {t({ en: 'You (Practice Account)', ur: 'آپ کا پریکٹس اکاؤنٹ' })}
                  </span>
                  <div className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 flex items-center gap-1 w-fit mt-0.5">
                    <span>👥</span>
                    <span>{t({ en: 'Friends only', ur: 'صرف دوست' })}</span>
                  </div>
                </div>
              </div>

              {/* Quick Status Suggestion Chips */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                <button
                  type="button"
                  onClick={() => handleQuickStatusChip('Jummah Mubarak to all! 🌸')}
                  className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold hover:bg-blue-100 active:scale-95 transition"
                >
                  🌸 Jummah Mubarak
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickStatusChip('Alhamdulillah for everything! 🤲')}
                  className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold hover:bg-emerald-100 active:scale-95 transition"
                >
                  🤲 Alhamdulillah
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickStatusChip('Good Morning family! ☀️')}
                  className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold hover:bg-amber-100 active:scale-95 transition"
                >
                  ☀️ Good Morning
                </button>
              </div>

              <textarea
                data-coach="fb-input-status"
                value={statusText}
                onChange={(e) => handleStatusTextChange(e.target.value)}
                placeholder={t({
                  en: "What's on your mind?",
                  ur: 'آپ کے ذہن میں کیا ہے؟',
                })}
                rows={5}
                className={`w-full p-2 text-base outline-none resize-none placeholder-slate-400 bg-transparent ${
                  lang === 'ur' ? 'font-urdu text-right text-lg' : ''
                }`}
              />
            </div>

            {/* Bottom Add-ons toolbar */}
            <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">
                {t({ en: 'Add to your post', ur: 'اپنی پوسٹ میں شامل کریں' })}
              </span>
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5 text-emerald-500 cursor-pointer" />
                <Smile className="w-5 h-5 text-amber-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: MESSENGER INBOX
          ========================================================================= */}
      {screen === 'inbox' && (
        <div className="h-full w-full flex flex-col bg-white">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setScreen('feed')}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-700"
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
                onClick={() => {
                  setActiveChat(m);
                  setScreen('chat');
                }}
                className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50 cursor-pointer transition active:bg-slate-100"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl shrink-0">
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-xs text-slate-900 truncate">
                      {m.from}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {m.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{m.preview}</p>
                </div>
                {m.unread && (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: CHAT CONVERSATION
          ========================================================================= */}
      {screen === 'chat' && activeChat && (
        <div className="h-full w-full flex flex-col bg-slate-50">
          <div className="px-3 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setScreen('inbox')}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-2xl">{activeChat.avatar}</span>
              <div>
                <h4 className="font-bold text-xs text-slate-900">{activeChat.from}</h4>
                <span className="text-[10px] text-emerald-600 font-semibold block leading-none">
                  {t({ en: 'Active Now', ur: 'آن لائن' })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 flex flex-col">
            {activeChat.history.map((h, i) => (
              <div
                key={i}
                className={`max-w-[75%] p-2.5 rounded-2xl text-xs ${
                  h.from === 'me'
                    ? 'bg-blue-600 text-white self-end rounded-br-none'
                    : 'bg-white text-slate-800 self-start rounded-bl-none shadow-sm border border-slate-200/60'
                }`}
              >
                {h.text}
              </div>
            ))}
          </div>

          <div className="p-2 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={chatMessageInput}
              onChange={(e) => setChatMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendChatMessage();
              }}
              placeholder={t({ en: 'Type a message...', ur: 'پیغام لکھیں...' })}
              className="flex-1 p-2.5 bg-slate-100 rounded-full text-xs outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleSendChatMessage}
              className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: FRIENDS TAB
          ========================================================================= */}
      {screen === 'friends' && (
        <div className="h-full w-full flex flex-col bg-white">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
            <h2 className="font-bold text-lg text-slate-900">
              {t({ en: 'Friends', ur: 'دوست' })}
            </h2>
            <button
              type="button"
              onClick={() => {
                setActiveTab('home');
                setScreen('feed');
              }}
              className="text-xs text-blue-600 font-semibold"
            >
              {t({ en: 'Back to Feed', ur: 'فیڈ پر واپس' })}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              {t({ en: 'Friend Requests', ur: 'دوستی کی درخواستیں' })}
            </h3>

            {friendRequests.map((fr) => (
              <div key={fr.id} className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
                  {fr.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-slate-900">{fr.name}</h4>
                  <span className="text-[11px] text-slate-400 block mb-1">
                    {fr.mutual}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFriendRequests(friendRequests.filter((f) => f.id !== fr.id));
                        showToast(
                          t({
                            en: `Added ${fr.name} as friend!`,
                            ur: `${fr.name} اب آپ کے دوست ہیں!`,
                          })
                        );
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 active:scale-95 transition shadow-sm"
                    >
                      {t({ en: 'Confirm', ur: 'قبول کریں' })}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFriendRequests(friendRequests.filter((f) => f.id !== fr.id))
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-300 active:scale-95 transition"
                    >
                      {t({ en: 'Delete', ur: 'ختم کریں' })}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: WATCH / VIDEOS TAB
          ========================================================================= */}
      {screen === 'watch' && (
        <div className="h-full w-full flex flex-col bg-white">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
            <h2 className="font-bold text-lg text-slate-900">Watch</h2>
            <button
              type="button"
              onClick={() => {
                setActiveTab('home');
                setScreen('feed');
              }}
              className="text-xs text-blue-600 font-semibold"
            >
              {t({ en: 'Back to Feed', ur: 'فیڈ پر واپس' })}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-44 bg-slate-800 flex items-center justify-center text-white relative">
                <span className="text-4xl">🕌</span>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/80 text-blue-600 flex items-center justify-center shadow-lg">
                    ▶
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-sm text-slate-900">
                  {t({
                    en: 'Beautiful Quran Recitation - Surah Rahman',
                    ur: 'خوبصورت تلاوت قرآن - سورۃ الرحمن',
                  })}
                </h4>
                <span className="text-xs text-slate-500">254K views • 3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: NOTIFICATIONS TAB
          ========================================================================= */}
      {screen === 'notifications' && (
        <div className="h-full w-full flex flex-col bg-white">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
            <h2 className="font-bold text-lg text-slate-900">
              {t({ en: 'Notifications', ur: 'اطلاعات' })}
            </h2>
            <button
              type="button"
              onClick={() => {
                setActiveTab('home');
                setScreen('feed');
              }}
              className="text-xs text-blue-600 font-semibold"
            >
              {t({ en: 'Back to Feed', ur: 'فیڈ پر واپس' })}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            <div className="p-3 flex items-center gap-3 bg-blue-50/50">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl shrink-0">
                👴
              </div>
              <div className="flex-1 text-xs">
                <p className="text-slate-800">
                  <span className="font-bold">Tariq Mehmood</span> reacted to your status.
                </p>
                <span className="text-[10px] text-blue-600 font-semibold">10m ago</span>
              </div>
            </div>

            <div className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl shrink-0">
                🧔
              </div>
              <div className="flex-1 text-xs">
                <p className="text-slate-800">
                  <span className="font-bold">Bilal Khan</span> sent you a message in Messenger.
                </p>
                <span className="text-[10px] text-slate-400">1h ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: MENU (SETTINGS & LOGOUT)
          ========================================================================= */}
      {screen === 'menu' && (
        <div className="h-full w-full flex flex-col bg-[#F0F2F5] overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
            <h2 className="font-bold text-lg text-slate-900">
              {t({ en: 'Menu', ur: 'مینیو' })}
            </h2>
            <button
              type="button"
              onClick={() => {
                setActiveTab('home');
                setScreen('feed');
              }}
              className="text-xs text-blue-600 font-semibold"
            >
              {t({ en: 'Back to Feed', ur: 'فیڈ پر واپس' })}
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-2xl shrink-0">
                🧓
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-slate-900">
                  {t({ en: 'You (Practice Account)', ur: 'آپ کا پریکٹس اکاؤنٹ' })}
                </h3>
                <span className="text-xs text-slate-500">
                  {t({ en: 'See your profile', ur: 'اپنی پروفائل دیکھیں' })}
                </span>
              </div>
            </div>

            {/* Quick Tiles Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div
                onClick={() => {
                  setActiveTab('friends');
                  setScreen('friends');
                }}
                className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-1 cursor-pointer hover:bg-slate-50 transition"
              >
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-xs text-slate-800">
                  {t({ en: 'Friends', ur: 'دوست' })}
                </span>
              </div>

              <div
                onClick={() =>
                  showToast(t({ en: 'Saved posts', ur: 'محفوظ پوسٹس' }))
                }
                className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-1 cursor-pointer hover:bg-slate-50 transition"
              >
                <Bookmark className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-xs text-slate-800">
                  {t({ en: 'Saved', ur: 'محفوظ شدہ' })}
                </span>
              </div>

              <div
                onClick={() =>
                  showToast(t({ en: 'Memories', ur: 'یادیں' }))
                }
                className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-1 cursor-pointer hover:bg-slate-50 transition"
              >
                <Clock className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-xs text-slate-800">
                  {t({ en: 'Memories', ur: 'یادیں' })}
                </span>
              </div>

              <div
                onClick={() =>
                  showToast(t({ en: 'Settings', ur: 'سیٹنگز' }))
                }
                className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-1 cursor-pointer hover:bg-slate-50 transition"
              >
                <Settings className="w-5 h-5 text-slate-600" />
                <span className="font-bold text-xs text-slate-800">
                  {t({ en: 'Settings', ur: 'سیٹنگز' })}
                </span>
              </div>
            </div>

            {/* Log Out Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl p-3.5 shadow-sm font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition"
              >
                <LogOut className="w-5 h-5" />
                <span>{t({ en: 'Log Out', ur: 'لاگ آؤٹ کریں' })}</span>
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                {t({
                  en: 'Logging out will ask for credentials next time.',
                  ur: 'لاگ آؤٹ کرنے پر اگلی بار لاگ ان اسکرین نظر آئے گی۔',
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
