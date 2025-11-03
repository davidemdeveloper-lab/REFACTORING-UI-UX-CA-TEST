'use client';

import { Customer, Booking, Note } from '@/types';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Timeline } from './timeline';

type CustomerPanelProps = {
  customer: Customer;
  bookings?: Booking[];
  notes?: Note[];
  onAddNote?: () => void;
  showTimeline?: boolean;
  showNotes?: boolean;
  showBookings?: boolean;
};

const infoItems: { label: string; key: keyof Pick<Customer, 'statoComunicazione' | 'ultimoEvento' | 'prossimoInvio' | 'newsletter'> }[] =
  [
    { label: 'Stato comunicazione', key: 'statoComunicazione' },
    { label: 'Ultimo evento', key: 'ultimoEvento' },
    { label: 'Prossimo invio', key: 'prossimoInvio' },
    { label: 'Newsletter', key: 'newsletter' },
  ];

export function CustomerPanel({
  customer,
  bookings = [],
  notes = [],
  onAddNote,
  showTimeline = true,
  showNotes = true,
  showBookings = true,
}: CustomerPanelProps) {
  return (
    <Box className="w-[360px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 shadow-[var(--shadow-card)]">
      <VStack space="lg">
        <Box>
          <Text className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
            Cliente
          </Text>
          <Text className="mt-2 text-2xl font-semibold text-[var(--color-neutral-900)]">
            {customer.firstName} {customer.lastName}
          </Text>
          <Text className="mt-1 text-sm text-[var(--color-neutral-600)]">
            Registrato il{' '}
            {new Date(customer.registeredAt).toLocaleDateString('it-IT')}
          </Text>
        </Box>

        <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4">
          <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
            Contatti
          </Text>
          <VStack space="xs" className="mt-3">
            <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
              {customer.email}
            </Text>
            <Text className="text-sm text-[var(--color-neutral-600)]">
              {customer.phone}
            </Text>
            {customer.secondaryPhone ? (
              <Text className="text-sm text-[var(--color-neutral-600)]">
                {customer.secondaryPhone}
              </Text>
            ) : null}
          </VStack>
        </Box>

        <Box>
          <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
            Stati comunicazione
          </Text>
          <VStack space="md" className="mt-3">
            {infoItems.map((item) => (
              <Box key={item.label}>
                <Text className="text-[13px] font-semibold text-[var(--color-neutral-900)]">
                  {item.label}
                </Text>
                <Text className="mt-1 text-sm text-[var(--color-neutral-600)]">
                  {item.key === 'newsletter'
                    ? customer.newsletter
                      ? 'Iscritto'
                      : 'Non iscritto'
                    : customer[item.key]}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>

        <Box>
          <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
            Tag cliente
          </Text>
          <HStack className="mt-3 flex-row flex-wrap gap-2">
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
            {customer.highPriority ? (
              <Badge
                size="sm"
                action="muted"
                className="rounded-full bg-[rgba(239,68,68,0.18)] px-3 py-1 text-xs font-semibold text-[#b91c1c]"
              >
                <Text className="text-xs font-semibold text-[#b91c1c]">
                  Alta attenzione
                </Text>
              </Badge>
            ) : null}
          </HStack>
          {customer.priorityReason ? (
            <Text className="mt-3 text-xs leading-5 text-[var(--color-neutral-500)]">
              Motivo alta attenzione: {customer.priorityReason}
            </Text>
          ) : null}
        </Box>

        {showBookings && bookings.length > 0 ? (
          <Box>
            <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
              Prenotazioni collegate
            </Text>
            <VStack space="sm" className="mt-3">
              {bookings.map((booking) => (
                <Box
                  key={booking.id}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3"
                >
                  <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                    Prenotazione n° {booking.bookingNumber}
                  </Text>
                  <Text className="mt-1 text-xs text-[var(--color-neutral-600)]">
                    Check-in {booking.checkIn} · Check-out {booking.checkOut}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        ) : null}

        {showTimeline ? (
          <Box>
            <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
              Timeline comunicazioni
            </Text>
            <Box className="mt-3">
              <Timeline entries={customer.timeline} />
            </Box>
          </Box>
        ) : null}

        {showNotes ? (
          <Box>
            <HStack className="items-center justify-between">
            <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
              Note collegate
            </Text>
              {onAddNote ? (
                <Button
                  size="sm"
                  variant="outline"
                  action="primary"
                  className="border-[var(--color-primary-600)] bg-transparent px-3"
                  onPress={onAddNote}
                >
                  <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                    Nuova nota
                  </Text>
                </Button>
              ) : null}
            </HStack>
            <VStack space="sm" className="mt-3">
              {notes.slice(0, 3).map((note) => (
                <Box
                  key={note.id}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3"
                >
                  <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                    {note.title}
                  </Text>
                  <Text className="mt-1 text-xs text-[var(--color-neutral-600)]">
                    {note.preset} ·{' '}
                    {new Date(note.createdAt).toLocaleString('it-IT', {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: '2-digit',
                      month: '2-digit',
                    })}
                  </Text>
                </Box>
              ))}
              {notes.length === 0 ? (
                <Text className="text-sm text-[var(--color-neutral-600)]">
                  Nessuna nota ancora assegnata.
                </Text>
              ) : null}
            </VStack>
          </Box>
        ) : null}
      </VStack>
    </Box>
  );
}
