'use client';

import { ReactNode, useMemo, useState } from 'react';
import { chatMessages } from '@/data/chat';
import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { usePreferences } from '@/stores/preferences';
import {
  Avatar,
  AvatarFallbackText,
  Box,
  Button,
  ButtonGroup,
  ButtonText,
  Heading,
  HStack,
  Icon,
  Input,
  InputField,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { MessageCircle, Send } from 'lucide-react';
import { formatDate, formatDateTime } from '@/lib/utils';

interface Conversation {
  id: string;
  title: string;
  subtitle: string;
  lastMessage: string;
}

export default function ChatPage() {
  const { chatChannel, setChatChannel } = usePreferences();
  const [selectedConversation, setSelectedConversation] = useState<string | undefined>(undefined);

  const conversations = useMemo<Conversation[]>(() => {
    if (chatChannel === 'Booking') {
      const grouped = new Map<string, Conversation>();
      chatMessages
        .filter((message) => message.channel === 'Booking')
        .forEach((message) => {
          const booking = bookings.find((item) => item.id === message.bookingId);
          if (!booking) return;
          const client = clients.find((item) => item.id === booking.clientId);
          grouped.set(booking.id, {
            id: booking.id,
            title: client?.name ?? 'Cliente',
            subtitle: booking.title,
            lastMessage: message.message,
          });
        });
      return Array.from(grouped.values());
    }
    const direct = new Map<string, Conversation>();
    chatMessages
      .filter((message) => message.channel === 'Direct')
      .forEach((message) => {
        direct.set(message.author, {
          id: message.author,
          title: message.author,
          subtitle: 'Conversazione diretta',
          lastMessage: message.message,
        });
      });
    return Array.from(direct.values());
  }, [chatChannel]);

  const activeConversation = useMemo(() => {
    if (!selectedConversation && conversations.length) {
      return conversations[0];
    }
    return conversations.find((conversation) => conversation.id === selectedConversation);
  }, [conversations, selectedConversation]);

  const messages = useMemo(
    () =>
      chatMessages.filter((message) =>
        chatChannel === 'Booking'
          ? message.bookingId === activeConversation?.id
          : message.author === activeConversation?.id
      ),
    [activeConversation, chatChannel]
  );

  return (
    <VStack gap="$8">
      <VStack gap="$2">
        <Heading size="2xl" color="$background50">
          Chat Omnicanale
        </Heading>
        <Text color="rgba(226,235,255,0.7)">
          Coordina conversazioni dirette e richieste legate alle prenotazioni senza cambiare schermata.
        </Text>
      </VStack>
      <HStack gap="$4" alignItems="center">
        <ButtonGroup isAttached space="0.5">
          <Button
            variant={chatChannel === 'Direct' ? 'solid' : 'outline'}
            action="primary"
            onPress={() => setChatChannel('Direct')}
          >
            <ButtonText>Direct</ButtonText>
          </Button>
          <Button
            variant={chatChannel === 'Booking' ? 'solid' : 'outline'}
            action="primary"
            onPress={() => setChatChannel('Booking')}
          >
            <ButtonText>Booking</ButtonText>
          </Button>
        </ButtonGroup>
      </HStack>
      <HStack gap="$6" alignItems="stretch" flexWrap="wrap">
        <GlassColumn title="Conversazioni" width={{ base: '100%', xl: '320px' }}>
          <VStack gap="$3">
            {conversations.map((conversation) => (
              <Box
                key={conversation.id}
                px="$4"
                py="$3"
                borderRadius="$xl"
                borderWidth={1}
                borderColor={
                  activeConversation?.id === conversation.id
                    ? 'rgba(79,111,255,0.45)'
                    : 'rgba(255,255,255,0.12)'
                }
                bgColor={
                  activeConversation?.id === conversation.id
                    ? 'rgba(79,111,255,0.15)'
                    : 'rgba(255,255,255,0.04)'
                }
                cursor="pointer"
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <Text color="$background50" fontWeight="$bold">
                  {conversation.title}
                </Text>
                <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                  {conversation.subtitle}
                </Text>
                <Text color="rgba(226,235,255,0.65)" mt="$2" numberOfLines={2}>
                  {conversation.lastMessage}
                </Text>
              </Box>
            ))}
          </VStack>
        </GlassColumn>
        <GlassColumn title="Messaggi" width={{ base: '100%', xl: '480px' }}>
          <ScrollView height="360px" padding="$2">
            <VStack gap="$3">
              {messages.map((message) => (
                <HStack
                  key={message.id}
                  justifyContent={message.direction === 'out' ? 'flex-end' : 'flex-start'}
                >
                  <Box
                    maxWidth="70%"
                    px="$4"
                    py="$3"
                    borderRadius="$xl"
                    bgColor={message.direction === 'out' ? 'rgba(79,111,255,0.4)' : 'rgba(255,255,255,0.12)'}
                    borderWidth={1}
                    borderColor="rgba(255,255,255,0.15)"
                  >
                    <Text color="$background50">{message.message}</Text>
                    <Text color="rgba(226,235,255,0.6)" fontSize="$xs" mt="$1">
                      {formatDateTime(message.timestamp)}
                    </Text>
                  </Box>
                </HStack>
              ))}
            </VStack>
          </ScrollView>
          <HStack mt="$4" gap="$3" alignItems="center">
            <Input flex={1}>
              <InputField placeholder="Scrivi un messaggio..." color="$background50" />
            </Input>
            <Button>
              <HStack alignItems="center" gap="$2">
                <Icon as={Send} color="$background50" />
                <ButtonText>Invia</ButtonText>
              </HStack>
            </Button>
          </HStack>
        </GlassColumn>
        <GlassColumn title="Dettagli" width={{ base: '100%', xl: '320px' }}>
          {chatChannel === 'Booking' && activeConversation ? (
            <BookingDetails bookingId={activeConversation.id} />
          ) : (
            <DirectDetails guestName={activeConversation?.title ?? ''} />
          )}
        </GlassColumn>
      </HStack>
    </VStack>
  );
}

function GlassColumn({
  title,
  children,
  width,
}: {
  title: string;
  children: ReactNode;
  width: string | Record<string, string>;
}) {
  return (
    <Box
      flex={1}
      width={width}
      borderRadius="$xl"
      borderWidth={1}
      borderColor="rgba(255,255,255,0.12)"
      bgColor="rgba(13,24,41,0.55)"
      p="$5"
      style={{ backdropFilter: 'blur(18px)' }}
    >
      <HStack alignItems="center" gap="$2" mb="$4">
        <Icon as={MessageCircle} color="$primary200" />
        <Heading size="lg" color="$background50">
          {title}
        </Heading>
      </HStack>
      {children}
    </Box>
  );
}

function BookingDetails({ bookingId }: { bookingId: string }) {
  const booking = bookings.find((item) => item.id === bookingId);
  const client = clients.find((item) => item.id === booking?.clientId);
  if (!booking) return null;
  const initials = client?.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
  return (
    <VStack gap="$4">
      <HStack gap="$3" alignItems="center">
        <Avatar bgColor="rgba(79,111,255,0.4)" borderRadius="$xl">
          <AvatarFallbackText>{initials}</AvatarFallbackText>
        </Avatar>
        <VStack>
          <Text color="$background50" fontWeight="$bold">
            {client?.name}
          </Text>
          <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
            {booking.title}
          </Text>
        </VStack>
      </HStack>
      <Text color="rgba(226,235,255,0.6)">
        Check-in {formatDate(booking.checkIn)} · Canale {booking.channel}
      </Text>
      <VStack gap="$2">
        <Text color="rgba(226,235,255,0.7)" fontWeight="$bold">
          To-do collegati
        </Text>
        {booking.tasks.map((task) => (
          <Text key={task} color="$background50" fontSize="$sm">
            • {task}
          </Text>
        ))}
      </VStack>
    </VStack>
  );
}

function DirectDetails({ guestName }: { guestName: string }) {
  if (!guestName) return <Text color="rgba(226,235,255,0.6)">Seleziona una conversazione.</Text>;
  return (
    <VStack gap="$4">
      <Text color="$background50" fontWeight="$bold">
        {guestName}
      </Text>
      <Text color="rgba(226,235,255,0.6)">
        Conversazione diretta registrata dal concierge. Aggiungi tag per personalizzare i prossimi follow-up.
      </Text>
      <Button variant="outline" size="sm">
        <ButtonText>Aggiungi nota</ButtonText>
      </Button>
    </VStack>
  );
}
