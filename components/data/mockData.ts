export const mockClients = [
  {
    id: 'cli-001',
    name: 'Giovanni Greco',
    email: 'giovanni.greco@luxstay.com',
    phone: '+39 320 558 1245',
    lastStay: '2024-11-18',
    status: 'Check-in digitale completato',
    stays: 5,
    newsletter: true,
    vip: true,
    room: 'Suite Panoramica',
    preferences: ['Cuscini ipoallergenici', 'Bottiglia di prosecco', 'Late check-out'],
    temperature: 21,
    minibarLevel: 76,
    aiThreads: 3,
  },
  {
    id: 'cli-002',
    name: 'Antonio Marino',
    email: 'antonio.marino@travelers.it',
    phone: '+39 333 982 6770',
    lastStay: '2024-10-02',
    status: 'Richiesta conferma pagamento',
    stays: 3,
    newsletter: false,
    vip: false,
    room: 'Junior Suite',
    preferences: ['Vista mare', 'Spa giornaliera'],
    temperature: 22,
    minibarLevel: 43,
    aiThreads: 1,
  },
  {
    id: 'cli-003',
    name: 'Francesca Gallo',
    email: 'francesca.gallo@luxstay.com',
    phone: '+39 345 556 3210',
    lastStay: '2024-09-26',
    status: 'In attesa di arrivo',
    stays: 2,
    newsletter: true,
    vip: false,
    room: 'Camera Deluxe',
    preferences: ['Menu vegetariano', 'Transfer privato'],
    temperature: 20,
    minibarLevel: 64,
    aiThreads: 0,
  },
];

export const mockReservations = [
  {
    id: 'res-2034',
    code: 'Prenotazione #2034',
    guest: 'Giovanni Greco',
    arrival: '2024-12-15',
    departure: '2024-12-19',
    status: 'In pre-check-in',
    roomType: 'Suite Panoramica',
    balance: 420,
    lastEvent: 'Email di conferma inviata',
    nextAction: 'Richiedi documento identità',
    temperature: 21,
    minibarLevel: 76,
    timeline: [
      { id: 'req', label: 'Richiesta prenotazione', date: '2024-09-11', completed: true },
      { id: 'pay', label: 'Pagamento caparra', date: '2024-09-25', completed: true },
      { id: 'conf', label: 'Email conferma', date: '2024-10-02', completed: true },
      { id: 'pre', label: 'Pre check-in', date: '2024-12-08', completed: false },
      { id: 'arr', label: 'Arrivo in struttura', date: '2024-12-15', completed: false },
    ],
  },
  {
    id: 'res-2071',
    code: 'Prenotazione #2071',
    guest: 'Antonio Marino',
    arrival: '2024-11-04',
    departure: '2024-11-07',
    status: 'Pagamento in attesa',
    roomType: 'Junior Suite',
    balance: 210,
    lastEvent: 'Promemoria saldo inviato',
    nextAction: 'Verifica risposta cliente',
    temperature: 22,
    minibarLevel: 43,
    timeline: [
      { id: 'req', label: 'Richiesta prenotazione', date: '2024-08-15', completed: true },
      { id: 'pay', label: 'Pagamento caparra', date: '2024-08-20', completed: false },
      { id: 'conf', label: 'Email conferma', date: '-', completed: false },
      { id: 'pre', label: 'Pre check-in', date: '-', completed: false },
      { id: 'arr', label: 'Arrivo in struttura', date: '2024-11-04', completed: false },
    ],
  },
  {
    id: 'res-2102',
    code: 'Prenotazione #2102',
    guest: 'Francesca Gallo',
    arrival: '2025-01-11',
    departure: '2025-01-18',
    status: 'In follow-up',
    roomType: 'Camera Deluxe',
    balance: 0,
    lastEvent: 'Offerta SPA approvata',
    nextAction: 'Programma upsell transfer',
    temperature: 20,
    minibarLevel: 64,
    timeline: [
      { id: 'req', label: 'Richiesta prenotazione', date: '2024-10-11', completed: true },
      { id: 'pay', label: 'Pagamento caparra', date: '2024-10-20', completed: true },
      { id: 'conf', label: 'Email conferma', date: '2024-10-21', completed: true },
      { id: 'pre', label: 'Pre check-in', date: '2025-01-04', completed: false },
      { id: 'arr', label: 'Arrivo in struttura', date: '2025-01-11', completed: false },
    ],
  },
];

