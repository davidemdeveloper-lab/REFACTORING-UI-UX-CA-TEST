import { AppShell } from '@/components/layout/app-shell';
import { GlassCard } from '@/components/common/glass-card';
import { Bot, ShieldCheck, Sparkles } from 'lucide-react-native';

export default function SettingsPage() {
  return (
    <AppShell
      title="Impostazioni"
      description="Personalizza accenti, AI e sicurezza"
      actions={
        <button className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80">
          Salva preferenze
        </button>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <Sparkles size={18} color="rgba(255,255,255,0.85)" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Tema</p>
              <h3 className="text-lg font-semibold text-white">Palette metal-glassy</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-white/70">
            Scegli la combinazione di colori d’accento per adattare l’atmosfera dell’applicativo alla tua struttura.
          </p>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <Bot size={18} color="rgba(255,255,255,0.85)" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">AI Concierge</p>
              <h3 className="text-lg font-semibold text-white">Parametri di tono</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-white/70">
            Definisci lo stile di comunicazione, le lingue disponibili e il livello di autonomia prima dell’escalation umana.
          </p>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <ShieldCheck size={18} color="rgba(255,255,255,0.85)" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Sicurezza</p>
              <h3 className="text-lg font-semibold text-white">Guardrail e audit trail</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-white/70">
            Monitora gli interventi dell’AI e definisci quali scenari richiedono l’approvazione manuale del team.
          </p>
        </GlassCard>
      </div>
    </AppShell>
  );
}
