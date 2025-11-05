// Scopo: consultare le prenotazioni, monitorare pagamenti e gestire follow-up.
'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { PageToolbar } from '@/components/shared/page-toolbar';
import { SectionCard } from '@/components/shared/section-card';
import { EntityCard } from '@/components/shared/entity-card';
import { NotesBoard } from '@/components/shared/notes-board';
import { StatCard } from '@/components/shared/stat-card';
import {
  useGetBookingsQuery,
  useGetCustomersQuery,
  useGetNotesQuery,
} from '@/services/mockApi';
import { Button } from '@/components/ui/button';
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
import { CalendarCheck, CreditCard, MessageCircle } from 'lucide-react-native';
import { PRIMARY_ICON_COLOR } from '@/constants/colors';
import { Badge } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';

export default function BookingsPage() {
  const router = useRouter();
  const { data: bookings = [] } = useGetBookingsQuery();
  const { data: customers = [] } = useGetCustomersQuery();
  const { data: notes = [] } = useGetNotesQuery();
  const bookingsById = useMemo(() => {
    const map = new Map<string, (typeof bookings)[number]>();
    bookings.forEach((booking) => {
      map.set(booking.id, booking);
    });
    return map;
  }, [bookings]);

  const bookingNotes = useMemo(
    () => notes.filter((note) => note.target === 'Booking'),
    [notes]
  );

  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const awaitingPayment = bookings.filter(
    (booking) => booking.status === 'In attesa pagamento'
  ).length;
  const confirmed = bookings.filter(
    (booking) => booking.status === 'Confermata'
  ).length;

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Cerca prenotazione per cliente, data o canale..."
        primaryActionLabel="Aggiungi prenotazione"
        onPrimaryAction={() => router.push('/bookings/new')}
        extraActions={
          <Button
            size="md"
            variant="outline"
            action="secondary"
            className="rounded-full border-[var(--color-primary-border-soft)] bg-[var(--color-surface)] px-5"
            onPress={() => router.push('/customers/new')}
          >
            <Text className="text-sm font-semibold text-[var(--color-neutral-700)]">
              Accogli cliente
            </Text>
          </Button>
        }
      />

      <HStack className="flex-col gap-6 lg:flex-row">
        <Box className="flex-1">
          <SectionCard
            title="Prenotazioni"
            subtitle="Stato pagamenti, comunicazioni e azioni suggerite per ogni soggiorno."
            contentClassName="space-y-4"
          >
            {bookings.map((booking) => {
              const customer = customers.find((c) => c.id === booking.customerId);
              const statusTone =
                booking.status === 'Confermata'
                  ? 'success'
                  : booking.status === 'In attesa pagamento'
                  ? 'warning'
                  : booking.status === 'Cancellata'
                  ? 'danger'
                  : 'info';
              const paymentTone =
                booking.paymentStatus === 'Pagato'
                  ? 'success'
                  : booking.paymentStatus === 'Parziale'
                  ? 'info'
                  : 'warning';
              return (
                <EntityCard
                  key={booking.id}
                  title={`Prenotazione n° ${booking.bookingNumber}`}
                  subtitle={`${customer?.firstName ?? ''} ${
                    customer?.lastName ?? ''
                  } · Check-in ${booking.checkIn} · Check-out ${booking.checkOut}`}
                  status={{
                    label: booking.status,
                    tone: statusTone,
                  }}
                  description={booking.attentionReason}
                  badges={[
                    {
                      label: `Pagamento · ${booking.paymentStatus}`,
                      tone: paymentTone,
                    },
                    {
                      label: `Canale · ${booking.channel}`,
                      tone: 'neutral',
                    },
                    booking.roomNumber
                      ? {
                          label: `Camera · ${booking.roomNumber}`,
                          tone: 'info',
                        }
                      : undefined,
                  ].filter(Boolean) as { label: string; tone?: 'info' | 'success' | 'warning' | 'danger' | 'neutral' }[]}
                  badgesSecondary={
                    <HStack className="flex-wrap items-center gap-2">
                      <Badge
                        size="sm"
                        action="muted"
                        className="rounded-full bg-[rgba(31,41,55,0.08)] px-3 py-1 text-xs font-semibold text-[var(--color-neutral-800)]"
                      >
                        <Text className="text-xs font-semibold text-[var(--color-neutral-800)]">
                          Ultimo evento · {booking.ultimoEvento}
                        </Text>
                      </Badge>
                      <Badge
                        size="sm"
                        action="muted"
                        className="rounded-full bg-[rgba(59,130,246,0.14)] px-3 py-1 text-xs font-semibold text-[#1d4ed8]"
                      >
                        <Text className="text-xs font-semibold text-[#1d4ed8]">
                          Prossimo evento · {booking.prossimoInvio}
                        </Text>
                      </Badge>
                    </HStack>
                  }
                  meta={[
                    {
                      label: 'Stato comunicazione',
                      value: booking.statoComunicazione,
                    },
                    {
                      label: 'Ospiti & camere',
                      value: `${booking.guests} ospiti · ${booking.rooms} stanze`,
                    },
                  ]}
                  onPress={() => router.push(`/bookings/${booking.id}`)}
                />
              );
            })}
          </SectionCard>
        </Box>

        <VStack space="lg" className="w-full max-w-[300px]">
          <StatCard
            label="Prenotazioni confermate"
            value={`${confirmed}`}
            helper="Soggiorni pronti all'arrivo"
            icon={<CalendarCheck size={26} color={PRIMARY_ICON_COLOR} strokeWidth={2} />}
            tone="positive"
          />
          <StatCard
            label="Pagamenti da chiudere"
            value={`${awaitingPayment}`}
            helper="Prenotazioni con incasso in sospeso"
            icon={<CreditCard size={26} color={PRIMARY_ICON_COLOR} strokeWidth={2} />}
            tone={awaitingPayment > 0 ? 'warning' : 'default'}
          />
          <StatCard
            label="Follow-up richiesti"
            value={`${bookings.filter((b) => b.attentionReason).length}`}
            helper="Azioni manuali suggerite dall'AI"
            icon={<MessageCircle size={26} color={PRIMARY_ICON_COLOR} strokeWidth={2} />}
            tone={bookings.some((b) => b.attentionReason) ? 'warning' : 'default'}
          />
          <SectionCard
            title="Follow-up richiesti"
            subtitle="Azioni che l'AI suggerisce di monitorare manualmente."
            padding="md"
            contentClassName="space-y-3"
          >
            {bookings
              .filter((booking) => booking.attentionReason)
              .map((booking) => (
                <Pressable
                  key={`followup-${booking.id}`}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 transition-colors duration-150 data-[hover=true]:border-[#aa6a24] data-[hover=true]:bg-[rgba(196,123,44,0.08)]"
                  onPress={() => router.push(`/bookings/${booking.id}`)}
                >
                  <Box className="flex-1">
                    <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                      Prenotazione n° {booking.bookingNumber}
                    </Text>
                    <Text className="text-xs text-[var(--color-neutral-600)]">
                      {booking.attentionReason}
                    </Text>
                  </Box>
                  <Box className="h-8 w-8 items-center justify-center rounded-full bg-[rgba(196,123,44,0.12)]">
                    <MessageCircle size={16} color={PRIMARY_ICON_COLOR} strokeWidth={2} />
                  </Box>
                </Pressable>
              ))}
            <Button
              size="sm"
              variant="outline"
              action="primary"
              className="w-full rounded-full border-[var(--color-primary-600)] bg-transparent px-4 py-2"
              onPress={() => setNoteModalOpen(true)}
            >
              <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                Aggiungi nota
              </Text>
            </Button>
          </SectionCard>
        </VStack>
      </HStack>

      <Modal isOpen={isNoteModalOpen} onClose={() => setNoteModalOpen(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
              Nuova nota prenotazione
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
                placeholder="Es. Richiesta late checkout"
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
                  placeholder="Descrivi le azioni da compiere o i follow-up da assegnare."
                  value={noteContent}
                  onChangeText={setNoteContent}
                />
              </Textarea>
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

// mock: bookingsMock, customersMock, notesMock
// actions: openBookingDetail(id)
// assumptions: salvataggio nota mock in attesa backend
