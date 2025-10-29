import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';

const highlights = [
  {
    title: 'Convergenza dei canali',
    description:
      'Email, WhatsApp e Booking in un’unica linea temporale potenziata dall’AI con suggerimenti proattivi.',
    stats: '87% di risposte entro 5 minuti',
  },
  {
    title: 'Automazioni empatiche',
    description:
      'Workflow che ascoltano il comportamento degli ospiti e suggeriscono l’azione migliore al team.',
    stats: '20+ scenari precostituiti personalizzabili',
  },
  {
    title: 'IoT orientato al benessere',
    description:
      'Sensori collegati alla camera per prevenire disagi e creare esperienze tailor-made in pochi tocchi.',
    stats: 'Controllo diretto da dashboard',
  },
];

const conciergeLoops = [
  'Reminder pagamento intelligente',
  'Onboarding digitale e raccolta preferenze',
  'Upsell predittivi per spa, ristorante e transfer',
  'Chat assistita con suggerimenti in linguaggio naturale',
  'Feedback post soggiorno con riconoscimento emozionale',
];

export default function LandingPage() {
  return (
    <Box className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background-0/80 via-white/40 to-background-100/60">
      <Box className="absolute inset-x-0 top-0 h-[420px] -skew-y-3 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_65%)]" />
      <Box className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-20 px-4 pb-24 pt-12 sm:px-8">
        <LandingHeader />
        <HeroSection />
        <Divider className="border-white/20" />
        <Highlights />
        <ConciergeLoop />
        <FooterCTA />
      </Box>
    </Box>
  );
}

function LandingHeader() {
  return (
    <HStack className="items-center justify-between">
      <Box>
        <Text className="font-[var(--font-space-grotesk)] text-xs uppercase tracking-[0.4em] text-primary-700/70">
          Customer Automator
        </Text>
        <Text className="mt-2 font-[var(--font-space-grotesk)] text-3xl text-primary-800">
          La bussola dell’ospitalità predittiva
        </Text>
      </Box>
      <HStack space="md" className="items-center">
        <Link href="/login">
          <Button action="primary" size="sm" className="rounded-full px-5">
            <Text className="text-sm font-semibold text-white">Accedi</Text>
          </Button>
        </Link>
      </HStack>
    </HStack>
  );
}

function HeroSection() {
  return (
    <HStack className="flex-col-reverse items-start gap-12 lg:flex-row lg:items-center">
      <VStack space="md" className="flex-1">
        <Text className="text-4xl font-semibold leading-tight text-primary-900 lg:text-5xl">
          Dalla prenotazione al ricordo: orchestriamo ogni relazione con cura digitale.
        </Text>
        <Text className="text-lg text-typography-500">
          Un’unica interfaccia metal-glass che combina insight, automazioni, IoT e chat assistite per liberare il tuo team dai
          compiti ripetitivi e concentrarlo su ciò che conta: far sentire gli ospiti speciali.
        </Text>
        <HStack space="md" className="mt-3 flex-wrap">
          <Link href="/dashboard">
            <Button action="primary" size="lg" className="rounded-full px-6">
              <Text className="text-base font-semibold text-white">Esplora la dashboard</Text>
            </Button>
          </Link>
          <Link href="#flusso-concierge">
            <Button action="secondary" variant="outline" size="lg" className="rounded-full border-primary-200/60 px-6">
              <Text className="text-base font-semibold text-primary-700">Scopri i flussi</Text>
            </Button>
          </Link>
        </HStack>
        <HStack space="sm" className="mt-8 items-center text-sm text-typography-400">
          <span>⏱</span>
          <Text>
            Attiva in meno di 48 ore • Template pronti per onboarding, upsell e post-soggiorno • Chatbot con supervisione umana
          </Text>
        </HStack>
      </VStack>
      <Box className="glass-panel relative flex w-full max-w-[420px] flex-col gap-6 rounded-3xl px-8 py-10">
        <Text className="text-sm uppercase tracking-[0.3em] text-typography-500">
          Visione in tempo reale
        </Text>
        <VStack space="lg">
          <Metric label="Tasso conversione" value="+32%" description="vs. flussi manuali" />
          <Metric label="Tempo risposta" value="2min" description="media chat multi-canale" />
          <Metric label="Upsell confermati" value="74" description="ultimo trimestre" />
        </VStack>
        <Divider className="border-white/20" />
        <Text className="text-sm text-typography-400">
          “Customer Automator ci permette di anticipare i desideri degli ospiti prima ancora che scrivano. Il team vive serate
          più leggere, gli ospiti ricevono attenzioni memorabili.”
        </Text>
        <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-typography-500">
          Davide Minardi • General Manager
        </Text>
      </Box>
    </HStack>
  );
}

function Metric({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <Box>
      <Text className="text-xs uppercase tracking-[0.3em] text-typography-400/80">{label}</Text>
      <Text className="mt-2 text-3xl font-semibold text-primary-800">{value}</Text>
      <Text className="text-sm text-typography-400">{description}</Text>
    </Box>
  );
}

function Highlights() {
  return (
    <Box className="grid gap-8 md:grid-cols-3">
      {highlights.map((item) => (
        <Box key={item.title} className="glass-panel relative rounded-3xl px-7 py-8">
          <Text className="text-sm uppercase tracking-[0.3em] text-typography-500/80">{item.stats}</Text>
          <Text className="mt-3 text-2xl font-semibold text-primary-900">{item.title}</Text>
          <Text className="mt-2 text-sm text-typography-400">{item.description}</Text>
        </Box>
      ))}
    </Box>
  );
}

function ConciergeLoop() {
  return (
    <Box id="flusso-concierge" className="glass-panel overflow-hidden rounded-3xl px-8 py-10">
      <Text className="text-xs uppercase tracking-[0.35em] text-primary-700/80">
        Dal primo contatto al post-soggiorno
      </Text>
      <Text className="mt-3 text-3xl font-semibold text-primary-900">Il ciclo di cura completo</Text>
      <Text className="mt-4 max-w-3xl text-sm text-typography-400">
        Ogni punto di contatto è orchestrato dall’AI ma supervisionato da te. Suggerimenti automatici, interventi manuali solo
        quando serve, IoT che dialoga con il CRM per prevenire sorprese.
      </Text>
      <Box className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {conciergeLoops.map((item) => (
          <Box key={item} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
            <Text className="text-sm font-semibold text-primary-800">{item}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function FooterCTA() {
  return (
    <Box className="glass-panel flex flex-col items-center gap-6 rounded-3xl px-8 py-10 text-center">
      <Text className="text-xs uppercase tracking-[0.3em] text-typography-500">
        Pronto a coccolare i tuoi ospiti?
      </Text>
      <Text className="text-3xl font-semibold text-primary-900">
        Accedi all’area di gestione e vivi il nuovo standard operativo.
      </Text>
      <HStack space="md" className="items-center">
        <Link href="/login">
          <Button action="primary" size="lg" className="rounded-full px-6">
            <Text className="text-base font-semibold text-white">Accedi</Text>
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button action="secondary" variant="outline" size="lg" className="rounded-full border-primary-200/60 px-6">
            <Text className="text-base font-semibold text-primary-700">Guarda la demo</Text>
          </Button>
        </Link>
      </HStack>
    </Box>
  );
}

