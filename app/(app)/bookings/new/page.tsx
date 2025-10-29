'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/common/PageHeader';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Button, ButtonText } from '@/components/ui/button';

export default function NewBookingPage() {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const [value, setValue] = useState('780');

  return (
    <div className="space-y-8">
      <PageHeader
        title="Nuova prenotazione persa"
        description="Analizza le ragioni e attiva una sequenza di recupero mirata"
        actions={
          <Button action="secondary" variant="outline" size="md" className="border-white/20 bg-white/5" onPress={() => router.back()}>
            <ButtonText className="text-white/70">Annulla</ButtonText>
          </Button>
        }
      />

      <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Input variant="outline" size="lg" className="border-white/15 bg-white/5">
            <InputField placeholder="Nome cliente" value="Luigi Greco" editable={false} />
          </Input>
          <Input variant="outline" size="lg" className="border-white/15 bg-white/5">
            <InputField placeholder="Periodo richiesto" value="11-13 marzo 2025" editable={false} />
          </Input>
          <Input variant="outline" size="lg" className="border-white/15 bg-white/5">
            <InputField
              placeholder="Valore preventivo"
              value={`€ ${value}`}
              onChangeText={(text: string) => setValue(text.replace(/[^0-9]/g, ''))}
            />
          </Input>
          <Textarea className="border-white/15 bg-white/5">
            <TextareaInput
              placeholder="Motivazione della perdita"
              multiline
              numberOfLines={4}
              value={reason}
              onChangeText={(value: string) => setReason(value)}
            />
          </Textarea>
        </div>
        <div className="space-y-4 text-sm text-white/70">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-md font-semibold text-white">Azioni di recupero</h3>
            <ul className="mt-3 space-y-2">
              <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Invia voucher famiglia estate con upgrade kids club
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Attiva sequenza WhatsApp con consigli attività bambini
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Programma follow-up telefonico con sales entro 24h
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-md font-semibold text-white">Obiettivo</h3>
            <p className="mt-2 text-white/60">Recuperare almeno il 40% del valore tramite pacchetto estate premium.</p>
          </div>
          <Button action="primary" variant="solid" size="lg" className="bg-[#f29c50] px-6">
            <ButtonText className="text-white">Attiva sequenza di recupero</ButtonText>
          </Button>
        </div>
      </div>
    </div>
  );
}
