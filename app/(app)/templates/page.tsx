'use client';

import Link from 'next/link';
import { templates } from '@/data/templates';
import { PageHeader } from '@/components/common/PageHeader';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

export default function TemplatesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Template email"
        description="Gestisci i messaggi chiave per ogni fase del viaggio dell'ospite"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => (
          <article key={template.id} className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{template.name}</h3>
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">{template.category}</span>
            </div>
            <p className="text-sm text-white/70">{template.description}</p>
            <p className="text-xs text-white/50">Aggiornato il {template.updatedAt}</p>
            <div className="flex flex-wrap gap-2 text-xs text-white/50">
              {Object.entries(template.previewData).map(([key, value]) => (
                <span key={key} className="rounded-full bg-white/10 px-3 py-1">
                  {key}: {value}
                </span>
              ))}
            </div>
            <Link href={`/templates/${template.id}`} className="mt-2 inline-flex">
              <Button action="primary" variant="solid" size="sm" className="bg-[#f29c50] px-4">
                <ButtonIcon as={PenSquare} className="text-white" />
                <ButtonText className="text-white">Apri editor</ButtonText>
              </Button>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
