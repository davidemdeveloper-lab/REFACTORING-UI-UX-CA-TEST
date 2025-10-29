export type ClientStatus = 'confermato' | 'check-in' | 'in soggiorno' | 'check-out' | 'da confermare';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastStayDate: string;
  totalStays: number;
  newsletter: boolean;
  status: ClientStatus;
  roomPreference: string;
  notes?: string;
}

export interface Reservation {
  id: string;
  clientId: string;
  title: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: 'pre-arrivo' | 'in corso' | 'post-soggiorno';
  value: number;
  services: string[];
  communicationSteps: Array<{
    label: string;
    timestamp: string;
    completed: boolean;
  }>;
  iot: {
    temperature: number;
    minibar: number;
    airQuality: string;
    devices: Array<{
      name: string;
      status: 'on' | 'off' | 'standby';
    }>;
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'pre-stay' | 'during-stay' | 'post-stay';
  updatedAt: string;
  tags: string[];
}

export interface AnalyticsCard {
  id: string;
  title: string;
  value: string;
  trend: 'up' | 'down' | 'steady';
  change: string;
  description: string;
}

export const clients: Client[] = [
  {
    id: 'c1',
    name: 'Giovanni Greco',
    email: 'giovanni.greco@example.com',
    phone: '+39 349 1122334',
    lastStayDate: '2025-01-12',
    totalStays: 7,
    newsletter: true,
    status: 'confermato',
    roomPreference: 'Suite Panoramica',
    notes: 'Richiede sempre cuscini ipoallergenici.',
  },
  {
    id: 'c2',
    name: 'Antonio Marino',
    email: 'antonio.marino@example.com',
    phone: '+39 348 2211445',
    lastStayDate: '2025-02-02',
    totalStays: 5,
    newsletter: false,
    status: 'check-in',
    roomPreference: 'Junior Suite',
  },
  {
    id: 'c3',
    name: 'Francesca Gallo',
    email: 'francesca.gallo@example.com',
    phone: '+39 333 7766554',
    lastStayDate: '2025-02-22',
    totalStays: 2,
    newsletter: true,
    status: 'in soggiorno',
    roomPreference: 'Camera Deluxe',
  },
  {
    id: 'c4',
    name: 'Elena Marvè',
    email: 'elena.marve@example.com',
    phone: '+39 320 5534981',
    lastStayDate: '2024-12-27',
    totalStays: 9,
    newsletter: true,
    status: 'post-soggiorno',
    roomPreference: 'Suite Presidenziale',
  },
  {
    id: 'c5',
    name: 'Luigi Greco',
    email: 'luigi.greco@example.com',
    phone: '+39 347 9911223',
    lastStayDate: '2024-11-18',
    totalStays: 3,
    newsletter: false,
    status: 'da confermare',
    roomPreference: 'Camera Executive',
  },
];

export const reservations: Reservation[] = [
  {
    id: 'r1',
    clientId: 'c1',
    title: 'Prenotazione #1234',
    roomType: 'Suite Panoramica',
    checkIn: '2025-03-15',
    checkOut: '2025-03-20',
    status: 'pre-arrivo',
    value: 1280,
    services: ['Spa Experience', 'Transfer Aeroporto', 'Cena Degustazione'],
    communicationSteps: [
      { label: 'Richiesta Ricevuta', timestamp: '2025-02-01 09:30', completed: true },
      { label: 'Proposta Inviata', timestamp: '2025-02-01 10:05', completed: true },
      { label: 'Pagamento Ricevuto', timestamp: '2025-02-02 14:20', completed: true },
      { label: 'Email Pre Check-in', timestamp: '2025-03-12 08:00', completed: false },
      { label: 'Welcome Chat', timestamp: '-', completed: false },
    ],
    iot: {
      temperature: 22,
      minibar: 74,
      airQuality: 'Ottima',
      devices: [
        { name: 'Climatizzazione', status: 'standby' },
        { name: 'Illuminazione', status: 'off' },
        { name: 'Tende Smart', status: 'off' },
      ],
    },
  },
  {
    id: 'r2',
    clientId: 'c2',
    title: 'Prenotazione #1251',
    roomType: 'Junior Suite',
    checkIn: '2025-02-25',
    checkOut: '2025-03-02',
    status: 'in corso',
    value: 980,
    services: ['Percorso SPA', 'Tour Enogastronomico'],
    communicationSteps: [
      { label: 'Richiesta Ricevuta', timestamp: '2025-01-10 12:10', completed: true },
      { label: 'Proposta Inviata', timestamp: '2025-01-10 14:30', completed: true },
      { label: 'Pagamento Ricevuto', timestamp: '2025-01-12 16:40', completed: true },
      { label: 'Email Pre Check-in', timestamp: '2025-02-22 09:00', completed: true },
      { label: 'Welcome Chat', timestamp: '2025-02-25 18:15', completed: true },
    ],
    iot: {
      temperature: 21,
      minibar: 58,
      airQuality: 'Buona',
      devices: [
        { name: 'Climatizzazione', status: 'on' },
        { name: 'Illuminazione', status: 'on' },
        { name: 'Tende Smart', status: 'standby' },
      ],
    },
  },
  {
    id: 'r3',
    clientId: 'c3',
    title: 'Prenotazione #1302',
    roomType: 'Camera Deluxe',
    checkIn: '2025-03-04',
    checkOut: '2025-03-09',
    status: 'pre-arrivo',
    value: 760,
    services: ['Upgrade Vista Mare'],
    communicationSteps: [
      { label: 'Richiesta Ricevuta', timestamp: '2025-02-05 11:20', completed: true },
      { label: 'Proposta Inviata', timestamp: '2025-02-05 12:00', completed: true },
      { label: 'Pagamento Ricevuto', timestamp: '2025-02-06 15:00', completed: true },
      { label: 'Email Pre Check-in', timestamp: '2025-03-01 09:30', completed: false },
      { label: 'Welcome Chat', timestamp: '-', completed: false },
    ],
    iot: {
      temperature: 23,
      minibar: 52,
      airQuality: 'Ottima',
      devices: [
        { name: 'Climatizzazione', status: 'standby' },
        { name: 'Illuminazione', status: 'off' },
        { name: 'Tende Smart', status: 'off' },
      ],
    },
  },
];

export const templates: Template[] = [
  {
    id: 't1',
    name: 'Email Offerta Hotel',
    description: 'Proposta dinamica con suggerimenti AI e upsell servizi.',
    category: 'pre-stay',
    updatedAt: '2025-02-20',
    tags: ['AI', 'Upsell', 'Personalizzazione'],
  },
  {
    id: 't2',
    name: 'Email Conferma Prenotazione',
    description: 'Riepilogo completo soggiorno + link hub ospite.',
    category: 'pre-stay',
    updatedAt: '2025-02-18',
    tags: ['Automazione', 'Guest Journey'],
  },
  {
    id: 't3',
    name: 'Promemoria Check-in',
    description: 'Ricorda al cliente di completare il pre-check-in online.',
    category: 'pre-stay',
    updatedAt: '2025-02-12',
    tags: ['Workflow', 'Reminder'],
  },
  {
    id: 't4',
    name: 'Follow-up Post Soggiorno',
    description: 'Richiesta recensione e programma loyalty dedicato.',
    category: 'post-stay',
    updatedAt: '2025-02-05',
    tags: ['Feedback', 'Loyalty'],
  },
];

export const analyticsCards: AnalyticsCard[] = [
  {
    id: 'occupancy',
    title: 'Occupazione Media',
    value: '87%',
    trend: 'up',
    change: '+6% rispetto al mese scorso',
    description: 'Suite al completo nei weekend, junior suite +12% prenotazioni.',
  },
  {
    id: 'revenue',
    title: 'Fatturato Soggiorni',
    value: '€ 182K',
    trend: 'up',
    change: '+11% QoQ',
    description: 'Segmento business in crescita grazie a upsell sale meeting.',
  },
  {
    id: 'spa',
    title: 'Ricavi SPA & Servizi',
    value: '€ 46K',
    trend: 'steady',
    change: '+2% WoW',
    description: 'Percorso benessere signature e massaggi premium più richiesti.',
  },
  {
    id: 'ai',
    title: 'Conversazioni AI Gestite',
    value: '132',
    trend: 'up',
    change: '18 thread richiedono attenzione staff',
    description: 'Automazioni adattive: 94% soddisfazione cliente.',
  },
];

export const servicesHub = [
  {
    id: 'spa',
    name: 'SPA Integrata',
    description: 'Gestisci prenotazioni trattamenti e coordinamento staff benessere.',
    status: 'attivo',
    actionLabel: 'Apri SPA Hub',
  },
  {
    id: 'tripadvisor',
    name: 'TripAdvisor Insights',
    description: 'Monitora reputazione e rispondi velocemente alle recensioni.',
    status: 'attivo',
    actionLabel: 'Vai a TripAdvisor',
  },
  {
    id: 'madeep',
    name: 'MADEEP Wellness',
    description: 'Partner per esperienze benessere, invia richiesta di adesione.',
    status: 'non aderito',
    actionLabel: 'Invia email automatica',
  },
  {
    id: 'booking',
    name: 'Booking Chat',
    description: 'Sincronizza conversazioni e risposte automatiche con AI.',
    status: 'attivo',
    actionLabel: 'Apri chat Booking',
  },
];

export const chatThreads = [
  {
    id: 'thread-1',
    guest: 'Sara Conti',
    room: 'Junior Suite 402',
    lastMessagePreview: 'C’è possibilità di late check-out domenica?',
    status: 'in attesa',
    unread: 2,
    updatedAt: '09:24',
  },
  {
    id: 'thread-2',
    guest: 'Marco Ricci',
    room: 'Suite 701',
    lastMessagePreview: 'Grazie per l’upgrade, potete suggerire ristoranti?',
    status: 'gestito AI',
    unread: 0,
    updatedAt: '08:50',
  },
  {
    id: 'thread-3',
    guest: 'AI Assistente',
    room: 'Thread IA',
    lastMessagePreview: '3 richieste spa senza risposta negli ultimi 45 minuti.',
    status: 'alert',
    unread: 3,
    updatedAt: '10:05',
  },
];

export const chatMessages = {
  'thread-1': [
    {
      id: 'm1',
      from: 'guest',
      content: 'Buongiorno! C’è possibilità di late check-out domenica?',
      timestamp: '09:24',
    },
    {
      id: 'm2',
      from: 'ai',
      content:
        'Sto verificando la disponibilità con il front desk. Ti aggiorno a breve! Vuoi prenotare anche un transfer?',
      timestamp: '09:24',
    },
  ],
  'thread-2': [
    {
      id: 'm1',
      from: 'guest',
      content: 'Grazie per l’upgrade, potete suggerire ristoranti?',
      timestamp: '08:48',
    },
    {
      id: 'm2',
      from: 'ai',
      content: 'Ecco tre proposte selezionate vicino all’hotel con menu degustazione.',
      timestamp: '08:50',
    },
    {
      id: 'm3',
      from: 'staff',
      content: 'Confermo disponibilità per il ristorante Aurora alle 20:30.',
      timestamp: '09:10',
    },
  ],
  'thread-3': [
    {
      id: 'm1',
      from: 'ai',
      content: 'Alert: 3 richieste SPA in attesa da oltre 45 minuti.',
      timestamp: '10:05',
    },
    {
      id: 'm2',
      from: 'ai',
      content: 'Suggerimento: Invia risposta rapida con offerte pomeridiane.',
      timestamp: '10:05',
    },
  ],
} as const;

export type ChatMessage = (typeof chatMessages)[keyof typeof chatMessages][number];
