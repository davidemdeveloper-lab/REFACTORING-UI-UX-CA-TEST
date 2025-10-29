export type TimelineEvent = {
  id: string;
  label: string;
  timestamp: string;
  completed: boolean;
  template?: string;
  channel: 'email' | 'sms' | 'whatsapp' | 'ai';
};

export type Client = {
  id: string;
  name: string;
  avatarInitials: string;
  email: string;
  phone: string;
  vip: boolean;
  loyaltyLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  lastStay: string;
  nextStay: string | null;
  staysCount: number;
  newsletter: boolean;
  roomPreference: string;
  notes: string;
  temperature: number;
  minibar: number;
  automationLevel: 'manuale' | 'assistito' | 'automatico';
  tags: string[];
  timeline: TimelineEvent[];
};

export type Booking = {
  id: string;
  code: string;
  clientId: string;
  guestName: string;
  roomType: string;
  roomNumber: string;
  channel: 'Direct' | 'Booking.com' | 'TripAdvisor' | 'Agency';
  checkIn: string;
  checkOut: string;
  guests: number;
  status:
    | 'pre-check-in'
    | 'in-house'
    | 'post-stay'
    | 'richiesta'
    | 'attesa-pagamento'
    | 'cancellata';
  revenue: number;
  aiInsights: string;
  outstandingActions: string[];
  timeline: TimelineEvent[];
};

export type Template = {
  id: string;
  name: string;
  category: 'Marketing' | 'Operativo' | 'Ai-assistito';
  description: string;
  updatedAt: string;
  engagement: number;
  automationRate: number;
};

export type RoomAnalytics = {
  roomType: string;
  occupancy: number;
  trend: 'up' | 'down' | 'stable';
};

export type RevenueHighlight = {
  id: string;
  label: string;
  amount: string;
  delta: string;
  positive: boolean;
};

export type IoTDevice = {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  location: string;
  battery: number;
};

export type ExternalService = {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  actionLabel: string;
  url?: string;
};

export type AiNotification = {
  id: string;
  threadId: string;
  type: 'risposta' | 'feedback' | 'alert';
  message: string;
  time: string;
  priority: 'alta' | 'media' | 'bassa';
};

export type ChatMessage = {
  id: string;
  sender: 'ospite' | 'hotel' | 'ai';
  body: string;
  timestamp: string;
};

export type ChatThread = {
  id: string;
  guestName: string;
  room: string;
  channel: 'App' | 'WhatsApp' | 'Email';
  unread: number;
  lastMessage: string;
  timestamp: string;
  vip: boolean;
  messages: ChatMessage[];
};

