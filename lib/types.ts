export type BookingStatus =
  | 'proposta'
  | 'attesa_pagamento'
  | 'confermato'
  | 'in_soggiorno'
  | 'checkout'
  | 'post_soggiorno';

export type Channel = 'email' | 'whatsapp' | 'booking' | 'sms';

export type AutomationStep = {
  id: string;
  label: string;
  description: string;
  channel: Channel;
  status: 'completato' | 'in_attesa' | 'attenzione' | 'manuale';
  scheduledAt: string;
  completedAt?: string;
};

export type IoTSensor = {
  id: string;
  name: string;
  icon: string;
  value: string;
  unit?: string;
  status: 'ok' | 'alert' | 'offline';
  lastUpdate: string;
  actionable?: boolean;
  actions?: string[];
};

export type GuestPreference = {
  category: 'comfort' | 'cucina' | 'wellness' | 'occasioni' | 'note';
  title: string;
  details: string;
  icon: string;
};

export type Booking = {
  id: string;
  reference: string;
  guestId: string;
  guestName: string;
  stayPeriod: string;
  nights: number;
  adults: number;
  children: number;
  status: BookingStatus;
  channel: 'portale' | 'diretta' | 'manuale';
  packageName: string;
  outstandingBalance: number;
  aiConfidence: number;
  roomType: string;
  aiInsights: string[];
  automation: AutomationStep[];
  sensors: IoTSensor[];
  tags: string[];
  createdAt: string;
  externalReferences: {
    bookingCom?: string;
    channelManager?: string;
    paymentLink?: string;
  };
};

export type Guest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  vipLevel: 'standard' | 'silver' | 'gold' | 'platinum';
  stays: number;
  lastStay: string;
  upcomingStay?: string;
  averageSpend: number;
  tags: string[];
  preferences: GuestPreference[];
  newsletter: boolean;
  conciergeNotes: string;
  loyaltyScore: number;
  travelCompanions: string[];
  documents: Array<{
    type: string;
    url: string;
  }>;
};

export type NewsletterSubscriber = {
  id: string;
  guestName: string;
  guestId: string;
  email: string;
  status: 'attivo' | 'sospeso';
  topics: string[];
  lastInteraction: string;
};

export type TemplateCategory =
  | 'pre_arrivo'
  | 'onboarding'
  | 'upselling'
  | 'post_soggiorno'
  | 'pagamenti';

export type Template = {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  lastUpdate: string;
  performance: {
    openRate: number;
    clickRate: number;
    conversionRate: number;
  };
  variables: string[];
  preview: string;
};

export type InboxMessage = {
  id: string;
  guestName: string;
  guestId: string;
  bookingId?: string;
  channel: Channel;
  receivedAt: string;
  summary: string;
  unread: boolean;
  aiSuggestedReply: string;
  urgency: 'bassa' | 'media' | 'alta';
  context: string;
};

export type AccentTone =
  | 'aurora'
  | 'sunset'
  | 'lagoon'
  | 'orchid'
  | 'ember';

export type GuestPortalSection = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

