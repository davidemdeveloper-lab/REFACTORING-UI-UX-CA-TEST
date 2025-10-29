import { ReactNode } from 'react';
import { GlassCard } from './glass-card';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: ReactNode;
  footer?: string;
  className?: string;
}

export function StatCard({ title, value, delta, trend = 'stable', icon, footer, className }: StatCardProps) {
  return (
    <GlassCard className={cn('h-full min-h-[160px]', className)} padding="p-5">
      <Box className="flex flex-row justify-between">
        <Box className="gap-2">
          <Text className="text-xs uppercase tracking-[0.35em] text-typography-400">{title}</Text>
          <Text className="text-3xl font-semibold text-typography-0">{value}</Text>
          {footer ? <Text className="text-xs text-typography-300">{footer}</Text> : null}
        </Box>
        {icon ? <Box className="rounded-2xl bg-primary-500/15 p-3 text-primary-400">{icon}</Box> : null}
      </Box>
      {delta ? (
        <Box className="mt-4 flex items-center gap-2">
          <Box
            className={cn(
              'h-2 w-2 rounded-full',
              trend === 'up'
                ? 'bg-success-500'
                : trend === 'down'
                ? 'bg-error-500'
                : 'bg-typography-500'
            )}
          />
          <Text
            className={cn(
              'text-sm font-medium',
              trend === 'up'
                ? 'text-success-400'
                : trend === 'down'
                ? 'text-error-400'
                : 'text-typography-200'
            )}
          >
            {delta}
          </Text>
        </Box>
      ) : null}
    </GlassCard>
  );
}
