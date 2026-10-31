import React from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import { voice } from './voice';
import {
  Volume2,
  VolumeX,
  ArrowRight,
  ArrowLeft,
  X,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';

export default function CoachPanel({
  step,
  stepIndex,
  totalSteps,
  warn = false,
  wrongTapAlert = false,
  showTryHint = false,
  mode = 'guided',
  onNext,
  onPrev,
  onExit,
  onNeedHelp,
}) {
  const t = useT();
  const { lang, voiceMuted, toggleVoice } = useStore();

  const isLast = stepIndex === totalSteps - 1;
  const isType = step?.action === 'type';
  const isInfo = step?.action === 'info';

  const replayVoice = () => {
    if (step) {
      voice.speak(t(step.text), lang);
    }
  };

  return (
    <div className="absolute bottom-0 inset-x-0 p-3 pointer-events-auto z-50">
      <div
        className={`rounded-2xl p-4 shadow-2xl backdrop-blur-md border transition-all duration-300 ${
          warn
            ? 'bg-red-950/95 text-white border-red-500/60 shadow-red-900/40'
            : wrongTapAlert
            ? 'bg-amber-950/95 text-white border-amber-500/80 shadow-amber-900/40'
            : 'bg-slate-900/95 text-white border-blue-500/40 shadow-black/80'
        }`}
      >
        {/* Top bar: Avatar + Step indicator + Replay + Exit */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            {/* Friendly Coach Avatar */}
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <circle cx="18" cy="18" r="16" fill="#3B82F6" />
                {/* Eyes */}
                <circle cx="13" cy="15" r="2.5" fill="white" />
                <circle cx="23" cy="15" r="2.5" fill="white" />
                {/* Smile */}
                <path
                  d="M12 21C14 24 22 24 24 21"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <span className="font-bold text-slate-200">
                {lang === 'ur' ? 'رہنما استاد' : 'Practice Coach'}
              </span>
              <span className="text-[11px] text-slate-400 block">
                {lang === 'ur'
                  ? `مرحلہ ${stepIndex + 1} از ${totalSteps}`
                  : `Step ${stepIndex + 1} of ${totalSteps}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Replay Audio */}
            <button
              type="button"
              onClick={replayVoice}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition"
              title="Repeat instructions"
            >
              <Volume2 className="w-4 h-4 text-blue-300" />
            </button>

            {/* Mute toggle */}
            <button
              type="button"
              onClick={toggleVoice}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition"
              title="Toggle voice"
            >
              {voiceMuted ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            {/* Exit Lesson */}
            <button
              type="button"
              onClick={onExit}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/40 text-slate-300 hover:text-white transition"
              title="Exit Lesson"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gentle Wrong Tap Hint Alert */}
        {wrongTapAlert && (
          <div className="mb-2 p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {lang === 'ur'
                ? 'یہ والا نہیں، چمکتے ہوئے بٹن کو دبائیں۔'
                : 'Not this one! Tap the highlighted button.'}
            </span>
          </div>
        )}

        {/* Try Mode "Need Help?" trigger */}
        {mode === 'try' && !showTryHint && (
          <div className="my-2 flex items-center justify-between bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-300">
              {lang === 'ur'
                ? 'خود کوشش کریں، یا مدد لیں'
                : 'Try finding the button on your own'}
            </span>
            <button
              type="button"
              onClick={onNeedHelp}
              className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? 'مدد چاہیے؟' : 'Need help?'}</span>
            </button>
          </div>
        )}

        {/* Step Instruction text: large (18-20px) font, RTL safe */}
        <div
          className={`text-lg sm:text-[19px] font-semibold leading-relaxed my-2.5 ${
            lang === 'ur' ? 'font-urdu text-right text-xl leading-loose' : 'text-left'
          }`}
        >
          {t(step?.text)}
        </div>

        {/* Navigation bottom bar inside Coach Panel */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          {/* Back Step */}
          <button
            type="button"
            onClick={onPrev}
            disabled={stepIndex === 0}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
              stepIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-500'
                : 'bg-white/10 hover:bg-white/20 text-slate-200 active:scale-95'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'ur' ? 'پیچھے' : 'Back'}</span>
          </button>

          {/* Next / Finish Button */}
          {(isInfo || isType || isLast) && (
            <button
              type="button"
              onClick={onNext}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 shadow-lg active:scale-95 transition ${
                isLast
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              <span>
                {isLast
                  ? lang === 'ur'
                    ? 'مکمل کریں'
                    : 'Finish'
                  : lang === 'ur'
                  ? 'آگے بڑھیں'
                  : 'Next'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
