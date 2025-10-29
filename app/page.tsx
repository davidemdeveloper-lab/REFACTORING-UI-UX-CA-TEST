'use client';

import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { GlassPanel } from '@/components/app/glass-panel';
import { Icon } from '@/components/ui/icon';
import { Sparkles, Gauge, Users, MessageSquare, ArrowRight } from '@/components/icons';

const featureCards = [
  {
    title: 'Automazioni intelligenti',
    description: "Sincronizza comunicazioni, IoT e servizi esterni con l'AI di Customer Automator.",
    icon: Sparkles,
  },
  {
    title: 'Esperienze personalizzate',
    description: 'Template metal-glassy e segmentazione dinamica per ogni tipologia di ospite.',
    icon: Users,
  },
  {
    title: 'Conversazioni in tempo reale',
    description: 'Chat master-detail con suggerimenti AI e routing automatico delle richieste.',
    icon: MessageSquare,
  },
];

export default function Home() {
  return (
    <Box className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-typography-100">
      <Box className="relative w-full max-w-[1200px]">
        <Box className="absolute -top-32 -left-20 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />
        <Box className="absolute -bottom-32 -right-10 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
        <GlassPanel className="relative overflow-hidden px-10 py-14 text-center">
          <Text className="text-xs uppercase tracking-[0.5em] text-primary-200">
            Customer Automator
          </Text>
          <Text className="mt-4 text-5xl font-semibold text-typography-0">
            Hospitality metal-glassy con AI integrata
          </Text>
          <Text className="mx-auto mt-4 max-w-2xl text-base text-typography-200">
            Automatizza la comunicazione tra albergatore e ospite con dashboard, chat, template e IoT orchestrati.
          </Text>
          <Box className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button action="primary" className="bg-primary-500/40 px-6 py-3">
                <ButtonIcon as={Gauge} />
                <ButtonText className="text-typography-0">
                  Accedi all'area di gestione
                </ButtonText>
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline" action="secondary" className="border-white/20 px-6 py-3">
                <ButtonIcon as={ArrowRight} />
                <ButtonText className="text-typography-100">
                  Esplora il design system
                </ButtonText>
              </Button>
            </Link>
          </Box>
        </GlassPanel>
        <Box className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featureCards.map((feature) => (
            <GlassPanel key={feature.title} className="bg-white/5 px-6 py-6 text-left">
              <Box className="flex items-center gap-3">
                <Box className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/20">
                  <Icon as={feature.icon} className="text-primary-200" size="lg" />
                </Box>
                <Text className="text-lg font-semibold text-typography-0">
                  {feature.title}
                </Text>
              </Box>
              <Text className="mt-3 text-sm text-typography-300">
                {feature.description}
              </Text>
            </GlassPanel>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// Validazione: landing page metal-glassy con CTA dirette e presentazione delle feature principali.
