import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { gradients, palette } from '@/design/palette';
import { GlassCard } from '@/components/layout/GlassCard';
import { Icon } from '@/components/layout/UiIcon';

const features = [
  {
    icon: 'CircuitBoard',
    title: 'Automazioni intelligenti',
    description:
      'Timeline cliente, pre-check-in, follow-up e upsell alimentati da AI con notifiche mirate e sempre coerenti.',
  },
  {
    icon: 'Sparkles',
    title: 'Esperienza ospite premium',
    description:
      'Template email metal-glassy ottimizzati per hotel boutique e catene, con personalizzazioni dinamiche.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Controllo totale',
    description:
      'Monitoraggio IoT, servizi partner, analytics e chat integrata per decidere in un’unica piattaforma.',
  },
];

const heroBullets = [
  'Dashboard metal-glassy multi-struttura',
  'Editor template con blocchi dinamici',
  'Chat AI e notifiche contestuali',
  'Controllo stanza e servizi esterni',
];

export default function Home() {
  return (
    <Box
      style={{
        minHeight: '100vh',
        background: gradients.hero,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          background:
            'radial-gradient(circle at 15% 20%, rgba(96, 214, 255, 0.35), transparent 45%), radial-gradient(circle at 80% 10%, rgba(151, 255, 221, 0.25), transparent 55%)',
        }}
      />
      <Box className="relative mx-auto flex max-w-6xl flex-col gap-24 px-6 py-24">
        <HStack className="flex-col gap-12 lg:flex-row lg:items-center">
          <VStack space="lg" className="flex-1">
            <Box
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 999,
                background: 'rgba(96, 214, 255, 0.12)',
                border: `1px solid ${palette.borderHighlight}`,
              }}
            >
              <Icon name="Bot" size={18} color={palette.accentPrimary} />
              <Text className="text-xs uppercase tracking-wider" style={{ color: palette.accentPrimary }}>
                Customer Automator v3
              </Text>
            </Box>
            <Text className="text-4xl font-semibold leading-tight md:text-6xl" style={{ color: palette.textPrimary }}>
              Automazione elegante per hotel che comunicano con stile.
            </Text>
            <Text className="text-base md:text-lg" style={{ color: palette.textSecondary }}>
              Progetta esperienze memorabili per i tuoi ospiti: dalla prima email al controllo IoT della stanza,
              tutto avviene in un hub metal-glassy pronto per essere connesso alle tue API.
            </Text>
            <VStack space="sm">
              {heroBullets.map((bullet) => (
                <HStack key={bullet} space="md" className="items-center">
                  <Icon name="CheckCircle2" size={18} color={palette.accentSecondary} />
                  <Text className="text-sm" style={{ color: palette.textSecondary }}>
                    {bullet}
                  </Text>
                </HStack>
              ))}
            </VStack>
            <HStack space="md" className="pt-4">
              <Link href="/dashboard">
                <Button
                  style={{
                    paddingHorizontal: 26,
                    paddingVertical: 14,
                    borderRadius: 18,
                    background: gradients.accent,
                    borderColor: palette.borderHighlight,
                  }}
                >
                  <Text className="text-sm font-semibold" style={{ color: '#051726' }}>
                    Accedi all’area di gestione
                  </Text>
                </Button>
              </Link>
              <Link href="#panoramica">
                <Button
                  style={{
                    paddingHorizontal: 22,
                    paddingVertical: 14,
                    borderRadius: 18,
                    backgroundColor: 'transparent',
                    borderColor: palette.borderSoft,
                  }}
                >
                  <HStack space="sm" className="items-center">
                    <Icon name="Play" size={16} color={palette.textSecondary} />
                    <Text className="text-sm" style={{ color: palette.textSecondary }}>
                      Guarda la panoramica
                    </Text>
                  </HStack>
                </Button>
              </Link>
            </HStack>
          </VStack>
          <GlassCard>
            <VStack space="lg">
              <Text className="text-lg font-semibold" style={{ color: palette.textPrimary }}>
                Vista rapida dei vantaggi
              </Text>
              <VStack space="md">
                {features.map((feature) => (
                  <GlassCard key={feature.title} padding={16} gap={8} borderColor={palette.borderSoft}>
                    <HStack space="md" className="items-start">
                      <Icon name={feature.icon as any} size={22} color={palette.accentPrimary} />
                      <VStack space="xs">
                        <Text className="text-base font-medium" style={{ color: palette.textPrimary }}>
                          {feature.title}
                        </Text>
                        <Text className="text-sm" style={{ color: palette.textSecondary }}>
                          {feature.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </GlassCard>
                ))}
              </VStack>
            </VStack>
          </GlassCard>
        </HStack>
        <Box id="panoramica">
          <Text className="text-3xl font-semibold" style={{ color: palette.textPrimary }}>
            Dall’accoglienza al follow-up, ogni pagina è rifinita.
          </Text>
          <Text className="mt-2 max-w-3xl text-base" style={{ color: palette.textSecondary }}>
            Dashboard dinamica, gestione clienti e prenotazioni, editor template con blocchi smart e una chat AI
            master-detail. Tutto pronto per mock data e collegamento successivo ai servizi della tua struttura.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
