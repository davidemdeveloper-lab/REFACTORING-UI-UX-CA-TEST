'use client';

import { useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import { getBookingById } from '@/data/bookings';
import { getClientById } from '@/data/clients';
import { GlassCard } from '@/components/common/GlassCard';
import { formatCurrency, formatDate, formatDateTime, getStatusLabel } from '@/lib/utils';
import {
  Box,
  Button,
  ButtonText,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { ArrowLeft, Calendar, Mail, Phone, Send } from 'lucide-react';
import NextLink from 'next/link';
import { StatusBadge } from '@/components/common/StatusBadge';

export default function BookingDetailPage() {
  const params = useParams();
  const bookingId = useMemo(() => params?.id as string, [params]);
  const booking = getBookingById(bookingId);
  if (!booking) {
    notFound();
  }
  const client = getClientById(booking!.clientId);

  return (
    <VStack gap="$8">
      <HStack justifyContent="space-between" alignItems="center">
        <HStack gap="$4" alignItems="center">
          <Button variant="outline" size="sm" asChild>
            <NextLink href="/bookings">
              <HStack alignItems="center" gap="$2">
                <Icon as={ArrowLeft} color="$background50" />
                <ButtonText>Torna alla lista</ButtonText>
              </HStack>
            </NextLink>
          </Button>
          <Heading size="2xl" color="$background50">
            {booking?.title}
          </Heading>
        </HStack>
        <StatusBadge status={booking!.status} label={getStatusLabel(booking!.status)} />
      </HStack>

      <GlassCard>
        <HStack gap="$8" flexWrap="wrap">
          <VStack gap="$2">
            <Text color="rgba(226,235,255,0.7)">Date soggiorno</Text>
            <HStack alignItems="center" gap="$3">
              <Icon as={Calendar} color="$primary200" />
              <Text color="$background50" fontWeight="$bold">
                {formatDate(booking!.checkIn)} – {formatDate(booking!.checkOut)}
              </Text>
            </HStack>
          </VStack>
          <VStack gap="$2">
            <Text color="rgba(226,235,255,0.7)">Valore</Text>
            <Text color="$primary200" fontWeight="$bold">
              {formatCurrency(booking!.revenue)}
            </Text>
          </VStack>
          <VStack gap="$2">
            <Text color="rgba(226,235,255,0.7)">Cliente</Text>
            <Text color="$background50" fontWeight="$bold">
              {client?.name}
            </Text>
            <HStack gap="$3">
              <HStack alignItems="center" gap="$2">
                <Icon as={Phone} color="$primary200" />
                <Text color="$background50">{client?.phone}</Text>
              </HStack>
              <HStack alignItems="center" gap="$2">
                <Icon as={Mail} color="$primary200" />
                <Text color="$background50">{client?.email}</Text>
              </HStack>
            </HStack>
          </VStack>
        </HStack>
      </GlassCard>

      <HStack gap="$6" flexWrap="wrap" alignItems="flex-start">
        <GlassCard>
          <Heading size="lg" color="$background50" mb="$4">
            Timeline comunicazioni
          </Heading>
          <VStack gap="$4">
            {booking?.timeline.map((item) => (
              <HStack key={item.label} gap="$3" alignItems="flex-start">
                <Box
                  width={10}
                  height={10}
                  borderRadius="$full"
                  bgColor={item.type === 'success' ? 'rgba(40,200,124,0.6)' : 'rgba(79,111,255,0.6)'}
                  mt="$1"
                />
                <VStack>
                  <Text color="$background50" fontWeight="$bold">
                    {item.label}
                  </Text>
                  <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                    {formatDateTime(item.timestamp)}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </GlassCard>
        <GlassCard>
          <Heading size="lg" color="$background50" mb="$4">
            Azioni rapide
          </Heading>
          <VStack gap="$4">
            {booking?.tasks.map((task) => (
              <Box
                key={task}
                px="$4"
                py="$3"
                borderRadius="$lg"
                bgColor="rgba(255,255,255,0.05)"
                borderWidth={1}
                borderColor="rgba(255,255,255,0.12)"
              >
                <Text color="$background50">{task}</Text>
              </Box>
            ))}
            <Button variant="outline" size="sm">
              <HStack alignItems="center" gap="$2">
                <Icon as={Send} color="$background50" />
                <ButtonText>Invia aggiornamento</ButtonText>
              </HStack>
            </Button>
          </VStack>
        </GlassCard>
      </HStack>
    </VStack>
  );
}
