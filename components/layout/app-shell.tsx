'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { Icon } from '@/components/ui/icon';
import {
  Bell,
  Bot,
  CalendarClock,
  ChevronRight,
  Flame,
  LayoutDashboard,
  Mailbox,
  MessageCircle,
  Sparkles,
  Users,
  Wifi,
} from 'lucide-react-native';
import { accentOptions, AccentTone } from '@/lib/data';
import { useThemeSettings } from '@/components/theme/theme-provider';

const navigation = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Chat Unificata', href: '/chat', icon: MessageCircle },
  { label: 'Clienti', href: '/clients', icon: Users },
  { label: 'Prenotazioni', href: '/reservations', icon: CalendarClock },
  { label: 'Newsletter', href: '/newsletter', icon: Mailbox },
  { label: 'Template Email', href: '/templates', icon: Bot },
  { label: 'Nuova Prenotazione', href: '/bookings/new', icon: Sparkles },
  { label: 'Monitor IoT', href: '/iot', icon: Wifi },
  { label: 'Guest Portal', href: '/guest-portal', icon: Flame },
];

type AppShellProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  trailing?: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { accent, setAccent, toggleMode, mode } = useThemeSettings();

  return (
    <div className="relative flex min-h-screen">
      <aside className="relative hidden min-h-screen w-72 flex-col border-r border-white/5 bg-black/50 px-6 py-8 lg:flex">
        <Box className="mb-10 flex flex-col gap-2">
          <Text className="font-space-grotesk text-lg uppercase tracking-[0.4em] text-white/60">CA</Text>
          <Text className="text-xs text-white/50">Customer Automator v3</Text>
        </Box>
        <VStack space="sm" className="flex-1">
          {navigation.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <HStack
                  space="md"
                  className={`group items-center rounded-2xl px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? 'bg-[color:var(--accent-solid)]/20 text-white'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Box className="rounded-full bg-black/30 p-2">
                    <Icon as={item.icon} size="sm" color={isActive ? 'var(--accent-solid)' : 'rgba(255,255,255,0.65)'} />
                  </Box>
                  <Text className="flex-1 text-sm font-medium">{item.label}</Text>
                  <Icon as={ChevronRight} size="xs" color={isActive ? 'var(--accent-solid)' : 'rgba(255,255,255,0.4)'} />
                </HStack>
              </Link>
            );
          })}
        </VStack>
        <Box className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">
          <Text className="text-xs uppercase tracking-[0.3em] text-white/60">Accento</Text>
          <HStack space="md" className="mt-3 flex-wrap">
            {Object.entries(accentOptions).map(([tone, info]) => (
              <Pressable
                key={tone}
                onPress={() => setAccent(tone as AccentTone)}
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.2em] transition ${
                  accent === tone ? 'border-white/60 bg-white/10 text-white' : 'border-white/10 text-white/60 hover:bg-white/5'
                }`}
              >
                <Box className="h-3 w-3 rounded-full" style={{ backgroundColor: info.hex }} />
                {info.name.split(' ')[0]}
              </Pressable>
            ))}
          </HStack>
          <Button
            onPress={toggleMode}
            className="mt-4 w-full rounded-full border border-white/20 bg-white/5 py-2 text-xs text-white/70"
          >
            Modalità {mode === 'dark' ? 'chiara' : 'scura'}
          </Button>
        </Box>
      </aside>
      <div className="flex w-full flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-white/5 bg-black/40 backdrop-blur">
          <HStack className="items-center justify-between px-6 py-5">
            <Box>
              <Text className="font-space-grotesk text-lg text-white/80">{getPageTitle(pathname)}</Text>
              <Text className="text-xs text-white/50">Esperienza orchestrata per hotel visionari</Text>
            </Box>
            <HStack space="md" className="items-center">
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/50 lg:flex">
                <span className="h-2 w-2 rounded-full bg-[color:var(--accent-solid)]" />
                <span>Performance AI attiva</span>
              </div>
              <Button className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs text-white/70">
                <HStack space="sm" className="items-center">
                  <Icon as={Bell} size="sm" color="rgba(255,255,255,0.7)" />
                  <Text className="text-xs text-white/70">Notifiche</Text>
                </HStack>
              </Button>
              <Box className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Box className="h-9 w-9 rounded-full bg-[color:var(--accent-solid)]/30" />
                <Box>
                  <Text className="text-sm text-white">Davide Minardi</Text>
                  <Text className="text-[10px] uppercase tracking-[0.3em] text-white/50">Hospitality Strategist</Text>
                </Box>
              </Box>
            </HStack>
          </HStack>
        </header>
        <main className="relative flex-1 overflow-y-auto bg-gradient-to-br from-white/0 via-white/0 to-[rgba(12,18,28,0.6)] px-6 py-10 lg:px-10">
          <Box className="pointer-events-none absolute inset-0 grid-overlay" />
          <div className="relative z-10 flex flex-col gap-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

function getPageTitle(pathname: string | null) {
  if (!pathname) return 'Panoramica';
  const match = navigation.find((item) => pathname.startsWith(item.href));
  return match?.label ?? 'Panoramica';
}
