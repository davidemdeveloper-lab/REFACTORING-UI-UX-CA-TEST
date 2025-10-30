export type AccentTone = 'aurora' | 'copper' | 'lagoon' | 'orchid';

export type AutomationStepStatus = 'completed' | 'running' | 'scheduled' | 'blocked';

export type AutomationStep = {
  id: string;
  label: string;
  channel: 'email' | 'whatsapp' | 'booking' | 'sms' | 'internal';
  status: AutomationStepStatus;
  scheduledAt?: string;
  executedAt?: string;
  aiDraft?: string;
  handoffReason?: string;
};

export type RoomIoTInsight = {
  room: string;
  temperature: number;
  humidity: number;
  minibarRestock: 'ok' | 'low' | 'empty';
  housekeepingStatus: 'ready' | 'in-progress' | 'attention';
  lightsOn: boolean;
  spaReady?: boolean;
  aromatherapy?: 'off' | 'relax' | 'energize';
};

export type Reservation = {
  id: string;
  code: string;
  clientId: string;
  channel: 'Direct' | 'Booking.com' | 'Website' | 'Phone';
  type: 'proposal' | 'instant' | 'manual';
  status: 'pending' | 'confirmed' | 'in-house' | 'checked-out' | 'cancelled';
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  roomType: string;
  total: number;
  currency: string;
  automations: AutomationStep[];
  iot: RoomIoTInsight;
  lastInteraction: string;
  aiHighlights: string[];
  addOns: string[];
  nextAction: string;
};

export type Client = {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  locale: string;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  newsletterOptIn: boolean;
  lastStay: string;
  upcomingReservationId?: string;
  totalStays: number;
  preferences: string[];
  vipNotes: string;
  tags: string[];
  lastFeedbackScore: number;
};

export type NewsletterSubscriber = {
  clientId: string;
  name: string;
  email: string;
  consentSource: 'CRM' | 'Guest Portal' | 'Front Desk' | 'Campaign';
  status: 'active' | 'paused';
  lastUpdate: string;
};

export type Template = {
  id: string;
  name: string;
  category: 'Proposta' | 'Check-in' | 'Pre-stay' | 'Upsell' | 'Post-stay';
  updatedAt: string;
  usage: number;
  mood: 'caldo' | 'professionale' | 'festivo';
  tags: string[];
  html: string;
  aiTips: string[];
};

export type ChatMessage = {
  id: string;
  author: 'guest' | 'host' | 'ai';
  channel: 'email' | 'whatsapp' | 'booking' | 'internal';
  timestamp: string;
  content: string;
  suggestions?: string[];
};

export type ChatThread = {
  id: string;
  reservationId?: string;
  clientId: string;
  subject: string;
  status: 'open' | 'snoozed' | 'resolved';
  unreadCount: number;
  channelMix: ('email' | 'whatsapp' | 'booking' | 'internal')[];
  messages: ChatMessage[];
  aiSummary: string;
};

export type AutomationInsight = {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  suggestion: string;
  status: 'scheduled' | 'running' | 'completed';
};

export const accentOptions: Record<AccentTone, { name: string; hex: string; highlight: string }> = {
  aurora: { name: 'Aurora Boreale', hex: '#4ac8ff', highlight: '#9df3ff' },
  copper: { name: 'Rame Satinato', hex: '#f08b5a', highlight: '#ffd0b4' },
  lagoon: { name: 'Laguna Profonda', hex: '#3fd1a0', highlight: '#98f3d3' },
  orchid: { name: 'Orchidea Notturna', hex: '#b980ff', highlight: '#e4c7ff' },
};

