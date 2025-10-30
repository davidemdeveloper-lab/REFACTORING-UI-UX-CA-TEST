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
    <HStack className="flex-wrap justify-center" style={{ gap: 24 } as any}>
      <MetalGlassCard padding={16}>
        <VStack space="md" style={{ width: 320, height: '70vh' } as any}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: palette.textPrimary } as any}>
            Conversazioni
          </Text>
          <ScrollView style={{ flex: 1 } as any} showsVerticalScrollIndicator={false}>
            <VStack space="sm">
              {chatThreads.map((thread) => {
                const active = thread.id === activeThread;
                return (
                  <Pressable key={thread.id} onPress={() => setActiveThread(thread.id)}>
                    <Box
                      style={{
                        borderRadius: 16,
                        paddingLeft: 14,
                        paddingRight: 14,
                        paddingTop: 12,
                        paddingBottom: 12,
                        backgroundColor: active ? 'rgba(56,189,248,0.14)' : 'rgba(15,23,42,0.45)',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: active ? 'rgba(56,189,248,0.35)' : 'rgba(148,163,184,0.18)',
                      } as any}
                    >
                      <VStack space="xs">
                        <HStack className="justify-between items-center">
                          <Text style={{ fontWeight: '700', color: palette.textPrimary } as any}>
                            {thread.guest}
                          </Text>
                          {thread.unread > 0 && <StatusPill label={`${thread.unread} nuovi`} tone="warning" />}
                        </HStack>
                        <Text style={{ fontSize: 12, color: palette.textMuted } as any}>
                          {thread.lastMessagePreview}
                        </Text>
                        <HStack className="justify-between items-center">
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
                          <Text style={{ fontSize: 11, color: palette.textMuted } as any}>
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
        <VStack space="md" style={{ width: 520, height: '70vh' } as any}>
          <HStack className="justify-between items-center">
            <VStack>
              <Text style={{ fontSize: 18, fontWeight: '700', color: palette.textPrimary } as any}>
                {chatThreads.find((thread) => thread.id === activeThread)?.guest ?? 'Conversazione'}
              </Text>
              <Text style={{ fontSize: 13, color: palette.textMuted } as any}>
                {chatThreads.find((thread) => thread.id === activeThread)?.room}
              </Text>
            </VStack>
            <StatusPill label="IA co-pilot" tone="accent" />
          </HStack>
          <ScrollView style={{ flex: 1 } as any} showsVerticalScrollIndicator={false}>
            <VStack space="sm">
              {messages.map((message) => (
                <MessageBubble key={message.id} role={message.from} timestamp={message.timestamp}>
                  {message.content}
                </MessageBubble>
              ))}
            </VStack>
          </ScrollView>
          <HStack className="items-center" style={{ gap: 12 } as any}>
            <Input
              style={{ flex: 1, backgroundColor: 'rgba(8,15,28,0.65)', borderRadius: 20 } as any}
              variant="outline"
            >
              <InputField placeholder="Scrivi una risposta o chiedi supporto all'AI..." />
            </Input>
            <Box
              className="items-center justify-center"
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: 'rgba(56,189,248,0.2)',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'rgba(56,189,248,0.35)',
              } as any}
            >
              <SendHorizontal size={20} color={palette.accentPrimary} />
            </Box>
          </HStack>
        </VStack>
      </MetalGlassCard>

      <MetalGlassCard padding={16}>
        <VStack space="md" style={{ width: 260, height: '70vh' } as any}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: palette.textPrimary } as any}>
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
    <VStack style={{ alignItems: alignment, width: '100%' } as any}>
      <Box
        style={{
          maxWidth: '85%',
          borderRadius: 16,
          paddingLeft: 14,
          paddingRight: 14,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: bgColor,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'rgba(148,163,184,0.2)',
        } as any}
      >
        <Text style={{ fontSize: 14, color: textColor } as any}>
          {children}
        </Text>
      </Box>
      <Text style={{ fontSize: 11, color: palette.textMuted, marginTop: 4 } as any}>
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
      style={{
        borderRadius: 16,
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: 'rgba(15,23,42,0.5)',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(56,189,248,0.18)',
      } as any}
    >
      <VStack space="xs">
        <HStack space="xs" className="items-center">
          <ArrowUpCircle size={16} color={palette.accentPrimary} />
          <Text style={{ fontSize: 13, fontWeight: '600', color: palette.textPrimary } as any}>
            {title}
          </Text>
        </HStack>
        <Text style={{ fontSize: 12, color: palette.textSecondary } as any}>
          {description}
        </Text>
      </VStack>
    </Box>
  );
}

// Validazione: layout chat master-detail conforme, insight AI e notifiche evidenti.
