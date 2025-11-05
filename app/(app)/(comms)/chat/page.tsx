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
import {
  Tooltip,
  TooltipContent,
  TooltipText,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChatBubble } from '@/components/shared/chat-bubble';
import { CustomerPanel } from '@/components/shared/customer-panel';
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
import { Conversation, Customer, ChatMessage, ChatChannel } from '@/types';
import { channelMetaMap, orderedChannels } from '@/constants/channels';
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Send,
  Sparkles,
} from 'lucide-react-native';

const LAYOUT_HEIGHT = 'h-[calc(100vh-220px)]';

type ChannelMarkerProps = {
  channel: ChatChannel;
  size?: 'sm' | 'md';
};

function ChannelMarker({ channel, size = 'md' }: ChannelMarkerProps) {
  const meta = channelMetaMap[channel];
  const dimension = size === 'sm' ? 'h-6 w-6' : 'h-7 w-7';
  const iconSize = size === 'sm' ? 14 : 16;

  return (
    <Tooltip placement="top">
      <TooltipTrigger>
        <Box
          className={`flex ${dimension} items-center justify-center rounded-full ${meta.background}`}
        >
          <meta.icon size={iconSize} color={meta.color} strokeWidth={2} />
        </Box>
      </TooltipTrigger>
      <TooltipContent className="bg-[var(--color-neutral-900)]">
        <TooltipText>{meta.tooltip}</TooltipText>
      </TooltipContent>
    </Tooltip>
  );
}

type ChannelStackProps = {
  channels: ChatChannel[];
  size?: 'sm' | 'md';
};

function ChannelStack({ channels, size = 'md' }: ChannelStackProps) {
  const unique = Array.from(new Set(channels));
  const sorted = orderedChannels.filter((channel) => unique.includes(channel));
  const display = sorted.length > 0 ? sorted : unique;

  return (
    <HStack className="items-center gap-2">
      {display.map((channel) => (
        <ChannelMarker key={channel} channel={channel} size={size} />
      ))}
    </HStack>
  );
}

type ConversationRowProps = {
  conversation: Conversation;
  isActive: boolean;
  customerName: string;
  onPress: () => void;
};

function ConversationRow({
  conversation,
  isActive,
  customerName,
  onPress,
}: ConversationRowProps) {
  const hasPriority = conversation.priority === 'Alta';
  const channels =
    conversation.channels && conversation.channels.length > 0
      ? conversation.channels
      : [conversation.channel];
  const lastChatMessage = [...conversation.messages]
    .filter((message) => message.kind !== 'suggestion')
    .pop();
  const preview = lastChatMessage?.content ?? conversation.subject;
  const lastMessageTime = lastChatMessage
    ? new Date(lastChatMessage.timestamp).toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';
  const unreadClasses = conversation.unread
    ? 'border-[rgba(196,123,44,0.35)] bg-[rgba(196,123,44,0.12)] shadow-[0_12px_28px_rgba(36,30,18,0.12)]'
    : 'border-[var(--color-border)] bg-[var(--color-surface)]';
  const activeClasses = isActive
    ? 'border-[rgba(196,123,44,0.45)] shadow-[0_16px_32px_rgba(36,30,18,0.16)]'
    : '';

  return (
    <Pressable onPress={onPress} className="w-full">
      <Box
        className={`rounded-3xl border px-4 py-4 transition-all duration-150 ${
          unreadClasses + ' ' + activeClasses
        }`}
      >
        <VStack space="xs" className="min-w-0">
          <HStack className="items-start justify-between gap-3">
            <HStack className="min-w-0 items-center gap-2">
              <Text
                className={`truncate text-sm font-semibold ${
                  conversation.unread
                    ? 'text-[var(--color-neutral-900)]'
                    : 'text-[var(--color-neutral-800)]'
                }`}
              >
                {customerName}
              </Text>
              {hasPriority ? (
                <Badge
                  size="sm"
                  action="muted"
                  className="rounded-full bg-[rgba(236,69,90,0.16)] px-2.5 py-1 text-[10px] font-semibold text-[#be123c]"
                >
                  <HStack className="items-center gap-1">
                    <AlertCircle size={12} color="#be123c" strokeWidth={2} />
                    <Text className="text-[10px] font-semibold text-[#be123c]">
                      Alta attenzione
                    </Text>
                  </HStack>
                </Badge>
              ) : null}
            </HStack>
            {conversation.unread ? (
              <Box className="mt-1 h-2 w-2 rounded-full bg-[var(--color-primary-600)]" />
            ) : (
              <Text className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-neutral-500)]">
                {lastMessageTime}
              </Text>
            )}
          </HStack>
          <ChannelStack channels={channels} size="sm" />
          <Text
            className={`line-clamp-2 text-xs leading-5 ${
              conversation.unread
                ? 'font-semibold text-[var(--color-neutral-700)]'
                : 'text-[var(--color-neutral-500)]'
            }`}
          >
            {preview}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
}