export const clients: Client[] = [
  {
    id: 'client-01',
    name: 'Giovanni Greco',
    email: 'giovanni.greco@example.com',
    phone: '+39 329 556 9021',
    locale: 'it-IT',
    loyaltyTier: 'Gold',
    newsletterOptIn: true,
    lastStay: '2025-01-28',
    upcomingReservationId: 'res-1024',
    totalStays: 6,
    preferences: ['Ama camere panoramiche', 'Colazione senza glutine', 'Spa serale 20:00'],
    vipNotes: 'Festeggia l’anniversario, chiede sempre cuscini memory e prosecco in camera.',
    tags: ['VIP', 'Anniversario', 'Spa Lover'],
    lastFeedbackScore: 9.6,
  },
  {
    id: 'client-02',
    name: 'Marta Leone',
    email: 'marta.leone@example.com',
    phone: '+39 340 888 1023',
    locale: 'it-IT',
    loyaltyTier: 'Platinum',
    newsletterOptIn: false,
    lastStay: '2024-12-15',
    totalStays: 11,
    preferences: ['Suite angolare', 'Cena degustazione vegan', 'Check-out posticipato'],
    vipNotes: 'Richiede welcome kit eco-friendly, preferisce comunicazioni via WhatsApp.',
    tags: ['Corporate', 'Long stay'],
    lastFeedbackScore: 9.1,
  },
  {
    id: 'client-03',
    name: 'Antonio Marino',
    email: 'antonio.marino@example.com',
    phone: '+39 333 452 9034',
    locale: 'it-IT',
    loyaltyTier: 'Silver',
    newsletterOptIn: true,
    lastStay: '2024-11-04',
    upcomingReservationId: 'res-2040',
    totalStays: 3,
    preferences: ['Camera silenziosa', 'Prenotazione taxi aeroporto', 'Ricorda allergia a nocciole'],
    vipNotes: 'Viaggia per lavoro, gradisce suggerimenti di ristoranti business-friendly.',
    tags: ['Smart working'],
    lastFeedbackScore: 8.8,
  },
  {
    id: 'client-04',
    name: 'Francesca Gallo',
    email: 'francesca.gallo@example.com',
    phone: '+39 392 441 5660',
    locale: 'it-IT',
    loyaltyTier: 'Gold',
    newsletterOptIn: true,
    lastStay: '2024-10-20',
    totalStays: 8,
    preferences: ['Family suite', 'Piscina riscaldata', 'Kids club ore 10:00'],
    vipNotes: 'Viaggia con bambini, apprezza guida attività locali.',
    tags: ['Famiglia'],
    lastFeedbackScore: 9.3,
  },
];

export const reservations: Reservation[] = [
  {
    id: 'res-1024',
    code: 'PN-1024',
    clientId: 'client-01',
    channel: 'Booking.com',
    type: 'proposal',
    status: 'pending',
    checkIn: '2025-02-14',
    checkOut: '2025-02-18',
    nights: 4,
    guests: 2,
    roomType: 'Suite Panoramica',
    total: 1480,
    currency: 'EUR',
    lastInteraction: '2025-01-30T09:40:00Z',
    nextAction: 'Attendi conferma pagamento digitale entro 24h',
    addOns: ['Pacchetto spa coppia', 'Cena degustazione', 'Cuscini memory'],
    aiHighlights: [
      'Suggerita email romantica con proposta upgrade Spa Deluxe.',
      'AI consiglia di offrire check-out alle 14:00 per anniversario.',
    ],
    automations: [
      {
        id: 'step-1',
        label: 'Invio proposta personalizzata',
        channel: 'email',
        status: 'completed',
        executedAt: '2025-01-28T10:12:00Z',
        aiDraft:
          'Gentile Giovanni, abbiamo preparato tre opzioni per rendere memorabile il vostro anniversario... ',
      },
      {
        id: 'step-2',
        label: 'Promemoria pagamento',
        channel: 'whatsapp',
        status: 'running',
        executedAt: '2025-01-30T09:32:00Z',
        aiDraft: 'Ciao Giovanni! Posso aiutarti a completare la conferma per la Suite Panoramica?',
      },
      {
        id: 'step-3',
        label: 'Preparazione camera',
        channel: 'internal',
        status: 'scheduled',
        scheduledAt: '2025-02-13T08:00:00Z',
      },
    ],
    iot: {
      room: 'Suite 802',
      temperature: 21.5,
      humidity: 46,
      minibarRestock: 'low',
      housekeepingStatus: 'attention',
      lightsOn: false,
      spaReady: true,
      aromatherapy: 'relax',
    },
  },
  {
    id: 'res-2040',
    code: 'PN-2040',
    clientId: 'client-03',
    channel: 'Direct',
    type: 'instant',
    status: 'confirmed',
    checkIn: '2025-03-02',
    checkOut: '2025-03-05',
    nights: 3,
    guests: 1,
    roomType: 'Camera Executive',
    total: 690,
    currency: 'EUR',
    lastInteraction: '2025-01-28T17:21:00Z',
    nextAction: 'Invia suggerimento ristoranti business entro 48h',
    addOns: ['Transfer aeroporto', 'Sala riunioni 2h'],
    aiHighlights: [
      'Workflow suggerisce follow-up per richiesta taxi con partenza alle 07:00.',
    ],
    automations: [
      {
        id: 'step-1',
        label: 'Conferma immediata',
        channel: 'email',
        status: 'completed',
        executedAt: '2025-01-24T11:00:00Z',
      },
      {
        id: 'step-2',
        label: 'Suggerimenti smart working',
        channel: 'email',
        status: 'scheduled',
        scheduledAt: '2025-02-25T08:00:00Z',
      },
      {
        id: 'step-3',
        label: 'Promemoria check-in online',
        channel: 'whatsapp',
        status: 'scheduled',
        scheduledAt: '2025-02-27T09:00:00Z',
      },
    ],
    iot: {
      room: 'Executive 410',
      temperature: 22.2,
      humidity: 40,
      minibarRestock: 'ok',
      housekeepingStatus: 'ready',
      lightsOn: true,
      aromatherapy: 'energize',
    },
  },
  {
    id: 'res-3011',
    code: 'PN-3011',
    clientId: 'client-04',
    channel: 'Website',
    type: 'manual',
    status: 'in-house',
    checkIn: '2025-01-30',
    checkOut: '2025-02-04',
    nights: 5,
    guests: 4,
    roomType: 'Family Spa Loft',
    total: 1350,
    currency: 'EUR',
    lastInteraction: '2025-01-30T07:45:00Z',
    nextAction: 'Confermare prenotazione kids club ore 10:00',
    addOns: ['Kids club pass', 'Menu bambini'],
    aiHighlights: [
      'Consigliare attività indoor in caso di pioggia.',
      'Suggerimento AI: inviare messaggio check-up serale personalizzato.',
    ],
    automations: [
      {
        id: 'step-1',
        label: 'Benvenuto in struttura',
        channel: 'whatsapp',
        status: 'completed',
        executedAt: '2025-01-30T11:12:00Z',
      },
      {
        id: 'step-2',
        label: 'Upsell spa family',
        channel: 'email',
        status: 'running',
        executedAt: '2025-01-31T08:05:00Z',
        aiDraft: 'Ciao Francesca! Oggi dalle 17 abbiamo la spa riservata per famiglie... ',
      },
      {
        id: 'step-3',
        label: 'Post stay feedback',
        channel: 'email',
        status: 'scheduled',
        scheduledAt: '2025-02-04T18:00:00Z',
      },
    ],
    iot: {
      room: 'Loft 1202',
      temperature: 23.1,
      humidity: 44,
      minibarRestock: 'low',
      housekeepingStatus: 'in-progress',
      lightsOn: true,
      spaReady: false,
    },
  },
];

