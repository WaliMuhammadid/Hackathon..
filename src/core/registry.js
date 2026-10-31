import { demoApp } from './_demo/demoApp';

// Auto-discovers apps via Vite glob
const modules = import.meta.glob('../apps/*/index.js', { eager: true });

const discoveredApps = Object.values(modules).map((mod) => mod.default || mod);

// If no apps discovered, fallback to demoApp
export const apps = discoveredApps.length > 0 ? discoveredApps : [demoApp];

export function getAppById(id) {
  if (id === '_demo') return demoApp;
  return apps.find((app) => app.id === id);
}
