'use client';

import { HStack, Textarea, TextareaInput, Icon, Button, Switch, VStack, Text } from '@gluestack-ui/themed';
import { Paperclip, Send } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
import type { Conversation } from '@/lib/types';
import { useAppDispatch } from '@/lib/hooks';
import { addMessage, toggleAi } from '@/features/chat/chatSlice';

interface ChatComposerProps {
  conversation: Conversation;
}

export const ChatComposer = ({ conversation }: ChatComposerProps) => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const handleSend = () => {
    if (!value.trim()) return;
    dispatch(
      addMessage({
        conversationId: conversation.id,
        message: {
          id: `msg-${Date.now()}`,
          sender: 'hotel',
          body: value,
          sentAt: new Date().toISOString(),
          status: 'sent'
        }
      })
    );
    setValue('');
  };

  return (
    <VStack space="sm" aria-label="Compositore messaggi">
      <HStack alignItems="center" justifyContent="space-between">
        <HStack space="sm" alignItems="center">
          <Switch
            value={conversation.aiEnabled}
            onValueChange={() => dispatch(toggleAi({ conversationId: conversation.id }))}
            accessibilityLabel="Attiva risposte automatiche AI"
          />
          <Text fontSize={13}>Risposta automatica AI {conversation.aiEnabled ? 'ON' : 'OFF'}</Text>
        </HStack>
        <HStack space="xs" alignItems="center">
          <Icon as={Paperclip} aria-hidden color="rgba(148,163,184,0.8)" />
          <Text fontSize={12} color="rgba(148,163,184,0.8)">
            Allegati (mock)
          </Text>
        </HStack>
      </HStack>
      <Textarea borderWidth={1} borderColor="rgba(148,163,184,0.2)" bg="rgba(15,23,42,0.35)">
          <TextareaInput
            value={value}
            onChangeText={setValue}
            placeholder="Scrivi un messaggio…"
            onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
              if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                event.preventDefault();
                handleSend();
              }
            }}
          />
      </Textarea>
      <HStack justifyContent="flex-end">
        <Button size="sm" action="primary" onPress={handleSend} accessibilityLabel="Invia messaggio">
          <Icon as={Send} mr={6} />
          Invia
        </Button>
      </HStack>
    </VStack>
  );
};
