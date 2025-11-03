'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { store } from '@/store';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <GluestackUIProvider mode="light">{children}</GluestackUIProvider>
    </Provider>
  );
}

