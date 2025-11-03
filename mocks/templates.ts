import { Template } from '@/types';

export const templatesMock: Template[] = [
  {
    id: 'template-1',
    name: 'Email Offerta Hotel',
    description:
      'Template per inviare proposte di soggiorno con pacchetti e tariffe multiple.',
    updatedAt: '2025-01-20T16:30:00Z',
    status: 'Attivo',
    category: 'Offerte',
    lastEditedBy: 'Davide Minutoli',
  },
  {
    id: 'template-2',
    name: 'Email Conferma Prenotazione',
    description:
      'Conferma prenotazione con riepilogo dati soggiorno e informazioni arrivo.',
    updatedAt: '2025-01-18T12:20:00Z',
    status: 'Attivo',
    category: 'Prenotazione',
    lastEditedBy: 'Marta Neri',
  },
  {
    id: 'template-3',
    name: 'Email Promemoria Check-in',
    description:
      'Promemoria automatico con dettagli arrivo, servizi utili e link al guest portal.',
    updatedAt: '2025-01-15T17:45:00Z',
    status: 'Bozza',
    category: 'Promemoria',
    lastEditedBy: 'Chiara Verdi',
  },
  {
    id: 'template-4',
    name: 'Email Post-Soggiorno',
    description:
      'Ringraziamento e richiesta recensione con suggerimenti per il prossimo soggiorno.',
    updatedAt: '2025-01-10T11:05:00Z',
    status: 'Attivo',
    category: 'Promemoria',
    lastEditedBy: 'Luca Bianchi',
  },
];

