import { notFound } from 'next/navigation';
import { GlassCard } from '@/components/common/GlassCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { AutomationTimeline } from '@/components/bookings/AutomationTimeline';
import { IoTStatusCard } from '@/components/common/IoTStatusCard';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { bookings, guests } from '@/lib/mock-data';
import { palette } from '@/theme/palette';
import { Mail, Sparkles, ClipboardList } from 'lucide-react-native';

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const booking = bookings.find((item) => item.id === params.id);
  if (!booking) {
    notFound();
  }
  const guest = guests.find((item) => item.id === booking.guestId);

  return (
    <VStack className="gap-8">
      <GlassCard className="gap-6 border-white/10 bg-white/5">
        <SectionHeader
          title={`Prenotazione ${booking.code}`}
          subtitle={`${booking.roomType} · ${new Date(booking.arrival).toLocaleDateString('it-IT')} → ${new Date(booking.departure).toLocaleDateString('it-IT')}`}
          action={
            <Button className="rounded-full border border-white/10 bg-white/10 px-5 py-3">
              <ButtonText className="text-sm text-white">Invia aggiornamento</ButtonText>
            </Button>
          }
        />
        <HStack className="flex-col gap-4 md:flex-row">
          <VStack className="flex-1 gap-1">
            <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">Ospite</Text>
            <Text className="text-lg font-semibold text-white">{guest?.name}</Text>
            <Text className="text-sm text-slate-300">{guest?.email}</Text>
          </VStack>
          <VStack className="flex-1 gap-1">
            <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">Stato prenotazione</Text>
            <Text className="text-sm text-slate-200">{booking.status}</Text>
            <Text className="text-sm text-slate-300">
              Saldo da incassare € {booking.outstandingBalance.toLocaleString('it-IT')}
            </Text>
          </VStack>
          <VStack className="flex-1 gap-3">
            <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Sparkles color={palette.intent.accent} size={16} strokeWidth={1.4} />
              <Text className="text-xs text-slate-200">Suggerisci upsell AI</Text>
            </Pressable>
            <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Mail color={palette.intent.accent} size={16} strokeWidth={1.4} />
              <Text className="text-xs text-slate-200">Invia promemoria</Text>
            </Pressable>
          </VStack>
        </HStack>
      </GlassCard>

      <AutomationTimeline steps={booking.automationTimeline} />

      <HStack className="flex-col gap-6 xl:flex-row">
        <IoTStatusCard
          temperature={guest?.roomTemperature ?? 21}
          minibarLevel={guest?.minibarLevel ?? 50}
          actions={["Accendi luci suite", "Pre-raffredda stanza", "Apri chat concierge"]}
        />
        <GlassCard className="flex-1 gap-4 border-white/10 bg-white/5">
          <SectionHeader
            title="Azioni collegate"
            subtitle="Template e task per questa prenotazione"
          />
          <VStack className="gap-3">
            {booking.actions.map((action) => (
              <HStack
                key={action}
                className="items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <Text className="text-sm text-slate-200">{action}</Text>
                <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                  <ClipboardList color={palette.text.secondary} size={14} strokeWidth={1.3} />
                  <Text className="text-xs text-slate-300">Apri task</Text>
                </Pressable>
              </HStack>
            ))}
          </VStack>
        </GlassCard>
      </HStack>
    </VStack>
  );
}
