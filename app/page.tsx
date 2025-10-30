import Link from 'next/link';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { StatCard } from '@/components/common/stat-card';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { StatusPill } from '@/components/common/status-pill';
import { formatDate } from '@/lib/utils';
import {
  Bot,
  CalendarClock,
  GaugeCircle,
  MailPlus,
  MessageCircle,
  Sparkles,
  Users,
} from 'lucide-react-native';

const heroStats = [
  {
    title: 'Workflow automatizzati',
    value: '42',
    delta: '+18% booking vinti',
    trend: 'up' as const,
    icon: <CalendarClock color="rgb(var(--color-primary-500))" size={22} />,
    footer: 'Media attivazioni settimanali',
  },
  {
    title: 'Risposte AI a settimana',
    value: '312',
    delta: '92% accuratezza guardrail',
    trend: 'stable' as const,
    icon: <Bot color="rgb(var(--color-primary-500))" size={22} />,
    footer: 'Assistente omnicanale H24',
  },
  {
    title: 'Tempo risparmiato',
    value: '16h',
    delta: '-43% ticket manuali',
    trend: 'up' as const,
    icon: <Sparkles color="rgb(var(--color-primary-500))" size={22} />,
    footer: 'Per receptionist a settimana',
  },
];

const featureGrid = [
  {
    title: 'Comunicazione unificata',
    description:
      'Email, WhatsApp e messaggistica OTA in un solo hub. L\'AI suggerisce le risposte e intercetta i momenti chiave da passare al team.',
    icon: <MessageCircle color="rgb(var(--color-primary-500))" size={20} />,
  },
  {
    title: 'Curva ospite trasparente',
    description:
      'Ogni prenotazione ha una timeline visiva con step automatizzati, IoT della camera e link rapidi alle azioni di cura.',
    icon: <GaugeCircle color="rgb(var(--color-primary-500))" size={20} />,
  },
  {
    title: 'Newsletter emozionali',
    description:
      'Segmenti intelligenti basati sulle preferenze, adesione e recensioni per coltivare relazioni oltre il soggiorno.',
    icon: <MailPlus color="rgb(var(--color-primary-500))" size={20} />,
  },
  {
    title: 'Profiler clienti',
    description:
      'Note sensibili, gusti, IoT e storico investimenti per un servizio realmente personalizzato in ogni touchpoint.',
    icon: <Users color="rgb(var(--color-primary-500))" size={20} />,
  },
];

