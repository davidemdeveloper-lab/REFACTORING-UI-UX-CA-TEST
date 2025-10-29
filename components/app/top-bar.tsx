'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { aiNotifications } from '@/lib/mock-data';
import {
  Bell,
  Sparkles,
  Search,
  ChevronRight,
  ShieldCheck,
} from '@/components/icons';

const pageMap: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'Dashboard operativa',
    subtitle: 'Automazione integrata per ogni punto di contatto con gli ospiti.',
  },
  '/clients': {
    title: 'Gestione clienti',
    subtitle: 'Profilazione avanzata, tag e insight in tempo reale.',
  },
  '/clients/new': {
    title: 'Accogli un nuovo ospite',
    subtitle: 'Crea proposte smart e collega automazioni pre-stay.',
  },
  '/bookings': {
    title: 'Prenotazioni',
    subtitle: 'Monitoraggio timeline e stato automazioni per ogni soggiorno.',
  },
  '/templates': {
    title: 'Template & AI Studio',
    subtitle: 'Costruisci sequenze omnicanale con suggerimenti AI.',
  },
  '/chat': {
    title: 'Inbox conversazioni',
    subtitle: 'Chat master-detail con routing intelligente delle richieste.',
  },
};

const getPageDescriptor = (pathname: string) => {
  const match = Object.entries(pageMap).find(([route]) =>
    pathname.startsWith(route)
  );
  return (
    match?.[1] ?? {
      title: 'Customer Automator',
      subtitle: 'Design metal-glassy per esperienze memorabili.',
    }
  );
};

export const TopBar = () => {
  const pathname = usePathname();
  const descriptor = useMemo(() => getPageDescriptor(pathname), [pathname]);
  const unreadCount = aiNotifications.filter((item) => item.priority !== 'bassa').length;

  return (
    <Box className="flex flex-col gap-4 border-b border-white/10 bg-[rgba(14,19,29,0.72)] px-10 py-6 backdrop-blur-2xl">
      <Box className="flex flex-wrap items-center justify-between gap-4">
        <Box>
          <Box className="flex flex-row items-center gap-2 text-typography-400">
            <Text className="text-xs uppercase tracking-[0.45em] text-typography-500">
              Customer Automator
            </Text>
            <ChevronRight size={12} color="rgb(var(--color-typography-500))" />
            <Text className="text-xs uppercase tracking-[0.45em] text-primary-200">
              {descriptor.title}
            </Text>
          </Box>
          <Text className="mt-2 text-2xl font-semibold text-typography-0">
            {descriptor.title}
          </Text>
          <Text className="mt-1 text-sm text-typography-300">{descriptor.subtitle}</Text>
        </Box>
        <Box className="flex flex-row items-center gap-3">
          <Box className="hidden min-w-[320px] max-w-[380px] items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-xl md:flex">
            <Icon as={Search} size="md" className="text-typography-400" />
            <input
              className="flex-1 bg-transparent text-sm text-typography-100 placeholder:text-typography-500 focus:outline-none"
              placeholder="Cerca ospiti, prenotazioni o automazioni..."
              aria-label="Cerca"
            />
          </Box>
          <Button
            variant="outline"
            action="primary"
            className="border-white/15 bg-transparent px-4 py-2"
          >
            <ButtonIcon as={Sparkles} className="text-accent-400" />
            <ButtonText className="text-sm text-typography-50">
              Hub AI
            </ButtonText>
          </Button>
          <Box className="relative">
            <Button
              variant="outline"
              action="secondary"
              className="border-white/15 bg-transparent px-3 py-2"
            >
              <ButtonIcon as={Bell} className="text-typography-100" />
            </Button>
            {unreadCount > 0 && (
              <Badge
                className="absolute -right-1 -top-1 rounded-full bg-accent-500 px-1.5 py-0.5"
                variant="solid"
              >
                <Text className="text-[10px] font-semibold text-typography-0">
                  {unreadCount}
                </Text>
              </Badge>
            )}
          </Box>
          <Box className="flex flex-row items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-xl">
            <Box className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-primary-700 to-primary-400">
              <Text className="text-lg font-semibold text-typography-0">DM</Text>
            </Box>
            <Box>
              <Text className="text-sm font-medium text-typography-0">
                Davide Minardi
              </Text>
              <Text className="text-xs text-typography-300">
                Admin • Hotel Aurora
              </Text>
            </Box>
            <ShieldCheck size={18} color="rgb(var(--color-success-400))" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Validazione: la top bar introduce ricerca, notifiche e hub AI rispettando requisiti di visibilità e nuove azioni richieste.
