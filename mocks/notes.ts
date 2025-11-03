import { Note } from '@/types';

export const notesMock: Note[] = [
  {
    id: 'note-1',
    preset: 'Turno',
    title: 'Aggiornamento turno mattina',
    content:
      'Ricordare chiamata con la signora Rinaldi alle 10:30 per confermare late checkout.',
    createdAt: '2025-10-28T07:15:00Z',
    createdBy: 'Chiara (Reception)',
    target: 'Dashboard',
    status: 'In corso',
    tags: ['Problema aperto'],
  },
  {
    id: 'note-2',
    preset: 'Manutenzione',
    title: 'Controllo climatizzazione camera 305',
    content:
      'Il cliente segnala temperatura ballerina, verificare sensore e filtro aria.',
    createdAt: '2025-10-27T18:40:00Z',
    createdBy: 'Luca (Tecnico)',
    target: 'Booking',
    targetId: 'booking-2',
    status: 'Aperto',
    tags: ['Problema aperto', 'IoT'],
  },
  {
    id: 'note-3',
    preset: 'Oggetto smarrito',
    title: 'Portafoglio ritrovato',
    content:
      'Portafoglio nero trovato in sala colazioni, custodito in cassaforte.',
    createdAt: '2025-10-28T06:50:00Z',
    createdBy: 'Davide (Concierge)',
    target: 'Customer',
    targetId: 'customer-5',
    status: 'In corso',
    tags: [],
  },
  {
    id: 'note-4',
    preset: 'Richiesta cliente',
    title: 'Intolleranza al lattosio',
    content:
      'Preparare opzioni breakfast senza lattosio per famiglia Gallo, arrivo oggi.',
    createdAt: '2025-10-28T08:05:00Z',
    createdBy: 'Marta (Reception)',
    target: 'Customer',
    targetId: 'customer-2',
    status: 'Aperto',
    tags: ['Allergie'],
  },
  {
    id: 'note-5',
    preset: 'Turno',
    title: 'Brief pomeridiano',
    content:
      'Clienti VIP in arrivo ore 17:00 (famiglia Marino). Preparare welcome kit.',
    createdAt: '2025-10-28T12:10:00Z',
    createdBy: 'Chiara (Reception)',
    target: 'Dashboard',
    status: 'Aperto',
    tags: ['VIP'],
  },
];

