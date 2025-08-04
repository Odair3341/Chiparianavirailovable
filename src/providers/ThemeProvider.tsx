import React, { createContext, useContext } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface ThemeProviderContext {
  theme: 'dark' | 'light' | 'system';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
}

const ThemeProviderContext = createContext<ThemeProviderContext | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <ThemeProviderContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
