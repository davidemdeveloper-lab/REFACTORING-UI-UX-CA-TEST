import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { PageHeader } from '@/components/common/page-header';
import { StatusPill } from '@/components/common/status-pill';
import { Button, ButtonText } from '@/components/ui/button';
import { reservations, clients } from '@/lib/mock-data';
import { formatCurrency, formatDate, formatTime } from '@/lib/utils';
import {
  ArrowRight,
  Bot,
  CalendarClock,
  ExternalLink,
  Flame,
  GaugeCircle,
  MessageCircle,
  NotebookPen,
  Sparkles,
} from 'lucide-react-native';

export default function ReservationDetailPage({ params }: { params: { id: string } }) {
  const reservation = reservations.find((res) => res.id === params.id);
  if (!reservation) {
    notFound();
  }
  const client = clients.find((cli) => cli.id === reservation!.guestId);

  return (
    <Box className="flex flex-col gap-8">
      <PageHeader
        title={`Prenotazione ${reservation!.codice}`}
        subtitle="Visione completa del soggiorno, con timeline, preferenze e dispositivi connessi."
        actions={
          <Link href={`/booking/new?prefill=${reservation!.guestId}`}>
            <Button action="primary" size="md" className="rounded-2xl bg-primary-500 px-6 py-3">
              <Sparkles color="rgb(var(--color-typography-0))" size={18} />
              <ButtonText className="font-semibold text-typography-0">Duplica proposta</ButtonText>
            </Button>
          </Link>
        }
      />

      <GlassPanel className="grid gap-6 p-8 md:grid-cols-[1.8fr_1fr]">
        <Box className="flex flex-col gap-4">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Dettaglio soggiorno</Text>
          <Text className="text-3xl font-semibold text-typography-0">{reservation!.guestName}</Text>
          <Box className="flex flex-wrap gap-2 text-xs text-typography-300">
            <StatusPill label={reservation!.status} tone="info" />
            <StatusPill label={reservation!.channel} tone="neutral" />
            <StatusPill
              label={`AI ${Math.round(reservation!.aiConfidence * 100)}%`}
              tone={reservation!.aiConfidence > 0.8 ? 'success' : 'warning'}
            />
            {reservation!.tags.map((tag) => (
              <StatusPill key={tag} label={tag} tone="neutral" />
            ))}
          </Box>
          <Box className="grid gap-4 sm:grid-cols-2">
            <GlassCard padding="p-4" className="bg-background-0/40">
              <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Periodo</Text>
              <Text className="mt-1 text-sm text-typography-0">
                {formatDate(reservation!.arrival)} → {formatDate(reservation!.departure)}
              </Text>
              <Text className="text-xs text-typography-300">{reservation!.nights} notti · {reservation!.people} ospiti</Text>
            </GlassCard>
            <GlassCard padding="p-4" className="bg-background-0/40">
              <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Camera</Text>
              <Text className="mt-1 text-sm text-typography-0">{reservation!.roomType}</Text>
              <Text className="text-xs text-typography-300">{reservation!.mealPlan}</Text>
            </GlassCard>
            <GlassCard padding="p-4" className="bg-background-0/40">
              <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Importo</Text>
              <Text className="mt-1 text-lg font-semibold text-typography-0">{formatCurrency(reservation!.amount)}</Text>
              <Text className="text-xs text-typography-300">Pagamento online confermato</Text>
            </GlassCard>
            <GlassCard padding="p-4" className="bg-background-0/40">
              <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Prossima azione</Text>
              <Text className="mt-1 text-sm text-typography-0">{reservation!.nextAction}</Text>
              <Link href="/chat" className="mt-2 inline-flex items-center gap-2 text-xs text-primary-400">
                <MessageCircle color="rgb(var(--color-primary-500))" size={14} /> Contatta l'ospite
              </Link>
            </GlassCard>
          </Box>
        </Box>

        <GlassCard padding="p-6" className="h-full bg-background-0/40">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Anagrafica cliente</Text>
          <Text className="mt-2 text-lg font-semibold text-typography-0">{client?.fullName}</Text>
          <Text className="text-sm text-typography-300">{client?.email}</Text>
          <Text className="text-sm text-typography-300">{client?.phone}</Text>
          <Box className="mt-4 flex flex-wrap gap-2 text-xs text-typography-300">
            <StatusPill label={`Loyalty ${client?.loyaltyTier ?? 'Bronze'}`} tone="success" />
            <StatusPill label={client?.newsletter ? 'Newsletter attiva' : 'Newsletter off'} tone={client?.newsletter ? 'info' : 'warning'} />
          </Box>
          <Link href={`/clients/${client?.id ?? ''}`} className="mt-4 inline-flex items-center gap-2 text-xs text-primary-400">
            <NotebookPen color="rgb(var(--color-primary-500))" size={14} /> Apri profilo cliente
          </Link>
        </GlassCard>
      </GlassPanel>

      <GlassPanel className="grid gap-6 p-8 lg:grid-cols-[1.6fr_1fr]">
        <Box className="flex flex-col gap-4">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Timeline workflow</Text>
          <Box className="flex flex-col gap-4">
            {reservation!.timeline.map((step) => (
              <GlassCard key={step.id} padding="p-5" className="bg-background-0/30">
                <Box className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <Box>
                    <Text className="text-sm font-semibold text-typography-0">{step.titolo}</Text>
                    <Text className="text-xs text-typography-300">{step.descrizione}</Text>
                  </Box>
                  <Box className="items-end text-right text-xs text-typography-300">
                    <Text>{formatDate(step.scheduledAt)} · {formatTime(step.scheduledAt)}</Text>
                    <Text>{step.channel.toUpperCase()}</Text>
                  </Box>
                </Box>
                <Box className="mt-3 flex flex-wrap gap-2 text-xs text-typography-300">
                  <StatusPill label={step.status} tone={step.status === 'completato' ? 'success' : step.status === 'in_corso' ? 'info' : 'warning'} />
                  {step.guardrailReason ? (
                    <StatusPill label="Richiede supervisione" tone="warning" />
                  ) : null}
                  {typeof step.aiConfidence === 'number' ? (
                    <StatusPill label={`AI ${Math.round(step.aiConfidence * 100)}%`} tone="neutral" />
                  ) : null}
                </Box>
                {step.guardrailReason ? (
                  <Text className="mt-2 text-xs text-warning-400">Motivo guardrail: {step.guardrailReason}</Text>
                ) : null}
              </GlassCard>
            ))}
          </Box>
        </Box>

        <Box className="flex flex-col gap-6">
          <GlassCard padding="p-5" className="bg-background-0/40">
            <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Stato camera IoT</Text>
            <Box className="mt-3 flex flex-col gap-3 text-sm text-typography-200">
              <Box className="flex items-center justify-between">
                <Text>Temperatura</Text>
                <Text>{reservation!.iotSnapshot.temperature}°C</Text>
              </Box>
              <Box className="flex items-center justify-between">
                <Text>Umidità</Text>
                <Text>{reservation!.iotSnapshot.humidity}%</Text>
              </Box>
              <Box className="flex items-center justify-between">
                <Text>Qualità aria</Text>
                <Text>{reservation!.iotSnapshot.airQuality} AQI</Text>
              </Box>
              <Box className="flex items-center justify-between">
                <Text>Minibar</Text>
                <Text>{reservation!.iotSnapshot.minibar}%</Text>
              </Box>
              <Box className="flex items-center justify-between">
                <Text>Luci</Text>
                <Text>{reservation!.iotSnapshot.lights}</Text>
              </Box>
              <Box className="flex items-center justify-between">
                <Text>Housekeeping</Text>
                <Text>{reservation!.iotSnapshot.cleaning}</Text>
              </Box>
            </Box>
            <Link href="/iot" className="mt-4 inline-flex items-center gap-2 text-xs text-primary-400">
              <GaugeCircle color="rgb(var(--color-primary-500))" size={14} /> Gestisci scenari stanza
            </Link>
          </GlassCard>

          <GlassCard padding="p-5" className="bg-background-0/40">
            <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Task del team</Text>
            <Box className="mt-3 flex flex-col gap-3">
              {reservation!.tasks.map((task) => (
                <Box key={task.id} className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-background-0/40 p-3">
                  <Text className="text-sm font-semibold text-typography-0">{task.label}</Text>
                  <Text className="text-xs text-typography-300">
                    {formatDate(task.dueAt)} · {formatTime(task.dueAt)} · {task.owner}
                  </Text>
                  <StatusPill
                    label={task.status.replace('_', ' ')}
                    tone={task.status === 'completato' ? 'success' : task.status === 'in_lavorazione' ? 'info' : 'warning'}
                  />
                </Box>
              ))}
            </Box>
          </GlassCard>

          <GlassCard padding="p-5" className="bg-background-0/40">
            <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Link rapidi</Text>
            <Box className="mt-3 flex flex-col gap-3 text-sm text-primary-400">
              {reservation!.externalLinks.map((link) => (
                <Link key={link.url} href={link.url} className="inline-flex items-center gap-2" target="_blank">
                  <ExternalLink color="rgb(var(--color-primary-500))" size={14} /> {link.label}
                </Link>
              ))}
            </Box>
          </GlassCard>

          <GlassCard padding="p-5" className="bg-background-0/40">
            <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Suggerimenti AI</Text>
            <Box className="mt-3 flex flex-col gap-3">
              <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
                <Text className="text-sm text-typography-200">
                  "Invia messaggio di benvenuto personalizzato e proponi upgrade spa con voucher 10%."
                </Text>
              </Box>
              <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
                <Bot color="rgb(var(--color-primary-500))" size={16} />
                <ButtonText className="text-sm font-semibold text-typography-0">Genera risposta AI</ButtonText>
              </Button>
            </Box>
          </GlassCard>
        </Box>
      </GlassPanel>

      <GlassCard className="flex flex-col gap-4 bg-background-0/40 p-6">
        <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Opzioni rapide</Text>
        <Box className="flex flex-wrap gap-3">
          <Button size="sm" variant="outline" action="secondary" className="rounded-2xl border-white/20 px-4 py-2">
            <CalendarClock color="rgb(var(--color-primary-500))" size={16} />
            <ButtonText className="text-sm font-semibold text-typography-0">Invia promemoria check-in</ButtonText>
          </Button>
          <Button size="sm" variant="outline" action="secondary" className="rounded-2xl border-white/20 px-4 py-2">
            <Flame color="rgb(var(--color-primary-500))" size={16} />
            <ButtonText className="text-sm font-semibold text-typography-0">Offerta Spa express</ButtonText>
          </Button>
          <Button size="sm" variant="outline" action="secondary" className="rounded-2xl border-white/20 px-4 py-2">
            <ArrowRight color="rgb(var(--color-primary-500))" size={16} />
            <ButtonText className="text-sm font-semibold text-typography-0">Richiedi recensione</ButtonText>
          </Button>
        </Box>
      </GlassCard>
    </Box>
  );
}
