import { create } from 'zustand';
import { voice } from './voice';

// Local storage key for persistence
const STORAGE_KEY = 'practice_phone_progress_v1';

const getInitialProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { lessons: {}, stars: 0, badges: [] };
  } catch {
    return { lessons: {}, stars: 0, badges: [] };
  }
};

export const useStore = create((set, get) => ({
  lang: 'en', // 'en' | 'ur'
  mode: 'guided', // 'guided' | 'try' | 'test'
  viewMode: 'web', // 'web' | 'phone'
  activeApp: null, // appId or null
  activeLesson: null, // lesson object or null
  stepIndex: 0,
  sessionKey: 0,
  voiceMuted: false,
  showProgress: false,

  // Try & Test mode states
  mistakesCount: 0,
  idleSeconds: 0,
  showTryHint: false,
  wrongTapAlert: false,
  isCompleted: false,
  lastScore: null,

  // Persistent progress
  progress: getInitialProgress(),

  setLang: (lang) => set({ lang }),
  toggleLang: () => set((state) => ({ lang: state.lang === 'en' ? 'ur' : 'en' })),
  setMode: (mode) => set({ mode }),
  setViewMode: (viewMode) => set({ viewMode }),
  toggleViewMode: () =>
    set((state) => ({ viewMode: state.viewMode === 'web' ? 'phone' : 'web' })),
  setShowProgress: (show) => set({ showProgress: show }),

  toggleVoice: () => {
    const muted = voice.toggleMute();
    set({ voiceMuted: muted });
  },

  // Open an app freely or with a lesson
  launchApp: (appId, lesson = null) => {
    voice.cancel();
    set((state) => ({
      activeApp: appId,
      activeLesson: lesson,
      stepIndex: 0,
      mistakesCount: 0,
      idleSeconds: 0,
      showTryHint: false,
      wrongTapAlert: false,
      isCompleted: false,
      sessionKey: state.sessionKey + 1,
    }));
  },

  exitApp: () => {
    voice.cancel();
    set({
      activeApp: null,
      activeLesson: null,
      stepIndex: 0,
      isCompleted: false,
      wrongTapAlert: false,
    });
  },

  exitLesson: () => {
    voice.cancel();
    set({
      activeLesson: null,
      stepIndex: 0,
      isCompleted: false,
      wrongTapAlert: false,
    });
  },

  setStepIndex: (index) => {
    voice.cancel();
    set({
      stepIndex: index,
      idleSeconds: 0,
      showTryHint: false,
      wrongTapAlert: false,
    });
  },

  nextStep: () => {
    const { activeLesson, stepIndex, completeLesson } = get();
    if (!activeLesson) return;
    if (stepIndex + 1 < activeLesson.steps.length) {
      voice.cancel();
      set({
        stepIndex: stepIndex + 1,
        idleSeconds: 0,
        showTryHint: false,
        wrongTapAlert: false,
      });
    } else {
      completeLesson(activeLesson.id);
    }
  },

  prevStep: () => {
    const { stepIndex } = get();
    if (stepIndex > 0) {
      voice.cancel();
      set({
        stepIndex: stepIndex - 1,
        idleSeconds: 0,
        showTryHint: false,
        wrongTapAlert: false,
      });
    }
  },

  recordMistake: () => {
    set((state) => ({
      mistakesCount: state.mistakesCount + 1,
      wrongTapAlert: true,
    }));
    setTimeout(() => {
      set({ wrongTapAlert: false });
    }, 2500);
  },

  triggerTryHint: () => {
    set({ showTryHint: true });
  },

  setIdleSeconds: (secs) => {
    set({ idleSeconds: secs });
  },

  completeLesson: (lessonId) => {
    const { mistakesCount, progress } = get();
    const starsEarned = Math.max(1, 3 - mistakesCount);

    const updatedLessons = {
      ...progress.lessons,
      [lessonId]: {
        completed: true,
        stars: Math.max(starsEarned, progress.lessons[lessonId]?.stars || 0),
        timestamp: Date.now(),
      },
    };

    // Calculate total stars
    const totalStars = Object.values(updatedLessons).reduce(
      (sum, l) => sum + (l.stars || 0),
      0
    );

    // Compute badges
    const badges = [...progress.badges];
    if (!badges.includes('first_step') && Object.keys(updatedLessons).length >= 1) {
      badges.push('first_step');
    }
    if (!badges.includes('scam_spotter') && lessonId.includes('sms')) {
      badges.push('scam_spotter');
    }
    if (!badges.includes('digital_banker') && lessonId.includes('mz')) {
      badges.push('digital_banker');
    }
    if (!badges.includes('connected_family') && (lessonId.includes('wa') || lessonId.includes('vc'))) {
      badges.push('connected_family');
    }
    if (!badges.includes('master_explorer') && Object.keys(updatedLessons).length >= 5) {
      badges.push('master_explorer');
    }

    const newProgress = {
      lessons: updatedLessons,
      stars: totalStars,
      badges,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.warn('Could not save progress to localStorage', e);
    }

    set({
      progress: newProgress,
      isCompleted: true,
      lastScore: { stars: starsEarned, mistakes: mistakesCount },
    });
  },

  resetProgress: () => {
    const initial = { lessons: {}, stars: 0, badges: [] };
    localStorage.removeItem(STORAGE_KEY);
    set({ progress: initial });
  },
}));
