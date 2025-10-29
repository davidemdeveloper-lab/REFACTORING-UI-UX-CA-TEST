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
  Coins,
  Activity,
  Waves,
  ArrowRight,
  Wifi,
  Thermometer,
  Power,
} from 'lucide-react-native';

export default function DashboardPage() {
  const upcomingGuests = bookings.slice(0, 2).map((booking) => ({
    booking,
    guest: guests.find((guest) => guest.id === booking.guestId)!,
  }));

  return (
    <VStack className="gap-10">
      <HStack className="flex-col gap-6 xl:flex-row">
        <MetricCard
          icon={<Coins color={palette.intent.accent} size={26} strokeWidth={1.6} />}
          label="Fatturato mese"
          value={`€ ${analytics.revenue.total.toLocaleString('it-IT')}`}
          trend={`+${analytics.revenue.trend}% rispetto al mese precedente`}
          caption={`SPA € ${analytics.revenue.spa.toLocaleString('it-IT')} / Servizi € ${analytics.revenue.services.toLocaleString('it-IT')}`}
        />
        <MetricCard
          icon={<Activity color={palette.intent.accent} size={26} strokeWidth={1.6} />}
          label="Tasso automazioni"
          value="94%"
          trend="+6 punti negli ultimi 14 giorni"
          caption="Conversazioni AI completate senza intervento umano"
        />
        <MetricCard
          icon={<Waves color={palette.intent.accent} size={26} strokeWidth={1.6} />}
          label="Benessere ospiti"
          value="87/100"
          trend="Feedback raccolti via TripAdvisor"
          caption="Monitor AI sulle recensioni e sui sondaggi post-soggiorno"
        />
      </HStack>

      <HStack className="flex-col gap-6 xl:flex-row">
        <Box className="flex-1">
          <OccupancyDistribution data={analytics.occupancy} />
        </Box>
        <Box className="w-full max-w-xl">
          <AiNotificationsPanel />
        </Box>
      </HStack>

      <GlassCard className="gap-6 border-white/10 bg-white/5">
        <SectionHeader
          title="Clienti e prenotazioni in evidenza"
          subtitle="Azioni suggerite dalla piattaforma"
          action={
            <Pressable className="flex-row items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Text className="text-sm font-semibold text-white">Apri elenco completo</Text>
              <ArrowRight color={palette.text.secondary} size={16} strokeWidth={1.4} />
            </Pressable>
          }
        />
        <VStack className="gap-4">
          {upcomingGuests.map(({ booking, guest }) => (
            <HStack
              key={booking.id}
              className="items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
            >
              <VStack className="gap-1">
                <Text className="text-sm uppercase tracking-[0.25em] text-slate-400">
                  Check-in {new Date(booking.arrival).toLocaleDateString('it-IT')}
                </Text>
                <Text className="text-xl font-semibold text-white">{guest.name}</Text>
                <Text className="text-sm text-slate-400">
                  {booking.roomType} · Stato {booking.status} · {booking.channel}
                </Text>
              </VStack>
              <VStack className="items-end gap-2">
                {booking.actions.map((action) => (
                  <Text
                    key={action}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {action}
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

      <HStack className="flex-col gap-6 xl:flex-row">
        <Box className="flex-1">
          <ServicesGrid services={services} />
        </Box>
        <Box className="w-full max-w-xl">
          <IotDevicesPanel />
        </Box>
      </HStack>
    </VStack>
  );
}

function AiNotificationsPanel() {
  return (
    <GlassCard className="gap-6 border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5">
      <SectionHeader
        title="Notifiche AI"
        subtitle="Conversazioni che richiedono attenzione"
      />
      <VStack className="gap-4">
        {analytics.aiNotifications.map((notification) => (
          <HStack
            key={notification.id}
            className="items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
          >
            <VStack className="gap-2">
              <Text className="text-sm font-semibold text-white">{notification.title}</Text>
              <Text className="text-sm text-slate-300">{notification.detail}</Text>
            </VStack>
            <VStack className="items-end gap-2">
              <Text className="rounded-full bg-rose-500/30 px-3 py-1 text-xs font-semibold text-rose-200">
                Priorità {notification.priority}
              </Text>
              <Text className="text-xs text-slate-400">{notification.time}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </GlassCard>
  );
}

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
