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
import { Badge, BadgeText } from '@/components/ui/badge';

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

  const customerFocus = useMemo(() => {
    let manualFollowUps = 0;
    let aiMonitoring = 0;

    customerStatusList.forEach((customer) => {
      const communication = deriveCommunicationState(customer);
      if (communication.tone === 'warning') {
        manualFollowUps += 1;
      } else if (communication.tone === 'info') {
        aiMonitoring += 1;
      }
    });

    return {
      manualFollowUps,
      aiMonitoring,
      stable:
        customerStatusList.length - manualFollowUps - aiMonitoring,
    };
  }, [customerStatusList]);

  const bookingFocus = useMemo(() => {
    let arrivingToday = 0;
    let inHouse = 0;
    let upcoming = 0;

    upcomingBookings.forEach((booking) => {
      const timeline = deriveBookingTimeline(
        booking.checkIn,
        booking.checkOut
      );

      if (timeline.tone === 'today') {
        arrivingToday += 1;
      } else if (timeline.tone === 'inhouse') {
        inHouse += 1;
      } else {
        upcoming += 1;
      }
    });

    return {
      arrivingToday,
      inHouse,
      upcoming,
    };
  }, [upcomingBookings]);

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

      <Box className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,2.15fr)_minmax(320px,1fr)]">
        <VStack space="6" className="min-w-0">
          <SectionCard
            title="Da gestire ora"
            subtitle="Clienti con richieste sensibili o AI fallback nelle ultime ore."
            contentClassName="space-y-4"
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

          <VStack space="6" className="min-w-0">
            <SectionCard
              title="Stato clienti"
              subtitle="Panoramica dei clienti attivi con automazioni e step manuali da seguire."
              padding="md"
              className="flex-1"
              contentClassName="space-y-5"
            >
              <Box className="rounded-2xl border border-[rgba(196,123,44,0.18)] bg-[rgba(196,123,44,0.08)] px-4 py-3">
                <VStack space="sm">
                  <HStack className="flex-wrap items-center gap-3">
                    <Badge
                      size="sm"
                      action="muted"
                      className="rounded-full border border-[var(--color-primary-border-soft)] bg-white/80 px-3 py-1"
                    >
                      <BadgeText className="tracking-[0.35em] text-[10px] text-[var(--color-primary-600)]">
                        percorso
                      </BadgeText>
                    </Badge>
                    <Text className="text-sm font-semibold text-[var(--color-neutral-800)]">
                      {customerFocus.manualFollowUps} follow-up prioritari
                    </Text>
                  </HStack>
                  <Text className="text-xs leading-5 text-[var(--color-neutral-600)]">
                    Prosegui con {customerFocus.aiMonitoring} automazioni in monitoraggio e {customerFocus.stable}
                    {' '}clienti stabili per mantenere il flusso sotto controllo.
                  </Text>
                </VStack>
              </Box>
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
              className="flex-1"
              contentClassName="space-y-5"
            >
              <Box className="rounded-2xl border border-[rgba(196,123,44,0.18)] bg-[rgba(196,123,44,0.08)] px-4 py-3">
                <VStack space="sm">
                  <HStack className="flex-wrap items-center gap-3">
                    <Badge
                      size="sm"
                      action="muted"
                      className="rounded-full border border-[var(--color-primary-border-soft)] bg-white/80 px-3 py-1"
                    >
                      <BadgeText className="tracking-[0.35em] text-[10px] text-[var(--color-primary-600)]">
                        agenda
                      </BadgeText>
                    </Badge>
                    <Text className="text-sm font-semibold text-[var(--color-neutral-800)]">
                      {bookingFocus.arrivingToday} arrivi oggi · {bookingFocus.inHouse} ospiti in struttura
                    </Text>
                  </HStack>
                  <Text className="text-xs leading-5 text-[var(--color-neutral-600)]">
                    Prepara accoglienza e checkout con {bookingFocus.upcoming} arrivi oltre le 24 ore per anticipare le richieste.
                  </Text>
                </VStack>
              </Box>
              {upcomingBookings.map((booking) => {
                const relatedCustomer: Customer | undefined = customers.find(
                  (customer) => customer.id === booking.customerId
                );
                const checkIn = formatDate(booking.checkIn);
                const checkOut = formatDate(booking.checkOut);
                const timeline = deriveBookingTimeline(booking.checkIn, booking.checkOut);
                const nextStep = parseNextEvent(booking.prossimoInvio);
                const statusTone = deriveBookingStatusTone(booking.status);

                return (
                  <BookingStatusCard
                    key={booking.id}
                    bookingNumber={booking.bookingNumber}
                    guestName={`${relatedCustomer?.firstName ?? ''} ${
                      relatedCustomer?.lastName ?? ''
                    }`.trim()}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    statusLabel={booking.status}
                    statusTone={statusTone}
                    roomsGuests={`${booking.rooms} stanze · ${booking.guests} ospiti`}
                    nextEvent={
                      nextStep.when === '—'
                        ? nextStep.label
                        : `${nextStep.label} · ${nextStep.when}`
                    }
                    timelineTone={timeline.tone}
                    attentionNote={booking.attentionReason}
                    onPress={() => router.push(`/bookings/${booking.id}`)}
                  />
                );
              })}
            </SectionCard>
          </VStack>
        </VStack>

        <VStack space="lg" className="w-full max-w-[320px]">
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
      </Box>

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
