import Link from 'next/link';
import { GlassCard } from '@/components/common/GlassCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { bookings, guests } from '@/lib/mock-data';
import { palette } from '@/theme/palette';
import { CalendarCheck, ArrowRight, Mail } from 'lucide-react-native';

const statusColor: Record<string, string> = {
  'In house': 'rgba(125, 248, 198, 0.25)',
  'Pre check-in': 'rgba(148, 163, 184, 0.25)',
};

export default function BookingsPage() {
  return (
    <GlassCard className="gap-6 border-white/10 bg-white/5">
      <SectionHeader
        title="Lista prenotazioni"
        subtitle="Gestisci timeline comunicativa e stati"
        action={
          <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <CalendarCheck color={palette.intent.accent} size={18} strokeWidth={1.5} />
            <Text className="text-sm text-white">Nuova prenotazione</Text>
          </Pressable>
        }
      />
      <VStack className="gap-4">
        {bookings.map((booking) => {
          const guest = guests.find((item) => item.id === booking.guestId);
          return (
            <HStack
              key={booking.id}
              className="items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
            >
              <VStack className="gap-2">
                <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Codice {booking.code} · {booking.channel}
                </Text>
                <Text className="text-lg font-semibold text-white">{guest?.name}</Text>
                <Text className="text-sm text-slate-400">
                  {booking.roomType} · {new Date(booking.arrival).toLocaleDateString('it-IT')} →
                  {new Date(booking.departure).toLocaleDateString('it-IT')}
                </Text>
                <HStack className="flex-wrap gap-2">
                  {booking.automationTimeline.map((step) => (
                    <Text
                      key={step.id}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300"
                      style={{
                        backgroundColor: step.completed
                          ? 'rgba(125, 248, 198, 0.25)'
                          : 'rgba(148, 163, 184, 0.12)',
                        color: step.completed ? palette.text.positive : palette.text.secondary,
                      }}
                    >
                      {step.label}
                    </Text>
                  ))}
                </HStack>
              </VStack>
              <VStack className="items-end gap-3">
                <Text
                  className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: statusColor[booking.status] ?? 'rgba(148,163,184,0.15)',
                    color:
                      booking.status === 'In house'
                        ? palette.text.positive
                        : palette.text.secondary,
                  }}
                >
                  {booking.status}
                </Text>
                <Text className="text-sm text-slate-300">
                  Saldo da incassare € {booking.outstandingBalance.toLocaleString('it-IT')}
                </Text>
                <Link
                  href={`/bookings/${booking.id}`}
                  className="flex-row items-center gap-2 rounded-full border border-white/15 px-3 py-2"
                >
                  <Text className="text-xs font-semibold text-white">Dettaglio</Text>
                  <ArrowRight color={palette.text.secondary} size={14} strokeWidth={1.3} />
                </Link>
                <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 px-3 py-2">
                  <Mail color={palette.intent.accent} size={14} strokeWidth={1.3} />
                  <Text className="text-xs text-slate-200">Invia follow-up</Text>
                </Pressable>
              </VStack>
            </HStack>
          );
        })}
      </VStack>
    </GlassCard>
  );
}
