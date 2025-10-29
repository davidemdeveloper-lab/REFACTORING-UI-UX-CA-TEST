'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { palette } from '@/design/palette';
import { memo } from 'react';
import { Icon } from '@/components/layout/UiIcon';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Clienti', href: '/clients', icon: 'Users' },
  { label: 'Prenotazioni', href: '/reservations', icon: 'CalendarRange' },
  { label: 'Template Email', href: '/templates', icon: 'Mails' },
  { label: 'Chat', href: '/chat', icon: 'MessageSquare' },
];

const SidebarNavComponent = () => {
  const pathname = usePathname();
  return (
    <Box
      className="hidden lg:flex"
      style={{
        width: 260,
        padding: 24,
        background: palette.surface,
        backdropFilter: 'blur(18px)',
        borderRight: `1px solid ${palette.borderSoft}`,
        boxShadow: `0 20px 40px ${palette.shadowDark}`,
      }}
    >
      <VStack space="lg" className="w-full">
        <Box
          style={{
            padding: 18,
            borderRadius: 18,
            background: palette.surfaceAlt,
            border: `1px solid ${palette.glassStroke}`,
          }}
        >
          <Text className="text-2xl font-semibold" style={{ color: palette.accentPrimary }}>
            Customer Automator
          </Text>
          <Text className="mt-2 text-sm" style={{ color: palette.textMuted }}>
            Hub di automazione ospitalità
          </Text>
        </Box>
        <VStack space="md" className="w-full">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <HStack
                  space="md"
                  className="items-center"
                  style={{
                    padding: 14,
                    borderRadius: 14,
                    background: isActive ? palette.surfaceAlt : 'transparent',
                    border: `1px solid ${isActive ? palette.borderHighlight : 'transparent'}`,
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <Icon name={item.icon} color={isActive ? palette.accentPrimary : palette.textSecondary} />
                  <Text
                    className="text-base font-medium"
                    style={{ color: isActive ? palette.textPrimary : palette.textSecondary }}
                  >
                    {item.label}
                  </Text>
                </HStack>
              </Link>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
};

export const SidebarNav = memo(SidebarNavComponent);
