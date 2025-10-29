'use client';

import { PropsWithChildren } from 'react';
import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';
import { Box } from '@/components/ui/box';

export const AppShell = ({ children }: PropsWithChildren) => {
  return (
    <Box className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <Box className="flex h-full flex-1 flex-col overflow-hidden">
        <TopBar />
        <Box className="flex-1 overflow-y-auto px-10 py-10">
          <Box className="mx-auto flex w-full max-w-[1680px] flex-col gap-10 pb-32">
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Validazione: l'AppShell fornisce layout master con sidebar e topbar coerente con navigazione richiesta e scroll fluido.
