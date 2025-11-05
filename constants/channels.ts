import { CalendarCheck, Mail, MessageCircle } from 'lucide-react-native';
import { ChatChannel } from '@/types';

type ChannelMeta = {
  icon: typeof CalendarCheck;
  color: string;
  background: string;
  label: string;
  tooltip: string;
};

export const channelMetaMap: Record<ChatChannel, ChannelMeta> = {
  Booking: {
    icon: CalendarCheck,
    color: '#1d4ed8',
    background: 'bg-[rgba(59,130,246,0.12)]',
    label: 'Booking',
    tooltip: 'Messaggi Booking',
  },
  Email: {
    icon: Mail,
    color: 'var(--color-neutral-600)',
    background: 'bg-[rgba(148,163,184,0.22)]',
    label: 'Email',
    tooltip: 'Messaggi Email',
  },
  WhatsApp: {
    icon: MessageCircle,
    color: '#15803d',
    background: 'bg-[rgba(22,163,74,0.2)]',
    label: 'WhatsApp',
    tooltip: 'Messaggi WhatsApp',
  },
};

export const orderedChannels: ChatChannel[] = ['WhatsApp', 'Email', 'Booking'];
