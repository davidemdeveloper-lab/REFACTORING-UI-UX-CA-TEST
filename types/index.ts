export interface Client {
  id: string;
  name: string;
  lastStay: string;
  lastUpdate: string;
  email: string;
  phone: string;
  country: string;
  loyaltyStatus: 'VIP' | 'Gold' | 'Standard';
  staysCount: number;
  newsletter: boolean;
  upcomingStay?: string;
  tags: string[];
}

export interface Booking {
  id: string;
  clientId: string;
  title: string;
  status: 'confermato' | 'in_attesa' | 'perso' | 'proposta';
  checkIn: string;
  checkOut: string;
  revenue: number;
  channel: 'Direct' | 'OTA' | 'Corporate';
  tasks: string[];
  timeline: Array<{
    label: string;
    timestamp: string;
    type: 'info' | 'success' | 'warning';
  }>;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  subject: string;
  content: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  bookingId?: string;
  channel: 'Direct' | 'Booking';
  author: string;
  avatar: string;
  message: string;
  timestamp: string;
  direction: 'in' | 'out';
}

export interface NotificationItem {
  id: string;
  category: 'Sistema' | 'Upsell' | 'Comunicazione';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: 'alta' | 'media' | 'bassa';
}

export interface Device {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  battery: number;
  lastPing: string;
  type: 'Accesso' | 'Clima' | 'Illuminazione' | 'Voce';
}
