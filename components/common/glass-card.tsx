import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  padding?: string;
}

export function GlassCard({ children, className, padding = 'p-6' }: GlassCardProps) {
  return (
    <Box
      className={cn(
        'glass-surface rounded-3xl border border-white/5',
        'relative overflow-hidden',
        padding,
        className
      )}
    >
      <Box className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      <Box className="relative z-10">{children}</Box>
    </Box>
  );
}

export function GlassPanel({ children, className, padding = 'p-4' }: GlassCardProps) {
  return (
    <Box
      className={cn(
        'glass-surface-strong rounded-2xl border border-white/10',
        'relative overflow-hidden backdrop-blur-xl',
        padding,
        className
      )}
    >
      <Box className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      <Box className="relative z-10">{children}</Box>
    </Box>
  );
}
