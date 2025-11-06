// Scopo: guidare il receptionist a gestire subito clienti prioritari, automazioni imminenti e note di turno.
'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { PageToolbar } from '@/components/shared/page-toolbar';
import { SectionCard } from '@/components/shared/section-card';
import { NotesBoard } from '@/components/shared/notes-board';
import { StatCard } from '@/components/shared/stat-card';
import {
  useGetBookingsQuery,
  useGetCustomersQuery,
  useGetIoTComfortSummaryQuery,
  useGetNotesQuery,
  useGetConversationsQuery,
} from '@/services/mockApi';
import { Customer } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { setSelectedConversationId } from '@/store/slices/uiSlice';
import { ThermometerSun, Droplets, AlertTriangle } from 'lucide-react-native';
import { PRIMARY_ICON_COLOR } from '@/constants/colors';
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PriorityAlert } from '@/components/shared/priority-alert';
import { CustomerStatusCard } from '@/components/shared/customer-status-card';
import { BookingStatusCard } from '@/components/shared/booking-status-card';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
  });
}

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatCustomerUpdate(dateString: string | undefined) {
  if (!dateString) {
    return null;
  }
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  const day = date.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
  });
  const time = date.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${day} · ${time}`;
}

function parseNextEvent(value: string | undefined | null) {
  if (!value) {
    return { label: 'Evento da pianificare', when: '—' };
  }
  const parts = value
    .split('·')
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length === 0) {
    return { label: 'Evento da pianificare', when: '—' };
  }
  if (parts.length === 1) {
    return { label: parts[0], when: '—' };
  }
  return { label: parts[0], when: parts.slice(1).join(' · ') };
}

type CommunicationState = {
  label: string;
  tone: 'info' | 'success' | 'warning' | 'neutral';
  description: string;
};

function deriveCommunicationState(customer: Customer): CommunicationState {
  const ultimoEvento = customer.ultimoEvento.toLowerCase();

  const patterns: Array<{
    match: RegExp;
    result: CommunicationState;
  }> = [
    {
      match: /pagamento/,
      result: {
        label: 'In attesa check-in',
        tone: 'success',
        description: 'Pagamento completato: prepara accoglienza e chiavi digitali.',
      },
    },
    {
      match: /late checkout|transfer/,
      result: {
        label: 'Serve follow-up concierge',
        tone: 'warning',
        description: 'Contatta il cliente per confermare late checkout e transfer.',
      },
    },
    {
      match: /allergie|cucina/,
      result: {
        label: 'Coordinamento staff',
        tone: 'info',
        description: 'Condividi gli aggiornamenti con cucina e housekeeping.',
      },
    },
    {
      match: /early check-in/,
      result: {
        label: 'Richiede conferma housekeeping',
        tone: 'warning',
        description: 'Verifica disponibilità camera e aggiorna il cliente.',
      },
    },
  ];

  const matched = patterns.find((pattern) => pattern.match.test(ultimoEvento));

  if (matched) {
    return matched.result;
  }

  return {
    label: 'Monitoraggio automazioni',
    tone: 'neutral',
    description: 'Controlla timeline e note per anticipare le richieste.',
  };
}

function derivePriorityTone(customer: Customer): 'warning' | 'info' | 'neutral' {
  const prioritySource = (customer.prioritySource ?? '').toLowerCase();
  const reason = (customer.priorityReason ?? '').toLowerCase();

  if (
    prioritySource.includes('ai') ||
    reason.includes('fallback') ||
    reason.includes('errore') ||
    reason.includes('pagamento')
  ) {
    return 'warning';
  }

  if (
    prioritySource.includes('cucina') ||
    prioritySource.includes('concierge') ||
    reason.includes('allerg') ||
    reason.includes('housekeeping')
  ) {
    return 'info';
  }

  return 'neutral';
}

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function deriveBookingTimeline(checkIn: string, checkOut: string) {
  const now = new Date();
  const today = startOfDay(now);

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (Number.isNaN(checkInDate.getTime()) || Number.isNaN(checkOutDate.getTime())) {
    return {
      tone: 'upcoming' as const,
      detail: 'Data non disponibile',
    };
  }

  const checkInDay = startOfDay(checkInDate);
  const checkOutDay = startOfDay(checkOutDate);

  if (checkInDay.getTime() <= today.getTime() && today.getTime() <= checkOutDay.getTime()) {
    return {
      tone: 'inhouse' as const,
      detail: `Check-out il ${checkOutDate.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
      })}`,
    };
  }

  const diffDays = Math.round(
    (checkInDay.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)
  );

  if (diffDays === 0) {
    return {
      tone: 'today' as const,
      detail: `Check-in oggi alle ${checkInDate.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
    };
  }

  if (diffDays === 1) {
    return {
      tone: 'upcoming' as const,
      detail: 'Arrivo tra 1 giorno',
    };
  }

  if (diffDays > 1) {
    return {
      tone: 'upcoming' as const,
      detail: `Arrivo tra ${diffDays} giorni`,
    };
  }

  return {
    tone: 'inhouse' as const,
    detail: `Check-in completato · checkout il ${checkOutDate.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
    })}`,
  };
}

