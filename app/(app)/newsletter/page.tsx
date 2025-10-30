'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Input } from '@/components/ui/input';
import { newsletterSubscribers } from '@/lib/mock-data';

export default function NewsletterPage() {
  const [search, setSearch] = useState('');
  const [subscribers, setSubscribers] = useState(newsletterSubscribers);

  const filtered = subscribers.filter((item) =>
    item.guestName.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleStatus = (id: string) => {
    setSubscribers((prev) =>
      prev.map((subscriber) =>
        subscriber.id === id
          ? {
              ...subscriber,
              status: subscriber.status === 'attivo' ? 'sospeso' : 'attivo',
            }
          : subscriber,
      ),
    );
  };

  return (
    <VStack space="lg" className="pb-16">
      <Box>
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Newsletter</Text>
        <Text className="mt-2 text-3xl font-semibold text-primary-900">Iscritti e preferenze</Text>
        <Text className="mt-2 text-sm text-typography-500">
          Tieni sotto controllo adesioni, temi preferiti e sincronizzazione con le schede cliente.
        </Text>
      </Box>

      <Box className="glass-panel rounded-3xl px-6 py-5">
        <Input
          placeholder="Cerca ospite"
          value={search}
          onChangeText={setSearch}
          className="rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm text-primary-700"
        />
      </Box>

      <VStack space="sm">
        {filtered.map((subscriber) => (
          <HStack
            key={subscriber.id}
            className="glass-panel items-start justify-between rounded-3xl px-6 py-5"
          >
            <Box>
              <Text className="text-lg font-semibold text-primary-900">{subscriber.guestName}</Text>
              <Text className="text-sm text-typography-500">{subscriber.email}</Text>
              <HStack className="mt-2 flex-wrap gap-2">
                {subscriber.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-primary-200/60 bg-primary-50/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary-700"
                  >
                    {topic}
                  </span>
                ))}
              </HStack>
              <Link href={`/clients/${subscriber.guestId}`} className="mt-3 inline-block text-xs font-semibold text-primary-600">
                Apri scheda cliente →
              </Link>
            </Box>
            <button
              onClick={() => toggleStatus(subscriber.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                subscriber.status === 'attivo'
                  ? 'border border-success-400 bg-success-500/20 text-success-600'
                  : 'border border-warning-400 bg-warning-500/20 text-warning-700'
              }`}
            >
              {subscriber.status}
            </button>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
}

