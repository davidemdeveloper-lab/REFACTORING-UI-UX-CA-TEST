// Scopo: guidare il receptionist a gestire subito clienti prioritari, automazioni imminenti e note di turno.
'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import {
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { PageToolbar } from '@/components/shared/page-toolbar';
import { SectionCard } from '@/components/shared/section-card';
import { EntityCard } from '@/components/shared/entity-card';
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

  const comfortRate = Math.round((comfortSummary?.comfortRate ?? 0) * 100);
  const roomsOutOfRange = comfortSummary?.roomsOutOfRange ?? [];
  const minibarToRefill = comfortSummary?.minibarToRefill ?? [];

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Cerca cliente o prenotazione..."
        primaryActionLabel="Aggiungi cliente"
        onPrimaryAction={() => router.push('/customers')}
      />

      <HStack className="flex-row gap-6">
        <Box className="flex-1">
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
              highPriorityCustomers.map((customer) => (
                <EntityCard
                  key={customer.id}
                  title={`${customer.firstName} ${customer.lastName}`}
                  subtitle={`Ultimo evento · ${customer.ultimoEvento}`}
                  status={{
                    label: 'Alta attenzione',
                    tone: 'warning',
                  }}
                  description={
                    customer.priorityReason ??
                    'Intervento immediato richiesto: apri la conversazione per maggiori dettagli.'
                  }
                  badges={[
                    {
                      label: `Tag · ${customer.tags.join(', ') || '—'}`,
                      tone: 'neutral',
                    },
                    {
                      label: customer.prioritySource
                        ? `Fonte · ${customer.prioritySource}`
                        : 'Fonte · Manuale',
                      tone: 'neutral',
                    },
                  ]}
                  meta={[
                    {
                      label: 'Ultimo aggiornamento',
                      value: formatDateTime(customer.lastUpdate),
                    },
                    {
                      label: 'Prossimo invio',
                      value: customer.prossimoInvio,
                      emphasize: true,
                    },
                    {
                      label: 'Newsletter',
                      value: customer.newsletter ? 'Iscritto' : 'Non iscritto',
                    },
                    {
                      label: 'Priorità da',
                      value: customer.prioritySince
                        ? formatDateTime(customer.prioritySince)
                        : '—',
                    },
                  ]}
                  rightAccessory={
                    <Box className="rounded-full bg-[rgba(236,69,90,0.16)] px-3 py-1">
                      <Text className="text-xs font-semibold text-[#be123c]">
                        Vai alla chat
                      </Text>
                    </Box>
                  }
                  onPress={() => {
                    const conversation = conversations.find(
                      (item) => item.customerId === customer.id
                    );
                    if (conversation) {
                      dispatch(setSelectedConversationId(conversation.id));
                      router.push(`/chat?conversation=${conversation.id}`);
                      return;
                    }
                    router.push(`/customers/${customer.id}`);
                  }}
                />
              ))
            )}
          </SectionCard>

          <SectionCard
            title="Stato clienti"
            subtitle="Monitoraggio comunicazioni e prossime azioni di automazione."
            padding="md"
            className="overflow-hidden"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Stato comunicazione</TableHead>
                  <TableHead>Ultimo evento</TableHead>
                  <TableHead>Prossimo invio</TableHead>
                  <TableHead>Newsletter</TableHead>
                  <TableHead>N. soggiorni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.slice(0, 6).map((customer) => (
                  <TableRow key={customer.id}>
                    <TableData>
                      <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                        {customer.firstName} {customer.lastName}
                      </Text>
                      <Text className="mt-1 text-xs text-[var(--color-neutral-500)]">
                        Ultimo aggiornamento · {formatDate(customer.lastUpdate)}
                      </Text>
                    </TableData>
                    <TableData>
                      <Text className="text-sm text-[var(--color-neutral-700)]">
                        {customer.statoComunicazione}
                      </Text>
                    </TableData>
                    <TableData>
                      <Text className="text-sm text-[var(--color-neutral-700)]">
                        {customer.ultimoEvento}
                      </Text>
                    </TableData>
                    <TableData>
                      <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                        {customer.prossimoInvio}
                      </Text>
                    </TableData>
                    <TableData>
                      <Text className="text-sm text-[var(--color-neutral-700)]">
                        {customer.newsletter ? 'Si' : 'No'}
                      </Text>
                    </TableData>
                    <TableData>
                      <Text className="text-sm text-[var(--color-neutral-900)]">
                        {customer.staysCount}
                      </Text>
                    </TableData>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>

          <SectionCard
            title="Prenotazioni imminenti"
            subtitle="Occupati dei check-in prossimi e delle richieste aperte."
            contentClassName="space-y-4"
          >
            {upcomingBookings.map((booking) => {
              const relatedCustomer: Customer | undefined = customers.find(
                (customer) => customer.id === booking.customerId
              );
              const checkIn = formatDate(booking.checkIn);
              const checkOut = formatDate(booking.checkOut);
              return (
                <EntityCard
                  key={booking.id}
                  title={`Prenotazione n° ${booking.bookingNumber}`}
                  subtitle={`${relatedCustomer?.firstName ?? ''} ${
                    relatedCustomer?.lastName ?? ''
                  } · ${checkIn} → ${checkOut}`}
                  status={{
                    label: booking.status,
                    tone:
                      booking.status === 'Confermata'
                        ? 'success'
                        : booking.status === 'In attesa pagamento'
                        ? 'warning'
                        : 'neutral',
                  }}
                  description={booking.attentionReason}
                  badges={[
                    {
                      label: `${booking.rooms} stanze · ${booking.guests} ospiti`,
                      tone: 'neutral',
                    },
                    {
                      label: `Stato comunicazione · ${booking.statoComunicazione}`,
                      tone: 'info',
                    },
                  ]}
                  meta={[
                    {
                      label: 'Ultimo evento',
                      value: booking.ultimoEvento,
                    },
                    {
                      label: 'Prossimo invio',
                      value: booking.prossimoInvio,
                    },
                    {
                      label: 'Pagamenti',
                      value: `${booking.paymentStatus}`,
                    },
                    {
                      label: 'Canale',
                      value: booking.channel,
                    },
                  ]}
                  onPress={() => router.push(`/bookings/${booking.id}`)}
                />
              );
            })}
          </SectionCard>
        </Box>

        <VStack space="lg" className="w-full max-w-[360px]">
          <StatCard
            label="Comfort camere"
            value={`${comfortRate}%`}
            helper={
              roomsOutOfRange.length > 0
                ? `${roomsOutOfRange.length} stanze da verificare`
                : 'Tutte le stanze nel range ideale'
            }
            icon={<ThermometerSun size={26} color="var(--color-primary-600)" strokeWidth={2} />}
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
            icon={<Droplets size={26} color="var(--color-primary-600)" strokeWidth={2} />}
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
                <AlertTriangle size={18} color="var(--color-primary-600)" strokeWidth={2} />
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
