'use client';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { metalGlassyConfig } from '@/theme/config';
import StyledJsxRegistry from './registry';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledJsxRegistry>
      <GluestackUIProvider config={metalGlassyConfig}>{children}</GluestackUIProvider>
    </StyledJsxRegistry>
  );
}
