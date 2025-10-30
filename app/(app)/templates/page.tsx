import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { templates } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { GlassCard } from '@/components/common/glass-card';
import { Layers3, Plus, Sparkles } from 'lucide-react-native';

export default function TemplatesPage() {
  return (
    <AppShell
      title="Template Email"
      description="Organizza flussi comunicativi e blocchi modulari"
      actions={
        <Link
          href="/templates/new"
          className="flex items-center gap-2 rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-xs font-semibold text-[#07131e] shadow-md shadow-[var(--accent-glow)]"
        >
          <Plus size={16} /> Nuovo template
        </Link>
      }
    >
      <div className="space-y-6">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Libreria dinamica</p>
          <p className="mt-2 text-sm text-white/70">
            Blocchi variabili, condizioni e suggerimenti AI per orchestrare comunicazioni coerenti con il brand.
          </p>
        </GlassCard>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/templates/${template.id}`}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="badge-pill border border-white/10 bg-white/10 text-white/70">{template.category}</span>
                <span className="badge-pill bg-[var(--accent-color)]/20 text-white">Tone {template.aiTone}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{template.name}</h3>
              <p className="text-sm text-white/70">{template.description}</p>
              <p className="text-xs text-white/50">Aggiornato {formatDate(template.updatedAt)}</p>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Layers3 size={16} /> {template.blocks.length} blocchi dinamici
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
