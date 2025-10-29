'use client';

import { devices } from '@/data/devices';
import { PageHeader } from '@/components/common/PageHeader';
import { Cpu, Wifi, Battery } from '@/components/icons';

const statusTone: Record<string, string> = {
  online: 'text-emerald-300',
  warning: 'text-amber-300',
  offline: 'text-red-300',
};

export default function IoTPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="IoT & ambient intelligence"
        description="Monitora dispositivi, scenari e automazioni connesse all'esperienza ospite"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {devices.map((device) => (
          <article key={device.id} className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{device.name}</h3>
              <span className={`text-xs uppercase tracking-[0.3em] ${statusTone[device.status]}`}>
                {device.status}
              </span>
            </div>
            <p className="text-xs text-white/50">{device.location}</p>
            <div className="flex flex-wrap gap-2 text-xs text-white/60">
              <span className="rounded-full bg-white/10 px-3 py-1">Scenario: {device.automation}</span>
              <span className="rounded-full bg-white/10 px-3 py-1">Ping: {device.lastPing}</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-white/70">
              <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-3">
                <Cpu className="h-5 w-5 text-white/60" strokeWidth={1.6} />
                <p className="mt-1 text-white">{device.metrics.energy}%</p>
                <p className="text-[11px] text-white/50">Energy</p>
              </div>
              <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-3">
                <Wifi className="h-5 w-5 text-white/60" strokeWidth={1.6} />
                <p className="mt-1 text-white">{device.metrics.occupancy}%</p>
                <p className="text-[11px] text-white/50">Occupancy</p>
              </div>
              <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-3">
                <Battery className="h-5 w-5 text-white/60" strokeWidth={1.6} />
                <p className="mt-1 text-white">{device.metrics.battery}%</p>
                <p className="text-[11px] text-white/50">Battery</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
