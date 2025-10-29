'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { InputField } from '@/components/ui/input/input-field';
import { InputSlot } from '@/components/ui/input/input-slot';
import { InputIcon } from '@/components/ui/input/input-icon';
import { Pressable } from '@/components/ui/pressable';
import { Button, ButtonText } from '@/components/ui/button';
import { chatThreads, guests } from '@/lib/mock-data';
import { palette } from '@/theme/palette';
import { MessageSquare, Search, Send } from 'lucide-react-native';

export default function ChatPage() {
  const [activeThreadId, setActiveThreadId] = useState(chatThreads[0]?.id ?? '');
  const activeThread = chatThreads.find((thread) => thread.id === activeThreadId);
  const guest = guests.find((item) => item.id === activeThread?.guestId);

  return (
    <GlassCard className="gap-6 border-white/10 bg-white/5">
      <SectionHeader
        title="Chat & notifiche AI"
        subtitle="Conversazioni centralizzate con assistente"
      />
      <HStack className="flex-col gap-6 xl:flex-row">
        <VStack className="w-full max-w-xs gap-4">
          <Input className="rounded-2xl border-white/10 bg-white/5 px-4" size="lg">
            <InputSlot className="pl-3">
              <InputIcon>
                <Search color={palette.text.secondary} size={18} strokeWidth={1.6} />
              </InputIcon>
            </InputSlot>
            <InputField placeholder="Cerca conversazioni" placeholderTextColor="rgba(226,232,240,0.6)" />
          </Input>
          <VStack className="gap-3">
            {chatThreads.map((thread) => (
              <Pressable
                key={thread.id}
                onPress={() => setActiveThreadId(thread.id)}
                className={`gap-2 rounded-2xl border px-4 py-3 ${
                  activeThreadId === thread.id
                    ? 'border-white/15 bg-white/10'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <Text className="text-sm font-semibold text-white">{guestName(thread.guestId)}</Text>
                <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {thread.subject}
                </Text>
                <Text className="text-xs text-slate-400" numberOfLines={2}>
                  {thread.lastMessagePreview}
                </Text>
                {thread.unread > 0 ? (
                  <Text className="mt-1 w-max rounded-full bg-rose-500/40 px-2 py-1 text-[10px] font-semibold text-rose-100">
                    {thread.unread} nuove
                  </Text>
                ) : null}
              </Pressable>
            ))}
          </VStack>
        </VStack>

        <GlassCard className="flex-1 gap-4 border-white/10 bg-[#101924]/70">
          <HStack className="items-center justify-between">
            <VStack className="gap-1">
              <Text className="text-sm uppercase tracking-[0.3em] text-slate-500">In conversazione</Text>
              <Text className="text-lg font-semibold text-white">{guest?.name}</Text>
            </VStack>
            <Text className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">
              {activeThread?.subject}
            </Text>
          </HStack>
          <VStack className="gap-3">
            {activeThread?.messages.map((message) => (
              <Box
                key={message.id}
                className={`max-w-lg rounded-2xl border border-white/10 px-4 py-3 ${
                  message.sender === 'guest' ? 'self-start bg-white/5' : 'self-end bg-emerald-500/20'
                }`}
              >
                <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {message.sender === 'guest'
                    ? guestName(activeThread.guestId)
                    : message.sender === 'ai'
                    ? 'Assistente AI'
                    : 'Staff'}
                </Text>
                <Text className="text-sm text-slate-200">{message.body}</Text>
              </Box>
            ))}
          </VStack>
          <HStack className="items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <MessageSquare color={palette.intent.accent} size={18} strokeWidth={1.5} />
            <Input className="flex-1" size="lg">
              <InputField placeholder="Scrivi risposta..." placeholderTextColor="rgba(226,232,240,0.6)" />
            </Input>
            <Button className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
              <ButtonText className="text-xs text-white">Invia</ButtonText>
            </Button>
            <Pressable className="rounded-full border border-white/10 bg-white/5 p-2">
              <Send color={palette.intent.accent} size={16} strokeWidth={1.4} />
            </Pressable>
          </HStack>
        </GlassCard>
      </HStack>
    </GlassCard>
  );
}

function guestName(guestId: string) {
  const guest = guests.find((item) => item.id === guestId);
  return guest?.name ?? 'Ospite';
}
