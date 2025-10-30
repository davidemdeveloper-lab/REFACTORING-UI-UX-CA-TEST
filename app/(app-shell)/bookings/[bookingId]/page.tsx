import { notFound } from 'next/navigation';
import { CalendarClock, CreditCard, MapPin, Navigation } from 'lucide-react';
import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { Timeline } from '@/components/common/Timeline';
import { StatusPill } from '@/components/common/StatusPill';
import { bookingStatusColor, formatCurrency, formatDate } from '@/lib/utils';

export default async function BookingDetailPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;
  const booking = bookings.find((item) => item.id === bookingId);
  if (!booking) {
    notFound();
  }
  const client = clients.find((item) => item.id === booking.clientId);

  return (
    <div className="flex flex-col gap-10">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="glass-panel-soft rounded-3xl border border-white/10 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill label="Dettaglio prenotazione" tone="sky" />
            <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] ${bookingStatusColor[booking.status]}`}>
              {booking.status}
            </span>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-white">{booking.title}</h1>
            <p className="text-sm text-slate-300">Riferimento: {booking.reference}</p>
            <p className="text-sm text-slate-300">
              {formatDate(`${booking.arrival}T12:00:00Z`, "d MMM yyyy")} → {formatDate(`${booking.departure}T12:00:00Z`, 'd MMM yyyy')} • {booking.roomType}
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                <CalendarClock className="h-4 w-4" /> Canale
              </div>
              <p className="text-sm text-slate-200">{booking.channel}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                <CreditCard className="h-4 w-4" /> Valore
              </div>
              <p className="text-sm text-slate-200">{formatCurrency(booking.value)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                <Navigation className="h-4 w-4" /> Tags
              </div>
              <p className="text-sm text-slate-200">{booking.tags.join(', ')}</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Ospite</p>
            <p className="mt-2 text-sm text-slate-200">
              {client ? `${client.name} ${client.surname} • ${client.email} • ${client.phone}` : 'Ospite non presente in CRM'}
            </p>
          </div>
        </div>
        <div className="glass-panel-soft flex flex-col gap-5 rounded-3xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white">Azioni suggerite</h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
              <MapPin className="h-4 w-4" /> Esperienze consigliate
            </div>
            <ul className="list-disc space-y-2 pl-5">
              <li>Inviare itinerario personalizzato 48h prima dell’arrivo con suggerimenti locali.</li>
              <li>Offrire check-in express e welcome gift in camera all’arrivo.</li>
              <li>Programmare follow-up post soggiorno con richiesta recensione.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-amber-500/10 p-4 text-sm text-amber-50">
            <p className="text-xs uppercase tracking-[0.3em]">Monitoraggio pagamenti</p>
            <p className="mt-2 text-sm">
              Se il pagamento è in sospeso, invia reminder automatico e notifica il team finance.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-white">Timeline comunicazioni</h2>
        <Timeline events={booking.timeline} />
      </section>
    </div>
  );
}
