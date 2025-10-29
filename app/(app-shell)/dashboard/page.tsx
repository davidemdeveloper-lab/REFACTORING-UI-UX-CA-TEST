'use client';

import { analyticsCards, clients, reservations, servicesHub } from '@/data/mockData';
import { palette } from '@/theme/palette';
import { MetalGlassCard } from '@/components/design-system/MetalGlassCard';
import { MetricCard } from '@/components/design-system/MetricCard';
import { SectionHeading } from '@/components/design-system/SectionHeading';
import { StatusPill } from '@/components/design-system/StatusPill';
import { CommunicationTimeline } from '@/components/reservations/CommunicationTimeline';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { ScrollView } from '@/components/ui/scroll-view';
import { Button, ButtonText } from '@/components/ui/button';
import { Sparkles, Activity, GaugeCircle, Radar } from 'lucide-react-native';

export default function DashboardPage() {
  const upcomingReservations = reservations.slice(0, 2);
  const activeClients = clients.slice(0, 4);

  return (
    <VStack space="xl">
      <SectionHeading
        title="Dashboard ospitalità"
        subtitle="Analisi in tempo reale, AI notifications e controllo dispositivi"
        icon={<Sparkles size={20} color={palette.accentSecondary} />}
        action={
          <Button variant="outline" borderColor="rgba(56,189,248,0.35)" borderRadius={14}>
            <ButtonText color={palette.accentPrimary}>Crea automatismo AI</ButtonText>
          </Button>
        }
      />

      <AnalyticsGrid />

      <HStack gap={24} flexWrap="wrap">
        <MetalGlassCard padding={20}>
          <VStack space="md" w={520}>
            <SectionHeading
              title="Utilizzo camere"
              subtitle="Suite, junior suite e camere deluxe con trend settimanali"
              icon={<GaugeCircle size={18} color={palette.accentPrimary} />}
            />
            <OccupancyVisualizer />
          </VStack>
        </MetalGlassCard>

        <MetalGlassCard padding={20}>
          <VStack space="md" w={380}>
            <SectionHeading
              title="Dispositivi IoT connessi"
              subtitle="Stato rapido camere premium"
              icon={<Radar size={18} color={palette.accentSecondary} />}
            />
            <VStack space="sm">
              {upcomingReservations.map((reservation) => (
                <Box
                  key={reservation.id}
                  borderRadius={16}
                  px={16}
                  py={12}
                  bg="rgba(15,23,42,0.55)"
                  borderWidth={1}
                  borderColor="rgba(56,189,248,0.2)"
                >
                  <VStack space="xs">
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text fontSize={15} fontWeight="600" color={palette.textPrimary}>
                        {reservation.title}
                      </Text>
                      <StatusPill
                        label={reservation.status}
                        tone={reservation.status === 'in corso' ? 'accent' : 'muted'}
                      />
                    </HStack>
                    <Text fontSize={12} color={palette.textSecondary}>
                      {reservation.roomType} · {reservation.checkIn} → {reservation.checkOut}
                    </Text>
                    <HStack space="sm" flexWrap="wrap">
                      <StatusPill label={`T ° ${reservation.iot.temperature}°C`} tone="accent" />
                      <StatusPill label={`Minibar ${reservation.iot.minibar}%`} tone="warning" />
                      <StatusPill label={`Qualità aria ${reservation.iot.airQuality}`} tone="success" />
                    </HStack>
                    <Text fontSize={12} color={palette.textMuted}>
                      Dispositivi: {reservation.iot.devices.map((device) => `${device.name} ${device.status}`).join(', ')}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </VStack>
          </VStack>
        </MetalGlassCard>
      </HStack>

      <HStack gap={24} flexWrap="wrap">
        <MetalGlassCard padding={20}>
          <VStack space="md" w={520}>
            <SectionHeading
              title="Clienti in evidenza"
              subtitle="Azioni suggerite e stato journey"
              icon={<Activity size={18} color={palette.accentPrimary} />}
            />
            <VStack space="sm">
              {activeClients.map((client) => (
                <Box
                  key={client.id}
                  borderRadius={16}
                  px={16}
                  py={12}
                  bg="rgba(15,23,42,0.5)"
                  borderWidth={1}
                  borderColor="rgba(56,189,248,0.18)"
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <VStack>
                      <Text fontSize={15} fontWeight="600" color={palette.textPrimary}>
                        {client.name}
                      </Text>
                      <Text fontSize={12} color={palette.textMuted}>
                        Ultimo soggiorno {client.lastStayDate} · {client.totalStays} soggiorni
                      </Text>
                    </VStack>
                    <StatusPill
                      label={client.status}
                      tone={client.status === 'confermato' ? 'success' : 'accent'}
                    />
                  </HStack>
                  <Text fontSize={12} color={palette.textSecondary} mt={6}>
                    Preferenze: {client.roomPreference} · {client.notes ?? 'Nessuna nota aggiuntiva'}
                  </Text>
                </Box>
              ))}
            </VStack>
          </VStack>
        </MetalGlassCard>

        <MetalGlassCard padding={20}>
          <VStack space="md" w={380}>
            <SectionHeading
              title="Hub servizi e AI"
              subtitle="Integrazioni attive e richieste in sospeso"
              icon={<Sparkles size={18} color={palette.accentSecondary} />}
            />
            <ScrollView h={300} showsVerticalScrollIndicator={false}>
              <VStack space="sm">
                {servicesHub.map((service) => (
                  <Box
                    key={service.id}
                    borderRadius={16}
                    px={16}
                    py={12}
                    bg="rgba(15,23,42,0.45)"
                    borderWidth={1}
                    borderColor="rgba(56,189,248,0.18)"
                  >
                    <VStack space="xs">
                      <HStack justifyContent="space-between" alignItems="center">
                        <Text fontSize={15} fontWeight="600" color={palette.textPrimary}>
                          {service.name}
                        </Text>
                        <StatusPill
                          label={service.status}
                          tone={service.status === 'attivo' ? 'success' : 'accent'}
                        />
                      </HStack>
                      <Text fontSize={12} color={palette.textSecondary}>
                        {service.description}
                      </Text>
                      <Button
                        size="sm"
                        variant="outline"
                        borderColor="rgba(56,189,248,0.35)"
                        bg="rgba(56,189,248,0.08)"
                        borderRadius={12}
                      >
                        <ButtonText color={palette.accentPrimary}>{service.actionLabel}</ButtonText>
                      </Button>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </ScrollView>
          </VStack>
        </MetalGlassCard>
      </HStack>

      <MetalGlassCard padding={24}>
        <SectionHeading
          title="Timeline comunicativa attiva"
          subtitle="Ogni step si illumina al completamento per gli arrivi imminenti"
          icon={<Sparkles size={18} color={palette.accentPrimary} />}
        />
        <CommunicationTimeline steps={reservations[0].communicationSteps} />
      </MetalGlassCard>
    </VStack>
  );
}

function AnalyticsGrid() {
  return (
    <HStack gap={20} flexWrap="wrap">
      {analyticsCards.map((card) => (
        <MetricCard
          key={card.id}
          title={card.title}
          value={card.value}
          change={card.change}
          trend={card.trend}
          description={card.description}
        />
      ))}
    </HStack>
  );
}

function OccupancyVisualizer() {
  const occupancyData = [
    { label: 'Suite', value: 92, trend: '+8%' },
    { label: 'Junior Suite', value: 84, trend: '+5%' },
    { label: 'Deluxe', value: 78, trend: '+3%' },
    { label: 'Executive', value: 73, trend: '+2%' },
  ];

  return (
    <VStack space="md">
      {occupancyData.map((item) => (
        <VStack key={item.label} space="xs">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize={14} color={palette.textSecondary}>
              {item.label}
            </Text>
            <StatusPill label={`${item.value}%`} tone="accent" />
          </HStack>
          <Box h={10} borderRadius={999} bg="rgba(15,23,42,0.6)" overflow="hidden">
            <Box
              h="100%"
              borderRadius={999}
              style={{
                width: `${item.value}%`,
                background: 'linear-gradient(90deg, rgba(56,189,248,0.85), rgba(168,85,247,0.8))',
              }}
            />
          </Box>
          <Text fontSize={12} color={palette.textMuted}>
            Trend settimanale {item.trend}
          </Text>
        </VStack>
      ))}
    </VStack>
  );
}

// Validazione: dashboard riprogetta analytics, IoT, hub servizi e timeline con stile metal-glassy coerente.
