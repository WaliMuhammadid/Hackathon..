export const lessons = [
  {
    id: 'fb-login',
    title: { en: 'Log in to Facebook safely', ur: 'محفوظ طریقے سے فیس بک لاگ ان کریں' },
    duration: '2 min',
    steps: [
      {
        target: 'fb-login-phone-input',
        action: 'type',
        minLength: 4,
        text: { en: 'Enter your phone number or email', ur: 'موبائل نمبر یا ای میل درج کریں' },
      },
      {
        target: 'fb-login-pass-input',
        action: 'type',
        minLength: 4,
        text: { en: 'Enter your password', ur: 'اپنا پاس ورڈ درج کریں' },
      },
      {
        target: 'fb-login-submit-btn',
        action: 'tap',
        text: { en: 'Tap Log In', ur: 'لاگ ان بٹن پر دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'You are now logged in! Remember to never share passwords.',
          ur: 'آپ لاگ ان ہو چکے ہیں! یاد رہے اپنا پاس ورڈ کبھی کسی کو نہ بتائیں۔',
        },
      },
    ],
  },
  {
    id: 'fb-react-post',
    title: { en: 'React with Love on family post', ur: 'فیملی پوسٹ پر لائک / محبت کا اظہار کریں' },
    duration: '2 min',
    steps: [
      {
        target: 'fb-btn-like-1',
        action: 'tap',
        text: { en: 'Tap the Like / Reaction button on the post', ur: 'پوسٹ پر لائک یا ری ایکشن بٹن پر دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Your reaction was posted! Family loves staying connected.',
          ur: 'آپ کا ردعمل پوسٹ ہو گیا۔ فیملی سے جڑے رہنا بہت آسان ہے۔',
        },
      },
    ],
  },
  {
    id: 'fb-post-status',
    title: { en: 'Post a status update', ur: 'اسٹیٹس اپ ڈیٹ پوسٹ کریں' },
    duration: '2 min',
    steps: [
      {
        target: 'fb-post-box',
        action: 'tap',
        text: { en: "Tap on 'What's on your mind?'", ur: "'آپ کے ذہن میں کیا ہے؟' پر دبائیں" },
      },
      {
        target: 'fb-input-status',
        action: 'type',
        minLength: 2,
        text: { en: 'Type your message (e.g. Jummah Mubarak)', ur: 'پیغام لکھیں (جیسے جمعہ مبارک)' },
      },
      {
        target: 'fb-publish-btn',
        action: 'tap',
        text: { en: 'Tap the Post button to publish', ur: 'شائع کرنے کے لیے پوسٹ بٹن دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Your status has been published to friends safely!',
          ur: 'آپ کا اسٹیٹس کامیابی سے پوسٹ ہو چکا ہے!',
        },
      },
    ],
  },
];
