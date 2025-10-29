'use client';

import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { TemplateEditor } from '@/components/templates/TemplateEditor';
import { setActiveTemplate, updateTemplate, restoreTemplate } from '@/features/templates/templatesSlice';
import { useEffect } from 'react';
import { VStack, Text } from '@gluestack-ui/themed';

export default function TemplateDetailPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const template = useAppSelector((state) =>
    state.templates.items.find((item) => item.id === params.id)
  );

  useEffect(() => {
    if (params.id) {
      dispatch(setActiveTemplate(params.id));
    }
  }, [dispatch, params.id]);

  if (!template) {
    return <Text>Template non trovato.</Text>;
  }

  return (
    <VStack space="md">
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Template', href: '/templates' },
          { label: template.name }
        ]}
      />
      <TemplateEditor
        template={template}
        onChange={(payload) => dispatch(updateTemplate(payload))}
        onRestore={() => dispatch(restoreTemplate(template.id))}
      />
    </VStack>
  );
}
