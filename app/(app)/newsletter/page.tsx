import { AppShell } from '@/components/layout/app-shell';
import { GlassCard } from '@/components/common/glass-card';
import { newsletterSubscribers } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { MailPlus, ToggleLeft, ToggleRight } from 'lucide-react-native';

export default function NewsletterPage() {
  return (
    <AppShell
      title="Newsletter"
      description="Gestione adesioni e campagne emozionali"
      actions={
        <button className="flex items-center gap-2 rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-xs font-semibold text-[#07131e] shadow-md shadow-[var(--accent-glow)]">
          <MailPlus size={16} /> Crea campagna
        </button>
      }
    >
      <div className="space-y-6">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Segmenti dinamici</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Chi ha dato il consenso e come coccolarlo</h2>
          <p className="mt-2 text-sm text-white/70">
            Gestisci l’adesione direttamente dal profilo cliente o da qui. I cambi sono sincronizzati con le automazioni email.
          </p>
        </GlassCard>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {newsletterSubscribers.map((subscriber) => (
            <div key={subscriber.guestId} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{subscriber.name}</p>
                  <p className="text-xs text-white/60">{subscriber.email}</p>
                </div>
                <span className="badge-pill border border-white/10 bg-white/10 text-white/70">{subscriber.source}</span>
              </div>
              <p className="text-xs text-white/50">Aggiornato il {formatDate(subscriber.lastUpdate)}</p>
              <button className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80">
                {subscriber.optIn ? 'Iscritto' : 'Non iscritto'}
                {subscriber.optIn ? (
                  <ToggleRight size={20} color="var(--accent-color)" />
                ) : (
                  <ToggleLeft size={20} color="rgba(255,255,255,0.4)" />
                )}
              </button>
              <p className="text-xs text-white/60">
                {subscriber.optIn
                  ? 'Riceve campagne benessere, upsell spa e ricorrenze personalizzate.'
                  : 'Invitalo dal portale ospite o durante il check-in per condividere novità e offerte private.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
