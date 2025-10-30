'use client';

import { ReactNode, useMemo, useState } from 'react';
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
import { AlertCircle, Bug, MessageSquare, Search, Send, Sparkles, Zap } from 'lucide-react-native';

export default function ChatPage() {
  const [activeThreadId, setActiveThreadId] = useState(chatThreads[0]?.id ?? '');
  const [composerMode, setComposerMode] = useState<'assistito' | 'manuale'>('assistito');
  const [viewMode, setViewMode] = useState<'ai' | 'debug'>('ai');
  const [draft, setDraft] = useState('');
  const activeThread = chatThreads.find((thread) => thread.id === activeThreadId);
  const guest = guests.find((item) => item.id === activeThread?.guestId);
  const suggestions = useMemo(() => activeThread?.aiSuggestions ?? [], [activeThread]);

  return (
    <GlassCard className="gap-6 border-white/10 bg-white/5">
      <SectionHeader
        title="Chat & notifiche AI"
        subtitle="Conversazioni centralizzate con assistente"
      />
      <HStack className="flex-col gap-6 2xl:flex-row">
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
                <HStack className="items-start justify-between">
                  <VStack className="gap-1">
                    <Text className="text-sm font-semibold text-white">{guestName(thread.guestId)}</Text>
                    <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      {thread.subject}
                    </Text>
                    <Text className="text-xs text-slate-400" numberOfLines={2}>
                      {thread.lastMessagePreview}
                    </Text>
                  </VStack>
                  <ChannelBadge channel={thread.channel} />
                </HStack>
                {thread.unread > 0 ? (
                  <Text className="mt-1 w-max rounded-full bg-rose-500/40 px-2 py-1 text-[10px] font-semibold text-rose-100">
                    {thread.unread} nuove
                  </Text>
                ) : null}
                {thread.requiresAttention ? (
                  <HStack className="items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1">
                    <AlertCircle color={palette.intent.warning} size={12} strokeWidth={1.5} />
                    <Text className="text-[10px] font-semibold text-amber-100">Serve intervento</Text>
                  </HStack>
                ) : null}
              </Pressable>
            ))}
          </VStack>
        </VStack>

        <GlassCard className="flex-1 gap-5 border-white/10 bg-[#101924]/70">
          <ConversationHeader
            guestName={guest?.name ?? 'Ospite'}
            subject={activeThread?.subject ?? ''}
            channel={activeThread?.channel ?? ''}
            attention={activeThread?.attentionReason}
          />
          <VStack className="gap-3">
            {activeThread?.messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.body}
                sender={message.sender}
                guestName={guestName(activeThread.guestId)}
              />
            ))}
          </VStack>
          <ComposerControls
            mode={composerMode}
            onModeChange={setComposerMode}
            draft={draft}
            onDraftChange={setDraft}
          />
        </GlassCard>

        <RightRail
          suggestions={suggestions}
          onSuggestionSelect={setDraft}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          debugLog={activeThread?.debugLog ?? []}
        />
      </HStack>
    </GlassCard>
  );
}

function guestName(guestId: string) {
  const guest = guests.find((item) => item.id === guestId);
  return guest?.name ?? 'Ospite';
}

function ChannelBadge({ channel }: { channel: string }) {
  return (
    <HStack className="items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1">
      <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-300">
        {channel}
      </Text>
    </HStack>
  );
}

function ConversationHeader({
  guestName,
  subject,
  channel,
  attention,
}: {
  guestName: string;
  subject: string;
  channel: string;
  attention?: string;
}) {
  return (
    <VStack className="gap-3">
      <HStack className="items-center justify-between">
        <VStack className="gap-1">
          <Text className="text-sm uppercase tracking-[0.3em] text-slate-500">In conversazione</Text>
          <Text className="text-lg font-semibold text-white">{guestName}</Text>
        </VStack>
        <HStack className="items-center gap-2">
          <ChannelBadge channel={channel} />
          <Text className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">{subject}</Text>
        </HStack>
      </HStack>
      {attention ? (
        <HStack className="items-center gap-2 rounded-2xl border border-amber-300/40 bg-amber-400/10 px-3 py-2">
          <AlertCircle color={palette.intent.warning} size={14} strokeWidth={1.5} />
          <Text className="text-xs text-amber-100">{attention}</Text>
        </HStack>
      ) : null}
    </VStack>
  );
}

