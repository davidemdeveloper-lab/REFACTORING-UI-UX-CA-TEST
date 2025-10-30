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
  UserCircle2,
} from 'lucide-react-native';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/bookings', label: 'Prenotazioni', icon: CalendarClock },
  { href: '/chat', label: 'Chat & AI', icon: MessageSquareText },
  { href: '/clients', label: 'Clienti', icon: Users },
  { href: '/clients/add', label: 'Aggiungi Cliente', icon: UserPlus },
  { href: '/templates', label: 'Template Email', icon: NotebookPen },
  { href: '/client-portal', label: 'Area Cliente', icon: UserCircle2 },
  { href: '/services', label: 'Hub Servizi', icon: BookOpenCheck },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Box
      style={{
        width: 240,
        height: '100%',
        backgroundColor: palette.surfaceMuted,
        borderRightColor: palette.glassStroke,
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 28,
        paddingBottom: 28,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      } as any}
    >
      <VStack space="lg">
        <HStack className="items-center" style={{ gap: 12 } as any}>
          <Box
            className="items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: 'rgba(56,189,248,0.2)',
              borderColor: 'rgba(56,189,248,0.4)',
              borderWidth: 1,
              borderStyle: 'solid',
            } as any}
          >
            <Text style={{ fontSize: 20, fontWeight: '700', color: palette.accentPrimary } as any}>
              CA
            </Text>
          </Box>
          <VStack>
            <Text style={{ fontSize: 16, fontWeight: '700', color: palette.textPrimary } as any}>
              Customer Automator
            </Text>
            <Text style={{ fontSize: 12, color: palette.textMuted } as any}>
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
                  className="items-center"
                  style={{
                    gap: 12,
                    paddingLeft: 14,
                    paddingRight: 14,
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderRadius: 14,
                    backgroundColor: active ? 'rgba(56,189,248,0.16)' : 'transparent',
                    borderWidth: active ? 1 : 0,
                    borderStyle: active ? 'solid' : 'none',
                    borderColor: active ? 'rgba(56,189,248,0.35)' : 'transparent',
                  } as any}
                >
                  <Icon color={active ? palette.accentPrimary : palette.textMuted} size={20} />
                  <Text style={{ color: active ? palette.textPrimary : palette.textMuted, fontWeight: '600' } as any}>
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
    <Box
      style={{
        marginTop: 'auto',
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: 'rgba(148,163,184,0.18)',
      } as any}
    >
      <VStack space="xs">
        <Text style={{ fontSize: 12, color: palette.textMuted } as any}>
          Ultima sincronizzazione
        </Text>
        <Text style={{ fontSize: 13, fontWeight: '600', color: palette.textSecondary } as any}>
          Oggi, 10:15 - Tutti i sistemi attivi
        </Text>
      </VStack>
    </Box>
  );
}
