'use client';

import { ReactNode } from 'react';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { AppSidebar } from './AppSidebar';
import { AppTopbar } from './AppTopbar';
import { Box } from '@/components/ui/box';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <HStack style={{ width: '100%', backgroundColor: 'transparent', height: '100vh' } as any}>
      <AppSidebar />
      <VStack style={{ flex: 1, height: '100%' } as any}>
        <AppTopbar />
        <Box
          style={{
            flex: 1,
            overflow: 'auto',
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 28,
            paddingBottom: 28,
          } as any}
        >
          {children}
        </Box>
      </VStack>
    </HStack>
  );
}
