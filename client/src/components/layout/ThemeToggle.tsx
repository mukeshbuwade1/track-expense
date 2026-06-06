import { memo, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';

const buttonClass = 'p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors';

export const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useThemeStore();
  const handleToggle = useCallback(() => toggleTheme(), [toggleTheme]);

  return (
    <button className={buttonClass} onClick={handleToggle} aria-label="Toggle theme" title="Toggle dark mode">
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
