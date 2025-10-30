'use client';

import { GlassCard } from '@/components/common/GlassCard';
import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { formatDateTime } from '@/lib/utils';
import { Box, Heading, HStack, Text, VStack } from '@gluestack-ui/themed';

const timeline = bookings[0].timeline;

export function CommunicationsTimeline() {
  const client = clients.find((item) => item.id === bookings[0].clientId);
  return (
    <GlassCard>
      <VStack gap="$6">
        <Heading size="lg" color="$background50">
          Comunicazioni con {client?.name}
        </Heading>
        <VStack gap="$4">
          {timeline.map((item) => (
            <HStack key={item.label} gap="$4" alignItems="flex-start">
              <Box
                width={12}
                height={12}
                borderRadius="$full"
                bgColor={item.type === 'success' ? 'rgba(40,200,124,0.6)' : 'rgba(79,111,255,0.6)'}
                marginTop="$1"
              />
              <VStack>
                <Text color="$background50" fontWeight="$bold">
                  {item.label}
                </Text>
                <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                  {formatDateTime(item.timestamp)}
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </GlassCard>
  );
}
