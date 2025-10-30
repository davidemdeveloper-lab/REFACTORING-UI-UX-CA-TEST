'use client';

import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import Link from 'next/link';
import { palette } from '@/theme/palette';
import { MetalGlassCard } from '@/components/design-system/MetalGlassCard';
import { StatusPill } from '@/components/design-system/StatusPill';
import { Sparkles, ArrowRight, Hotel, Users, MessageSquare } from 'lucide-react-native';

const featureList = [
  {
    icon: Hotel,
    title: 'Automazione soggiorni end-to-end',
    description:
      'Gestisci check-in digitale, upsell personalizzati e notifiche IoT da un’unica control room intuitiva.',
  },
  {
    icon: Users,
    title: 'Profilazione intelligente degli ospiti',
    description:
      'Centralizza preferenze, storico comunicazioni e azioni consigliate dall’AI per creare esperienze memorabili.',
  },
  {
    icon: MessageSquare,
    title: 'Conversazioni sincronizzate',
    description:
      'Chat master-detail con AI co-pilot, alert automatici e template dinamici per ogni fase del guest journey.',
  },
];

export default function Home() {
  return (
    <Box
      style={{
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 48,
        paddingBottom: 48,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
      } as any}
    >
      <HStack className="justify-between items-center flex-wrap" style={{ gap: 32 } as any}>
        <VStack space="lg" style={{ maxWidth: 520 } as any}>
          <StatusPill label="Customer Automator" tone="accent" />
          <VStack space="md">
            <HStack space="sm" className="items-center">
              <Sparkles size={18} color={palette.accentSecondary} />
              <Text style={{ fontSize: 15, color: palette.textSecondary } as any}>
                Nuovo design metal-glassy pensato per hospitality visionaria
              </Text>
            </HStack>
            <Text style={{ fontSize: 48, fontWeight: '700', lineHeight: '56px', color: palette.textPrimary } as any}>
              L'hub che connette albergatori e ospiti con automazioni empatiche
            </Text>
            <Text style={{ fontSize: 18, color: palette.textSecondary } as any}>
              Customer Automator orchestra comunicazioni, template dinamici, IoT di camera e servizi esterni.
              Un'unica interfaccia Next.js + GlueStack ottimizzata per strutture moderne.
            </Text>
          </VStack>
          <HStack space="md" className="items-center">
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <Button size="lg" variant="solid" style={{ backgroundColor: palette.accentPrimary, borderRadius: 16 } as any}>
                <ButtonText style={{ color: '#020617' } as any}>Accedi all'area di gestione</ButtonText>
              </Button>
            </Link>
            <Link href="/templates" style={{ textDecoration: 'none' }}>
              <Button size="lg" variant="outline" style={{ borderColor: 'rgba(148,163,184,0.4)', borderRadius: 16 } as any}>
                <ButtonText style={{ color: palette.textSecondary } as any}>Esplora template</ButtonText>
              </Button>
            </Link>
          </HStack>
          <HStack space="md" className="items-center">
            <StatusPill label="Suite pronte" tone="success" />
            <Text style={{ fontSize: 14, color: palette.textMuted } as any}>
              Dashboard, chat AI, editor template e gestione prenotazioni con mock data realistiche.
            </Text>
          </HStack>
        </VStack>
        <Box style={{ flex: 1, minWidth: 320 } as any}>
          <MetalGlassCard>
            <VStack space="lg">
              <Text style={{ fontSize: 18, fontWeight: '700', color: palette.textPrimary } as any}>
                Esperienza unificata
              </Text>
              <VStack space="md">
                {featureList.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <HStack key={feature.title} className="items-start" style={{ gap: 16 } as any}>
                      <Box
                        className="items-center justify-center"
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 14,
                          backgroundColor: 'rgba(56,189,248,0.16)',
                          borderWidth: 1,
                          borderStyle: 'solid',
                          borderColor: 'rgba(56,189,248,0.3)',
                        } as any}
                      >
                        <Icon size={20} color={palette.accentPrimary} />
                      </Box>
                      <VStack space="xs">
                        <Text style={{ fontSize: 16, fontWeight: '600', color: palette.textPrimary } as any}>
                          {feature.title}
                        </Text>
                        <Text style={{ fontSize: 13, color: palette.textSecondary } as any}>
                          {feature.description}
                        </Text>
                      </VStack>
                    </HStack>
                  );
                })}
              </VStack>
              <Link href="/chat" style={{ textDecoration: 'none', alignSelf: 'flex-end' }}>
                <HStack className="items-center" style={{ gap: 8 } as any}>
                  <Text style={{ fontSize: 14, color: palette.accentPrimary, fontWeight: '600' } as any}>
                    Scopri la nuova chat con AI
                  </Text>
                  <ArrowRight size={16} color={palette.accentPrimary} />
                </HStack>
              </Link>
            </VStack>
          </MetalGlassCard>
        </Box>
      </HStack>

      <MetalGlassCard>
        <HStack className="justify-between items-center flex-wrap" style={{ gap: 24 } as any}>
          <VStack space="xs">
            <Text style={{ fontSize: 14, color: palette.textMuted } as any}>
              Palette ufficiale Customer Automator
            </Text>
            <Text style={{ fontSize: 24, fontWeight: '700', color: palette.textPrimary } as any}>
              Stile metal-glassy con profondità morbide
            </Text>
          </VStack>
          <HStack className="flex-wrap" style={{ gap: 14 } as any}>
            {Object.entries(palette).map(([token, value]) => (
              <Box
                key={token}
                className="overflow-hidden"
                style={{
                  width: 120,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'rgba(148,163,184,0.2)',
                } as any}
              >
                <Box style={{ height: 56, backgroundColor: value as string } as any} />
                <Box
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 8,
                    paddingBottom: 8,
                    backgroundColor: 'rgba(15,23,42,0.5)',
                  } as any}
                >
                  <Text style={{ fontSize: 12, color: palette.textSecondary } as any}>
                    {token}
                  </Text>
                </Box>
              </Box>
            ))}
          </HStack>
        </HStack>
      </MetalGlassCard>
    </Box>
  );
}

// Validazione: Landing page conforme al concept metal-glassy, CTA evidenti e focus su hospitality.
