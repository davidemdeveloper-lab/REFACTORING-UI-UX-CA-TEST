'use client';

import { useState } from 'react';
import { mockChats } from '@/components/data/mockData';
import { GlassCard } from '@/components/layout/GlassCard';
import { palette } from '@/design/palette';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/layout/UiIcon';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';

const mockMessages = {
  'chat-giovanni': [
    { from: 'AI Concierge', body: 'Ciao Giovanni, vuoi programmare il check-in digitale per domani?', time: '09:42' },
    { from: 'Giovanni Greco', body: 'Perfetto, potete verificare anche la temperatura della stanza?', time: '09:44' },
    { from: 'AI Concierge', body: 'Certo, ho impostato 21°C e notificato il team.', time: '09:45' },
  ],
  'chat-ai': [
    { from: 'AI Assistant', body: '3 richieste senza risposta. Suggerisco priorità a TripAdvisor.', time: '08:13' },
  ],
  'chat-antonio': [
    { from: 'Antonio Marino', body: 'Vorrei aggiungere il parcheggio coperto per il mio soggiorno.', time: '11:02' },
  ],
  'chat-booking': [
    { from: 'Booking.com', body: 'Nuova recensione pubblicata: 4.8/5', time: '07:55' },
  ],
};

export default function ChatPage() {
  const [selectedThread, setSelectedThread] = useState(mockChats.threads[0].id);
  const messages = mockMessages[selectedThread as keyof typeof mockMessages] ?? [];
  const thread = mockChats.threads.find((item) => item.id === selectedThread);

  return (
    <VStack space="lg">
      <HStack className="items-center justify-between">
        <VStack>
          <Text className="text-2xl font-semibold" style={{ color: palette.textPrimary }}>
            Chat & notifiche AI
          </Text>
          <Text className="text-sm" style={{ color: palette.textSecondary }}>
            Gestisci le conversazioni con gli ospiti, approva i suggerimenti dell’AI e monitora gli alert.
          </Text>
        </VStack>
        <GlassCard padding={12} gap={4} borderColor={palette.borderSoft}>
          <Text className="text-xs" style={{ color: palette.textSecondary }}>
            Non lette
          </Text>
          <Text className="text-lg font-semibold" style={{ color: palette.accentAlert }}>
            {mockChats.unread}
          </Text>
        </GlassCard>
      </HStack>
      <HStack className="flex-col gap-4 xl:flex-row">
        <GlassCard className="xl:w-80" style={{ maxHeight: 520, overflowY: 'auto' }}>
          <Input
            placeholder="Cerca conversazioni"
            className="mb-4 rounded-xl border px-4 py-3"
            style={{ backgroundColor: 'rgba(17, 24, 38, 0.65)', borderColor: palette.glassStroke }}
          />
          <VStack space="sm">
            {mockChats.threads.map((item) => {
              const isActive = item.id === selectedThread;
              return (
                <Pressable key={item.id} onPress={() => setSelectedThread(item.id)}>
                  <GlassCard
                    padding={14}
                    gap={4}
                    borderColor={isActive ? palette.borderHighlight : palette.borderSoft}
                    style={{
                      background: isActive ? 'rgba(96,214,255,0.16)' : 'rgba(5,17,30,0.35)',
                    }}
                  >
                    <HStack className="items-center justify-between">
                      <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                        {item.guest}
                      </Text>
                      <Icon name="ChevronRight" size={16} color={palette.textSecondary} />
                    </HStack>
                    <Text className="text-xs" style={{ color: palette.textSecondary }}>
                      {item.status}
                    </Text>
                    <Text className="text-xs" style={{ color: palette.textMuted }}>
                      {item.lastMessage}
                    </Text>
                  </GlassCard>
                </Pressable>
              );
            })}
          </VStack>
        </GlassCard>
        <GlassCard className="flex-1" style={{ minHeight: 520 }}>
          {thread ? (
            <VStack space="md" className="h-full">
              <HStack className="items-center justify-between">
                <VStack>
                  <Text className="text-lg font-semibold" style={{ color: palette.textPrimary }}>
                    {thread.guest}
                  </Text>
                  <Text className="text-xs" style={{ color: palette.textSecondary }}>
                    {thread.status}
                  </Text>
                </VStack>
                <Button
                  style={{
                    borderRadius: 14,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    background: 'transparent',
                    borderColor: palette.borderSoft,
                  }}
                >
                  <HStack space="sm" className="items-center">
                    <Icon name="Lightbulb" size={16} color={palette.accentPrimary} />
                    <Text className="text-xs" style={{ color: palette.textSecondary }}>
                      Suggerimento AI
                    </Text>
                  </HStack>
                </Button>
              </HStack>
              <Box
                className="flex-1 rounded-3xl p-6"
                style={{
                  background: 'rgba(6, 14, 25, 0.65)',
                  border: `1px solid ${palette.glassStroke}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {messages.map((message, index) => (
                  <GlassCard
                    key={`${message.time}-${index}`}
                    padding={12}
                    gap={4}
                    borderColor={message.from === 'AI Concierge' || message.from === 'AI Assistant'
                      ? palette.borderHighlight
                      : palette.borderSoft}
                    style={{
                      alignSelf:
                        message.from === 'AI Concierge' || message.from === 'AI Assistant' ? 'flex-end' : 'flex-start',
                      background:
                        message.from === 'AI Concierge' || message.from === 'AI Assistant'
                          ? 'rgba(96,214,255,0.18)'
                          : 'rgba(5,17,30,0.35)',
                    }}
                  >
                    <Text className="text-xs" style={{ color: palette.textMuted }}>
                      {message.from} · {message.time}
                    </Text>
                    <Text className="text-sm" style={{ color: palette.textSecondary }}>
                      {message.body}
                    </Text>
                  </GlassCard>
                ))}
              </Box>
              <HStack className="items-center gap-3">
                <Input
                  placeholder="Scrivi un messaggio o approva la proposta AI"
                  className="flex-1 rounded-xl border px-4 py-3"
                  style={{ backgroundColor: 'rgba(17, 24, 38, 0.65)', borderColor: palette.glassStroke }}
                />
                <Button
                  style={{
                    borderRadius: 14,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    background: palette.accentPrimary,
                    borderColor: palette.borderHighlight,
                  }}
                >
                  <HStack space="sm" className="items-center">
                    <Icon name="Send" size={16} color="#041320" />
                    <Text className="text-xs font-semibold" style={{ color: '#041320' }}>
                      Invia
                    </Text>
                  </HStack>
                </Button>
              </HStack>
            </VStack>
          ) : (
            <Text className="text-sm" style={{ color: palette.textSecondary }}>
              Seleziona una conversazione per iniziare.
            </Text>
          )}
        </GlassCard>
      </HStack>
    </VStack>
  );
}
