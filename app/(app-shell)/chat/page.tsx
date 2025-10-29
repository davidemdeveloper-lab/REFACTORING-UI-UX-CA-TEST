'use client';

import { ChatLayout } from '@/components/chat/ChatLayout';
import { SectionHeading } from '@/components/design-system/SectionHeading';
import { palette } from '@/theme/palette';
import { StatusPill } from '@/components/design-system/StatusPill';
import { VStack } from '@/components/ui/vstack';
import { MessageSquareText } from 'lucide-react-native';

export default function ChatPage() {
  return (
    <VStack space="xl">
      <SectionHeading
        title="Chat & AI notifications"
        subtitle="Gestisci conversazioni master-detail con co-pilot intelligente"
        icon={<MessageSquareText size={20} color={palette.accentPrimary} />}
        action={<StatusPill label="3 thread in attesa" tone="warning" />}
      />
      <ChatLayout />
    </VStack>
  );
}

// Validazione: pagina chat integra layout master-detail e stato notifiche AI.
