'use client';

import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GlassPanel } from '@/components/common/GlassPanel';
import { ChatConversationList } from '@/components/chat/ChatConversationList';
import { ChatThread } from '@/components/chat/ChatThread';
import { ChatComposer } from '@/components/chat/ChatComposer';
import { ChatContextPanel } from '@/components/chat/ChatContextPanel';
import { setActiveConversation, setActiveTab, setSearch } from '@/features/chat/chatSlice';
import { VStack, HStack, Text } from '@gluestack-ui/themed';

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chat);
  const clients = useAppSelector((state) => state.clients.items);
  const bookings = useAppSelector((state) => state.bookings.items);
  const templates = useAppSelector((state) => state.templates.items);

  const activeConversation = useMemo(
    () => chat.conversations.find((conversation) => conversation.id === chat.activeConversationId),
    [chat.conversations, chat.activeConversationId]
  );

  const contextClient = clients.find((client) => client.id === activeConversation?.clientId);
  const contextBooking = bookings.find((booking) => booking.id === activeConversation?.bookingId);
  const nextTemplate = templates.find((template) => template.id === 'template-2');

  return (
    <VStack space="md">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Chat' }]} />
      <Text fontSize={24} fontWeight="700">
        Conversazioni
      </Text>
      <GlassPanel>
        <HStack space="md" alignItems="stretch" flexWrap="wrap">
          <ChatConversationList
            conversations={chat.conversations}
            activeConversationId={chat.activeConversationId}
            activeTab={chat.activeTab}
            search={chat.search}
            onSearch={(value) => dispatch(setSearch(value))}
            onTabChange={(tab) => dispatch(setActiveTab(tab))}
            onSelect={(id) => dispatch(setActiveConversation(id))}
          />
          {activeConversation ? (
            <VStack flex={1} minWidth={320} space="md">
              <ChatThread conversation={activeConversation} />
              <ChatComposer conversation={activeConversation} />
            </VStack>
          ) : (
            <Text fontSize={13} flex={1} color="rgba(148,163,184,0.9)">
              Seleziona una conversazione per iniziare.
            </Text>
          )}
          <ChatContextPanel client={contextClient} booking={contextBooking} nextTemplate={nextTemplate} />
        </HStack>
      </GlassPanel>
    </VStack>
  );
}
