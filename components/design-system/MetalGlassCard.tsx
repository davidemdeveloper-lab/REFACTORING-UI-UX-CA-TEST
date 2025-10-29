'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { palette } from '@/theme/palette';

interface MetalGlassCardProps {
  children: ReactNode;
  padding?: number;
  gap?: number;
  border?: boolean;
}

export function MetalGlassCard({
  children,
  padding = 16,
  gap = 12,
  border = true,
}: MetalGlassCardProps) {
  return (
    <Box
      bg={palette.surface}
      borderColor={border ? palette.glassStroke : 'transparent'}
      borderWidth={border ? 1 : 0}
      borderRadius={20}
      overflow="hidden"
      shadowColor="#020617"
      shadowOffset={{ width: 0, height: 18 }}
      shadowOpacity={0.4}
      shadowRadius={38}
      style={{
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding,
        gap,
      }}
    >
      {children}
    </Box>
  );
}
