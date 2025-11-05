// Scopo: gestire le conversazioni multicanale con assistenza AI e pannello cliente.
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipText } from '@/components/ui/tooltip';
import { ChatBubble } from '@/components/shared/chat-bubble';
import { CustomerPanel } from '@/components/shared/customer-panel';
import {
  useGetConversationByIdQuery,
  useGetConversationsQuery,
  useGetCustomerByIdQuery,
  useGetCustomersQuery,
  useGetNotesQuery,
} from '@/services/mockApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedConversationId } from '@/store/slices/uiSlice';
import { Conversation, Customer } from '@/types';
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Search,
  Send,
  Sparkles,
} from 'lucide-react-native';
import {
  channelIconMap,
  channelLabelMap,
  channelToneMap,
} from '@/constants/channels';

function ConversationRow({
  conversation,
  isActive,
  customerName,
  priorityReason,
  onPress,
}: {
  conversation: Conversation;
  isActive: boolean;
  customerName: string;
  priorityReason?: string;
  onPress: () => void;
}) {
  const channels = conversation.channels ?? [conversation.channel];
  const lastChatMessage = [...conversation.messages]
    .reverse()
    .find((message) => message.kind !== 'Suggestion');
  const preview = lastChatMessage?.content ?? conversation.subject;
  const lastMessageTime = lastChatMessage
    ? new Date(lastChatMessage.timestamp).toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;
  const unread = conversation.unread;
  const isPriority = conversation.priority === 'Alta';

  return (
    <Pressable onPress={onPress} className="w-full">
      <Box
        className={`relative mb-2 overflow-hidden rounded-3xl border px-4 py-4 transition-all duration-150 ${
          isActive
            ? 'border-[rgba(196,123,44,0.45)] bg-[rgba(196,123,44,0.08)] shadow-[0_12px_28px_rgba(36,30,18,0.12)]'
            : unread
            ? 'border-[rgba(196,123,44,0.25)] bg-[rgba(196,123,44,0.12)]'
            : 'border-transparent bg-[var(--color-background)] hover:border-[var(--color-border)]'
        }`}
      >
        {unread ? (
          <Box className="absolute left-0 top-0 h-full w-[6px] bg-[var(--color-primary-600)]" />
        ) : null}
        <VStack space="xs">
          <HStack className="items-start justify-between gap-3">
            <VStack className="flex-1 gap-1">
              <HStack className="items-center gap-2">
                <Text
                  className={`text-sm font-semibold ${
                    unread
                      ? 'text-[var(--color-neutral-900)]'
                      : 'text-[var(--color-neutral-700)]'
                  }`}
                >
                  {customerName}
                </Text>
                {unread ? (
                  <Box className="h-2 w-2 rounded-full bg-[var(--color-primary-600)]" />
                ) : null}
              </HStack>
              <Text className="text-xs text-[var(--color-neutral-500)] line-clamp-2">
                {preview}
              </Text>
            </VStack>
            <VStack className="items-end gap-2">
              {lastMessageTime ? (
                <Text className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-neutral-400)]">
                  {lastMessageTime}
                </Text>
              ) : null}
              <HStack className="items-center gap-1">
                {channels.map((channel) => {
                  const Icon = channelIconMap[channel];
                  const channelTone = channelToneMap[channel];
                  return (
                    <Tooltip
                      key={`${conversation.id}-${channel}`}
                      placement="top"
                      trigger={(triggerProps) => (
                        <Pressable
                          {...triggerProps}
                          className={`h-7 w-7 items-center justify-center rounded-full border ${channelTone.background} ${channelTone.border}`}
                        >
                          <Icon size={14} color={channelTone.iconColor} strokeWidth={2} />
                        </Pressable>
                      )}
                    >
                      <TooltipContent>
                        <TooltipText>{`Messaggi ${channelLabelMap[channel]}`}</TooltipText>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </HStack>
            </VStack>
          </HStack>
          {priorityReason ? (
            <Text className="text-[11px] text-[var(--color-neutral-500)]">
              {priorityReason}
            </Text>
          ) : null}
          {isPriority ? (
            <HStack className="items-center gap-1">
              <AlertCircle size={14} color="#be123c" strokeWidth={2} />
              <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-[#be123c]">
                Alta attenzione
              </Text>
            </HStack>
          ) : null}
        </VStack>
      </Box>
    </Pressable>
  );
}

export default function ChatPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: conversations = [] } = useGetConversationsQuery();
  const selectedConversationId = useAppSelector(
    (state) => state.ui.selectedConversationId
  );
  const { data: conversation } = useGetConversationByIdQuery(
    selectedConversationId ?? '',
    {
      skip: !selectedConversationId,
    }
  );
  const { data: customer } = useGetCustomerByIdQuery(
    conversation?.customerId ?? '',
    {
      skip: !conversation,
    }
  );
  const { data: customerNotes = [] } = useGetNotesQuery(
    conversation
      ? { target: 'Customer', targetId: conversation.customerId }
      : undefined
  );
  const { data: customers = [] } = useGetCustomersQuery();

  // fallback for names
  const customerMetaMap = useMemo(() => {
    const map: Record<
      string,
      {
        name: string;
        priorityReason?: string;
      }
    > = {};
    customers.forEach((item) => {
      map[item.id] = {
        name: `${item.firstName} ${item.lastName}`,
        priorityReason: item.priorityReason,
      };
    });
    if (customer) {
      map[customer.id] = {
        name: `${customer.firstName} ${customer.lastName}`,
        priorityReason: customer.priorityReason,
      };
    }
    return map;
  }, [customers, customer]);

  useEffect(() => {
    if (!selectedConversationId && conversations.length > 0) {
      dispatch(setSelectedConversationId(conversations[0].id));
    }
  }, [conversations, dispatch, selectedConversationId]);

  const [draftMessage, setDraftMessage] = useState('');
  const [isListCollapsed, setIsListCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return conversations;
    }
    return conversations.filter((item) => {
      const customerName =
        customerMetaMap[item.customerId]?.name?.toLowerCase() ?? '';
      return (
        customerName.includes(query) || item.subject.toLowerCase().includes(query)
      );
    });
  }, [conversations, customerMetaMap, searchTerm]);

  const chatMessages = useMemo(
    () =>
      conversation
        ? conversation.messages.filter((message) => message.kind !== 'Suggestion')
        : [],
    [conversation]
  );

  const assistantSuggestions = useMemo(
    () =>
      conversation
        ? conversation.messages.filter((message) => message.kind === 'Suggestion')
        : [],
    [conversation]
  );

  const conversationChannels = conversation
    ? conversation.channels ?? [conversation.channel]
    : [];

  const unreadCount = useMemo(
    () => conversations.filter((item) => item.unread).length,
    [conversations]
  );

  const handleAddSuggestion = (suggestion: string) => {
    setDraftMessage((prev) => (prev ? `${prev}\n${suggestion}` : suggestion));
  };

  return (
    <Box className="pb-12">
      <HStack className="items-start gap-6">
        {isListCollapsed ? (
          <Box className="flex h-[78vh] w-[76px] flex-col items-center justify-between rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] py-6 shadow-[var(--shadow-card)]">
            <Pressable
              onPress={() => setIsListCollapsed(false)}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] p-2"
            >
              <ChevronRight size={18} color="#c47b2c" strokeWidth={2} />
            </Pressable>
            <VStack space="md" className="items-center">
              <Box className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(196,123,44,0.15)]">
                <MessageCircle size={20} color="#c47b2c" strokeWidth={2} />
              </Box>
              <Text className="text-[11px] text-center font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
                Chat
              </Text>
              <Text className="text-xs text-center text-[var(--color-neutral-500)]">
                {unreadCount} da leggere
              </Text>
            </VStack>
            <Box className="rounded-full bg-[rgba(196,123,44,0.12)] px-3 py-1">
              <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-primary-600)]">
                {conversations.length}
              </Text>
            </Box>
          </Box>
        ) : (
          <Box className="flex h-[78vh] w-[320px] flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 shadow-[var(--shadow-card)]">
            <HStack className="items-start justify-between gap-4">
              <Box>
                <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
                  Conversazioni
                </Text>
                <Text className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
                  Chat unificata · Booking · Email · WhatsApp
                </Text>
              </Box>
              <Pressable
                onPress={() => setIsListCollapsed(true)}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] p-2"
              >
                <ChevronLeft size={16} color="#c47b2c" strokeWidth={2} />
              </Pressable>
            </HStack>
            <VStack space="md" className="mt-5">
              <Input
                variant="rounded"
                size="lg"
                className="rounded-full border-[var(--color-border)] bg-[var(--color-background)]"
              >
                <InputSlot className="pl-4">
                  <InputIcon as={Search} size="lg" color="#c47b2c" />
                </InputSlot>
                <InputField
                  placeholder="Cerca conversazioni o clienti..."
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
              </Input>
              <Button
                size="sm"
                variant="outline"
                action="primary"
                className="w-fit rounded-full border-[var(--color-primary-600)] bg-transparent px-4 py-2"
                onPress={() => router.push('/templates')}
              >
                <HStack className="items-center gap-2">
                  <Sparkles size={16} color="#c47b2c" strokeWidth={2} />
                  <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                    Nuovo microflusso
                  </Text>
                </HStack>
              </Button>
            </VStack>
            <VStack space="sm" className="mt-5 flex-1 overflow-y-auto pr-1">
              {filteredConversations.map((item) => (
                <ConversationRow
                  key={item.id}
                  conversation={item}
                  isActive={item.id === selectedConversationId}
                  customerName={
                    customerMetaMap[item.customerId]?.name ?? 'Cliente'
                  }
                  priorityReason={customerMetaMap[item.customerId]?.priorityReason}
                  onPress={() => dispatch(setSelectedConversationId(item.id))}
                />
              ))}
              {filteredConversations.length === 0 ? (
                <Box className="rounded-2xl border border-dashed border-[var(--color-border)] px-4 py-4">
                  <Text className="text-xs text-[var(--color-neutral-500)]">
                    Nessuna conversazione trovata per la ricerca.
                  </Text>
                </Box>
              ) : null}
            </VStack>
          </Box>
        )}

        <Box className="flex min-h-[78vh] flex-1 flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 shadow-[var(--shadow-card)]">
          {conversation && customer ? (
            <Box className="flex h-full flex-col gap-6">
              <HStack className="flex-wrap items-start justify-between gap-4">
                <Box className="min-w-[220px]">
                  <Text className="text-2xl font-semibold text-[var(--color-neutral-900)]">
                    {customer.firstName} {customer.lastName}
                  </Text>
                  <HStack className="mt-3 flex-wrap items-center gap-2">
                    {conversation.priority === 'Alta' ? (
                      <Badge
                        size="sm"
                        action="muted"
                        className="rounded-full bg-[rgba(236,69,90,0.16)] px-3 py-1 text-xs font-semibold text-[#be123c]"
                      >
                        <HStack className="items-center gap-1">
                          <AlertCircle size={14} color="#be123c" strokeWidth={2} />
                          <Text className="text-xs font-semibold text-[#be123c] uppercase tracking-[0.2em]">
                            Alta attenzione
                          </Text>
                        </HStack>
                      </Badge>
                    ) : null}
                    {conversationChannels.map((channel) => {
                      const Icon = channelIconMap[channel];
                      const tone = channelToneMap[channel];
                      return (
                        <Tooltip
                          key={`${conversation.id}-header-${channel}`}
                          placement="top"
                          trigger={(triggerProps) => (
                            <Pressable
                              {...triggerProps}
                              className={`h-8 w-8 items-center justify-center rounded-full border ${tone.background} ${tone.border}`}
                            >
                              <Icon size={16} color={tone.iconColor} strokeWidth={2} />
                            </Pressable>
                          )}
                        >
                          <TooltipContent>
                            <TooltipText>{`Messaggi ${channelLabelMap[channel]}`}</TooltipText>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </HStack>
                  {customer.priorityReason ? (
                    <Text className="mt-3 text-sm text-[var(--color-neutral-600)]">
                      {customer.priorityReason}
                    </Text>
                  ) : null}
                </Box>
                <Box className="items-end">
                  <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-500)]">
                    Stato chat
                  </Text>
                  <Text className="mt-2 text-sm font-semibold text-[var(--color-neutral-700)]">
                    {conversation.unread ? 'Messaggi da leggere' : 'Conversazione aggiornata'}
                  </Text>
                  <Text className="mt-1 text-xs text-[var(--color-neutral-500)]">
                    Ultimo aggiornamento ·{' '}
                    {new Date(conversation.lastMessageAt).toLocaleTimeString('it-IT', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </Box>
              </HStack>
              <ConversationContext customer={customer} />
              <Box className="flex flex-1 flex-col overflow-hidden">
                <Box className="flex-1 overflow-y-auto pr-3">
                  <VStack space="md">
                    {chatMessages.map((message) => (
                      <ChatBubble key={message.id} message={message} />
                    ))}
                  </VStack>
                </Box>
                <Box className="mt-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4">
                  {assistantSuggestions.length > 0 ? (
                    <Box className="mb-4 rounded-2xl border border-dashed border-[rgba(196,123,44,0.35)] bg-[rgba(196,123,44,0.08)] px-4 py-4">
                      <HStack className="items-center gap-2">
                        <Sparkles size={18} color="#c47b2c" strokeWidth={2} />
                        <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary-600)]">
                          Suggerimenti AI
                        </Text>
                      </HStack>
                      <VStack space="sm" className="mt-3">
                        {assistantSuggestions.map((suggestion) => {
                          const SuggestionIcon = channelIconMap[suggestion.channel];
                          const tone = channelToneMap[suggestion.channel];
                          return (
                            <Box
                              key={suggestion.id}
                              className="rounded-2xl bg-[rgba(255,255,255,0.85)] px-4 py-3"
                            >
                              <HStack className="items-start justify-between gap-3">
                                <Text className="flex-1 text-sm font-semibold text-[var(--color-neutral-900)]">
                                  {suggestion.content}
                                </Text>
                                <Tooltip
                                  placement="top"
                                  trigger={(triggerProps) => (
                                    <Pressable
                                      {...triggerProps}
                                      className={`h-8 w-8 items-center justify-center rounded-full border ${tone.background} ${tone.border}`}
                                    >
                                      <SuggestionIcon
                                        size={16}
                                        color={tone.iconColor}
                                        strokeWidth={2}
                                      />
                                    </Pressable>
                                  )}
                                >
                                  <TooltipContent>
                                    <TooltipText>{`Suggerimento per ${channelLabelMap[suggestion.channel]}`}</TooltipText>
                                  </TooltipContent>
                                </Tooltip>
                              </HStack>
                              {suggestion.suggestions && suggestion.suggestions.length > 0 ? (
                                <HStack className="mt-3 flex-row flex-wrap gap-2">
                                  {suggestion.suggestions.map((option) => (
                                    <Button
                                      key={`${suggestion.id}-${option}`}
                                      size="sm"
                                      variant="outline"
                                      action="default"
                                      className="rounded-full border-[var(--color-border)] bg-[var(--color-surface)] px-3"
                                      onPress={() => handleAddSuggestion(option)}
                                    >
                                      <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                                        {option}
                                      </Text>
                                    </Button>
                                  ))}
                                </HStack>
                              ) : null}
                            </Box>
                          );
                        })}
                      </VStack>
                    </Box>
                  ) : null}
                  <Textarea>
                    <TextareaInput
                      multiline
                      placeholder="Scrivi una risposta o modifica un suggerimento AI..."
                      value={draftMessage}
                      onChangeText={setDraftMessage}
                      className="min-h-[100px]"
                    />
                  </Textarea>
                  <HStack className="mt-3 flex-row flex-wrap items-center justify-between gap-3">
                    <Text className="text-xs text-[var(--color-neutral-500)]">
                      Premi Invio per inviare oppure personalizza prima il messaggio.
                    </Text>
                    <Pressable
                      onPress={() => setDraftMessage('')}
                      className="h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary-600)]"
                    >
                      <Send size={18} color="#ffffff" strokeWidth={2} />
                    </Pressable>
                  </HStack>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box className="flex h-full items-center justify-center">
              <Text className="text-sm text-[var(--color-neutral-600)]">
                Seleziona una conversazione per iniziare.
              </Text>
            </Box>
          )}
        </Box>

        {customer ? (
          <Box className="h-[78vh] w-full max-w-[320px] overflow-hidden">
          <CustomerPanel
            customer={customer}
            notes={customerNotes}
            onAddNote={() => router.push('/notes')}
            onOpenCustomer={() => router.push(`/customers/${customer.id}`)}
            showTimeline={false}
            showBookings={false}
            showNotes={false}
            variant="compact"
          />
          </Box>
        ) : null}
      </HStack>
    </Box>
  );
}

// mock: conversationsMock, chatQuickActionsMock, customersMock, notesMock
// actions: sendChatMessage(conversationId, payload), escalateToTeam(conversationId)
// assumptions: selezione conversazione gestita via uiSlice e mock; invio messaggi ancora mock

function ConversationContext({ customer }: { customer: Customer }) {
  return (
    <Box className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-5">
      <HStack className="flex-wrap items-stretch gap-6">
        <ContextMetric label="Ultimo evento" value={customer.ultimoEvento} />
        <ContextMetric label="Prossimo invio" value={customer.prossimoInvio} />
        <ContextMetric
          label="Stato comunicazione"
          value={customer.statoComunicazione}
        />
      </HStack>
    </Box>
  );
}

function ContextMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <VStack space="xs" className="min-w-[160px] flex-1">
      <Text className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-500)]">
        {label}
      </Text>
      <Text className="text-sm font-semibold text-[var(--color-neutral-800)]">
        {value}
      </Text>
    </VStack>
  );
}