const timeline = [
  {
    title: 'Proposta su misura',
    desc: 'Generata in 3 varianti con upsell dinamico e pagamento one-click.',
  },
  {
    title: 'Chat AI concierge',
    desc: 'Risponde in autonomia e suggerisce al team le mosse migliori con guardrail.',
  },
  {
    title: 'Camera intelligente',
    desc: 'Stato IoT in tempo reale: comfort, minibar, luci e clima da remoto.',
  },
  {
    title: 'Post stay memorabile',
    desc: 'Automation per feedback, recensioni e loyalty program personalizzati.',
  },
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] top-[5%] h-[420px] w-[420px] rounded-full bg-primary-500/20 blur-[180px]" />
        <div className="absolute bottom-[10%] right-[5%] h-[380px] w-[380px] rounded-full bg-secondary-500/20 blur-[160px]" />
      </div>
      <Box className="relative mx-auto flex min-h-screen w-full max-w-[var(--page-max-width)] flex-col gap-16 px-6 py-16 md:px-10 lg:px-16">
        <Box className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-center">
          <Box className="flex-1 gap-8">
            <StatusPill label="Experience Suite per hotel" tone="info" />
            <Text className="text-gradient text-5xl font-semibold leading-tight md:text-6xl">
              Automazioni che coccolano gli ospiti, insight che guidano il tuo team
            </Text>
            <Text className="max-w-xl text-base text-typography-200 md:text-lg">
              Customer Automator unisce AI conversazionale, IoT e marketing esperienziale in un unico luogo. Riduci il carico operativo, anticipa i bisogni del cliente e lascia che il tuo staff torni a prendersi cura delle persone.
            </Text>
            <Box className="flex flex-col gap-4 sm:flex-row">
              <Link href="/login" className="sm:w-auto">
                <Button size="lg" action="primary" className="w-full rounded-2xl bg-primary-500 px-8 py-4">
                  <Sparkles color="rgb(var(--color-typography-0))" size={18} />
                  <ButtonText className="text-base font-semibold text-typography-0">Accedi all'area di gestione</ButtonText>
                </Button>
              </Link>
              <Link href="/dashboard" className="sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  action="secondary"
                  className="w-full rounded-2xl border-white/20 bg-background-0/30 px-8 py-4"
                >
                  <ButtonText className="text-base font-semibold text-typography-0">
                    Esplora il prototipo interattivo
                  </ButtonText>
                </Button>
              </Link>
            </Box>
            <Box className="flex flex-wrap gap-6 text-xs text-typography-400">
              <Box className="gap-1">
                <Text className="text-sm font-semibold text-typography-0">Guardrail AI</Text>
                <Text>interventi manuali notificati in tempo reale</Text>
              </Box>
              <Box className="gap-1">
                <Text className="text-sm font-semibold text-typography-0">Privacy by design</Text>
                <Text>audit trail per ogni automazione e conversazione</Text>
              </Box>
            </Box>
          </Box>
          <Box className="flex-1">
            <GlassPanel className="relative aspect-[4/5] overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent" />
              <Box className="relative h-full justify-between gap-6 p-6">
                <Box className="gap-3">
                  <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Vista rapida prenotazione</Text>
                  <Text className="text-2xl font-semibold text-typography-0">Suite Aurora · 24 → 28 Marzo</Text>
                  <Box className="flex flex-wrap gap-3 text-xs text-typography-200">
                    <StatusPill label="Workflow attivo" tone="info" />
                    <StatusPill label="IoT stabile" tone="success" />
                    <StatusPill label="AI guardrail" tone="warning" />
                  </Box>
                </Box>
                <Box className="grid grid-cols-2 gap-3 text-sm">
                  <GlassCard padding="p-4" className="border-white/10 bg-background-0/40">
                    <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Chat AI</Text>
                    <Text className="mt-2 text-sm text-typography-0">
                      "Ho preparato una risposta romantica per l'anniversario. Vuoi inviarla ora?"
                    </Text>
                  </GlassCard>
                  <GlassCard padding="p-4" className="border-white/10 bg-background-0/40">
                    <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Sensori camera</Text>
                    <Text className="mt-2 text-sm text-typography-0">21.5°C · minibar 75% · luci soffuse</Text>
                  </GlassCard>
                  <GlassCard padding="p-4" className="border-white/10 bg-background-0/40 col-span-2">
                    <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Timeline</Text>
                    <Box className="mt-3 flex flex-col gap-3">
                      <Box className="flex items-center justify-between">
                        <Text className="text-sm text-typography-0">Proposta inviata</Text>
                        <Text className="text-xs text-typography-300">10 Feb · 10:03</Text>
                      </Box>
                      <Box className="flex items-center justify-between">
                        <Text className="text-sm text-typography-0">Promemoria WhatsApp</Text>
                        <Text className="text-xs text-typography-300">11 Feb · 09:01</Text>
                      </Box>
                      <Box className="flex items-center justify-between">
                        <Text className="text-sm text-primary-400">Check-in digitale in attesa</Text>
                        <Text className="text-xs text-typography-300">20 Mar · 12:00</Text>
                      </Box>
                    </Box>
                  </GlassCard>
                </Box>
                <Text className="text-xs text-typography-300">
                  Ultimo aggiornamento {formatDate('2025-02-18T12:30:00')} · Copilot pronto a intervenire
                </Text>
              </Box>
            </GlassPanel>
          </Box>
        </Box>
        <Box className="grid gap-6 md:grid-cols-3">
          {heroStats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </Box>
        <Box className="grid gap-6 lg:grid-cols-2">
          {featureGrid.map((feature) => (
            <GlassCard key={feature.title} className="bg-background-0/40" padding="p-6">
              <Box className="mb-4 flex items-center gap-3">
                <Box className="rounded-2xl bg-primary-500/20 p-3">{feature.icon}</Box>
                <Text className="text-lg font-semibold text-typography-0">{feature.title}</Text>
              </Box>
              <Text className="text-sm text-typography-200">{feature.description}</Text>
            </GlassCard>
          ))}
        </Box>
        <GlassPanel className="grid gap-10 p-10">
          <Box className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Box className="max-w-3xl gap-3">
              <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Percorso dell'ospite</Text>
              <Text className="text-3xl font-semibold text-typography-0 md:text-4xl">
                Dal primo contatto al ricordo post soggiorno, in un flusso intelligente
              </Text>
              <Text className="text-sm text-typography-200 md:text-base">
                Ogni step può essere automatizzato o supervisionato. L'assistente AI propone azioni, l'hotel mantiene il tocco umano.
              </Text>
            </Box>
            <Link href="/booking/new">
              <Button action="primary" size="md" className="rounded-2xl bg-primary-500 px-6 py-3">
                <ButtonText className="font-semibold text-typography-0">Simula una prenotazione</ButtonText>
              </Button>
            </Link>
          </Box>
          <Box className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item, index) => (
              <GlassCard key={item.title} padding="p-5" className="bg-background-0/40">
                <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Step 0{index + 1}</Text>
                <Text className="mt-3 text-lg font-semibold text-typography-0">{item.title}</Text>
                <Text className="mt-2 text-sm text-typography-200">{item.desc}</Text>
              </GlassCard>
            ))}
          </Box>
        </GlassPanel>
        <GlassCard className="flex flex-col gap-6 bg-background-0/40 p-8 text-center">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Pronti a partire</Text>
          <Text className="text-3xl font-semibold text-typography-0 md:text-4xl">
            Trasforma le tue comunicazioni in esperienze memorabili
          </Text>
          <Text className="mx-auto max-w-3xl text-sm text-typography-200 md:text-base">
            Dalla prima proposta alla fidelizzazione, Customer Automator si integra nel tuo lavoro quotidiano senza stravolgerlo. Progettato con cura per hotel boutique, catene indipendenti e resort che vogliono stupire.
          </Text>
          <Box className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/login">
              <Button action="primary" size="md" className="rounded-2xl bg-primary-500 px-8 py-3">
                <ButtonText className="text-sm font-semibold text-typography-0">Entra in piattaforma</ButtonText>
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="md" variant="outline" action="secondary" className="rounded-2xl border-white/20 px-8 py-3">
                <ButtonText className="text-sm font-semibold text-typography-0">
                  Guarda l'assistente AI in azione
                </ButtonText>
              </Button>
            </Link>
          </Box>
        </GlassCard>
      </Box>
    </main>
  );
}
