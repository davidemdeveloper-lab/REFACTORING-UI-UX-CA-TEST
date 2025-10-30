import { AppShell } from '@/components/layout/app-shell';
import { guestProfiles } from '@/lib/mock-data';
import { GlassCard } from '@/components/common/glass-card';
import { CalendarPlus, CreditCard, Sparkles, Users } from 'lucide-react-native';

const STEPS = [
  { id: 1, title: 'Dati ospite', description: 'Seleziona cliente o inserisci nuovi dettagli', icon: Users },
  { id: 2, title: 'Tipologia soggiorno', description: 'Proposta, diretta o pagamento manuale', icon: CalendarPlus },
  { id: 3, title: 'Servizi e pagamenti', description: 'Blocchi di camere, spa e link pagamento', icon: CreditCard },
  { id: 4, title: 'Automazioni', description: 'Email, WhatsApp e guardrail AI', icon: Sparkles },
];

export default function CreateReservationPage() {
  return (
    <AppShell
      title="Nuova Prenotazione"
      description="Guidata dall’AI per ridurre gli attriti in reception"
      actions={
        <button className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80">
          Importa da Booking
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-4">
          {STEPS.map((step, index) => (
            <GlassCard key={step.id} className={index === 0 ? 'border-white/30 bg-white/10' : ''}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                  <step.icon size={18} color="rgba(255,255,255,0.85)" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Step {step.id}</p>
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="text-xs text-white/60">{step.description}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Compila la proposta</p>
          <div className="mt-4 grid gap-6">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Cliente esistente</label>
                <select className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 p-3 text-sm text-white/80">
                  {guestProfiles.map((guest) => (
                    <option key={guest.id} value={guest.id} className="text-black">
                      {guest.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Tipologia prenotazione</label>
                <div className="mt-3 grid gap-2 text-sm text-white/70">
                  <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <input type="radio" name="type" defaultChecked /> Proposta con opzioni
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <input type="radio" name="type" /> Prenotazione diretta con link pagamento
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <input type="radio" name="type" /> Pagamento manuale in struttura
                  </label>
                </div>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Camere & tariffe</label>
                <textarea
                  className="mt-2 h-32 w-full rounded-xl border border-white/10 bg-white/10 p-3 text-sm text-white/80"
                  placeholder="Suite Luna • 2 adulti • Upgrade spa • Colazione gourmet"
                />
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Servizi opzionali</label>
                <textarea
                  className="mt-2 h-32 w-full rounded-xl border border-white/10 bg-white/10 p-3 text-sm text-white/80"
                  placeholder="Spa privata, transfer privato, bottiglia di champagne, welcome kit bambini"
                />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">Guardrail AI</label>
              <textarea
                className="mt-2 h-24 w-full rounded-xl border border-white/10 bg-white/10 p-3 text-sm text-white/80"
                placeholder="Evitare promesse non confermate, chiedere conferma manuale per upgrade superiori a 500€"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-white/60">La bozza verrà salvata e inviata per approvazione al concierge.</p>
              <div className="flex items-center gap-3">
                <button className="rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold text-white/80">
                  Salva bozza
                </button>
                <button className="rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-xs font-semibold text-[#06131f] shadow-lg shadow-[var(--accent-glow)]">
                  Invia proposta
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
