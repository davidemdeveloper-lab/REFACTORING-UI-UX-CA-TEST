import { formatDate } from './utils';

export type Channel = 'email' | 'whatsapp' | 'sms' | 'booking';
export type WorkflowStatus = 'completato' | 'in_corso' | 'programmato' | 'bloccato';

export interface WorkflowStep {
  id: string;
  titolo: string;
  descrizione: string;
  status: WorkflowStatus;
  channel: Channel;
  scheduledAt: string;
  completedAt?: string;
  aiConfidence?: number;
  guardrailReason?: string;
}

export interface ReservationTask {
  id: string;
  label: string;
  dueAt: string;
  owner: string;
  status: 'da_fare' | 'in_lavorazione' | 'completato';
}

export interface Reservation {
  id: string;
  codice: string;
  guestId: string;
  guestName: string;
  channel: 'Direct' | 'Booking.com' | 'Airbnb' | 'OTA';
  arrival: string;
  departure: string;
  nights: number;
  people: number;
  roomType: string;
  mealPlan: string;
  amount: number;
  status: 'Richiesta' | 'Confermata' | 'In Soggiorno' | 'Check-out' | 'Annullata';
  aiConfidence: number;
  tags: string[];
  nextAction: string;
  timeline: WorkflowStep[];
  tasks: ReservationTask[];
  iotSnapshot: {
    temperature: number;
    humidity: number;
    airQuality: number;
    minibar: number;
    lights: 'On' | 'Off';
    cleaning: 'Completata' | 'Da Pianificare';
  };
  externalLinks: { label: string; url: string }[];
}

export interface ClientPreference {
  icon: string;
  label: string;
  value: string;
}

export interface ClientNote {
  id: string;
  createdAt: string;
  author: string;
  content: string;
  tone: 'positivo' | 'neutro' | 'attenzione';
}

export interface ClientProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  newsletter: boolean;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold';
  avatarColor: string;
  totalRevenue: number;
  staysCount: number;
  upcomingReservationId?: string;
  preferences: ClientPreference[];
  notes: ClientNote[];
}

export interface NewsletterSubscriber {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  status: 'attivo' | 'pausato';
  lastCampaign?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'Proposta' | 'Pre-stay' | 'Post-stay' | 'Upselling';
  updatedAt: string;
  owner: string;
  performance: number;
}

export interface ChatMessage {
  id: string;
  author: 'ospite' | 'hotel' | 'assistant';
  channel: Channel;
  timestamp: string;
  content: string;
  sentiment?: 'positivo' | 'neutro' | 'negativo';
  aiSuggested?: boolean;
}

export interface ChatThread {
  id: string;
  subject: string;
  guestName: string;
  guestId: string;
  source: Channel;
  status: 'aperto' | 'in_attesa' | 'chiuso';
  priority: 'alta' | 'media' | 'bassa';
  lastMessageAt: string;
  messages: ChatMessage[];
  aiSuggestions: string[];
}

export interface WorkflowBlueprint {
  id: string;
  name: string;
  conversion: number;
  avgTime: string;
  steps: { name: string; delay: string; channel: Channel }[];
}

export interface IoTWidget {
  id: string;
  room: string;
  metric: string;
  value: number | string;
  unit?: string;
  status: 'ok' | 'warning' | 'critical';
  trend?: number;
}

