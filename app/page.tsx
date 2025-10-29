import Link from 'next/link';
import { ArrowRight, Sparkles, Users, Bot, Waves, MessageCircle } from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

const highlights = [
  {
    title: 'Accogli, accompagna, sorprendi',
    description:
      'Workflow intelligenti che curano ogni fase: dalla proposta su misura al follow-up post soggiorno.',
    icon: Sparkles,
  },
  {
    title: 'Chat unificata con AI empatica',
    description:
      'Email, WhatsApp e Booking in un’unica vista con suggerimenti istantanei e guardrail configurabili.',
    icon: MessageCircle,
  },
  {
    title: 'Dati sensoriali della struttura',
    description:
      'Sensori IoT connessi per monitorare comfort, frigobar e benessere con controlli rapidi e scenari automatizzati.',
    icon: Waves,
  },
];

const featurePills = [
  'Palette metal-glassy modulare',
  'AI concierge che suggerisce copy',
  'Portale ospite dedicato',
  'Gestione note emozionali',
  'Newsletter dinamiche',
  'Editor template visivo',
];

export default function LandingPage() {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-16 px-6 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--accent-gradient)] blur-[180px] opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>
      <header className="flex flex-col items-center gap-6 text-center">
        <span className="badge-pill bg-white/10 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
          Customer Automator
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold leading-snug md:text-5xl">
          La nuova cabina di regia per coccolare gli ospiti con automazioni empatiche
        </h1>
        <p className="max-w-2xl text-lg text-white/70">
          Una suite operativa pensata per direttori d’hotel e guest experience manager. Organizza conversazioni, prenotazioni,
          servizi e dispositivi con un design metal-glassy che riduce il carico cognitivo.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {featurePills.map((pill) => (
            <span key={pill} className="badge-pill bg-white/10 text-white/70">
              {pill}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 rounded-2xl bg-[var(--accent-color)] px-6 py-3 text-sm font-semibold text-[#050c16] shadow-xl shadow-[var(--accent-glow)] transition-transform hover:-translate-y-0.5"
          >
            Accedi all’area di gestione
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#panoramica"
            className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white/80"
          >
            Guarda le novità
          </Link>
        </div>
      </header>
      <section id="panoramica" className="grid w-full gap-6 md:grid-cols-3">
        {highlights.map((highlight) => (
          <Box key={highlight.title} className="glassy-panel flex h-full flex-col gap-4 p-6 text-left">
            <Box className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <highlight.icon size={24} color="rgba(255,255,255,0.85)" />
            </Box>
            <Text className="text-xl font-semibold text-white">{highlight.title}</Text>
            <Text className="text-sm leading-relaxed text-white/70">{highlight.description}</Text>
          </Box>
        ))}
      </section>
      <section className="grid w-full gap-6 rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl md:grid-cols-2">
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold text-white">Un ecosistema pensato per l’albergatore moderno</h2>
          <p className="text-sm leading-relaxed text-white/70">
            Dashboard, conversazioni, IoT e portale ospite convivono con una gerarchia sinistra-destra intuitiva. L’AI suggerisce
            copy, protegge il tono e anticipa le richieste per liberare tempo al tuo team.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureChip icon={<Users size={18} color="rgba(255,255,255,0.85)" />}>Profilo cliente emozionale</FeatureChip>
            <FeatureChip icon={<Bot size={18} color="rgba(255,255,255,0.85)" />}>Guardiani AI configurabili</FeatureChip>
            <FeatureChip icon={<Waves size={18} color="rgba(255,255,255,0.85)" />}>Monitor IoT integrato</FeatureChip>
            <FeatureChip icon={<Sparkles size={18} color="rgba(255,255,255,0.85)" />}>Template dinamici</FeatureChip>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-[32px] bg-[var(--accent-gradient)] opacity-60 blur-3xl" />
          <div className="relative w-full rounded-[28px] border border-white/20 bg-[#0f1520]/80 p-6 shadow-2xl shadow-[var(--accent-glow)]">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">Storyboard applicativo</p>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>• Landing immersiva per indirizzare subito all’operatività.</li>
              <li>• Dashboard con metriche umane e dati sensoriali delle camere.</li>
              <li>• Schede cliente e prenotazione con storytelling del soggiorno.</li>
              <li>• Chat unificata intelligente con suggerimenti contestuali.</li>
              <li>• Editor di template, newsletter e task per il team.</li>
            </ul>
          </div>
        </div>
      </section>
      <footer className="w-full rounded-[32px] border border-white/10 bg-white/5 p-6 text-center text-sm text-white/60 backdrop-blur-xl">
        Customer Automator • Designed per chi trasforma l’ospitalità in cura. Developed da Minders IT.
      </footer>
    </div>
  );
}

const FeatureChip = ({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) => (
  <span className="badge-pill flex items-center gap-2 border border-white/15 bg-white/10 text-white/70">
    {icon}
    {children}
  </span>
);
