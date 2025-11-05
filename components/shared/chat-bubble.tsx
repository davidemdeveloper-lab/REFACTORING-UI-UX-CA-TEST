'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Pressable } from '@/components/ui/pressable';
import { Tooltip, TooltipContent, TooltipText } from '@/components/ui/tooltip';
import { ChatMessage } from '@/types';
import {
  channelIconMap,
  channelLabelMap,
  channelToneMap,
} from '@/constants/channels';

type ChatBubbleProps = {
  message: ChatMessage;
  onSuggestionClick?: (suggestion: string) => void;
  actionSlot?: ReactNode;
};

const authorTone: Record<
  ChatMessage['author'],
  {
    container: string;
    text: string;
    alignment: string;
    metaAlignment: string;
    label: string;
  }
> = {
  Cliente: {
    container:
      'bg-[var(--color-background)] border border-[var(--color-border)] rounded-3xl',
    text: 'text-[var(--color-neutral-900)]',
    alignment: 'items-start self-start',
    metaAlignment: 'text-left',
    label: 'Cliente',
  },
  Operatore: {
    container:
      'bg-[var(--color-primary-600)] border border-[rgba(196,123,44,0.4)] rounded-3xl',
    text: 'text-white',
    alignment: 'items-end self-end',
    metaAlignment: 'text-right',
    label: 'Team hotel',
  },
  AI: {
    container:
      'bg-[rgba(59,130,246,0.12)] border border-[rgba(59,130,246,0.22)] rounded-3xl',
    text: 'text-[var(--color-neutral-900)]',
    alignment: 'items-end self-end',
    metaAlignment: 'text-right',
    label: 'AI Assistant',
  },
};

export function ChatBubble({ message, actionSlot }: ChatBubbleProps) {
  const tone = authorTone[message.author];
  const ChannelIcon = channelIconMap[message.channel];
  const channelTone = channelToneMap[message.channel];
  const timestamp = new Date(message.timestamp).toLocaleString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  });

  return (
    <VStack
      space="xs"
      className={`max-w-full ${tone.alignment}`}
    >
      <HStack
        className={`items-center gap-2 ${
          tone.metaAlignment === 'text-right' ? 'flex-row-reverse' : ''
        }`}
      >
        <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
          {tone.label}
        </Text>
        <Text className="text-xs text-[var(--color-neutral-500)]">{timestamp}</Text>
        {actionSlot}
      </HStack>
      <HStack
        className={`items-end gap-3 ${
          tone.metaAlignment === 'text-right' ? 'flex-row-reverse' : ''
        }`}
      >
        <Tooltip
          placement="top"
          trigger={(triggerProps) => (
            <Pressable
              {...triggerProps}
              className={`h-8 w-8 items-center justify-center rounded-full border ${channelTone.background} ${channelTone.border}`}
            >
              <ChannelIcon
                size={16}
                color={channelTone.iconColor}
                strokeWidth={2}
              />
            </Pressable>
          )}
        >
          <TooltipContent>
            <TooltipText>{`Messaggio ${channelLabelMap[message.channel]}`}</TooltipText>
          </TooltipContent>
        </Tooltip>
        <Box className={`max-w-[520px] px-5 py-4 ${tone.container}`}>
          <Text className={`text-sm leading-6 ${tone.text}`}>
            {message.content}
          </Text>
          {message.status ? (
            <Text
              className={`mt-3 text-xs font-medium opacity-80 ${tone.text}`}
            >
              {message.status}
            </Text>
          ) : null}
        </Box>
      </HStack>
    </VStack>
  );
}

