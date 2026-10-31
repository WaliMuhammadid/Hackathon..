import { create } from 'zustand';

export const useStore = create((set, get) => ({
  lang: 'en', // 'en' | 'ur'
  mode: 'guided', // 'guided' | 'try' | 'test'
  activeApp: null, // appId or null for home screen
  activeLesson: null, // lesson object or null
  stepIndex: 0,
  progress: {}, // { [lessonId]: boolean }
  voiceEnabled: true,
  appKey: 0, // Used to remount app freshly

  setLang: (lang) => set({ lang }),
  toggleLang: () => set((state) => ({ lang: state.lang === 'en' ? 'ur' : 'en' })),
  setMode: (mode) => set({ mode }),
  toggleVoice: () => set((state) => ({ voiceEnabled: !state.voiceEnabled })),

  launchApp: (appId, lesson = null) => {
    set((state) => ({
      activeApp: appId,
      activeLesson: lesson,
      stepIndex: 0,
      appKey: state.appKey + 1,
    }));
  },

  exitApp: () => {
    set({
      activeApp: null,
      activeLesson: null,
      stepIndex: 0,
    });
  },

  setStepIndex: (index) => set({ stepIndex: index }),

  nextStep: () => {
    const { activeLesson, stepIndex, completeLesson } = get();
    if (!activeLesson) return;
    if (stepIndex + 1 < activeLesson.steps.length) {
      set({ stepIndex: stepIndex + 1 });
    } else {
      completeLesson(activeLesson.id);
    }
  },

  completeLesson: (id) => {
    set((state) => ({
      progress: { ...state.progress, [id]: true },
      activeLesson: null,
      stepIndex: 0,
    }));
  },
}));
