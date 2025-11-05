export type CommunicationStatus =
  | 'In attesa'
  | 'Programmato'
  | 'Inviato'
  | 'Fallito'
  | 'Richiede attenzione';

export type NotePreset =
  | 'Turno'
  | 'Oggetto smarrito'
  | 'Richiesta cliente'
  | 'Manutenzione';

export type NotificationType =
  | 'AI Fallback'
  | 'Cliente Prioritario'
  | 'Nota Assegnata'
  | 'IoT'
  | 'Sistema';

export type NotificationStatus = 'Nuovo' | 'Letto' | 'Risolto';

export interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  date: string;
  status: CommunicationStatus;
  channel: 'Email' | 'WhatsApp' | 'Booking' | 'SMS';
  cta?: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  secondaryPhone?: string;
  registeredAt: string;
  statoComunicazione: CommunicationStatus;
  ultimoEvento: string;
  prossimoInvio: string;
  newsletter: boolean;
  staysCount: number;
  lastUpdate: string;
  tags: string[];
  highPriority?: boolean;
  prioritySource?: 'AI Fallback' | 'Manuale' | 'Sistema';
  priorityReason?: string;
  prioritySince?: string;
  timeline: TimelineEntry[];
  noteIds: string[];
  bookingIds: string[];
}

export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
  total: number;
  currency: string;
  statoComunicazione: CommunicationStatus;
  ultimoEvento: string;
  prossimoInvio: string;
  status: 'Confermata' | 'In attesa pagamento' | 'Cancellata' | 'In house';
  paymentStatus: 'Pagato' | 'Parziale' | 'Da pagare';
  channel: 'Direct' | 'Booking' | 'Expedia' | 'Telefono';
  timeline: TimelineEntry[];
  noteIds: string[];
  roomNumber?: string;
  iotSnapshot?: {
    temperature: number;
    minibarLevel: number;
  };
  attentionReason?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  status: 'Bozza' | 'Attivo';
  category: 'Offerte' | 'Prenotazione' | 'Promemoria';
  lastEditedBy: string;
}

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  status: NotificationStatus;
  relatedCustomerId?: string;
  relatedBookingId?: string;
}

export interface Note {
  id: string;
  preset: NotePreset;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
  target: 'Dashboard' | 'Customer' | 'Booking';
  targetId?: string;
  status: 'Aperto' | 'In corso' | 'Risolto';
  tags: string[];
}

export type ConversationChannel = 'Booking' | 'Email' | 'WhatsApp';

export interface ChatMessage {
  id: string;
  author: 'Cliente' | 'Operatore' | 'AI';
  content: string;
  timestamp: string;
  status?: 'Inviato' | 'Consegnato' | 'Letto';
  suggestions?: string[];
  channel: ConversationChannel;
  type?: 'chat' | 'suggestion';
}

export interface Conversation {
  id: string;
  customerId: string;
  channels: ConversationChannel[];
  subject: string;
  unread: boolean;
  priority: 'Normale' | 'Alta';
  lastMessageAt: string;
  messages: ChatMessage[];
}

export interface QuickAction {
  id: string;
  label: string;
  description?: string;
}

export interface IoTRoomStatus {
  roomId: string;
  roomLabel: string;
  comfort: 'Ottimale' | 'Attenzione' | 'Critico';
  temperature: number;
  humidity: number;
  minibarLevel: number;
  lastUpdate: string;
}

export interface GuestPortalCard {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  category: 'Ristorante' | 'Spa' | 'Esperienze' | 'Prodotti' | 'Servizi';
}
