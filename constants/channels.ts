import {
  CalendarCheck,
  Mail,
  MessageCircle,
  LucideIcon,
} from 'lucide-react-native';
import { ConversationChannel } from '@/types';

export const channelIconMap: Record<ConversationChannel, LucideIcon> = {
  Booking: CalendarCheck,
  Email: Mail,
  WhatsApp: MessageCircle,
};

export const channelToneMap: Record<
  ConversationChannel,
  { background: string; color: string; border: string; iconColor: string }
> = {
  Booking: {
    background: 'bg-[rgba(59,130,246,0.12)]',
    color: 'text-[#1d4ed8]',
    border: 'border-[rgba(59,130,246,0.18)]',
    iconColor: '#1d4ed8',
  },
  Email: {
    background: 'bg-[rgba(148,163,184,0.16)]',
    color: 'text-[var(--color-neutral-700)]',
    border: 'border-[rgba(148,163,184,0.24)]',
    iconColor: '#475569',
  },
  WhatsApp: {
    background: 'bg-[rgba(22,163,74,0.16)]',
    color: 'text-[#15803d]',
    border: 'border-[rgba(22,163,74,0.2)]',
    iconColor: '#15803d',
  },
};

export const channelLabelMap: Record<ConversationChannel, string> = {
  Booking: 'Booking',
  Email: 'Email',
  WhatsApp: 'WhatsApp',
};
