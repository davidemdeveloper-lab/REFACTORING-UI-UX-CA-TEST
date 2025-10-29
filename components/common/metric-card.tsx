import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { GlassCard } from './glass-card';

type MetricCardProps = {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'stable';
  };
  caption?: string;
};

const TREND_ICON: Record<'up' | 'down' | 'stable', string> = {
  up: '▲',
  down: '▼',
  stable: '◆',
};

export const MetricCard = ({ icon, label, value, trend, caption }: MetricCardProps) => {
  return (
    <GlassCard className="h-full">
      <HStack className="items-start justify-between">
        <HStack className="items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <Icon as={icon} size={22} color="rgba(255,255,255,0.85)" />
          </div>
          <div>
            <Text className="text-xs uppercase tracking-[0.3em] text-white/60">{label}</Text>
            <Text className="mt-1 text-2xl font-semibold text-white">{value}</Text>
          </div>
        </HStack>
        {trend ? (
          <div
            className={`badge-pill ${
              trend.direction === 'up'
                ? 'bg-success-500/20 text-success-200'
                : trend.direction === 'down'
                ? 'bg-error-500/20 text-error-200'
                : 'bg-info-500/20 text-info-100'
            }`}
          >
            {TREND_ICON[trend.direction]} {trend.value}
          </div>
        ) : null}
      </HStack>
      {caption ? (
        <Text className="text-xs text-white/60">{caption}</Text>
      ) : null}
    </GlassCard>
  );
};
