'use client';

import { servicesHub } from '@/data/mockData';
import { palette } from '@/theme/palette';
import { SectionHeading } from '@/components/design-system/SectionHeading';
import { ServiceCard } from '@/components/services/ServiceCard';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { StatusPill } from '@/components/design-system/StatusPill';
import { Workflow } from 'lucide-react-native';

export default function ServicesPage() {
  return (
    <VStack space="xl">
      <SectionHeading
        title="Hub servizi e partnership"
        subtitle="Gestisci integrazioni, adesioni e azioni automatiche"
        icon={<Workflow size={20} color={palette.accentPrimary} />}
        action={<StatusPill label="AI suggerisce priorità" tone="accent" />}
      />

      <HStack gap={20} flexWrap="wrap">
        {servicesHub.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </HStack>
    </VStack>
  );
}

// Validazione: hub servizi mostra stato integrazioni e CTA immediate.
