import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { guestPortalSections } from '@/lib/mock-data';

export default function GuestPortalPage() {
  return (
    <VStack space="lg" className="pb-16">
      <Box>
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Esperienza ospite</Text>
        <Text className="mt-2 text-3xl font-semibold text-primary-900">Wireframe area cliente</Text>
        <Text className="mt-2 text-sm text-typography-500">
          Come l’ospite vive il soggiorno digitale: chat assistita, servizi e documenti in un’unica plancia.
        </Text>
      </Box>

      <Box className="glass-panel rounded-3xl px-8 py-8">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Dashboard ospite</Text>
        <Box className="mt-4 grid gap-6 lg:grid-cols-[300px_1fr]">
          <Box className="rounded-3xl border border-white/15 bg-white/80 px-6 py-6">
            <Text className="text-sm font-semibold text-primary-900">Countdown arrivo</Text>
            <Text className="mt-2 text-4xl font-semibold text-primary-900">2g 14h</Text>
            <Text className="text-xs text-typography-500">Check-in previsto 25 Aprile ore 14:00</Text>
            <Text className="mt-4 text-xs uppercase tracking-[0.3em] text-primary-700/80">Azioni rapide</Text>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-typography-500">
              <li>Compila preferenze camera</li>
              <li>Prenota Spa</li>
              <li>Richiedi transfer</li>
            </ul>
          </Box>

          <Box className="space-y-4">
            {guestPortalSections.map((section) => (
              <Box key={section.id} className="rounded-3xl border border-white/15 bg-white/80 px-6 py-5">
                <Text className="text-sm font-semibold text-primary-900">{section.title}</Text>
                <Text className="mt-2 text-xs text-typography-500">{section.description}</Text>
                <HStack className="mt-3 flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-primary-700">
                  {section.items.map((item) => (
                    <span key={item} className="rounded-full border border-primary-200/60 bg-primary-50/60 px-3 py-1">
                      {item}
                    </span>
                  ))}
                </HStack>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </VStack>
  );
}

