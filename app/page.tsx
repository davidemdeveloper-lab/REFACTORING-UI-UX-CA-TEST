import Link from 'next/link';
import Image from 'next/image';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { GlassCard } from '@/components/common/GlassCard';
import { palette } from '@/theme/palette';
import {
  Sparkles,
  Workflow,
  Layers,
  ArrowRight,
  Users,
  MessageCircle,
} from 'lucide-react-native';

const featureBlocks = [
  {
    title: 'Automazioni conversazionali',
    description:
      'Orchestra onboarding, upsell e reminder con AI che si adatta allo stile della tua struttura.',
    icon: Sparkles,
  },
  {
    title: 'Controllo operativo in tempo reale',
    description:
      'Timeline comunicativa per ogni prenotazione con stato IoT della camera sempre visibile.',
    icon: Workflow,
  },
  {
    title: 'Template modulari metal-glassy',
    description:
      'Crea email dinamiche con blocchi drag & drop, pronte ad attivare servizi esterni.',
    icon: Layers,
  },
];

const stats = [
  { label: 'Risposte AI automatiche', value: '92%' },
  { label: 'Riduzione tempi di check-in', value: '-36%' },
  { label: 'Servizi upsell confermati', value: '+48%' },
];

export default function LandingPage() {
  return (
    <Box className="min-h-screen w-full overflow-hidden pb-24">
      <Box className="absolute inset-0 -z-10">
        <Image
          src="/landing-glass-texture.svg"
          alt="Texture metal glass"
          fill
          style={{ objectFit: 'cover', opacity: 0.18 }}
        />
      </Box>
      <VStack className="mx-auto max-w-6xl gap-20 px-6 pt-28">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
      </VStack>
    </Box>
  );
}

function HeroSection() {
  return (
    <HStack className="flex-col gap-12 lg:flex-row lg:items-center">
      <VStack className="flex-1 gap-6">
        <Text className="text-xs uppercase tracking-[0.45em] text-slate-400">
          Customer Automator
        </Text>
        <Text className="text-5xl font-semibold leading-tight text-white">
          Il nuovo quartier generale digitale per hotel moderni
        </Text>
        <Text className="text-lg text-slate-300">
          Ridisegnato con un linguaggio metal-glassy, ottimizzato per orchestrare comunicazioni,
          servizi e dispositivi IoT tra staff e ospiti. Un ecosistema UI/UX pensato per hotel
          indipendenti e catene boutique.
        </Text>
        <HStack className="flex-wrap gap-4">
          <Button className="rounded-full border border-white/20 bg-white/10 px-6 py-4" action="primary">
            <ButtonIcon>
              <ArrowRight color={palette.intent.accent} size={18} strokeWidth={1.6} />
            </ButtonIcon>
            <ButtonText className="text-base text-white">Accedi all'area di gestione</ButtonText>
          </Button>
          <Button
            className="rounded-full border border-white/20 bg-transparent px-6 py-4"
            action="primary"
            variant="outline"
          >
            <ButtonText className="text-base text-slate-200">
              Esplora il design system
            </ButtonText>
          </Button>
        </HStack>
        <HStack className="mt-4 items-center gap-8">
          <HStack className="items-center gap-3">
            <Users color={palette.text.secondary} size={20} strokeWidth={1.5} />
            <Text className="text-sm text-slate-300">
              120+ strutture hanno già migrato al nuovo Customer Automator
            </Text>
          </HStack>
          <HStack className="items-center gap-3">
            <MessageCircle color={palette.text.secondary} size={20} strokeWidth={1.5} />
            <Text className="text-sm text-slate-300">AI pronta ad assistere h24 staff e ospiti</Text>
          </HStack>
        </HStack>
      </VStack>
      <GlassCard className="flex-1 items-center gap-6 border-white/20 bg-white/5 p-10">
        <Text className="text-sm uppercase tracking-[0.4em] text-slate-300">
          Anteprima interfaccia
        </Text>
        <Image
          src="/hero-dashboard-preview.svg"
          alt="Anteprima dashboard"
          width={640}
          height={420}
          className="rounded-3xl border border-white/10 shadow-2xl"
        />
        <Text className="text-center text-sm text-slate-400">
          Dashboard con timeline prenotazioni, cards IoT e notifiche AI integrate in un layout metal-glassy.
        </Text>
      </GlassCard>
    </HStack>
  );
}

function FeaturesSection() {
  return (
    <VStack className="gap-8">
      <Text className="text-3xl font-semibold text-white">Perché il nuovo Customer Automator</Text>
      <HStack className="flex-col gap-6 md:flex-row">
        {featureBlocks.map((feature) => (
          <GlassCard key={feature.title} className="flex-1 gap-4 border-white/15 bg-white/5">
            <Box className="h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
              <feature.icon color={palette.intent.accent} size={26} strokeWidth={1.6} />
            </Box>
            <VStack className="gap-2">
              <Text className="text-xl font-semibold text-white">{feature.title}</Text>
              <Text className="text-sm text-slate-300">{feature.description}</Text>
            </VStack>
            <Link href="/dashboard" className="mt-auto text-sm text-sky-300 underline decoration-dotted">
              Scopri come appare nella piattaforma
            </Link>
          </GlassCard>
        ))}
      </HStack>
    </VStack>
  );
}

function StatsSection() {
  return (
    <GlassCard className="gap-6 border-white/10 bg-gradient-to-br from-white/10 to-transparent">
      <Text className="text-2xl font-semibold text-white">
        Dati concreti dalle strutture pilota
      </Text>
      <HStack className="flex-col gap-6 md:flex-row">
        {stats.map((item) => (
          <VStack key={item.label} className="flex-1 gap-2">
            <Text className="text-4xl font-semibold text-white">{item.value}</Text>
            <Text className="text-sm text-slate-400">{item.label}</Text>
          </VStack>
        ))}
      </HStack>
      <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">
        UI progettata per validare esperienze su desktop, tablet e totem lobby
      </Text>
    </GlassCard>
  );
}
