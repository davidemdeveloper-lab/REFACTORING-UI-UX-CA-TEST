import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { PageHeader } from '@/components/common/page-header';
import { StatusPill } from '@/components/common/status-pill';
import { Button, ButtonText } from '@/components/ui/button';
import { clients, reservations, newsletterSubscribers } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  CalendarClock,
  HeartHandshake,
  MailPlus,
  NotebookPen,
  PhoneCall,
  Sparkles,
} from 'lucide-react-native';

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = clients.find((cli) => cli.id === params.id);
  if (!client) {
    notFound();
  }
  const upcomingReservation = reservations.find((res) => res.id === client!.upcomingReservationId);
  const newsletterInfo = newsletterSubscribers.find((sub) => sub.id === client!.id);

  return (
    <Box className="flex flex-col gap-8">
      <PageHeader
        title={client!.fullName}
        subtitle="Profilo esperienziale completo con preferenze, note e interazioni recenti."
        actions={
          <Link href="/chat">
            <Button size="md" action="primary" className="rounded-2xl bg-primary-500 px-6 py-3">
              <Sparkles color="rgb(var(--color-typography-0))" size={18} />
              <ButtonText className="font-semibold text-typography-0">Apri chat AI</ButtonText>
            </Button>
          </Link>
        }
      />

      <GlassPanel className="grid gap-6 p-8 lg:grid-cols-[1.4fr_1fr]">
        <Box className="flex flex-col gap-4">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Informazioni principali</Text>
          <Box className="flex flex-wrap gap-2 text-xs text-typography-300">
            <StatusPill label={`Loyalty ${client!.loyaltyTier}`} tone="success" />
            <StatusPill label={`${client!.staysCount} soggiorni`} tone="neutral" />
            <StatusPill label={client!.newsletter ? 'Newsletter attiva' : 'Newsletter off'} tone={client!.newsletter ? 'info' : 'warning'} />
          </Box>
          <Text className="text-sm text-typography-300">{client!.email}</Text>
          <Text className="text-sm text-typography-300">{client!.phone}</Text>
          <Text className="text-sm text-typography-300">Origine: {client!.country}</Text>
          <Text className="text-sm text-typography-300">Valore generato: {formatCurrency(client!.totalRevenue)}</Text>
        </Box>

        <GlassCard padding="p-6" className="bg-background-0/40">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Newsletter & coinvolgimento</Text>
          <Text className="mt-2 text-sm text-typography-200">
            Status: {newsletterInfo?.status === 'attivo' ? 'Attivo' : 'In pausa'} · Ultima campagna {newsletterInfo?.lastCampaign ?? 'N/D'}
          </Text>
          <Box className="mt-4 flex flex-wrap gap-3">
            <Button size="sm" action="primary" className="rounded-2xl bg-primary-500 px-4 py-2">
              <ButtonText className="text-sm font-semibold text-typography-0">
                {client!.newsletter ? 'Disattiva newsletter' : 'Attiva newsletter'}
              </ButtonText>
            </Button>
            <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
              <MailPlus color="rgb(var(--color-primary-500))" size={16} />
              <ButtonText className="text-sm font-semibold text-typography-0">Invia messaggio personalizzato</ButtonText>
            </Button>
          </Box>
        </GlassCard>
      </GlassPanel>

      <GlassPanel className="grid gap-6 p-8 lg:grid-cols-2">
        <GlassCard padding="p-6" className="bg-background-0/30">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Preferenze note</Text>
          <Box className="mt-4 flex flex-col gap-3 text-sm text-typography-200">
            {client!.preferences.map((preference) => (
              <Box key={preference.label} className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
                <Text className="text-sm font-semibold text-typography-0">{preference.label}</Text>
                <Text className="text-xs text-typography-300">{preference.value}</Text>
              </Box>
            ))}
          </Box>
        </GlassCard>

        <GlassCard padding="p-6" className="bg-background-0/30">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Note del team</Text>
          <Box className="mt-4 flex flex-col gap-3">
            {client!.notes.map((note) => (
              <Box key={note.id} className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
                <Text className="text-xs uppercase tracking-[0.3em] text-typography-400">{note.author}</Text>
                <Text className="text-xs text-typography-300">{note.createdAt}</Text>
                <Text className="mt-2 text-sm text-typography-0">{note.content}</Text>
              </Box>
            ))}
            <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
              <NotebookPen color="rgb(var(--color-primary-500))" size={16} />
              <ButtonText className="text-sm font-semibold text-typography-0">Aggiungi nota</ButtonText>
            </Button>
          </Box>
        </GlassCard>
      </GlassPanel>

      <GlassPanel className="grid gap-6 p-8 lg:grid-cols-2">
        <GlassCard padding="p-6" className="bg-background-0/30">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Ultime conversazioni</Text>
          <Box className="mt-4 flex flex-col gap-3 text-sm text-typography-200">
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-xs text-typography-300">WhatsApp · 18 Feb 2025</Text>
              <Text className="mt-1 text-sm text-typography-0">
                "Grazie per il set romantico, potremmo avere check-out alle 14?"
              </Text>
            </Box>
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-xs text-typography-300">Email · 10 Feb 2025</Text>
              <Text className="mt-1 text-sm text-typography-0">
                Conferma prenotazione con link al portale ospite e guida esperienza.
              </Text>
            </Box>
            <Link href="/chat" className="inline-flex items-center gap-2 text-xs text-primary-400">
              <HeartHandshake color="rgb(var(--color-primary-500))" size={14} /> Apri cronologia conversazioni
            </Link>
          </Box>
        </GlassCard>

        <GlassCard padding="p-6" className="bg-background-0/30">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Prenotazioni collegate</Text>
          <Box className="mt-4 flex flex-col gap-3">
            {reservations
              .filter((reservation) => reservation.guestId === client!.id)
              .map((reservation) => (
                <Box key={reservation.id} className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
                  <Text className="text-sm font-semibold text-typography-0">{reservation.roomType}</Text>
                  <Text className="text-xs text-typography-300">
                    {formatDate(reservation.arrival)} → {formatDate(reservation.departure)} · {reservation.status}
                  </Text>
                  <Text className="text-xs text-typography-300">Importo {formatCurrency(reservation.amount)}</Text>
                  <Link
                    href={`/reservations/${reservation.id}`}
                    className="mt-2 inline-flex items-center gap-2 text-xs text-primary-400"
                  >
                    <CalendarClock color="rgb(var(--color-primary-500))" size={14} /> Vai alla prenotazione
                  </Link>
                </Box>
              ))}
          </Box>
        </GlassCard>
      </GlassPanel>

      <GlassCard className="flex flex-col gap-4 bg-background-0/40 p-6">
        <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Azioni rapide</Text>
        <Box className="flex flex-wrap gap-3">
          <Button size="sm" variant="outline" action="secondary" className="rounded-2xl border-white/20 px-4 py-2">
            <PhoneCall color="rgb(var(--color-primary-500))" size={16} />
            <ButtonText className="text-sm font-semibold text-typography-0">Programma chiamata</ButtonText>
          </Button>
          {upcomingReservation ? (
            <Link href={`/reservations/${upcomingReservation.id}`}>
              <Button size="sm" variant="outline" action="secondary" className="rounded-2xl border-white/20 px-4 py-2">
                <CalendarClock color="rgb(var(--color-primary-500))" size={16} />
                <ButtonText className="text-sm font-semibold text-typography-0">Prepara arrivo</ButtonText>
              </Button>
            </Link>
          ) : null}
        </Box>
      </GlassCard>
    </Box>
  );
}
