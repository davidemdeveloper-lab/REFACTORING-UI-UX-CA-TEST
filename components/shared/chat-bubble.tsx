'use client';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Tooltip, TooltipContent, TooltipText } from '@/components/ui/tooltip';
import { ChatChannel, ChatMessage } from '@/types';
import {
  CalendarCheck,
  Mail,
  MessageCircle,
  Sparkles,
} from 'lucide-react-native';

type ChatBubbleProps = {
  message: ChatMessage;
};

const channelIconMap: Record<ChatChannel, (typeof CalendarCheck)> = {
  Booking: CalendarCheck,
  Email: Mail,
  WhatsApp: MessageCircle,
};

const channelTone: Record<ChatChannel, { iconColor: string; background: string }> = {
  Booking: {
    iconColor: '#aa6a24',
    background: 'bg-[rgba(196,123,44,0.14)]',
  },
  Email: {
    iconColor: '#475569',
    background: 'bg-[rgba(148,163,184,0.18)]',
  },
  WhatsApp: {
    iconColor: '#15803d',
    background: 'bg-[rgba(22,163,74,0.18)]',
  },
};

const authorTone: Record<
  ChatMessage['author'],
  {
    container: string;
    text: string;
    label: string;
    wrapper: string;
    metaAlign: string;
  }
> = {
  Cliente: {
    container:
      'bg-[var(--color-background)] border border-[var(--color-border)] rounded-3xl',
    text: 'text-[var(--color-neutral-900)]',
    label: 'Cliente',
    wrapper: 'items-start',
    metaAlign: 'justify-start text-left',
  },
  Operatore: {
    container:
      'bg-[rgba(196,123,44,0.14)] border border-[rgba(196,123,44,0.25)] rounded-3xl',
    text: 'text-[var(--color-neutral-900)]',
    label: 'Operatore',
    wrapper: 'items-end',
    metaAlign: 'justify-end text-right',
  },
  AI: {
    container:
      'bg-[rgba(59,130,246,0.12)] border border-[rgba(37,99,235,0.24)] rounded-3xl',
    text: 'text-[var(--color-neutral-900)]',
    label: 'Assistente AI',
    wrapper: 'items-end',
    metaAlign: 'justify-end text-right',
  },
};

export function ChatBubble({ message }: ChatBubbleProps) {
  const tone = authorTone[message.author];
  const ChannelIcon = channelIconMap[message.channel];
  const channelColors = channelTone[message.channel];

  return (
    <VStack
      space="xs"
      className={`max-w-full ${tone.wrapper} ${
        message.author === 'Cliente' ? 'items-start self-start' : 'items-end self-end'
      }`}
    >
      <HStack
        className={`w-full flex-wrap items-center gap-2 ${tone.metaAlign}`}
      >
        <HStack className="items-center gap-2">
          <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
            {tone.label}
          </Text>
          <Tooltip placement="top">
            <Tooltip.Trigger>
              <Box
                className={`rounded-full p-1.5 ${channelColors.background}`}
              >
                <ChannelIcon
                  size={13}
                  color={channelColors.iconColor}
                  strokeWidth={2}
                />
              </Box>
            </Tooltip.Trigger>
            <TooltipContent>
              <TooltipText>
                Messaggio {message.channel}
              </TooltipText>
            </TooltipContent>
          </Tooltip>
        </HStack>
        <Text className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
          {new Date(message.timestamp).toLocaleString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
          })}
        </Text>
        {message.author === 'AI' ? (
          <HStack className="items-center gap-1 text-[var(--color-neutral-500)]">
            <Sparkles size={12} color="currentColor" strokeWidth={2} />
            <Text className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
              Suggerimento
            </Text>
          </HStack>
        ) : null}
      </HStack>
      <Box className={`max-w-[520px] px-5 py-4 ${tone.container}`}>
        <Text className={`text-sm leading-6 ${tone.text}`}>
          {message.content}
        </Text>
      </Box>
    </VStack>
  );
}

