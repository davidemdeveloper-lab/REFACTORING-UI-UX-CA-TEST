// Scopo: gestire i template email e raggiungere velocemente l'editor.
'use client';

import { useRouter } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { PageToolbar } from '@/components/shared/page-toolbar';
import { SectionCard } from '@/components/shared/section-card';
import { EntityCard } from '@/components/shared/entity-card';
import { StatCard } from '@/components/shared/stat-card';
import { useGetTemplatesQuery } from '@/services/mockApi';
import { FileText, PenSquare } from 'lucide-react-native';
import { PRIMARY_ICON_COLOR } from '@/constants/colors';

export default function TemplatesPage() {
  const router = useRouter();
  const { data: templates = [] } = useGetTemplatesQuery();

  const activeCount = templates.filter((template) => template.status === 'Attivo')
    .length;
  const draftsCount = templates.filter((template) => template.status === 'Bozza')
    .length;

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Cerca template per nome o categoria..."
        primaryActionLabel="Nuovo template"
        onPrimaryAction={() => router.push('/templates')}
      />

      <HStack className="flex-col gap-6 lg:flex-row">
        <Box className="flex-1">
          <SectionCard
            title="Template email"
            subtitle="Catalogo centralizzato dei messaggi automatici e manuali."
            contentClassName="space-y-4"
          >
            {templates.map((template) => (
              <EntityCard
                key={template.id}
                title={template.name}
                subtitle={template.description}
                status={{
                  label: template.status,
                  tone: template.status === 'Attivo' ? 'success' : 'info',
                }}
                badges={[
                  { label: `Categoria · ${template.category}`, tone: 'neutral' },
                ]}
                meta={[
                  {
                    label: 'Ultimo aggiornamento',
                    value: new Date(template.updatedAt).toLocaleString('it-IT', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                  },
                  {
                    label: 'Autore',
                    value: template.lastEditedBy,
                  },
                ]}
                onPress={() => router.push(`/templates/${template.id}`)}
              />
            ))}
          </SectionCard>
        </Box>
        <VStack space="lg" className="w-full max-w-[300px]">
          <StatCard
            label="Template attivi"
            value={`${activeCount}`}
            helper="Pronti per automazioni e invii manuali"
            icon={<FileText size={26} color={PRIMARY_ICON_COLOR} strokeWidth={2} />}
            tone="positive"
          />
          <StatCard
            label="Bozze da completare"
            value={`${draftsCount}`}
            helper="Template da validare prima della pubblicazione"
            icon={<PenSquare size={26} color={PRIMARY_ICON_COLOR} strokeWidth={2} />}
            tone={draftsCount > 0 ? 'warning' : 'default'}
          />
          <Box className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-5">
            <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
              Libreria microflussi
            </Text>
            <Text className="mt-2 text-sm leading-6 text-[var(--color-neutral-600)]">
              Prossimo step: collega template a microflussi come late checkout,
              sposta pulizia o reminder pagamento.
            </Text>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
}

// mock: templatesMock
// actions: openTemplateEditor(id)
// assumptions: microflussi futuro indicato come promemoria UI
