import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';

interface StatusPillProps {
  label: string;
  tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export function StatusPill({ label, tone = 'neutral' }: StatusPillProps) {
  const toneStyles: Record<NonNullable<StatusPillProps['tone']>, string> = {
    success: 'bg-success-500/15 text-success-500 border-success-500/40',
    warning: 'bg-warning-500/15 text-warning-500 border-warning-500/40',
    danger: 'bg-error-500/15 text-error-400 border-error-500/40',
    info: 'bg-info-500/10 text-info-400 border-info-500/40',
    neutral: 'bg-background-0/50 text-typography-200 border-white/10',
  };

  return (
    <Box
      className={cn(
        'inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        toneStyles[tone]
      )}
    >
      <Text className="text-[11px] font-semibold uppercase tracking-[0.2em]">{label}</Text>
    </Box>
  );
}
