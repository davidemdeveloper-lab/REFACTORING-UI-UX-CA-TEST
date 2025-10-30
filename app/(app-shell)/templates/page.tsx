import Link from 'next/link';
import { FilePenLine, Sparkles } from 'lucide-react';
import { templates } from '@/data/templates';
import { formatDate } from '@/lib/utils';
import { StatusPill } from '@/components/common/StatusPill';

const categoryTone: Record<string, 'emerald' | 'amber' | 'sky' | 'violet'> = {
  offerte: 'amber',
  'pre-stay': 'sky',
  'in-stay': 'emerald',
  'post-stay': 'violet',
};

export default function TemplatesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="glass-panel-soft rounded-3xl border border-white/10 p-6">
        <header className="mb-6 flex flex-col gap-3">
          <StatusPill label="Template email" tone="sky" />
          <h1 className="text-2xl font-semibold text-white">Gestisci e modifica le comunicazioni</h1>
          <p className="text-sm text-slate-300">
            Organizza blocchi modulari, crea condizioni dinamiche e mantieni la brand identity allineata su ogni canale.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/templates/${template.id}`}
              className="glass-panel-soft flex flex-col gap-4 rounded-3xl border border-white/10 p-5 transition-transform hover:-translate-y-1 hover:border-amber-400/60"
            >
              <div className="flex items-center justify-between">
                <StatusPill label={template.category} tone={categoryTone[template.category]} />
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Agg. {formatDate(template.updatedAt, "d MMM")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                  <FilePenLine className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold text-white">{template.name}</h2>
                  <p className="text-sm text-slate-300">{template.description}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Oggetto</p>
                <p className="mt-1">{template.subject}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/20 to-orange-500/10 p-6 text-sm text-amber-50">
        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
          <Sparkles className="h-4 w-4" /> Suggerimento creativo
        </div>
        <p>
          Duplica il template più performante e sperimenta un A/B test con contenuti personalizzati per segmenti VIP e business.
        </p>
      </div>
    </div>
  );
}
