import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import {
  chatThreads,
  formatCurrency,
  getClientById,
  getReservationsForClient,
} from '@/lib/data';
import { ArrowLeft, Mail, MessageCircle, Phone, Send, Share2, Sparkles } from 'lucide-react-native';

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = getClientById(params.id);
  if (!client) {
    notFound();
  }

  const clientReservations = getReservationsForClient(client.id);
  const threads = chatThreads.filter((thread) => thread.clientId === client.id);

  return (
    <div className="grid gap-8">
      <div className="flex items-center justify-between">
        <Link href="/clients" className="inline-flex items-center gap-2 text-xs text-white/60">
          <Icon as={ArrowLeft} size="sm" color="rgba(255,255,255,0.6)" /> Torna alla lista clienti
        </Link>
        <HStack space="md">
          <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
            Condividi scheda
          </Button>
          <Button className="rounded-full bg-[color:var(--accent-solid)] px-4 py-2 text-xs text-background-950">
            Avvia proposta
          </Button>
        </HStack>
      </div>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="glass-panel p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <HStack className="items-center gap-4">
              <Box className="h-16 w-16 rounded-3xl bg-[color:var(--accent-solid)]/20" />
              <div>
                <Text className="font-space-grotesk text-3xl text-white">{client.name}</Text>
                <Text className="text-xs text-white/50">{client.loyaltyTier} • {client.totalStays} soggiorni</Text>
              </div>
            </HStack>
            <HStack className="items-center gap-3 text-xs text-white/60">
              <span className="inline-flex items-center gap-2">
                <Icon as={Mail} size="sm" color="rgba(255,255,255,0.6)" />
                {client.email}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon as={Phone} size="sm" color="rgba(255,255,255,0.6)" />
                {client.phone}
              </span>
            </HStack>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <InfoCard title="Valore generato" value={formatCurrency(clientReservations.reduce((acc, res) => acc + res.total, 0))} />
            <InfoCard title="Ultimo soggiorno" value={client.lastStay} />
            <InfoCard title="Feedback" value={`${client.lastFeedbackScore}/10`} />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/70">
              <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Preferenze principali</Text>
              <ul className="mt-3 space-y-2 text-sm">
                {client.preferences.map((pref) => (
                  <li key={pref}>• {pref}</li>
                ))}
              </ul>
              <Button className="mt-4 w-full rounded-full border border-white/20 bg-white/5 py-2 text-xs text-white/70">
                Aggiorna preferenze
              </Button>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/70">
              <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Note di accoglienza</Text>
              <Text className="mt-3 text-sm text-white/80">{client.vipNotes}</Text>
              <Button className="mt-4 w-full rounded-full border border-white/20 bg-white/5 py-2 text-xs text-white/70">
                Aggiungi nota
              </Button>
            </div>
          </div>
        </div>
        <div className="glass-panel flex flex-col gap-4 p-6">
          <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Azioni veloci</Text>
          <QuickAction icon={MessageCircle} label="Invia messaggio personalizzato" />
          <QuickAction icon={Send} label="Invia email proposta" />
          <QuickAction icon={Share2} label="Apri prenotazione Booking.com" />
          <QuickAction icon={Sparkles} label="Genera bozza AI" />
          <Badge className={`mt-4 w-full justify-center rounded-full ${
            client.newsletterOptIn
              ? 'bg-[color:var(--accent-solid)]/20 text-[color:var(--accent-soft)]'
              : 'bg-white/5 text-white/60'
          }`}>
            Newsletter {client.newsletterOptIn ? 'attiva' : 'non attiva'}
          </Badge>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel p-6">
          <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Prenotazioni collegate</Text>
          <div className="mt-4 grid gap-4">
            {clientReservations.map((reservation) => (
              <Link key={reservation.id} href={`/reservations/${reservation.id}`} className="rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <Text className="font-space-grotesk text-lg text-white">{reservation.code}</Text>
                    <Text className="text-xs text-white/60">{reservation.checkIn} → {reservation.checkOut}</Text>
                    <Text className="mt-2 text-sm text-white/70 clamp-2">{reservation.aiHighlights.join(' • ')}</Text>
                  </div>
                  <Badge className="rounded-full bg-[color:var(--accent-solid)]/20 text-[color:var(--accent-soft)]">
                    {reservation.status.toUpperCase()}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="glass-panel p-6">
          <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Conversazioni</Text>
          <div className="mt-4 grid gap-4">
            {threads.map((thread) => (
              <Link key={thread.id} href={`/chat?thread=${thread.id}`} className="rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                <Text className="font-space-grotesk text-lg text-white">{thread.subject}</Text>
                <Text className="text-xs text-white/60">{thread.status === 'open' ? 'In corso' : thread.status === 'resolved' ? 'Risolto' : 'In attesa'}</Text>
                <Text className="mt-2 text-sm text-white/70 clamp-2">{thread.aiSummary}</Text>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-white">
      <Text className="text-xs uppercase tracking-[0.3em] text-white/50">{title}</Text>
      <Text className="mt-3 font-space-grotesk text-2xl text-white">{value}</Text>
    </div>
  );
}

function QuickAction({ icon, label }: { icon: any; label: string }) {
  return (
    <Button className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
      <span className="inline-flex items-center gap-2">
        <Icon as={icon} size="sm" color="rgba(255,255,255,0.7)" />
        {label}
      </span>
      <Icon as={ArrowLeft} size="xs" color="rgba(255,255,255,0.3)" className="rotate-180" />
    </Button>
  );
}
