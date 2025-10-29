'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CalendarPlus, Filter, Search } from 'lucide-react';
import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { formatCurrency, bookingStatusColor, formatDate } from '@/lib/utils';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';

export default function BookingsPage() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    if (!search) return bookings;
    return bookings.filter((booking) =>
      `${booking.title} ${booking.reference}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Lista Prenotazioni</h1>
            <p className="text-sm text-slate-300">
              Filtra per stato, canale o periodo. Visualizza rapidamente timeline e valore economico.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Input size="lg" variant="outline" className="h-11 w-72 rounded-xl border-white/15 bg-white/5">
              <InputSlot>
                <InputIcon as={Search} className="text-slate-300" />
              </InputSlot>
              <InputField
                value={search}
                onChangeText={(value: string) => setSearch(value)}
                placeholder="Cerca prenotazione"
                placeholderTextColor="#94a3b8"
              />
            </Input>
            <Button
              size="md"
              variant="outline"
              action="secondary"
              className="h-11 rounded-xl border border-white/15 bg-white/5"
            >
              <ButtonIcon as={Filter} className="text-white" size="sm" />
              <ButtonText className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
                Filtri
              </ButtonText>
            </Button>
            <Link href="/bookings/new-lost">
              <Button
                size="md"
                action="primary"
                variant="solid"
                className="h-11 rounded-xl border border-amber-400/50 bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900"
              >
                <ButtonIcon as={CalendarPlus} className="text-slate-900" size="sm" />
                <ButtonText className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-900">
                  Nuova prenotazione
                </ButtonText>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-white/5">
          {filtered.map((booking) => {
            const client = clients.find((item) => item.id === booking.clientId);
            return (
              <div key={booking.id} className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-white">{booking.title}</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {booking.reference} • {booking.roomType}
                  </span>
                  <span className="text-xs text-slate-300">
                    Ospite: {client ? `${client.name} ${client.surname}` : '—'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] ${bookingStatusColor[booking.status]}`}>
                    {booking.status}
                  </span>
                  <span className="text-sm text-slate-300">
                    {formatDate(`${booking.arrival}T12:00:00Z`, "d MMM")} → {formatDate(`${booking.departure}T12:00:00Z`, 'd MMM')}
                  </span>
                  <span className="text-sm font-semibold text-amber-300">{formatCurrency(booking.value)}</span>
                  <Link
                    href={`/bookings/${booking.id}`}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-amber-300 hover:bg-amber-500/10"
                  >
                    Dettagli
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
