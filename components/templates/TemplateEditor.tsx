'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { VStack, HStack, Text, Button, ScrollView } from '@gluestack-ui/themed';
import type { Template } from '@/lib/types';
import { html } from '@codemirror/lang-html';
import { palette } from '@/theme/palette';
import { tokens } from '@/theme/tokens';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false });

interface TemplateEditorProps {
  template: Template;
  onChange: (template: Template) => void;
  onRestore: () => void;
}

export const TemplateEditor = ({ template, onChange, onRestore }: TemplateEditorProps) => {
  const [body, setBody] = useState(template.body);
  const extensions = useMemo(() => [html()], []);

  const handleSave = () => {
    onChange({ ...template, body, updatedAt: new Date().toISOString() });
  };

  return (
    <VStack space="md">
      <HStack justifyContent="space-between" alignItems="center">
        <VStack>
          <Text fontSize={20} fontWeight="700">
            {template.name}
          </Text>
          <Text fontSize={13} color={palette.steel[200]}>
            Variabili disponibili: {template.variables.map((variable) => `{{${variable}}}`).join(', ')}
          </Text>
        </VStack>
        <HStack space="sm">
          <Button variant="outline" onPress={onRestore}>
            Ripristina
          </Button>
          <Button action="primary" onPress={handleSave}>
            Salva (mock)
          </Button>
        </HStack>
      </HStack>
      <HStack space="md" flexWrap="wrap">
        <VStack flex={1} minWidth={300} space="sm">
          <Text fontSize={14} fontWeight="600">
            Codice template
          </Text>
          <CodeMirror
            value={body}
            height="320px"
            extensions={extensions}
            onChange={(value) => setBody(value)}
            theme="dark"
          />
        </VStack>
        <ScrollView flex={1} minWidth={280} maxHeight={340} px={12} py={12} borderRadius={tokens.radii.glass} borderWidth={1} borderColor="rgba(148,163,184,0.2)" bg="rgba(15,23,42,0.35)">
          <Text fontSize={14} fontWeight="600" mb={8}>
            Anteprima HTML
          </Text>
          <BoxedPreview content={body} />
        </ScrollView>
      </HStack>
    </VStack>
  );
};

const BoxedPreview = ({ content }: { content: string }) => (
  <div
    style={{
      fontSize: '14px',
      lineHeight: 1.5,
      color: palette.neutrals.offwhite
    }}
    dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}
  />
);
