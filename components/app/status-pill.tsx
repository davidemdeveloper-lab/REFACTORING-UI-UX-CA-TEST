'use client';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

type StatusColor = 'primary' | 'success' | 'warning' | 'error' | 'info';

export const StatusPill = ({
  label,
  color = 'primary',
}: {
  label: string;
  color?: StatusColor;
}) => {
  const baseColorMap: Record<StatusColor, string> = {
    primary: 'bg-primary-500/20 text-primary-100 border-primary-500/40',
    success: 'bg-success-500/15 text-success-200 border-success-500/40',
    warning: 'bg-warning-500/15 text-warning-200 border-warning-500/40',
    error: 'bg-error-500/15 text-error-200 border-error-500/40',
    info: 'bg-info-500/15 text-info-200 border-info-500/40',
  };

  return (
    <Box
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.3em] ${baseColorMap[color]}`}
    >
      <Text>{label}</Text>
    </Box>
  );
};

// Validazione: pill di stato con palette metal-glassy per evidenziare stati funzionali.
