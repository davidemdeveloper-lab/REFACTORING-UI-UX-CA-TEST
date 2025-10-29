'use client';

import { notifications } from '@/data/notifications';
import { usePreferences } from '@/stores/preferences';
import {
  Box,
  Button,
  ButtonText,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { BellRing, Filter } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default function NotificationsPage() {
  const { notificationsFilter, setNotificationsFilter } = usePreferences();
  const filtered = notificationsFilter === 'non-lette'
    ? notifications.filter((notification) => !notification.read)
    : notifications;

  return (
    <VStack gap="$8">
      <HStack justifyContent="space-between" alignItems="center">
        <VStack gap="$2">
          <Heading size="2xl" color="$background50">
            Centro Notifiche
          </Heading>
          <Text color="rgba(226,235,255,0.7)">
            Gestisci alert operativi, upsell e comunicazioni automatiche.
          </Text>
        </VStack>
        <HStack gap="$3">
          <Button
            variant={notificationsFilter === 'tutte' ? 'solid' : 'outline'}
            size="sm"
            onPress={() => setNotificationsFilter('tutte')}
          >
            <ButtonText>Tutte</ButtonText>
          </Button>
          <Button
            variant={notificationsFilter === 'non-lette' ? 'solid' : 'outline'}
            size="sm"
            onPress={() => setNotificationsFilter('non-lette')}
          >
            <ButtonText>Non lette</ButtonText>
          </Button>
        </HStack>
      </HStack>
      <VStack gap="$4">
        {filtered.map((notification) => (
          <Box
            key={notification.id}
            borderRadius="$xl"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.12)"
            bgColor={notification.read ? 'rgba(255,255,255,0.04)' : 'rgba(79,111,255,0.12)'}
            px="$6"
            py="$4"
            style={{ backdropFilter: 'blur(18px)' }}
          >
            <HStack justifyContent="space-between" alignItems="flex-start" gap="$4">
              <HStack gap="$3" alignItems="center">
                <Icon as={BellRing} color="$primary200" />
                <VStack>
                  <Text color="$background50" fontWeight="$bold">
                    {notification.title}
                  </Text>
                  <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                    {notification.description}
                  </Text>
                </VStack>
              </HStack>
              <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                {formatDateTime(notification.timestamp)}
              </Text>
            </HStack>
            <HStack justifyContent="space-between" mt="$3" alignItems="center">
              <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                Categoria: {notification.category} · Priorità {notification.priority}
              </Text>
              <Button variant="outline" size="xs">
                <HStack alignItems="center" gap="$2">
                  <Icon as={Filter} color="$background50" />
                  <ButtonText>Imposta regola</ButtonText>
                </HStack>
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}
