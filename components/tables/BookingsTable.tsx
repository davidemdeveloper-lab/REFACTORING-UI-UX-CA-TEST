'use client';

import { Box, Text, Badge, HStack, Button } from '@gluestack-ui/themed';
import Link from 'next/link';
import type { Booking } from '@/lib/types';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

interface BookingsTableProps {
  bookings: Booking[];
}

export const BookingsTable = ({ bookings }: BookingsTableProps) => (
  <Box
    as="table"
    width="100%"
    sx={{
      borderCollapse: 'separate',
      borderSpacing: 0,
      minWidth: '720px'
    }}
  >
    <Box
      as="thead"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backdropFilter: 'blur(12px)'
      }}
    >
      <Box as="tr" bg="rgba(15,23,42,0.6)">
        {['Booking', 'Cliente', 'Camere', 'Periodo', 'Stato', 'Azioni'].map((header) => (
          <Box
            as="th"
            key={header}
            textAlign="left"
            px={16}
            py={12}
            fontSize={12}
            color={palette.steel[200]}
            fontWeight="600"
          >
            {header}
          </Box>
        ))}
      </Box>
    </Box>
    <Box as="tbody">
      {bookings.map((booking, index) => (
        <Box
          as="tr"
          key={booking.id}
          bg={index % 2 === 0 ? 'rgba(15,23,42,0.35)' : 'rgba(15,23,42,0.2)'}
        >
          <Box as="td" px={16} py={12}>
            <Text fontWeight="600">{booking.id}</Text>
          </Box>
          <Box as="td" px={16} py={12}>
            <Text fontSize={13}>{booking.clientId}</Text>
          </Box>
          <Box as="td" px={16} py={12}>
            <Text fontSize={13}>{booking.roomType}</Text>
          </Box>
          <Box as="td" px={16} py={12}>
            <Text fontSize={13} color={palette.steel[200]}>
              {new Date(booking.checkIn).toLocaleDateString('it-IT')} →{' '}
              {new Date(booking.checkOut).toLocaleDateString('it-IT')}
            </Text>
          </Box>
          <Box as="td" px={16} py={12}>
            <Badge borderRadius={tokens.radii.sm} bg={statusColor(booking.status)} color={palette.neutrals.white}>
              {booking.status}
            </Badge>
          </Box>
          <Box as="td" px={16} py={12}>
            <HStack space="xs">
              <Link href={`/bookings/${booking.id}`}>
                <Button size="sm" variant="outline">
                  Dettagli
                </Button>
              </Link>
            </HStack>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

const statusColor = (status: string) => {
  switch (status) {
    case 'nuovo':
      return palette.state.info;
    case 'confermato':
      return palette.accent[600];
    case 'check-in':
      return palette.teal[500];
    case 'check-out':
      return palette.steel[400];
    case 'perso':
      return palette.state.danger;
    default:
      return palette.state.warning;
  }
};
