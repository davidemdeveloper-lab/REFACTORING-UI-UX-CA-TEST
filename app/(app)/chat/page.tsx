import { AppShell } from '@/components/layout/app-shell';
import { conversations } from '@/lib/mock-data';
import { GlassCard } from '@/components/common/glass-card';
import { ChatThread } from '@/components/common/chat-thread';
import { ChannelIcon } from '@/components/common/channel-icon';
import { formatDateTime } from '@/lib/utils';
import { Bot, MessageSquarePlus, ShieldCheck } from 'lucide-react-native';

export default function ChatPage() {
  const activeConversation = conversations[0];

  return (
    <AppShell
      title="Chat Unificata"
      description="Email, WhatsApp e Booking in un’unica regia"
      actions={
        <button className="flex items-center gap-2 rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-xs font-semibold text-[#07131e] shadow-md shadow-[var(--accent-glow)]">
          <MessageSquarePlus size={16} /> Nuova conversazione
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">In entrata</p>
          <div className="mt-3 space-y-3">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${
                  conversation.id === activeConversation.id ? 'border-white/25 bg-white/10' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{conversation.guestName}</p>
                  <ChannelIcon channel={conversation.channel} />
                </div>
                <p className="text-xs text-white/60">{formatDateTime(conversation.lastMessageAt)}</p>
                <p className="text-xs text-white/50">
                  AI readiness {Math.round(conversation.aiReadiness * 100)}% — Stato {conversation.status.replace('_', ' ')}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
        <div className="space-y-4">
          <ChatThread conversation={activeConversation} />
          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                  <Bot size={18} color="rgba(255,255,255,0.85)" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Suggerimenti AI</p>
                  <h3 className="text-lg font-semibold text-white">Risposte proattive</h3>
                </div>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>• Proponi massaggio di coppia alle 19 con tisana rilassante.</li>
                <li>• Offri upgrade navetta premium se arrivo dopo le 20.</li>
                <li>• Ricorda check-in espresso tramite link dedicato.</li>
              </ul>
            </GlassCard>
            <GlassCard>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                  <ShieldCheck size={18} color="rgba(255,255,255,0.85)" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Guardrail conversazione</p>
                  <h3 className="text-lg font-semibold text-white">Escalation intelligente</h3>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/70">
                L’AI passa all’operatore se il cliente richiede modifiche tariffarie o segnala emozioni negative persistenti.
              </p>
              <button className="mt-4 rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold text-white/80">
                Personalizza guardrail
              </button>
            </GlassCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
