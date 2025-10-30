'use client';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { MotionConfig } from 'framer-motion';
import { gluestackConfig } from '@/theme/gluestack-config';
import { ReactNode, useEffect, useState } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setShouldReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return (
    <GluestackUIProvider config={gluestackConfig} colorMode="light">
      <MotionConfig reducedMotion={shouldReduceMotion ? 'always' : 'never'}>
        {children}
      </MotionConfig>
    </GluestackUIProvider>
  );
}
