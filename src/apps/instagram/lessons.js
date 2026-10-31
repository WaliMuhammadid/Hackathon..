export const lessons = [
  {
    id: 'ig-signup',
    title: { en: 'Create a new account', ur: 'نیا اکاؤنٹ بنائیں' },
    duration: '3 min',
    steps: [
      {
        target: 'ig-signup-phone-input',
        action: 'type',
        minLength: 5,
        text: { en: 'Enter your phone number', ur: 'اپنا موبائل فون نمبر لکھیں' },
      },
      {
        target: 'ig-signup-next-1',
        action: 'tap',
        text: { en: 'Tap the Next button', ur: 'اگلا (Next) بٹن دبائیں' },
      },
      {
        target: 'ig-signup-name-input',
        action: 'type',
        minLength: 2,
        text: { en: 'Enter your full name', ur: 'اپنا پورا نام درج کریں' },
      },
      {
        target: 'ig-signup-pass-input',
        action: 'type',
        minLength: 4,
        text: { en: 'Create a safe password', ur: 'محفوظ پاس ورڈ درج کریں' },
      },
      {
        target: 'ig-signup-submit',
        action: 'tap',
        text: { en: 'Tap Complete Sign Up', ur: 'اکاؤنٹ مکمل کرنے پر دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Congratulations! Your Instagram account is now ready.',
          ur: 'مبارک ہو! آپ کا انسٹاگرام اکاؤنٹ کامیابی سے بن چکا ہے۔',
        },
      },
    ],
  },
  {
    id: 'ig-like-comment',
    title: { en: 'Like and comment on a post', ur: 'تصویر لائک اور کمنٹ کریں' },
    duration: '2 min',
    steps: [
      {
        target: 'ig-post-heart-btn',
        action: 'tap',
        text: { en: 'Tap the heart icon or double-tap to like', ur: 'تصویر لائک کرنے کے لیے دل کے نشان پر دبائیں' },
      },
      {
        target: 'ig-post-comment-btn',
        action: 'tap',
        text: { en: 'Tap the speech bubble to open comments', ur: 'تبصرہ کھولنے کے لیے کمنٹ آئیکن پر دبائیں' },
      },
      {
        target: 'ig-comment-input',
        action: 'type',
        minLength: 2,
        text: { en: 'Type "MashaAllah" in the comment box', ur: 'کمنٹ میں "ماشاءاللہ" لکھیں' },
      },
      {
        target: 'ig-comment-post-btn',
        action: 'tap',
        text: { en: 'Tap Post to publish your comment', ur: 'پوسٹ کا بٹن دبا کر کمنٹ بھیجیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Great job! Family members love encouraging comments.',
          ur: 'بہت خوب! آپ کا کمنٹ پوسٹ ہو گیا۔',
        },
      },
    ],
  },
  {
    id: 'ig-send-dm',
    title: { en: 'Send a Direct Message (DM)', ur: 'ڈائریکٹ میسج (DM) بھیجیں' },
    duration: '2 min',
    steps: [
      {
        target: 'ig-top-dm-btn',
        action: 'tap',
        text: { en: 'Tap the paper airplane / DM icon at top right', ur: 'اوپر دائیں جانب میسج کے نشان پر دبائیں' },
      },
      {
        target: 'ig-dm-thread-bilal',
        action: 'tap',
        text: { en: 'Tap on Bilal’s chat', ur: 'بلال کی چیٹ کھولیں' },
      },
      {
        target: 'ig-dm-input',
        action: 'type',
        minLength: 1,
        text: { en: 'Type a message for Bilal', ur: 'بلال کے لیے میسج لکھیں' },
      },
      {
        target: 'ig-dm-send-btn',
        action: 'tap',
        text: { en: 'Tap Send', ur: 'بھیجنے کے لیے سینڈ دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'You sent your first Instagram DM successfully!',
          ur: 'آپ نے پہلا ڈائریکٹ میسج کامیابی سے بھیج دیا!',
        },
      },
    ],
  },
];
