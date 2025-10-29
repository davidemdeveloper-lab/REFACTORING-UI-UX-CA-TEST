'use client';

import { notFound } from 'next/navigation';
import { templates } from '@/data/mockData';
import { palette } from '@/theme/palette';
import { SectionHeading } from '@/components/design-system/SectionHeading';
import { MetalGlassCard } from '@/components/design-system/MetalGlassCard';
import { StatusPill } from '@/components/design-system/StatusPill';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { ScrollView } from '@/components/ui/scroll-view';
import { Sparkles, Layers, Save } from 'lucide-react-native';

interface TemplateEditorPageProps {
  params: { id: string };
}

export default function TemplateEditorPage({ params }: TemplateEditorPageProps) {
  const template = templates.find((item) => item.id === params.id);
  if (!template) {
    notFound();
  }

  return (
    <VStack space="xl">
      <SectionHeading
        title={template.name}
        subtitle={template.description}
        icon={<Layers size={20} color={palette.accentPrimary} />}
        action={<StatusPill label={`Categoria: ${template.category}`} tone="accent" />}
      />

      <HStack gap={24} flexWrap="wrap">
        <MetalGlassCard padding={24}>
          <VStack space="md" w={380}>
            <Text fontSize={16} fontWeight="600" color={palette.textPrimary}>
              Blocchi dinamici
            </Text>
            <ScrollView h={360} showsVerticalScrollIndicator={false}>
              <VStack space="sm">
                <BlockCard title="Variabili" description="Nome cliente, date soggiorno, camera, link hub ospite" />
                <BlockCard title="Loop servizi" description="Itera automaticamente sulle experience acquistate" />
                <BlockCard title="Condizioni" description="Mostra messaggi solo se AI rileva interesse" />
                <BlockCard title="Suggerimenti AI" description="Paragrafi generati per upsell SPA e ristorante" />
                <BlockCard title="Link recensioni" description="Booking, TripAdvisor, hub recensioni proprietario" />
              </VStack>
            </ScrollView>
          </VStack>
        </MetalGlassCard>

        <MetalGlassCard padding={24}>
          <VStack space="md" w={520}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize={16} fontWeight="600" color={palette.textPrimary}>
                Area di lavoro template
              </Text>
              <Button variant="outline" borderColor="rgba(56,189,248,0.3)" borderRadius={14}>
                <ButtonText color={palette.accentPrimary}>Anteprima ospite</ButtonText>
              </Button>
            </HStack>
            <Textarea bg="rgba(8,15,28,0.65)" borderColor="rgba(56,189,248,0.25)" borderRadius={18} h={360}>
              <TextareaInput
                placeholder={`Gentile {{guest_name}},\n\nsiamo felici di confermare il tuo soggiorno ${template.name}.\n\n`}
              />
            </Textarea>
            <Text fontSize={12} color={palette.textMuted}>
              Ultimo salvataggio automatico 2 minuti fa · Allineato con AI Copilot
            </Text>
          </VStack>
        </MetalGlassCard>

        <MetalGlassCard padding={24}>
          <VStack space="md" w={260}>
            <Text fontSize={16} fontWeight="600" color={palette.textPrimary}>
              Personalizzazione AI
            </Text>
            <VStack space="sm">
              <StatusPill label="Tone of voice: Empatico" tone="accent" />
              <StatusPill label="Lingua: Italiano" tone="accent" />
              <StatusPill label="CTA: TripAdvisor + SPA" tone="success" />
            </VStack>
            <Text fontSize={12} color={palette.textSecondary}>
              Suggerimenti generati in base allo storico preferenze ospite e occupancy camere.
            </Text>
            <Button variant="solid" bg={palette.accentPrimary} borderRadius={14}>
              <ButtonText color="#020617">Richiedi nuova bozza</ButtonText>
            </Button>
          </VStack>
        </MetalGlassCard>
      </HStack>

      <HStack justifyContent="flex-end" gap={12}>
        <Button variant="outline" borderColor="rgba(148,163,184,0.3)" borderRadius={14}>
          <ButtonText color={palette.textSecondary}>Annulla modifiche</ButtonText>
        </Button>
        <Button variant="solid" bg={palette.accentPrimary} borderRadius={14}>
          <HStack alignItems="center" space="xs">
            <Save size={16} color="#020617" />
            <ButtonText color="#020617">Salva template</ButtonText>
          </HStack>
        </Button>
      </HStack>
    </VStack>
  );
}

interface BlockCardProps {
  title: string;
  description: string;
}

function BlockCard({ title, description }: BlockCardProps) {
  return (
    <Box
      borderRadius={16}
      px={16}
      py={12}
      bg="rgba(15,23,42,0.5)"
      borderWidth={1}
      borderColor="rgba(56,189,248,0.2)"
    >
      <VStack space="xs">
        <HStack space="xs" alignItems="center">
          <Sparkles size={16} color={palette.accentPrimary} />
          <Text fontSize={14} fontWeight="600" color={palette.textPrimary}>
            {title}
          </Text>
        </HStack>
        <Text fontSize={12} color={palette.textSecondary}>
          {description}
        </Text>
      </VStack>
    </Box>
  );
}

// Validazione: editor template con blocchi modulari, area di lavoro e controlli AI chiari.
