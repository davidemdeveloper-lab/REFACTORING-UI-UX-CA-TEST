'use client';

import { useParams } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GlassPanel } from '@/components/common/GlassPanel';
import { VStack, HStack, Text, Badge, Button, Divider, Box, Progress, ProgressFilledTrack } from '@gluestack-ui/themed';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

export default function ClientDetailPage() {
  const params = useParams<{ id: string }>();
  const client = useAppSelector((state) => state.clients.items.find((item) => item.id === params.id));
  const bookings = useAppSelector((state) =>
    state.bookings.items.filter((booking) => booking.clientId === params.id)
  );

  const iotState = bookings[0]?.iot;

  if (!client) {
    return (
      <Text fontSize={16} color={palette.state.danger}>
        Cliente non trovato.
      </Text>
    );
  }

  const spaOptIn = client.spaOptIn;

  return (
    <VStack space="md">
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Clienti', href: '/clients' },
          { label: client.name }
        ]}
      />
      <Text fontSize={24} fontWeight="700">
        {client.name}
      </Text>
      <GlassPanel>
        <VStack space="md">
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Text fontSize={16} fontWeight="600">
                Anagrafica
              </Text>
              <Text fontSize={13} color={palette.steel[200]}>
                Email: {client.email}
              </Text>
              <Text fontSize={13} color={palette.steel[200]}>
                Telefono: {client.phone}
              </Text>
            </VStack>
            <Badge bg={client.vip ? palette.teal[500] : palette.accent[600]} color={palette.neutrals.white}>
              {client.vip ? 'VIP' : 'Ospite'}
            </Badge>
          </HStack>
          <Divider bg="rgba(148,163,184,0.2)" />
          <Text fontSize={13} color={palette.steel[200]}>
            Note: {client.notes || 'Nessuna nota disponibile.'}
          </Text>
        </VStack>
      </GlassPanel>
      <HStack flexWrap="wrap" space="md">
        <GlassPanel flex={1} minWidth={280}>
          <VStack space="sm">
            <Text fontSize={16} fontWeight="600">
              Prenotazioni collegate
            </Text>
            {bookings.map((booking) => (
              <Box
                key={booking.id}
                borderRadius={tokens.radii.lg}
                px={12}
                py={10}
                bg="rgba(15,23,42,0.35)"
                borderWidth={1}
                borderColor="rgba(148,163,184,0.2)"
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <VStack>
                    <Text fontSize={14} fontWeight="600">
                      {booking.roomType}
                    </Text>
                    <Text fontSize={12} color={palette.steel[200]}>
                      {new Date(booking.checkIn).toLocaleDateString('it-IT')} →{' '}
                      {new Date(booking.checkOut).toLocaleDateString('it-IT')}
                    </Text>
                  </VStack>
                  <Badge bg={badgeColor(booking.status)} color={palette.neutrals.white}>
                    {booking.status}
                  </Badge>
                </HStack>
              </Box>
            ))}
            {bookings.length === 0 ? (
              <Text fontSize={13} color={palette.steel[200]}>
                Nessuna prenotazione collegata.
              </Text>
            ) : null}
          </VStack>
        </GlassPanel>
        <GlassPanel flex={1} minWidth={280}>
          <VStack space="sm">
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize={16} fontWeight="600">
                Programma SPA
              </Text>
              <Badge
                bg={spaOptIn ? palette.teal[500] : 'rgba(148,163,184,0.3)'}
                color={spaOptIn ? palette.neutrals.white : palette.steel[200]}
              >
                {spaOptIn ? 'Iscritto' : 'Non iscritto'}
              </Badge>
            </HStack>
            <Text fontSize={13} color={palette.steel[200]}>
              {spaOptIn
                ? 'Proponi pacchetti benessere personalizzati e ricorda check-up MADIP.'
                : 'Invita il cliente a scoprire i percorsi benessere con un codice dedicato.'}
            </Text>
            <Button variant={spaOptIn ? 'outline' : 'solid'} action="primary">
              {spaOptIn ? 'Invia promemoria SPA' : 'Invita a iscriversi'}
            </Button>
          </VStack>
        </GlassPanel>
      </HStack>
      <GlassPanel>
        <VStack space="sm">
          <Text fontSize={16} fontWeight="600">
            IoT camera
          </Text>
          {iotState ? (
            <HStack space="lg" flexWrap="wrap">
              <VStack>
                <Text fontSize={12} color={palette.steel[200]}>
                  Temperatura
                </Text>
                <Text fontSize={20} fontWeight="700">
                  {iotState.temperature}°C
                </Text>
              </VStack>
              <VStack>
                <Text fontSize={12} color={palette.steel[200]}>
                  Minibar
                </Text>
                <Progress value={iotState.minibarFill} w={160}>
                  <ProgressFilledTrack bg={palette.teal[500]} />
                </Progress>
                <Text fontSize={12}>{iotState.minibarFill}% pieno</Text>
              </VStack>
              <VStack space="xs">
                <Text fontSize={12} color={palette.steel[200]}>
                  Controlli rapidi
                </Text>
                <HStack space="sm">
                  <Button variant={iotState.tvOn ? 'outline' : 'solid'} size="sm">
                    {iotState.tvOn ? 'Spegni TV' : 'Accendi TV'}
                  </Button>
                  <Button variant={iotState.blindsDown ? 'outline' : 'solid'} size="sm">
                    {iotState.blindsDown ? 'Alza tapparelle' : 'Abbassa tapparelle'}
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          ) : (
            <Text fontSize={13} color={palette.steel[200]}>
              Nessun dispositivo collegato per questa camera.
            </Text>
          )}
        </VStack>
      </GlassPanel>
      <GlassPanel>
        <VStack space="sm">
          <Text fontSize={16} fontWeight="600">
            Azioni rapide
          </Text>
          <HStack space="sm" flexWrap="wrap">
            <Button variant="outline">Apri chat</Button>
            <Button variant="outline">Invia template email</Button>
            <Button variant="outline">Programma follow-up</Button>
          </HStack>
        </VStack>
      </GlassPanel>
    </VStack>
  );
}

const badgeColor = (status: string) => {
  switch (status) {
    case 'confermato':
      return palette.accent[600];
    case 'check-in':
      return palette.teal[500];
    case 'perso':
      return palette.state.danger;
    default:
      return palette.state.info;
  }
};