export const newsletterSubscribers: NewsletterSubscriber[] = clients.map((client) => ({
  clientId: client.id,
  name: client.name,
  email: client.email,
  consentSource: client.newsletterOptIn ? 'Guest Portal' : 'Front Desk',
  status: client.newsletterOptIn ? 'active' : 'paused',
  lastUpdate: '2025-01-25',
}));

export const templates: Template[] = [
  {
    id: 'template-01',
    name: 'Email Offerta Romantica',
    category: 'Proposta',
    updatedAt: '2025-01-20',
    usage: 48,
    mood: 'caldo',
    tags: ['Anniversario', 'Upsell Spa'],
    aiTips: [
      'Personalizza sempre il saluto con il motivo del viaggio.',
      'Suggerisci un extra firmato (es. brunch in terrazza).',
    ],
    html: `<h1>Rendiamo speciale il vostro anniversario</h1>
<p>Ciao {{nome}},</p>
<p>Abbiamo creato tre proposte dedicate a voi con spa privata, degustazione e colazione panoramica. L\'offerta è valida fino al {{data_scadenza}}.</p>
<ul>
  <li>Suite Panoramica con Idromassaggio</li>
  <li>Pacchetto Benessere con aromaterapia</li>
  <li>Late checkout 14:00 incluso</li>
</ul>
<p>Prenota con un click e preparati a un soggiorno memorabile.</p>`,
  },
  {
    id: 'template-02',
    name: 'Promemoria Check-in Online',
    category: 'Pre-stay',
    updatedAt: '2025-01-18',
    usage: 132,
    mood: 'professionale',
    tags: ['Check-in', 'Automazioni'],
    aiTips: ['Evidenzia il vantaggio: zero attese alla reception.'],
    html: `<h1>Completa il check-in digitale</h1>
<p>Ciao {{nome}},</p>
<p>manca poco al tuo arrivo! Ti basta un minuto per confermare i dati e scegliere l\'orario di arrivo.</p>`,
  },
  {
    id: 'template-03',
    name: 'Feedback Post soggiorno',
    category: 'Post-stay',
    updatedAt: '2025-01-02',
    usage: 87,
    mood: 'professionale',
    tags: ['Feedback', 'Loyalty'],
    aiTips: [
      'Invia entro 24 ore dalla partenza.',
      'Offri un piccolo incentivo per la prossima prenotazione.',
    ],
    html: `<h1>Com'è andata?</h1>
<p>Ciao {{nome}},</p>
<p>Speriamo che il soggiorno sia stato impeccabile. Raccontaci l\'esperienza e aiutaci a sorprendere ancora di più i nostri ospiti.</p>`,
  },
];

