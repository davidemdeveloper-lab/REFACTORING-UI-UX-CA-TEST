import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { PageHeader } from '@/components/common/page-header';
import { Button, ButtonText } from '@/components/ui/button';
import { workflowBlueprints } from '@/lib/mock-data';
import { StatusPill } from '@/components/common/status-pill';
import { Sparkles, PlusCircle } from 'lucide-react-native';

export default function WorkflowPage() {
  return (
    <Box className="flex flex-col gap-8">
      <PageHeader
        title="Workflow Engine"
        subtitle="Modella i percorsi di comunicazione automatizzata e controlla le prestazioni."
        actions={
          <Button size="md" action="primary" className="rounded-2xl bg-primary-500 px-6 py-3">
            <PlusCircle color="rgb(var(--color-typography-0))" size={18} />
            <ButtonText className="font-semibold text-typography-0">Nuovo workflow</ButtonText>
          </Button>
        }
      />

      <GlassPanel className="grid gap-6 p-8 lg:grid-cols-[1.4fr_1fr]">
        <Box className="flex flex-col gap-4">
          {workflowBlueprints.map((flow) => (
            <GlassCard key={flow.id} padding="p-6" className="bg-background-0/40">
              <Box className="flex flex-col gap-3">
                <Text className="text-xl font-semibold text-typography-0">{flow.name}</Text>
                <Text className="text-sm text-typography-300">
                  Conversione {flow.conversion}% · Tempo medio {flow.avgTime}
                </Text>
                <Box className="flex flex-wrap gap-2 text-xs text-typography-300">
                  <StatusPill label="Automazioni" tone="info" />
                  <StatusPill label="AI suggerimenti" tone="success" />
                </Box>
                <Box className="mt-3 flex flex-col gap-2">
                  {flow.steps.map((step, index) => (
                    <GlassCard key={step.name} padding="p-3" className="bg-background-0/30">
                      <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Step {index + 1}</Text>
                      <Text className="text-sm font-semibold text-typography-0">{step.name}</Text>
                      <Text className="text-xs text-typography-300">{step.delay} · {step.channel.toUpperCase()}</Text>
                    </GlassCard>
                  ))}
                </Box>
              </Box>
            </GlassCard>
          ))}
        </Box>
        <GlassCard padding="p-6" className="bg-background-0/30">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Copilot suggerisce</Text>
          <Text className="mt-3 text-sm text-typography-200">
            "Integra un reminder 12 ore prima dell'arrivo per proporre il servizio transfer dedicato."
          </Text>
          <Button variant="outline" action="secondary" size="sm" className="mt-4 rounded-2xl border-white/20 px-4 py-2">
            <Sparkles color="rgb(var(--color-primary-500))" size={16} />
            <ButtonText className="text-sm font-semibold text-typography-0">Applica al flusso</ButtonText>
          </Button>
        </GlassCard>
      </GlassPanel>
    </Box>
  );
}
