import { PageHeader } from '@/components/common/page-header';
import { StatCard } from '@/components/common/stat-card';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { StatusPill } from '@/components/common/status-pill';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { reservations, clients, chatThreads, iotWidgets, workflowBlueprints } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  ActivitySquare,
  ArrowRight,
  CalendarClock,
  GaugeCircle,
  MessageCircle,
  Sparkles,
  Wifi,
} from 'lucide-react-native';
import Link from 'next/link';

export default function DashboardPage() {
  const totalRevenue = reservations.reduce((acc, res) => acc + res.amount, 0);
  const activeWorkflows = reservations.reduce(
    (acc, res) => acc + res.timeline.filter((step) => step.status !== 'completato').length,
    0
  );
  const aiTickets = chatThreads.reduce((acc, thread) => acc + thread.aiSuggestions.length, 0);

  const upcomingReservations = reservations.slice(0, 2);
  const highlightedWorkflow = workflowBlueprints[0];

  return (
    <Box className="flex flex-col gap-10">
      <PageHeader
        title="Cruscotto esperienziale"
        subtitle="Tieni sotto controllo prenotazioni, automazioni e conversazioni. L'assistente AI ti suggerisce dove intervenire."
        actions={
          <Link href="/booking/new">
            <Button action="primary" size="md" className="rounded-2xl bg-primary-500 px-6 py-3">
              <Sparkles color="rgb(var(--color-typography-0))" size={18} />
              <ButtonText className="font-semibold text-typography-0">Nuova proposta</ButtonText>
            </Button>
          </Link>
        }
      />

      <Box className="grid gap-6 lg:grid-cols-4">
        <StatCard
          title="Valore prenotazioni"
          value={formatCurrency(totalRevenue)}
          delta="+12% rispetto alla settimana scorsa"
          trend="up"
          icon={<CalendarClock color="rgb(var(--color-primary-500))" size={22} />}
        />
        <StatCard
          title="Workflow attivi"
          value={`${activeWorkflows}`}
          delta="5 step richiedono approvazione"
          trend="stable"
          icon={<ActivitySquare color="rgb(var(--color-primary-500))" size={22} />}
        />
        <StatCard
          title="Suggerimenti AI"
          value={`${aiTickets}`}
          delta="2 in attesa del team"
          trend="down"
          icon={<MessageCircle color="rgb(var(--color-primary-500))" size={22} />}
        />
        <StatCard
          title="Comfort camere"
          value={`${Math.round(
            (iotWidgets.filter((device) => device.status === 'ok').length / iotWidgets.length) * 100
          )}%`}
          delta="Monitoraggio IoT in tempo reale"
          trend="up"
          icon={<GaugeCircle color="rgb(var(--color-primary-500))" size={22} />}
        />
      </Box>

      <Box className="grid gap-6 lg:grid-cols-[2fr_1.3fr]">
        <GlassPanel className="flex flex-col gap-6 p-8">
          <Box className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Box>
              <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Prenotazioni imminenti</Text>
              <Text className="text-2xl font-semibold text-typography-0">Azioni consigliate</Text>
            </Box>
            <Link href="/reservations">
              <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
                <ButtonText className="text-sm font-semibold text-typography-0">Vedi tutte</ButtonText>
              </Button>
            </Link>
          </Box>
          <Box className="flex flex-col gap-4">
            {upcomingReservations.map((reservation) => (
              <GlassCard key={reservation.id} className="bg-background-0/40" padding="p-5">
                <Box className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <Box className="gap-2">
                    <Text className="text-lg font-semibold text-typography-0">{reservation.guestName}</Text>
                    <Box className="flex flex-wrap gap-2 text-xs text-typography-300">
                      <StatusPill label={reservation.status} tone="info" />
                      <StatusPill label={reservation.channel} tone="neutral" />
                      <StatusPill
                        label={`AI ${Math.round(reservation.aiConfidence * 100)}%`}
                        tone={reservation.aiConfidence > 0.8 ? 'success' : 'warning'}
                      />
                    </Box>
                  </Box>
                  <Box className="items-end gap-1 text-right text-sm text-typography-300">
                    <Text>
                      {formatDate(reservation.arrival)} · {reservation.nights} notti · {reservation.people} ospiti
                    </Text>
                    <Text>{formatCurrency(reservation.amount)}</Text>
                  </Box>
                </Box>
                <Box className="mt-4 grid gap-4 md:grid-cols-3">
                  {reservation.timeline.slice(0, 3).map((step) => (
                    <Box key={step.id} className="gap-2">
                      <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">{step.titolo}</Text>
                      <Text className="text-sm text-typography-0">{step.descrizione}</Text>
                      <Text className="text-xs text-typography-300">{formatDate(step.scheduledAt)}</Text>
                    </Box>
                  ))}
                  <Link href={`/reservations/${reservation.id}`} className="md:col-span-3">
                    <Button
                      size="sm"
                      variant="outline"
                      action="secondary"
                      className="w-full rounded-2xl border-white/20 bg-background-0/40"
                    >
                      <ArrowRight color="rgb(var(--color-primary-500))" size={16} />
                      <ButtonText className="text-sm font-semibold text-typography-0">
                        Vai al dettaglio prenotazione
                      </ButtonText>
                    </Button>
                  </Link>
                </Box>
              </GlassCard>
            ))}
          </Box>
        </GlassPanel>

        <GlassPanel className="flex flex-col gap-6 p-8">
          <Box className="flex items-center justify-between">
            <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Attività assistente AI</Text>
            <StatusPill label="Live" tone="success" />
          </Box>
          <Box className="flex flex-col gap-5">
            {chatThreads.slice(0, 3).map((thread) => (
              <GlassCard key={thread.id} padding="p-5" className="bg-background-0/30">
                <Box className="flex flex-col gap-2">
                  <Box className="flex items-center justify-between">
                    <Text className="text-sm font-semibold text-typography-0">{thread.subject}</Text>
                    <StatusPill label={thread.source.toUpperCase()} tone="info" />
                  </Box>
                  <Text className="text-xs text-typography-300">
                    Ultimo messaggio {formatDate(thread.lastMessageAt)} · {thread.aiSuggestions.length} suggerimenti
                  </Text>
                  <Text className="text-sm text-typography-200">
                    "{thread.aiSuggestions[0]}"
                  </Text>
                </Box>
              </GlassCard>
            ))}
          </Box>
          <Link href="/chat">
            <Button size="sm" action="primary" className="rounded-2xl bg-primary-500 px-4 py-3">
              <MessageCircle color="rgb(var(--color-typography-0))" size={16} />
              <ButtonText className="text-sm font-semibold text-typography-0">Apri la chat unificata</ButtonText>
            </Button>
          </Link>
        </GlassPanel>
      </Box>

      <Box className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <GlassPanel className="flex flex-col gap-6 p-8">
          <Box className="flex items-center justify-between">
            <Box>
              <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Comfort e IoT</Text>
              <Text className="text-2xl font-semibold text-typography-0">Panoramica camere connesse</Text>
            </Box>
            <Link href="/iot">
              <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
                <ButtonText className="text-sm font-semibold text-typography-0">Gestisci dispositivi</ButtonText>
              </Button>
            </Link>
          </Box>
          <Box className="grid gap-4 md:grid-cols-2">
            {iotWidgets.map((device) => (
              <GlassCard key={device.id} padding="p-5" className="bg-background-0/30">
                <Box className="flex items-start justify-between">
                  <Box>
                    <Text className="text-sm font-semibold text-typography-0">{device.room}</Text>
                    <Text className="text-xs text-typography-300">{device.metric}</Text>
                  </Box>
                  <StatusPill
                    label={device.status === 'ok' ? 'Stabile' : device.status === 'warning' ? 'Attenzione' : 'Critico'}
                    tone={device.status === 'ok' ? 'success' : device.status === 'warning' ? 'warning' : 'danger'}
                  />
                </Box>
                <Box className="mt-4 flex items-baseline justify-between">
                  <Text className="text-3xl font-semibold text-typography-0">
                    {typeof device.value === 'number' ? device.value : device.value}{device.unit ? ` ${device.unit}` : ''}
                  </Text>
                  {typeof device.trend === 'number' ? (
                    <Text className={`text-sm ${device.trend > 0 ? 'text-success-400' : 'text-warning-400'}`}>
                      {device.trend > 0 ? '+' : ''}
                      {device.trend}
                      {typeof device.value === 'number' ? '%' : ''}
                    </Text>
                  ) : null}
                </Box>
              </GlassCard>
            ))}
          </Box>
        </GlassPanel>

        <GlassPanel className="flex flex-col gap-6 p-8">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Blueprint consigliato</Text>
          <Text className="text-xl font-semibold text-typography-0">{highlightedWorkflow.name}</Text>
          <Text className="text-sm text-typography-300">
            Conversione {highlightedWorkflow.conversion}% · Tempo medio {highlightedWorkflow.avgTime}
          </Text>
          <Box className="flex flex-col gap-4">
            {highlightedWorkflow.steps.map((step, index) => (
              <GlassCard key={step.name} padding="p-4" className="bg-background-0/30">
                <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Step {index + 1}</Text>
                <Text className="text-sm font-semibold text-typography-0">{step.name}</Text>
                <Text className="text-xs text-typography-300">{step.delay} · {step.channel.toUpperCase()}</Text>
              </GlassCard>
            ))}
          </Box>
          <Link href="/workflow">
            <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
              <Wifi color="rgb(var(--color-primary-500))" size={16} />
              <ButtonText className="text-sm font-semibold text-typography-0">Personalizza workflow</ButtonText>
            </Button>
          </Link>
        </GlassPanel>
      </Box>

      <GlassCard className="flex flex-col gap-4 bg-background-0/40 p-6">
        <Box className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <Box>
            <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Clienti da coccolare</Text>
            <Text className="text-lg font-semibold text-typography-0">
              {clients.filter((client) => client.newsletter).length} iscritti newsletter · {clients.length} profili attivi
            </Text>
          </Box>
          <Link href="/clients">
            <Button size="sm" action="primary" className="rounded-2xl bg-primary-500 px-4 py-2">
              <ButtonText className="text-sm font-semibold text-typography-0">Apri anagrafiche</ButtonText>
            </Button>
          </Link>
        </Box>
      </GlassCard>
    </Box>
  );
}
