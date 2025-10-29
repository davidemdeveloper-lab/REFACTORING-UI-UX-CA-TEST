import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { PageHeader } from '@/components/common/page-header';
import { StatusPill } from '@/components/common/status-pill';
import { newsletterSubscribers, clients } from '@/lib/mock-data';
import { MailPlus, Sparkles, Users } from 'lucide-react-native';
import Link from 'next/link';

export default function NewsletterPage() {
  const activeCount = newsletterSubscribers.filter((sub) => sub.status === 'attivo').length;

  return (
    <Box className="flex flex-col gap-8">
      <PageHeader
        title="Newsletter esperienziale"
        subtitle="Gestisci iscrizioni, preferenze e suggerimenti AI per le tue campagne."
        actions={
          <Button size="md" action="primary" className="rounded-2xl bg-primary-500 px-6 py-3">
            <MailPlus color="rgb(var(--color-typography-0))" size={18} />
            <ButtonText className="font-semibold text-typography-0">Crea campagna</ButtonText>
          </Button>
        }
      />

      <GlassPanel className="grid gap-6 p-8 lg:grid-cols-[1.4fr_1fr]">
        <Box className="flex flex-col gap-3">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Panoramica</Text>
          <Text className="text-3xl font-semibold text-typography-0">{activeCount} iscritti attivi</Text>
          <Text className="text-sm text-typography-300">
            Segmenta le comunicazioni in base a preferenze, storico spesa e propensione all'upsell.
          </Text>
          <Box className="flex flex-wrap gap-2 text-xs text-typography-300">
            <StatusPill label="Segmenti AI" tone="info" />
            <StatusPill label="Preferenze aggiornate" tone="success" />
            <StatusPill label="Azioni manuali" tone="warning" />
          </Box>
        </Box>
        <GlassCard padding="p-6" className="bg-background-0/40">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Suggerimento AI</Text>
          <Text className="mt-3 text-sm text-typography-200">
            Proponi una campagna "Benessere di coppia" ai clienti con tag anniversario e soggiorno superiore a 3 notti.
          </Text>
          <Button variant="outline" action="secondary" size="sm" className="mt-4 rounded-2xl border-white/20 px-4 py-2">
            <Sparkles color="rgb(var(--color-primary-500))" size={16} />
            <ButtonText className="text-sm font-semibold text-typography-0">Genera contenuto</ButtonText>
          </Button>
        </GlassCard>
      </GlassPanel>

      <GlassPanel className="grid gap-6 p-8 lg:grid-cols-[1.7fr_1fr]">
        <Box className="flex flex-col gap-4">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Iscritti</Text>
          <Box className="flex flex-col gap-4">
            {newsletterSubscribers.map((subscriber) => (
              <GlassCard key={subscriber.id} padding="p-5" className="bg-background-0/30">
                <Box className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <Box>
                    <Text className="text-sm font-semibold text-typography-0">{subscriber.name}</Text>
                    <Text className="text-xs text-typography-300">{subscriber.email}</Text>
                  </Box>
                  <Box className="flex flex-wrap gap-2 text-xs text-typography-300">
                    <StatusPill
                      label={subscriber.status === 'attivo' ? 'Attivo' : 'Pausato'}
                      tone={subscriber.status === 'attivo' ? 'success' : 'warning'}
                    />
                    <StatusPill label={`Dal ${subscriber.joinedAt}`} tone="neutral" />
                    {subscriber.lastCampaign ? <StatusPill label={subscriber.lastCampaign} tone="info" /> : null}
                  </Box>
                </Box>
                <Box className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <Text className="text-sm text-typography-300">
                    Preferenze principali: {clients.find((client) => client.id === subscriber.id)?.preferences
                      .map((pref) => pref.label)
                      .join(', ') ?? 'N/D'}
                  </Text>
                  <Box className="flex gap-2">
                    <Button size="sm" variant="outline" action="secondary" className="rounded-2xl border-white/20 px-4 py-2">
                      <ButtonText className="text-sm font-semibold text-typography-0">
                        {subscriber.status === 'attivo' ? 'Metti in pausa' : 'Riattiva'}
                      </ButtonText>
                    </Button>
                    <Link href={`/clients/${subscriber.id}`}>
                      <Button size="sm" action="primary" className="rounded-2xl bg-primary-500 px-4 py-2">
                        <ButtonText className="text-sm font-semibold text-typography-0">Apri profilo</ButtonText>
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </GlassCard>
            ))}
          </Box>
        </Box>

        <GlassCard padding="p-6" className="bg-background-0/30">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Segmenti consigliati</Text>
          <Box className="mt-4 flex flex-col gap-3 text-sm text-typography-200">
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-sm font-semibold text-typography-0">Anniversari Q2</Text>
              <Text className="text-xs text-typography-300">Clienti con ricorrenze entro 90 giorni</Text>
            </Box>
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-sm font-semibold text-typography-0">Amanti Spa</Text>
              <Text className="text-xs text-typography-300">Chi ha acquistato trattamenti spa nel 2024</Text>
            </Box>
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-sm font-semibold text-typography-0">Business Express</Text>
              <Text className="text-xs text-typography-300">Soggiorni di 1-2 notti con spesa oltre 500€</Text>
            </Box>
            <Link href="/clients" className="mt-2 inline-flex items-center gap-2 text-xs text-primary-400">
              <Users color="rgb(var(--color-primary-500))" size={14} /> Vedi anagrafiche clienti
            </Link>
          </Box>
        </GlassCard>
      </GlassPanel>
    </Box>
  );
}