export const clients: Client[] = [
  {
    id: 'cli-01',
    name: 'Giovanni Greco',
    avatarInitials: 'GG',
    email: 'giovanni.greco@exemple.com',
    phone: '+39 333 1234567',
    vip: true,
    loyaltyLevel: 'Platinum',
    lastStay: '12/09/2024',
    nextStay: '28/11/2024',
    staysCount: 9,
    newsletter: true,
    roomPreference: 'Suite Executive vista mare',
    notes: 'Ama il cuscino memory e il welcome kit con tisane detox.',
    temperature: 21.5,
    minibar: 76,
    automationLevel: 'automatico',
    tags: ['VIP', 'Consulente', 'Late checkout'],
    timeline: [
      {
        id: 'tm-01',
        label: 'Invio proposta personalizzata',
        timestamp: '05/09/2024 09:10',
        completed: true,
        template: 'Welcome premium',
        channel: 'email',
      },
      {
        id: 'tm-02',
        label: 'Promemoria pre-check-in',
        timestamp: '10/09/2024 18:05',
        completed: true,
        template: 'Pre check-in digitale',
        channel: 'ai',
      },
      {
        id: 'tm-03',
        label: 'Richiesta upgrade SPA',
        timestamp: '11/09/2024 12:22',
        completed: true,
        template: 'Upsell SPA',
        channel: 'whatsapp',
      },
      {
        id: 'tm-04',
        label: 'Feedback post-soggiorno',
        timestamp: '15/09/2024 10:30',
        completed: false,
        template: 'Feedback 5 stelle',
        channel: 'email',
      },
    ],
  },
  {
    id: 'cli-02',
    name: 'Marta Neri',
    avatarInitials: 'MN',
    email: 'marta.neri@dominio.com',
    phone: '+39 392 3456789',
    vip: false,
    loyaltyLevel: 'Gold',
    lastStay: '02/08/2024',
    nextStay: null,
    staysCount: 4,
    newsletter: false,
    roomPreference: 'Junior Suite con balcone',
    notes: 'Intolleranza al lattosio, preferisce comunicazioni via WhatsApp.',
    temperature: 22.3,
    minibar: 44,
    automationLevel: 'assistito',
    tags: ['Family', 'Wellness'],
    timeline: [
      {
        id: 'tm-05',
        label: 'Email di compleanno',
        timestamp: '18/07/2024 08:00',
        completed: true,
        template: 'Auguri con gift card',
        channel: 'email',
      },
      {
        id: 'tm-06',
        label: 'Follow-up proposta weekend',
        timestamp: '05/09/2024 15:20',
        completed: false,
        template: 'Promo weekend famiglia',
        channel: 'ai',
      },
    ],
  },
  {
    id: 'cli-03',
    name: 'Antonio Marino',
    avatarInitials: 'AM',
    email: 'antonio.marino@azienda.it',
    phone: '+39 320 8887776',
    vip: false,
    loyaltyLevel: 'Silver',
    lastStay: '20/07/2024',
    nextStay: '14/12/2024',
    staysCount: 3,
    newsletter: true,
    roomPreference: 'Camera Deluxe angolare',
    notes: 'Viaggia per lavoro, gradisce check-in express e fatturazione digitale.',
    temperature: 21,
    minibar: 35,
    automationLevel: 'automatico',
    tags: ['Business', 'Check-in express'],
    timeline: [
      {
        id: 'tm-07',
        label: 'Invio contratto aziendale',
        timestamp: '10/07/2024 09:30',
        completed: true,
        template: 'Accordo corporate',
        channel: 'email',
      },
      {
        id: 'tm-08',
        label: 'Notifica arrivo driver',
        timestamp: '20/07/2024 16:15',
        completed: true,
        template: 'Transfer dedicato',
        channel: 'sms',
      },
      {
        id: 'tm-09',
        label: 'Richiesta estensione soggiorno',
        timestamp: '21/07/2024 11:05',
        completed: false,
        template: 'Offerta upgrade business',
        channel: 'ai',
      },
    ],
  },
];

