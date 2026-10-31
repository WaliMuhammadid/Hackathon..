export const lessons = [
  {
    id: 'ig-view-story',
    title: { en: 'View a photo story', ur: 'اسٹوری فوٹو دیکھیں' },
    duration: '2 min',
    steps: [
      {
        target: 'ig-story-ammi',
        action: 'tap',
        text: { en: "Tap on Ammi's circular story photo", ur: 'امی کی گول تصویر والی اسٹوری پر دبائیں' },
      },
      {
        target: 'ig-story-close',
        action: 'tap',
        text: { en: 'Tap the cross (X) at top right to close', ur: 'بند کرنے کے لیے اوپر کراس (X) پر دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'Stories disappear after 24 hours. Great job!',
          ur: 'بہترین! اسٹوریز 24 گھنٹوں کے بعد خود غائب ہو جاتی ہیں۔',
        },
      },
    ],
  },
  {
    id: 'ig-like-post',
    title: { en: 'Like a family photo', ur: 'فیملی فوٹو لائک کریں' },
    duration: '2 min',
    steps: [
      {
        target: 'ig-like-btn',
        action: 'tap',
        text: { en: 'Tap the heart icon to like Bilal’s photo', ur: 'بلال کی تصویر لائک کرنے کے لیے دل کے نشان پر دبائیں' },
      },
      {
        target: null,
        action: 'info',
        text: {
          en: 'The heart turned red! Bilal knows you liked it.',
          ur: 'دل سرخ ہو گیا! اب بلال کو معلوم ہو جائے گا کہ آپ کو تصویر پسند آئی۔',
        },
      },
    ],
  },
];
