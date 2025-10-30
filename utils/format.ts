import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';

export const formatDate = (date: string) => format(parseISO(date), 'dd MMM yyyy', { locale: it });

export const formatTimeDistance = (date: string) =>
  formatDistanceToNow(parseISO(date), { locale: it, addSuffix: true });

export const formatCurrency = (value: number, currency = 'EUR') =>
  new Intl.NumberFormat('it-IT', { style: 'currency', currency }).format(value);
