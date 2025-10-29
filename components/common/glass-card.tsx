import React from 'react';
import { Box } from '@/components/ui/box';

export const GlassCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <Box
    className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-2xl transition-shadow hover:shadow-[0_12px_40px_rgba(10,14,25,0.35)] ${
      className ?? ''
    }`}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_65%)]" />
    <div className="relative z-10 space-y-4">{children}</div>
  </Box>
);
