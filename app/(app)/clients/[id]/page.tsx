import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { bookings, conversations, guestProfiles, newsletterSubscribers } from '@/lib/mock-data';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils';
import { GlassCard } from '@/components/common/glass-card';
import { StatusBadge } from '@/components/common/status-badge';
import { ChannelIcon } from '@/components/common/channel-icon';
import { ChatThread } from '@/components/common/chat-thread';
import { AutomationFlow } from '@/components/common/automation-flow';
import { Heart, MapPin, Sparkles, UserRound } from 'lucide-react-native';

export default function ClientDetail({ params }: { params: { id: string } }) {
  const client = guestProfiles.find((guest) => guest.id === params.id);
  if (!client) {
    notFound();
  }

  const clientBookings = bookings.filter((booking) => booking.guestId === client.id);
  const clientConversations = conversations.filter((conversation) => conversation.guestId === client.id);
  const newsletter = newsletterSubscribers.find((subscriber) => subscriber.guestId === client.id);

  return (
    <AppShell
      title={client.name}
      description="Profilo emozionale e storico interazioni"
      actions={
        <button className="rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-xs font-semibold text-[#07131e] shadow-md shadow-[var(--accent-glow)]">
          Avvia conversazione
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <GlassCard>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <UserRound size={28} color="rgba(255,255,255,0.9)" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Identikit ospite</p>
                  <h2 className="text-2xl font-semibold text-white">{client.name}</h2>
                  <p className="text-sm text-white/70">{client.email} • {client.phone}</p>
                </div>
              </div>
              <span className="badge-pill bg-[var(--accent-color)]/20 text-white">{client.loyaltyTier} Member</span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">Ultimo soggiorno</p>
                <p className="mt-2">{formatDate(client.lastStay ?? client.lastInteraction)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">Spesa media</p>
                <p className="mt-2">{formatCurrency(client.averageSpend)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">Newsletter</p>
                <p className="mt-2">{newsletter?.optIn ? 'Iscritto' : 'Non iscritto'}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Preferenze emozionali</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {client.preferences.map((preference) => (
                <div key={preference.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{preference.label}</p>
                  <p className="text-xs text-white/60">{preference.notes ?? 'Preferenza stabile'}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {client.notes.map((note) => (
                <div key={note.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/50">{formatDateTime(note.createdAt)} • {note.author}</p>
                  <p className="mt-1 text-sm text-white/75">{note.content}</p>
                </div>
              ))}
            </div>
          </GlassCard>
          {clientConversations.length ? (
            <GlassCard>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Conversazioni recenti</p>
              <div className="mt-4 space-y-4">
                {clientConversations.map((conversation) => (
                  <ChatThread key={conversation.id} conversation={conversation} />
                ))}
              </div>
            </GlassCard>
          ) : null}
        </div>
        <div className="space-y-6 lg:col-span-4">
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Soggiorni collegati</p>
            <ul className="mt-3 space-y-3 text-sm text-white/70">
              {clientBookings.map((booking) => (
                <li key={booking.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="flex items-center justify-between text-white">
                    <span>{booking.code}</span>
                    <StatusBadge status={booking.status} />
                  </p>
                  <p className="text-xs text-white/60">
                    {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
                  </p>
                  <p className="text-xs text-white/60">{booking.roomType}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <ChannelIcon channel={booking.channel} />
                    <span className="badge-pill bg-white/10 text-white/70">{formatCurrency(booking.total)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>
          {clientBookings[0] ? <AutomationFlow steps={clientBookings[0].automations} /> : null}
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <Sparkles size={18} color="rgba(255,255,255,0.85)" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Azioni consigliate</p>
                <h3 className="text-lg font-semibold text-white">Cura personalizzata</h3>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>• Invio proposta spa “Aurora Night” con fragranze personalizzate.</li>
              <li>• Preparare welcome note con riferimenti al suo ultimo soggiorno.</li>
              <li>• Suggerire upgrade navetta premium dal portale ospite.</li>
            </ul>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <MapPin size={18} color="rgba(255,255,255,0.85)" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Portale ospite</p>
                <h3 className="text-lg font-semibold text-white">Accessi recenti</h3>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/70">
              Ultimo accesso 12 feb alle 21:34. Ha consultato servizi spa e prenotato colazione in camera.
            </p>
            <button className="mt-4 w-full rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold text-white/80">
              Invia link personalizzato
            </button>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <Heart size={18} color="rgba(255,255,255,0.85)" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Note emozionali</p>
                <h3 className="text-lg font-semibold text-white">Fascicoli di cura</h3>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/70">
              {client.notes[0]?.content ?? 'Nessuna nota registrata. Aggiungi insight per personalizzare la relazione.'}
            </p>
            <button className="mt-4 w-full rounded-2xl bg-[var(--accent-color)]/20 px-4 py-2 text-xs font-semibold text-white">
              Aggiungi nota
            </button>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
