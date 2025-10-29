'use client';

import { Box, Text, Badge } from '@gluestack-ui/themed';
import type { Client } from '@/lib/types';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

interface ClientsTableProps {
  clients: Client[];
}

export const ClientsTable = ({ clients }: ClientsTableProps) => (
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
        {['Cliente', 'Email', 'Telefono', 'Ultimo contatto', 'Stato', 'SPA'].map((header) => (
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
      {clients.map((client, index) => (
        <Box
          as="tr"
          key={client.id}
          bg={index % 2 === 0 ? 'rgba(15,23,42,0.35)' : 'rgba(15,23,42,0.2)'}
        >
          <Box as="td" px={16} py={12}>
            <Text fontWeight="600">{client.name}</Text>
          </Box>
          <Box as="td" px={16} py={12}>
            <Text fontSize={13}>{client.email}</Text>
          </Box>
          <Box as="td" px={16} py={12}>
            <Text fontSize={13}>{client.phone}</Text>
          </Box>
          <Box as="td" px={16} py={12}>
            <Text fontSize={13} color={palette.steel[200]}>
              {new Date(client.lastContact).toLocaleDateString('it-IT')}
            </Text>
          </Box>
          <Box as="td" px={16} py={12}>
            <Badge bg={badgeColor(client.status)} color={palette.neutrals.white} borderRadius={tokens.radii.sm}>
              {client.status}
            </Badge>
          </Box>
          <Box as="td" px={16} py={12}>
            <Text fontSize={13} color={client.spaOptIn ? palette.teal[500] : palette.steel[200]}>
              {client.spaOptIn ? 'Iscritto' : 'Non iscritto'}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

const badgeColor = (status: string) => {
  switch (status) {
    case 'vip':
      return palette.teal[500];
    case 'attivo':
      return palette.accent[600];
    default:
      return palette.state.warning;
  }
};
