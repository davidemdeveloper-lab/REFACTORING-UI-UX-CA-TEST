import Link from 'next/link';
import { GlassPanel } from '@/components/app/glass-panel';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { templates } from '@/lib/mock-data';
import { Icon } from '@/components/ui/icon';
import { Sparkles, PenSquare, ArrowUpRight, GaugeCircle, Inbox } from '@/components/icons';

export default function TemplatesPage() {
  return (
    <Box className="flex flex-col gap-8">
      <GlassPanel
        title="Template empatici"
        subtitle="Crea sequenze omnicanale con voce calda e suggerimenti AI."
      >
        <Box className="flex flex-col gap-6">
          <Box className="flex flex-wrap items-center justify-between gap-4">
            <Box className="flex flex-wrap gap-2">
              {['Marketing', 'Operativo', 'AI assistito'].map((category) => (
                <Badge key={category}>
                  <BadgeText className="rounded-full bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.35em] text-typography-200">
                    {category}
                  </BadgeText>
                </Badge>
              ))}
            </Box>
            <Button action="primary" className="bg-primary-500/30 px-5">
              <ButtonIcon as={Sparkles} />
              <ButtonText className="text-typography-0">Nuovo template AI</ButtonText>
            </Button>
          </Box>
          <Box className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {templates.map((template) => (
              <Box
                key={template.id}
                className="rounded-3xl border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-2xl"
              >
                <Text className="text-sm font-semibold text-typography-0">
                  {template.name}
                </Text>
                <Badge className="mt-2">
                  <BadgeText className="rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-typography-200">
                    {template.category}
                  </BadgeText>
                </Badge>
                <Text className="mt-3 text-xs text-typography-100">{template.description}</Text>
                <Box className="mt-4 flex flex-row items-center gap-3 text-xs text-typography-200">
                  <Box className="flex items-center gap-1">
                    <Icon as={GaugeCircle} size="sm" className="text-success-200" />
                    <Text>Open rate {template.engagement}%</Text>
                  </Box>
                  <Box className="flex items-center gap-1">
                    <Icon as={Inbox} size="sm" className="text-info-200" />
                    <Text>Auto {template.automationRate}%</Text>
                  </Box>
                </Box>
                <Link
                  href={`/templates/${template.id}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-primary-200 hover:text-primary-50"
                >
                  Apri editor
                  <ArrowUpRight size={16} color="currentColor" />
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </GlassPanel>
    </Box>
  );
}

// Validazione: lista template empatici con filtri, metriche di engagement e accesso rapido all'editor.
