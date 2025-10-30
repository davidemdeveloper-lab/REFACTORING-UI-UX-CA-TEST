import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { bookings } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { StatusBadge } from '@/components/common/status-badge';
import { ChannelIcon } from '@/components/common/channel-icon';
import { GlassCard } from '@/components/common/glass-card';
import { Filter, ListPlus, Plus, Send } from 'lucide-react-native';

const STATUSES = [
  { id: 'proposta', label: 'Proposta' },
  { id: 'in_attesa_pagamento', label: 'In attesa' },
  { id: 'pagata', label: 'Pagata' },
  { id: 'in_corso', label: 'In corso' },
  { id: 'checkout', label: 'Checkout' },
];

export default function ReservationsPage() {
  return (
    <AppShell
      title="Prenotazioni"
      description="Governare pipeline, automazioni e upsell"
      actions={
        <Link
          href="/reservations/create"
          className="flex items-center gap-2 rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-xs font-semibold text-[#06131f] shadow-lg shadow-[var(--accent-glow)]"
        >
          <Plus size={16} /> Nuova prenotazione
        </Link>
      }
    >
      <div className="flex flex-col gap-6">
        <GlassCard>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Filtra e orchestra</p>
              <h2 className="text-xl font-semibold text-white">Scegli la vista giusta per decidere</h2>
            </div>
            <button className="flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold text-white/80">
              <Filter size={16} /> Tutti i canali
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {STATUSES.map((status) => (
              <span key={status.id} className="badge-pill border border-white/10 bg-white/10 text-white/70">
                {status.label}
              </span>
            ))}
            <span className="badge-pill border border-white/10 bg-white/10 text-white/70">
              <Send size={14} /> Pagamento online
            </span>
            <span className="badge-pill border border-white/10 bg-white/10 text-white/70">
              <ListPlus size={14} /> Proposte multiple
            </span>
          </div>
        </GlassCard>
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <Link
              key={booking.id}
              href={`/reservations/${booking.id}`}
              className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{booking.code}</p>
                  <p className="text-xs text-white/60">
                    {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)} • {booking.roomType}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={booking.status} />
                  <ChannelIcon channel={booking.channel} />
                  <span className="badge-pill bg-white/10 text-white/70">{formatCurrency(booking.total)}</span>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50">Prossima azione</p>
                  <p className="mt-2 text-sm text-white/80">{booking.nextAction}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50">Tipologia</p>
                  <p className="mt-2 text-sm text-white/80">{booking.type}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50">Camere & ospiti</p>
                  <p className="mt-2 text-sm text-white/80">
                    {booking.rooms} camere • {booking.guests} ospiti
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50">AI confidence</p>
                  <p className="mt-2 text-sm text-white/80">{Math.round(booking.aiConfidence * 100)}%</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
