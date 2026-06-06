import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { useThemeStore } from './store/themeStore';

const initTheme = () => {
  const stored = localStorage.getItem('theme-storage');
  if (stored) {
    try {
      const { state } = JSON.parse(stored) as { state: { theme: string } };
      if (state.theme === 'dark') document.documentElement.classList.add('dark');
    } catch {
      /* ignore */
    }
  }
};

initTheme();

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Sync theme after store hydration
useThemeStore.getState().setTheme(useThemeStore.getState().theme);
