'use client';

import { ReactNode } from 'react';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { palette } from '@/theme/palette';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function SectionHeading({ title, subtitle, icon, action }: SectionHeadingProps) {
  return (
    <HStack justifyContent="space-between" alignItems="center" gap={12} flexWrap="wrap">
      <HStack gap={12} alignItems="center">
        {icon && <Box>{icon}</Box>}
        <Box>
          <Text fontSize={20} fontWeight="700" color={palette.textPrimary}>
            {title}
          </Text>
          {subtitle && (
            <Text fontSize={14} color={palette.textMuted}>
              {subtitle}
            </Text>
          )}
        </Box>
      </HStack>
      {action && <Box>{action}</Box>}
    </HStack>
  );
}