export const reservations: Reservation[] = [
  {
    id: 'res-1',
    codice: 'CA-2025-0915',
    guestId: 'cli-1',
    guestName: 'Giovanni Greco',
    channel: 'Direct',
    arrival: '2025-03-24T16:00:00',
    departure: '2025-03-28T10:00:00',
    nights: 4,
    people: 2,
    roomType: 'Suite Aurora',
    mealPlan: 'Colazione & Spa',
    amount: 1450,
    status: 'Confermata',
    aiConfidence: 0.92,
    tags: ['VIP', 'Anniversario'],
    nextAction: 'Conferma percorso SPA e welcome kit',
    timeline: [
      {
        id: 'wf-1',
        titolo: 'Invio proposta personalizzata',
        descrizione: 'Email con tre proposte di camere e upsell spa',
        status: 'completato',
        channel: 'email',
        scheduledAt: '2025-02-10T10:00:00',
        completedAt: '2025-02-10T10:03:00',
        aiConfidence: 0.88,
      },
      {
        id: 'wf-2',
        titolo: 'Promemoria accettazione',
        descrizione: 'WhatsApp con riepilogo offerta e link pagamento',
        status: 'completato',
        channel: 'whatsapp',
        scheduledAt: '2025-02-11T09:00:00',
        completedAt: '2025-02-11T09:01:00',
        aiConfidence: 0.86,
      },
      {
        id: 'wf-3',
        titolo: 'Richiesta dati check-in online',
        descrizione: 'Modulo dati ospiti e orario di arrivo',
        status: 'in_corso',
        channel: 'email',
        scheduledAt: '2025-03-20T12:00:00',
        aiConfidence: 0.73,
      },
      {
        id: 'wf-4',
        titolo: 'Suggerimenti personalizzati di soggiorno',
        descrizione: 'AI concierge propone esperienze locali',
        status: 'programmato',
        channel: 'whatsapp',
        scheduledAt: '2025-03-24T09:00:00',
      },
    ],
    tasks: [
      {
        id: 'task-1',
        label: 'Preparare welcome kit anniversario',
        dueAt: '2025-03-23T18:00:00',
        owner: 'Francesca',
        status: 'in_lavorazione',
      },
      {
        id: 'task-2',
        label: 'Coordinare transfer privato',
        dueAt: '2025-03-24T13:00:00',
        owner: 'Marco',
        status: 'da_fare',
      },
    ],
    iotSnapshot: {
      temperature: 21.5,
      humidity: 46,
      airQuality: 94,
      minibar: 75,
      lights: 'Off',
      cleaning: 'Completata',
    },
    externalLinks: [
      { label: 'Prenotazione Booking.com', url: 'https://admin.booking.com/reservation/CA-2025-0915' },
      { label: 'Cartella cliente', url: 'https://customer-automator.app/clients/cli-1' },
    ],
  },
  {
    id: 'res-2',
    codice: 'CA-2025-1042',
    guestId: 'cli-4',
    guestName: 'Antonio Marino',
    channel: 'Booking.com',
    arrival: '2025-04-02T16:00:00',
    departure: '2025-04-05T10:00:00',
    nights: 3,
    people: 1,
    roomType: 'Camera Deluxe Vista Mare',
    mealPlan: 'Colazione inclusa',
    amount: 860,
    status: 'Richiesta',
    aiConfidence: 0.68,
    tags: ['Feedback negativo 2024'],
    nextAction: 'Confermare upgrade vista mare e check-in anticipato',
    timeline: [
      {
        id: 'wf-5',
        titolo: 'Import prenotazione Booking',
        descrizione: 'Sincronizzazione automatica e riconciliazione dati',
        status: 'completato',
        channel: 'booking',
        scheduledAt: '2025-02-18T08:00:00',
        completedAt: '2025-02-18T08:00:00',
      },
      {
        id: 'wf-6',
        titolo: 'AI Review Recovery',
        descrizione: 'Proposta di benefit per migliorare recensione',
        status: 'in_corso',
        channel: 'email',
        scheduledAt: '2025-03-28T18:00:00',
        aiConfidence: 0.61,
        guardrailReason: 'Richiesta conferma del direttore',
      },
      {
        id: 'wf-7',
        titolo: 'Conversazione manuale receptionist',
        descrizione: 'Suggerimento risposta personalizzata',
        status: 'programmato',
        channel: 'whatsapp',
        scheduledAt: '2025-04-02T12:00:00',
      },
    ],
    tasks: [
      {
        id: 'task-3',
        label: 'Verificare disponibilità upgrade',
        dueAt: '2025-03-20T12:00:00',
        owner: 'Sara',
        status: 'da_fare',
      },
    ],
    iotSnapshot: {
      temperature: 20.1,
      humidity: 52,
      airQuality: 89,
      minibar: 20,
      lights: 'On',
      cleaning: 'Da Pianificare',
    },
    externalLinks: [
      { label: 'Dettaglio Booking', url: 'https://admin.booking.com/reservation/CA-2025-1042' },
    ],
  },
];

