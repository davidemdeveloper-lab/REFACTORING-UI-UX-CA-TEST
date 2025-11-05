import { NotificationItem } from '@/types';

export const notificationsMock: NotificationItem[] = [
  {
    id: 'notification-1',
    type: 'AI Fallback',
    title: 'Fallback AI sulla prenotazione 1',
    message:
      "Giovanni Greco attende conferma pagamento e parcheggio. Prendi in carico la risposta in chat Booking.",
    timestamp: '2025-10-28T08:05:00Z',
    status: 'Nuovo',
    relatedCustomerId: 'customer-1',
    relatedBookingId: 'booking-1',
  },
  {
    id: 'notification-2',
    type: 'Cliente Prioritario',
    title: 'Cliente ad alta attenzione',
    message:
      'Antonio Marino attende conferma late checkout e transfer per domani mattina.',
    timestamp: '2025-10-28T08:18:00Z',
    status: 'Nuovo',
    relatedCustomerId: 'customer-3',
    relatedBookingId: 'booking-2',
  },
  {
    id: 'notification-3',
    type: 'Nota Assegnata',
    title: 'Nota assegnata: Welcome kit famiglia Marino',
    message:
      'Chiara ti ha assegnato la nota collegata alla camera 305. Verifica preferenze allergie entro oggi.',
    timestamp: '2025-10-28T07:10:00Z',
    status: 'Nuovo',
    relatedCustomerId: 'customer-3',
    relatedBookingId: 'booking-2',
  },
  {
    id: 'notification-4',
    type: 'IoT',
    title: 'Camera 204 fuori comfort',
    message:
      'Temperatura 24.8°C e minibar al 18%. Avvisa housekeeping e concierge per refill.',
    timestamp: '2025-10-28T07:40:00Z',
    status: 'Letto',
    relatedBookingId: 'booking-1',
  },
  {
    id: 'notification-5',
    type: 'Sistema',
    title: 'Template conferma prenotazione aggiornato',
    message:
      "Marta ha pubblicato la nuova versione del template 'Email Conferma Prenotazione'.",
    timestamp: '2025-10-27T16:20:00Z',
    status: 'Risolto',
  },
  {
    id: 'notification-6',
    type: 'Nota Assegnata',
    title: 'Nota chiusa: Portafoglio ritrovato',
    message:
      'Marco ha risolto la nota collegata a Giovanni Greco. Aggiorna il cliente al check-in.',
    timestamp: '2025-10-27T18:05:00Z',
    status: 'Risolto',
    relatedBookingId: 'booking-2',
  },
];
