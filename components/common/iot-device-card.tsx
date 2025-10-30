import React from 'react';
import { IoTDevice } from '@/lib/types';
import { GlassCard } from './glass-card';
import { Text } from '@/components/ui/text';

const STATUS_COLOR: Record<string, string> = {
  online: 'bg-success-500/20 text-success-100 border border-success-500/30',
  warning: 'bg-warning-500/20 text-warning-100 border border-warning-500/30',
  offline: 'bg-error-500/20 text-error-100 border border-error-500/30',
};

export const IoTDeviceCard = ({ device }: { device: IoTDevice }) => {
  return (
    <GlassCard>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{device.name}</p>
          <p className="text-xs text-white/60">Ultima sincronizzazione: {new Date(device.lastSync).toLocaleTimeString('it-IT')}</p>
        </div>
        <span className={`badge-pill ${STATUS_COLOR[device.status]}`}>{device.status}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {device.metrics.map((metric) => (
          <div key={`${device.id}-${metric.label}`} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <Text className="text-xs uppercase tracking-[0.2em] text-white/50">{metric.label}</Text>
            <Text className="mt-1 text-lg font-semibold text-white">{metric.value}</Text>
          </div>
        ))}
      </div>
      {device.room ? (
        <p className="text-xs text-white/60">Camera associata: {device.room}</p>
      ) : null}
    </GlassCard>
  );
};
