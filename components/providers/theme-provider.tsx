'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  GluestackUIProvider,
  type ModeType,
} from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import type { AccentTone } from '@/lib/types';

type ThemeContextValue = {
  mode: ModeType;
  accent: AccentTone;
  accentIntensity: number;
  setAccent: (tone: AccentTone) => void;
  setAccentIntensity: (value: number) => void;
  setMode: (mode: ModeType) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const ACCENT_MAP: Record<AccentTone, { primary: string; glow: string; glowAlpha: number }> = {
  aurora: {
    primary: '221 242 253',
    glow: '90 234 255',
    glowAlpha: 0.25,
  },
  sunset: {
    primary: '255 232 214',
    glow: '255 176 122',
    glowAlpha: 0.25,
  },
  lagoon: {
    primary: '214 255 236',
    glow: '83 221 189',
    glowAlpha: 0.22,
  },
  orchid: {
    primary: '240 222 255',
    glow: '198 141 255',
    glowAlpha: 0.28,
  },
  ember: {
    primary: '255 220 220',
    glow: '255 138 120',
    glowAlpha: 0.25,
  },
};

type ThemeProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = 'customer-automator-theme';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ModeType>('light');
  const [accent, setAccent] = useState<AccentTone>('aurora');
  const [accentIntensity, setAccentIntensity] = useState(0.75);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<ThemeContextValue>;
        if (parsed.mode) setMode(parsed.mode);
        if (parsed.accent) setAccent(parsed.accent as AccentTone);
        if (
          typeof parsed.accentIntensity === 'number' &&
          !Number.isNaN(parsed.accentIntensity)
        ) {
          setAccentIntensity(parsed.accentIntensity);
        }
      } catch (error) {
        console.error('Impossibile leggere il tema salvato', error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ mode, accent, accentIntensity }),
    );
  }, [mode, accent, accentIntensity]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const accentValues = ACCENT_MAP[accent];
    const clampedIntensity = Math.min(Math.max(accentIntensity, 0.4), 1);
    const surfaceAlpha = 0.05 + (clampedIntensity - 0.4) * 0.12;
    const borderAlpha = 0.25 + (clampedIntensity - 0.4) * 0.3;
    const glowAlpha = accentValues.glowAlpha * clampedIntensity;

    document.documentElement.style.setProperty(
      '--accent-surface',
      `rgba(${accentValues.primary} / ${surfaceAlpha.toFixed(2)})`,
    );
    document.documentElement.style.setProperty(
      '--accent-border',
      `rgba(${accentValues.primary} / ${borderAlpha.toFixed(2)})`,
    );
    document.documentElement.style.setProperty(
      '--accent-glow',
      `rgba(${accentValues.glow} / ${glowAlpha.toFixed(2)})`,
    );
    document.documentElement.style.setProperty(
      '--accent-intensity',
      clampedIntensity.toFixed(2),
    );
    document.documentElement.style.setProperty(
      '--accent-range-fill',
      `rgba(${accentValues.primary} / ${(0.35 + clampedIntensity * 0.4).toFixed(2)})`,
    );
  }, [accent, accentIntensity]);

  const toggleMode = () =>
    setMode((current) => (current === 'dark' ? 'light' : 'dark'));

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      accent,
      accentIntensity,
      setAccent,
      setAccentIntensity,
      setMode,
      toggleMode,
    }),
    [mode, accent, accentIntensity],
  );

  return (
    <ThemeContext.Provider value={value}>
      <GluestackUIProvider mode={mode}>
        <Box className="min-h-screen w-full bg-gradient-to-br from-background-50/70 via-background-0 to-background-200/60 dark:from-background-0 dark:via-background-100/70 dark:to-background-200/80">
          <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,var(--accent-glow)_0%,transparent_70%)] blur-3xl" />
              <div className="absolute bottom-0 right-[-12%] h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,var(--accent-glow)_0%,transparent_70%)] blur-3xl" />
            </div>
            {children}
          </div>
        </Box>
      </GluestackUIProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useThemeContext deve essere utilizzato all’interno di ThemeProvider',
    );
  }
  return context;
};
