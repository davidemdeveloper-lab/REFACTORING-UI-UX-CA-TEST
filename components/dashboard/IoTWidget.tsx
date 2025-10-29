'use client';

import { GlassCard } from '@/components/common/GlassCard';
import { useAppSelector } from '@/lib/hooks';
import { PlugZap } from 'lucide-react';
import { Text, HStack, Badge, VStack } from '@gluestack-ui/themed';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

export const IoTWidget = () => {
  const devices = useAppSelector((state) => state.iot.devices);
  const online = devices.filter((device) => device.status === 'online').length;
  const offline = devices.filter((device) => device.status !== 'online').length;

  return (
    <GlassCard title="Stato dispositivi IoT" description="Monitoraggio rapido camere e aree" icon={PlugZap}>
      <HStack space="lg" mt={8} alignItems="center">
        <VStack>
          <Text fontSize={32} fontWeight="700">
            {online}
          </Text>
          <Text fontSize={12} color={palette.steel[200]}>
            Online
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={32} fontWeight="700" color={palette.state.warning}>
            {offline}
          </Text>
          <Text fontSize={12} color={palette.steel[200]}>
            Offline / warning
          </Text>
        </VStack>
        <Badge
          borderRadius={tokens.radii.md}
          bg={palette.accent[600]}
          color={palette.neutrals.white}
          px={14}
          py={8}
        >
          Gestisci IoT
        </Badge>
      </HStack>
    </GlassCard>
  );
};
