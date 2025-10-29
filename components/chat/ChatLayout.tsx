'use client';

import { ReactNode } from 'react';
import { chatMessages, chatThreads } from '@/data/mockData';
import { palette } from '@/theme/palette';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { MetalGlassCard } from '@/components/design-system/MetalGlassCard';
import { StatusPill } from '@/components/design-system/StatusPill';
import { ScrollView } from '@/components/ui/scroll-view';
import { ArrowUpCircle, SendHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable } from '@/components/ui/pressable';

export function ChatLayout() {
  const [activeThread, setActiveThread] = useState(chatThreads[0].id);
  const messages = chatMessages[activeThread] ?? [];

  return (
    <HStack gap={24} flexWrap="wrap" justifyContent="center">
      <MetalGlassCard padding={16}>
        <VStack space="md" w={320} style={{ height: '70vh' }}>
          <Text fontSize={18} fontWeight="700" color={palette.textPrimary}>
            Conversazioni
          </Text>
          <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <VStack space="sm">
              {chatThreads.map((thread) => {
                const active = thread.id === activeThread;
                return (
                  <Pressable key={thread.id} onPress={() => setActiveThread(thread.id)}>
                    <Box
                      borderRadius={16}
                      px={14}
                      py={12}
                      bg={active ? 'rgba(56,189,248,0.14)' : 'rgba(15,23,42,0.45)'}
                      borderWidth={1}
                      borderColor={active ? 'rgba(56,189,248,0.35)' : 'rgba(148,163,184,0.18)'}
                    >
                      <VStack space="xs">
                        <HStack justifyContent="space-between" alignItems="center">
                          <Text fontWeight="700" color={palette.textPrimary}>
                            {thread.guest}
                          </Text>
                          {thread.unread > 0 && <StatusPill label={`${thread.unread} nuovi`} tone="warning" />}
                        </HStack>
                        <Text fontSize={12} color={palette.textMuted}>
                          {thread.lastMessagePreview}
                        </Text>
                        <HStack justifyContent="space-between" alignItems="center">
                          <StatusPill
                            label={thread.status}
                            tone={
                              thread.status === 'alert'
                                ? 'danger'
                                : thread.status === 'gestito AI'
                                ? 'accent'
                                : 'muted'
                            }
                          />
                          <Text fontSize={11} color={palette.textMuted}>
                            {thread.updatedAt}
                          </Text>
                        </HStack>
                      </VStack>
                    </Box>
                  </Pressable>
                );
              })}
            </VStack>
          </ScrollView>
        </VStack>
      </MetalGlassCard>

      <MetalGlassCard padding={16}>
        <VStack space="md" w={520} style={{ height: '70vh' }}>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Text fontSize={18} fontWeight="700" color={palette.textPrimary}>
                {chatThreads.find((thread) => thread.id === activeThread)?.guest ?? 'Conversazione'}
              </Text>
              <Text fontSize={13} color={palette.textMuted}>
                {chatThreads.find((thread) => thread.id === activeThread)?.room}
              </Text>
            </VStack>
            <StatusPill label="IA co-pilot" tone="accent" />
          </HStack>
          <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <VStack space="sm">
              {messages.map((message) => (
                <MessageBubble key={message.id} role={message.from} timestamp={message.timestamp}>
                  {message.content}
                </MessageBubble>
              ))}
            </VStack>
          </ScrollView>
          <HStack alignItems="center" gap={12}>
            <Input flex={1} variant="outline" bg="rgba(8,15,28,0.65)" borderRadius={20}>
              <InputField placeholder="Scrivi una risposta o chiedi supporto all’AI..." />
            </Input>
            <Box
              w={44}
              h={44}
              borderRadius={14}
              bg="rgba(56,189,248,0.2)"
              alignItems="center"
              justifyContent="center"
              borderWidth={1}
              borderColor="rgba(56,189,248,0.35)"
            >
              <SendHorizontal size={20} color={palette.accentPrimary} />
            </Box>
          </HStack>
        </VStack>
      </MetalGlassCard>

      <MetalGlassCard padding={16}>
        <VStack space="md" w={260} style={{ height: '70vh' }}>
          <Text fontSize={16} fontWeight="700" color={palette.textPrimary}>
            Insight AI
          </Text>
          <VStack space="sm">
            <InsightCard
              title="Richieste SPA in attesa"
              description="3 ospiti attendono risposta, suggerita promo benessere 20%."
            />
            <InsightCard
              title="Template suggerito"
              description="Invia follow-up soggiorno per Sara Conti con codice sconto loyalty."
            />
            <InsightCard
              title="Azioni rapide"
              description="Programma automazione per late check-out domenicale."
            />
          </VStack>
        </VStack>
      </MetalGlassCard>
    </HStack>
  );
}

interface MessageBubbleProps {
  children: ReactNode;
  role: 'guest' | 'ai' | 'staff';
  timestamp: string;
}

function MessageBubble({ children, role, timestamp }: MessageBubbleProps) {
  const alignment = role === 'guest' ? 'flex-start' : 'flex-end';
  const bgColor =
    role === 'guest'
      ? 'rgba(15,23,42,0.65)'
      : role === 'ai'
      ? 'rgba(56,189,248,0.18)'
      : 'rgba(168,85,247,0.18)';
  const textColor = role === 'guest' ? palette.textPrimary : palette.textSecondary;

  return (
    <VStack alignItems={alignment} w="100%">
      <Box
        maxW="85%"
        borderRadius={16}
        px={14}
        py={10}
        bg={bgColor}
        borderWidth={1}
        borderColor="rgba(148,163,184,0.2)"
      >
        <Text fontSize={14} color={textColor}>
          {children}
        </Text>
      </Box>
      <Text fontSize={11} color={palette.textMuted} mt={4}>
        {timestamp}
      </Text>
    </VStack>
  );
}

interface InsightCardProps {
  title: string;
  description: string;
}

function InsightCard({ title, description }: InsightCardProps) {
  return (
    <Box
      borderRadius={16}
      px={14}
      py={12}
      bg="rgba(15,23,42,0.5)"
      borderWidth={1}
      borderColor="rgba(56,189,248,0.18)"
    >
      <VStack space="xs">
        <HStack space="xs" alignItems="center">
          <ArrowUpCircle size={16} color={palette.accentPrimary} />
          <Text fontSize={13} fontWeight="600" color={palette.textPrimary}>
            {title}
          </Text>
        </HStack>
        <Text fontSize={12} color={palette.textSecondary}>
          {description}
        </Text>
      </VStack>
    </Box>
  );
}

// Validazione: layout chat master-detail conforme, insight AI e notifiche evidenti.
