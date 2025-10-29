import Link from 'next/link';
import { GlassPanel } from '@/components/app/glass-panel';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Badge, BadgeText } from '@/components/ui/badge';
import { bookings } from '@/lib/mock-data';
import { Icon } from '@/components/ui/icon';
import { CalendarCheck, MessageCircle, Bot, ArrowUpRight } from '@/components/icons';

const statusColor: Record<string, string> = {
  'pre-check-in': 'bg-info-500/20 text-info-100',
  'in-house': 'bg-success-500/20 text-success-100',
  'post-stay': 'bg-primary-500/20 text-primary-100',
  richiesta: 'bg-warning-500/20 text-warning-100',
  'attesa-pagamento': 'bg-warning-500/30 text-warning-100',
  cancellata: 'bg-error-500/20 text-error-100',
};

export default function BookingsPage() {
  return (
    <GlassPanel
      title="Prenotazioni"
      subtitle="Analizza stato, canali e automazioni legate ad ogni soggiorno."
    >
      <Box className="flex flex-col gap-5">
        {bookings.map((booking) => (
          <Box
            key={booking.id}
            className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between"
          >
            <Box className="flex flex-1 flex-col gap-2">
              <Box className="flex flex-wrap items-center gap-2">
                <Text className="text-lg font-semibold text-typography-0">
                  {booking.guestName}
                </Text>
                <Badge>
                  <BadgeText className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.35em] ${statusColor[booking.status] ?? 'bg-white/10 text-typography-300'}`}>
                    {booking.status}
                  </BadgeText>
                </Badge>
              </Box>
              <Text className="text-sm text-typography-300">
                {booking.roomType} • Camera {booking.roomNumber} • {booking.checkIn} → {booking.checkOut}
              </Text>
              <Box className="flex flex-wrap items-center gap-3 text-xs text-typography-400">
                <Box className="flex items-center gap-1">
                  <Icon as={CalendarCheck} size="sm" className="text-primary-200" />
                  <Text>{booking.channel}</Text>
                </Box>
                <Box className="flex items-center gap-1">
                  <Icon as={MessageCircle} size="sm" className="text-info-200" />
                  <Text>{booking.timeline.filter((item) => item.completed).length} / {booking.timeline.length} step completati</Text>
                </Box>
                <Box className="flex items-center gap-1">
                  <Icon as={Bot} size="sm" className="text-success-200" />
                  <Text>{booking.aiInsights}</Text>
                </Box>
              </Box>
              <Box className="mt-2 flex flex-wrap gap-2">
                {booking.outstandingActions.map((action) => (
                  <Badge key={action}>
                    <BadgeText className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-typography-300">
                      {action}
                    </BadgeText>
                  </Badge>
                ))}
              </Box>
            </Box>
            <Link
              href={`/bookings/${booking.id}`}
              className="inline-flex items-center gap-2 text-sm text-primary-200 hover:text-primary-100"
            >
              Apri dettaglio
              <ArrowUpRight size={16} color="currentColor" />
            </Link>
          </Box>
        ))}
      </Box>
    </GlassPanel>
  );
}

// Validazione: lista prenotazioni con stato timeline e insight AI per ogni card.
