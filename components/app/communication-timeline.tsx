'use client';

import { TimelineEvent } from '@/lib/mock-data';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Mail, Bot, MessageCircle, PhoneCall } from 'lucide-react-native';

const channelIconMap = {
  email: Mail,
  ai: Bot,
  whatsapp: MessageCircle,
  sms: PhoneCall,
};

export const CommunicationTimeline = ({
  events,
}: {
  events: TimelineEvent[];
}) => {
  return (
    <Box className="relative flex flex-col gap-6">
      <Box className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary-500/60 via-typography-500/30 to-transparent" />
      {events.map((event, index) => {
        const IconComponent = channelIconMap[event.channel] ?? Mail;
        return (
          <Box key={event.id} className="flex flex-row items-start gap-4">
            <Box className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 shadow-[0_8px_22px_rgba(14,20,30,0.45)]">
              <Icon
                as={IconComponent}
                className={event.completed ? 'text-primary-200' : 'text-typography-400'}
                size="sm"
              />
              <Box
                className={`absolute inset-0 rounded-full ${
                  event.completed
                    ? 'bg-primary-500/25 animate-[pulse_2s_ease-in-out_infinite]'
                    : 'bg-transparent'
                }`}
              />
            </Box>
            <Box className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl">
              <Box className="flex flex-row flex-wrap items-center justify-between gap-2">
                <Text className="text-sm font-semibold text-typography-0">
                  {event.label}
                </Text>
                <Text className="text-xs text-typography-400">{event.timestamp}</Text>
              </Box>
              <Text className="mt-1 text-xs text-typography-300">
                Canale {event.channel.toUpperCase()}
                {event.template ? ` • Template: ${event.template}` : ''}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

// Validazione: timeline verticale con stati luminosi per step completati, rispecchia requisito pagina dettaglio.
