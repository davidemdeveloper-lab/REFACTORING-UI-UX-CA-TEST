'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GlassPanel } from '@/components/common/GlassPanel';
import { NotificationsList } from '@/components/notifications/NotificationsList';
import { markAllAsRead, markAsRead } from '@/features/notifications/notificationsSlice';
import { VStack, HStack, Text, Button } from '@gluestack-ui/themed';

export default function NotificationsPage() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.notifications.items);

  return (
    <VStack space="md">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Notifiche' }]} />
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize={24} fontWeight="700">
          Centro notifiche
        </Text>
        <Button variant="outline" onPress={() => dispatch(markAllAsRead())}>
          Segna tutte come lette
        </Button>
      </HStack>
      <GlassPanel>
        <NotificationsList
          notifications={notifications}
          onMarkAsRead={(id) => dispatch(markAsRead(id))}
        />
      </GlassPanel>
    </VStack>
  );
}
