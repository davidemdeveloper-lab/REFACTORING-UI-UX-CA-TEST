'use client';

import { useState } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Switch,
  Box,
  Button,
} from '@gluestack-ui/themed';
import { Cpu, RefreshCw } from 'lucide-react';
import { devices } from '@/data/devices';
import { formatTimeDistance } from '@/utils/format';
import { GlassCard } from '@/components/common/GlassCard';

export default function IoTPage() {
  const [selectedDevices, setSelectedDevices] = useState<Record<string, boolean>>({});

  const toggleDevice = (deviceId: string) => {
    setSelectedDevices((state) => ({ ...state, [deviceId]: !state[deviceId] }));
  };

  return (
    <VStack space="xl">
      <HStack space="sm" alignItems="center">
        <Cpu size={22} color="#8CB6FF" />
        <Heading size="lg" color="white">
          Automazioni IoT
        </Heading>
      </HStack>
      <Text color="rgba(148,163,184,0.85)">
        Monitora sensori e dispositivi connessi, abilita regole di automazione in tempo reale.
      </Text>

      <HStack space="lg" flexWrap="wrap">
        {devices.map((device) => (
          <GlassCard key={device.id} flexBasis="320px" flexGrow={1}>
            <VStack space="md">
              <HStack justifyContent="space-between" alignItems="center">
                <VStack space="xs">
                  <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
                    {device.name}
                  </Text>
                  <Text color="rgba(148,163,184,0.8)" fontSize="$xs">
                    {device.location}
                  </Text>
                </VStack>
                <Badge variant="solid" bg={statusColor(device.status)} borderColor="transparent">
                  <Text color="#0B1220" fontWeight="$semibold">
                    {device.status.toUpperCase()}
                  </Text>
                </Badge>
              </HStack>
              <Text color="rgba(148,163,184,0.8)">
                Ultimo ping {formatTimeDistance(device.lastPing)} · Batteria {device.battery}%
              </Text>
              <Box px="$4" py="$3" rounded="$xl" bg="rgba(79,140,255,0.12)">
                <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
                  Automazione attiva
                </Text>
                <Text color="rgba(148,163,184,0.8)" fontSize="$sm">
                  {device.automationBound}
                </Text>
              </Box>
              <HStack space="md" alignItems="center" justifyContent="space-between">
                <HStack space="xs" alignItems="center">
                  <Switch value={selectedDevices[device.id] ?? true} onToggle={() => toggleDevice(device.id)} />
                  <Text color="rgba(226,232,240,0.95)">
                    Automazione {selectedDevices[device.id] ?? true ? 'attiva' : 'in pausa'}
                  </Text>
                </HStack>
                <Button variant="outline" borderColor="rgba(255,255,255,0.2)" px="$3" py="$2">
                  <HStack space="xs" alignItems="center">
                    <RefreshCw size={14} color="rgba(226,232,240,0.9)" />
                    <Text color="rgba(226,232,240,0.9)" fontSize="$xs">
                      Sincronizza
                    </Text>
                  </HStack>
                </Button>
              </HStack>
            </VStack>
          </GlassCard>
        ))}
      </HStack>
    </VStack>
  );
}

const statusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'rgba(34,197,94,0.85)';
    case 'offline':
      return 'rgba(248,113,113,0.9)';
    default:
      return 'rgba(253,224,71,0.85)';
  }
};
