export const demoApp = {
  id: '_demo',
  name: { en: 'Demo Practice', ur: 'ڈیمو پریکٹس' },
  color: '#6366f1',
  Icon: null, // Will use inline or fallback
  Component: function DemoComponent() {
    return (
      <div className="h-full w-full bg-slate-100 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Demo Test Screen</h2>
          <p className="text-sm text-slate-600">
            This demo screen tests coach engine spotlights, typing triggers, and multi-step actions.
          </p>

          <div className="space-y-3 pt-4">
            <button
              type="button"
              data-coach="demo-btn-1"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl active:scale-95 shadow"
            >
              First Button
            </button>

            <input
              type="text"
              data-coach="demo-input-text"
              placeholder="Type anything here..."
              className="w-full p-3 border-2 border-slate-300 rounded-xl outline-none focus:border-blue-500"
            />

            <button
              type="button"
              data-coach="demo-btn-confirm"
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl active:scale-95 shadow"
            >
              Confirm / Next
            </button>
          </div>
        </div>
      </div>
    );
  },
  lessons: [
    {
      id: 'demo-lesson-1',
      title: { en: 'Test Guided Flow', ur: 'رہنمائی کا ٹیسٹ' },
      duration: '1 min',
      steps: [
        {
          target: 'demo-btn-1',
          action: 'tap',
          text: { en: 'Tap the first blue button', ur: 'پہلے نیلے بٹن کو دبائیں' },
        },
        {
          target: 'demo-input-text',
          action: 'type',
          minLength: 2,
          text: { en: 'Type something in the text box', ur: 'خانے میں کچھ لکھیں' },
        },
        {
          target: 'demo-btn-confirm',
          action: 'tap',
          text: { en: 'Tap the green confirm button', ur: 'سبز تصدیقی بٹن پر دبائیں' },
        },
        {
          target: null,
          action: 'info',
          text: { en: 'Demo lesson complete!', ur: 'ڈیمو مکمل ہو گیا!' },
        },
      ],
    },
  ],
};
