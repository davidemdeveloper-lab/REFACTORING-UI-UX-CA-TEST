export const guests = [
  {
    id: 'guest-1',
    name: 'Giovanni Greco',
    email: 'giovanni.greco@skyresort.it',
    phone: '+39 345 1122334',
    loyaltyTier: 'Platinum',
    lastStay: '2024-08-12',
    stays: 5,
    preferences: ['Suite vista mare', 'Cuscini memory foam', 'Colazione gluten free'],
    newsletter: true,
    automationScore: 92,
    roomTemperature: 21.5,
    minibarLevel: 68,
  },
  {
    id: 'guest-2',
    name: 'Antonio Marino',
    email: 'antonio.marino@lakeside.com',
    phone: '+39 348 9988776',
    loyaltyTier: 'Gold',
    lastStay: '2024-07-24',
    stays: 3,
    preferences: ['Junior suite', 'Spa serale', 'Welcome drink analcolico'],
    newsletter: false,
    automationScore: 84,
    roomTemperature: 22.3,
    minibarLevel: 41,
  },
  {
    id: 'guest-3',
    name: 'Francesca Gallo',
    email: 'francesca.gallo@urbanspots.it',
    phone: '+39 392 6655442',
    loyaltyTier: 'Silver',
    lastStay: '2024-09-01',
    stays: 2,
    preferences: ['Camera deluxe', 'Late checkout', 'Spa day pass'],
    newsletter: true,
    automationScore: 76,
    roomTemperature: 20.8,
    minibarLevel: 52,
  },
];

export const bookings = [
  {
    id: 'reservation-1',
    code: 'CA-58920',
    guestId: 'guest-1',
    roomType: 'Suite Panoramica',
    arrival: '2024-10-05',
    departure: '2024-10-10',
    status: 'In house',
    channel: 'Booking.com',
    outstandingBalance: 120,
    actions: ['Invia upsell SPA', 'Richiedi check-out express'],
    automationTimeline: [
      { id: 'proposal', label: 'Proposta inviata', date: '2024-09-08', completed: true },
      { id: 'deposit', label: 'Caparra ricevuta', date: '2024-09-10', completed: true },
      { id: 'precheck', label: 'Pre-check-in AI', date: '2024-10-02', completed: true },
      { id: 'arrival', label: 'Arrivo previsto', date: '2024-10-05', completed: true },
      { id: 'in-stay', label: 'Messaggi durante il soggiorno', date: '2024-10-07', completed: false },
      { id: 'checkout', label: 'Checkout & review', date: '2024-10-10', completed: false },
    ],
    nextAction: 'Programma check-out express e invia survey anticipata',
    lastAutomation: 'AI ha confermato upgrade minibar personalizzato',
    aiConfidence: 0.92,
    guestNotes: [
      'Preferisce temperatura camera 21° e luce soffusa al rientro serale.',
      'Arrivo previsto alle 18:30 con transfer dedicato.',
    ],
    guestPreferences: ['Pillow menu memory', 'Minibar detox', 'Spa duo domenica'],
    manualAlerts: ['Confermare disponibilità late check-out', 'Preparare welcome kit senza lattosio'],
    iotSnapshot: [
      { id: 'clima', label: 'Clima camera 502', value: '21.5°', status: 'Stabile' },
      { id: 'minibar', label: 'Minibar premium', value: '68% carico', status: 'Ok' },
    ],
    journeyMoments: [
      {
        id: 'moment-1',
        title: 'Prenotazione completata',
        description: 'Upsell suite panoramica confermato con pagamento caparra.',
        timestamp: '08 set 2024 · 09:15',
        owner: 'AI concierge',
      },
      {
        id: 'moment-2',
        title: 'Automazione pre check-in',
        description: 'Raccolte preferenze minibar e orario arrivo; AI suggerisce welcome kit detox.',
        timestamp: '02 ott 2024 · 18:00',
        owner: 'AI concierge',
      },
      {
        id: 'moment-3',
        title: 'Alert human touch',
        description: 'Ospite chiede estensione soggiorno: necessario intervento front desk.',
        timestamp: '05 ott 2024 · 19:40',
        owner: 'Staff reception',
      },
    ],
  },
  {
    id: 'reservation-2',
    code: 'CA-58942',
    guestId: 'guest-2',
    roomType: 'Junior Suite',
    arrival: '2024-09-18',
    departure: '2024-09-22',
    status: 'Pre check-in',
    channel: 'Sito ufficiale',
    outstandingBalance: 0,
    actions: ['Conferma dettagli transfer', 'Invia upgrade camera'],
    automationTimeline: [
      { id: 'proposal', label: 'Proposta inviata', date: '2024-08-26', completed: true },
      { id: 'deposit', label: 'Caparra ricevuta', date: '2024-08-30', completed: true },
      { id: 'precheck', label: 'Pre-check-in AI', date: '2024-09-14', completed: true },
      { id: 'arrival', label: 'Arrivo previsto', date: '2024-09-18', completed: false },
      { id: 'in-stay', label: 'Messaggi durante il soggiorno', date: '2024-09-19', completed: false },
      { id: 'checkout', label: 'Checkout & review', date: '2024-09-22', completed: false },
    ],
    nextAction: 'Invia reminder transfer aeroporto e aggiorna preferenze camera',
    lastAutomation: 'AI ha confermato upgrade spa serale con risposta positiva ospite.',
    aiConfidence: 0.86,
    guestNotes: [
      'Viaggia con bambina di 6 anni: aggiungere set cortesia kids.',
      'Richiesto cuscino ipoallergenico.',
    ],
    guestPreferences: ['Spa notturna', 'Trasporto privato', 'Colazione in camera'],
    manualAlerts: ['Verificare driver transfer', 'Controllare disponibilità camera comunicante'],
    iotSnapshot: [
      { id: 'clima', label: 'Clima camera 410', value: '22.8°', status: 'Regolato AI' },
      { id: 'minibar', label: 'Minibar family', value: '41% carico', status: 'Refill programmato' },
    ],
    journeyMoments: [
      {
        id: 'moment-1',
        title: 'Richiesta transfer',
        description: 'AI ha proposto transfer premium, ospite in attesa di conferma orario.',
        timestamp: '12 set 2024 · 15:30',
        owner: 'AI concierge',
      },
      {
        id: 'moment-2',
        title: 'Preferenze camera',
        description: 'Ospite ha indicato temperatura ideale e welcome drink analcolico.',
        timestamp: '14 set 2024 · 11:20',
        owner: 'Antonio Marino',
      },
    ],
  },
];

