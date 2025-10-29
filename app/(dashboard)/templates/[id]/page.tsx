'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Icon } from '@/components/ui/icon';
import { Sparkles, ArrowLeft } from 'lucide-react-native';
import { getTemplateById } from '@/lib/data';

export default function TemplateDetailPage({ params }: { params: { id: string } }) {
  const template = useMemo(() => getTemplateById(params.id), [params.id]);
  const [draft, setDraft] = useState(template?.html ?? '');

  if (!template) {
    notFound();
  }

  return (
    <div className="grid gap-8">
      <div className="flex items-center justify-between">
        <Link href="/templates" className="inline-flex items-center gap-2 text-xs text-white/60">
          <Icon as={ArrowLeft} size="sm" color="rgba(255,255,255,0.6)" /> Torna ai template
        </Link>
        <HStack space="md">
          <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
            Duplica
          </Button>
          <Button className="rounded-full bg-[color:var(--accent-solid)] px-4 py-2 text-xs text-background-950">
            Salva modifiche
          </Button>
        </HStack>
      </div>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="glass-panel p-6">
          <HStack className="items-center justify-between">
            <div>
              <Badge className="rounded-full bg-[color:var(--accent-solid)]/20 text-[color:var(--accent-soft)]">
                {template.category}
              </Badge>
              <Text className="mt-2 font-space-grotesk text-2xl text-white">{template.name}</Text>
              <Text className="text-xs text-white/50">Ultimo update {template.updatedAt}</Text>
            </div>
            <div className="text-right text-xs text-white/60">
              <Text>Invii {template.usage}</Text>
              <Text>Tono {template.mood}</Text>
            </div>
          </HStack>
          <div className="mt-6 grid gap-4">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">Editor HTML</label>
            <Textarea
              value={draft}
              onChangeText={setDraft}
              className="min-h-[260px] rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white"
            />
          </div>
        </div>
        <div className="glass-panel flex flex-col gap-4 p-6">
          <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Suggerimenti AI</Text>
          {template.aiTips.map((tip) => (
            <div key={tip} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">
              <Box className="rounded-full border border-white/10 bg-white/5 p-2">
                <Icon as={Sparkles} size="sm" color="rgba(255,255,255,0.8)" />
              </Box>
              <Text className="text-sm text-white/70">{tip}</Text>
            </div>
          ))}
          <Button className="mt-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
            Genera variazione
          </Button>
        </div>
      </section>

      <section className="glass-panel p-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Anteprima</Text>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <Text className="font-space-grotesk text-lg text-white">Versione desktop</Text>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white p-6 text-sm text-black" dangerouslySetInnerHTML={{ __html: draft }} />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <Text className="font-space-grotesk text-lg text-white">Versione mobile</Text>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white p-4 text-sm text-black" dangerouslySetInnerHTML={{ __html: draft }} />
          </div>
        </div>
      </section>
    </div>
  );
}
