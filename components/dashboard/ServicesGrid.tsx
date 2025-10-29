import { GlassCard } from '@/components/common/GlassCard';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { palette } from '@/theme/palette';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  status: string;
  actionLabel: string;
}

interface ServicesGridProps {
  services: ServiceItem[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <GlassCard>
      <VStack className="gap-6">
        <HStack className="items-baseline justify-between">
          <Text className="text-xl font-semibold text-white">Servizi esterni & SPA</Text>
          <Text className="text-sm text-slate-400">Gestisci integrazioni e adesioni</Text>
        </HStack>
        <VStack className="gap-4">
          {services.map((service) => (
            <HStack
              key={service.id}
              className="items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
            >
              <VStack className="gap-1">
                <Text className="text-lg font-semibold text-white">{service.name}</Text>
                <Text className="text-sm text-slate-400">{service.description}</Text>
              </VStack>
              <HStack className="items-center gap-4">
                <Text
                  className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{
                    backgroundColor:
                      service.status === 'Connesso'
                        ? 'rgba(20, 184, 166, 0.22)'
                        : 'rgba(251, 191, 36, 0.22)',
                    color:
                      service.status === 'Connesso'
                        ? palette.text.positive
                        : palette.text.warning,
                  }}
                >
                  {service.status}
                </Text>
                <Pressable className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                  <Text className="text-sm font-semibold text-white">{service.actionLabel}</Text>
                </Pressable>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </GlassCard>
  );
}
