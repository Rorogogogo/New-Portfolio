'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useSettingsContext } from 'src/components/settings';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const settings = useSettingsContext();
  const [currentPage, setCurrentPage] = useState('home');

  const isDarkMode = settings.themeMode === 'dark';

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    settings.onUpdate('themeMode', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      currentPage, 
      setCurrentPage
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}