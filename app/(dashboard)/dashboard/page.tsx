import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Gauge,
  MessageSquareQuote,
  PlugZap,
  Rocket,
  Sparkles,
  TrendingUp,
} from 'lucide-react-native';
import {
  automationInsights,
  chatThreads,
  clients,
  formatCurrency,
  reservations,
} from '@/lib/data';
import Link from 'next/link';

const occupancy = 82;
const aiResolutionRate = 68;
const sentimentScore = 9.2;

export default function DashboardPage() {
  return (
    <div className="grid gap-8">
      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="glass-panel p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Text className="text-sm uppercase tracking-[0.3em] text-white/60">Stato della struttura</Text>
              <Text className="mt-2 font-space-grotesk text-3xl text-white">Panoramica operativa</Text>
            </div>
            <HStack space="md" className="items-center text-white/70">
              <MetricPill icon={Gauge} label="Occupazione" value={`${occupancy}%`} />
              <MetricPill icon={Sparkles} label="AI Resolution" value={`${aiResolutionRate}%`} />
              <MetricPill icon={MessageSquareQuote} label="Sentiment" value={sentimentScore.toFixed(1)} />
            </HStack>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reservations.slice(0, 3).map((reservation) => {
              const client = clients.find((c) => c.id === reservation.clientId);
              return (
                <div key={reservation.id} className="group relative rounded-3xl border border-white/5 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1">
                  <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Prenotazione #{reservation.code}</Text>
                  <Text className="mt-2 font-space-grotesk text-xl text-white">{client?.name}</Text>
                  <Text className="text-xs text-white/50">{reservation.checkIn} → {reservation.checkOut}</Text>
                  <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                    <span>{reservation.type === 'proposal' ? 'Proposta dinamica' : reservation.type === 'instant' ? 'Pagamento online' : 'Conferma manuale'}</span>
                    <span>{reservation.channel}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between text-sm text-white/80">
                    <span>{formatCurrency(reservation.total, reservation.currency)}</span>
                    <Badge className="rounded-full bg-[color:var(--accent-solid)]/20 text-[color:var(--accent-soft)]">
                      {reservation.status.toUpperCase()}
                    </Badge>
                  </div>
                  <Link
                    href={`/reservations/${reservation.id}`}
                    className="absolute inset-0"
                    aria-label={`Vai al dettaglio di ${reservation.code}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="glass-panel flex flex-col justify-between p-6">
          <Text className="text-sm uppercase tracking-[0.3em] text-white/50">Automazioni</Text>
          <VStack space="md" className="mt-4">
            {automationInsights.map((insight) => (
              <div key={insight.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80">
                <Text className="font-space-grotesk text-lg text-white">{insight.title}</Text>
                <Text className="mt-1 text-xs text-white/60">{insight.description}</Text>
                <div className="mt-3 flex items-center justify-between text-xs text-white/50">
                  <span>Impatto {insight.impact.toUpperCase()}</span>
                  <span>Stato: {insight.status}</span>
                </div>
                <Text className="mt-2 text-sm text-[color:var(--accent-soft)]">{insight.suggestion}</Text>
              </div>
            ))}
          </VStack>
          <Button className="mt-4 rounded-full border border-white/20 bg-white/5 py-3 text-xs text-white/70">
            Gestisci workflow
          </Button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel p-6">
          <HStack className="items-start justify-between">
            <div>
              <Text className="text-sm uppercase tracking-[0.3em] text-white/60">Conversazioni recenti</Text>
              <Text className="mt-2 font-space-grotesk text-2xl text-white">Chat unificata</Text>
            </div>
            <Link href="/chat">
              <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
                Vedi tutto
              </Button>
            </Link>
          </HStack>
          <div className="mt-6 grid gap-4">
            {chatThreads.map((thread) => {
              const client = clients.find((c) => c.id === thread.clientId);
              return (
                <Link key={thread.id} href={`/chat?thread=${thread.id}`} className="rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Text className="font-space-grotesk text-lg text-white">{thread.subject}</Text>
                      <Text className="text-xs text-white/50">{client?.name}</Text>
                      <Text className="mt-2 text-sm text-white/70 clamp-2">{thread.aiSummary}</Text>
                    </div>
                    <Badge className="rounded-full bg-[color:var(--accent-solid)]/20 text-[color:var(--accent-soft)]">
                      {thread.status === 'open' ? 'In corso' : thread.status === 'snoozed' ? 'In attesa' : 'Chiuso'}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {thread.channelMix.map((channel) => (
                      <span key={channel} className="rounded-full bg-white/5 px-3 py-1 text-white/60">
                        {channel}
                      </span>
                    ))}
                    {thread.unreadCount > 0 && <span className="rounded-full bg-[color:var(--accent-solid)]/20 px-3 py-1 text-white">{thread.unreadCount} nuovi</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="glass-panel p-6">
          <Text className="text-sm uppercase tracking-[0.3em] text-white/60">Insight in tempo reale</Text>
          <Text className="mt-2 font-space-grotesk text-2xl text-white">Sensoristica & azioni rapide</Text>
          <div className="mt-6 grid gap-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-white/70">
                <div className="flex items-center justify-between">
                  <Text className="font-space-grotesk text-lg text-white">{reservation.iot.room}</Text>
                  <Text className="text-xs text-white/50">{reservation.status}</Text>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.3em] text-white/40 md:grid-cols-4">
                  <MetricCard label="Temp" value={`${reservation.iot.temperature}°C`} />
                  <MetricCard label="Umidità" value={`${reservation.iot.humidity}%`} />
                  <MetricCard label="Minibar" value={reservation.iot.minibarRestock.toUpperCase()} />
                  <MetricCard label="Luci" value={reservation.iot.lightsOn ? 'ON' : 'OFF'} />
                </div>
                <Text className="text-xs text-white/50">Next: {reservation.nextAction}</Text>
                <HStack className="items-center gap-3">
                  {reservation.addOns.map((addon) => (
                    <span key={addon} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/60">
                      {addon}
                    </span>
                  ))}
                </HStack>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel p-6">
        <HStack className="items-start justify-between">
          <div>
            <Text className="text-sm uppercase tracking-[0.3em] text-white/60">Laboratorio di cura</Text>
            <Text className="mt-2 font-space-grotesk text-2xl text-white">Azioni suggerite</Text>
          </div>
          <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
            Apri Control Room
          </Button>
        </HStack>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <SuggestionCard
            icon={Rocket}
            title="Sblocco upgrade spa"
            description="Proponi pacchetto Romance Plus a chi prenota anniversario con spesa > €1000."
          />
          <SuggestionCard
            icon={PlugZap}
            title="Reset luci smart"
            description="Suite 802 segnala luci spente da 24h: attiva atmosfera soft prima dell’arrivo."
          />
          <SuggestionCard
            icon={TrendingUp}
            title="Upsell kids club"
            description="Famiglie in soggiorno ricevono suggerimento dinamico per attività pomeridiane."
          />
        </div>
      </section>
    </div>
  );
}

function MetricPill({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <HStack className="items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
      <Icon as={icon} size="sm" color="rgba(255,255,255,0.7)" />
      <span>{label}</span>
      <span className="font-space-grotesk text-white">{value}</span>
    </HStack>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white">
      <Text className="text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</Text>
      <Text className="mt-1 font-space-grotesk text-lg text-white">{value}</Text>
    </div>
  );
}

function SuggestionCard({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-5 text-white/70 transition hover:-translate-y-2">
      <Box className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
        <Icon as={icon} size="sm" color="rgba(255,255,255,0.8)" />
        <span>AI suggerisce</span>
      </Box>
      <Text className="font-space-grotesk text-xl text-white">{title}</Text>
      <Text className="mt-2 text-sm text-white/70">{description}</Text>
      <Button className="mt-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
        Applica in 1 click
      </Button>
    </div>
  );
}
