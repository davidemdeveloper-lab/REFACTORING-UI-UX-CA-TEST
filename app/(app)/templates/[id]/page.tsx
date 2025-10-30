'use client';

import { useMemo, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { getTemplateById } from '@/data/templates';
import { GlassCard } from '@/components/common/GlassCard';
import {
  Box,
  Button,
  ButtonText,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { ArrowLeft, Eye } from 'lucide-react';
import NextLink from 'next/link';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { formatDate } from '@/lib/utils';

export default function TemplateDetailPage() {
  const params = useParams();
  const templateId = useMemo(() => params?.id as string, [params]);
  const template = getTemplateById(templateId);
  if (!template) {
    notFound();
  }
  const [content, setContent] = useState(template!.content);

  return (
    <VStack gap="$8">
      <HStack justifyContent="space-between" alignItems="center">
        <HStack gap="$4" alignItems="center">
          <Button variant="outline" size="sm" asChild>
            <NextLink href="/templates">
              <ButtonText>
                <Icon as={ArrowLeft} mr="$2" /> Torna ai template
              </ButtonText>
            </NextLink>
          </Button>
          <Heading size="2xl" color="$background50">
            {template?.name}
          </Heading>
        </HStack>
        <Text color="rgba(226,235,255,0.6)">
          Ultimo aggiornamento {formatDate(template!.updatedAt)}
        </Text>
      </HStack>

      <HStack gap="$6" flexWrap="wrap" alignItems="flex-start">
        <GlassCard>
          <Heading size="lg" color="$background50" mb="$4">
            Blocchi dinamici
          </Heading>
          <VStack gap="$3">
            {['Variabile', 'Loop', 'Condizione', 'Blocco hero'].map((block) => (
              <Box
                key={block}
                px="$4"
                py="$3"
                borderRadius="$lg"
                bgColor="rgba(255,255,255,0.05)"
                borderWidth={1}
                borderColor="rgba(255,255,255,0.12)"
              >
                <Text color="$background50" fontWeight="$bold">
                  {block}
                </Text>
                <Text color="rgba(226,235,255,0.6)" fontSize="$xs">
                  Trascina nel canvas per attivare il contenuto condizionale.
                </Text>
              </Box>
            ))}
          </VStack>
        </GlassCard>
        <GlassCard>
          <Heading size="lg" color="$background50" mb="$4">
            Editor contenuto
          </Heading>
          <Box width={{ base: '320px', md: '560px' }}>
            <CodeMirror
              value={content}
              height="360px"
              theme={oneDark}
              extensions={[html()]}
              onChange={(value) => setContent(value)}
            />
          </Box>
          <Button mt="$4">
            <ButtonText>Salva Template</ButtonText>
          </Button>
        </GlassCard>
        <GlassCard>
          <HStack gap="$3" alignItems="center" mb="$4">
            <Icon as={Eye} color="$primary200" />
            <Heading size="lg" color="$background50">
              Anteprima email
            </Heading>
          </HStack>
          <Box
            width={{ base: '320px', md: '420px' }}
            maxHeight="420px"
            overflowY="auto"
            borderRadius="$xl"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.08)"
            bgColor="rgba(255,255,255,0.9)"
            p="$5"
            color="#1a1b2f"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </GlassCard>
      </HStack>
    </VStack>
  );
}
