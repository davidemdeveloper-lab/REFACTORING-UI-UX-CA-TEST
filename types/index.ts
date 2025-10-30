export type ClientStatus = 'confermato' | 'in_attesa' | 'da_contattare' | 'vip';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastUpdate: string;
  lastStay: string;
  stayCount: number;
  status: ClientStatus;
  upcomingEvent: string;
  nextEventDate: string;
  newsletter: boolean;
  tags: string[];
  loyaltyTier: 'silver' | 'gold' | 'platinum';
  city: string;
  notes: string;
}

export type BookingStatus = 'confermato' | 'opzione' | 'perso' | 'precheckin' | 'in_house';

export interface CommunicationEvent {
  id: string;
  title: string;
  channel: 'email' | 'sms' | 'whatsapp' | 'telefonata';
  state: 'inviato' | 'programmato' | 'ricevuto' | 'azione';
  actor: string;
  at: string;
  note: string;
}

export interface Booking {
  id: string;
  code: string;
  clientId: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: number;
  value: number;
  status: BookingStatus;
  channel: 'Website' | 'OTA' | 'CRM';
  lostReason?: string;
  preStayTasks: string[];
  communications: CommunicationEvent[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'offerta' | 'prenotazione' | 'promemoria';
  updatedAt: string;
  subject: string;
  previewData: Record<string, string>;
  html: string;
}

export type ChatCategory = 'direct' | 'booking';

export interface ChatMessage {
  id: string;
  author: string;
  authorRole: 'ospite' | 'staff';
  at: string;
  content: string;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  title: string;
  type: ChatCategory;
  relatedId?: string;
  lastUpdate: string;
  unread: number;
  participants: string[];
  timeline: ChatMessage[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: 'automazione' | 'pagamento' | 'manutenzione' | 'guest';
  read: boolean;
  action?: string;
}

export interface Device {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastPing: string;
  metrics: {
    energy: number;
    occupancy: number;
    battery: number;
  };
  automation: string;
}
