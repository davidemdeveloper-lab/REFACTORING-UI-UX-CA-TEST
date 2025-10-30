'use client';

import { clients } from '@/data/clients';
import { bookings } from '@/data/bookings';
import { GlassCard } from '@/components/common/GlassCard';
import { formatDate } from '@/lib/utils';
import { Box, HStack, Heading, Icon, Text, VStack } from '@gluestack-ui/themed';
import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';

export function ClientsStatusTable() {
  return (
    <GlassCard>
      <HStack justifyContent="space-between" alignItems="center" mb="$4">
        <Heading size="lg" color="$background50">
          Stato Clienti
        </Heading>
        <Text asChild color="$primary300" fontSize="$sm">
          <NextLink href="/clients">Vai alla lista</NextLink>
        </Text>
      </HStack>
      <VStack space="lg">
        {clients.slice(0, 5).map((client) => {
          const booking = bookings.find((item) => item.clientId === client.id);
          return (
            <HStack
              key={client.id}
              justifyContent="space-between"
              alignItems="center"
              borderBottomWidth={1}
              borderColor="rgba(255,255,255,0.12)"
              pb="$4"
              gap="$6"
              flexWrap="wrap"
            >
              <VStack>
                <Text color="$background50" fontWeight="$bold">
                  {client.name}
                </Text>
                <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                  Ultimo soggiorno {formatDate(client.lastStay)} · {client.loyaltyStatus}
                </Text>
              </VStack>
              <VStack minWidth="180px">
                <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                  Evento passato
                </Text>
                <Text color="$success400" fontWeight="$bold">
                  {booking?.timeline.find((item) => item.type === 'success')?.label ?? 'In attesa'}
                </Text>
              </VStack>
              <VStack minWidth="180px">
                <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                  Prossima azione
                </Text>
                <Text color="$primary200">
                  {booking?.tasks[0] ?? 'Crea proposta personalizzata'}
                </Text>
              </VStack>
              <Box asChild>
                <NextLink href={`/clients/${client.id}`}>
                  <HStack alignItems="center" gap="$2" color="$primary200">
                    <Text color="$primary200" fontSize="$sm">
                      Dettaglio
                    </Text>
                    <Icon as={ArrowRight} color="$primary200" size="sm" />
                  </HStack>
                </NextLink>
              </Box>
            </HStack>
          );
        })}
      </VStack>
    </GlassCard>
  );
}
