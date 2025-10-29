'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { GlassCard } from '@/components/common/glass-card';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { AccentPicker } from '@/components/common/accent-picker';
import { cn, formatDate } from '@/lib/utils';
import { CommandCenter } from '@/components/common/command-center';
import {
  BellRing,
  Bot,
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
  const [isCommandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const searchFieldRef = useRef<any>(null);

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

  return (
    <Box className="flex min-h-screen w-full bg-transparent text-typography-0">
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
        <Box className="border-b border-white/10 bg-black/20 px-4 py-4 backdrop-blur-xl md:px-8">
          <Box className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Box className="flex flex-1 items-center gap-3">
              <Input
                className="flex-1 rounded-2xl border border-white/10 bg-background-0/40"
                size="lg"
                accessibilityLabel="Cerca"
              >
                <InputSlot>
                  <InputIcon as={Search} color="rgb(var(--color-typography-400))" size={18} />
                </InputSlot>
                <InputField
                  ref={searchFieldRef}
                  editable={false}
                  caretHidden
                  onFocus={handleSearchTrigger}
                  onPressIn={handleSearchTrigger}
                  placeholder="Cerca clienti, prenotazioni, automazioni..."
                  placeholderTextColor="rgba(226,231,245,0.6)"
                />
                <InputSlot className="hidden items-center pr-2 md:flex">
                  <Box className="rounded-xl border border-white/15 bg-background-0/40 px-2 py-1">
                    <Text className="text-[11px] font-semibold uppercase tracking-[0.3em] text-typography-300">⌘K</Text>
                  </Box>
                </InputSlot>
              </Input>
              <Button
                size="sm"
                variant="outline"
                action="secondary"
                className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-background-0/40 px-4 py-3 md:flex"
                onPress={() => openCommand('AI suggerimenti personali')}
              >
                <Bot color="rgb(var(--color-primary-500))" size={18} />
                <ButtonText className="text-sm font-semibold text-typography-0">
                  Prompt veloce
                </ButtonText>
              </Button>
            </Box>
            <Box className="flex items-center gap-4">
              <GlassCard padding="px-4 py-3" className="hidden items-center gap-3 md:flex">
                <Box className="rounded-xl bg-primary-500/20 p-2">
                  <Sparkles color="rgb(var(--color-primary-500))" size={18} />
                </Box>
                <Box>
                  <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">AI Copilot</Text>
                  <Text className="text-sm font-semibold text-typography-0">Modalità suggerimento</Text>
                </Box>
              </GlassCard>
              <GlassCard padding="p-3" className="items-center gap-3">
                <Avatar className="h-10 w-10 items-center justify-center rounded-2xl bg-primary-500/20" alt="Davide Mineo">
                  <Text className="text-lg font-semibold text-primary-400">DM</Text>
                </Avatar>
                <Box>
                  <Text className="text-sm font-semibold text-typography-0">Davide Mineo</Text>
                  <Text className="text-xs text-typography-400">Hotel Director</Text>
                </Box>
              </GlassCard>
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
