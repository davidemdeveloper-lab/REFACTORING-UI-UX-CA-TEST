'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { ScrollView } from '@/components/ui/scroll-view';
import {
  DashboardIcon,
  ReservationsIcon,
  GuestsIcon,
  TemplatesIcon,
  NewsletterIcon,
  ChatIcon,
  AutomationIcon,
  PortalIcon,
} from './icons';
import { useThemeContext } from '@/components/providers/theme-provider';
import { AccentSelector } from './accent-selector';
import { ThemeToggle } from './theme-toggle';

const NAVIGATION = [
  { label: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
  { label: 'Prenotazioni', href: '/bookings', icon: ReservationsIcon },
  { label: 'Clienti', href: '/clients', icon: GuestsIcon },
  { label: 'Chat Assistita', href: '/chat', icon: ChatIcon },
  { label: 'Newsletter', href: '/newsletter', icon: NewsletterIcon },
  { label: 'Template Email', href: '/templates', icon: TemplatesIcon },
  { label: 'Workflow & IoT', href: '/automation', icon: AutomationIcon },
  { label: 'Area Ospite', href: '/guest-portal', icon: PortalIcon },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { mode } = useThemeContext();

  const groupedNav = useMemo(
    () => ({
      primary: NAVIGATION.slice(0, 4),
      secondary: NAVIGATION.slice(4),
    }),
    [],
  );

  return (
    <HStack className="relative h-full min-h-screen w-full gap-0 overflow-hidden">
      <Box className="hidden shrink-0 border-r border-white/5 bg-background-0/80 backdrop-blur-xl dark:bg-background-50/80 lg:block lg:w-[270px]">
        <Box className="flex flex-col gap-8 px-6 pb-6 pt-8">
          <Box className="glass-panel rounded-3xl px-5 py-6 text-left shadow-soft-2">
            <Text className="font-[var(--font-space-grotesk)] text-xs uppercase tracking-[0.3em] text-primary-700/70 dark:text-primary-200/70">
              Customer Automator
            </Text>
            <Text className="mt-2 font-[var(--font-space-grotesk)] text-2xl text-primary-800 dark:text-typography-900">
              Suite Concierge
            </Text>
            <Text className="mt-3 text-sm text-typography-400 dark:text-typography-500">
              Una cabina di regia per ospitalità predittiva e conversazioni senza attriti.
            </Text>
          </Box>

          <Box className="flex flex-col gap-6">
            <Box>
              <Text className="text-[11px] uppercase tracking-[0.3em] text-typography-400/80 dark:text-typography-500/80">
                Navigazione
              </Text>
              <VStack space="md" className="mt-4">
                {groupedNav.primary.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href}>
                      <HStack
                        space="md"
                        className={`group rounded-2xl border border-transparent px-4 py-3 transition-all ${
                          isActive
                            ? 'glass-panel border-primary-300/60 shadow-soft-2'
                            : 'hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <Icon
                          className={`transition-colors ${
                            isActive
                              ? 'text-primary-700 dark:text-primary-200'
                              : 'text-typography-500 dark:text-typography-400'
                          }`}
                        />
                        <Box className="flex flex-1 flex-col">
                          <Text
                            className={`text-sm font-semibold ${
                              isActive
                                ? 'text-primary-700 dark:text-typography-900'
                                : 'text-typography-600 dark:text-typography-500'
                            }`}
                          >
                            {item.label}
                          </Text>
                          <Text className="text-[11px] text-typography-400/80">
                            {isActive
                              ? 'In evidenza'
                              : 'Riepiloghi e attività in tempo reale'}
                          </Text>
                        </Box>
                      </HStack>
                    </Link>
                  );
                })}
              </VStack>
            </Box>

            <Divider className="border-white/10" />

            <Box>
              <Text className="text-[11px] uppercase tracking-[0.3em] text-typography-400/80 dark:text-typography-500/80">
                Strumenti
              </Text>
              <VStack space="md" className="mt-4">
                {groupedNav.secondary.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href}>
                      <HStack
                        space="md"
                        className={`group rounded-2xl border border-transparent px-4 py-3 transition-all ${
                          isActive
                            ? 'glass-panel border-primary-300/60 shadow-soft-2'
                            : 'hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <Icon
                          className={`transition-colors ${
                            isActive
                              ? 'text-primary-700 dark:text-primary-200'
                              : 'text-typography-500 dark:text-typography-400'
                          }`}
                        />
                        <Text
                          className={`text-sm font-semibold ${
                            isActive
                              ? 'text-primary-700 dark:text-typography-900'
                              : 'text-typography-600 dark:text-typography-500'
                          }`}
                        >
                          {item.label}
                        </Text>
                      </HStack>
                    </Link>
                  );
                })}
              </VStack>
            </Box>

            <Box className="glass-panel rounded-3xl px-5 py-4">
              <Text className="text-xs uppercase tracking-[0.3em] text-typography-400/80 dark:text-typography-500/80">
                Personalizzazione
              </Text>
              <Box className="mt-3 flex flex-col gap-4">
                <ThemeToggle />
                <AccentSelector />
              </Box>
              <Text className="mt-4 text-xs text-typography-400/80">
                Tema {mode === 'dark' ? 'notturno' : 'diurno'} con accenti dinamici per
                adattarsi allo stile della struttura.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="flex-1 overflow-hidden">
        <ScrollView className="h-full" contentContainerStyle={{ minHeight: '100%' }}>
          <Box className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col gap-10 px-4 pb-12 pt-8 sm:px-8">
            {children}
          </Box>
        </ScrollView>
      </Box>
    </HStack>
  );
}

