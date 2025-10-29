'use client';

import { GluestackUIProvider, ModeType } from '@/components/ui/gluestack-ui-provider';
import { accentOptions, AccentTone } from '@/lib/data';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEYS = {
  accent: 'ca-theme-accent',
  mode: 'ca-theme-mode',
};

type ThemeContextValue = {
  accent: AccentTone;
  setAccent: (tone: AccentTone) => void;
  mode: ModeType;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useThemeSettings() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeSettings deve essere utilizzato all\'interno di ThemeProvider');
  }
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccent] = useState<AccentTone>('aurora');
  const [mode, setMode] = useState<ModeType>('dark');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedAccent = window.localStorage.getItem(STORAGE_KEYS.accent) as AccentTone | null;
    const storedMode = window.localStorage.getItem(STORAGE_KEYS.mode) as ModeType | null;
    if (storedAccent && accentOptions[storedAccent]) {
      setAccent(storedAccent);
    }
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const accentPalette = accentOptions[accent];
    const root = document.documentElement;
    root.style.setProperty('--accent-solid', accentPalette.hex);
    root.style.setProperty('--accent-soft', accentPalette.highlight);
    root.setAttribute('data-accent', accent);
    window.localStorage.setItem(STORAGE_KEYS.accent, accent);
  }, [accent]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('data-mode', mode);
    window.localStorage.setItem(STORAGE_KEYS.mode, mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      accent,
      setAccent,
      mode,
      toggleMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [accent, mode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <GluestackUIProvider mode={mode}>
        <div className="min-h-screen font-sans text-typography-50 transition-colors duration-500">
          {children}
        </div>
      </GluestackUIProvider>
    </ThemeContext.Provider>
  );
}
