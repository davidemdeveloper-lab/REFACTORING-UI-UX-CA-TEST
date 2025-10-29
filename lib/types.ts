export type ClientStatus = 'attivo' | 'vip' | 'inattivo';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  vip: boolean;
  notes: string;
  spaOptIn: boolean;
  lastContact: string;
  status: ClientStatus;
}

export type BookingStatus = 'nuovo' | 'confermato' | 'check-in' | 'check-out' | 'perso';

export interface BookingStep {
  id: string;
  label: string;
  channel: 'email' | 'sms' | 'chat';
  deliveredAt?: string;
  failed?: boolean;
}

export interface BookingIoTState {
  temperature: number;
  minibarFill: number;
  tvOn: boolean;
  blindsDown: boolean;
}

export interface Booking {
  id: string;
  clientId: string;
  roomType: string;
  status: BookingStatus;
  checkIn: string;
  checkOut: string;
  iot: BookingIoTState;
  comms: BookingStep[];
  spaOptIn: boolean;
}

export interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  usage: number;
  updatedAt: string;
}

export type ConversationType = 'direct' | 'booking';

export interface Message {
  id: string;
  sender: 'guest' | 'hotel' | 'ai';
  body: string;
  sentAt: string;
  status: 'sent' | 'delivered' | 'failed';
}

export interface Conversation {
  id: string;
  type: ConversationType;
  bookingId?: string;
  clientId: string;
  messages: Message[];
  aiEnabled: boolean;
}

export interface Notification {
  id: string;
  kind: 'ai' | 'chat' | 'system' | 'template' | 'booking';
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  link?: {
    type: 'chat' | 'booking' | 'template';
    id: string;
  };
}

export interface IoTDevice {
  id: string;
  roomNo: string;
  type: 'thermostat' | 'minibar' | 'lock' | 'lighting';
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
}

export interface AnalyticsSnapshot {
  roomType: string;
  occupancy: number;
}

export interface RevenueSnapshot {
  label: string;
  value: number;
}

export interface ServiceUsageSnapshot {
  service: string;
  usage: number;
}

export interface AnalyticsState {
  occupancy: AnalyticsSnapshot[];
  revenue: RevenueSnapshot[];
  services: ServiceUsageSnapshot[];
}

export interface UiState {
  filters: Record<string, string>;
  activeToasts: { id: string; title: string; description?: string }[];
  bookingChatOpen: boolean;
}
