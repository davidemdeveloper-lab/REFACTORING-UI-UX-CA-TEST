import { notFound } from 'next/navigation';
import { templates } from '@/data/templates';
import { TemplateEditor } from '@/components/templates/TemplateEditor';

export default async function TemplateDetailPage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = await params;
  const template = templates.find((item) => item.id === templateId);
  if (!template) {
    notFound();
  }

  return <TemplateEditor template={template} />;
}
