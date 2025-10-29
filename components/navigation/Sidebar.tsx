'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  ClipboardList,
  PenSquare,
  MessageCircleMore,
  BellRing,
  Cpu,
} from 'lucide-react';

const items = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/clients', label: 'Clienti', icon: Users },
  { href: '/bookings', label: 'Prenotazioni', icon: ClipboardList },
  { href: '/templates', label: 'Template', icon: PenSquare },
  { href: '/chat', label: 'Chat', icon: MessageCircleMore },
  { href: '/notifications', label: 'Notifiche', icon: BellRing },
  { href: '/iot', label: 'IoT', icon: Cpu },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col gap-8 border-r border-white/10 bg-white/5/20 px-5 py-8 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
          <span className="text-xl font-semibold text-white">CA</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Customer Automator</p>
          <p className="text-xs text-white/60">Connettiti alla struttura</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#f29c50]/60 ${
                active
                  ? 'border-white/30 bg-white/10 text-white shadow-[0_10px_30px_rgba(242,156,80,0.2)]'
                  : 'text-white/70 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold text-white">Scenario giornaliero</p>
        <p className="mt-2 text-xs text-white/60">
          Pianifica automazioni multi-canale e monitora la soddisfazione degli ospiti in tempo reale.
        </p>
      </div>
    </aside>
  );
}
