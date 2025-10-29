export type BookingStatus =
  | 'proposta'
  | 'in_attesa_pagamento'
  | 'pagata'
  | 'in_corso'
  | 'checkout'
  | 'archiviata';

export type Channel = 'booking' | 'direct' | 'email' | 'whatsapp' | 'phone';

export type AutomationStepStatus = 'completato' | 'in_corso' | 'in_attesa' | 'errore';

export interface AutomationStep {
  id: string;
  title: string;
  description: string;
  scheduledAt: string;
  status: AutomationStepStatus;
  channel: Channel;
  aiSuggestedCopy?: string;
  guardrails?: string[];
}

export interface StayPreference {
  id: string;
  label: string;
  icon: string;
  notes?: string;
}

export interface GuestNote {
  id: string;
  createdAt: string;
  author: string;
  sentiment: 'positivo' | 'neutro' | 'negativo';
  content: string;
}

export interface IoTDevice {
  id: string;
  type: 'clima' | 'illuminazione' | 'frigobar' | 'wellness' | 'tv' | 'domotica';
  name: string;
  status: 'online' | 'offline' | 'warning';
  metrics: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'stable';
  }[];
  lastSync: string;
  room?: string;
}

export interface GuestProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastInteraction: string;
  lastStay?: string;
  tags: string[];
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  newsletter: boolean;
  preferences: StayPreference[];
  notes: GuestNote[];
  upcomingStay?: string;
  automationHealth: number;
  averageSpend: number;
  favouriteRoom?: string;
}

export interface Booking {
  id: string;
  code: string;
  guestId: string;
  channel: Channel;
  type: 'proposta' | 'diretta' | 'manuale';
  roomType: string;
  rooms: number;
  guests: number;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  total: number;
  currency: 'EUR';
  automations: AutomationStep[];
  nextAction: string;
  aiConfidence: number;
  iotDevices: IoTDevice[];
  externalLinks?: { label: string; href: string }[];
}

export interface NewsletterSubscriber {
  guestId: string;
  name: string;
  email: string;
  optIn: boolean;
  lastUpdate: string;
  source: string;
}

export interface Template {
  id: string;
  name: string;
  category: 'prestay' | 'poststay' | 'upsell' | 'recovery';
  subject: string;
  description: string;
  updatedAt: string;
  aiTone: 'professionale' | 'emozionale' | 'friendly';
  blocks: {
    id: string;
    label: string;
    type: 'variabile' | 'loop' | 'condizione' | 'testo';
    content: string;
  }[];
}

export interface ChatMessage {
  id: string;
  author: 'ospite' | 'hotel' | 'ai';
  channel: Channel;
  content: string;
  sentAt: string;
  sentiment?: 'positivo' | 'neutro' | 'negativo';
  requiresApproval?: boolean;
}

export interface Conversation {
  id: string;
  guestId: string;
  guestName: string;
  channel: Channel;
  unread: number;
  lastMessageAt: string;
  status: 'in_attesa' | 'in_gestione' | 'risolta';
  aiReadiness: number;
  messages: ChatMessage[];
}

export interface TaskItem {
  id: string;
  type: 'nota' | 'to-do' | 'promemoria';
  guestId?: string;
  bookingId?: string;
  title: string;
  description: string;
  dueAt: string;
  priority: 'bassa' | 'media' | 'alta';
  completed: boolean;
}

export interface PortalWidget {
  id: string;
  title: string;
  description: string;
  icon: string;
  actionLabel: string;
}
