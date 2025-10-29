'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { RevenueSnapshot } from '@/lib/types';
import { palette } from '@/theme/palette';

interface MetalAreaChartInnerProps {
  data: RevenueSnapshot[];
}

export const MetalAreaChartInner = ({ data }: MetalAreaChartInnerProps) => (
  <ResponsiveContainer width="100%" height={220}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="cobaltGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={palette.accent[500]} stopOpacity={0.8} />
          <stop offset="95%" stopColor={palette.accent[400]} stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="rgba(148,163,184,0.1)" strokeDasharray="4 4" />
      <XAxis dataKey="label" stroke={palette.steel[200]} tickLine={false} axisLine={false} />
      <YAxis stroke={palette.steel[200]} tickLine={false} axisLine={false} />
      <Tooltip
        cursor={{ stroke: palette.accent[400], strokeWidth: 2 }}
        contentStyle={{ background: '#1C2329', borderRadius: 12, border: '1px solid rgba(59,130,246,0.35)' }}
      />
      <Area type="monotone" dataKey="value" stroke={palette.accent[500]} fill="url(#cobaltGradient)" strokeWidth={2} />
    </AreaChart>
  </ResponsiveContainer>
);
