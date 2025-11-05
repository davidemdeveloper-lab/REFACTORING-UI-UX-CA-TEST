'use client';

import { useRouter } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import {
  Hotel,
  MessageSquare,
  Calendar,
  ArrowRight,
  Users,
  Bell
} from 'lucide-react-native';
import { PRIMARY_ICON_COLOR } from '@/constants/colors';

const features = [
  {
    icon: Users,
    title: 'Gestione Clienti Intelligente',
    description:
      'Profili completi con storico comunicazioni, preferenze e priorità automatiche guidate da AI.',
  },
  {
    icon: MessageSquare,
    title: 'Chat Unificata Multicanale',
    description:
      'Tutte le conversazioni (Email, WhatsApp, Booking) in un\'unica interfaccia con suggerimenti AI.',
  },
  {
    icon: Calendar,
    title: 'Automazione Soggiorni',
    description:
      'Template dinamici, comunicazioni pre/post soggiorno e notifiche IoT automatizzate.',
  },
  {
    icon: Bell,
    title: 'Alert & Priorità',
    description:
      'Notifiche intelligenti per clienti prioritari, fallback AI e situazioni che richiedono attenzione.',
  },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <Box className="min-h-screen bg-[var(--color-background)] px-6 py-12 md:px-12 md:py-16">
      <VStack space="2xl" className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <VStack space="xl" className="items-center text-center">
          <VStack space="md" className="max-w-3xl">
            <HStack className="items-center justify-center gap-2">
              <Hotel size={24} color={PRIMARY_ICON_COLOR} strokeWidth={2} />
              <Text className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-primary-600)]">
                Customer Automator
              </Text>
            </HStack>

            <Text className="text-4xl font-bold leading-tight text-[var(--color-neutral-900)] md:text-5xl">
              L'hub intelligente per l'hospitality moderna
            </Text>

            <Text className="text-lg leading-relaxed text-[var(--color-neutral-600)]">
              Gestisci comunicazioni, automazioni e servizi da un'unica piattaforma.
              Orchestrazione multicanale con assistenza AI per offrire esperienze memorabili ai tuoi ospiti.
            </Text>
          </VStack>

          <Button
            size="lg"
            onPress={() => router.push('/dashboard')}
            className="rounded-2xl bg-[var(--color-primary-600)] px-8 py-4"
          >
            <HStack className="items-center gap-2">
              <Text className="text-base font-semibold text-white">
                Accedi alla Dashboard
              </Text>
              <ArrowRight size={18} color="#ffffff" strokeWidth={2} />
            </HStack>
          </Button>

          <Box className="rounded-2xl border border-[rgba(196,123,44,0.25)] bg-[rgba(196,123,44,0.08)] px-4 py-2">
            <Text className="text-sm text-[var(--color-primary-600)]">
              💡 Prototipo funzionale con dati demo per raccogliere feedback
            </Text>
          </Box>
        </VStack>

        {/* Features Grid */}
        <VStack space="lg">
          <Text className="text-center text-2xl font-bold text-[var(--color-neutral-900)]">
            Funzionalità Principali
          </Text>

          <Box className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Box
                  key={feature.title}
                  className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]"
                >
                  <VStack space="md">
                    <Box className="h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(196,123,44,0.25)] bg-[rgba(196,123,44,0.08)]">
                      <Icon size={24} color={PRIMARY_ICON_COLOR} strokeWidth={2} />
                    </Box>

                    <VStack space="xs">
                      <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
                        {feature.title}
                      </Text>
                      <Text className="text-sm leading-6 text-[var(--color-neutral-600)]">
                        {feature.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              );
            })}
          </Box>
        </VStack>

        {/* CTA Section */}
        <Box className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-12 text-center shadow-[var(--shadow-card)]">
          <VStack space="lg" className="items-center">
            <VStack space="md" className="max-w-2xl">
              <Text className="text-3xl font-bold text-[var(--color-neutral-900)]">
                Pronto per iniziare?
              </Text>
              <Text className="text-lg text-[var(--color-neutral-600)]">
                Esplora il prototipo completo con dashboard, gestione clienti,
                chat multicanale e automazioni intelligenti.
              </Text>
            </VStack>

            <Button
              size="lg"
              onPress={() => router.push('/dashboard')}
              className="rounded-2xl bg-[var(--color-primary-600)] px-10 py-4"
            >
              <HStack className="items-center gap-2">
                <Text className="text-base font-semibold text-white">
                  Accedi Ora
                </Text>
                <ArrowRight size={20} color="#ffffff" strokeWidth={2} />
              </HStack>
            </Button>
          </VStack>
        </Box>

        {/* Footer */}
        <Text className="text-center text-sm text-[var(--color-neutral-500)]">
          Customer Automator © 2025 - Piattaforma per l'hospitality intelligente
        </Text>
      </VStack>
    </Box>
  );
}
