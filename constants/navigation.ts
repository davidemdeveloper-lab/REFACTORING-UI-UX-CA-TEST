import { SidebarRoute } from '@/store/slices/uiSlice';
import type { ComponentType } from 'react';
import {
  LayoutDashboard,
  UsersRound,
  CalendarCheck,
  FileText,
  MessagesSquare,
  Cpu,
} from 'lucide-react-native';

export type SidebarIconProps = {
  size?: number;
  color?: string;
};

export type NavigationItem = {
  label: string;
  route: SidebarRoute;
  href: string;
  icon: ComponentType<SidebarIconProps>;
};

export const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    route: 'dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Clienti',
    route: 'customers',
    href: '/customers',
    icon: UsersRound,
  },
  {
    label: 'Prenotazioni',
    route: 'bookings',
    href: '/bookings',
    icon: CalendarCheck,
  },
  {
    label: 'Template',
    route: 'templates',
    href: '/templates',
    icon: FileText,
  },
  {
    label: 'Chat',
    route: 'chat',
    href: '/chat',
    icon: MessagesSquare,
  },
  {
    label: 'IoT',
    route: 'iot',
    href: '/iot',
    icon: Cpu,
  },
];
