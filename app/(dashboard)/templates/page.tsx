import Link from 'next/link';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { templates } from '@/lib/data';
import { Icon } from '@/components/ui/icon';
import { Sparkles } from 'lucide-react-native';

export default function TemplatesPage() {
  return (
    <div className="glass-panel p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <Text className="text-sm uppercase tracking-[0.3em] text-white/60">Template Email</Text>
          <Text className="mt-2 font-space-grotesk text-2xl text-white">Libreria intelligente</Text>
          <Text className="text-xs text-white/50">Ogni template include suggerimenti AI per tono e upsell.</Text>
        </div>
        <Button className="self-start rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
          Nuovo template
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {templates.map((template) => (
          <Link key={template.id} href={`/templates/${template.id}`} className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
            <div className="flex flex-col gap-3">
              <Badge className="self-start rounded-full bg-[color:var(--accent-solid)]/20 text-[color:var(--accent-soft)]">
                {template.category}
              </Badge>
              <Text className="font-space-grotesk text-xl text-white">{template.name}</Text>
              <Text className="text-xs text-white/50">Aggiornato il {template.updatedAt}</Text>
              <Text className="text-sm text-white/70 clamp-3">{template.aiTips.join(' • ')}</Text>
              <div className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
                <Icon as={Sparkles} size="sm" color="rgba(255,255,255,0.7)" /> {template.usage} invii
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
