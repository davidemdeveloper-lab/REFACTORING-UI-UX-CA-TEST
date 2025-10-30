export type StayStatus =
  | 'nuova richiesta'
  | 'confermata'
  | 'pagamento in sospeso'
  | 'pre-check-in inviato'
  | 'check-in completato'
  | 'follow-up inviato';

export type Client = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  vip: boolean;
  notes: string;
  lastUpdate: string;
  lastStayStatus: StayStatus;
  nextAction: string;
  newsletter: boolean;
  totalStays: number;
  spend: number;
  tags: string[];
};

export type TimelineEvent = {
  id: string;
  title: string;
  channel: 'email' | 'sms' | 'whatsapp' | 'ota' | 'phone';
  status: 'success' | 'warning' | 'info';
  timestamp: string;
  description?: string;
};

export type BookingStatus =
  | 'richiesta'
  | 'opzione'
  | 'confermata'
  | 'pagamento in corso'
  | 'pre-check-in inviato'
  | 'check-in'
  | 'in soggiorno'
  | 'check-out'
  | 'cancellata';

export type Booking = {
  id: string;
  clientId: string;
  title: string;
  reference: string;
  roomType: string;
  guests: number;
  arrival: string;
  departure: string;
  status: BookingStatus;
  channel: string;
  value: number;
  tags: string[];
  timeline: TimelineEvent[];
};

export type TemplateCategory = 'offerte' | 'pre-stay' | 'in-stay' | 'post-stay';

export type Template = {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  updatedAt: string;
  subject: string;
  previewHtml: string;
  content: string;
  blocks: Array<{
    label: string;
    description: string;
    type: 'variabile' | 'loop' | 'condizione' | 'blocco';
  }>;
};

export type ChatParticipant = {
  id: string;
  name: string;
  avatarColor: string;
  role: 'ospite' | 'team';
};

export type ChatMessage = {
  id: string;
  threadId: string;
  senderId: string;
  sentAt: string;
  text: string;
  channel: 'app' | 'whatsapp' | 'email';
  attachments?: Array<{ id: string; name: string; url: string }>; 
};

export type ChatThread = {
  id: string;
  title: string;
  type: 'direct' | 'booking';
  bookingId?: string;
  participants: ChatParticipant[];
  lastMessagePreview: string;
  lastActivity: string;
  unread: number;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  level: 'success' | 'warning' | 'info' | 'critical';
  createdAt: string;
  source: string;
  actionLabel?: string;
};

export type Device = {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  battery: number;
  signal: number;
  lastSync: string;
  type: 'room' | 'wellness' | 'common';
  icon: string;
};

export type LostBookingForm = {
  guestName: string;
  email: string;
  phone: string;
  stayDates: string;
  lostReason: 'prezzo' | 'disponibilita' | 'tempistiche' | 'altro';
  notes: string;
  voucherOffered: boolean;
};
