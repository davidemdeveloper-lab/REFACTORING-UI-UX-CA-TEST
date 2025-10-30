'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Filter, Plus, Search } from 'lucide-react';
import { clients } from '@/data/clients';
import { StatusPill } from '@/components/common/StatusPill';
import { stayStatusLabel } from '@/lib/utils';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';

const columns = [
  { key: 'name', label: 'Cliente' },
  { key: 'lastUpdate', label: 'Ultimo aggiornamento' },
  { key: 'status', label: 'Stato ultimo soggiorno' },
  { key: 'totalStays', label: 'N. soggiorni' },
  { key: 'newsletter', label: 'Newsletter' },
];

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const filteredClients = useMemo(() => {
    if (!search) return clients;
    return clients.filter((client) =>
      `${client.name} ${client.surname} ${client.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Lista Clienti</h1>
            <p className="text-sm text-slate-300">
              Ordina per stato, adesione newsletter o numero di soggiorni. Ricerca istantanea con tag intelligenti.
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
                placeholder="Cerca cliente"
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
            <Link href="/clients/new">
              <Button
                size="md"
                action="primary"
                variant="solid"
                className="h-11 rounded-xl border border-amber-400/50 bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900"
              >
                <ButtonIcon as={Plus} className="text-slate-900" size="sm" />
                <ButtonText className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-900">
                  Accogli Cliente
                </ButtonText>
              </Button>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-5 py-3 text-left text-xs uppercase tracking-[0.3em] text-slate-400"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-5 py-3 text-left text-xs uppercase tracking-[0.3em] text-slate-400">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-white/5">
                  <td className="px-5 py-4 text-sm text-white">
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {client.name} {client.surname}
                      </span>
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{client.email}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-200">
                    {new Date(client.lastUpdate).toLocaleDateString('it-IT')}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill
                      label={stayStatusLabel[client.lastStayStatus]}
                      tone={
                        client.lastStayStatus === 'confermata'
                          ? 'emerald'
                          : client.lastStayStatus === 'pagamento in sospeso'
                            ? 'amber'
                            : client.lastStayStatus === 'nuova richiesta'
                              ? 'sky'
                              : 'violet'
                      }
                    />
                  </td>
                  <td className="px-5 py-4 text-sm text-white">{client.totalStays}</td>
                  <td className="px-5 py-4 text-sm text-white">
                    {client.newsletter ? (
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-200">
                        Attivo
                      </span>
                    ) : (
                      <span className="rounded-full bg-rose-500/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-rose-200">
                        Non attivo
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm">
                    <Link
                      href={`/clients/${client.id}`}
                      className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-amber-300 hover:bg-amber-500/10"
                    >
                      Apri scheda
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
