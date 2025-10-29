'use client';

import { MetalGlassCard } from '@/components/design-system/MetalGlassCard';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { palette } from '@/theme/palette';
import { StatusPill } from '@/components/design-system/StatusPill';
import { Button, ButtonText } from '@/components/ui/button';

interface ServiceCardProps {
  name: string;
  description: string;
  status: string;
  actionLabel: string;
}

export function ServiceCard({ name, description, status, actionLabel }: ServiceCardProps) {
  const tone = status === 'attivo' ? 'success' : 'accent';

  return (
    <MetalGlassCard>
      <VStack space="md">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize={18} fontWeight="700" color={palette.textPrimary}>
            {name}
          </Text>
          <StatusPill label={status} tone={tone} />
        </HStack>
        <Text fontSize={14} color={palette.textSecondary}>
          {description}
        </Text>
        <HStack justifyContent="flex-end">
          <Button
            size="sm"
            variant="outline"
            borderColor="rgba(56,189,248,0.35)"
            bg="rgba(56,189,248,0.1)"
          >
            <ButtonText color={palette.accentPrimary}>{actionLabel}</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </MetalGlassCard>
  );
}
