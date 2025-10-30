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
      className="overflow-hidden"
      style={{
        backgroundColor: palette.surface,
        borderColor: border ? palette.glassStroke : 'transparent',
        borderWidth: border ? 1 : 0,
        borderStyle: border ? 'solid' : 'none',
        borderRadius: 20,
        boxShadow: '0px 18px 38px rgba(2, 6, 23, 0.4)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding,
        gap,
      } as any}
    >
      {children}
    </Box>
  );
}
