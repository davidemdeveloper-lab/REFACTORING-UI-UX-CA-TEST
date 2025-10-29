import dynamic from 'next/dynamic';
import type { AnalyticsSnapshot } from '@/lib/types';

const LazyBarChart = dynamic(() => import('./MetalBarChartInner').then((mod) => mod.MetalBarChartInner), {
  ssr: false
});

interface MetalBarChartProps {
  data: AnalyticsSnapshot[];
}

export const MetalBarChart = (props: MetalBarChartProps) => <LazyBarChart {...props} />;
