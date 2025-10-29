'use client';

import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { GlassCard } from '@/components/common/GlassCard';
import { formatDate, formatCurrency, getStatusLabel } from '@/lib/utils';
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
import { StatusBadge } from '@/components/common/StatusBadge';

export default function BookingsPage() {
  return (
    <VStack gap="$8">
      <HStack justifyContent="space-between" alignItems="flex-end" flexWrap="wrap" gap="$4">
        <VStack gap="$2">
          <Heading size="2xl" color="$background50">
            Lista Prenotazioni
          </Heading>
          <Text color="rgba(226,235,255,0.7)">
            Monitora pipeline, stati e valore di ogni prenotazione.
          </Text>
        </VStack>
        <HStack gap="$3" flexWrap="wrap">
          <Input minWidth="240px">
            <InputField placeholder="Cerca prenotazione" color="$background50" />
          </Input>
          <Button asChild>
            <NextLink href="/bookings/new-lost">
              <ButtonText>Nuova riconquista</ButtonText>
            </NextLink>
          </Button>
        </HStack>
      </HStack>
      <VStack gap="$4">
        {bookings.map((booking) => {
          const client = clients.find((item) => item.id === booking.clientId);
          return (
            <GlassCard key={booking.id}>
              <HStack justifyContent="space-between" flexWrap="wrap" gap="$4">
                <VStack>
                  <Heading size="lg" color="$background50">
                    {booking.title}
                  </Heading>
                  <Text color="rgba(226,235,255,0.6)">
                    {client?.name} · {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                  </Text>
                </VStack>
                <HStack alignItems="center" gap="$4">
                  <StatusBadge status={booking.status} label={getStatusLabel(booking.status)} />
                  <Text color="$primary200">{formatCurrency(booking.revenue)}</Text>
                  <Button size="sm" variant="outline" asChild>
                    <NextLink href={`/bookings/${booking.id}`}>
                      <ButtonText>Apri</ButtonText>
                    </NextLink>
                  </Button>
                </HStack>
              </HStack>
            </GlassCard>
          );
        })}
      </VStack>
    </VStack>
  );
}
