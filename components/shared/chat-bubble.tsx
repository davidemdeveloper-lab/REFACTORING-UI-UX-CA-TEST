'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { Tooltip, TooltipContent, TooltipText, TooltipTrigger } from '@/components/ui/tooltip';
import { channelMetaMap } from '@/constants/channels';
import { ChatMessage } from '@/types';

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
    label: string;
    align: 'start' | 'end';
    metaColor: string;
  }
> = {
  Cliente: {
    container: 'bg-[var(--color-background)] border border-[var(--color-border)]',
    text: 'text-[var(--color-neutral-900)]',
    label: 'Cliente',
    align: 'start',
    metaColor: 'text-[var(--color-neutral-500)]',
  },
  Operatore: {
    container:
      'bg-[rgba(196,123,44,0.16)] border border-transparent shadow-[0_12px_24px_rgba(196,123,44,0.18)]',
    text: 'text-[var(--color-neutral-900)]',
    label: 'Operatore',
    align: 'end',
    metaColor: 'text-[var(--color-neutral-400)]',
  },
  AI: {
    container:
      'bg-[rgba(59,130,246,0.18)] border border-transparent shadow-[0_12px_24px_rgba(37,99,235,0.14)]',
    text: 'text-[var(--color-neutral-900)]',
    label: 'Assistente AI',
    align: 'end',
    metaColor: 'text-[var(--color-neutral-400)]',
  },
};

export function ChatBubble({ message, onSuggestionClick, actionSlot }: ChatBubbleProps) {
  const tone = authorTone[message.author];
  const channelMeta = channelMetaMap[message.channel];
  const alignmentClass = tone.align === 'end' ? 'items-end self-end' : 'items-start self-start';
  const headerAlignment = tone.align === 'end' ? 'justify-end' : 'justify-start';
  const formattedTime = new Date(message.timestamp).toLocaleString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  });

  return (
    <VStack space="xs" className={`max-w-full ${alignmentClass}`}>
      <HStack className={`items-center gap-2 ${headerAlignment}`}>
        <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
          {tone.label}
        </Text>
        <Text className={`text-xs ${tone.metaColor}`}>{formattedTime}</Text>
        {actionSlot}
      </HStack>
      <Box
        className={`max-w-[520px] rounded-3xl px-5 py-4 ${tone.container} ${
          tone.align === 'end' ? 'self-end' : 'self-start'
        }`}
      >
        <HStack className="items-center justify-between gap-3">
          <HStack className="items-center gap-2">
            <Tooltip placement="top">
              <TooltipTrigger>
                <Box
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${channelMeta.background}`}
                >
                  <channelMeta.icon size={16} color={channelMeta.color} strokeWidth={2} />
                </Box>
              </TooltipTrigger>
              <TooltipContent className="bg-[var(--color-neutral-900)]">
                <TooltipText>{channelMeta.tooltip}</TooltipText>
              </TooltipContent>
            </Tooltip>
            <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
              {channelMeta.label}
            </Text>
          </HStack>
          {message.status ? (
            <Text className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
              {message.status}
            </Text>
          ) : null}
        </HStack>
        <Text className={`mt-3 text-sm leading-6 ${tone.text}`}>
          {message.content}
        </Text>
        {message.suggestions && message.suggestions.length > 0 ? (
          <HStack className="mt-4 flex-row flex-wrap gap-2">
            {message.suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                size="sm"
                variant="outline"
                action="default"
                className="rounded-full border-[var(--color-border)] bg-[var(--color-surface)] px-3"
                onPress={() => onSuggestionClick?.(suggestion)}
              >
                <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                  {suggestion}
                </Text>
              </Button>
            ))}
          </HStack>
        ) : null}
      </Box>
    </VStack>
  );
}

