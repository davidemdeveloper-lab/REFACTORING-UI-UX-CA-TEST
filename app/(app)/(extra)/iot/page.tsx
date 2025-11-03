// Scopo: mostrare la panoramica IoT con comfort camere e alert da sensori.
'use client';

import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { PageToolbar } from '@/components/shared/page-toolbar';
import { SectionCard } from '@/components/shared/section-card';
import { StatCard } from '@/components/shared/stat-card';
import { useGetIoTRoomsQuery, useGetIoTComfortSummaryQuery } from '@/services/mockApi';

function comfortTone(comfort: 'Ottimale' | 'Attenzione' | 'Critico') {
  switch (comfort) {
    case 'Ottimale':
      return 'bg-[rgba(22,163,74,0.16)] text-[#15803d]';
    case 'Attenzione':
      return 'bg-[rgba(234,179,8,0.18)] text-[#b45309]';
    case 'Critico':
      return 'bg-[rgba(239,68,68,0.18)] text-[#b91c1c]';
    default:
      return 'bg-[rgba(148,163,184,0.18)] text-[var(--color-neutral-600)]';
  }
}

export default function IoTPage() {
  const { data: rooms = [] } = useGetIoTRoomsQuery();
  const { data: summary } = useGetIoTComfortSummaryQuery();

  const comfortRate = Math.round((summary?.comfortRate ?? 0) * 100);

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Cerca camere o dispositivi IoT..."
        primaryActionLabel="Sincronizza IoT"
      />

      <HStack className="flex-row gap-6">
        <Box className="flex-1">
          <SectionCard
            title="Comfort camere"
            subtitle="Controllo centralizzato di temperatura, umidità e minibar."
          >
            <HStack className="flex-row flex-wrap gap-4">
              <StatCard
                label="Camere in comfort"
                value={`${comfortRate}%`}
                helper={`Fuori soglia: ${summary?.roomsOutOfRange.join(', ') ?? 'nessuna'}`}
                tone={comfortRate > 85 ? 'positive' : 'warning'}
              />
              <StatCard
                label="Minibar da riempire"
                value={`${summary?.minibarToRefill.length ?? 0}`}
                helper={summary?.minibarToRefill.join(', ') ?? 'Tutti pieni'}
                tone={summary && summary.minibarToRefill.length > 0 ? 'warning' : 'default'}
              />
            </HStack>
          </SectionCard>

          <SectionCard
            title="Stato camere"
            subtitle="Panoramica dei sensori per stanza: temperatura, umidità, minibar."
          >
            <VStack space="md">
              {rooms.map((room) => (
                <Box
                  key={room.roomId}
                  className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-4"
                >
                  <HStack className="items-center justify-between">
                    <Text className="text-base font-semibold text-[var(--color-neutral-900)]">
                      {room.roomLabel}
                    </Text>
                    <Badge
                      size="sm"
                      action="muted"
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${comfortTone(room.comfort)}`}
                    >
                      <Text className="text-xs font-semibold text-[var(--color-neutral-900)]">
                        {room.comfort}
                      </Text>
                    </Badge>
                  </HStack>
                  <HStack className="mt-3 flex-row gap-6">
                    <Box>
                      <Text className="text-xs uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
                        Temperatura
                      </Text>
                      <Text className="mt-1 text-lg font-semibold text-[var(--color-neutral-900)]">
                        {room.temperature.toFixed(1)}°C
                      </Text>
                    </Box>
                    <Box>
                      <Text className="text-xs uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
                        Umidità
                      </Text>
                      <Text className="mt-1 text-lg font-semibold text-[var(--color-neutral-900)]">
                        {room.humidity}%
                      </Text>
                    </Box>
                    <Box>
                      <Text className="text-xs uppercase tracking-[0.25em] text-[var(--color-neutral-600)]">
                        Minibar
                      </Text>
                      <Text className="mt-1 text-lg font-semibold text-[var(--color-neutral-900)]">
                        {room.minibarLevel}%
                      </Text>
                    </Box>
                  </HStack>
                  <Text className="mt-3 text-xs text-[var(--color-neutral-600)]">
                    Aggiornato alle {new Date(room.lastUpdate).toLocaleTimeString('it-IT', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </Box>
              ))}
            </VStack>
          </SectionCard>
        </Box>
        <Box className="w-[340px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-6 shadow-[var(--shadow-card)]">
          <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
            Automazioni suggerite
          </Text>
          <Text className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
            Idee per estendere IoT
          </Text>
          <VStack space="md" className="mt-5">
            <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4">
              <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                Comfort automatico
              </Text>
              <Text className="mt-2 text-xs leading-5 text-[var(--color-neutral-600)]">
                Invia comunicazione programmata quando una camera resta in modalità "Critico" per oltre 10 minuti.
              </Text>
            </Box>
            <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4">
              <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                Minibar express
              </Text>
              <Text className="mt-2 text-xs leading-5 text-[var(--color-neutral-600)]">
                Genera automaticamente ticket housekeeping per minibar sotto il 20%.
              </Text>
            </Box>
            <Box className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4">
              <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
                Alert concierge
              </Text>
              <Text className="mt-2 text-xs leading-5 text-[var(--color-neutral-600)]">
                Invia notifica al concierge quando una suite VIP cambia comfort.
              </Text>
            </Box>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}

// mock: iotRoomsMock, comfortSummaryMock
// actions: syncIoTData(), createIoTAutomation(type)
// assumptions: pagina dimostrativa senza real-time
