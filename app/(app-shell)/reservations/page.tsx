'use client';

import { reservations, clients } from '@/data/mockData';
import { palette } from '@/theme/palette';
import { SectionHeading } from '@/components/design-system/SectionHeading';
import { MetalGlassCard } from '@/components/design-system/MetalGlassCard';
import { StatusPill } from '@/components/design-system/StatusPill';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { ScrollView } from '@/components/ui/scroll-view';
import Link from 'next/link';
import { Button, ButtonText } from '@/components/ui/button';
import { CalendarClock, Filter } from 'lucide-react-native';

const statusToneMap: Record<string, 'accent' | 'success' | 'warning'> = {
  'pre-arrivo': 'accent',
  'in corso': 'success',
  'post-soggiorno': 'warning',
};

export default function ReservationsPage() {
  return (
    <VStack space="xl">
      <SectionHeading
        title="Lista prenotazioni"
        subtitle="Controlla stato journey, servizi collegati e valore soggiorno"
        icon={<CalendarClock size={20} color={palette.accentPrimary} />}
        action={
          <Button variant="outline" borderColor="rgba(56,189,248,0.35)" borderRadius={14}>
            <ButtonText color={palette.accentPrimary}>Aggiungi prenotazione</ButtonText>
          </Button>
        }
      />

      <MetalGlassCard padding={20}>
        <VStack space="md">
          <HStack space="md" flexWrap="wrap" alignItems="center">
            <Input
              w={280}
              variant="outline"
              bg="rgba(8,15,28,0.65)"
              borderColor="rgba(56,189,248,0.25)"
              borderRadius={20}
            >
              <Filter size={18} color={palette.textMuted} style={{ marginHorizontal: 10 }} />
              <InputField placeholder="Filtra per stato o cliente" />
            </Input>
            <StatusPill label="Arrivi 7gg: 8" tone="accent" />
            <StatusPill label="Late check-out: 3" tone="warning" />
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: '60vh' }}>
            <VStack space="sm">
              {reservations.map((reservation) => {
                const client = clients.find((item) => item.id === reservation.clientId);
                return (
                  <Link key={reservation.id} href={`/reservations/${reservation.id}`} style={{ textDecoration: 'none' }}>
                    <Box
                      borderRadius={18}
                      px={18}
                      py={16}
                      bg="rgba(15,23,42,0.5)"
                      borderWidth={1}
                      borderColor="rgba(56,189,248,0.2)"
                      _hover={{ bg: 'rgba(56,189,248,0.1)' }}
                    >
                      <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={12}>
                        <VStack>
                          <Text fontSize={16} fontWeight="600" color={palette.textPrimary}>
                            {reservation.title}
                          </Text>
                          <Text fontSize={13} color={palette.textSecondary}>
                            {client?.name ?? 'Cliente'} · {reservation.roomType} · € {reservation.value}
                          </Text>
                        </VStack>
                        <StatusPill
                          label={reservation.status}
                          tone={statusToneMap[reservation.status] ?? 'accent'}
                        />
                      </HStack>
                      <HStack gap={10} mt={12} flexWrap="wrap">
                        {reservation.services.map((service) => (
                          <StatusPill key={service} label={service} tone="muted" />
                        ))}
                      </HStack>
                    </Box>
                  </Link>
                );
              })}
            </VStack>
          </ScrollView>
        </VStack>
      </MetalGlassCard>
    </VStack>
  );
}

// Validazione: lista prenotazioni con filtri e stato evidenti, pronta per navigazione.
