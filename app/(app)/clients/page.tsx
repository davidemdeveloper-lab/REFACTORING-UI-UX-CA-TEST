import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { guestProfiles } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { GlassCard } from '@/components/common/glass-card';
import { BadgeCheck, HeartPulse, MailCheck, Search } from 'lucide-react-native';

export default function ClientsPage() {
  return (
    <AppShell
      title="Clienti"
      description="Profili emozionali, preferenze e newsletter"
      actions={
        <button className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80">
          Importa anagrafiche
        </button>
      }
    >
      <div className="space-y-6">
        <GlassCard>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Intelligenza relazionale</p>
              <h2 className="text-xl font-semibold text-white">Tutte le informazioni di cura in un’unica vista</h2>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
              <Search size={16} color="rgba(255,255,255,0.6)" />
              <input
                placeholder="Cerca per nome, tag o preferenza"
                className="bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
            <span className="badge-pill border border-white/10 bg-white/10">VIP & Platinum</span>
            <span className="badge-pill border border-white/10 bg-white/10">Preferenze Spa</span>
            <span className="badge-pill border border-white/10 bg-white/10">Newsletter attive</span>
          </div>
        </GlassCard>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {guestProfiles.map((guest) => (
            <Link
              key={guest.id}
              href={`/clients/${guest.id}`}
              className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-white">{guest.name}</p>
                  <p className="text-xs text-white/60">Ultima interazione {formatDate(guest.lastInteraction)}</p>
                </div>
                <span className="badge-pill bg-[var(--accent-color)]/20 text-white">{guest.loyaltyTier}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
                {guest.tags.map((tag) => (
                  <span key={tag} className="badge-pill border border-white/10 bg-white/10">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="grid gap-3 text-sm text-white/70">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">Newsletter</p>
                  <p className="mt-2 flex items-center gap-2">
                    <MailCheck size={16} /> {guest.newsletter ? 'Iscritto' : 'Non iscritto'}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">Preferenze chiave</p>
                  <ul className="mt-2 space-y-1 text-xs">
                    {guest.preferences.slice(0, 3).map((pref) => (
                      <li key={pref.id}>• {pref.label}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">Note emozionali</p>
                  <p className="mt-2 flex items-center gap-2">
                    <HeartPulse size={16} /> {guest.notes.length} insight
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>{guest.email}</span>
                <span className="badge-pill border border-white/10 bg-white/10">
                  <BadgeCheck size={14} /> {guest.automationHealth}% flussi
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
