import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <Box className={cn('mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between', className)}>
      <Box className="max-w-3xl gap-3">
        <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Customer Automator</Text>
        <Text className="font-semibold text-3xl text-typography-0 md:text-4xl">{title}</Text>
        {subtitle ? (
          <Text className="text-sm text-typography-200 md:text-base">{subtitle}</Text>
        ) : null}
      </Box>
      {actions ? <Box className="mt-2 flex items-center gap-3 md:mt-0">{actions}</Box> : null}
    </Box>
  );
}
