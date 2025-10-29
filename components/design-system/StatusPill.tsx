'use client';

import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { palette } from '@/theme/palette';

interface StatusPillProps {
  label: string;
  tone?: 'accent' | 'success' | 'warning' | 'danger' | 'muted';
}

const toneMap = {
  accent: { bg: 'rgba(56, 189, 248, 0.18)', color: palette.accentPrimary },
  success: { bg: 'rgba(74, 222, 128, 0.18)', color: palette.success },
  warning: { bg: 'rgba(250, 204, 21, 0.18)', color: palette.warning },
  danger: { bg: 'rgba(248, 113, 113, 0.18)', color: palette.danger },
  muted: { bg: 'rgba(148, 163, 184, 0.18)', color: palette.textMuted },
};

export function StatusPill({ label, tone = 'accent' }: StatusPillProps) {
  const toneStyles = toneMap[tone];
  return (
    <Box
      bg={toneStyles.bg}
      borderRadius={999}
      px={12}
      py={6}
      borderWidth={1}
      borderColor={`${toneStyles.color}33`}
    >
      <Text fontSize={12} fontWeight="600" color={toneStyles.color}>
        {label}
      </Text>
    </Box>
  );
}
