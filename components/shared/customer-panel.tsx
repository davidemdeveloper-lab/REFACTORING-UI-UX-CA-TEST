'use client';

import { Customer, Booking, Note } from '@/types';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Timeline } from './timeline';
import { ArrowUpRight } from 'lucide-react-native';
import { PRIMARY_ICON_COLOR } from '@/constants/colors';

type CustomerPanelProps = {
  customer: Customer;
  bookings?: Booking[];
  notes?: Note[];
  onAddNote?: () => void;
  onOpenCustomer?: () => void;
  showTimeline?: boolean;
  showNotes?: boolean;
  showBookings?: boolean;
  variant?: 'default' | 'compact';
};

const noteStatusTone: Record<Note['status'], { badge: string; text: string }> = {
  Aperto: {
    badge: 'bg-[rgba(236,72,153,0.16)]',
    text: '#be123c',
  },
  'In corso': {
    badge: 'bg-[rgba(234,179,8,0.22)]',
    text: '#92400e',
  },
  Risolto: {
    badge: 'bg-[rgba(31,122,77,0.18)]',
    text: '#0f766e',
  },
};

const bookingStatusTone: Record<
  Booking['status'],
  { badge: string; text: string }
> = {
  Confermata: {
    badge: 'bg-[rgba(31,122,77,0.16)]',
    text: '#0f766e',
  },
  'In attesa pagamento': {
    badge: 'bg-[rgba(234,179,8,0.22)]',
    text: '#92400e',
  },
  Cancellata: {
    badge: 'bg-[rgba(239,68,68,0.18)]',
    text: '#b91c1c',
  },
  'In house': {
    badge: 'bg-[rgba(59,130,246,0.16)]',
    text: '#1d4ed8',
  },
};

