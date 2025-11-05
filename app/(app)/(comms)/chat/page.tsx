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
import { PageToolbar } from '@/components/shared/page-toolbar';
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
import { Conversation, Customer } from '@/types';
import { CalendarCheck, Mail, MessageCircle, AlertCircle } from 'lucide-react-native';

const channelIconMap: Record<
  Conversation['channel'],
  (typeof CalendarCheck)
> = {
  Booking: CalendarCheck,
  Email: Mail,
  WhatsApp: MessageCircle,
};

const channelBadgeClasses: Record<Conversation['channel'], string> = {
  Booking: 'bg-[rgba(59,130,246,0.14)] text-[#1d4ed8]',
  Email: 'bg-[rgba(148,163,184,0.18)] text-[var(--color-neutral-600)]',
  WhatsApp: 'bg-[rgba(22,163,74,0.18)] text-[#15803d]',
};

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
  const ChannelIcon = channelIconMap[conversation.channel];
  const channelBadge = channelBadgeClasses[conversation.channel];
  return (
    <Pressable onPress={onPress} className="w-full">
      <Box
        className={`mb-3 rounded-3xl border px-4 py-3 transition-all duration-150 ${
          isActive
            ? 'border-[rgba(196,123,44,0.45)] bg-[rgba(196,123,44,0.12)] shadow-[0_12px_28px_rgba(36,30,18,0.12)]'
            : 'border-[var(--color-border)] bg-[var(--color-background)] hover:border-[rgba(196,123,44,0.35)]'
        }`}
      >
        <HStack className="flex-wrap items-start justify-between gap-2">
          <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
            {customerName}
          </Text>
          <HStack className="flex-wrap items-center gap-2">
            <Badge
              size="sm"
              action="muted"
              className={`rounded-full px-3 py-1 text-xs font-semibold ${channelBadge}`}
            >
              <HStack className="items-center gap-2">
                <ChannelIcon size={14} color="currentColor" strokeWidth={2} />
                <Text className="text-xs font-semibold text-current">
                  {conversation.channel}
                </Text>
              </HStack>
            </Badge>
            {conversation.unread ? (
              <Badge
                size="sm"
                action="muted"
                className="rounded-full bg-[rgba(196,123,44,0.2)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-600)]"
              >
                <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                  Da leggere
                </Text>
              </Badge>
            ) : null}
            {conversation.priority === 'Alta' ? (
              <Badge
                size="sm"
                action="muted"
                className="rounded-full bg-[rgba(236,69,90,0.16)] px-3 py-1 text-xs font-semibold text-[#be123c]"
              >
                <HStack className="items-center gap-1">
                  <AlertCircle size={14} color="#be123c" strokeWidth={2} />
                  <Text className="text-xs font-semibold text-[#be123c]">
                    Alta attenzione
                  </Text>
                </HStack>
              </Badge>
            ) : null}
          </HStack>
        </HStack>
        <Text className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--color-neutral-500)]">
          {conversation.subject}
        </Text>
        <Text className="mt-1 text-xs text-[var(--color-neutral-600)]">
          Ultimo messaggio ·{' '}
          {new Date(conversation.lastMessageAt).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        {priorityReason ? (
          <Text className="mt-2 text-xs leading-5 text-[var(--color-neutral-500)]">
            {priorityReason}
          </Text>
        ) : null}
        {conversation.unread ? (
          <Text className="mt-2 text-xs font-semibold text-[var(--color-primary-600)]">
            {conversation.priority === 'Alta'
              ? 'Richiede attenzione immediata'
              : 'Messaggi non letti'}
          </Text>
        ) : null}
      </Box>
    </Pressable>
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
  const ActiveChannelIcon = conversation ? channelIconMap[conversation.channel] : null;

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Cerca conversazioni o clienti..."
        primaryActionLabel="Nuovo microflusso"
        onPrimaryAction={() => router.push('/templates')}
      />
      <HStack className="items-start gap-6">
        <Box className="flex w-[300px] max-h-[70vh] flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 shadow-[var(--shadow-card)]">
          <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
            Conversazioni
          </Text>
          <Text className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
            Booking · Email · WhatsApp
          </Text>
          <VStack space="sm" className="mt-5 flex-1 overflow-y-auto pr-1">
            {conversations.map((item) => (
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
          </VStack>
        </Box>

        <Box className="flex-[2.2] min-w-0 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 shadow-[var(--shadow-card)]">
          {conversation && customer ? (
            <Box className="flex h-full flex-col gap-6">
              <HStack className="flex-wrap items-center justify-between gap-4">
                <Box>
                  <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
                    {customer.firstName} {customer.lastName}
                  </Text>
                  <HStack className="mt-2 items-center gap-2">
                    {ActiveChannelIcon ? (
                      <Badge
                        size="sm"
                        action="muted"
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${channelBadgeClasses[conversation.channel]}`}
                      >
                        <HStack className="items-center gap-2">
                          <ActiveChannelIcon size={16} color="currentColor" strokeWidth={2} />
                          <Text className="text-xs font-semibold text-current uppercase tracking-[0.2em]">
                            {conversation.channel}
                          </Text>
                        </HStack>
                      </Badge>
                    ) : null}
                    {conversation.priority === 'Alta' ? (
                      <Badge
                        size="sm"
                        action="muted"
                        className="rounded-full bg-[rgba(236,69,90,0.16)] px-3 py-1 text-xs font-semibold text-[#be123c]"
                      >
                        <Text className="text-xs font-semibold text-[#be123c] uppercase tracking-[0.2em]">
                          Alta attenzione
                        </Text>
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
              <ConversationInsights customer={customer} conversation={conversation} />
              <Box className="flex flex-1 flex-col">
                <Box className="flex-1 overflow-y-auto pr-2">
                  {conversation.messages.map((message) => (
                    <ChatBubble
                      key={message.id}
                      message={message}
                      onSuggestionClick={(suggestion) =>
                        setDraftMessage((prev) =>
                          prev ? `${prev}\n${suggestion}` : suggestion
                        )
                      }
                    />
                  ))}
                </Box>
                <Box className="mt-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4">
                  <Textarea>
                    <TextareaInput
                      multiline
                      placeholder="Scrivi la risposta o personalizza il suggerimento AI..."
                      value={draftMessage}
                      onChangeText={setDraftMessage}
                      className="min-h-[100px]"
                    />
                  </Textarea>
                  <HStack className="mt-4 flex-row flex-wrap items-center justify-between gap-3">
                    <HStack className="flex-row flex-wrap gap-2">
                      {quickActions.map((action) => (
                        <Button
                          key={action.id}
                          size="sm"
                          variant="outline"
                          action="default"
                          className="rounded-full border-[var(--color-border)] bg-[var(--color-surface)] px-3"
                          onPress={() =>
                            setDraftMessage(
                              `${draftMessage ? `${draftMessage}\n` : ''}${
                                action.label
                              }`
                            )
                          }
                        >
                          <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                            {action.label}
                          </Text>
                        </Button>
                      ))}
                    </HStack>
                    <Button
                      size="md"
                      action="primary"
                      className="rounded-full bg-[var(--color-primary-600)] px-6"
                      onPress={() => setDraftMessage('')}
                    >
                      <Text className="text-sm font-semibold text-white">
                        Invia messaggio
                      </Text>
                    </Button>
                  </HStack>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box className="flex-1 items-center justify-center">
              <Text className="text-sm text-[var(--color-neutral-600)]">
                Seleziona una conversazione per iniziare.
              </Text>
            </Box>
          )}
        </Box>

        {customer ? (
          <Box className="w-full max-w-[300px]">
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

// mock: conversationsMock, chatQuickActionsMock, customersMock, notesMock
// actions: sendChatMessage(conversationId, payload), escalateToTeam(conversationId)
// assumptions: selezione conversazione gestita via uiSlice e mock; invio messaggi ancora mock

function ConversationInsights({
  customer,
  conversation,
}: {
  customer: Customer;
  conversation: Conversation;
}) {
  const timelineEntries = useMemo(
    () =>
      [...(customer.timeline ?? [])].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [customer.timeline]
  );
  const completedSteps = timelineEntries
    .filter((entry) => entry.status !== 'Programmato')
    .slice(0, 2);
  const upcomingStep =
    timelineEntries.find(
      (entry) =>
        entry.status === 'Programmato' || entry.status === 'In attesa'
    ) ?? null;
  const upcomingLabel =
    upcomingStep?.title ??
    customer.prossimoInvio ??
    `Nessun step programmato per ${conversation.channel}`;

  return (
    <Box className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-5">
      <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
        Step eseguiti
      </Text>
      {completedSteps.length > 0 ? (
        <VStack space="md" className="mt-3">
          {completedSteps.map((entry) => (
            <Box key={entry.id}>
              <HStack className="items-center justify-between gap-3">
                <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                  {entry.title}
                </Text>
                <Text className="text-xs uppercase tracking-[0.15em] text-[var(--color-neutral-500)]">
                  {entry.status}
                </Text>
              </HStack>
              <Text className="mt-1 text-xs leading-5 text-[var(--color-neutral-500)]">
                {entry.description}
              </Text>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text className="mt-3 text-xs text-[var(--color-neutral-500)]">
          Nessuna azione registrata su questa conversazione.
        </Text>
      )}
      <Box className="mt-5 rounded-2xl border border-[rgba(196,123,44,0.35)] bg-[rgba(196,123,44,0.1)] px-4 py-4">
        <Text className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary-600)]">
          Prossimo step suggerito
        </Text>
        <Text className="mt-2 text-sm font-semibold text-[var(--color-primary-600)]">
          {upcomingLabel}
        </Text>
      </Box>
    </Box>
  );
}
