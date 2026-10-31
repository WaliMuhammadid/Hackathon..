export const lessons = [
  {
    id: 'mz-send-money',
    title: { en: 'Send money to Bilal', ur: 'بلال کو پیسے بھیجیں' },
    duration: '3 min',
    steps: [
      {
        target: 'mz-btn-transfer',
        action: 'tap',
        text: { en: 'Tap on Send Money / Transfers', ur: 'رقم بھیجیں / ٹرانسفر پر دبائیں' },
      },
      {
        target: 'mz-contact-bilal',
        action: 'tap',
        text: { en: 'Select Bilal Bhai from beneficiary list', ur: 'لسٹ میں سے بلال بھائی کو منتخب کریں' },
      },
      {
        target: 'mz-input-amount',
        action: 'type',
        minLength: 1,
        text: { en: 'Enter PKR 1000 in the amount field', ur: 'رقم کے خانے میں 1000 روپے درج کریں' },
      },
      {
        target: 'mz-btn-pay',
        action: 'tap',
        text: { en: 'Tap the Pay button to confirm', ur: 'تصدیق کرنے کے لیے ادائیگی پر دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Money sent safely! Always double check the beneficiary name before paying.',
          ur: 'رقم کامیابی سے منتقل ہو گئی! پیسے بھیجنے سے پہلے نام کی تصدیق لازمی کریں۔',
        },
      },
    ],
  },
  {
    id: 'mz-check-balance',
    title: { en: 'Check your account balance', ur: 'اپنا بینک بیلنس چیک کریں' },
    duration: '1 min',
    steps: [
      {
        target: 'mz-toggle-balance',
        action: 'tap',
        text: { en: 'Tap the eye icon to unhide your balance', ur: 'بیلنس دیکھنے کے لیے آنکھ کے نشان پر دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'You can hide your balance in public places for safety.',
          ur: 'حفاظت کے لیے آپ بھیڑ میں اپنا بیلنس چھپا سکتے ہیں۔',
        },
      },
    ],
  },
];
