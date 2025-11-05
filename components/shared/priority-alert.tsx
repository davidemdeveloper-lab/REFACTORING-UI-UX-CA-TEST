'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type PriorityAlertTone = 'warning' | 'info' | 'neutral';

const toneStyles: Record<
  PriorityAlertTone,
  { badge: string; background: string; border: string }
> = {
  warning: {
    badge: 'bg-[rgba(236,69,90,0.16)] text-[#be123c]',
    background: 'bg-[rgba(236,69,90,0.08)]',
    border: 'border-[rgba(236,69,90,0.18)]',
  },
  info: {
    badge: 'bg-[rgba(59,130,246,0.16)] text-[#1d4ed8]',
    background: 'bg-[rgba(59,130,246,0.08)]',
    border: 'border-[rgba(59,130,246,0.18)]',
  },
  neutral: {
    badge: 'bg-[rgba(148,163,184,0.16)] text-[var(--color-neutral-600)]',
    background: 'bg-[rgba(148,163,184,0.08)]',
    border: 'border-[rgba(148,163,184,0.18)]',
  },
};

type PriorityAlertProps = {
  guestName: string;
  statusLabel: string;
  tone?: PriorityAlertTone;
  message: string;
  lastEvent: string;
  updatedAt: string;
  rightAccessory?: ReactNode;
  onAction?: () => void;
  actionLabel?: string;
};

export function PriorityAlert({
  guestName,
  statusLabel,
  tone = 'warning',
  message,
  lastEvent,
  updatedAt,
  rightAccessory,
  onAction,
  actionLabel = 'Apri chat',
}: PriorityAlertProps) {
  const toneClass = toneStyles[tone];

  return (
    <Box
      className={`w-full shrink-0 rounded-2xl border ${toneClass.border} ${toneClass.background} px-5 py-4`}
    >
      <HStack className="items-start justify-between gap-4">
        <VStack space="xs" className="flex-1">
          <HStack className="items-center gap-2">
            <Text className="text-base font-semibold text-[var(--color-neutral-900)]">
              {guestName}
            </Text>
            <Badge
              size="sm"
              action="muted"
              className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClass.badge}`}
            >
              <Text className="text-xs font-semibold uppercase tracking-wide">
                {statusLabel}
              </Text>
            </Badge>
          </HStack>
          <Text className="text-sm font-medium leading-5 text-[var(--color-neutral-800)]">
            {message}
          </Text>
          <HStack className="flex-wrap items-center gap-3">
            <Badge
              size="sm"
              action="muted"
              className="rounded-full bg-[rgba(196,123,44,0.12)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-600)]"
            >
              <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                Ultimo evento · {lastEvent}
              </Text>
            </Badge>
            <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral-500)]">
              Aggiornato il {updatedAt}
            </Text>
          </HStack>
        </VStack>
        <Box className="flex flex-col items-end justify-center gap-2">
          {onAction ? (
            <Button
              size="sm"
              variant="outline"
              action="primary"
              className="rounded-full border-[var(--color-primary-600)] bg-transparent px-3"
              onPress={onAction}
            >
              <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                {actionLabel}
              </Text>
            </Button>
          ) : null}
          {rightAccessory}
        </Box>
      </HStack>
    </Box>
  );
}
