export const lessons = [
  {
    id: 'sms-spot-scam',
    title: { en: 'Spot a lottery prize scam', ur: 'جعلی انعام اور لاٹری فراڈ پہچانیں' },
    duration: '2 min',
    steps: [
      {
        target: 'sms-thread-bisp',
        action: 'tap',
        text: { en: 'Tap the unknown SMS claiming you won a cash prize', ur: 'نامعلوم نمبر سے آیا کیش انعام کا میسج کھولیں' },
      },
      {
        target: 'sms-btn-vote-scam',
        action: 'tap',
        warn: true,
        text: { en: 'Tap the red "Scam" button to analyze this message', ur: 'اس میسج کو فراڈ قرار دینے کے لیے "Scam" پر دبائیں' },
      },
      {
        target: 'sms-btn-block-sender',
        action: 'tap',
        text: { en: 'Tap Block & Report to stop further scam texts', ur: 'نمبر کو بلاک اور رپورٹ کرنے کے لیے بٹن دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Rule #1: Government programs never distribute cash via random SMS links or personal numbers.',
          ur: 'سنہری اصول نمبر 1: کوئی بھی سرکاری ادارہ نامعلوم نمبر سے یا لنک کے ذریعے پیسے تقسیم نہیں کرتا۔',
        },
      },
    ],
  },
  {
    id: 'sms-fake-bank-alert',
    title: { en: 'Urgent "Account Blocked" scam', ur: 'جعلی بینک "اکاؤنٹ بلاک" فراڈ' },
    duration: '2 min',
    steps: [
      {
        target: 'sms-thread-bankblock',
        action: 'tap',
        text: { en: 'Tap the threatening "Account Blocked" message', ur: 'اکاؤنٹ بلاک ہونے کی دھمکی والا میسج کھولیں' },
      },
      {
        target: 'sms-danger-link',
        action: 'tap',
        warn: true,
        text: {
          en: 'NEVER tap suspicious links in urgent texts! Tap Scam instead.',
          ur: 'خوف یا جلدی میں کسی لنک پر کلک نہ کریں! نیچے Scam دبائیں۔',
        },
      },
      {
        target: 'sms-btn-vote-scam',
        action: 'tap',
        text: { en: 'Confirm this message is a scam', ur: 'تصدیق کریں کہ یہ میسج فراڈ ہے' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Real banks never send urgent links to unblock your account. Always call the number on your ATM card!',
          ur: 'اصلی بینک کبھی لنک نہیں بھیجتا۔ تصدیق کے لیے ہمیشہ اپنے اے ٹی ایم کارڈ پر لکھے نمبر پر کال کریں۔',
        },
      },
    ],
  },
  {
    id: 'sms-block-number',
    title: { en: 'Block an unknown sender', ur: 'نامعلوم نمبر کو بلاک کریں' },
    duration: '1 min',
    steps: [
      {
        target: 'sms-thread-courier',
        action: 'tap',
        text: { en: 'Tap the unknown parcel delivery SMS', ur: 'پارسل ڈیلیوری کا نامعلوم میسج کھولیں' },
      },
      {
        target: 'sms-btn-block-sender',
        action: 'tap',
        text: { en: 'Tap Block & Report to protect yourself', ur: 'حفاظت کے لیے بلاک کا بٹن دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'The number is now blocked! Your phone will ignore future messages from them.',
          ur: 'نمبر بلاک کر دیا گیا ہے! اب اس نمبر سے مزید پیغامات آپ کو نہیں آئیں گے۔',
        },
      },
    ],
  },
];
