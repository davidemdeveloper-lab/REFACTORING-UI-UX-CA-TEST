'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { SidebarNav } from './SidebarNav';
import { TopBar } from './TopBar';
import { palette } from '@/theme/palette';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const pageTitle = useMemo(() => {
    if (!pathname) return 'Customer Automator';
    if (pathname === '/dashboard') return 'Dashboard';
    if (pathname.startsWith('/clients/add')) return 'Aggiungi Cliente';
    if (pathname.startsWith('/clients/')) return 'Dettaglio Cliente';
    if (pathname.startsWith('/clients')) return 'Lista Clienti';
    if (pathname.startsWith('/bookings/') && pathname !== '/bookings')
      return 'Dettaglio Prenotazione';
    if (pathname.startsWith('/bookings')) return 'Lista Prenotazioni';
    if (pathname.startsWith('/templates/') && pathname !== '/templates')
      return 'Editor Template';
    if (pathname.startsWith('/templates')) return 'Template Email';
    if (pathname.startsWith('/chat')) return 'Chat & notifiche AI';
    return 'Customer Automator';
  }, [pathname]);

  return (
    <Box className="h-screen w-screen flex-row bg-transparent text-white">
      <SidebarNav activePath={pathname ?? ''} />
      <VStack className="flex-1">
        <TopBar title={pageTitle} />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 32,
            paddingBottom: 48,
            paddingTop: 24,
            minHeight: '100%',
            gap: 24,
            backgroundColor: 'transparent',
          }}
        >
          <Box
            className="rounded-3xl glass-panel px-8 py-10"
            style={{
              backgroundColor: palette.background.elevated,
            }}
          >
            {children}
          </Box>
        </ScrollView>
      </VStack>
    </Box>
  );
}
