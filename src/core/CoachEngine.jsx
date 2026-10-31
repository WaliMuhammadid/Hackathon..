import React, { useEffect, useState, useRef } from 'react';
import { useStore } from './store';
import { useT } from './i18n';
import { voice } from './voice';
import Spotlight from './Spotlight';
import CoachPanel from './CoachPanel';
import CompletionScreen from './CompletionScreen';

export default function CoachEngine({ containerRef }) {
  const t = useT();
  const {
    activeLesson,
    stepIndex,
    mode,
    nextStep,
    prevStep,
    exitLesson,
    exitApp,
    launchApp,
    activeApp,
    recordMistake,
    triggerTryHint,
    showTryHint,
    wrongTapAlert,
    isCompleted,
    lang,
    voiceMuted,
  } = useStore();

  const [shakeSpotlight, setShakeSpotlight] = useState(false);
  const step = activeLesson?.steps?.[stepIndex];
  const targetId = step?.target;
  const isWarn = !!step?.warn;

  // Speak instruction on step change
  useEffect(() => {
    if (!step || isCompleted) return;
    // Auto-voice enabled in guided mode, or test mode if not muted
    if (mode === 'guided') {
      const textToSpeak = t(step.text);
      if (textToSpeak) {
        voice.speak(textToSpeak, lang);
      }
    }
  }, [step, lang, mode, isCompleted]);

  // Try mode 8-second idle timer
  useEffect(() => {
    if (mode !== 'try' || !activeLesson || showTryHint) return;

    const timer = setTimeout(() => {
      triggerTryHint();
    }, 8000);

    return () => clearTimeout(timer);
  }, [stepIndex, mode, activeLesson, showTryHint, triggerTryHint]);

  // Capture phase click listener for step advancement & wrong tap detection
  useEffect(() => {
    if (!step || !containerRef.current || isCompleted) return;

    const container = containerRef.current;

    const handleCaptureClick = (e) => {
      // Ignore clicks within coach panel itself
      if (e.target.closest('.pointer-events-auto')) return;

      if (step.action === 'tap') {
        const targetEl = container.querySelector(`[data-coach="${targetId}"]`);
        if (targetEl && (targetEl === e.target || targetEl.contains(e.target))) {
          // Correct tap!
          setTimeout(() => {
            nextStep();
          }, 150);
        } else {
          // Clicked somewhere else
          recordMistake();
          setShakeSpotlight(true);
          setTimeout(() => setShakeSpotlight(false), 500);
        }
      }
    };

    // Attach capture-phase listener
    container.addEventListener('click', handleCaptureClick, true);

    return () => {
      container.removeEventListener('click', handleCaptureClick, true);
    };
  }, [step, targetId, nextStep, recordMistake, containerRef, isCompleted]);

  // Type listener for 'type' steps
  useEffect(() => {
    if (!step || step.action !== 'type' || !containerRef.current) return;

    const container = containerRef.current;
    let inputEl = null;

    const handleInput = (e) => {
      const minLength = step.minLength || 1;
      if (e.target.value.trim().length >= minLength) {
        // Player entered required characters
      }
    };

    const interval = setInterval(() => {
      inputEl = container.querySelector(`[data-coach="${targetId}"]`);
      if (inputEl) {
        inputEl.addEventListener('input', handleInput);
        clearInterval(interval);
      }
    }, 150);

    return () => {
      clearInterval(interval);
      if (inputEl) {
        inputEl.removeEventListener('input', handleInput);
      }
    };
  }, [step, targetId, containerRef]);

  if (!activeLesson) return null;

  // Render Completion Screen if done
  if (isCompleted) {
    return (
      <CompletionScreen
        onRestart={() => launchApp(activeApp, activeLesson)}
        onExit={exitApp}
      />
    );
  }

  // Determine whether to display the spotlight
  // In guided mode: always
  // In try mode: only if user asked for help or idle 8s
  // In test mode: never
  const shouldShowSpotlight =
    targetId &&
    (mode === 'guided' || (mode === 'try' && showTryHint));

  return (
    <>
      {/* Spotlight Mask & Pulsing Finger */}
      {shouldShowSpotlight && (
        <Spotlight
          containerRef={containerRef}
          target={targetId}
          warn={isWarn}
          shake={shakeSpotlight}
        />
      )}

      {/* Floating Bottom Coach Panel */}
      <CoachPanel
        step={step}
        stepIndex={stepIndex}
        totalSteps={activeLesson.steps.length}
        warn={isWarn}
        wrongTapAlert={wrongTapAlert}
        showTryHint={showTryHint}
        mode={mode}
        onNext={nextStep}
        onPrev={prevStep}
        onExit={exitLesson}
        onNeedHelp={triggerTryHint}
      />
    </>
  );
}
