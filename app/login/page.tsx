'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background-0 via-background-100/80 to-primary-200/50 px-4 py-12">
      <Box className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_65%)]" />
      <Box className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_90%_80%,rgba(168,85,247,0.18),transparent_65%)]" />

      <Box className="glass-panel mx-auto flex w-full max-w-[960px] flex-col gap-12 overflow-hidden rounded-[40px] px-10 py-12 md:flex-row">
        <VStack space="lg" className="flex-1">
          <Text className="font-[var(--font-space-grotesk)] text-xs uppercase tracking-[0.4em] text-primary-700/70">
            Customer Automator
          </Text>
          <Text className="text-4xl font-semibold text-primary-900">
            Bentornato nella tua cabina di regia.
          </Text>
          <Text className="max-w-md text-sm text-typography-500">
            Accedi per monitorare flussi, conversazioni e dispositivi in tempo reale. L’AI ti suggerirà già le prossime azioni
            appena entri.
          </Text>
          <Box className="rounded-3xl border border-white/15 bg-white/5 px-6 py-5">
            <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/70">Oggi in evidenza</Text>
            <VStack space="md" className="mt-3">
              <Text className="text-sm text-typography-400">
                • 4 richieste chat in attesa di supervisione
              </Text>
              <Text className="text-sm text-typography-400">
                • 2 camere con segnalazione IoT (frigobar e climatizzazione)
              </Text>
              <Text className="text-sm text-typography-400">• 3 upsell spa suggeriti per ospiti VIP</Text>
            </VStack>
          </Box>
        </VStack>

        <VStack space="md" className="flex-1 rounded-3xl border border-white/20 bg-white/80 px-8 py-10 text-left">
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/70">Area di gestione</Text>
          <Text className="text-2xl font-semibold text-primary-900">Effettua l’accesso</Text>
          <VStack space="sm" className="mt-4">
            <Input
              placeholder="Email struttura"
              value={email}
              onChangeText={setEmail}
              className="rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm text-primary-700"
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm text-primary-700"
            />
            <HStack className="mt-2 items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-typography-400">
                <input type="checkbox" className="h-4 w-4 rounded border border-primary-200" /> Ricordami
              </label>
              <Link href="#">
                <Text className="text-xs font-semibold text-primary-600">Recupera password</Text>
              </Link>
            </HStack>
          </VStack>

          <Button action="primary" size="lg" className="mt-4 rounded-full">
            <Text className="text-base font-semibold text-white">Entra nella piattaforma</Text>
          </Button>

          <Box className="rounded-2xl border border-primary-100/60 bg-primary-50/70 px-6 py-4 text-sm text-primary-700">
            Suggerimento AI: oggi il flusso “Anniversario romantico” può generare +18% di upsell. Attivalo dalla dashboard.
          </Box>

          <Text className="text-xs text-typography-400">
            Accesso riservato alle strutture partner. Vuoi provare la suite?{' '}
            <Link href="/dashboard" className="font-semibold text-primary-600">
              Guarda la demo interattiva
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

