import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Filter, Mail, Phone, Star } from 'lucide-react-native';
import { clients, formatCurrency, reservations } from '@/lib/data';

export default function ClientsPage() {
  return (
    <div className="glass-panel p-6">
      <HStack className="items-start justify-between gap-4">
        <div>
          <Text className="text-sm uppercase tracking-[0.3em] text-white/60">Anagrafiche curate</Text>
          <Text className="mt-2 font-space-grotesk text-2xl text-white">Clienti & relazione</Text>
          <Text className="text-xs text-white/50">Preferenze, note e adesione newsletter in un’unica vista.</Text>
        </div>
        <HStack space="md" className="items-center">
          <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60 md:flex">
            <Icon as={Filter} size="sm" color="rgba(255,255,255,0.7)" />
            Filtra per tag
          </div>
          <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
            Esporta CSV
          </Button>
        </HStack>
      </HStack>
      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <Box className="relative flex-1">
          <Input
            placeholder="Cerca nome, email o tag..."
            className="h-12 rounded-full border border-white/10 bg-white/5 pl-12 text-white placeholder:text-white/40"
          />
          <Box className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <Icon as={Filter} size="sm" color="rgba(255,255,255,0.6)" />
          </Box>
        </Box>
        <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
          Aggiungi nuovo cliente
        </Button>
      </div>

      <div className="mt-8 grid gap-4">
        {clients.map((client) => {
          const staysValue = reservations
            .filter((res) => res.clientId === client.id)
            .reduce((acc, res) => acc + res.total, 0);
          return (
            <Link key={client.id} href={`/clients/${client.id}`} className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 flex-col gap-2">
                  <HStack className="items-center gap-3">
                    <Box className="h-12 w-12 rounded-full bg-[color:var(--accent-solid)]/20" />
                    <div>
                      <Text className="font-space-grotesk text-xl text-white">{client.name}</Text>
                      <Text className="text-xs text-white/50">{client.loyaltyTier} • {client.totalStays} soggiorni</Text>
                    </div>
                  </HStack>
                  <HStack className="flex-wrap items-center gap-3 text-xs text-white/60">
                    <span className="inline-flex items-center gap-1">
                      <Icon as={Mail} size="xs" color="rgba(255,255,255,0.5)" />
                      {client.email}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon as={Phone} size="xs" color="rgba(255,255,255,0.5)" />
                      {client.phone}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon as={Star} size="xs" color="rgba(255,255,255,0.5)" />
                      Feedback {client.lastFeedbackScore}
                    </span>
                  </HStack>
                </div>
                <div className="flex flex-wrap gap-3">
                  {client.tags.map((tag) => (
                    <Badge key={tag} className="rounded-full bg-[color:var(--accent-solid)]/10 text-[color:var(--accent-soft)]">
                      {tag}
                    </Badge>
                  ))}
                  <Badge className={`rounded-full ${
                    client.newsletterOptIn
                      ? 'bg-[color:var(--accent-solid)]/20 text-[color:var(--accent-soft)]'
                      : 'bg-white/5 text-white/60'
                  }`}>
                    Newsletter {client.newsletterOptIn ? 'Attiva' : 'Non attiva'}
                  </Badge>
                </div>
                <div className="text-right text-sm text-white/70">
                  <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Valore generato</Text>
                  <Text className="font-space-grotesk text-xl text-white">{formatCurrency(staysValue)}</Text>
                  <Text className="text-xs text-white/40">Ultimo soggiorno {client.lastStay}</Text>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
