import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { guests } from '@/lib/mock-data';

export default function ClientsPage() {
  return (
    <VStack space="lg" className="pb-16">
      <HStack className="flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Box>
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Clienti</Text>
          <Text className="mt-2 text-3xl font-semibold text-primary-900">Rubrica intelligente</Text>
          <Text className="mt-2 text-sm text-typography-500">
            Consulta preferenze, newsletter, note concierge e automazioni collegate. Ogni cliente ha una storia da coccolare.
          </Text>
        </Box>
        <Button action="primary" size="lg" className="rounded-full px-6">
          <Text className="text-base font-semibold text-white">Aggiungi cliente</Text>
        </Button>
      </HStack>

      <Box className="glass-panel rounded-3xl px-6 py-5">
        <Input
          placeholder="Cerca cliente per nome, email o tag"
          className="rounded-2xl border border-primary-100/70 bg-white/70 px-4 py-3 text-sm text-primary-700"
        />
      </Box>

      <VStack space="sm">
        {guests.map((guest) => (
          <Link key={guest.id} href={`/clients/${guest.id}`}>
            <HStack className="glass-panel items-center justify-between rounded-3xl px-6 py-5">
              <Box className="flex-1">
                <Text className="text-lg font-semibold text-primary-900">{guest.name}</Text>
                <Text className="text-sm text-typography-500">{guest.email} • {guest.phone}</Text>
                <HStack className="mt-2 flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-primary-700">
                  <span className="rounded-full border border-primary-200/60 bg-primary-50/60 px-3 py-1">
                    {guest.vipLevel} member
                  </span>
                  <span className="rounded-full border border-primary-200/60 bg-primary-50/60 px-3 py-1">
                    {guest.stays} soggiorni
                  </span>
                  <span className="rounded-full border border-primary-200/60 bg-primary-50/60 px-3 py-1">
                    Newsletter {guest.newsletter ? '✔︎' : '✕'}
                  </span>
                </HStack>
              </Box>
              <Box className="text-right">
                <Text className="text-sm text-typography-400">Ultimo soggiorno {guest.lastStay}</Text>
                {guest.upcomingStay && (
                  <Text className="text-sm font-semibold text-primary-700">Prossimo {guest.upcomingStay}</Text>
                )}
              </Box>
            </HStack>
          </Link>
        ))}
      </VStack>
    </VStack>
  );
}

