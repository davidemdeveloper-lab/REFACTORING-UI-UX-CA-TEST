'use client';

import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  icon?: ReactNode;
}

export function MetricCard({ title, value, trend, icon }: MetricCardProps) {
  return (
    <div className="flex flex-1 min-w-[200px] flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/50">{title}</p>
        {icon ? <div className="text-white/70">{icon}</div> : null}
      </div>
      <p className="text-3xl font-semibold text-white">{value}</p>
      {trend ? <p className="text-sm text-white/60">{trend}</p> : null}
    </div>
  );
}
