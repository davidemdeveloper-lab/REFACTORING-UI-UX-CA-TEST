import { GlassCard } from '@/components/layout/GlassCard';
import { palette } from '@/design/palette';
import { mockReservations } from '@/components/data/mockData';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import Link from 'next/link';
import { Icon } from '@/components/layout/UiIcon';

export default function ReservationsPage() {
  return (
    <VStack space="lg">
      <HStack className="items-center justify-between">
        <VStack>
          <Text className="text-2xl font-semibold" style={{ color: palette.textPrimary }}>
            Lista prenotazioni
          </Text>
          <Text className="text-sm" style={{ color: palette.textSecondary }}>
            Gestisci stati, comunicazioni e controlli camera in tempo reale.
          </Text>
        </VStack>
        <Link href="/reservations/new">
          <Button
            style={{
              borderRadius: 16,
              paddingHorizontal: 20,
              paddingVertical: 12,
              background: palette.surfaceAlt,
              borderColor: palette.borderHighlight,
            }}
          >
            <HStack space="sm" className="items-center">
              <Icon name="CalendarPlus" size={18} color={palette.accentPrimary} />
              <Text className="text-sm font-medium" style={{ color: palette.accentPrimary }}>
                Nuova prenotazione
              </Text>
            </HStack>
          </Button>
        </Link>
      </HStack>
      <GlassCard>
        <HStack className="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <HStack className="flex-1 items-center gap-4">
            <Box className="flex-1" style={{ position: 'relative' }}>
              <Input
                placeholder="Cerca per ospite, codice o stato"
                className="pl-10 pr-4 py-2 rounded-xl"
                style={{
                  backgroundColor: 'rgba(17, 24, 38, 0.65)',
                  borderColor: palette.glassStroke,
                  color: palette.textPrimary,
                }}
              />
              <Box style={{ position: 'absolute', top: 12, left: 12 }}>
                <Icon name="Search" size={16} color={palette.textMuted} />
              </Box>
            </Box>
            <Button
              style={{
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 10,
                background: 'transparent',
                borderColor: palette.borderSoft,
              }}
            >
              <HStack space="sm" className="items-center">
                <Text className="text-xs" style={{ color: palette.textSecondary }}>
                  Filtra stato
                </Text>
                <Icon name="Filter" size={14} color={palette.textSecondary} />
              </HStack>
            </Button>
          </HStack>
          <HStack className="flex-wrap gap-2">
            {['In arrivo', 'In soggiorno', 'Follow-up', 'Pagamenti'].map((filter) => (
              <Button
                key={filter}
                style={{
                  borderRadius: 999,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  background: 'transparent',
                  borderColor: palette.borderSoft,
                }}
              >
                <Text className="text-xs" style={{ color: palette.textSecondary }}>
                  {filter}
                </Text>
              </Button>
            ))}
          </HStack>
        </HStack>
      </GlassCard>
      <VStack space="md">
        {mockReservations.map((reservation) => (
          <GlassCard key={reservation.id}>
            <HStack className="items-start justify-between gap-3">
              <VStack space="xs">
                <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                  {reservation.code}
                </Text>
                <Text className="text-xs" style={{ color: palette.textSecondary }}>
                  {reservation.guest} · {reservation.roomType}
                </Text>
                <Text className="text-xs" style={{ color: palette.textMuted }}>
                  {reservation.arrival} → {reservation.departure}
                </Text>
              </VStack>
              <VStack className="items-end" space="xs">
                <GlassCard padding={10} gap={4} borderColor={palette.borderSoft}>
                  <Text className="text-xs" style={{ color: palette.textSecondary }}>
                    Stato
                  </Text>
                  <Text className="text-sm font-medium" style={{ color: palette.accentSecondary }}>
                    {reservation.status}
                  </Text>
                </GlassCard>
                <Text className="text-xs" style={{ color: palette.accentWarm }}>
                  Prossima azione: {reservation.nextAction}
                </Text>
                <Link href={`/reservations/${reservation.id}`}>
                  <Button
                    style={{
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      background: 'transparent',
                      borderColor: palette.borderSoft,
                    }}
                  >
                    <HStack space="sm" className="items-center">
                      <Icon name="Workflow" size={16} color={palette.textSecondary} />
                      <Text className="text-xs" style={{ color: palette.textSecondary }}>
                        Apri timeline
                      </Text>
                    </HStack>
                  </Button>
                </Link>
              </VStack>
            </HStack>
          </GlassCard>
        ))}
      </VStack>
    </VStack>
  );
}
