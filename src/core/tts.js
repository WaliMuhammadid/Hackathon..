// Browser Web Speech API helper for Urdu & English text-to-speech

export function speak(text, lang = 'en') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for elderly learners
    utterance.pitch = 1.0;

    // Pick best voice for Urdu or English
    const voices = window.speechSynthesis.getVoices();
    if (lang === 'ur') {
      utterance.lang = 'ur-PK';
      const urVoice = voices.find(v => v.lang.startsWith('ur') || v.lang.includes('hi') || v.name.includes('Urdu') || v.name.includes('Hindi'));
      if (urVoice) utterance.voice = urVoice;
    } else {
      utterance.lang = 'en-US';
      const enVoice = voices.find(v => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis error:', e);
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
