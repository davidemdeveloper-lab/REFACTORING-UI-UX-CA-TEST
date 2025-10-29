import { ReactNode } from 'react';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <HStack className="mb-4 items-end justify-between gap-4">
      <HStack className="items-baseline gap-3">
        <Text className="text-2xl font-semibold text-white">{title}</Text>
        {subtitle ? (
          <Text className="text-sm text-slate-400">{subtitle}</Text>
        ) : null}
      </HStack>
      {action}
    </HStack>
  );
}