export const bookings: Booking[] = [
  {
    id: 'bk-01',
    code: 'RES-20240912-01',
    clientId: 'cli-01',
    guestName: 'Giovanni Greco',
    roomType: 'Suite Executive',
    roomNumber: '701',
    channel: 'Direct',
    checkIn: '12/09/2024',
    checkOut: '16/09/2024',
    guests: 2,
    status: 'post-stay',
    revenue: 1860,
    aiInsights: 'Suggerire pacchetto golf + transfer privato per il prossimo soggiorno.',
    outstandingActions: ['Inviare richiesta recensione', 'Proporre estensione spa partner'],
    timeline: [
      {
        id: 'bk-tm-01',
        label: 'Conferma prenotazione',
        timestamp: '01/09/2024 10:02',
        completed: true,
        template: 'Conferma Suite Executive',
        channel: 'email',
      },
      {
        id: 'bk-tm-02',
        label: 'Pre check-in digitale',
        timestamp: '08/09/2024 18:30',
        completed: true,
        template: 'Pre check-in con firma digitale',
        channel: 'ai',
      },
      {
        id: 'bk-tm-03',
        label: 'Welcome message',
        timestamp: '12/09/2024 13:05',
        completed: true,
        template: 'Welcome premium con IoT',
        channel: 'whatsapp',
      },
      {
        id: 'bk-tm-04',
        label: 'Richiesta feedback',
        timestamp: '16/09/2024 09:00',
        completed: false,
        template: 'Feedback con AI summary',
        channel: 'email',
      },
    ],
  },
  {
    id: 'bk-02',
    code: 'RES-20241002-02',
    clientId: 'cli-02',
    guestName: 'Marta Neri',
    roomType: 'Junior Suite',
    roomNumber: '412',
    channel: 'Booking.com',
    checkIn: '02/10/2024',
    checkOut: '06/10/2024',
    guests: 3,
    status: 'pre-check-in',
    revenue: 1280,
    aiInsights: 'Consigliare breakfast kids-friendly e percorso SPA family.',
    outstandingActions: ['Inviare proposta upgrade family suite'],
    timeline: [
      {
        id: 'bk-tm-05',
        label: 'Import prenotazione OTA',
        timestamp: '17/09/2024 07:30',
        completed: true,
        template: 'Sincronizzazione OTA',
        channel: 'ai',
      },
      {
        id: 'bk-tm-06',
        label: 'Richiesta dati ospiti',
        timestamp: '20/09/2024 12:00',
        completed: true,
        template: 'Modulo guest family',
        channel: 'email',
      },
      {
        id: 'bk-tm-07',
        label: 'Suggerimento servizi kids',
        timestamp: '25/09/2024 15:10',
        completed: false,
        template: 'Bundle family experience',
        channel: 'whatsapp',
      },
    ],
  },
  {
    id: 'bk-03',
    code: 'RES-20241114-05',
    clientId: 'cli-03',
    guestName: 'Antonio Marino',
    roomType: 'Deluxe Business',
    roomNumber: '320',
    channel: 'TripAdvisor',
    checkIn: '14/12/2024',
    checkOut: '16/12/2024',
    guests: 1,
    status: 'richiesta',
    revenue: 640,
    aiInsights: 'Attivare automazione invoicing e assistente digitale per meeting room.',
    outstandingActions: ['Confermare disponibilità sala meeting'],
    timeline: [
      {
        id: 'bk-tm-08',
        label: 'Richiesta preventivo',
        timestamp: '20/09/2024 08:45',
        completed: true,
        template: 'Preventivo business',
        channel: 'email',
      },
      {
        id: 'bk-tm-09',
        label: 'Analisi AI preferenze',
        timestamp: '20/09/2024 09:00',
        completed: true,
        template: 'Insight preferenze',
        channel: 'ai',
      },
      {
        id: 'bk-tm-10',
        label: 'Follow-up commerciale',
        timestamp: '22/09/2024 11:20',
        completed: false,
        template: 'Upgrade corporate',
        channel: 'email',
      },
    ],
  },
];

export const roomAnalytics: RoomAnalytics[] = [
  { roomType: 'Suite', occupancy: 86, trend: 'up' },
  { roomType: 'Junior Suite', occupancy: 72, trend: 'stable' },
  { roomType: 'Deluxe', occupancy: 64, trend: 'down' },
  { roomType: 'Superior', occupancy: 78, trend: 'up' },
];

export const revenueHighlights: RevenueHighlight[] = [
  {
    id: 'rev-01',
    label: 'Indice di cura ospiti',
    amount: '92 / 100',
    delta: '+4,2 pt',
    positive: true,
  },
  {
    id: 'rev-02',
    label: 'Tempo medio risposta AI',
    amount: '1,8 min',
    delta: '35s più rapidi',
    positive: true,
  },
  {
    id: 'rev-03',
    label: 'Esperienze personalizzate',
    amount: '47 attive',
    delta: '+8',
    positive: true,
  },
];

export const iotDevices: IoTDevice[] = [
  { id: 'iot-01', name: 'Hub camera 701', status: 'online', location: 'Piano 7 - Torre A', battery: 87 },
  { id: 'iot-02', name: 'Sensore minibar 412', status: 'warning', location: 'Piano 4 - Ala Family', battery: 42 },
  { id: 'iot-03', name: 'Controller clima 320', status: 'online', location: 'Piano 3 - Business', battery: 63 },
  { id: 'iot-04', name: 'Tapparelle smart 215', status: 'offline', location: 'Piano 2 - Classic', battery: 0 },
];

export const externalServices: ExternalService[] = [
  {
    id: 'srv-01',
    name: 'MADEEP SPA',
    description: 'Sincronizza trattamenti wellness e disponibilità sale relax.',
    connected: true,
    actionLabel: 'Gestisci da hub',
    url: 'https://madeep.example.com',
  },
  {
    id: 'srv-02',
    name: 'TripAdvisor Reputation',
    description: 'Monitora le recensioni e attiva risposte AI contestuali.',
    connected: false,
    actionLabel: 'Invia invito automatico',
  },
  {
    id: 'srv-03',
    name: 'Booking.com Chat',
    description: 'Rispondi direttamente alle richieste OTA con la chat AI.',
    connected: true,
    actionLabel: 'Apri conversazioni',
    url: 'https://partner.booking.com',
  },
];

