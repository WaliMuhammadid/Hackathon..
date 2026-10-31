import React, { useEffect } from 'react';
import { useStore } from './store';
import WebNavbar from './WebNavbar';
import WebHomeScreen from './WebHomeScreen';
import PracticeStage from './PracticeStage';
import ProgressScreen from './ProgressScreen';

/**
 * Main Shell for Practice Web Portal
 * Coordinates routing between the Web Dashboard (#/) and the dedicated Practice Stage (#/stage).
 * Simulated apps open ONLY inside the Phone Frame on the Practice Stage.
 */
export default function WebShell() {
  const {
    activeApp,
    exitApp,
    showProgress,
    setShowProgress,
  } = useStore();

  // Sync route hash with activeApp state
  useEffect(() => {
    if (activeApp) {
      if (window.location.hash !== '#/stage') {
        window.location.hash = '#/stage';
      }
    } else {
      if (window.location.hash === '#/stage') {
        window.location.hash = '#/';
      }
    }
  }, [activeApp]);

  // Handle browser back / forward navigation via hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const currentActive = useStore.getState().activeApp;

      if (hash !== '#/stage' && currentActive) {
        // User pressed browser back button from stage to dashboard
        exitApp();
      } else if (hash === '#/stage' && !currentActive) {
        // Direct entry to #/stage without an app reverts to dashboard
        window.location.hash = '#/';
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial verification
    if (window.location.hash === '#/stage' && !activeApp) {
      window.location.hash = '#/';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [exitApp, activeApp]);

  // If an app is launched, render the Practice Stage
  if (activeApp) {
    return <PracticeStage />;
  }

  // Otherwise, render the standard responsive Web Dashboard
  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col text-white font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Universal Web Navbar */}
      <WebNavbar />

      {/* Responsive Dashboard Page */}
      <main className="flex-1 w-full flex flex-col overflow-y-auto">
        <WebHomeScreen />
      </main>

      {/* Global Progress Modal */}
      {showProgress && (
        <ProgressScreen onClose={() => setShowProgress(false)} />
      )}
    </div>
  );
}
