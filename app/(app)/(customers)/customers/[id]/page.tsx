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
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react-native';
import {
  useGetBookingsQuery,
  useGetCustomerByIdQuery,
  useGetNotesQuery,
} from '@/services/mockApi';

function InfoField({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | undefined;
  highlight?: boolean;
}) {
  return (
    <Box
      className={`flex-1 rounded-2xl border px-4 py-3 ${
        highlight
          ? 'border-[rgba(196,123,44,0.45)] bg-[rgba(196,123,44,0.08)]'
          : 'border-[var(--color-border)] bg-[var(--color-background)]'
      }`}
    >
      <Text className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-500)]">
        {label}
      </Text>
      <Text
        className={`mt-2 text-sm ${
          highlight
            ? 'font-semibold text-[var(--color-primary-600)]'
            : 'text-[var(--color-neutral-900)]'
        }`}
      >
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
  const sortedBookings = useMemo(
    () =>
      [...customerBookings].sort(
        (a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()
      ),
    [customerBookings]
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
        onPrimaryAction={() => router.push('/bookings/new')}
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
              <HStack className="flex-row gap-4">
                <InfoField
                  label="Ultimo evento"
                  value={customer.ultimoEvento}
                />
                <InfoField
                  label="Prossimo invio"
                  value={customer.prossimoInvio}
                  highlight
                />
              </HStack>
              <HStack className="flex-row gap-2 flex-wrap">
                {customer.tags.map((tag) => (
                  <Badge
                    key={`${customer.id}-${tag}`}
                    size="sm"
                    action="muted"
                    className="rounded-full bg-[rgba(196,123,44,0.12)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-600)]"
                  >
                    <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                      {tag}
                    </Text>
                  </Badge>
                ))}
                <Badge
                  size="sm"
                  action="muted"
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    customer.newsletter
                      ? 'bg-[rgba(31,122,77,0.16)] text-[#0f766e]'
                      : 'bg-[rgba(148,163,184,0.18)] text-[var(--color-neutral-600)]'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      customer.newsletter ? 'text-[#0f766e]' : 'text-[var(--color-neutral-600)]'
                    }`}
                  >
                    Newsletter · {customer.newsletter ? 'Iscritto' : 'Non iscritto'}
                  </Text>
                </Badge>
                <Badge
                  size="sm"
                  action="muted"
                  className="rounded-full bg-[rgba(148,163,184,0.18)] px-3 py-1 text-xs font-semibold text-[var(--color-neutral-600)]"
                >
                  <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                    Soggiorni · {customer.staysCount}
                  </Text>
                </Badge>
              </HStack>
              {customer.highPriority || customer.priorityReason ? (
                <Box className="rounded-2xl border border-[rgba(236,72,153,0.25)] bg-[rgba(236,72,153,0.12)] px-4 py-4">
                  <HStack className="items-start gap-3">
                    <AlertTriangle size={20} color="#be123c" strokeWidth={2} />
                    <Box>
                      <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[#be123c]">
                        Cliente ad alta attenzione
                      </Text>
                      {customer.priorityReason ? (
                        <Text className="mt-2 text-sm leading-6 text-[#be123c]">
                          {customer.priorityReason}
                        </Text>
                      ) : null}
                      {customer.prioritySince ? (
                        <Text className="mt-2 text-xs text-[#be123c] opacity-80">
                          Da{' '}
                          {new Date(customer.prioritySince).toLocaleString('it-IT', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Text>
                      ) : null}
                    </Box>
                  </HStack>
                </Box>
              ) : null}
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
            {sortedBookings.length === 0 ? (
              <Box className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-6 py-10">
                <Text className="text-center text-sm text-[var(--color-neutral-600)]">
                  Nessuna prenotazione collegata a questo cliente.
                </Text>
              </Box>
            ) : (
              sortedBookings.map((booking, index) => {
                const bookingBadges: { label: string; tone?: 'info' | 'success' | 'warning' | 'danger' | 'neutral' }[] =
                  [];
                if (booking.roomNumber) {
                  bookingBadges.push({
                    label: `Camera · ${booking.roomNumber}`,
                    tone: 'info',
                  });
                }
                bookingBadges.push({
                  label: `${booking.rooms} camere · ${booking.guests} ospiti`,
                  tone: 'neutral',
                });
                bookingBadges.push({
                  label: `Comunicazione · ${booking.statoComunicazione}`,
                  tone:
                    booking.statoComunicazione === 'Richiede attenzione'
                      ? 'warning'
                      : 'info',
                });

                return (
                  <EntityCard
                    key={booking.id}
                    title={`Prenotazione n° ${booking.bookingNumber}`}
                    subtitle={`Check-in ${booking.checkIn} · Check-out ${booking.checkOut}`}
                    status={{
                      label: booking.status,
                      tone:
                        booking.status === 'Confermata'
                          ? 'success'
                          : booking.status === 'In attesa pagamento'
                          ? 'warning'
                          : 'info',
                    }}
                    description={
                      index === 0 && booking.attentionReason
                        ? booking.attentionReason
                        : undefined
                    }
                    badges={bookingBadges}
                    meta={[
                      { label: 'Ultimo evento', value: booking.ultimoEvento },
                      { label: 'Prossimo invio', value: booking.prossimoInvio },
                      {
                        label: 'Totale',
                        value: `${booking.total} ${booking.currency}`,
                      },
                    ]}
                    onPress={() => router.push(`/bookings/${booking.id}`)}
                  />
                );
              })
            )}
          </SectionCard>

          <NotesBoard
            notes={notes}
            title="Note dedicate al cliente"
            onCreateNote={() => router.push('/notes')}
            resolveContext={(note) => {
              if (note.target === 'Booking' && note.targetId) {
                const relatedBooking = sortedBookings.find(
                  (booking) => booking.id === note.targetId
                );
                return {
                  label: relatedBooking
                    ? `Prenotazione · ${relatedBooking.bookingNumber}`
                    : `Prenotazione · ${note.targetId}`,
                  tone:
                    note.status === 'Aperto'
                      ? 'warning'
                      : note.status === 'Risolto'
                      ? 'success'
                      : 'info',
                };
              }
              if (note.target === 'Customer') {
                return {
                  label: 'Cliente',
                  tone:
                    note.status === 'Aperto'
                      ? 'warning'
                      : note.status === 'Risolto'
                      ? 'success'
                      : 'neutral',
                };
              }
              if (note.target === 'Dashboard') {
                return { label: 'Turno', tone: 'info' };
              }
              return undefined;
            }}
          />
        </Box>

        <CustomerPanel
          customer={customer}
          bookings={sortedBookings}
          notes={notes}
          showBookings={false}
          showTimeline={false}
          showNotes={false}
          onAddNote={() => router.push('/notes')}
        />
      </HStack>
    </Box>
  );
}

// mock: customersMock, bookingsMock, notesMock
// actions: openBookingDetail(id), editCustomer(id)
// assumptions: param id coincide con id mock customer
