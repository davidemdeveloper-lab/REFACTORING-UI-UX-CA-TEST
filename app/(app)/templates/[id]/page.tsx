import { notFound } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Divider } from '@/components/ui/divider';
import { Button } from '@/components/ui/button';
import { templates } from '@/lib/mock-data';

export default function TemplateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const template = templates.find((item) => item.id === params.id);

  if (!template) {
    return notFound();
  }

  return (
    <VStack space="lg" className="pb-16">
      <HStack className="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Box>
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Template</Text>
          <Text className="mt-2 text-3xl font-semibold text-primary-900">{template.name}</Text>
          <Text className="mt-2 text-sm text-typography-500">{template.description}</Text>
        </Box>
        <HStack space="md" className="flex-wrap">
          <Button action="secondary" variant="outline" size="lg" className="rounded-full border-primary-200/60 px-6">
            <Text className="text-base font-semibold text-primary-700">Anteprima invio</Text>
          </Button>
          <Button action="primary" size="lg" className="rounded-full px-6">
            <Text className="text-base font-semibold text-white">Salva template</Text>
          </Button>
        </HStack>
      </HStack>

      <HStack className="flex-col gap-6 xl:flex-row">
        <Box className="glass-panel w-full max-w-xs rounded-3xl px-6 py-5">
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Blocchi</Text>
          <VStack space="sm" className="mt-3 text-sm text-typography-500">
            <Text>• Titolo + Hero</Text>
            <Text>• Corpo testo</Text>
            <Text>• Sezione variabile (camere disponibili)</Text>
            <Text>• Testimonianze dinamiche</Text>
            <Text>• Blocco call-to-action</Text>
          </VStack>
          <Divider className="my-4 border-white/15" />
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Condizioni</Text>
          <Text className="mt-3 text-sm text-typography-500">
            Mostra upsell SPA solo a clienti con tag “wellness” e punteggio loyalty &gt; 70.
          </Text>
        </Box>

        <Box className="glass-panel flex-1 rounded-3xl px-8 py-8">
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Anteprima email</Text>
          <Box className="mt-4 rounded-3xl border border-white/15 bg-white/80 px-8 py-10 text-sm text-typography-600">
            <Text className="text-base font-semibold text-primary-900">
              Gentile {'{{guest.firstname}}'},
            </Text>
            <Text className="mt-4">
              La tua esperienza al Conedo Alps Resort sta per iniziare. Ecco i dettagli del soggiorno e i servizi consigliati per
              un’accoglienza su misura.
            </Text>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Check-in il {'{{booking.arrivalDate}}'} dalle 14:00.</li>
              <li>Accesso concierge digitale: {'{{portal.link}}'}</li>
              <li>Consigliati per te: Percorso Family Spa, Cena con degustazione locale.</li>
            </ul>
            <Text className="mt-6 font-semibold text-primary-800">Personalizza ora il tuo soggiorno →</Text>
          </Box>
        </Box>

        <Box className="glass-panel w-full max-w-xs rounded-3xl px-6 py-5">
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Personalizzazione</Text>
          <VStack space="sm" className="mt-3 text-sm text-typography-500">
            <Text>Variabili utilizzate</Text>
            <ul className="list-disc space-y-1 pl-5 text-xs">
              {template.variables.map((variable) => (
                <li key={variable}>{variable}</li>
              ))}
            </ul>
            <Divider className="my-3 border-white/15" />
            <Text>Versioni A/B</Text>
            <Text className="text-xs text-typography-400">Versione attuale vs. CTA alternativa con immagini animate.</Text>
          </VStack>
        </Box>
      </HStack>
    </VStack>
  );
}

