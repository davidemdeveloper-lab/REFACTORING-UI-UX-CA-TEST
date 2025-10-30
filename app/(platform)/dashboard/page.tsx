import { GlassCard } from '@/components/common/GlassCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { OccupancyDistribution } from '@/components/dashboard/OccupancyDistribution';
import { ServicesGrid } from '@/components/dashboard/ServicesGrid';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { palette } from '@/theme/palette';
import { analytics, bookings, guests, iotDevices, services } from '@/lib/mock-data';
import {
  ArrowRight,
  BellRing,
  ClipboardList,
  Compass,
  Navigation2,
  Power,
  Sparkles,
  Thermometer,
  Users2,
  Wifi,
} from 'lucide-react-native';

export default function DashboardPage() {
  const enrichedBookings = bookings.map((booking) => ({
    booking,
    guest: guests.find((guest) => guest.id === booking.guestId)!,
  }));
  const arrivals = enrichedBookings.slice(0, 3);
  const immediateActions = enrichedBookings
    .flatMap(({ booking, guest }) =>
      booking.manualAlerts.map((alert) => ({
        alert,
        guest: guest.name,
        bookingId: booking.id,
      })),
    )
    .slice(0, 4);

  return (
    <VStack className="gap-10">
      <HStack className="flex-col gap-6 2xl:flex-row">
        <HospitalityPulse arrivals={arrivals} />
        <ActionQueue items={immediateActions} />
        <AutomationHealth />
      </HStack>

      <HStack className="flex-col gap-6 xl:flex-row">
        <MetricCard
          icon={<Navigation2 color={palette.intent.accent} size={26} strokeWidth={1.6} />}
          label="Check-in di oggi"
          value={`${arrivals.length}`}
          trend="3 automazioni concluse senza intervento"
          caption="Pre check-in AI completati e welcome kit inviati"
        />
        <MetricCard
          icon={<ClipboardList color={palette.intent.accent} size={26} strokeWidth={1.6} />}
          label="Task operativi aperti"
          value={`${immediateActions.length}`}
          trend="Priorità ordinate per flusso ospite"
          caption="Alert manuali su check-out, transfer e preferenze"
        />
        <MetricCard
          icon={<Users2 color={palette.intent.accent} size={26} strokeWidth={1.6} />}
          label="Preferenze aggiornate"
          value="12"
          trend="+4 nelle ultime 24h"
          caption="Moduli digital concierge completati"
        />
      </HStack>

      <HStack className="flex-col gap-6 2xl:flex-row">
        <Box className="flex-1">
          <OccupancyDistribution data={analytics.occupancy} />
        </Box>
        <Box className="w-full max-w-xl">
          <IotDevicesPanel />
        </Box>
      </HStack>

      <BookingsBoard bookings={arrivals} />

      <GlassCard className="gap-6 border-white/10 bg-white/5">
        <SectionHeader
          title="Servizi collegati"
          subtitle="Attiva nuovi canali e mantieni il controllo"
          action={
            <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Text className="text-sm font-semibold text-white">Apri marketplace</Text>
              <ArrowRight color={palette.text.secondary} size={16} strokeWidth={1.4} />
            </Pressable>
          }
        />
        <ServicesGrid services={services} />
      </GlassCard>
    </VStack>
  );
}

