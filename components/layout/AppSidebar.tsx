'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { palette } from '@/theme/palette';
import {
  Home,
  Users,
  UserPlus,
  NotebookPen,
  CalendarClock,
  BookOpenCheck,
  MessageSquareText,
} from 'lucide-react-native';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/clients', label: 'Clienti', icon: Users },
  { href: '/clients/add', label: 'Aggiungi Cliente', icon: UserPlus },
  { href: '/reservations', label: 'Prenotazioni', icon: CalendarClock },
  { href: '/templates', label: 'Template Email', icon: NotebookPen },
  { href: '/chat', label: 'Chat & AI', icon: MessageSquareText },
  { href: '/services', label: 'Hub Servizi', icon: BookOpenCheck },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Box
      w={240}
      h="100%"
      bg={palette.surfaceMuted}
      borderRightColor={palette.glassStroke}
      borderRightWidth={1}
      style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
      px={20}
      py={28}
    >
      <VStack space="lg">
        <HStack alignItems="center" gap={12}>
          <Box
            w={44}
            h={44}
            borderRadius={14}
            bg="rgba(56,189,248,0.2)"
            alignItems="center"
            justifyContent="center"
            borderColor="rgba(56,189,248,0.4)"
            borderWidth={1}
          >
            <Text fontSize={20} fontWeight="700" color={palette.accentPrimary}>
              CA
            </Text>
          </Box>
          <VStack>
            <Text fontSize={16} fontWeight="700" color={palette.textPrimary}>
              Customer Automator
            </Text>
            <Text fontSize={12} color={palette.textMuted}>
              Experience Hub
            </Text>
          </VStack>
        </HStack>

        <VStack space="xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname?.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <HStack
                  alignItems="center"
                  gap={12}
                  px={14}
                  py={12}
                  borderRadius={14}
                  bg={active ? 'rgba(56,189,248,0.16)' : 'transparent'}
                  borderWidth={active ? 1 : 0}
                  borderColor={active ? 'rgba(56,189,248,0.35)' : 'transparent'}
                >
                  <Icon color={active ? palette.accentPrimary : palette.textMuted} size={20} />
                  <Text color={active ? palette.textPrimary : palette.textMuted} fontWeight="600">
                    {item.label}
                  </Text>
                </HStack>
              </Link>
            );
          })}
        </VStack>

        <MetallicFooter />
      </VStack>
    </Box>
  );
}

function MetallicFooter() {
  return (
    <Box mt="auto" pt={24} borderTopWidth={1} borderTopColor="rgba(148,163,184,0.18)">
      <VStack space="xs">
        <Text fontSize={12} color={palette.textMuted}>
          Ultima sincronizzazione
        </Text>
        <Text fontSize={13} fontWeight="600" color={palette.textSecondary}>
          Oggi, 10:15 - Tutti i sistemi attivi
        </Text>
      </VStack>
    </Box>
  );
}
