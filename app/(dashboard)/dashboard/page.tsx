'use client';

import type { ReactNode } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Divider,
  Button,
  ScrollView,
} from '@gluestack-ui/themed';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartTooltip } from 'recharts';
import { CalendarPlus, UserPlus } from 'lucide-react';
import { clients } from '@/data/clients';
import { bookings } from '@/data/bookings';
import { notifications } from '@/data/notifications';
import { formatDate, formatTimeDistance, formatCurrency } from '@/utils/format';
import { GlassCard } from '@/components/common/GlassCard';

const trendData = bookings.map((booking) => ({
  name: booking.number,
  valore: booking.value,
}));

export default function DashboardPage() {
  const activeClients = clients.slice(0, 5);
  const upcomingBookings = bookings.slice(0, 4);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <ScrollView>
      <VStack space="xl">
        <HStack space="lg" flexWrap="wrap">
          <StatCard
            title="Clienti attivi"
            value={`${clients.length}`}
            subtitle="aggiornati negli ultimi 7 giorni"
            accent="rgba(79, 140, 255, 0.85)"
            icon={<UserPlus size={18} color="#8CB6FF" />}
          />
          <StatCard
            title="Prenotazioni confermate"
            value={`${bookings.filter((b) => b.status === 'confermato').length}`}
            subtitle="nelle prossime 2 settimane"
            accent="rgba(34, 197, 94, 0.8)"
            icon={<CalendarPlus size={18} color="#22c55e" />}
          />
          <StatCard
            title="Automazioni attive"
            value="21"
            subtitle="workflow in esecuzione oggi"
            accent="rgba(112, 214, 255, 0.85)"
          />
        </HStack>

        <GlassCard>
          <Heading size="lg" color="white" mb="$4">
            Performance prenotazioni
          </Heading>
          <Box height={240}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F8CFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4F8CFF" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="rgba(148, 163, 184, 0.5)" tick={{ fill: 'rgba(148,163,184,0.8)', fontSize: 12 }} />
                <YAxis
                  stroke="rgba(148, 163, 184, 0.5)"
                  tickFormatter={(value) => formatCurrency(value).replace('€', '€ ')}
                  tick={{ fill: 'rgba(148,163,184,0.8)', fontSize: 12 }}
                />
                <RechartTooltip
                  cursor={{ stroke: 'rgba(79, 140, 255, 0.35)' }}
                  contentStyle={{
                    background: 'rgba(15,23,42,0.9)',
                    borderRadius: 16,
                    border: '1px solid rgba(79,140,255,0.4)',
                    color: '#dbeafe',
                    padding: '12px 16px',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area type="monotone" dataKey="valore" stroke="#4F8CFF" fill="url(#colorValore)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </GlassCard>

        <HStack space="lg" flexWrap="wrap" alignItems="flex-start">
          <GlassCard flexBasis="420px" flexGrow={1}>
            <HStack justifyContent="space-between" alignItems="center" mb="$4">
              <Heading size="lg" color="white">
                Stato clienti
              </Heading>
              <Button variant="link" action="secondary" px={0}>
                <Text color="rgba(148, 163, 184, 0.9)">Vedi tutti</Text>
              </Button>
            </HStack>
            <VStack space="md">
              {activeClients.map((client) => (
                <HStack
                  key={client.id}
                  justifyContent="space-between"
                  alignItems="center"
                  px="$4"
                  py="$3"
                  rounded="$xl"
                  bg="rgba(255, 255, 255, 0.05)"
                >
                  <VStack>
                    <Text color="rgba(226, 232, 240, 0.95)" fontWeight="$semibold">
                      {client.name} {client.surname}
                    </Text>
                    <Text color="rgba(148, 163, 184, 0.85)" fontSize="$sm">
                      Ultimo aggiornamento {formatTimeDistance(client.lastUpdate)}
                    </Text>
                  </VStack>
                  <Badge
                    variant="solid"
                    bg={statusColor(client.lastStayStatus)}
                    borderColor="transparent"
                  >
                    <Text color="#0B1220" fontWeight="$semibold">
                      {client.lastStayStatus.toUpperCase()}
                    </Text>
                  </Badge>
                </HStack>
              ))}
            </VStack>
          </GlassCard>

          <GlassCard flexBasis="420px" flexGrow={1}>
            <HStack justifyContent="space-between" alignItems="center" mb="$4">
              <Heading size="lg" color="white">
                Prenotazioni imminenti
              </Heading>
              <Button variant="link" action="secondary" px={0}>
                <Text color="rgba(148, 163, 184, 0.9)">Nuova</Text>
              </Button>
            </HStack>
            <VStack space="md">
              {upcomingBookings.map((booking) => (
                <Box key={booking.id} px="$4" py="$3" rounded="$xl" bg="rgba(79, 140, 255, 0.08)">
                  <VStack space="xs">
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text color="rgba(226, 232, 240, 0.95)" fontWeight="$semibold">
                        {booking.number}
                      </Text>
                      <Badge
                        variant="outline"
                        borderColor="rgba(79, 140, 255, 0.6)"
                        bg="rgba(79, 140, 255, 0.1)"
                      >
                        <Text color="#8CB6FF">{booking.status.toUpperCase()}</Text>
                      </Badge>
                    </HStack>
                    <Text color="rgba(148, 163, 184, 0.85)" fontSize="$sm">
                      Check-in {formatDate(booking.checkIn)} · {formatCurrency(booking.value)}
                    </Text>
                    <Text color="rgba(148, 163, 184, 0.75)" fontSize="$xs">
                      {booking.tags.join(' • ')}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </VStack>
          </GlassCard>

          <GlassCard flexBasis="320px" flexGrow={1}>
            <Heading size="lg" color="white" mb="$4">
              Feed operativo
            </Heading>
            <VStack space="md">
              {recentNotifications.map((item) => (
                <Box key={item.id} px="$4" py="$3" rounded="$xl" bg="rgba(255,255,255,0.05)">
                  <Text color="rgba(226, 232, 240, 0.95)" fontWeight="$semibold">
                    {item.title}
                  </Text>
                  <Text color="rgba(148, 163, 184, 0.85)" fontSize="$sm" mt="$1">
                    {item.description}
                  </Text>
                  <Divider my="$3" opacity={0.12} />
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text color="rgba(148, 163, 184, 0.75)" fontSize="$xs">
                      {formatTimeDistance(item.timestamp)}
                    </Text>
                    <Badge
                      variant="solid"
                      bg={notificationColor(item.category)}
                      borderColor="transparent"
                    >
                      <Text color="#0B1220" fontWeight="$semibold">
                        {item.category.toUpperCase()}
                      </Text>
                    </Badge>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </GlassCard>
        </HStack>
      </VStack>
    </ScrollView>
  );
}

const statusColor = (status: string) => {
  switch (status) {
    case 'vip':
      return 'rgba(251, 191, 36, 0.9)';
    case 'attenzione':
      return 'rgba(249, 115, 22, 0.85)';
    case 'confermato':
      return 'rgba(16, 185, 129, 0.85)';
    default:
      return 'rgba(79, 140, 255, 0.8)';
  }
};

const notificationColor = (category: string) => {
  switch (category) {
    case 'alert':
      return 'rgba(248, 113, 113, 0.9)';
    case 'task':
      return 'rgba(129, 140, 248, 0.85)';
    case 'idea':
      return 'rgba(253, 224, 71, 0.85)';
    default:
      return 'rgba(34, 197, 94, 0.85)';
  }
};

const StatCard = ({
  title,
  value,
  subtitle,
  accent,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  accent: string;
  icon?: ReactNode;
}) => (
  <GlassCard flexBasis="280px" flexGrow={1}>
    <VStack space="sm">
      <HStack justifyContent="space-between" alignItems="center">
        <Text color="rgba(148, 163, 184, 0.8)" fontSize="$sm">
          {title}
        </Text>
        {icon}
      </HStack>
      <Text color={accent} fontSize="$3xl" fontWeight="$bold">
        {value}
      </Text>
      <Text color="rgba(148, 163, 184, 0.75)" fontSize="$xs">
        {subtitle}
      </Text>
    </VStack>
  </GlassCard>
);
