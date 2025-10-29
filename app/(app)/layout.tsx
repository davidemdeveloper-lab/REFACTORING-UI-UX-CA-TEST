import { SideNav } from '@/components/nav/SideNav';
import { TopBar } from '@/components/nav/TopBar';
import { Box, HStack, VStack } from '@gluestack-ui/themed';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <HStack alignItems="flex-start" height="100vh" overflow="hidden">
      <SideNav />
      <VStack flex={1} height="100vh" overflow="hidden" space="md" px={24} py={16}>
        <TopBar />
        <Box flex={1} overflow="auto" pb={32} pr={8}>
          {children}
        </Box>
      </VStack>
    </HStack>
  );
}
