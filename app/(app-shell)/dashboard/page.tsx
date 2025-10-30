import { CalendarHeart, DollarSign, MessageCircle, Users } from 'lucide-react';
import { MetricCard } from '@/components/common/MetricCard';
import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { notifications } from '@/data/notifications';
import { OccupancyChart } from '@/components/dashboard/OccupancyChart';
import { formatCurrency, bookingStatusColor, formatDate } from '@/lib/utils';
import { StatusPill } from '@/components/common/StatusPill';

export default function DashboardPage() {
  const confirmedBookings = bookings.filter((booking) => booking.status === 'confermata');
  const pendingPayments = bookings.filter((booking) => booking.status === 'pagamento in corso');
  const totalRevenue = bookings.reduce((acc, booking) => acc + booking.value, 0);
  const lastNotifications = notifications.slice(0, 3);

  return (
    <div className="flex flex-col gap-12">
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Clienti attivi"
          value={`${clients.length}`}
          delta={{ value: '+12%', positive: true, description: 'vs mese scorso' }}
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          title="Prenotazioni confermate"
          value={`${confirmedBookings.length}`}
          delta={{ value: '+3', positive: true, description: 'nuove nelle ultime 48h' }}
          icon={<CalendarHeart className="h-5 w-5" />}
        />
        <MetricCard
          title="Pagamenti in follow-up"
          value={`${pendingPayments.length}`}
          delta={{ value: '-8%', positive: true, description: 'riduzione rispetto a ieri' }}
          icon={<MessageCircle className="h-5 w-5" />}
        />
        <MetricCard
          title="Valore pipeline"
          value={formatCurrency(totalRevenue)}
          delta={{ value: '+18%', positive: true, description: 'vs Q1 2024' }}
          icon={<DollarSign className="h-5 w-5" />}
        />
      </section>

      <section>
        <OccupancyChart />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="glass-panel-soft rounded-3xl border border-white/10 p-6 lg:col-span-2">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Prenotazioni</p>
              <h2 className="text-xl font-semibold text-white">Lista prenotazioni attive</h2>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
              Aggiornato ora
            </span>
          </header>
          <div className="flex flex-col divide-y divide-white/5">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{booking.title}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {booking.roomType} • {booking.channel}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] ${bookingStatusColor[booking.status]}`}>
                    {booking.status}
                  </span>
                  <span className="text-sm text-slate-300">
                    {formatDate(`${booking.arrival}T12:00:00Z`, "d MMM")} → {formatDate(`${booking.departure}T12:00:00Z`, 'd MMM')}
                  </span>
                  <span className="text-sm font-semibold text-amber-300">{formatCurrency(booking.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel-soft flex flex-col gap-6 rounded-3xl border border-white/10 p-6">
          <header className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Attività recente</p>
            <h2 className="text-xl font-semibold text-white">Notifiche e insight</h2>
          </header>
          <div className="flex flex-col gap-4">
            {lastNotifications.map((notification) => (
              <div key={notification.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <StatusPill
                    label={notification.level.toUpperCase()}
                    tone={
                      notification.level === 'success'
                        ? 'emerald'
                        : notification.level === 'warning'
                          ? 'amber'
                          : notification.level === 'critical'
                            ? 'rose'
                            : 'sky'
                    }
                  />
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    {formatDate(notification.createdAt, "d MMM 'alle' HH:mm")}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white">{notification.title}</p>
                <p className="text-sm text-slate-300">{notification.description}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.3em] text-amber-300">{notification.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
