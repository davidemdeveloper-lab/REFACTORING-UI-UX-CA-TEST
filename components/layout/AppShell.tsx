'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { SidebarNav } from './SidebarNav';
import { TopBar } from './TopBar';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <Box className="app-shell flex flex-row min-h-screen">
      <SidebarNav />
      <VStack className="flex-1 relative pb-8">
        <TopBar />
        <Box className="flex-1 px-6 py-6 flex flex-col gap-6 text-primary">
          {children}
        </Box>
      </VStack>
    </Box>
  );
};
