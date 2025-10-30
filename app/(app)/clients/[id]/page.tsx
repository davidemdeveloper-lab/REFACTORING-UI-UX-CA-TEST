'use client';

import { useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import { getClientById } from '@/data/clients';
import { bookings } from '@/data/bookings';
import { GlassCard } from '@/components/common/GlassCard';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils';
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
import { ArrowLeft, Mail, MessageCircle, Phone } from 'lucide-react';
import NextLink from 'next/link';

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = useMemo(() => params?.id as string, [params]);
  const client = getClientById(clientId);
  if (!client) {
    notFound();
  }
  const clientBookings = bookings.filter((booking) => booking.clientId === client?.id);

  return (
    <VStack gap="$8">
      <HStack justifyContent="space-between" alignItems="center">
        <HStack gap="$4" alignItems="center">
          <Button variant="outline" size="sm" asChild>
            <NextLink href="/clients">
              <HStack alignItems="center" gap="$2">
                <Icon as={ArrowLeft} color="$background50" />
                <ButtonText>Torna alla lista</ButtonText>
              </HStack>
            </NextLink>
          </Button>
          <Heading size="2xl" color="$background50">
            {client?.name}
          </Heading>
        </HStack>
        <HStack gap="$3">
          <Button variant="outline" size="sm">
            <ButtonText>Invia email</ButtonText>
          </Button>
          <Button size="sm">
            <ButtonText>Crea proposta</ButtonText>
          </Button>
        </HStack>
      </HStack>

      <GlassCard>
        <HStack gap="$12" flexWrap="wrap">
          <VStack gap="$2">
            <Text color="rgba(226,235,255,0.7)">Ultimo soggiorno</Text>
            <Heading size="lg" color="$background50">
              {formatDate(client!.lastStay)}
            </Heading>
            <Text color="rgba(226,235,255,0.6)">{client?.loyaltyStatus} · {client?.staysCount} soggiorni</Text>
          </VStack>
          <VStack gap="$2">
            <Text color="rgba(226,235,255,0.7)">Contatti</Text>
            <HStack gap="$4" flexWrap="wrap">
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
          <VStack gap="$2">
            <Text color="rgba(226,235,255,0.7)">Tag e preferenze</Text>
            <HStack gap="$3" flexWrap="wrap">
              {client?.tags.map((tag) => (
                <Box
                  key={tag}
                  px="$3"
                  py="$1.5"
                  borderRadius="$lg"
                  bgColor="rgba(79,111,255,0.18)"
                  borderWidth={1}
                  borderColor="rgba(79,111,255,0.32)"
                >
                  <Text color="$primary200" fontSize="$xs">
                    {tag}
                  </Text>
                </Box>
              ))}
            </HStack>
          </VStack>
        </HStack>
      </GlassCard>

      <HStack gap="$6" flexWrap="wrap" alignItems="flex-start">
        <GlassCard>
          <Heading size="lg" color="$background50" mb="$4">
            Prenotazioni correlate
          </Heading>
          <VStack gap="$4">
            {clientBookings.map((booking) => (
              <Box
                key={booking.id}
                borderRadius="$xl"
                borderWidth={1}
                borderColor="rgba(255,255,255,0.12)"
                bgColor="rgba(255,255,255,0.03)"
                px="$5"
                py="$4"
              >
                <Text color="$background50" fontWeight="$bold">
                  {booking.title}
                </Text>
                <Text color="rgba(226,235,255,0.6)" fontSize="$xs" mb="$2">
                  {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)} · {booking.channel}
                </Text>
                <Text color="$primary200">Valore: {formatCurrency(booking.revenue)}</Text>
                <HStack gap="$2" mt="$3">
                  {booking.tasks.map((task) => (
                    <Box key={task} px="$3" py="$1" borderRadius="$lg" bgColor="rgba(79,111,255,0.12)">
                      <Text color="$primary200" fontSize="$xs">
                        {task}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </Box>
            ))}
          </VStack>
        </GlassCard>
        <GlassCard>
          <Heading size="lg" color="$background50" mb="$4">
            Comunicazioni recenti
          </Heading>
          <VStack gap="$4">
            {clientBookings[0]?.timeline.map((item) => (
              <HStack key={item.label} gap="$3" alignItems="flex-start">
                <Icon as={MessageCircle} color="$primary200" mt="$1" />
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
      </HStack>
    </VStack>
  );
}
