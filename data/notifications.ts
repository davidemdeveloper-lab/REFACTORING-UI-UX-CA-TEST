import { NotificationItem } from '@/types';

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Pagamento ricevuto',
    description: 'Prenotazione #1 · Carta corporate verificata',
    time: '5 minuti fa',
    category: 'pagamento',
    read: false,
    action: 'Apri timeline',
  },
  {
    id: 'n2',
    title: 'Nuovo lead dal sito',
    description: 'Richiesta soggiorno famiglia · Agosto 2025',
    time: '12 minuti fa',
    category: 'guest',
    read: false,
    action: 'Genera proposta',
  },
  {
    id: 'n3',
    title: 'Scenario IoT in warning',
    description: 'Suite 502 · Termostato non risponde da 15 minuti',
    time: '25 minuti fa',
    category: 'manutenzione',
    read: true,
    action: 'Apri pannello IoT',
  },
  {
    id: 'n4',
    title: 'Automazione aggiornata',
    description: 'Sequenza pre-check-in · Nuovo step SMS multilingua',
    time: '1 ora fa',
    category: 'automazione',
    read: true,
  },
];
