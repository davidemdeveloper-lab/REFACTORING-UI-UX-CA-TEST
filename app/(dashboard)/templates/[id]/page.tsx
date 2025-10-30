'use client';

import { notFound } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  ScrollView,
  Button,
  Badge,
} from '@gluestack-ui/themed';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { templates, templateBlocks } from '@/data/templates';
import { formatTimeDistance } from '@/utils/format';
import { GlassCard } from '@/components/common/GlassCard';

export default function TemplateEditorPage({ params }: { params: { id: string } }) {
  const template = useMemo(() => templates.find((item) => item.id === params.id), [params.id]);
  if (!template) {
    notFound();
  }
  const [content, setContent] = useState(template.previewHtml);

  return (
    <ScrollView>
      <VStack space="xl">
        <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" space="lg">
          <VStack space="xs">
            <Heading size="lg" color="white">
              Editor Template Email
            </Heading>
            <Text color="rgba(148,163,184,0.85)">
              Ultimo aggiornamento {formatTimeDistance(template.updatedAt)} · Variabili dinamiche pronte all’uso.
            </Text>
          </VStack>
          <Button
            bg="rgba(79,140,255,0.9)"
            borderColor="transparent"
            px="$6"
            py="$3"
            rounded="$xl"
          >
            <Text color="white" fontWeight="$semibold">
              Salva Template
            </Text>
          </Button>
        </HStack>

        <HStack space="lg" alignItems="flex-start" flexWrap="wrap">
          <GlassCard flexBasis="280px" flexGrow={1}>
            <Heading size="sm" color="white" mb="$3">
              Blocchi disponibili
            </Heading>
            <VStack space="md">
              {templateBlocks.map((block) => (
                <Box key={block.id} px="$4" py="$3" rounded="$xl" bg="rgba(79,140,255,0.1)">
                  <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
                    {block.label}
                  </Text>
                  <Badge
                    variant="outline"
                    borderColor="rgba(79,140,255,0.5)"
                    bg="rgba(79,140,255,0.12)"
                    mt="$2"
                  >
                    <Text color="#8CB6FF">{block.type.toUpperCase()}</Text>
                  </Badge>
                  <Text color="rgba(148,163,184,0.8)" fontSize="$xs" mt="$2">
                    {block.preview}
                  </Text>
                </Box>
              ))}
            </VStack>
          </GlassCard>

          <GlassCard flexBasis="520px" flexGrow={2}>
            <Heading size="sm" color="white" mb="$3">
              Area di lavoro
            </Heading>
            <CodeMirror
              value={content}
              onChange={(value: string) => setContent(value)}
              extensions={[html()]}
              theme={oneDark}
              height="320px"
              basicSetup={{ highlightActiveLine: true, lineNumbers: true, foldGutter: true }}
              style={{ borderRadius: 20, overflow: 'hidden', fontFamily: 'var(--font-mono)' }}
            />
          </GlassCard>

          <GlassCard flexBasis="360px" flexGrow={1}>
            <Heading size="sm" color="white" mb="$3">
              Anteprima
            </Heading>
            <Box
              bg="rgba(255,255,255,0.9)"
              color="#0F172A"
              px="$4"
              py="$4"
              rounded="$lg"
              sx={{ minHeight: 260, overflow: 'auto' }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </GlassCard>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
