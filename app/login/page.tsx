'use client';

import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { GlassPanel } from '@/components/common/glass-card';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { StatusPill } from '@/components/common/status-pill';
import { Mail, LockKeyhole, Sparkles } from 'lucide-react-native';

export default function LoginPage() {
  return (
    <Box className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[15%] h-[380px] w-[380px] rounded-full bg-primary-500/20 blur-[180px]" />
        <div className="absolute bottom-[20%] right-[10%] h-[340px] w-[340px] rounded-full bg-secondary-500/20 blur-[160px]" />
      </div>
      <GlassPanel className="relative z-10 w-full max-w-xl p-10">
        <Box className="mb-8 gap-4 text-center">
          <StatusPill label="Accesso area riservata" tone="info" />
          <Text className="text-3xl font-semibold text-typography-0 md:text-4xl">
            Bentornato in Customer Automator
          </Text>
          <Text className="text-sm text-typography-300">
            Gestisci prenotazioni, chat e automazioni con l\'assistente AI dedicato alla tua struttura.
          </Text>
        </Box>
        <Box className="flex flex-col gap-6">
          <Input className="rounded-2xl border border-white/10 bg-background-0/40" size="lg">
            <InputSlot>
              <InputIcon as={Mail} color="rgb(var(--color-primary-500))" size={18} />
            </InputSlot>
            <InputField placeholder="Email aziendale" placeholderTextColor="rgba(226,231,245,0.6)" />
          </Input>
          <Input className="rounded-2xl border border-white/10 bg-background-0/40" size="lg">
            <InputSlot>
              <InputIcon as={LockKeyhole} color="rgb(var(--color-primary-500))" size={18} />
            </InputSlot>
            <InputField secureTextEntry placeholder="Password" placeholderTextColor="rgba(226,231,245,0.6)" />
          </Input>
          <Button size="lg" action="primary" className="rounded-2xl bg-primary-500 px-8 py-4">
            <Sparkles color="rgb(var(--color-typography-0))" size={18} />
            <ButtonText className="text-base font-semibold text-typography-0">Entra in dashboard</ButtonText>
          </Button>
          <Box className="items-center gap-2 text-sm text-typography-300">
            <Text>Ti serve un account per il tuo hotel?</Text>
            <Link className="text-primary-400" href="#contatti">
              Contatta il nostro team onboarding
            </Link>
          </Box>
        </Box>
      </GlassPanel>
    </Box>
  );
}
