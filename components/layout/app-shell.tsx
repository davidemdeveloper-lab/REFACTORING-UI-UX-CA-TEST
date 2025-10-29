'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { ScrollView } from '@/components/ui/scroll-view';
import { Avatar } from '@/components/ui/avatar';
import { Divider } from '@/components/ui/divider';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';
import { useAccent } from '@/components/theme/accent-provider';
import {
  Bot,
  Briefcase,
  CalendarClock,
  CalendarDays,
  ChevronRight,
  Home,
  Layers3,
  ListChecks,
  LogOut,
  Mail,
  MessageCircle,
  Palette,
  Settings,
  Sparkles,
  Users,
  Wifi,
} from 'lucide-react-native';
import { AccentSelector } from './accent-selector';
import { ModeSelector } from './mode-selector';

const NAV_SECTIONS = [
  {
    title: 'Panoramica',
    items: [
      { label: 'Dashboard', icon: Home, href: '/dashboard' },
      { label: 'Chat Unificata', icon: MessageCircle, href: '/chat' },
      { label: 'Prenotazioni', icon: CalendarDays, href: '/reservations' },
      { label: 'Clienti', icon: Users, href: '/clients' },
    ],
  },
  {
    title: 'Automazioni',
    items: [
      { label: 'Workflow Email', icon: Mail, href: '/templates' },
      { label: 'Newsletter', icon: Sparkles, href: '/newsletter' },
      { label: 'Proponi Soggiorno', icon: Briefcase, href: '/reservations/create' },
      { label: 'Task & Note', icon: ListChecks, href: '/tasks' },
    ],
  },
  {
    title: 'Ecosistema',
    items: [
      { label: 'Dispositivi IoT', icon: Wifi, href: '/integrations/iot' },
      { label: 'Esperienza Ospite', icon: Layers3, href: '/guest-experience' },
      { label: 'Impostazioni', icon: Settings, href: '/settings' },
    ],
  },
];

type AppShellProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export const AppShell = ({ children, title, description, actions }: AppShellProps) => {
  const pathname = usePathname();
  const { accent } = useAccent();

  return (
    <Box className="flex min-h-screen w-full flex-row">
      <aside className="hidden h-screen w-80 shrink-0 flex-col bg-white/6 px-6 pb-8 pt-10 backdrop-blur-2xl lg:flex">
        <Box className="flex items-center gap-3">
          <Box className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 shadow-lg shadow-[var(--accent-glow)]">
            <Icon as={Bot} color="rgba(255,255,255,0.95)" size={24} />
          </Box>
          <Box>
            <Text className="text-sm uppercase tracking-[0.35em] text-white/60">
              Customer Automator
            </Text>
            <Text className="text-lg font-semibold text-white">
              Cura Digitale dell'Ospite
            </Text>
          </Box>
        </Box>
        <ScrollView className="mt-10 space-y-8">
          {NAV_SECTIONS.map((section) => (
            <VStack key={section.title} space="md">
              <Text className="text-xs uppercase tracking-[0.3em] text-white/40">
                {section.title}
              </Text>
              <VStack space="md">
                {section.items.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link key={item.href} href={item.href}>
                      <Box
                        className={`group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 transition-all hover:border-white/20 hover:bg-white/10 ${
                          isActive ? 'border-white/20 bg-white/15 shadow-lg shadow-[var(--accent-glow)]' : ''
                        }`}
                      >
                        <HStack space="md" className="items-center">
                          <Box
                            className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 group-hover:bg-white/10 ${
                              isActive ? 'bg-white/15' : ''
                            }`}
                          >
                            <Icon
                              as={item.icon}
                              size={20}
                              color={isActive ? accent.value : 'rgba(255,255,255,0.75)'}
                            />
                          </Box>
                          <Text className="text-sm font-medium text-white">
                            {item.label}
                          </Text>
                        </HStack>
                        <Icon as={ChevronRight} size={18} color="rgba(255,255,255,0.4)" />
                      </Box>
                    </Link>
                  );
                })}
              </VStack>
            </VStack>
          ))}
        </ScrollView>
        <Box className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80">
          <Text className="text-sm font-semibold text-white">
            Consigli dell'AI Concierge
          </Text>
          <Text className="mt-2 text-xs leading-relaxed text-white/60">
            Ottimizza il tono dei messaggi e automatizza i follow-up in base alle emozioni rilevate nella conversazione.
          </Text>
          <Button
            className="mt-4 self-start rounded-xl bg-[var(--accent-color)] px-4 py-2 text-xs font-semibold text-[#0a141f] shadow-lg shadow-[var(--accent-glow)]"
          >
            Esplora suggerimenti
          </Button>
        </Box>
        <Divider className="my-6 border-white/10" />
        <HStack className="items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
          <HStack space="md" className="items-center">
            <Avatar className="h-11 w-11 border border-white/30">
              <Avatar.Image
                source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
                className="h-full w-full"
                alt="Direttore struttura"
              />
            </Avatar>
            <Box>
              <Text className="text-sm font-semibold text-white">Davide Mineo</Text>
              <Text className="text-xs text-white/60">General Manager • Aurora Boutique Hotel</Text>
            </Box>
          </HStack>
          <Pressable className="rounded-xl border border-white/10 bg-white/10 p-2">
            <Icon as={LogOut} size={18} color="rgba(255,255,255,0.7)" />
          </Pressable>
        </HStack>
      </aside>
      <Box className="flex min-h-screen flex-1 flex-col">
        <header className="flex flex-col gap-6 px-6 pb-6 pt-6 lg:px-10">
          <HStack className="w-full flex-wrap items-center justify-between gap-4">
            <Box>
              <Text className="text-[0.7rem] uppercase tracking-[0.35em] text-white/60">
                Customer Automator
              </Text>
              <HStack className="items-baseline gap-3">
                <Text className="text-3xl font-semibold text-white">{title}</Text>
                <BadgeAurora>{description}</BadgeAurora>
              </HStack>
            </Box>
            <HStack className="items-center gap-3">
              <Box className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 lg:flex">
                <Icon as={Sparkles} size={18} color="rgba(255,255,255,0.7)" />
                <Text className="text-xs text-white/70">Suggerimenti AI disponibili</Text>
              </Box>
              <AccentSelector />
              <ModeSelector />
              <Box className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner shadow-white/5 lg:flex">
                <Icon as={Palette} size={18} color="rgba(255,255,255,0.65)" />
                <Box className="flex flex-col">
                  <Text className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
                    Atmosfera stanza
                  </Text>
                  <Text className="text-sm font-semibold text-white">Metal Glassy</Text>
                </Box>
              </Box>
            </HStack>
          </HStack>
          <HStack className="w-full flex-wrap items-center gap-3">
            <Box className="flex min-w-[260px] flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <Icon as={SearchIcon} size={18} color="rgba(255,255,255,0.55)" />
              <Input className="flex-1 bg-transparent">
                <InputField
                  placeholder="Cerca clienti, prenotazioni o conversazioni"
                  placeholderTextColor="rgba(255,255,255,0.45)"
                  className="text-sm text-white"
                />
              </Input>
            </Box>
            {actions}
          </HStack>
        </header>
        <main className="flex-1 px-6 pb-12 lg:px-10">
          <Box className="glassy-panel relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_70%)]" />
            <div className="relative z-10 p-6 lg:p-10">{children}</div>
          </Box>
        </main>
      </Box>
    </Box>
  );
};

type BadgeProps = {
  children?: React.ReactNode;
};

const BadgeAurora = ({ children }: BadgeProps) => {
  if (!children) return null;
  return (
    <span className="badge-pill bg-white/10 text-[0.65rem] font-semibold text-white shadow-inner shadow-white/20">
      {children}
    </span>
  );
};

const SearchIcon = (props: { size?: number; color?: string }) => (
  <svg
    width={props.size ?? 18}
    height={props.size ?? 18}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m20 20-2.6-2.6"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
