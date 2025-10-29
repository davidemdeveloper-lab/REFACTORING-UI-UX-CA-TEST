import { AnalyticsGrid } from '@/components/dashboard/AnalyticsGrid';
import { IoTWidget } from '@/components/dashboard/IoTWidget';
import { NotificationHub } from '@/components/dashboard/NotificationHub';
import { Snapshots } from '@/components/dashboard/Snapshots';
import { VStack, Text } from '@gluestack-ui/themed';

export default function DashboardPage() {
  return (
    <VStack space="lg" mb={24}>
      <Text fontSize={24} fontWeight="700">
        Dashboard operativo
      </Text>
      <AnalyticsGrid />
      <IoTWidget />
      <NotificationHub />
      <Snapshots />
    </VStack>
  );
}