export const chatThreads: ChatThread[] = [
  {
    id: 'thread-01',
    reservationId: 'res-1024',
    clientId: 'client-01',
    subject: 'Richiesta upgrade anniversario',
    status: 'open',
    unreadCount: 2,
    channelMix: ['email', 'whatsapp'],
    aiSummary:
      'L\'ospite desidera aggiungere un massaggio di coppia e chiede dettagli sul late check-out. L\'AI suggerisce risposta empatica con proposta pacchetto Romance Plus.',
    messages: [
      {
        id: 'msg-1',
        author: 'guest',
        channel: 'whatsapp',
        timestamp: '2025-01-29T08:40:00Z',
        content: 'Ciao! Possiamo aggiungere un massaggio di coppia al pacchetto? Avete disponibilità il 15 sera?',
      },
      {
        id: 'msg-2',
        author: 'ai',
        channel: 'internal',
        timestamp: '2025-01-29T08:41:00Z',
        content:
          'Proposta AI: "Ciao Giovanni, possiamo riservarti un massaggio di coppia alle 18:30. Vuoi includere anche prosecco in camera?"',
        suggestions: [
          'Offri upgrade Romance Plus con 10% di sconto.',
          'Suggerisci check-out alle 14:00 come cortesia.',
        ],
      },
      {
        id: 'msg-3',
        author: 'host',
        channel: 'email',
        timestamp: '2025-01-29T09:05:00Z',
        content:
          'Ciao Giovanni, siamo felici di riservarti il massaggio di coppia alle 18:30. Ti confermo anche il late check-out alle 14:00 senza costi aggiuntivi.',
      },
    ],
  },
  {
    id: 'thread-02',
    reservationId: 'res-2040',
    clientId: 'client-03',
    subject: 'Richiesta fattura elettronica',
    status: 'snoozed',
    unreadCount: 0,
    channelMix: ['email'],
    aiSummary:
      'Antonio richiede fattura elettronica intestata all\'azienda. AI ha preparato bozza con campi già compilati.',
    messages: [
      {
        id: 'msg-4',
        author: 'guest',
        channel: 'email',
        timestamp: '2025-01-27T10:00:00Z',
        content: 'Buongiorno, potete inviarmi la fattura elettronica intestata a Marino Consulting?',
      },
      {
        id: 'msg-5',
        author: 'ai',
        channel: 'internal',
        timestamp: '2025-01-27T10:02:00Z',
        content:
          'Bozza AI pronta: "Buongiorno Antonio, allego la fattura elettronica intestata a Marino Consulting. Fammi sapere se i dati sono corretti."',
      },
      {
        id: 'msg-6',
        author: 'host',
        channel: 'email',
        timestamp: '2025-01-27T10:10:00Z',
        content: 'Buongiorno Antonio, trovi in allegato la fattura richiesta. Rimango a disposizione.',
      },
    ],
  },
];

export const automationInsights: AutomationInsight[] = [
  {
    id: 'insight-01',
    title: 'Ottimizza i tempi di risposta',
    description:
      'Il 32% delle conversazioni WhatsApp riceve risposta manuale oltre i 7 minuti. L\'AI può anticipare una bozza entro 30 secondi.',
    impact: 'high',
    suggestion: 'Attiva auto-suggest per tutti i messaggi WhatsApp serali.',
    status: 'running',
  },
  {
    id: 'insight-02',
    title: 'Upsell Spa Famiglie',
    description:
      'Le famiglie con bambini 6-12 anni convertono il 24% in più con l\'offerta Kids Spa Experience.',
    impact: 'medium',
    suggestion: 'Programma invio automatico il giorno prima del check-in.',
    status: 'scheduled',
  },
  {
    id: 'insight-03',
    title: 'Prevedi richieste late check-out',
    description:
      'Ospiti con volo dopo le 18 richiedono il late check-out nel 62% dei casi.',
    impact: 'high',
    suggestion: 'Mostra proposta proattiva nell\'app Guest Portal.',
    status: 'completed',
  },
];

export const getClientById = (clientId: string) =>
  clients.find((client) => client.id === clientId);

export const getReservationById = (reservationId: string) =>
  reservations.find((reservation) => reservation.id === reservationId);

export const getReservationsForClient = (clientId: string) =>
  reservations.filter((reservation) => reservation.clientId === clientId);

export const getThreadsForClient = (clientId: string) =>
  chatThreads.filter((thread) => thread.clientId === clientId);

export const getTemplateById = (templateId: string) =>
  templates.find((template) => template.id === templateId);

export const formatCurrency = (value: number, currency = 'EUR') =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(value);
