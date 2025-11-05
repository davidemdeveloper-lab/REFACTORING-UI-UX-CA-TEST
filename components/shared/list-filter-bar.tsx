'use client';

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';

type FilterToken = {
  id: string;
  label: string;
};

type ListFilterBarProps = {
  title?: string;
  filters: FilterToken[];
  onFilterSelect?: (id: string) => void;
};

export function ListFilterBar({
  title = 'Filtri rapidi',
  filters,
  onFilterSelect,
}: ListFilterBarProps) {
  if (filters.length === 0) {
    return null;
  }

  return (
    <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3">
      <HStack className="flex-wrap items-center gap-3">
        <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-500)]">
          {title}
        </Text>
        <HStack className="flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <Pressable
              key={filter.id}
              onPress={() => onFilterSelect?.(filter.id)}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 transition-colors duration-150 data-[hover=true]:border-[#aa6a24] data-[hover=true]:bg-[rgba(196,123,44,0.08)]"
            >
              <Text className="text-xs font-semibold text-[var(--color-neutral-700)]">
                {filter.label}
              </Text>
            </Pressable>
          ))}
        </HStack>
      </HStack>
    </Box>
  );
}

