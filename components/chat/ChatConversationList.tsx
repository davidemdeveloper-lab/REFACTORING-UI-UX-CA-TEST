'use client';

import { VStack, HStack, Text, Input, InputField, Tabs, TabsTabList, TabsTab, TabsTabPanels, TabsTabPanel, Badge, Box } from '@gluestack-ui/themed';
import { Search } from 'lucide-react';
import type { Conversation } from '@/lib/types';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

interface ChatConversationListProps {
  conversations: Conversation[];
  activeConversationId?: string;
  activeTab: 'direct' | 'booking';
  search: string;
  onSearch: (value: string) => void;
  onTabChange: (tab: 'direct' | 'booking') => void;
  onSelect: (id: string) => void;
}

export const ChatConversationList = ({
  conversations,
  activeConversationId,
  activeTab,
  search,
  onSearch,
  onTabChange,
  onSelect
}: ChatConversationListProps) => {
  const filtered = conversations.filter(
    (conversation) =>
      conversation.type === activeTab &&
      conversation.messages.some((message) => message.body.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <VStack space="md" minWidth={260} maxHeight="75vh">
      <Input bg="rgba(15,23,42,0.35)" borderColor="rgba(148,163,184,0.2)">
        <Search size={16} color={palette.steel[200]} />
        <InputField
          value={search}
          onChangeText={onSearch}
          placeholder="Cerca conversazioni"
          aria-label="Cerca conversazioni"
        />
      </Input>
      <Tabs value={activeTab} onValueChange={(value: string) => onTabChange(value as 'direct' | 'booking')}>
        <TabsTabList borderWidth={0}>
          <TabsTab value="direct" mr={12} borderRadius={tokens.radii.md} bg={activeTab === 'direct' ? 'rgba(59,130,246,0.2)' : 'transparent'}>
            Direct
          </TabsTab>
          <TabsTab value="booking" borderRadius={tokens.radii.md} bg={activeTab === 'booking' ? 'rgba(59,130,246,0.2)' : 'transparent'}>
            Booking
          </TabsTab>
        </TabsTabList>
        <TabsTabPanels>
          <TabsTabPanel value={activeTab} px={0}>
            <VStack space="xs" maxHeight="60vh" overflowY="auto" pr={4}>
              {filtered.length === 0 ? (
                <Box
                  px={12}
                  py={16}
                  borderRadius={tokens.radii.md}
                  borderWidth={1}
                  borderColor="rgba(148,163,184,0.2)"
                  bg="rgba(15,23,42,0.2)"
                >
                  <Text fontSize={13} color={palette.steel[200]}>
                    Nessuna conversazione trovata. Prova a modificare la ricerca o il filtro.
                  </Text>
                </Box>
              ) : (
                filtered.map((conversation) => (
                  <Box
                    key={conversation.id}
                    borderRadius={tokens.radii.lg}
                    px={12}
                    py={10}
                    borderWidth={1}
                    borderColor={
                      conversation.id === activeConversationId
                        ? 'rgba(94,161,250,0.5)'
                        : 'rgba(148,163,184,0.2)'
                    }
                    bg={
                      conversation.id === activeConversationId
                        ? 'rgba(59,130,246,0.18)'
                        : 'rgba(15,23,42,0.35)'
                    }
                    onClick={() => onSelect(conversation.id)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={conversation.id === activeConversationId}
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text fontSize={14} fontWeight="600">
                        {conversation.type === 'booking' ? 'Prenotazione' : 'Cliente'} · {conversation.clientId}
                      </Text>
                      <Badge
                        bg={conversation.type === 'booking' ? palette.accent[600] : palette.teal[500]}
                        color={palette.neutrals.white}
                        borderRadius={tokens.radii.sm}
                      >
                        {conversation.type}
                      </Badge>
                    </HStack>
                    <Text fontSize={12} color={palette.steel[200]} mt={4} noOfLines={2}>
                      {conversation.messages[conversation.messages.length - 1]?.body}
                    </Text>
                  </Box>
                ))
              )}
            </VStack>
          </TabsTabPanel>
        </TabsTabPanels>
      </Tabs>
    </VStack>
  );
};
