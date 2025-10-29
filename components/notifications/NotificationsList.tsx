'use client';

import { VStack, HStack, Text, Badge, Button } from '@gluestack-ui/themed';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';
import type { Notification } from '@/lib/types';

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export const NotificationsList = ({ notifications, onMarkAsRead }: NotificationsListProps) => (
  <VStack space="sm">
    {notifications.map((notification) => (
      <HStack
        key={notification.id}
        justifyContent="space-between"
        alignItems="flex-start"
        borderRadius={tokens.radii.glass}
        px={16}
        py={14}
        bg="rgba(15,23,42,0.35)"
        borderWidth={1}
        borderColor="rgba(148,163,184,0.2)"
      >
        <VStack space="xs">
          <HStack space="sm" alignItems="center">
            <Badge bg={badgeColor(notification.kind)} color={palette.neutrals.white} borderRadius={tokens.radii.sm}>
              {notification.kind.toUpperCase()}
            </Badge>
            <Text fontSize={12} color={palette.steel[300]}>
              {new Date(notification.createdAt).toLocaleString('it-IT')}
            </Text>
          </HStack>
          <Text fontSize={14} fontWeight="600">
            {notification.title}
          </Text>
          <Text fontSize={12} color={palette.steel[200]}>
            {notification.body}
          </Text>
        </VStack>
        {!notification.read ? (
          <Button size="sm" variant="outline" onPress={() => onMarkAsRead(notification.id)}>
            Segna come letta
          </Button>
        ) : null}
      </HStack>
    ))}
  </VStack>
);

const badgeColor = (kind: string) => {
  switch (kind) {
    case 'ai':
      return palette.teal[500];
    case 'chat':
      return palette.accent[500];
    case 'booking':
      return palette.accent[600];
    case 'system':
      return palette.state.warning;
    default:
      return 'rgba(148,163,184,0.45)';
  }
};
