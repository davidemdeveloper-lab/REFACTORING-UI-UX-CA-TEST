import { GlassCard } from '@/components/layout/GlassCard';
import { palette } from '@/design/palette';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/layout/UiIcon';

const preferences = ['Late check-out', 'Transfer privato', 'Esperienza SPA', 'Allergie alimentari'];

export default function AddClientPage() {
  return (
    <VStack space="lg">
      <Text className="text-2xl font-semibold" style={{ color: palette.textPrimary }}>
        Aggiungi cliente
      </Text>
      <GlassCard>
        <VStack space="lg">
          <HStack className="flex-col gap-4 lg:flex-row">
            <GlassCard className="flex-1" padding={16}>
              <VStack space="md">
                <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                  Anagrafica ospite
                </Text>
                <HStack className="flex-col gap-3 md:flex-row">
                  <Input placeholder="Nome" className="flex-1 rounded-xl border px-4 py-3" />
                  <Input placeholder="Cognome" className="flex-1 rounded-xl border px-4 py-3" />
                </HStack>
                <HStack className="flex-col gap-3 md:flex-row">
                  <Input placeholder="Email" className="flex-1 rounded-xl border px-4 py-3" />
                  <Input placeholder="Telefono" className="flex-1 rounded-xl border px-4 py-3" />
                </HStack>
                <Input placeholder="Tipologia cliente" className="rounded-xl border px-4 py-3" />
              </VStack>
            </GlassCard>
            <GlassCard className="flex-1" padding={16}>
              <VStack space="md">
                <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                  Dettagli soggiorno
                </Text>
                <HStack className="flex-col gap-3 md:flex-row">
                  <Input placeholder="Data arrivo" className="flex-1 rounded-xl border px-4 py-3" />
                  <Input placeholder="Data partenza" className="flex-1 rounded-xl border px-4 py-3" />
                </HStack>
                <Input placeholder="Tipologia camera" className="rounded-xl border px-4 py-3" />
                <Textarea
                  placeholder="Note personalizzate, esigenze particolari, celebrazioni..."
                  className="rounded-xl border px-4 py-3"
                  rows={3}
                />
              </VStack>
            </GlassCard>
          </HStack>
          <GlassCard padding={16}>
            <VStack space="md">
              <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                Preferenze e automazioni
              </Text>
              <HStack className="flex-wrap gap-3">
                {preferences.map((item) => (
                  <Button
                    key={item}
                    style={{
                      borderRadius: 14,
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      background: 'transparent',
                      borderColor: palette.borderSoft,
                    }}
                  >
                    <Text className="text-xs" style={{ color: palette.textSecondary }}>
                      {item}
                    </Text>
                  </Button>
                ))}
              </HStack>
              <Box className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: 'Pre-check-in automatizzato',
                    description: 'Richiesta documenti e firma digitale 72h prima.',
                    icon: 'FileSignature',
                  },
                  {
                    title: 'Upsell dinamico',
                    description: 'Suggerisci servizi in base al profilo e disponibilità.',
                    icon: 'Sparkles',
                  },
                  {
                    title: 'Feedback & recensioni',
                    description: 'Attiva follow-up e condivisione sui partner.',
                    icon: 'MessageSquareHeart',
                  },
                ].map((automation) => (
                  <GlassCard key={automation.title} padding={16} gap={6} borderColor={palette.borderSoft}>
                    <HStack space="md" className="items-start">
                      <Icon name={automation.icon as any} size={20} color={palette.accentPrimary} />
                      <VStack space="xs">
                        <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                          {automation.title}
                        </Text>
                        <Text className="text-xs" style={{ color: palette.textSecondary }}>
                          {automation.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </GlassCard>
                ))}
              </Box>
            </VStack>
          </GlassCard>
          <HStack className="justify-end gap-3">
            <Button
              style={{
                borderRadius: 16,
                paddingHorizontal: 20,
                paddingVertical: 12,
                background: 'transparent',
                borderColor: palette.borderSoft,
              }}
            >
              <Text className="text-sm" style={{ color: palette.textSecondary }}>
                Salva bozza
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
                <Icon name="Send" size={16} color="#041320" />
                <Text className="text-sm font-semibold" style={{ color: '#041320' }}>
                  Conferma e avvia automazioni
                </Text>
              </HStack>
            </Button>
          </HStack>
        </VStack>
      </GlassCard>
    </VStack>
  );
}
