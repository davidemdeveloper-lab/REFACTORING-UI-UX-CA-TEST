import { notFound } from 'next/navigation';
import { MessageCircleCode, NotebookPen, Sparkles } from 'lucide-react';
import { clients } from '@/data/clients';
import { bookings } from '@/data/bookings';
import { Timeline } from '@/components/common/Timeline';
import { StatusPill } from '@/components/common/StatusPill';
import { formatCurrency, stayStatusLabel } from '@/lib/utils';

export default async function ClientDetailPage({ params }: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  const client = clients.find((item) => item.id === clientId);
  if (!client) {
    notFound();
  }

  const clientBookings = bookings.filter((booking) => booking.clientId === client.id);
  const communications = clientBookings.flatMap((booking) => booking.timeline);

  return (
    <div className="flex flex-col gap-10">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="glass-panel-soft rounded-3xl border border-white/10 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <StatusPill label="Scheda cliente" tone="sky" />
            {client.vip && <StatusPill label="VIP" tone="emerald" />}
            {client.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">
                {client.name} {client.surname}
              </h1>
              <p className="text-sm text-slate-300">
                {client.city}, {client.country} • {client.email} • {client.phone}
              </p>
            </div>
            <StatusPill label={stayStatusLabel[client.lastStayStatus]} tone="amber" />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Soggiorni totali</p>
              <p className="mt-2 text-2xl font-semibold text-white">{client.totalStays}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Spesa lifetime</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(client.spend)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Newsletter</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {client.newsletter ? 'Attiva' : 'Non attiva'}
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Note strategiche</p>
            <p className="mt-2 text-sm text-slate-200">{client.notes}</p>
          </div>
        </div>
        <div className="glass-panel-soft flex flex-col gap-5 rounded-3xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white">Prossime azioni</h2>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-400/30 to-orange-500/10 p-4 text-sm text-amber-100">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
                <Sparkles className="h-4 w-4" /> Azione suggerita
              </div>
              <p className="text-sm text-amber-50">{client.nextAction}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                <MessageCircleCode className="h-4 w-4" /> Comunicazioni attive
              </div>
              <ul className="space-y-2 text-sm text-slate-200">
                {clientBookings.map((booking) => (
                  <li key={booking.id} className="flex flex-col rounded-xl border border-white/10 bg-slate-900/40 p-3">
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{booking.title}</span>
                    <span className="text-sm text-white">{booking.tags.join(', ')}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                <NotebookPen className="h-4 w-4" /> Ultime note
              </div>
              <p>
                Gli automatismi hanno identificato 2 opportunità di upsell spa e 1 richiesta di late checkout non ancora gestita.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-white">Timeline comunicazioni</h2>
        <Timeline events={communications} />
      </section>
    </div>
  );
}
