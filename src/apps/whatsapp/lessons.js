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
          en: 'Type your message in the box',
          ur: 'پیغام والے خانے میں میسج لکھیں',
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
          en: 'Well done! Your message was sent and Ammi will reply.',
          ur: 'شاباش! آپ کا پیغام بھیج دیا گیا اور امی کا جواب بھی آگیا۔',
        },
      },
    ],
  },
  {
    id: 'wa-send-photo',
    title: { en: 'Send a photo from gallery', ur: 'گیلری سے تصویر بھیجیں' },
    duration: '2 min',
    steps: [
      {
        target: 'wa-chat-ammi',
        action: 'tap',
        text: { en: "Tap on Ammi's chat", ur: 'امی کی چیٹ کھولیں' },
      },
      {
        target: 'wa-attach-btn',
        action: 'tap',
        text: { en: 'Tap the paperclip attachment icon', ur: 'پِن یا اٹیچمنٹ کے نشان پر دبائیں' },
      },
      {
        target: 'wa-gallery-opt',
        action: 'tap',
        text: { en: 'Tap on Gallery', ur: 'گیلری پر دبائیں' },
      },
      {
        target: 'wa-photo-item-1',
        action: 'tap',
        text: { en: 'Select a photo to send', ur: 'بھیجنے کے لیے تصویر منتخب کریں' },
      },
      {
        target: 'wa-send-photo-btn',
        action: 'tap',
        text: { en: 'Tap send to share the photo', ur: 'تصویر بھیجنے کے لیے سینڈ پر دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Great job! The photo has been shared safely.',
          ur: 'بہترین! تصویر کامیابی سے شیئر ہو گئی۔',
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
          en: 'Tap the microphone icon to record and send your voice',
          ur: 'مائیکروفون کے نشان پر دبا کر آواز ریکارڈ کر کے بھیجیں',
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
  {
    id: 'wa-video-call',
    title: { en: 'Make a video call', ur: 'ویڈیو کال ملائیں' },
    duration: '2 min',
    steps: [
      {
        target: 'wa-chat-ammi',
        action: 'tap',
        text: { en: "Tap on Ammi's chat", ur: 'امی کی چیٹ کھولیں' },
      },
      {
        target: 'wa-call-video-btn',
        action: 'tap',
        text: { en: 'Tap the video camera icon at top', ur: 'اوپر ویڈیو کیمرے کے نشان پر دبائیں' },
      },
      {
        target: 'wa-call-end-btn',
        action: 'tap',
        text: { en: 'Tap the red button to end the call', ur: 'کال ختم کرنے کے لیے سرخ بٹن دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Superb! You know how to start and end a video call.',
          ur: 'شاباش! آپ ویڈیو کال ملانا اور بند کرنا سیکھ چکے ہیں۔',
        },
      },
    ],
  },
];