export const mockTemplates = [
  {
    id: 'temp-welcome',
    name: 'Email Benvenuto Hotel',
    description: 'Messaggio personalizzato di benvenuto con dettagli soggiorno e servizi extra.',
    category: 'Onboarding',
    lastEdited: '2024-11-02',
  },
  {
    id: 'temp-checkin',
    name: 'Promemoria Pre Check-in',
    description: 'Guida al pre-check-in digitale con raccolta documenti automatizzata.',
    category: 'Automation',
    lastEdited: '2024-10-28',
  },
  {
    id: 'temp-followup',
    name: 'Follow-up Esperienza SPA',
    description: 'Email automatica per richiesta feedback e promozioni partner esterni.',
    category: 'Upsell',
    lastEdited: '2024-09-30',
  },
];

export const mockServices = [
  {
    id: 'svc-spa',
    name: 'MADEEP SPA',
    status: 'Non attivo',
    description: 'Integra la SPA partner e invia offerte dinamiche con un click.',
    cta: 'Invia richiesta di adesione',
  },
  {
    id: 'svc-trip',
    name: 'TripAdvisor Reputation',
    status: 'Attivo',
    description: 'Monitora le recensioni e genera risposte AI in tempo reale.',
    cta: 'Apri pannello',
  },
  {
    id: 'svc-booking',
    name: 'Booking.com Chat',
    status: 'Attivo',
    description: 'Gestisci conversazioni e suggerimenti automatici per upsell.',
    cta: 'Apri chat',
  },
];

export const mockAnalytics = {
  occupancy: [
    { label: 'Suite', value: 84 },
    { label: 'Junior Suite', value: 68 },
    { label: 'Deluxe', value: 72 },
    { label: 'Standard', value: 56 },
  ],
  revenue: {
    month: 'Novembre 2024',
    total: '€84.200',
    trend: '+12% vs mese precedente',
  },
  spa: {
    total: '€12.600',
    activePackages: 4,
    satisfaction: 92,
  },
  iotDevices: [
    { label: 'Thermostat', active: 24, offline: 1 },
    { label: 'Smart Locks', active: 56, offline: 0 },
    { label: 'Illuminazione', active: 48, offline: 3 },
  ],
};

export const mockChats = {
  unread: 5,
  threads: [
    {
      id: 'chat-giovanni',
      guest: 'Giovanni Greco',
      status: 'AI in attesa di conferma',
      lastMessage: 'La temperatura della stanza è perfetta, grazie!'
    },
    {
      id: 'chat-ai',
      guest: 'Assistente AI',
      status: '3 richieste da approvare',
      lastMessage: 'Suggerisco di inviare un upsell per il pacchetto benessere.'
    },
    {
      id: 'chat-antonio',
      guest: 'Antonio Marino',
      status: 'In attesa risposta',
      lastMessage: 'Vorrei aggiungere il parcheggio coperto.'
    },
    {
      id: 'chat-booking',
      guest: 'Booking.com',
      status: 'Notifica partner',
      lastMessage: 'Nuova recensione disponibile.'
    }
  ],
};

export const mockTimelineNotes = [
  {
    time: '09:45',
    label: 'AI ha inviato promemoria check-in',
  },
  {
    time: '10:20',
    label: 'Cliente ha caricato documento identità',
  },
  {
    time: '11:05',
    label: 'Suggerita offerta SPA personalizzata',
  },
];
