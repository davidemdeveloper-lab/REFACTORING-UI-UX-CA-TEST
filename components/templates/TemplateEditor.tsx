'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { Template } from '@/types';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Save, Eye } from '@/components/icons';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false });

interface TemplateEditorProps {
  template: Template;
}

export function TemplateEditor({ template }: TemplateEditorProps) {
  const [content, setContent] = useState(template.html);
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Area di lavoro</h2>
          <div className="flex items-center gap-3">
            <Button
              action="secondary"
              variant="outline"
              size="sm"
              className="border-white/20 bg-white/5"
              onPress={() => setShowPreview((prev) => !prev)}
            >
              <ButtonIcon as={Eye} className="text-white/70" />
              <ButtonText className="text-white">
                {showPreview ? 'Nascondi anteprima' : 'Mostra anteprima'}
              </ButtonText>
            </Button>
            <Button action="primary" variant="solid" size="sm" className="bg-[#f29c50] px-4">
              <ButtonIcon as={Save} className="text-white" />
              <ButtonText className="text-white">Salva template</ButtonText>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f18]">
          <CodeMirror
            value={content}
            height="380px"
            theme={oneDark}
            extensions={[html()]}
            onChange={(value) => setContent(value)}
          />
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          <p className="font-semibold text-white">Variabili dinamiche</p>
          <ul className="mt-2 space-y-1">
            {Object.keys(template.previewData).map((key) => (
              <li key={key} className="rounded-xl bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.3em] text-white/50">
                {'{{'}{key}{'}}'}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showPreview ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <header className="flex flex-col gap-2">
            <h3 className="text-md font-semibold text-white">Anteprima live</h3>
            <p className="text-xs text-white/50">Oggetto: {template.subject}</p>
          </header>
          <div
            className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-[#101722] p-6 text-sm leading-relaxed text-white"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/60">
          Anteprima nascosta — riattiva per vedere il rendering HTML.
        </div>
      )}
    </div>
  );
}
