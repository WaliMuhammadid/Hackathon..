export const lessons = [
  {
    id: 'mz-login',
    title: { en: 'Log in to Meezan Mobile', ur: 'میزان ایپ میں لاگ ان کریں' },
    duration: '2 min',
    steps: [
      {
        target: 'mz-login-user-input',
        action: 'type',
        minLength: 3,
        text: { en: 'Enter your practice username', ur: 'اپنا یوزر نیم لکھیں' },
      },
      {
        target: 'mz-login-pass-input',
        action: 'type',
        minLength: 4,
        text: { en: 'Enter your practice password', ur: 'اپنا پاس ورڈ لکھیں' },
      },
      {
        target: 'mz-login-btn',
        action: 'tap',
        text: { en: 'Tap the Log In button', ur: 'لاگ ان بٹن پر دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'You are now safely logged in to your dashboard.',
          ur: 'آپ کامیابی اور حفاظت سے اپنے ڈیش بورڈ میں داخل ہو چکے ہیں۔',
        },
      },
    ],
  },
  {
    id: 'mz-check-balance',
    title: { en: 'Check and hide your balance', ur: 'بینک بیلنس چیک اور چھپائیں' },
    duration: '1 min',
    steps: [
      {
        target: 'mz-toggle-balance',
        action: 'tap',
        text: { en: 'Tap the eye icon to unhide your balance', ur: 'بیلنس دیکھنے کے لیے آنکھ کے نشان پر دبائیں' },
      },
      {
        target: 'mz-toggle-balance',
        action: 'tap',
        text: { en: 'Tap it again to hide it for privacy in public', ur: 'حفاظت کے لیے دوبارہ دبا کر بیلنس چھپائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Great habit! Hiding your balance protects you in public areas.',
          ur: 'بہترین عادت! بازار یا بھیڑ میں بیلنس چھپانا حفاظت کے لیے ضروری ہے۔',
        },
      },
    ],
  },
  {
    id: 'mz-send-money-safe',
    title: { en: 'Send money safely with OTP', ur: 'او ٹی پی تصدیق کے ساتھ رقم بھیجیں' },
    duration: '3 min',
    steps: [
      {
        target: 'mz-quick-transfer',
        action: 'tap',
        text: { en: 'Tap on Send Money / Funds Transfer', ur: 'رقم بھیجیں / ٹرانسفر پر دبائیں' },
      },
      {
        target: 'mz-beneficiary-bilal',
        action: 'tap',
        text: { en: 'Select Bilal Bhai from beneficiary list', ur: 'لسٹ میں سے بلال بھائی کو منتخب کریں' },
      },
      {
        target: 'mz-input-transfer-amt',
        action: 'type',
        minLength: 1,
        text: { en: 'Enter PKR 1000 in the amount field', ur: 'رقم والے خانے میں 1000 روپے درج کریں' },
      },
      {
        target: 'mz-btn-proceed-transfer',
        action: 'tap',
        text: { en: 'Tap Proceed to Review', ur: 'جائزہ لینے کے لیے آگے بڑھیں' },
      },
      {
        target: 'mz-btn-confirm-review',
        action: 'tap',
        text: { en: 'Verify recipient name and tap Confirm', ur: 'نام کی تصدیق کر کے کنفرم پر دبائیں' },
      },
      {
        target: 'mz-input-otp',
        action: 'type',
        minLength: 4,
        text: { en: 'Enter the 6-digit OTP from the SMS banner', ur: 'ایس ایم ایس والا 6 ہندسوں کا کوڈ درج کریں' },
      },
      {
        target: 'mz-btn-submit-otp',
        action: 'tap',
        text: { en: 'Tap Submit OTP to complete transfer', ur: 'او ٹی پی جمع کرانے پر دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Transfer successful! Receipt generated and balance updated.',
          ur: 'رقم کامیابی سے منتقل ہو گئی اور رسید جاری ہو گئی۔',
        },
      },
    ],
  },
  {
    id: 'mz-pay-bill',
    title: { en: 'Pay electricity utility bill', ur: 'بجلی کا بل ادا کریں' },
    duration: '2 min',
    steps: [
      {
        target: 'mz-quick-bills',
        action: 'tap',
        text: { en: 'Tap on Pay Bills', ur: 'بل ادا کریں پر دبائیں' },
      },
      {
        target: 'mz-biller-kelectric',
        action: 'tap',
        text: { en: 'Select K-Electric (Electricity)', ur: 'کے الیکٹرک (بجلی) کا انتخاب کریں' },
      },
      {
        target: 'mz-input-consumer-no',
        action: 'type',
        minLength: 4,
        text: { en: 'Enter your 13-digit consumer number', ur: 'بل پر لکھا صارف نمبر درج کریں' },
      },
      {
        target: 'mz-btn-pay-bill-now',
        action: 'tap',
        text: { en: 'Tap Pay Bill to confirm payment', ur: 'بل کی ادائیگی کی تصدیق کریں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Your utility bill has been paid! No need to stand in long bank queues.',
          ur: 'آپ کا بل ادا ہو گیا! اب بینک کی لمبی لائنوں میں کھڑے ہونے کی ضرورت نہیں۔',
        },
      },
    ],
  },
  {
    id: 'mz-spot-danger-otp',
    title: { en: 'Spot the danger: Never share OTP!', ur: 'خطرہ پہچانیں: او ٹی پی کبھی شیئر نہ کریں!' },
    duration: '2 min',
    steps: [
      {
        target: 'mz-quick-transfer',
        action: 'tap',
        text: { en: 'Tap Send Money to begin', ur: 'شروع کرنے کے لیے رقم بھیجیں پر دبائیں' },
      },
      {
        target: 'mz-beneficiary-bilal',
        action: 'tap',
        text: { en: 'Select Bilal Bhai', ur: 'بلال بھائی پر دبائیں' },
      },
      {
        target: 'mz-btn-proceed-transfer',
        action: 'tap',
        text: { en: 'Tap Proceed', ur: 'آگے بڑھیں پر دبائیں' },
      },
      {
        target: 'mz-fake-caller-decline',
        action: 'tap',
        warn: true,
        text: {
          en: 'DANGER: Caller claiming to be from bank is asking for OTP! Tap DECLINE.',
          ur: 'خطرہ: کالر بینک کے نام پر آپ کا او ٹی پی مانگ رہا ہے! فوراً کینسل / ڈکلائن دبائیں۔',
        },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Heroic save! No real bank officer will ever ask for your OTP or password over phone.',
          ur: 'شاباش! اصلی بینک کبھی بھی فون پر آپ سے خفیہ کوڈ یا او ٹی پی نہیں مانگتا۔',
        },
      },
    ],
  },
  {
    id: 'mz-session-timeout',
    title: { en: 'Log back in after session timeout', ur: 'سیشن ختم ہونے پر دوبارہ لاگ ان کریں' },
    duration: '2 min',
    steps: [
      {
        target: 'mz-btn-simulate-timeout',
        action: 'tap',
        text: { en: 'Simulate safe bank automatic timeout', ur: 'بینکنگ سیشن ٹائم آؤٹ کا مشاہدہ کریں' },
      },
      {
        target: 'mz-timeout-relogin-btn',
        action: 'tap',
        text: { en: 'Tap Log In Again', ur: 'دوبارہ لاگ ان پر دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Banking apps automatically log out for your safety if left inactive.',
          ur: 'اگر موبائل کھلا رہ جائے تو بینک آپ کی حفاظت کے لیے خود ہی لاگ آؤٹ کر دیتا ہے۔',
        },
      },
    ],
  },
];