export function CustomerPanel({
  customer,
  bookings = [],
  notes = [],
  onAddNote,
  onOpenCustomer,
  showTimeline = true,
  showNotes = true,
  showBookings = true,
  variant = 'default',
}: CustomerPanelProps) {
  const visibleNotes = notes.slice(0, 2);
  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()
  );
  const isCompact = variant === 'compact';

  return (
    <Box
      className={`w-full rounded-3xl border border-transparent bg-[var(--color-surface)] px-6 py-6 shadow-[var(--shadow-card)] ${
        isCompact ? 'max-w-[320px]' : 'max-w-[360px]'
      }`}
    >
      <VStack space="lg">
        <Box>
          <HStack className="items-start justify-between gap-3">
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
            {onOpenCustomer ? (
              <Button
                size="sm"
                variant="outline"
                action="primary"
                className="rounded-full border-[var(--color-primary-600)] bg-transparent px-3 py-2"
                onPress={onOpenCustomer}
              >
                <HStack className="items-center gap-1">
                  <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                    Apri scheda
                  </Text>
                  <ArrowUpRight size={14} color={PRIMARY_ICON_COLOR} strokeWidth={2} />
                </HStack>
              </Button>
            ) : null}
          </HStack>
          {isCompact ? null : (
            <HStack className="mt-4 flex-row flex-wrap gap-2">
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
              {customer.highPriority ? (
                <Badge
                  size="sm"
                  action="muted"
                  className="rounded-full bg-[rgba(236,72,153,0.18)] px-3 py-1 text-xs font-semibold text-[#be123c]"
                >
                  <Text className="text-xs font-semibold text-[#be123c]">
                    Alta attenzione
                  </Text>
                </Badge>
              ) : null}
            </HStack>
          )}
        </Box>

        <Box className="rounded-2xl border border-transparent bg-[var(--color-background)] px-4 py-4">
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
            Comunicazioni
          </Text>
          <VStack space="sm" className="mt-3">
            <InfoCard
              label="Stato comunicazione"
              value={customer.statoComunicazione}
            />
            <InfoCard label="Ultimo evento" value={customer.ultimoEvento} />
            <InfoCard
              label="Prossimo invio"
              value={customer.prossimoInvio}
              highlight
            />
          </VStack>
        </Box>

        {isCompact
          ? null
          : customer.highPriority || customer.priorityReason ? (
          <Box className="rounded-2xl border border-[rgba(236,72,153,0.25)] bg-[rgba(236,72,153,0.12)] px-4 py-4">
            <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[#be123c]">
              Intervento richiesto
            </Text>
            <Text className="mt-2 text-sm font-semibold text-[#be123c]">
              {customer.prioritySource
                ? `Fonte · ${customer.prioritySource}`
                : 'Segnalazione manuale'}
            </Text>
            {customer.priorityReason ? (
              <Text className="mt-1 text-sm leading-6 text-[#be123c]">
                {customer.priorityReason}
              </Text>
            ) : null}
            {customer.prioritySince ? (
              <Text className="mt-2 text-xs text-[#be123c] opacity-75">
                In priorità dal{' '}
                {new Date(customer.prioritySince).toLocaleString('it-IT', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            ) : null}
          </Box>
        ) : null}

        {showBookings && sortedBookings.length > 0 ? (
          <Box>
            <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
              Prenotazioni collegate
            </Text>
            <VStack space="sm" className="mt-3">
              {sortedBookings.map((booking) => {
                const statusTone = bookingStatusTone[booking.status];
                return (
                  <Box
                    key={booking.id}
                    className="rounded-2xl border border-transparent bg-[var(--color-background)] px-4 py-3"
                  >
                    <HStack className="items-center justify-between gap-3">
                      <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                        Prenotazione n° {booking.bookingNumber}
                      </Text>
                      <Badge
                        size="sm"
                        action="muted"
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone.badge}`}
                      >
                        <Text className={`text-xs font-semibold ${statusTone.text}`}>
                          {booking.status}
                        </Text>
                      </Badge>
                    </HStack>
                    <Text className="mt-1 text-xs text-[var(--color-neutral-600)]">
                      Check-in {booking.checkIn} · Check-out {booking.checkOut}
                    </Text>
                    <HStack className="mt-2 flex-row flex-wrap gap-2">
                      {booking.roomNumber ? (
                        <Badge
                          size="sm"
                          action="muted"
                          className="rounded-full bg-[rgba(59,130,246,0.12)] px-3 py-1 text-xs font-semibold text-[#1d4ed8]"
                        >
                          <Text className="text-xs font-semibold text-[#1d4ed8]">
                            Camera · {booking.roomNumber}
                          </Text>
                        </Badge>
                      ) : null}
                      <Badge
                        size="sm"
                        action="muted"
                        className="rounded-full bg-[rgba(196,123,44,0.12)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-600)]"
                      >
                        <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                          {booking.rooms} camere · {booking.guests} ospiti
                        </Text>
                      </Badge>
                      <Badge
                        size="sm"
                        action="muted"
                        className="rounded-full bg-[rgba(148,163,184,0.18)] px-3 py-1 text-xs font-semibold text-[var(--color-neutral-600)]"
                      >
                        <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                          Comunicazioni · {booking.statoComunicazione}
                        </Text>
                      </Badge>
                    </HStack>
                  </Box>
                );
              })}
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
              {visibleNotes.map((note) => {
                const tone = noteStatusTone[note.status];
                const timestamp = new Date(note.createdAt).toLocaleString('it-IT', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                });
                return (
                  <Box
                    key={note.id}
                    className="rounded-2xl border border-transparent bg-[var(--color-background)] px-4 py-3"
                  >
                    <HStack className="items-center justify-between gap-3">
                      <Badge
                        size="sm"
                        action="muted"
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          note.preset === 'Richiesta cliente'
                            ? 'bg-[rgba(22,163,74,0.18)] text-[#15803d]'
                            : note.preset === 'Manutenzione'
                            ? 'bg-[rgba(239,68,68,0.18)] text-[#b91c1c]'
                            : note.preset === 'Oggetto smarrito'
                            ? 'bg-[rgba(236,118,46,0.16)] text-[#c2410c]'
                            : 'bg-[rgba(59,130,246,0.14)] text-[#1d4ed8]'
                        }`}
                      >
                        <Text className="text-xs font-semibold">
                          {note.preset}
                        </Text>
                      </Badge>
                      <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral-600)]">
                        {timestamp}
                      </Text>
                    </HStack>
                    <Text className="mt-2 text-sm font-semibold text-[var(--color-neutral-900)]">
                      {note.title}
                    </Text>
                    <Text className="mt-1 text-xs leading-5 text-[var(--color-neutral-600)]">
                      {note.content}
                    </Text>
                    <HStack className="mt-3 flex-row flex-wrap gap-2">
                      <Badge
                        size="sm"
                        action="muted"
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${tone.badge}`}
                      >
                        <Text className={`text-xs font-semibold ${tone.text}`}>
                          {note.status}
                        </Text>
                      </Badge>
                      <Badge
                        size="sm"
                        action="muted"
                        className="rounded-full bg-[rgba(196,123,44,0.12)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-600)]"
                      >
                        <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                          {note.createdBy}
                        </Text>
                      </Badge>
                    </HStack>
                  </Box>
                );
              })}
              {visibleNotes.length === 0 ? (
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

function InfoCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Box
      className={`rounded-2xl border border-transparent px-4 py-3 ${
        highlight
          ? 'border-[rgba(196,123,44,0.45)] bg-[rgba(196,123,44,0.08)]'
          : 'bg-[var(--color-background)]'
      }`}
    >
      <Text className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-500)]">
        {label}
      </Text>
      <Text
        className={`mt-2 text-sm ${
          highlight
            ? 'font-semibold text-[var(--color-primary-600)]'
            : 'text-[var(--color-neutral-700)]'
        }`}
      >
        {value}
      </Text>
    </Box>
  );
}