function MessageBubble({
  sender,
  guestName,
  message,
}: {
  sender: 'guest' | 'ai' | 'staff';
  guestName: string;
  message: string;
}) {
  const isGuest = sender === 'guest';
  const isAi = sender === 'ai';
  return (
    <Box
      className={`max-w-xl rounded-2xl border border-white/10 px-4 py-3 ${
        isGuest ? 'self-start bg-white/5' : isAi ? 'self-end bg-emerald-500/20' : 'self-end bg-white/10'
      }`}
    >
      <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">
        {isGuest ? guestName : isAi ? 'Assistente AI' : 'Staff'}
      </Text>
      <Text className="text-sm text-slate-200">{message}</Text>
    </Box>
  );
}

function ComposerControls({
  mode,
  onModeChange,
  draft,
  onDraftChange,
}: {
  mode: 'assistito' | 'manuale';
  onModeChange: (mode: 'assistito' | 'manuale') => void;
  draft: string;
  onDraftChange: (value: string) => void;
}) {
  return (
    <VStack className="gap-3">
      <HStack className="items-center gap-2">
        <ComposerToggle label="Assistito AI" active={mode === 'assistito'} onPress={() => onModeChange('assistito')} />
        <ComposerToggle label="Manuale" active={mode === 'manuale'} onPress={() => onModeChange('manuale')} />
      </HStack>
      <HStack className="items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
        <MessageSquare color={palette.intent.accent} size={18} strokeWidth={1.5} />
        <Input className="flex-1" size="lg">
          <InputField
            placeholder="Scrivi risposta..."
            placeholderTextColor="rgba(226,232,240,0.6)"
            value={draft}
            onChangeText={onDraftChange}
          />
        </Input>
        <Button className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
          <ButtonText className="text-xs text-white">Invia</ButtonText>
        </Button>
        <Pressable className="rounded-full border border-white/10 bg-white/5 p-2">
          <Send color={palette.intent.accent} size={16} strokeWidth={1.4} />
        </Pressable>
      </HStack>
    </VStack>
  );
}

function ComposerToggle({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-2 rounded-full border px-3 py-1 ${
        active ? 'border-white/20 bg-white/10' : 'border-white/5 bg-transparent'
      }`}
    >
      <Sparkles color={palette.intent.accent} size={14} strokeWidth={1.4} />
      <Text className="text-xs text-slate-200">{label}</Text>
    </Pressable>
  );
}

function RightRail({
  suggestions,
  onSuggestionSelect,
  viewMode,
  onViewModeChange,
  debugLog,
}: {
  suggestions: string[];
  onSuggestionSelect: (value: string) => void;
  viewMode: 'ai' | 'debug';
  onViewModeChange: (mode: 'ai' | 'debug') => void;
  debugLog: string[];
}) {
  return (
    <GlassCard className="w-full max-w-sm gap-5 border-white/10 bg-white/5">
      <SectionHeader
        title="Co-pilot"
        subtitle="Suggerimenti rapidi e modalità debug"
      />
      <HStack className="items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
        <RailToggle
          label="Suggerimenti"
          icon={<Zap color={palette.intent.accent} size={14} strokeWidth={1.4} />}
          active={viewMode === 'ai'}
          onPress={() => onViewModeChange('ai')}
        />
        <RailToggle
          label="Debug"
          icon={<Bug color={palette.intent.accent} size={14} strokeWidth={1.4} />}
          active={viewMode === 'debug'}
          onPress={() => onViewModeChange('debug')}
        />
      </HStack>
      {viewMode === 'ai' ? (
        <VStack className="gap-3">
          {suggestions.map((suggestion) => (
            <Pressable
              key={suggestion}
              onPress={() => onSuggestionSelect(suggestion)}
              className="items-start gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
            >
              <Text className="text-sm text-slate-100">{suggestion}</Text>
              <Text className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Clicca per usare</Text>
            </Pressable>
          ))}
          {suggestions.length === 0 ? (
            <Text className="text-sm text-slate-300">Nessuna proposta per questa chat.</Text>
          ) : null}
        </VStack>
      ) : (
        <VStack className="gap-3">
          {debugLog.map((entry, index) => (
            <HStack
              key={`${entry}-${index}`}
              className="items-start gap-3 rounded-2xl border border-white/10 bg-[#101924]/70 px-3 py-3"
            >
              <Bug color={palette.intent.accent} size={16} strokeWidth={1.4} />
              <Text className="text-xs text-slate-200">{entry}</Text>
            </HStack>
          ))}
          {debugLog.length === 0 ? (
            <Text className="text-sm text-slate-300">Nessun log per questa conversazione.</Text>
          ) : null}
        </VStack>
      )}
    </GlassCard>
  );
}

function RailToggle({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: ReactNode;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 flex-row items-center justify-center gap-2 rounded-full px-3 py-2 ${
        active ? 'bg-white/10' : 'bg-transparent'
      }`}
    >
      {icon}
      <Text className="text-[11px] uppercase tracking-[0.3em] text-slate-200">{label}</Text>
    </Pressable>
  );
}
