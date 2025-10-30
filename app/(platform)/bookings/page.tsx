import Link from 'next/link';
import { GlassCard } from '@/components/common/GlassCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { CommunicationTimeline } from '@/components/reservations/CommunicationTimeline';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { bookings, guests } from '@/lib/mock-data';
import { palette } from '@/theme/palette';
import { CalendarCheck, ArrowRight, ClipboardCheck, Mail, Sparkles } from 'lucide-react-native';

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
            <GlassCard
              key={booking.id}
              className="gap-5 border-white/10 bg-[#101924]/70 px-5 py-5"
            >
              <HStack className="flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <VStack className="flex-1 gap-2">
                  <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {booking.code} · {booking.channel}
                  </Text>
                  <Text className="text-lg font-semibold text-white">{guest?.name}</Text>
                  <Text className="text-sm text-slate-400">
                    {booking.roomType} · {new Date(booking.arrival).toLocaleDateString('it-IT')} →
                    {new Date(booking.departure).toLocaleDateString('it-IT')}
                  </Text>
                  <Text className="text-xs text-emerald-200">Ultima automazione: {booking.lastAutomation}</Text>
                  <Text className="text-xs text-slate-300">Prossima azione: {booking.nextAction}</Text>
                  <HStack className="items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                    <Sparkles color={palette.intent.accent} size={16} strokeWidth={1.4} />
                    <Text className="text-xs text-slate-200">Confidence AI {Math.round(booking.aiConfidence * 100)}%</Text>
                  </HStack>
                </VStack>

                <VStack className="flex-1 gap-3">
                  <CommunicationTimeline
                    steps={booking.automationTimeline.map((step) => ({
                      label: step.label,
                      timestamp: new Date(step.date).toLocaleDateString('it-IT'),
                      completed: step.completed,
                    }))}
                  />
                  <HStack className="flex-wrap gap-2">
                    {booking.guestPreferences.map((pref) => (
                      <Text
                        key={pref}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-slate-200"
                      >
                        {pref}
                      </Text>
                    ))}
                  </HStack>
                </VStack>

                <VStack className="w-full max-w-xs gap-3">
                  <StatusPill status={booking.status} />
                  <Text className="text-sm text-slate-300">
                    Saldo da incassare € {booking.outstandingBalance.toLocaleString('it-IT')}
                  </Text>
                  <VStack className="gap-2">
                    {booking.iotSnapshot.map((snapshot) => (
                      <HStack
                        key={snapshot.id}
                        className="items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
                      >
                        <VStack>
                          <Text className="text-xs text-slate-400">{snapshot.label}</Text>
                          <Text className="text-sm text-slate-100">{snapshot.value}</Text>
                        </VStack>
                        <Text className="text-[11px] text-emerald-200">{snapshot.status}</Text>
                      </HStack>
                    ))}
                  </VStack>
                  <VStack className="gap-2">
                    {booking.manualAlerts.map((alert) => (
                      <HStack
                        key={alert}
                        className="items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
                      >
                        <ClipboardCheck color={palette.intent.accent} size={16} strokeWidth={1.4} />
                        <Text className="text-xs text-slate-200">{alert}</Text>
                      </HStack>
                    ))}
                  </VStack>
                  <HStack className="items-center gap-2">
                    <Link
                      href={`/bookings/${booking.id}`}
                      className="flex-1 flex-row items-center justify-center gap-2 rounded-full border border-white/15 px-3 py-2"
                    >
                      <Text className="text-xs font-semibold text-white">Dettaglio</Text>
                      <ArrowRight color={palette.text.secondary} size={14} strokeWidth={1.3} />
                    </Link>
                    <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 px-3 py-2">
                      <Mail color={palette.intent.accent} size={14} strokeWidth={1.3} />
                      <Text className="text-xs text-slate-200">Follow-up</Text>
                    </Pressable>
                  </HStack>
                </VStack>
              </HStack>
            </GlassCard>
          );
        })}
      </VStack>
    </GlassCard>
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <Text
      className="w-max rounded-full border border-white/15 px-3 py-1 text-xs font-semibold"
      style={{
        backgroundColor: statusColor[status] ?? 'rgba(148,163,184,0.15)',
        color: status === 'In house' ? palette.text.positive : palette.text.secondary,
      }}
    >
      {status}
    </Text>
  );
}
