'use client';

import { ReactNode, useState } from 'react';
import { Box, HStack } from '@gluestack-ui/themed';
import { SideNav } from './SideNav';
import { TopBar } from './TopBar';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <HStack height="100vh" overflow="hidden" bgColor="rgba(12, 19, 32, 0.96)">
      <SideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      <Box flex={1} position="relative" overflow="hidden">
        <TopBar onToggleNav={() => setIsNavOpen((prev) => !prev)} />
        <Box
          as="main"
          px="$10"
          pb="$10"
          pt="$28"
          overflowY="auto"
          height="100%"
          bgColor="rgba(10, 17, 30, 0.5)"
          style={{ backdropFilter: 'blur(18px)' }}
        >
          {children}
        </Box>
      </Box>
    </HStack>
  );
}
