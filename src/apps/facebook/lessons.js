export const lessons = [
  {
    id: 'fb-share-post',
    title: { en: 'Share a photo with family', ur: 'خاندان کے ساتھ تصویر شیئر کریں' },
    duration: '2 min',
    steps: [
      {
        target: 'fb-post-box',
        action: 'tap',
        text: { en: "Tap 'What\'s on your mind?' box", ur: "'آپ کے ذہن میں کیا ہے؟' پر دبائیں" },
      },
      {
        target: 'fb-input-status',
        action: 'type',
        minLength: 1,
        text: { en: "Type 'Jummah Mubarak' in the post", ur: "پوسٹ میں 'جمعہ مبارک' لکھیں" },
      },
      {
        target: 'fb-publish-btn',
        action: 'tap',
        text: { en: 'Tap the Post button to publish', ur: 'پوسٹ کا بٹن دبا کر شائع کریں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Congratulations! Your post was shared safely.',
          ur: 'بہت خوب! آپ کی پوسٹ محفوظ طریقے سے شیئر ہو گئی۔',
        },
      },
    ],
  },
];
