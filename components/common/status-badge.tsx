import React from 'react';
import { statusLabel } from '@/lib/utils';

const STATUS_STYLE: Record<string, string> = {
  proposta: 'bg-info-500/15 text-info-100 border border-info-500/30',
  in_attesa_pagamento: 'bg-warning-500/20 text-warning-100 border border-warning-500/30',
  pagata: 'bg-success-500/20 text-success-200 border border-success-500/30',
  in_corso: 'bg-[var(--accent-color)]/20 text-white border border-white/40',
  checkout: 'bg-secondary-500/20 text-white border border-white/20',
  archiviata: 'bg-white/10 text-white/50 border border-white/20',
};

export const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span className={`badge-pill ${STATUS_STYLE[status] ?? 'bg-white/10 text-white/70'}`}>
      {statusLabel[status] ?? status}
    </span>
  );
};
