'use client';

import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { clients, reservations } from '@/data/mockData';
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
import { Mail, PhoneCall, Thermometer, Wine, Sparkles } from 'lucide-react-native';

interface ClientDetailPageProps {
  params: { id: string };
}

export default function ClientDetailPage({ params }: ClientDetailPageProps) {
  const client = clients.find((item) => item.id === params.id);
  if (!client) {
    notFound();
  }

  const clientReservations = reservations.filter((reservation) => reservation.clientId === client!.id);
  const latestReservation = clientReservations[0];

  return (
    <VStack space="xl">
      <SectionHeading
        title={client!.name}
        subtitle="Profilo ospite, preferenze e automazioni collegate"
        icon={<Sparkles size={20} color={palette.accentSecondary} />}
        action={<StatusPill label={`Stato: ${client!.status}`} tone="accent" />}
      />

      <HStack gap={24} flexWrap="wrap">
        <MetalGlassCard padding={24}>
          <VStack space="md" w={420}>
            <Text fontSize={16} fontWeight="600" color={palette.textPrimary}>
              Contatti principali
            </Text>
            <VStack space="sm">
              <InfoRow icon={<Mail size={16} color={palette.accentPrimary} />} label="Email" value={client!.email} />
              <InfoRow icon={<PhoneCall size={16} color={palette.accentPrimary} />} label="Telefono" value={client!.phone} />
              <InfoRow
                icon={<Wine size={16} color={palette.accentPrimary} />}
                label="Preferenze"
                value={client!.roomPreference}
              />
              <InfoRow
                icon={<Sparkles size={16} color={palette.accentPrimary} />}
                label="Note"
                value={client!.notes ?? 'Nessuna nota aggiuntiva'}
              />
            </VStack>
            <StatusPill label={client!.newsletter ? 'Newsletter attiva' : 'No newsletter'} tone="success" />
            <Text fontSize={12} color={palette.textMuted}>
              Ultimo soggiorno {client!.lastStayDate} · {client!.totalStays} soggiorni totali
            </Text>
          </VStack>
        </MetalGlassCard>

        <MetalGlassCard padding={24}>
          <VStack space="md" w={420}>
            <Text fontSize={16} fontWeight="600" color={palette.textPrimary}>
              Parametri stanza in tempo reale
            </Text>
            {latestReservation ? (
              <VStack space="md">
                <StatusPill label={latestReservation.title} tone="accent" />
                <HStack gap={12} flexWrap="wrap">
                  <StatusPill label={`Temperatura ${latestReservation.iot.temperature}°C`} tone="accent" />
                  <StatusPill label={`Minibar ${latestReservation.iot.minibar}%`} tone="warning" />
                  <StatusPill label={`Qualità aria ${latestReservation.iot.airQuality}`} tone="success" />
                </HStack>
                <Text fontSize={13} color={palette.textSecondary}>
                  Dispositivi collegati: {latestReservation.iot.devices.map((device) => `${device.name} ${device.status}`).join(', ')}
                </Text>
                <Button variant="outline" borderColor="rgba(56,189,248,0.3)" borderRadius={14}>
                  <ButtonText color={palette.accentPrimary}>Programma scenari IoT</ButtonText>
                </Button>
              </VStack>
            ) : (
              <Text fontSize={13} color={palette.textMuted}>
                Nessuna prenotazione associata.
              </Text>
            )}
          </VStack>
        </MetalGlassCard>
      </HStack>

      {latestReservation && (
        <MetalGlassCard padding={24}>
          <SectionHeading
            title="Timeline comunicazioni"
            subtitle="Monitoraggio journey automatizzato"
            icon={<Thermometer size={18} color={palette.accentPrimary} />}
          />
          <CommunicationTimeline steps={latestReservation.communicationSteps} />
        </MetalGlassCard>
      )}

      <MetalGlassCard padding={24}>
        <Text fontSize={16} fontWeight="600" color={palette.textPrimary}>
          Prenotazioni associate
        </Text>
        <VStack space="sm" mt={12}>
          {clientReservations.map((reservation) => (
            <Box
              key={reservation.id}
              borderRadius={16}
              px={18}
              py={12}
              bg="rgba(15,23,42,0.5)"
              borderWidth={1}
              borderColor="rgba(56,189,248,0.18)"
            >
              <HStack justifyContent="space-between" alignItems="center">
                <VStack>
                  <Text fontSize={14} fontWeight="600" color={palette.textPrimary}>
                    {reservation.title}
                  </Text>
                  <Text fontSize={12} color={palette.textSecondary}>
                    {reservation.checkIn} → {reservation.checkOut} · {reservation.roomType}
                  </Text>
                </VStack>
                <StatusPill label={reservation.status} tone="accent" />
              </HStack>
            </Box>
          ))}
        </VStack>
      </MetalGlassCard>
    </VStack>
  );
}

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <HStack alignItems="center" gap={12}>
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
        {icon}
      </Box>
      <VStack>
        <Text fontSize={12} color={palette.textMuted}>
          {label}
        </Text>
        <Text fontSize={14} color={palette.textSecondary}>
          {value}
        </Text>
      </VStack>
    </HStack>
  );
}

// Validazione: dettaglio cliente completo di contatti, IoT e timeline comunicativa.
