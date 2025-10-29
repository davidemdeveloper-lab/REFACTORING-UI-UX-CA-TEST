import { CircuitBoard, Signal, BatteryMedium, WifiOff } from 'lucide-react';
import { devices } from '@/data/devices';
import { StatusPill } from '@/components/common/StatusPill';
import { statusIndicator, formatDate } from '@/lib/utils';

const statusLabel: Record<'online' | 'offline' | 'maintenance', string> = {
  online: 'Online',
  offline: 'Offline',
  maintenance: 'Manutenzione',
};

export default function IotPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="glass-panel-soft rounded-3xl border border-white/10 p-6">
        <header className="mb-6 flex flex-col gap-3">
          <StatusPill label="IoT Hub" tone="sky" />
          <h1 className="text-2xl font-semibold text-white">Monitora dispositivi connessi in hotel</h1>
          <p className="text-sm text-slate-300">
            Stato in tempo reale, batteria, segnale e sincronizzazioni per camere, aree comuni e spa.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {devices.map((device) => (
            <div key={device.id} className="glass-panel-soft flex flex-col gap-4 rounded-3xl border border-white/10 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                    <CircuitBoard className="h-6 w-6" />
                    <span
                      className={`absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full ${statusIndicator(device.status)}`}
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{device.name}</h2>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{device.location}</p>
                  </div>
                </div>
                <StatusPill label={statusLabel[device.status]} tone={device.status === 'online' ? 'emerald' : device.status === 'offline' ? 'rose' : 'amber'} />
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-200">
                <span className="flex items-center gap-2"><BatteryMedium className="h-4 w-4" /> {device.battery}%</span>
                <span className="flex items-center gap-2"><Signal className="h-4 w-4" /> {device.signal}%</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Ultima sincronizzazione</p>
                <p>{formatDate(device.lastSync, "d MMM 'alle' HH:mm")}</p>
              </div>
              {device.status === 'offline' && (
                <div className="rounded-2xl border border-rose-400/50 bg-rose-500/10 p-4 text-xs text-rose-100">
                  <div className="mb-1 flex items-center gap-2 uppercase tracking-[0.3em]">
                    <WifiOff className="h-4 w-4" /> Azione richiesta
                  </div>
                  Verifica alimentazione e connettività. Invia tecnico se offline oltre 4 ore.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
