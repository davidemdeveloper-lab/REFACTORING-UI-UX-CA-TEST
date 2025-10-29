import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GlassPanel } from '@/components/app/glass-panel';
import { CommunicationTimeline } from '@/components/app/communication-timeline';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { clients, bookings } from '@/lib/mock-data';
import { Sparkles, Mail, Phone, CalendarCheck, Star, Bot } from '@/components/icons';

const loyaltyColors: Record<string, string> = {
  Platinum: 'bg-primary-500/25 text-primary-100 border border-primary-500/40',
  Gold: 'bg-warning-500/25 text-warning-100 border border-warning-500/40',
  Silver: 'bg-typography-500/20 text-typography-100 border border-white/15',
  Bronze: 'bg-accent-500/20 text-accent-100 border border-accent-500/40',
};

export default function ClientDetail({ params }: { params: { id: string } }) {
  const client = clients.find((item) => item.id === params.id);
  if (!client) {
    notFound();
  }
  const relatedBookings = bookings.filter((booking) => booking.clientId === client.id);

  return (
    <Box className="flex flex-col gap-8">
      <GlassPanel title={client.name} subtitle={client.roomPreference}>
        <Box className="flex flex-wrap items-center gap-3 text-xs text-typography-300">
          <Badge className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.35em] ${loyaltyColors[client.loyaltyLevel] ?? 'bg-white/10 text-typography-200'}`}>
            {client.loyaltyLevel}
          </Badge>
          {client.vip && (
            <Badge className="rounded-full bg-primary-500/30 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-primary-100">
              VIP
            </Badge>
          )}
          <Box className="flex items-center gap-2">
            <Icon as={Mail} size="sm" className="text-primary-200" />
            <Text>{client.email}</Text>
          </Box>
          <Box className="flex items-center gap-2">
            <Icon as={Phone} size="sm" className="text-success-200" />
            <Text>{client.phone}</Text>
          </Box>
          <Box className="flex items-center gap-2">
            <Icon as={CalendarCheck} size="sm" className="text-info-200" />
            <Text>{client.staysCount} soggiorni registrati</Text>
          </Box>
        </Box>
      </GlassPanel>

      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassPanel
          title="Cronologia comunicazioni"
          subtitle="Ogni contatto collega template e canali intelligenti."
          className="lg:col-span-2"
        >
          <CommunicationTimeline events={client.timeline} />
        </GlassPanel>
        <GlassPanel title="Insight AI" subtitle="Suggerimenti per il prossimo soggiorno.">
          <Box className="flex flex-col gap-3 text-sm text-typography-300">
            <Box className="rounded-3xl border border-white/10 bg-black/20 px-4 py-3">
              <Text className="text-sm font-semibold text-typography-0">
                Proposte consigliate
              </Text>
              <Text className="mt-2 text-xs text-typography-300">
                L'AI suggerisce pacchetto golf + transfer privato per il prossimo weekend.
              </Text>
              <Button action="primary" className="mt-3 bg-primary-500/30 px-4">
                <ButtonIcon as={Sparkles} />
                <ButtonText className="text-typography-0">Crea proposta</ButtonText>
              </Button>
            </Box>
            <Box className="rounded-3xl border border-white/10 bg-black/20 px-4 py-3">
              <Text className="text-sm font-semibold text-typography-0">
                Valutazioni
              </Text>
              <Text className="mt-2 text-xs text-typography-300">
                Ultima recensione 5/5 con menzione speciale per il servizio concierge.
              </Text>
            </Box>
          </Box>
        </GlassPanel>
      </Box>

      <GlassPanel title="Prenotazioni collegate" subtitle="Stato attuale e storico recente.">
        <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {relatedBookings.map((booking) => (
            <Box
              key={booking.id}
              className="rounded-3xl border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl"
            >
              <Text className="text-base font-semibold text-typography-0">
                {booking.roomType}
              </Text>
              <Text className="text-xs text-typography-300">
                {booking.checkIn} → {booking.checkOut}
              </Text>
              <Text className="mt-2 text-xs text-typography-400">{booking.aiInsights}</Text>
              <Link
                href={`/bookings/${booking.id}`}
                className="mt-3 inline-flex items-center gap-2 text-sm text-primary-200 hover:text-primary-100"
              >
                Vai al dettaglio prenotazione
                <Star size={14} color="currentColor" />
              </Link>
            </Box>
          ))}
        </Box>
      </GlassPanel>

      <GlassPanel title="Preferenze & tag" subtitle="Gestisci automazioni e segmenti personalizzati.">
        <Box className="flex flex-wrap gap-2">
          {client.tags.map((tag) => (
            <Badge key={tag} className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-typography-300">
              {tag}
            </Badge>
          ))}
        </Box>
        <Button variant="outline" action="secondary" className="mt-4 border-white/15 px-4">
          <ButtonIcon as={Bot} />
          <ButtonText className="text-typography-100">Genera nuova automazione</ButtonText>
        </Button>
      </GlassPanel>
    </Box>
  );
}

// Validazione: dettaglio cliente con timeline comunicativa, suggerimenti AI e collegamenti prenotazioni.
