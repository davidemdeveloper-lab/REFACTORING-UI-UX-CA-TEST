import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { bookings, guests } from '@/lib/mock-data';
import type { IoTSensor } from '@/lib/types';

export default function BookingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const booking = bookings.find((item) => item.id === params.id);

  if (!booking) {
    return notFound();
  }

  const guest = guests.find((g) => g.id === booking.guestId);

  return (
    <VStack space="lg" className="pb-16">
      <HStack className="flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <Box>
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">
            Prenotazione {booking.reference}
          </Text>
          <Text className="mt-2 text-3xl font-semibold text-primary-900">{booking.guestName}</Text>
          <Text className="mt-2 text-sm text-typography-500">
            {booking.stayPeriod} • {booking.roomType} • {booking.nights} notti
          </Text>
          <HStack className="mt-3 flex-wrap gap-2">
            {booking.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary-200/60 bg-primary-50/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary-700"
              >
                {tag}
              </span>
            ))}
          </HStack>
        </Box>
        <HStack space="md" className="flex-wrap">
          <Button action="primary" size="lg" className="rounded-full px-6">
            <Text className="text-base font-semibold text-white">Invia messaggio personalizzato</Text>
          </Button>
          <Link href={`/chat?conversation=${booking.id}`}>
            <Button action="secondary" variant="outline" size="lg" className="rounded-full border-primary-200/60 px-6">
              <Text className="text-base font-semibold text-primary-700">Apri chat</Text>
            </Button>
          </Link>
        </HStack>
      </HStack>

      <HStack className="flex-col gap-6 lg:flex-row">
        <Box className="glass-panel flex-1 rounded-3xl px-7 py-7">
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Timeline automatizzata</Text>
          <VStack space="md" className="mt-4">
            {booking.automation.map((step) => (
              <Box key={step.id} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
                <HStack className="items-start justify-between">
                  <Box>
                    <Text className="text-xs uppercase tracking-[0.3em] text-primary-600/70">
                      {step.channel.toUpperCase()} • {step.scheduledAt}
                    </Text>
                    <Text className="mt-2 text-sm font-semibold text-primary-900">{step.label}</Text>
                    <Text className="mt-2 text-xs text-typography-400">{step.description}</Text>
                  </Box>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
                      step.status === 'completato'
                        ? 'bg-success-500/20 text-success-500'
                        : step.status === 'manuale'
                          ? 'bg-warning-500/20 text-warning-600'
                          : step.status === 'attenzione'
                            ? 'bg-error-500/20 text-error-500'
                            : 'bg-primary-500/20 text-primary-700'
                    }`}
                  >
                    {step.status}
                  </span>
                </HStack>
                {step.status === 'manuale' && (
                  <Box className="mt-3 rounded-2xl border border-primary-100/50 bg-primary-50/60 px-4 py-3 text-xs text-primary-700">
                    Azione richiesta all’operatore: conferma manuale completamento oppure assegna al concierge.
                  </Box>
                )}
              </Box>
            ))}
          </VStack>
        </Box>

        <Box className="flex w-full max-w-md flex-col gap-6">
          <Box className="glass-panel rounded-3xl px-7 py-6">
            <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Profilo ospite</Text>
            {guest ? (
              <Box className="mt-4 space-y-2 text-sm text-typography-500">
                <Text className="text-lg font-semibold text-primary-900">{guest.name}</Text>
                <Text>{guest.email}</Text>
                <Text>{guest.phone}</Text>
                <Text>
                  Loyalty score {guest.loyaltyScore}/100 • Livello {guest.vipLevel.toUpperCase()} • {guest.stays} soggiorni
                </Text>
                <Divider className="border-white/15" />
                <Text className="text-xs uppercase tracking-[0.3em] text-primary-600/70">Preferenze chiave</Text>
                <ul className="list-disc space-y-1 pl-5 text-xs">
                  {guest.preferences.slice(0, 3).map((pref) => (
                    <li key={pref.title}>{pref.details}</li>
                  ))}
                </ul>
                <Link href={`/clients/${guest.id}`} className="inline-block text-xs font-semibold text-primary-600">
                  Apri scheda cliente →
                </Link>
              </Box>
            ) : (
              <Text className="mt-4 text-sm text-typography-500">
                Cliente non presente in rubrica. Collegalo per abilitare preferenze e newsletter.
              </Text>
            )}
          </Box>

          <IoTPanel sensors={booking.sensors} />
        </Box>
      </HStack>

      <Box className="glass-panel rounded-3xl px-7 py-7">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Suggerimenti AI contestuali</Text>
        <HStack className="mt-4 flex-col gap-4 md:flex-row">
          <Box className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
            <Text className="text-sm font-semibold text-primary-900">Messaggi suggeriti</Text>
            <Text className="mt-2 text-sm text-typography-500">
              “Giovanni, il percorso Family Relax Spa è disponibile alle 19:00. Vuoi che blocchiamo anche un set di cuscini
              anallergici per i bambini?”
            </Text>
            <Text className="mt-2 text-xs text-typography-400">
              Il modello propone la risposta analizzando storico conversazioni, preferenze e livello di stress calcolato dal
              sentiment recente.
            </Text>
          </Box>
          <Box className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
            <Text className="text-sm font-semibold text-primary-900">Azioni rapide</Text>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-typography-500">
              <li>Invia link pagamento aggiornato e imposta reminder automatico 6 ore prima.</li>
              <li>Segnala housekeeping per frigobar: livello scorte sotto 20%.</li>
              <li>Conferma spa privata con scena luci “Family welcome”.</li>
            </ul>
          </Box>
        </HStack>
      </Box>
    </VStack>
  );
}

function IoTPanel({ sensors }: { sensors: IoTSensor[] }) {
  return (
    <Box className="glass-panel rounded-3xl px-7 py-6">
      <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Controllo IoT</Text>
      <VStack space="md" className="mt-4">
        {sensors.map((sensor) => (
          <Box key={sensor.id} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
            <HStack className="items-center justify-between">
              <Box>
                <Text className="text-sm font-semibold text-primary-900">{sensor.name}</Text>
                <Text className="text-xs text-typography-400">
                  Stato: {sensor.status} • Aggiornato {sensor.lastUpdate}
                </Text>
              </Box>
              <Text className="text-sm font-semibold text-primary-700">
                {sensor.value}
                {sensor.unit ? ` ${sensor.unit}` : ''}
              </Text>
            </HStack>
            {sensor.actionable && sensor.actions && (
              <HStack className="mt-3 flex-wrap gap-2">
                {sensor.actions.map((action) => (
                  <button
                    key={action}
                    className="rounded-full border border-primary-200/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-700 hover:border-primary-300"
                  >
                    {action}
                  </button>
                ))}
              </HStack>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

