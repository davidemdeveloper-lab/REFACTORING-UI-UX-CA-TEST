'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Input,
  InputField,
  ScrollView,
  Button,
} from '@gluestack-ui/themed';
import { MessageCircleMore, SendHorizontal } from 'lucide-react';
import { conversations } from '@/data/chat';
import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { formatCurrency, formatDate, formatTimeDistance } from '@/utils/format';
import { GlassCard } from '@/components/common/GlassCard';

export default function ChatPage() {
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const conversation = useMemo(
    () => conversations.find((item) => item.id === activeId) ?? conversations[0],
    [activeId]
  );
  const relatedBooking = bookings.find((booking) => booking.id === conversation?.bookingId);
  return (
    <VStack space="xl">
      <HStack space="sm" alignItems="center">
        <MessageCircleMore size={22} color="#8CB6FF" />
        <Heading size="lg" color="white">
          Chat Concierge
        </Heading>
      </HStack>
      <HStack space="lg" alignItems="stretch" flexWrap="wrap">
        <GlassCard flexBasis="300px" flexGrow={1} sx={{ maxHeight: 520 }}>
          <Heading size="sm" color="white" mb="$3">
            Conversazioni
          </Heading>
          <ScrollView>
            <VStack space="sm">
              {conversations.map((item) => (
                <Box
                  key={item.id}
                  px="$4"
                  py="$3"
                  rounded="$xl"
                  bg={item.id === conversation?.id ? 'rgba(79, 140, 255, 0.16)' : 'rgba(255, 255, 255, 0.04)'}
                  borderWidth={1}
                  borderColor={item.id === conversation?.id ? 'rgba(79, 140, 255, 0.4)' : 'rgba(255, 255, 255, 0.12)'}
                  onClick={() => setActiveId(item.id)}
                  role="button"
                  style={{ cursor: 'pointer' }}
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <VStack space="xs">
                      <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
                        {item.title}
                      </Text>
                      <Text color="rgba(148,163,184,0.8)" fontSize="$xs">
                        Aggiornato {formatTimeDistance(item.lastUpdate)}
                      </Text>
                    </VStack>
                    {item.unread > 0 && (
                      <Badge variant="solid" bg="rgba(79,140,255,0.85)" borderColor="transparent">
                        <Text color="#0B1220">{item.unread}</Text>
                      </Badge>
                    )}
                  </HStack>
                  <Text color="rgba(148,163,184,0.8)" fontSize="$xs" mt="$2">
                    {item.tags.join(' • ')}
                  </Text>
                </Box>
              ))}
            </VStack>
          </ScrollView>
        </GlassCard>

        <GlassCard flexBasis="480px" flexGrow={2} sx={{ maxHeight: 520 }}>
          <Heading size="sm" color="white" mb="$3">
            Thread
          </Heading>
          <ScrollView>
            <VStack space="md">
              {conversation?.messages.map((message) => (
                <Box
                  key={message.id}
                  alignSelf={message.role === 'ospite' ? 'flex-start' : 'flex-end'}
                  maxWidth="85%"
                  px="$4"
                  py="$3"
                  rounded="$xl"
                  bg={message.role === 'ospite' ? 'rgba(255,255,255,0.08)' : 'rgba(79,140,255,0.18)'}
                  borderWidth={1}
                  borderColor="rgba(255,255,255,0.12)"
                >
                  <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
                    {message.sender}
                  </Text>
                  <Text color="rgba(226,232,240,0.92)" mt="$1">
                    {message.body}
                  </Text>
                  <Text color="rgba(148,163,184,0.75)" fontSize="$xs" mt="$2">
                    {formatTimeDistance(message.timestamp)}
                  </Text>
                </Box>
              ))}
            </VStack>
          </ScrollView>
          <HStack mt="$4" space="sm" alignItems="center">
            <Input flex={1} bg="rgba(255,255,255,0.08)" borderColor="rgba(255,255,255,0.18)" rounded="$full" px="$4">
              <InputField placeholder="Scrivi una risposta..." color="rgba(226,232,240,0.9)" />
            </Input>
            <Button
              bg="rgba(79,140,255,0.9)"
              borderColor="transparent"
              px="$4"
              py="$3"
              rounded="$xl"
            >
              <SendHorizontal size={16} color="white" />
            </Button>
          </HStack>
        </GlassCard>

        <GlassCard flexBasis="320px" flexGrow={1} sx={{ maxHeight: 520 }}>
          <Heading size="sm" color="white" mb="$3">
            Contesto prenotazione
          </Heading>
          {relatedBooking ? (
            <VStack space="md">
              <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
                {relatedBooking.number}
              </Text>
              <Text color="rgba(148,163,184,0.8)">
                {formatDate(relatedBooking.checkIn)} → {formatDate(relatedBooking.checkOut)} · {relatedBooking.roomType}
              </Text>
              <Text color="rgba(148,163,184,0.75)" fontSize="$xs">
                Valore {formatCurrency(relatedBooking.value)}
              </Text>
              <DividerBlock />
              <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
                Timeline rapida
              </Text>
              <VStack space="sm">
                {relatedBooking.timeline.slice(0, 3).map((event) => (
                  <Box key={event.id} bg="rgba(255,255,255,0.05)" px="$3" py="$2" rounded="$lg">
                    <Text color="rgba(226,232,240,0.95)">{event.title}</Text>
                    <Text color="rgba(148,163,184,0.75)" fontSize="$xs">
                      {formatTimeDistance(event.timestamp)}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </VStack>
          ) : (
            <Text color="rgba(148,163,184,0.8)">Nessuna prenotazione collegata.</Text>
          )}
        </GlassCard>
      </HStack>
    </VStack>
  );
}

const DividerBlock = () => (
  <Box height={1} bg="rgba(255,255,255,0.12)" borderRadius={999} />
);
