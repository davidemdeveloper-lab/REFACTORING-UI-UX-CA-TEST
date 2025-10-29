import Link from 'next/link';
import { GlassCard } from '@/components/common/GlassCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { templates } from '@/lib/mock-data';
import { palette } from '@/theme/palette';
import { FilePenLine, Sparkles, ArrowRight } from 'lucide-react-native';

export default function TemplatesPage() {
  return (
    <VStack className="gap-8">
      <GlassCard className="gap-6 border-white/10 bg-white/5">
        <SectionHeader
          title="Template email"
          subtitle="Blocchi modulari pronti per automazioni AI"
          action={
            <Button className="rounded-full border border-white/10 bg-white/10 px-5 py-3">
              <ButtonIcon>
                <Sparkles color={palette.intent.accent} size={18} strokeWidth={1.4} />
              </ButtonIcon>
              <ButtonText className="text-sm text-white">Nuovo template AI</ButtonText>
            </Button>
          }
        />
        <Text className="text-sm text-slate-300">
          Ogni template eredita stile metal-glassy con blocchi variabili, condizioni e loop collegati alle
          automazioni cliente.
        </Text>
      </GlassCard>

      <HStack className="flex-col gap-6 md:flex-row">
        {templates.map((template) => (
          <GlassCard key={template.id} className="flex-1 gap-4 border-white/10 bg-white/5">
            <HStack className="items-center gap-3">
              <FilePenLine color={palette.intent.accent} size={20} strokeWidth={1.5} />
              <VStack className="gap-1">
                <Text className="text-lg font-semibold text-white">{template.name}</Text>
                <Text className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {template.category} · Ultima modifica {new Date(template.lastEdited).toLocaleDateString('it-IT')}
                </Text>
              </VStack>
            </HStack>
            <Text className="text-sm text-slate-300">{template.description}</Text>
            <Link
              href={`/templates/${template.id}`}
              className="mt-auto flex-row items-center gap-2 rounded-full border border-white/15 px-3 py-2"
            >
              <Text className="text-xs font-semibold text-white">Apri editor</Text>
              <ArrowRight color={palette.text.secondary} size={14} strokeWidth={1.3} />
            </Link>
          </GlassCard>
        ))}
      </HStack>
    </VStack>
  );
}
