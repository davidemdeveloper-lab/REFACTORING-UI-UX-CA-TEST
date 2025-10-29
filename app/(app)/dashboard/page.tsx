'use client';

import { MetricCard } from '@/components/common/MetricCard';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { formatCurrency, statusLabel } from '@/lib/format';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Calendar, Users, Rocket } from 'lucide-react';

const performanceData = [
  { label: 'Gen', valore: 120 },
  { label: 'Feb', valore: 138 },
  { label: 'Mar', valore: 164 },
  { label: 'Apr', valore: 210 },
  { label: 'Mag', valore: 236 },
];

export default function DashboardPage() {
  const activeBookings = bookings.filter((booking) => booking.status !== 'perso');
  const lostBookings = bookings.filter((booking) => booking.status === 'perso');

  return (
    <div className="space-y-10">
      <PageHeader
        title="Dashboard"
        description="Monitoraggio esperienze ospite, performance e automazioni attive"
        actions={<div className="hidden lg:block text-sm text-white/70">Aggiornato alle 09:42</div>}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          title="Prenotazioni attive"
          value={`${activeBookings.length}`}
          trend="+18% rispetto al mese precedente"
          icon={<Calendar className="h-5 w-5 text-[#f29c50]" strokeWidth={1.6} />}
        />
        <MetricCard
          title="Ospiti fidelizzati"
          value={`${clients.filter((client) => client.loyaltyTier !== 'silver').length}`}
          trend="58% del totale clienti attivi"
          icon={<Users className="h-5 w-5 text-emerald-300" strokeWidth={1.6} />}
        />
        <MetricCard
          title="Automazioni live"
          value="32"
          trend="5 nuove sequenze attivate questa settimana"
          icon={<Rocket className="h-5 w-5 text-sky-300" strokeWidth={1.6} />}
        />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Stato Clienti</h2>
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">Aggiornamento automatico</span>
          </header>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm text-white/70">
              <thead className="text-xs uppercase tracking-[0.35em] text-white/40">
                <tr>
                  <th className="py-3">Cliente</th>
                  <th>Stato</th>
                  <th>Ultimo soggiorno</th>
                  <th>Prossimo evento</th>
                  <th>Soggiorni</th>
                  <th>Newsletter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {clients.map((client) => (
                  <tr key={client.id} className="align-top">
                    <td className="py-4">
                      <div className="font-semibold text-white">{client.name}</div>
                      <div className="text-xs text-white/50">{client.email}</div>
                    </td>
                    <td className="py-4">
                      <StatusBadge status={statusLabel(client.status)} />
                    </td>
                    <td className="py-4 text-white/60">{client.lastStay}</td>
                    <td className="py-4 text-white/60">
                      <div>{client.upcomingEvent}</div>
                      <div className="text-xs text-white/40">{client.nextEventDate}</div>
                    </td>
                    <td className="py-4 text-white/60">{client.stayCount}</td>
                    <td className="py-4 text-white/60">{client.newsletter ? 'Attivo' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Performance revenue</h3>
            <p className="text-sm text-white/60">Valore medio prenotazioni confermate ultimi 5 mesi</p>
            <div className="mt-6 h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f29c50" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f29c50" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" stroke="#9ba3be" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(12,16,24,0.85)',
                      borderRadius: 16,
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                    }}
                    formatter={(value: number) => formatCurrency(value * 10)}
                  />
                  <Area
                    type="monotone"
                    dataKey="valore"
                    stroke="#f29c50"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Prenotazioni perse</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {lostBookings.map((booking) => (
                <li key={booking.id} className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{booking.code}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-red-200">Persa</span>
                  </div>
                  <p className="mt-2 text-xs text-white/60">{booking.lostReason}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Prenotazioni imminenti</h2>
          <span className="text-xs uppercase tracking-[0.3em] text-white/40">Gestisci automazioni</span>
        </header>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {activeBookings.map((booking) => (
            <article
              key={booking.id}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">{booking.code}</h3>
                <StatusBadge status={statusLabel(booking.status)} />
              </div>
              <p className="text-sm text-white/60">
                {booking.roomType} · {booking.guests} ospiti · {formatCurrency(booking.value)}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-white/50">
                {booking.preStayTasks.map((task) => (
                  <span key={task} className="rounded-full bg-white/10 px-3 py-1">
                    {task}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
