import Link from 'next/link';
import { GlassCard } from '@/components/common/GlassCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { Button, ButtonText } from '@/components/ui/button';
import { bookings, customerBanners, guests } from '@/lib/mock-data';
import { palette } from '@/theme/palette';
import { ArrowRight, CalendarDays, MessageSquare, Sparkles } from 'lucide-react-native';

type Booking = (typeof bookings)[number];

export default function ClientPortalPage() {
  const guest = guests[0];
  const guestBookings = bookings.filter((booking) => booking.guestId === guest.id);
  const upcoming = guestBookings.filter((booking) => new Date(booking.arrival) >= new Date());
  const past = guestBookings.filter((booking) => new Date(booking.arrival) < new Date());

  return (
    <VStack className="gap-8">
      <GlassHero guestName={guest.name} tier={guest.loyaltyTier} />

      <HStack className="flex-col gap-6 xl:flex-row">
        <BookingList title="Prossime esperienze" bookings={upcoming} emptyLabel="Nessun soggiorno futuro" />
        <BookingList title="Soggiorni passati" bookings={past} emptyLabel="Scopri lo storico delle tue visite" />
      </HStack>

      <GlassCard className="gap-6 border-white/10 bg-white/5">
        <SectionHeader
          title="Chat concierge"
          subtitle="Parla con l'assistente AI o con il team quando preferisci"
          action={
            <Link href="/chat" className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Text className="text-sm text-white">Apri conversazioni</Text>
            </Link>
          }
        />
        <HStack className="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <VStack className="gap-3">
            <Text className="text-sm text-slate-300">
              L'AI propone risposte smart, puoi sempre intervenire manualmente. Notifiche in tempo reale in caso di
              necessità del team.
            </Text>
            <HStack className="items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <MessageSquare color={palette.intent.accent} size={16} strokeWidth={1.4} />
              <Text className="text-xs text-slate-200">Badge WhatsApp per riconoscere il canale di origine</Text>
            </HStack>
          </VStack>
          <Button className="rounded-full border border-white/10 bg-white/10 px-5 py-3">
            <ButtonText className="text-sm text-white">Scrivi ora</ButtonText>
          </Button>
        </HStack>
      </GlassCard>

      <GlassCard className="gap-5 border-white/10 bg-white/5">
        <SectionHeader title="Servizi personalizzati" subtitle="Attiva comfort e benefit durante il soggiorno" />
        <HStack className="flex-col gap-4 lg:flex-row">
          {customerBanners.map((banner) => (
            <VStack
              key={banner.id}
              className="flex-1 gap-3 rounded-2xl border border-white/10 bg-[#101924]/70 px-4 py-4"
            >
              <HStack className="items-center gap-2">
                <Sparkles color={palette.intent.accent} size={16} strokeWidth={1.4} />
                <Text className="text-sm font-semibold text-white">{banner.title}</Text>
              </HStack>
              <Text className="text-sm text-slate-300">{banner.description}</Text>
              <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <Text className="text-xs text-slate-200">{banner.cta}</Text>
                <ArrowRight color={palette.intent.accent} size={14} strokeWidth={1.3} />
              </Pressable>
            </VStack>
          ))}
        </HStack>
      </GlassCard>
    </VStack>
  );
}

function GlassHero({ guestName, tier }: { guestName: string; tier: string }) {
  return (
    <GlassCard className="gap-5 border-white/10 bg-gradient-to-r from-white/10 via-transparent to-white/5">
      <HStack className="items-center justify-between">
        <VStack className="gap-2">
          <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">Area cliente</Text>
          <Text className="text-2xl font-semibold text-white">Benvenuto, {guestName}</Text>
          <Text className="text-sm text-slate-300">
            Gestisci prenotazioni, preferenze e conversazioni con l'hotel in un'unica esperienza.
          </Text>
        </VStack>
        <VStack className="items-end gap-2">
          <Text className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200">{tier} member</Text>
          <HStack className="items-center gap-2">
            <CalendarDays color={palette.intent.accent} size={16} strokeWidth={1.4} />
            <Text className="text-xs text-slate-300">Storico soggiorni aggiornato automaticamente</Text>
          </HStack>
        </VStack>
      </HStack>
    </GlassCard>
  );
}

function BookingList({
  title,
  bookings,
  emptyLabel,
}: {
  title: string;
  bookings: Booking[];
  emptyLabel: string;
}) {
  return (
    <GlassCard className="flex-1 gap-4 border-white/10 bg-white/5">
      <SectionHeader title={title} subtitle="Controlla date, stati e automazioni" />
      <VStack className="gap-3">
        {bookings.length === 0 ? (
          <Text className="text-sm text-slate-300">{emptyLabel}</Text>
        ) : (
          bookings.map((booking) => (
            <VStack key={booking.id} className="gap-2 rounded-2xl border border-white/10 bg-[#101924]/70 px-4 py-3">
              <Text className="text-sm font-semibold text-white">
                {new Date(booking.arrival).toLocaleDateString('it-IT')} →{' '}
                {new Date(booking.departure).toLocaleDateString('it-IT')}
              </Text>
              <Text className="text-xs text-slate-300">{booking.roomType}</Text>
              <Text className="text-xs text-slate-400">Stato {booking.status}</Text>
              <Text className="text-xs text-emerald-200">Prossima azione: {booking.nextAction}</Text>
            </VStack>
          ))
        )}
      </VStack>
    </GlassCard>
  );
}
