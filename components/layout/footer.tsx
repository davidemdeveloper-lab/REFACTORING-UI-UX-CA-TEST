'use client';

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

export function Footer() {
  return (
    <Box className="mt-16 border-t border-[var(--color-border)] pt-6 pb-10">
      <HStack className="flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Text className="text-sm font-semibold text-[var(--color-neutral-600)]">
          CA · Customer Automator — hospitality intelligence per il tuo team.
        </Text>
        <Text className="text-xs text-[var(--color-neutral-500)]">
          Versione mock · dati dimostrativi · © {new Date().getFullYear()} Central Hotel Studio.
        </Text>
      </HStack>
    </Box>
  );
}

