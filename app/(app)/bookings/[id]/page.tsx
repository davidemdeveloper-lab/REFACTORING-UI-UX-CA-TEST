import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GlassPanel } from '@/components/app/glass-panel';
import { CommunicationTimeline } from '@/components/app/communication-timeline';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { bookings, clients } from '@/lib/mock-data';
import {
  CalendarCheck,
  Clock4,
  Bot,
  Send,
  Thermometer,
  Droplets,
  Sparkles,
  MessageSquareMore,
} from '@/components/icons';

const statusColor: Record<string, string> = {
  'pre-check-in': 'bg-info-500/20 text-info-100',
  'in-house': 'bg-success-500/20 text-success-100',
  'post-stay': 'bg-primary-500/20 text-primary-100',
  richiesta: 'bg-warning-500/20 text-warning-100',
  'attesa-pagamento': 'bg-warning-500/30 text-warning-100',
  cancellata: 'bg-error-500/20 text-error-100',
};

export default function BookingDetail({ params }: { params: { id: string } }) {
  const booking = bookings.find((item) => item.id === params.id);
  if (!booking) {
    notFound();
  }
  const client = clients.find((item) => item.id === booking.clientId);

  return (
    <Box className="flex flex-col gap-8">
      <GlassPanel
        title={booking.guestName}
        subtitle={`${booking.roomType} • ${booking.checkIn} → ${booking.checkOut}`}
      >
        <Box className="flex flex-wrap items-center gap-3 text-xs text-typography-200">
          <Badge>
            <BadgeText className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.35em] ${statusColor[booking.status] ?? 'bg-white/10 text-typography-300'}`}>
              {booking.status}
            </BadgeText>
          </Badge>
          <Box className="flex items-center gap-2">
            <Icon as={CalendarCheck} size="sm" className="text-primary-200" />
            <Text>{booking.channel}</Text>
          </Box>
          <Box className="flex items-center gap-2">
            <Icon as={Clock4} size="sm" className="text-info-200" />
            <Text>{booking.timeline.filter((item) => item.completed).length} / {booking.timeline.length} rituali completati</Text>
          </Box>
          <Box className="flex items-center gap-2">
            <Icon as={Bot} size="sm" className="text-success-200" />
            <Text>{booking.aiInsights}</Text>
          </Box>
        </Box>
      </GlassPanel>

      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassPanel
          title="Timeline di cura"
          subtitle="Ogni tocco racconta il percorso emotivo con template e canali collegati."
          className="lg:col-span-2"
        >
          <CommunicationTimeline events={booking.timeline} />
        </GlassPanel>
        <GlassPanel title="Comfort stanza" subtitle="Dispositivi e dettagli già sincronizzati per il benessere.">
          <Box className="flex flex-col gap-3 text-sm text-typography-100">
            <Box className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              <Icon as={Thermometer} size="sm" className="text-warning-200" />
              <Text>Temperatura impostata a 21°C</Text>
            </Box>
            <Box className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              <Icon as={Droplets} size="sm" className="text-info-200" />
              <Text>Minibar allineato al profilo al 76%</Text>
            </Box>
            <Box className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              <Icon as={Sparkles} size="sm" className="text-primary-200" />
              <Text>Luci scenografiche pronte per check-in esperienziale</Text>
            </Box>
          </Box>
        </GlassPanel>
      </Box>

      <GlassPanel title="Gesti consigliati" subtitle="Automazioni e follow-up per far sentire l'ospite speciale.">
        <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Box className="rounded-3xl border border-white/10 bg-black/35 px-5 py-4 backdrop-blur-2xl">
            <Text className="text-sm font-semibold text-typography-0">
              Prossime comunicazioni
            </Text>
            <Box className="mt-2 flex flex-col gap-2 text-xs text-typography-100">
              {booking.outstandingActions.map((action) => (
                <Text key={action}>• {action}</Text>
              ))}
            </Box>
            <Button action="primary" className="mt-4 bg-primary-500/40 px-4">
              <ButtonIcon as={Send} />
              <ButtonText className="text-typography-0">Invia ora</ButtonText>
            </Button>
          </Box>
          <Box className="rounded-3xl border border-white/10 bg-black/35 px-5 py-4 backdrop-blur-2xl">
            <Text className="text-sm font-semibold text-typography-0">
              Conversazioni collegate
            </Text>
            <Text className="mt-2 text-xs text-typography-200">
              L'AI segnala 1 conversazione in attesa di risposta empatica.
            </Text>
            <Link
              href={`/chat?thread=${booking.id}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-primary-200 hover:text-primary-100"
            >
              Vai alla chat
              <MessageSquareMore size={16} color="currentColor" />
            </Link>
          </Box>
        </Box>
      </GlassPanel>

      {client && (
        <GlassPanel
          title="Ritratto ospite"
          subtitle="Insight rapidi per personalizzare ulteriormente l'esperienza."
        >
          <Box className="flex flex-col gap-3 text-sm text-typography-100">
            <Text>Email: {client.email}</Text>
            <Text>Telefono: {client.phone}</Text>
            <Text>Preferenze: {client.roomPreference}</Text>
            <Link
              href={`/clients/${client.id}`}
              className="mt-2 inline-flex items-center gap-2 text-sm text-primary-200 hover:text-primary-100"
            >
              Apri profilo cliente
              <MessageSquareMore size={16} color="currentColor" />
            </Link>
          </Box>
        </GlassPanel>
      )}
    </Box>
  );
}

// Validazione: dettaglio soggiorno centrato su cura ospite, comfort stanza e gesti AI suggeriti.
