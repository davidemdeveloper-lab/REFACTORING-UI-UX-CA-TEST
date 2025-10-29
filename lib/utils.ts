export function formatDate(value: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(value).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options,
  });
}

export function formatDateTime(value: string) {
  return new Date(value).toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function getStatusLabel(status: string) {
  const map: Record<string, string> = {
    confermato: 'Confermato',
    in_attesa: 'In attesa',
    perso: 'Perso',
    proposta: 'Proposta inviata',
  };
  return map[status] ?? status;
}

export function getStatusTone(status: string) {
  const map: Record<string, { bg: string; text: string }> = {
    confermato: { bg: 'rgba(76, 222, 171, 0.16)', text: '#28c87c' },
    in_attesa: { bg: 'rgba(255, 198, 89, 0.18)', text: '#f7931e' },
    perso: { bg: 'rgba(235, 87, 87, 0.18)', text: '#cc2f45' },
    proposta: { bg: 'rgba(79, 111, 255, 0.18)', text: '#4f6fff' },
  };
  return map[status] ?? { bg: 'rgba(255,255,255,0.12)', text: '#ffffff' };
}
