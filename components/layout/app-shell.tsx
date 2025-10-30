'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { AccentPicker } from '@/components/common/accent-picker';
import { cn, formatDate } from '@/lib/utils';
import { CommandCenter } from '@/components/common/command-center';
import {
  BellRing,
  CalendarClock,
  FilePenLine,
  GaugeCircle,
  GitBranch,
  Globe2,
  LayoutDashboard,
  MailPlus,
  MessageCircle,
  Search,
  Sparkles,
  Users,
} from 'lucide-react-native';
import { Avatar } from '@/components/ui/avatar';

interface AppShellProps {
  children: ReactNode;
}

const NAVIGATION = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Panoramica clienti, automazioni e IoT',
  },
  {
    label: 'Prenotazioni',
    href: '/reservations',
    icon: CalendarClock,
    description: 'Timeline soggiorni e azioni AI assistite',
  },
  {
    label: 'Clienti',
    href: '/clients',
    icon: Users,
    description: 'Profiler, note e preferenze personalizzate',
  },
  {
    label: 'Chat Unificata',
    href: '/chat',
    icon: MessageCircle,
    description: 'Email, WhatsApp e Booking con AI concierge',
  },
  {
    label: 'Newsletter',
    href: '/newsletter',
    icon: MailPlus,
    description: 'Campagne, iscrizioni e segmenti caldi',
  },
  {
    label: 'Template Email',
    href: '/templates',
    icon: FilePenLine,
    description: 'Editor modulare, versioni e performance',
  },
  {
    label: 'Workflow Engine',
    href: '/workflow',
    icon: GitBranch,
    description: 'Percorsi automatizzati e risultati',
  },
  {
    label: 'IoT & Comfort',
    href: '/iot',
    icon: GaugeCircle,
    description: 'Dispositivi connessi e scenari camere',
  },
  {
    label: 'Nuova Prenotazione',
    href: '/booking/new',
    icon: Sparkles,
    description: 'Proposte, acconti e pagamento diretto',
  },
  {
    label: 'Portale Ospite',
    href: '/guest-portal',
    icon: Globe2,
    description: 'Esperienza digitale lato ospite',
  },
];

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCommandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const searchFieldRef = useRef<any>(null);
  const chatNotifications = 3;

  const closeCommand = useCallback(() => {
    setCommandOpen(false);
    setCommandQuery('');
  }, []);

  const openCommand = useCallback(
    (prefill?: string) => {
      setCommandQuery(prefill ?? '');
      setCommandOpen(true);
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(() => {
          searchFieldRef.current?.blur?.();
        });
      }
    },
    []
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openCommand();
      }

      if (event.key === 'Escape') {
        closeCommand();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openCommand, closeCommand]);

  const handleSearchTrigger = useCallback(() => {
    openCommand();
  }, [openCommand]);

  const handleOpenReservations = useCallback(() => {
    router.push('/reservations');
  }, [router]);

  const handleOpenChat = useCallback(() => {
    router.push('/chat');
  }, [router]);

  return (
    <Box className="flex flex-row min-h-screen w-full bg-transparent text-typography-0">
      <CommandCenter
        open={isCommandOpen}
        query={commandQuery}
        navigation={NAVIGATION}
        onQueryChange={setCommandQuery}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            setCommandOpen(true);
            return;
          }
          closeCommand();
        }}
      />
      <aside className="hidden min-h-screen w-[300px] flex-col justify-between border-r border-white/10 bg-black/30 p-6 xl:flex">
        <Box className="gap-10">
          <Box className="gap-3">
            <Text className="text-sm uppercase tracking-[0.5em] text-typography-400">CA Studio</Text>
            <Text className="text-gradient text-2xl font-semibold">Customer Automator</Text>
            <Text className="text-xs text-typography-300">
              Esperienza olistica per l'albergatore: automazioni, AI concierge e cura totale dell'ospite.
            </Text>
          </Box>
          <Box className="flex flex-col gap-2">
            {NAVIGATION.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="no-underline">
                  <GlassCard
                    padding="p-4"
                    className={cn(
                      'transition-all hover:scale-[1.01] hover:shadow-lg',
                      isActive
                        ? 'border-primary-500/70 bg-primary-500/10 shadow-[0_0_25px_rgba(52,184,188,0.25)]'
                        : 'bg-background-0/40'
                    )}
                  >
                    <Box className="flex flex-row items-center gap-4">
                      <Box className="rounded-2xl bg-primary-500/15 p-3">
                        <Icon color={isActive ? 'rgb(var(--color-primary-500))' : 'rgb(var(--color-typography-300))'} size={20} />
                      </Box>
                      <Box className="gap-1">
                        <Text className="text-sm font-semibold text-typography-0">{item.label}</Text>
                        <Text className="text-xs text-typography-300">{item.description}</Text>
                      </Box>
                    </Box>
                  </GlassCard>
                </Link>
              );
            })}
          </Box>
        </Box>
        <Box className="flex flex-col gap-6">
          <ThemeToggle />
          <AccentPicker />
          <GlassCard padding="p-4" className="gap-3">
            <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Notifiche</Text>
            <Box className="flex items-center gap-3">
              <Box className="rounded-2xl bg-success-500/20 p-2">
                <BellRing color="rgb(var(--color-success-500))" size={18} />
              </Box>
              <Box>
                <Text className="text-sm font-semibold text-typography-0">2 interventi AI in attesa</Text>
                <Text className="text-xs text-typography-300">
                  Ultimo aggiornamento {formatDate(new Date().toISOString())}
                </Text>
              </Box>
            </Box>
          </GlassCard>
        </Box>
      </aside>
      <Box className="flex min-h-screen flex-1 flex-col">
        <Box className="border-b border-white/10 bg-black/20 px-4 py-2 backdrop-blur-xl md:px-8 md:py-2">
          <Box className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-col gap-2 md:grid md:grid-cols-[minmax(0,1fr)_200px] md:items-center md:gap-3">
            <GlassPanel
              padding="px-4 py-2"
              className="flex flex-row flex-nowrap items-center gap-3 overflow-x-auto border-white/10 bg-black/30"
            >
              <Box className="flex flex-row flex-none items-center gap-2">
                <Text className="text-[10px] font-semibold uppercase tracking-[0.35em] text-typography-300">
                  Command Center
                </Text>
                <Box className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-0.5 md:flex">
                  <Text className="text-[9px] font-semibold uppercase tracking-[0.3em] text-typography-200">
                    ⌘
                  </Text>
                  <Text className="text-[9px] font-semibold uppercase tracking-[0.3em] text-typography-200">
                    K
                  </Text>
                </Box>
              </Box>
              <Button
                size="xs"
                variant="outline"
                action="secondary"
                className="flex flex-none items-center gap-1 rounded-full border-white/20 bg-white/5 px-3 py-1 text-left whitespace-nowrap"
                onPress={handleOpenReservations}
              >
                <CalendarClock color="rgb(var(--color-primary-500))" size={14} />
                <ButtonText className="text-[11px] font-semibold text-typography-0">
                  Prenotazioni
                </ButtonText>
              </Button>
              <Box className="flex min-w-[240px] flex-1 flex-row">
                <Input
                  variant="rounded"
                  size="sm"
                  className="w-full rounded-full border-white/15 bg-white/5 py-0 data-[focus=true]:border-primary-500/60"
                  accessibilityLabel="Cerca"
                >
                  <InputSlot className="pl-3">
                    <InputIcon as={Search} color="rgb(var(--color-typography-300))" size={16} />
                  </InputSlot>
                  <InputField
                    ref={searchFieldRef}
                    editable={false}
                    caretHidden
                    onFocus={handleSearchTrigger}
                    onPressIn={handleSearchTrigger}
                    className="text-sm text-typography-0 placeholder:text-typography-400"
                    placeholder="Cerca clienti, prenotazioni, automazioni..."
                    placeholderTextColor="rgba(226,231,245,0.45)"
                  />
                </Input>
              </Box>
              <Button
                size="xs"
                variant="outline"
                action="secondary"
                className="flex flex-none items-center gap-2 rounded-full border-white/20 bg-white/5 px-3 py-1 text-left whitespace-nowrap"
                onPress={handleOpenChat}
              >
                <MessageCircle color="rgb(var(--color-primary-500))" size={14} />
                <ButtonText className="text-[11px] font-semibold text-typography-0">
                  Chat
                </ButtonText>
                {chatNotifications > 0 ? (
                  <Box className="rounded-full bg-error-500/80 px-2 py-0.5">
                    <Text className="text-[10px] font-semibold text-typography-0">
                      {chatNotifications}
                    </Text>
                  </Box>
                ) : null}
              </Button>
            </GlassPanel>
            <Box className="flex w-full flex-col gap-2">
              <GlassPanel
                padding="px-4 py-2"
                className="gap-2 border-white/10 bg-black/30 items-center justify-center"
              >
                <Box className="flex items-center flex-row  justify-between gap-2 m-auto">
                  <Box className="rounded-2xl bg-primary-500/20 p-1.5">
                    <Sparkles color="rgb(var(--color-primary-400))" size={14} />
                  </Box>
                  <Box className="flex flex-1 flex-col gap-0.5">
                    <Text className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary-200">
                      AI Copilot
                    </Text>
                    <Text className="text-xs font-semibold text-typography-0">
                      Modalità suggerimento
                    </Text>
                  </Box>
                </Box>
                <Button
                  size="xs"
                  variant="link"
                  action="secondary"
                  className="self-start px-0"
                  onPress={() => openCommand('Apri impostazioni AI Copilot')}
                >
                  <ButtonText className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-300">
                    Impostazioni
                  </ButtonText>
                </Button>
              </GlassPanel>
              <GlassPanel
                padding="px-4 py-2"
                className="gap-2 border-white/10 bg-black/30 items-center justify-center"
              >
                <Box className="flex flex-row items-center gap-2 m-auto">
                  <Avatar
                    className="h-8 w-8 items-center justify-center rounded-2xl bg-primary-500/20"
                    alt="Davide Mineo"
                  >
                    <Text className="text-sm font-semibold text-primary-300">DM</Text>
                  </Avatar>
                  <Box className="flex flex-1 flex-col gap-0.5">
                    <Text className="text-sm font-semibold text-typography-0">Davide Mineo</Text>
                    <Text className="text-[11px] text-typography-400">Hotel Director</Text>
                  </Box>
                </Box>
                <Button
                  size="xs"
                  variant="link"
                  action="secondary"
                  className="self-start px-0"
                  onPress={() => openCommand('Apri profilo Davide Mineo')}
                >
                  <ButtonText className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-300">
                    Gestisci profilo
                  </ButtonText>
                </Button>
              </GlassPanel>
            </Box>
          </Box>
        </Box>
        <Box className="flex-1 overflow-y-auto">
          <Box className="mx-auto w-full max-w-[var(--page-max-width)] px-4 py-8 md:px-8">
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