type AssistantSuggestionCardProps = {
  message: ChatMessage;
  onApply: (suggestion: string) => void;
};

function AssistantSuggestionCard({
  message,
  onApply,
}: AssistantSuggestionCardProps) {
  const suggestions = message.suggestions ?? [];
  return (
    <Box className="rounded-2xl border border-[rgba(59,130,246,0.35)] bg-[rgba(59,130,246,0.1)] px-4 py-3">
      <HStack className="items-center gap-2">
        <Box className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(59,130,246,0.12)]">
          <Sparkles size={16} color="#2563eb" strokeWidth={2} />
        </Box>
        <Text className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1d4ed8]">
          Suggerimento AI
        </Text>
      </HStack>
      <Text className="mt-2 text-sm text-[var(--color-neutral-700)]">
        {message.content}
      </Text>
      {suggestions.length > 0 ? (
        <HStack className="mt-3 flex-row flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              size="sm"
              variant="outline"
              action="default"
              className="rounded-full border-[var(--color-border)] bg-[var(--color-background)] px-3"
              onPress={() => onApply(suggestion)}
            >
              <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                {suggestion}
              </Text>
            </Button>
          ))}
        </HStack>
      ) : null}
    </Box>
  );
}

type QuickActionListProps = {
  actions: { id: string; label: string }[];
  onApply: (label: string) => void;
};

