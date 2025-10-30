import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Button } from '@/components/ui/button';
import { templates } from '@/lib/mock-data';

export default function TemplatesPage() {
  return (
    <VStack space="lg" className="pb-16">
      <HStack className="flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Box>
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Template Email</Text>
          <Text className="mt-2 text-3xl font-semibold text-primary-900">Libreria comunicazioni</Text>
          <Text className="mt-2 text-sm text-typography-500">
            Personalizza blocchi, condizioni e variabili. Ogni template ha statistiche in tempo reale.
          </Text>
        </Box>
        <Button action="primary" size="lg" className="rounded-full px-6">
          <Text className="text-base font-semibold text-white">Nuovo template</Text>
        </Button>
      </HStack>

      <Box className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => (
          <Link key={template.id} href={`/templates/${template.id}`}>
            <Box className="glass-panel h-full rounded-3xl px-7 py-6">
              <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">{template.category}</Text>
              <Text className="mt-2 text-xl font-semibold text-primary-900">{template.name}</Text>
              <Text className="mt-2 text-sm text-typography-500">{template.description}</Text>
              <VStack space="xs" className="mt-4 text-xs text-typography-400">
                <Text>Aperture: {Math.round(template.performance.openRate * 100)}%</Text>
                <Text>Click: {Math.round(template.performance.clickRate * 100)}%</Text>
                <Text>Conversione: {Math.round(template.performance.conversionRate * 100)}%</Text>
              </VStack>
            </Box>
          </Link>
        ))}
      </Box>
    </VStack>
  );
}

