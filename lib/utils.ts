export const formatDate = (date: string, options?: Intl.DateTimeFormatOptions) => {
  const parsed = new Date(date);
  return parsed.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  });
};

export const formatDateTime = (date: string) => {
  const parsed = new Date(date);
  return parsed.toLocaleString('it-IT', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);

export const statusLabel: Record<string, string> = {
  proposta: 'Proposta Inviata',
  in_attesa_pagamento: 'In attesa pagamento',
  pagata: 'Pagata',
  in_corso: 'In corso',
  checkout: 'Checkout',
  archiviata: 'Archiviata',
};

export const channelLabel: Record<string, string> = {
  booking: 'Booking.com',
  direct: 'Diretto',
  email: 'Email',
  whatsapp: 'WhatsApp',
  phone: 'Telefono',
};

export const sentimentColor: Record<string, string> = {
  positivo: 'text-success-400',
  neutro: 'text-info-400',
  negativo: 'text-error-400',
};
