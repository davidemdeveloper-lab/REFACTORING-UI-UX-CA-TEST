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
import { Conversation } from '@/types';

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
  return (
    <Pressable onPress={onPress} className="w-full">
      <Box
        className={`mb-3 rounded-3xl border border-[var(--color-border)] px-4 py-4 ${
          isActive ? 'bg-[rgba(196,123,44,0.16)]' : 'bg-[var(--color-background)]'
        }`}
      >
        <HStack className="items-center justify-between gap-2">
          <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
            {customerName}
          </Text>
          <HStack className="items-center gap-2">
            <Badge
              size="sm"
              action="muted"
              className="rounded-full bg-[rgba(148,163,184,0.18)] px-3 py-1 text-xs font-semibold text-[var(--color-neutral-600)]"
            >
              <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                {conversation.channel}
              </Text>
            </Badge>
            {conversation.priority === 'Alta' ? (
              <Badge
                size="sm"
                action="muted"
                className="rounded-full bg-[rgba(236,69,90,0.16)] px-3 py-1 text-xs font-semibold text-[#be123c]"
              >
                <Text className="text-xs font-semibold text-[#be123c]">
                  Alta attenzione
                </Text>
              </Badge>
            ) : null}
          </HStack>
        </HStack>
        <Text className="mt-1 text-xs uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
          {conversation.subject}
        </Text>
        <Text className="mt-2 text-xs text-[var(--color-neutral-600)]">
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

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Cerca conversazioni o clienti..."
        primaryActionLabel="Nuovo microflusso"
        onPrimaryAction={() => router.push('/templates')}
      />
      <HStack className="flex-row gap-6">
        <Box className="w-[280px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 shadow-[var(--shadow-card)]">
          <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
            Conversazioni
          </Text>
          <Text className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
            Booking · Email · WhatsApp
          </Text>
          <VStack space="sm" className="mt-5">
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

        <Box className="flex-1 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 shadow-[var(--shadow-card)]">
          {conversation && customer ? (
            <Box className="flex h-full flex-col gap-6">
              <HStack className="items-center justify-between">
                <Box>
                  <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
                    {customer.firstName} {customer.lastName}
                  </Text>
                  <Text className="text-xs uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
                    Conversazione · {conversation.channel}
                  </Text>
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
          <CustomerPanel
            customer={customer}
            notes={customerNotes}
            onAddNote={() => router.push('/notes')}
          />
        ) : (
          <Box className="w-[360px]" />
        )}
      </HStack>
    </Box>
  );
}

// mock: conversationsMock, chatQuickActionsMock, customersMock, notesMock
// actions: sendChatMessage(conversationId, payload), escalateToTeam(conversationId)
// assumptions: selezione conversazione gestita via uiSlice e mock; invio messaggi ancora mock
