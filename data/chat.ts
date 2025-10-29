import type { ChatThread, ChatMessage, ChatParticipant } from '@/types';

export const chatParticipants: ChatParticipant[] = [
  { id: 'clt-001', name: 'Giovanni Greco', avatarColor: '#f97316', role: 'ospite' },
  { id: 'clt-002', name: 'Antonio Marino', avatarColor: '#38bdf8', role: 'ospite' },
  { id: 'clt-003', name: 'Francesca Gallo', avatarColor: '#a855f7', role: 'ospite' },
  { id: 'team-001', name: 'Marta Concierge', avatarColor: '#facc15', role: 'team' },
  { id: 'team-002', name: 'Davide Revenue', avatarColor: '#34d399', role: 'team' },
];

export const chatThreads: ChatThread[] = [
  {
    id: 'chat-giovanni',
    title: 'Diretto • Giovanni Greco',
    type: 'direct',
    participants: [
      chatParticipants[0],
      chatParticipants[3],
    ],
    lastMessagePreview: 'Perfetto, arriverò alle 18:30. A dopo!',
    lastActivity: '2025-01-08T18:30:00Z',
    unread: 0,
  },
  {
    id: 'chat-booking-102',
    title: 'Booking • Antonio Marino',
    type: 'booking',
    bookingId: 'bkg-102',
    participants: [chatParticipants[1], chatParticipants[4]],
    lastMessagePreview: 'Posso confermare che la sala meeting è inclusa?',
    lastActivity: '2025-01-08T09:12:00Z',
    unread: 2,
  },
  {
    id: 'chat-booking-103',
    title: 'Booking • Famiglia Gallo',
    type: 'booking',
    bookingId: 'bkg-103',
    participants: [chatParticipants[2], chatParticipants[3]],
    lastMessagePreview: 'I bambini sono entusiasti del kit astronauta!',
    lastActivity: '2025-01-07T21:05:00Z',
    unread: 0,
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    threadId: 'chat-giovanni',
    senderId: 'clt-001',
    sentAt: '2025-01-08T18:10:00Z',
    text: 'Ciao Marta! Confermo arrivo domani con volo AZ347, previsto per le 17:40.',
    channel: 'app',
  },
  {
    id: 'msg-2',
    threadId: 'chat-giovanni',
    senderId: 'team-001',
    sentAt: '2025-01-08T18:18:00Z',
    text: 'Grazie Giovanni! Ti aspettiamo. Vuoi che ti organizzi un transfer privato?',
    channel: 'app',
  },
  {
    id: 'msg-3',
    threadId: 'chat-giovanni',
    senderId: 'clt-001',
    sentAt: '2025-01-08T18:30:00Z',
    text: 'Perfetto, arriverò alle 18:30. A dopo!',
    channel: 'app',
  },
  {
    id: 'msg-4',
    threadId: 'chat-booking-102',
    senderId: 'clt-002',
    sentAt: '2025-01-08T09:12:00Z',
    text: 'Posso confermare che la sala meeting è inclusa?',
    channel: 'whatsapp',
  },
  {
    id: 'msg-5',
    threadId: 'chat-booking-102',
    senderId: 'team-002',
    sentAt: '2025-01-08T09:25:00Z',
    text: 'Ciao Antonio! Ti confermo sala meeting dalle 9 alle 13, coffee break incluso.',
    channel: 'app',
  },
  {
    id: 'msg-6',
    threadId: 'chat-booking-103',
    senderId: 'clt-003',
    sentAt: '2025-01-07T21:05:00Z',
    text: 'I bambini sono entusiasti del kit astronauta! Possiamo aggiungere anche il telescopio?',
    channel: 'app',
  },
  {
    id: 'msg-7',
    threadId: 'chat-booking-103',
    senderId: 'team-001',
    sentAt: '2025-01-07T21:10:00Z',
    text: 'Assolutamente sì, prenotato per loro. Arriverà in camera la sera del check-in.',
    channel: 'app',
  },
];
