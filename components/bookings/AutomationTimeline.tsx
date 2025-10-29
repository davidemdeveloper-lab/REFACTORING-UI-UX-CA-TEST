import { GlassCard } from '@/components/common/GlassCard';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { palette } from '@/theme/palette';

interface TimelineStep {
  id: string;
  label: string;
  date: string;
  completed: boolean;
}

interface AutomationTimelineProps {
  steps: TimelineStep[];
}

export function AutomationTimeline({ steps }: AutomationTimelineProps) {
  return (
    <GlassCard>
      <VStack className="gap-6">
        <Text className="text-xl font-semibold text-white">Timeline comunicazioni</Text>
        <HStack className="gap-6">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <VStack key={step.id} className="items-center gap-3 flex-1">
                <VStack className="items-center gap-3">
                  <Text className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    {step.date}
                  </Text>
                  <HStack className="items-center gap-3">
                    <Text
                      className="rounded-full px-4 py-2 text-sm font-semibold"
                      style={{
                        backgroundColor: step.completed
                          ? 'rgba(125, 248, 198, 0.25)'
                          : 'rgba(148, 163, 184, 0.12)',
                        color: step.completed
                          ? palette.text.positive
                          : palette.text.secondary,
                        borderWidth: 1,
                        borderColor: step.completed
                          ? 'rgba(125, 248, 198, 0.55)'
                          : 'rgba(148, 163, 184, 0.2)',
                      }}
                    >
                      {step.label}
                    </Text>
                  </HStack>
                  {!isLast ? (
                    <Box className="h-1 w-full rounded-full bg-white/10">
                      <Box
                        className="h-full rounded-full"
                        style={{
                          width: '100%',
                          backgroundColor: step.completed
                            ? 'rgba(125, 248, 198, 0.4)'
                            : 'rgba(148, 163, 184, 0.2)',
                        }}
                      />
                    </Box>
                  ) : null}
                </VStack>
              </VStack>
            );
          })}
        </HStack>
      </VStack>
    </GlassCard>
  );
}
