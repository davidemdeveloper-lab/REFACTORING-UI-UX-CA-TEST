'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';

const occupancyData = [
  { name: 'Lun', occupazione: 68, automazioni: 42 },
  { name: 'Mar', occupazione: 72, automazioni: 44 },
  { name: 'Mer', occupazione: 75, automazioni: 52 },
  { name: 'Gio', occupazione: 81, automazioni: 60 },
  { name: 'Ven', occupazione: 92, automazioni: 76 },
  { name: 'Sab', occupazione: 95, automazioni: 88 },
  { name: 'Dom', occupazione: 83, automazioni: 64 },
];

const automationData = [
  { name: 'Proposte', value: 38 },
  { name: 'Pre stay', value: 52 },
  { name: 'In stay', value: 31 },
  { name: 'Post stay', value: 27 },
];

export function OccupancyChart() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="glass-panel-soft col-span-2 rounded-3xl border border-white/10 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Trend Settimana</p>
            <p className="text-lg font-semibold text-white">Occupazione & automazioni attive</p>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
            Ultimi 7 giorni
          </span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={occupancyData} margin={{ top: 20, left: 0, right: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.75} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.75} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(226,232,240,0.08)" />
            <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15,23,42,0.95)',
                borderRadius: 16,
                border: '1px solid rgba(148,163,184,0.25)',
                color: '#e2e8f0',
              }}
            />
            <Area
              type="monotone"
              dataKey="occupazione"
              stroke="#f97316"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorOcc)"
            />
            <Area
              type="monotone"
              dataKey="automazioni"
              stroke="#38bdf8"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAuto)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="glass-panel-soft rounded-3xl border border-white/10 p-6">
        <div className="mb-5 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Automazioni</p>
          <p className="text-lg font-semibold text-white">Volume email per fase journey</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={automationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(226,232,240,0.08)" />
            <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15,23,42,0.95)',
                borderRadius: 16,
                border: '1px solid rgba(148,163,184,0.25)',
                color: '#e2e8f0',
              }}
            />
            <Bar dataKey="value" fill="#f59e0b" radius={[10, 10, 10, 10]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
