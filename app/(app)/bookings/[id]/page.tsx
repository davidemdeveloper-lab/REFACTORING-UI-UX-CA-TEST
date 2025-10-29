'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { PageHeader } from '@/components/common/PageHeader';
import { Timeline } from '@/components/bookings/Timeline';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatCurrency } from '@/lib/format';
import { Button, ButtonText } from '@/components/ui/button';

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const booking = bookings.find((item) => item.id === bookingId);
  const client = clients.find((item) => item.id === booking?.clientId);

  if (!booking || !client) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${booking.code} · ${client.name}`}
        description={`Check-in ${booking.checkIn} · Check-out ${booking.checkOut}`}
        actions={
          <Button action="secondary" variant="outline" size="md" className="border-white/20 bg-white/5" onPress={() => router.back()}>
            <ButtonText className="text-white">Torna alle prenotazioni</ButtonText>
          </Button>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={booking.status} />
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/50">
                {booking.channel}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/50">
                Valore {formatCurrency(booking.value)}
              </span>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Camera: {booking.roomType} · Ospiti: {booking.guests}
            </p>
            <div className="mt-4">
              <h3 className="text-md font-semibold text-white">Timeline comunicazioni</h3>
              <div className="mt-4">
                <Timeline events={booking.communications} />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-md font-semibold text-white">Dati cliente</h3>
            <p className="mt-2 text-sm text-white/70">{client.name}</p>
            <p className="text-xs text-white/50">{client.email} · {client.phone}</p>
            <Link href={`/clients/${client.id}`} className="mt-3 inline-block text-xs font-semibold text-[#f29c50]">
              Apri profilo cliente
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-md font-semibold text-white">Azioni successive</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {booking.preStayTasks.map((task) => (
                <li key={task} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
