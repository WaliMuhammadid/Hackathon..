import React, { useEffect, useState } from 'react';
import { useStore } from './store';
import WebNavbar from './WebNavbar';
import WebHomeScreen from './WebHomeScreen';
import PracticeStage from './PracticeStage';
import ProgressScreen from './ProgressScreen';
import ShareSheet from './share/ShareSheet';
import FamilyReport from './share/FamilyReport';

/**
 * Main Shell for Practice Web Portal
 * Coordinates routing between:
 * 1. Web Dashboard (#/)
 * 2. Dedicated Practice Stage (#/stage)
 * 3. Read-only Family Report (#/report/<data>)
 */
export default function WebShell() {
  const {
    activeApp,
    exitApp,
    showProgress,
    setShowProgress,
    showShare,
    setShowShare,
  } = useStore();

  const [currentHash, setCurrentHash] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash : '#/'
  );

  // Sync route hash with activeApp state
  useEffect(() => {
    if (currentHash.startsWith('#/report/')) {
      return;
    }

    if (activeApp) {
      if (window.location.hash !== '#/stage') {
        window.location.hash = '#/stage';
      }
    } else {
      if (window.location.hash === '#/stage') {
        window.location.hash = '#/';
      }
    }
  }, [activeApp, currentHash]);

  // Handle browser back / forward navigation via hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentHash(hash);
      const currentActive = useStore.getState().activeApp;

      if (hash.startsWith('#/report/')) {
        if (currentActive) {
          exitApp();
        }
      } else if (hash !== '#/stage' && currentActive) {
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

  // 1. Read-only Family Report route: #/report/<data> (opens without dashboard chrome)
  if (currentHash.startsWith('#/report/')) {
    const dataToken = currentHash.slice('#/report/'.length);
    return <FamilyReport dataToken={dataToken} />;
  }

  // 2. Practice Stage view when an app is active
  if (activeApp) {
    return (
      <>
        <PracticeStage />
        {showShare && <ShareSheet onClose={() => setShowShare(false)} />}
      </>
    );
  }

  // 3. Responsive Web Dashboard
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

      {/* Global Share Sheet Modal */}
      {showShare && (
        <ShareSheet onClose={() => setShowShare(false)} />
      )}
    </div>
  );
}
