export function cn(
  ...classes: Array<string | undefined | null | false>
): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(value: number, currency: string = 'EUR') {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: string | Date) {
  const dt = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dt);
}

export function formatTime(date: string | Date) {
  const dt = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dt);
}
