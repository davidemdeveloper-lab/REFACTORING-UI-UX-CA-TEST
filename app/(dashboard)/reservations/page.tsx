import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { reservations, clients, formatCurrency } from '@/lib/data';

export default function ReservationsPage() {
  return (
    <div className="glass-panel p-6">
      <HStack className="items-start justify-between gap-4">
        <div>
          <Text className="text-sm uppercase tracking-[0.3em] text-white/60">Prenotazioni</Text>
          <Text className="mt-2 font-space-grotesk text-2xl text-white">Flussi e stati in tempo reale</Text>
          <Text className="text-xs text-white/50">Visualizza proposte, conferme e automazioni attive.</Text>
        </div>
        <HStack space="md" className="items-center">
          <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2">
            <Text className="text-xs text-white/70">Nuova proposta</Text>
          </Button>
          <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2">
            <Text className="text-xs text-white/70">Filtri avanzati</Text>
          </Button>
        </HStack>
      </HStack>

      <div className="mt-6 grid gap-4">
        {reservations.map((reservation) => {
          const client = clients.find((c) => c.id === reservation.clientId);
          return (
            <Link key={reservation.id} href={`/reservations/${reservation.id}`} className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <Text className="font-space-grotesk text-xl text-white">{reservation.code}</Text>
                  <Text className="text-xs text-white/50">{reservation.checkIn} → {reservation.checkOut}</Text>
                  <Text className="mt-3 text-sm text-white/70">
                    {client?.name} • {reservation.roomType} • {reservation.guests} ospiti
                  </Text>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="rounded-full bg-[color:var(--accent-solid)]/20">
                    <Text className="text-[color:var(--accent-soft)]">{reservation.status.toUpperCase()}</Text>
                  </Badge>
                  <Box className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    <Text className="text-xs uppercase tracking-[0.3em] text-white/60">{reservation.type}</Text>
                  </Box>
                </div>
                <div className="text-right text-sm text-white/70">
                  <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Valore</Text>
                  <Text className="font-space-grotesk text-xl text-white">{formatCurrency(reservation.total)}</Text>
                  <Text className="text-xs text-white/40">Ultimo update {reservation.lastInteraction}</Text>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {reservation.aiHighlights.map((highlight) => (
                  <Box key={highlight} className="rounded-full border border-white/10 bg-white/5 px-4 py-1">
                    <Text className="text-xs text-white/60">{highlight}</Text>
                  </Box>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
