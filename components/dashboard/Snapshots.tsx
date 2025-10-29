'use client';

import { GlassCard } from '@/components/common/GlassCard';
import { useAppSelector } from '@/lib/hooks';
import { CalendarDays, Users } from 'lucide-react';
import { VStack, HStack, Text, Badge } from '@gluestack-ui/themed';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

export const Snapshots = () => {
  const bookings = useAppSelector((state) => state.bookings.items.slice(0, 4));
  const clients = useAppSelector((state) => state.clients.items.slice(0, 4));

  return (
    <HStack space="md" flexWrap="wrap">
      <GlassCard title="Prenotazioni attuali" description="Stato aggiornato" icon={CalendarDays}>
        <VStack space="xs" mt={8}>
          {bookings.map((booking) => (
            <HStack
              key={booking.id}
              justifyContent="space-between"
              alignItems="center"
              borderRadius={tokens.radii.lg}
              px={12}
              py={10}
              bg="rgba(15,23,42,0.35)"
              borderWidth={1}
              borderColor="rgba(148,163,184,0.2)"
            >
              <VStack>
                <Text fontSize={14} fontWeight="600">
                  {booking.roomType}
                </Text>
                <Text fontSize={12} color={palette.steel[200]}>
                  {new Date(booking.checkIn).toLocaleDateString('it-IT')} →{' '}
                  {new Date(booking.checkOut).toLocaleDateString('it-IT')}
                </Text>
              </VStack>
              <Badge
                borderRadius={tokens.radii.sm}
                bg={stateColor(booking.status)}
                color={palette.neutrals.white}
              >
                {booking.status}
              </Badge>
            </HStack>
          ))}
        </VStack>
      </GlassCard>
      <GlassCard title="Clienti attivi" description="Focus VIP e loyalty" icon={Users}>
        <VStack space="xs" mt={8}>
          {clients.map((client) => (
            <HStack
              key={client.id}
              justifyContent="space-between"
              alignItems="center"
              borderRadius={tokens.radii.lg}
              px={12}
              py={10}
              bg="rgba(15,23,42,0.35)"
              borderWidth={1}
              borderColor="rgba(148,163,184,0.2)"
            >
              <VStack>
                <Text fontSize={14} fontWeight="600">
                  {client.name}
                </Text>
                <Text fontSize={12} color={palette.steel[200]}>
                  Ultimo contatto:{' '}
                  {new Date(client.lastContact).toLocaleDateString('it-IT')}
                </Text>
              </VStack>
              {client.vip ? (
                <Badge borderRadius={tokens.radii.sm} bg={palette.teal[500]} color={palette.neutrals.white}>
                  VIP
                </Badge>
              ) : null}
            </HStack>
          ))}
        </VStack>
      </GlassCard>
    </HStack>
  );
};

const stateColor = (status: string) => {
  switch (status) {
    case 'confermato':
    case 'check-in':
      return palette.accent[600];
    case 'check-out':
      return palette.teal[500];
    case 'perso':
      return palette.state.danger;
    default:
      return palette.state.info;
  }
};
