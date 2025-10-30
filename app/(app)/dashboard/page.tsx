'use client';

import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { Box, Heading, Text, VStack } from '@gluestack-ui/themed';
import { PipelineChart } from '@/components/dashboard/PipelineChart';
import { ClientsStatusTable } from '@/components/dashboard/ClientsStatusTable';
import { BookingsOverview } from '@/components/dashboard/BookingsOverview';
import { CommunicationsTimeline } from '@/components/dashboard/CommunicationsTimeline';

export default function DashboardPage() {
  return (
    <VStack gap="$8">
      <VStack gap="$2">
        <Heading size="2xl" color="$background50">
          Stato della struttura
        </Heading>
        <Text color="rgba(226,235,255,0.7)">
          Aggiornamento in tempo reale su clienti, pipeline e automazioni attive del Costa Alya Resort.
        </Text>
      </VStack>
      <StatsGrid />
      <Box
        style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
        width="100%"
      >
        <Box
          borderRadius="$xl"
          borderWidth={1}
          borderColor="rgba(255,255,255,0.16)"
          bgColor="rgba(13,24,41,0.55)"
          p="$6"
          style={{ backdropFilter: 'blur(18px)' }}
        >
          <Heading size="lg" color="$background50" mb="$4">
            Andamento prenotazioni
          </Heading>
          <PipelineChart />
        </Box>
        <CommunicationsTimeline />
      </Box>
      <Box
        style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}
      >
        <ClientsStatusTable />
        <BookingsOverview />
      </Box>
    </VStack>
  );
}
