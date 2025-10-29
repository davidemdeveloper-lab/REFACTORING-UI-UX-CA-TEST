import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { palette } from '@/theme/palette';

interface GlassCardProps {
  className?: string;
  children: ReactNode;
}

export function GlassCard({ className = '', children }: GlassCardProps) {
  return (
    <Box
      className={`glass-panel rounded-3xl border border-white/10 p-6 ${className}`}
      style={{
        backgroundColor: palette.background.elevated,
      }}
    >
      {children}
    </Box>
  );
}
