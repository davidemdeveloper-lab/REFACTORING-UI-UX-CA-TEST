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
        <HStack className="justify-between items-center">
          <Text style={{ fontSize: 14, color: palette.textMuted } as any}>
            {title}
          </Text>
          {icon && <Box>{icon}</Box>}
        </HStack>
        <HStack className="items-end justify-between">
          <Text style={{ fontSize: 30, fontWeight: '700', color: palette.textPrimary } as any}>
            {value}
          </Text>
          <Text style={{ fontSize: 13, fontWeight: '600', color: trendColor[trend] } as any}>
            {change}
          </Text>
        </HStack>
        {description && (
          <Text style={{ fontSize: 13, color: palette.textSecondary } as any}>
            {description}
          </Text>
        )}
        <Box
          className="overflow-hidden"
          style={{
            height: 3,
            backgroundColor: palette.surfaceMuted,
            borderRadius: 999,
            position: 'relative',
          } as any}
        >
          <Box
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              borderRadius: 999,
              width: trend === 'up' ? '82%' : trend === 'down' ? '55%' : '68%',
              background:
                trend === 'up'
                  ? 'linear-gradient(90deg, rgba(56,189,248,0.9), rgba(74,222,128,0.8))'
                  : trend === 'down'
                  ? 'linear-gradient(90deg, rgba(248,113,113,0.9), rgba(251,191,36,0.8))'
                  : 'linear-gradient(90deg, rgba(168,85,247,0.9), rgba(56,189,248,0.8))',
            } as any}
          />
        </Box>
      </VStack>
    </MetalGlassCard>
  );
}