function deriveBookingStatusTone(status: string): 'info' | 'success' | 'warning' | 'neutral' {
  const normalized = status.toLowerCase();
  if (normalized.includes('confermat')) {
    return 'success';
  }
  if (normalized.includes('attesa') || normalized.includes('pagamento')) {
    return 'warning';
  }
  if (normalized.includes('in house') || normalized.includes('in corso')) {
    return 'info';
  }
  return 'neutral';
}

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: customers = [] } = useGetCustomersQuery();
  const { data: bookings = [] } = useGetBookingsQuery();
  const { data: notes = [] } = useGetNotesQuery({ target: 'Dashboard' });
  const { data: comfortSummary } = useGetIoTComfortSummaryQuery();
  const { data: conversations = [] } = useGetConversationsQuery();

  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const highPriorityCustomers = useMemo(
    () => customers.filter((customer) => customer.highPriority),
    [customers]
  );

  const customerStatusList = useMemo(() => {
    const toTimestamp = (value?: string) =>
      value ? new Date(value).getTime() : 0;

    return [...customers]
      .sort((a, b) => toTimestamp(b.lastUpdate) - toTimestamp(a.lastUpdate))
      .slice(0, 5);
  }, [customers]);

  const upcomingBookings = useMemo(
    () =>
      [...bookings]
        .sort(
          (a, b) =>
            new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()
        )
        .slice(0, 5),
    [bookings]
  );

  const bookingsWithMeta = useMemo(
    () =>
      upcomingBookings.map((booking) => {
        const relatedCustomer = customers.find(
          (customer) => customer.id === booking.customerId
        );
        const timeline = deriveBookingTimeline(
          booking.checkIn,
          booking.checkOut
        );
        const nextStep = parseNextEvent(booking.prossimoInvio);
        const statusTone = deriveBookingStatusTone(booking.status);

        const now = new Date();
        const checkInDate = new Date(booking.checkIn);
        const checkOutDate = new Date(booking.checkOut);

        const hoursToCheckIn =
          Number.isNaN(checkInDate.getTime())
            ? null
            : (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        const hoursToCheckOut =
          Number.isNaN(checkOutDate.getTime())
            ? null
            : (checkOutDate.getTime() - now.getTime()) / (1000 * 60 * 60);

        const isCheckInWithin48Hours =
          typeof hoursToCheckIn === 'number' &&
          hoursToCheckIn >= 0 &&
          hoursToCheckIn <= 48;
        const isCheckOutWithin48Hours =
          typeof hoursToCheckOut === 'number' &&
          hoursToCheckOut >= 0 &&
          hoursToCheckOut <= 48;

        return {
          booking,
          relatedCustomer,
          timeline,
          nextStep,
          statusTone,
          meta: {
            isCheckInWithin48Hours,
            isCheckOutWithin48Hours,
          },
        };
      }),
    [customers, upcomingBookings]
  );

  const bookingSummary = useMemo(
    () =>
      bookingsWithMeta.reduce(
        (acc, item) => {
          if (item.timeline.tone === 'inhouse') {
            acc.inHouse += 1;
            if (item.meta.isCheckOutWithin48Hours) {
              acc.departingSoon += 1;
            }
          }

          if (item.timeline.tone === 'today') {
            acc.checkInToday += 1;
          }

          if (
            item.meta.isCheckInWithin48Hours &&
            item.timeline.tone !== 'today'
          ) {
            acc.arrivingSoon += 1;
          }

          return acc;
        },
        { inHouse: 0, departingSoon: 0, checkInToday: 0, arrivingSoon: 0 }
      ),
    [bookingsWithMeta]
  );

  const comfortRate = Math.round((comfortSummary?.comfortRate ?? 0) * 100);
  const roomsOutOfRange = comfortSummary?.roomsOutOfRange ?? [];
  const minibarToRefill = comfortSummary?.minibarToRefill ?? [];

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Cerca cliente o prenotazione..."
        primaryActionLabel="Accogli cliente"
        onPrimaryAction={() => router.push('/customers/new')}
        extraActions={
          <Button
            size="md"
            variant="outline"
            action="secondary"
            className="rounded-full border-[var(--color-primary-border-soft)] bg-[var(--color-surface)] px-5"
            onPress={() => router.push('/bookings/new')}
          >
            <Text className="text-sm font-semibold text-[var(--color-neutral-700)]">
              Aggiungi prenotazione
            </Text>
          </Button>
        }
      />

      <HStack className="flex-row gap-6">
        <VStack space="lg" className="flex-1">
          <SectionCard
            title="Da gestire ora"
            subtitle="Clienti con richieste sensibili o AI fallback nelle ultime ore."
            contentClassName="space-y-4"
            className="mb-0"
          >
            {highPriorityCustomers.length === 0 ? (
              <Box className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-6 py-10">
                <Text className="text-center text-sm text-[var(--color-neutral-600)]">
                  Nessun cliente prioritario in questo momento.
                </Text>
              </Box>
            ) : (
              <Box className="max-h-[360px] space-y-3 overflow-y-auto pr-1">
                {highPriorityCustomers.map((customer) => {
                  const conversation = conversations.find(
                    (item) => item.customerId === customer.id
                  );
                  const statusLabel =
                    customer.prioritySource ?? 'Intervento richiesto';
                  const message =
                    customer.priorityReason ??
                    customer.ultimoEvento ??
                    'Richiesta in attesa di gestione';

                  return (
                    <PriorityAlert
                      key={customer.id}
                      guestName={`${customer.firstName} ${customer.lastName}`}
                      statusLabel={statusLabel}
                      tone={derivePriorityTone(customer)}
                      message={message}
                      lastEvent={customer.ultimoEvento}
                      updatedAt={formatDateTime(customer.lastUpdate)}
                      onAction={() => {
                        if (conversation) {
                          dispatch(setSelectedConversationId(conversation.id));
                          router.push(`/chat?conversation=${conversation.id}`);
                          return;
                        }
                        router.push(`/customers/${customer.id}`);
                      }}
                      actionLabel="Apri chat"
                    />
                  );
                })}
              </Box>
            )}
          </SectionCard>

          <SectionCard
            title="Stato clienti"
            subtitle="Panoramica dei clienti attivi con automazioni e step manuali da seguire."
            padding="md"
            className="mb-0"
            contentClassName="space-y-4"
          >
            {customerStatusList.map((customer) => {
              const communication = deriveCommunicationState(customer);
              const nextEvent = parseNextEvent(customer.prossimoInvio);
              const updatedAt = formatCustomerUpdate(customer.lastUpdate);
              const updatedDisplay = updatedAt ?? '—';
              const segment = customer.tags.slice(0, 2).join(', ') || '—';

              return (
                <CustomerStatusCard
                  key={customer.id}
                  name={`${customer.firstName} ${customer.lastName}`}
                  updatedAt={updatedDisplay}
                  tone={communication.tone}
                  communicationLabel={communication.label}
                  summary={communication.description}
                  lastEvent={customer.ultimoEvento}
                  nextEventLabel={nextEvent.label}
                  nextEventWhen={nextEvent.when}
                  segment={segment}
                  newsletter={customer.newsletter}
                  onPress={() => router.push(`/customers/${customer.id}`)}
                />
              );
            })}
          </SectionCard>

          <SectionCard
            title="Prenotazioni imminenti"
            subtitle="Occupati dei check-in prossimi e delle richieste aperte."
            padding="md"
            className="mb-0"
            contentClassName="space-y-4"
          >
            {bookingsWithMeta.length === 0 ? (
              <Box className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-6 py-10">
                <Text className="text-center text-sm text-[var(--color-neutral-600)]">
                  Nessuna prenotazione imminente nelle prossime 48 ore.
                </Text>
              </Box>
            ) : (
              <>
                <Box className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    {
                      key: 'inHouse' as const,
                      label: 'Ospiti in struttura',
                      value: bookingSummary.inHouse,
                      helper:
                        bookingSummary.departingSoon > 0
                          ? `${bookingSummary.departingSoon} check-out entro 48h`
                          : 'Nessun check-out entro 48h',
                      accent:
                        'border-[rgba(34,197,94,0.45)] bg-[rgba(34,197,94,0.12)] text-[#166534]',
                    },
                    {
                      key: 'today' as const,
                      label: 'Check-in di oggi',
                      value: bookingSummary.checkInToday,
                      helper:
                        bookingSummary.checkInToday > 0
                          ? 'Coordina concierge e housekeeping'
                          : 'Nessun check-in previsto',
                      accent:
                        'border-[rgba(234,179,8,0.45)] bg-[rgba(234,179,8,0.12)] text-[#92400e]',
                    },
                    {
                      key: 'arriving' as const,
                      label: 'Arrivi prossime 48h',
                      value: bookingSummary.arrivingSoon,
                      helper:
                        bookingSummary.arrivingSoon > 0
                          ? 'Prepara automazioni di benvenuto'
                          : 'Nessun arrivo ravvicinato',
                      accent:
                        'border-[rgba(59,130,246,0.45)] bg-[rgba(59,130,246,0.12)] text-[#1d4ed8]',
                    },
                  ].map((item) => (
                    <Box
                      key={item.key}
                      className={`rounded-2xl border bg-[var(--color-surface)] px-4 py-3 shadow-[var(--shadow-soft)] ${item.accent}`}
                    >
                      <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral-600)]">
                        {item.label}
                      </Text>
                      <HStack className="mt-2 items-end justify-between">
                        <Text className="text-2xl font-semibold text-[var(--color-neutral-900)]">
                          {item.value}
                        </Text>
                        <Box className="h-3 w-3 rounded-full bg-current opacity-70" />
                      </HStack>
                      <Text className="mt-1 text-xs text-[var(--color-neutral-600)]">
                        {item.helper}
                      </Text>
                    </Box>
                  ))}
                </Box>

                {bookingsWithMeta.map((item) => {
                  const checkIn = formatDate(item.booking.checkIn);
                  const checkOut = formatDate(item.booking.checkOut);
                  const guestName = `${item.relatedCustomer?.firstName ?? ''} ${
                    item.relatedCustomer?.lastName ?? ''
                  }`.trim();
                  const nextEventText =
                    item.nextStep.when === '—'
                      ? item.nextStep.label
                      : `${item.nextStep.label} · ${item.nextStep.when}`;
                  const combinedNextEvent =
                    item.timeline.detail &&
                    item.timeline.detail !== 'Data non disponibile'
                      ? `${item.timeline.detail} • ${nextEventText}`
                      : nextEventText;

                  return (
                    <BookingStatusCard
                      key={item.booking.id}
                      bookingNumber={item.booking.bookingNumber}
                      guestName={guestName}
                      checkIn={checkIn}
                      checkOut={checkOut}
                      statusLabel={item.booking.status}
                      statusTone={item.statusTone}
                      roomsGuests={`${item.booking.rooms} stanze · ${item.booking.guests} ospiti`}
                      nextEvent={combinedNextEvent}
                      timelineTone={item.timeline.tone}
                      attentionNote={item.booking.attentionReason}
                      onPress={() => router.push(`/bookings/${item.booking.id}`)}
                    />
                  );
                })}
              </>
            )}
          </SectionCard>
        </VStack>

        <VStack space="lg" className="w-full max-w-[300px]">
          <StatCard
            label="Comfort camere"
            value={`${comfortRate}%`}
            helper={
              roomsOutOfRange.length > 0
                ? `${roomsOutOfRange.length} stanze da verificare`
                : 'Tutte le stanze nel range ideale'
            }
            icon={<ThermometerSun size={26} color={PRIMARY_ICON_COLOR} strokeWidth={2} />}
            chips={roomsOutOfRange}
            chipLabel="Fuori soglia"
            tone={comfortRate > 80 ? 'positive' : 'warning'}
          />
          <StatCard
            label="Minibar da riempire"
            value={`${minibarToRefill.length} stanze`}
            helper={
              minibarToRefill.length > 0
                ? 'Prepara il kit refill'
                : 'Tutti i minibar sono ok.'
            }
            icon={<Droplets size={26} color={PRIMARY_ICON_COLOR} strokeWidth={2} />}
            chips={minibarToRefill}
            chipLabel="Camere"
            tone={minibarToRefill.length > 0 ? 'warning' : 'default'}
          />
          <NotesBoard
            notes={notes}
            title="Note di turno"
            actionSlot={
              <Button
                size="sm"
                variant="outline"
                action="primary"
                className="rounded-full border-[var(--color-primary-600)] bg-transparent px-4 py-2"
                onPress={() => setNoteModalOpen(true)}
              >
                <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                  Aggiungi nota
                </Text>
              </Button>
            }
          />
        </VStack>
      </HStack>

      <Modal isOpen={isNoteModalOpen} onClose={() => setNoteModalOpen(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
              Nuova nota di turno
            </Text>
            <ModalCloseButton onPress={() => setNoteModalOpen(false)} />
          </ModalHeader>
          <ModalBody className="gap-4">
            <Box>
              <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
                Titolo
              </Text>
              <Input
                value={noteTitle}
                onChangeText={setNoteTitle}
                className="mt-2 h-11 rounded-xl border-[var(--color-border)] bg-[var(--color-background)] px-4"
                placeholder="Es. Aggiornamento turno mattina"
              />
            </Box>
            <Box>
              <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
                Dettagli
              </Text>
              <Textarea className="mt-2 rounded-xl border-[var(--color-border)] bg-[var(--color-background)]">
                <TextareaInput
                  multiline
                  numberOfLines={5}
                  placeholder="Scrivi il contesto o le azioni da completare..."
                  value={noteContent}
                  onChangeText={setNoteContent}
                />
              </Textarea>
            </Box>
            <Box className="rounded-2xl border border-[rgba(196,123,44,0.25)] bg-[rgba(196,123,44,0.08)] px-4 py-3">
              <HStack className="items-start gap-3">
                <AlertTriangle size={18} color={PRIMARY_ICON_COLOR} strokeWidth={2} />
                <Text className="text-xs leading-5 text-[var(--color-neutral-600)]">
                  Le note create qui sono mock e non vengono salvate. Usa questo modulo per
                  documentare i passaggi di turno da collegare al backend quando sarà pronto.
                </Text>
              </HStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              action="default"
              className="border-[var(--color-border)] bg-[var(--color-surface)]"
              onPress={() => {
                setNoteModalOpen(false);
                setNoteTitle('');
                setNoteContent('');
              }}
            >
              <Text className="text-sm font-semibold text-[var(--color-neutral-600)]">
                Annulla
              </Text>
            </Button>
            <Button
              action="primary"
              className="bg-[var(--color-primary-600)] px-5"
              onPress={() => {
                setNoteModalOpen(false);
                setNoteTitle('');
                setNoteContent('');
              }}
            >
              <Text className="text-sm font-semibold text-white">Salva nota</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
