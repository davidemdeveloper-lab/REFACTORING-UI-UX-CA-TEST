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
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipText } from '@/components/ui/tooltip';
import { ChatBubble } from '@/components/shared/chat-bubble';
import {
  useGetChatQuickActionsQuery,
  useGetConversationByIdQuery,
  useGetConversationsQuery,
  useGetCustomerByIdQuery,
  useGetCustomersQuery,
} from '@/services/mockApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedConversationId } from '@/store/slices/uiSlice';
import { ChatChannel, Conversation, Customer } from '@/types';
import {
  CalendarCheck,
  Mail,
  MessageCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Send,
} from 'lucide-react-native';

const channelMeta: Record<
  ChatChannel,
  {
    icon: (typeof CalendarCheck);
    color: string;
    background: string;
    label: string;
  }
> = {
  Booking: {
    icon: CalendarCheck,
    color: '#aa6a24',
    background: 'bg-[rgba(196,123,44,0.14)]',
    label: 'Booking',
  },
  Email: {
    icon: Mail,
    color: '#475569',
    background: 'bg-[rgba(148,163,184,0.18)]',
    label: 'Email',
  },
  WhatsApp: {
    icon: MessageCircle,
    color: '#15803d',
    background: 'bg-[rgba(22,163,74,0.18)]',
    label: 'WhatsApp',
  },
};

function ChannelIconBadge({
  channel,
  size = 16,
}: {
  channel: ChatChannel;
  size?: number;
}) {
  const meta = channelMeta[channel];
  const Icon = meta.icon;

  return (
    <Tooltip placement="top">
      <Tooltip.Trigger>
        <Box className={`rounded-full ${meta.background} p-1.5`}>
          <Icon size={size} color={meta.color} strokeWidth={2} />
        </Box>
      </Tooltip.Trigger>
      <TooltipContent>
        <TooltipText>Messaggi {meta.label}</TooltipText>
      </TooltipContent>
    </Tooltip>
  );
}

