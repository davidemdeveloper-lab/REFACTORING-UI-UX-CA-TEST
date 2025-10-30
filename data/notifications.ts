import type { NotificationItem } from '@/types';

export const notifications: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'Comunicazione',
    title: 'Reminder upsell spa inviato',
    description: 'Inviata sequenza automatica su prenotazione #1 - Giovanni Greco',
    timestamp: '2024-09-29T09:45:00',
    read: false,
    priority: 'media',
  },
  {
    id: 'notif-2',
    category: 'Sistema',
    title: 'Device camera 302 offline',
    description: 'Sensore temperatura non raggiungibile da 15 minuti',
    timestamp: '2024-09-29T08:32:00',
    read: false,
    priority: 'alta',
  },
  {
    id: 'notif-3',
    category: 'Upsell',
    title: 'Nuova risposta a proposta golf experience',
    description: 'Mario Verdi ha visualizzato la proposta e richiesto dettagli',
    timestamp: '2024-09-28T20:17:00',
    read: true,
    priority: 'media',
  },
  {
    id: 'notif-4',
    category: 'Comunicazione',
    title: 'Template pre check-in approvato',
    description: 'Nuovo template multilingua pronto per l’invio automatico',
    timestamp: '2024-09-28T14:50:00',
    read: true,
    priority: 'bassa',
  },
];
