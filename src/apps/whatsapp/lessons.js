export const lessons = [
  {
    id: 'wa-send-message',
    title: { en: 'Send a message to Ammi', ur: 'امی کو پیغام بھیجیں' },
    duration: '2 min',
    steps: [
      {
        target: 'wa-chat-ammi',
        action: 'tap',
        text: { en: "Tap on Ammi's chat", ur: 'امی کی چیٹ پر دبائیں' },
      },
      {
        target: 'wa-input',
        action: 'type',
        minLength: 1,
        text: {
          en: 'Type "Salam" in the message box',
          ur: 'میسج والے خانے میں "سلام" لکھیں',
        },
      },
      {
        target: 'wa-send-btn',
        action: 'tap',
        text: { en: 'Tap the green send button', ur: 'سبز بھیجنے والے بٹن کو دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Great job! Your message has been sent.',
          ur: 'شاباش! آپ کا پیغام کامیابی سے بھیج دیا گیا ہے۔',
        },
      },
    ],
  },
  {
    id: 'wa-voice-note',
    title: { en: 'Send a voice note', ur: 'آواز کا پیغام (وائس نوٹ) بھیجیں' },
    duration: '2 min',
    steps: [
      {
        target: 'wa-chat-ammi',
        action: 'tap',
        text: { en: "Tap on Ammi's chat", ur: 'امی کی چیٹ کھولیں' },
      },
      {
        target: 'wa-mic-btn',
        action: 'tap',
        text: {
          en: 'Tap the microphone icon to record a voice message',
          ur: 'مائیکروفون کے نشان پر دبا کر آواز ریکارڈ کریں',
        },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Well done! Voice notes make it easy to talk without typing.',
          ur: 'بہترین! وائس نوٹ سے بغیر لکھے بات کرنا بہت آسان ہو جاتا ہے۔',
        },
      },
    ],
  },
];
