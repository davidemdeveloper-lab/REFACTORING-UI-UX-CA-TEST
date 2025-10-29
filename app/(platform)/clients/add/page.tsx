'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { InputField } from '@/components/ui/input/input-field';
import { Textarea } from '@/components/ui/textarea';
import { TextareaInput } from '@/components/ui/textarea/textarea-input';
import { Select } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select/select-trigger';
import { SelectPortal } from '@/components/ui/select/select-portal';
import { SelectContent } from '@/components/ui/select/select-content';
import { SelectItem } from '@/components/ui/select/select-item';
import { SelectItemText } from '@/components/ui/select/select-item-text';
import { SelectInput } from '@/components/ui/select/select-input';
import { Button, ButtonText } from '@/components/ui/button';
import { palette } from '@/theme/palette';
import { guests } from '@/lib/mock-data';
import { CalendarDays, Sparkles } from 'lucide-react-native';

const stayReasons = ['Vacanza', 'Business', 'Evento', 'Wellness'];

export default function AddClientPage() {
  const [selectedGuest, setSelectedGuest] = useState<string | null>(null);

  return (
    <VStack className="gap-8">
      <GlassCard className="gap-6 border-white/10 bg-white/5">
        <SectionHeader
          title="Accogli nuovo cliente"
          subtitle="Completa i dati base e genera subito la proposta personalizzata"
        />
        <HStack className="flex-col gap-6 lg:flex-row">
          <VStack className="flex-1 gap-4">
            <Input className="rounded-2xl border-white/10 bg-white/5 px-4" size="lg">
              <InputField placeholder="Nome" placeholderTextColor="rgba(226,232,240,0.6)" />
            </Input>
            <Input className="rounded-2xl border-white/10 bg-white/5 px-4" size="lg">
              <InputField placeholder="Cognome" placeholderTextColor="rgba(226,232,240,0.6)" />
            </Input>
            <Input className="rounded-2xl border-white/10 bg-white/5 px-4" size="lg">
              <InputField placeholder="Email" placeholderTextColor="rgba(226,232,240,0.6)" />
            </Input>
            <Input className="rounded-2xl border-white/10 bg-white/5 px-4" size="lg">
              <InputField placeholder="Telefono" placeholderTextColor="rgba(226,232,240,0.6)" />
            </Input>
          </VStack>
          <VStack className="flex-1 gap-4">
            <Select
              selectedValue={selectedGuest ?? undefined}
              onValueChange={(value) => setSelectedGuest(value as string)}
            >
              <SelectTrigger className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <SelectInput placeholder="Importa da ospiti esistenti" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent className="rounded-2xl border border-white/10 bg-[#111827]/95">
                  {guests.map((guest) => (
                    <SelectItem key={guest.id} label={guest.name} value={guest.id}>
                      <SelectItemText>{guest.name}</SelectItemText>
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
            <Textarea className="rounded-2xl border-white/10 bg-white/5 px-4 py-3">
              <TextareaInput
                numberOfLines={4}
                placeholder="Note di benvenuto, esigenze speciali, dettagli viaggio"
                placeholderTextColor="rgba(226,232,240,0.6)"
              />
            </Textarea>
            <Select>
              <SelectTrigger className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <SelectInput placeholder="Motivo del soggiorno" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent className="rounded-2xl border border-white/10 bg-[#111827]/95">
                  {stayReasons.map((reason) => (
                    <SelectItem key={reason} label={reason} value={reason}>
                      <SelectItemText>{reason}</SelectItemText>
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </VStack>
        </HStack>
      </GlassCard>

      <HStack className="flex-col gap-6 xl:flex-row">
        <GlassCard className="flex-1 gap-4 border-white/10 bg-white/5">
          <SectionHeader
            title="Dettagli soggiorno"
            subtitle="Definisci parametri per le automazioni"
          />
          <HStack className="flex-col gap-4 md:flex-row">
            <Input className="flex-1 rounded-2xl border-white/10 bg-white/5 px-4" size="lg">
              <InputField placeholder="Data arrivo" />
            </Input>
            <Input className="flex-1 rounded-2xl border-white/10 bg-white/5 px-4" size="lg">
              <InputField placeholder="Data partenza" />
            </Input>
            <Input className="flex-1 rounded-2xl border-white/10 bg-white/5 px-4" size="lg">
              <InputField placeholder="Camera richiesta" />
            </Input>
          </HStack>
          <HStack className="flex-col gap-4 md:flex-row">
            <Input className="flex-1 rounded-2xl border-white/10 bg-white/5 px-4" size="lg">
              <InputField placeholder="Budget massimo" />
            </Input>
            <Input className="flex-1 rounded-2xl border-white/10 bg-white/5 px-4" size="lg">
              <InputField placeholder="Preferenze F&B" />
            </Input>
          </HStack>
          <Button className="self-start rounded-full border border-white/10 bg-white/10 px-6 py-3">
            <ButtonText className="text-sm text-white">Genera proposta con AI</ButtonText>
          </Button>
        </GlassCard>

        <GlassCard className="w-full max-w-xl gap-4 border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5">
          <SectionHeader title="Anteprima automazione" subtitle="Adattata in tempo reale" />
          <VStack className="gap-3">
            <HStack className="items-center gap-3">
              <Box className="h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                <Sparkles color={palette.intent.accent} size={18} strokeWidth={1.4} />
              </Box>
              <Text className="text-sm text-slate-300">
                Template suggerito: Email pre-check-in con promozione Spa signature
              </Text>
            </HStack>
            <HStack className="items-center gap-3">
              <CalendarDays color={palette.text.secondary} size={18} strokeWidth={1.4} />
              <Text className="text-sm text-slate-300">
                Invio automatico 3 giorni prima dell'arrivo, follow-up dinamico se nessuna risposta
              </Text>
            </HStack>
            <Text className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-200">
              "Ciao {selectedGuest ? guests.find((g) => g.id === selectedGuest)?.name : 'Ospite'},
              abbiamo riservato per te la Junior Suite con vista. Vuoi prenotare il percorso Spa Luna?"
            </Text>
          </VStack>
        </GlassCard>
      </HStack>
    </VStack>
  );
}
