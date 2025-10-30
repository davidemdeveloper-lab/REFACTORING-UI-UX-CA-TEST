'use client';

import { useMemo } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import {
  BellRing,
  Bot,
  CalendarClock,
  FileText,
  Home,
  Hotel,
  MessageSquareDot,
  PlugZap,
  UserPlus2,
  Users,
} from 'lucide-react';

const navigation = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Clienti', href: '/clients', icon: Users },
  { label: 'Nuovo Cliente', href: '/clients/new', icon: UserPlus2 },
  { label: 'Prenotazioni', href: '/bookings', icon: CalendarClock },
  { label: 'Lost Booking', href: '/bookings/new-lost', icon: Bot },
  { label: 'Template', href: '/templates', icon: FileText },
  { label: 'Chat', href: '/chat', icon: MessageSquareDot },
  { label: 'Notifiche', href: '/notifications', icon: BellRing },
  { label: 'IoT', href: '/iot', icon: PlugZap },
];

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideNav({ isOpen, onClose }: SideNavProps) {
  const pathname = usePathname();
  const items = useMemo(() => navigation, []);

  return (
    <>
      {isOpen ? (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgColor="rgba(5, 10, 18, 0.65)"
          zIndex={20}
          onClick={onClose}
        />
      ) : null}
      <Box
        aria-label="Navigazione principale"
        role="navigation"
        width={{ base: '72px', lg: '240px' }}
        px="$4"
        py="$8"
        backgroundColor="rgba(9, 15, 27, 0.85)"
        borderRightWidth={1}
        borderColor="rgba(255,255,255,0.08)"
        style={{ backdropFilter: 'blur(20px)' }}
        zIndex={30}
        display={{ base: isOpen ? 'flex' : 'none', lg: 'flex' }}
        position={{ base: 'fixed', lg: 'relative' }}
        height="100vh"
        flexDirection="column"
      >
        <HStack alignItems="center" justifyContent="center" gap="$3" mb="$10">
          <Box
            width={48}
            height={48}
            borderRadius="$full"
            alignItems="center"
            justifyContent="center"
            bgColor="rgba(79,111,255,0.3)"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.22)"
          >
            <Icon as={Hotel} color="$primary300" />
          </Box>
          <VStack display={{ base: 'none', lg: 'flex' }}>
            <Text color="$background50" fontWeight="$bold">
              Customer Automator
            </Text>
            <Text color="rgba(226,235,255,0.6)" fontSize="$sm">
              Smart Hospitality
            </Text>
          </VStack>
        </HStack>
        <VStack space="lg" flex={1}>
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Box
                key={item.href}
                asChild
                borderRadius="$xl"
                px="$4"
                py="$3"
                bgColor={active ? 'rgba(79,111,255,0.18)' : 'transparent'}
                borderWidth={active ? 1 : 0}
                borderColor="rgba(79,111,255,0.36)"
                onClick={onClose}
                cursor="pointer"
              >
                <NextLink href={item.href}>
                  <HStack alignItems="center" gap="$4">
                    <Icon
                      as={item.icon}
                      color={active ? '$primary300' : 'rgba(226,235,255,0.65)'}
                    />
                    <Text
                      color={active ? '$background50' : 'rgba(226,235,255,0.7)'}
                      display={{ base: 'none', lg: 'flex' }}
                    >
                      {item.label}
                    </Text>
                  </HStack>
                </NextLink>
              </Box>
            );
          })}
        </VStack>
      </Box>
    </>
  );
}
