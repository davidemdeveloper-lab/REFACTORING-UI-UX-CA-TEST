'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import type { ServiceUsageSnapshot } from '@/lib/types';
import { palette } from '@/theme/palette';

const colors = [palette.accent[600], palette.teal[500], palette.accent[400], palette.teal[400]];

interface MetalDonutChartInnerProps {
  data: ServiceUsageSnapshot[];
}

export const MetalDonutChartInner = ({ data }: MetalDonutChartInnerProps) => (
  <ResponsiveContainer width="100%" height={220}>
    <PieChart>
      <Pie dataKey="usage" data={data} innerRadius={60} outerRadius={90} paddingAngle={4}>
        {data.map((entry, index) => (
          <Cell key={entry.service} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip contentStyle={{ background: '#1C2329', borderRadius: 12, border: '1px solid rgba(20,181,219,0.4)' }} />
      <Legend
        formatter={(value) => value}
        iconType="circle"
        wrapperStyle={{ color: palette.steel[200] }}
      />
    </PieChart>
  </ResponsiveContainer>
);
