'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { SidebarNav } from './SidebarNav';
import { TopBar } from './TopBar';
import { palette, gradients } from '@/design/palette';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <Box
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: gradients.hero,
        color: palette.textPrimary,
      }}
    >
      <SidebarNav />
      <Box className="flex-1" style={{ position: 'relative', paddingBottom: 32 }}>
        <TopBar />
        <Box
          className="px-6 py-6"
          style={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
