'use client';

import { PropsWithChildren } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export type GlassPanelProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  className?: string;
  headerAction?: React.ReactNode;
}>;

export const GlassPanel = ({
  title,
  subtitle,
  className,
  children,
  headerAction,
}: GlassPanelProps) => {
  return (
    <Box
      className={`rounded-3xl border border-white/10 bg-[rgb(var(--color-background-glass))] px-6 py-5 backdrop-blur-xl shadow-[0_20px_45px_rgba(8,12,20,0.45)] ${className ?? ''}`}
    >
      {(title || subtitle || headerAction) && (
        <Box className="mb-4 flex flex-row flex-wrap items-start justify-between gap-3">
          <Box className="flex-1">
            {title && (
              <Text className="text-lg font-semibold text-typography-0 tracking-tight">
                {title}
              </Text>
            )}
            {subtitle && (
              <Text className="mt-1 text-sm text-typography-300">{subtitle}</Text>
            )}
          </Box>
          {headerAction}
        </Box>
      )}
      {children}
    </Box>
  );
};

// Validazione: pannello glassy con bordi morbidi e leggibilità elevata coerente con estetica metal-glassy richiesta.