export const templates = [
  {
    id: 'template-1',
    name: 'Conferma Prenotazione Premium',
    description: 'Conferma elegante con suggerimenti upsell personalizzati.',
    category: 'Prenotazioni',
    lastEdited: '2024-09-04',
  },
  {
    id: 'template-2',
    name: 'Email pre check-in AI',
    description: 'Raccoglie preferenze ospite e propone servizi dinamici.',
    category: 'Automazioni',
    lastEdited: '2024-08-18',
  },
  {
    id: 'template-3',
    name: 'Promemoria SPA',
    description: 'Promuove trattamenti signature con dinamiche AI.',
    category: 'Marketing',
    lastEdited: '2024-07-29',
  },
];

export const chatThreads = [
  {
    id: 'thread-1',
    guestId: 'guest-1',
    subject: 'Richiesta check-out posticipato',
    unread: 2,
    lastMessageAt: '2024-09-14T11:20:00Z',
    lastMessagePreview: 'Possiamo lasciare la stanza alle 13:00?',
    channel: 'WhatsApp',
    requiresAttention: true,
    attentionReason: 'AI in attesa di conferma disponibilità late check-out.',
    messages: [
      {
        id: 'msg-1',
        sender: 'guest',
        body: 'Buongiorno! Possiamo lasciare la stanza alle 13:00?',
        timestamp: '2024-09-14T11:20:00Z',
      },
      {
        id: 'msg-2',
        sender: 'ai',
        body: 'Sto verificando con la reception e ti aggiorno a breve.',
        timestamp: '2024-09-14T11:21:10Z',
      },
    ],
    aiSuggestions: [
      'Conferma check-out alle 13:00 e invia istruzioni digital key drop.',
      'Offri late lunch al rooftop come gesto di cortesia.',
      'Proponi estensione soggiorno con sconto 10%.',
    ],
    debugLog: [
      'Intent riconosciuto: modifica orario check-out (confidence 0.88).',
      'Regola business: necessaria verifica disponibilità camere premium.',
      'Escalation programmata al front desk dopo 10 minuti senza risposta.',
    ],
  },
  {
    id: 'thread-2',
    guestId: 'guest-3',
    subject: 'Offerta SPA signature',
    unread: 0,
    lastMessageAt: '2024-09-13T17:45:00Z',
    lastMessagePreview: 'Lascio conferma per il trattamento duo.',
    channel: 'Portal Chat',
    requiresAttention: false,
    messages: [
      {
        id: 'msg-1',
        sender: 'guest',
        body: 'Possiamo prenotare un trattamento SPA di coppia per sabato?',
        timestamp: '2024-09-13T17:25:00Z',
      },
      {
        id: 'msg-2',
        sender: 'staff',
        body: 'Certamente! Ho bloccato il trattamento signature per le 18:00.',
        timestamp: '2024-09-13T17:32:00Z',
      },
      {
        id: 'msg-3',
        sender: 'guest',
        body: 'Perfetto, grazie! Lascio conferma per il trattamento duo.',
        timestamp: '2024-09-13T17:45:00Z',
      },
    ],
    aiSuggestions: [
      'Invia reminder 2 ore prima del trattamento con link info spa.',
      'Proponi upgrade sauna privata a €40.',
    ],
    debugLog: [
      'Intent riconosciuto: conferma prenotazione SPA (confidence 0.94).',
      'Nessuna escalation necessaria.',
    ],
  },
];

