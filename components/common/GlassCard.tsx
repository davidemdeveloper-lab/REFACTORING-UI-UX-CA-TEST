'use client';

import { Box } from '@gluestack-ui/themed';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  padding?: string;
  height?: string | number;
}

export function GlassCard({ children, padding = '$6', height }: GlassCardProps) {
  return (
    <Box
      borderRadius="$xl"
      borderWidth={1}
      borderColor="rgba(255,255,255,0.18)"
      bgColor="rgba(13, 24, 41, 0.55)"
      px={padding}
      py={padding}
      height={height}
      style={{ backdropFilter: 'blur(18px)' }}
    >
      {children}
    </Box>
  );
}
