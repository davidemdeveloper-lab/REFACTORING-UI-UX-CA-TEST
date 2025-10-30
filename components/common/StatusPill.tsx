interface StatusPillProps {
  label: string;
  tone?: 'emerald' | 'amber' | 'sky' | 'rose' | 'slate' | 'violet';
}

const toneClasses: Record<NonNullable<StatusPillProps['tone']>, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/40',
  amber: 'bg-amber-500/10 text-amber-200 border border-amber-500/40',
  sky: 'bg-sky-500/10 text-sky-200 border border-sky-500/40',
  rose: 'bg-rose-500/10 text-rose-200 border border-rose-500/40',
  slate: 'bg-slate-500/10 text-slate-200 border border-slate-500/40',
  violet: 'bg-violet-500/10 text-violet-200 border border-violet-500/40',
};

export function StatusPill({ label, tone = 'slate' }: StatusPillProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] ${toneClasses[tone]} whitespace-nowrap`}
    >
      {label}
    </span>
  );
}
