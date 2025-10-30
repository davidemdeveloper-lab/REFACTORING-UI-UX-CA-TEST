'use client';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type AccentOption = 'aurora' | 'ember' | 'royal' | 'moss';
export type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  accent: AccentOption;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setAccent: (accent: AccentOption) => void;
  accentMeta: Record<AccentOption, { label: string; description: string; preview: string }>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const ACCENT_META: ThemeContextValue['accentMeta'] = {
  aurora: {
    label: 'Aurora',
    description: 'Toni ciano ispirati all\'aurora boreale',
    preview: 'from-teal-400 via-cyan-500 to-blue-500',
  },
  ember: {
    label: 'Ember',
    description: 'Accenti caldi e cremosi',
    preview: 'from-amber-400 via-orange-500 to-rose-500',
  },
  royal: {
    label: 'Royal',
    description: 'Gradiente violaceo elegante',
    preview: 'from-indigo-400 via-violet-500 to-sky-500',
  },
  moss: {
    label: 'Moss',
    description: 'Verdi morbidi e naturali',
    preview: 'from-emerald-400 via-green-500 to-lime-400',
  },
};

const STORAGE_MODE_KEY = 'ca-theme-mode';
const STORAGE_ACCENT_KEY = 'ca-theme-accent';

function readStoredValue<T extends string>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const stored = window.localStorage.getItem(key);
  if (!stored) return fallback;
  return (stored as T) ?? fallback;
}

function applyDataAttributes(mode: ThemeMode, accent: AccentOption) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.dataset.mode = mode;
  root.dataset.accent = accent;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => readStoredValue(STORAGE_MODE_KEY, 'dark'));
  const [accent, setAccentState] = useState<AccentOption>(() =>
    readStoredValue(STORAGE_ACCENT_KEY, 'aurora')
  );

  useEffect(() => {
    applyDataAttributes(mode, accent);
  }, [mode, accent]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_ACCENT_KEY, accent);
  }, [accent]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setAccent = useCallback((next: AccentOption) => {
    setAccentState(next);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, accent, setMode, toggleMode, setAccent, accentMeta: ACCENT_META }),
    [mode, accent, setMode, toggleMode, setAccent]
  );

  return (
    <ThemeContext.Provider value={value}>
      <GluestackUIProvider mode={mode}>
        <div className="min-h-screen w-full bg-transparent text-base text-typography-0">
          {children}
        </div>
      </GluestackUIProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeAccent() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeAccent deve essere usato dentro ThemeProvider');
  }
  return ctx;
}

