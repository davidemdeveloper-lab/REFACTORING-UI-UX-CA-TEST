'use client';

import { ReactNode } from 'react';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <HStack className="w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <VStack className="gap-1">
        <Text className="text-2xl font-semibold text-white" accessibilityRole="header">
          {title}
        </Text>
        {description ? (
          <Text className="text-sm text-white/70" accessibilityRole="text">
            {description}
          </Text>
        ) : null}
      </VStack>
      {actions ? <div className="flex gap-3">{actions}</div> : null}
    </HStack>
  );
}
