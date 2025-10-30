'use client';

import { useMemo, useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Icon } from '@/components/ui/icon';
import { chatThreads, clients } from '@/lib/data';
import { Sparkles } from 'lucide-react-native';

const channels: Record<string, { label: string; color: string }> = {
  email: { label: 'Email', color: 'bg-blue-500/30 text-blue-100' },
  whatsapp: { label: 'WhatsApp', color: 'bg-green-500/30 text-green-100' },
  booking: { label: 'Booking', color: 'bg-purple-500/30 text-purple-100' },
  internal: { label: 'AI', color: 'bg-[color:var(--accent-solid)]/20 text-[color:var(--accent-soft)]' },
};

export default function ChatPage() {
  const [activeThreadId, setActiveThreadId] = useState(chatThreads[0]?.id);
  const activeThread = useMemo(
    () => chatThreads.find((thread) => thread.id === activeThreadId) ?? chatThreads[0],
    [activeThreadId],
  );
  const client = clients.find((c) => c.id === activeThread?.clientId);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px,1fr,320px]">
      <div className="glass-panel flex h-[calc(100vh-220px)] flex-col overflow-hidden">
        <div className="border-b border-white/10 p-4">
          <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Conversazioni</Text>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <VStack space="md">
            {chatThreads.map((thread) => {
              const threadClient = clients.find((c) => c.id === thread.clientId);
              return (
              <button
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  thread.id === activeThread?.id
                    ? 'border-[color:var(--accent-solid)] bg-white/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <Text className="font-space-grotesk text-lg text-white">{thread.subject}</Text>
                <Text className="text-xs text-white/50">{threadClient?.name}</Text>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {thread.channelMix.map((channel) => (
                    <span key={channel} className={`rounded-full px-3 py-1 ${channels[channel].color}`}>
                      {channels[channel].label}
                    </span>
                  ))}
                  {thread.unreadCount > 0 && (
                    <span className="rounded-full bg-[color:var(--accent-solid)]/20 px-3 py-1 text-white">
                      {thread.unreadCount} nuovi
                    </span>
                  )}
                </div>
              </button>
              );
            })}
          </VStack>
        </div>
      </div>

      <div className="glass-panel flex h-[calc(100vh-220px)] flex-col">
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <Text className="font-space-grotesk text-2xl text-white">{activeThread?.subject}</Text>
            <Text className="text-xs text-white/50">{client?.name}</Text>
          </div>
          <HStack space="md">
            <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2">
              <Text className="text-xs text-white/70">Apri scheda cliente</Text>
            </Button>
            <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2">
              <Text className="text-xs text-white/70">Trasferisci a collega</Text>
            </Button>
          </HStack>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
          {activeThread?.messages.map((message) => (
            <div key={message.id} className={`flex ${message.author === 'guest' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-lg rounded-3xl border px-4 py-3 text-sm leading-relaxed ${
                message.author === 'guest'
                  ? 'border-white/10 bg-white/5 text-white/80'
                  : message.author === 'ai'
                    ? 'border-[color:var(--accent-solid)]/40 bg-[color:var(--accent-solid)]/10 text-[color:var(--accent-soft)]'
                    : 'border-white/10 bg-white/10 text-white'
              }`}>
                <Text className="text-xs uppercase tracking-[0.3em] text-white/40">
                  {message.channel.toUpperCase()} • {message.author.toUpperCase()}
                </Text>
                <Text className="mt-2 text-white/80">{message.content}</Text>
                {message.suggestions && (
                  <VStack space="sm" className="mt-3">
                    {message.suggestions.map((suggestion) => (
                      <Button
                        key={suggestion}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2"
                      >
                        <Text className="text-xs text-white/70">{suggestion}</Text>
                      </Button>
                    ))}
                  </VStack>
                )}
              </div>
            </div>
          ))}
        </div>
        <footer className="border-t border-white/10 px-6 py-4">
          <VStack space="md">
            <div className="flex items-center gap-3">
              <Badge className="rounded-full bg-[color:var(--accent-solid)]/20">
                <Text className="text-[color:var(--accent-soft)]">Modalità suggerimento</Text>
              </Badge>
              <Text className="text-xs text-white/60">
                L’AI analizza il contesto e propone tre alternative di risposta con tono personalizzato.
              </Text>
            </div>
            <Textarea
              placeholder="Scrivi o chiedi all’AI di aiutarti..."
              className="min-h-[120px] rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white"
            />
            <HStack space="md" className="justify-between">
              <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
                <HStack className="items-center gap-2">
                  <Icon as={Sparkles} size="sm" color="rgba(255,255,255,0.8)" />
                  <Text className="text-xs text-white/70">Suggerisci con AI</Text>
                </HStack>
              </Button>
              <Button className="rounded-full bg-[color:var(--accent-solid)] px-6 py-3">
                <Text className="text-xs text-background-950">Invia risposta</Text>
              </Button>
            </HStack>
          </VStack>
        </footer>
      </div>

      <div className="glass-panel hidden h-[calc(100vh-220px)] flex-col justify-between p-6 lg:flex">
        <div>
          <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Profilo rapido</Text>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">
            <Text className="font-space-grotesk text-lg text-white">{client?.name}</Text>
            <Text className="text-xs text-white/50">Loyalty {client?.loyaltyTier}</Text>
            <div className="mt-3 space-y-2 text-xs text-white/60">
              {client?.preferences.slice(0, 3).map((pref) => (
                <div key={pref}>• {pref}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">
          <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Azioni rapide</Text>
          <VStack space="sm" className="mt-3">
            <Button className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <Text className="text-xs text-white/70">Apri timeline prenotazione</Text>
            </Button>
            <Button className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <Text className="text-xs text-white/70">Richiedi intervento umano</Text>
            </Button>
            <Button className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <Text className="text-xs text-white/70">Crea nota personalizzata</Text>
            </Button>
          </VStack>
        </div>
      </div>
    </div>
  );
}
