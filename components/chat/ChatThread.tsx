'use client';

import { VStack, HStack, Text, Box } from '@gluestack-ui/themed';
import type { Conversation } from '@/lib/types';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

interface ChatThreadProps {
  conversation: Conversation;
}

export const ChatThread = ({ conversation }: ChatThreadProps) => (
  <VStack space="md" maxHeight="60vh" overflowY="auto" pr={8} py={8} aria-live="polite">
    {conversation.messages.map((message) => {
      const isHotel = message.sender !== 'guest';
      return (
        <HStack key={message.id} justifyContent={isHotel ? 'flex-end' : 'flex-start'}>
          <Box
            maxWidth="70%"
            px={14}
            py={10}
            borderRadius={tokens.radii.lg}
            bg={isHotel ? 'rgba(59,130,246,0.25)' : 'rgba(28,35,41,0.7)'}
            borderWidth={1}
            borderColor={isHotel ? 'rgba(148,197,253,0.35)' : 'rgba(148,163,184,0.2)'}
            sx={{ backdropFilter: 'blur(12px)' }}
          >
            <Text fontSize={12} color={palette.steel[200]}>
              {message.sender === 'ai' ? 'AI' : message.sender === 'hotel' ? 'Hotel' : 'Ospite'}
            </Text>
            <Text fontSize={14} mt={4}>
              {message.body}
            </Text>
            <Text fontSize={11} color={palette.steel[300]} mt={6}>
              {new Date(message.sentAt).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })} ·{' '}
              {message.status === 'failed' ? 'Errore' : message.status === 'delivered' ? 'Consegnato' : 'Inviato'}
            </Text>
          </Box>
        </HStack>
      );
    })}
  </VStack>
);
