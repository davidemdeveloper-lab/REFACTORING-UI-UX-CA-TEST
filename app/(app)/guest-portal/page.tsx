import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { PageHeader } from '@/components/common/page-header';
import { Button, ButtonText } from '@/components/ui/button';
import { guestPortalModules } from '@/lib/mock-data';
import { StatusPill } from '@/components/common/status-pill';
import { Sparkles } from 'lucide-react-native';

export default function GuestPortalPage() {
  return (
    <Box className="flex flex-col gap-8">
      <PageHeader
        title="Portale ospite"
        subtitle="Anteprima della dashboard dedicata agli ospiti: self service, chat e scenari personalizzati."
        actions={
          <Button size="md" action="primary" className="rounded-2xl bg-primary-500 px-6 py-3">
            <Sparkles color="rgb(var(--color-typography-0))" size={18} />
            <ButtonText className="font-semibold text-typography-0">Condividi link demo</ButtonText>
          </Button>
        }
      />

      <GlassPanel className="grid gap-6 p-8 lg:grid-cols-[1.2fr_1fr]">
        <GlassCard padding="p-6" className="bg-background-0/40">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Wireframe esperienza ospite</Text>
          <Box className="mt-6 grid gap-4 md:grid-cols-2">
            {guestPortalModules.map((module) => (
              <GlassCard key={module.title} padding="p-5" className="bg-background-0/30">
                <Text className="text-sm font-semibold text-typography-0">{module.title}</Text>
                <Text className="mt-2 text-xs text-typography-300">{module.description}</Text>
              </GlassCard>
            ))}
          </Box>
        </GlassCard>
        <GlassCard padding="p-6" className="bg-background-0/40">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Servizi digitali</Text>
          <Box className="mt-4 flex flex-col gap-3 text-sm text-typography-200">
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-sm font-semibold text-typography-0">Chat concierge</Text>
              <Text className="text-xs text-typography-300">AI + operatore con handover istantaneo</Text>
            </Box>
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-sm font-semibold text-typography-0">Wifi & domotica</Text>
              <Text className="text-xs text-typography-300">Accesso rapido a password e controllo camera</Text>
            </Box>
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-sm font-semibold text-typography-0">Programma loyalty</Text>
              <Text className="text-xs text-typography-300">Riscatta benefit, accumula punti, prenota servizi</Text>
            </Box>
          </Box>
          <Box className="mt-4 flex gap-3">
            <StatusPill label="Mobile first" tone="info" />
            <StatusPill label="Chat H24" tone="success" />
            <StatusPill label="Integrazione PMS" tone="warning" />
          </Box>
        </GlassCard>
      </GlassPanel>
    </Box>
  );
}
