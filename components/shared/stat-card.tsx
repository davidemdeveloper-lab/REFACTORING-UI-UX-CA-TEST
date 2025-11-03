'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
  tone?: 'default' | 'positive' | 'warning';
  chips?: string[];
  chipLabel?: string;
};

const toneBackground: Record<NonNullable<StatCardProps['tone']>, string> = {
  default: 'bg-[var(--color-background)]',
  positive: 'bg-[rgba(22,163,74,0.12)]',
  warning: 'bg-[rgba(234,179,8,0.16)]',
};

const toneText: Record<NonNullable<StatCardProps['tone']>, string> = {
  default: 'text-[var(--color-neutral-900)]',
  positive: 'text-[#15803d]',
  warning: 'text-[#b45309]',
};

export function StatCard({
  label,
  value,
  helper,
  icon,
  tone = 'default',
  chips,
  chipLabel,
}: StatCardProps) {
  return (
    <Box
      className={`rounded-2xl border border-[var(--color-border)] ${toneBackground[tone]} px-5 py-4`}
    >
      <HStack className="items-center justify-between">
        <Box>
          <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
            {label}
          </Text>
          <Text
            className={`mt-2 text-2xl font-semibold ${toneText[tone]}`}
          >
            {value}
          </Text>
          {helper ? (
            <Text className="mt-1 text-xs text-[var(--color-neutral-600)]">
              {helper}
            </Text>
          ) : null}
          {chips && chips.length > 0 ? (
            <Box className="mt-3 flex flex-wrap items-center gap-2">
              {chipLabel ? (
                <Text className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-500)]">
                  {chipLabel}
                </Text>
              ) : null}
              {chips.map((chip) => (
                <Box
                  key={chip}
                  className="rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-[var(--color-neutral-600)]"
                >
                  {chip}
                </Box>
              ))}
            </Box>
          ) : null}
        </Box>
        {icon}
      </HStack>
    </Box>
  );
}
