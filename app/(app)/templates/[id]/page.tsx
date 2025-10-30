import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { PageHeader } from '@/components/common/page-header';
import { Button, ButtonText } from '@/components/ui/button';
import { StatusPill } from '@/components/common/status-pill';
import { templates } from '@/lib/mock-data';
import { Sparkles, Save, Wand2, ArrowLeft } from 'lucide-react-native';

const BLOCKS = ['Hero', 'Sezione informativa', 'Upsell', 'FAQ', 'Footer'];
const VARIABLES = ['Nome ospite', 'Data arrivo', 'Link pagamento', 'Benefit loyalty'];

export default function TemplateDetailPage({ params }: { params: { id: string } }) {
  const template = templates.find((tmpl) => tmpl.id === params.id);
  if (!template) {
    notFound();
  }

  return (
    <Box className="flex flex-col gap-8">
      <PageHeader
        title={`Editor • ${template.name}`}
        subtitle="Modifica le sezioni, applica condizioni dinamiche e genera varianti con il copilot."
        actions={
          <Box className="flex gap-3">
            <Link href="/templates">
              <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
                <ArrowLeft color="rgb(var(--color-primary-500))" size={16} />
                <ButtonText className="text-sm font-semibold text-typography-0">Torna ai template</ButtonText>
              </Button>
            </Link>
            <Button action="primary" size="md" className="rounded-2xl bg-primary-500 px-6 py-3">
              <Save color="rgb(var(--color-typography-0))" size={18} />
              <ButtonText className="font-semibold text-typography-0">Salva modifiche</ButtonText>
            </Button>
          </Box>
        }
      />

      <GlassPanel className="grid gap-6 p-8 lg:grid-cols-[1.2fr_1.8fr_1fr]">
        <GlassCard padding="p-5" className="bg-background-0/30">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Blocchi disponibili</Text>
          <Box className="mt-4 flex flex-col gap-3 text-sm text-typography-200">
            {BLOCKS.map((block) => (
              <Box key={block} className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
                <Text className="text-sm font-semibold text-typography-0">{block}</Text>
                <Text className="text-xs text-typography-300">Trascina nella bozza per aggiungerlo</Text>
              </Box>
            ))}
          </Box>
        </GlassCard>

        <GlassCard padding="p-6" className="bg-background-0/40">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Bozza attuale</Text>
          <Box className="mt-4 flex flex-col gap-4">
            <GlassCard padding="p-4" className="bg-background-0/40">
              <Text className="text-sm font-semibold text-typography-0">Hero personalizzato</Text>
              <Text className="text-xs text-typography-300">
                {"Ciao {{Nome ospite}}, abbiamo preparato un'accoglienza su misura per il tuo soggiorno del {{Data arrivo}}."}
              </Text>
            </GlassCard>
            <GlassCard padding="p-4" className="bg-background-0/40">
              <Text className="text-sm font-semibold text-typography-0">Sezione upsell</Text>
              <Text className="text-xs text-typography-300">
                {"Rilassati con il nostro pacchetto spa firmato AI Concierge. Clicca qui per confermare: {{Link pagamento}}."}
              </Text>
            </GlassCard>
            <GlassCard padding="p-4" className="bg-background-0/40">
              <Text className="text-sm font-semibold text-typography-0">FAQ dinamiche</Text>
              <Text className="text-xs text-typography-300">
                {"• Check-in digitale disponibile da 48 ore prima · • Benefit loyalty: {{Benefit loyalty}}"}
              </Text>
            </GlassCard>
          </Box>
        </GlassCard>

        <GlassCard padding="p-5" className="bg-background-0/30">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Variabili</Text>
          <Box className="mt-4 flex flex-col gap-3 text-sm text-typography-200">
            {VARIABLES.map((variable) => (
              <Box key={variable} className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
                <Text className="text-sm font-semibold text-typography-0">{variable}</Text>
                <Text className="text-xs text-typography-300">Click per copiare nel blocco</Text>
              </Box>
            ))}
          </Box>
          <Button variant="outline" action="secondary" size="sm" className="mt-4 rounded-2xl border-white/20 px-4 py-2">
            <Sparkles color="rgb(var(--color-primary-500))" size={16} />
            <ButtonText className="text-sm font-semibold text-typography-0">Genera testo alternativo</ButtonText>
          </Button>
        </GlassCard>
      </GlassPanel>

      <GlassCard className="flex flex-col gap-4 bg-background-0/40 p-6">
        <Box className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Informazioni template</Text>
          <StatusPill label={template.category} tone="info" />
        </Box>
        <Text className="text-sm text-typography-300">Proprietario: {template.owner}</Text>
        <Text className="text-sm text-typography-300">Ultima modifica: {template.updatedAt}</Text>
        <Text className="text-sm text-typography-300">Performance media: {template.performance}%</Text>
      </GlassCard>
    </Box>
  );
}
