'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { ChatMessage } from '@/types';

type ChatBubbleProps = {
  message: ChatMessage;
  onSuggestionClick?: (suggestion: string) => void;
  actionSlot?: ReactNode;
};

const authorTone: Record<ChatMessage['author'], { container: string; text: string; label: string }> = {
  Cliente: {
    container: 'bg-[var(--color-background)] border border-[var(--color-border)]',
    text: 'text-[var(--color-neutral-900)]',
    label: 'Cliente',
  },
  Operatore: {
    container: 'bg-[rgba(196,123,44,0.12)]',
    text: 'text-[var(--color-neutral-900)]',
    label: 'Operatore',
  },
  AI: {
    container: 'bg-[rgba(59,130,246,0.12)]',
    text: 'text-[var(--color-neutral-900)]',
    label: 'AI Assistant',
  },
};

export function ChatBubble({ message, onSuggestionClick, actionSlot }: ChatBubbleProps) {
  const tone = authorTone[message.author];

  return (
    <VStack space="xs">
      <HStack className="items-center gap-2">
        <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
          {tone.label}
        </Text>
        <Text className="text-xs text-[var(--color-neutral-600)]">
          {new Date(message.timestamp).toLocaleString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
          })}
        </Text>
        {actionSlot}
      </HStack>
      <Box
        className={`max-w-[520px] rounded-3xl px-5 py-4 ${tone.container}`}
      >
        <Text className={`text-sm leading-6 ${tone.text}`}>
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

