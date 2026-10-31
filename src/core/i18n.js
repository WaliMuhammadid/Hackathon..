import { useStore } from './store';

export function useT() {
  const lang = useStore((state) => state.lang);
  
  return (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };
}

export function t(obj, lang = 'en') {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj['en'] || '';
}
