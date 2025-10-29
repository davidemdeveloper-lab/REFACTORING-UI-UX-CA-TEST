import { AppShell } from '@/components/layout/app-shell';
import { GlassCard } from '@/components/common/glass-card';
import { tasks, guestProfiles } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { CheckSquare, Clock, NotebookPen, Sparkles } from 'lucide-react-native';

export default function TasksPage() {
  return (
    <AppShell
      title="Task & Note"
      description="Coordinamento operativo tra concierge e AI"
      actions={
        <button className="flex items-center gap-2 rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-xs font-semibold text-[#06131f] shadow-lg shadow-[var(--accent-glow)]">
          <NotebookPen size={16} /> Nuovo task
        </button>
      }
    >
      <div className="space-y-6">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Raccomandazioni AI</p>
          <p className="mt-2 text-sm text-white/70">
            Mantieni il controllo delle attività suggerite dall’AI Concierge e integra note emotive raccolte dal team.
          </p>
        </GlassCard>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => {
            const guest = task.guestId ? guestProfiles.find((profile) => profile.id === task.guestId) : undefined;
            return (
              <div key={task.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <span className="badge-pill border border-white/10 bg-white/10 text-white/70">{task.type}</span>
                  <span className="badge-pill border border-white/10 bg-white/10 text-white/70">Priorità {task.priority}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{task.title}</h3>
                <p className="mt-2 text-sm text-white/70">{task.description}</p>
                {guest ? <p className="mt-2 text-xs text-white/60">Cliente: {guest.name}</p> : null}
                <p className="mt-2 text-xs text-white/60">Scadenza {formatDate(task.dueAt)}</p>
                <button className="mt-4 flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold text-white/80">
                  <CheckSquare size={16} /> Segna come completato
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
