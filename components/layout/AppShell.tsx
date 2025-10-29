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
    <HStack w="100%" bg="transparent" style={{ height: '100vh' }}>
      <AppSidebar />
      <VStack flex={1} style={{ height: '100%' }}>
        <AppTopbar />
        <Box flex={1} overflow="auto" px={32} py={28}>
          {children}
        </Box>
      </VStack>
    </HStack>
  );
}
