import { ReactNode } from 'react';
import { Box } from '@gluestack-ui/themed';
import { SideNav } from '@/components/navigation/SideNav';
import { TopBar } from '@/components/navigation/TopBar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Box flex={1} flexDirection="row" minHeight="100vh">
      <SideNav />
      <Box flex={1} flexDirection="column" maxHeight="100vh" overflow="hidden">
        <TopBar />
        <Box flex={1} overflow="auto" px="$8" py="$8">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
