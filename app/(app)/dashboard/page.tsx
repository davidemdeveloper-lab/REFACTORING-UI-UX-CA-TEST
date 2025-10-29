import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { MetricCard } from '@/components/common/metric-card';
import { GlassCard } from '@/components/common/glass-card';
import { StatusBadge } from '@/components/common/status-badge';
import { ChannelIcon } from '@/components/common/channel-icon';
import { IoTDeviceCard } from '@/components/common/iot-device-card';
import { AutomationFlow } from '@/components/common/automation-flow';
import { bookings, conversations, guestProfiles, iotDevices, tasks } from '@/lib/mock-data';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils';
import {
  CalendarClock,
  Clock3,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  Users,
} from 'lucide-react-native';

export default function DashboardPage() {
  const upcomingBookings = bookings.slice(0, 3);
  const openConversations = conversations.filter((conv) => conv.status !== 'risolta');
  const openTasks = tasks.slice(0, 3);
  const highlightGuest = guestProfiles[0];

  return (
    <AppShell
      title="Dashboard"
      description="Stato clienti, automazioni e segnali IoT in tempo reale"
      actions={
        <button className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80">
          Registra nuovo cliente
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="grid gap-6 lg:col-span-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              icon={Users}
              label="Clienti attivi"
              value={`${guestProfiles.length}`}
              trend={{ direction: 'up', value: '+12% vs 30gg' }}
              caption="Nuove anagrafiche con preferenze emozionali complete"
            />
            <MetricCard
              icon={CalendarClock}
              label="Prenotazioni in corso"
              value={`${bookings.filter((b) => b.status !== 'archiviata').length}`}
              trend={{ direction: 'stable', value: '92% occupazione' }}
              caption="Include proposte in pipeline"
            />
            <MetricCard
              icon={MessageCircle}
              label="Conversazioni aperte"
              value={`${openConversations.length}`}
              trend={{ direction: 'down', value: '-35% tempi risposta' }}
              caption="AI in assistenza sull’82% dei messaggi"
            />
            <MetricCard
              icon={Sparkles}
              label="Suggerimenti AI attivi"
              value="18"
              trend={{ direction: 'up', value: '+5 nuove idee' }}
              caption="Tone of voice coerente con brand spa boutique"
            />
          </div>
          <GlassCard>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">Ospite in evidenza</p>
                <h2 className="text-2xl font-semibold text-white">{highlightGuest.name}</h2>
                <p className="text-sm text-white/70">
                  Prossimo soggiorno il {formatDate(highlightGuest.upcomingStay ?? '')} • {highlightGuest.tags.join(' · ')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="badge-pill bg-[var(--accent-color)]/20 text-white">
                  Fidelizzazione {highlightGuest.loyaltyTier}
                </span>
                <span className="badge-pill bg-white/10 text-white/70">
                  Automazioni sanità {highlightGuest.automationHealth}%
                </span>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <GlassCard className="bg-white/5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Preferenze</p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {highlightGuest.preferences.map((pref) => (
                    <li key={pref.id} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]" />
                      <span>{pref.label}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
              <GlassCard className="bg-white/5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Note emozionali</p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {highlightGuest.notes.map((note) => (
                    <li key={note.id}>
                      <p className="text-xs text-white/50">{formatDateTime(note.createdAt)} • {note.author}</p>
                      <p>{note.content}</p>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Prenotazioni recenti</p>
                <h3 className="text-lg font-semibold text-white">Pipeline soggiorni</h3>
              </div>
              <button className="rounded-xl border border-white/20 px-3 py-1 text-xs font-semibold text-white/70">
                Apri calendario
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{booking.code}</p>
                    <p className="text-xs text-white/60">
                      {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)} • {booking.roomType}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={booking.status} />
                    <ChannelIcon channel={booking.channel} />
                    <span className="badge-pill bg-white/10 text-white/70">
                      {formatCurrency(booking.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
        <div className="grid gap-6 lg:col-span-4">
          <GlassCard>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">Task prioritari</h3>
              <span className="badge-pill bg-white/10 text-white/60">{openTasks.length} da completare</span>
            </div>
            <ul className="mt-4 space-y-3">
              {openTasks.map((task) => (
                <li key={task.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{task.title}</p>
                  <p className="text-xs text-white/60">{task.description}</p>
                  <p className="mt-2 text-xs text-white/50">Entro {formatDate(task.dueAt)}</p>
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <HeartHandshake size={20} color="rgba(255,255,255,0.9)" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Conversazioni da coccolare</p>
                <h3 className="text-lg font-semibold text-white">{openConversations.length} chat aperte</h3>
              </div>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {openConversations.map((conversation) => (
                <li
                  key={conversation.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="font-semibold text-white">{conversation.guestName}</p>
                  <p className="text-xs text-white/60">
                    Ultimo messaggio {formatDateTime(conversation.lastMessageAt)} • AI pronto al{' '}
                    {Math.round(conversation.aiReadiness * 100)}%
                  </p>
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <Clock3 size={20} color="rgba(255,255,255,0.9)" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Segnali IoT</p>
                <h3 className="text-lg font-semibold text-white">Comfort camere in tempo reale</h3>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {iotDevices.slice(0, 2).map((device) => (
                <IoTDeviceCard key={device.id} device={device} />
              ))}
            </div>
          </GlassCard>
          <AutomationFlow steps={bookings[0].automations} />
        </div>
      </div>
    </AppShell>
  );
}
