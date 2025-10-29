'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VStack, HStack, Text, Box, Badge, Button } from '@gluestack-ui/themed';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  MessagesSquare,
  Bell,
  Cpu,
  Settings
} from 'lucide-react';
import { tokens } from '@/theme/tokens';
import { palette } from '@/theme/palette';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleBookingChat } from '@/features/ui/uiSlice';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/bookings', label: 'Prenotazioni', icon: CalendarDays },
  { href: '/clients', label: 'Clienti', icon: Users },
  { href: '/templates', label: 'Template', icon: FileText },
  { href: '/chat', label: 'Chat', icon: MessagesSquare },
  { href: '/notifications', label: 'Notifiche', icon: Bell },
  { href: '/iot', label: 'IoT', icon: Cpu },
  { href: '/settings', label: 'Impostazioni', icon: Settings, disabled: true }
];

export const SideNav = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const unread = useAppSelector((state) => state.notifications.items.filter((item) => !item.read).length);

  return (
    <VStack
      role="navigation"
      aria-label="Navigazione principale"
      borderRightWidth={1}
      borderColor={tokens.surfaces.glassPanel.borderColor}
      bg={tokens.surfaces.glassPanel.backgroundColor}
      sx={{ backdropFilter: `blur(${tokens.surfaces.glassPanel.backdropBlur})`, minWidth: 220 }}
      py={24}
      px={12}
      space="md"
      height="100vh"
      position="sticky"
      top={0}
    >
      <Box
        px={12}
        py={10}
        borderRadius={tokens.radii.glass}
        bg="rgba(255,255,255,0.08)"
        borderWidth={1}
        borderColor="rgba(255,255,255,0.15)"
      >
        <Text fontSize={16} fontWeight="700">
          Customer Automator
        </Text>
        <Text fontSize={12} color={palette.steel[200]}>
          Human + AI hospitality
        </Text>
      </Box>
      <VStack space="xs">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          const disabled = item.disabled;
          return (
            <Box key={item.href} opacity={disabled ? 0.4 : 1}>
              <Link
                href={disabled ? '#' : item.href}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                className={clsx('nav-item', { active })}
                onClick={(event) => {
                  if (disabled) {
                    event.preventDefault();
                  }
                }}
              >
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  px={12}
                  py={10}
                  borderRadius={tokens.radii.lg}
                  bg={active ? 'rgba(59,130,246,0.18)' : 'transparent'}
                  borderWidth={active ? 1 : 0}
                  borderColor={active ? 'rgba(148,197,253,0.45)' : 'transparent'}
                >
                  <HStack space="sm" alignItems="center">
                    <item.icon size={18} aria-hidden color={active ? palette.accent[400] : palette.steel[200]} />
                    <Text fontSize={14}>{item.label}</Text>
                  </HStack>
                  {item.href === '/notifications' && unread > 0 ? (
                    <Badge
                      size="sm"
                      action="primary"
                      variant="solid"
                      bg={palette.accent[600]}
                      color={palette.neutrals.white}
                      borderRadius={tokens.radii.md}
                    >
                      {unread}
                    </Badge>
                  ) : null}
                </HStack>
              </Link>
            </Box>
          );
        })}
      </VStack>
      <GlassBookingCTA onOpen={() => dispatch(toggleBookingChat(true))} />
    </VStack>
  );
};

interface GlassBookingCTAProps {
  onOpen: () => void;
}

const GlassBookingCTA = ({ onOpen }: GlassBookingCTAProps) => (
  <Box mt="auto" w="100%">
    <Box
      borderRadius={tokens.radii.glass}
      p={16}
      bg="rgba(20,181,219,0.18)"
      borderWidth={1}
      borderColor="rgba(20,181,219,0.4)"
    >
      <Text fontSize={13} fontWeight="600">
        Booking Chat
      </Text>
      <Text fontSize={12} color={palette.steel[200]} mb={8} mt={4}>
        Raggiungi subito le conversazioni legate alle prenotazioni.
      </Text>
      <Button
        onPress={onOpen}
        action="primary"
        size="sm"
        accessibilityLabel="Apri Booking Chat"
      >
        Apri Booking Chat
      </Button>
    </Box>
  </Box>
);
