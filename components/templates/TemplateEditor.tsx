'use client';

import { useMemo, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { markdown } from '@codemirror/lang-markdown';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { Sparkles, Save } from 'lucide-react';
import type { Template } from '@/types';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { StatusPill } from '@/components/common/StatusPill';

interface TemplateEditorProps {
  template: Template;
}

export function TemplateEditor({ template }: TemplateEditorProps) {
  const [content, setContent] = useState(template.content);
  const [previewHtml, setPreviewHtml] = useState(template.previewHtml);
  const [saved, setSaved] = useState(false);

  const wordCount = useMemo(() => content.split(/\s+/).filter(Boolean).length, [content]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill label="Editor template" tone="sky" />
          <StatusPill label={template.category} tone="amber" />
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
            {wordCount} parole
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-white">{template.name}</h1>
          <p className="text-sm text-slate-300">{template.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="md"
            action="primary"
            variant="solid"
            className="h-11 rounded-xl border border-amber-400/50 bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900"
            onPress={() => {
              setPreviewHtml(content.replace(/\n/g, '<br />'));
              setSaved(true);
              window.setTimeout(() => setSaved(false), 2000);
            }}
          >
            <ButtonIcon as={Save} className="text-slate-900" size="sm" />
            <ButtonText className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-900">
              Salva template
            </ButtonText>
          </Button>
          {saved && (
            <span className="flex items-center gap-2 text-sm text-emerald-300">
              <Sparkles className="h-5 w-5" /> Versione salvata e sincronizzata con l’automazione.
            </span>
          )}
        </div>
      </header>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-3">
            <CodeMirror
              value={content}
              onChange={(value) => setContent(value)}
              height="420px"
              theme={okaidia}
              extensions={[html(), markdown()]}
              basicSetup={{ highlightActiveLine: false, foldGutter: false }}
            />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Blocchi disponibili</p>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {template.blocks.map((block) => (
                <li key={block.label} className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{block.type}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{block.label}</p>
                  <p className="text-sm text-slate-300">{block.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Oggetto</p>
            <p className="mt-2 text-sm text-white">{template.subject}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Anteprima live</p>
            <div
              className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/10 p-5 text-left text-sm text-slate-100"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
