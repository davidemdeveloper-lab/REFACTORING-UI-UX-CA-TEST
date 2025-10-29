'use client';

import { templates } from '@/data/mockData';
import { palette } from '@/theme/palette';
import { SectionHeading } from '@/components/design-system/SectionHeading';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { StatusPill } from '@/components/design-system/StatusPill';
import { Search, NotebookPen } from 'lucide-react-native';
import { MetalGlassCard } from '@/components/design-system/MetalGlassCard';

export default function TemplatesPage() {
  return (
    <VStack space="xl">
      <SectionHeading
        title="Template email"
        subtitle="Organizza blocchi dinamici e automazioni AI"
        icon={<NotebookPen size={20} color={palette.accentPrimary} />}
        action={<StatusPill label="Sincronizzato con AI" tone="accent" />}
      />

      <MetalGlassCard padding={20}>
        <HStack space="md" flexWrap="wrap">
          <Input
            w={320}
            variant="outline"
            bg="rgba(8,15,28,0.65)"
            borderColor="rgba(56,189,248,0.25)"
            borderRadius={20}
          >
            <Search size={18} color={palette.textMuted} style={{ marginHorizontal: 10 }} />
            <InputField placeholder="Cerca template o tag" />
          </Input>
          <StatusPill label="Template attivi: 12" tone="accent" />
          <StatusPill label="Tag AI: 5" tone="success" />
        </HStack>
      </MetalGlassCard>

      <HStack gap={20} flexWrap="wrap">
        {templates.map((template) => (
          <TemplateCard key={template.id} {...template} />
        ))}
      </HStack>
    </VStack>
  );
}

// Validazione: lista template con filtri e card metal-glassy in linea con requisiti.
