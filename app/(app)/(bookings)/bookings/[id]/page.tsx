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
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Droplets, ThermometerSun } from 'lucide-react-native';
import {
  useGetBookingByIdQuery,
  useGetCustomerByIdQuery,
  useGetNotesQuery,
} from '@/services/mockApi';

function DetailTile({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Box
      className={`rounded-2xl border px-4 py-3 ${
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
            : 'text-[var(--color-neutral-800)]'
        }`}
      >
        {value}
      </Text>
    </Box>
  );
}

function IoTCard({
  temperature,
  minibarLevel,
}: {
  temperature?: number;
  minibarLevel?: number;
}) {
  return (
    <Box className="mt-4 rounded-2xl border border-[rgba(31,122,77,0.25)] bg-[rgba(31,122,77,0.12)] px-5 py-4">
      <HStack className="items-center justify-between">
        <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0f766e]">
          Snapshot IoT
        </Text>
        <HStack className="items-center gap-2">
          <Badge
            size="sm"
            action="muted"
            className="rounded-full bg-[rgba(16,185,129,0.14)] px-3 py-1 text-xs font-semibold text-[#0f766e]"
          >
            <Text className="text-xs font-semibold text-[#0f766e]">
              Aggiornato
            </Text>
          </Badge>
        </HStack>
      </HStack>
      <HStack className="mt-3 gap-4">
        <Box className="flex-1 rounded-xl border border-[rgba(31,122,77,0.25)] bg-white/60 px-4 py-3">
          <HStack className="items-center gap-2">
            <ThermometerSun size={18} color="#0f766e" strokeWidth={2} />
            <Text className="text-[13px] font-semibold text-[#0f766e]">
              Temperatura
            </Text>
          </HStack>
          <Text className="mt-2 text-2xl font-semibold text-[#0f766e]">
            {temperature != null ? `${temperature.toFixed(1)}°C` : '—'}
          </Text>
        </Box>
        <Box className="flex-1 rounded-xl border border-[rgba(31,122,77,0.25)] bg-white/60 px-4 py-3">
          <HStack className="items-center gap-2">
            <Droplets size={18} color="#0f766e" strokeWidth={2} />
            <Text className="text-[13px] font-semibold text-[#0f766e]">
              Minibar
            </Text>
          </HStack>
          <Text className="mt-2 text-2xl font-semibold text-[#0f766e]">
            {minibarLevel != null ? `${minibarLevel}%` : '—'}
          </Text>
        </Box>
      </HStack>
      <Text className="mt-3 text-xs text-[#0f766e]">
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
            subtitle="Dati operativi, stato comunicazioni e comfort camera."
          >
            <Box>
              <HStack className="flex-row flex-wrap gap-2">
                <Badge
                  size="sm"
                  action="muted"
                  className="rounded-full bg-[rgba(31,122,77,0.16)] px-3 py-1 text-xs font-semibold text-[#0f766e]"
                >
                  <Text className="text-xs font-semibold text-[#0f766e]">
                    {booking.status}
                  </Text>
                </Badge>
                <Badge
                  size="sm"
                  action="muted"
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    booking.paymentStatus === 'Pagato'
                      ? 'bg-[rgba(22,163,74,0.18)] text-[#15803d]'
                      : 'bg-[rgba(234,179,8,0.22)] text-[#92400e]'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      booking.paymentStatus === 'Pagato'
                        ? 'text-[#15803d]'
                        : 'text-[#92400e]'
                    }`}
                  >
                    Pagamento · {booking.paymentStatus}
                  </Text>
                </Badge>
                <Badge
                  size="sm"
                  action="muted"
                  className="rounded-full bg-[rgba(148,163,184,0.18)] px-3 py-1 text-xs font-semibold text-[var(--color-neutral-600)]"
                >
                  <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                    Canale · {booking.channel}
                  </Text>
                </Badge>
                {booking.roomNumber ? (
                  <Badge
                    size="sm"
                    action="muted"
                    className="rounded-full bg-[rgba(59,130,246,0.14)] px-3 py-1 text-xs font-semibold text-[#1d4ed8]"
                  >
                    <Text className="text-xs font-semibold text-[#1d4ed8]">
                      Camera · {booking.roomNumber}
                    </Text>
                  </Badge>
                ) : null}
              </HStack>

              {booking.attentionReason ? (
                <Box className="mt-4 rounded-2xl border border-[rgba(236,72,153,0.25)] bg-[rgba(236,72,153,0.12)] px-4 py-4">
                  <HStack className="items-start gap-3">
                    <AlertTriangle size={20} color="#be123c" strokeWidth={2} />
                    <Box>
                      <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[#be123c]">
                        Richiede attenzione
                      </Text>
                      <Text className="mt-2 text-sm leading-6 text-[#be123c]">
                        {booking.attentionReason}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ) : null}

              <Box className="mt-4 grid gap-4 md:grid-cols-2">
                <DetailTile label="Check-in" value={booking.checkIn} />
                <DetailTile label="Check-out" value={booking.checkOut} />
                <DetailTile
                  label="Ospiti & camere"
                  value={`${booking.guests} ospiti · ${booking.rooms} camere`}
                />
                <DetailTile
                  label="Stato comunicazione"
                  value={booking.statoComunicazione}
                />
                <DetailTile
                  label="Ultimo evento"
                  value={booking.ultimoEvento}
                />
                <DetailTile
                  label="Prossimo invio"
                  value={booking.prossimoInvio}
                  highlight
                />
              </Box>

              <IoTCard
                temperature={booking.iotSnapshot?.temperature}
                minibarLevel={booking.iotSnapshot?.minibarLevel}
              />
            </Box>
          </SectionCard>

          <SectionCard
            title="Comunicazione con il cliente"
            subtitle="Timeline condivisa con automazioni e follow-up manuali."
          >
            <Timeline entries={booking.timeline} />
          </SectionCard>

        </Box>

        <VStack space="lg" className="w-full max-w-[360px]">
          <NotesBoard
            notes={notes}
            title="Note prenotazione"
            onCreateNote={() => router.push('/notes')}
            resolveContext={(note) => ({
              label: booking.roomNumber
                ? `Camera · ${booking.roomNumber}`
                : `Prenotazione · ${booking.bookingNumber}`,
              tone:
                note.status === 'Aperto'
                  ? 'warning'
                  : note.status === 'Risolto'
                  ? 'success'
                  : 'info',
            })}
          />
          <CustomerPanel
            customer={customer}
            bookings={[booking]}
            notes={notes}
            showBookings={false}
            showTimeline={false}
            showNotes={false}
            onAddNote={() => router.push('/notes')}
            onOpenCustomer={() => router.push(`/customers/${customer.id}`)}
          />
        </VStack>
      </HStack>
    </Box>
  );
}

// mock: bookingsMock, customersMock, notesMock
// actions: openChatForBooking(id), editBooking(id)
// assumptions: IoT snapshot mock rappresenta ultimo valore disponibile
