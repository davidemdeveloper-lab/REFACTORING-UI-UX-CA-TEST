import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Divider,
  Button,
} from '@gluestack-ui/themed';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { clients } from '@/data/clients';
import { bookings } from '@/data/bookings';
import { formatDate, formatTimeDistance } from '@/utils/format';
import { GlassCard } from '@/components/common/GlassCard';

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = clients.find((item) => item.id === params.id);

  if (!client) {
    notFound();
  }

  const relatedBookings = bookings.filter((booking) => booking.clientId === client.id);
  const primaryBooking = relatedBookings[0];

  return (
    <VStack space="xl">
      <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" space="lg">
        <VStack space="xs">
          <Heading size="lg" color="white">
            {client.name} {client.surname}
          </Heading>
          <Text color="rgba(148, 163, 184, 0.85)">
            Ultimo aggiornamento {formatTimeDistance(client.lastUpdate)} · {client.tags.join(' • ')}
          </Text>
        </VStack>
        <HStack space="md">
          <Button variant="outline" borderColor="rgba(255,255,255,0.2)">
            <HStack space="sm" alignItems="center">
              <Mail size={16} color="rgba(226,232,240,0.9)" />
              <Text color="rgba(226,232,240,0.9)">Invia email</Text>
            </HStack>
          </Button>
          <Button variant="outline" borderColor="rgba(255,255,255,0.2)">
            <HStack space="sm" alignItems="center">
              <MessageCircle size={16} color="rgba(226,232,240,0.9)" />
              <Text color="rgba(226,232,240,0.9)">Apri chat</Text>
            </HStack>
          </Button>
        </HStack>
      </HStack>

      <HStack space="lg" flexWrap="wrap" alignItems="flex-start">
        <GlassCard flexBasis="420px" flexGrow={1}>
          <Heading size="md" color="white" mb="$4">
            Anagrafica Cliente
          </Heading>
          <VStack space="md">
            <InfoRow label="Email" value={client.email} icon={<Mail size={16} color="#8CB6FF" />} />
            <InfoRow label="Telefono" value={client.phone} icon={<Phone size={16} color="#8CB6FF" />} />
            <InfoRow label="Ultimo soggiorno" value={formatDate(client.lastStayDate)} />
            <InfoRow label="Numero soggiorni" value={`${client.staysCount}`} />
            <InfoRow label="Note" value={client.notes} />
          </VStack>
        </GlassCard>

        <GlassCard flexBasis="520px" flexGrow={2}>
          <Heading size="md" color="white" mb="$4">
            Comunicazione con il cliente
          </Heading>
          <VStack space="md">
            {primaryBooking ? (
              primaryBooking.timeline.map((event) => (
                <TimelineItem key={event.id} title={event.title} timestamp={event.timestamp} tone={event.tone} />
              ))
            ) : (
              <Text color="rgba(148, 163, 184, 0.85)">Nessuna comunicazione registrata.</Text>
            )}
          </VStack>
        </GlassCard>
      </HStack>

      <GlassCard>
        <Heading size="md" color="white" mb="$4">
          Prenotazioni collegate
        </Heading>
        <VStack space="md">
          {relatedBookings.map((booking) => (
            <Box key={booking.id} px="$4" py="$3" rounded="$xl" bg="rgba(79, 140, 255, 0.08)">
              <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <VStack space="xs">
                  <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
                    {booking.number}
                  </Text>
                  <Text color="rgba(148, 163, 184, 0.8)" fontSize="$sm">
                    {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)} · {booking.roomType}
                  </Text>
                </VStack>
                <Badge variant="outline" borderColor="rgba(79, 140, 255, 0.6)" bg="rgba(79, 140, 255, 0.12)">
                  <Text color="#8CB6FF">{booking.status.toUpperCase()}</Text>
                </Badge>
              </HStack>
              <Divider my="$3" opacity={0.12} />
              <Text color="rgba(148, 163, 184, 0.75)" fontSize="$xs">
                {booking.tags.join(' • ')}
              </Text>
            </Box>
          ))}
        </VStack>
      </GlassCard>
    </VStack>
  );
}

const InfoRow = ({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) => (
  <HStack space="md" alignItems="center">
    {icon}
    <VStack space="xs">
      <Text color="rgba(148, 163, 184, 0.75)" fontSize="$xs">
        {label}
      </Text>
      <Text color="rgba(226,232,240,0.95)" fontWeight="$medium">
        {value}
      </Text>
    </VStack>
  </HStack>
);

const TimelineItem = ({
  title,
  timestamp,
  tone,
}: {
  title: string;
  timestamp: string;
  tone: 'success' | 'warning' | 'info' | 'critical';
}) => (
  <HStack space="md" alignItems="flex-start">
    <Box width={10} height={10} rounded="$full" mt={6} bg={timelineColor(tone)} />
    <VStack space="xs" flex={1}>
      <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
        {title}
      </Text>
      <Text color="rgba(148,163,184,0.75)" fontSize="$xs">
        {formatTimeDistance(timestamp)}
      </Text>
      <Divider my="$2" opacity={0.12} />
    </VStack>
  </HStack>
);

const timelineColor = (tone: 'success' | 'warning' | 'info' | 'critical') => {
  switch (tone) {
    case 'success':
      return 'rgba(34, 197, 94, 0.9)';
    case 'warning':
      return 'rgba(249, 115, 22, 0.9)';
    case 'critical':
      return 'rgba(248, 113, 113, 0.9)';
    default:
      return 'rgba(79, 140, 255, 0.9)';
  }
};
