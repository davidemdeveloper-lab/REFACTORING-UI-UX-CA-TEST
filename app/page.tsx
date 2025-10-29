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
    <Box px={32} py={48} minH="100vh" display="flex" flexDirection="column" gap={48}>
      <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={32}>
        <VStack space="lg" maxW={520}>
          <StatusPill label="Customer Automator" tone="accent" />
          <VStack space="md">
            <HStack space="sm" alignItems="center">
              <Sparkles size={18} color={palette.accentSecondary} />
              <Text fontSize={15} color={palette.textSecondary}>
                Nuovo design metal-glassy pensato per hospitality visionaria
              </Text>
            </HStack>
            <Text fontSize={48} fontWeight="700" lineHeight={56} color={palette.textPrimary}>
              L’hub che connette albergatori e ospiti con automazioni empatiche
            </Text>
            <Text fontSize={18} color={palette.textSecondary}>
              Customer Automator orchestra comunicazioni, template dinamici, IoT di camera e servizi esterni.
              Un’unica interfaccia Next.js + GlueStack ottimizzata per strutture moderne.
            </Text>
          </VStack>
          <HStack space="md" alignItems="center">
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <Button size="lg" variant="solid" bg={palette.accentPrimary} borderRadius={16}>
                <ButtonText color="#020617">Accedi all’area di gestione</ButtonText>
              </Button>
            </Link>
            <Link href="/templates" style={{ textDecoration: 'none' }}>
              <Button size="lg" variant="outline" borderColor="rgba(148,163,184,0.4)" borderRadius={16}>
                <ButtonText color={palette.textSecondary}>Esplora template</ButtonText>
              </Button>
            </Link>
          </HStack>
          <HStack space="md" alignItems="center">
            <StatusPill label="Suite pronte" tone="success" />
            <Text fontSize={14} color={palette.textMuted}>
              Dashboard, chat AI, editor template e gestione prenotazioni con mock data realistiche.
            </Text>
          </HStack>
        </VStack>
        <Box flex={1} minW={320}>
          <MetalGlassCard>
            <VStack space="lg">
              <Text fontSize={18} fontWeight="700" color={palette.textPrimary}>
                Esperienza unificata
              </Text>
              <VStack space="md">
                {featureList.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <HStack key={feature.title} gap={16} alignItems="flex-start">
                      <Box
                        w={44}
                        h={44}
                        borderRadius={14}
                        bg="rgba(56,189,248,0.16)"
                        borderWidth={1}
                        borderColor="rgba(56,189,248,0.3)"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon size={20} color={palette.accentPrimary} />
                      </Box>
                      <VStack space="xs">
                        <Text fontSize={16} fontWeight="600" color={palette.textPrimary}>
                          {feature.title}
                        </Text>
                        <Text fontSize={13} color={palette.textSecondary}>
                          {feature.description}
                        </Text>
                      </VStack>
                    </HStack>
                  );
                })}
              </VStack>
              <Link href="/chat" style={{ textDecoration: 'none', alignSelf: 'flex-end' }}>
                <HStack alignItems="center" gap={8}>
                  <Text fontSize={14} color={palette.accentPrimary} fontWeight="600">
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
        <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={24}>
          <VStack space="xs">
            <Text fontSize={14} color={palette.textMuted}>
              Palette ufficiale Customer Automator
            </Text>
            <Text fontSize={24} fontWeight="700" color={palette.textPrimary}>
              Stile metal-glassy con profondità morbide
            </Text>
          </VStack>
          <HStack gap={14} flexWrap="wrap">
            {Object.entries(palette).map(([token, value]) => (
              <Box
                key={token}
                w={120}
                borderRadius={16}
                overflow="hidden"
                borderWidth={1}
                borderColor="rgba(148,163,184,0.2)"
              >
                <Box h={56} bg={value as string} />
                <Box px={10} py={8} bg="rgba(15,23,42,0.5)">
                  <Text fontSize={12} color={palette.textSecondary}>
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
