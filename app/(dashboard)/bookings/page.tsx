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
  ScrollView,
} from '@gluestack-ui/themed';
import { Plus, Filter } from 'lucide-react';
import Link from 'next/link';
import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { formatDate, formatCurrency } from '@/utils/format';
import { GlassCard } from '@/components/common/GlassCard';

const statusFilters = ['tutti', 'confermato', 'prenotato', 'in_pre_checkin', 'perso'];

export default function BookingsPage() {
  const [status, setStatus] = useState('tutti');
  const [searchTerm, setSearchTerm] = useState('');

  const computedBookings = useMemo(() => {
    const normalized = searchTerm.toLowerCase();
    return bookings.filter((booking) => {
      const client = clients.find((item) => item.id === booking.clientId);
      const matchesSearch =
        booking.number.toLowerCase().includes(normalized) ||
        client?.name.toLowerCase().includes(normalized) ||
        client?.surname.toLowerCase().includes(normalized);
      const matchesStatus = status === 'tutti' || booking.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [status, searchTerm]);

  return (
    <ScrollView>
      <VStack space="xl">
        <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" space="lg">
          <VStack space="xs">
            <Heading size="lg" color="white">
              Lista Prenotazioni
            </Heading>
            <Text color="rgba(148, 163, 184, 0.85)">
              Cronologia completa, eventi passati e comunicazioni collegate.
            </Text>
          </VStack>
          <Button asChild variant="solid" bg="rgba(79, 140, 255, 0.9)" borderColor="transparent">
            <Link href="/bookings/new-lost">
              <HStack space="sm" alignItems="center">
                <Plus size={16} color="white" />
                <Text color="white" fontWeight="$semibold">
                  Registra prenotazione persa
                </Text>
              </HStack>
            </Link>
          </Button>
        </HStack>

        <GlassCard>
          <HStack space="lg" alignItems="center" flexWrap="wrap" mb="$4">
            <HStack space="sm" alignItems="center">
              <Filter size={16} color="rgba(148,163,184,0.9)" />
              {statusFilters.map((item) => (
                <Button
                  key={item}
                  variant={item === status ? 'solid' : 'outline'}
                  bg={item === status ? 'rgba(79,140,255,0.85)' : 'rgba(255,255,255,0.05)'}
                  borderColor={item === status ? 'transparent' : 'rgba(255,255,255,0.18)'}
                  px="$3"
                  py="$2"
                  onPress={() => setStatus(item)}
                >
                  <Text color="white" fontWeight="$semibold">
                    {item === 'tutti' ? 'Tutte' : item.replace('_', ' ')}
                  </Text>
                </Button>
              ))}
            </HStack>
            <Input
              width={280}
              bg="rgba(255, 255, 255, 0.08)"
              borderColor="rgba(255, 255, 255, 0.2)"
              rounded="$full"
              px="$4"
            >
              <InputField
                placeholder="Cerca prenotazione o cliente"
                value={searchTerm}
                onChangeText={setSearchTerm}
                color="rgba(226, 232, 240, 0.92)"
              />
            </Input>
          </HStack>

          <VStack space="md">
            {computedBookings.map((booking) => {
              const client = clients.find((item) => item.id === booking.clientId);
              return (
                <Box key={booking.id} px="$5" py="$4" rounded="$xl" bg="rgba(255, 255, 255, 0.05)">
                  <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" space="md">
                    <VStack space="xs">
                      <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
                        {booking.number} · {client?.name} {client?.surname}
                      </Text>
                      <Text color="rgba(148,163,184,0.8)" fontSize="$sm">
                        {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)} · {booking.roomType}
                      </Text>
                    </VStack>
                    <Badge
                      variant="outline"
                      borderColor="rgba(79, 140, 255, 0.6)"
                      bg="rgba(79, 140, 255, 0.12)"
                    >
                      <Text color="#8CB6FF">{booking.status.toUpperCase()}</Text>
                    </Badge>
                  </HStack>
                  <HStack space="md" mt="$3" flexWrap="wrap" alignItems="center">
                    {booking.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="solid"
                        bg="rgba(79, 140, 255, 0.18)"
                        borderColor="transparent"
                      >
                        <Text color="#dbeafe">{tag}</Text>
                      </Badge>
                    ))}
                    <Text color="rgba(226,232,240,0.9)" fontWeight="$semibold">
                      {formatCurrency(booking.value)}
                    </Text>
                    <Link href={`/bookings/${booking.id}`}>
                      <Text color="rgba(148, 163, 184, 0.9)" fontSize="$sm">
                        Vedi dettaglio →
                      </Text>
                    </Link>
                  </HStack>
                </Box>
              );
            })}
          </VStack>
        </GlassCard>
      </VStack>
    </ScrollView>
  );
}