export const aiNotifications: AiNotification[] = [
  {
    id: 'ai-01',
    threadId: 'chat-01',
    type: 'risposta',
    message: 'Richiesta transfer aeroporto senza risposta da 25 minuti.',
    time: '2 min fa',
    priority: 'alta',
  },
  {
    id: 'ai-02',
    threadId: 'chat-03',
    type: 'feedback',
    message: "L'AI suggerisce di inviare proposta breakfast gluten free.",
    time: '12 min fa',
    priority: 'media',
  },
  {
    id: 'ai-03',
    threadId: 'chat-02',
    type: 'alert',
    message: 'Temperatura camera 701 oltre soglia comfort.',
    time: '27 min fa',
    priority: 'alta',
  },
];

export const templates: Template[] = [
  {
    id: 'tpl-01',
    name: 'Email Conferma Prenotazione',
    category: 'Operativo',
    description: 'Conferma dinamica con dettagli camera, arrivo e richieste speciali.',
    updatedAt: '11/09/2024',
    engagement: 72,
    automationRate: 94,
  },
  {
    id: 'tpl-02',
    name: 'Upsell SPA Weekend',
    category: 'Marketing',
    description: 'Sequenza 3 touch con dinamica AI in base agli interessi.',
    updatedAt: '05/09/2024',
    engagement: 63,
    automationRate: 82,
  },
  {
    id: 'tpl-03',
    name: 'Reminder Check-out digitale',
    category: 'Ai-assistito',
    description: 'Template snello per check-out express con riepilogo spese.',
    updatedAt: '14/08/2024',
    engagement: 58,
    automationRate: 91,
  },
];

export const chatThreads: ChatThread[] = [
  {
    id: 'chat-01',
    guestName: 'Giovanni Greco',
    room: '701',
    channel: 'App',
    unread: 2,
    lastMessage: 'Possiamo anticipare il transfer alle 8:30?',
    timestamp: '1 min fa',
    vip: true,
    messages: [
      {
        id: 'msg-01',
        sender: 'ospite',
        body: 'Buongiorno, potrei avere un upgrade SPA per oggi pomeriggio?',
        timestamp: '09:12',
      },
      {
        id: 'msg-02',
        sender: 'ai',
        body: 'Ho verificato la disponibilità, confermo slot alle 17:00. Attendo conferma.',
        timestamp: '09:13',
      },
      {
        id: 'msg-03',
        sender: 'ospite',
        body: 'Perfetto, grazie! Possiamo anticipare il transfer alle 8:30?',
        timestamp: '09:18',
      },
    ],
  },
  {
    id: 'chat-02',
    guestName: 'Marta Neri',
    room: '412',
    channel: 'WhatsApp',
    unread: 0,
    lastMessage: 'Lettini per bambini disponibili? Grazie!',
    timestamp: '7 min fa',
    vip: false,
    messages: [
      {
        id: 'msg-04',
        sender: 'ospite',
        body: 'Lettini per bambini disponibili? Grazie!',
        timestamp: '08:56',
      },
      {
        id: 'msg-05',
        sender: 'ai',
        body: 'Ne abbiamo due disponibili e li farò trovare in camera al suo arrivo.',
        timestamp: '08:58',
      },
    ],
  },
  {
    id: 'chat-03',
    guestName: 'Antonio Marino',
    room: '320',
    channel: 'Email',
    unread: 1,
    lastMessage: 'Serve supporto per collegamento Teams in sala meeting.',
    timestamp: '25 min fa',
    vip: false,
    messages: [
      {
        id: 'msg-06',
        sender: 'ospite',
        body: 'Serve supporto per collegamento Teams in sala meeting.',
        timestamp: '08:24',
      },
      {
        id: 'msg-07',
        sender: 'hotel',
        body: 'Prendiamo in carico la richiesta e le confermiamo entro breve.',
        timestamp: '08:40',
      },
    ],
  },
];
