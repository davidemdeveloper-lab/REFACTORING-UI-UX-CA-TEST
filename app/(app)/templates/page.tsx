'use client';

import { useAppSelector } from '@/lib/hooks';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GlassPanel } from '@/components/common/GlassPanel';
import { VStack, HStack, Text, Button, Box } from '@gluestack-ui/themed';
import Link from 'next/link';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

export default function TemplatesPage() {
  const templates = useAppSelector((state) => state.templates.items);

  return (
    <VStack space="md">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Template' }]} />
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize={24} fontWeight="700">
          Template email
        </Text>
        <Button action="primary">Nuovo template (mock)</Button>
      </HStack>
      <GlassPanel>
        <VStack space="md">
          {templates.map((template) => (
            <Box
              key={template.id}
              borderRadius={tokens.radii.glass}
              px={16}
              py={14}
              borderWidth={1}
              borderColor="rgba(148,163,184,0.25)"
              bg="rgba(15,23,42,0.35)"
            >
              <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <VStack>
                  <Text fontSize={16} fontWeight="600">
                    {template.name}
                  </Text>
                  <Text fontSize={13} color={palette.steel[200]}>
                    Ultima modifica: {new Date(template.updatedAt).toLocaleDateString('it-IT')} · Utilizzi:{' '}
                    {template.usage}
                  </Text>
                </VStack>
                <Link href={`/templates/${template.id}`}>
                  <Button variant="outline">Apri editor</Button>
                </Link>
              </HStack>
            </Box>
          ))}
        </VStack>
      </GlassPanel>
    </VStack>
  );
}
