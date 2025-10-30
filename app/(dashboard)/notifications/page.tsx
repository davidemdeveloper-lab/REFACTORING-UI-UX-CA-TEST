'use client';

import { useMemo, useState } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Switch,
  Box,
  ScrollView,
} from '@gluestack-ui/themed';
import { BellRing } from 'lucide-react';
import { notifications } from '@/data/notifications';
import { formatTimeDistance } from '@/utils/format';
import { GlassCard } from '@/components/common/GlassCard';

export default function NotificationsPage() {
  const [showRead, setShowRead] = useState(false);

  const filteredNotifications = useMemo(
    () => notifications.filter((notification) => showRead || !notification.isRead),
    [showRead]
  );

  return (
    <VStack space="xl">
      <HStack space="sm" alignItems="center">
        <BellRing size={22} color="#8CB6FF" />
        <Heading size="lg" color="white">
          Centro Notifiche
        </Heading>
      </HStack>

      <GlassCard>
        <HStack justifyContent="space-between" alignItems="center" mb="$4">
          <Text color="rgba(148,163,184,0.85)">
            Eventi operativi, alert IoT e attività assegnate.
          </Text>
          <HStack space="sm" alignItems="center">
            <Text color="rgba(148,163,184,0.85)" fontSize="$sm">
              Mostra notifiche lette
            </Text>
            <Switch value={showRead} onToggle={setShowRead} />
          </HStack>
        </HStack>

        <ScrollView>
          <VStack space="md">
            {filteredNotifications.map((notification) => (
              <Box
                key={notification.id}
                px="$4"
                py="$4"
                rounded="$xl"
                bg={notification.isRead ? 'rgba(255,255,255,0.05)' : 'rgba(79,140,255,0.12)'}
                borderWidth={1}
                borderColor={notification.isRead ? 'rgba(255,255,255,0.08)' : 'rgba(79,140,255,0.4)'}
              >
                <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap">
                  <VStack space="xs">
                    <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
                      {notification.title}
                    </Text>
                    <Text color="rgba(148,163,184,0.8)" fontSize="$sm">
                      {notification.description}
                    </Text>
                  </VStack>
                  <Badge variant="solid" bg={categoryColor(notification.category)} borderColor="transparent">
                    <Text color="#0B1220" fontWeight="$semibold">
                      {notification.category.toUpperCase()}
                    </Text>
                  </Badge>
                </HStack>
                <Text color="rgba(148,163,184,0.75)" fontSize="$xs" mt="$2">
                  {formatTimeDistance(notification.timestamp)} · {notification.assignee}
                </Text>
              </Box>
            ))}
          </VStack>
        </ScrollView>
      </GlassCard>
    </VStack>
  );
}

const categoryColor = (category: string) => {
  switch (category) {
    case 'alert':
      return 'rgba(248,113,113,0.9)';
    case 'task':
      return 'rgba(129,140,248,0.85)';
    case 'success':
      return 'rgba(34,197,94,0.85)';
    default:
      return 'rgba(253,224,71,0.85)';
  }
};
