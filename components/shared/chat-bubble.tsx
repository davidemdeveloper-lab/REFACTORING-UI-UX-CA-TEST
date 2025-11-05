'use client';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Tooltip, TooltipContent, TooltipText } from '@/components/ui/tooltip';
import { ChatMessage, ConversationChannel } from '@/types';
import {
  CalendarCheck,
  Mail,
  MessageCircle,
} from 'lucide-react-native';

type ChatBubbleProps = {
  message: ChatMessage;
};

const authorTone: Record<
  ChatMessage['author'],
  { container: string; text: string; label: string; alignment: 'left' | 'right' }
> = {
  Cliente: {
    container:
      'bg-[var(--color-background)] border border-[var(--color-border)] shadow-[0_10px_24px_rgba(15,23,42,0.04)]',
    text: 'text-[var(--color-neutral-900)]',
    label: 'Cliente',
    alignment: 'left',
  },
  Operatore: {
    container:
      'bg-[rgba(196,123,44,0.14)] shadow-[0_12px_32px_rgba(196,123,44,0.16)]',
    text: 'text-[var(--color-neutral-900)]',
    label: 'Team Hotel',
    alignment: 'right',
  },
  AI: {
    container: 'bg-[rgba(59,130,246,0.12)] shadow-[0_12px_32px_rgba(59,130,246,0.14)]',
    text: 'text-[var(--color-neutral-900)]',
    label: 'AI Beck',
    alignment: 'right',
  },
};

const channelTone: Record<
  ConversationChannel,
  { icon: typeof CalendarCheck; color: string; background: string }
> = {
  Booking: {
    icon: CalendarCheck,
    color: '#1d4ed8',
    background: 'bg-[rgba(59,130,246,0.12)]',
  },
  Email: {
    icon: Mail,
    color: '#0f172a',
    background: 'bg-[rgba(148,163,184,0.18)]',
  },
  WhatsApp: {
    icon: MessageCircle,
    color: '#15803d',
    background: 'bg-[rgba(22,163,74,0.18)]',
  },
};

export function ChatBubble({ message }: ChatBubbleProps) {
  const tone = authorTone[message.author];
  const { icon: ChannelIcon, color, background } = channelTone[message.channel];
  const isRightAligned = tone.alignment === 'right';

  return (
    <VStack
      space="xs"
      className={`max-w-full ${
        isRightAligned ? 'items-end self-end text-right' : 'items-start self-start text-left'
      }`}
    >
      <HStack
        className={`items-center gap-2 text-[var(--color-neutral-500)] ${
          isRightAligned ? 'flex-row-reverse' : ''
        }`}
      >
        <Text className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          {tone.label}
        </Text>
        <Tooltip placement="top">
          <Tooltip.Trigger>
            <Box
              className={`rounded-full p-1.5 ${background}`}
            >
              <ChannelIcon size={14} color={color} strokeWidth={2} />
            </Box>
          </Tooltip.Trigger>
          <TooltipContent className="border border-[var(--color-border)] bg-[var(--color-surface)]">
            <TooltipText size="sm" className="text-[var(--color-neutral-900)]">
              Messaggio {message.channel}
            </TooltipText>
          </TooltipContent>
        </Tooltip>
        <Text className="text-[11px] uppercase tracking-[0.2em]">
          {new Date(message.timestamp).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </HStack>
      <Box
        className={`max-w-[520px] rounded-3xl px-5 py-4 ${tone.container}`}
      >
        <Text className={`text-sm leading-6 ${tone.text}`}>
          {message.content}
        </Text>
        {message.status ? (
          <Text className="mt-2 text-xs uppercase tracking-[0.25em] text-[var(--color-neutral-500)]">
            {message.status}
          </Text>
        ) : null}
      </Box>
    </VStack>
  );
}

