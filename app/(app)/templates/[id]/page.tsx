import { notFound } from 'next/navigation';
import { mockTemplates } from '@/components/data/mockData';
import { GlassCard } from '@/components/layout/GlassCard';
import { palette } from '@/design/palette';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/layout/UiIcon';
import { Box } from '@/components/ui/box';

const blocks = [
  { label: 'Variabile', description: 'Campi dinamici per nome ospite, date, servizi.' },
  { label: 'Loop', description: 'Lista servizi o upsell su misura.' },
  { label: 'Condizione', description: 'Mostra contenuti in base allo stato cliente.' },
  { label: 'CTA', description: 'Pulsanti con collegamento a servizi esterni.' },
];

const personalizations = [
  { label: 'Stile', value: 'Metal-glassy · Font Geist · Accent blu' },
  { label: 'Automazione', value: 'Invio 3gg prima dell’arrivo, se documento mancante' },
  { label: 'Partner', value: 'Link dinamici TripAdvisor & MADEEP SPA' },
];

export default function TemplateEditorPage({ params }: { params: { id: string } }) {
  const template = mockTemplates.find((item) => item.id === params.id);
  if (!template) return notFound();

  return (
    <VStack space="lg">
      <HStack className="items-center justify-between">
        <VStack>
          <Text className="text-2xl font-semibold" style={{ color: palette.textPrimary }}>
            Editor template · {template.name}
          </Text>
          <Text className="text-sm" style={{ color: palette.textSecondary }}>
            Mantieni le variabili allineate con le automazioni attive e valida l’anteprima in tempo reale.
          </Text>
        </VStack>
        <HStack className="gap-3">
          <Button
            style={{
              borderRadius: 14,
              paddingHorizontal: 16,
              paddingVertical: 10,
              background: 'transparent',
              borderColor: palette.borderSoft,
            }}
          >
            <Text className="text-xs" style={{ color: palette.textSecondary }}>
              Esporta HTML
            </Text>
          </Button>
          <Button
            style={{
              borderRadius: 16,
              paddingHorizontal: 24,
              paddingVertical: 12,
              background: 'linear-gradient(135deg, rgba(96,214,255,0.6), rgba(151,255,221,0.65))',
              borderColor: palette.borderHighlight,
            }}
          >
            <HStack space="sm" className="items-center">
              <Icon name="Save" size={16} color="#041320" />
              <Text className="text-xs font-semibold" style={{ color: '#041320' }}>
                Salva template
              </Text>
            </HStack>
          </Button>
        </HStack>
      </HStack>
      <HStack className="flex-col gap-6 xl:flex-row">
        <GlassCard className="xl:w-64">
          <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
            Blocchi disponibili
          </Text>
          <VStack space="md" className="pt-3">
            {blocks.map((block) => (
              <GlassCard key={block.label} padding={14} gap={6} borderColor={palette.borderSoft}>
                <Text className="text-sm" style={{ color: palette.textPrimary }}>
                  {block.label}
                </Text>
                <Text className="text-xs" style={{ color: palette.textSecondary }}>
                  {block.description}
                </Text>
              </GlassCard>
            ))}
          </VStack>
        </GlassCard>
        <GlassCard className="flex-1">
          <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
            Anteprima email
          </Text>
          <Box
            className="mt-4 rounded-3xl p-8"
            style={{ background: 'rgba(6, 14, 25, 0.65)', border: `1px solid ${palette.glassStroke}` }}
          >
            <VStack space="md">
              <Text className="text-xl font-semibold" style={{ color: palette.textPrimary }}>
                Gentile {`{ospite.nome}`},
              </Text>
              <Text className="text-sm" style={{ color: palette.textSecondary }}>
                La aspettiamo al {`{struttura.nome}`} dal {`{prenotazione.arrivo}`} al {`{prenotazione.partenza}`}.
                Completi il pre-check-in per personalizzare il soggiorno e ricevere suggerimenti esclusivi.
              </Text>
              <GlassCard padding={18} gap={8} borderColor={palette.borderSoft}>
                <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                  Esperienze consigliate
                </Text>
                <Text className="text-xs" style={{ color: palette.textSecondary }}>
                  {`{if spa.isActive}`} • Accesso SPA MADEEP incluso · {`{endif}`} {`{if tripAdvisor.newReviews}`} • Nuove
                  recensioni in arrivo · {`{endif}`}
                </Text>
                <Button
                  style={{
                    borderRadius: 14,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    background: palette.accentPrimary,
                    borderColor: palette.borderHighlight,
                  }}
                >
                  <Text className="text-xs font-semibold" style={{ color: '#041320' }}>
                    Completa pre-check-in
                  </Text>
                </Button>
              </GlassCard>
              <Text className="text-xs" style={{ color: palette.textMuted }}>
                Questo template invia notifiche automatiche se il pagamento risulta incompleto e propone upsell in base
                alla camera selezionata.
              </Text>
            </VStack>
          </Box>
        </GlassCard>
        <GlassCard className="xl:w-72">
          <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
            Personalizzazione
          </Text>
          <VStack space="md" className="pt-3">
            {personalizations.map((item) => (
              <GlassCard key={item.label} padding={14} gap={6} borderColor={palette.borderSoft}>
                <Text className="text-xs uppercase" style={{ color: palette.textMuted }}>
                  {item.label}
                </Text>
                <Text className="text-sm" style={{ color: palette.textSecondary }}>
                  {item.value}
                </Text>
              </GlassCard>
            ))}
          </VStack>
          <GlassCard padding={16} gap={8} borderColor={palette.borderSoft} style={{ marginTop: 16 }}>
            <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
              Anteprima mobile
            </Text>
            <Box
              className="h-64 rounded-3xl"
              style={{
                background: 'rgba(5, 17, 30, 0.6)',
                border: `1px solid ${palette.glassStroke}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: palette.textSecondary,
              }}
            >
              <Text className="text-xs" style={{ color: palette.textSecondary }}>
                Mock preview 360×780
              </Text>
            </Box>
          </GlassCard>
        </GlassCard>
      </HStack>
    </VStack>
  );
}
