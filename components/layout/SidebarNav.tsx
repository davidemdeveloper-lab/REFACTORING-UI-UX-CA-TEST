'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  Users,
  CalendarClock,
  FileText,
  MessageSquare,
  Bell,
  Cpu,
  Plus,
  PanelsTopLeft,
} from 'lucide-react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonIcon } from '@/components/ui/button';
import { useUIStore } from '@/store/ui-store';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/clients', label: 'Clienti', icon: Users },
  { href: '/bookings', label: 'Prenotazioni', icon: CalendarClock },
  { href: '/templates', label: 'Template', icon: FileText },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/notifications', label: 'Notifiche', icon: Bell },
  { href: '/iot', label: 'IoT', icon: Cpu },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <Box
      className={`glass-panel-soft relative flex h-full flex-col border-r border-white/10 transition-all duration-300 ${
        isSidebarCollapsed ? 'w-[84px]' : 'w-[240px]'
      }`}
    >
      <Box className="flex items-center justify-between px-5 pb-3 pt-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900 font-bold shadow-[0_0_22px_rgba(251,191,36,0.55)]">
            CA
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm uppercase tracking-[0.35em] text-slate-400">Customer</span>
              <span className="text-lg font-semibold text-slate-100">Automator</span>
            </div>
          )}
        </Link>
        <Button
          size="sm"
          variant="outline"
          action="primary"
          className="h-10 w-10 rounded-full border-white/20 bg-white/5"
          onPress={toggleSidebar}
          accessibilityLabel="Comprimi barra laterale"
        >
          <ButtonIcon
            as={PanelsTopLeft}
            className={`text-slate-200 transition-transform ${
              isSidebarCollapsed ? 'rotate-180' : 'rotate-0'
            }`}
            size="sm"
          />
        </Button>
      </Box>

      <Box className="flex-1 space-y-2 px-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className="block">
              <div
                className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white shadow-[0_10px_30px_rgba(15,23,42,0.45)]'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-xl border border-white/15"
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </Box>

      <Box className="px-4 pb-6 pt-4">
        <div className="glass-panel-soft flex flex-col gap-3 rounded-2xl p-4">
          {!isSidebarCollapsed && (
            <>
              <Text className="text-xs uppercase tracking-[0.4em] text-amber-300/90">
                azioni rapide
              </Text>
              <Text className="text-sm text-slate-200">
                Crea una nuova prenotazione o accogli un cliente direttamente dalla lounge.
              </Text>
            </>
          )}
          <div className="flex gap-2">
            <Link href="/bookings/new-lost" className="flex-1">
              <Button
                size="sm"
                action="primary"
                variant="solid"
                className="h-10 w-full rounded-xl bg-amber-500/90 text-slate-900"
              >
                <ButtonIcon as={Plus} className="text-slate-900" size="sm" />
                {!isSidebarCollapsed && 'Nuova proposta'}
              </Button>
            </Link>
          </div>
        </div>
      </Box>
    </Box>
  );
}
