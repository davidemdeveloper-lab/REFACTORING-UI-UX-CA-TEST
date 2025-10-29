'use client';

import { useParams } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GlassPanel } from '@/components/common/GlassPanel';
import { VStack, HStack, Text, Badge, Button, Progress, ProgressFilledTrack } from '@gluestack-ui/themed';
import { TimelineComms } from '@/components/timeline/TimelineComms';
import { palette } from '@/theme/palette';

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const booking = useAppSelector((state) => state.bookings.items.find((item) => item.id === params.id));
  const client = useAppSelector((state) =>
    state.clients.items.find((item) => item.id === booking?.clientId)
  );

  if (!booking) {
    return (
      <Text fontSize={16} color={palette.state.danger}>
        Prenotazione non trovata.
      </Text>
    );
  }

  return (
    <VStack space="md">
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Prenotazioni', href: '/bookings' },
          { label: booking.id }
        ]}
      />
      <HStack justifyContent="space-between" alignItems="center">
        <VStack>
          <Text fontSize={24} fontWeight="700">
            {booking.roomType}
          </Text>
          <Text fontSize={13} color={palette.steel[200]}>
            {new Date(booking.checkIn).toLocaleDateString('it-IT')} →{' '}
            {new Date(booking.checkOut).toLocaleDateString('it-IT')}
          </Text>
        </VStack>
        <Badge bg={statusColor(booking.status)} color={palette.neutrals.white}>
          {booking.status}
        </Badge>
      </HStack>
      <HStack flexWrap="wrap" space="md">
        <GlassPanel flex={1} minWidth={280}>
          <VStack space="sm">
            <Text fontSize={16} fontWeight="600">
              Stato e prossima azione
            </Text>
            <Text fontSize={13} color={palette.steel[200]}>
              Prossimo passo consigliato: invia reminder personalizzato 24h prima del check-in.
            </Text>
            <Button variant="outline" action="primary">
              Pianifica reminder
            </Button>
          </VStack>
        </GlassPanel>
        <GlassPanel flex={1} minWidth={280}>
          <VStack space="sm">
            <Text fontSize={16} fontWeight="600">
              IoT stanza
            </Text>
            <HStack space="lg" flexWrap="wrap">
              <VStack>
                <Text fontSize={12} color={palette.steel[200]}>
                  Temperatura
                </Text>
                <Text fontSize={20} fontWeight="700">
                  {booking.iot.temperature}°C
                </Text>
              </VStack>
              <VStack>
                <Text fontSize={12} color={palette.steel[200]}>
                  Minibar
                </Text>
                <Progress value={booking.iot.minibarFill} w={160}>
                  <ProgressFilledTrack bg={palette.teal[500]} />
                </Progress>
                <Text fontSize={12}>{booking.iot.minibarFill}% pieno</Text>
              </VStack>
              <VStack space="xs">
                <Text fontSize={12} color={palette.steel[200]}>
                  Controlli
                </Text>
                <HStack space="sm">
                  <Button variant={booking.iot.tvOn ? 'outline' : 'solid'} size="sm">
                    {booking.iot.tvOn ? 'Spegni TV' : 'Accendi TV'}
                  </Button>
                  <Button variant={booking.iot.blindsDown ? 'outline' : 'solid'} size="sm">
                    {booking.iot.blindsDown ? 'Alza tapparelle' : 'Abbassa tapparelle'}
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </GlassPanel>
      </HStack>
      <GlassPanel>
        <VStack space="sm">
          <Text fontSize={16} fontWeight="600">
            Timeline comunicazioni
          </Text>
          <TimelineComms steps={booking.comms} />
        </VStack>
      </GlassPanel>
      <HStack flexWrap="wrap" space="md">
        <GlassPanel flex={1} minWidth={280}>
          <VStack space="sm">
            <Text fontSize={16} fontWeight="600">
              Dati cliente
            </Text>
            <Text fontSize={13} color={palette.steel[200]}>
              {client?.name}
            </Text>
            <Text fontSize={13} color={palette.steel[200]}>
              {client?.email}
            </Text>
            <Button variant="outline">Apri profilo cliente</Button>
          </VStack>
        </GlassPanel>
        <GlassPanel flex={1} minWidth={280}>
          <VStack space="sm">
            <Text fontSize={16} fontWeight="600">
              Programma SPA
            </Text>
            <Text fontSize={13} color={palette.steel[200]}>
              {booking.spaOptIn
                ? 'Il cliente ha aderito alla SPA, invia un upgrade wellness.'
                : 'Suggerisci un pacchetto benessere per il soggiorno.'}
            </Text>
            <Button variant={booking.spaOptIn ? 'outline' : 'solid'} action="primary">
              {booking.spaOptIn ? 'Invia promo SPA' : 'Invita alla SPA'}
            </Button>
          </VStack>
        </GlassPanel>
      </HStack>
    </VStack>
  );
}

const statusColor = (status: string) => {
  switch (status) {
    case 'nuovo':
      return palette.state.info;
    case 'confermato':
      return palette.accent[600];
    case 'check-in':
      return palette.teal[500];
    case 'check-out':
      return palette.steel[400];
    case 'perso':
      return palette.state.danger;
    default:
      return palette.state.warning;
  }
};
