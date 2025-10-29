import { AppShell } from '@/components/layout/app-shell';
import { IoTDeviceCard } from '@/components/common/iot-device-card';
import { GlassCard } from '@/components/common/glass-card';
import { iotDevices } from '@/lib/mock-data';
import { PlugZap, Wifi, Wrench } from 'lucide-react-native';

export default function IoTPage() {
  return (
    <AppShell
      title="Dispositivi IoT"
      description="Comfort, energy e servizi connessi alle camere"
      actions={
        <button className="flex items-center gap-2 rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-xs font-semibold text-[#06131f] shadow-lg shadow-[var(--accent-glow)]">
          <PlugZap size={16} /> Aggiungi dispositivo
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Stato rete</p>
          <div className="mt-3 space-y-3 text-sm text-white/70">
            <p>Dispositivi totali: {iotDevices.length}</p>
            <p>Online: {iotDevices.filter((device) => device.status === 'online').length}</p>
            <p>Warning: {iotDevices.filter((device) => device.status === 'warning').length}</p>
            <p>Offline: {iotDevices.filter((device) => device.status === 'offline').length}</p>
          </div>
          <button className="mt-4 flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold text-white/80">
            <Wrench size={16} /> Sincronizza ora
          </button>
        </GlassCard>
        <div className="grid gap-4 md:grid-cols-2">
          {iotDevices.map((device) => (
            <IoTDeviceCard key={device.id} device={device} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
