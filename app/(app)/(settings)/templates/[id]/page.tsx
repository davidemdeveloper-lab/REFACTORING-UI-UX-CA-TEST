// Scopo: offrire l'editor drag & drop dei template email con anteprima e proprietà.
'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { PageToolbar } from '@/components/shared/page-toolbar';
import { useGetTemplatesQuery } from '@/services/mockApi';

const blockLibrary = [
  { id: 'variable', title: 'Variabile', description: 'Inserisci variabili Jinja già mappate.' },
  { id: 'loop', title: 'Loop', description: 'Ripeti blocchi per camere, servizi o ospiti.' },
  { id: 'condition', title: 'Condizione', description: 'Mostra contenuti in base a tag o preferenze.' },
  { id: 'cta', title: 'Call to action', description: 'Bottoni e link con stile coerente.' },
  { id: 'gallery', title: 'Galleria', description: 'Blocchi immagini per presentare la struttura.' },
];

export default function TemplateEditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const templateId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const { data: templates = [] } = useGetTemplatesQuery();

  const template = useMemo(
    () => templates.find((item) => item.id === templateId),
    [templates, templateId]
  );

  if (!template) {
    return (
      <Box className="rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-8 py-12">
        <Text className="text-center text-sm text-[var(--color-neutral-600)]">
          Template non trovato nei mock disponibili.
        </Text>
      </Box>
    );
  }

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Cerca componenti o blocchi nel template..."
        primaryActionLabel="Salva Template"
        onPrimaryAction={() => router.push('/templates')}
        extraActions={
          <HStack className="items-center gap-3">
            <Button
              size="md"
              variant="outline"
              action="default"
              className="border-[var(--color-border)] bg-[var(--color-surface)] px-5"
            >
              <Text className="text-sm font-semibold text-[var(--color-neutral-600)]">
                Anteprima
              </Text>
            </Button>
            <Button
              size="md"
              variant="outline"
              action="default"
              className="border-[var(--color-border)] bg-[var(--color-surface)] px-5"
            >
              <Text className="text-sm font-semibold text-[var(--color-neutral-600)]">
                Importa HTML
              </Text>
            </Button>
          </HStack>
        }
      />

      <HStack className="flex-row gap-6">
        <Box className="w-[260px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-6 shadow-[var(--shadow-card)]">
          <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
            Blocchi
          </Text>
          <Text className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
            Drag & drop
          </Text>
          <VStack space="md" className="mt-5">
            {blockLibrary.map((block) => (
              <Box
                key={block.id}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4"
              >
                <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                  {block.title}
                </Text>
                <Text className="mt-2 text-xs leading-5 text-[var(--color-neutral-600)]">
                  {block.description}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>

        <Box className="flex-1 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 shadow-[var(--shadow-card)]">
          <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
            {template.name}
          </Text>
          <Text className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
            Anteprima desktop · personalizzabile
          </Text>
          <Box className="mt-6 rounded-3xl border border-[var(--color-border)] bg-white px-8 py-8">
            <VStack space="md">
              <Text className="text-sm font-semibold text-[var(--color-neutral-600)]">
                Ciao {'{{ guest_name }}'},
              </Text>
              <Text className="text-base leading-6 text-[var(--color-neutral-900)]">
                Siamo felici di confermare il tuo soggiorno presso{' '}
                <Text className="font-semibold text-[var(--color-neutral-900)]">
                  Orobie Alps Resort
                </Text>
                . Ecco il riepilogo dei dettagli e alcuni consigli per coccolarti
                fin dal tuo arrivo.
              </Text>
              <Box className="rounded-2xl bg-[var(--color-background)] px-6 py-4">
                <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                  Dettagli soggiorno
                </Text>
                <Text className="mt-2 text-sm text-[var(--color-neutral-600)]">
                  Check-in: {'{{ check_in_date }}'} · Check-out:{' '}
                  {'{{ check_out_date }}'}
                </Text>
                <Text className="mt-1 text-sm text-[var(--color-neutral-600)]">
                  Ospiti: {'{{ guests_count }}'} · Camera:{' '}
                  {'{{ room_type }}'}
                </Text>
              </Box>
              <Box className="rounded-2xl border border-[var(--color-border)] px-6 py-4">
                <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                  Suggerimenti del concierge
                </Text>
                <Text className="mt-2 text-sm text-[var(--color-neutral-600)]">
                  - Accesso Spa incluso dalle 17:00 alle 20:00
                </Text>
                <Text className="text-sm text-[var(--color-neutral-600)]">
                  - Prenota il tuo tavolo al ristorante direttamente dal Guest Portal
                </Text>
              </Box>
              <Button
                size="md"
                action="primary"
                className="self-start rounded-full bg-[var(--color-primary-600)] px-6"
              >
                <Text className="text-sm font-semibold text-white">
                  Apri Guest Portal
                </Text>
              </Button>
            </VStack>
          </Box>
        </Box>

        <Box className="w-[280px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-6 shadow-[var(--shadow-card)]">
          <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
            Proprietà dinamiche
          </Text>
          <Text className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
            Stili e dati
          </Text>
          <VStack space="md" className="mt-5">
            <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4">
              <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                Tipografia
              </Text>
              <Text className="mt-2 text-xs leading-5 text-[var(--color-neutral-600)]">
                Seleziona font, dimensioni e pesi coerenti con il brand.
              </Text>
            </Box>
            <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4">
              <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                Colori & layout
              </Text>
              <Text className="mt-2 text-xs leading-5 text-[var(--color-neutral-600)]">
                Mantieni il tema caldo hotel. Pulsanti e titoli richiamano il
                marrone primario.
              </Text>
            </Box>
            <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4">
              <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                Variabili collegate
              </Text>
              <Text className="mt-2 text-xs leading-5 text-[var(--color-neutral-600)]">
                check_in_date, guests_count, room_type, concierge_suggestion.
              </Text>
            </Box>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}

// mock: templatesMock
// actions: saveTemplateDraft(id), openTemplatePreview(id)
// assumptions: blocchi e proprietà sono mock statici per concept UI

