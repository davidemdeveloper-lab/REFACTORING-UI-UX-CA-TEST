'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import {
  Home,
  Users,
  UserPlus,
  CalendarCheck,
  FileText,
  MessageSquare,
  Sparkles,
} from 'lucide-react-native';
import { palette } from '@/theme/palette';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Clienti', href: '/clients', icon: Users },
  { label: 'Nuovo Cliente', href: '/clients/add', icon: UserPlus },
  { label: 'Prenotazioni', href: '/bookings', icon: CalendarCheck },
  { label: 'Template Email', href: '/templates', icon: FileText },
  { label: 'Chat & AI', href: '/chat', icon: MessageSquare },
];

interface SidebarNavProps {
  activePath: string;
}

export function SidebarNav({ activePath }: SidebarNavProps) {
  const isActive = useMemo(
    () => (href: string) =>
      activePath === href ||
      (href !== '/' && activePath.startsWith(href) && activePath !== '/'),
    [activePath]
  );

  return (
    <VStack
      className="h-full w-[108px] items-center justify-between py-10"
      style={{
        backgroundColor: 'rgba(10, 12, 20, 0.75)',
        borderRightWidth: 1,
        borderRightColor: palette.border.soft,
        backdropFilter: 'blur(18px)',
      }}
    >
      <VStack className="items-center gap-10">
        <Box className="h-14 w-14 items-center justify-center rounded-2xl glass-panel">
          <Sparkles color={palette.intent.accent} size={28} strokeWidth={1.4} />
        </Box>
        <VStack className="gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} legacyBehavior>
                <Pressable
                  className={`rounded-2xl px-3 py-3 ${
                    active
                      ? 'glass-panel'
                      : 'border border-transparent hover:border-white/10'
                  }`}
                  style={{
                    borderColor: active ? palette.border.strong : undefined,
                    backgroundColor: active
                      ? 'rgba(148, 163, 184, 0.12)'
                      : 'transparent',
                  }}
                >
                  <VStack className="items-center gap-2">
                    <Icon
                      color={active ? palette.intent.accent : palette.text.secondary}
                      size={24}
                      strokeWidth={active ? 1.8 : 1.4}
                    />
                    <Text
                      className={`text-center text-xs font-semibold uppercase tracking-[0.08em] ${
                        active ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {item.label}
                    </Text>
                  </VStack>
                </Pressable>
              </Link>
            );
          })}
        </VStack>
      </VStack>
      <Box className="items-center gap-2">
        <Text className="text-[10px] uppercase tracking-[0.32em] text-slate-500">
          Customer Automator
        </Text>
        <Text className="text-xs text-slate-600">v3.0 design refactor</Text>
      </Box>
    </VStack>
  );
}
