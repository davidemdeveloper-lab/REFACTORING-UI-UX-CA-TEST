'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CalendarClock,
  ClipboardList,
  MessageSquareMore,
  Sparkles,
} from '@/components/icons';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Clienti',
    href: '/clients',
    icon: Users,
  },
  {
    label: 'Nuovo cliente',
    href: '/clients/new',
    icon: UserPlus,
  },
  {
    label: 'Prenotazioni',
    href: '/bookings',
    icon: CalendarClock,
  },
  {
    label: 'Template email',
    href: '/templates',
    icon: ClipboardList,
  },
  {
    label: 'Chat & AI',
    href: '/chat',
    icon: MessageSquareMore,
  },
];

const supportItems = [
  {
    label: 'Hub servizi',
    href: '/dashboard#servizi',
    icon: Sparkles,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  const renderItem = (item: (typeof navItems)[number], index: number) => {
    const isActive =
      item.href === '/dashboard'
        ? pathname === item.href
        : pathname.startsWith(item.href);

    return (
      <Link key={item.href} href={item.href} className="group">
        <Box
          className={`mb-1 flex flex-row items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
            isActive
              ? 'bg-primary-500/20 text-primary-100 shadow-[0_12px_30px_rgba(23,43,66,0.35)]'
              : 'text-typography-400 hover:bg-white/5 hover:text-typography-100'
          } ${index === 0 ? 'mt-3' : ''}`}
        >
          <Icon
            as={item.icon}
            className={`${
              isActive
                ? 'text-primary-100'
                : 'text-typography-400 group-hover:text-typography-100'
            }`}
            size="lg"
          />
          <Text className="text-sm font-medium tracking-tight">
            {item.label}
          </Text>
        </Box>
      </Link>
    );
  };

  return (
    <Box className="flex h-full min-w-[240px] max-w-[260px] flex-col justify-between border-r border-white/10 bg-[rgba(9,14,23,0.68)] px-5 py-8 backdrop-blur-2xl">
      <Box>
        <Box className="flex flex-col gap-1">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-500">
            Customer Automator
          </Text>
          <Text className="text-2xl font-semibold text-typography-0">
            Front Desk AI
          </Text>
        </Box>
        <Box className="mt-8 flex flex-col">
          {navItems.map((item, index) => renderItem(item, index))}
        </Box>
      </Box>
      <Box>
        <Text className="mb-2 text-[11px] uppercase tracking-[0.4em] text-typography-500">
          Servizi rapidi
        </Text>
        {supportItems.map((item) => (
          <Link key={item.href} href={item.href} className="group">
            <Box className="flex flex-row items-center gap-3 rounded-2xl px-4 py-3 text-typography-400 transition hover:bg-white/5 hover:text-typography-100">
              <Icon as={item.icon} className="text-typography-400 group-hover:text-primary-100" size="md" />
              <Text className="text-sm font-medium tracking-tight">{item.label}</Text>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

// Validazione: la sidebar offre navigazione chiara con evidenziazione stato attivo e richiami rapidi coerenti con UX hospitality.
