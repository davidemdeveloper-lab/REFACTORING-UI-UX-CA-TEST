import { Conversation } from '@/types';

export const conversationsMock: Conversation[] = [
  {
    id: 'conversation-1',
    customerId: 'customer-1',
    channel: 'Booking',
    channels: ['Booking', 'Email'],
    subject: 'Richiesta conferma soggiorno',
    unread: true,
    priority: 'Alta',
    lastMessageAt: '2025-10-28T08:12:00Z',
    messages: [
      {
        id: 'message-1',
        author: 'Cliente',
        content:
          'Buongiorno, potete confermarmi che il pagamento è andato a buon fine?',
        timestamp: '2025-10-28T08:05:00Z',
        channel: 'Booking',
        kind: 'chat',
      },
      {
        id: 'message-2',
        author: 'AI',
        content:
          'Sto recuperando le informazioni sul pagamento. Vuoi inviare subito un recap completo?',
        timestamp: '2025-10-28T08:06:30Z',
        channel: 'Email',
        kind: 'suggestion',
        suggestions: [
          'Invia conferma pagamento',
          'Richiedi ricevuta',
          'Passa la chat a un collega',
        ],
      },
      {
        id: 'message-3',
        author: 'Cliente',
        content:
          'Grazie. Inoltre, potete confermare il parcheggio incluso?',
        timestamp: '2025-10-28T08:12:00Z',
        channel: 'Email',
        kind: 'chat',
      },
    ],
  },
  {
    id: 'conversation-2',
    customerId: 'customer-2',
    channel: 'Email',
    channels: ['Email'],
    subject: 'Intolleranza al lattosio',
    unread: false,
    priority: 'Normale',
    lastMessageAt: '2025-10-28T07:45:00Z',
    messages: [
      {
        id: 'message-4',
        author: 'Cliente',
        content:
          'Buongiorno, confermate che a colazione trovo opzioni senza lattosio?',
        timestamp: '2025-10-28T07:30:00Z',
        channel: 'Email',
        kind: 'chat',
      },
      {
        id: 'message-5',
        author: 'Operatore',
        content:
          'Ciao Laura, abbiamo già avvisato la cucina per la tua intolleranza. Troverai un angolo dedicato.',
        timestamp: '2025-10-28T07:35:00Z',
        channel: 'Email',
        kind: 'chat',
      },
      {
        id: 'message-6',
        author: 'Cliente',
        content: 'Perfetto, grazie mille!',
        timestamp: '2025-10-28T07:45:00Z',
        channel: 'Email',
        kind: 'chat',
      },
    ],
  },
  {
    id: 'conversation-3',
    customerId: 'customer-3',
    channel: 'WhatsApp',
    channels: ['WhatsApp', 'Booking'],
    subject: 'Late checkout e transfer',
    unread: true,
    priority: 'Alta',
    lastMessageAt: '2025-10-28T08:18:00Z',
    messages: [
      {
        id: 'message-7',
        author: 'Cliente',
        content:
          'Ciao, possiamo fare il late checkout per domani? E mi aiuti a prenotare un transfer?',
        timestamp: '2025-10-28T08:15:00Z',
        channel: 'WhatsApp',
        kind: 'chat',
      },
      {
        id: 'message-8',
        author: 'AI',
        content:
          'Sembra una richiesta di late checkout. Vuoi proporre un checkout alle 14:00 e aggiungere il transfer?',
        timestamp: '2025-10-28T08:16:00Z',
        channel: 'WhatsApp',
        kind: 'suggestion',
        suggestions: [
          'Conferma late checkout alle 14:00',
          'Invia opzioni transfer',
          'Chiedi disponibilità alla housekeeping',
        ],
      },
      {
        id: 'message-9',
        author: 'Cliente',
        content: 'Grazie! Aspetto conferma.',
        timestamp: '2025-10-28T08:18:00Z',
        channel: 'Booking',
        kind: 'chat',
      },
    ],
  },
  {
    id: 'conversation-4',
    customerId: 'customer-4',
    channel: 'Email',
    channels: ['Email'],
    subject: 'Richiesta allergie',
    unread: false,
    priority: 'Normale',
    lastMessageAt: '2025-10-27T20:05:00Z',
    messages: [
      {
        id: 'message-10',
        author: 'Cliente',
        content:
          'Mio figlio è allergico alle nocciole, potete segnalarlo allo staff della cucina?',
        timestamp: '2025-10-27T19:45:00Z',
        channel: 'Email',
        kind: 'chat',
      },
      {
        id: 'message-11',
        author: 'Operatore',
        content:
          'Certo Luigi, abbiamo aggiornato la tua scheda cliente e lasciato una nota per la cucina.',
        timestamp: '2025-10-27T20:05:00Z',
        channel: 'Email',
        kind: 'chat',
      },
    ],
  },
  {
    id: 'conversation-5',
    customerId: 'customer-5',
    channel: 'Booking',
    channels: ['Booking', 'WhatsApp'],
    subject: 'Conferma early check-in',
    unread: false,
    priority: 'Normale',
    lastMessageAt: '2025-10-28T06:20:00Z',
    messages: [
      {
        id: 'message-12',
        author: 'Cliente',
        content:
          'Ciao, arrivo alle 11:00. È possibile avere la camera già pronta?',
        timestamp: '2025-10-28T06:10:00Z',
        channel: 'Booking',
        kind: 'chat',
      },
      {
        id: 'message-13',
        author: 'Operatore',
        content:
          'Ciao Sara, stiamo verificando con housekeeping. Ti aggiorniamo entro pochi minuti.',
        timestamp: '2025-10-28T06:18:00Z',
        channel: 'Booking',
        kind: 'chat',
      },
      {
        id: 'message-14',
        author: 'AI',
        content:
          'Suggerimento: invia conferma early check-in e ricorda di avvisare housekeeping.',
        timestamp: '2025-10-28T06:20:00Z',
        channel: 'WhatsApp',
        kind: 'suggestion',
        suggestions: [
          'Conferma early check-in ore 11:00',
          'Proponi attesa in lounge',
        ],
      },
      {
        id: 'message-15',
        author: 'AI',
        content:
          'Ho confermato il late check-in con housekeeping e inviato il riepilogo su WhatsApp.',
        timestamp: '2025-10-28T06:20:30Z',
        channel: 'WhatsApp',
        kind: 'chat',
        status: 'Inviato',
      },
    ],
  },
];
