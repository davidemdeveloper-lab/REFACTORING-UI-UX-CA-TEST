'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/common/PageHeader';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';

const defaultForm = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  notes: '',
  newsletter: true,
  channel: 'Email proposta',
};

export default function NewClientPage() {
  const router = useRouter();
  const [form, setForm] = useState(defaultForm);
  const [offers, setOffers] = useState<string[]>(['Upgrade vista mare']);

  const update = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addOffer = () => {
    setOffers((prev) => [...prev, 'Nuova esperienza personalizzata']);
  };

  const removeOffer = (index: number) => {
    setOffers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Accogli cliente"
        description="Crea una proposta guidata, collega automazioni e salva preferenze"
        actions={
          <Button action="secondary" variant="outline" size="md" className="border-white/20 bg-white/5" onPress={() => router.back()}>
            <ButtonText className="text-white/70">Annulla</ButtonText>
          </Button>
        }
      />

      <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Informazioni cliente</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Input variant="outline" size="lg" className="border-white/15 bg-white/5">
                <InputField
                  placeholder="Nome"
                  value={form.name}
                  onChangeText={(value: string) => update('name', value)}
                />
              </Input>
              <Input variant="outline" size="lg" className="border-white/15 bg-white/5">
                <InputField
                  placeholder="Cognome"
                  value={form.surname}
                  onChangeText={(value: string) => update('surname', value)}
                />
              </Input>
              <Input variant="outline" size="lg" className="border-white/15 bg-white/5">
                <InputField
                  placeholder="Email"
                  value={form.email}
                  inputMode="email"
                  onChangeText={(value: string) => update('email', value)}
                />
              </Input>
              <Input variant="outline" size="lg" className="border-white/15 bg-white/5">
                <InputField
                  placeholder="Telefono"
                  value={form.phone}
                  inputMode="tel"
                  onChangeText={(value: string) => update('phone', value)}
                />
              </Input>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Dettagli prenotazione</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Input variant="outline" size="lg" className="border-white/15 bg-white/5">
                <InputField placeholder="Data arrivo" value="22/04/2025" editable={false} />
              </Input>
              <Input variant="outline" size="lg" className="border-white/15 bg-white/5">
                <InputField placeholder="Data partenza" value="25/04/2025" editable={false} />
              </Input>
              <Input variant="outline" size="lg" className="border-white/15 bg-white/5">
                <InputField placeholder="Tipo soggiorno" value={form.channel} editable={false} />
              </Input>
              <Input variant="outline" size="lg" className="border-white/15 bg-white/5">
                <InputField placeholder="Budget stimato" value="€ 1.200" editable={false} />
              </Input>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Note e preferenze</h2>
            <Textarea className="border-white/15 bg-white/5">
              <TextareaInput
                placeholder="Inserisci preferenze, occasioni speciali, restrizioni alimentari..."
                multiline
                numberOfLines={4}
                value={form.notes}
                onChangeText={(value: string) => update('notes', value)}
              />
            </Textarea>
          </section>
        </div>

        <VStack className="gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-md font-semibold text-white">Tipo accoglienza</h3>
            <p className="mt-2 text-sm text-white/60">Seleziona la sequenza di automazioni da attivare al salvataggio.</p>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              {['Invio proposta', 'Pagamento online', 'Pagamento in manuale'].map((option) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition ${
                    form.channel === option ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 bg-white/0'
                  }`}
                >
                  <span>{option}</span>
                  <input
                    type="radio"
                    name="channel"
                    checked={form.channel === option}
                    onChange={() => update('channel', option)}
                    className="h-4 w-4 accent-[#f29c50]"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-semibold text-white">Crea proposta</h3>
              <Button action="primary" variant="outline" size="sm" className="border-[#f29c50]/60 bg-[#f29c50]/10" onPress={addOffer}>
                <ButtonText className="text-white">+ Aggiungi offerta</ButtonText>
              </Button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              {offers.map((offer, index) => (
                <HStack key={`${offer}-${index}`} className="items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>{offer}</span>
                  <button onClick={() => removeOffer(index)} className="text-xs text-white/50 hover:text-white">Rimuovi</button>
                </HStack>
              ))}
            </div>
          </div>

          <Button action="primary" variant="solid" size="lg" className="bg-[#f29c50] px-6">
            <ButtonText className="text-white">Invia offerta al cliente</ButtonText>
          </Button>
        </VStack>
      </div>
    </div>
  );
}
