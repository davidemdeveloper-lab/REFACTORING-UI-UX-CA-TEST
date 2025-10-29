import { GlassCard } from '@/components/common/GlassCard';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';

interface IoTStatusCardProps {
  temperature: number;
  minibarLevel: number;
  actions?: string[];
}

export function IoTStatusCard({ temperature, minibarLevel, actions }: IoTStatusCardProps) {
  return (
    <GlassCard className="gap-4">
      <VStack className="gap-3">
        <Text className="text-lg font-semibold text-white">Stato camera intelligente</Text>
        <HStack className="items-center justify-between gap-4">
          <VStack className="gap-1">
            <Text className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Temperatura
            </Text>
            <Text className="text-3xl font-semibold text-white">{temperature.toFixed(1)}°C</Text>
          </VStack>
          <VStack className="gap-2 flex-1">
            <Text className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Frigo bar
            </Text>
            <Progress value={minibarLevel} className="h-2 rounded-full bg-white/10">
              <ProgressFilledTrack className="rounded-full bg-emerald-400" />
            </Progress>
            <Text className="text-xs text-slate-400">{minibarLevel}% carica</Text>
          </VStack>
        </HStack>
        {actions && actions.length > 0 ? (
          <HStack className="flex-wrap gap-2">
            {actions.map((action) => (
              <Text
                key={action}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-slate-300"
              >
                {action}
              </Text>
            ))}
          </HStack>
        ) : null}
      </VStack>
    </GlassCard>
  );
}
