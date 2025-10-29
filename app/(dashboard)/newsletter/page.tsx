'use client';

import { useState } from 'react';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { newsletterSubscribers, clients } from '@/lib/data';

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState(newsletterSubscribers);

  const toggleStatus = (clientId: string) => {
    setSubscribers((current) =>
      current.map((item) =>
        item.clientId === clientId
          ? {
              ...item,
              status: item.status === 'active' ? 'paused' : 'active',
            }
          : item,
      ),
    );
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <Text className="text-sm uppercase tracking-[0.3em] text-white/60">Newsletter</Text>
          <Text className="mt-2 font-space-grotesk text-2xl text-white">Consensi e segmenti</Text>
          <Text className="text-xs text-white/50">Gestisci adesioni direttamente dalle schede cliente.</Text>
        </div>
        <Button className="self-start rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
          Esporta elenco
        </Button>
      </div>
      <div className="mt-6 grid gap-4">
        {subscribers.map((item) => (
          <div key={item.clientId} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-white/70 md:flex-row md:items-center md:justify-between">
              <div>
                <Text className="font-space-grotesk text-xl text-white">{item.name}</Text>
                <Text className="text-xs text-white/50">{item.email}</Text>
                <Text className="mt-2 text-sm text-white/70">
                  Fonte: {item.consentSource} • Ultimo aggiornamento {item.lastUpdate}
                </Text>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={`rounded-full ${
                  item.status === 'active'
                    ? 'bg-[color:var(--accent-solid)]/20 text-[color:var(--accent-soft)]'
                    : 'bg-white/5 text-white/60'
                }`}>
                  {item.status === 'active' ? 'Attivo' : 'In pausa'}
                </Badge>
                <Switch
                  value={item.status === 'active'}
                  onValueChange={() => toggleStatus(item.clientId)}
                  className="data-[state=checked]:bg-[color:var(--accent-solid)]"
                />
              </div>
              <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
                Apri scheda cliente
              </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
