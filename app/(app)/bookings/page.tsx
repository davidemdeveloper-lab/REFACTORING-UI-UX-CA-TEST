'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { bookings } from '@/data/bookings';
import { clients } from '@/data/clients';
import { PageHeader } from '@/components/common/PageHeader';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatCurrency } from '@/lib/format';
import { Plus } from 'lucide-react';

const filters = [
  { label: 'Tutte', value: 'all' },
  { label: 'Confermate', value: 'confermato' },
  { label: 'In pre-check-in', value: 'precheckin' },
  { label: 'Perse', value: 'perso' },
];

export default function BookingsPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const enriched = bookings.map((booking) => ({
    ...booking,
    client: clients.find((client) => client.id === booking.clientId),
  }));

  const filtered = useMemo(() => {
    return enriched.filter((booking) => {
      const matchesQuery = booking.code.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === 'all' ? true : booking.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [enriched, query, filter]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Prenotazioni"
        description="Gestisci timeline, automazioni e comunicazioni per ogni soggiorno"
        actions={
          <div className="flex gap-3">
            <Button action="secondary" variant="outline" size="md" className="border-white/20 bg-white/5" onPress={() => setFilter('perso')}>
              <ButtonText className="text-white">Nuova prenotazione persa</ButtonText>
            </Button>
            <Link href="/bookings/new" className="inline-flex">
              <Button action="primary" variant="solid" size="md" className="bg-[#f29c50] px-6">
                <ButtonIcon as={Plus} className="text-white" />
                <ButtonText className="text-white">Aggiungi prenotazione</ButtonText>
              </Button>
            </Link>
          </div>
        }
      />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                  filter === item.value
                    ? 'border-white/30 bg-white/10 text-white shadow-[0_10px_30px_rgba(242,156,80,0.2)]'
                    : 'border-white/10 bg-transparent text-white/60 hover:border-white/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <Input variant="outline" size="md" className="border-white/15 bg-white/5">
            <InputField
              value={query}
              onChangeText={setQuery}
              placeholder="Cerca per codice prenotazione"
              accessibilityLabel="Cerca prenotazione"
            />
          </Input>
        </div>

        <div className="mt-6 grid gap-4">
          {filtered.map((booking) => (
            <article
              key={booking.id}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/50">
                    {booking.channel}
                  </div>
                  <h3 className="text-base font-semibold text-white">{booking.code}</h3>
                </div>
                <StatusBadge status={booking.status} />
              </div>
              <p className="text-sm text-white/60">
                {booking.client?.name} · {booking.roomType} · {booking.guests} ospiti · {formatCurrency(booking.value)}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-white/50">
                <span className="rounded-full bg-white/10 px-3 py-1">Check-in {booking.checkIn}</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Check-out {booking.checkOut}</span>
                {booking.preStayTasks.map((task) => (
                  <span key={task} className="rounded-full bg-white/10 px-3 py-1">
                    {task}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>{booking.communications.length} comunicazioni orchestrate</span>
                <Link href={`/bookings/${booking.id}`} className="font-semibold text-[#f29c50]">
                  Apri dettaglio
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
