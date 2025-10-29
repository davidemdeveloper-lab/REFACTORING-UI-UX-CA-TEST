'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { bookings } from '@/lib/mock-data';

const statusMap: Record<string, string> = {
  proposta: 'Proposta inviata',
  attesa_pagamento: 'In attesa pagamento',
  confermato: 'Confermato',
  in_soggiorno: 'In soggiorno',
  checkout: 'Checkout',
  post_soggiorno: 'Post soggiorno',
};

const statusOrder = [
  'proposta',
  'attesa_pagamento',
  'confermato',
  'in_soggiorno',
  'checkout',
  'post_soggiorno',
];

export default function BookingsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('');

  const filtered = useMemo(() => {
    return bookings.filter((booking) => {
      const matchSearch = booking.guestName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status ? booking.status === status : true;
      return matchSearch && matchStatus;
    });
  }, [search, status]);

  return (
    <VStack space="lg" className="pb-16">
      <HStack className="flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Box>
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Prenotazioni</Text>
          <Text className="mt-2 text-3xl font-semibold text-primary-900">Regia prenotazioni & automazioni</Text>
          <Text className="mt-2 text-sm text-typography-500">
            Gestisci richieste, proposte e flussi collegati. Ogni scheda mostra IoT, timeline e suggerimenti AI.
          </Text>
        </Box>
        <Link href="/bookings/new">
          <Button action="primary" size="lg" className="rounded-full px-6">
            <Text className="text-base font-semibold text-white">Aggiungi prenotazione</Text>
          </Button>
        </Link>
      </HStack>

      <HStack className="flex-col gap-4 rounded-3xl border border-white/15 bg-white/5 p-6 lg:flex-row lg:items-center lg:justify-between">
        <Input
          placeholder="Cerca per nome ospite o riferimento"
          value={search}
          onChangeText={setSearch}
          className="w-full rounded-2xl border border-primary-100/70 bg-white/60 px-4 py-3 text-sm text-primary-700"
        />
        <HStack space="sm" className="flex-wrap">
          <FilterChip label="Tutti" active={status === ''} onPress={() => setStatus('')} />
          {statusOrder.map((key) => (
            <FilterChip key={key} label={statusMap[key]} active={status === key} onPress={() => setStatus(key)} />
          ))}
        </HStack>
      </HStack>

      <VStack space="lg">
        {filtered.map((booking) => (
          <Box key={booking.id} className="glass-panel rounded-3xl px-7 py-7">
            <HStack className="flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <Box>
                <Text className="text-xs uppercase tracking-[0.3em] text-primary-600/70">
                  {booking.reference} • {statusMap[booking.status]}
                </Text>
                <Text className="mt-2 text-2xl font-semibold text-primary-900">{booking.guestName}</Text>
                <Text className="mt-1 text-sm text-typography-500">
                  Soggiorno {booking.stayPeriod} • {booking.roomType} • {booking.nights} notti • {booking.adults} adulti
                </Text>
                <HStack className="mt-3 flex-wrap gap-2">
                  {booking.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary-100/60 bg-primary-50/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary-700"
                    >
                      {tag}
                    </span>
                  ))}
                </HStack>
              </Box>
              <VStack space="sm" className="rounded-3xl border border-white/15 bg-white/5 px-6 py-4 text-sm text-typography-500">
                <Text className="text-xs uppercase tracking-[0.3em] text-primary-600/70">Stato pagamenti</Text>
                <Text className="text-lg font-semibold text-primary-800">
                  {booking.outstandingBalance > 0
                    ? `Saldo da incassare €${booking.outstandingBalance}`
                    : 'Pagamento completato'}
                </Text>
                <Link href={booking.externalReferences.paymentLink ?? '#'} className="text-xs font-semibold text-primary-600">
                  Apri link pagamento →
                </Link>
              </VStack>
            </HStack>

            <HStack className="mt-6 flex-col gap-4 md:flex-row">
              <Box className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <Text className="text-xs uppercase tracking-[0.3em] text-primary-600/70">Suggerimenti AI</Text>
                <VStack space="sm" className="mt-3">
                  {booking.aiInsights.map((insight) => (
                    <Text key={insight} className="text-sm text-typography-500">
                      • {insight}
                    </Text>
                  ))}
                </VStack>
                <Link href={`/bookings/${booking.id}`} className="mt-3 inline-block text-xs font-semibold text-primary-600">
                  Apri dettaglio workflow →
                </Link>
              </Box>

              <Box className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <Text className="text-xs uppercase tracking-[0.3em] text-primary-600/70">IoT camere collegate</Text>
                <VStack space="sm" className="mt-3">
                  {booking.sensors.map((sensor) => (
                    <HStack key={sensor.id} className="items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <Box>
                        <Text className="text-sm font-semibold text-primary-800">{sensor.name}</Text>
                        <Text className="text-xs text-typography-400">
                          {sensor.value}
                          {sensor.unit ? ` ${sensor.unit}` : ''} • Agg. {sensor.lastUpdate}
                        </Text>
                      </Box>
                      <span
                        className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                          sensor.status === 'ok'
                            ? 'text-success-500'
                            : sensor.status === 'alert'
                              ? 'text-warning-500'
                              : 'text-error-500'
                        }`}
                      >
                        {sensor.status}
                      </span>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </HStack>

            <HStack className="mt-6 flex-wrap gap-3">
              {booking.externalReferences.bookingCom && (
                <Link
                  href={booking.externalReferences.bookingCom}
                  className="rounded-full border border-primary-200/60 px-4 py-2 text-xs font-semibold text-primary-700"
                >
                  Vai alla prenotazione su Booking.com
                </Link>
              )}
              {booking.externalReferences.channelManager && (
                <Link
                  href={booking.externalReferences.channelManager}
                  className="rounded-full border border-primary-200/60 px-4 py-2 text-xs font-semibold text-primary-700"
                >
                  Apri Channel Manager
                </Link>
              )}
            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <button
      onClick={onPress}
      className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
        active
          ? 'border-primary-400 bg-primary-50/80 text-primary-700'
          : 'border-white/20 bg-white/5 text-typography-400 hover:border-primary-200/40 hover:text-primary-600'
      }`}
    >
      {label}
    </button>
  );
}

