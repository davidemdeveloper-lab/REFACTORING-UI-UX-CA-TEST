import type { NotificationItem } from '@/types';

export const notifications: NotificationItem[] = [
  {
    id: 'notif-001',
    title: 'Richiesta late check-out confermata',
    description: 'Suite 1702 · Giovanni Greco · checkout esteso alle 14:00 registrato nel PMS.',
    timestamp: '2025-01-22T21:16:00Z',
    category: 'success',
    isRead: false,
    assignee: 'Davide Minerva',
  },
  {
    id: 'notif-002',
    title: 'Documento identità mancante',
    description: 'Prenotazione #2 · Antonio Marino · automatizza recall entro 6 ore.',
    timestamp: '2025-01-21T08:40:00Z',
    category: 'alert',
    isRead: false,
    assignee: 'Team Reception',
  },
  {
    id: 'notif-003',
    title: 'Nuovo feedback su template',
    description: 'Elisa Conti ha lasciato un commento sul template “Email Offerta Hotel”.',
    timestamp: '2025-01-20T15:10:00Z',
    category: 'idea',
    isRead: true,
    assignee: 'Marketing',
  },
  {
    id: 'notif-004',
    title: 'Sensore porta balcone aperta',
    description: 'Camera 802 · aperta da 18 minuti. Invia promemoria al guest se persiste.',
    timestamp: '2025-01-19T18:22:00Z',
    category: 'task',
    isRead: false,
    assignee: 'Housekeeping',
  },
  {
    id: 'notif-005',
    title: 'Pagamento non riuscito',
    description: 'Prenotazione #4 · Luigi Greco · la carta è stata rifiutata due volte.',
    timestamp: '2025-01-17T18:05:00Z',
    category: 'alert',
    isRead: true,
    assignee: 'Team Sales',
  },
];
