import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { GlassCard } from '@/components/layout/GlassCard';
import { palette } from '@/design/palette';
import { mockAnalytics, mockClients, mockReservations, mockServices } from '@/components/data/mockData';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { Icon } from '@/components/layout/UiIcon';
import { Button } from '@/components/ui/button';
import { ScrollView } from '@/components/ui/scroll-view';

const StatCard = ({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: string;
}) => (
  <GlassCard>
    <HStack className="items-start justify-between">
      <VStack space="xs">
        <Text className="text-sm uppercase" style={{ color: palette.textMuted }}>
          {title}
        </Text>
        <Text className="text-2xl font-semibold" style={{ color: palette.textPrimary }}>
          {value}
        </Text>
        <Text className="text-xs" style={{ color: palette.textSecondary }}>
          {description}
        </Text>
      </VStack>
      <GlassCard padding={12} gap={6} borderColor={palette.borderSoft}>
        <Icon name={icon as any} size={22} color={palette.accentPrimary} />
      </GlassCard>
    </HStack>
  </GlassCard>
);

const IoTCard = ({ label, active, offline }: { label: string; active: number; offline: number }) => (
  <GlassCard padding={16}>
    <HStack className="items-center justify-between">
      <VStack>
        <Text className="text-base font-medium" style={{ color: palette.textPrimary }}>
          {label}
        </Text>
        <Text className="text-xs" style={{ color: palette.textSecondary }}>
          {active} attivi · {offline} offline
        </Text>
      </VStack>
      <Icon name="Activity" size={20} color={palette.accentSecondary} />
    </HStack>
    <Progress
      minValue={0}
      maxValue={100}
      value={(active / (active + offline)) * 100}
      className="h-2 rounded-full"
      style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
    >
      <ProgressFilledTrack
        style={{
          width: `${(active / (active + offline)) * 100}%`,
          backgroundColor: palette.accentSecondary,
        }}
      />
    </Progress>
  </GlassCard>
);

