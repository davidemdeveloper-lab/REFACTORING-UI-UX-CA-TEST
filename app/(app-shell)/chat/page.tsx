'use client';

import { useMemo } from 'react';
import { Paperclip, Send } from 'lucide-react';
import { chatThreads, chatMessages, chatParticipants } from '@/data/chat';
import { bookings } from '@/data/bookings';
import { useUIStore } from '@/store/ui-store';
import { StatusPill } from '@/components/common/StatusPill';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonIcon } from '@/components/ui/button';
import { getInitials, formatDate, formatCurrency } from '@/lib/utils';

export default function ChatPage() {
  const { selectedChatId, selectChat } = useUIStore();
  const threads = chatThreads;
  const activeThread = useMemo(() => {
    if (selectedChatId) {
      return threads.find((thread) => thread.id === selectedChatId) ?? threads[0];
    }
    return threads[0];
  }, [selectedChatId, threads]);

  const activeMessages = chatMessages.filter((message) => message.threadId === activeThread.id);
  const participantsMap = Object.fromEntries(chatParticipants.map((p) => [p.id, p]));
  const relatedBooking = bookings.find((booking) => booking.id === activeThread.bookingId);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,2fr)_minmax(0,1.2fr)]">
      <aside className="glass-panel-soft flex max-h-[70vh] flex-col gap-4 rounded-3xl border border-white/10 p-4">
        <header className="flex flex-col gap-2">
          <StatusPill label="Conversazioni" tone="sky" />
          <p className="text-sm text-slate-300">Chat dirette e collegate alle prenotazioni.</p>
        </header>
        <div className="flex flex-col gap-2 overflow-y-auto pr-2">
          {threads.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => selectChat(thread.id)}
              className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                thread.id === activeThread.id
                  ? 'border-amber-400/60 bg-amber-500/10 text-amber-100'
                  : 'border-white/10 bg-white/5 text-slate-200 hover:border-amber-400/40 hover:bg-amber-500/5'
              }`}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                <span>{thread.type === 'direct' ? 'Diretto' : 'Prenotazione'}</span>
                {thread.unread > 0 && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] text-emerald-200">
                    {thread.unread}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm font-semibold text-white">{thread.title}</p>
              <p className="text-xs text-slate-300">{thread.lastMessagePreview}</p>
            </button>
          ))}
        </div>
      </aside>
      <section className="glass-panel-soft flex h-[70vh] flex-col overflow-hidden rounded-3xl border border-white/10">
        <header className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">{activeThread.title}</h2>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Ultima attività {formatDate(activeThread.lastActivity, "d MMM 'alle' HH:mm")}
            </p>
          </div>
          <div className="flex -space-x-2">
            {activeThread.participants.map((participant) => (
              <div
                key={participant.id}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs font-semibold text-white"
                style={{ backgroundColor: participant.avatarColor }}
              >
                {getInitials(participant.name)}
              </div>
            ))}
          </div>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {activeMessages.map((message) => {
            const sender = participantsMap[message.senderId];
            const alignRight = sender?.role === 'team';
            return (
              <div key={message.id} className={`flex ${alignRight ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[70%] rounded-2xl border px-4 py-3 text-sm shadow-lg ${
                    alignRight
                      ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-50'
                      : 'border-white/10 bg-white/10 text-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-400">
                    <span>{sender?.name ?? 'Ospite'}</span>
                    <span>{formatDate(message.sentAt, "HH:mm")}</span>
                  </div>
                  <p className="mt-2 whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <footer className="border-t border-white/10 bg-white/5 px-6 py-4">
          <div className="flex items-center gap-3">
            <Input
              size="lg"
              variant="outline"
              className="flex-1 rounded-2xl border-white/15 bg-white/5"
            >
              <InputField placeholder="Scrivi un messaggio..." placeholderTextColor="#94a3b8" />
            </Input>
            <Button
              size="md"
              action="primary"
              variant="solid"
              className="h-11 w-11 rounded-full border border-amber-400/50 bg-gradient-to-br from-amber-400 to-orange-500"
            >
              <ButtonIcon as={Send} className="text-slate-900" size="sm" />
            </Button>
            <Button
              size="md"
              variant="outline"
              action="secondary"
              className="h-11 w-11 rounded-full border border-white/20 bg-white/5"
            >
              <ButtonIcon as={Paperclip} className="text-white" size="sm" />
            </Button>
          </div>
        </footer>
      </section>
      <aside className="glass-panel-soft flex max-h-[70vh] flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 p-5">
        <header className="flex flex-col gap-2">
          <StatusPill label="Contesto" tone="emerald" />
          <p className="text-sm text-slate-300">
            Booking collegato, note e prossimi step.
          </p>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {relatedBooking ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Prenotazione</p>
              <p className="mt-1 text-sm font-semibold text-white">{relatedBooking.title}</p>
              <p className="text-xs text-slate-300">{relatedBooking.roomType}</p>
              <p className="mt-2 text-xs text-slate-400">
                {formatDate(`${relatedBooking.arrival}T12:00:00Z`, "d MMM")} → {formatDate(`${relatedBooking.departure}T12:00:00Z`, 'd MMM')} • {relatedBooking.channel}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-amber-300">Valore {formatCurrency(relatedBooking.value)}</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 text-sm text-slate-200">
              Nessuna prenotazione collegata.
            </div>
          )}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Partecipanti</p>
            <ul className="mt-2 space-y-2">
              {activeThread.participants.map((participant) => (
                <li key={participant.id} className="flex items-center justify-between">
                  <span>{participant.name}</span>
                  <StatusPill label={participant.role} tone={participant.role === 'team' ? 'emerald' : 'sky'} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
