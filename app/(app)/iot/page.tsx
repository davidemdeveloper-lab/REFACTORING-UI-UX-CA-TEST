'use client';

import { useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GlassPanel } from '@/components/common/GlassPanel';
import { VStack, HStack, Text, Badge, Button, Switch, Input, InputField } from '@gluestack-ui/themed';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

export default function IoTPage() {
  const devices = useAppSelector((state) => state.iot.devices);
  const [onlyOffline, setOnlyOffline] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = devices.filter((device) => {
    if (onlyOffline && device.status === 'online') return false;
    return device.roomNo.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <VStack space="md">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'IoT' }]} />
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize={24} fontWeight="700">
          Dispositivi IoT
        </Text>
        <Button action="primary">Sincronizza (mock)</Button>
      </HStack>
      <GlassPanel>
        <VStack space="md">
          <HStack space="md" flexWrap="wrap" alignItems="center">
            <Input minWidth={220} flex={1} bg="rgba(15,23,42,0.35)" borderColor="rgba(148,163,184,0.2)">
              <InputField value={search} onChangeText={setSearch} placeholder="Cerca per stanza" />
            </Input>
            <HStack space="sm" alignItems="center">
              <Switch value={onlyOffline} onValueChange={setOnlyOffline} accessibilityLabel="Mostra solo dispositivi offline" />
              <Text fontSize={13}>Mostra solo offline/warning</Text>
            </HStack>
          </HStack>
          <HStack flexWrap="wrap" space="md">
            {filtered.map((device) => (
              <VStack
                key={device.id}
                borderRadius={tokens.radii.glass}
                px={16}
                py={14}
                bg="rgba(15,23,42,0.35)"
                borderWidth={1}
                borderColor="rgba(148,163,184,0.2)"
                space="xs"
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <Text fontSize={16} fontWeight="600">
                    {device.roomNo}
                  </Text>
                  <Badge bg={statusColor(device.status)} color={palette.neutrals.white} borderRadius={tokens.radii.sm}>
                    {device.status}
                  </Badge>
                </HStack>
                <Text fontSize={13} color={palette.steel[200]}>
                  Tipo: {device.type}
                </Text>
                <Text fontSize={12} color={palette.steel[300]}>
                  Ultimo segnale: {new Date(device.lastSeen).toLocaleString('it-IT')}
                </Text>
                <HStack space="sm" mt={6} flexWrap="wrap">
                  <Button size="sm" variant="outline">
                    Diagnostica
                  </Button>
                  <Button size="sm" variant="outline">
                    Riavvia
                  </Button>
                </HStack>
              </VStack>
            ))}
          </HStack>
          {filtered.length === 0 ? (
            <Text fontSize={13} color={palette.steel[200]}>
              Nessun dispositivo corrisponde ai filtri.
            </Text>
          ) : null}
        </VStack>
      </GlassPanel>
    </VStack>
  );
}

const statusColor = (status: string) => {
  switch (status) {
    case 'online':
      return palette.teal[500];
    case 'offline':
      return palette.state.danger;
    default:
      return palette.state.warning;
  }
};
