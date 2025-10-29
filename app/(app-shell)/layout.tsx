import type { ReactNode } from 'react';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { TopBar } from '@/components/layout/TopBar';

export default function AppShellLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-row text-slate-100">
      <aside className="hidden h-screen max-h-screen flex-shrink-0 lg:flex">
        <SidebarNav />
      </aside>
      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="relative flex-1 overflow-y-auto px-8 pb-16 pt-10">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-10 pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
