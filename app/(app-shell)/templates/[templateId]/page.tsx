import { notFound } from 'next/navigation';
import { templates } from '@/data/templates';
import { TemplateEditor } from '@/components/templates/TemplateEditor';

export default function TemplateDetailPage({ params }: { params: { templateId: string } }) {
  const template = templates.find((item) => item.id === params.templateId);
  if (!template) {
    notFound();
  }

  return <TemplateEditor template={template} />;
}
