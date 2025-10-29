'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { clients } from '@/data/clients';
import { bookings } from '@/data/bookings';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Timeline } from '@/components/bookings/Timeline';
import { Button, ButtonText } from '@/components/ui/button';
import { formatCurrency, statusLabel } from '@/lib/format';
import { BadgeCheck, Mail, MessageSquareText } from 'lucide-react';

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const client = clients.find((item) => item.id === clientId);

  if (!client) {
    notFound();
  }

  const relatedBookings = bookings.filter((booking) => booking.clientId === client?.id);
  const latestBooking = relatedBookings[0];

  return (
    <div className="space-y-10">
      <PageHeader
        title={client?.name ?? 'Cliente'}
        description={`${client?.email} · ${client?.phone}`}
        actions={
          <div className="flex gap-3">
            <Button action="secondary" variant="outline" size="md" className="border-white/20 bg-white/5">
              <ButtonText className="text-white">Invia email</ButtonText>
            </Button>
            <Button action="primary" variant="solid" size="md" className="bg-[#f29c50] px-6">
              <ButtonText className="text-white">Avvia chat</ButtonText>
            </Button>
          </div>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={client!.status} />
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/50">
                {client?.loyaltyTier.toUpperCase()} MEMBER
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/50">Ultimo stay · {client?.lastStay}</span>
            </div>
            <p className="mt-4 text-sm text-white/70">{client?.notes}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
              {client?.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {latestBooking ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Ultima prenotazione</h2>
                <StatusBadge status={latestBooking.status} />
              </div>
              <p className="mt-2 text-sm text-white/60">
                {latestBooking.roomType} · {latestBooking.guests} ospiti · {formatCurrency(latestBooking.value)}
              </p>
              <p className="text-xs text-white/50">Check-in {latestBooking.checkIn} · Check-out {latestBooking.checkOut}</p>
              <div className="mt-6">
                <Timeline events={latestBooking.communications} />
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-md font-semibold text-white">Azioni suggerite</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <BadgeCheck className="h-5 w-5 text-emerald-300" strokeWidth={1.6} />
                Programma welcome gift dedicato anniversario
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Mail className="h-5 w-5 text-[#f29c50]" strokeWidth={1.6} />
                Aggiorna template pre-check-in con preferenze gourmet
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <MessageSquareText className="h-5 w-5 text-sky-300" strokeWidth={1.6} />
                Suggerisci tour privato al tramonto via chat
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-md font-semibold text-white">Storico prenotazioni</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {relatedBookings.map((booking) => (
                <li key={booking.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{booking.code}</span>
                    <StatusBadge status={booking.status} />
                  </div>
                  <p className="text-xs text-white/50">
                    {booking.checkIn} → {booking.checkOut} · {statusLabel(booking.status)} · {formatCurrency(booking.value)}
                  </p>
                  <Link href={`/bookings/${booking.id}`} className="mt-2 inline-block text-xs font-semibold text-[#f29c50]">
                    Apri timeline prenotazione
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