export default function DashboardPage() {
  return (
    <ScrollView>
      <VStack space="xl" className="pb-10">
        <HStack className="flex-col gap-6 xl:flex-row">
          <GlassCard>
            <HStack className="items-center justify-between">
              <VStack space="xs">
                <Text className="text-sm uppercase" style={{ color: palette.textMuted }}>
                  Occupazione camere
                </Text>
                <Text className="text-xl font-semibold" style={{ color: palette.textPrimary }}>
                  Panorama tipologie
                </Text>
                <Text className="text-xs" style={{ color: palette.textSecondary }}>
                  Suite quasi complete, attiva upsell da dashboard AI.
                </Text>
              </VStack>
              <GlassCard padding={12} gap={6} borderColor={palette.borderSoft}>
                <Icon name="BarChart4" size={22} color={palette.accentPrimary} />
              </GlassCard>
            </HStack>
            <VStack space="md" className="mt-4">
              {mockAnalytics.occupancy.map((item) => (
                <Box key={item.label}>
                  <HStack className="items-center justify-between">
                    <Text className="text-sm" style={{ color: palette.textSecondary }}>
                      {item.label}
                    </Text>
                    <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                      {item.value}%
                    </Text>
                  </HStack>
                  <Progress minValue={0} maxValue={100} value={item.value} className="mt-2 h-2 rounded-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <ProgressFilledTrack
                      style={{ width: `${item.value}%`, backgroundColor: palette.accentPrimary }}
                    />
                  </Progress>
                </Box>
              ))}
            </VStack>
          </GlassCard>
          <VStack className="flex-1 gap-6">
            <StatCard
              title="Fatturato mensile"
              value={mockAnalytics.revenue.total}
              description={mockAnalytics.revenue.trend}
              icon="TrendingUp"
            />
            <StatCard
              title="Ricavi SPA/Servizi"
              value={mockAnalytics.spa.total}
              description={`Pacchetti attivi: ${mockAnalytics.spa.activePackages} · Soddisfazione ${mockAnalytics.spa.satisfaction}%`}
              icon="Gem"
            />
            <GlassCard>
              <HStack className="items-center justify-between">
                <Text className="text-base font-medium" style={{ color: palette.textPrimary }}>
                  Servizi esterni
                </Text>
                <Button
                  style={{
                    borderRadius: 14,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    background: 'transparent',
                    borderColor: palette.borderSoft,
                  }}
                >
                  <HStack space="sm" className="items-center">
                    <Icon name="ExternalLink" size={16} color={palette.textSecondary} />
                    <Text className="text-xs" style={{ color: palette.textSecondary }}>
                      Gestisci connessioni
                    </Text>
                  </HStack>
                </Button>
              </HStack>
              <VStack space="md">
                {mockServices.map((service) => (
                  <GlassCard key={service.id} padding={14} gap={6} borderColor={palette.borderSoft}>
                    <HStack className="items-center justify-between">
                      <VStack space="xs">
                        <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                          {service.name}
                        </Text>
                        <Text className="text-xs" style={{ color: palette.textSecondary }}>
                          {service.description}
                        </Text>
                      </VStack>
                      <Button
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 12,
                          background:
                            service.status === 'Attivo' ? 'rgba(151,255,221,0.12)' : 'rgba(255,184,108,0.12)',
                          borderColor:
                            service.status === 'Attivo' ? palette.accentSecondary : palette.accentWarm,
                        }}
                      >
                        <Text
                          className="text-xs font-medium"
                          style={{
                            color:
                              service.status === 'Attivo' ? palette.accentSecondary : palette.accentWarm,
                          }}
                        >
                          {service.status === 'Attivo' ? 'Apri' : 'Invia richiesta' }
                        </Text>
                      </Button>
                    </HStack>
                  </GlassCard>
                ))}
              </VStack>
            </GlassCard>
          </VStack>
        </HStack>
        <HStack className="flex-col gap-6 xl:flex-row">
          <GlassCard className="flex-1">
            <HStack className="items-center justify-between">
              <Text className="text-base font-medium" style={{ color: palette.textPrimary }}>
                Clienti in evidenza
              </Text>
              <Button
                style={{
                  borderRadius: 14,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  background: 'transparent',
                  borderColor: palette.borderSoft,
                }}
              >
                <HStack space="sm" className="items-center">
                  <Icon name="UserPlus" size={16} color={palette.textSecondary} />
                  <Text className="text-xs" style={{ color: palette.textSecondary }}>
                    Aggiungi cliente
                  </Text>
                </HStack>
              </Button>
            </HStack>
            <VStack space="md">
              {mockClients.map((client) => (
                <GlassCard key={client.id} padding={16} gap={6} borderColor={palette.borderSoft}>
                  <HStack className="items-center justify-between">
                    <VStack space="xs">
                      <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                        {client.name}
                      </Text>
                      <Text className="text-xs" style={{ color: palette.textSecondary }}>
                        {client.status}
                      </Text>
                    </VStack>
                    <HStack space="md" className="items-center">
                      <Icon name="Thermometer" size={18} color={palette.accentPrimary} />
                      <Text className="text-xs" style={{ color: palette.textSecondary }}>
                        {client.temperature}°C
                      </Text>
                      <Icon name="CupSoda" size={18} color={palette.accentSecondary} />
                      <Text className="text-xs" style={{ color: palette.textSecondary }}>
                        {client.minibarLevel}%
                      </Text>
                    </HStack>
                  </HStack>
                </GlassCard>
              ))}
            </VStack>
          </GlassCard>
          <GlassCard className="flex-1">
            <HStack className="items-center justify-between">
              <Text className="text-base font-medium" style={{ color: palette.textPrimary }}>
                Prenotazioni correnti
              </Text>
              <Button
                style={{
                  borderRadius: 14,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  background: 'transparent',
                  borderColor: palette.borderSoft,
                }}
              >
                <HStack space="sm" className="items-center">
                  <Icon name="CalendarPlus" size={16} color={palette.textSecondary} />
                  <Text className="text-xs" style={{ color: palette.textSecondary }}>
                    Nuova prenotazione
                  </Text>
                </HStack>
              </Button>
            </HStack>
            <VStack space="md">
              {mockReservations.map((reservation) => (
                <GlassCard key={reservation.id} padding={16} gap={6} borderColor={palette.borderSoft}>
                  <VStack space="xs">
                    <HStack className="items-center justify-between">
                      <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                        {reservation.code}
                      </Text>
                      <Text className="text-xs" style={{ color: palette.textSecondary }}>
                        {reservation.status}
                      </Text>
                    </HStack>
                    <HStack className="items-center justify-between">
                      <Text className="text-xs" style={{ color: palette.textSecondary }}>
                        {reservation.guest} · {reservation.roomType}
                      </Text>
                      <Text className="text-xs" style={{ color: palette.textSecondary }}>
                        {reservation.arrival} → {reservation.departure}
                      </Text>
                    </HStack>
                    <HStack className="items-center justify-between">
                      <Text className="text-xs" style={{ color: palette.textMuted }}>
                        Ultimo evento: {reservation.lastEvent}
                      </Text>
                      <Text className="text-xs" style={{ color: palette.accentWarm }}>
                        Prossima azione: {reservation.nextAction}
                      </Text>
                    </HStack>
                  </VStack>
                </GlassCard>
              ))}
            </VStack>
          </GlassCard>
        </HStack>
        <GlassCard>
          <HStack className="items-center justify-between">
            <VStack>
              <Text className="text-base font-medium" style={{ color: palette.textPrimary }}>
                Dispositivi IoT
              </Text>
              <Text className="text-xs" style={{ color: palette.textSecondary }}>
                Stato termostati, serrature, illuminazione e altri dispositivi smart.
              </Text>
            </VStack>
            <Button
              style={{
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 8,
                background: 'transparent',
                borderColor: palette.borderSoft,
              }}
            >
              <HStack space="sm" className="items-center">
                <Icon name="Settings2" size={16} color={palette.textSecondary} />
                <Text className="text-xs" style={{ color: palette.textSecondary }}>
                  Configura scenari
                </Text>
              </HStack>
            </Button>
          </HStack>
          <HStack className="flex-col gap-4 md:flex-row">
            {mockAnalytics.iotDevices.map((device) => (
              <IoTCard key={device.label} label={device.label} active={device.active} offline={device.offline} />
            ))}
          </HStack>
        </GlassCard>
      </VStack>
    </ScrollView>
  );
}
