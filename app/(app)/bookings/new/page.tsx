'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { guests } from '@/lib/mock-data';

const bookingModes = [
  {
    key: 'proposta',
    title: 'Invio proposta dinamica',
    description: 'Più stanze e tariffe personalizzate con email interattive e scelta rapida.',
  },
  {
    key: 'diretta',
    title: 'Prenotazione diretta con pagamento online',
    description: 'Singola tipologia di camera con link di pagamento sicuro e reminder automatizzati.',
  },
  {
    key: 'manuale',
    title: 'Conferma manuale in struttura',
    description: 'Per richieste telefoniche o walk-in. Il pagamento avverrà alla reception.',
  },
];

export default function NewBookingPage() {
  const [mode, setMode] = useState<'proposta' | 'diretta' | 'manuale'>('proposta');
  const [customerType, setCustomerType] = useState<'esistente' | 'nuovo'>('esistente');
  const [selectedGuest, setSelectedGuest] = useState<string>(guests[0]?.id ?? '');

  return (
    <VStack space="lg" className="pb-16">
      <Box>
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Nuova prenotazione</Text>
        <Text className="mt-2 text-3xl font-semibold text-primary-900">Accogli un ospite con cura immediata</Text>
        <Text className="mt-2 text-sm text-typography-500">
          Scegli il tipo di richiesta, collega IoT e prepara i messaggi automatizzati. Tutto è pronto prima che l’ospite arrivi.
        </Text>
      </Box>

      <Box className="glass-panel rounded-3xl px-8 py-7">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Seleziona modalità</Text>
        <HStack className="mt-4 flex-col gap-4 lg:flex-row">
          {bookingModes.map((item) => (
            <button
              key={item.key}
              onClick={() => setMode(item.key as typeof mode)}
              className={`flex-1 rounded-2xl border px-6 py-5 text-left transition ${
                mode === item.key
                  ? 'border-primary-400 bg-primary-50/70 text-primary-800'
                  : 'border-white/15 bg-white/5 text-typography-500 hover:border-primary-200/40'
              }`}
            >
              <Text className="text-sm font-semibold">{item.title}</Text>
              <Text className="mt-2 text-xs text-typography-400">{item.description}</Text>
            </button>
          ))}
        </HStack>
      </Box>

      <Box className="glass-panel rounded-3xl px-8 py-7">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Cliente</Text>
        <HStack className="mt-4 gap-3">
          <button
            onClick={() => setCustomerType('esistente')}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              customerType === 'esistente'
                ? 'border border-primary-400 bg-primary-50/80 text-primary-700'
                : 'border border-white/20 bg-white/5 text-typography-400'
            }`}
          >
            Cliente esistente
          </button>
          <button
            onClick={() => setCustomerType('nuovo')}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              customerType === 'nuovo'
                ? 'border border-primary-400 bg-primary-50/80 text-primary-700'
                : 'border border-white/20 bg-white/5 text-typography-400'
            }`}
          >
            Nuovo cliente
          </button>
        </HStack>

        {customerType === 'esistente' ? (
          <VStack space="sm" className="mt-4">
            <label className="text-xs text-typography-500">Seleziona dalla rubrica</label>
            <select
              value={selectedGuest}
              onChange={(event) => setSelectedGuest(event.target.value)}
              className="rounded-2xl border border-primary-100/70 bg-white/80 px-4 py-3 text-sm text-primary-700"
            >
              {guests.map((guest) => (
                <option key={guest.id} value={guest.id}>
                  {guest.name} • {guest.email}
                </option>
              ))}
            </select>
            <Link
              href={`/clients/${selectedGuest}`}
              className="text-xs font-semibold text-primary-600"
            >
              Apri scheda cliente →
            </Link>
          </VStack>
        ) : (
          <VStack space="sm" className="mt-4">
            <Input placeholder="Nome" className="rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm" />
            <Input placeholder="Cognome" className="rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm" />
            <Input placeholder="Email" className="rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm" />
            <Input placeholder="Telefono" className="rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm" />
          </VStack>
        )}
      </Box>

      <Box className="glass-panel rounded-3xl px-8 py-7">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Dettagli soggiorno</Text>
        <HStack className="mt-4 flex-col gap-4 md:flex-row">
          <Input placeholder="Data arrivo" className="flex-1 rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm" />
          <Input placeholder="Data partenza" className="flex-1 rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm" />
          <Input placeholder="Numero notti" className="w-32 rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm" />
        </HStack>
        <HStack className="mt-4 flex-col gap-4 md:flex-row">
          <Input placeholder="Numero adulti" className="flex-1 rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm" />
          <Input placeholder="Numero bambini" className="flex-1 rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm" />
          <Input placeholder="Tipologia camera" className="flex-1 rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm" />
        </HStack>
      </Box>

      <Box className="glass-panel rounded-3xl px-8 py-7">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Automazioni suggerite</Text>
        <VStack space="sm" className="mt-4 text-sm text-typography-500">
          {mode === 'proposta' && (
            <>
              <Text>• Email proposta con tre varianti di camera e selezione rapida.</Text>
              <Text>• Promemoria pagamento dopo 24h con AI che rileva il tono della conversazione.</Text>
            </>
          )}
          {mode === 'diretta' && (
            <>
              <Text>• Invio link di pagamento sicuro e reminder a 6h dall’arrivo.</Text>
              <Text>• Chatbot che conferma automaticamente il check-in online.</Text>
            </>
          )}
          {mode === 'manuale' && (
            <>
              <Text>• Email riepilogo manuale firmata dal concierge.</Text>
              <Text>• Task interno per aggiornare il PMS e notificare housekeeping.</Text>
            </>
          )}
        </VStack>
      </Box>

      <HStack className="mt-4 flex-wrap gap-3">
        <Button action="primary" size="lg" className="rounded-full px-6">
          <Text className="text-base font-semibold text-white">Genera prenotazione</Text>
        </Button>
        <Button action="secondary" variant="outline" size="lg" className="rounded-full border-primary-200/60 px-6">
          <Text className="text-base font-semibold text-primary-700">Salva come bozza</Text>
        </Button>
      </HStack>
    </VStack>
  );
}

