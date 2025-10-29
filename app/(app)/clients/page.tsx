'use client';

import { clients } from '@/data/clients';
import { GlassCard } from '@/components/common/GlassCard';
import { formatDate } from '@/lib/utils';
import {
  Box,
  Button,
  ButtonText,
  Heading,
  HStack,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import NextLink from 'next/link';

export default function ClientsPage() {
  return (
    <VStack gap="$8">
      <HStack justifyContent="space-between" alignItems="flex-end" flexWrap="wrap" gap="$4">
        <VStack gap="$2">
          <Heading size="2xl" color="$background50">
            Lista Clienti
          </Heading>
          <Text color="rgba(226,235,255,0.7)">
            Filtra clienti per stato, numero soggiorni e preferenze.
          </Text>
        </VStack>
        <HStack gap="$3" flexWrap="wrap">
          <Input minWidth="260px">
            <InputField placeholder="Cerca per nome o email" color="$background50" />
          </Input>
          <Button asChild>
            <NextLink href="/clients/new">
              <ButtonText>Accogli nuovo cliente</ButtonText>
            </NextLink>
          </Button>
        </HStack>
      </HStack>
      <GlassCard padding="$0">
        <Box overflowX="auto">
          <Box as="table" width="100%" style={{ borderCollapse: 'collapse' }}>
            <Box as="thead" bgColor="rgba(79,111,255,0.12)">
              <Box as="tr">
                {[ 'Cliente', 'Ultimo aggiornamento', 'Stato soggiorno', 'Numero soggiorni', 'Newsletter', 'Azioni' ].map((header) => (
                  <Box
                    as="th"
                    key={header}
                    textAlign="left"
                    px="$6"
                    py="$4"
                    color="$background50"
                    fontSize="$sm"
                    fontWeight="$semibold"
                  >
                    {header}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box as="tbody">
              {clients.map((client) => (
                <Box as="tr" key={client.id} borderBottomWidth={1} borderColor="rgba(255,255,255,0.08)">
                  <Box as="td" px="$6" py="$4">
                    <VStack>
                      <Text color="$background50" fontWeight="$bold">
                        {client.name}
                      </Text>
                      <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                        {client.email} · {client.phone}
                      </Text>
                    </VStack>
                  </Box>
                  <Box as="td" px="$6" py="$4">
                    <Text color="rgba(226,235,255,0.7)">{formatDate(client.lastUpdate)}</Text>
                  </Box>
                  <Box as="td" px="$6" py="$4">
                    <Text color="$success400">{client.upcomingStay ? 'Inizio email pre check-in' : 'Follow-up fidelizzazione'}</Text>
                  </Box>
                  <Box as="td" px="$6" py="$4">
                    <Text color="rgba(226,235,255,0.7)">{client.staysCount}</Text>
                  </Box>
                  <Box as="td" px="$6" py="$4">
                    <Text color={client.newsletter ? '$success400' : 'rgba(226,235,255,0.6)'}>
                      {client.newsletter ? 'Iscritto' : 'Non iscritto'}
                    </Text>
                  </Box>
                  <Box as="td" px="$6" py="$4">
                    <Button size="sm" variant="outline" asChild>
                      <NextLink href={`/clients/${client.id}`}>
                        <ButtonText>Apri profilo</ButtonText>
                      </NextLink>
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </GlassCard>
    </VStack>
  );
}
