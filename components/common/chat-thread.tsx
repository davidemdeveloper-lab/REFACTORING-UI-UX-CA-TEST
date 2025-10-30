import React from 'react';
import { Conversation } from '@/lib/types';
import { GlassCard } from './glass-card';
import { formatDateTime, sentimentColor } from '@/lib/utils';
import { ChannelIcon } from './channel-icon';

export const ChatThread = ({ conversation }: { conversation: Conversation }) => {
  return (
    <GlassCard>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{conversation.guestName}</p>
          <p className="text-xs text-white/60">Ultimo messaggio: {formatDateTime(conversation.lastMessageAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <ChannelIcon channel={conversation.channel} />
          <span className="badge-pill bg-white/10 text-white/70">
            Stato: {conversation.status.replace('_', ' ')}
          </span>
          <span className="badge-pill bg-[var(--accent-color)]/20 text-white">
            AI pronto al {Math.round(conversation.aiReadiness * 100)}%
          </span>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${
              message.author === 'hotel' ? 'ml-8' : message.author === 'ai' ? 'ml-16' : ''
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-pill bg-white/10 text-white/60">
                {message.author === 'ai'
                  ? 'AI Concierge'
                  : message.author === 'hotel'
                  ? 'Operatore'
                  : conversation.guestName}
              </span>
              {message.sentiment ? (
                <span className={`badge-pill ${sentimentColor[message.sentiment]}`.replace('text-', 'text-')}>
                  Sentiment {message.sentiment}
                </span>
              ) : null}
              <span className="badge-pill bg-white/10 text-white/50">
                {formatDateTime(message.sentAt)}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{message.content}</p>
            {message.requiresApproval ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button className="rounded-xl bg-[var(--accent-color)]/80 px-3 py-1 text-xs font-semibold text-[#091420]">
                  Approva risposta AI
                </button>
                <button className="rounded-xl border border-white/20 px-3 py-1 text-xs font-semibold text-white/80">
                  Modifica manualmente
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
