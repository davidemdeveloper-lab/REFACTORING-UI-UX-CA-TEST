import { GlassPanel } from '@/components/app/glass-panel';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  aiNotifications,
  bookings,
  clients,
  externalServices,
  iotDevices,
  revenueHighlights,
  roomAnalytics,
} from '@/lib/mock-data';
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  ThermometerSun,
  Droplets,
  Wifi,
  Cpu,
  Plug,
  Sparkles,
  MessageSquarePlus,
} from 'lucide-react-native';
import Link from 'next/link';

const trendColor = {
  up: 'text-success-200',
  down: 'text-error-200',
  stable: 'text-warning-200',
};

export default function DashboardPage() {
  const upcomingGuests = clients.slice(0, 3);
  const activeBookings = bookings.slice(0, 3);

  return (
    <Box className="flex flex-col gap-10">
      <GlassPanel
        title="Welcome back, Davide!"
        subtitle="Panoramica completa dello stato camere, automazioni e interazioni AI."
        className="relative overflow-hidden"
      >
        <Box className="absolute -right-16 -top-14 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />
        <Box className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <Box className="md:col-span-3">
            <Text className="text-4xl font-semibold text-typography-0">
              86% occupazione media camere
            </Text>
            <Text className="mt-3 max-w-xl text-sm text-typography-200">
              Grazie alle automazioni Customer Automator hai ridotto del 38% i tempi di risposta e aumentato del 18% gli upgrade spontanei.
            </Text>
            <Box className="mt-6 flex flex-wrap gap-3">
              <Button action="primary" className="bg-primary-500/40 px-5">
                <ButtonIcon as={Sparkles} />
                <ButtonText className="text-typography-0">
                  Crea proposta istantanea
                </ButtonText>
              </Button>
              <Button variant="outline" action="secondary" className="border-white/20 px-5">
                <ButtonIcon as={MessageSquarePlus} className="text-typography-100" />
                <ButtonText className="text-typography-50">
                  Apri inbox AI
                </ButtonText>
              </Button>
            </Box>
          </Box>
          <Box className="grid grid-cols-2 gap-4 md:col-span-2">
            {revenueHighlights.map((card) => (
              <Box
                key={card.id}
                className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 backdrop-blur-xl"
              >
                <Text className="text-xs uppercase tracking-[0.3em] text-typography-400">
                  {card.label}
                </Text>
                <Text className="mt-2 text-xl font-semibold text-typography-0">
                  {card.amount}
                </Text>
                <Box className="mt-3 flex flex-row items-center gap-1">
                  <Icon
                    as={card.positive ? ArrowUpRight : ArrowDownRight}
                    size="sm"
                    className={card.positive ? 'text-success-200' : 'text-error-200'}
                  />
                  <Text
                    className={`text-xs font-semibold ${
                      card.positive ? 'text-success-200' : 'text-error-200'
                    }`}
                  >
                    {card.delta}
                  </Text>
                  <Text className="text-[11px] text-typography-400">
                    vs mese precedente
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </GlassPanel>

      <Box className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <GlassPanel title="Uso stanze & trend" className="xl:col-span-2">
          <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {roomAnalytics.map((room) => (
              <Box
                key={room.roomType}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 px-5 py-5 backdrop-blur-xl"
              >
                <Text className="text-sm font-medium text-typography-200">
                  {room.roomType}
                </Text>
                <Text className="mt-2 text-3xl font-semibold text-typography-0">
                  {room.occupancy}%
                </Text>
                <Box className="mt-3 flex flex-row items-center gap-2">
                  <Icon
                    as={TrendingUp}
                    className={
                      room.trend === 'up'
                        ? 'text-success-200'
                        : room.trend === 'down'
                        ? 'text-error-200'
                        : 'text-warning-200'
                    }
                    size="sm"
                  />
                  <Text className={`text-xs ${trendColor[room.trend]}`}>
                    Trend {room.trend === 'up' ? 'positivo' : room.trend === 'down' ? 'negativo' : 'stabile'}
                  </Text>
                </Box>
                <Box className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <Box
                    className="h-2 rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                    style={{ width: `${room.occupancy}%` }}
                  />
                </Box>
                <Box className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary-500/10" />
              </Box>
            ))}
          </Box>
        </GlassPanel>
        <GlassPanel title="Hub notifiche AI" subtitle="Conversazioni e alert senza risposta.">
          <Box className="flex flex-col gap-4">
            {aiNotifications.map((notification) => (
              <Box
                key={notification.id}
                className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-xl"
              >
                <Box className="flex flex-row items-center justify-between">
                  <Badge className="bg-primary-500/20 px-3 py-1 text-[10px] uppercase tracking-[0.4em] text-primary-100">
                    {notification.type}
                  </Badge>
                  <Text className="text-[11px] text-typography-400">
                    {notification.time}
                  </Text>
                </Box>
                <Text className="mt-2 text-sm text-typography-100">
                  {notification.message}
                </Text>
                <Link
                  href={`/chat?thread=${notification.threadId}`}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-primary-200 hover:text-primary-100"
                >
                  Vai al thread
                  <ArrowUpRight size={14} color="currentColor" />
                </Link>
              </Box>
            ))}
          </Box>
        </GlassPanel>
      </Box>

      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GlassPanel title="Clienti in evidenza" subtitle="Preferenze, stato automazioni e benessere camera.">
          <Box className="flex flex-col gap-4">
            {upcomingGuests.map((guest) => (
              <Box
                key={guest.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl lg:flex-row lg:items-center"
              >
                <Box className="flex flex-1 flex-col gap-1">
                  <Text className="text-lg font-semibold text-typography-0">
                    {guest.name}
                  </Text>
                  <Text className="text-sm text-typography-300">
                    {guest.roomPreference}
                  </Text>
                  <Box className="mt-2 flex flex-wrap gap-2">
                    {guest.tags.map((tag) => (
                      <Badge key={tag} className="bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.4em] text-typography-300">
                        {tag}
                      </Badge>
                    ))}
                  </Box>
                </Box>
                <Box className="grid grid-cols-2 gap-3 text-xs text-typography-300">
                  <Box className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/10 px-3 py-2">
                    <Icon as={ThermometerSun} size="sm" className="text-warning-200" />
                    <Text>{guest.temperature.toFixed(1)}°C</Text>
                  </Box>
                  <Box className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/10 px-3 py-2">
                    <Icon as={Droplets} size="sm" className="text-info-200" />
                    <Text>{guest.minibar}% minibar</Text>
                  </Box>
                  <Box className="col-span-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/10 px-3 py-2">
                    <Icon as={Sparkles} size="sm" className="text-primary-200" />
                    <Text>Automazione {guest.automationLevel}</Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </GlassPanel>
        <GlassPanel title="Prenotazioni attive" subtitle="Stato comunicazioni e azioni successive.">
          <Box className="flex flex-col gap-4">
            {activeBookings.map((booking) => (
              <Box
                key={booking.id}
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl"
              >
                <Box className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <Text className="text-lg font-semibold text-typography-0">
                    {booking.guestName}
                  </Text>
                  <Badge className="bg-primary-500/20 px-3 py-1 text-[10px] uppercase tracking-[0.4em] text-primary-100">
                    {booking.status}
                  </Badge>
                </Box>
                <Text className="text-sm text-typography-300">
                  {booking.roomType} • {booking.checkIn} → {booking.checkOut}
                </Text>
                <Box className="mt-3 flex flex-wrap gap-2">
                  {booking.outstandingActions.map((action) => (
                    <Badge key={action} className="bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.4em] text-typography-300">
                      {action}
                    </Badge>
                  ))}
                </Box>
                <Link
                  href={`/bookings/${booking.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-xs text-primary-200 hover:text-primary-100"
                >
                  Apri dettaglio prenotazione
                  <ArrowUpRight size={14} color="currentColor" />
                </Link>
              </Box>
            ))}
          </Box>
        </GlassPanel>
      </Box>

      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-2" id="servizi">
        <GlassPanel title="IoT Hub" subtitle="Monitoraggio dispositivi di camera e aree comuni.">
          <Box className="grid grid-cols-1 gap-3">
            {iotDevices.map((device) => (
              <Box
                key={device.id}
                className="flex flex-row items-center justify-between rounded-2xl border border-white/10 bg-black/15 px-4 py-3"
              >
                <Box className="flex flex-col">
                  <Text className="text-sm font-medium text-typography-0">
                    {device.name}
                  </Text>
                  <Text className="text-xs text-typography-400">{device.location}</Text>
                </Box>
                <Box className="flex flex-row items-center gap-3">
                  <Badge className="bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-typography-300">
                    {device.status}
                  </Badge>
                  <Box className="flex items-center gap-2 text-xs text-typography-300">
                    <Icon as={Cpu} size="sm" className="text-primary-200" />
                    <Text>{device.battery}%</Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </GlassPanel>
        <GlassPanel title="Servizi partner" subtitle="Gestione adesioni e attivazioni automatiche.">
          <Box className="flex flex-col gap-4">
            {externalServices.map((service) => (
              <Box
                key={service.id}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/15 px-5 py-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between"
              >
                <Box>
                  <Text className="text-lg font-semibold text-typography-0">
                    {service.name}
                  </Text>
                  <Text className="text-sm text-typography-300">
                    {service.description}
                  </Text>
                </Box>
                {service.connected ? (
                  <Link
                    href={service.url ?? '#'}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-primary-500/10 px-4 py-2 text-sm text-primary-100 hover:text-primary-50"
                  >
                    <Wifi size={16} color="currentColor" />
                    {service.actionLabel}
                  </Link>
                ) : (
                  <Button action="primary" className="bg-accent-500/30 px-4">
                    <ButtonIcon as={Plug} />
                    <ButtonText className="text-typography-0">
                      {service.actionLabel}
                    </ButtonText>
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        </GlassPanel>
      </Box>
    </Box>
  );
}

// Validazione: dashboard completa analytics, hub AI, IoT e servizi esterni secondo requisiti.
