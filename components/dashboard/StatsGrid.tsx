'use client';

import { Box, Heading, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { ArrowUpRight, MessageSquareText, Repeat, Users } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';

const stats = [
  {
    title: 'Clienti attivi',
    value: '1.248',
    change: '+12% vs mese precedente',
    icon: Users,
    accent: 'rgba(79,111,255,0.32)',
  },
  {
    title: 'Automazioni attive',
    value: '38',
    change: '+5 nuove questa settimana',
    icon: Repeat,
    accent: 'rgba(40,200,124,0.32)',
  },
  {
    title: 'Tasso di risposta',
    value: '94%',
    change: '+8% vs benchmark',
    icon: MessageSquareText,
    accent: 'rgba(247,147,30,0.32)',
  },
  {
    title: 'Ricavi previsti',
    value: '€ 184.500',
    change: 'Forecast 30 giorni',
    icon: ArrowUpRight,
    accent: 'rgba(204,47,69,0.32)',
  },
];

export function StatsGrid() {
  return (
    <HStack gap="$6" flexWrap="wrap">
      {stats.map((item) => (
        <GlassCard key={item.title}>
          <HStack gap="$4" alignItems="center">
            <Box
              width={56}
              height={56}
              borderRadius="$xl"
              bgColor={item.accent}
              alignItems="center"
              justifyContent="center"
              borderWidth={1}
              borderColor="rgba(255,255,255,0.22)"
            >
              <Icon as={item.icon} color="$background50" />
            </Box>
            <VStack gap="$1">
              <Text color="rgba(226,235,255,0.7)" fontSize="$xs">
                {item.title}
              </Text>
              <Heading size="xl" color="$background50">
                {item.value}
              </Heading>
              <Text color="rgba(226,235,255,0.62)" fontSize="$sm">
                {item.change}
              </Text>
            </VStack>
          </HStack>
        </GlassCard>
      ))}
    </HStack>
  );
}
