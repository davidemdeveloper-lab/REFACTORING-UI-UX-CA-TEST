import React from 'react';
import { AutomationStep } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';
import { GlassCard } from './glass-card';
import { ChannelIcon } from './channel-icon';

const STATUS_COLOR: Record<string, string> = {
  completato: 'bg-success-500/20 border border-success-500/40',
  in_corso: 'bg-[var(--accent-color)]/20 border border-white/30',
  in_attesa: 'bg-warning-500/15 border border-warning-500/30',
  errore: 'bg-error-500/20 border border-error-500/40',
};

export const AutomationFlow = ({ steps }: { steps: AutomationStep[] }) => {
  return (
    <GlassCard>
      <h3 className="text-lg font-semibold text-white">Workflow automatizzato</h3>
      <p className="text-sm text-white/70">
        Controlla lo stato delle comunicazioni orchestrate dal motore AI. I suggerimenti vengono mostrati solo quando il tono è in
        linea con l’esperienza desiderata.
      </p>
      <div className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative pl-8">
            {index !== steps.length - 1 ? (
              <span className="absolute left-2 top-10 h-full w-px bg-gradient-to-b from-white/30 to-white/5" />
            ) : null}
            <div className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center">
              <span className="h-3 w-3 rounded-full bg-[var(--accent-color)] shadow-[0_0_12px_var(--accent-color)]" />
            </div>
            <div className={`rounded-2xl p-4 ${STATUS_COLOR[step.status] ?? 'bg-white/5 border border-white/15'}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="text-xs text-white/60">{step.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <ChannelIcon channel={step.channel} />
                  <span className="badge-pill bg-white/10 text-white/70">
                    {formatDateTime(step.scheduledAt)}
                  </span>
                </div>
              </div>
              {step.aiSuggestedCopy ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-[#111a26]/70 p-4 text-sm text-white/70">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
                    Suggerimento AI
                  </p>
                  <p className="mt-1 leading-relaxed">{step.aiSuggestedCopy}</p>
                  {step.guardrails ? (
                    <ul className="mt-3 space-y-1 text-xs text-white/50">
                      {step.guardrails.map((rule) => (
                        <li key={rule}>• {rule}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
