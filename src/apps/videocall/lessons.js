export const lessons = [
  {
    id: 'vc-answer-call',
    title: { en: 'Answer an incoming family video call', ur: 'گھر والوں کی ویڈیو کال اٹھائیں' },
    duration: '2 min',
    steps: [
      {
        target: 'vc-btn-accept',
        action: 'tap',
        text: { en: 'Tap the green button to accept the video call', ur: 'ویڈیو کال اٹھانے کے لیے سبز بٹن دبائیں' },
      },
      {
        target: 'vc-btn-mute',
        action: 'tap',
        text: { en: 'Tap the microphone to mute / unmute yourself', ur: 'اپنی آواز بند یا کھولنے کے لیے مائیک دبائیں' },
      },
      {
        target: 'vc-btn-end',
        action: 'tap',
        text: { en: 'Tap the red button when you want to end the call', ur: 'کال ختم کرنے کے لیے سرخ بٹن دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'You are now ready for WhatsApp & family video calls anytime!',
          ur: 'بہت خوب! اب آپ کسی بھی وقت فیملی کے ساتھ ویڈیو کال کر سکتے ہیں۔',
        },
      },
    ],
  },
];
