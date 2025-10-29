import { GlassCard } from '@/components/common/GlassCard';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { palette } from '@/theme/palette';

interface OccupancyDistributionProps {
  data: { label: string; value: number }[];
}

export function OccupancyDistribution({ data }: OccupancyDistributionProps) {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <GlassCard>
      <VStack className="gap-6">
        <HStack className="items-baseline justify-between">
          <Text className="text-xl font-semibold text-white">Occupazione camere</Text>
          <Text className="text-sm text-slate-400">Ultimi 30 giorni</Text>
        </HStack>
        <VStack className="gap-4">
          {data.map((item) => {
            const width = `${(item.value / max) * 100}%`;
            return (
              <VStack key={item.label} className="gap-2">
                <HStack className="items-center justify-between">
                  <Text className="text-sm text-slate-300">{item.label}</Text>
                  <Text className="text-sm font-semibold text-white">{item.value}%</Text>
                </HStack>
                <Box className="h-3 overflow-hidden rounded-full bg-white/10">
                  <Box
                    className="h-full rounded-full"
                    style={{
                      width,
                      backgroundImage: `linear-gradient(90deg, ${palette.gradients.primary[0]}, ${palette.gradients.primary[1]}, ${palette.gradients.primary[2]})`,
                    }}
                  />
                </Box>
              </VStack>
            );
          })}
        </VStack>
      </VStack>
    </GlassCard>
  );
}
