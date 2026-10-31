// Auto-discovers apps via Vite glob
const modules = import.meta.glob('../apps/*/index.js', { eager: true });

export const apps = Object.values(modules).map((mod) => mod.default || mod);

export function getAppById(id) {
  return apps.find((app) => app.id === id);
}
