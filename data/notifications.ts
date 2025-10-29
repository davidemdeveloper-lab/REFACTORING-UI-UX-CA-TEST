import type { Notification } from '@/types';

export const notifications: Notification[] = [
  {
    id: 'ntf-1',
    title: 'Pagamento confermato',
    description: 'La caparra di Giovanni Greco è stata registrata dal PMS.',
    level: 'success',
    createdAt: '2025-01-05T13:21:00Z',
    source: 'Pagamenti',
  },
  {
    id: 'ntf-2',
    title: 'Nuovo lead dal sito',
    description: 'Richiesta pacchetto romantico per il weekend del 14 febbraio.',
    level: 'info',
    createdAt: '2025-01-08T11:34:00Z',
    source: 'Landing Page',
    actionLabel: 'Apri lead',
  },
  {
    id: 'ntf-3',
    title: 'Sollecito pagamento',
    description: 'Antonio Marino non ha ancora completato la caparra. Invio reminder?',
    level: 'warning',
    createdAt: '2025-01-07T09:00:00Z',
    source: 'Revenue Bot',
    actionLabel: 'Invia WhatsApp',
  },
  {
    id: 'ntf-4',
    title: 'Sensore wellness offline',
    description: 'Il diffusore aromi Spa - Sala Respiro è offline da 3 ore.',
    level: 'critical',
    createdAt: '2025-01-08T07:12:00Z',
    source: 'IoT Hub',
    actionLabel: 'Apri ticket',
  },
];
