'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  InputField,
  Badge,
  Button,
  Divider,
} from '@gluestack-ui/themed';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { clients } from '@/data/clients';
import { formatDate, formatTimeDistance } from '@/utils/format';
import { GlassCard } from '@/components/common/GlassCard';

const filters = ['Ultimo aggiornamento', 'Numero soggiorni', 'Adesione newsletter'];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  const filteredClients = useMemo(() => {
    const normalized = searchTerm.toLowerCase();
    const base = clients.filter((client) =>
      `${client.name} ${client.surname}`.toLowerCase().includes(normalized) ||
      client.email.toLowerCase().includes(normalized)
    );

    switch (selectedFilter) {
      case 'Numero soggiorni':
        return [...base].sort((a, b) => b.staysCount - a.staysCount);
      case 'Adesione newsletter':
        return [...base].sort((a, b) => Number(b.newsletterOptIn) - Number(a.newsletterOptIn));
      default:
        return [...base].sort(
          (a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
        );
    }
  }, [searchTerm, selectedFilter]);

  return (
    <VStack space="xl">
      <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" space="lg">
        <VStack space="xs">
          <Heading size="lg" color="white">
            Lista Clienti
          </Heading>
          <Text color="rgba(148, 163, 184, 0.85)">
            Monitora newsletter, esperienze e stato del pre check-in in un colpo d’occhio.
          </Text>
        </VStack>
        <Button asChild variant="solid" bg="rgba(79, 140, 255, 0.9)" borderColor="transparent">
          <Link href="/clients/new">
            <HStack space="sm" alignItems="center">
              <Plus size={16} color="white" />
              <Text color="white" fontWeight="$semibold">
                Aggiungi cliente
              </Text>
            </HStack>
          </Link>
        </Button>
      </HStack>

      <GlassCard>
        <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" space="lg" mb="$4">
          <HStack space="md" alignItems="center">
            <Text color="rgba(148, 163, 184, 0.85)">Ordina per:</Text>
            <Box
              px="$4"
              py="$2"
              rounded="$lg"
              bg="rgba(255, 255, 255, 0.08)"
              borderWidth={1}
              borderColor="rgba(255, 255, 255, 0.2)"
            >
              <select
                value={selectedFilter}
                onChange={(event) => setSelectedFilter(event.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(226, 232, 240, 0.92)',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {filters.map((filter) => (
                  <option key={filter} value={filter} style={{ color: '#0F172A' }}>
                    {filter}
                  </option>
                ))}
              </select>
            </Box>
          </HStack>
          <Input
            width={280}
            bg="rgba(255, 255, 255, 0.08)"
            borderColor="rgba(255, 255, 255, 0.2)"
            rounded="$full"
            px="$4"
          >
            <HStack space="sm" alignItems="center">
              <Search size={16} color="rgba(148, 163, 184, 0.9)" />
              <InputField
                placeholder="Cerca cliente o email"
                value={searchTerm}
                onChangeText={setSearchTerm}
                color="rgba(226, 232, 240, 0.92)"
              />
            </HStack>
          </Input>
        </HStack>
        <Box overflowX="auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
            <thead>
              <tr>
                {['Cliente', 'Ultimo aggiornamento', 'Stato ultimo soggiorno', 'Numero soggiorni', 'Newsletter'].map(
                  (header) => (
                    <th
                      key={header}
                      style={{
                        textAlign: 'left',
                        padding: '12px 16px',
                        color: 'rgba(148,163,184,0.75)',
                        fontWeight: 500,
                        fontSize: '12px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {header.toUpperCase()}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <VStack space="xs">
                      <Link href={`/clients/${client.id}`}>
                        <Text color="rgba(226, 232, 240, 0.95)" fontWeight="$semibold">
                          {client.name} {client.surname}
                        </Text>
                      </Link>
                      <Text color="rgba(148, 163, 184, 0.8)" fontSize="$xs">
                        {client.email}
                      </Text>
                    </VStack>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Text color="rgba(226, 232, 240, 0.9)">{formatTimeDistance(client.lastUpdate)}</Text>
                    <Text color="rgba(148, 163, 184, 0.75)" fontSize="$xs">
                      Ultimo soggiorno {formatDate(client.lastStayDate)}
                    </Text>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge
                      variant="solid"
                      bg={statusColor(client.lastStayStatus)}
                      borderColor="transparent"
                    >
                      <Text color="#0B1220" fontWeight="$semibold">
                        {client.lastStayStatus.toUpperCase()}
                      </Text>
                    </Badge>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Text color="rgba(226, 232, 240, 0.9)">{client.staysCount}</Text>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Text color="rgba(226, 232, 240, 0.9)">
                      {client.newsletterOptIn ? 'Iscritto' : 'No'}
                    </Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </GlassCard>
    </VStack>
  );
}

const statusColor = (status: string) => {
  switch (status) {
    case 'vip':
      return 'rgba(253, 186, 116, 0.9)';
    case 'attenzione':
      return 'rgba(249, 115, 22, 0.9)';
    case 'confermato':
      return 'rgba(16, 185, 129, 0.9)';
    default:
      return 'rgba(79, 140, 255, 0.85)';
  }
};
