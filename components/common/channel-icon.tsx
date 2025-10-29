import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Mail, MessageCircle, Phone, Smartphone, Globe } from 'lucide-react-native';
import { channelLabel } from '@/lib/utils';

const CHANNEL_ICON: Record<string, React.ComponentType<any>> = {
  email: Mail,
  whatsapp: Smartphone,
  phone: Phone,
  direct: MessageCircle,
  booking: Globe,
};

export const ChannelIcon = ({ channel }: { channel: string }) => {
  const IconComponent = CHANNEL_ICON[channel] ?? MessageCircle;
  return (
    <span className="badge-pill border border-white/10 bg-white/5 text-[0.65rem] font-semibold text-white">
      <Icon as={IconComponent} size={14} color="rgba(255,255,255,0.85)" />
      {channelLabel[channel] ?? channel}
    </span>
  );
};