export const iotDevices = [
  { id: 'iot-1', name: 'Hub Camera 502', status: 'Online', health: 92 },
  { id: 'iot-2', name: 'Termostato Suite 510', status: 'Aggiornamento', health: 78 },
  { id: 'iot-3', name: 'Access Point SPA', status: 'Online', health: 96 },
  { id: 'iot-4', name: 'Sensore Frigo Bar 410', status: 'Allerta', health: 61 },
];

export const services = [
  {
    id: 'service-1',
    name: 'MADEEP Spa',
    description: 'Gestione centralizzata trattamenti e disponibilità SPA.',
    status: 'Connesso',
    actionLabel: 'Gestisci calendario',
  },
  {
    id: 'service-2',
    name: 'TripAdvisor Reputation',
    description: 'Monitora recensioni e risposte automatiche AI.',
    status: 'Da attivare',
    actionLabel: 'Invia onboarding AI',
  },
  {
    id: 'service-3',
    name: 'Booking Chat',
    description: 'Sincronizza conversazioni e template dinamici.',
    status: 'Connesso',
    actionLabel: 'Apri integrazione',
  },
];

export const customerBanners = [
  {
    id: 'bn-1',
    title: 'Prenota il transfer aeroporto',
    description: 'Servizio premium con auto elettrica e driver dedicato.',
    cta: 'Richiedi transfer',
  },
  {
    id: 'bn-2',
    title: 'Scopri il menù room service notturno',
    description: 'Selezione gourmet disponibile fino alle 02:00.',
    cta: 'Apri menù',
  },
  {
    id: 'bn-3',
    title: 'Percorso SPA sensoriale',
    description: 'Accesso agevolato per ospiti con soggiorno superiore a 3 notti.',
    cta: 'Prenota ora',
  },
];

export const analytics = {
  occupancy: [
    { label: 'Suite', value: 87 },
    { label: 'Junior Suite', value: 76 },
    { label: 'Deluxe', value: 65 },
    { label: 'Superior', value: 58 },
  ],
  revenue: {
    total: 126000,
    trend: +8.2,
    spa: 18400,
    services: 9200,
  },
  aiNotifications: [
    {
      id: 'ai-1',
      title: 'Richiesta upgrade camera',
      detail: 'AI suggerisce invio template Upsell Suite panoramica.',
      priority: 'Alta',
      time: '3 min fa',
    },
    {
      id: 'ai-2',
      title: 'Conversazione senza risposta',
      detail: 'Thread chat CA-58920 in attesa da 12 minuti.',
      priority: 'Media',
      time: '12 min fa',
    },
  ],
};
