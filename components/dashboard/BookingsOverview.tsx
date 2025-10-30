'use client';

import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { GlassCard } from '@/components/common/GlassCard';
import { formatDate, formatCurrency, getStatusLabel } from '@/lib/utils';
import { Box, HStack, Heading, Icon, Text, VStack } from '@gluestack-ui/themed';
import { ArrowRight, CalendarCheck2 } from 'lucide-react';
import NextLink from 'next/link';
import { StatusBadge } from '@/components/common/StatusBadge';

export function BookingsOverview() {
  return (
    <GlassCard>
      <HStack justifyContent="space-between" alignItems="center" mb="$4">
        <HStack gap="$3" alignItems="center">
          <Icon as={CalendarCheck2} color="$primary200" />
          <Heading size="lg" color="$background50">
            Prenotazioni
          </Heading>
        </HStack>
        <Text asChild color="$primary300" fontSize="$sm">
          <NextLink href="/bookings">Apri elenco</NextLink>
        </Text>
      </HStack>
      <VStack space="lg">
        {bookings.slice(0, 5).map((booking) => {
          const client = clients.find((item) => item.id === booking.clientId);
          return (
            <HStack
              key={booking.id}
              justifyContent="space-between"
              gap="$4"
              flexWrap="wrap"
              borderBottomWidth={1}
              borderColor="rgba(255,255,255,0.12)"
              pb="$4"
            >
              <VStack>
                <Text color="$background50" fontWeight="$bold">
                  {client?.name}
                </Text>
                <Text color="rgba(226,235,255,0.62)" fontSize="$xs">
                  {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}
                </Text>
              </VStack>
              <HStack alignItems="center" gap="$3">
                <StatusBadge status={booking.status} label={getStatusLabel(booking.status)} />
                <Text color="$primary200">{formatCurrency(booking.revenue)}</Text>
              </HStack>
              <Box asChild>
                <NextLink href={`/bookings/${booking.id}`}>
                  <HStack alignItems="center" gap="$2">
                    <Text color="$primary200" fontSize="$sm">
                      Apri
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
