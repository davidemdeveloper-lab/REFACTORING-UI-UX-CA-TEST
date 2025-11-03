'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { NotificationCenter } from './notification-center';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  closeNotificationCenter,
  openNotificationCenter,
  setActiveSidebarRoute,
} from '@/store/slices/uiSlice';
import { useGetNotificationsQuery } from '@/services/mockApi';
import {
  markNotificationAsRead,
  markNotificationAsResolved,
} from '@/store/slices/notificationsSlice';
import { navigationItems } from '@/constants/navigation';
import { Footer } from './footer';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { notificationCenterOpen, activeSidebarRoute } = useAppSelector(
    (state) => state.ui
  );
  const { readIds, resolvedIds } = useAppSelector((state) => state.notifications);
  const { data: notifications = [] } = useGetNotificationsQuery();

  useEffect(() => {
    const matchedItem = navigationItems.find((item) =>
      pathname.startsWith(item.href)
    );
    if (matchedItem && matchedItem.route !== activeSidebarRoute) {
      dispatch(setActiveSidebarRoute(matchedItem.route));
    }
  }, [pathname, dispatch, activeSidebarRoute]);

  const unreadCount = notifications.filter(
    (notification) =>
      notification.status === 'Nuovo' && !readIds[notification.id]
  ).length;

  return (
    <Box className="relative flex min-h-screen flex-row bg-[var(--color-background)]">
      <Sidebar
        activeRoute={activeSidebarRoute}
        onNavigate={(route) => dispatch(setActiveSidebarRoute(route))}
      />
      <Box className="relative flex min-h-screen flex-1 flex-col">
        <Header
          onOpenNotifications={() => dispatch(openNotificationCenter())}
          unreadCount={unreadCount}
        />
        <Box className="relative flex-1 overflow-y-auto px-6 pb-12 pt-8 md:px-10">
          <Box className="mx-auto w-full max-w-[1320px]">
            {children}
            <Footer />
          </Box>
        </Box>
      </Box>
      <NotificationCenter
        isOpen={notificationCenterOpen}
        notifications={notifications}
        readIds={readIds}
        resolvedIds={resolvedIds}
        onClose={() => dispatch(closeNotificationCenter())}
        onMarkAsRead={(id) => dispatch(markNotificationAsRead(id))}
        onMarkAsResolved={(id) => dispatch(markNotificationAsResolved(id))}
      />
    </Box>
  );
}