function HospitalityPulse({
  arrivals,
}: {
  arrivals: { booking: (typeof bookings)[number]; guest: (typeof guests)[number] }[];
}) {
  return (
    <GlassCard className="flex-1 gap-5 border-white/10 bg-gradient-to-br from-white/15 via-transparent to-white/5">
      <SectionHeader
        title="Hospitality pulse"
        subtitle="Dalla panoramica alle azioni mirate"
      />
      <VStack className="gap-4">
        <HStack className="items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <HStack className="items-center gap-3">
            <Compass color={palette.intent.accent} size={18} strokeWidth={1.5} />
            <Text className="text-sm text-slate-200">Arrivi pianificati</Text>
          </HStack>
          <Text className="text-lg font-semibold text-white">{arrivals.length}</Text>
        </HStack>
        <VStack className="gap-3">
          {arrivals.map(({ booking, guest }) => (
            <HStack
              key={booking.id}
              className="items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <VStack className="gap-1">
                <Text className="text-sm font-semibold text-white">{guest.name}</Text>
                <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Check-in {new Date(booking.arrival).toLocaleDateString('it-IT')}
                </Text>
                <Text className="text-xs text-slate-300">{booking.roomType}</Text>
              </VStack>
              <VStack className="items-end gap-1">
                <Text className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
                  {booking.status}
                </Text>
                <Text className="text-xs text-emerald-200">Confidence AI {Math.round(booking.aiConfidence * 100)}%</Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </GlassCard>
  );
}

function ActionQueue({
  items,
}: {
  items: { alert: string; guest: string; bookingId: string }[];
}) {
  return (
    <GlassCard className="w-full max-w-xl gap-5 border-white/10 bg-white/5">
      <SectionHeader
        title="Azioni immediate"
        subtitle="Priorità da completare entro oggi"
      />
      <VStack className="gap-3">
        {items.map((item) => (
          <LinkRow key={`${item.bookingId}-${item.alert}`} item={item} />
        ))}
        {items.length === 0 ? (
          <Text className="text-sm text-slate-300">Nessun intervento manuale richiesto.</Text>
        ) : null}
      </VStack>
    </GlassCard>
  );
}

function LinkRow({
  item,
}: {
  item: { alert: string; guest: string; bookingId: string };
}) {
  return (
    <Pressable className="flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <VStack className="gap-1">
        <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.guest}</Text>
        <Text className="text-sm text-slate-100">{item.alert}</Text>
      </VStack>
      <ArrowRight color={palette.intent.accent} size={16} strokeWidth={1.4} />
    </Pressable>
  );
}

function AutomationHealth() {
  return (
    <GlassCard className="flex-1 gap-5 border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5">
      <SectionHeader
        title="Stato automazioni"
        subtitle="Notifiche e opportunità suggerite"
      />
      <VStack className="gap-3">
        {analytics.aiNotifications.map((notification) => (
          <VStack
            key={notification.id}
            className="gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <HStack className="items-center justify-between">
              <HStack className="items-center gap-2">
                <BellRing color={palette.intent.accent} size={16} strokeWidth={1.5} />
                <Text className="text-sm font-semibold text-white">{notification.title}</Text>
              </HStack>
              <Text className="text-xs text-slate-400">{notification.time}</Text>
            </HStack>
            <Text className="text-xs text-slate-300">{notification.detail}</Text>
            <Text className="w-max rounded-full bg-rose-500/30 px-3 py-1 text-[11px] font-semibold text-rose-100">
              Priorità {notification.priority}
            </Text>
          </VStack>
        ))}
        <Pressable className="flex-row items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <HStack className="items-center gap-2">
            <Sparkles color={palette.intent.accent} size={16} strokeWidth={1.5} />
            <Text className="text-sm text-slate-100">Guarda suggerimenti AI archivio</Text>
          </HStack>
          <ArrowRight color={palette.intent.accent} size={16} strokeWidth={1.4} />
        </Pressable>
      </VStack>
    </GlassCard>
  );
}

function BookingsBoard({
  bookings,
}: {
  bookings: { booking: (typeof bookingsData)[number]; guest: (typeof guests)[number] }[];
}) {
  return (
    <GlassCard className="gap-6 border-white/10 bg-white/5">
      <SectionHeader
        title="Flusso prenotazioni"
        subtitle="Ogni card mostra ultima azione e prossima automazione"
      />
      <VStack className="gap-4">
        {bookings.map(({ booking, guest }) => (
          <HStack
            key={booking.id}
            className="flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 lg:flex-row lg:items-start"
          >
            <VStack className="flex-1 gap-2">
              <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {booking.code} · {booking.channel}
              </Text>
              <Text className="text-lg font-semibold text-white">{guest.name}</Text>
              <Text className="text-sm text-slate-400">
                {booking.roomType} · {new Date(booking.arrival).toLocaleDateString('it-IT')} →
                {new Date(booking.departure).toLocaleDateString('it-IT')}
              </Text>
              <Text className="text-xs text-emerald-200">Ultima automazione: {booking.lastAutomation}</Text>
              <Text className="text-xs text-slate-300">Prossima azione: {booking.nextAction}</Text>
            </VStack>
            <VStack className="gap-2 lg:w-60">
              {booking.automationTimeline.map((step) => (
                <Text
                  key={step.id}
                  className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
                  style={{
                    backgroundColor: step.completed ? 'rgba(125, 248, 198, 0.2)' : 'rgba(148,163,184,0.12)',
                    color: step.completed ? palette.text.positive : palette.text.secondary,
                  }}
                >
                  {step.label}
                </Text>
              ))}
            </VStack>
            <VStack className="gap-2 lg:w-52">
              {booking.manualAlerts.map((alert) => (
                <Text key={alert} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
                  {alert}
                </Text>
              ))}
              <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 px-3 py-2">
                <Text className="text-xs font-semibold text-white">Apri timeline</Text>
                <ArrowRight color={palette.intent.accent} size={14} strokeWidth={1.3} />
              </Pressable>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </GlassCard>
  );
}

const bookingsData = bookings;

function IotDevicesPanel() {
  return (
    <GlassCard className="gap-6 border-white/10 bg-white/5">
      <SectionHeader title="Dispositivi IoT" subtitle="Hub camera e servizi collegati" />
      <VStack className="gap-4">
        {iotDevices.map((device) => (
          <HStack
            key={device.id}
            className="items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <HStack className="items-center gap-3">
              <Box className="h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                <Wifi color={palette.intent.accent} size={20} strokeWidth={1.6} />
              </Box>
              <VStack className="gap-1">
                <Text className="text-sm font-semibold text-white">{device.name}</Text>
                <Text className="text-xs text-slate-400">Stato {device.status}</Text>
              </VStack>
            </HStack>
            <VStack className="items-end gap-2">
              <Text className="text-sm text-emerald-300">Health {device.health}%</Text>
              <HStack className="items-center gap-2">
                <Thermometer color={palette.text.secondary} size={16} strokeWidth={1.4} />
                <Power color={palette.text.secondary} size={16} strokeWidth={1.4} />
              </HStack>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </GlassCard>
  );
}
