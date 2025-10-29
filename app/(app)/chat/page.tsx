'use client';

import { useMemo, useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { inboxMessages } from '@/lib/mock-data';
import type { InboxMessage } from '@/lib/types';

const channelLabel: Record<string, string> = {
  email: 'Email',
  whatsapp: 'WhatsApp',
  booking: 'Booking.com',
  sms: 'SMS',
};

export default function ChatPage() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string>(inboxMessages[0]?.id ?? '');

  const filtered = useMemo(() => {
    return inboxMessages.filter((message) =>
      message.guestName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const selectedMessage = filtered.find((msg) => msg.id === selectedId) ?? filtered[0];

  return (
    <Box className="grid gap-6 pb-16 xl:grid-cols-[360px_1fr]">
      <Box className="glass-panel rounded-3xl px-6 py-5">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Conversazioni</Text>
        <Input
          placeholder="Cerca ospite"
          value={search}
          onChangeText={setSearch}
          className="mt-3 rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm text-primary-700"
        />
        <VStack space="sm" className="mt-4">
          {filtered.map((message) => (
            <button
              key={message.id}
              onClick={() => setSelectedId(message.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left ${
                selectedId === message.id
                  ? 'border-primary-400 bg-primary-50/80'
                  : 'border-white/15 bg-white/5 hover:border-primary-200/40'
              }`}
            >
              <Text className="text-sm font-semibold text-primary-900">{message.guestName}</Text>
              <Text className="text-xs uppercase tracking-[0.3em] text-primary-600/70">
                {channelLabel[message.channel]} • {message.receivedAt}
              </Text>
              <Text className="mt-1 text-xs text-typography-500" numberOfLines={2}>
                {message.summary}
              </Text>
            </button>
          ))}
        </VStack>
      </Box>

      {selectedMessage ? <ConversationPanel message={selectedMessage} /> : null}
    </Box>
  );
}

function ConversationPanel({ message }: { message: InboxMessage }) {
  return (
    <Box className="glass-panel flex h-full flex-col rounded-3xl px-8 py-8">
      <HStack className="items-start justify-between">
        <Box>
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">
            {channelLabel[message.channel]} • {message.receivedAt}
          </Text>
          <Text className="mt-2 text-2xl font-semibold text-primary-900">{message.guestName}</Text>
          <Text className="mt-1 text-sm text-typography-500">{message.context}</Text>
        </Box>
        <Button action="primary" size="md" className="rounded-full px-4">
          <Text className="text-sm font-semibold text-white">Trasferisci al collega</Text>
        </Button>
      </HStack>

      <Box className="mt-6 flex-1 rounded-3xl border border-white/15 bg-white/5 px-6 py-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Conversazione</Text>
        <VStack space="md" className="mt-4 text-sm text-typography-500">
          <Box>
            <Text className="font-semibold text-primary-900">Ospite</Text>
            <Text className="mt-1">{message.summary}</Text>
          </Box>
          <Box>
            <Text className="font-semibold text-primary-900">AI Concierge</Text>
            <Text className="mt-1 text-typography-400">
              Suggerimento → {message.aiSuggestedReply}
            </Text>
          </Box>
        </VStack>
      </Box>

      <Box className="mt-6 rounded-3xl border border-primary-100/60 bg-primary-50/60 px-6 py-5">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Suggerimenti AI</Text>
        <Text className="mt-2 text-sm text-typography-500">
          {message.aiSuggestedReply}
        </Text>
        <Text className="mt-2 text-xs text-typography-400">
          La risposta tiene conto delle preferenze note, dello stato del workflow e del sentiment della conversazione.
        </Text>
      </Box>

      <Box className="mt-6 rounded-3xl border border-white/15 bg-white/5 px-6 py-5">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Componi risposta</Text>
        <textarea
          className="mt-3 h-32 w-full rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm text-primary-700"
          defaultValue={message.aiSuggestedReply}
        />
        <HStack className="mt-3 items-center justify-between">
          <Text className="text-xs text-typography-400">Tono consigliato: Empatico & rassicurante</Text>
          <Button action="primary" size="md" className="rounded-full px-5">
            <Text className="text-sm font-semibold text-white">Invia risposta</Text>
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}

