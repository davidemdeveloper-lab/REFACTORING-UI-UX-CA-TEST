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
import { ChatBubble } from '@/components/shared/chat-bubble';
import { CustomerPanel } from '@/components/shared/customer-panel';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipText } from '@/components/ui/tooltip';
import {
  useGetChatQuickActionsQuery,
  useGetConversationByIdQuery,
  useGetConversationsQuery,
  useGetCustomerByIdQuery,
  useGetCustomersQuery,
  useGetNotesQuery,
} from '@/services/mockApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedConversationId } from '@/store/slices/uiSlice';
import {
  Conversation,
  ConversationChannel,
  ChatMessage,
  QuickAction,
} from '@/types';
import {
  CalendarCheck,
  Mail,
  MessageCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Send,
  Sparkles,
} from 'lucide-react-native';

const channelMeta: Record<
  ConversationChannel,
  { icon: typeof CalendarCheck; color: string; background: string; description: string }
> = {
  Booking: {
    icon: CalendarCheck,
    color: '#1d4ed8',
    background: 'bg-[rgba(59,130,246,0.14)]',
    description: 'Messaggi Booking',
  },
  Email: {
    icon: Mail,
    color: '#0f172a',
    background: 'bg-[rgba(148,163,184,0.22)]',
    description: 'Messaggi Email',
  },
  WhatsApp: {
    icon: MessageCircle,
    color: '#15803d',
    background: 'bg-[rgba(22,163,74,0.22)]',
    description: 'Messaggi WhatsApp',
  },
};

const panelHeightClass = 'h-[72vh]';

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function ChannelGlyph({
  channel,
  size = 'md',
}: {
  channel: ConversationChannel;
  size?: 'sm' | 'md';
}) {
  const meta = channelMeta[channel];
  const padding = size === 'md' ? 'p-1.5' : 'p-1';
  const iconSize = size === 'md' ? 16 : 14;

  return (
    <Tooltip placement="top">
      <Tooltip.Trigger>
        <Box className={`rounded-full ${padding} ${meta.background}`}>
          <meta.icon size={iconSize} color={meta.color} strokeWidth={2} />
        </Box>
      </Tooltip.Trigger>
      <TooltipContent className="border border-[var(--color-border)] bg-[var(--color-surface)]">
        <TooltipText size="sm" className="text-[var(--color-neutral-900)]">
          {meta.description}
        </TooltipText>
      </TooltipContent>
    </Tooltip>
  );
}

function ConversationRow({
  conversation,
  isActive,
  customerName,
  onPress,
}: {
  conversation: Conversation;
  isActive: boolean;
  customerName: string;
  onPress: () => void;
}) {
  const lastVisibleMessage = useMemo(
    () =>
      [...conversation.messages]
        .filter((message) => message.type !== 'suggestion')
        .at(-1),
    [conversation.messages]
  );
  const unread = conversation.unread;

  const containerClass = isActive
    ? 'border-[rgba(196,123,44,0.45)] bg-[rgba(196,123,44,0.12)] shadow-[0_12px_32px_rgba(36,30,18,0.12)]'
    : unread
      ? 'border-[rgba(196,123,44,0.35)] bg-[rgba(196,123,44,0.08)]'
      : 'border-[var(--color-border)] bg-[var(--color-background)] hover:border-[rgba(196,123,44,0.35)]';

  return (
    <Pressable onPress={onPress} className="w-full">
      <Box
        className={`rounded-3xl border px-4 py-4 transition-all duration-150 ${containerClass}`}
      >
        <VStack space="sm">
          <HStack className="items-start justify-between gap-3">
            <VStack space="xs">
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
                {conversation.priority === 'Alta' ? (
                  <Badge
                    size="sm"
                    action="muted"
                    className="rounded-full bg-[rgba(236,69,90,0.16)] px-3 py-1 text-xs font-semibold text-[#be123c]"
                  >
                    <HStack className="items-center gap-1">
                      <AlertCircle size={12} color="#be123c" strokeWidth={2} />
                      <Text className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#be123c]">
                        Alta attenzione
                      </Text>
                    </HStack>
                  </Badge>
                ) : null}
              </HStack>
              <HStack className="items-center gap-1">
                {conversation.channels.map((channel) => (
                  <ChannelGlyph key={`${conversation.id}-${channel}`} channel={channel} size="sm" />
                ))}
              </HStack>
            </VStack>
            <VStack className="items-end gap-2">
              {unread ? (
                <Box className="h-2 w-2 rounded-full bg-[var(--color-primary-600)]" />
              ) : null}
              <Text className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-neutral-500)]">
                {formatTime(conversation.lastMessageAt)}
              </Text>
            </VStack>
          </HStack>
          <Text
            className={`text-xs leading-5 ${
              unread
                ? 'font-semibold text-[var(--color-neutral-900)]'
                : 'text-[var(--color-neutral-600)]'
            } max-h-[3.2rem] overflow-hidden`}
          >
            {lastVisibleMessage?.content ?? conversation.subject}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
}

