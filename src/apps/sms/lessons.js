export const lessons = [
  {
    id: 'sms-spot-scam',
    title: { en: 'Spot a lottery scam SMS', ur: 'جعلی انعام اور فراڈ ایس ایم ایس پہچانیں' },
    duration: '2 min',
    steps: [
      {
        target: 'sms-thread-scam',
        action: 'tap',
        text: { en: 'Tap the suspicious SMS from unknown number', ur: 'نامعلوم نمبر سے آیا مشکوک میسج کھولیں' },
      },
      {
        target: 'sms-link-danger',
        action: 'tap',
        warn: true,
        text: {
          en: 'DO NOT tap links in unknown SMS! Tap Block & Report instead.',
          ur: 'نامعلوم میسج کے لنک پر ہرگز کلک نہ کریں! نیچے بلاک پر دبائیں۔',
        },
      },
      {
        target: 'sms-btn-block',
        action: 'tap',
        text: { en: 'Tap Block to keep your phone secure', ur: 'فون کو محفوظ رکھنے کے لیے بلاک پر دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Excellent! No bank or lottery asks for OTP or asks you to click random links.',
          ur: 'شاباش! کوئی بھی اصلی بینک یا ادارہ پاس ورڈ یا او ٹی پی نہیں مانگتا۔',
        },
      },
    ],
  },
];
