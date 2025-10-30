'use client';

import { notFound, useParams } from 'next/navigation';
import { templates } from '@/data/templates';
import { PageHeader } from '@/components/common/PageHeader';
import { TemplateEditor } from '@/components/templates/TemplateEditor';

export default function TemplateDetailPage() {
  const params = useParams();
  const templateId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const template = templates.find((item) => item.id === templateId);

  if (!template) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={template.name}
        description={`Ultimo aggiornamento · ${template.updatedAt}`}
      />
      <TemplateEditor template={template} />
    </div>
  );
}
