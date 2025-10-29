'use client';

import { Provider } from 'react-redux';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { store } from '@/features/store';
import { gluestackTheme } from '@/theme/gluestack-theme';
import { tokens } from '@/theme/tokens';
import { palette } from '@/theme/palette';
import { Box } from '@gluestack-ui/themed';
import { useEffect } from 'react';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  useEffect(() => {
    document.body.style.background = tokens.gradients.metalSheen;
    document.body.style.color = palette.neutrals.offwhite;
  }, []);

  return (
    <Provider store={store}>
      <GluestackUIProvider config={gluestackTheme} colorMode="dark">
        <Box flex={1}>{children}</Box>
      </GluestackUIProvider>
    </Provider>
  );
};
