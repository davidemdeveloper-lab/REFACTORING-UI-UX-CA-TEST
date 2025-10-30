'use client';

import { useState } from 'react';
import { CheckCircle2, Send, UserRoundPlus } from 'lucide-react';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { StatusPill } from '@/components/common/StatusPill';

const initialState = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  city: '',
  arrival: '',
  departure: '',
  notes: '',
  welcomeType: 'Proposta personalizzata',
};

export default function NewClientPage() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <Box className="glass-panel-soft flex flex-col gap-6 rounded-3xl border border-white/10 p-6">
        <header className="flex flex-col gap-2">
          <StatusPill label="Accogli cliente" tone="amber" />
          <h1 className="text-2xl font-semibold text-white">Crea una nuova proposta di soggiorno</h1>
          <p className="text-sm text-slate-300">
            Raccogli i dati essenziali, prepara la proposta automatica e invia la sequenza di comunicazioni.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          <Input variant="outline" size="lg" className="h-12 rounded-xl border-white/15 bg-white/5">
            <InputSlot>
              <InputIcon as={UserRoundPlus} className="text-slate-300" />
            </InputSlot>
            <InputField
              value={form.name}
              onChangeText={(value: string) => updateField('name', value)}
              placeholder="Nome"
              placeholderTextColor="#94a3b8"
            />
          </Input>
          <Input variant="outline" size="lg" className="h-12 rounded-xl border-white/15 bg-white/5">
            <InputField
              value={form.surname}
              onChangeText={(value: string) => updateField('surname', value)}
              placeholder="Cognome"
              placeholderTextColor="#94a3b8"
            />
          </Input>
          <Input variant="outline" size="lg" className="h-12 rounded-xl border-white/15 bg-white/5">
            <InputField
              value={form.email}
              onChangeText={(value: string) => updateField('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor="#94a3b8"
            />
          </Input>
          <Input variant="outline" size="lg" className="h-12 rounded-xl border-white/15 bg-white/5">
            <InputField
              value={form.phone}
              onChangeText={(value: string) => updateField('phone', value)}
              keyboardType="phone-pad"
              placeholder="Telefono"
              placeholderTextColor="#94a3b8"
            />
          </Input>
          <Input variant="outline" size="lg" className="h-12 rounded-xl border-white/15 bg-white/5">
            <InputField
              value={form.city}
              onChangeText={(value: string) => updateField('city', value)}
              placeholder="Città"
              placeholderTextColor="#94a3b8"
            />
          </Input>
          <Input variant="outline" size="lg" className="h-12 rounded-xl border-white/15 bg-white/5">
            <InputField
              value={form.welcomeType}
              onChangeText={(value: string) => updateField('welcomeType', value)}
              placeholder="Tipologia accoglienza"
              placeholderTextColor="#94a3b8"
            />
          </Input>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input variant="outline" size="lg" className="h-12 rounded-xl border-white/15 bg-white/5">
            <InputField
              value={form.arrival}
              onChangeText={(value: string) => updateField('arrival', value)}
              placeholder="Arrivo (es. 12/02/2025)"
              placeholderTextColor="#94a3b8"
            />
          </Input>
          <Input variant="outline" size="lg" className="h-12 rounded-xl border-white/15 bg-white/5">
            <InputField
              value={form.departure}
              onChangeText={(value: string) => updateField('departure', value)}
              placeholder="Partenza (es. 16/02/2025)"
              placeholderTextColor="#94a3b8"
            />
          </Input>
        </div>
        <Textarea
          variant="default"
          className="min-h-[140px] rounded-2xl border-white/15 bg-white/5"
        >
          <TextareaInput
            value={form.notes}
            onChangeText={(value) => updateField('notes', value)}
            placeholder="Note per la proposta (preferenze, motivi del viaggio, upsell suggeriti)"
            placeholderTextColor="#94a3b8"
            multiline
          />
        </Textarea>
        <div className="flex flex-wrap items-center gap-4">
          <Button
            action="primary"
            variant="solid"
            size="lg"
            className="h-12 rounded-xl border border-amber-400/50 bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900"
            onPress={() => setSubmitted(true)}
          >
            <ButtonIcon as={Send} className="text-slate-900" size="sm" />
            <ButtonText className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-900">
              Invia proposta automatica
            </ButtonText>
          </Button>
          {submitted && (
            <span className="flex items-center gap-2 text-sm text-emerald-300">
              <CheckCircle2 className="h-5 w-5" /> Proposta pronta, inviata tramite flusso omnicanale.
            </span>
          )}
        </div>
      </Box>
      <Box className="glass-panel-soft flex flex-col gap-5 rounded-3xl border border-white/10 p-6">
        <header className="flex flex-col gap-2">
          <StatusPill label="Anteprima" tone="sky" />
          <h2 className="text-lg font-semibold text-white">Riepilogo dinamico</h2>
          <p className="text-sm text-slate-300">
            Il sistema arricchisce i dati con preferenze note, punteggio loyalty e suggerimenti cross-selling.
          </p>
        </header>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Contatto</p>
          <p className="mt-2 text-base font-semibold text-white">
            {form.name || 'Nome'} {form.surname || 'Cognome'}
          </p>
          <p>{form.email || 'email@cliente.it'}</p>
          <p>{form.phone || '+39 3XX XXX XXXX'}</p>
          <div className="mt-4 flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Soggiorno</p>
            <p>
              {form.arrival || '—'} → {form.departure || '—'} • {form.welcomeType}
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Note</p>
            <p className="text-sm text-slate-300">
              {form.notes || 'Aggiungi dettagli per personalizzare upsell, benefit e ritmi di comunicazione.'}
            </p>
          </div>
        </div>
      </Box>
    </div>
  );
}
