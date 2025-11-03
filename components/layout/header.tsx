'use client';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { Bell } from 'lucide-react-native';

type HeaderProps = {
  onOpenNotifications: () => void;
  unreadCount: number;
};

export function Header({ onOpenNotifications, unreadCount }: HeaderProps) {
  return (
    <Box className="flex flex-col gap-5 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 shadow-sm md:flex-row md:items-center md:justify-between md:gap-8 md:px-10">
      <Box className="max-w-[60%]">
        <Text className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--color-neutral-600)]">
          Oggi · 28 ottobre 2025
        </Text>
        <Text className="mt-1 text-2xl font-semibold text-[var(--color-neutral-900)] md:text-[28px]">
          Buongiorno, Davide
        </Text>
        <Text className="mt-2 text-sm leading-6 text-[var(--color-neutral-600)]">
          Focus sui clienti prioritari, sulle automazioni in corso e sulle note di turno.
        </Text>
      </Box>
      <HStack className="items-center gap-4">
        <Button
          size="md"
          action="primary"
          variant="outline"
          onPress={onOpenNotifications}
          className="rounded-full border-[var(--color-border)] bg-white px-5 py-2 shadow-sm"
        >
          <HStack className="items-center gap-2">
            <Bell size={18} color="var(--color-primary-600)" />
            <Text className="text-sm font-semibold text-[var(--color-primary-600)]">
              Centro notifiche
            </Text>
            {unreadCount > 0 ? (
              <Box className="ml-1 rounded-full bg-[var(--color-primary-600)] px-2 py-0.5">
                <Text className="text-xs font-semibold text-white">
                  {unreadCount}
                </Text>
              </Box>
            ) : null}
          </HStack>
        </Button>
        <Avatar size="sm">
          <AvatarFallbackText>DM</AvatarFallbackText>
        </Avatar>
      </HStack>
    </Box>
  );
}
