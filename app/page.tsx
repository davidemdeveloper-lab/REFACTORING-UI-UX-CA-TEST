'use client';

import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { GlassPanel } from '@/components/app/glass-panel';
import { Icon } from '@/components/ui/icon';
import {
  Sparkles,
  Gauge,
  Users,
  MessageSquare,
  ArrowRight,
  LayoutDashboard,
  CalendarCheck,
  MessageSquareMore,
  ClipboardList,
} from '@/components/icons';

const featureCards = [
  {
    title: 'Percorsi coccola ospiti',
    description:
      'Coordina automazioni, IoT e staff per creare micro-momenti memorabili prima, durante e dopo il soggiorno.',
    icon: Sparkles,
  },
  {
    title: 'Profilazione sensibile',
    description:
      'Raccogli preferenze, emozioni e bisogni dei guest con tag dinamici e suggerimenti contestuali.',
    icon: Users,
  },
  {
    title: 'Assistente relazionale',
    description:
      'Chat master-detail con AI co-pilot per risposte empatiche, follow-up automatici e routing intelligente.',
    icon: MessageSquare,
  },
];

const journeyCards = [
  {
    title: 'Dashboard esperienziale',
    description: 'Monitora indice care, sorprese attive e comfort camere.',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Schede ospiti',
    description: 'Tag emotivi, preferenze e insight per ogni cliente.',
    href: '/clients',
    icon: Users,
  },
  {
    title: 'Timeline soggiorni',
    description: 'Azioni chiave e automazioni di benvenuto per ogni prenotazione.',
    href: '/bookings',
    icon: CalendarCheck,
  },
  {
    title: 'Inbox conversazioni',
    description: 'Risposte rapide con tono empatico guidato dall’AI.',
    href: '/chat',
    icon: MessageSquareMore,
  },
  {
    title: 'Template empatici',
    description: 'Sequenze email e WhatsApp con suggerimenti personalizzati.',
    href: '/templates',
    icon: ClipboardList,
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
            Hospitality metal-glassy centrata sul benessere del tuo ospite
          </Text>
          <Text className="mx-auto mt-4 max-w-2xl text-base text-typography-100">
            Offri un servizio che coccola ogni cliente orchestrando automazioni, staff e dispositivi con un linguaggio
            caldo e coerente su tutti i canali.
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
                <ButtonText className="text-typography-50">Esplora il design system</ButtonText>
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
        <GlassPanel className="mt-12 bg-black/40 px-8 py-8 text-left">
          <Text className="text-xs uppercase tracking-[0.5em] text-primary-200">Percorsi guidati</Text>
          <Text className="mt-3 text-3xl font-semibold text-typography-0">
            Collega subito le aree operative per coccolare ogni ospite
          </Text>
          <Text className="mt-2 max-w-2xl text-sm text-typography-200">
            Parti dalla dashboard esperienziale e continua con schede clienti, timeline prenotazioni, conversazioni e
            template empatici: ogni modulo è già pronto all'uso.
          </Text>
          <Box className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {journeyCards.map((journey) => (
              <Link key={journey.href} href={journey.href} className="group">
                <Box className="flex h-full flex-col gap-3 rounded-3xl border border-white/10 bg-black/30 px-5 py-5 transition-colors duration-200 group-hover:border-primary-400 group-hover:bg-primary-500/20">
                  <Box className="flex items-center gap-3">
                    <Box className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/20">
                      <Icon as={journey.icon} className="text-primary-200" size="md" />
                    </Box>
                    <Text className="text-lg font-semibold text-typography-0">{journey.title}</Text>
                  </Box>
                  <Text className="text-sm text-typography-200">{journey.description}</Text>
                  <Box className="mt-auto inline-flex items-center gap-2 text-sm text-primary-200 group-hover:text-primary-100">
                    Entra subito
                    <ArrowRight size={16} color="currentColor" />
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </GlassPanel>
      </Box>
    </Box>
  );
}

// Validazione: landing page metal-glassy con CTA dirette e presentazione delle feature principali.
