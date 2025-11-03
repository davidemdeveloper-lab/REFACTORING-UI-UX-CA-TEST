'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

type SectionCardProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  padding?: 'md' | 'lg';
  className?: string;
  contentClassName?: string;
};

export function SectionCard({
  title,
  subtitle,
  actions,
  children,
  padding = 'lg',
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <Box
      className={`mb-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] ${className ?? ''}`}
    >
      <HStack
        className={`items-start justify-between border-b border-[var(--color-border)] ${
          padding === 'lg' ? 'px-8 py-6' : 'px-6 py-4'
        }`}
      >
        <Box className="max-w-[70%]">
          <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
            {title}
          </Text>
          {subtitle ? (
            <Text className="mt-1 text-sm leading-6 text-[var(--color-neutral-600)]">
              {subtitle}
            </Text>
          ) : null}
        </Box>
        {actions ? <Box className="flex-row gap-3">{actions}</Box> : null}
      </HStack>
      <Box
        className={`${
          padding === 'lg' ? 'px-8 py-6' : 'px-6 py-4'
        } ${contentClassName ?? ''}`}
      >
        {children}
      </Box>
    </Box>
  );
}
