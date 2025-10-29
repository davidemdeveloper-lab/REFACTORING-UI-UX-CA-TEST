'use client';

import React, { useEffect } from 'react';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AccentProvider, useAccent } from './accent-provider';

const ThemeSurface = ({ children }: { children: React.ReactNode }) => {
  const { accent, mode } = useAccent();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  return (
    <GluestackUIProvider mode={mode}>
      <div
        className="min-h-screen w-full bg-gradient-to-br from-[#0c1018] via-[#141a26] to-[#1b1f2b] text-typography-900 transition-colors duration-500 dark:from-[#050608] dark:via-[#0c0f18] dark:to-[#111520]"
        style={{
          ['--accent-color' as string]: accent.value,
          ['--accent-gradient' as string]: accent.gradient,
          ['--accent-glow' as string]: accent.glow,
        }}
      >
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div
              className="absolute -left-40 top-24 h-72 w-72 rounded-full blur-3xl"
              style={{ background: accent.gradient }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.04),transparent_55%)]" />
          </div>
          <div className="relative z-10 text-typography-900 dark:text-typography-100">
            {children}
          </div>
        </div>
      </div>
    </GluestackUIProvider>
  );
};

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AccentProvider>
      <ThemeSurface>{children}</ThemeSurface>
    </AccentProvider>
  );
};
