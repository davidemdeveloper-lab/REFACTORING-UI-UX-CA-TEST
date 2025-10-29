import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';

export function formatDate(value: string, pattern = "d MMMM yyyy"): string {
  try {
    return format(parseISO(value), pattern, { locale: it });
  } catch (error) {
    return value;
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function statusLabel(status: string): string {
  const map: Record<string, string> = {
    confermato: 'Confermato',
    in_attesa: 'In attesa',
    da_contattare: 'Da contattare',
    vip: 'VIP',
    opzione: 'Opzione',
    perso: 'Prenotazione persa',
    precheckin: 'Pre check-in',
    in_house: 'In house',
  };
  return map[status] ?? status;
}
