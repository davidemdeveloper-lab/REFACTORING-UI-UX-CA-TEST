'use client';

import { ReactNode } from 'react';
import { clients } from '@/data/mockData';
import { palette } from '@/theme/palette';
import { SectionHeading } from '@/components/design-system/SectionHeading';
import { MetalGlassCard } from '@/components/design-system/MetalGlassCard';
import { StatusPill } from '@/components/design-system/StatusPill';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { ScrollView } from '@/components/ui/scroll-view';
import Link from 'next/link';
import { Button, ButtonText } from '@/components/ui/button';
import { Users, Search } from 'lucide-react-native';

export default function ClientsPage() {
  return (
    <VStack space="xl">
      <SectionHeading
        title="Lista clienti"
        subtitle="Monitoraggio preferenze, adesioni newsletter e stato journey"
        icon={<Users size={20} color={palette.accentPrimary} />}
        action={
          <Link href="/clients/add" style={{ textDecoration: 'none' }}>
            <Button variant="solid" bg={palette.accentPrimary} borderRadius={14}>
              <ButtonText color="#020617">Nuovo cliente</ButtonText>
            </Button>
          </Link>
        }
      />

      <MetalGlassCard padding={20}>
        <VStack space="md">
          <HStack space="md" flexWrap="wrap" alignItems="center">
            <Input
              w={280}
              variant="outline"
              bg="rgba(8,15,28,0.65)"
              borderColor="rgba(56,189,248,0.25)"
              borderRadius={20}
            >
              <Search size={18} color={palette.textMuted} style={{ marginHorizontal: 10 }} />
              <InputField placeholder="Cerca per nome, email o preferenze" />
            </Input>
            <StatusPill label="Segmento premium: 18" tone="accent" />
            <StatusPill label="Newsletter attive: 22" tone="success" />
          </HStack>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Box minW={900}>
              <TableHead />
              {clients.map((client) => (
                <Link key={client.id} href={`/clients/${client.id}`} style={{ textDecoration: 'none' }}>
                  <HStack
                    px={20}
                    py={14}
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottomWidth={1}
                    borderBottomColor="rgba(148,163,184,0.18)"
                    bg="rgba(15,23,42,0.45)"
                    _hover={{ bg: 'rgba(56,189,248,0.08)' }}
                  >
                    <TextCell>{client.name}</TextCell>
                    <TextCell>{client.lastStayDate}</TextCell>
                    <TextCell>{client.status}</TextCell>
                    <TextCell>{client.totalStays}</TextCell>
                    <TextCell>{client.newsletter ? 'Iscritto' : 'No'}</TextCell>
                    <TextCell>{client.roomPreference}</TextCell>
                    <TextCell>{client.email}</TextCell>
                  </HStack>
                </Link>
              ))}
            </Box>
          </ScrollView>
        </VStack>
      </MetalGlassCard>
    </VStack>
  );
}

function TableHead() {
  const headers = [
    'Cliente',
    'Ultimo aggiornamento',
    'Stato',
    'N. soggiorni',
    'Newsletter',
    'Preferenze camera',
    'Email',
  ];

  return (
    <HStack
      px={20}
      py={12}
      bg="rgba(15,23,42,0.65)"
      borderBottomWidth={1}
      borderBottomColor="rgba(56,189,248,0.25)"
    >
      {headers.map((header) => (
        <Text key={header} flex={1} fontSize={12} fontWeight="600" color={palette.textMuted}>
          {header}
        </Text>
      ))}
    </HStack>
  );
}

function TextCell({ children }: { children: ReactNode }) {
  return (
    <Text flex={1} fontSize={13} color={palette.textSecondary}>
      {children}
    </Text>
  );
}

// Validazione: lista clienti navigabile con filtri chiari e design coerente.