export const clients: ClientProfile[] = [
  {
    id: 'cli-1',
    fullName: 'Giovanni Greco',
    email: 'giovanni.greco@example.com',
    phone: '+39 320 223 1101',
    country: 'Italia',
    newsletter: true,
    loyaltyTier: 'Gold',
    avatarColor: 'from-primary-400 to-primary-600',
    totalRevenue: 8920,
    staysCount: 7,
    upcomingReservationId: 'res-1',
    preferences: [
      { icon: 'sparkles', label: 'Occasioni speciali', value: 'Anniversario ogni marzo' },
      { icon: 'cup-soda', label: 'Drink preferito', value: 'Champagne rosé e frutta fresca' },
      { icon: 'spa', label: 'Spa', value: 'Ama trattamenti di coppia il giorno 2' },
    ],
    notes: [
      {
        id: 'note-1',
        createdAt: formatDate('2024-12-01'),
        author: 'Chiara',
        content: 'Ha apprezzato il set up romantico, richiede musica jazz al check-in.',
        tone: 'positivo',
      },
      {
        id: 'note-2',
        createdAt: formatDate('2024-07-12'),
        author: 'Direzione',
        content: 'Preferisce comunicazioni via WhatsApp, evitare chiamate dopo le 19.',
        tone: 'neutro',
      },
    ],
  },
  {
    id: 'cli-2',
    fullName: 'Maria Verdi',
    email: 'maria.verdi@example.com',
    phone: '+39 392 889 0045',
    country: 'Italia',
    newsletter: false,
    loyaltyTier: 'Silver',
    avatarColor: 'from-emerald-400 to-emerald-600',
    totalRevenue: 4580,
    staysCount: 4,
    preferences: [
      { icon: 'leaf', label: 'Sostenibilità', value: 'Chiede cambio asciugamani solo su richiesta' },
      { icon: 'utensils', label: 'Ristorazione', value: 'Menu vegano e senza glutine' },
    ],
    notes: [
      {
        id: 'note-3',
        createdAt: formatDate('2024-05-22'),
        author: 'Luca',
        content: 'Ha lasciato ottima recensione dopo soggiorno con famiglia.',
        tone: 'positivo',
      },
    ],
  },
  {
    id: 'cli-3',
    fullName: 'Francesco Gallo',
    email: 'francesco.gallo@example.com',
    phone: '+39 310 552 7780',
    country: 'Svizzera',
    newsletter: true,
    loyaltyTier: 'Bronze',
    avatarColor: 'from-purple-400 to-purple-600',
    totalRevenue: 2380,
    staysCount: 2,
    preferences: [
      { icon: 'book-open', label: 'Tempo libero', value: 'Gradisce sala lettura riservata' },
    ],
    notes: [
      {
        id: 'note-4',
        createdAt: formatDate('2023-11-02'),
        author: 'Reception',
        content: 'Attenzione al late checkout: richiede sempre conferma scritta.',
        tone: 'attenzione',
      },
    ],
  },
  {
    id: 'cli-4',
    fullName: 'Antonio Marino',
    email: 'antonio.marino@example.com',
    phone: '+39 355 662 3310',
    country: 'Italia',
    newsletter: true,
    loyaltyTier: 'Silver',
    avatarColor: 'from-sky-400 to-sky-600',
    totalRevenue: 3780,
    staysCount: 3,
    notes: [
      {
        id: 'note-5',
        createdAt: formatDate('2024-08-18'),
        author: 'Marketing',
        content: 'Campagna di recupero recensione in corso, preferisce comunicazioni email.',
        tone: 'neutro',
      },
    ],
    preferences: [
      { icon: 'concierge-bell', label: 'Servizio', value: 'Ama check-in veloce e digitale' },
    ],
  },
];

