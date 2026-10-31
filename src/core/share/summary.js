import { apps } from '../registry';

/**
 * Builds a compact, privacy-safe JSON summary from the progress store.
 * Never includes real contact info, phone numbers, or device data.
 */
export function buildSummary(progress, options = {}) {
  const safeProgress = progress || {};
  const completedLessonsMap = safeProgress.lessons || {};

  // All lessons flattened to match titles and app groupings
  const allLessons = apps.flatMap((app) =>
    (app.lessons || []).map((l) => ({ ...l, appId: app.id }))
  );

  const lessonsTotal = allLessons.length;
  const lessonsDone = Object.values(completedLessonsMap).filter(
    (l) => l && l.completed
  ).length;

  const stars = typeof safeProgress.stars === 'number' ? safeProgress.stars : 0;
  const badges = Array.isArray(safeProgress.badges) ? safeProgress.badges : [];

  // Per-app progress breakdown
  const perApp = {};
  apps.forEach((app) => {
    const appLessons = app.lessons || [];
    const doneCount = appLessons.filter(
      (l) => completedLessonsMap[l.id]?.completed
    ).length;
    perApp[app.id] = {
      done: doneCount,
      total: appLessons.length,
    };
  });

  // Recent completed lessons (last 5 sorted by timestamp)
  const completedList = Object.entries(completedLessonsMap)
    .filter(([_, data]) => data && data.completed)
    .map(([id, data]) => {
      const lessonDef = allLessons.find((l) => l.id === id);
      return {
        lessonId: id,
        timestamp: data.timestamp || 0,
        stars: data.stars || 3,
        title: {
          en: lessonDef?.title?.en || id,
          ur: lessonDef?.title?.ur || id,
        },
      };
    })
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5)
    .map((item) => ({
      lessonId: item.lessonId,
      title: item.title,
      stars: item.stars,
    }));

  // Sanitize first name (optional, max 20 chars, single word / first name)
  let firstName = null;
  if (options.name && typeof options.name === 'string') {
    const trimmed = options.name.trim().split(/\s+/)[0];
    if (trimmed) {
      firstName = trimmed.slice(0, 20);
    }
  }

  // Scam Quiz score: check if stored or default from SMS lessons
  let scamQuiz = null;
  if (safeProgress.scamQuiz && typeof safeProgress.scamQuiz.score === 'number') {
    scamQuiz = {
      score: safeProgress.scamQuiz.score,
      total: safeProgress.scamQuiz.total || 8,
    };
  } else {
    // If user completed any SMS scam lessons, provide rule-based score
    const smsDone = perApp.sms?.done || 0;
    if (smsDone > 0) {
      scamQuiz = {
        score: Math.min(8, 4 + smsDone * 2),
        total: 8,
      };
    }
  }

  return {
    v: 1,
    name: firstName,
    lang: options.lang === 'ur' ? 'ur' : 'en',
    date: new Date().toISOString(),
    lessonsDone,
    lessonsTotal,
    stars,
    badges,
    perApp,
    scamQuiz,
    recent: completedList,
  };
}

/**
 * Encodes summary object to URL-safe base64 string.
 * Keeps output under ~1.5 KB.
 */
export function encodeSummary(data) {
  try {
    const jsonStr = JSON.stringify(data);
    const encoded = encodeURIComponent(jsonStr);
    const base64 = btoa(unescape(encoded));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (err) {
    console.error('Failed to encode summary:', err);
    return '';
  }
}

/**
 * Decodes and validates URL-safe base64 summary.
 * Returns null if token is corrupted or invalid.
 */
export function decodeSummary(token) {
  if (!token || typeof token !== 'string') return null;
  try {
    let base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const unescaped = atob(base64);
    const jsonStr = decodeURIComponent(escape(unescaped));
    const data = JSON.parse(jsonStr);

    // Validate format
    if (!data || data.v !== 1) return null;
    if (typeof data.lessonsDone !== 'number' || typeof data.lessonsTotal !== 'number') {
      return null;
    }
    return data;
  } catch (err) {
    console.error('Failed to decode summary:', err);
    return null;
  }
}

/**
 * Constructs full report URL from data token.
 */
export function getReportUrl(token) {
  if (typeof window === 'undefined') return `#/report/${token}`;
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  return `${origin}${pathname}#/report/${token}`;
}

/**
 * Builds pre-written friendly WhatsApp / sharing message in English or Urdu.
 */
export function getShareMessage(summary, familyName = '', shareUrl = '', lang = 'en') {
  const done = summary.lessonsDone || 0;
  const total = summary.lessonsTotal || 0;
  const stars = summary.stars || 0;
  const trimmedFamily = familyName?.trim() || '';

  if (lang === 'ur') {
    const greeting = trimmedFamily
      ? `السلام علیکم ${trimmedFamily}!`
      : 'السلام علیکم!';
    return `${greeting} میں پریکٹس فون پر موبائل اسکلز کی مشق کر رہا/رہی ہوں۔ میں نے ${total} میں سے ${done} اسباق مکمل کر لیے ہیں اور ${stars} ⭐ ستارے حاصل کیے ہیں۔ میری پیش رفت دیکھیں: ${shareUrl}`;
  }

  const greeting = trimmedFamily
    ? `Assalam o Alaikum ${trimmedFamily}!`
    : 'Assalam o Alaikum!';
  return `${greeting} I've been practising my phone skills on Practice Phone. I finished ${done} of ${total} lessons and earned ${stars} ⭐. See my progress: ${shareUrl}`;
}
