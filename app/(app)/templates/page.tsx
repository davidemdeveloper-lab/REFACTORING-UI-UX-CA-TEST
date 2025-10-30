'use client';

import { templates } from '@/data/templates';
import { GlassCard } from '@/components/common/GlassCard';
import { formatDate } from '@/lib/utils';
import { Box, Button, ButtonText, Heading, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { ArrowRight, FileSignature } from 'lucide-react';
import NextLink from 'next/link';

export default function TemplatesPage() {
  return (
    <VStack gap="$8">
      <VStack gap="$2">
        <Heading size="2xl" color="$background50">
          Template Email
        </Heading>
        <Text color="rgba(226,235,255,0.7)">
          Gestisci blocchi modulari per automazioni e comunicazioni personalizzate.
        </Text>
      </VStack>
      <HStack gap="$6" flexWrap="wrap">
        {templates.map((template) => (
          <GlassCard key={template.id}>
            <VStack gap="$4">
              <HStack gap="$3" alignItems="center">
                <Icon as={FileSignature} color="$primary200" />
                <Heading size="lg" color="$background50">
                  {template.name}
                </Heading>
              </HStack>
              <Text color="rgba(226,235,255,0.7)">{template.description}</Text>
              <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                Aggiornato il {formatDate(template.updatedAt)}
              </Text>
              <Button variant="outline" asChild>
                <NextLink href={`/templates/${template.id}`}>
                  <HStack alignItems="center" gap="$2">
                    <ButtonText>Apri editor</ButtonText>
                    <Icon as={ArrowRight} color="$background50" />
                  </HStack>
                </NextLink>
              </Button>
            </VStack>
          </GlassCard>
        ))}
      </HStack>
    </VStack>
  );
}
