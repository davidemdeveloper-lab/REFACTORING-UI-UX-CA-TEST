import { NotificationItem } from '@/types';

export const notificationsMock: NotificationItem[] = [
  {
    id: 'notification-1',
    type: 'AI Fallback',
    title: 'Risposta AI non inviata',
    message:
      "Conversazione con Giovanni Greco: l'AI non è sicura della risposta. Serve intervento umano.",
    timestamp: '2025-10-28T07:55:00Z',
    status: 'Nuovo',
    relatedCustomerId: 'customer-1',
  },
  {
    id: 'notification-2',
    type: 'Cliente Prioritario',
    title: 'Cliente ad alta attenzione',
    message:
      'Antonio Marino ha aperto 3 messaggi negli ultimi 5 minuti. Controlla la chat.',
    timestamp: '2025-10-28T08:10:00Z',
    status: 'Nuovo',
    relatedCustomerId: 'customer-3',
  },
  {
    id: 'notification-3',
    type: 'Nota Assegnata',
    title: 'Nota assegnata a te',
    message: 'Chiara ti ha assegnato la nota su welcome kit famiglia Marino.',
    timestamp: '2025-10-28T06:45:00Z',
    status: 'Letto',
    relatedCustomerId: 'customer-3',
  },
  {
    id: 'notification-4',
    type: 'IoT',
    title: 'Minibar sotto soglia',
    message: 'Camera 305 con minibar al 18%. Programmare refill rapido.',
    timestamp: '2025-10-28T05:15:00Z',
    status: 'Nuovo',
    relatedBookingId: 'booking-2',
  },
  {
    id: 'notification-5',
    type: 'Sistema',
    title: 'Template aggiornato',
    message: "Il template 'Email Conferma Prenotazione' è stato modificato da Marta.",
    timestamp: '2025-10-27T16:20:00Z',
    status: 'Letto',
  },
];

