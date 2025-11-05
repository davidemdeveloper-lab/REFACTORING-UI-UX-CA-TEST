'use client';

import { Pressable } from '@/components/ui/pressable';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react-native';
import { PRIMARY_ICON_COLOR } from '@/constants/colors';

type StatusTone = 'info' | 'success' | 'warning' | 'neutral';

const toneStyles: Record<
  StatusTone,
  { badge: string; accentDot: string }
> = {
  success: {
    badge: 'bg-[rgba(34,197,94,0.14)] text-[#15803d]',
    accentDot: 'bg-[rgba(34,197,94,0.1)] border-[rgba(34,197,94,0.3)]',
  },
  warning: {
    badge: 'bg-[rgba(234,179,8,0.16)] text-[#92400e]',
    accentDot: 'bg-[rgba(234,179,8,0.12)] border-[rgba(234,179,8,0.32)]',
  },
  info: {
    badge: 'bg-[rgba(59,130,246,0.16)] text-[#1d4ed8]',
    accentDot: 'bg-[rgba(59,130,246,0.12)] border-[rgba(59,130,246,0.32)]',
  },
  neutral: {
    badge: 'bg-[rgba(148,163,184,0.16)] text-[var(--color-neutral-600)]',
    accentDot: 'bg-[rgba(148,163,184,0.12)] border-[rgba(148,163,184,0.3)]',
  },
};

type CustomerStatusCardProps = {
  name: string;
  updatedAt: string;
  tone: StatusTone;
  communicationLabel: string;
  summary: string;
  lastEvent: string;
  nextEventLabel: string;
  nextEventWhen: string;
  segment: string;
  newsletter: boolean;
  onPress?: () => void;
};

export function CustomerStatusCard({
  name,
  updatedAt,
  tone,
  communicationLabel,
  summary,
  lastEvent,
  nextEventLabel,
  nextEventWhen,
  segment,
  newsletter,
  onPress,
}: CustomerStatusCardProps) {
  const toneClass = toneStyles[tone];

  const snippet = summary.length > 140 ? `${summary.slice(0, 137)}…` : summary;
  const metaLine = [
    nextEventWhen !== '—' ? nextEventWhen : 'Programmato: da definire',
    segment ? `Segmento ${segment}` : null,
    `Newsletter ${newsletter ? 'iscritto' : 'non iscritto'}`,
  ]
    .filter(Boolean)
    .join(' • ');

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
                {name}
              </Text>
            </HStack>
            <Badge
              size="sm"
              action="muted"
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${toneClass.badge}`}
            >
              <Text className="text-xs font-semibold uppercase tracking-[0.2em]">
                {communicationLabel}
              </Text>
            </Badge>
            <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-500)]">
              Aggiornato il {updatedAt}
            </Text>
          </VStack>
          <Text className="text-sm leading-6 text-[var(--color-neutral-800)]">
            {snippet}
          </Text>
          <HStack className="flex-wrap items-center gap-2">
            <Badge
              size="sm"
              action="muted"
              className="rounded-full bg-[rgba(31,41,55,0.08)] px-3 py-1 text-xs font-semibold text-[var(--color-neutral-800)]"
            >
              <Text className="text-xs font-semibold text-[var(--color-neutral-800)]">
                Ultimo evento · {lastEvent}
              </Text>
            </Badge>
            <Badge
              size="sm"
              action="muted"
              className="rounded-full bg-[rgba(31,41,55,0.08)] px-3 py-1 text-xs font-semibold text-[var(--color-neutral-800)]"
            >
              <Text className="text-xs font-semibold text-[var(--color-neutral-800)]">
                Prossimo evento · {nextEventLabel}
              </Text>
            </Badge>
          </HStack>
          <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral-500)]">
            Seguente
          </Text>
          <Text className="text-sm text-[var(--color-neutral-700)]">
            {metaLine}
          </Text>
        </VStack>
        <Box className={`self-center h-8 w-8 items-center justify-center rounded-full border transition-all duration-150 ${toneClass.accentDot} group-hover/card:scale-105`}>
          <ArrowRight size={16} color={PRIMARY_ICON_COLOR} strokeWidth={2} />
        </Box>
      </HStack>
    </Pressable>
  );
}
