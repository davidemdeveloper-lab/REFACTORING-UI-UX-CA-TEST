'use client';

import { ReactNode } from 'react';
import { MetalGlassCard } from './MetalGlassCard';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { palette } from '@/theme/palette';
import { Box } from '@/components/ui/box';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'steady';
  description?: string;
  icon?: ReactNode;
}

const trendColor = {
  up: palette.success,
  down: palette.danger,
  steady: palette.accentSecondary,
};

export function MetricCard({ title, value, change, trend, description, icon }: MetricCardProps) {
  return (
    <MetalGlassCard>
      <VStack space="sm">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize={14} color={palette.textMuted}>
            {title}
          </Text>
          {icon && <Box>{icon}</Box>}
        </HStack>
        <HStack alignItems="flex-end" justifyContent="space-between">
          <Text fontSize={30} fontWeight="700" color={palette.textPrimary}>
            {value}
          </Text>
          <Text fontSize={13} fontWeight="600" color={trendColor[trend]}>
            {change}
          </Text>
        </HStack>
        {description && (
          <Text fontSize={13} color={palette.textSecondary}>
            {description}
          </Text>
        )}
        <Box
          h={3}
          bg={palette.surfaceMuted}
          borderRadius={999}
          overflow="hidden"
          position="relative"
        >
          <Box
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            borderRadius={999}
            style={{
              width: trend === 'up' ? '82%' : trend === 'down' ? '55%' : '68%',
              background:
                trend === 'up'
                  ? 'linear-gradient(90deg, rgba(56,189,248,0.9), rgba(74,222,128,0.8))'
                  : trend === 'down'
                  ? 'linear-gradient(90deg, rgba(248,113,113,0.9), rgba(251,191,36,0.8))'
                  : 'linear-gradient(90deg, rgba(168,85,247,0.9), rgba(56,189,248,0.8))',
            }}
          />
        </Box>
      </VStack>
    </MetalGlassCard>
  );
}
