'use client';

import { Pressable } from '@/components/ui/pressable';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react-native';
import { PRIMARY_ICON_COLOR } from '@/constants/colors';

type TimelineTone = 'today' | 'upcoming' | 'inhouse';

const timelineStyles: Record<
  TimelineTone,
  { label: string; badge: string; dot: string }
> = {
  today: {
    label: 'Arrivo oggi',
    badge: 'bg-[rgba(196,123,44,0.16)] text-[var(--color-primary-600)]',
    dot: 'bg-[rgba(196,123,44,0.18)] border-[rgba(196,123,44,0.28)]',
  },
  upcoming: {
    label: 'In arrivo',
    badge: 'bg-[rgba(59,130,246,0.16)] text-[#1d4ed8]',
    dot: 'bg-[rgba(59,130,246,0.18)] border-[rgba(59,130,246,0.28)]',
  },
  inhouse: {
    label: 'In soggiorno',
    badge: 'bg-[rgba(34,197,94,0.16)] text-[#15803d]',
    dot: 'bg-[rgba(34,197,94,0.18)] border-[rgba(34,197,94,0.28)]',
  },
};

type BookingStatusCardProps = {
  bookingNumber: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  statusLabel: string;
  statusTone: 'info' | 'success' | 'warning' | 'neutral';
  roomsGuests: string;
  nextEvent: string;
  timelineTone: TimelineTone;
  attentionNote?: string;
  onPress?: () => void;
};

export function BookingStatusCard({
  bookingNumber,
  guestName,
  checkIn,
  checkOut,
  statusLabel,
  statusTone,
  roomsGuests,
  nextEvent,
  timelineTone,
  attentionNote,
  onPress,
}: BookingStatusCardProps) {
  const toneBadge: Record<typeof statusTone, string> = {
    success: 'bg-[rgba(34,197,94,0.14)] text-[#15803d]',
    warning: 'bg-[rgba(234,179,8,0.16)] text-[#92400e]',
    info: 'bg-[rgba(59,130,246,0.16)] text-[#1d4ed8]',
    neutral: 'bg-[rgba(148,163,184,0.16)] text-[var(--color-neutral-600)]',
  };
  const timeline = timelineStyles[timelineTone];

  return (
    <Pressable
      onPress={onPress}
      className="group/card rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 transition-all duration-150 hover:border-[#aa6a24] hover:shadow-[0_18px_35px_rgba(36,30,18,0.12)]"
    >
      <HStack className="items-start justify-between gap-4">
        <VStack className="flex-1" space="sm">
          <VStack space="xs">
            <HStack className="items-center gap-2">
              <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
                Prenotazione n° {bookingNumber}
              </Text>
              <Badge
                size="sm"
                action="muted"
                className={`rounded-full px-3 py-1 text-xs font-semibold ${toneBadge[statusTone]}`}
              >
                <Text className="text-xs font-semibold uppercase tracking-[0.2em]">
                  {statusLabel}
                </Text>
              </Badge>
            </HStack>
            <Text className="text-sm text-[var(--color-neutral-600)]">
              {guestName} · Check-in {checkIn} • Check-out {checkOut}
            </Text>
          </VStack>

          <HStack className="flex-wrap items-center gap-2">
            <Badge
              size="sm"
              action="muted"
              className="rounded-full bg-[rgba(196,123,44,0.12)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-600)]"
            >
              <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                {roomsGuests}
              </Text>
            </Badge>
            <Badge
              size="sm"
              action="muted"
              className={`rounded-full px-3 py-1 text-xs font-semibold ${timeline.badge}`}
            >
              <Text className="text-xs font-semibold uppercase tracking-[0.2em]">
                {timeline.label}
              </Text>
            </Badge>
          </HStack>

          <Text className="text-sm text-[var(--color-neutral-700)]">
            {nextEvent}
          </Text>

          {attentionNote ? (
            <Text className="text-xs italic text-[var(--color-neutral-600)]">
              {attentionNote}
            </Text>
          ) : null}

        </VStack>
        <Box
          className={`self-center h-8 w-8 items-center justify-center rounded-full border transition-all duration-150 ${timeline.dot} group-hover/card:scale-105`}
        >
          <ArrowRight size={16} color={PRIMARY_ICON_COLOR} strokeWidth={2} />
        </Box>
      </HStack>
    </Pressable>
  );
}
