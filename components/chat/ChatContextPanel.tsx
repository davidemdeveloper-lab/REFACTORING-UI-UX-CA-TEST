'use client';

import { VStack, Text, HStack, Badge, Box } from '@gluestack-ui/themed';
import type { Booking, Client, Template } from '@/lib/types';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

interface ChatContextPanelProps {
  client?: Client;
  booking?: Booking;
  nextTemplate?: Template;
}

export const ChatContextPanel = ({ client, booking, nextTemplate }: ChatContextPanelProps) => (
  <VStack
    minWidth={260}
    maxWidth={300}
    borderRadius={tokens.radii.glass}
    px={16}
    py={16}
    bg="rgba(15,23,42,0.35)"
    borderWidth={1}
    borderColor="rgba(148,163,184,0.2)"
    space="md"
  >
    <Box>
      <Text fontSize={12} color={palette.steel[200]}>
        Cliente
      </Text>
      <Text fontSize={16} fontWeight="700">
        {client?.name ?? 'Seleziona una conversazione'}
      </Text>
      <Text fontSize={12} color={palette.steel[300]}>
        {client?.email}
      </Text>
      <Text fontSize={12} color={palette.steel[300]}>
        {client?.phone}
      </Text>
      {client?.vip ? (
        <Badge mt={8} borderRadius={tokens.radii.sm} bg={palette.teal[500]} color={palette.neutrals.white}>
          VIP Guest
        </Badge>
      ) : null}
    </Box>
    <Box>
      <Text fontSize={12} color={palette.steel[200]}>
        Prenotazione collegata
      </Text>
      {booking ? (
        <VStack space="xs" mt={4}>
          <HStack justifyContent="space-between">
            <Text fontSize={13} fontWeight="600">
              {booking.roomType}
            </Text>
            <Badge
              borderRadius={tokens.radii.sm}
              bg={booking.status === 'perso' ? palette.state.danger : palette.accent[600]}
              color={palette.neutrals.white}
            >
              {booking.status}
            </Badge>
          </HStack>
          <Text fontSize={12} color={palette.steel[200]}>
            Check-in {new Date(booking.checkIn).toLocaleDateString('it-IT')}
          </Text>
          <Text fontSize={12} color={palette.steel[200]}>
            Check-out {new Date(booking.checkOut).toLocaleDateString('it-IT')}
          </Text>
        </VStack>
      ) : (
        <Text fontSize={12} color={palette.steel[300]} mt={4}>
          Nessuna prenotazione associata.
        </Text>
      )}
    </Box>
    <Box>
      <Text fontSize={12} color={palette.steel[200]}>
        Prossima email consigliata
      </Text>
      {nextTemplate ? (
        <VStack mt={4} space="xs">
          <Text fontSize={13} fontWeight="600">
            {nextTemplate.name}
          </Text>
          <Text fontSize={12} color={palette.steel[200]}>
            {nextTemplate.subject}
          </Text>
        </VStack>
      ) : (
        <Text fontSize={12} color={palette.steel[300]} mt={4}>
          Nessun template suggerito al momento.
        </Text>
      )}
    </Box>
  </VStack>
);
