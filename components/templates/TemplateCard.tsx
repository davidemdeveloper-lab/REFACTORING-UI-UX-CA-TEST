'use client';

import { MetalGlassCard } from '@/components/design-system/MetalGlassCard';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { palette } from '@/theme/palette';
import { StatusPill } from '@/components/design-system/StatusPill';
import { ArrowRight } from 'lucide-react-native';
import Link from 'next/link';

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  updatedAt: string;
  tags: string[];
}

export function TemplateCard({ id, name, description, category, updatedAt, tags }: TemplateCardProps) {
  return (
    <Link href={`/templates/${id}`} style={{ textDecoration: 'none' }}>
      <MetalGlassCard>
        <VStack space="md">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize={18} fontWeight="700" color={palette.textPrimary}>
              {name}
            </Text>
            <ArrowRight size={18} color={palette.accentPrimary} />
          </HStack>
          <Text fontSize={14} color={palette.textSecondary}>
            {description}
          </Text>
          <HStack space="sm" alignItems="center" flexWrap="wrap">
            <StatusPill label={category} tone="accent" />
            <StatusPill label={`Aggiornato il ${updatedAt}`} tone="muted" />
            {tags.map((tag) => (
              <StatusPill key={tag} label={`#${tag}`} tone="muted" />
            ))}
          </HStack>
        </VStack>
      </MetalGlassCard>
    </Link>
  );
}
