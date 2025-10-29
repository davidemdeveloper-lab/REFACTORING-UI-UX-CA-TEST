import { GlassCard } from '@/components/layout/GlassCard';
import { palette } from '@/design/palette';
import { mockTemplates } from '@/components/data/mockData';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icon } from '@/components/layout/UiIcon';

export default function TemplatesPage() {
  return (
    <VStack space="lg">
      <HStack className="items-center justify-between">
        <VStack>
          <Text className="text-2xl font-semibold" style={{ color: palette.textPrimary }}>
            Template email
          </Text>
          <Text className="text-sm" style={{ color: palette.textSecondary }}>
            Gestisci i layout comunicativi e mantieni sincronizzate le automazioni.
          </Text>
        </VStack>
        <Link href="/templates/new">
          <Button
            style={{
              borderRadius: 16,
              paddingHorizontal: 20,
              paddingVertical: 12,
              background: palette.surfaceAlt,
              borderColor: palette.borderHighlight,
            }}
          >
            <HStack space="sm" className="items-center">
              <Icon name="FilePlus2" size={18} color={palette.accentPrimary} />
              <Text className="text-sm font-medium" style={{ color: palette.accentPrimary }}>
                Nuovo template
              </Text>
            </HStack>
          </Button>
        </Link>
      </HStack>
      <VStack space="md">
        {mockTemplates.map((template) => (
          <GlassCard key={template.id}>
            <HStack className="items-start justify-between gap-4">
              <VStack space="xs">
                <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                  {template.name}
                </Text>
                <Text className="text-xs" style={{ color: palette.textSecondary }}>
                  {template.description}
                </Text>
                <Text className="text-xs" style={{ color: palette.textMuted }}>
                  Ultima modifica {template.lastEdited}
                </Text>
              </VStack>
              <HStack className="items-center gap-2">
                <GlassCard padding={12} gap={4} borderColor={palette.borderSoft}>
                  <Text className="text-xs" style={{ color: palette.textSecondary }}>
                    Categoria
                  </Text>
                  <Text className="text-sm font-medium" style={{ color: palette.accentSecondary }}>
                    {template.category}
                  </Text>
                </GlassCard>
                <Link href={`/templates/${template.id}`}>
                  <Button
                    style={{
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      background: 'transparent',
                      borderColor: palette.borderSoft,
                    }}
                  >
                    <HStack space="sm" className="items-center">
                      <Icon name="Pen" size={16} color={palette.textSecondary} />
                      <Text className="text-xs" style={{ color: palette.textSecondary }}>
                        Apri editor
                      </Text>
                    </HStack>
                  </Button>
                </Link>
              </HStack>
            </HStack>
          </GlassCard>
        ))}
      </VStack>
    </VStack>
  );
}
