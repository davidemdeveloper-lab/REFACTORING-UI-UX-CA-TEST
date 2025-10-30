import type { Booking } from '@/types';

export const bookings: Booking[] = [
  {
    id: 'booking-101',
    clientId: 'client-1',
    title: 'Prenotazione #1 - Giovanni Greco',
    status: 'confermato',
    checkIn: '2024-10-12',
    checkOut: '2024-10-16',
    revenue: 1860,
    channel: 'Direct',
    tasks: ['Invia upgrade suite', 'Verifica preferenze colazione'],
    timeline: [
      { label: 'Proposta inviata', timestamp: '2024-08-22 09:22', type: 'info' },
      { label: 'Email di conferma', timestamp: '2024-08-22 09:34', type: 'success' },
      { label: 'Pagamento ricevuto', timestamp: '2024-08-24 15:12', type: 'success' },
      { label: 'Reminder pre check-in', timestamp: '2024-10-09 10:00', type: 'info' },
    ],
  },
  {
    id: 'booking-102',
    clientId: 'client-2',
    title: 'Prenotazione #2 - Antonio Marino',
    status: 'in_attesa',
    checkIn: '2024-11-03',
    checkOut: '2024-11-05',
    revenue: 780,
    channel: 'OTA',
    tasks: ['Richiesta conferma carta', 'Proposta pacchetto family'],
    timeline: [
      { label: 'Richiesta inviata', timestamp: '2024-09-18 11:40', type: 'info' },
      { label: 'Chiamata con agente', timestamp: '2024-09-19 17:20', type: 'info' },
      { label: 'Follow-up automatico', timestamp: '2024-09-22 08:30', type: 'warning' },
    ],
  },
  {
    id: 'booking-103',
    clientId: 'client-3',
    title: 'Prenotazione #3 - Francesca Gallo',
    status: 'perso',
    checkIn: '2024-09-22',
    checkOut: '2024-09-25',
    revenue: 0,
    channel: 'Corporate',
    tasks: ['Invia voucher recupero', 'Proponi data alternativa'],
    timeline: [
      { label: 'Proposta iniziale', timestamp: '2024-07-13 10:45', type: 'info' },
      { label: 'Feedback negativo', timestamp: '2024-07-14 16:12', type: 'warning' },
      { label: 'Campagna riconquista', timestamp: '2024-07-20 09:05', type: 'info' },
    ],
  },
  {
    id: 'booking-104',
    clientId: 'client-4',
    title: 'Prenotazione #4 - Luigi Greco',
    status: 'proposta',
    checkIn: '2024-12-02',
    checkOut: '2024-12-04',
    revenue: 620,
    channel: 'Direct',
    tasks: ['Opzione vino in camera', 'Richiedi orario arrivo'],
    timeline: [
      { label: 'Proposta inviata', timestamp: '2024-09-30 08:21', type: 'info' },
      { label: 'WhatsApp di cortesia', timestamp: '2024-10-01 09:02', type: 'info' },
    ],
  },
  {
    id: 'booking-105',
    clientId: 'client-5',
    title: 'Prenotazione #5 - Mario Verdi',
    status: 'confermato',
    checkIn: '2024-12-28',
    checkOut: '2025-01-04',
    revenue: 2200,
    channel: 'Direct',
    tasks: ['Programma golf experience', 'Prenota transfer privato'],
    timeline: [
      { label: 'Opzione pacchetto capodanno', timestamp: '2024-09-18 19:20', type: 'info' },
      { label: 'Pagamento confermato', timestamp: '2024-09-19 10:08', type: 'success' },
    ],
  },
];

export function getBookingById(id: string): Booking | undefined {
  return bookings.find((booking) => booking.id === id);
}
