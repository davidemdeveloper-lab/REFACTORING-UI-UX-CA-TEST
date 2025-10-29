import dynamic from 'next/dynamic';
import type { ServiceUsageSnapshot } from '@/lib/types';

const LazyDonutChart = dynamic(
  () => import('./MetalDonutChartInner').then((mod) => mod.MetalDonutChartInner),
  { ssr: false }
);

interface MetalDonutChartProps {
  data: ServiceUsageSnapshot[];
}

export const MetalDonutChart = (props: MetalDonutChartProps) => <LazyDonutChart {...props} />;
