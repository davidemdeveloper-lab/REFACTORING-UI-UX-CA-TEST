import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { guests, bookings, newsletterSubscribers } from '@/lib/mock-data';

export default function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const guest = guests.find((item) => item.id === params.id);

  if (!guest) {
    return notFound();
  }

  const guestBookings = bookings.filter((booking) => booking.guestId === guest.id);
  const newsletterStatus = newsletterSubscribers.find((item) => item.guestId === guest.id);

  return (
    <VStack space="lg" className="pb-16">
      <HStack className="flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <Box>
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Cliente</Text>
          <Text className="mt-2 text-3xl font-semibold text-primary-900">{guest.name}</Text>
          <Text className="mt-2 text-sm text-typography-500">
            Loyalty score {guest.loyaltyScore}/100 • {guest.stays} soggiorni • Spesa media €{guest.averageSpend}
          </Text>
          <HStack className="mt-3 flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-primary-700">
            {guest.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-primary-200/60 bg-primary-50/60 px-3 py-1">
                {tag}
              </span>
            ))}
          </HStack>
        </Box>
        <HStack space="md" className="flex-wrap">
          <Link href={`/chat?guest=${guest.id}`} className="rounded-full border border-primary-200/60 px-4 py-2 text-xs font-semibold text-primary-700">
            Apri conversazione
          </Link>
          <button className="rounded-full border border-primary-200/60 px-4 py-2 text-xs font-semibold text-primary-700">
            Invia sorpresa personalizzata
          </button>
        </HStack>
      </HStack>

      <HStack className="flex-col gap-6 lg:flex-row">
        <Box className="glass-panel flex-1 rounded-3xl px-7 py-6">
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Contatti</Text>
          <VStack space="sm" className="mt-3 text-sm text-typography-500">
            <Text>{guest.email}</Text>
            <Text>{guest.phone}</Text>
            <Text>Compagni di viaggio: {guest.travelCompanions.join(', ')}</Text>
            <Text>Documenti salvati: {guest.documents.length}</Text>
          </VStack>
          <Divider className="my-4 border-white/15" />
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Newsletter</Text>
          <Text className="mt-2 text-sm text-typography-500">
            {guest.newsletter ? 'Iscritto' : 'Non iscritto'} — Ultimo contatto{' '}
            {newsletterStatus?.lastInteraction ?? 'n.d.'}
          </Text>
          <HStack className="mt-3 flex-wrap gap-2">
            {newsletterStatus?.topics.map((topic) => (
              <span key={topic} className="rounded-full border border-primary-200/60 bg-primary-50/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary-700">
                {topic}
              </span>
            ))}
          </HStack>
          <Link href="/newsletter" className="mt-4 inline-block text-xs font-semibold text-primary-600">
            Aggiorna preferenze newsletter →
          </Link>
        </Box>

        <Box className="glass-panel flex-1 rounded-3xl px-7 py-6">
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Note concierge</Text>
          <Text className="mt-3 text-sm text-typography-500">{guest.conciergeNotes}</Text>
          <Box className="mt-4 rounded-2xl border border-primary-100/60 bg-primary-50/60 px-5 py-4 text-xs text-primary-700">
            Suggerimento AI: proporre un welcome kit con vini locali e voucher spa serale.
          </Box>
          <button className="mt-4 rounded-full border border-primary-200/60 px-4 py-2 text-xs font-semibold text-primary-700">
            Aggiungi nota rapida
          </button>
        </Box>
      </HStack>

      <Box className="glass-panel rounded-3xl px-7 py-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Preferenze</Text>
        <Box className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guest.preferences.map((pref) => (
            <Box key={pref.title} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
              <Text className="text-sm font-semibold text-primary-900">{pref.title}</Text>
              <Text className="mt-2 text-xs text-typography-500">{pref.details}</Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="glass-panel rounded-3xl px-7 py-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Storico prenotazioni</Text>
        <VStack space="md" className="mt-4">
          {guestBookings.map((booking) => (
            <HStack key={booking.id} className="items-start justify-between rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
              <Box>
                <Text className="text-sm font-semibold text-primary-900">{booking.reference}</Text>
                <Text className="text-xs uppercase tracking-[0.2em] text-primary-600/70">
                  {booking.stayPeriod} • {booking.status}
                </Text>
                <Text className="mt-2 text-xs text-typography-500">Ultimo aggiornamento {booking.createdAt}</Text>
              </Box>
              <Link href={`/bookings/${booking.id}`} className="text-xs font-semibold text-primary-600">
                Vai al dettaglio →
              </Link>
            </HStack>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
}