export const newsletterSubscribers: NewsletterSubscriber[] = clients.map((client) => ({
  id: client.id,
  name: client.fullName,
  email: client.email,
  joinedAt: formatDate('2023-01-12'),
  status: client.newsletter ? 'attivo' : 'pausato',
  lastCampaign: client.newsletter ? 'Winter Retreat 2024' : undefined,
}));

export const templates: Template[] = [
  {
    id: 'tmpl-1',
    name: 'Email Offerta Hotel',
    description: 'Proposta dinamica con tre pacchetti e suggerimenti AI per upsell.',
    category: 'Proposta',
    updatedAt: formatDate('2025-02-16'),
    owner: 'Marketing',
    performance: 68,
  },
  {
    id: 'tmpl-2',
    name: 'Email Conferma Prenotazione',
    description: 'Conferma con link al portale ospite, FAQ e suggerimenti locali.',
    category: 'Pre-stay',
    updatedAt: formatDate('2025-02-10'),
    owner: 'Automazioni',
    performance: 84,
  },
  {
    id: 'tmpl-3',
    name: 'Email Promemoria Check-in',
    description: 'Promemoria con orari personalizzati e richieste di arrivo.',
    category: 'Pre-stay',
    updatedAt: formatDate('2025-01-28'),
    owner: 'Reception',
    performance: 72,
  },
  {
    id: 'tmpl-4',
    name: 'Upsell Esperienze Spa',
    description: 'Template modulare per promuovere pacchetti spa durante il soggiorno.',
    category: 'Upselling',
    updatedAt: formatDate('2024-12-05'),
    owner: 'Wellness',
    performance: 63,
  },
];

export const chatThreads: ChatThread[] = [
  {
    id: 'chat-1',
    subject: 'Richiesta upgrade suite',
    guestName: 'Giovanni Greco',
    guestId: 'cli-1',
    source: 'whatsapp',
    status: 'aperto',
    priority: 'alta',
    lastMessageAt: '2025-02-18T12:14:00',
    messages: [
      {
        id: 'msg-1',
        author: 'ospite',
        channel: 'whatsapp',
        timestamp: '2025-02-18T12:02:00',
        content: 'Ciao! Possiamo avere un welcome romantico con petali in camera?',
        sentiment: 'positivo',
      },
      {
        id: 'msg-2',
        author: 'assistant',
        channel: 'whatsapp',
        timestamp: '2025-02-18T12:03:00',
        content: 'Posso proporre un set romantico con petali, champagne e playlist personalizzata. Confermo?',
        aiSuggested: true,
      },
      {
        id: 'msg-3',
        author: 'hotel',
        channel: 'whatsapp',
        timestamp: '2025-02-18T12:05:00',
        content: 'Assolutamente sì! Posso aggiungere anche un massaggio di coppia a tariffa dedicata.',
      },
    ],
    aiSuggestions: [
      'Conferma kit romantico con upgrade gratuito della colazione in camera.',
      'Proponi massaggio di coppia alle 19:00 con 10% di sconto.',
      'Invia link portale ospite per personalizzare la playlist in camera.',
    ],
  },
  {
    id: 'chat-2',
    subject: 'Richiesta late checkout',
    guestName: 'Maria Verdi',
    guestId: 'cli-2',
    source: 'email',
    status: 'in_attesa',
    priority: 'media',
    lastMessageAt: '2025-02-17T19:30:00',
    messages: [
      {
        id: 'msg-4',
        author: 'ospite',
        channel: 'email',
        timestamp: '2025-02-17T18:55:00',
        content: 'Buonasera, posso effettuare il checkout alle 14:00? Ho il volo tardi.',
      },
      {
        id: 'msg-5',
        author: 'assistant',
        channel: 'email',
        timestamp: '2025-02-17T19:00:00',
        content: 'Suggerimento AI: confermare late checkout fino alle 13:30 con supplemento di 35€.',
        aiSuggested: true,
      },
    ],
    aiSuggestions: [
      'Offri il late checkout alle 14:00 con supplemento e includi deposito bagagli.',
      'Proponi alternativa lounge e transfer verso aeroporto con partner.',
    ],
  },
  {
    id: 'chat-3',
    subject: 'Messaggio portale Booking.com',
    guestName: 'Antonio Marino',
    guestId: 'cli-4',
    source: 'booking',
    status: 'chiuso',
    priority: 'bassa',
    lastMessageAt: '2025-02-12T09:20:00',
    messages: [
      {
        id: 'msg-6',
        author: 'ospite',
        channel: 'booking',
        timestamp: '2025-02-12T09:00:00',
        content: 'È disponibile il parcheggio coperto? Grazie.',
      },
      {
        id: 'msg-7',
        author: 'assistant',
        channel: 'booking',
        timestamp: '2025-02-12T09:01:00',
        content: 'Abbiamo parcheggio coperto incluso nella tariffa. Vuoi prenotare un posto riservato?',
        aiSuggested: true,
      },
      {
        id: 'msg-8',
        author: 'ospite',
        channel: 'booking',
        timestamp: '2025-02-12T09:18:00',
        content: 'Perfetto, prenotatelo pure. Arrivo alle 19:30.',
        sentiment: 'positivo',
      },
    ],
    aiSuggestions: [
      'Invia promemoria automatico parcheggio 2h prima dell\'arrivo.',
    ],
  },
];

