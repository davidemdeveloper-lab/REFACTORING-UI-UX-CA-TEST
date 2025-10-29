'use client';

import type { ComponentType } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, VStack, HStack, Text, Pressable, Icon } from '@gluestack-ui/themed';
import {
  Home,
  Users,
  CalendarCheck,
  FileText,
  MessageSquare,
  Bell,
  Cpu,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; color?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Clienti', href: '/clients', icon: Users },
  { label: 'Prenotazioni', href: '/bookings', icon: CalendarCheck },
  { label: 'Template', href: '/templates', icon: FileText },
  { label: 'Chat', href: '/chat', icon: MessageSquare },
  { label: 'Notifiche', href: '/notifications', icon: Bell },
  { label: 'IoT', href: '/iot', icon: Cpu },
];

export const SideNav = () => {
  const pathname = usePathname();
  const isCollapsed = useUIStore((state) => state.isSideNavCollapsed);
  const toggle = useUIStore((state) => state.toggleSideNav);

  return (
    <Box
      width={isCollapsed ? 80 : 220}
      px="$4"
      py="$6"
      bg="rgba(11, 18, 32, 0.82)"
      borderRightWidth={1}
      borderColor="rgba(255, 255, 255, 0.08)"
      sx={{
        backdropFilter: 'blur(calc(var(--glass-blur) - 6px))',
        transition: 'width 240ms ease',
      }}
    >
      <VStack space="lg" flex={1} height="100%">
        <Brand isCollapsed={isCollapsed} />
        <VStack space="sm" flex={1}>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.href}
                item={item}
                isActive={isActive}
                isCollapsed={isCollapsed}
              />
            );
          })}
        </VStack>
        <Pressable
          onPress={toggle}
          px="$3"
          py="$3"
          rounded="$full"
          alignItems="center"
          bg="rgba(255, 255, 255, 0.08)"
          borderWidth={1}
          borderColor="rgba(255, 255, 255, 0.18)"
        >
          <Icon
            as={isCollapsed ? ChevronRight : ChevronLeft}
            color="rgba(226, 232, 240, 0.9)"
            size="18"
          />
        </Pressable>
      </VStack>
    </Box>
  );
};

const Brand = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <HStack
    space="md"
    alignItems="center"
    justifyContent={isCollapsed ? 'center' : 'flex-start'}
  >
    <Box
      bg="linear-gradient(135deg, rgba(79,140,255,0.9) 0%, rgba(112,214,255,0.9) 100%)"
      rounded="$lg"
      px="$3"
      py="$3"
      shadowColor="transparent"
    >
      <Text fontWeight="$bold" color="#0B1220">
        CA
      </Text>
    </Box>
    {!isCollapsed && (
      <VStack space="xs">
        <Text fontSize="$lg" fontWeight="$semibold" color="white">
          Customer
        </Text>
        <Text fontSize="$md" color="rgba(148, 163, 184, 0.85)">
          Automator
        </Text>
      </VStack>
    )}
  </HStack>
);

const NavLink = ({
  item,
  isActive,
  isCollapsed,
}: {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
}) => {
  const IconComponent = item.icon;
  const content = (
    <Pressable
      asChild
      px="$3"
      py="$3"
      rounded="$xl"
      bg={isActive ? 'rgba(79, 140, 255, 0.2)' : 'transparent'}
      borderWidth={1}
      borderColor={isActive ? 'rgba(79, 140, 255, 0.5)' : 'rgba(255, 255, 255, 0.05)'}
      sx={{ transition: 'background 220ms ease, border 220ms ease' }}
      _hover={{ bg: 'rgba(79, 140, 255, 0.16)', borderColor: 'rgba(79, 140, 255, 0.45)' }}
    >
      <Link href={item.href} aria-label={item.label}>
        <HStack space="md" alignItems="center">
          <IconComponent size={20} color="rgba(226, 232, 240, 0.9)" />
          {!isCollapsed && (
            <Text color="rgba(226, 232, 240, 0.9)" fontWeight={isActive ? '$semibold' : '$medium'}>
              {item.label}
            </Text>
          )}
        </HStack>
      </Link>
    </Pressable>
  );

  return content;
};
