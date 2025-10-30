import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { PageHeader } from '@/components/common/page-header';
import { StatusPill } from '@/components/common/status-pill';
import { templates } from '@/lib/mock-data';
import { Sparkles, Wand2 } from 'lucide-react-native';

export default function TemplatesPage() {
  return (
    <Box className="flex flex-col gap-8">
      <PageHeader
        title="Template email"
        subtitle="Organizza contenuti dinamici e sfrutta l'assistente AI per personalizzare ogni messaggio."
        actions={
          <Button size="md" action="primary" className="rounded-2xl bg-primary-500 px-6 py-3">
            <Sparkles color="rgb(var(--color-typography-0))" size={18} />
            <ButtonText className="font-semibold text-typography-0">Nuovo template</ButtonText>
          </Button>
        }
      />

      <GlassPanel className="grid gap-6 p-8 lg:grid-cols-[1.4fr_1fr]">
        <Box className="flex flex-col gap-3">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Suggerimento AI</Text>
          <Text className="text-sm text-typography-200">
            "Vuoi generare una variante più emozionale per l'upsell spa? Posso proporti subito tre versioni."
          </Text>
          <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
            <Wand2 color="rgb(var(--color-primary-500))" size={16} />
            <ButtonText className="text-sm font-semibold text-typography-0">Chiedi al copilot</ButtonText>
          </Button>
        </Box>
        <GlassCard padding="p-6" className="bg-background-0/40">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Performance media</Text>
          <Text className="mt-2 text-3xl font-semibold text-typography-0">76% engagement</Text>
          <Text className="text-sm text-typography-300">Basato sugli ultimi 30 giorni</Text>
        </GlassCard>
      </GlassPanel>

      <Box className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <GlassCard key={template.id} padding="p-6" className="bg-background-0/40">
            <Box className="flex flex-col gap-3">
              <StatusPill label={template.category} tone="info" />
              <Text className="text-xl font-semibold text-typography-0">{template.name}</Text>
              <Text className="text-sm text-typography-300">{template.description}</Text>
              <Text className="text-xs text-typography-400">
                Ultimo update {template.updatedAt} · Proprietario {template.owner}
              </Text>
              <Text className="text-xs text-typography-300">Performance {template.performance}%</Text>
              <Link href={`/templates/${template.id}`}>
                <Button size="sm" action="primary" className="w-full rounded-2xl bg-primary-500 px-4 py-2">
                  <ButtonText className="text-sm font-semibold text-typography-0">Apri editor</ButtonText>
                </Button>
              </Link>
            </Box>
          </GlassCard>
        ))}
      </Box>
    </Box>
  );
}
