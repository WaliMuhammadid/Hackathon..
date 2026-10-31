export const lessons = [
  {
    id: 'vc-make-call',
    title: { en: 'Make a video call to Ammi', ur: 'امی کو ویڈیو کال ملائیں' },
    duration: '2 min',
    steps: [
      {
        target: 'vc-contact-ammi',
        action: 'tap',
        text: { en: 'Tap on Ammi from your contacts', ur: 'رابطوں میں سے امی پر دبائیں' },
      },
      {
        target: 'vc-btn-start-call',
        action: 'tap',
        text: { en: 'Tap the green Call button', ur: 'سبز کال والے بٹن پر دبائیں' },
      },
      {
        target: 'vc-btn-toggle-mic',
        action: 'tap',
        text: { en: 'Tap the microphone to mute / unmute', ur: 'مائیک کو بند یا کھولنے کے لیے دبائیں' },
      },
      {
        target: 'vc-btn-end-call',
        action: 'tap',
        text: { en: 'Tap the red button to end the call', ur: 'کال ختم کرنے کے لیے سرخ بٹن دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Well done! You can now video call family anytime.',
          ur: 'بہت خوب! اب آپ کسی بھی وقت گھر والوں سے ویڈیو کال پر بات کر سکتے ہیں۔',
        },
      },
    ],
  },
  {
    id: 'vc-fix-connection',
    title: { en: 'Fix a call that won’t connect', ur: 'کال نہ ملنے کا مسئلہ حل کریں' },
    duration: '2 min',
    steps: [
      {
        target: 'vc-contact-ammi',
        action: 'tap',
        text: { en: 'Tap on Ammi to call', ur: 'امی کو کال ملانے کے لیے دبائیں' },
      },
      {
        target: 'vc-btn-start-call',
        action: 'tap',
        text: { en: 'Tap Call', ur: 'کال ملائیں' },
      },
      {
        target: 'vc-helper-open-btn',
        action: 'tap',
        text: { en: 'Call failed! Tap the "Can’t connect?" helper', ur: 'کال نہیں ملی! "Can’t connect?" پر دبائیں' },
      },
      {
        target: 'vc-toggle-wifi-fix',
        action: 'tap',
        text: { en: 'Tap the switch to turn Wi-Fi back on', ur: 'وائی فائی بحال کرنے کے لیے بٹن دبائیں' },
      },
      {
        target: 'vc-btn-reconnect',
        action: 'tap',
        text: { en: 'Tap Try Again to reconnect', ur: 'دوبارہ کال ملانے کے لیے دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Connected! Checking your Wi-Fi or mobile data fixes most call issues.',
          ur: 'کال مل گئی! اکثر انٹرنیٹ چیک کرنے سے کال کا مسئلہ فوری حل ہو جاتا ہے۔',
        },
      },
    ],
  },
];
