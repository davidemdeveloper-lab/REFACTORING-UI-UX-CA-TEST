import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Button } from '@/components/ui/button';
import { bookings } from '@/lib/mock-data';

const automationPlaybooks = [
  {
    title: 'Anniversario romantico',
    description: 'Sequenza 7 giorni con email emozionale, WhatsApp personalizzato e controllo luci romantiche.',
    impact: '+28% upsell spa',
  },
  {
    title: 'Family Welcome',
    description: 'Workflow per famiglie con reminder pagamento, check-in veloce e attività kids-friendly.',
    impact: '+18% recensioni 5 stelle',
  },
  {
    title: 'Business Express',
    description: 'Pensato per viaggiatori business: automazioni rapide, quiet mode IoT e ricevuta digitale.',
    impact: '-35% tempo gestione',
  },
];

export default function AutomationPage() {
  const iotSensors = bookings[0].sensors.concat(bookings[1].sensors);

  return (
    <VStack space="lg" className="pb-16">
      <HStack className="flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Box>
          <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Workflow & IoT</Text>
          <Text className="mt-2 text-3xl font-semibold text-primary-900">Orchestra automazioni e dispositivi</Text>
          <Text className="mt-2 text-sm text-typography-500">
            Gestisci scenari, condizioni e controlla in tempo reale stanze e servizi collegati.
          </Text>
        </Box>
        <Button action="primary" size="lg" className="rounded-full px-6">
          <Text className="text-base font-semibold text-white">Crea nuovo workflow</Text>
        </Button>
      </HStack>

      <Box className="glass-panel rounded-3xl px-7 py-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Playbook consigliati</Text>
        <Box className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {automationPlaybooks.map((playbook) => (
            <Box key={playbook.title} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
              <Text className="text-sm font-semibold text-primary-900">{playbook.title}</Text>
              <Text className="mt-2 text-xs text-typography-500">{playbook.description}</Text>
              <Text className="mt-3 text-xs font-semibold text-primary-600">{playbook.impact}</Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="glass-panel rounded-3xl px-7 py-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Dispositivi IoT collegati</Text>
        <VStack space="md" className="mt-4">
          {iotSensors.map((sensor) => (
            <HStack key={sensor.id} className="items-start justify-between rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
              <Box>
                <Text className="text-sm font-semibold text-primary-900">{sensor.name}</Text>
                <Text className="text-xs text-typography-400">
                  {sensor.value} {sensor.unit ?? ''} • Aggiornato {sensor.lastUpdate}
                </Text>
              </Box>
              <Box className="text-right text-xs text-typography-400">
                Stato: {sensor.status}
                {sensor.actionable && sensor.actions && (
                  <Box className="mt-2 flex flex-wrap gap-2">
                    {sensor.actions.map((action) => (
                      <button
                        key={action}
                        className="rounded-full border border-primary-200/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-700"
                      >
                        {action}
                      </button>
                    ))}
                  </Box>
                )}
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>

      <Box className="glass-panel rounded-3xl px-7 py-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Guardrail AI</Text>
        <VStack space="md" className="mt-4 text-sm text-typography-500">
          <Text>• Approva manualmente risposte quando il sentiment è negativo o non riconosciuto.</Text>
          <Text>• Richiedi conferma operatore per offerte sopra i €300.</Text>
          <Text>• Notifica push al direttore quando il punteggio stress supera il 70%.</Text>
        </VStack>
      </Box>

      <Box className="glass-panel rounded-3xl px-7 py-6">
        <Text className="text-xs uppercase tracking-[0.3em] text-primary-700/80">Monitor live</Text>
        <HStack className="mt-4 flex-col gap-4 md:flex-row">
          <Box className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
            <Text className="text-sm font-semibold text-primary-900">Workflow attivi</Text>
            <Text className="mt-2 text-4xl font-semibold text-primary-900">46</Text>
            <Text className="text-xs text-typography-500">8 in modalità cura premium</Text>
          </Box>
          <Box className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
            <Text className="text-sm font-semibold text-primary-900">Azioni manuali richieste</Text>
            <Text className="mt-2 text-4xl font-semibold text-primary-900">5</Text>
            <Text className="text-xs text-typography-500">2 chat in supervisione • 3 conferme pagamento</Text>
          </Box>
          <Box className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
            <Text className="text-sm font-semibold text-primary-900">Dispositivi in alert</Text>
            <Text className="mt-2 text-4xl font-semibold text-primary-900">2</Text>
            <Text className="text-xs text-typography-500">Frigobar suite 402 • Clima camera 215</Text>
          </Box>
        </HStack>
      </Box>
    </VStack>
  );
}

