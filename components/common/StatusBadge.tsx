'use client';

import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { statusLabel } from '@/lib/format';

const styles: Record<string, string> = {
  confermato: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40',
  in_attesa: 'bg-amber-500/15 text-amber-300 border-amber-400/40',
  da_contattare: 'bg-rose-500/15 text-rose-300 border-rose-400/40',
  vip: 'bg-purple-500/15 text-purple-200 border-purple-400/40',
  opzione: 'bg-sky-500/15 text-sky-300 border-sky-400/40',
  perso: 'bg-red-500/15 text-red-300 border-red-400/40',
  precheckin: 'bg-blue-500/15 text-blue-200 border-blue-400/40',
  in_house: 'bg-teal-500/15 text-teal-200 border-teal-400/40',
};

export function StatusBadge({ status }: { status: string }) {
  const visual = styles[status] ?? 'bg-white/10 text-white border-white/20';
  return (
    <Box className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${visual}`}>
      <Text className="text-inherit" accessibilityRole="text">
        {statusLabel(status)}
      </Text>
    </Box>
  );
}
