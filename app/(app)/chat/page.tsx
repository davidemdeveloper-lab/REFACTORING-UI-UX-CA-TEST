'use client';

import { useMemo, useState } from 'react';
import { chatThreads } from '@/lib/mock-data';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassPanel } from '@/components/app/glass-panel';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { ScrollView } from '@/components/ui/scroll-view';
import { MessageCircle, Sparkles, Send, Filter } from '@/components/icons';

export default function ChatPage() {
  const [activeThreadId, setActiveThreadId] = useState(chatThreads[0]?.id);
  const activeThread = useMemo(
    () => chatThreads.find((thread) => thread.id === activeThreadId) ?? chatThreads[0],
    [activeThreadId]
  );

  return (
    <GlassPanel
      title="Chat & AI Assistant"
      subtitle="Master-detail per gestire richieste in tempo reale con supporto AI."
      className="h-full"
    >
      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Box className="rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur-xl">
          <Box className="flex flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-typography-0">
              Conversazioni
            </Text>
            <Button variant="outline" action="secondary" className="border-white/15 px-3">
              <ButtonIcon as={Filter} />
              <ButtonText className="text-typography-100">Filtri</ButtonText>
            </Button>
          </Box>
          <ScrollView className="mt-4" style={{ maxHeight: 560 }}>
            <Box className="flex flex-col gap-3">
              {chatThreads.map((thread) => (
                <Box
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 transition ${
                    thread.id === activeThreadId
                      ? 'border-primary-400 bg-primary-500/20'
                      : 'border-white/10 bg-black/10 hover:bg-white/10'
                  }`}
                >
                  <Box className="flex flex-row items-center justify-between">
                    <Text className="text-sm font-semibold text-typography-0">
                      {thread.guestName}
                    </Text>
                    {thread.unread > 0 && (
                      <Badge className="rounded-full bg-accent-500/40 px-2 py-0.5 text-[10px] text-accent-100">
                        {thread.unread}
                      </Badge>
                    )}
                  </Box>
                  <Text className="text-xs text-typography-400">
                    Camera {thread.room} • {thread.channel}
                  </Text>
                  <Text className="mt-2 text-xs text-typography-200">
                    {thread.lastMessage}
                  </Text>
                  <Text className="mt-1 text-[10px] uppercase tracking-[0.3em] text-typography-400">
                    {thread.timestamp}
                  </Text>
                </Box>
              ))}
            </Box>
          </ScrollView>
        </Box>
        <Box className="lg:col-span-2 rounded-3xl border border-white/10 bg-black/15 p-5 backdrop-blur-xl">
          <Box className="flex flex-row items-center justify-between">
            <Box>
              <Text className="text-lg font-semibold text-typography-0">
                {activeThread?.guestName}
              </Text>
              <Text className="text-xs text-typography-300">
                Camera {activeThread?.room} • VIP {activeThread?.vip ? 'sì' : 'no'}
              </Text>
            </Box>
            <Badge className="rounded-full bg-primary-500/20 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-primary-100">
              AI assist
            </Badge>
          </Box>
          <ScrollView className="mt-4 rounded-3xl border border-white/5 bg-black/20 p-4" style={{ maxHeight: 420 }}>
            <Box className="flex flex-col gap-4">
              {activeThread?.messages.map((message) => (
                <Box
                  key={message.id}
                  className={`flex flex-col gap-1 rounded-2xl px-4 py-3 ${
                    message.sender === 'hotel'
                      ? 'self-end bg-primary-500/20'
                      : message.sender === 'ai'
                      ? 'bg-success-500/15'
                      : 'bg-white/10'
                  }`}
                >
                  <Text className="text-xs uppercase tracking-[0.3em] text-typography-300">
                    {message.sender.toUpperCase()} • {message.timestamp}
                  </Text>
                  <Text className="text-sm text-typography-0">{message.body}</Text>
                </Box>
              ))}
            </Box>
          </ScrollView>
          <Box className="mt-4 flex flex-col gap-3">
            <textarea
              className="min-h-[110px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-typography-0 placeholder:text-typography-500 focus:border-primary-400 focus:outline-none"
              placeholder="Scrivi una risposta assistita dall'AI"
            />
            <Box className="flex flex-wrap items-center justify-between gap-3">
              <Box className="flex items-center gap-2 text-xs text-typography-400">
                <Icon as={MessageCircle} size="sm" className="text-info-200" />
                <Text>Risposta entro 2 minuti migliora la soddisfazione del 35%.</Text>
              </Box>
              <Box className="flex flex-row gap-2">
                <Button variant="outline" action="secondary" className="border-white/15 px-4">
                  <ButtonIcon as={Sparkles} />
                  <ButtonText className="text-typography-100">Suggerisci con AI</ButtonText>
                </Button>
                <Button action="primary" className="bg-primary-500/30 px-4">
                  <ButtonIcon as={Send} />
                  <ButtonText className="text-typography-0">Invia</ButtonText>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </GlassPanel>
  );
}

// Validazione: chat master-detail con AI assist e lista conversazioni notifiche.
