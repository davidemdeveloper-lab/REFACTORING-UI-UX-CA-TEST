'use client';

import Link from 'next/link';
import { Sparkles, Workflow, Users2, CalendarCheck } from 'lucide-react';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';

const featureCards = [
  {
    title: 'Gestione Centralizzata',
    description:
      'Coordina clienti, prenotazioni e comunicazioni in un’unica interfaccia progettata per hotel visionari.',
    icon: Users2,
  },
  {
    title: 'Comunicazioni Automatiche',
    description:
      'Template dinamici, timeline contestuale e suggerimenti AI per messaggi sempre rilevanti.',
    icon: Workflow,
  },
  {
    title: 'Proposte Personalizzate',
    description:
      'Configura proposte su misura con pacchetti esperienziali e vendita guidata cross-channel.',
    icon: CalendarCheck,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-14 text-center">
        <span className="rounded-full border border-white/15 bg-white/10 px-6 py-2 text-xs uppercase tracking-[0.45em] text-slate-200 shadow-[0_12px_35px_rgba(15,23,42,0.55)]">
          Customer Automator
        </span>
        <Box className="glass-panel flex flex-col gap-8 px-12 py-14 text-center">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Benvenuto in <span className="text-gradient">Customer Automator</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-200">
            La soluzione all-in-one per automatizzare la gestione di clienti, prenotazioni e comunicazioni,
            permettendoti di concentrarti sull’ospitalità e sullo stupore degli ospiti.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button
                action="primary"
                variant="solid"
                size="lg"
                className="h-14 rounded-2xl border border-amber-400/50 bg-gradient-to-br from-amber-400 to-orange-500 px-8 text-slate-900 shadow-[0_25px_55px_rgba(251,191,36,0.35)]"
              >
                <ButtonIcon as={Sparkles} className="text-slate-900" size="md" />
                <ButtonText className="text-base font-semibold uppercase tracking-[0.3em] text-slate-900">
                  Accedi all’area di gestione
                </ButtonText>
              </Button>
            </Link>
            <Link href="/templates">
              <Button
                action="secondary"
                variant="outline"
                size="lg"
                className="h-14 rounded-2xl border border-white/20 bg-white/5 px-8 text-white hover:bg-white/10"
              >
                <ButtonText className="text-base font-semibold uppercase tracking-[0.3em] text-white">
                  Esplora template
                </ButtonText>
              </Button>
            </Link>
          </div>
        </Box>
        <div className="grid w-full gap-6 md:grid-cols-3">
          {featureCards.map((feature) => (
            <div
              key={feature.title}
              className="glass-panel-soft flex flex-col gap-4 rounded-3xl p-8 text-left shadow-[0_18px_45px_rgba(8,15,34,0.55)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