export const workflowBlueprints: WorkflowBlueprint[] = [
  {
    id: 'flow-1',
    name: 'Percorso romantico 4 notti',
    conversion: 82,
    avgTime: '36h',
    steps: [
      { name: 'Proposta dinamica camere', delay: '0h', channel: 'email' },
      { name: 'Promemoria WhatsApp', delay: '6h', channel: 'whatsapp' },
      { name: 'Suggerimento AI spa', delay: '24h', channel: 'email' },
      { name: 'Check-in digitale', delay: '48h', channel: 'email' },
    ],
  },
  {
    id: 'flow-2',
    name: 'Business traveller express',
    conversion: 64,
    avgTime: '4h',
    steps: [
      { name: 'Proposta camera deluxe', delay: '0h', channel: 'email' },
      { name: 'AI draft risposta meeting', delay: '30min', channel: 'email' },
      { name: 'SMS arrivo e transfer', delay: '2h', channel: 'sms' },
    ],
  },
];

export const iotWidgets: IoTWidget[] = [
  {
    id: 'iot-1',
    room: 'Suite Aurora',
    metric: 'Temperatura',
    value: 21.5,
    unit: '°C',
    status: 'ok',
    trend: 0.4,
  },
  {
    id: 'iot-2',
    room: 'Camera Deluxe 508',
    metric: 'Minibar',
    value: 28,
    unit: '%',
    status: 'warning',
    trend: -12,
  },
  {
    id: 'iot-3',
    room: 'Suite Aurora',
    metric: 'Qualità aria',
    value: 94,
    unit: 'AQI',
    status: 'ok',
    trend: 3,
  },
  {
    id: 'iot-4',
    room: 'Camera Deluxe 508',
    metric: 'Occupazione',
    value: 'In camera',
    status: 'ok',
  },
];

export const guestPortalModules = [
  {
    title: 'Il tuo soggiorno',
    description: 'Riepilogo prenotazione, check-in digitale, upgrade disponibili e chat con concierge virtuale.',
  },
  {
    title: 'Esperienze e servizi',
    description: 'Prenota ristorante, spa, transfer e attività locali con conferma in tempo reale.',
  },
  {
    title: 'Assistente personale',
    description: 'Chat AI disponibile H24, suggerimenti personalizzati e notifiche su misura.',
  },
  {
    title: 'Casa connessa',
    description: 'Controlla luci, clima, cromoterapia e intrattenimento direttamente dal tuo dispositivo.',
  },
];