function ConversationRow({
  conversation,
  isActive,
  customerName,
  lastMessagePreview,
  onPress,
}: {
  conversation: Conversation;
  isActive: boolean;
  customerName: string;
  lastMessagePreview: string;
  onPress: () => void;
}) {
  const highlightClasses = isActive
    ? 'border-[rgba(196,123,44,0.45)] shadow-[0_12px_28px_rgba(36,30,18,0.12)]'
    : 'border-[var(--color-border)] hover:border-[rgba(196,123,44,0.35)]';
  const unreadClasses = conversation.unread
    ? 'bg-[rgba(196,123,44,0.12)]'
    : 'bg-[var(--color-surface)]';

  return (
    <Pressable onPress={onPress} className="w-full">
      <Box
        className={`relative overflow-hidden rounded-3xl border px-4 py-4 transition-all duration-150 ${highlightClasses} ${unreadClasses}`}
      >
        {conversation.unread ? (
          <Box className="absolute left-0 top-0 h-full w-[3px] bg-[var(--color-primary-600)]" />
        ) : null}
        <HStack className="items-start justify-between gap-3">
          <VStack space="xs" className="flex-1">
            <HStack className="flex-wrap items-center gap-2">
              <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                {customerName}
              </Text>
              {conversation.priority === 'Alta' ? (
                <HStack className="items-center gap-1 rounded-full bg-[rgba(236,69,90,0.14)] px-2 py-1">
                  <AlertCircle size={12} color="#be123c" strokeWidth={2} />
                  <Text className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#be123c]">
                    Alta attenzione
                  </Text>
                </HStack>
              ) : null}
            </HStack>
            <HStack className="items-center gap-2">
              {conversation.channels.map((channel, index) => (
                <ChannelIconBadge key={`${conversation.id}-${channel}-${index}`} channel={channel} size={13} />
              ))}
            </HStack>
          </VStack>
          <Text className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
            {new Date(conversation.lastMessageAt).toLocaleTimeString('it-IT', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </HStack>
        <Text
          numberOfLines={2}
          className={`mt-3 text-sm leading-6 ${
            conversation.unread
              ? 'font-semibold text-[var(--color-neutral-900)]'
              : 'text-[var(--color-neutral-600)]'
          }`}
        >
          {lastMessagePreview}
        </Text>
      </Box>
    </Pressable>
  );
}

function ChatCustomerSummary({
  customer,
  onOpenCustomer,
}: {
  customer: Customer;
  onOpenCustomer: () => void;
}) {
  return (
    <Box className="flex h-full max-w-[320px] flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 shadow-[var(--shadow-card)]">
      <VStack space="lg" className="flex-1">
        <Box>
          <HStack className="items-start justify-between gap-3">
            <Box>
              <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
                Cliente
              </Text>
              <Text className="mt-2 text-xl font-semibold text-[var(--color-neutral-900)]">
                {customer.firstName} {customer.lastName}
              </Text>
              <Text className="mt-1 text-xs text-[var(--color-neutral-500)]">
                Registrato il{' '}
                {new Date(customer.registeredAt).toLocaleDateString('it-IT')}
              </Text>
            </Box>
            <Button
              size="sm"
              variant="outline"
              action="primary"
              className="rounded-full border-[var(--color-primary-600)] bg-transparent px-3"
              onPress={onOpenCustomer}
            >
              <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                Apri scheda
              </Text>
            </Button>
          </HStack>
        </Box>
        <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4">
          <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
            Contatti
          </Text>
          <VStack space="xs" className="mt-3">
            <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
              {customer.email}
            </Text>
            <Text className="text-sm text-[var(--color-neutral-600)]">
              {customer.phone}
            </Text>
            {customer.secondaryPhone ? (
              <Text className="text-sm text-[var(--color-neutral-600)]">
                {customer.secondaryPhone}
              </Text>
            ) : null}
          </VStack>
        </Box>
        <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4">
          <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
            Comunicazioni
          </Text>
          <VStack space="sm" className="mt-3">
            <InfoRow label="Ultimo evento" value={customer.ultimoEvento} />
            <InfoRow
              label="Prossimo evento"
              value={customer.prossimoInvio}
              highlight
            />
          </VStack>
        </Box>
        {customer.priorityReason ? (
          <Box className="rounded-2xl border border-[rgba(236,69,90,0.24)] bg-[rgba(236,69,90,0.12)] px-4 py-4">
            <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#be123c]">
              Nota prioritaria
            </Text>
            <Text className="mt-2 text-sm leading-6 text-[#be123c]">
              {customer.priorityReason}
            </Text>
          </Box>
        ) : null}
      </VStack>
    </Box>
  );
}

function InfoRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Box
      className={`rounded-xl px-3 py-2 ${
        highlight
          ? 'border border-[rgba(196,123,44,0.35)] bg-[rgba(196,123,44,0.12)]'
          : 'border border-transparent bg-transparent'
      }`}
    >
      <Text className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
        {label}
      </Text>
      <Text
        className={`mt-1 text-sm font-semibold ${
          highlight
            ? 'text-[var(--color-primary-600)]'
            : 'text-[var(--color-neutral-700)]'
        }`}
      >
        {value}
      </Text>
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
  const [isListCollapsed, setIsListCollapsed] = useState(false);

  const filteredConversations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return conversations;
    }
    return conversations.filter((item) => {
      const customerName =
        customerMetaMap[item.customerId]?.name?.toLowerCase() ?? '';
      const subject = item.subject.toLowerCase();
      const lastMessage =
        item.messages[item.messages.length - 1]?.content?.toLowerCase() ?? '';
      return (
        customerName.includes(query) ||
        subject.includes(query) ||
        lastMessage.includes(query)
      );
    });
  }, [conversations, customerMetaMap, searchTerm]);

  const aiSuggestions = useMemo(() => {
    const suggestions = new Set<string>();
    conversation?.messages.forEach((message) => {
      if (message.author === 'AI' && message.suggestions) {
        message.suggestions.forEach((suggestion) => suggestions.add(suggestion));
      }
    });
    quickActions.forEach((action) => suggestions.add(action.label));
    return Array.from(suggestions).slice(0, 8);
  }, [conversation, quickActions]);

  const handleSuggestionClick = (suggestion: string) => {
    setDraftMessage(suggestion);
  };

  const layoutHeightClass = 'h-[calc(100vh-180px)] min-h-[640px]';

  return (
    <Box className="pb-12 pt-6">
      <HStack className={`items-start gap-6 ${layoutHeightClass}`}>
        <Box
          className={`transition-all duration-200 ${
            isListCollapsed ? 'w-[72px]' : 'w-[320px]'
          } h-full`}
        >
          <Box
            className={`flex h-full flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] ${
              isListCollapsed ? 'items-center px-3 py-5' : 'px-5 py-5'
            }`}
          >
            <HStack
              className={`w-full items-start ${
                isListCollapsed
                  ? 'flex-col items-center justify-start gap-4'
                  : 'items-start justify-between gap-3'
              }`}
            >
              {!isListCollapsed ? (
                <Box>
                  <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
                    Conversazioni
                  </Text>
                  <Text className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
                    Chat unificate
                  </Text>
                </Box>
              ) : null}
              <Pressable
                onPress={() => setIsListCollapsed((prev) => !prev)}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] p-2"
              >
                {isListCollapsed ? (
                  <ChevronRight size={18} color="#aa6a24" strokeWidth={2} />
                ) : (
                  <ChevronLeft size={18} color="#aa6a24" strokeWidth={2} />
                )}
              </Pressable>
            </HStack>
            {!isListCollapsed ? (
              <>
                <Box className="mt-5">
                  <Input
                    variant="outline"
                    size="md"
                    className="rounded-2xl border-[var(--color-border)] bg-[var(--color-background)]"
                  >
                    <InputSlot className="pl-4">
                      <InputIcon as={Search} size="sm" color="#94a3b8" />
                    </InputSlot>
                    <InputField
                      placeholder="Cerca conversazioni o clienti..."
                      value={searchTerm}
                      onChangeText={setSearchTerm}
                      className="text-sm text-[var(--color-neutral-900)]"
                    />
                  </Input>
                </Box>
                <Button
                  size="sm"
                  action="primary"
                  className="mt-4 w-full justify-center rounded-2xl bg-[var(--color-primary-600)] px-4"
                  onPress={() => router.push('/templates')}
                >
                  <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    Nuovo microflusso
                  </Text>
                </Button>
                <VStack
                  space="sm"
                  className="mt-5 flex-1 overflow-y-auto pr-1"
                >
                  {filteredConversations.map((item) => (
                    <ConversationRow
                      key={item.id}
                      conversation={item}
                      isActive={item.id === selectedConversationId}
                      customerName={
                        customerMetaMap[item.customerId]?.name ?? 'Cliente'
                      }
                      lastMessagePreview={
                        item.messages[item.messages.length - 1]?.content ??
                        item.subject
                      }
                      onPress={() => dispatch(setSelectedConversationId(item.id))}
                    />
                  ))}
                </VStack>
              </>
            ) : null}
          </Box>
        </Box>

        <Box className="flex h-full flex-[2.6] min-w-0 flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 shadow-[var(--shadow-card)]">
          {conversation && customer ? (
            <Box className="flex h-full flex-col gap-6">
              <HStack className="flex-wrap items-start justify-between gap-4">
                <Box>
                  <HStack className="flex-wrap items-center gap-3">
                    <Text className="text-xl font-semibold text-[var(--color-neutral-900)]">
                      {customer.firstName} {customer.lastName}
                    </Text>
                    {conversation.priority === 'Alta' ? (
                      <HStack className="items-center gap-2 rounded-full bg-[rgba(236,69,90,0.14)] px-3 py-1">
                        <AlertCircle size={16} color="#be123c" strokeWidth={2} />
                        <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-[#be123c]">
                          Alta attenzione
                        </Text>
                      </HStack>
                    ) : null}
                  </HStack>
                  <HStack className="mt-3 flex-wrap items-center gap-2">
                    {conversation.channels.map((channel, index) => (
                      <ChannelIconBadge key={`${conversation.id}-${channel}-header-${index}`} channel={channel} />
                    ))}
                    <Text className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
                      Aggiornata alle{' '}
                      {new Date(conversation.lastMessageAt).toLocaleTimeString(
                        'it-IT',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </Text>
                  </HStack>
                </Box>
              </HStack>

              <Box className="flex min-h-0 flex-1 flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)]">
                <Box className="flex-1 overflow-y-auto px-5 py-5">
                  <VStack space="lg">
                    {conversation.messages.map((message) => (
                      <ChatBubble key={message.id} message={message} />
                    ))}
                  </VStack>
                </Box>
                <Box className="border-t border-[var(--color-border)] px-5 py-4">
                  <Textarea className="rounded-2xl border border-[var(--color-border)] bg-white">
                    <TextareaInput
                      multiline
                      placeholder="Scrivi qui o scegli un suggerimento AI..."
                      value={draftMessage}
                      onChangeText={setDraftMessage}
                      className="min-h-[90px] text-sm text-[var(--color-neutral-900)]"
                    />
                  </Textarea>
                  {aiSuggestions.length > 0 ? (
                    <Box className="mt-3 rounded-2xl border border-dashed border-[rgba(37,99,235,0.3)] bg-[rgba(37,99,235,0.08)] px-4 py-3">
                      <HStack className="items-center gap-2">
                        <Box className="rounded-full bg-[rgba(37,99,235,0.16)] p-1.5">
                          <Sparkles size={14} color="#2563eb" strokeWidth={2} />
                        </Box>
                        <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
                          Suggerimenti AI
                        </Text>
                      </HStack>
                      <HStack className="mt-3 flex-row flex-wrap gap-2">
                        {aiSuggestions.map((suggestion) => (
                          <Pressable
                            key={suggestion}
                            onPress={() => handleSuggestionClick(suggestion)}
                            className="rounded-full border border-[rgba(37,99,235,0.25)] bg-white/80 px-3 py-1.5"
                          >
                            <Text className="text-xs font-semibold text-[#2563eb]">
                              {suggestion}
                            </Text>
                          </Pressable>
                        ))}
                      </HStack>
                    </Box>
                  ) : null}
                  <HStack className="mt-4 items-center justify-between">
                    <Text className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
                      Premi Invio per inviare o personalizza il suggerimento
                    </Text>
                    <Button
                      size="sm"
                      action="primary"
                      className="h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary-600)] px-0"
                      onPress={() => setDraftMessage('')}
                    >
                      <Send size={18} color="#ffffff" strokeWidth={2} />
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
          <ChatCustomerSummary
            customer={customer}
            onOpenCustomer={() => router.push(`/customers/${customer.id}`)}
          />
        ) : null}
      </HStack>
    </Box>
  );
}

// mock: conversationsMock, chatQuickActionsMock, customersMock, notesMock
// actions: sendChatMessage(conversationId, payload), escalateToTeam(conversationId)
// assumptions: selezione conversazione gestita via uiSlice e mock; invio messaggi ancora mock
