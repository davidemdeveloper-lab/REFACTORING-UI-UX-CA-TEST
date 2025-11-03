// Scopo: mostrare il dettaglio prenotazione con stato comunicazioni e snapshot IoT.
'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { PageToolbar } from '@/components/shared/page-toolbar';
import { SectionCard } from '@/components/shared/section-card';
import { Timeline } from '@/components/shared/timeline';
import { NotesBoard } from '@/components/shared/notes-board';
import { CustomerPanel } from '@/components/shared/customer-panel';
import {
  useGetBookingByIdQuery,
  useGetCustomerByIdQuery,
  useGetNotesQuery,
} from '@/services/mockApi';

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Box className="flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3">
      <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
        {label}
      </Text>
      <Text className="mt-2 text-sm font-semibold text-[var(--color-neutral-900)]">
        {value}
      </Text>
    </Box>
  );
}

function IoTCard({ temperature, minibarLevel }: { temperature?: number; minibarLevel?: number }) {
  return (
    <Box className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[rgba(31,122,77,0.12)] px-5 py-4">
      <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0f766e]">
        Snapshot IoT
      </Text>
      <HStack className="mt-3 gap-4">
        <Box className="flex-1">
          <Text className="text-[13px] font-semibold text-[#0f766e]">
            Temperatura
          </Text>
          <Text className="mt-1 text-2xl font-semibold text-[#0f766e]">
            {temperature ? `${temperature.toFixed(1)}°C` : '—'}
          </Text>
        </Box>
        <Box className="flex-1">
          <Text className="text-[13px] font-semibold text-[#0f766e]">
            Minibar
          </Text>
          <Text className="mt-1 text-2xl font-semibold text-[#0f766e]">
            {minibarLevel ? `${minibarLevel}%` : '—'}
          </Text>
        </Box>
      </HStack>
      <Text className="mt-2 text-xs text-[#0f766e]">
        Dati dimostrativi aggiornati dalle room automation.
      </Text>
    </Box>
  );
}

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const bookingId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const { data: booking } = useGetBookingByIdQuery(bookingId ?? '', {
    skip: !bookingId,
  });
  const { data: notes = [] } = useGetNotesQuery({
    target: 'Booking',
    targetId: bookingId,
  });
  const { data: customer } = useGetCustomerByIdQuery(
    booking?.customerId ?? ''
  );

  if (!booking || !customer) {
    return (
      <Box className="rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-8 py-12">
        <Text className="text-center text-sm text-[var(--color-neutral-600)]">
          Prenotazione non trovata nei mock disponibili.
        </Text>
      </Box>
    );
  }

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Cerca nelle attività della prenotazione..."
        primaryActionLabel="Invia comunicazione"
        onPrimaryAction={() => router.push('/chat')}
        extraActions={
          <Button
            size="md"
            variant="outline"
            action="default"
            className="border-[var(--color-border)] bg-[var(--color-surface)] px-5"
          >
            <Text className="text-sm font-semibold text-[var(--color-neutral-600)]">
              Modifica prenotazione
            </Text>
          </Button>
        }
      />

      <HStack className="flex-row gap-6">
        <Box className="flex-1">
          <SectionCard
            title={`Prenotazione n° ${booking.bookingNumber}`}
            subtitle="Dati operativi e stato comunicazioni per questa prenotazione."
          >
            <VStack space="md">
              <HStack className="flex-row gap-4">
                <DetailRow label="Check-in" value={booking.checkIn} />
                <DetailRow label="Check-out" value={booking.checkOut} />
              </HStack>
              <HStack className="flex-row gap-4">
                <DetailRow
                  label="Camere"
                  value={`${booking.rooms} · ${booking.guests} ospiti`}
                />
                <DetailRow
                  label="Pagamenti"
                  value={`${booking.paymentStatus} · ${booking.status}`}
                />
              </HStack>
              <HStack className="flex-row gap-4">
                <DetailRow
                  label="Stato comunicazione"
                  value={booking.statoComunicazione}
                />
                <DetailRow label="Prossimo invio" value={booking.prossimoInvio} />
              </HStack>
              <IoTCard
                temperature={booking.iotSnapshot?.temperature}
                minibarLevel={booking.iotSnapshot?.minibarLevel}
              />
            </VStack>
          </SectionCard>

          <SectionCard
            title="Comunicazione con il cliente"
            subtitle="Timeline condivisa con automazioni e follow-up manuali."
          >
            <Timeline entries={booking.timeline} />
          </SectionCard>

          <NotesBoard
            notes={notes}
            title="Note prenotazione"
            onCreateNote={() => router.push('/bookings')}
          />
        </Box>

        <CustomerPanel
          customer={customer}
          notes={notes}
          showBookings={false}
          onAddNote={() => router.push('/bookings')}
        />
      </HStack>
    </Box>
  );
}

// mock: bookingsMock, customersMock, notesMock
// actions: openChatForBooking(id), editBooking(id)
// assumptions: IoT snapshot mock rappresenta ultimo valore disponibile
