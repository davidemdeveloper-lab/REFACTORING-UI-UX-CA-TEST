'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, Gift, Save } from 'lucide-react';
import type { LostBookingForm } from '@/types';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { StatusPill } from '@/components/common/StatusPill';

const reasons = [
  { value: 'prezzo', label: 'Prezzo non competitivo' },
  { value: 'disponibilita', label: 'Disponibilità limitata' },
  { value: 'tempistiche', label: 'Decisione rimandata' },
  { value: 'altro', label: 'Altro' },
] as const;

export default function LostBookingPage() {
  const [form, setForm] = useState<LostBookingForm>({
    guestName: '',
    email: '',
    phone: '',
    stayDates: '',
    lostReason: 'prezzo',
    notes: '',
    voucherOffered: false,
  });
  const [saved, setSaved] = useState(false);

  const recommendations = useMemo(() => {
    switch (form.lostReason) {
      case 'prezzo':
        return 'Suggerisci voucher fedeltà del 15% e upgrade gratuito alla categoria superiore.';
      case 'disponibilita':
        return 'Proponi date alternative e invia disponibilità dinamica con alert automatico.';
      case 'tempistiche':
        return 'Programma follow-up in 48h con template “gentle reminder” e WhatsApp assistito.';
      default:
        return 'Analizza conversazioni e tagga la motivazione per affinare le automazioni future.';
    }
  }, [form.lostReason]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="glass-panel-soft flex flex-col gap-6 rounded-3xl border border-white/10 p-6">
        <header className="flex flex-col gap-2">
          <StatusPill label="Recupero prenotazione" tone="rose" />
          <h1 className="text-2xl font-semibold text-white">Trasforma una prenotazione persa in opportunità</h1>
          <p className="text-sm text-slate-300">
            Archivia il lead, identifica il motivo della perdita e attiva un flusso di win-back personalizzato.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          <Input size="lg" variant="outline" className="h-12 rounded-xl border-white/15 bg-white/5">
            <InputField
              value={form.guestName}
              onChangeText={(value: string) => setForm((prev) => ({ ...prev, guestName: value }))}
              placeholder="Nome ospite"
              placeholderTextColor="#94a3b8"
            />
          </Input>
          <Input size="lg" variant="outline" className="h-12 rounded-xl border-white/15 bg-white/5">
            <InputField
              value={form.email}
              onChangeText={(value: string) => setForm((prev) => ({ ...prev, email: value }))}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#94a3b8"
            />
          </Input>
          <Input size="lg" variant="outline" className="h-12 rounded-xl border-white/15 bg-white/5">
            <InputField
              value={form.phone}
              onChangeText={(value: string) => setForm((prev) => ({ ...prev, phone: value }))}
              keyboardType="phone-pad"
              placeholder="Telefono"
              placeholderTextColor="#94a3b8"
            />
          </Input>
          <Input size="lg" variant="outline" className="h-12 rounded-xl border-white/15 bg-white/5">
            <InputField
              value={form.stayDates}
              onChangeText={(value: string) => setForm((prev) => ({ ...prev, stayDates: value }))}
              placeholder="Date soggiorno o periodo"
              placeholderTextColor="#94a3b8"
            />
          </Input>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Motivo perdita</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {reasons.map((reason) => (
              <button
                key={reason.value}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, lostReason: reason.value }))}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                  form.lostReason === reason.value
                    ? 'border-amber-400/70 bg-amber-500/10 text-amber-100'
                    : 'border-white/10 bg-slate-900/40 text-slate-200 hover:bg-white/10'
                }`}
              >
                {reason.label}
              </button>
            ))}
          </div>
        </div>
        <Textarea variant="default" className="min-h-[140px] rounded-2xl border-white/15 bg-white/5">
          <TextareaInput
            value={form.notes}
            onChangeText={(value) => setForm((prev) => ({ ...prev, notes: value }))}
            placeholder="Dettagli conversazione, offerte fatte, obiezioni, next step suggeriti"
            placeholderTextColor="#94a3b8"
            multiline
          />
        </Textarea>
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
          <input
            type="checkbox"
            checked={form.voucherOffered}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, voucherOffered: event.target.checked }))
            }
            className="h-4 w-4 rounded border-white/20 bg-slate-900"
          />
          Voucher di recupero offerto (gift card digitale da inviare via email)
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <Button
            size="lg"
            action="primary"
            variant="solid"
            className="h-12 rounded-xl border border-amber-400/50 bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900"
            onPress={() => setSaved(true)}
          >
            <ButtonIcon as={Save} className="text-slate-900" size="sm" />
            <ButtonText className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-900">
              Salva e attiva win-back
            </ButtonText>
          </Button>
          {saved && (
            <span className="flex items-center gap-2 text-sm text-emerald-300">
              <Gift className="h-5 w-5" /> Sequenza win-back attiva: email + WhatsApp + notifica al commerciale.
            </span>
          )}
        </div>
      </div>
      <div className="glass-panel-soft flex flex-col gap-5 rounded-3xl border border-white/10 p-6">
        <header className="flex flex-col gap-2">
          <StatusPill label="Raccomandazioni" tone="sky" />
          <h2 className="text-lg font-semibold text-white">Strategia suggerita</h2>
        </header>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Prossimo passo</p>
          <p className="mt-2 text-sm text-slate-100">{recommendations}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-amber-500/10 p-5 text-sm text-amber-50">
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
            <AlertTriangle className="h-4 w-4" /> Automazioni coinvolte
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li>Tag automatico CRM “Lost Booking” e assegnazione follow-up al team sales.</li>
            <li>Trigger email personalizzata entro 30 minuti con alternative e benefit.</li>
            <li>Alert IoT per rilasciare disponibilità camera se il lead non recupera.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
