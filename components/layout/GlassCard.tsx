'use client';

import { ReactNode, CSSProperties, HTMLAttributes } from 'react';
import { Box } from '@/components/ui/box';
import { palette, gradients } from '@/design/palette';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  gap?: number;
  borderColor?: string;
  className?: string;
  style?: CSSProperties;
}

export const GlassCard = ({
  children,
  padding = 20,
  gap = 12,
  borderColor,
  className,
  style,
  ...props
}: GlassCardProps) => (
  <Box
    className={className}
    {...props}
    style={{
      background: gradients.card,
      borderRadius: 20,
      padding,
      display: 'flex',
      flexDirection: 'column',
      gap,
      border: `1px solid ${borderColor ?? palette.glassStroke}`,
      backdropFilter: 'blur(20px)',
      boxShadow: `0 25px 50px ${palette.shadowDark}`,
      ...style,
    }}
  >
    {children}
  </Box>
);
