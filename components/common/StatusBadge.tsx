'use client';

import { Box, Text } from '@gluestack-ui/themed';
import { getStatusTone } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const tone = getStatusTone(status);
  return (
    <Box
      px="$3"
      py="$1.5"
      borderRadius="$lg"
      bgColor={tone.bg}
      borderWidth={1}
      borderColor="rgba(255,255,255,0.18)"
    >
      <Text fontSize="$xs" color={tone.text} fontWeight="$bold">
        {label ?? status}
      </Text>
    </Box>
  );
}
