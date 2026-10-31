export class SpeechController {
  constructor() {
    this.muted = false;
    this.currentUtterance = null;
  }

  isSupported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  setMuted(muted) {
    this.muted = muted;
    if (muted) {
      this.cancel();
    }
  }

  toggleMute() {
    this.setMuted(!this.muted);
    return this.muted;
  }

  cancel() {
    if (this.isSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.warn('Speech cancellation error:', e);
      }
    }
  }

  speak(text, lang = 'en') {
    if (!this.isSupported() || this.muted || !text) return;

    this.cancel();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88; // Gentle, steady cadence for elderly learners
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices() || [];
      
      if (lang === 'ur') {
        // Preference: Urdu (ur-PK, ur), then Hindi (hi-IN, hi), or Arabic fallback
        utterance.lang = 'ur-PK';
        const urVoice = voices.find(v => 
          v.lang.toLowerCase().startsWith('ur') || 
          v.lang.toLowerCase().includes('pk') ||
          v.name.toLowerCase().includes('urdu')
        ) || voices.find(v => 
          v.lang.toLowerCase().startsWith('hi') ||
          v.name.toLowerCase().includes('hindi')
        );
        if (urVoice) utterance.voice = urVoice;
      } else {
        utterance.lang = 'en-US';
        const enVoice = voices.find(v => 
          v.lang === 'en-PK' || 
          v.lang === 'en-IN' || 
          v.lang === 'en-US' || 
          v.lang.startsWith('en')
        );
        if (enVoice) utterance.voice = enVoice;
      }

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
    }
  }
}

export const voice = new SpeechController();
