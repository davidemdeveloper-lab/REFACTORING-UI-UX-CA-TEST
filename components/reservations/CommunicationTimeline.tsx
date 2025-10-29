'use client';

import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { palette } from '@/theme/palette';
import { Motion } from '@legendapp/motion/react';

interface TimelineStep {
  label: string;
  timestamp: string;
  completed: boolean;
}

interface CommunicationTimelineProps {
  steps: TimelineStep[];
}

export function CommunicationTimeline({ steps }: CommunicationTimelineProps) {
  return (
    <HStack justifyContent="space-between" position="relative" py={16}>
      <Box
        position="absolute"
        left={0}
        right={0}
        top="50%"
        h={2}
        bg="rgba(148,163,184,0.25)"
        borderRadius={999}
      />
      {steps.map((step, index) => {
        const active = step.completed;
        return (
          <VStack key={step.label} alignItems="center" space="xs" w={`${100 / steps.length}%`}>
            <Motion.View
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: active ? 1 : 0.95, opacity: active ? 1 : 0.7 }}
              transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            >
              <Box
                w={52}
                h={52}
                borderRadius={999}
                alignItems="center"
                justifyContent="center"
                bg={active ? 'rgba(56,189,248,0.25)' : 'rgba(15,23,42,0.65)'}
                borderWidth={1}
                borderColor={active ? 'rgba(56,189,248,0.65)' : 'rgba(148,163,184,0.25)'}
                shadowColor={active ? palette.accentPrimary : 'transparent'}
                shadowOpacity={active ? 0.45 : 0}
                shadowRadius={18}
              >
                <Text fontSize={12} fontWeight="600" color={active ? palette.accentPrimary : palette.textMuted}>
                  {index + 1}
                </Text>
              </Box>
            </Motion.View>
            <Text fontSize={13} fontWeight="600" textAlign="center" color={palette.textPrimary}>
              {step.label}
            </Text>
            <Text fontSize={12} color={active ? palette.textSecondary : palette.textMuted}>
              {step.timestamp}
            </Text>
          </VStack>
        );
      })}
    </HStack>
  );
}
