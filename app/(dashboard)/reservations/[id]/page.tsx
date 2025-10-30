import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import {
  clients,
  formatCurrency,
  getReservationById,
} from '@/lib/data';
import { ArrowLeft, MessageCircle, PlugZap, Sparkles } from 'lucide-react-native';

export default function ReservationDetailPage({ params }: { params: { id: string } }) {
  const reservation = getReservationById(params.id);
  if (!reservation) {
    notFound();
  }
  const client = clients.find((c) => c.id === reservation.clientId);

  return (
    <div className="grid gap-8">
      <div className="flex items-center justify-between">
        <Link href="/reservations" className="inline-flex items-center gap-2 text-xs text-white/60">
          <Icon as={ArrowLeft} size="sm" color="rgba(255,255,255,0.6)" /> Torna alle prenotazioni
        </Link>
        <HStack space="md">
          <Button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
            Condividi link Booking
          </Button>
          <Button className="rounded-full bg-[color:var(--accent-solid)] px-4 py-2 text-xs text-background-950">
            Invita al check-in online
          </Button>
        </HStack>
      </div>

      <section className="glass-panel p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <Text className="font-space-grotesk text-3xl text-white">{reservation.code}</Text>
            <Text className="text-xs text-white/50">{reservation.checkIn} → {reservation.checkOut}</Text>
            <Text className="mt-2 text-sm text-white/70">
              {client?.name} • {reservation.roomType} • {reservation.guests} ospiti
            </Text>
          </div>
          <div className="flex flex-col gap-2 text-right text-sm text-white/70">
            <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Valore</Text>
            <Text className="font-space-grotesk text-2xl text-white">{formatCurrency(reservation.total)}</Text>
            <Badge className="self-end rounded-full bg-[color:var(--accent-solid)]/20 text-[color:var(--accent-soft)]">
              {reservation.status.toUpperCase()}
            </Badge>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-white/70">
            <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Automazioni attive</Text>
            <div className="mt-4 grid gap-3">
              {reservation.automations.map((step) => (
                <div key={step.id} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <HStack className="items-center justify-between">
                    <span className="text-sm text-white/80">{step.label}</span>
                    <Badge className="rounded-full bg-[color:var(--accent-solid)]/20 text-[color:var(--accent-soft)]">
                      {step.status}
                    </Badge>
                  </HStack>
                  <Text className="text-[10px] uppercase tracking-[0.3em] text-white/40">Canale {step.channel}</Text>
                  {step.aiDraft && <Text className="text-xs text-white/60">Suggerimento AI: {step.aiDraft}</Text>}
                  {step.executedAt && <Text className="text-xs text-white/40">Eseguito: {step.executedAt}</Text>}
                  {step.scheduledAt && <Text className="text-xs text-white/40">Programmato: {step.scheduledAt}</Text>}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-white/70">
            <Text className="text-xs uppercase tracking-[0.3em] text-white/50">IoT stanza {reservation.iot.room}</Text>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <SensorValue label="Temperatura" value={`${reservation.iot.temperature}°C`} />
              <SensorValue label="Umidità" value={`${reservation.iot.humidity}%`} />
              <SensorValue label="Minibar" value={reservation.iot.minibarRestock} />
              <SensorValue label="Luci" value={reservation.iot.lightsOn ? 'On' : 'Off'} />
              {reservation.iot.spaReady !== undefined && (
                <SensorValue label="Spa" value={reservation.iot.spaReady ? 'Pronta' : 'Da preparare'} />
              )}
              {reservation.iot.aromatherapy && (
                <SensorValue label="Aromaterapia" value={reservation.iot.aromatherapy} />
              )}
            </div>
            <Button className="mt-4 w-full rounded-full border border-white/20 bg-white/5 py-2 text-xs text-white/70">
              Apri pannello IoT
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel p-6">
          <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Flow prenotazione</Text>
          <div className="mt-4 space-y-4">
            {reservation.automations.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                    step.status === 'completed'
                      ? 'border-[color:var(--accent-solid)] text-[color:var(--accent-soft)]'
                      : 'border-white/20 text-white/60'
                  }`}>
                    {index + 1}
                  </span>
                  {index < reservation.automations.length - 1 && <span className="mt-1 h-12 w-px bg-white/10" />}
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">
                  <Text className="font-space-grotesk text-lg text-white">{step.label}</Text>
                  <Text className="text-xs text-white/50">Canale {step.channel}</Text>
                  {step.aiDraft && <Text className="mt-2 text-sm text-white/70">AI: {step.aiDraft}</Text>}
                  {step.handoffReason && <Text className="mt-2 text-xs text-white/50">Manuale: {step.handoffReason}</Text>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel p-6">
          <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Azioni consigliate</Text>
          <VStack space="md" className="mt-4">
            <ActionCard
              icon={Sparkles}
              title="Invia follow-up romantico"
              description="Suggerisci upgrade Romance Plus con massaggio e prosecco, sfruttando l’anniversario."
            />
            <ActionCard
              icon={MessageCircle}
              title="Messaggio proattivo"
              description="L’AI può inviare un promemoria personalizzato su WhatsApp per il pagamento in sospeso."
            />
            <ActionCard
              icon={PlugZap}
              title="Allinea sensoristica"
              description="Minibar segnalato LOW: notifica housekeeping e aggiungi nota al profilo cliente."
            />
          </VStack>
        </div>
      </section>
    </div>
  );
}

function SensorValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white">
      <Text className="text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</Text>
      <Text className="mt-1 font-space-grotesk text-lg text-white">{value}</Text>
    </div>
  );
}

function ActionCard({ icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">
      <Box className="rounded-2xl border border-white/10 bg-white/5 p-3">
        <Icon as={icon} size="sm" color="rgba(255,255,255,0.8)" />
      </Box>
      <div>
        <Text className="font-space-grotesk text-lg text-white">{title}</Text>
        <Text className="text-sm text-white/70">{description}</Text>
      </div>
    </div>
  );
}
