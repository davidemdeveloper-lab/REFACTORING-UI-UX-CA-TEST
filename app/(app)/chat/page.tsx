'use client';

import { useEffect, useMemo, useState } from 'react';
import { conversations } from '@/data/chat';
import { PageHeader } from '@/components/common/PageHeader';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { MessageCircleMore, SendHorizontal, Filter } from '@/components/icons';

export default function ChatPage() {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<'direct' | 'booking'>('direct');

  const filtered = useMemo(() => {
    return conversations.filter(
      (conversation) =>
        conversation.type === activeType &&
        conversation.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [activeType, query]);

  const [selectedId, setSelectedId] = useState<string>(filtered[0]?.id ?? conversations[0].id);

  useEffect(() => {
    if (!filtered.some((conversation) => conversation.id === selectedId)) {
      setSelectedId(filtered[0]?.id ?? conversations.find((c) => c.type === activeType)?.id ?? conversations[0].id);
    }
  }, [filtered, selectedId, activeType]);

  const activeConversation =
    conversations.find((item) => item.id === selectedId) ?? filtered[0] ?? conversations[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Chat"
        description="Gestisci conversazioni dirette e legate alle prenotazioni con suggerimenti intelligenti"
      />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr_0.7fr]">
        <aside className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Conversazioni</h3>
            <button
              onClick={() => setActiveType(activeType === 'direct' ? 'booking' : 'direct')}
              className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/60"
            >
              {activeType === 'direct' ? 'Direct' : 'Booking'}
            </button>
          </div>
          <Input variant="outline" size="md" className="border-white/15 bg-white/5">
            <InputField
              value={query}
              onChangeText={setQuery}
              placeholder="Cerca conversazione"
              accessibilityLabel="Cerca conversazione"
            />
          </Input>
          <div className="space-y-2 overflow-y-auto pr-2" style={{ maxHeight: '540px' }}>
            {filtered.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedId(conversation.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  selectedId === conversation.id
                    ? 'border-white/30 bg-white/10 text-white shadow-[0_10px_30px_rgba(242,156,80,0.2)]'
                    : 'border-white/10 bg-transparent text-white/60 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>{conversation.lastUpdate}</span>
                  {conversation.unread ? (
                    <span className="rounded-full bg-[#f29c50] px-2 py-0.5 text-[10px] text-white">
                      {conversation.unread}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm font-semibold text-white">{conversation.title}</p>
                <p className="text-xs text-white/50">{conversation.participants.join(' · ')}</p>
              </button>
            ))}
          </div>
        </aside>

        <section className="flex flex-col rounded-3xl border border-white/10 bg-white/5">
          <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div>
              <h3 className="text-sm font-semibold text-white">{activeConversation.title}</h3>
              <p className="text-xs text-white/50">{activeConversation.participants.join(' · ')}</p>
            </div>
            <Button action="secondary" variant="outline" size="sm" className="border-white/20 bg-white/5">
              <ButtonIcon as={Filter} className="text-white/70" />
              <ButtonText className="text-white">Filtri smart</ButtonText>
            </Button>
          </header>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-6" style={{ maxHeight: '560px' }}>
            {activeConversation.timeline.map((message) => (
              <article
                key={message.id}
                className={`max-w-[80%] rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
                  message.authorRole === 'staff'
                    ? 'self-end border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
                    : 'self-start border-white/10 bg-white/5 text-white/80'
                }`}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">{message.author}</p>
                <p className="mt-2">{message.content}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/40">{message.at}</p>
              </article>
            ))}
          </div>
          <footer className="border-t border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <Input variant="outline" size="lg" className="flex-1 border-white/15 bg-white/5">
                <InputField placeholder="Scrivi una risposta personalizzata" />
              </Input>
              <Button action="primary" variant="solid" size="md" className="bg-[#f29c50] px-5">
                <ButtonIcon as={SendHorizontal} className="text-white" />
                <ButtonText className="text-white">Invia</ButtonText>
              </Button>
            </div>
          </footer>
        </section>

        <aside className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <MessageCircleMore className="h-5 w-5 text-[#f29c50]" strokeWidth={1.6} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Insight conversazione</p>
              <p className="text-xs text-white/50">Suggerimenti dinamici</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Tono consigliato</p>
              <p className="mt-1 text-white">Empatico e risolutivo</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Prossima azione</p>
              <p className="mt-1 text-white">Invia guida eventi cittadini + link concierge digitale</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Automazioni correlate</p>
              <ul className="mt-2 space-y-1 text-xs text-white/60">
                <li>· Sequenza Anniversary Delight</li>
                <li>· Smart welcome kit 72h</li>
                <li>· Reminder spa premium</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
