'use client';

import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, CartesianGrid } from 'recharts';
import type { AnalyticsSnapshot } from '@/lib/types';
import { palette } from '@/theme/palette';

interface MetalBarChartInnerProps {
  data: AnalyticsSnapshot[];
}

export const MetalBarChartInner = ({ data }: MetalBarChartInnerProps) => (
  <ResponsiveContainer width="100%" height={240}>
    <BarChart data={data} barSize={24}>
      <CartesianGrid stroke="rgba(148,163,184,0.1)" strokeDasharray="3 3" />
      <XAxis dataKey="roomType" stroke={palette.steel[200]} tickLine={false} axisLine={false} />
      <YAxis stroke={palette.steel[200]} tickLine={false} axisLine={false} />
      <Tooltip
        cursor={{ fill: 'rgba(59,130,246,0.16)' }}
        contentStyle={{ background: '#1C2329', borderRadius: 12, border: '1px solid rgba(148,197,253,0.2)' }}
      />
      <Bar dataKey="occupancy" fill={palette.accent[600]} radius={[12, 12, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);
