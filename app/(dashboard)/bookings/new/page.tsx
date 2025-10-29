'use client';

import { useState } from 'react';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { clients } from '@/lib/data';

const bookingTypes = [
  {
    id: 'proposal',
    title: 'Proposta dinamica',
    description: 'Crea opzioni multiple di camere e tariffe, invia email personalizzata.',
  },
  {
    id: 'instant',
    title: 'Prenotazione diretta',
    description: 'Conferma immediata con link di pagamento online.',
  },
  {
    id: 'manual',
    title: 'Pagamento in struttura',
    description: 'Conferma manuale con pagamento gestito alla reception.',
  },
] as const;

type BookingType = (typeof bookingTypes)[number]['id'];

export default function NewBookingPage() {
  const [type, setType] = useState<BookingType>('proposal');
  const [notes, setNotes] = useState('');

  return (
    <div className="grid gap-8">
      <section className="glass-panel p-6">
        <Text className="text-sm uppercase tracking-[0.3em] text-white/60">Nuova prenotazione</Text>
        <Text className="mt-2 font-space-grotesk text-2xl text-white">Scegli il flusso ideale</Text>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {bookingTypes.map((option) => (
            <button
              key={option.id}
              onClick={() => setType(option.id)}
              className={`rounded-3xl border p-5 text-left transition hover:bg-white/10 ${
                type === option.id ? 'border-[color:var(--accent-solid)] bg-white/10 text-white' : 'border-white/10 bg-white/5 text-white/70'
              }`}
            >
              <Text className="font-space-grotesk text-xl text-white">{option.title}</Text>
              <Text className="mt-2 text-sm text-white/70">{option.description}</Text>
            </button>
          ))}
        </div>
      </section>

      <section className="glass-panel p-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Dettagli cliente</Text>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">Cliente esistente</label>
            <select className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 p-3 text-sm text-white">
              <option>Seleziona dalla lista</option>
              {clients.map((client) => (
                <option key={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">Nuovo ospite</label>
            <Input placeholder="Nome e cognome" className="mt-2 rounded-2xl border border-white/10 bg-white/10 text-white" />
            <Input placeholder="Email" className="mt-2 rounded-2xl border border-white/10 bg-white/10 text-white" />
            <Input placeholder="Telefono" className="mt-2 rounded-2xl border border-white/10 bg-white/10 text-white" />
          </div>
        </div>
      </section>

      <section className="glass-panel p-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Configurazione</Text>
        {type === 'proposal' && <ProposalForm notes={notes} onNotesChange={setNotes} />}
        {type === 'instant' && <InstantForm notes={notes} onNotesChange={setNotes} />}
        {type === 'manual' && <ManualForm notes={notes} onNotesChange={setNotes} />}
      </section>
    </div>
  );
}

type FormProps = {
  notes: string;
  onNotesChange: (value: string) => void;
};

function ProposalForm({ notes, onNotesChange }: FormProps) {
  return (
    <div className="mt-4 grid gap-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-white">
        <Text className="font-space-grotesk text-lg text-white">Opzioni camere</Text>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[1, 2].map((option) => (
            <div key={option} className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <Text className="text-sm text-white/80">Suite proposta {option}</Text>
              <Input placeholder="Tipologia" className="mt-2 rounded-xl border border-white/10 bg-white/10 text-white" />
              <Input placeholder="Tariffa" className="mt-2 rounded-xl border border-white/10 bg-white/10 text-white" />
              <Input placeholder="Politica cancellazione" className="mt-2 rounded-xl border border-white/10 bg-white/10 text-white" />
            </div>
          ))}
        </div>
      </div>
      <Textarea
        value={notes}
        onChangeText={onNotesChange}
        placeholder="Note personalizzate e benefit inclusi..."
        className="min-h-[120px] rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white"
      />
      <Button className="rounded-full bg-[color:var(--accent-solid)] px-6 py-3 text-xs text-background-950">
        Invia proposta AI
      </Button>
    </div>
  );
}

function InstantForm({ notes, onNotesChange }: FormProps) {
  return (
    <div className="mt-4 grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Camera" className="rounded-2xl border border-white/10 bg-white/10 text-white" />
        <Input placeholder="Tariffa totale" className="rounded-2xl border border-white/10 bg-white/10 text-white" />
        <Input placeholder="Check-in" className="rounded-2xl border border-white/10 bg-white/10 text-white" />
        <Input placeholder="Check-out" className="rounded-2xl border border-white/10 bg-white/10 text-white" />
      </div>
      <Textarea
        value={notes}
        onChangeText={onNotesChange}
        placeholder="Messaggio che accompagna il link di pagamento"
        className="min-h-[120px] rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white"
      />
      <Button className="rounded-full bg-[color:var(--accent-solid)] px-6 py-3 text-xs text-background-950">
        Genera link pagamento
      </Button>
    </div>
  );
}

function ManualForm({ notes, onNotesChange }: FormProps) {
  return (
    <div className="mt-4 grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Camera" className="rounded-2xl border border-white/10 bg-white/10 text-white" />
        <Input placeholder="Arrivo" className="rounded-2xl border border-white/10 bg-white/10 text-white" />
        <Input placeholder="Partenza" className="rounded-2xl border border-white/10 bg-white/10 text-white" />
        <Input placeholder="Metodo pagamento previsto" className="rounded-2xl border border-white/10 bg-white/10 text-white" />
      </div>
      <Textarea
        value={notes}
        onChangeText={onNotesChange}
        placeholder="Note da condividere con la reception"
        className="min-h-[120px] rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white"
      />
      <Button className="rounded-full bg-[color:var(--accent-solid)] px-6 py-3 text-xs text-background-950">
        Conferma prenotazione manuale
      </Button>
    </div>
  );
}
