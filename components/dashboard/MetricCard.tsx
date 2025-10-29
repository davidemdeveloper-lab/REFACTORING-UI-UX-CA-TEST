import { ReactNode } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  trend?: string;
  caption?: string;
}

export function MetricCard({ icon, label, value, trend, caption }: MetricCardProps) {
  return (
    <GlassCard className="flex-1">
      <HStack className="items-center justify-between gap-4">
        <HStack className="items-center gap-4">
          <Box className="h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            {icon}
          </Box>
          <VStack className="gap-1">
            <Text className="text-xs uppercase tracking-[0.3em] text-slate-400">
              {label}
            </Text>
            <Text className="text-3xl font-semibold text-white">{value}</Text>
          </VStack>
        </HStack>
        <VStack className="items-end gap-1">
          {trend ? <Text className="text-sm text-emerald-400">{trend}</Text> : null}
          {caption ? <Text className="text-xs text-slate-400">{caption}</Text> : null}
        </VStack>
      </HStack>
    </GlassCard>
  );
}
