// Scopo: consultare i clienti, valutarne la priorità e leggere le note dedicate.
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
import { useGetCustomersQuery, useGetNotesQuery } from '@/services/mockApi';
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
import { UsersRound, MailCheck } from 'lucide-react-native';
import { PRIMARY_ICON_COLOR } from '@/constants/colors';
import { Badge } from '@/components/ui/badge';
import { ListFilterBar } from '@/components/shared/list-filter-bar';

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
  });
}

export default function CustomersPage() {
  const router = useRouter();
  const { data: customers = [] } = useGetCustomersQuery();
  const { data: notes = [] } = useGetNotesQuery();
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const customerNotes = useMemo(
    () => notes.filter((note) => note.target === 'Customer'),
    [notes]
  );

  const newsletterCount = customers.filter((customer) => customer.newsletter)
    .length;
  const highAttentionCount = customers.filter(
    (customer) => customer.highPriority
  ).length;

  const filterTokens = useMemo(() => {
    const tokens: { id: string; label: string }[] = [];
    if (highAttentionCount > 0) {
      tokens.push({ id: 'high-priority', label: 'Alta attenzione' });
    }
    if (newsletterCount > 0) {
      tokens.push({ id: 'newsletter', label: 'Iscritti newsletter' });
    }
    tokens.push(
      { id: 'check-in-today', label: 'Check-in oggi' },
      { id: 'check-out-today', label: 'Check-out oggi' },
      { id: 'arrivi-48h', label: 'Arrivi prossime 48h' },
      { id: 'partenze-48h', label: 'Partenze prossime 48h' }
    );

    return tokens;
  }, [highAttentionCount, newsletterCount]);

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Cerca cliente per nome, email o tag..."
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

      <HStack className="flex-col gap-6 lg:flex-row">
        <Box className="flex-1">
          <SectionCard
            title="Clienti"
            subtitle="Ricerca centrale con stato comunicazioni, evento recente e prossime azioni."
            contentClassName="space-y-4"
          >
            <ListFilterBar filters={filterTokens} />
            {customers.map((customer) => (
              <EntityCard
                key={customer.id}
                title={`${customer.firstName} ${customer.lastName}`}
                subtitle={`Ultimo aggiornamento · ${formatDate(customer.lastUpdate)}`}
                status={{
                  label: customer.highPriority ? 'Alta attenzione' : customer.statoComunicazione,
                  tone: customer.highPriority ? 'warning' : 'info',
                }}
                description={
                  customer.highPriority
                    ? customer.priorityReason ??
                      'Cliente contrassegnato come ad alta attenzione.'
                    : undefined
                }
                badges={[
                  {
                    label: `Ultimo evento · ${customer.ultimoEvento}`,
                    tone: 'neutral',
                  },
                  {
                    label: `Prossimo evento · ${customer.prossimoInvio}`,
                    tone: 'info',
                  },
                  {
                    label: customer.newsletter
                      ? 'Newsletter · iscritto'
                      : 'Newsletter · non iscritto',
                    tone: customer.newsletter ? 'success' : 'neutral',
                  },
                  ...customer.tags.slice(0, 2).map((tag) => ({
                    label: `Tag · ${tag}`,
                    tone: 'neutral' as const,
                  })),
                ]}
                meta={[
                  {
                    label: 'Priorità da',
                    value: customer.prioritySince
                      ? new Date(customer.prioritySince).toLocaleTimeString('it-IT', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '—',
                  },
                  {
                    label: 'Totale soggiorni',
                    value: `${customer.staysCount}`,
                  },
                ]}
                onPress={() => router.push(`/customers/${customer.id}`)}
              />
            ))}
          </SectionCard>
        </Box>

        <VStack space="lg" className="w-full max-w-[300px]">
          <StatCard
            label="Clienti ad alta attenzione"
            value={`${highAttentionCount}`}
            helper="AI fallback o richieste sensibili in corso"
            icon={<UsersRound size={26} color={PRIMARY_ICON_COLOR} strokeWidth={2} />}
            tone={highAttentionCount > 0 ? 'warning' : 'default'}
          />
          <StatCard
            label="Iscritti newsletter"
            value={`${newsletterCount}`}
            helper={`Su ${customers.length} clienti gestiti`}
            icon={<MailCheck size={26} color={PRIMARY_ICON_COLOR} strokeWidth={2} />}
            tone="positive"
          />
          <NotesBoard
            notes={customerNotes}
            title="Note cliente"
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
            resolveContext={(note) => ({
              label:
                note.target === 'Customer'
                  ? 'Cliente'
                  : note.target === 'Booking'
                  ? 'Prenotazione collegata'
                  : 'Turno',
              tone:
                note.status === 'Aperto'
                  ? 'warning'
                  : note.status === 'Risolto'
                  ? 'success'
                  : 'neutral',
            })}
          />
        </VStack>
      </HStack>

      <Modal isOpen={isNoteModalOpen} onClose={() => setNoteModalOpen(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
              Nuova nota cliente
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
                placeholder="Es. Oggetto smarrito"
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
                  placeholder="Scrivi cosa è successo, a chi assegnare e le azioni da fare."
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

// mock: customersMock, notesMock
// actions: openCustomerDetail(id)
// assumptions: note create modale è dimostrativo in attesa integrazione backend
