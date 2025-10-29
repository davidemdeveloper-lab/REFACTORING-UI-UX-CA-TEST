'use client';

import { HStack, VStack, Text, Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, Button } from '@gluestack-ui/themed';
import { Calendar, TrendingUp, Sparkles, MessageSquare } from 'lucide-react';
import { MetalBarChart } from '@/components/charts/MetalBarChart';
import { MetalAreaChart } from '@/components/charts/MetalAreaChart';
import { MetalDonutChart } from '@/components/charts/MetalDonutChart';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setRange } from '@/features/analytics/analyticsSlice';
import { GlassCard } from '@/components/common/GlassCard';
import { palette } from '@/theme/palette';

export const AnalyticsGrid = () => {
  const analytics = useAppSelector((state) => state.analytics);
  const dispatch = useAppDispatch();

  return (
    <VStack space="md">
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize={18} fontWeight="700">
          Performance occupazione
        </Text>
        <Select
          selectedValue={analytics.range}
          onValueChange={(value: string) => dispatch(setRange(value as typeof analytics.range))}
          minWidth={160}
          accessibilityLabel="Intervallo temporale analisi"
        >
          <SelectTrigger>
            <SelectInput placeholder="Intervallo" />
            <SelectIcon as={Calendar} />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Ultimi 7 giorni" value="7d" />
              <SelectItem label="Ultimi 30 giorni" value="30d" />
              <SelectItem label="Ultimi 90 giorni" value="90d" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </HStack>
      <GlassCard
        title="Occupazione per tipologia"
        description="Suite, Junior Suite e Home Suite con trend in tempo reale"
        icon={TrendingUp}
      >
        <MetalBarChart data={analytics.occupancy} />
      </GlassCard>
      <HStack space="md" flexWrap="wrap">
        <GlassCard title="Fatturato" description="Valori mock per monitoraggio revenue" icon={Sparkles}>
          <MetalAreaChart data={analytics.revenue} />
        </GlassCard>
        <GlassCard title="Uso servizi" description="Servizi ancillari più richiesti" icon={MessageSquare}>
          <MetalDonutChart data={analytics.services} />
        </GlassCard>
      </HStack>
      <HStack space="md" flexWrap="wrap">
        <GlassCard title="Azioni rapide" description="Avvia le principali automazioni" icon={Sparkles}>
          <HStack space="md" mt={8} flexWrap="wrap">
            <Button action="primary">Apri Booking Chat</Button>
            <Button variant="outline">Apri MADIP</Button>
            <Button variant="outline">Prepara campagna Upsell</Button>
          </HStack>
        </GlassCard>
        <GlassCard title="Rating ospiti" description="Valutazioni ultime recensioni" icon={MessageSquare}>
          <VStack space="xs" mt={8}>
            <Text fontSize={32} fontWeight="700" color={palette.accent[400]}>
              4.7 ★
            </Text>
            <Text fontSize={13} color={palette.steel[200]}>
              TripAdvisor · aggiornato 2h fa
            </Text>
          </VStack>
        </GlassCard>
      </HStack>
    </VStack>
  );
};
