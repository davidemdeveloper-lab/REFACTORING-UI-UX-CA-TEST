import { notFound } from 'next/navigation';
import { mockClients, mockReservations, mockTimelineNotes } from '@/components/data/mockData';
import { GlassCard } from '@/components/layout/GlassCard';
import { palette } from '@/design/palette';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Icon } from '@/components/layout/UiIcon';

const timelineStatuses = [
  { label: 'Pre check-in', icon: 'ClipboardCheck' },
  { label: 'Pagamento', icon: 'CreditCard' },
  { label: 'Arrivo', icon: 'DoorOpen' },
  { label: 'Stay', icon: 'ConciergeBell' },
  { label: 'Follow-up', icon: 'HeartHandshake' },
];

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = mockClients.find((item) => item.id === params.id);
  if (!client) return notFound();
  const reservations = mockReservations.filter((reservation) => reservation.guest === client.name);

  return (
    <VStack space="lg">
      <HStack className="flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <VStack>
          <Text className="text-2xl font-semibold" style={{ color: palette.textPrimary }}>
            {client.name}
          </Text>
          <Text className="text-sm" style={{ color: palette.textSecondary }}>
            Ospite {client.vip ? 'VIP' : 'Fidelity'} · Ultimo soggiorno {client.lastStay}
          </Text>
        </VStack>
        <HStack className="gap-3">
          <GlassCard padding={14} gap={6} borderColor={palette.borderSoft}>
            <HStack className="items-center gap-2">
              <Icon name="Thermometer" size={18} color={palette.accentPrimary} />
              <Text className="text-sm" style={{ color: palette.textSecondary }}>
                {client.temperature}°C stanza
              </Text>
            </HStack>
          </GlassCard>
          <GlassCard padding={14} gap={6} borderColor={palette.borderSoft}>
            <HStack className="items-center gap-2">
              <Icon name="CupSoda" size={18} color={palette.accentSecondary} />
              <Text className="text-sm" style={{ color: palette.textSecondary }}>
                Minibar {client.minibarLevel}%
              </Text>
            </HStack>
          </GlassCard>
        </HStack>
      </HStack>
      <HStack className="flex-col gap-6 xl:flex-row">
        <GlassCard className="flex-[2]">
          <Text className="text-base font-medium" style={{ color: palette.textPrimary }}>
            Profilo cliente
          </Text>
          <VStack space="md">
            <HStack className="items-center justify-between">
              <VStack>
                <Text className="text-xs uppercase" style={{ color: palette.textMuted }}>
                  Contatti
                </Text>
                <Text className="text-sm" style={{ color: palette.textSecondary }}>
                  {client.email} · {client.phone}
                </Text>
              </VStack>
              <GlassCard padding={12} gap={4} borderColor={palette.borderSoft}>
                <Text className="text-xs" style={{ color: palette.textSecondary }}>
                  Thread AI
                </Text>
                <Text className="text-lg font-semibold" style={{ color: palette.accentSecondary }}>
                  {client.aiThreads}
                </Text>
              </GlassCard>
            </HStack>
            <Box>
              <Text className="text-xs uppercase" style={{ color: palette.textMuted }}>
                Preferenze
              </Text>
              <HStack className="mt-2 flex-wrap gap-2">
                {client.preferences.map((pref) => (
                  <GlassCard key={pref} padding={10} gap={4} borderColor={palette.borderSoft}>
                    <Text className="text-xs" style={{ color: palette.textSecondary }}>
                      {pref}
                    </Text>
                  </GlassCard>
                ))}
              </HStack>
            </Box>
          </VStack>
        </GlassCard>
        <GlassCard className="flex-1">
          <Text className="text-base font-medium" style={{ color: palette.textPrimary }}>
            Timeline comunicazioni
          </Text>
          <VStack space="md" className="pt-3">
            {timelineStatuses.map((step, index) => {
              const completed = index < 2 || client.status.includes(step.label);
              return (
                <HStack key={step.label} className="items-center gap-3">
                  <GlassCard
                    padding={12}
                    gap={6}
                    borderColor={completed ? palette.borderHighlight : palette.borderSoft}
                    style={{ background: completed ? 'rgba(96,214,255,0.18)' : 'transparent' }}
                  >
                    <Icon
                      name={step.icon as any}
                      size={18}
                      color={completed ? palette.accentPrimary : palette.textMuted}
                      opacity={completed ? 1 : 0.5}
                    />
                  </GlassCard>
                  <VStack>
                    <Text className="text-sm" style={{ color: palette.textPrimary }}>
                      {step.label}
                    </Text>
                    <Text className="text-xs" style={{ color: palette.textSecondary }}>
                      {completed ? 'Completato' : 'In attesa'}
                    </Text>
                  </VStack>
                </HStack>
              );
            })}
          </VStack>
        </GlassCard>
      </HStack>
      <GlassCard>
        <Text className="text-base font-medium" style={{ color: palette.textPrimary }}>
          Prenotazioni collegate
        </Text>
        <VStack space="md">
          {reservations.map((reservation) => (
            <GlassCard key={reservation.id} padding={16} gap={6} borderColor={palette.borderSoft}>
              <HStack className="items-center justify-between">
                <VStack>
                  <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                    {reservation.code}
                  </Text>
                  <Text className="text-xs" style={{ color: palette.textSecondary }}>
                    {reservation.arrival} → {reservation.departure} · {reservation.roomType}
                  </Text>
                </VStack>
                <HStack className="items-center gap-3">
                  <Icon name="Thermometer" size={18} color={palette.accentPrimary} />
                  <Text className="text-xs" style={{ color: palette.textSecondary }}>
                    {reservation.temperature}°C
                  </Text>
                  <Icon name="CupSoda" size={18} color={palette.accentSecondary} />
                  <Text className="text-xs" style={{ color: palette.textSecondary }}>
                    {reservation.minibarLevel}%
                  </Text>
                </HStack>
              </HStack>
              <Text className="text-xs" style={{ color: palette.accentWarm }}>
                Prossima azione: {reservation.nextAction}
              </Text>
            </GlassCard>
          ))}
        </VStack>
      </GlassCard>
      <GlassCard>
        <Text className="text-base font-medium" style={{ color: palette.textPrimary }}>
          Ultimi eventi IA
        </Text>
        <VStack space="md" className="pt-3">
          {mockTimelineNotes.map((note) => (
            <HStack key={note.label} className="items-center gap-3">
              <GlassCard padding={10} gap={4} borderColor={palette.borderSoft}>
                <Text className="text-xs font-medium" style={{ color: palette.accentPrimary }}>
                  {note.time}
                </Text>
              </GlassCard>
              <Text className="text-sm" style={{ color: palette.textSecondary }}>
                {note.label}
              </Text>
            </HStack>
          ))}
        </VStack>
      </GlassCard>
    </VStack>
  );
}
