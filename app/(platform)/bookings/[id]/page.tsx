import { useState } from 'react';
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
import { AlertCircle, Bug, ClipboardList, Mail, Sparkles } from 'lucide-react-native';

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const booking = bookings.find((item) => item.id === params.id);
  if (!booking) {
    notFound();
  }
  const guest = guests.find((item) => item.id === booking.guestId);
  const [debugMode, setDebugMode] = useState(false);

  return (
    <VStack className="gap-8">
      <GlassCard className="gap-6 border-white/10 bg-white/5">
        <SectionHeader
          title={`Prenotazione ${booking.code}`}
          subtitle={`${booking.roomType} · ${new Date(booking.arrival).toLocaleDateString('it-IT')} → ${new Date(
            booking.departure,
          ).toLocaleDateString('it-IT')}`}
          action={
            <Button className="rounded-full border border-white/10 bg-white/10 px-5 py-3">
              <ButtonText className="text-sm text-white">Invia aggiornamento</ButtonText>
            </Button>
          }
        />
        <HStack className="flex-col gap-4 xl:flex-row">
          <VStack className="flex-1 gap-3">
            <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">Ospite</Text>
            <Text className="text-lg font-semibold text-white">{guest?.name}</Text>
            <Text className="text-sm text-slate-300">{guest?.email}</Text>
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
          <VStack className="flex-1 gap-3">
            <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">Workflow</Text>
            <Text className="text-sm text-slate-200">{booking.status}</Text>
            <Text className="text-sm text-emerald-200">Ultima automazione: {booking.lastAutomation}</Text>
            <Text className="text-sm text-slate-300">Prossima azione: {booking.nextAction}</Text>
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
            <Pressable
              onPress={() => setDebugMode((prev) => !prev)}
              className={`flex-row items-center gap-2 rounded-full border px-4 py-2 ${
                debugMode ? 'border-white/20 bg-white/10' : 'border-white/10 bg-white/5'
              }`}
            >
              <Bug color={palette.intent.accent} size={16} strokeWidth={1.4} />
              <Text className="text-xs text-slate-200">Modalità debug automazioni</Text>
            </Pressable>
          </VStack>
        </HStack>
      </GlassCard>

      <HStack className="flex-col gap-6 xl:flex-row">
        <GuestInsightsCard
          notes={booking.guestNotes}
          preferences={booking.guestPreferences}
          manualAlerts={booking.manualAlerts}
        />
        <VStack className="flex-1 gap-6">
          <AutomationTimeline steps={booking.automationTimeline} />
          <JourneyMoments moments={booking.journeyMoments} />
        </VStack>
        <VStack className="w-full max-w-sm gap-6">
          <IoTStatusCard
            temperature={guest?.roomTemperature ?? 21}
            minibarLevel={guest?.minibarLevel ?? 50}
            actions={['Accendi luci suite', 'Pre-raffredda stanza', 'Apri chat concierge']}
          />
          <DebugPanel
            debugMode={debugMode}
            manualAlerts={booking.manualAlerts}
            actions={booking.actions}
            aiConfidence={booking.aiConfidence}
          />
        </VStack>
      </HStack>
    </VStack>
  );
}

function GuestInsightsCard({
  notes,
  preferences,
  manualAlerts,
}: {
  notes: string[];
  preferences: string[];
  manualAlerts: string[];
}) {
  return (
    <GlassCard className="w-full max-w-sm gap-4 border-white/10 bg-white/5">
      <SectionHeader title="Insight ospite" subtitle="Note operative e preferenze in evidenza" />
      <VStack className="gap-3">
        <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">Note concierge</Text>
        {notes.map((note) => (
          <Text key={note} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
            {note}
          </Text>
        ))}
      </VStack>
      <VStack className="gap-2">
        <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">Preferenze</Text>
        <HStack className="flex-wrap gap-2">
          {preferences.map((pref) => (
            <Text
              key={pref}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200"
            >
              {pref}
            </Text>
          ))}
        </HStack>
      </VStack>
      <VStack className="gap-2">
        <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">Alert manuali</Text>
        {manualAlerts.map((alert) => (
          <HStack key={alert} className="items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <ClipboardList color={palette.intent.accent} size={16} strokeWidth={1.4} />
            <Text className="text-xs text-slate-200">{alert}</Text>
          </HStack>
        ))}
      </VStack>
    </GlassCard>
  );
}

function JourneyMoments({
  moments,
}: {
  moments: {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    owner: string;
  }[];
}) {
  return (
    <GlassCard className="gap-4 border-white/10 bg-white/5">
      <SectionHeader title="Journey moments" subtitle="Cronologia azioni AI e staff" />
      <VStack className="gap-3">
        {moments.map((moment) => (
          <VStack key={moment.id} className="gap-2 rounded-2xl border border-white/10 bg-[#101924]/70 px-4 py-3">
            <HStack className="items-center justify-between">
              <Text className="text-sm font-semibold text-white">{moment.title}</Text>
              <Text className="text-xs text-slate-400">{moment.timestamp}</Text>
            </HStack>
            <Text className="text-sm text-slate-200">{moment.description}</Text>
            <Text className="text-xs text-slate-400">Responsabile: {moment.owner}</Text>
          </VStack>
        ))}
      </VStack>
    </GlassCard>
  );
}

function DebugPanel({
  debugMode,
  manualAlerts,
  actions,
  aiConfidence,
}: {
  debugMode: boolean;
  manualAlerts: string[];
  actions: string[];
  aiConfidence: number;
}) {
  return (
    <GlassCard className="gap-4 border-white/10 bg-white/5">
      <SectionHeader
        title="Debug automazioni"
        subtitle={debugMode ? 'Log decisioni AI e fallback' : 'Attiva debug per visualizzare log'}
      />
      {debugMode ? (
        <VStack className="gap-3">
          <HStack className="items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <Sparkles color={palette.intent.accent} size={14} strokeWidth={1.4} />
            <Text className="text-xs text-slate-200">Confidence attuale {Math.round(aiConfidence * 100)}%</Text>
          </HStack>
          {actions.map((action) => (
            <Text key={action} className="text-sm text-slate-200">
              Automazione: {action}
            </Text>
          ))}
          {manualAlerts.map((alert) => (
            <HStack key={alert} className="items-center gap-2 rounded-2xl border border-amber-300/40 bg-amber-400/10 px-3 py-2">
              <AlertCircle color={palette.intent.warning} size={14} strokeWidth={1.4} />
              <Text className="text-xs text-amber-100">Fallback richiesto: {alert}</Text>
            </HStack>
          ))}
        </VStack>
      ) : (
        <Text className="text-sm text-slate-300">
          Attiva la modalità debug per analizzare decisioni AI e verificare dove intervenire manualmente.
        </Text>
      )}
    </GlassCard>
  );
}
