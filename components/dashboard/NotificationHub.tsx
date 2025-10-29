'use client';

import { GlassCard } from '@/components/common/GlassCard';
import { useAppSelector } from '@/lib/hooks';
import { Bell } from 'lucide-react';
import { VStack, Text, HStack, Badge } from '@gluestack-ui/themed';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

export const NotificationHub = () => {
  const notifications = useAppSelector((state) => state.notifications.items.slice(0, 5));

  return (
    <GlassCard title="Hub notifiche" description="Ultimi avvisi AI e chat" icon={Bell}>
      <VStack space="sm" mt={8}>
        {notifications.map((notification) => (
          <HStack
            key={notification.id}
            justifyContent="space-between"
            alignItems="flex-start"
            px={12}
            py={10}
            borderRadius={tokens.radii.lg}
            bg="rgba(15,23,42,0.35)"
            borderWidth={1}
            borderColor="rgba(148,163,184,0.2)"
          >
            <VStack space="xs">
              <HStack space="xs" alignItems="center">
                <Badge
                  borderRadius={tokens.radii.sm}
                  bg={badgeColor(notification.kind)}
                  color={palette.neutrals.white}
                >
                  {notification.kind.toUpperCase()}
                </Badge>
                <Text fontSize={12} color={palette.steel[300]}>
                  {new Date(notification.createdAt).toLocaleTimeString('it-IT', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
              </HStack>
              <Text fontSize={14} fontWeight="600">
                {notification.title}
              </Text>
              <Text fontSize={12} color={palette.steel[200]}>
                {notification.body}
              </Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </GlassCard>
  );
};

const badgeColor = (kind: string) => {
  switch (kind) {
    case 'ai':
      return palette.teal[500];
    case 'chat':
      return palette.accent[500];
    case 'system':
      return palette.state.warning;
    default:
      return 'rgba(148,163,184,0.45)';
  }
};
