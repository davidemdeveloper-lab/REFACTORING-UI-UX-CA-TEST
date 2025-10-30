'use client';

import { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { PageHeader } from '@/components/common/page-header';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { reservations, clients } from '@/lib/mock-data';
import { StatusPill } from '@/components/common/status-pill';
import {
  CalendarClock,
  CreditCard,
  Sparkles,
  UserPlus,
  Users,
  ClipboardList,
} from 'lucide-react-native';

const STEPS = ['Proposta dinamica', 'Prenotazione diretta', 'Pagamento manuale'];

export default function NewBookingPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box className="flex flex-col gap-8">
      <PageHeader
        title="Nuova prenotazione"
        subtitle="Scegli il percorso più adatto: proposta multi-opzione, conferma diretta o registrazione manuale."
      />

      <GlassPanel className="flex flex-col gap-6 p-8">
        <Box className="flex flex-wrap gap-3">
          {STEPS.map((step, index) => (
            <Button
              key={step}
              size="sm"
              action={activeStep === index ? 'primary' : 'secondary'}
              variant={activeStep === index ? 'solid' : 'outline'}
              className="rounded-2xl px-4 py-2"
              onPress={() => setActiveStep(index)}
            >
              <ButtonText className="text-sm font-semibold text-typography-0">{step}</ButtonText>
            </Button>
          ))}
        </Box>

        {activeStep === 0 && (
          <GlassCard padding="p-6" className="bg-background-0/40">
            <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Proposta dinamica</Text>
            <Text className="mt-2 text-sm text-typography-300">
              Seleziona più opzioni di camera, tariffe e servizi. L'AI genererà l'email di proposta con i blocchi migliori.
            </Text>
            <Box className="mt-6 grid gap-4 md:grid-cols-2">
              <Input className="rounded-2xl border-white/10 bg-background-0/40" size="lg">
                <InputSlot>
                  <InputIcon as={Users} color="rgb(var(--color-primary-500))" size={16} />
                </InputSlot>
                <InputField placeholder="Seleziona cliente esistente" placeholderTextColor="rgba(226,231,245,0.6)" />
              </Input>
              <Input className="rounded-2xl border-white/10 bg-background-0/40" size="lg">
                <InputSlot>
                  <InputIcon as={CalendarClock} color="rgb(var(--color-primary-500))" size={16} />
                </InputSlot>
                <InputField placeholder="Date soggiorno" placeholderTextColor="rgba(226,231,245,0.6)" />
              </Input>
            </Box>
            <Box className="mt-4 grid gap-4 md:grid-cols-2">
              {reservations.slice(0, 2).map((reservation) => (
                <GlassCard key={reservation.id} padding="p-4" className="bg-background-0/30">
                  <Text className="text-sm font-semibold text-typography-0">{reservation.roomType}</Text>
                  <Text className="text-xs text-typography-300">
                    {reservation.mealPlan} · {reservation.nights} notti · {reservation.amount}€
                  </Text>
                  <StatusPill label="Suggerito" tone="info" />
                </GlassCard>
              ))}
            </Box>
            <Box className="mt-6 flex gap-3">
              <Button size="sm" action="primary" className="rounded-2xl bg-primary-500 px-4 py-2">
                <Sparkles color="rgb(var(--color-typography-0))" size={16} />
                <ButtonText className="text-sm font-semibold text-typography-0">Genera proposta AI</ButtonText>
              </Button>
              <Button size="sm" variant="outline" action="secondary" className="rounded-2xl border-white/20 px-4 py-2">
                <ButtonText className="text-sm font-semibold text-typography-0">Aggiungi variante</ButtonText>
              </Button>
            </Box>
          </GlassCard>
        )}

        {activeStep === 1 && (
          <GlassCard padding="p-6" className="bg-background-0/40">
            <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Prenotazione diretta</Text>
            <Text className="mt-2 text-sm text-typography-300">
              Inserisci i dati e genera subito la conferma con pagamento digitale.
            </Text>
            <Box className="mt-6 grid gap-4 md:grid-cols-3">
              <Input className="rounded-2xl border-white/10 bg-background-0/40" size="lg">
                <InputSlot>
                  <InputIcon as={UserPlus} color="rgb(var(--color-primary-500))" size={16} />
                </InputSlot>
                <InputField placeholder="Nome cliente" placeholderTextColor="rgba(226,231,245,0.6)" />
              </Input>
              <Input className="rounded-2xl border-white/10 bg-background-0/40" size="lg">
                <InputSlot>
                  <InputIcon as={CalendarClock} color="rgb(var(--color-primary-500))" size={16} />
                </InputSlot>
                <InputField placeholder="Check-in" placeholderTextColor="rgba(226,231,245,0.6)" />
              </Input>
              <Input className="rounded-2xl border-white/10 bg-background-0/40" size="lg">
                <InputSlot>
                  <InputIcon as={CreditCard} color="rgb(var(--color-primary-500))" size={16} />
                </InputSlot>
                <InputField placeholder="Importo" placeholderTextColor="rgba(226,231,245,0.6)" />
              </Input>
            </Box>
            <Button size="sm" action="primary" className="mt-6 w-fit rounded-2xl bg-primary-500 px-4 py-2">
              <ButtonText className="text-sm font-semibold text-typography-0">Invia conferma</ButtonText>
            </Button>
          </GlassCard>
        )}

        {activeStep === 2 && (
          <GlassCard padding="p-6" className="bg-background-0/40">
            <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Pagamento manuale</Text>
            <Text className="mt-2 text-sm text-typography-300">
              Registra una prenotazione confermata in struttura e pianifica le comunicazioni successive.
            </Text>
            <Box className="mt-4 grid gap-4 md:grid-cols-2">
              {clients.slice(0, 2).map((client) => (
                <GlassCard key={client.id} padding="p-4" className="bg-background-0/30">
                  <Text className="text-sm font-semibold text-typography-0">{client.fullName}</Text>
                  <Text className="text-xs text-typography-300">{client.email}</Text>
                  <StatusPill label={`Loyalty ${client.loyaltyTier}`} tone="success" />
                </GlassCard>
              ))}
            </Box>
            <Button size="sm" variant="outline" action="secondary" className="mt-4 rounded-2xl border-white/20 px-4 py-2">
              <ClipboardList color="rgb(var(--color-primary-500))" size={16} />
              <ButtonText className="text-sm font-semibold text-typography-0">Registra soggiorno</ButtonText>
            </Button>
          </GlassCard>
        )}
      </GlassPanel>
    </Box>
  );
}
