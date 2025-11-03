// Scopo: mostrare il dettaglio cliente con anagrafica, timeline e note contestuali.
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
import { NotesBoard } from '@/components/shared/notes-board';
import { Timeline } from '@/components/shared/timeline';
import { EntityCard } from '@/components/shared/entity-card';
import { CustomerPanel } from '@/components/shared/customer-panel';
import {
  useGetBookingsQuery,
  useGetCustomerByIdQuery,
  useGetNotesQuery,
} from '@/services/mockApi';

function InfoField({ label, value }: { label: string; value: string | undefined }) {
  return (
    <Box className="flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3">
      <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
        {label}
      </Text>
      <Text className="mt-2 text-sm font-semibold text-[var(--color-neutral-900)]">
        {value ?? '—'}
      </Text>
    </Box>
  );
}

export default function CustomerDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const customerId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const { data: customer } = useGetCustomerByIdQuery(customerId ?? '', {
    skip: !customerId,
  });
  const { data: bookings = [] } = useGetBookingsQuery();
  const { data: notes = [] } = useGetNotesQuery({
    target: 'Customer',
    targetId: customerId,
  });

  const customerBookings = useMemo(
    () => bookings.filter((booking) => booking.customerId === customerId),
    [bookings, customerId]
  );

  if (!customer) {
    return (
      <Box className="rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-8 py-12">
        <Text className="text-center text-sm text-[var(--color-neutral-600)]">
          Cliente non trovato nei mock disponibili.
        </Text>
      </Box>
    );
  }

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Cerca all'interno del cliente..."
        primaryActionLabel="Aggiungi prenotazione"
        onPrimaryAction={() => router.push('/bookings')}
        extraActions={
          <Button
            size="md"
            variant="outline"
            action="default"
            className="border-[var(--color-border)] bg-[var(--color-surface)] px-5"
          >
            <Text className="text-sm font-semibold text-[var(--color-neutral-600)]">
              Modifica cliente
            </Text>
          </Button>
        }
      />

      <HStack className="flex-row gap-6">
        <Box className="flex-1">
          <SectionCard
            title="Anagrafica cliente"
            subtitle="Dati principali per rapidità di contatto e gestione richieste."
          >
            <VStack space="md">
              <HStack className="flex-row gap-4">
                <InfoField label="Nome" value={customer.firstName} />
                <InfoField label="Cognome" value={customer.lastName} />
              </HStack>
              <HStack className="flex-row gap-4">
                <InfoField label="Email" value={customer.email} />
              </HStack>
              <HStack className="flex-row gap-4">
                <InfoField label="Telefono" value={customer.phone} />
                <InfoField label="Telefono 2" value={customer.secondaryPhone} />
              </HStack>
            </VStack>
          </SectionCard>

          <SectionCard
            title="Comunicazione con il cliente"
            subtitle="Timeline condivisa tra automazioni e messaggi manuali."
          >
            <Timeline entries={customer.timeline} />
          </SectionCard>

          <SectionCard
            title="Prenotazioni del cliente"
            subtitle="Accesso rapido ai soggiorni collegati per gestire richieste e note."
          >
            {customerBookings.length === 0 ? (
              <Box className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-6 py-10">
                <Text className="text-center text-sm text-[var(--color-neutral-600)]">
                  Nessuna prenotazione collegata a questo cliente.
                </Text>
              </Box>
            ) : (
              customerBookings.map((booking) => (
                <EntityCard
                  key={booking.id}
                  title={`Prenotazione n° ${booking.bookingNumber}`}
                  subtitle={`Check-in ${booking.checkIn} · Check-out ${booking.checkOut}`}
                  status={{
                    label: booking.status,
                    tone: booking.status === 'Confermata' ? 'success' : 'warning',
                  }}
                  badges={[
                    { label: `${booking.rooms} stanze`, tone: 'neutral' },
                    { label: `${booking.guests} ospiti`, tone: 'neutral' },
                    { label: booking.statoComunicazione, tone: 'info' },
                  ]}
                  meta={[
                    { label: 'Ultimo evento', value: booking.ultimoEvento },
                    { label: 'Prossimo invio', value: booking.prossimoInvio },
                  ]}
                  onPress={() => router.push(`/bookings/${booking.id}`)}
                />
              ))
            )}
          </SectionCard>

          <NotesBoard
            notes={notes}
            title="Note dedicate al cliente"
          />
        </Box>

        <CustomerPanel
          customer={customer}
          bookings={customerBookings}
          notes={notes}
          showTimeline={false}
          showNotes={false}
        />
      </HStack>
    </Box>
  );
}

// mock: customersMock, bookingsMock, notesMock
// actions: openBookingDetail(id), editCustomer(id)
// assumptions: param id coincide con id mock customer
