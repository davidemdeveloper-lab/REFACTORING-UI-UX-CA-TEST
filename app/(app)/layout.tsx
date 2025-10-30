import { ReactNode } from 'react';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Topbar } from '@/components/navigation/Topbar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full text-white">
      <div className="hidden w-[260px] shrink-0 border-white/10 bg-white/5/20 lg:block">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 space-y-10 px-8 pb-16 pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}
