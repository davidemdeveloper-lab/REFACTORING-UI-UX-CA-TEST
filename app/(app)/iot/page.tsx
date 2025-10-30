'use client';

import { devices } from '@/data/devices';
import { Box, Heading, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { Activity, Antenna, PlugZap } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

const statusColors: Record<string, { bg: string; text: string }> = {
  online: { bg: 'rgba(40,200,124,0.18)', text: '#28c87c' },
  offline: { bg: 'rgba(204,47,69,0.18)', text: '#cc2f45' },
  warning: { bg: 'rgba(247,147,30,0.18)', text: '#f7931e' },
};

export default function IoTPage() {
  return (
    <VStack gap="$8">
      <VStack gap="$2">
        <Heading size="2xl" color="$background50">
          Dispositivi Connessi
        </Heading>
        <Text color="rgba(226,235,255,0.7)">
          Monitoraggio in tempo reale di serrature smart, clima e illuminazione.
        </Text>
      </VStack>
      <VStack gap="$4">
        {devices.map((device) => (
          <Box
            key={device.id}
            borderRadius="$xl"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.12)"
            bgColor="rgba(13,24,41,0.55)"
            px="$6"
            py="$4"
            style={{ backdropFilter: 'blur(18px)' }}
          >
            <HStack justifyContent="space-between" alignItems="flex-start" gap="$4">
              <HStack gap="$4" alignItems="center">
                <Box
                  width={52}
                  height={52}
                  borderRadius="$xl"
                  bgColor="rgba(79,111,255,0.18)"
                  alignItems="center"
                  justifyContent="center"
                  borderWidth={1}
                  borderColor="rgba(79,111,255,0.3)"
                >
                  <Icon as={device.type === 'Clima' ? Activity : device.type === 'Accesso' ? Antenna : PlugZap} color="$primary200" />
                </Box>
                <VStack>
                  <Text color="$background50" fontWeight="$bold">
                    {device.name}
                  </Text>
                  <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                    {device.location}
                  </Text>
                </VStack>
              </HStack>
              <VStack alignItems="flex-end">
                <Box
                  px="$3"
                  py="$1.5"
                  borderRadius="$lg"
                  bgColor={statusColors[device.status].bg}
                  borderWidth={1}
                  borderColor="rgba(255,255,255,0.12)"
                >
                  <Text color={statusColors[device.status].text} fontSize="$xs" fontWeight="$bold">
                    {device.status.toUpperCase()}
                  </Text>
                </Box>
                <Text color="rgba(226,235,255,0.6)" fontSize="$xs" mt="$2">
                  Ultimo ping {formatDateTime(device.lastPing)}
                </Text>
              </VStack>
            </HStack>
            <HStack gap="$4" mt="$4" alignItems="center">
              <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                Batteria
              </Text>
              <Box
                flex={1}
                height={8}
                borderRadius="$xl"
                bgColor="rgba(255,255,255,0.06)"
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  bottom={0}
                  width={`${device.battery}%`}
                  bgColor="$primary500"
                />
              </Box>
              <Text color="$background50" fontWeight="$bold">
                {device.battery}%
              </Text>
            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}
