'use client';

import { notFound } from 'next/navigation';
import { reservations, clients } from '@/data/mockData';
import { palette } from '@/theme/palette';
import { SectionHeading } from '@/components/design-system/SectionHeading';
import { MetalGlassCard } from '@/components/design-system/MetalGlassCard';
import { StatusPill } from '@/components/design-system/StatusPill';
import { CommunicationTimeline } from '@/components/reservations/CommunicationTimeline';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Sparkles, CalendarCheck, LampCeiling } from 'lucide-react-native';

interface ReservationDetailPageProps {
  params: { id: string };
}

export default function ReservationDetailPage({ params }: ReservationDetailPageProps) {
  const reservation = reservations.find((item) => item.id === params.id);
  if (!reservation) {
    notFound();
  }

  const client = clients.find((item) => item.id === reservation!.clientId);

  return (
    <VStack space="xl">
      <SectionHeading
        title={reservation!.title}
        subtitle={`${reservation!.checkIn} → ${reservation!.checkOut} · ${reservation!.roomType}`}
        icon={<CalendarCheck size={20} color={palette.accentPrimary} />}
        action={<StatusPill label={reservation!.status} tone="accent" />}
      />

      <HStack gap={24} flexWrap="wrap">
        <MetalGlassCard padding={24}>
          <VStack space="md" w={420}>
            <Text fontSize={16} fontWeight="600" color={palette.textPrimary}>
              Dettagli cliente
            </Text>
            <Box borderRadius={16} px={16} py={12} bg="rgba(15,23,42,0.5)" borderWidth={1} borderColor="rgba(56,189,248,0.2)">
              <VStack space="xs">
                <Text fontSize={14} fontWeight="600" color={palette.textPrimary}>
                  {client?.name ?? 'Cliente'}
                </Text>
                <Text fontSize={12} color={palette.textSecondary}>
                  {client?.email}
                </Text>
                <Text fontSize={12} color={palette.textMuted}>
                  Preferenze: {client?.roomPreference}
                </Text>
              </VStack>
            </Box>
            <Text fontSize={13} color={palette.textSecondary}>
              Valore soggiorno: € {reservation!.value} · Servizi {reservation!.services.join(', ')}
            </Text>
            <Button variant="outline" borderColor="rgba(56,189,248,0.3)" borderRadius={14}>
              <ButtonText color={palette.accentPrimary}>Apri profilo cliente</ButtonText>
            </Button>
          </VStack>
        </MetalGlassCard>

        <MetalGlassCard padding={24}>
          <VStack space="md" w={420}>
            <Text fontSize={16} fontWeight="600" color={palette.textPrimary}>
              Controllo stanza e IoT
            </Text>
            <HStack gap={12} flexWrap="wrap">
              <StatusPill label={`Temperatura ${reservation!.iot.temperature}°C`} tone="accent" />
              <StatusPill label={`Minibar ${reservation!.iot.minibar}%`} tone="warning" />
              <StatusPill label={`Qualità aria ${reservation!.iot.airQuality}`} tone="success" />
            </HStack>
            <VStack space="xs">
              {reservation!.iot.devices.map((device) => (
                <HStack key={device.name} alignItems="center" gap={12}>
                  <Box
                    w={36}
                    h={36}
                    borderRadius={12}
                    bg="rgba(56,189,248,0.12)"
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={1}
                    borderColor="rgba(56,189,248,0.25)"
                  >
                    <LampCeiling size={16} color={palette.accentPrimary} />
                  </Box>
                  <Text fontSize={13} color={palette.textSecondary}>
                    {device.name} · {device.status}
                  </Text>
                </HStack>
              ))}
            </VStack>
            <Button variant="outline" borderColor="rgba(56,189,248,0.3)" borderRadius={14}>
              <ButtonText color={palette.accentPrimary}>Imposta scenario comfort</ButtonText>
            </Button>
          </VStack>
        </MetalGlassCard>
      </HStack>

      <MetalGlassCard padding={24}>
        <SectionHeading
          title="Timeline comunicativa"
          subtitle="Ogni step si illumina al completamento"
          icon={<Sparkles size={18} color={palette.accentSecondary} />}
        />
        <CommunicationTimeline steps={reservation!.communicationSteps} />
      </MetalGlassCard>

      <MetalGlassCard padding={24}>
        <Text fontSize={16} fontWeight="600" color={palette.textPrimary}>
          Azioni consigliate AI
        </Text>
        <HStack gap={12} mt={12} flexWrap="wrap">
          <StatusPill label="Invia reminder check-in" tone="accent" />
          <StatusPill label="Programma welcome chat" tone="accent" />
          <StatusPill label="Suggerisci upgrade SPA" tone="success" />
        </HStack>
        <Text fontSize={13} color={palette.textSecondary} mt={10}>
          L’assistente AI propone follow-up entro 4 ore per richieste senza risposta. Integrato con notifiche dedicate.
        </Text>
      </MetalGlassCard>
    </VStack>
  );
}

// Validazione: dettaglio prenotazione completo di cliente, IoT e timeline luminosa conforme.
