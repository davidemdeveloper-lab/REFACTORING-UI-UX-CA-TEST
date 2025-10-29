'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { Icon } from '@/components/ui/icon';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { accentOptions, AccentTone } from '@/lib/data';
import { useThemeSettings } from '@/components/theme/theme-provider';

export default function LoginPage() {
  const { accent, setAccent, toggleMode, mode } = useThemeSettings();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <Box className="pointer-events-none absolute inset-0 grid-overlay" />
      <div className="absolute inset-x-0 top-0 h-72 bg-[color:var(--accent-solid)]/20 blur-3xl" />
      <div className="glass-panel relative z-10 flex w-full max-w-5xl overflow-hidden border border-white/10 bg-black/40">
        <Box className="hidden w-5/12 flex-col justify-between border-r border-white/10 bg-gradient-to-br from-white/10 via-[color:var(--accent-solid)]/10 to-transparent p-10 lg:flex">
          <div>
            <Text className="text-xs uppercase tracking-[0.4em] text-white/60">Benvenuto a bordo</Text>
            <Text className="mt-4 font-space-grotesk text-4xl text-white">
              Un cruscotto che ti supporta prima che l’ospite varchi la porta.
            </Text>
            <Text className="mt-4 text-sm text-white/70">
              Accedi per orchestrare automazioni, conversazioni e servizi in un’unica suite. Personalizza il tono della
              struttura selezionando il colore d’accento preferito.
            </Text>
          </div>
          <VStack space="md">
            <Text className="text-xs uppercase tracking-[0.3em] text-white/60">Palette personalizzabile</Text>
            <HStack space="md" className="flex-wrap">
              {Object.entries(accentOptions).map(([tone, info]) => (
                <Pressable
                  key={tone}
                  onPress={() => setAccent(tone as AccentTone)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 ${
                    accent === tone ? 'border-white/60 bg-white/10' : 'border-white/10 bg-white/5'
                  }`}
                >
                  <Box className="h-3 w-3 rounded-full" style={{ backgroundColor: info.hex }} />
                  <Text className="text-xs text-white/70">{info.name}</Text>
                </Pressable>
              ))}
            </HStack>
            <Button onPress={toggleMode} className="self-start rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
              Attiva tema {mode === 'dark' ? 'chiaro' : 'scuro'}
            </Button>
          </VStack>
          <Box className="rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/60">
            <Text className="text-[0.65rem] uppercase tracking-[0.4em] text-white/40">Novità</Text>
            <Text className="mt-2 text-sm text-white/70">
              • Chat AI con guardrail contestuali
              <br />• Monitor IoT per temperatura, luci e minibar
              <br />• Flussi multi-stanza per proposte su misura
            </Text>
          </Box>
        </Box>
        <Box className="flex w-full flex-col gap-8 p-10 lg:w-7/12">
          <Box className="flex items-center justify-between">
            <Text className="font-space-grotesk text-3xl text-white">Accedi alla Control Room</Text>
            <Link href="/" className="text-xs text-white/60 underline">
              Torna alla presentazione
            </Link>
          </Box>
          <VStack space="lg">
            <div>
              <Text className="text-sm uppercase tracking-[0.3em] text-white/60">Credenziali</Text>
              <Text className="text-xs text-white/40">Usa il tuo account Clio Stack o richiedi un invito al Customer Lab.</Text>
            </div>
            <VStack space="md">
              <Box className="relative">
                <Input
                  placeholder="nome@struttura.it"
                  className="h-12 rounded-2xl border border-white/10 bg-white/5 pl-12 text-white placeholder:text-white/40"
                />
                <Box className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                  <Icon as={Mail} size="sm" color="rgba(255,255,255,0.6)" />
                </Box>
              </Box>
              <Box className="relative">
                <Input
                  placeholder="••••••••"
                  type={passwordVisible ? 'text' : 'password'}
                  className="h-12 rounded-2xl border border-white/10 bg-white/5 pl-12 pr-12 text-white placeholder:text-white/40"
                />
                <Box className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                  <Icon as={Lock} size="sm" color="rgba(255,255,255,0.6)" />
                </Box>
                <Pressable
                  onPress={() => setPasswordVisible((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-2"
                >
                  <Icon as={passwordVisible ? EyeOff : Eye} size="sm" color="rgba(255,255,255,0.7)" />
                </Pressable>
              </Box>
            </VStack>
            <HStack className="items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-white/60">
                <input type="checkbox" className="h-4 w-4 rounded border border-white/20 bg-transparent" />
                Ricorda questo dispositivo
              </label>
              <Link href="#" className="text-xs text-[color:var(--accent-soft)] underline">
                Password dimenticata?
              </Link>
            </HStack>
            <Button className="mt-4 rounded-full bg-[color:var(--accent-solid)] py-3 text-background-950 shadow-[0_20px_45px_-10px_rgba(74,200,255,0.5)]">
              Accedi e continua
            </Button>
            <Text className="text-xs text-white/40">
              Accedendo accetti la <Link href="#" className="text-[color:var(--accent-soft)] underline">privacy policy</Link> e i
              <Link href="#" className="text-[color:var(--accent-soft)] underline">termini di servizio</Link>.
            </Text>
          </VStack>
        </Box>
      </div>
    </main>
  );
}
