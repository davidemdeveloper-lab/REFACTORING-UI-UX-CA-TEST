import type { ReactNode } from 'react';
import { Box } from '@/components/ui/box';

interface MetricCardProps {
  title: string;
  value: string;
  delta?: { value: string; positive?: boolean; description?: string };
  icon: ReactNode;
}

export function MetricCard({ title, value, delta, icon }: MetricCardProps) {
  return (
    <Box className="glass-panel-soft flex flex-1 flex-col gap-4 rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.35em] text-slate-400">{title}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-semibold text-white">{value}</div>
      {delta && (
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span
            className={`rounded-full px-2 py-1 font-semibold uppercase tracking-[0.25em] ${
              delta.positive ? 'bg-emerald-500/15 text-emerald-200' : 'bg-rose-500/15 text-rose-200'
            }`}
          >
            {delta.value}
          </span>
          <span>{delta.description}</span>
        </div>
      )}
    </Box>
  );
}
