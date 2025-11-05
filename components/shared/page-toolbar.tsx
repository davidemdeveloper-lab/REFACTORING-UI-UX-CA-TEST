'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

type FilterPill = {
  id: string;
  label: string;
  active?: boolean;
};

type PageToolbarProps = {
  searchPlaceholder: string;
  primaryActionLabel: string;
  onPrimaryAction?: () => void;
  filters?: FilterPill[];
  extraActions?: ReactNode;
};

export function PageToolbar({
  searchPlaceholder,
  primaryActionLabel,
  onPrimaryAction,
  filters = [],
  extraActions,
}: PageToolbarProps) {
  return (
    <Box className="mb-8 rounded-3xl border border-[var(--color-primary-border-soft)] bg-[var(--color-surface)] px-6 py-5 shadow-[var(--shadow-card)]">
      <HStack className="flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Box className="w-full md:max-w-[320px]">
          <Input
            variant="rounded"
            placeholder={searchPlaceholder}
            className="h-11 rounded-full border-[var(--color-primary-border-soft)] bg-[#fdf7ef]"
            inputClassName="text-sm text-[var(--color-neutral-900)] placeholder:text-[var(--color-neutral-600)]"
          />
        </Box>
        <HStack className="items-center gap-3">
          {extraActions}
          <Button
            size="md"
            action="primary"
            className="rounded-full bg-[#aa6a24] px-6 data-[hover=true]:bg-[#8f591e] data-[active=true]:bg-[#754515]"
            onPress={onPrimaryAction}
          >
            <Text className="text-sm font-semibold text-white">
              {primaryActionLabel}
            </Text>
          </Button>
        </HStack>
      </HStack>
      {filters.length > 0 ? (
        <HStack className="mt-4 flex-row flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              size="sm"
              variant="outline"
              action={filter.active ? 'primary' : 'default'}
              className={`rounded-full border-[var(--color-primary-border-soft)] bg-[var(--color-surface)] px-4 ${
                filter.active ? 'border-[var(--color-primary-600)]' : ''
              }`}
            >
              <HStack className="items-center gap-2">
                <Text
                  className={`text-xs font-semibold ${
                    filter.active
                      ? 'text-[var(--color-primary-600)]'
                      : 'text-[var(--color-neutral-600)]'
                  }`}
                >
                  {filter.label}
                </Text>
              </HStack>
            </Button>
          ))}
        </HStack>
      ) : null}
    </Box>
  );
}
