import { notFound } from 'next/navigation';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Divider,
  Box,
  Button,
} from '@gluestack-ui/themed';
import Link from 'next/link';
import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { formatDate, formatCurrency, formatTimeDistance } from '@/utils/format';
import { GlassCard } from '@/components/common/GlassCard';

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const booking = bookings.find((item) => item.id === params.id);
  if (!booking) {
    notFound();
  }
  const client = clients.find((item) => item.id === booking.clientId);

  return (
    <VStack space="xl">
      <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" space="lg">
        <VStack space="xs">
          <Heading size="lg" color="white">
            Dettaglio Prenotazione
          </Heading>
          <Text color="rgba(148, 163, 184, 0.85)">
            {booking.number} · {client?.name} {client?.surname}
          </Text>
        </VStack>
        <Button asChild variant="outline" borderColor="rgba(255,255,255,0.25)">
          <Link href="/bookings">Torna a prenotazioni</Link>
        </Button>
      </HStack>

      <GlassCard>
        <HStack justifyContent="space-between" flexWrap="wrap" space="lg">
          <VStack space="sm">
            <Text color="rgba(148,163,184,0.8)">Stato</Text>
            <Badge variant="solid" bg="rgba(79,140,255,0.8)" borderColor="transparent">
              <Text color="#0B1220" fontWeight="$semibold">
                {booking.status.toUpperCase()}
              </Text>
            </Badge>
          </VStack>
          <VStack space="sm">
            <Text color="rgba(148,163,184,0.8)">Periodo</Text>
            <Text color="rgba(226,232,240,0.95)">
              {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
            </Text>
          </VStack>
          <VStack space="sm">
            <Text color="rgba(148,163,184,0.8)">Valore</Text>
            <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
              {formatCurrency(booking.value)}
            </Text>
          </VStack>
          <VStack space="sm">
            <Text color="rgba(148,163,184,0.8)">Assegnata a</Text>
            <Text color="rgba(226,232,240,0.95)">{booking.assignedTo}</Text>
          </VStack>
        </HStack>
      </GlassCard>

      <HStack space="lg" flexWrap="wrap" alignItems="flex-start">
        <GlassCard flexBasis="520px" flexGrow={2}>
          <Heading size="md" color="white" mb="$4">
            Comunicazioni
          </Heading>
          <VStack space="md">
            {booking.communications.map((event) => (
              <TimelineEntry key={event.id} title={event.title} timestamp={event.timestamp} tone={event.tone} />
            ))}
          </VStack>
        </GlassCard>
        <GlassCard flexBasis="360px" flexGrow={1}>
          <Heading size="md" color="white" mb="$4">
            Tag e note
          </Heading>
          <VStack space="md">
            <HStack space="sm" flexWrap="wrap">
              {booking.tags.map((tag) => (
                <Badge key={tag} variant="solid" bg="rgba(79,140,255,0.18)" borderColor="transparent">
                  <Text color="#dbeafe">{tag}</Text>
                </Badge>
              ))}
            </HStack>
            {booking.lostReason && (
              <Box px="$4" py="$3" rounded="$xl" bg="rgba(248,113,113,0.12)">
                <Text color="rgba(248,113,113,0.9)" fontWeight="$semibold">
                  Prenotazione persa
                </Text>
                <Text color="rgba(226,232,240,0.9)" fontSize="$sm">
                  {booking.lostReason}
                </Text>
              </Box>
            )}
          </VStack>
        </GlassCard>
      </HStack>

      <GlassCard>
        <Heading size="md" color="white" mb="$4">
          Timeline prenotazione
        </Heading>
        <VStack space="md">
          {booking.timeline.map((event) => (
            <TimelineEntry key={event.id} title={event.title} timestamp={event.timestamp} tone={event.tone} />
          ))}
        </VStack>
      </GlassCard>
    </VStack>
  );
}

const TimelineEntry = ({
  title,
  timestamp,
  tone,
}: {
  title: string;
  timestamp: string;
  tone: 'success' | 'warning' | 'info' | 'critical';
}) => (
  <HStack space="md" alignItems="flex-start">
    <Box width={10} height={10} rounded="$full" mt={6} bg={toneColor(tone)} />
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

const toneColor = (tone: 'success' | 'warning' | 'info' | 'critical') => {
  switch (tone) {
    case 'success':
      return 'rgba(34,197,94,0.9)';
    case 'warning':
      return 'rgba(249,115,22,0.9)';
    case 'critical':
      return 'rgba(248,113,113,0.9)';
    default:
      return 'rgba(79,140,255,0.9)';
  }
};
