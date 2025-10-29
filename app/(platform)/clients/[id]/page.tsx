import { notFound } from 'next/navigation';
import { GlassCard } from '@/components/common/GlassCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { IoTStatusCard } from '@/components/common/IoTStatusCard';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import Link from 'next/link';
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { guests, bookings, templates } from '@/lib/mock-data';
import { palette } from '@/theme/palette';
import { Sparkles, Mail, CalendarPlus, FileText } from 'lucide-react-native';

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const guest = guests.find((item) => item.id === params.id);
  if (!guest) {
    notFound();
  }
  const guestBookings = bookings.filter((booking) => booking.guestId === guest.id);

  return (
    <VStack className="gap-8">
      <GlassCard className="gap-6 border-white/10 bg-white/5">
        <SectionHeader
          title={guest.name}
          subtitle={`Tier ${guest.loyaltyTier} · ${guest.stays} soggiorni`}
          action={
            <Button className="rounded-full border border-white/10 bg-white/10 px-5 py-3">
              <ButtonText className="text-sm text-white">Invia messaggio personalizzato</ButtonText>
            </Button>
          }
        />
        <HStack className="flex-col gap-4 md:flex-row">
          <VStack className="flex-1 gap-2">
            <Text className="text-sm text-slate-300">{guest.email}</Text>
            <Text className="text-sm text-slate-300">{guest.phone}</Text>
            <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Ultimo soggiorno {new Date(guest.lastStay).toLocaleDateString('it-IT')}
            </Text>
          </VStack>
          <VStack className="flex-1 gap-2">
            <Text className="text-sm text-slate-200">Automation score {guest.automationScore}</Text>
            <Text className="text-sm text-slate-200">
              Newsletter {guest.newsletter ? 'attiva' : 'non iscritta'}
            </Text>
            <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Sparkles color={palette.intent.accent} size={16} strokeWidth={1.4} />
              <Text className="text-xs text-slate-200">Genera proposta AI</Text>
            </Pressable>
          </VStack>
          <VStack className="flex-1 gap-2">
            <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">Preferenze</Text>
            <HStack className="flex-wrap gap-2">
              {guest.preferences.map((pref) => (
                <Text
                  key={pref}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300"
                >
                  {pref}
                </Text>
              ))}
            </HStack>
          </VStack>
        </HStack>
      </GlassCard>

      <HStack className="flex-col gap-6 xl:flex-row">
        <IoTStatusCard
          temperature={guest.roomTemperature}
          minibarLevel={guest.minibarLevel}
          actions={["Imposta profilo luci", "Programma aromaterapia", "Invia welcome message"]}
        />
        <GlassCard className="flex-1 gap-4 border-white/10 bg-white/5">
          <SectionHeader title="Prenotazioni collegate" subtitle="Timeline cliente" />
          <VStack className="gap-3">
            {guestBookings.map((booking) => (
              <HStack
                key={booking.id}
                className="items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <VStack className="gap-1">
                  <Text className="text-sm font-semibold text-white">{booking.roomType}</Text>
                  <Text className="text-xs text-slate-400">
                    {new Date(booking.arrival).toLocaleDateString('it-IT')} →
                    {new Date(booking.departure).toLocaleDateString('it-IT')}
                  </Text>
                </VStack>
                <HStack className="items-center gap-2">
                  <CalendarPlus color={palette.text.secondary} size={16} strokeWidth={1.3} />
                  <Text className="text-xs text-slate-300">{booking.status}</Text>
                </HStack>
                <Link
                  href={`/bookings/${booking.id}`}
                  className="flex-row items-center gap-2 rounded-full border border-white/10 px-3 py-1"
                >
                  <Text className="text-xs text-slate-200">Apri</Text>
                </Link>
              </HStack>
            ))}
          </VStack>
        </GlassCard>
      </HStack>

      <GlassCard className="gap-4 border-white/10 bg-white/5">
        <SectionHeader title="Template collegati" subtitle="Comunicazioni in uso" />
        <HStack className="flex-col gap-4 lg:flex-row">
          {templates.slice(0, 2).map((template) => (
            <GlassCard key={template.id} className="flex-1 gap-3 border-white/10 bg-white/5">
              <HStack className="items-center gap-3">
                <FileText color={palette.intent.accent} size={18} strokeWidth={1.4} />
                <VStack className="gap-1">
                  <Text className="text-sm font-semibold text-white">{template.name}</Text>
                  <Text className="text-xs text-slate-400">
                    Ultima modifica {new Date(template.lastEdited).toLocaleDateString('it-IT')}
                  </Text>
                </VStack>
              </HStack>
              <Text className="text-sm text-slate-300">{template.description}</Text>
              <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                <Mail color={palette.intent.accent} size={14} strokeWidth={1.3} />
                <Text className="text-xs text-slate-200">Invia versione personalizzata</Text>
              </Pressable>
            </GlassCard>
          ))}
        </HStack>
      </GlassCard>
    </VStack>
  );
}
