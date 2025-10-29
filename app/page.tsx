import Link from 'next/link';
import Image from 'next/image';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Icon } from '@/components/ui/icon';
import { ArrowRight, MessageSquare, Sparkles, Workflow } from 'lucide-react-native';
import { accentOptions } from '@/lib/data';

const featurePills = [
  {
    title: 'Conversazioni Omnicanale',
    description: 'Email, WhatsApp e Booking in un’unica timeline potenziata dall’AI.',
    icon: MessageSquare,
  },
  {
    title: 'Workflow Empatici',
    description: 'Automazioni sceneggiate che anticipano i bisogni del viaggiatore.',
    icon: Workflow,
  },
  {
    title: 'Consigli proattivi',
    description: 'Suggerimenti di testo, upsell e IoT sempre nel contesto giusto.',
    icon: Sparkles,
  },
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Box className="pointer-events-none absolute inset-0 grid-overlay" />
      <Box className="relative z-10 mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-24 lg:px-16">
        <header className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <VStack space="md" className="flex-1">
            <Box className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/5 px-4 py-1 backdrop-blur-md">
              <Text className="text-xs uppercase tracking-[0.4em] text-white/70">Customer Automator</Text>
              <Box className="h-1 w-1 rounded-full bg-[color:var(--accent-solid)]" />
              <Text className="text-xs text-white/60">Hospitality Experience OS</Text>
            </Box>
            <Text className="font-space-grotesk text-4xl font-semibold text-white drop-shadow-xl md:text-6xl">
              Il tuo co-pilota digitale per coccolare ogni ospite prima, durante e dopo il soggiorno.
            </Text>
            <Text className="max-w-2xl text-base text-white/70 md:text-lg">
              Customer Automator riunisce prenotazioni, conversazioni, automazioni e insight in un ambiente metal-glassy
              pensato per ridurre il carico cognitivo del front desk e liberare tempo da dedicare all’accoglienza.
            </Text>
            <HStack space="md" className="flex-wrap">
              <Link href="/login" className="shrink-0">
                <Button className="rounded-full bg-[color:var(--accent-solid)] px-6 py-3 text-background-950 shadow-[0_20px_50px_-12px_rgba(74,200,255,0.45)]">
                  <HStack space="sm" className="items-center">
                    <Text className="font-semibold text-background-950">Accedi all’area di gestione</Text>
                    <Icon as={ArrowRight} size="sm" color="rgb(var(--color-background-950))" />
                  </HStack>
                </Button>
              </Link>
              <Link href="/dashboard" className="shrink-0">
                <Button className="rounded-full border border-white/30 bg-transparent px-6 py-3 text-white/80 backdrop-blur">
                  <HStack space="sm" className="items-center">
                    <Text className="font-semibold text-white/80">Esplora il nuovo design</Text>
                    <Icon as={Sparkles} size="sm" color="rgba(255,255,255,0.8)" />
                  </HStack>
                </Button>
              </Link>
            </HStack>
            <HStack space="lg" className="flex-wrap pt-6">
              {Object.entries(accentOptions).map(([key, palette]) => (
                <Box key={key} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <Box className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.hex }} />
                  <Text className="text-xs uppercase tracking-[0.25em] text-white/70">{palette.name}</Text>
                </Box>
              ))}
            </HStack>
          </VStack>
          <Box className="relative flex h-[420px] flex-1 items-center justify-center">
            <div className="glass-panel relative h-full w-full max-w-[420px] p-6">
              <Box className="absolute inset-0 rounded-[22px] border border-white/10" />
              <VStack space="lg" className="relative h-full justify-between">
                <Box>
                  <Text className="text-sm uppercase tracking-[0.4em] text-white/60">Preview portale ospite</Text>
                  <Text className="font-space-grotesk text-3xl text-white">
                    Accesso dedicato all’ospite per vivere la struttura prima di arrivare.
                  </Text>
                </Box>
                <Image
                  src="/landing-guest-portal.svg"
                  alt="Schermata portale ospite"
                  fill
                  className="rounded-[18px] object-cover"
                  priority
                />
                <Box className="relative mt-auto rounded-2xl bg-white/5 p-4 text-white/70">
                  <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Preview funzioni</Text>
                  <ul className="mt-2 space-y-1 text-sm leading-relaxed">
                    <li>• Check-in digitale e preferenze camera</li>
                    <li>• Chat con AI Concierge sempre attiva</li>
                    <li>• Booking spa e ristorante in tempo reale</li>
                    <li>• Esperienze personalizzate su misura</li>
                  </ul>
                </Box>
              </VStack>
            </div>
          </Box>
        </header>

        <section className="mt-24 grid gap-6 md:grid-cols-3">
          {featurePills.map((feature) => (
            <div key={feature.title} className="glass-panel group relative p-6 transition-all duration-300 hover:-translate-y-2">
              <HStack space="md" className="items-start">
                <Box className="rounded-full bg-[color:var(--accent-solid)]/20 p-3">
                  <Icon as={feature.icon} size="lg" color="var(--accent-solid)" />
                </Box>
                <VStack space="xs">
                  <Text className="font-space-grotesk text-xl text-white">{feature.title}</Text>
                  <Text className="text-sm text-white/70">{feature.description}</Text>
                </VStack>
              </HStack>
              <Box className="pointer-events-none absolute inset-0 rounded-[22px] border border-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </section>

        <section className="mt-24 grid gap-6 lg:grid-cols-2">
          <div className="glass-panel p-8">
            <Text className="font-space-grotesk text-2xl text-white">Riduci il carico del front desk</Text>
            <Text className="mt-3 text-sm text-white/70">
              Dashboard modulare con timeline a sinistra e interazioni contestuali a destra. I componenti sono basati su
              design molecolare e possono adattarsi a boutique hotel o resort complessi.
            </Text>
            <ul className="mt-6 grid gap-3 text-sm text-white/80">
              <li>• Quick actions per chiamare, inviare messaggi o aprire la scheda su Booking.com.</li>
              <li>• Riassunto IoT: temperatura, illuminazione, minibar e aromaterapia della stanza.</li>
              <li>• Suggerimenti AI per risposte pronte e per anticipare bisogni chiave.</li>
              <li>• Pulsanti dinamici per creare note, appuntare preferenze e attivare upsell.</li>
            </ul>
          </div>
          <div className="glass-panel p-8">
            <Text className="font-space-grotesk text-2xl text-white">Conversazioni guidate dall’intelligenza</Text>
            <Text className="mt-3 text-sm text-white/70">
              La Chat Unificata convoglia email, WhatsApp e Booking con indicatori di canale. L’AI propone bozza, tonalità e
              suggerimenti di upsell, lasciando all’operatore il pieno controllo.
            </Text>
            <Box className="mt-6 grid gap-3 text-sm text-white/80">
              <Box className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Text className="text-xs uppercase tracking-[0.3em] text-white/60">Risposta suggerita</Text>
                <Text className="mt-2 text-sm text-white/80">
                  “Ciao Giovanni, possiamo riservarti il massaggio di coppia alle 18:30. Vuoi aggiungere prosecco e fragole in
                  camera come sorpresa?”
                </Text>
              </Box>
              <Box className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Text className="text-xs uppercase tracking-[0.3em] text-white/60">Guardrails attivi</Text>
                <Text className="mt-2 text-sm text-white/80">
                  Escalation automatica all’operatore in caso di sentiment negativo, richiesta pagamento o cambio prenotazione
                  complessa.
                </Text>
              </Box>
            </Box>
          </div>
        </section>
      </Box>
    </main>
  );
}
