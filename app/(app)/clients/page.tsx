'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clients } from '@/data/clients';
import { PageHeader } from '@/components/common/PageHeader';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Plus, Filter } from 'lucide-react';

const filters = [
  { label: 'Tutti', value: 'all' },
  { label: 'Confermati', value: 'confermato' },
  { label: 'VIP', value: 'vip' },
  { label: 'Da contattare', value: 'da_contattare' },
  { label: 'Newsletter attiva', value: 'newsletter' },
];

export default function ClientsListPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  const filtered = useMemo(() => {
    return clients.filter((client) => {
      const matchesQuery =
        client.name.toLowerCase().includes(query.toLowerCase()) ||
        client.email.toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        filter === 'all'
          ? true
          : filter === 'newsletter'
          ? client.newsletter
          : client.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Clienti"
        description="Segmentazione ospiti, preferenze e opportunità di upsell"
        actions={
          <Button
            action="primary"
            variant="solid"
            size="md"
            className="bg-[#f29c50] px-6"
            onPress={() => router.push('/clients/new')}
          >
            <ButtonIcon as={Plus} className="text-white" />
            <ButtonText className="text-white">Aggiungi cliente</ButtonText>
          </Button>
        }
      />

      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
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
          <div className="flex items-center gap-3">
            <Input variant="outline" size="md" className="border-white/15 bg-white/5">
              <InputField
                value={query}
                placeholder="Cerca per nome o email"
                onChangeText={setQuery}
                accessibilityLabel="Filtra clienti"
              />
            </Input>
            <Button action="secondary" variant="outline" size="md" className="border-white/20 bg-white/5">
              <ButtonIcon as={Filter} className="text-white/70" />
              <ButtonText className="text-white">Salva vista</ButtonText>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm text-white/70">
            <thead className="text-xs uppercase tracking-[0.3em] text-white/40">
              <tr>
                <th className="py-3">Cliente</th>
                <th>Ultimo aggiornamento</th>
                <th>Stato ultimo soggiorno</th>
                <th>Soggiorni</th>
                <th>Newsletter</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filtered.map((client) => (
                <tr key={client.id} className="align-top">
                  <td className="py-4">
                    <div className="font-semibold text-white">{client.name}</div>
                    <div className="text-xs text-white/50">{client.email}</div>
                    <div className="text-xs text-white/40">{client.city}</div>
                  </td>
                  <td className="py-4 text-white/60">{client.lastUpdate}</td>
                  <td className="py-4">
                    <StatusBadge status={client.status} />
                  </td>
                  <td className="py-4 text-white/60">{client.stayCount}</td>
                  <td className="py-4 text-white/60">{client.newsletter ? 'Sì' : 'No'}</td>
                  <td className="py-4">
                    <Link href={`/clients/${client.id}`} className="text-xs font-semibold text-[#f29c50]">
                      Apri dettaglio
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
