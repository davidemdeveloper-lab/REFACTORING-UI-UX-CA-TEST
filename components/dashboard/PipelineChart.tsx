'use client';

import { memo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box, Text } from '@gluestack-ui/themed';

const data = [
  { name: 'Mag', confermate: 12, proposte: 8 },
  { name: 'Giu', confermate: 15, proposte: 6 },
  { name: 'Lug', confermate: 18, proposte: 9 },
  { name: 'Ago', confermate: 22, proposte: 7 },
  { name: 'Set', confermate: 24, proposte: 11 },
  { name: 'Ott', confermate: 28, proposte: 10 },
];

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const [confirmed, proposals] = payload;
  return (
    <Box px="$3" py="$2" borderRadius="$lg" bgColor="rgba(13,24,41,0.9)">
      <Text color="$background50">Confermate: {confirmed.value}</Text>
      <Text color="rgba(226,235,255,0.7)">Proposte: {proposals.value}</Text>
    </Box>
  );
}

export const PipelineChart = memo(function PipelineChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 20, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4f6fff" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#4f6fff" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="colorProposal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f7931e" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#f7931e" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="name" stroke="rgba(226,235,255,0.5)" tickLine={false} axisLine={false} />
        <YAxis stroke="rgba(226,235,255,0.5)" tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)' }} />
        <Area type="monotone" dataKey="confermate" stroke="#4f6fff" fill="url(#colorConfirmed)" />
        <Area type="monotone" dataKey="proposte" stroke="#f7931e" fill="url(#colorProposal)" />
      </AreaChart>
    </ResponsiveContainer>
  );
});
