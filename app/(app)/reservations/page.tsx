import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { GlassCard } from '@/components/common/glass-card';
import { PageHeader } from '@/components/common/page-header';
import { StatusPill } from '@/components/common/status-pill';
import { reservations } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CalendarClock, Filter, Search, Sparkles } from 'lucide-react-native';

const statusTone = (status: string) => {
  switch (status) {
    case 'Confermata':
      return 'success';
    case 'Richiesta':
      return 'warning';
    case 'In Soggiorno':
      return 'info';
    case 'Check-out':
      return 'neutral';
    default:
      return 'danger';
  }
};

export default function ReservationsPage() {
  return (
    <Box className="flex flex-col gap-8">
      <PageHeader
        title="Prenotazioni e percorsi"
        subtitle="Visualizza timeline, stato dei workflow e suggerimenti di azione per ogni soggiorno."
        actions={
          <Link href="/booking/new">
            <Button action="primary" size="md" className="rounded-2xl bg-primary-500 px-6 py-3">
              <Sparkles color="rgb(var(--color-typography-0))" size={18} />
              <ButtonText className="font-semibold text-typography-0">Nuova prenotazione</ButtonText>
            </Button>
          </Link>
        }
      />

      <GlassCard className="flex flex-col gap-4 bg-background-0/40 p-6">
        <Box className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Input className="flex-1 rounded-2xl border-white/10 bg-background-0/40" size="lg">
            <InputSlot>
              <InputIcon as={Search} color="rgb(var(--color-typography-400))" size={18} />
            </InputSlot>
            <InputField placeholder="Cerca cliente, codice prenotazione o canale" placeholderTextColor="rgba(226,231,245,0.6)" />
          </Input>
          <Box className="flex flex-wrap items-center gap-3">
            <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
              <Filter color="rgb(var(--color-primary-500))" size={16} />
              <ButtonText className="text-sm font-semibold text-typography-0">Filtri avanzati</ButtonText>
            </Button>
            <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
              <CalendarClock color="rgb(var(--color-primary-500))" size={16} />
              <ButtonText className="text-sm font-semibold text-typography-0">Prossimi 30 giorni</ButtonText>
            </Button>
          </Box>
        </Box>
        <Box className="flex flex-wrap gap-3 text-xs text-typography-300">
          <StatusPill label="Guardrail AI" tone="warning" />
          <StatusPill label="Workflow completato" tone="success" />
          <StatusPill label="Dispositivo IoT" tone="info" />
        </Box>
      </GlassCard>

      <Box className="flex flex-col gap-4">
        {reservations.map((reservation) => (
          <GlassCard key={reservation.id} className="bg-background-0/40" padding="p-6">
            <Box className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <Box className="gap-2">
                <Text className="text-lg font-semibold text-typography-0">{reservation.guestName}</Text>
                <Text className="text-sm text-typography-300">
                  {reservation.roomType} · {reservation.mealPlan}
                </Text>
                <Box className="flex flex-wrap gap-2 text-xs text-typography-300">
                  <StatusPill label={reservation.status} tone={statusTone(reservation.status) as any} />
                  <StatusPill label={reservation.channel} tone="info" />
                  {reservation.tags.map((tag) => (
                    <StatusPill key={tag} label={tag} tone="neutral" />
                  ))}
                </Box>
              </Box>
              <Box className="items-end text-right text-sm text-typography-300">
                <Text>
                  {formatDate(reservation.arrival)} → {formatDate(reservation.departure)} · {reservation.nights} notti
                </Text>
                <Text>{formatCurrency(reservation.amount)}</Text>
                <Text className="text-xs text-typography-400">Confidence AI {Math.round(reservation.aiConfidence * 100)}%</Text>
              </Box>
            </Box>
            <Box className="mt-6 grid gap-4 md:grid-cols-4">
              {reservation.timeline.map((step) => (
                <GlassCard key={step.id} padding="p-4" className="bg-background-0/30">
                  <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">{step.titolo}</Text>
                  <Text className="mt-2 text-sm text-typography-0">{step.descrizione}</Text>
                  <Text className="mt-2 text-xs text-typography-300">
                    {formatDate(step.scheduledAt)} · {step.channel.toUpperCase()}
                  </Text>
                  {step.guardrailReason ? (
                    <Text className="mt-2 text-xs text-warning-400">{step.guardrailReason}</Text>
                  ) : null}
                </GlassCard>
              ))}
            </Box>
            <Box className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <Text className="text-sm text-typography-300">Prossima azione: {reservation.nextAction}</Text>
              <Link href={`/reservations/${reservation.id}`}>
                <Button size="sm" action="primary" className="rounded-2xl bg-primary-500 px-4 py-2">
                  <ButtonText className="text-sm font-semibold text-typography-0">Apri dettaglio</ButtonText>
                </Button>
              </Link>
            </Box>
          </GlassCard>
        ))}
      </Box>
    </Box>
  );
}
