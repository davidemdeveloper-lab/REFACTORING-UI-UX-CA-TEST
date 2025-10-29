import { notFound } from 'next/navigation';
import { GlassCard } from '@/components/common/GlassCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { templates } from '@/lib/mock-data';
import { palette } from '@/theme/palette';
import { Grip, Plus, Sparkles, Blocks } from 'lucide-react-native';

const blocks = [
  { id: 'intro', label: 'Saluto personalizzato', description: 'Inserisce nome ospite e dati prenotazione' },
  { id: 'upsell', label: 'Upsell dinamico', description: 'Suggerisce servizi in base alle preferenze' },
  { id: 'cta', label: 'Call-to-action', description: 'Pulsanti per confermare servizi o rispondere alla chat' },
];

export default function TemplateEditorPage({ params }: { params: { id: string } }) {
  const template = templates.find((item) => item.id === params.id);
  if (!template) {
    notFound();
  }

  return (
    <VStack className="gap-8">
      <SectionHeader
        title={template.name}
        subtitle={`Categoria ${template.category} · Ultima modifica ${new Date(template.lastEdited).toLocaleDateString('it-IT')}`}
        action={
          <Button className="rounded-full border border-white/10 bg-white/10 px-5 py-3">
            <ButtonIcon>
              <Sparkles color={palette.intent.accent} size={18} strokeWidth={1.4} />
            </ButtonIcon>
            <ButtonText className="text-sm text-white">Ottimizza con AI</ButtonText>
          </Button>
        }
      />

      <HStack className="flex-col gap-6 xl:flex-row">
        <GlassCard className="flex-1 gap-4 border-white/10 bg-white/5">
          <HStack className="items-center justify-between">
            <Text className="text-lg font-semibold text-white">Blocchi disponibili</Text>
            <Button className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
              <ButtonIcon>
                <Plus color={palette.intent.accent} size={16} strokeWidth={1.4} />
              </ButtonIcon>
              <ButtonText className="text-xs text-white">Nuovo blocco</ButtonText>
            </Button>
          </HStack>
          <VStack className="gap-3">
            {blocks.map((block) => (
              <HStack
                key={block.id}
                className="items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
              >
                <Box className="h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                  <Grip color={palette.intent.accent} size={18} strokeWidth={1.4} />
                </Box>
                <VStack className="gap-1">
                  <Text className="text-sm font-semibold text-white">{block.label}</Text>
                  <Text className="text-xs text-slate-300">{block.description}</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </GlassCard>

        <GlassCard className="flex-1 gap-4 border-white/10 bg-white/5">
          <HStack className="items-center justify-between">
            <Text className="text-lg font-semibold text-white">Editor drag & drop</Text>
            <Box className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
              <Text className="text-xs uppercase tracking-[0.3em] text-slate-400">Layout 2 colonne</Text>
            </Box>
          </HStack>
          <Box className="min-h-[320px] rounded-3xl border border-white/10 bg-white/5 p-6">
            <Text className="text-sm text-slate-300">
              Trascina i blocchi per comporre il flusso email. Ogni componente mantiene stile metal-glassy e si
              adatta ai dati dinamici.
            </Text>
            <Box className="mt-6 rounded-2xl border border-white/10 bg-[#101924]/70 p-6">
              <Text className="text-sm text-slate-200">Gentile {'{{guest.firstName}}'},</Text>
              <Text className="mt-3 text-sm text-slate-300">
                Siamo pronti ad accoglierti nella {'{{booking.roomType}}'} dal {'{{booking.arrivalDate}}'}. Per te è
                già riservato il percorso Spa firmato Aurora.
              </Text>
              <Box className="mt-6 flex-row flex-wrap gap-3">
                <Text className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-slate-200">
                  Pulsante: Conferma SPA
                </Text>
                <Text className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-slate-200">
                  Pulsante: Richiedi upgrade camera
                </Text>
              </Box>
            </Box>
          </Box>
        </GlassCard>

        <GlassCard className="w-full max-w-sm gap-4 border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5">
          <HStack className="items-center gap-3">
            <Blocks color={palette.intent.accent} size={18} strokeWidth={1.4} />
            <Text className="text-sm font-semibold text-white">Preview canali</Text>
          </HStack>
          <VStack className="gap-3">
            <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">Email</Text>
            <Text className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-200">
              Oggetto: {template.name}
            </Text>
            <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">Chat AI</Text>
            <Text className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-200">
              Prompt generato per l'assistente: "Ricorda check-in digitale e proponi upgrade se suite libera"
            </Text>
          </VStack>
        </GlassCard>
      </HStack>
    </VStack>
  );
}
