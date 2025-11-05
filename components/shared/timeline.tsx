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

const channelBadgeStyles: Record<
  TimelineEntry['channel'],
  { badge: string; text: string }
> = {
  Email: {
    badge: 'bg-[rgba(59,130,246,0.12)]',
    text: 'text-[#1d4ed8]',
  },
  WhatsApp: {
    badge: 'bg-[rgba(22,163,74,0.18)]',
    text: 'text-[#15803d]',
  },
  Booking: {
    badge: 'bg-[rgba(217,119,6,0.16)]',
    text: 'text-[#7c2d12]',
  },
  SMS: {
    badge: 'bg-[rgba(59,130,246,0.12)]',
    text: 'text-[#1d4ed8]',
  },
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
      <Box className="rounded-2xl border border-dashed border-[var(--color-primary-border-soft)] bg-[var(--color-background)] px-6 py-10">
        <Text className="text-center text-sm text-[var(--color-neutral-600)]">
          {emptyLabel ?? 'Nessun evento presente per questa timeline.'}
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <VStack space="md" className="md:hidden">
        {orderedEntries.map((entry) => (
          <TimelineCard key={entry.id} entry={entry} />
        ))}
      </VStack>

      <Box className="relative hidden md:block">
        <Box className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[var(--color-primary-border-soft)] md:block" />
        <VStack space="lg">
          {orderedEntries.map((entry, index) => {
            const isLeft = index % 2 === 0;
            return (
              <Box
                key={entry.id}
                className="grid grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)] items-center gap-6"
              >
                <Box
                  className={`hidden md:flex ${
                    isLeft ? 'justify-end pr-6' : 'justify-end pr-6'
                  }`}
                  aria-hidden={!isLeft}
                >
                  {isLeft ? (
                    <TimelineCard entry={entry} align="right" />
                  ) : (
                    <Box className="h-full w-full" />
                  )}
                </Box>

                <Box className="relative hidden md:flex h-full items-center justify-center">
                  <Box className="h-full w-px bg-[var(--color-primary-border-soft)]" />
                  <Box className="absolute h-4 w-4 rounded-full border-2 border-[var(--color-primary-600)] bg-[var(--color-surface)]" />
                </Box>

                <Box
                  className={`hidden md:flex ${
                    isLeft ? 'justify-start pl-6' : 'justify-start pl-6'
                  }`}
                  aria-hidden={isLeft}
                >
                  {!isLeft ? (
                    <TimelineCard entry={entry} align="left" />
                  ) : (
                    <Box className="h-full w-full" />
                  )}
                </Box>
              </Box>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
}

function TimelineCard({
  entry,
  align = 'left',
}: {
  entry: TimelineEntry;
  align?: 'left' | 'right';
}) {
  const colors = statusBadgeStyles[entry.status];
  const channelStyles = channelBadgeStyles[entry.channel];

  return (
    <Box
      className={`w-full max-w-[360px] rounded-2xl border border-[var(--color-primary-border-soft)] bg-[var(--color-surface)] px-5 py-4 shadow-sm ${
        align === 'right' ? 'md:ml-auto' : ''
      }`}
    >
      <HStack className="items-center justify-between gap-3">
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
      <HStack className="mt-4 flex-wrap items-center justify-between gap-2">
        <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral-600)]">
          {formatDate(entry.date)}
        </Text>
        <Badge
          size="sm"
          action="muted"
          className={`rounded-full px-3 py-1 text-xs font-semibold ${channelStyles.badge}`}
        >
          <Text className={`text-xs font-semibold ${channelStyles.text}`}>
            {entry.channel}
          </Text>
        </Badge>
      </HStack>
    </Box>
  );
}
