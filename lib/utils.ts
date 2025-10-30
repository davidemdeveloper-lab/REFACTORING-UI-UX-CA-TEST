import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import type { BookingStatus, StayStatus, TimelineEvent } from '@/types';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: string, pattern = "d MMM yyyy 'alle' HH:mm"): string {
  return format(parseISO(date), pattern, { locale: it });
}

export const bookingStatusColor: Record<BookingStatus, string> = {
  richiesta: 'bg-sky-500/10 text-sky-200 border border-sky-500/40',
  opzione: 'bg-slate-500/10 text-slate-200 border border-slate-500/40',
  confermata: 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/40',
  'pagamento in corso': 'bg-amber-500/10 text-amber-200 border border-amber-500/40',
  'pre-check-in inviato': 'bg-purple-500/10 text-purple-200 border border-purple-500/40',
  'check-in': 'bg-purple-500/10 text-purple-200 border border-purple-500/40',
  'in soggiorno': 'bg-indigo-500/10 text-indigo-200 border border-indigo-500/40',
  'check-out': 'bg-blue-500/10 text-blue-200 border border-blue-500/40',
  cancellata: 'bg-rose-500/10 text-rose-200 border border-rose-500/40',
};

export const stayStatusLabel: Record<StayStatus, string> = {
  'nuova richiesta': 'Nuova richiesta',
  confermata: 'Confermata',
  'pagamento in sospeso': 'Pagamento in sospeso',
  'pre-check-in inviato': 'Pre check-in inviato',
  'check-in completato': 'Check-in completato',
  'follow-up inviato': 'Follow-up inviato',
};

export function timelineColor(event: TimelineEvent): string {
  if (event.status === 'success') return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/50';
  if (event.status === 'warning') return 'text-amber-200 bg-amber-500/10 border-amber-500/50';
  return 'text-sky-200 bg-sky-500/10 border-sky-500/50';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function statusIndicator(status: 'online' | 'offline' | 'maintenance'): string {
  switch (status) {
    case 'online':
      return 'bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.65)]';
    case 'offline':
      return 'bg-rose-400 shadow-[0_0_12px_rgba(248,113,113,0.65)]';
    case 'maintenance':
      return 'bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.65)]';
  }
}

export function safeId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
