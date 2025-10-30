import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { PageHeader } from '@/components/common/page-header';
import { Button, ButtonText } from '@/components/ui/button';
import { StatusPill } from '@/components/common/status-pill';
import { chatThreads } from '@/lib/mock-data';
import { formatDate, formatTime } from '@/lib/utils';
import { Bot, MessageCircle, Reply, Sparkles } from 'lucide-react-native';
import { ReactNode } from 'react';

const CHANNEL_ICON: Record<string, ReactNode> = {
  whatsapp: <MessageCircle color="rgb(var(--color-primary-500))" size={16} />,
  email: <Reply color="rgb(var(--color-primary-500))" size={16} />,
  booking: <Sparkles color="rgb(var(--color-primary-500))" size={16} />,
};

export default function ChatPage() {
  const activeThread = chatThreads[0];

  return (
    <Box className="flex flex-col gap-8">
      <PageHeader
        title="Chat unificata"
        subtitle="Gestisci email, WhatsApp e messaggi OTA da un'unica interfaccia con supporto AI."
        actions={
          <Button size="md" action="primary" className="rounded-2xl bg-primary-500 px-6 py-3">
            <Bot color="rgb(var(--color-typography-0))" size={18} />
            <ButtonText className="font-semibold text-typography-0">Attiva auto-risposta</ButtonText>
          </Button>
        }
      />

      <GlassPanel className="grid gap-6 p-6 xl:grid-cols-[1.1fr_2fr_1.2fr]">
        <GlassCard padding="p-4" className="bg-background-0/30">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Conversazioni</Text>
          <Box className="mt-4 flex flex-col gap-3">
            {chatThreads.map((thread) => (
              <GlassCard key={thread.id} padding="p-4" className={`bg-background-0/40 ${thread.id === activeThread.id ? 'border border-primary-500/60' : ''}`}>
                <Box className="flex items-start justify-between">
                  <Box className="flex flex-col gap-1">
                    <Text className="text-sm font-semibold text-typography-0">{thread.subject}</Text>
                    <Text className="text-xs text-typography-300">{thread.guestName}</Text>
                  </Box>
                  <StatusPill label={thread.source.toUpperCase()} tone="info" />
                </Box>
                <Text className="mt-2 text-xs text-typography-300">
                  Ultimo {formatDate(thread.lastMessageAt)} alle {formatTime(thread.lastMessageAt)}
                </Text>
                <Box className="mt-2 flex gap-2 text-xs text-typography-300">
                  {CHANNEL_ICON[thread.source]}
                  <Text>{thread.aiSuggestions.length} suggerimenti AI</Text>
                </Box>
              </GlassCard>
            ))}
          </Box>
        </GlassCard>

        <GlassCard padding="p-4" className="bg-background-0/30">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Thread selezionato</Text>
          <Box className="mt-4 flex flex-col gap-4">
            {activeThread.messages.map((message) => (
              <Box
                key={message.id}
                className={`flex max-w-xl flex-col gap-2 rounded-2xl border border-white/10 bg-background-0/40 p-3 ${message.author === 'hotel' ? 'self-end bg-primary-500/10' : 'self-start'}`}
              >
                <Text className="text-xs uppercase tracking-[0.3em] text-typography-400">
                  {message.author === 'assistant'
                    ? 'AI Concierge'
                    : message.author === 'hotel'
                    ? 'Tu'
                    : 'Ospite'}{' '}
                  · {formatTime(message.timestamp)}
                </Text>
                <Text className="text-sm text-typography-0">{message.content}</Text>
              </Box>
            ))}
          </Box>
          <Box className="mt-6 flex flex-col gap-3">
            <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Proposta AI</Text>
            <GlassCard padding="p-4" className="bg-background-0/40">
              <Text className="text-sm text-typography-0">{activeThread.aiSuggestions[0]}</Text>
              <Box className="mt-3 flex gap-3">
                <Button size="sm" action="primary" className="rounded-2xl bg-primary-500 px-4 py-2">
                  <ButtonText className="text-sm font-semibold text-typography-0">Invia</ButtonText>
                </Button>
                <Button size="sm" variant="outline" action="secondary" className="rounded-2xl border-white/20 px-4 py-2">
                  <ButtonText className="text-sm font-semibold text-typography-0">Modifica</ButtonText>
                </Button>
              </Box>
            </GlassCard>
          </Box>
        </GlassCard>

        <GlassCard padding="p-4" className="bg-background-0/30">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Assistente</Text>
          <Box className="mt-4 flex flex-col gap-3 text-sm text-typography-200">
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-xs text-typography-300">Regole guardrail</Text>
              <Text className="text-sm text-typography-0">
                Non inviare proposte economiche senza validazione direzione.
              </Text>
            </Box>
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-xs text-typography-300">Sentiment ospite</Text>
              <Text className="text-sm text-typography-0">Positivo · Alta propensione upsell</Text>
            </Box>
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-xs text-typography-300">Azioni consigliate</Text>
              <Text className="text-sm text-typography-0">Proponi upgrade spa e late checkout incluso.</Text>
            </Box>
            <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
              <Sparkles color="rgb(var(--color-primary-500))" size={16} />
              <ButtonText className="text-sm font-semibold text-typography-0">Genera nuove idee</ButtonText>
            </Button>
          </Box>
        </GlassCard>
      </GlassPanel>
    </Box>
  );
}
