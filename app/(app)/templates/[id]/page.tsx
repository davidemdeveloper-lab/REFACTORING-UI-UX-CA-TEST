import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { templates } from '@/lib/mock-data';
import { GlassCard } from '@/components/common/glass-card';
import { formatDate } from '@/lib/utils';
import { Blocks, Sparkles, Wand2 } from 'lucide-react-native';

export default function TemplateDetail({ params }: { params: { id: string } }) {
  const template = templates.find((item) => item.id === params.id);

  if (!template) {
    notFound();
  }

  return (
    <AppShell
      title={template.name}
      description="Editor metal-glassy per comunicazioni guidate dall’AI"
      actions={
        <button className="flex items-center gap-2 rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-xs font-semibold text-[#07131e] shadow-md shadow-[var(--accent-glow)]">
          <Sparkles size={16} /> Ottimizza con AI
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Blocco contenuti</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {template.blocks.map((block) => (
                <li key={block.id} className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">{block.type}</span>
                  <span className="font-semibold text-white">{block.label}</span>
                  <code className="rounded-xl bg-[#101827]/80 p-2 text-[0.7rem] text-white/70">{block.content}</code>
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Metadati</p>
            <p className="mt-2 text-sm text-white/70">Ultimo aggiornamento {formatDate(template.updatedAt)}</p>
            <p className="text-sm text-white/70">Tone of voice: {template.aiTone}</p>
            <p className="text-sm text-white/70">Categoria: {template.category}</p>
          </GlassCard>
        </div>
        <GlassCard>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Editor</p>
              <h2 className="text-lg font-semibold text-white">Bozza pronta per l’invio</h2>
            </div>
            <button className="rounded-2xl border border-white/20 px-3 py-2 text-xs font-semibold text-white/80">
              Anteprima portale ospite
            </button>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[260px_1fr]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Variabili AI</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• {`{{ospite.nome}}`}</li>
                <li>• {`{{soggiorno.check_in}}`}</li>
                <li>• {`{{servizi.personalizzati}}`}</li>
              </ul>
              <button className="mt-3 flex items-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-xs font-semibold text-white/80">
                <Blocks size={14} /> Aggiungi blocco condizionale
              </button>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#101827]/70 p-6 text-sm leading-relaxed text-white/80">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">Oggetto</p>
              <p className="mt-1 text-base font-semibold text-white">{template.subject}</p>
              <div className="glassy-divider my-6" />
              <p>
                Ciao {`{{ospite.nome}}`},<br />
                abbiamo preparato per te un soggiorno tailor-made tra relax e gusto. Dal {`{{soggiorno.check_in}}`} al {`{{soggiorno.check_out}}`}
                potrai vivere esperienze uniche nella Suite Luna con spa privata.
              </p>
              <p className="mt-4">
                Grazie al tuo profilo preferenze sappiamo che ami la luce soffusa e la musica ambient: troverai la camera già
                predisposta. Scegli tra le opzioni proposte e conferma con un tocco.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button className="rounded-2xl bg-[var(--accent-color)]/20 px-4 py-2 text-xs font-semibold text-white">
                  Duplica per upsell
                </button>
                <button className="flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold text-white/80">
                  <Wand2 size={16} /> Riscrivi tono
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
