import { notFound } from 'next/navigation';
import { mockReservations, mockTimelineNotes } from '@/components/data/mockData';
import { GlassCard } from '@/components/layout/GlassCard';
import { palette } from '@/design/palette';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/layout/UiIcon';
import { Button } from '@/components/ui/button';
import { Box } from '@/components/ui/box';

export default async function ReservationDetailPage({ params }: { params: { id: string } }) {
  const reservation = mockReservations.find((item) => item.id === params.id);
  if (!reservation) return notFound();

  return (
    <VStack space="lg">
      <HStack className="flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <VStack>
          <Text className="text-2xl font-semibold" style={{ color: palette.textPrimary }}>
            {reservation.code}
          </Text>
          <Text className="text-sm" style={{ color: palette.textSecondary }}>
            {reservation.guest} · {reservation.roomType} · {reservation.arrival} → {reservation.departure}
          </Text>
        </VStack>
        <HStack className="gap-3">
          <GlassCard padding={14} gap={6} borderColor={palette.borderSoft}>
            <HStack className="items-center gap-2">
              <Icon name="Thermometer" size={18} color={palette.accentPrimary} />
              <Text className="text-sm" style={{ color: palette.textSecondary }}>
                {reservation.temperature}°C
              </Text>
            </HStack>
          </GlassCard>
          <GlassCard padding={14} gap={6} borderColor={palette.borderSoft}>
            <HStack className="items-center gap-2">
              <Icon name="CupSoda" size={18} color={palette.accentSecondary} />
              <Text className="text-sm" style={{ color: palette.textSecondary }}>
                Minibar {reservation.minibarLevel}%
              </Text>
            </HStack>
          </GlassCard>
        </HStack>
      </HStack>
      <GlassCard>
        <HStack className="items-start justify-between">
          <VStack space="xs">
            <Text className="text-xs uppercase" style={{ color: palette.textMuted }}>
              Stato attuale
            </Text>
            <Text className="text-base font-medium" style={{ color: palette.accentSecondary }}>
              {reservation.status}
            </Text>
            <Text className="text-xs" style={{ color: palette.accentWarm }}>
              Prossima azione: {reservation.nextAction}
            </Text>
          </VStack>
          <HStack className="gap-2">
            <Button
              style={{
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 10,
                backgroundColor: 'transparent',
                borderColor: palette.borderSoft,
              }}
            >
              <HStack space="sm" className="items-center">
                <Icon name="Mail" size={16} color={palette.textSecondary} />
                <Text className="text-xs" style={{ color: palette.textSecondary }}>
                  Apri template
                </Text>
              </HStack>
            </Button>
            <Button
              style={{
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderColor: palette.borderHighlight,
                background: 'linear-gradient(135deg, rgba(96,214,255,0.6), rgba(151,255,221,0.65))',
              } as any}
            >
              <HStack space="sm" className="items-center">
                <Icon name="Sparkles" size={16} color="#041320" />
                <Text className="text-xs font-semibold" style={{ color: '#041320' }}>
                  Suggerisci azione AI
                </Text>
              </HStack>
            </Button>
          </HStack>
        </HStack>
        <Box className="mt-6 flex flex-col gap-6">
          <HStack className="flex-wrap gap-4">
            {reservation.timeline.map((step) => (
              <GlassCard
                key={step.id}
                padding={18}
                gap={6}
                borderColor={step.completed ? palette.borderHighlight : palette.borderSoft}
                style={{
                  minWidth: 160,
                  background: step.completed ? 'rgba(96,214,255,0.16)' : 'rgba(5,17,30,0.3)',
                }}
              >
                <VStack>
                  <HStack className="items-center gap-2">
                    <Icon
                      name={step.completed ? 'CheckCircle2' : 'CircleDashed'}
                      size={18}
                      color={step.completed ? palette.accentSecondary : palette.textMuted}
                    />
                    <Text className="text-sm" style={{ color: palette.textPrimary }}>
                      {step.label}
                    </Text>
                  </HStack>
                  <Text className="text-xs" style={{ color: palette.textSecondary }}>
                    {step.date}
                  </Text>
                </VStack>
              </GlassCard>
            ))}
          </HStack>
          <GlassCard padding={16} gap={8} borderColor={palette.borderSoft}>
            <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
              Cronologia rapida
            </Text>
            <VStack space="sm">
              {mockTimelineNotes.map((note) => (
                <HStack key={note.label} className="items-center gap-3">
                  <GlassCard padding={10} gap={4} borderColor={palette.borderSoft}>
                    <Text className="text-xs font-medium" style={{ color: palette.accentPrimary }}>
                      {note.time}
                    </Text>
                  </GlassCard>
                  <Text className="text-xs" style={{ color: palette.textSecondary }}>
                    {note.label}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </GlassCard>
        </Box>
      </GlassCard>
      <HStack className="flex-col gap-6 xl:flex-row">
        <GlassCard className="flex-1">
          <Text className="text-base font-medium" style={{ color: palette.textPrimary }}>
            Controllo stanza
          </Text>
          <VStack space="md" className="pt-3">
            {[
              { label: 'Climatizzazione smart', icon: 'Wind', status: `${reservation.temperature}°C - Modalità notte` },
              { label: 'Luci & tapparelle', icon: 'SunMoon', status: 'Scenario comfort impostato' },
              { label: 'Minibar & sensoristica', icon: 'Fridge', status: `${reservation.minibarLevel}% scorte` },
            ].map((device) => (
              <GlassCard key={device.label} padding={14} gap={6} borderColor={palette.borderSoft}>
                <HStack className="items-center justify-between">
                  <HStack className="items-center gap-3">
                    <Icon name={device.icon as any} size={18} color={palette.accentPrimary} />
                    <Text className="text-sm" style={{ color: palette.textPrimary }}>
                      {device.label}
                    </Text>
                  </HStack>
                  <Text className="text-xs" style={{ color: palette.textSecondary }}>
                    {device.status}
                  </Text>
                </HStack>
              </GlassCard>
            ))}
          </VStack>
        </GlassCard>
        <GlassCard className="flex-1">
          <Text className="text-base font-medium" style={{ color: palette.textPrimary }}>
            Collegamenti rapidi template
          </Text>
          <VStack space="md" className="pt-3">
            {[
              {
                label: 'Promemoria check-in',
                description: 'Richiesta documenti e preferenze arrivo',
                icon: 'Inbox',
              },
              {
                label: 'Upsell esperienze',
                description: 'Suggerisci pacchetti SPA e ristorante',
                icon: 'Stars',
              },
              {
                label: 'Follow-up recensione',
                description: 'Invita a lasciare feedback su TripAdvisor',
                icon: 'MessageCircleHeart',
              },
            ].map((template) => (
              <GlassCard key={template.label} padding={14} gap={6} borderColor={palette.borderSoft}>
                <HStack className="items-center justify-between">
                  <HStack className="items-center gap-3">
                    <Icon name={template.icon as any} size={18} color={palette.accentPrimary} />
                    <VStack>
                      <Text className="text-sm" style={{ color: palette.textPrimary }}>
                        {template.label}
                      </Text>
                      <Text className="text-xs" style={{ color: palette.textSecondary }}>
                        {template.description}
                      </Text>
                    </VStack>
                  </HStack>
                  <Button
                    style={{
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      backgroundColor: 'transparent',
                      borderColor: palette.borderSoft,
                    }}
                  >
                    <Text className="text-xs" style={{ color: palette.textSecondary }}>
                      Personalizza
                    </Text>
                  </Button>
                </HStack>
              </GlassCard>
            ))}
          </VStack>
        </GlassCard>
      </HStack>
    </VStack>
  );
}
