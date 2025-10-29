'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LayoutDashboard, Sparkles, HeartHandshake } from 'lucide-react';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';

const features = [
  {
    title: 'Gestione Centralizzata',
    description:
      'Unifica anagrafiche, prenotazioni e automazioni in un unico cruscotto pensato per catene e boutique hotel.',
    icon: LayoutDashboard,
  },
  {
    title: 'Automazioni Intelligenti',
    description:
      "Template multilingua, sequenze dinamiche e regole contestuali per ridurre l'operatività manuale.",
    icon: Sparkles,
  },
  {
    title: 'Esperienze Memorabili',
    description:
      'Suggerisci upgrade, servizi ancillari e follow-up personalizzati basati sul comportamento del cliente.',
    icon: HeartHandshake,
  },
] as const;

const stats = [
  { label: 'Workflow automatizzati', value: '120+' },
  { label: 'Clienti fidelizzati', value: '38K' },
  { label: 'Tempo risparmiato', value: '27%' },
] as const;

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(116,166,255,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(242,156,80,0.18),transparent_40%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-24 pt-16 md:px-12">
        <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
              <span className="text-xl font-semibold text-white">CA</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Customer Automator
              </h1>
              <p className="text-sm text-white/70">LUXURY HOTEL INTELLIGENCE</p>
            </div>
          </div>
          <HStack className="gap-4">
            <Button action="secondary" variant="outline" size="md" className="border-white/20 bg-white/10 px-4">
              <ButtonText className="text-white">Scarica brochure</ButtonText>
            </Button>
            <Button action="primary" variant="solid" size="md" className="bg-[#f29c50] px-6">
              <Link href="/dashboard" className="text-typography-0">
                Entra nell'area di gestione
              </Link>
            </Button>
          </HStack>
        </header>

        <section className="mt-20 grid grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <VStack className="gap-6 text-left">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Nuovo motore esperienziale 2025
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl font-semibold leading-tight text-white md:text-5xl"
            >
              Automatizza la cura dell'ospite prima, durante e dopo il soggiorno.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-white/70"
            >
              Disegnata per i team di accoglienza moderni: Customer Automator sincronizza PMS, canali diretti
              e dispositivi IoT per orchestrare comunicazioni d'impatto e servizi iper-personalizzati.
            </motion.p>
            <HStack className="flex-wrap gap-3">
              <Button
                action="primary"
                variant="solid"
                size="lg"
                className="bg-[#f29c50] px-6 shadow-[0_12px_40px_rgba(242,156,80,0.25)]"
              >
                <Link href="/dashboard" className="text-typography-0">
                  Accedi ora
                </Link>
              </Button>
              <Button action="secondary" variant="outline" size="lg" className="border-white/30 bg-white/5 px-6">
                <ButtonText className="text-white">Prenota una demo</ButtonText>
              </Button>
            </HStack>
            <HStack className="mt-6 flex-wrap gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-[150px] rounded-2xl border border-white/15 bg-white/5 p-4 text-white/80 backdrop-blur"
                >
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </HStack>
          </VStack>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-[32px] border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/60">Scenario Live</p>
              <span className="text-sm text-emerald-300">Online</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-white/85">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs text-white/50">Check-in digitale</p>
                <p className="mt-1 text-xl font-semibold text-white">83%</p>
                <p className="text-xs text-emerald-300">+12% rispetto alla scorsa settimana</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs text-white/50">Up-sell medio</p>
                <p className="mt-1 text-xl font-semibold text-white">€46</p>
                <p className="text-xs text-sky-300">Sequenza concierge dinamica</p>
              </div>
              <div className="col-span-2 rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">Timeline ospite</p>
                <div className="mt-4 flex items-center gap-4 overflow-x-auto pb-2">
                  {['Richiesta Info', 'Proposta Inviata', 'Pagamento Ricevuto', 'Check-in Smart'].map((step, index) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10">
                        <span className="text-sm font-semibold text-white/80">{index + 1}</span>
                      </div>
                      <p className="text-sm text-white/70">{step}</p>
                      {index < 3 && <div className="h-px w-8 bg-white/20" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-sm text-white/60">Prossimo trigger</p>
              <p className="text-lg font-semibold text-white">Invia welcome kit 72h prima dell'arrivo</p>
              <p className="text-xs text-white/50">Segmento: repeat guest - camera deluxe</p>
            </div>
          </motion.div>
        </section>

        <section className="mt-24 grid gap-8 rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl shadow-[0_40px_120px_rgba(5,8,15,0.5)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-3xl font-semibold text-white">Cosa rende unica la nostra piattaforma</h3>
              <p className="text-white/70">
                Workflow ispirati ai migliori concierge al mondo, con controllo totale su ogni micro-momento
                dell'esperienza.
              </p>
            </div>
            <Button action="primary" variant="outline" size="md" className="border-[#f29c50]/60 bg-[rgba(242,156,80,0.16)] px-6">
              <Link href="/dashboard" className="text-white">
                Esplora il cruscotto
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ title, description, icon: IconComponent }) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 backdrop-blur"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                  <IconComponent className="h-5 w-5 text-[#f29c50]" strokeWidth={1.6} />
                </div>
                <h4 className="text-xl font-semibold text-white">{title}</h4>
                <p className="text-sm text-white/70">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
