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

export default function BookingsPage() {
  const router = useRouter();
  const { data: bookings = [] } = useGetBookingsQuery();
  const { data: customers = [] } = useGetCustomersQuery();
  const { data: notes = [] } = useGetNotesQuery();

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
        primaryActionLabel="Nuova prenotazione"
        onPrimaryAction={() => router.push('/bookings')}
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
              return (
                <EntityCard
                  key={booking.id}
                  title={`Prenotazione n° ${booking.bookingNumber}`}
                  subtitle={`${customer?.firstName ?? ''} ${
                    customer?.lastName ?? ''
                  } · Check-in ${booking.checkIn} · Check-out ${booking.checkOut}`}
                  status={{
                    label: booking.status,
                    tone:
                      booking.status === 'Confermata'
                        ? 'success'
                        : booking.status === 'In attesa pagamento'
                        ? 'warning'
                        : 'info',
                  }}
                  description={booking.attentionReason}
                  badges={[
                    {
                      label: `Pagamento · ${booking.paymentStatus}`,
                      tone:
                        booking.paymentStatus === 'Pagato'
                          ? 'success'
                          : 'warning',
                    },
                    {
                      label: `Canale · ${booking.channel}`,
                      tone: 'neutral',
                    },
                  ]}
                  meta={[
                    { label: 'Ultimo evento', value: booking.ultimoEvento },
                    { label: 'Prossimo invio', value: booking.prossimoInvio },
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

        <VStack space="lg" className="w-full max-w-[340px]">
          <StatCard
            label="Prenotazioni confermate"
            value={`${confirmed}`}
            helper="Soggiorni pronti all'arrivo"
            icon={<CalendarCheck size={26} color="var(--color-primary-600)" strokeWidth={2} />}
            tone="positive"
          />
          <StatCard
            label="Pagamenti da chiudere"
            value={`${awaitingPayment}`}
            helper="Prenotazioni con incasso in sospeso"
            icon={<CreditCard size={26} color="var(--color-primary-600)" strokeWidth={2} />}
            tone={awaitingPayment > 0 ? 'warning' : 'default'}
          />
          <StatCard
            label="Follow-up richiesti"
            value={`${bookings.filter((b) => b.attentionReason).length}`}
            helper="Azioni manuali suggerite dall'AI"
            icon={<MessageCircle size={26} color="var(--color-primary-600)" strokeWidth={2} />}
          />
          <NotesBoard
            notes={bookingNotes}
            title="Note prenotazioni"
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
