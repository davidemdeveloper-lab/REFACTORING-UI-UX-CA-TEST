export type ClientStatus = 'confermato' | 'attenzione' | 'nuovo' | 'vip';

export interface Client {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  lastUpdate: string;
  lastStayStatus: ClientStatus;
  lastStayDate: string;
  staysCount: number;
  newsletterOptIn: boolean;
  tags: string[];
  notes: string;
}

export type BookingStatus = 'prenotato' | 'confermato' | 'in_arrivo' | 'in_pre_checkin' | 'partito' | 'perso';

export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  tone: 'success' | 'warning' | 'info' | 'critical';
  channel: 'email' | 'sms' | 'whatsapp' | 'telefono' | 'app';
  description?: string;
}

export interface Booking {
  id: string;
  number: string;
  clientId: string;
  status: BookingStatus;
  createdAt: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  value: number;
  source: string;
  assignedTo: string;
  tags: string[];
  timeline: TimelineEvent[];
  communications: TimelineEvent[];
  lostReason?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'offerta' | 'conferma' | 'promemoria';
  updatedAt: string;
  previewHtml: string;
  variables: string[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  role: 'ospite' | 'concierge' | 'automazione';
  timestamp: string;
  body: string;
  channel: 'chat' | 'email' | 'sms';
  sentiment?: 'positivo' | 'neutro' | 'negativo';
}

export interface Conversation {
  id: string;
  title: string;
  type: 'diretto' | 'prenotazione';
  guestName: string;
  room: string;
  status: 'aperto' | 'in_attesa' | 'chiuso';
  lastUpdate: string;
  unread: number;
  tags: string[];
  bookingId?: string;
  messages: ChatMessage[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: 'task' | 'alert' | 'success' | 'idea';
  isRead: boolean;
  assignee?: string;
}

export interface Device {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'manutenzione';
  lastPing: string;
  battery: number;
  automationBound: string;
}

export interface TemplateBlock {
  id: string;
  label: string;
  type: 'variabile' | 'loop' | 'condizione';
  preview: string;
}
