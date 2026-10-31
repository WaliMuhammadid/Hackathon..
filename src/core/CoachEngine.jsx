import React, { useEffect, useState, useRef } from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import { speak } from './tts';
import { Volume2, VolumeX, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

export default function CoachEngine({ containerRef }) {
  const t = useT();
  const {
    activeLesson,
    stepIndex,
    nextStep,
    completeLesson,
    lang,
    voiceEnabled,
    toggleVoice,
  } = useStore();

  const [highlightStyle, setHighlightStyle] = useState(null);
  const [targetFound, setTargetFound] = useState(false);
  const observerRef = useRef(null);

  const step = activeLesson?.steps?.[stepIndex];
  const isLastStep = activeLesson && stepIndex === activeLesson.steps.length - 1;

  // Speak instruction whenever step changes or language changes
  useEffect(() => {
    if (!step) return;
    const instructionText = t(step.text);
    if (voiceEnabled && instructionText) {
      speak(instructionText, lang);
    }
  }, [step, lang, voiceEnabled, stepIndex]);

  // Monitor target element in DOM
  useEffect(() => {
    if (!activeLesson || !step) {
      setHighlightStyle(null);
      setTargetFound(false);
      return;
    }

    const targetId = step.target;
    if (!targetId) {
      setHighlightStyle(null);
      setTargetFound(true);
      return;
    }

    const updateTargetPosition = () => {
      const container = containerRef.current;
      if (!container) return;

      const element = container.querySelector(`[data-coach="${targetId}"]`);
      if (element) {
        setTargetFound(true);
        const containerRect = container.getBoundingClientRect();
        const elemRect = element.getBoundingClientRect();

        setHighlightStyle({
          top: elemRect.top - containerRect.top,
          left: elemRect.left - containerRect.left,
          width: elemRect.width,
          height: elemRect.height,
        });

        // Add visual class
        element.classList.add(step.warn ? 'coach-target-warn' : 'coach-target-active');
        return () => {
          element.classList.remove('coach-target-active', 'coach-target-warn');
        };
      } else {
        setTargetFound(false);
        setHighlightStyle(null);
      }
    };

    const cleanupTarget = updateTargetPosition();

    // Set up MutationObserver to re-evaluate when DOM updates
    const observer = new MutationObserver(() => {
      updateTargetPosition();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    observerRef.current = observer;

    return () => {
      if (cleanupTarget) cleanupTarget();
      observer.disconnect();
    };
  }, [step, activeLesson, containerRef]);

  // Handle tap / type listeners on target
  useEffect(() => {
    if (!step || !step.target || !containerRef.current) return;

    const container = containerRef.current;
    let targetEl = null;

    const handleTap = (e) => {
      // Advance step on click
      setTimeout(() => {
        nextStep();
      }, 150);
    };

    const handleInput = (e) => {
      if (step.action === 'type') {
        const val = e.target.value || '';
        const minLen = step.minLength || 1;
        if (val.trim().length >= minLen) {
          // Coach allows manual advance or auto advance
        }
      }
    };

    // Attach listener when element becomes available
    const interval = setInterval(() => {
      targetEl = container.querySelector(`[data-coach="${step.target}"]`);
      if (targetEl) {
        if (step.action === 'tap') {
          targetEl.addEventListener('click', handleTap, { once: true });
        } else if (step.action === 'type') {
          targetEl.addEventListener('input', handleInput);
        }
        clearInterval(interval);
      }
    }, 200);

    return () => {
      clearInterval(interval);
      if (targetEl) {
        targetEl.removeEventListener('click', handleTap);
        targetEl.removeEventListener('input', handleInput);
      }
    };
  }, [step, nextStep, containerRef]);

  if (!activeLesson || !step) return null;

  const isWarn = !!step.warn;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex flex-col justify-end">
      {/* Target Spotlight Highlight Box */}
      {highlightStyle && (
        <div
          className={`absolute rounded-xl transition-all duration-300 pointer-events-none ${
            isWarn
              ? 'ring-4 ring-red-500 shadow-[0_0_25px_rgba(239,68,68,0.7)]'
              : 'ring-4 ring-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.7)] bg-blue-400/10'
          }`}
          style={{
            top: `${highlightStyle.top}px`,
            left: `${highlightStyle.left}px`,
            width: `${highlightStyle.width}px`,
            height: `${highlightStyle.height}px`,
          }}
        >
          {/* Animated pulsing finger pointer icon */}
          <div className="absolute -top-10 -right-5 animate-bounce text-2xl drop-shadow-lg select-none">
            👉
          </div>
        </div>
      )}

      {/* Floating Coach Instruction Bubble at Bottom */}
      <div className="p-4 pointer-events-auto">
        <div
          className={`rounded-2xl p-4 shadow-2xl backdrop-blur-md border transition-all ${
            isWarn
              ? 'bg-red-950/90 text-white border-red-500/50'
              : 'bg-slate-900/95 text-white border-blue-500/30'
          }`}
        >
          {/* Header with Step count and Sound toggle */}
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 pb-1 border-b border-white/10">
            <span className="font-semibold flex items-center gap-1.5">
              {isWarn ? (
                <AlertTriangle className="w-4 h-4 text-red-400" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              )}
              {lang === 'ur'
                ? `مرحلہ ${stepIndex + 1} از ${activeLesson.steps.length}`
                : `Step ${stepIndex + 1} of ${activeLesson.steps.length}`}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => speak(t(step.text), lang)}
                className="p-1 hover:bg-white/10 rounded-full transition"
                title="Repeat voice"
              >
                <Volume2 className="w-4 h-4 text-blue-300" />
              </button>
              <button
                type="button"
                onClick={toggleVoice}
                className="p-1 hover:bg-white/10 rounded-full transition"
                title="Toggle Voice"
              >
                {voiceEnabled ? (
                  <Volume2 className="w-4 h-4 text-green-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Coach text with larger accessible font */}
          <div
            className={`text-lg font-medium leading-relaxed my-2 ${
              lang === 'ur' ? 'font-urdu text-right text-xl leading-loose' : 'text-left'
            }`}
          >
            {t(step.text)}
          </div>

          {/* Actions / Next button */}
          <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-white/10">
            {step.action === 'info' || step.action === 'type' || isLastStep ? (
              <button
                type="button"
                onClick={nextStep}
                className={`px-4 py-2 rounded-xl text-base font-bold flex items-center gap-2 shadow-lg transition active:scale-95 ${
                  isLastStep
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                <span>
                  {isLastStep
                    ? lang === 'ur'
                      ? 'مکمل کریں'
                      : 'Finish Lesson'
                    : lang === 'ur'
                    ? 'اگلا مرحلہ'
                    : 'Next'}
                </span>
                {isLastStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
