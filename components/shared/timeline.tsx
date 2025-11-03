'use client';

import { useMemo } from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { TimelineEntry } from '@/types';

type TimelineProps = {
  entries: TimelineEntry[];
  emptyLabel?: string;
};

const statusBadgeStyles: Record<
  TimelineEntry['status'],
  { badge: string; text: string }
> = {
  Inviato: {
    badge: 'bg-[rgba(31,122,77,0.16)]',
    text: '#0f766e',
  },
  Programmato: {
    badge: 'bg-[rgba(71,85,105,0.14)]',
    text: '#334155',
  },
  'In attesa': {
    badge: 'bg-[rgba(250,204,21,0.2)]',
    text: '#b45309',
  },
  Fallito: {
    badge: 'bg-[rgba(248,113,113,0.18)]',
    text: '#b91c1c',
  },
  'Richiede attenzione': {
    badge: 'bg-[rgba(236,72,153,0.18)]',
    text: '#be123c',
  },
};

const channelColors: Record<TimelineEntry['channel'], string> = {
  Email: 'text-[#0f3d5d]',
  WhatsApp: 'text-[#15803d]',
  Booking: 'text-[#7c2d12]',
  SMS: 'text-[#1d4ed8]',
};

function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function Timeline({ entries, emptyLabel }: TimelineProps) {
  const orderedEntries = useMemo(
    () =>
      [...entries].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [entries]
  );

  if (orderedEntries.length === 0) {
    return (
      <Box className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-6 py-10">
        <Text className="text-center text-sm text-[var(--color-neutral-600)]">
          {emptyLabel ?? 'Nessun evento presente per questa timeline.'}
        </Text>
      </Box>
    );
  }

  return (
    <VStack space="md">
      {orderedEntries.map((entry, index) => {
        const colors = statusBadgeStyles[entry.status];
        const channelColor = channelColors[entry.channel];
        const isLast = index === orderedEntries.length - 1;
        return (
          <HStack key={entry.id} className="items-start">
            <Box className="items-center">
              <Box className="h-4 w-4 rounded-full border-2 border-[var(--color-primary-600)] bg-[var(--color-surface)]" />
              {!isLast ? (
                <Box className="mt-1 h-full w-px flex-1 bg-[var(--color-border)]" />
              ) : null}
            </Box>
            <Box className="ml-4 flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
              <HStack className="items-center justify-between">
                <Text className="text-base font-semibold text-[var(--color-neutral-900)]">
                  {entry.title}
                </Text>
                <Badge
                  size="sm"
                  action="muted"
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${colors.badge}`}
                >
                  <Text className={`text-xs font-semibold ${colors.text}`}>
                    {entry.status}
                  </Text>
                </Badge>
              </HStack>
              <Text className="mt-2 text-sm leading-6 text-[var(--color-neutral-600)]">
                {entry.description}
              </Text>
              <HStack className="mt-4 items-center justify-between">
                <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral-600)]">
                  {formatDate(entry.date)}
                </Text>
                <Text
                  className={`text-xs font-semibold uppercase tracking-[0.2em] ${channelColor}`}
                >
                  {entry.channel}
                </Text>
              </HStack>
            </Box>
          </HStack>
        );
      })}
    </VStack>
  );
}
