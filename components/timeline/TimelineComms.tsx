'use client';

import { VStack, HStack, Text, Box } from '@gluestack-ui/themed';
import type { BookingStep } from '@/lib/types';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

interface TimelineCommsProps {
  steps: BookingStep[];
}

export const TimelineComms = ({ steps }: TimelineCommsProps) => (
  <VStack position="relative" space="lg" pl={24}>
    <Box
      position="absolute"
      left={12}
      top={0}
      bottom={0}
      width={2}
      bg={palette.steel[500]}
      opacity={0.7}
      sx={{ boxShadow: '0 0 12px rgba(94,161,250,0.45)' }}
    />
    {steps.map((step, index) => {
      const active = Boolean(step.deliveredAt) && !step.failed;
      const failed = Boolean(step.failed);
      return (
        <HStack key={step.id} space="md" alignItems="flex-start">
          <Box
            mt={2}
            width={18}
            height={18}
            borderRadius={tokens.radii.lg}
            bg={failed ? palette.state.danger : active ? palette.accent[500] : palette.steel[600]}
            borderWidth={2}
            borderColor={failed ? palette.state.danger : palette.accent[400]}
            sx={{ boxShadow: active ? '0 0 12px rgba(94,161,250,0.5)' : 'none' }}
          />
          <VStack space="xs" bg="rgba(15,23,42,0.35)" borderRadius={tokens.radii.lg} px={16} py={12} borderWidth={1} borderColor="rgba(148,197,253,0.2)" flex={1}>
            <Text fontSize={14} fontWeight="600">
              {step.label}
            </Text>
            <Text fontSize={12} color={palette.steel[200]}>
              Canale: {step.channel.toUpperCase()}
            </Text>
            <Text fontSize={11} color={failed ? palette.state.danger : palette.steel[100]}>
              {step.deliveredAt
                ? new Date(step.deliveredAt).toLocaleString('it-IT', { dateStyle: 'medium', timeStyle: 'short' })
                : failed
                ? 'Consegna fallita'
                : 'In attesa di invio'}
            </Text>
          </VStack>
        </HStack>
      );
    })}
  </VStack>
);
