// Scopo: gestire le conversazioni multicanale con assistenza AI e pannello cliente.
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
  ChevronUp,
  Info,
} from 'lucide-react-native';
import {
  Menu,
  MenuItem,
  MenuItemLabel,
} from '@/components/ui/menu';
import {
  channelIconMap,
  channelLabelMap,
  channelToneMap,
} from '@/constants/channels';

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

  // Loghi dei canali
  const channelLogos: Record<string, string> = {
    Email: '/emailLogo.png',
    WhatsApp: '/whatsappLogo.png',
    Booking: '/BookingIcon.svg.png',
  };

  const unreadMessagesCount = conversation.messages.filter((m) => m.author === 'Cliente').length;

  return (
    <Pressable onPress={onPress} className="w-full">
      <Box
        className={`relative mb-2 overflow-hidden rounded-3xl border px-4 py-3 transition-all duration-150 ${
          isActive
            ? 'border-[rgba(196,123,44,0.45)] bg-[rgba(196,123,44,0.08)] shadow-[0_12px_28px_rgba(36,30,18,0.12)]'
            : 'border-[rgba(196,123,44,0.35)] bg-white hover:border-[rgba(196,123,44,0.45)]'
        }`}
      >
        <VStack space="xs">
          <HStack className="items-center justify-between gap-3">
            <HStack className="flex-1 items-center gap-2">
              <Text
                className={`text-sm font-semibold ${
                  unread
                    ? 'text-[var(--color-neutral-900)]'
                    : 'text-[var(--color-neutral-700)]'
                }`}
              >
                {customerName}
              </Text>
              <HStack className="items-center gap-1">
                {channels.map((channel) => {
                  const logoSrc = channelLogos[channel];
                  if (!logoSrc) return null;
                  return (
                    <Tooltip
                      key={`${conversation.id}-${channel}`}
                      placement="top"
                      trigger={(triggerProps) => (
                        <Pressable
                          {...triggerProps}
                          className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--color-border)] bg-white overflow-hidden"
                        >
                          <Image
                            src={logoSrc}
                            alt={channel}
                            width={20}
                            height={20}
                            className="object-cover"
                          />
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
            </HStack>
            <HStack className="items-center gap-2">
              {lastMessageTime ? (
                <Text className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-neutral-400)]">
                  {lastMessageTime}
                </Text>
              ) : null}
              {unread && unreadMessagesCount > 0 ? (
                <Box className="flex h-5 w-5 items-center justify-center rounded-full bg-[#be123c]">
                  <Text className="text-[9px] font-bold text-white">
                    {unreadMessagesCount}
                  </Text>
                </Box>
              ) : null}
            </HStack>
          </HStack>
          {isPriority ? (
            <Badge
              size="sm"
              action="muted"
              className="mt-1 w-fit rounded-full bg-[rgba(236,69,90,0.16)] px-3 py-1"
            >
              <HStack className="items-center gap-1">
                <AlertCircle size={11} color="#be123c" strokeWidth={2} />
                <Text className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#be123c]">
                  Alta attenzione
                </Text>
              </HStack>
            </Badge>
          ) : null}
          <Text className="text-xs text-[var(--color-neutral-500)] line-clamp-1 mt-1">
            {preview}
          </Text>
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
  const [selectedChannel, setSelectedChannel] = useState<'Email' | 'WhatsApp' | 'Booking'>('Email');
  const [isCustomerPanelOpen, setIsCustomerPanelOpen] = useState(false);

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

  // Loghi dei canali
  const channelLogos: Record<string, string> = {
    Email: '/emailLogo.png',
    WhatsApp: '/whatsappLogo.png',
    Booking: '/BookingIcon.svg.png',
  };

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
            <VStack space="md" className="flex-1 items-center justify-start pt-4">
              <Box className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(196,123,44,0.15)]">
                <MessageCircle size={20} color="#c47b2c" strokeWidth={2} />
              </Box>
              <Text className="text-[11px] text-center font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
                Chat
              </Text>
              <VStack space="sm" className="mt-4 items-center">
                {conversations.slice(0, 8).map((conv) => {
                  const customerName = customerMetaMap[conv.customerId]?.name ?? 'Cliente';
                  const initials = customerName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);
                  const isSelected = conv.id === selectedConversationId;
                  const unreadCount = conv.messages.filter((m) => m.author === 'Cliente').length;
                  return (
                    <Tooltip
                      key={conv.id}
                      placement="right"
                      trigger={(triggerProps) => (
                        <Pressable
                          {...triggerProps}
                          onPress={() => dispatch(setSelectedConversationId(conv.id))}
                          className="relative"
                        >
                          <Box
                            className={`flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(196,123,44,0.12)] ${
                              isSelected
                                ? 'border-[3px] border-[#c47b2c] shadow-[0_0_0_2px_rgba(196,123,44,0.2)]'
                                : 'border border-[rgba(196,123,44,0.4)]'
                            }`}
                          >
                            <Text className="text-xs font-semibold text-[var(--color-primary-700)]">
                              {initials}
                            </Text>
                          </Box>
                          {conv.unread && unreadCount > 0 ? (
                            <Box className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#be123c] border-2 border-white">
                              <Text className="text-[9px] font-bold text-white">
                                {unreadCount}
                              </Text>
                            </Box>
                          ) : null}
                        </Pressable>
                      )}
                    >
                      <TooltipContent>
                        <TooltipText>{customerName}</TooltipText>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </VStack>
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

        <Box className="flex h-[78vh] flex-1 flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
          {conversation && customer ? (
            <Box className="flex h-full flex-col">
              {/* Header fisso */}
              <Box className="border-b border-[var(--color-border)] px-6 py-4">
                <HStack className="items-center justify-between gap-4">
                  <HStack className="flex-1 items-center gap-3">
                    <Text className="text-xl font-semibold text-[var(--color-neutral-900)]">
                      {customer.firstName} {customer.lastName}
                    </Text>
                    <HStack className="items-center gap-1">
                      {conversationChannels.map((channel) => {
                        const logoSrc = channelLogos[channel];
                        if (!logoSrc) return null;
                        return (
                          <Tooltip
                            key={`${conversation.id}-header-${channel}`}
                            placement="top"
                            trigger={(triggerProps) => (
                              <Pressable
                                {...triggerProps}
                                className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--color-border)] bg-white overflow-hidden"
                              >
                                <Image
                                  src={logoSrc}
                                  alt={channel}
                                  width={20}
                                  height={20}
                                  className="object-cover"
                                />
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
                    {conversation.priority === 'Alta' ? (
                      <Badge
                        size="sm"
                        action="muted"
                        className="rounded-full bg-[rgba(236,69,90,0.16)] px-3 py-1"
                      >
                        <HStack className="items-center gap-1">
                          <AlertCircle size={11} color="#be123c" strokeWidth={2} />
                          <Text className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#be123c]">
                            Alta attenzione
                          </Text>
                        </HStack>
                      </Badge>
                    ) : null}
                  </HStack>
                  <Pressable
                    onPress={() => setIsCustomerPanelOpen(!isCustomerPanelOpen)}
                    className={`flex flex-row items-center gap-2 rounded-full border px-4 py-2 ${
                      isCustomerPanelOpen
                        ? 'border-[#c47b2c] bg-[rgba(196,123,44,0.08)]'
                        : 'border-[var(--color-border)] bg-white hover:bg-[var(--color-background)]'
                    }`}
                  >
                    <Info
                      size={16}
                      color={isCustomerPanelOpen ? '#c47b2c' : '#6b7280'}
                      strokeWidth={2}
                    />
                    <Text
                      className={`text-xs font-semibold ${
                        isCustomerPanelOpen
                          ? 'text-[var(--color-primary-600)]'
                          : 'text-[var(--color-neutral-600)]'
                      }`}
                    >
                      Dettagli cliente
                    </Text>
                  </Pressable>
                </HStack>
                {customer.priorityReason ? (
                  <Text className="mt-2 text-sm text-[var(--color-neutral-600)]">
                    {customer.priorityReason}
                  </Text>
                ) : null}
                <HStack className="mt-3 gap-4">
                  <Box className="flex-1">
                    <Text className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral-500)]">
                      Ultimo evento
                    </Text>
                    <Text className="mt-1 text-xs font-semibold text-[var(--color-neutral-800)]">
                      {customer.ultimoEvento}
                    </Text>
                  </Box>
                  <Box className="flex-1">
                    <Text className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral-500)]">
                      Prossimo invio
                    </Text>
                    <Text className="mt-1 text-xs font-semibold text-[var(--color-primary-600)]">
                      {customer.prossimoInvio}
                    </Text>
                  </Box>
                </HStack>
              </Box>

              {/* Chat area scrollabile */}
              <Box className="flex-1 overflow-y-auto px-6 py-4">
                <VStack space="md">
                  {chatMessages.map((message) => (
                    <ChatBubble key={message.id} message={message} />
                  ))}
                </VStack>
              </Box>

              {/* Footer fisso */}
              <Box className="border-t border-[var(--color-border)] px-6 py-4">
                {assistantSuggestions.length > 0 ? (
                  <Box className="mb-3">
                    <HStack className="items-center gap-2 mb-2">
                      <Sparkles size={14} color="#c47b2c" strokeWidth={2} />
                      <Text className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-primary-600)]">
                        Suggerimenti AI
                      </Text>
                    </HStack>
                    <HStack className="flex-row flex-wrap gap-2">
                      {assistantSuggestions.map((suggestion) =>
                        suggestion.suggestions?.map((option) => (
                          <Tooltip
                            key={`${suggestion.id}-${option}`}
                            placement="top"
                            trigger={(triggerProps) => (
                              <Button
                                {...triggerProps}
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
                            )}
                          >
                            <TooltipContent>
                              <TooltipText>{suggestion.content}</TooltipText>
                            </TooltipContent>
                          </Tooltip>
                        ))
                      )}
                    </HStack>
                  </Box>
                ) : null}
                <HStack className="items-end gap-2">
                  <Box className="flex-1">
                    <Textarea className="rounded-2xl border-[var(--color-border)] bg-white">
                      <TextareaInput
                        multiline
                        placeholder="Scrivi una risposta..."
                        value={draftMessage}
                        onChangeText={setDraftMessage}
                        className="min-h-[80px]"
                      />
                    </Textarea>
                  </Box>
                  <VStack space="xs">
                    <Menu
                      placement="top"
                      offset={5}
                      trigger={({ ...triggerProps }) => (
                        <Pressable
                          {...triggerProps}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white shadow-[0_4px_12px_rgba(15,23,42,0.12)] transition-colors duration-150"
                        >
                          <Image
                            src={channelLogos[selectedChannel]}
                            alt={selectedChannel}
                            width={36}
                            height={36}
                            className="object-cover"
                          />
                        </Pressable>
                      )}
                    >
                      <MenuItem
                        key="booking"
                        textValue="Booking"
                        onPress={() => setSelectedChannel('Booking')}
                        className="gap-3"
                      >
                        <Box className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white overflow-hidden">
                          <Image
                            src="/BookingIcon.svg.png"
                            alt="Booking"
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </Box>
                        <MenuItemLabel size="sm">Booking</MenuItemLabel>
                      </MenuItem>
                      <MenuItem
                        key="email"
                        textValue="Email"
                        onPress={() => setSelectedChannel('Email')}
                        className="gap-3"
                      >
                        <Box className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white overflow-hidden">
                          <Image
                            src="/emailLogo.png"
                            alt="Email"
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </Box>
                        <MenuItemLabel size="sm">Email</MenuItemLabel>
                      </MenuItem>
                      <MenuItem
                        key="whatsapp"
                        textValue="WhatsApp"
                        onPress={() => setSelectedChannel('WhatsApp')}
                        className="gap-3"
                      >
                        <Box className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white overflow-hidden">
                          <Image
                            src="/whatsappLogo.png"
                            alt="WhatsApp"
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </Box>
                        <MenuItemLabel size="sm">WhatsApp</MenuItemLabel>
                      </MenuItem>
                    </Menu>
                    <Pressable
                      onPress={() => setDraftMessage('')}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#aa6a24] bg-white text-[#aa6a24] transition-colors duration-150 shadow-[0_4px_12px_rgba(15,23,42,0.12)] data-[hover=true]:bg-[#aa6a24] data-[hover=true]:text-white"
                    >
                      <Send size={18} color="currentColor" strokeWidth={2.5} />
                    </Pressable>
                  </VStack>
                </HStack>
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

        {customer && isCustomerPanelOpen ? (
          <Box className="h-[78vh] w-full max-w-[320px] overflow-hidden">
            <CustomerPanel
              customer={customer}
              notes={customerNotes}
              onAddNote={() => router.push('/notes')}
              onOpenCustomer={() => router.push(`/customers/${customer.id}`)}
              onClose={() => setIsCustomerPanelOpen(false)}
              showTimeline={false}
              showBookings={false}
              showNotes={true}
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