type SuggestionGroup = {
  id: string;
  message: ChatMessage;
};

type SuggestionChip = {
  id: string;
  label: string;
  sourceId: string;
};

export default function ChatPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: conversations = [] } = useGetConversationsQuery();
  const { data: quickActions = [] } = useGetChatQuickActionsQuery();
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

  const customerMetaMap = useMemo(() => {
    const map: Record<
      string,
      {
        name: string;
      }
    > = {};
    customers.forEach((item) => {
      map[item.id] = {
        name: `${item.firstName} ${item.lastName}`,
      };
    });
    if (customer) {
      map[customer.id] = {
        name: `${customer.firstName} ${customer.lastName}`,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredConversations = useMemo(() => {
    if (!normalizedSearch) {
      return conversations;
    }
    return conversations.filter((item) => {
      const name = customerMetaMap[item.customerId]?.name ?? '';
      return (
        name.toLowerCase().includes(normalizedSearch) ||
        item.subject.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [conversations, customerMetaMap, normalizedSearch]);

  const visibleMessages = useMemo(
    () =>
      conversation
        ? conversation.messages.filter((message) => message.type !== 'suggestion')
        : [],
    [conversation]
  );

  const suggestionGroups = useMemo<SuggestionGroup[]>(() => {
    if (!conversation) {
      return [];
    }
    return conversation.messages
      .filter((message) => message.author === 'AI' && message.type === 'suggestion')
      .map((message) => ({ id: message.id, message }));
  }, [conversation]);

  const quickActionChips = useMemo<SuggestionChip[]>(() => {
    return quickActions.map((action: QuickAction, index) => ({
      id: `${action.id}-${index}`,
      label: action.label,
      sourceId: action.id,
    }));
  }, [quickActions]);

  const handleSuggestionClick = (value: string) => {
    setDraftMessage((prev) => (prev ? `${prev}\n${value}` : value));
  };

  return (
    <Box className="pb-16">
      <HStack className="items-start gap-6">
        <Box
          className={`flex shrink-0 flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] transition-all duration-300 ${
            isCollapsed ? 'w-[88px] px-3 py-5' : 'w-[320px] px-5 py-5'
          } ${panelHeightClass}`}
        >
          <HStack className="items-center justify-between gap-3">
            {!isCollapsed ? (
              <Box>
                <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
                  Conversazioni
                </Text>
                <Text className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
                  Chat unificata
                </Text>
              </Box>
            ) : (
              <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
                Conversazioni
              </Text>
            )}
            <Button
              size="sm"
              variant="outline"
              action="default"
              className="rounded-full border-[var(--color-border)] bg-transparent p-2"
              onPress={() => setIsCollapsed((prev) => !prev)}
            >
              {isCollapsed ? (
                <ChevronRight size={16} color="#0f172a" strokeWidth={2} />
              ) : (
                <ChevronLeft size={16} color="#0f172a" strokeWidth={2} />
              )}
            </Button>
          </HStack>

          {!isCollapsed ? (
            <>
              <VStack space="md" className="mt-5">
                <Input variant="rounded" size="md" className="border-[var(--color-border)]">
                  <InputSlot className="pl-3">
                    <Search size={16} color="#64748b" strokeWidth={2} />
                  </InputSlot>
                  <InputField
                    placeholder="Cerca cliente o conversazione"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    className="text-sm"
                  />
                </Input>
                <Button
                  size="sm"
                  action="primary"
                  className="rounded-full bg-[var(--color-primary-600)] px-4"
                  onPress={() => router.push('/templates')}
                >
                  <Text className="text-xs font-semibold text-white">
                    Nuovo microflusso
                  </Text>
                </Button>
              </VStack>

              <VStack
                space="sm"
                className="mt-5 flex-1 overflow-y-auto pr-1"
              >
                {filteredConversations.map((item) => (
                  <ConversationRow
                    key={item.id}
                    conversation={item}
                    isActive={item.id === selectedConversationId}
                    customerName={customerMetaMap[item.customerId]?.name ?? 'Cliente'}
                    onPress={() => dispatch(setSelectedConversationId(item.id))}
                  />
                ))}
              </VStack>
            </>
          ) : (
            <Box className="mt-10 flex flex-1 flex-col items-center justify-start gap-6">
              {filteredConversations.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => dispatch(setSelectedConversationId(item.id))}
                >
                  <Box
                    className={`rounded-full border border-[var(--color-border)] px-3 py-3 ${
                      item.id === selectedConversationId
                        ? 'bg-[rgba(196,123,44,0.15)]'
                        : 'bg-[var(--color-background)]'
                    }`}
                  >
                    <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
                      {customerMetaMap[item.customerId]?.name.split(' ')[0] ?? 'Cliente'}
                    </Text>
                  </Box>
                </Pressable>
              ))}
            </Box>
          )}
        </Box>

        <Box
          className={`flex min-w-0 flex-[2.2] flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 shadow-[var(--shadow-card)] ${panelHeightClass}`}
        >
          {conversation && customer ? (
            <Box className="flex h-full flex-col gap-6">
              <HStack className="flex-wrap items-center justify-between gap-4">
                <Box>
                  <Text className="text-xl font-semibold text-[var(--color-neutral-900)]">
                    {customer.firstName} {customer.lastName}
                  </Text>
                  <HStack className="mt-2 flex-wrap items-center gap-2">
                    <HStack className="items-center gap-1">
                      {conversation.channels.map((channel) => (
                        <ChannelGlyph key={`${conversation.id}-header-${channel}`} channel={channel} />
                      ))}
                    </HStack>
                    {conversation.priority === 'Alta' ? (
                      <Badge
                        size="sm"
                        action="muted"
                        className="rounded-full bg-[rgba(236,69,90,0.16)] px-3 py-1 text-xs font-semibold text-[#be123c]"
                      >
                        <HStack className="items-center gap-1">
                          <AlertCircle size={14} color="#be123c" strokeWidth={2} />
                          <Text className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#be123c]">
                            Alta attenzione
                          </Text>
                        </HStack>
                      </Badge>
                    ) : null}
                  </HStack>
                </Box>
                <Button
                  size="sm"
                  action="primary"
                  className="rounded-full bg-[var(--color-primary-600)] px-4"
                >
                  <Text className="text-xs font-semibold text-white">
                    Segnala problema
                  </Text>
                </Button>
              </HStack>

              <Box className="flex flex-1 flex-col">
                <Box className="flex-1 overflow-y-auto pr-2">
                  <VStack space="lg">
                    {visibleMessages.map((message) => (
                      <ChatBubble key={message.id} message={message} />
                    ))}
                  </VStack>
                </Box>

                <Box className="mt-5 rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-5">
                  {suggestionGroups.length > 0 ? (
                    <VStack space="md">
                      {suggestionGroups.map(({ id, message }) => (
                        <Box
                          key={id}
                          className="rounded-2xl border border-dashed border-[rgba(59,130,246,0.25)] bg-[rgba(59,130,246,0.08)] px-4 py-4"
                        >
                          <HStack className="items-center gap-2">
                            <Sparkles size={16} color="#1d4ed8" strokeWidth={2} />
                            <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1d4ed8]">
                              Suggerimenti AI
                            </Text>
                            <ChannelGlyph channel={message.channel} size="sm" />
                          </HStack>
                          <Text className="mt-3 text-sm leading-6 text-[var(--color-neutral-700)]">
                            {message.content}
                          </Text>
                          <HStack className="mt-3 flex-row flex-wrap gap-2">
                            {(message.suggestions ?? []).map((suggestion, index) => (
                              <Button
                                key={`${id}-suggestion-${index}`}
                                size="sm"
                                variant="outline"
                                action="default"
                                className="rounded-full border-[var(--color-border)] bg-[var(--color-surface)] px-3"
                                onPress={() => handleSuggestionClick(suggestion)}
                              >
                                <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                                  {suggestion}
                                </Text>
                              </Button>
                            ))}
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  ) : null}

                  {suggestionGroups.length === 0 && quickActionChips.length > 0 ? (
                    <Box className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4">
                      <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
                        Azioni rapide
                      </Text>
                      <HStack className="mt-3 flex-row flex-wrap gap-2">
                        {quickActionChips.map((chip) => (
                          <Button
                            key={chip.id}
                            size="sm"
                            variant="outline"
                            action="default"
                            className="rounded-full border-[var(--color-border)] bg-transparent px-3"
                            onPress={() => handleSuggestionClick(chip.label)}
                          >
                            <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                              {chip.label}
                            </Text>
                          </Button>
                        ))}
                      </HStack>
                    </Box>
                  ) : null}

                  <Box className="mt-4">
                    <Textarea>
                      <TextareaInput
                        multiline
                        placeholder="Scrivi una risposta o personalizza il suggerimento AI..."
                        value={draftMessage}
                        onChangeText={setDraftMessage}
                        className="min-h-[120px]"
                      />
                    </Textarea>
                    <HStack className="mt-4 items-center justify-end">
                      <Button
                        size="sm"
                        action="primary"
                        className="rounded-full bg-[var(--color-primary-600)] p-3"
                        onPress={() => setDraftMessage('')}
                      >
                        <Send size={16} color="#ffffff" strokeWidth={2} />
                      </Button>
                    </HStack>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box className="flex flex-1 items-center justify-center">
              <Text className="text-sm text-[var(--color-neutral-600)]">
                Seleziona una conversazione per iniziare.
              </Text>
            </Box>
          )}
        </Box>

        {customer ? (
          <Box className={`w-full max-w-[320px] ${panelHeightClass}`}>
            <CustomerPanel
              customer={customer}
              notes={customerNotes}
              onAddNote={() => router.push('/notes')}
              onOpenCustomer={() => router.push(`/customers/${customer.id}`)}
            />
          </Box>
        ) : null}
      </HStack>
    </Box>
  );
}
