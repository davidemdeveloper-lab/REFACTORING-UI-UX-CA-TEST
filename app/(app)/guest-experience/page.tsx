import { AppShell } from '@/components/layout/app-shell';
import { GlassCard } from '@/components/common/glass-card';
import { portalWidgets } from '@/lib/mock-data';
import { Smartphone, Wifi, Sparkles, MessageCircle } from 'lucide-react-native';

export default function GuestExperiencePage() {
  return (
    <AppShell
      title="Portale Ospite"
      description="Wireframe della dashboard accessibile al cliente"
      actions={
        <button className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80">
          Condividi anteprima
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Benefici per l’ospite</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>• Accesso rapido a informazioni di soggiorno e servizi.</li>
            <li>• Chat con AI Concierge sempre attiva.</li>
            <li>• Prenotazioni spa, ristorante e transfer con un click.</li>
            <li>• Contenuti dinamici basati su preferenze e IoT.</li>
          </ul>
        </GlassCard>
        <GlassCard>
          <div className="rounded-[28px] border border-white/10 bg-[#0f1520]/90 p-6 shadow-inner shadow-black/30">
            <div className="flex items-center justify-between">
              <span className="badge-pill border border-white/10 bg-white/10 text-white/70">Aurora Boutique Hotel</span>
              <span className="badge-pill border border-white/10 bg-white/10 text-white/70">Check-in 5 marzo</span>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white">Ciao Giovanni, benvenuto nella tua esperienza digitale</h2>
            <p className="mt-2 text-sm text-white/70">
              Qui trovi tutto ciò che rende speciale il tuo soggiorno: dalla chat diretta con noi ai servizi esclusivi curati per te.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {portalWidgets.map((widget) => (
                <div key={widget.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">{widget.title}</p>
                  <p className="mt-2 text-sm text-white/75">{widget.description}</p>
                  <button className="mt-3 rounded-xl bg-[var(--accent-color)]/20 px-3 py-2 text-xs font-semibold text-white">
                    {widget.actionLabel}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Chat Concierge</p>
              <p className="mt-2 text-sm text-white/75">
                Rispondiamo in tempo reale oppure lascia che il nostro AI Concierge si occupi delle tue richieste più semplici.
              </p>
              <button className="mt-3 flex items-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-xs font-semibold text-white/80">
                <MessageCircle size={16} /> Scrivi ora
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