function QuickActionList({ actions, onApply }: QuickActionListProps) {
  if (actions.length === 0) {
    return null;
  }

  return (
    <Box className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3">
      <Text className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-neutral-500)]">
        Azioni rapide
      </Text>
      <HStack className="mt-2 flex-row flex-wrap gap-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            size="sm"
            variant="outline"
            action="default"
            className="rounded-full border-[var(--color-border)] bg-[var(--color-surface)] px-3"
            onPress={() => onApply(action.label)}
          >
            <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
              {action.label}
            </Text>
          </Button>
        ))}
      </HStack>
    </Box>
  );
}

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
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const filteredConversations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return conversations;
    }
    return conversations.filter((item) => {
      const name = customerMetaMap[item.customerId]?.name?.toLowerCase() ?? '';
      return (
        name.includes(term) || item.subject.toLowerCase().includes(term)
      );
    });
  }, [conversations, customerMetaMap, searchTerm]);

  const chatMessages = conversation
    ? conversation.messages.filter((message) => message.kind !== 'suggestion')
    : [];
  const suggestionMessages = conversation
    ? conversation.messages.filter((message) => message.kind === 'suggestion')
    : [];

  const applySuggestion = (text: string) => {
    setDraftMessage((prev) => (prev ? `${prev}\n${text}` : text));
  };

  return (
    <Box className="pb-16">
      <HStack className={`items-start gap-6 ${LAYOUT_HEIGHT}`}>
        <Box
          className={`flex flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] transition-[width] duration-300 ${
            sidebarCollapsed ? 'w-[84px]' : 'w-[320px]'
          } ${LAYOUT_HEIGHT}`}
        >
          <HStack className="items-center justify-between gap-3 px-5 pt-5">
            {!sidebarCollapsed ? (
              <VStack space="xs">
                <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
                  Conversazioni
                </Text>
                <Text className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
                  Booking · Email · WhatsApp
                </Text>
              </VStack>
            ) : null}
            <Button
              size="sm"
              variant="outline"
              action="default"
              className="h-8 w-8 rounded-full border-[var(--color-border)] bg-[var(--color-background)] p-0"
              onPress={() => setSidebarCollapsed((prev) => !prev)}
            >
              {sidebarCollapsed ? (
                <ChevronRight size={16} color="var(--color-neutral-600)" />
              ) : (
                <ChevronLeft size={16} color="var(--color-neutral-600)" />
              )}
            </Button>
          </HStack>

          {!sidebarCollapsed ? (
            <>
              <Box className="px-5 pt-4">
                <Input
                  variant="rounded"
                  size="md"
                  className="w-full border-[var(--color-border)]"
                >
                  <InputSlot className="pl-4">
                    <InputIcon>
                      <Search size={16} color="var(--color-neutral-500)" />
                    </InputIcon>
                  </InputSlot>
                  <InputField
                    placeholder="Cerca conversazioni o clienti"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    className="pr-4 text-sm"
                  />
                </Input>
                <Button
                  size="sm"
                  action="primary"
                  className="mt-3 w-full rounded-full bg-[var(--color-primary-600)]"
                  onPress={() => router.push('/templates')}
                >
                  <Text className="text-xs font-semibold text-white">
                    Nuovo microflusso
                  </Text>
                </Button>
              </Box>
              <VStack
                space="sm"
                className="mt-4 flex-1 overflow-y-auto px-5 pb-5 pr-4"
              >
                {filteredConversations.map((item) => (
                  <ConversationRow
                    key={item.id}
                    conversation={item}
                    isActive={item.id === selectedConversationId}
                    customerName={
                      customerMetaMap[item.customerId]?.name ?? 'Cliente'
                    }
                    onPress={() => dispatch(setSelectedConversationId(item.id))}
                  />
                ))}
                {filteredConversations.length === 0 ? (
                  <Text className="text-xs text-[var(--color-neutral-500)]">
                    Nessuna conversazione trovata.
                  </Text>
                ) : null}
              </VStack>
            </>
          ) : (
            <Box className="flex flex-1 items-center justify-center px-3">
              <Text className="rotate-180 text-[10px] text-[var(--color-neutral-500)] [writing-mode:vertical-rl]">
                Conversazioni
              </Text>
            </Box>
          )}
        </Box>

        <Box
          className={`flex min-w-0 flex-1 flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 shadow-[var(--shadow-card)] ${LAYOUT_HEIGHT}`}
        >
          {conversation && customer ? (
            <Box className="flex h-full flex-col gap-5">
              <HStack className="flex-wrap items-center justify-between gap-4">
                <VStack space="xs" className="min-w-0">
                  <Text className="truncate text-xl font-semibold text-[var(--color-neutral-900)]">
                    {customer.firstName} {customer.lastName}
                  </Text>
                  <HStack className="flex-wrap items-center gap-2">
                    <ChannelStack channels={conversation.channels} />
                    <Text className="text-xs uppercase tracking-[0.25em] text-[var(--color-neutral-500)]">
                      Chat unificata
                    </Text>
                  </HStack>
                  <Text className="text-sm text-[var(--color-neutral-600)]">
                    {conversation.subject}
                  </Text>
                </VStack>
                {conversation.priority === 'Alta' ? (
                  <Badge
                    size="md"
                    action="muted"
                    className="rounded-full bg-[rgba(236,69,90,0.16)] px-4 py-1 text-sm font-semibold text-[#be123c]"
                  >
                    <HStack className="items-center gap-2">
                      <AlertCircle size={16} color="#be123c" strokeWidth={2} />
                      <Text className="text-sm font-semibold text-[#be123c]">
                        Alta attenzione
                      </Text>
                    </HStack>
                  </Badge>
                ) : null}
              </HStack>

              <Box className="flex flex-1 flex-col overflow-hidden">
                <Box className="flex-1 overflow-y-auto pr-2">
                  {chatMessages.map((message) => (
                    <ChatBubble
                      key={message.id}
                      message={message}
                      onSuggestionClick={applySuggestion}
                    />
                  ))}
                </Box>
                <Box className="mt-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4">
                  <VStack space="sm">
                    {suggestionMessages.map((message) => (
                      <AssistantSuggestionCard
                        key={message.id}
                        message={message}
                        onApply={applySuggestion}
                      />
                    ))}
                    <QuickActionList actions={quickActions} onApply={applySuggestion} />
                  </VStack>
                  <Box className="mt-4 rounded-2xl border border-transparent bg-[var(--color-surface)] px-0 py-0">
                    <Textarea>
                      <TextareaInput
                        multiline
                        placeholder="Scrivi la risposta o personalizza il suggerimento AI..."
                        value={draftMessage}
                        onChangeText={setDraftMessage}
                        className="min-h-[96px]"
                      />
                    </Textarea>
                  </Box>
                  <HStack className="mt-3 items-center justify-between gap-3">
                    <Text className="text-xs text-[var(--color-neutral-500)]">
                      Premi Invio per inviare. I suggerimenti AI vengono aggiunti automaticamente all'editor.
                    </Text>
                    <Button
                      size="sm"
                      action="primary"
                      className="h-10 w-10 rounded-full bg-[var(--color-primary-600)] p-0"
                      onPress={() => setDraftMessage('')}
                    >
                      <Send size={16} color="#ffffff" strokeWidth={2} />
                    </Button>
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
          <Box className={`w-full max-w-[320px] ${LAYOUT_HEIGHT}`}>
            <CustomerPanel
              customer={customer}
              notes={customerNotes}
              onAddNote={() => router.push('/notes')}
              onOpenCustomer={() => router.push(`/customers/${customer.id}`)}
              showBookings={false}
              showTimeline={false}
              showNotes={false}
              condensed
            />
          </Box>
        ) : null}
      </HStack>
    </Box>
  );
}
