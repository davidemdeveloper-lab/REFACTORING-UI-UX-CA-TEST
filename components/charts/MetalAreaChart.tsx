import dynamic from 'next/dynamic';
import type { RevenueSnapshot } from '@/lib/types';

const LazyAreaChart = dynamic(
  () => import('./MetalAreaChartInner').then((mod) => mod.MetalAreaChartInner),
  { ssr: false }
);

interface MetalAreaChartProps {
  data: RevenueSnapshot[];
}

export const MetalAreaChart = (props: MetalAreaChartProps) => <LazyAreaChart {...props} />;
