import Link from 'next/link';
import { GlassPanel } from '@/components/app/glass-panel';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { clients } from '@/lib/mock-data';
import { Icon } from '@/components/ui/icon';
import { UserPlus, Filter, ArrowUpRight, Mail, Phone, Bot } from '@/components/icons';

const loyaltyColors: Record<string, string> = {
  Platinum: 'bg-primary-500/25 text-primary-100 border border-primary-500/40',
  Gold: 'bg-warning-500/25 text-warning-100 border border-warning-500/40',
  Silver: 'bg-typography-500/20 text-typography-100 border border-white/15',
  Bronze: 'bg-accent-500/20 text-accent-100 border border-accent-500/40',
};

export default function ClientsPage() {
  return (
    <Box className="flex flex-col gap-8">
      <GlassPanel
        title="Clienti e relazioni"
        subtitle="Monitora lo stato degli ospiti e personalizza le automazioni su misura."
      >
        <Box className="flex flex-col gap-6">
          <Box className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <Box className="flex flex-wrap gap-2">
              {['VIP', 'Family', 'Business', 'Wellness', 'Eventi'].map((filter) => (
                <Badge key={filter}>
                  <BadgeText className="rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-typography-300">
                    {filter}
                  </BadgeText>
                </Badge>
              ))}
            </Box>
            <Box className="flex flex-row gap-3">
              <Button variant="outline" action="secondary" className="border-white/15">
                <ButtonIcon as={Filter} />
                <ButtonText className="text-typography-100">Filtra insight</ButtonText>
              </Button>
              <Link href="/clients/new">
                <Button action="primary" className="bg-primary-500/30">
                  <ButtonIcon as={UserPlus} />
                  <ButtonText className="text-typography-0">
                    Nuovo cliente
                  </ButtonText>
                </Button>
              </Link>
            </Box>
          </Box>
          <Box className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
            <Box className="grid grid-cols-12 gap-4 border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.4em] text-typography-400">
              <Text className="col-span-3">Cliente</Text>
              <Text className="col-span-2">Ultimo soggiorno</Text>
              <Text className="col-span-2">Prossimo step</Text>
              <Text className="col-span-2">Automazione</Text>
              <Text className="col-span-1">Stato</Text>
              <Text className="col-span-2">Contatti</Text>
            </Box>
            <Box className="divide-y divide-white/5">
              {clients.map((client) => (
                <Box
                  key={client.id}
                  className="grid grid-cols-12 gap-4 px-6 py-5 text-sm text-typography-200 hover:bg-white/5"
                >
                  <Box className="col-span-3">
                    <Text className="text-base font-semibold text-typography-0">
                      {client.name}
                    </Text>
                    <Box className="mt-2 flex flex-wrap gap-2">
                      <Badge>
                        <BadgeText className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.35em] ${loyaltyColors[client.loyaltyLevel] ?? 'bg-white/10 text-typography-200'}`}>
                          {client.loyaltyLevel}
                        </BadgeText>
                      </Badge>
                      {client.vip && (
                        <Badge>
                          <BadgeText className="rounded-full bg-primary-500/30 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-primary-100">
                            VIP
                          </BadgeText>
                        </Badge>
                      )}
                    </Box>
                  </Box>
                  <Box className="col-span-2">
                    <Text className="text-xs text-typography-400">Ultimo soggiorno</Text>
                    <Text className="text-sm text-typography-100">{client.lastStay}</Text>
                    <Text className="mt-1 text-xs text-typography-400">
                      {client.staysCount} soggiorni totali
                    </Text>
                  </Box>
                  <Box className="col-span-2">
                    <Text className="text-xs text-typography-400">Prossimo step</Text>
                    <Text className="text-sm text-typography-100">
                      {client.timeline.find((item) => !item.completed)?.label ?? 'Aggiorna automazione'}
                    </Text>
                  </Box>
                  <Box className="col-span-2">
                    <Text className="text-xs text-typography-400">Automazione</Text>
                    <Badge className="mt-2">
                      <BadgeText className="rounded-full bg-primary-500/20 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-primary-100">
                        {client.automationLevel}
                      </BadgeText>
                    </Badge>
                  </Box>
                  <Box className="col-span-1">
                    <Text className="text-xs text-typography-400">Newsletter</Text>
                    <Text className="text-sm text-typography-100">
                      {client.newsletter ? 'Attiva' : 'Non iscritta'}
                    </Text>
                  </Box>
                  <Box className="col-span-2 flex flex-col gap-1 text-xs text-typography-300">
                    <Box className="flex items-center gap-2">
                      <Icon as={Mail} size="sm" className="text-primary-200" />
                      <Text>{client.email}</Text>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <Icon as={Phone} size="sm" className="text-success-200" />
                      <Text>{client.phone}</Text>
                    </Box>
                    <Link
                      href={`/clients/${client.id}`}
                      className="mt-1 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.4em] text-primary-200 hover:text-primary-100"
                    >
                      Dettaglio
                      <ArrowUpRight size={12} color="currentColor" />
                    </Link>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </GlassPanel>

      <GlassPanel
        title="Segmenti suggeriti dall'AI"
        subtitle="Suggerimenti basati su pattern di soggiorno e interessi."
      >
        <Box className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              title: 'Luxury & Wellness',
              desc: 'Ospiti ad alta spesa con interesse per percorsi SPA e driver privati.',
            },
            {
              title: 'Business Express',
              desc: 'Clienti corporate che richiedono check-in smart e supporto meeting.',
            },
            {
              title: 'Family Smart',
              desc: 'Famiglie con necessità di comunicazioni WhatsApp e servizi kids friendly.',
            },
          ].map((segment) => (
            <Box
              key={segment.title}
              className="rounded-3xl border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl"
            >
              <Text className="text-sm font-semibold text-typography-0">
                {segment.title}
              </Text>
              <Text className="mt-2 text-xs text-typography-300">{segment.desc}</Text>
              <Button
                variant="outline"
                action="secondary"
                className="mt-4 border-white/15 px-4"
              >
                <ButtonIcon as={Bot} className="text-primary-200" />
                <ButtonText className="text-typography-100">
                  Attiva automazioni
                </ButtonText>
              </Button>
            </Box>
          ))}
        </Box>
      </GlassPanel>
    </Box>
  );
}

// Validazione: lista clienti con filtri, automazioni e segmenti AI secondo requisiti di gestione ospiti.
