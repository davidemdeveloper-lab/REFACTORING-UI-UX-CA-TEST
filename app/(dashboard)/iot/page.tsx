import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { reservations } from '@/lib/data';
import { Icon } from '@/components/ui/icon';
import { Lightbulb, Thermometer, Waves } from 'lucide-react-native';

export default function IotPage() {
  return (
    <div className="glass-panel p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <Text className="text-sm uppercase tracking-[0.3em] text-white/60">Dispositivi IoT</Text>
          <Text className="mt-2 font-space-grotesk text-2xl text-white">Monitor e comandi</Text>
          <Text className="text-xs text-white/50">Collega e controlla stanze intelligenti direttamente dal Customer Automator.</Text>
        </div>
        <Button className="self-start rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
          Aggiungi dispositivo
        </Button>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/70">
            <HStack className="items-center justify-between">
              <div>
                <Text className="font-space-grotesk text-xl text-white">{reservation.iot.room}</Text>
                <Text className="text-xs text-white/50">{reservation.roomType}</Text>
              </div>
              <Button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                Apri pannello stanza
              </Button>
            </HStack>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-white">
              <Sensor label="Temperatura" value={`${reservation.iot.temperature}°C`} icon={Thermometer} />
              <Sensor label="Umidità" value={`${reservation.iot.humidity}%`} icon={Waves} />
              <Sensor label="Luci" value={reservation.iot.lightsOn ? 'On' : 'Off'} icon={Lightbulb} />
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Minibar {reservation.iot.minibarRestock.toUpperCase()}
              </span>
              {reservation.iot.spaReady !== undefined && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Spa {reservation.iot.spaReady ? 'Pronta' : 'Da preparare'}
                </span>
              )}
              {reservation.iot.aromatherapy && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Aroma {reservation.iot.aromatherapy}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sensor({ label, value, icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
      <HStack className="items-center gap-2 text-xs text-white/60">
        <Icon as={icon} size="sm" color="rgba(255,255,255,0.7)" />
        {label}
      </HStack>
      <Text className="mt-2 font-space-grotesk text-lg text-white">{value}</Text>
    </div>
  );
}
