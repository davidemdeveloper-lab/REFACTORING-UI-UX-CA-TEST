import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GlassPanel } from '@/components/app/glass-panel';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { templates } from '@/lib/mock-data';
import { Icon } from '@/components/ui/icon';
import { Sparkles, Save, MessageSquarePlus, Layers, Mail } from '@/components/icons';

const blocks = [
  { title: 'Blocco Variabili', description: 'Personalizza nome ospite, date, servizi dinamici.' },
  { title: 'Condizioni AI', description: 'Trigger automatici in base a canale, lingua, preferenze.' },
  { title: 'Loop Multilingua', description: 'Gestisci più lingue con fallback AI.' },
];

export default function TemplateDetail({ params }: { params: { id: string } }) {
  const template = templates.find((item) => item.id === params.id);
  if (!template) {
    notFound();
  }

  return (
    <Box className="flex flex-col gap-8">
      <GlassPanel title={template.name} subtitle={template.description}>
        <Box className="flex flex-wrap items-center gap-3 text-xs text-typography-300">
          <Badge className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-typography-300">
            {template.category}
          </Badge>
          <Text>Aggiornato il {template.updatedAt}</Text>
          <Box className="flex items-center gap-2">
            <Icon as={Sparkles} size="sm" className="text-primary-200" />
            <Text>Open rate {template.engagement}%</Text>
          </Box>
        </Box>
      </GlassPanel>

      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassPanel
          title="Blocco editor"
          subtitle="Drag & drop modulare con componenti intelligenti."
          className="lg:col-span-2"
        >
          <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {blocks.map((block) => (
              <Box
                key={block.title}
                className="rounded-3xl border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl"
              >
                <Text className="text-sm font-semibold text-typography-0">
                  {block.title}
                </Text>
                <Text className="mt-2 text-xs text-typography-300">{block.description}</Text>
                <Button variant="outline" action="secondary" className="mt-4 border-white/15 px-4">
                  <ButtonIcon as={Layers} />
                  <ButtonText className="text-typography-100">Aggiungi blocco</ButtonText>
                </Button>
              </Box>
            ))}
          </Box>
        </GlassPanel>
        <GlassPanel
          title="Preview"
          subtitle="Anteprima email metal-glassy con dinamiche AI."
        >
          <Box className="rounded-3xl border border-white/10 bg-black/15 px-5 py-6 text-sm text-typography-100">
            <Text className="text-lg font-semibold text-typography-0">
              {'Ciao {{nome}}, siamo pronti ad accoglierti!'}
            </Text>
            <Text className="mt-3 text-sm text-typography-200">
              {"Check-in previsto il {{checkIn}} alle ore 15:00. L'AI ha riservato per te {{servizio_preferito}}."}
            </Text>
            <Text className="mt-4 text-sm text-typography-200">
              {'Ricordati di completare il pre check-in digitale entro 48 ore.'}
            </Text>
            <Box className="mt-5 flex flex-wrap gap-2">
              <Badge className="rounded-full bg-primary-500/20 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-primary-100">
                dynamic ai
              </Badge>
              <Badge className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-typography-300">
                multi lingua
              </Badge>
            </Box>
          </Box>
        </GlassPanel>
      </Box>

      <GlassPanel title="Azioni" subtitle="Gestisci test A/B, versioning e pubblicazione.">
        <Box className="flex flex-wrap gap-3">
          <Button action="primary" className="bg-primary-500/30 px-5">
            <ButtonIcon as={Save} />
            <ButtonText className="text-typography-0">Salva template</ButtonText>
          </Button>
          <Button variant="outline" action="secondary" className="border-white/15 px-5">
            <ButtonIcon as={MessageSquarePlus} />
            <ButtonText className="text-typography-100">Test invio</ButtonText>
          </Button>
          <Link href="/templates">
            <Button variant="outline" action="secondary" className="border-white/15 px-5">
              <ButtonIcon as={Mail} />
              <ButtonText className="text-typography-100">Torna alla lista</ButtonText>
            </Button>
          </Link>
        </Box>
      </GlassPanel>
    </Box>
  );
}

// Validazione: editor template con blocchi modulari, anteprima AI e azioni di gestione richieste.
